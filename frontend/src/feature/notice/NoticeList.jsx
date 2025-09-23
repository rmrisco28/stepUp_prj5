import { Col, Row, Table, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from "../../common/AuthContext.jsx";

export function NoticeList() {
  const { user, isAdmin } = useAuth();
  const [noticeList, setNoticeList] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsProcessing(true);
    axios
      .get("/api/notice/list")
      .then((res) => {
        console.log(res.data);
        setNoticeList(res.data);
      })
      .catch((error) => {
        console.error("공지사항 목록을 불러오는 중 오류 발생:", error);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }, []);

  function NoticeAddButton() {
    navigate("/board/notice/add");
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <h2>공지사항</h2>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {isProcessing ? (
              <tr>
                <td colSpan="2" className="text-center">
                  로딩 중...
                </td>
              </tr>
            ) : noticeList.length === 0 ? (
              <tr>
                <td colSpan="2" className="text-center">
                  공지사항이 없습니다.
                </td>
              </tr>
            ) : (
              noticeList.map((notice, index) => (
                <tr key={index}>
                  <td>{notice.id}</td>
                  <td
                    onClick={() => navigate(`/board/notice/${notice.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {notice.title}
                  </td>
                  <td>{notice.insertedAt}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
        {isAdmin() && (
          <Button onClick={NoticeAddButton} className="mt-3">
            공지사항 추가
          </Button>
        )}
      </Col>
    </Row>
  );
}
