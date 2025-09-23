import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  Image,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import axios from "axios";

export function ExtraCurricularDetail() {
  const [program, setProgram] = useState(null);
  const [applyStudents, setApplyStudents] = useState(null);
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
        console.log(res.data);
        setProgram(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("always");
      });
  }, []);

  useEffect(() => {
    axios
      .get(`/api/extracurricular/applyStudentList/${seq}`)
      .then((res) => {
        console.log(res.data);
        setApplyStudents(res.data);
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

  function handleDeleteButtonCLick() {
    // 확인 창 띄우기
    const confirmed = window.confirm("프로그램을 삭제하시겠습니까?");
    if (!confirmed) return; // 취소 시 종료

    // 삭제 요청
    axios
      .delete(`/api/extracurricular/delete/${program.seq}`)
      .then((res) => {
        alert("삭제가 완료되었습니다.");
        // 삭제 후 목록으로 이동 (페이지 유지)
        navigate(`/extracurricular/manage?page=${page || 1}`);
      })
      .catch((err) => {
        console.error("삭제 실패", err);
        alert("삭제 중 오류가 발생했습니다.");
      })
      .finally(() => {
        console.log("always");
      });
  }

  // 여러 이미지 가져왔을 때 배열로 저장해주기
  const isImageFile = (url) =>
    /\.(jpg|jpeg|png|gif|webp)$/i.test(url?.split("?")[0]);
  const contentImages = program.contentImages?.filter(isImageFile) || [];

  return (
    <Container className="mt-4 my-5" style={{ maxWidth: "1000px" }}>
      <h3 className="text-success fw-bold mb-5">
        {program.seq}번 프로그램 정보
      </h3>
      <Form>
        <Row className="mb-3">
          <Col>
            <section className="border px-4 py-4 mb-4">
              <FormGroup className="mb-3" controlId="title">
                <FormLabel>제목</FormLabel>
                <FormControl
                  type="text"
                  name="title"
                  value={program.title}
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
            </section>

            <section className="border px-4 py-4 mb-4">
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
            </section>

            <section className="border px-4 py-4 mb-4">
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
                      value={
                        program.status === "DRAFT"
                          ? "임시저장"
                          : program.status === "OPEN"
                            ? "모집중"
                            : program.status === "CLOSED"
                              ? "모집마감"
                              : ""
                      }
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
            </section>

            <section className="border px-4 py-4 mb-4">
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

              <Row>
                {/* 썸네일 사진 */}
                <Col className="text-center">
                  <div className="mb-3">썸네일</div>
                  <img
                    src={program.thumbnails}
                    alt="썸네일 이미지"
                    className="img-fluid rounded mb-3"
                    style={{ width: "250px" }}
                  />
                </Col>

                {/* 본문 사진 */}
                <Col className="border-start border-dark">
                  <div className="mb-3 text-center">본문 이미지</div>
                  {contentImages.length > 0 && (
                    <div className="d-flex flex-wrap gap-3 justify-content-center">
                      {contentImages.map((imgUrl, index) => (
                        <Card
                          key={index}
                          className="shadow-sm"
                          style={{ width: "250px" }}
                        >
                          <Card.Img
                            variant="bottom"
                            src={imgUrl}
                            alt={`프로그램 이미지 ${index + 1}`}
                            className="img-fluid rounded"
                          />
                        </Card>
                      ))}
                    </div>
                  )}
                </Col>
              </Row>
            </section>

            <section className="border px-4 py-4 mb-4">
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
            </section>
          </Col>
        </Row>
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
            <Button variant="outline-danger" onClick={handleDeleteButtonCLick}>
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

      {/*  프로그램 신청 학생 목록 */}
      <h3 className="mt-5 mb-3">신청 학생 목록</h3>
      {applyStudents && applyStudents.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead className="table-success text-center">
            <tr>
              <th style={{ width: "20%" }}>번호</th>
              <th style={{ width: "50%" }}>학생 이름</th>
              <th style={{ width: "15%" }}>이수 확인</th>
              <th style={{ width: "15%" }}>저장</th>
            </tr>
          </thead>
          <tbody>
            {applyStudents.map((student, index) => (
              <tr key={student.seq} className="text-center">
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>
                  <FormCheck
                    type="checkbox"
                    checked={student.completeStatus === 1}
                    onChange={(e) => {
                      // 체크 상태 변경 시, applyStudents 상태를 업데이트
                      setApplyStudents((prev) =>
                        prev.map((s) =>
                          s.seq === student.seq
                            ? { ...s, completeStatus: e.target.checked ? 1 : 0 }
                            : s,
                        ),
                      );
                    }}
                  />
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => {
                      // 저장 버튼 클릭 시, 해당 학생의 seq와 completed 상태를 백엔드로 전송
                      axios
                        .post(`/api/extracurricular/updateCompletion`, {
                          seq: student.seq,
                          completed: student.completed,
                        })
                        .then((res) => {
                          alert(`${student.name} 이수 상태가 저장되었습니다.`);
                        })
                        .catch((err) => {
                          console.error(err);
                          alert("저장 중 오류가 발생했습니다.");
                        });
                    }}
                  >
                    저장
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>신청한 학생이 없습니다.</p>
      )}
    </Container>
  );
}
