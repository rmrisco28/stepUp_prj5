import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Spinner, Col, Row, ListGroup, Badge } from "react-bootstrap";
import { useAuth } from "../../common/AuthContext.jsx";

export function NoticeDetail() {
  const { user, loading, isAdmin } = useAuth();
  const [userName, setUserName] = useState("");
  const [notice, setNotice] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      setUserName(user.name);
    }
  }, [loading, user]);

  useEffect(() => {
    axios
      .get(`/api/notice/${id}`)
      .then((res) => {
        console.log(res.data);
        setNotice(res.data);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          toast.warning("해당 공지사항이 없습니다.");
          navigate("/board/notice");
        } else {
          toast.error("공지사항을 불러오는 중 오류가 발생했습니다.");
        }
      });
  }, [id, navigate]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}.${mm}.${dd}`;
  };

  const handleDelete = () => {
    axios
      .delete(`/api/notice/${id}`)
      .then((res) => {
        const message = res.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }
        navigate("/board/notice");
      })
      .catch(() => {
        toast.warning("공지사항이 삭제되지 않았습니다.");
      });
  };

  if (!notice) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" role="status" variant="success" />
      </div>
    );
  }

  return (
    <Row className="justify-content-center mt-4">
      <Col xs={12} md={10} lg={8}>
        {/* 제목 */}
        <div className="mb-4">
          <h3 className="fw-bold border-bottom pb-3">{notice.title}</h3>
          <div className="d-flex justify-content-between text-muted small">
            <span>작성일자 | {formatDate(notice.insertedAt)}</span>
            <span>작성자 | {notice.author || "알 수 없음"}</span>
          </div>
        </div>

        {/* 본문 */}
        <div
          className="border rounded p-3 bg-light mb-4"
          style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}
        >
          {notice.content}
        </div>

        {/* 첨부파일 섹션 */}
        <div className="mb-4">
          <h6 className="fw-bold">
            <Badge bg="success" className="me-2">
              📎
            </Badge>
            첨부파일
          </h6>
          {/* 첨부파일 아직 */}
          {notice.files && notice.files.length > 0 ? (
            <ListGroup>
              {notice.files.map((file, index) => (
                <ListGroup.Item
                  key={index}
                  action
                  onClick={() => window.open(file.downloadUrl, "_blank")}
                >
                  {file.fileName}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <div className="text-muted small">첨부파일이 없습니다.</div>
          )}
        </div>

        {/* 버튼 */}
        <div className="d-flex justify-content-between">
          <Button
            variant="outline-secondary"
            onClick={() => navigate(-1)}
            className="me-2"
          >
            목록
          </Button>
          <div>
            {isAdmin() && userName === notice.author && (
              <Button
                variant="outline-warning"
                onClick={() => navigate(`/board/notice/edit/${notice.seq}`)}
                className="me-2"
              >
                수정
              </Button>
            )}
            {isAdmin() && userName === notice.author && (
              <Button variant="outline-danger" onClick={handleDelete}>
                삭제
              </Button>
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
}
