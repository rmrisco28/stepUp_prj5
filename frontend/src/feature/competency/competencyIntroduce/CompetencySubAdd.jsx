import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export function CompetencySubAdd() {
  const [competency, setCompetency] = useState("");
  const [competencyList, setCompetencyList] = useState([]);
  const [name, setName] = useState("");
  const [expln, setExpln] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();

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
        }
      })
      .catch((err) => {
        console.log("로그인 상태 확인 실패");
        navigate("/login");
      });

    axios.get(`/api/competency/subAddList`).then((res) => {
      setCompetencyList(res.data);
      console.log(res.data);
    });
  }, []);

  function handleSavaButton() {
    if (!competency || !name.trim() || !expln.trim() || isProcessing) {
      alert("모든 필드를 입력해 주세요.");
      return;
    }

    setIsProcessing(true);
    axios
      .post("/api/competency/subAdd", {
        competencySeqId: parseInt(competency),
        subCompetencyName: name,
        subCompetencyExpln: expln,
      })
      .then((res) => {
        console.log("ok");
        console.log(res.data);
        alert(res.data.message);
        navigate("/competency/subList");
      })
      .catch((err) => {
        console.log("no");
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
          <h2 className="mb-4">하위역량 추가</h2>

          {/*핵심역량 선택*/}
          <FormGroup>
            <FormLabel style={{ fontSize: "1.5rem" }}>핵심역량</FormLabel>
            <FormSelect
              className="mb-3"
              onChange={(e) => setCompetency(e.target.value)}
            >
              <option value="">핵심역량 선택</option>
              {competencyList.map((item) => (
                <option value={item.seq} key={item.seq}>
                  {item.competencyName}
                </option>
              ))}
            </FormSelect>
          </FormGroup>

          {/*하위역량명*/}
          <FormGroup className="mb-3" controlId="name">
            <FormLabel style={{ fontSize: "1.5rem" }}>하위역량</FormLabel>
            <FormControl
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>

          {/*하위역량 설명*/}
          <FormGroup className="mb-3" controlId="expln">
            <FormLabel style={{ fontSize: "1.5rem" }}>하위역량 설명</FormLabel>
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
              onClick={() => navigate("/competency/subList")}
            >
              역량 목록
            </Button>
            <div className="d-flex justify-content-end">
              <Button className="" onClick={handleSavaButton}>
                저장
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
