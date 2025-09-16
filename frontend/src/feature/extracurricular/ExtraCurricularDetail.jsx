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
              <FormGroup className="mb-3">
                <FormLabel>제목</FormLabel>
                <FormControl type="text" value={program.title} readOnly />
              </FormGroup>

              <FormGroup className="mb-3">
                <FormLabel>내용</FormLabel>
                <FormControl
                  as="textarea"
                  rows={5}
                  value={program.content}
                  readOnly
                />
              </FormGroup>

              <Row className="mb-3">
                <Col>
                  <FormGroup>
                    <FormLabel>운영 시작일</FormLabel>
                    <FormControl
                      type="text"
                      value={program.operateStartDt.replace("T", " ")}
                      readOnly
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <FormLabel>운영 종료일</FormLabel>
                    <FormControl
                      type="text"
                      value={program.operateEndDt.replace("T", " ")}
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <FormGroup>
                    <FormLabel>신청 시작일</FormLabel>
                    <FormControl
                      type="text"
                      value={program.applyStartDt.replace("T", " ")}
                      readOnly
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <FormLabel>신청 종료일</FormLabel>
                    <FormControl
                      type="text"
                      value={program.applyEndDt.replace("T", " ")}
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <FormGroup>
                    <FormLabel>역량</FormLabel>
                    <FormControl
                      type="text"
                      value={program.competency}
                      readOnly
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <FormLabel>장소</FormLabel>
                    <FormControl
                      type="text"
                      value={program.location}
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <FormGroup>
                    <FormLabel>운영 형태</FormLabel>
                    <FormControl
                      type="text"
                      value={program.operationType}
                      readOnly
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <FormLabel>대상 학년</FormLabel>
                    <FormControl type="text" value={program.grades} readOnly />
                  </FormGroup>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <FormGroup>
                    <FormLabel>정원</FormLabel>
                    <FormControl
                      type="number"
                      value={program.capacity}
                      readOnly
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <FormLabel>신청자 수</FormLabel>
                    <FormControl
                      type="number"
                      value={program.applicants}
                      readOnly
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <FormLabel>대기자 수</FormLabel>
                    <FormControl
                      type="number"
                      value={program.waiting}
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <FormGroup>
                    <FormLabel>상태</FormLabel>
                    <FormControl type="text" value={program.status} readOnly />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <FormLabel>마일리지</FormLabel>
                    <FormControl
                      type="number"
                      value={program.mileagePoints}
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <FormGroup>
                    <FormLabel>담당자</FormLabel>
                    <FormControl type="text" value={program.manager} readOnly />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <FormLabel>담당자 전화번호</FormLabel>
                    <FormControl
                      type="text"
                      value={program.managerPhone}
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <FormGroup>
                    <FormLabel>작성자</FormLabel>
                    <FormControl type="text" value={program.author} readOnly />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <FormLabel>생성일</FormLabel>
                    <FormControl
                      type="text"
                      value={program.createdAt
                        .replace("T", " ")
                        .replace("Z", "")}
                      readOnly
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <FormLabel>수정일</FormLabel>
                    <FormControl
                      type="text"
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
        <Row className="text-end mt-4">
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
