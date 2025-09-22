import { useState } from "react";
import { useNavigate } from "react-router";
import { Col, FormControl, Row, Button, Container } from "react-bootstrap";
import axios from "axios";

export function FaqAdd() {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  function FaqAddButton() {
    setIsProcessing(true);
    axios
      .post("/api/faq/add", { question, answer })
      .then((response) => {
        console.log("Faq added successfully:", response.data);
        navigate("/board/faq/manage");
      })
      .catch((error) => {
        console.error("Error adding faq:", error);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={9}>
          <h2 className="mb-4 fw-bold">FAQ 등록</h2>
          {/* 질문 */}
          <div className="mb-3">
            <label htmlFor="question-input" className="form-label">
              질문
            </label>
            <FormControl
              id="question-input"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="질문을 입력하세요"
            />
          </div>
          {/* 답변 */}
          <div className="mb-3">
            <label htmlFor="answer-input" className="form-label">
              답변
            </label>
            <FormControl
              id="answer-input"
              as="textarea"
              rows={10}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="답변을 입력하세요"
            />
          </div>
          {/* 추가 버튼 */}
          <div className="d-flex justify-content-end">
            <Button
              className="me-2"
              variant="primary"
              onClick={FaqAddButton}
              disabled={isProcessing}
            >
              {isProcessing ? "처리 중..." : "등록"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate(`/board/faq/manage`)}
            >
              취소
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
