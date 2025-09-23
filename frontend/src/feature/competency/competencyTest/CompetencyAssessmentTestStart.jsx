import {
  Button,
  Col,
  Container,
  FormCheck,
  FormControl,
  FormFloating,
  FormGroup,
  FormLabel,
  Modal,
  Pagination,
  Row,
} from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router";
import FormRange from "react-bootstrap/FormRange";
import FormCheckInput from "react-bootstrap/FormCheckInput";

export function CompetencyAssessmentTestStart() {
  const [modalShow, setModalShow] = useState(false);

  const [title, setTitle] = useState("");
  const [pageInfo, setPageInfo] = useState(null);
  const [response, setResponse] = useState({}); // 전체 답 저장용
  const [pageResponse, setPageResponse] = useState({}); // 현제페이지에 보여질 값
  const [memberSeq, setMemberSeq] = useState("");
  const [totalScore, setTotalScore] = useState("");

  const [questionList, setQuestionList] = useState([]);
  const [choiceList, setChoiceList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

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
              if (response.data) {
                // 검사 완료된 경우
                alert("이미 진단검사를 완료하셨습니다.");
                navigate("/competency/assessment"); // 다른 페이지로 이동
              } else {
                // 아직 검사하지 않은 경우
                console.log("검사할 수 있는 상태입니다.");
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

    // 문제 받아오기
    axios
      .get(`/api/competency/assessment/admin/${assessmentSeq}?${searchParams}`)
      .then((res) => {
        console.log(res.data);
        setTitle(res.data.title[0].caTitle);
        setPageInfo(res.data.questionList.pageInfo);
        setQuestionList(res.data.questionList.questionList);
        setTotalScore(res.data.totalScore);
      });
    // 답 받아오기
    axios
      .get(`/api/competency/assessment/test/choiceList/${assessmentSeq}`)
      .then((res) => {
        console.log(res.data);
        setChoiceList(res.data);
      });
  }, [searchParams]);

  // 답안 불러오기
  useEffect(() => {
    if (!memberSeq || !assessmentSeq || questionList.length === 0) return;

    axios
      .get(
        `/api/competency/assessment/test/response/${assessmentSeq}?memberSeq=${memberSeq}`,
      )
      .then((res) => {
        // res.data가 문자열이면 JSON.parse
        const data =
          typeof res.data === "string" ? JSON.parse(res.data) : res.data;

        console.log("답안 불러오기 성공", data);

        const serverResponse = {};
        data.forEach((r) => {
          serverResponse[r.questionSeqSeq] = {
            choiceSeq: r.choiceSeqSeq,
            responseSeq: r.seq,
          };
        });

        setResponse(serverResponse);
        setPageResponse(serverResponse);
      })
      .catch((err) => {
        console.error("저장된 응답 불러오기 실패", err);
      });
  }, [memberSeq, assessmentSeq, questionList]);
  // 페이지 이동, 저장 버튼

  const questionRefs = useRef([]);

  // 오른쪽 페이지 클릭
  function handleRightPageNumberClick(pageNumber) {
    // 전체 응답 여부 체크
    const firstUnansweredIndex = questionList.findIndex(
      (q) => !pageResponse[q.seq]?.choiceSeq,
    );

    if (firstUnansweredIndex !== -1) {
      alert("모든 문항에 응답해야 페이지를 이동할 수 있습니다.");
      setModalShow(false);
      // 해당 문제로 스크롤 이동
      questionRefs.current[firstUnansweredIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }
    // 답안 저장
    const responseDtos = Object.entries(response).map(([qSeq, r]) => ({
      seq: r.responseSeq ?? null,
      memberSeq,
      questionSeqSeq: Number(qSeq),
      choiceSeqSeq: Number(r.choiceSeq),
    }));

    axios
      .put(
        `/api/competency/assessment/test/responseSave/${assessmentSeq}`,
        responseDtos,
      )
      .then((res) => {
        const updatedResponse = { ...response };
        res.data.forEach((item) => {
          updatedResponse[item.questionSeq] = {
            ...updatedResponse[item.questionSeq],
            responseSeq: item.responseSeq,
          };
        });
        setResponse(updatedResponse);
      });

    // 페이지 이동
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("p", pageNumber);
    setSearchParams(nextSearchParams);
    // 다음 페이지 답안 로딩
    const newPageResponse = {};
    questionList.forEach((q) => {
      if (response[q.seq]) {
        newPageResponse[q.seq] = { ...response[q.seq] };
      }
    });
    setPageResponse(newPageResponse);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // 답 선택시
  function handleChoiceSelect(qSeq, choiceSeq, qIndex) {
    setResponse((prev) => ({
      ...prev,
      [qSeq]: {
        choiceSeq,
        responseSeq: prev[qSeq]?.responseSeq ?? null,
      },
    }));

    setPageResponse((prev) => ({
      ...prev,
      [qSeq]: {
        choiceSeq,
        responseSeq: prev[qSeq]?.responseSeq ?? null,
      },
    }));

    // 다음 문제로 스크롤
    const nextEl = questionRefs.current[qIndex + 1];
    if (nextEl) {
      const halfDelta = (nextEl.offsetTop - window.scrollY) / 2;
      window.scrollTo({ top: window.scrollY + halfDelta, behavior: "smooth" });
    }
  }

  function handelSaveButton() {
    // 전체 응답 여부 체크
    const firstUnansweredIndex = questionList.findIndex(
      (q) => !pageResponse[q.seq]?.choiceSeq,
    );

    if (firstUnansweredIndex !== -1) {
      alert("모든 문항에 응답해야 페이지를 이동할 수 있습니다.");
      setModalShow(false);
      // 해당 문제로 스크롤 이동
      questionRefs.current[firstUnansweredIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    const responseDtos = Object.entries(response).map(([qSeq, r]) => ({
      seq: r.responseSeq ?? null,
      memberSeq,
      questionSeqSeq: Number(qSeq),
      choiceSeqSeq: Number(r.choiceSeq),
    }));

    // 응답(response) 테이블 저장
    axios
      .put(
        `/api/competency/assessment/test/responseSave/${assessmentSeq}`,
        responseDtos,
      )
      .then((res) => {
        console.log("저장완료", responseDtos);
        alert("제출 완료되었습니다.");

        const nextResponse = { ...response };
        res.data.forEach((item) => {
          nextResponse[item.questionSeq] = {
            ...nextResponse[item.questionSeq],
            responseSeq: item.responseSeq, // 새로 생성되었거나 업데이트된 seq
          };
        });
        setResponse(nextResponse);
      })
      .catch((err) => {
        console.error("응답 저장 실패", err);
      });

    // 완료(complete)테이블저장
    axios
      .post(`/api/competency/assessment/test/complete/${assessmentSeq}`, {
        memberSeq: memberSeq,
      })
      .then((res) => {
        console.log("complete에 저장 완료", res.data);
      })
      .catch((err) => {
        console.log(err, "complete에 저장 실패");
      });

    //세부 결과(result) 테이블 저장
    axios
      .post(
        `/api/competency/assessment/test/resultSave/${assessmentSeq}`,
        responseDtos,
      )
      .then((res) => {
        console.log("result에 값 전달완료", res.data);
      })
      .catch((err) => {
        console.log("result 저장 실패 ㅜㅜ ", err);
      });

    // 페이지 답안 초기화
    navigate(`/competency/assessment/test/complete/${assessmentSeq}`);
    setPageResponse((prev) => ({ ...prev }));
  }

  // 페이지 정보가 아직 로딩되지 않았으면 렌더링하지 않음
  if (!title || !pageInfo) {
    return <div>로딩 중...</div>; // 혹은 스피너 컴포넌트 등 로딩 표시
  }

  // 페이지 네이션
  const pageNumbers = [];
  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col xs={10} md={8} lg={6}>
          <h3>{title}</h3>
          <hr />
          {/*문제*/}
          {questionList.map((item, qIndex) => (
            <div
              key={qIndex}
              className="mb-5"
              ref={(el) => (questionRefs.current[qIndex] = el)}
            >
              {/* 문제 */}
              <FormGroup className="mb-3">
                <FormLabel style={{ fontSize: "1.5rem" }}>
                  {item.questionNum}. {item.question}
                </FormLabel>
              </FormGroup>

              {/* 선택지 */}
              {choiceList
                .filter((choice) => item.seq === choice.questionSeqSeq)
                .map((choice, cIndex) => (
                  <FormGroup key={cIndex} className="mb-3">
                    <FormCheck
                      type="radio"
                      id={`choice-${item.seq}-${cIndex}`}
                      className="mb-3"
                    >
                      <FormCheckInput
                        type="radio"
                        name={`question-${item.seq}`}
                        value={choice.seq}
                        checked={
                          pageResponse[item.seq]?.choiceSeq === choice.seq
                        }
                        onChange={() =>
                          handleChoiceSelect(item.seq, choice.seq, qIndex)
                        }
                      />
                      <FormCheck.Label>{choice.option}</FormCheck.Label>
                    </FormCheck>
                  </FormGroup>
                ))}
            </div>
          ))}
        </Col>

        {/*모달*/}
        <Modal show={modalShow} onHide={() => setModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>저장 여부 확인</Modal.Title>
          </Modal.Header>
          <Modal.Body>제출 하시겠습니까?</Modal.Body>
          <Modal.Footer>
            <Button variant="outline-dark" onClick={() => setModalShow(false)}>
              취소
            </Button>

            <Button variant="outline-danger" onClick={handelSaveButton}>
              제출
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>

      {/*페이지 네이션*/}
      {totalScore.length > 20 && (
        <Row className="my-3">
          <Col>
            <Pagination className="justify-content-center">
              <Pagination.Prev
                disabled={pageInfo.currentPageNumber === 1}
                onClick={() =>
                  handleRightPageNumberClick(pageInfo.currentPageNumber - 1)
                }
              >
                이전
              </Pagination.Prev>
              <Pagination.Next
                disabled={pageInfo.currentPageNumber === pageInfo.totalPages}
                onClick={() =>
                  handleRightPageNumberClick(pageInfo.currentPageNumber + 1)
                }
              >
                다음
              </Pagination.Next>
            </Pagination>
          </Col>
        </Row>
      )}

      {pageInfo.currentPageNumber === pageInfo.totalPages && (
        <Row className="d-flex justify-content-center">
          <Col xs={12} md={10} lg={8} className="d-flex justify-content-end">
            <Button onClick={() => setModalShow(true)}>제출하기</Button>
          </Col>
        </Row>
      )}
    </>
  );
}
