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
import { useNavigate, useParams } from "react-router";
import axios from "axios";

export function CompetencyAssessmentAdminQuestionAdd() {
  const [modalShow, setModalShow] = useState(false);
  const [question, setQuestion] = useState("");
  const [competency, setCompetency] = useState([]);
  const [subCompetency, setSubCompetency] = useState([]);
  const [selectedCompetency, setSelectedCompetency] = useState(null);
  const [selectedSubCompetency, setSelectedSubCompetency] = useState(null);
  const [choice, setChoice] = useState([``]);
  const [score, setScore] = useState(1);
  const [point, setPoint] = useState([0.0]);
  const [questionNum, setQuestionNum] = useState("");

  const navigate = useNavigate();
  const { assessmentSeq } = useParams();

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

  // 저장 버튼
  function handleQuestionSaveButton() {
    axios
      .post(`/api/competency/assessment/admin/${assessmentSeq}/questionAdd`, {
        caSeqSeq: selectedCompetency,
        subCompetencySeqSeq: selectedSubCompetency,
        questionNum: questionNum,
        question: question,
        score: score,
      })
      .then((res) => {
        // 생성된 문제 Seq 전달
        const questionSeq = res.data.question.seq;
        console.log(res.data.question.seq, "번호 전달");

        const choicePromises = choice.map((item, index) => {
          return axios
            .post(
              `/api/competency/assessment/admin/${assessmentSeq}/choiceAdd`,
              {
                questionSeqSeq: questionSeq,
                option: item,
                point: point[index],
              },
            )
            .then((res) => {
              console.log("선택지 저장 성공", res.data);
            })
            .catch((err) => {
              console.log("선택지 저장 실패", err);
            })
            .finally(() => {
              console.log("선택지 finally");
            });
        });
        Promise.all(choicePromises)
          .then(() => {
            console.log();
            alert("성공적으로 문제가 저장되었습니다.");
            navigate(`/competency/assessment/admin/${assessmentSeq}`);
          })
          .catch((err) => {
            console.error("선택지 저장 중 오류 발생:", err);
            alert(err);
          });
      })
      .catch((err) => {
        console.log("문제 저장 중 오류 발생", err);
        alert(err.response.data.message);
      })
      .finally(() => {
        console.log("finally");
      });
  }

  // 보기 추가 함수
  const addAnswer = () => {
    setChoice([...choice, ""]); // 보기 추가
    setPoint([...point, 0.0]); // 배점 추가
  };

  // 보기 값 변경 함수
  const handleAnswerChange = (index, value) => {
    const newAnswers = [...choice];
    newAnswers[index] = value;
    setChoice(newAnswers);
  };

  // 배점 값 변경 함수
  const handleScoreChange = (index, value) => {
    const newScores = [...point];
    newScores[index] = value;
    setPoint(newScores);
  };

  // 보기 제거 함수
  const removeAnswer = () => {
    if (choice.length > 1) {
      setChoice(choice.slice(0, -1)); // 마지막 보기 항목 삭제
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
          <Row className="align-items-center mb-4">
            <Col>
              <Button
                variant="outline-success"
                className="me-3 mb-3"
                onClick={addAnswer}
              >
                보기 추가
              </Button>
              <Button
                variant="outline-warning"
                className="me-3 mb-3"
                onClick={removeAnswer}
              >
                보기 삭제
              </Button>
            </Col>
            {/* 점수 */}
            <Col>
              <FormGroup controlId="score">
                <Row className="align-items-center">
                  <Row>
                    <Col className="col-auto mb-3">
                      <div>
                        <FormLabel style={{ fontSize: "1.2rem" }}>
                          문항 번호:
                        </FormLabel>
                      </div>
                    </Col>
                    <Col>
                      <div>
                        <FormControl
                          value={questionNum}
                          onChange={(e) => setQuestionNum(e.target.value)}
                        ></FormControl>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-auto">
                      <div>
                        <FormLabel style={{ fontSize: "1.2rem" }}>
                          기본 점수:
                        </FormLabel>
                      </div>
                    </Col>
                    <Col>
                      <div>
                        <FormControl
                          value={score}
                          onChange={(e) => setScore(e.target.value)}
                        ></FormControl>
                      </div>
                    </Col>
                  </Row>
                </Row>
              </FormGroup>
            </Col>
          </Row>

          <hr className="mb-4" />

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
              {choice.map((item, index) => (
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
                    <option value="1">100%</option>
                    <option value="0.9">90%</option>
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
                    <option value="0.125">12.5%</option>
                    <option value="0.1">10%</option>
                    <option value="0.05">5%</option>
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
            <Button
              variant="outline-primary"
              onClick={handleQuestionSaveButton}
            >
              저장
            </Button>
          </div>
        </Col>

        {/*모달*/}
        <Modal show={modalShow} onHide={() => setModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>저장 여부 확인</Modal.Title>
          </Modal.Header>
          <Modal.Body>저장하지 않고 돌아가시겠습니까?</Modal.Body>
          <Modal.Footer>
            <Button variant="outline-dark" onClick={() => setModalShow(false)}>
              취소
            </Button>

            <Button
              variant="outline-danger"
              onClick={() =>
                navigate(`/competency/assessment/admin/${assessmentSeq}`)
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
