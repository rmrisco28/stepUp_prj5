import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Modal,
  Row,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

export function CompetencyAssessmentAdminQuestionEdit() {
  const [modalShow, setModalShow] = useState(false);
  const [question, setQuestion] = useState("");
  const [competency, setCompetency] = useState([]);
  const [subCompetency, setSubCompetency] = useState([]);
  const [selectedCompetency, setSelectedCompetency] = useState(null);
  const [selectedSubCompetency, setSelectedSubCompetency] = useState(null);
  const [choice, setChoice] = useState([``]);
  const [score, setScore] = useState(1);
  const [point, setPoint] = useState([0.0, 0.0, 0.0]);
  const [caSeqSeq, setCaSeqSeq] = useState("");
  const { questionNum } = useParams();
  const [questionNumState, setQuestionNumState] = useState("");
  const [order, setOrder] = useState([``]);
  const [choiceSeq, setChoiceSeq] = useState([``]);
  const [seq, setSeq] = useState("");
  const [originalChoiceSeq, setOriginalChoiceSeq] = useState([]);

  const navigate = useNavigate();
  const { assessmentSeq } = useParams();

  useEffect(() => {
    if (questionNum) {
      setQuestionNumState(questionNum);
    }
  }, [questionNum]);

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
    // 문제 정보 가져오기
    axios
      .get(
        `/api/competency/assessment/admin/${assessmentSeq}/questionEdit/${questionNum}`,
      )
      .then((res) => {
        console.log(res.data);
        setSeq(res.data.seq);
        setCaSeqSeq(res.data.caSeqSeq);
        setQuestion(res.data.question);
        setQuestionNumState(res.data.questionNum);
        setScore(res.data.score);
        setSelectedCompetency(res.data.subCompetencySeqCompetencySeqSeq);
        setSelectedSubCompetency(res.data.subCompetencySeqSeq);
      });

    // 선택지 정보 가져오기
    axios
      .get(
        `/api/competency/assessment/admin/${assessmentSeq}/choiceEdit/${questionNum}`,
      )
      .then((res) => {
        console.log(res.data);
        const choices = res.data;
        const choiceSeqArray = choices.map((choice) => choice.seq);

        setChoiceSeq(choices.map((choice) => choice.seq));
        setOriginalChoiceSeq([...choiceSeqArray]); // 원본 저장!
        setOrder(choices.map((choice) => choice.order));
        setChoice(choices.map((choice) => choice.option));
        setPoint(choices.map((choice) => choice.point));
      });
  }, [assessmentSeq, questionNum]);

  // 보기 추가 함수
  const addAnswer = () => {
    setChoice([...choice, ""]); // 보기 추가
    setPoint([...point, 0.0]); // 배점 추가
    setOrder([...order, order.length + 1]);
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

  // 문제 업데이트 저장
  function handleQuestionSaveButton() {
    const validChoices = choice.filter((item) => item.trim() !== ""); // 빈 값 제외
    const validPoints = point.filter((item) => item !== null && item !== 0.0); // 배점 값도 0.0 또는 null인 값 제외

    // 보기에 맞춰서 점수 업데이트
    while (validChoices.length < validPoints.length) {
      validPoints.pop(); // 배점 항목을 줄임
    }

    // 점수에 맞춰서 보기 항목을 줄임
    while (validChoices.length > validPoints.length) {
      validChoices.pop(); // 보기 항목을 줄임
    }

    // 문제 업데이트
    axios
      .put(
        `/api/competency/assessment/admin/${assessmentSeq}/questionUpdate/${questionNum}`,
        {
          caSeqSeq: caSeqSeq,
          subCompetencySeqSeq: selectedSubCompetency,
          questionNum: questionNumState,
          question: question,
          score: score,
        },
      )
      // 성공했을 경우,
      .then((res) => {
        alert(questionNumState);
        const choicePromises = choice.map((item, index) => {
          const validOption = item.trim() === "" ? null : item;

          // 선택지 업데이트
          return axios
            .put(
              `/api/competency/assessment/admin/${assessmentSeq}/choiceUpdate/${questionNum}`,
              {
                seq: choiceSeq[index],
                questionSeqSeq: seq,
                questionSeqQuestionNum: questionNumState,
                order: order[index],
                option: validOption,
                point: point[index],
              },
            )
            .then((res) => {
              console.log("선택지 업데이트 성공");
              console.log(order);
            })
            .catch((err) => {
              console.log(err);
            });
        });

        // 삭제 처리: 원본 choiceSeq와 현재 choice 길이 비교
        const deletePromises = [];
        console.log(
          "originalChoiceSeq.length:",
          originalChoiceSeq.length,
          "choice.length:",
          choice.length,
        );

        if (originalChoiceSeq.length > choice.length) {
          console.log("삭제할 선택지가 있습니다.");
          for (let i = choice.length; i < originalChoiceSeq.length; i++) {
            console.log(
              `인덱스 ${i}의 originalChoiceSeq[${i}]:`,
              originalChoiceSeq[i],
            );
            if (originalChoiceSeq[i]) {
              console.log(`선택지 ${originalChoiceSeq[i]} 삭제 요청 중...`);
              deletePromises.push(
                axios
                  .delete(
                    `/api/competency/assessment/admin/choiceDelete/${originalChoiceSeq[i]}`,
                  )
                  .then((res) => {
                    console.log(
                      `선택지 ${originalChoiceSeq[i]} 삭제 성공:`,
                      res,
                    );
                  })
                  .catch((err) => {
                    console.error(
                      `선택지 ${originalChoiceSeq[i]} 삭제 실패:`,
                      err,
                    );
                  }),
              );
            }
          }
        } else {
          console.log("삭제할 선택지가 없습니다.");
        }

        // 모든 업데이트와 삭제를 함께 처리
        Promise.all([...choicePromises, ...deletePromises])
          .then(() => {
            console.log("모든 선택지 처리 완료");
            alert("성공적으로 문제가 저장되었습니다.");
            navigate(`/competency/assessment/admin/${assessmentSeq}`);
          })
          .catch((err) => {
            console.error("선택지 처리 중 오류 발생:", err);
            alert("선택지 처리 중 오류가 발생했습니다.");
          });
      })

      .catch((err) => {
        console.log("문제 저장 중 오류 발생", err);
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        } else {
          alert("서버와의 통신에 문제가 발생했습니다.");
        }
        // alert(err.response.data.message);
      })
      .finally(() => {
        console.log("finally");
      });
  }

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={10} md={8} lg={6}>
          <h2 className="mb-4">{questionNum}번 문제 수정</h2>

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
                          type="number"
                          value={questionNumState}
                          onChange={(e) => setQuestionNumState(e.target.value)}
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
              as="textarea"
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
