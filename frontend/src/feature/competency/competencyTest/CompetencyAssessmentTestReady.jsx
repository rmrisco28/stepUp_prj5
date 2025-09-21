import { Button, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

export function CompetencyAssessmentTestReady() {
  const [title, setTitle] = useState("");
  const [endDttm, setEndDttm] = useState("");

  const navigate = useNavigate();

  const { assessmentSeq } = useParams();

  useEffect(() => {
    axios
      .get(`/api/competency/assessment/test/ready/${assessmentSeq}`)
      .then((res) => {
        console.log(res.data);
        setTitle(res.data.caTitle);
        setEndDttm(res.data.endDttm);
      });
  });

  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h3 className=" d-flex justify-content-center mb-4">"{title}"</h3>
          <div className="mb-5"></div>
          <p className="d-flex justify-content-center mb-4">
            답안 제출 가능 횟수: 1
          </p>
          <p className="d-flex justify-content-center mb-4">
            종료 일시: {endDttm}
          </p>
          <div className="d-flex justify-content-center  mb-4">
            <Button
              onClick={() =>
                navigate(`/competency/assessment/test/start/${assessmentSeq}`)
              }
            >
              {" "}
              응시
            </Button>
          </div>
          <div className="d-flex justify-content-center  gap-5">
            <Button
              variant="outline-secondary"
              onClick={() => navigate(`/competency/assessment`)}
            >
              {" "}
              강좌로 돌아가기
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}
