import { Col, Row } from "react-bootstrap";
import { useEffect } from "react";
import axios from "axios";

export function CompetencyAssessmentTestResult() {
  useEffect(() => {
    axios.get();
  }, []);

  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <h3 className="">진단검사 결과</h3>
        </Col>
      </Row>
    </>
  );
}
