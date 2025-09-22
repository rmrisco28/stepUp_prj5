import {
  Col,
  Row,
  Table,
  Button,
  Spinner,
  Container,
  Accordion,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { FaQuestionCircle, FaRegCommentDots } from "react-icons/fa";
import { FaQ } from "react-icons/fa6";
import { FaA } from "react-icons/fa6";
import "../../css/FAQ.css";

export function Faq() {
  const [faqList, setFaqList] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsProcessing(true);
    axios
      .get("/api/faq/list")
      .then((res) => {
        console.log(res.data);
        setFaqList(res.data);
      })
      .catch((error) => {
        console.error("FAQ 목록을 불러오는 중 오류 발생:", error);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }, []);

  if (!faqList) {
    return <Spinner />;
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={9}>
          <h2 className="mb-5 fw-bold">자주 묻는 질문 (FAQ)</h2>

          {isProcessing ? (
            <div className="text-center">로딩 중...</div>
          ) : faqList.length === 0 ? (
            <div className="text-center">FAQ가 없습니다.</div>
          ) : (
            <Accordion alwaysOpen className="faq-accordion">
              {faqList.map((faq, index) => (
                <Accordion.Item
                  eventKey={String(index)}
                  key={index}
                  className="faq-item"
                >
                  <Accordion.Header>
                    <FaQ className="me-3" />
                    <div>{faq.question}</div>
                  </Accordion.Header>
                  <Accordion.Body typeof="textarea">
                    <div>
                      <FaA className="me-3 mx-4" />
                      {faq.answer.split("\n").map((line, idx) => (
                        <span key={idx}>
                          {idx > 0 && "\u00A0".repeat(10)}
                          {line}
                          <br />
                        </span>
                      ))}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          )}
        </Col>
      </Row>
    </Container>
  );
}
