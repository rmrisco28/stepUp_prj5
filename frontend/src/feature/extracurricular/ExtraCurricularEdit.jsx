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
  Spinner,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router";

export function ExtraCurricularEdit() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    operateStartDt: "",
    operateEndDt: "",
    applyStartDt: "",
    applyEndDt: "",
    competency: "",
    location: "",
    operationType: "대면",
    grades: [],
    capacity: 0,
    status: "DRAFT",
    manager: "",
    managerPhone: "",
    mileagePoints: 0,
    author: "",
    useYn: true,
  });

  const [loading, setLoading] = useState(true);

  const { seq } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = searchParams.get("page");

  // 초기 데이터 불러오기
  useEffect(() => {
    axios
      .get(`/api/extracurricular/detail/${seq}`)
      .then((res) => {
        const data = res.data;
        console.log("데이터 불러오기 성공");

        setFormData({
          title: data.title || "",
          content: data.content || "",
          operateStartDt: data.operateStartDt?.slice(0, 16) || "",
          operateEndDt: data.operateEndDt?.slice(0, 16) || "",
          applyStartDt: data.applyStartDt?.slice(0, 16) || "",
          applyEndDt: data.applyEndDt?.slice(0, 16) || "",
          competency: data.competency || "",
          location: data.location || "",
          operationType: data.operationType || "대면",
          grades: data.grades ? data.grades.split(",") : [],
          capacity: data.capacity || 0,
          status: data.status || "DRAFT",
          manager: data.manager || "",
          managerPhone: data.managerPhone || "",
          mileagePoints: data.mileagePoints || 0,
          author: data.author || "",
          useYn: data.useYn ?? true,
        });
      })
      .catch((err) => {
        console.error(err);
        alert("데이터를 불러오는데 실패했습니다.");
        navigate(-1);
      })
      .finally(() => {
        console.log("데이터 불러오기 완료");
        setLoading(false);
      });
  }, [seq, navigate]);

  // 모든 입력값 처리 (텍스트, 날짜, 셀렉트 전용)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 폼 제출
  function handleEditButtonClick(e) {
    e.preventDefault();

    axios
      .put(`/api/extracurricular/edit/${seq}`, {
        ...formData,
        grades: Array.isArray(formData.grades)
          ? formData.grades.join(",")
          : formData.grades,
      })
      .then((res) => {
        console.log("프로그램 수정 성공", res.data);

        // page 쿼리 유지 후 상세 페이지 이동
        const page =
          new URLSearchParams(window.location.search).get("page") || 1;
        navigate(`/extracurricular/detail/${seq}?page=${page}`);
      })
      .catch((err) => {
        console.error("프로그램 수정 오류", err.response.data);
      })
      .finally(() => {
        console.log("수정 요청 완료");
      });
  }

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <Container className="mt-5 my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2 className="mb-4 text-center text-primary fw-bold">
            비교과 프로그램 수정
          </h2>
          <Form>
            {/* 제목 */}
            <FormGroup className="mb-3" controlId="title">
              <FormLabel>제목</FormLabel>
              <FormControl
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </FormGroup>

            {/* 내용 */}
            <FormGroup className="mb-3" controlId="content">
              <FormLabel>내용</FormLabel>
              <FormControl
                as="textarea"
                rows={4}
                name="content"
                value={formData.content}
                onChange={handleChange}
              />
            </FormGroup>

            {/* 운영 기간 */}
            <Row>
              <Col>
                <FormGroup className="mb-3" controlId="operateStartDt">
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
                <FormGroup className="mb-3" controlId="operateEndDt">
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

            {/* 신청 기간 */}
            <Row>
              <Col>
                <FormGroup className="mb-3" controlId="applyStartDt">
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
                <FormGroup className="mb-3" controlId="applyEndDt">
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

            {/* 역량 */}
            <Row>
              <Col>
                <FormGroup className="mb-3" controlId="competency">
                  <FormLabel>역량</FormLabel>
                  <FormControl
                    name="competency"
                    value={formData.competency}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              {/* 장소 */}
              <Col>
                <FormGroup className="mb-3" controlId="location">
                  <FormLabel>장소</FormLabel>
                  <FormControl
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>

            {/* 운영 방식 */}
            <FormGroup className="mb-3" controlId="operationType">
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
            <FormGroup className="mb-3" controlId="grades">
              <FormLabel className="me-5">신청 대상 학년</FormLabel>
              {[1, 2, 3, 4].map((grade) => (
                <FormCheck
                  key={grade}
                  inline
                  type="checkbox"
                  label={`${grade}학년`}
                  value={grade}
                  checked={formData.grades.includes(String(grade))}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({
                        ...formData,
                        grades: [...formData.grades, String(grade)].sort(
                          (a, b) => Number(a) - Number(b),
                        ),
                      });
                    } else {
                      setFormData({
                        ...formData,
                        grades: formData.grades.filter(
                          (g) => g !== String(grade),
                        ),
                      });
                    }
                  }}
                />
              ))}
            </FormGroup>

            {/* 모집 정원 */}
            <FormGroup className="mb-3" controlId="capacity">
              <FormLabel>모집 정원</FormLabel>
              <FormControl
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
              />
            </FormGroup>

            {/* 담장자 */}
            <FormGroup className="mb-3" controlId="manager">
              <FormLabel>담당자</FormLabel>
              <FormControl
                name="manager"
                value={formData.manager}
                onChange={handleChange}
              />
            </FormGroup>

            {/* 담장자 연락처 */}
            <FormGroup className="mb-3" controlId="managerPhone">
              <FormLabel>담당자 전화번호</FormLabel>
              <FormControl
                name="managerPhone"
                value={formData.managerPhone}
                onChange={handleChange}
              />
            </FormGroup>

            {/* 마일리지 점수 */}
            <FormGroup className="mb-3" controlId="mileagePoints">
              <FormLabel>마일리지 점수</FormLabel>
              <FormControl
                type="number"
                name="mileagePoints"
                value={formData.mileagePoints}
                onChange={handleChange}
              />
            </FormGroup>

            {/* 상태 */}
            <FormGroup className="mb-3" controlId="status">
              <FormLabel>상태</FormLabel>
              <FormControl
                as="select"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="DRAFT">임시저장</option>
                <option value="OPEN">모집중</option>
                <option value="CLOSED">모집마감</option>
              </FormControl>
            </FormGroup>

            {/* 사용 여부 */}
            <FormGroup className="mb-3" controlId="useYn">
              <FormLabel className="me-3">사용여부</FormLabel>
              <FormCheck
                inline
                type="checkbox"
                name="useYn"
                label="사용"
                checked={formData.useYn}
                onChange={(e) =>
                  setFormData({ ...formData, useYn: e.target.checked })
                }
              />
            </FormGroup>

            {/* 작성자 */}
            <FormGroup className="mb-3" controlId="author">
              <FormLabel>작성자</FormLabel>
              <FormControl
                name="author"
                value={formData.author}
                onChange={handleChange}
              />
            </FormGroup>

            {/* 수정, 취소 버튼 */}
            <div className="text-center">
              <Button
                variant="primary"
                className="me-2"
                onClick={handleEditButtonClick}
              >
                수정
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(-1)}
              >
                취소
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
