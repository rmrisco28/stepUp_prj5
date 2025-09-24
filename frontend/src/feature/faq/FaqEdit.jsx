import {
  Button,
  Col,
  Container,
  FormControl,
  Row,
  Spinner,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

export function FaqEdit() {
  const [faq, setFaq] = useState({
    question: "",
    answer: "",
    seq: null,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const { seq } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/faq/${seq}`)
      .then((res) => {
        setFaq(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [seq]);

  function FaqSaveButton() {
    if (!faq.seq) return;

    setIsProcessing(true);

    const formData = new FormData();
    formData.append("question", faq.question ?? "");
    formData.append("answer", faq.answer ?? "");
    formData.append("seq", faq.seq); // 컨트롤러 @ModelAttribute용

    axios
      .put(`/api/faq/edit/${seq}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        navigate(`/board/faq/${faq.seq}`); // 수정 후 상세 보기 페이지 이동
      })
      .catch((err) => {
        const message = err.response?.data?.message || {
          text: "게시물 수정 중 오류가 발생했습니다.",
          type: "warning",
        };
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const m = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");
    return `${yyyy}.${mm}.${dd} ${hh}:${m}:${ss}`;
  };

  if (!faq) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" role="status" />
      </div>
    );
  }
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={9} lg={6}>
          <h3 className="mb-4 fw-bold">FAQ 수정</h3>
          <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
            <div className="d-flex align-items-center">
              <div>
                <small className="text-muted">
                  {formatDate(faq.insertedAt)}
                </small>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="question-input" className="form-label">
              질문
            </label>
            <FormControl
              id="question-input"
              type="text"
              value={faq.question}
              onChange={(e) => setFaq({ ...faq, question: e.target.value })}
              placeholder="질문을 입력하세요"
            />
          </div>
          {/* 본문 */}
          <div className="mb-3">
            <label htmlFor="answer-input" className="form-label">
              답변
            </label>
            <FormControl
              id="answer-input"
              as="textarea"
              rows={10}
              value={faq.answer ?? ""}
              onChange={(e) => setFaq({ ...faq, answer: e.target.value })}
              placeholder="답변을 입력하세요"
            />
          </div>

          <div className="d-flex justify-content-end">
            <div>
              <Button
                variant="outline-secondary"
                onClick={() => navigate(-1)}
                className="me-2"
              >
                취소
              </Button>
              <Button
                variant="outline-success"
                onClick={FaqSaveButton}
                className="me-2"
              >
                저장
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
