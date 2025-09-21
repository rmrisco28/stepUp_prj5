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

  const [questionList, setQuestionList] = useState([]);
  const [choiceList, setChoiceList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const { assessmentSeq } = useParams();

  useEffect(() => {
    // 문제 받아오기
    axios
      .get(`/api/competency/assessment/admin/${assessmentSeq}?${searchParams}`)
      .then((res) => {
        console.log(res.data);
        setTitle(res.data.title[0].caTitle);
        setPageInfo(res.data.questionList.pageInfo);
        setQuestionList(res.data.questionList.questionList);
      });
    // 답 받아오기
    axios
      .get(`/api/competency/assessment/test/choiceList/${assessmentSeq}`)
      .then((res) => {
        console.log(res.data);
        setChoiceList(res.data);
      });
  }, [searchParams]);

  // 페이지 이동, 저장 버튼

  const questionRefs = useRef([]);

  // 페이지 클릭
  function handlePageNumberClick(pageNumber) {
    const responseDtos = Object.entries(response).map(
      ([questionSeq, respObj]) => ({
        seq: respObj.responseSeq ?? null, // 기존 seq 있으면 사용
        studentSeqId: 1,
        questionSeqSeq: Number(questionSeq),
        choiceSeqSeq: Number(respObj.choiceSeq), // 선택한 choice seq
      }),
    );

    console.log("과연", responseDtos);
    axios
      .put(
        `/api/competency/assessment/test/responseSave/${assessmentSeq}`,
        responseDtos,
      )
      .then((res) => {
        console.log("저장완료");

        const nextResponse = { ...response };
        res.data.forEach((item) => {
          nextResponse[item.questionSeq] = {
            ...nextResponse[item.questionSeq],
            responseSeq: item.responseSeq, // 새로 생성되었거나 업데이트된 seq
          };
        });
        setResponse(nextResponse);
      });

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("p", pageNumber);
    setSearchParams(nextSearchParams);

    // 페이지 이동 후 맨 위로
    window.scrollTo(0, 0);

    // 페이지 답안 초기화
    setPageResponse({});
  }

  useEffect(() => {
    const newPageResponse = {};
    questionList.forEach((q) => {
      if (response[q.seq]) {
        newPageResponse[q.seq] = {
          choiceSeq: response[q.seq].choiceSeq,
          responseSeq: response[q.seq].responseSeq,
        };
      }
    });
    setPageResponse(newPageResponse);
  }, [questionList, response]);

  function handelSaveButton() {
    const responseDtos = Object.entries(response).map(
      ([questionSeq, respObj]) => ({
        seq: respObj.responseSeq ?? null, // 기존 seq 있으면 사용
        studentSeqId: 1,
        questionSeqSeq: Number(questionSeq),
        choiceSeqSeq: Number(respObj.choiceSeq), // 선택한 choice seq
      }),
    );
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

        navigate(`/competency/assessment/test/result/${assessmentSeq}`);
      });

    // 페이지 답안 초기화
    setPageResponse({});
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
                        onChange={() => {
                          setPageResponse((prev) => ({
                            ...prev,
                            [item.seq]: {
                              choiceSeq: choice.seq,
                              responseSeq: prev[item.seq]?.responseSeq ?? null,
                            },
                          }));

                          setResponse((prev) => ({
                            ...prev,
                            [item.seq]: {
                              choiceSeq: choice.seq,
                              responseSeq: prev[item.seq]?.responseSeq ?? null, // 기존 seq 유지
                            },
                          }));

                          const next = questionRefs.current[qIndex + 1];

                          if (next) {
                            const scrollY = window.scrollY; // 현재 스크롤 위치
                            const targetY = next.offsetTop; // 다음 질문의 위치

                            const delta = targetY - scrollY; // 이동할 거리
                            const halfDelta = delta / 2; // 절반만 이동

                            window.scrollTo({
                              top: scrollY + halfDelta,
                              behavior: "smooth",
                            });
                          }
                        }}
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
      <Row className="my-3">
        <Col>
          <Pagination className="justify-content-center">
            <Pagination.Prev
              disabled={pageInfo.currentPageNumber === 1}
              onClick={() =>
                handlePageNumberClick(pageInfo.currentPageNumber - 1)
              }
            >
              이전
            </Pagination.Prev>
            <Pagination.Next
              disabled={pageInfo.currentPageNumber === pageInfo.totalPages}
              onClick={() =>
                handlePageNumberClick(pageInfo.currentPageNumber + 1)
              }
            >
              다음
            </Pagination.Next>
          </Pagination>
        </Col>
      </Row>
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
