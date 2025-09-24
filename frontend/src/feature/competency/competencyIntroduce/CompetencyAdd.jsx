import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export function CompetencyAdd() {
  const [name, setName] = useState("");
  const [expln, setExpln] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  let navigate = useNavigate();

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
  }, [navigate]);

  function handleSavaButton() {
    if (!name.trim() || !expln.trim() || isProcessing) {
      alert("모든 필드를 입력해 주세요.");
      return;
    }

    setIsProcessing(true);
    axios
      .post("/api/competency/add", {
        competencyName: name,
        competencyExpln: expln,
      })
      .then((res) => {
        console.log("ok");
        alert(res.data.message);
        navigate("/competency/list");
      })
      .catch((err) => {
        console.log("error");
      })
      .finally(() => {
        console.log("finally");
        setIsProcessing(false);
      });
  }

  return (
    <>
      <Row className="justify-content-center my-5">
        <Col xs={10} md={8} lg={4}>
          <h2 className="mb-4">역량 추가</h2>

          {/*역량명*/}
          <FormGroup className="mb-3" controlId="name">
            <FormLabel style={{ fontSize: "1.5rem" }}>핵심역량</FormLabel>
            <FormControl
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>

          {/*역량 설명*/}
          <FormGroup className="mb-3" controlId="expln">
            <FormLabel style={{ fontSize: "1.5rem" }}>핵심역량 설명</FormLabel>
            <FormControl
              as="textarea"
              rows={3}
              value={expln}
              onChange={(e) => setExpln(e.target.value)}
            />
          </FormGroup>

          <div className="d-flex justify-content-end">
            <Button
              className="me-3 btn btn-info"
              onClick={() => navigate("/competency/list")}
            >
              역량 목록
            </Button>
            <Button className="" onClick={handleSavaButton}>
              저장
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}
