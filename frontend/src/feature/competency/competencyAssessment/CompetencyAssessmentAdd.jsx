import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  Row,
} from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export function CompetencyAssessmentAdd() {
  const [title, setTitle] = useState("");
  const [startDttm, setStartDttm] = useState("");
  const [endDttm, setEndDttm] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();

  function handleSaveButton() {
    if (!title.trim() || !startDttm || !endDttm) {
      alert("모든 항목을 입력 후 저장 버튼을 눌러주세요.");
      return;
    }

    if (new Date(startDttm) > new Date(endDttm)) {
      alert("시작일은 종료일보다 늦을 수 없습니다.");
      return;
    }

    setIsProcessing(true);

    axios
      .post("/api/competency/assessment/add", {
        caTitle: title,
        startDttm: startDttm,
        endDttm: endDttm,
      })
      .then((res) => {
        console.log("ok");
        alert(res.data.message);
        navigate("/competency/assessment");
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log("error");
      })
      .finally(() => {
        console.log("finally");
        setIsProcessing(false);
      });
  }

  return (
    <>
      <Row className="justify-content-center my-5">
        <Col xs={10} md={8} lg={4}>
          <h2 className="mb-4">역량 진단 추가</h2>

          {/*역량 진단 제목*/}
          <FormGroup className="mb-3" controlId="name">
            <FormLabel style={{ fontSize: "1.5rem" }}>제목</FormLabel>
            <FormControl
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
          {/*진단 시작일*/}
          <Row>
            <Col>
              <FormGroup className="mb-3">
                <FormLabel>진단 시작일</FormLabel>
                <FormControl
                  type="date"
                  name="startDttm"
                  onChange={(e) => setStartDttm(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="mb-3">
                <FormLabel>진단 종료일</FormLabel>
                <FormControl
                  type="date"
                  name="endDttm"
                  onChange={(e) => setEndDttm(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>

          <div className="d-flex justify-content-end">
            <Button
              className="me-2"
              variant="outline-secondary"
              onClick={() => setModalShow(true)}
            >
              뒤로
            </Button>
            <Button variant="outline-success" onClick={handleSaveButton}>
              저장
            </Button>
          </div>
        </Col>

        {/*뒤로 모달*/}
        <Modal show={modalShow} onHide={() => setModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>역량 진단 저장</Modal.Title>
          </Modal.Header>
          <Modal.Body>저장하지 않고 이동하시겠습니까?</Modal.Body>
          <Modal.Footer>
            <Button variant="outline-dark" onClick={() => setModalShow(false)}>
              아니요
            </Button>

            <Button
              variant="outline-danger"
              onClick={() => navigate("/competency/assessment")}
            >
              이동
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </>
  );
}
