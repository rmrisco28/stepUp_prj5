import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

export function CompetencyAssessmentTestResult() {
  const [memberSeq, setMemberSeq] = useState("");
  const [resultData, setResultData] = useState([]);
  const [memberName, setMemberName] = useState("");
  const [memberMajor, setMemberMajor] = useState("");
  const [studentNo, setStudentNo] = useState("");
  const [mainCompetency, setMainCompetency] = useState();
  const [subCompetency, setSubCompetency] = useState([]);

  const navigate = useNavigate();
  const { assessmentSeq } = useParams();

  useEffect(() => {
    // 사용자 여부
    axios
      .get("/api/auth/status") // 로그인 상태 확인 API
      .then((res) => {
        if (!res.data.authName) {
          // 로그아웃 상태
          alert("로그인이 필요합니다.");
          navigate("/login");
        } else {
          // 로그인 상태
          console.log("로그인된 사용자 정보:", res.data);
          setMemberSeq(res.data.memberSeq);
          setMemberName(res.data.name);
        }
      })
      .catch((err) => {
        console.log("로그인 상태 확인 실패");
        navigate("/login");
      });
  }, []);

  useEffect(() => {
    // 하위역량 불러오기
    axios
      .get("/api/competency/assessment/admin/subCompetency")
      .then((res) => {
        console.log("하위역량", res.data);
        setSubCompetency(res.data);
      })
      .catch((err) => {
        console.log("sub no");
      });

    axios
      .get(
        `/api/competency/assessment/test/result/${assessmentSeq}?memberSeq=${memberSeq}`,
      )
      .then((res) => {
        console.log("불러오기 성공", res.data);
        setResultData(res.data);
        console.log("실험", res.data[0].memberSeqStudentMajor);
        setMemberMajor(res.data[0].memberSeqStudentMajor);
        setStudentNo(res.data[0].memberSeqStudentStudentNo);
      })
      .catch((err) => {
        console.log("불러오기 실패 ㅠㅠ", err.response.data.message);
      });
  }, [memberSeq, assessmentSeq]);

  if (!memberSeq) {
    return <div>로딩 중...</div>; // 혹은 스피너 컴포넌트 등 로딩 표시
  }
  
  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <h3 className="">진단검사 결과</h3>
          <div className="mb-5"></div>
          이름: {memberName}
          <br />
          학번: {studentNo}
          <br />
          학과: {memberMajor}
          {/* 역량 별 데이터 보여주기*/}
        </Col>
      </Row>
    </>
  );
}
