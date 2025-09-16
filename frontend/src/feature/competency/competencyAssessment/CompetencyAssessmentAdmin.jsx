import { Button, Col, Modal, Row, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export function CompetencyAssessmentAdmin() {
  const [questionList, setQuestionList] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .get(`/api/competency/assessment/admin/:seq`)
  //     .then((res) => {
  //       console.log("yes");
  //       console.log(res.data);
  //       setQuestionList(res.data);
  //     })
  //     .catch((err) => {
  //       console.log("no");
  //     })
  //     .finally(() => {
  //       console.log("finally");
  //     });
  // }, []);

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={10} md={8} lg={6}>
          <Row className="d-flex justify-content-between align-items-center">
            <Col xs="auto">
              <h2>진단 관리</h2>
            </Col>
            <Col xs="auto" className="d-flex gap-2">
              <Button variant="outline-warning" onClick={() => navigate("")}>
                수정
              </Button>
              <Button variant="outline-danger" onClick={() => navigate("")}>
                삭제
              </Button>
            </Col>
          </Row>

          <Table>
            <thead>
              <tr
                style={{
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                <th>번호</th>
                <th>문제</th>
                <th>배점</th>
                <th>사용여부</th>
              </tr>
            </thead>
            <tbody>
              <tr
                style={{
                  verticalAlign: "middle",
                }}
              >
                <td
                  style={{
                    textAlign: "center",
                  }}
                >
                  1
                </td>
                <td>1. 다음 중 일어나는시간은?</td>
                <td
                  style={{
                    textAlign: "center",
                  }}
                >
                  5.0
                </td>
                <td
                  style={{
                    textAlign: "center",
                  }}
                >
                  <input type="checkbox" />
                </td>
              </tr>
            </tbody>
          </Table>
          <div
            className="d-flex justify-content-end"
            style={{ marginTop: "30px" }}
          >
            <Button
              variant="outline-primary"
              onClick={() => navigate("questionAdd")}
            >
              문제 추가
            </Button>
          </div>
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
