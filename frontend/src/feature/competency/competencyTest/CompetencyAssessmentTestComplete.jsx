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
          <Row className="d-flex justify-content-center">
            <Col xs={12} md={8} lg={6}>
              <hr />
              <br />
              <div className="d-flex justify-content-center">
                수고 하셨습니다.
              </div>
            </Col>
          </Row>
          <div
            className="d-flex justify-content-center "
            style={{ marginTop: "50px", gap: "30px" }}
          >
            <Button
              variant="outline-secondary"
              className="me-5"
              onClick={() => navigate("/")}
            >
              메인으로
            </Button>
            <Button
              variant="outline-success"
              onClick={() =>
                navigate(`/competency/assessment/test/result/${assessmentSeq}`)
              }
            >
              결과보기
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}
