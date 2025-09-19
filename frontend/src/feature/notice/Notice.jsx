import { Col, Row } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export function Notice() {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  function NoticeAddButton() {
    navigate("/board/notice/add");
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <div>공지사항</div>
        {/*공지사항 리스트*/}
        <button onClick={NoticeAddButton}>공지사항 추가</button>
      </Col>
    </Row>
  );
}
