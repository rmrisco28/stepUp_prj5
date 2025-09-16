import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  FormControl,
  FormLabel,
  FormGroup,
} from "react-bootstrap";

export function ExtraCurricularDetail() {
  const [program, setProgram] = useState(null);
  const [params] = useSearchParams();
  const { seq } = useParams(); // URL 파라미터

  const navigate = useNavigate();

  const page = params.get("page");

  const handleRedirectToList = () => {
    if (page && page !== "1") {
      navigate(`/extracurricular/manage?page=${page}`);
    } else {
      navigate(`/extracurricular/manage`);
    }
  };

  return (
    <Container className="mt-4 my-5" style={{ maxWidth: "1000px" }}>
      <h3 className="text-primary fw-bold">프로그램 상세보기</h3>
      <Form>
        <Row className="mb-3">
          <Col>
            <FormGroup className="mb-3">
              <FormLabel>제목</FormLabel>
              <FormControl type="text" disabled />
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel>내용</FormLabel>
              <FormControl as="textarea" rows={5} disabled />
            </FormGroup>

            <Row className="mb-3">
              <Col>
                <FormGroup>
                  <FormLabel>운영 시작일</FormLabel>
                  <FormControl type="text" disabled />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel>운영 종료일</FormLabel>
                  <FormControl type="text" disabled />
                </FormGroup>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <FormGroup>
                  <FormLabel>신청 시작일</FormLabel>
                  <FormControl type="text" disabled />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel>신청 종료일</FormLabel>
                  <FormControl type="text" disabled />
                </FormGroup>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <FormGroup>
                  <FormLabel>역량</FormLabel>
                  <FormControl type="text" disabled />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel>장소</FormLabel>
                  <FormControl type="text" disabled />
                </FormGroup>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <FormGroup>
                  <FormLabel>운영 형태</FormLabel>
                  <FormControl type="text" disabled />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel>대상 학년</FormLabel>
                  <FormControl type="text" disabled />
                </FormGroup>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <FormGroup>
                  <FormLabel>정원</FormLabel>
                  <FormControl type="number" disabled />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel>신청자 수</FormLabel>
                  <FormControl type="number" disabled />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel>대기자 수</FormLabel>
                  <FormControl type="number" disabled />
                </FormGroup>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <FormGroup>
                  <FormLabel>상태</FormLabel>
                  <FormControl type="text" disabled />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel>마일리지</FormLabel>
                  <FormControl type="number" disabled />
                </FormGroup>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <FormGroup>
                  <FormLabel>담당자</FormLabel>
                  <FormControl type="text" disabled />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel>담당자 전화번호</FormLabel>
                  <FormControl type="text" disabled />
                </FormGroup>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <FormGroup>
                  <FormLabel>작성자</FormLabel>
                  <FormControl type="text" disabled />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel>생성일</FormLabel>
                  <FormControl type="text" disabled />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel>수정일</FormLabel>
                  <FormControl type="text" disabled />
                </FormGroup>
              </Col>
            </Row>

            <Button variant="secondary" onClick={handleRedirectToList}>
              목록
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
