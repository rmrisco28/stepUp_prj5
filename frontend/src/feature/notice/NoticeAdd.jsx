import { useState } from "react";
import { useNavigate } from "react-router";
import { Col, FormControl, Row, Button } from "react-bootstrap";
import axios from "axios";

export function NoticeAdd() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  function NoticeAddButton() {
    setIsProcessing(true);
    axios
      .post("/api/notice/add", { title, content })
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
        {/* 추가 버튼 */}
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
          disabled={isProcessing}
        >
          {isProcessing ? "처리 중..." : "추가"}
        </Button>
      </Col>
    </Row>
  );
}
