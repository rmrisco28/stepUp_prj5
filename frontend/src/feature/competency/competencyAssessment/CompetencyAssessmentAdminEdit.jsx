import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Spinner,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

export function CompetencyAssessmentAdminEdit() {
  const [assessment, setAssessment] = useState(null);
  const [title, setTitle] = useState("");
  const [startDttm, setStartDttm] = useState("");
  const [endDttm, setEndDttm] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  const { assessmentSeq } = useParams();

  useEffect(() => {
    // 관리자만
    axios
      .get("/api/auth/status") // 로그인 상태 확인 API
      .then((res) => {
        if (res.data.authName !== "admin") {
          alert("잘못된 접근입니다...!");
          navigate("/");
        } else {
          console.log("로그인된 사용자 정보:", res.data);
          setIsAdmin(res.data.authName === "admin"); // authName이 'admin'이면 관리자
        }
      })
      .catch((err) => {
        console.log("로그인 상태 확인 실패");
        navigate("/login");
      });

    axios
      .get(`/api/competency/assessment/admin/${assessmentSeq}/edit`)
      .then((res) => {
        const data = res.data;
        console.log(data);
        setAssessment(data);
        setTitle(data.caTitle);
        setStartDttm(data.startDttm);
        setEndDttm(data.endDttm);
      })
      .catch((err) => {
        console.log("no");
      })
      .finally(() => {
        console.log("finally");
      });
  }, []);

  function handleUpdateButton() {
    if (!title.trim() || !startDttm || !endDttm) {
      alert("모든 항목을 입력 후 저장 버튼을 눌러주세요.");
      return;
    }

    if (new Date(startDttm) > new Date(endDttm)) {
      alert("시작일은 종료일보다 늦을 수 없습니다.");
      return;
    }

    setIsProcessing(true);

    axios
      .put(`/api/competency/assessment/admin/${assessmentSeq}/edit`, {
        caTitle: title,
        startDttm: startDttm,
        endDttm: endDttm,
      })
      .then((res) => {
        console.log("ok");
        alert(res.data.message);
        navigate("/competency/assessment");
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log("error");
      })
      .finally(() => {
        console.log("finally");
        setIsProcessing(false);
      });
  }

  if (!assessment) {
    return <Spinner />;
  }

  return (
    <>
      <Row className="justify-content-center my-5">
        <Col xs={10} md={8} lg={4}>
          <h2 className="mb-4">{assessment.caTitle}</h2>

          <FormGroup className="mb-3" controlId="name">
            <FormLabel style={{ fontSize: "1.5rem" }}>제목</FormLabel>
            <FormControl
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
          {/*진단 시작일*/}
          <Row>
            <Col>
              <FormGroup className="mb-3">
                <FormLabel>진단 시작일</FormLabel>
                <FormControl
                  type="date"
                  name="startDttm"
                  value={startDttm}
                  onChange={(e) => setStartDttm(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="mb-3">
                <FormLabel>진단 종료일</FormLabel>
                <FormControl
                  type="date"
                  name="endDttm"
                  value={endDttm}
                  onChange={(e) => setEndDttm(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <div className="d-flex justify-content-end">
            <Button
              className="me-2"
              variant="outline-danger"
              onClick={() =>
                navigate(`/competency/assessment/admin/${assessment.seq}`)
              }
            >
              뒤로
            </Button>

            <Button variant="outline-primary" onClick={handleUpdateButton}>
              저장
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}
