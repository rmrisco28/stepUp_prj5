import { Button, Col, Row } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { useState } from "react";
import { useNavigate } from "react-router";

export function Competency() {
  let navigate = useNavigate();

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="mb-4"></div>
          <h2 className="text-center mb-5">핵심 역량 안내</h2>
          <h4>○○○대학교 핵심 역량 정의</h4>
          {/* 게시물 작성 editor 버튼*/}
          <Button onClick={() => navigate("/competency/editor")}>
            게시물 수정
          </Button>
        </Col>
      </Row>
    </>
  );
}
