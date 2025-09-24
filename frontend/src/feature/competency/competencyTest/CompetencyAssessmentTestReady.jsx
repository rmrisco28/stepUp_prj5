import { Button, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

export function CompetencyAssessmentTestReady() {
  const [title, setTitle] = useState("");
  const [endDttm, setEndDttm] = useState("");
  const [memberSeq, setMemberSeq] = useState("");
  const [imposible, setimposible] = useState(true);

  const navigate = useNavigate();

  const { assessmentSeq } = useParams();

  useEffect(() => {
    // 사용자 여부
    axios
      .get("/api/auth/status") // 로그인 상태 확인 API
      .then((res) => {
        if (!res.data.authName) {
          alert("로그인이 필요합니다.");
          navigate("/login");
        } else {
          // console.log("로그인된 사용자 정보:", res.data);
          setMemberSeq(res.data.memberSeq);

          // 로그인된 후, 해당 사용자가 검사했는지 확인
          axios
            .get(
              `/api/competency/assessment/test/check/${assessmentSeq}?memberSeq=${res.data.memberSeq}`,
            )
            .then((response) => {
              setimposible(response.data.data);
              if (response.data) {
                // 검사 완료된 경우
                alert("이미 진단검사를 완료하셨습니다.");
                navigate(`/competency/assessment/test/result/${assessmentSeq}`); // 다른 페이지로 이동

                console.log("과연", imposible);
              } else {
                // 아직 검사하지 않은 경우
                console.log("검사할 수 있는 상태입니다.");
                console.log("과연", imposible);
              }
            })
            .catch((err) => {
              console.log("검사 여부 확인 실패:", err);
            });
        }
      })
      .catch((err) => {
        console.log("로그인 상태 확인 실패");
        navigate("/login");
      });

    axios
      .get(`/api/competency/assessment/test/ready/${assessmentSeq}`)
      .then((res) => {
        console.log(res.data);
        setTitle(res.data.caTitle);
        setEndDttm(res.data.endDttm);
      });
  }, [assessmentSeq]);

  return (
    <>
      <Row className="d-flex justify-content-center my-5">
        <Col xs={12} md={8} lg={6}>
          <h3 className=" d-flex justify-content-center mb-4">"{title}"</h3>
          <div className="mb-5"></div>
          <p className="d-flex justify-content-center mb-4">
            답안 제출 가능 횟수: {imposible ? "0" : "1"}
          </p>
          <p className="d-flex justify-content-center mb-4">
            종료 일시: {endDttm}
          </p>
          <div className="d-flex justify-content-center  mb-4">
            <Button
              variant="success"
              onClick={() =>
                navigate(`/competency/assessment/test/start/${assessmentSeq}`)
              }
            >
              응시
            </Button>
          </div>
          <div className="d-flex justify-content-center  gap-5">
            <Button
              variant="outline-success"
              onClick={() => navigate(`/competency/assessment`)}
            >
              강좌로 돌아가기
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}
