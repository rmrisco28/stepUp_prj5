import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Col, FormControl, Row, Button } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../common/AuthContext.jsx";

export function NoticeAdd() {
  const { user, loading } = useAuth();
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [memberSeq, setMemberSeq] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      setAuthor(user.name);
      setMemberSeq(user.memberSeq);
      if (!user) {
        alert("관리자만 이용 가능합니다.");
      }
    }
  }, [loading, user]);

  function NoticeAddButton() {
    setIsProcessing(true);

    axios
      .post("/api/notice/add", { title, content, memberSeq })
      .then((response) => {
        console.log("Notice added successfully:", response.data);
        navigate("/board/notice");
      })
      .catch((error) => {
        console.error("Error adding notice:", error);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <h2>공지사항 추가</h2>
        {/* 제목 */}
        <div className="mb-3">
          <label htmlFor="title-input" className="form-label">
            제목
          </label>
          <FormControl
            id="title-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
          />
        </div>
        {/* 본문 */}
        <div className="mb-3">
          <label htmlFor="content-input" className="form-label">
            본문
          </label>
          <FormControl
            id="content-input"
            as="textarea"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
          />
        </div>
        {/* 제목 */}
        <div className="mb-3">
          <label htmlFor="title-input" className="form-label">
            작성자
          </label>
          <FormControl id="title-input" type="text" value={author} readOnly />
        </div>
        {/* 버튼 */}
        <Button
          className="me-2"
          variant="secondary"
          onClick={() => navigate(-1)}
        >
          취소
        </Button>
        <Button
          variant="primary"
          onClick={NoticeAddButton}
          disabled={isProcessing || !title.trim() || !content.trim()}
        >
          {isProcessing ? "처리 중..." : "추가"}
        </Button>
      </Col>
    </Row>
  );
}
