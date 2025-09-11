import { Button, Col, Modal, Row } from "react-bootstrap";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router";

export function CompetencyEditor() {
  const [editorValue, setEditorValue] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const navigate = useNavigate();

  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={10} md={8} lg={6}>
          <h2>React Quill Editor</h2>
          <ReactQuill
            value={editorValue}
            onChange={handleEditorChange}
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ align: [] }],
                ["bold", "italic", "underline"],
                ["image"],
                ["blockquote"],
                ["code-block"],
              ],
            }}
            formats={[
              "header",
              "font",
              "list",
              "align",
              "bold",
              "italic",
              "underline",
              "image",
              "blockquote",
              "code-block",
            ]}
          />
          <div style={{ marginTop: "20px" }}>
            <h3>Editor Output:</h3>
            <div>{editorValue}</div>
          </div>
          <div className="d-flex justify-content-end">
            <Button
              variant="outline-danger"
              className="me-3"
              onClick={() => setModalShow(true)}
            >
              뒤로
            </Button>
            <Button variant="outline-primary">저장</Button>
          </div>
        </Col>

        {/* 취소 모달*/}
        <Modal show={modalShow} onHide={() => setModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>저장 여부 확인</Modal.Title>
          </Modal.Header>
          <Modal.Body>저장하지않고 이동하시겠습니까?</Modal.Body>
          <Modal.Footer>
            <Button variant="outline-dark" onClick={() => setModalShow(false)}>
              뒤로
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                navigate("/competency");
              }}
            >
              목록으로
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </>
  );
}
