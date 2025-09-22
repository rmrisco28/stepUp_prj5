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
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export function ExtraCurricularRegister() {
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
    thumbnail: null, // 썸네일 파일
    contentImages: [], // 본문 이미지 파일
  });
  const [competencies, setCompetencies] = useState([]); // 역량 목록을 저장할 상태

  const navigate = useNavigate();

  // 역량 목록 가져옴. 추후 작성자도 가져오게 하면 될 듯!
  useEffect(() => {
    axios
      .get("/api/competency/subList")
      .then((response) => {
        console.log(response.data);
        setCompetencies(response.data);
      })
      .catch((error) => {
        console.error("역량 목록을 불러오는 데 실패했습니다.", error);
      });
  }, []);

  // 입력값 변경 처리
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      if (name === "contentImages") {
        setFormData({ ...formData, contentImages: Array.from(files) });
      } else {
        setFormData({ ...formData, [name]: files[0] });
      }
      // 체크박스 처리
    } else if (type === "checkbox") {
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
  function handleSubmitButtonClick(e) {
    e.preventDefault();

    const submitData = new FormData();
    // 텍스트/단일 파일 필드
    for (const key in formData) {
      if (key !== "contentImages") {
        // thumbnail 필드가 존재하고 유효한 경우에만 FormData에 추가
        if (key === "thumbnail" && formData[key] instanceof File) {
          submitData.append(key, formData[key]);
        } else if (key !== "thumbnail") {
          submitData.append(key, formData[key]);
        }
      }
    }

    // 다중 파일 처리
    formData.contentImages.forEach((file) => {
      submitData.append("contentImages", file);
    });

    axios
      .postForm("/api/extracurricular/register", submitData)
      .then(() => {
        alert("프로그램 등록이 완료되었습니다.");
        navigate("/extracurricular/manage");

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
          thumbnail: null,
          contentImages: [],
        });
      })
      .catch((error) => {
        console.error(error.response?.data || error.message);
        alert("등록에 실패하였습니다.");
      })
      .finally(() => {
        // 요청 완료 후 공통 처리 (예: 로딩 해제)
        console.log("프로그램 등록 요청 완료");
      });
  }

  return (
    <Container className="mt-5 my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2 className="mb-4 text-center text-primary fw-bold">
            비교과 프로그램 등록
          </h2>
          <Form>
            {/* 프로그램 제목 */}
            <FormGroup className="mb-3" controlId="title">
              <FormLabel>제목</FormLabel>
              <FormControl
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </FormGroup>

            {/* 프로그램 내용 */}
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

            {/* 운영기간 */}
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

            {/* 신청기간 */}
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

            <Row>
              <Col>
                {/* 역량 */}
                <FormGroup className="mb-3" controlId="competency">
                  <FormLabel>역량</FormLabel>
                  <FormControl
                    as="select" // select 태그로 변경
                    name="competency"
                    value={formData.competency}
                    onChange={handleChange}
                  >
                    <option value="">역량을 선택하세요</option>
                    {competencies.map((comp) => (
                      <option key={comp.seq} value={comp.seq}>
                        {/* 이거 지금 이름으로 가져오면 오류나서 내일 테이블 어쩔지 상의 후 바꾸기. */}
                        {comp.seq}
                      </option>
                    ))}
                  </FormControl>
                </FormGroup>
              </Col>
              <Col>
                {/* 장소 */}
                <FormGroup className="mb-3" controlId="location">
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
                  checked={formData.grades.split(",").includes(`${grade}`)}
                  onChange={handleChange}
                />
              ))}
            </FormGroup>

            {/* 기타 필드 */}
            <FormGroup className="mb-3" controlId="capacity">
              <FormLabel>모집 정원</FormLabel>
              <FormControl
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup className="mb-3" controlId="manager">
              <FormLabel>담당자</FormLabel>
              <FormControl
                type="text"
                name="manager"
                value={formData.manager}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup className="mb-3" controlId="managerPhone">
              <FormLabel>담당자 전화번호</FormLabel>
              <FormControl
                type="text"
                name="managerPhone"
                value={formData.managerPhone}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup className="mb-3" controlId="mileagePoints">
              <FormLabel>마일리지 점수</FormLabel>
              <FormControl
                type="number"
                name="mileagePoints"
                value={formData.mileagePoints}
                onChange={handleChange}
              />
            </FormGroup>

            {/* 썸네일 업로드 */}
            <FormGroup className="mb-3" controlId="thumbnail">
              <FormLabel>썸네일 이미지</FormLabel>
              <FormControl
                type="file"
                name="thumbnail"
                accept="image/*"
                onChange={handleChange}
              />
            </FormGroup>

            {/* 본문 이미지 업로드 */}
            <FormGroup className="mb-3" controlId="contentImage">
              <FormLabel>본문 이미지</FormLabel>
              <FormControl
                type="file"
                name="contentImages"
                accept="image/*"
                multiple
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup className="mb-3" controlId="author">
              <FormLabel>작성자</FormLabel>
              <FormControl
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
              />
            </FormGroup>

            <div className="text-center">
              <Button
                variant="primary"
                className="me-2"
                onClick={handleSubmitButtonClick}
              >
                등록
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
