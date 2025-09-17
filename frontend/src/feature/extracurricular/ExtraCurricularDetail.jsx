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
  Spinner,
} from "react-bootstrap";
import axios from "axios";

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

  useEffect(() => {
    axios
      .get(`/api/extracurricular/detail/${seq}`)
      .then((res) => {
        setProgram(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("always");
      });
  }, []);

  if (!program) {
    return <Spinner />;
  }

  return (
    <Container className="mt-4 my-5" style={{ maxWidth: "1000px" }}>
      <h3 className="text-primary fw-bold mb-3">
        {program.seq}번 프로그램 정보
      </h3>
      <Form>
        <section
          style={{ backgroundColor: "#e9ecef" }}
          className="px-3 py-3 rounded-4"
        >
          <Row className="mb-3">
            <Col>
              <FormGroup className="mb-3" controlId="title">
                <FormLabel>제목</FormLabel>
                <FormControl
                  type="text"
                  name="title"
                  value={program.title}
                  readOnly
                />
              </FormGroup>

              <FormGroup className="mb-3" controlId="content">
                <FormLabel>내용</FormLabel>
                <FormControl
                  as="textarea"
                  name="content"
                  rows={5}
                  value={program.content}
                  readOnly
                />
              </FormGroup>

              <Row className="mb-3">
                <Col>
                  <FormGroup controlId="operationStartDt">
                    <FormLabel>운영 시작일</FormLabel>
                    <FormControl
                      type="text"
                      name="operationStartDt"
                      value={program.operateStartDt.replace("T", " ")}
                      readOnly
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup controlId="operationEndDt">
                    <FormLabel>운영 종료일</FormLabel>
                    <FormControl
                      type="text"
                      name="operationEndDt"
                      value={program.operateEndDt.replace("T", " ")}
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <FormGroup controlId="applyStartDt">
                    <FormLabel>신청 시작일</FormLabel>
                    <FormControl
                      type="text"
                      name="applyStartDt"
                      value={program.applyStartDt.replace("T", " ")}
                      readOnly
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup controlId="applyEndDt">
                    <FormLabel>신청 종료일</FormLabel>
                    <FormControl
                      type="text"
                      name="applyEndDt"
                      value={program.applyEndDt.replace("T", " ")}
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <FormGroup controlId="competency">
                    <FormLabel>역량</FormLabel>
                    <FormControl
                      type="text"
                      name="competency"
                      value={program.competency}
                      readOnly
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup controlId="location">
                    <FormLabel>장소</FormLabel>
                    <FormControl
                      type="text"
                      name="location"
                      value={program.location}
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <FormGroup controlId="operationType">
                    <FormLabel>운영 형태</FormLabel>
                    <FormControl
                      type="text"
                      name="operationType"
                      value={program.operationType}
                      readOnly
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup controlId="grades">
                    <FormLabel>대상 학년</FormLabel>
                    <FormControl
                      type="text"
                      name="grades"
                      value={program.grades}
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <FormGroup controlId="capacity">
                    <FormLabel>모집정원</FormLabel>
                    <FormControl
                      type="number"
                      name="capacity"
                      value={program.capacity}
                      readOnly
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup controlId="applicants">
                    <FormLabel>신청자 수</FormLabel>
                    <FormControl
                      type="number"
                      name="applicants"
                      value={program.applicants}
                      readOnly
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup controlId="waiting">
                    <FormLabel>대기자 수</FormLabel>
                    <FormControl
                      type="number"
                      name="waiting"
                      value={program.waiting}
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <FormGroup controlId="status">
                    <FormLabel>상태</FormLabel>
                    <FormControl
                      type="text"
                      name="status"
                      value={program.status}
                      readOnly
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup controlId="mileagePoints">
                    <FormLabel>마일리지 점수</FormLabel>
                    <FormControl
                      type="number"
                      name="mileagePoint"
                      value={program.mileagePoints}
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <FormGroup controlId="manager">
                    <FormLabel>담당자</FormLabel>
                    <FormControl
                      type="text"
                      name="manager"
                      value={program.manager}
                      readOnly
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup controlId="managerPhone">
                    <FormLabel>담당자 전화번호</FormLabel>
                    <FormControl
                      type="text"
                      name="managerPhone"
                      value={program.managerPhone}
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <FormGroup controlId="author">
                    <FormLabel>작성자</FormLabel>
                    <FormControl
                      type="text"
                      name="author"
                      value={program.author}
                      readOnly
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup controlId="createdAt">
                    <FormLabel>등록일시</FormLabel>
                    <FormControl
                      type="text"
                      name="createdAt"
                      value={program.createdAt
                        .replace("T", " ")
                        .replace("Z", "")}
                      readOnly
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup controlId="updatedAt">
                    <FormLabel>수정일시</FormLabel>
                    <FormControl
                      type="text"
                      name="updatedAt"
                      value={program.updatedAt
                        .replace("T", " ")
                        .replace("Z", "")}
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
        </section>
        <Row className="text-end mt-3">
          <Col>
            <Button
              className="me-3"
              variant="outline-primary"
              onClick={() =>
                navigate(`/extracurricular/edit/${program.seq}?page=${page}`)
              }
            >
              수정
            </Button>
            <Button variant="outline-danger" onClick={handleRedirectToList}>
              삭제
            </Button>
          </Col>
        </Row>
        <Row className="text-end mt-2">
          <Col>
            <Button variant="secondary" onClick={handleRedirectToList}>
              목록
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
