import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Col, Form, Row, Button, FormText } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../common/AuthContext.jsx";

export function NoticeAdd() {
  const { user, loading, isAuthenticated } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [memberSeq, setMemberSeq] = useState(0);
  const [author, setAuthor] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  // 로그인 안 한 사용자는 로그인 페이지로 보냄
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [loading, isAuthenticated, navigate]);

  useEffect(() => {
    if (!loading && isAuthenticated && user) {
      setAuthor(user.name);
      setMemberSeq(user.memberSeq);
    }
  }, [loading, isAuthenticated, user]);

  const isDisabled = isProcessing || !title.trim() || !content.trim();

  const handleSubmit = () => {
    setIsProcessing(true);
    axios
      .post("/api/notice/add", { title, content, memberSeq })
      .then(() => navigate("/board/notice"))
      .catch((err) => console.error(err))
      .finally(() => setIsProcessing(false));
  };

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <h2 className="mb-4">공지사항 추가</h2>
        <hr />
        <Form>
          <Form.Group className="mb-3" controlId="noticeTitle">
            <Form.Label className="fw-bold">제목</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요."
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="noticeContent">
            <Form.Label className="fw-bold">본문</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력하세요."
            />
          </Form.Group>

          {/*파일 추가할 자리*/}
          <Form.Group className="mb-3" controlId="noticeFiles">
            <Form.Label className="fw-bold">첨부 파일</Form.Label>
          </Form.Group>

          <Form.Group className="mb-4" controlId="noticeAuthor">
            <Form.Label className="fw-bold">작성자</Form.Label>
            <Form.Control type="text" value={author} readOnly />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button
              variant="secondary"
              className="me-2"
              onClick={() => navigate(-1)}
            >
              취소
            </Button>
            <Button
              variant="success"
              onClick={handleSubmit}
              disabled={isDisabled}
            >
              {isProcessing ? "처리 중..." : "추가"}
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
}
