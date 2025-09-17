import { Button, Col, Modal, Row, Spinner, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

export function CompetencyAssessmentAdmin() {
  const [assessment, setAssessment] = useState("");
  const [questionList, setQuestionList] = useState([]);

  const [modalShow, setModalShow] = useState(false);

  const navigate = useNavigate();

  const { assessmentSeq } = useParams();

  useEffect(() => {
    axios
      .get(`/api/competency/assessment/admin/${assessmentSeq}`)
      .then((res) => {
        console.log("yes");
        console.log("받아온 값", res.data);
        console.log("title값", res.data.title);
        setAssessment(res.data.title[0]);
        console.log("문제 목록", res.data.questionList);

        setQuestionList(res.data.questionList);
      })
      .catch((err) => {
        console.log("no");
      })
      .finally(() => {
        console.log("finally");
      });
  }, [assessmentSeq]);

  // 총점 계산기
  const totalScore = questionList.reduce((sum, data) => {
    return sum + (data.score || 0);
  }, 0);

  if (!assessment) {
    return <Spinner />;
  }

  function handleQuestionEditButton(questionNum) {
    navigate(`questionEdit/${questionNum}`);
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
              <h3 style={{ margin: "20px", marginLeft: "30px" }}>
                총점: {totalScore}
              </h3>
            </Col>
            <Col>
              <div
                className="d-flex justify-content-end"
                style={{ margin: "20px", marginRight: "30px" }}
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
    </>
  );
}
