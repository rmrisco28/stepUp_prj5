import { Button, Col, Row } from "react-bootstrap";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

export function CompetencyAssessmentTestComplete() {
  const navigate = useNavigate();
  const { assessmentSeq } = useParams();

  useEffect(() => {
    axios
      .get(`/api/competency/assessment/test/complete/${assessmentSeq}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("finally");
      });
  }, []);

  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col xs={12} md={8} lg={10}>
          <h3 className=" d-flex justify-content-center mb-3">진단검사 완료</h3>

          <div
            className="d-flex justify-content-center "
            style={{ marginTop: "50px", gap: "30px" }}
          >
            <Button variant="outline-secondary" className="me-5">
              메인으로
            </Button>
            <Button variant="outline-success">결과보기</Button>
          </div>
        </Col>
      </Row>
    </>
  );
}
