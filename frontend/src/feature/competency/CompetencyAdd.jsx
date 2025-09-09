import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export function CompetencyAdd() {
  const [name, setName] = useState("");
  const [expln, setExpln] = useState("");
  const [file, setFile] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  let navigate = useNavigate();

  function handleSavaButton() {
    setIsProcessing(true);
    axios
      .post("/api/competency/add", {
        competencyName: name,
        competencyExpln: expln,
        competencyImg: file,
      })
      .then((res) => {
        console.log("ok");
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
      <Row className="justify-content-center">
        <Col xs={10} md={8} lg={4}>
          <h2 className="mb-4">역량 추가</h2>

          {/*역량명*/}
          <FormGroup className="mb-3" controlId="name">
            <FormLabel style={{ fontSize: "1.5rem" }}>핵심 역량</FormLabel>
            <FormControl
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>

          {/*역량 설명*/}
          <FormGroup className="mb-3" controlId="expln">
            <FormLabel style={{ fontSize: "1.5rem" }}>핵심 역량 설명</FormLabel>
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
