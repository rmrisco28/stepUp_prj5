import {
  Button,
  Col,
  Modal,
  Pagination,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router";

export function CompetencyAssessmentAdmin() {
  const [assessment, setAssessment] = useState("");
  const [pageInfo, setPageInfo] = useState(null);
  const [questionList, setQuestionList] = useState([]);
  const [totalScore, setTotalScore] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const [questionModalShow, setQuestionModalShow] = useState(false);

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
      .get(`/api/competency/assessment/admin/${assessmentSeq}?${searchParams}`)
      .then((res) => {
        console.log("총 내용", res.data);
        setAssessment(res.data.title[0]);
        console.log("문제 목록", res.data.questionList);
        setQuestionList(res.data.questionList.questionList);
        console.log("페이지", res.data.questionList.pageInfo);
        setPageInfo(res.data.questionList.pageInfo);
        console.log("총점", res.data.totalScore);
        setTotalScore(res.data.totalScore);
      })
      .catch((err) => {
        console.log("no");
      })
      .finally(() => {
        console.log("finally");
      });
  }, [assessmentSeq, searchParams]);

  if (!assessment) {
    return <Spinner />;
  }
  // 총점 계산기
  const totalScoreSum = totalScore.reduce(
    (acc, question) => acc + question.score,
    0,
  );

  const totalScoreRounded = totalScoreSum.toFixed(1);

  function handleQuestionEditButton(questionNum) {
    navigate(`questionEdit/${questionNum}`);
  }

  function handlePageNumberClick(pageNumber) {
    // console.log(pageNumber + "페이지로 이동");
    // navigate(`/?p=${pageNumber}`);
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("p", pageNumber);
    setSearchParams(nextSearchParams);
  }

  const pageNumbers = [];
  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
  }

  function handleQuestionDeleteButton(question) {
    axios
      .delete(
        `/api/competency/assessment/admin/${assessmentSeq}/${question.seq}`,
      )
      .then((res) => {
        console.log("문제 삭제 완료", res.data);
        setQuestionModalShow(false);
        alert("문제가 삭제되었습니다.");
        window.location.reload();
      })
      .catch((err) => {
        console.log("문제삭제 실패", err.response);
      });
  }

  function handleAssessmentDeleteButton() {
    axios
      .delete(`/api/competency/assessment/admin/${assessmentSeq}`)
      .then((res) => {
        console.log("진단 목록 삭제 완료", res.data);
        setModalShow(false);
        alert("삭제가 완료되었습니다.");
        navigate("competency/assessment");
      })
      .catch((err) => {
        console.log("목록 삭제 실패 ", err.response);
      });
  }

  return (
    <>
      <Row className="justify-content-center my-5">
        <Col xs={10} md={8} lg={6}>
          <Row className="d-flex justify-content-between align-items-center mb-3">
            <Col xs="auto">
              <h2 className="mb-3"> {assessment.caTitle}</h2>
            </Col>
            <Col xs="auto" className="d-flex gap-2">
              <Button
                variant="outline-warning"
                onClick={() => navigate("edit")}
              >
                수정
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => setModalShow(true)}
              >
                삭제
              </Button>
            </Col>
          </Row>
          <Table striped={true} hover={true}>
            <thead>
              <tr
                style={{
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                <th>번호</th>
                <th>핵심역량</th>
                <th>하위역량</th>
                <th>문제</th>
                <th>배점</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {questionList && questionList.length > 0 ? (
                questionList.map((data) => (
                  <tr
                    key={data.seq}
                    valign="middle"
                    style={{ cursor: "pointer" }}
                  >
                    <td
                      style={{
                        textAlign: "center",
                        width: "7%",
                      }}
                      onClick={() => handleQuestionEditButton(data.questionNum)}
                    >
                      {/*문제 번호*/}
                      {data.questionNum}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "15%",
                      }}
                      onClick={() => handleQuestionEditButton(data.questionNum)}
                    >
                      {/*핵심역량*/}
                      {data.subCompetencySeqCompetencySeqCompetencyName}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "15%",
                      }}
                      onClick={() => handleQuestionEditButton(data.questionNum)}
                    >
                      {/*하위역량*/}
                      {data.subCompetencySeqSubCompetencyName}
                    </td>
                    {/* 문제 */}
                    <td
                      onClick={() => handleQuestionEditButton(data.questionNum)}
                    >
                      {data.question}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "7%",
                      }}
                      onClick={() => handleQuestionEditButton(data.questionNum)}
                    >
                      {/*배점*/}
                      {data.score}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "10%",
                      }}
                    >
                      <Button
                        variant="danger"
                        onClick={() => setQuestionModalShow(data)}
                      >
                        삭제
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>문제가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </Table>
          <Row>
            <Col>
              {totalScore && totalScore.length > 0 ? (
                <h3 style={{ margin: "10px", marginLeft: "30px" }}>
                  총점: {totalScoreRounded}점
                </h3>
              ) : (
                <h3> 총점 정보가 없습니다.</h3>
              )}
            </Col>
            <Col>
              <div
                className="d-flex justify-content-end"
                style={{ margin: "10px", marginRight: "30px" }}
              >
                <Button
                  variant="outline-primary"
                  onClick={() => navigate("questionAdd")}
                >
                  문제 추가
                </Button>
              </div>
            </Col>
          </Row>
        </Col>

        {/*모달*/}
        <Modal show={modalShow} onHide={() => setModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>진단 목록 삭제 확인</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
              진단 목록 "{assessment ? assessment.caTitle : "Loading..."}"
              을(를) 삭제하시겠습니까?
              <br />
              속해있는 모든 문제와 선택지가 함께 삭제되며, 검사 진행 자료도 함께
              삭제됩니다.
            </>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-dark" onClick={() => setModalShow(false)}>
              취소
            </Button>

            <Button
              variant="outline-danger"
              onClick={() => {
                handleAssessmentDeleteButton();
              }}
            >
              삭제
            </Button>
          </Modal.Footer>
        </Modal>

        {/* 문제 삭제 모달*/}
        <Modal
          show={questionModalShow}
          onHide={() => setQuestionModalShow(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>문제 삭제 확인</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {questionModalShow && (
              <>
                {questionModalShow.questionNum}번 문제 "
                {questionModalShow.question}" 을(를) 삭제하시겠습니까?
                <br />
                속해있는 선택지까지 모두 삭제됩니다.
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-dark"
              onClick={() => setQuestionModalShow(false)}
            >
              취소
            </Button>

            <Button
              variant="outline-danger"
              onClick={() => handleQuestionDeleteButton(questionModalShow)}
            >
              삭제
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>

      {/*페이지 네이션*/}
      <Row className="my-3">
        <Col>
          <Pagination className="justify-content-center">
            <Pagination.First
              disabled={pageInfo.currentPageNumber === 1}
              onClick={() => handlePageNumberClick(1)}
            ></Pagination.First>
            <Pagination.Prev
              disabled={pageInfo.leftPageNumber <= 1}
              onClick={() => handlePageNumberClick(pageInfo.leftPageNumber - 5)}
            ></Pagination.Prev>
            {pageNumbers.map((pageNumber) => (
              <Pagination.Item
                key={pageNumber}
                onClick={() => handlePageNumberClick(pageNumber)}
                active={pageInfo.currentPageNumber === pageNumber}
              >
                {pageNumber}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={pageInfo.rightPageNumber >= pageInfo.totalPages}
              onClick={() =>
                handlePageNumberClick(pageInfo.rightPageNumber + 1)
              }
            ></Pagination.Next>
            <Pagination.Last
              disabled={pageInfo.currentPageNumber === pageInfo.totalPages}
              onClick={() => handlePageNumberClick(pageInfo.totalPages)}
            ></Pagination.Last>
          </Pagination>
        </Col>
      </Row>
    </>
  );
}
