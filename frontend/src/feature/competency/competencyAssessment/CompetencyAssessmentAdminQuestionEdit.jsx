import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

export function CompetencyAssessmentAdminQuestionEdit() {
  const [questionNum, setQuestionNum] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();
  const { seq } = useParams();

  useEffect(() => {
    axios.get(`/api/competency/assessment/admin/`);
  }, []);

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={10} md={8} lg={6}>
          <h2 className="mb-4">문제 수정</h2>
        </Col>
      </Row>
    </>
  );
}
