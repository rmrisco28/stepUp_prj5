import {
  Button,
  Col,
  Container,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

export function ExtraCurricularAdd() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    operateStartDt: "",
    operateEndDt: "",
    applyStartDt: "",
    applyEndDt: "",
    competency: "",
    location: "",
    operationType: "대면", // 기본값
    grades: "", // "1,2,3" 이런 식으로 처리 가능
    capacity: 0,
    manager: "",
    managerPhone: "",
    mileagePoints: 0,
    author: "",
  });

  // 입력값 변경 처리
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      // 학년 체크박스 처리
      const gradeArr = formData.grades ? formData.grades.split(",") : [];
      if (checked) {
        gradeArr.push(value);
      } else {
        const index = gradeArr.indexOf(value);
        if (index > -1) gradeArr.splice(index, 1);
      }
      setFormData({ ...formData, grades: gradeArr.join(",") });
    } else if (type === "radio") {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 폼 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/extracurricular/add", formData);
      alert("프로그램 등록 완료!");
      // 필요시 초기화
      setFormData({
        title: "",
        content: "",
        operateStartDt: "",
        operateEndDt: "",
        applyStartDt: "",
        applyEndDt: "",
        competency: "",
        location: "",
        operationType: "대면",
        grades: "",
        capacity: 0,
        manager: "",
        managerPhone: "",
        mileagePoints: 0,
        author: "",
      });
    } catch (error) {
      console.error(error.response.data);
      alert(
        "등록 실패: " + (error.response?.data?.message?.text || error.message),
      );
    }
  };

  return (
    <Container className="mt-5 my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2 className="mb-4 text-center">비교과 프로그램 등록</h2>
          <Form onSubmit={handleSubmit}>
            {/* 프로그램 제목 */}
            <FormGroup className="mb-3">
              <FormLabel>제목</FormLabel>
              <FormControl
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </FormGroup>

            {/* 프로그램 내용 */}
            <FormGroup className="mb-3">
              <FormLabel>내용</FormLabel>
              <FormControl
                as="textarea"
                rows={4}
                name="content"
                value={formData.content}
                onChange={handleChange}
              />
            </FormGroup>

            {/* 운영기간 */}
            <Row>
              <Col>
                <FormGroup className="mb-3">
                  <FormLabel>운영 시작일</FormLabel>
                  <FormControl
                    type="datetime-local"
                    name="operateStartDt"
                    value={formData.operateStartDt}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="mb-3">
                  <FormLabel>운영 종료일</FormLabel>
                  <FormControl
                    type="datetime-local"
                    name="operateEndDt"
                    value={formData.operateEndDt}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>

            {/* 신청기간 */}
            <Row>
              <Col>
                <FormGroup className="mb-3">
                  <FormLabel>신청 시작일</FormLabel>
                  <FormControl
                    type="datetime-local"
                    name="applyStartDt"
                    value={formData.applyStartDt}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="mb-3">
                  <FormLabel>신청 종료일</FormLabel>
                  <FormControl
                    type="datetime-local"
                    name="applyEndDt"
                    value={formData.applyEndDt}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col>
                {/* 역량 */}
                <FormGroup className="mb-3">
                  <FormLabel>역량</FormLabel>
                  <FormControl
                    type="text"
                    name="competency"
                    value={formData.competency}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                {/* 장소 */}
                <FormGroup className="mb-3">
                  <FormLabel>장소</FormLabel>
                  <FormControl
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>

            {/* 운영방식 */}
            <FormGroup className="mb-3">
              <FormLabel className="me-5">운영방식</FormLabel>
              {["대면", "비대면", "혼합"].map((type) => (
                <FormCheck
                  key={type}
                  inline
                  type="radio"
                  label={type}
                  name="operationType"
                  value={type}
                  checked={formData.operationType === type}
                  onChange={handleChange}
                />
              ))}
            </FormGroup>

            {/* 신청 대상 학년 */}
            <FormGroup className="mb-3">
              <FormLabel className="me-5">신청 대상 학년</FormLabel>
              {[1, 2, 3, 4].map((grade) => (
                <FormCheck
                  key={grade}
                  inline
                  type="checkbox"
                  label={`${grade}학년`}
                  value={grade}
                  checked={formData.grades.split(",").includes(`${grade}`)}
                  onChange={handleChange}
                />
              ))}
            </FormGroup>

            {/* 기타 필드 */}
            <FormGroup className="mb-3">
              <FormLabel>모집 정원</FormLabel>
              <FormControl
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel>담당자</FormLabel>
              <FormControl
                type="text"
                name="manager"
                value={formData.manager}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel>담당자 전화번호</FormLabel>
              <FormControl
                type="text"
                name="managerPhone"
                value={formData.managerPhone}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel>마일리지 점수</FormLabel>
              <FormControl
                type="number"
                name="mileagePoints"
                value={formData.mileagePoints}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel>작성자</FormLabel>
              <FormControl
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
              />
            </FormGroup>

            <div className="text-center">
              <Button type="submit" variant="primary" className="me-2">
                등록
              </Button>
              <Button type="button" variant="secondary">
                취소
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
