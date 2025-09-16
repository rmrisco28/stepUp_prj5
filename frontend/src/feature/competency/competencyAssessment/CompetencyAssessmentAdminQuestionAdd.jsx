import {
  Button,
  Col,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export function CompetencyAssessmentAdminQuestionAdd() {
  const [modalShow, setModalShow] = useState(false);
  const [question, setQuestion] = useState("");
  const [competency, setCompetency] = useState([]);
  const [subCompetency, setSubCompetency] = useState([]);
  const [selectedCompetency, setSelectedCompetency] = useState(null);
  const [selectedSubCompetency, setSelectedSubCompetency] = useState(null);
  const [answer, setAnswer] = useState([``]);
  const [score, setScore] = useState(1);
  const [point, setPoint] = useState([0.0]);

  const navigate = useNavigate();

  useEffect(() => {
    // 핵심역량 불러오기
    axios
      .get(`/api/competency/assessment/admin/competency`)
      .then((res) => {
        console.log("핵심역량", res.data);
        setCompetency(res.data);
      })
      .catch((err) => {
        console.log("main no");
      })
      .finally(() => {
        console.log("finally");
      });

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
  }, []);

  // 보기 추가 함수
  const addAnswer = () => {
    setAnswer([...answer, ""]); // 보기 추가
    setPoint([...point, 0.0]); // 배점 추가
  };

  // 보기 값 변경 함수
  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answer];
    newAnswers[index] = value;
    setAnswer(newAnswers);
  };

  // 배점 값 변경 함수
  const handleScoreChange = (index, value) => {
    const newScores = [...point];
    newScores[index] = value;
    setPoint(newScores);
  };

  // 보기 제거 함수
  const removeAnswer = () => {
    if (answer.length > 1) {
      setAnswer(answer.slice(0, -1)); // 마지막 보기 항목 삭제
      setPoint(point.slice(0, -1)); // 마지막 배점 항목 삭제
    }
  };
  const filteredSubCompetency = subCompetency.filter(
    (item) => item.competencySeqSeq === selectedCompetency,
  );

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={10} md={8} lg={6}>
          <h2 className="mb-4">문제 추가</h2>

          {/*핵심역량 선택*/}
          <FormGroup className="mb-3">
            <FormLabel style={{ fontSize: "1.5rem" }}>핵심역량</FormLabel>
            <div className="d-flex flex-wrap gap-2">
              {competency.map((item) => (
                <Button
                  key={item.seq}
                  variant={
                    selectedCompetency === item.seq
                      ? "primary"
                      : "outline-secondary"
                  }
                  onClick={() => setSelectedCompetency(item.seq)}
                >
                  {item.competencyName}
                </Button>
              ))}
            </div>
          </FormGroup>

          {/*하위역량 선택*/}
          <FormGroup className="mb-4">
            <FormLabel style={{ fontSize: "1.5rem" }}>하위역량</FormLabel>
            {selectedCompetency && (
              <div className="d-flex flex-wrap gap-2">
                {filteredSubCompetency.map((item) => (
                  <Button
                    key={item.seq}
                    variant={
                      selectedSubCompetency === item.seq
                        ? "primary"
                        : "outline-secondary"
                    }
                    onClick={() => setSelectedSubCompetency(item.seq)}
                  >
                    {item.subCompetencyName}
                  </Button>
                ))}
              </div>
            )}
          </FormGroup>
          <hr className="mb-4" />
          {/*보기 추가/삭제*/}
          <Row className="align-items-center mb-3">
            <Col>
              <Button
                variant="outline-success"
                className="me-3"
                onClick={addAnswer}
              >
                보기 추가
              </Button>
              <Button variant="outline-warning" onClick={removeAnswer}>
                보기 삭제
              </Button>
            </Col>
            <Col>
              <FormGroup controlId="score">
                <Row className="align-items-center">
                  <Col className="col-auto">
                    <FormLabel style={{ fontSize: "1.2rem" }}>
                      기본 점수:
                    </FormLabel>
                  </Col>
                  <Col>
                    <FormControl
                      value={score}
                      onChange={(e) => setScore(e.target.value)}
                    ></FormControl>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
          </Row>

          {/*문제*/}
          <FormGroup className="mb-3" controlId="question">
            <FormLabel style={{ fontSize: "1.5rem" }}>문제</FormLabel>
            <FormControl
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            ></FormControl>
          </FormGroup>
          {/*답변*/}
          <Row>
            <Col xs={8}>
              {answer.map((item, index) => (
                <FormGroup
                  className="mb-3"
                  controlId={`answer-${index}`}
                  key={index}
                >
                  <FormLabel>보기 {index + 1}</FormLabel>
                  <FormControl
                    value={item}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  ></FormControl>
                </FormGroup>
              ))}
            </Col>
            <Col>
              {/* 배점 항목들 */}
              {point.map((item, index) => (
                <FormGroup
                  className="mb-3"
                  controlId={`score-${index}`}
                  key={index}
                >
                  <FormLabel>배점 {index + 1}</FormLabel>
                  <FormSelect
                    value={item}
                    onChange={(e) =>
                      handleScoreChange(index, parseFloat(e.target.value))
                    }
                  >
                    <option value="0.0">없음</option>
                    <option value="1.0">100%</option>
                    <option value="0.9">90%</option>
                    <option value="0.8333333">83.33%</option>
                    <option value="0.8">80%</option>
                    <option value="0.75">75%</option>
                    <option value="0.7">70%</option>
                    <option value="0.6666667">66.67%</option>
                    <option value="0.6">60%</option>
                    <option value="0.5">50%</option>
                    <option value="0.4">40%</option>
                    <option value="0.3333333">33.33%</option>
                    <option value="0.3">30%</option>
                    <option value="0.25">25%</option>
                    <option value="0.2">20%</option>
                    <option value="0.1666667">16.67%</option>
                    <option value="0.1428571">14.29%</option>
                    <option value="0.125">12.5%</option>
                    <option value="0.1111111">11.11%</option>
                    <option value="0.1">10%</option>
                    <option value="0.05">5%</option>
                    <option value="-0.05">-5%</option>
                    <option value="-0.1">-10%</option>
                    <option value="-0.1111111">-11.11%</option>
                    <option value="-0.125">-12.5%</option>
                    <option value="-0.1428571">-14.29%</option>
                    <option value="-0.1666667">-16.67%</option>
                    <option value="-0.2">-20%</option>
                    <option value="-0.25">-25%</option>
                    <option value="-0.3">-30%</option>
                    <option value="-0.3333333">-33.33%</option>
                    <option value="-0.4">-40%</option>
                    <option value="-0.5">-50%</option>
                    <option value="-0.6">-60%</option>
                    <option value="-0.6666667">-66.67%</option>
                    <option value="-0.7">-70%</option>
                    <option value="-0.75">-75%</option>
                    <option value="-0.8">-80%</option>
                    <option value="-0.8333333">-83.33%</option>
                    <option value="-0.9">-90%</option>
                    <option value="-1.0">-100%</option>
                  </FormSelect>
                </FormGroup>
              ))}
            </Col>
          </Row>

          <div className="d-flex justify-content-end mt-3">
            <Button
              className="me-2"
              variant="outline-danger"
              onClick={() => setModalShow(true)}
            >
              취소
            </Button>
            <Button variant="outline-primary">저장</Button>
          </div>
        </Col>

        {/*모달*/}
        <Modal show={modalShow} onHide={() => setModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>미저장 여부 확인</Modal.Title>
          </Modal.Header>
          <Modal.Body>저장하지 않고 돌아가시겠습니까?</Modal.Body>
          <Modal.Footer>
            <Button variant="outline-dark" onClick={() => setModalShow(false)}>
              취소
            </Button>

            <Button
              variant="outline-danger"
              onClick={() =>
                navigate(`/api/competency/assessment/admin/${data.seq}`)
              }
            >
              뒤로
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </>
  );
}
