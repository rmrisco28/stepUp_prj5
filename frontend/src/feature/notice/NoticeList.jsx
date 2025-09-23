import { Col, Row, Table, Button, Spinner, Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from "../../common/AuthContext.jsx";
import "../../css/Pagenation.css";

export function NoticeList() {
  const { user, isAdmin } = useAuth();
  const [noticeList, setNoticeList] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pageInfo, setPageInfo] = useState({ currentPage: 1, totalPages: 1 });
  const navigate = useNavigate();

  const fetchNotices = (page = 1) => {
    setIsProcessing(true);
    axios
      .get("/api/notice/list", { params: { page } })
      .then((res) => {
        setNoticeList(res.data.noticeList);
        setPageInfo(res.data.pageInfo);
      })
      .catch((error) => {
        console.error("공지사항 목록을 불러오는 중 오류 발생:", error);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  useEffect(() => {
    fetchNotices(1);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}.${mm}.${dd}`;
  };

  const handleAddNotice = () => {
    navigate("/board/notice/add");
  };

  const handlePageChange = (page) => {
    fetchNotices(page);
  };

  // 페이지 버튼 생성
  const renderPagination = () => {
    let items = [];
    for (let number = 1; number <= pageInfo.totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === pageInfo.currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>,
      );
    }
    return <Pagination>{items}</Pagination>;
  };

  return (
    <Row className="justify-content-center mt-4">
      <Col xs={12} md={10} lg={8}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-bold mb-2">공지사항</h2>
          {isAdmin() && (
            <Button variant="success" onClick={handleAddNotice}>
              + 공지 추가
            </Button>
          )}
        </div>

        <Table hover responsive className="shadow-sm rounded overflow-hidden">
          <thead className="table-success">
            <tr className="text-center">
              <th style={{ width: "45%" }}>제목</th>
              <th style={{ width: "20%" }}>작성일</th>
              <th style={{ width: "25%" }}>작성자</th>
            </tr>
          </thead>
          <tbody>
            {isProcessing ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  <Spinner animation="border" variant="success" size="sm" />{" "}
                  로딩 중...
                </td>
              </tr>
            ) : noticeList.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-muted">
                  공지사항이 없습니다.
                </td>
              </tr>
            ) : (
              noticeList.map((notice) => (
                <tr key={notice.id} className="align-middle text-center">
                  <td
                    className="text-success text-start"
                    style={{ cursor: "pointer", fontWeight: "500" }}
                    onClick={() => navigate(`/board/notice/${notice.id}`)}
                  >
                    {notice.title}
                  </td>
                  <td className="text-muted">
                    {formatDate(notice.insertedAt)}
                  </td>
                  <td className="text-muted">
                    {notice.author?.employee?.name || "알 수 없음"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        {/* 페이지 버튼 */}
        <div className="d-flex justify-content-center mt-3">
          {renderPagination()}
        </div>
      </Col>
    </Row>
  );
}
