import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Row, Spinner } from "react-bootstrap";

export function FaqDetail() {
  const [faq, setFaq] = useState(null);
  const { seq } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/faq/${seq}`)
      .then((res) => {
        console.log(res.data);
        setFaq(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [seq]);

  function FaqDeleteButton() {
    axios
      .delete(`/api/faq/delete/${seq}`)
      .then((res) => {
        console.log(res.data);
        navigate("/board/faq/manage");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }

  if (!faq) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <h3 className="mb-4 fw-bold">{faq.seq}번 FAQ</h3>
        <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
          <div className="d-flex align-items-center">
            <div>
              <p className="mb-0">번호: {faq.seq}</p>
            </div>
          </div>
          <div>
            <small className="text-muted">
              {faq.insertedAt.replace("T", " ")}
            </small>
          </div>
        </div>

        <div className="border-bottom pb-4 mb-4">
          <h4 className="border-bottom pb-3 mb-4">{faq.question}</h4>
          <div className="my-3" style={{ whiteSpace: "pre-wrap" }}>
            {faq.answer}
          </div>
        </div>

        <div className="d-flex">
          <Button
            variant="outline-secondary"
            onClick={() => navigate(`/board/faq/manage`)}
            className="me-2"
          >
            목록
          </Button>
          <div>
            {/* 로그인한 사용자가 작성자와 일치할 경우 수정/삭제 버튼 표시 */}
            <Button
              variant="outline-warning"
              onClick={() => navigate(`/board/faq/edit/${faq.seq}`)}
              className="me-2"
            >
              수정
            </Button>
            <Button
              variant="outline-danger"
              onClick={FaqDeleteButton}
              className="me-2"
            >
              삭제
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
}
