import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export function CompetencyAssessmentTestResult() {
  const [memberSeq, setMemberSeq] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // 사용자 여부
    axios
      .get("/api/auth/status") // 로그인 상태 확인 API
      .then((res) => {
        if (!res.data.authName) {
          alert("로그인이 필요합니다.");
          navigate("/login");
        } else {
          console.log("로그인된 사용자 정보:", res.data);
          setMemberSeq(res.data.memberSeq);
        }
      })
      .catch((err) => {
        console.log("로그인 상태 확인 실패");
        navigate("/login");
      });
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
