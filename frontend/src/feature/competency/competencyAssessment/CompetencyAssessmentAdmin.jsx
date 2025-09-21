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

  const navigate = useNavigate();

  const { assessmentSeq } = useParams();

  useEffect(() => {
    axios
      .get(`/api/competency/assessment/admin/${assessmentSeq}?${searchParams}`)
      .then((res) => {
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

  return (
    <>
      <Row className="justify-content-center">
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
              </tr>
            </thead>
            <tbody>
              {questionList && questionList.length > 0 ? (
                questionList.map((data) => (
                  <tr
                    key={data.seq}
                    valign="middle"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleQuestionEditButton(data.questionNum)}
                  >
                    <td
                      style={{
                        textAlign: "center",
                        width: "7%",
                      }}
                    >
                      {/*문제 번호*/}
                      {data.questionNum}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "15%",
                      }}
                    >
                      {/*핵심역량*/}
                      {data.subCompetencySeqCompetencySeqCompetencyName}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "15%",
                      }}
                    >
                      {/*하위역량*/}
                      {data.subCompetencySeqSubCompetencyName}
                    </td>
                    {/* 문제 */}
                    <td>{data.question}</td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "7%",
                      }}
                    >
                      {/*배점*/}
                      {data.score}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>문제가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </Table>
          <Row>
            <Col>
              {totalScore && totalScore.length > 0 ? (
                <h3 style={{ margin: "10px", marginLeft: "30px" }}>
                  총점: {totalScoreSum}점
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
            {/*진단 목록 "{selectAssment.caTitle}" 을 삭제하시겠습니까?*/}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-dark" onClick={() => setModalShow(false)}>
              취소
            </Button>

            <Button
              variant="outline-danger"
              onClick={() => {
                // if (selectAssment) {
                //   handleDeleteButton(selectAssment.seq); // 삭제 처리 함수 호출
                // }
              }}
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
