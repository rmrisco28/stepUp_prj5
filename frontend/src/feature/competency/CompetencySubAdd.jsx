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
      <Row className="justify-content-center">
        <Col xs={10} md={8} lg={4}>
          <h2 className="mb-4">하위 역량 추가</h2>

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

          {/*하위 역량명*/}
          <FormGroup className="mb-3" controlId="name">
            <FormLabel style={{ fontSize: "1.5rem" }}>하위 역량</FormLabel>
            <FormControl
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>

          {/*하위 역량 설명*/}
          <FormGroup className="mb-3" controlId="expln">
            <FormLabel style={{ fontSize: "1.5rem" }}>하위 역량 설명</FormLabel>
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
