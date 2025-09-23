import { Col, Row, Table, Button, Spinner, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export function FaqManage() {
  const [faqList, setFaqList] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsProcessing(true);
    axios
      .get("/api/faq/manage")
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

  function FaqAddButton() {
    navigate("/board/faq/add");
  }

  if (!faqList) {
    return <Spinner />;
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={9}>
          <h2 className="mb-5 fw-bold">FAQ 관리</h2>
          <Table hover className="mb-4">
            <thead>
              <tr className="text-center">
                <th style={{ width: "10%" }}>#</th>
                <th style={{ width: "70%" }}>질문</th>
                <th style={{ width: "20%" }}>등록일</th>
              </tr>
            </thead>
            <tbody>
              {isProcessing ? (
                <tr>
                  <td colSpan="3" className="text-center">
                    로딩 중...
                  </td>
                </tr>
              ) : faqList.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center">
                    FAQ가 없습니다.
                  </td>
                </tr>
              ) : (
                faqList.map((faq, index) => (
                  <tr
                    key={index}
                    onClick={() => navigate(`/board/faq/${faq.seq}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <td className="text-center">{faq.seq}</td>
                    <td>{faq.question}</td>
                    <td className="text-center">
                      {faq.insertedAt.replace("T", " ")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
          <Button variant="success" onClick={FaqAddButton}>
            FAQ 등록
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
