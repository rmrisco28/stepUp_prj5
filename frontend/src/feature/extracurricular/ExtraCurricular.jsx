import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  FormLabel,
  FormSelect,
  Row,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { ExtraCurricularCardList } from "./ExtraCurricularCardList.jsx";

export function ExtraCurricular() {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/extracurricular/list")
      .then((res) => {
        console.log(res.data);
        setPrograms(res.data.programList);
      })
      .catch((err) => console.error("목록 불러오기 실패", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="my-5">
      <div className="mx-auto" style={{ maxWidth: "1000px" }}>
        {/* 헤더 */}
        <Row className="justify-content-between align-items-center mb-4">
          <Col>
            <h3 className="text-primary fw-bold">비교과 프로그램</h3>
          </Col>
          <Col xs="auto">
            <Badge bg="secondary">총 {programs.length}개 프로그램</Badge>
          </Col>
        </Row>

        {/* 검색 필터 */}
        <section className="bg-light border rounded-4 p-4 mb-5">
          <Form>
            {/* 1행: 모집/활동 날짜 */}
            <Row className="mb-3">
              <Col md={3}>
                <FormLabel>모집시작일</FormLabel>
                <FormControl type="date" />
              </Col>
              <Col md={3}>
                <FormLabel>모집종료일</FormLabel>
                <FormControl type="date" />
              </Col>
              <Col md={3}>
                <FormLabel>활동시작일</FormLabel>
                <FormControl type="date" />
              </Col>
              <Col md={3}>
                <FormLabel>활동종료일</FormLabel>
                <FormControl type="date" />
              </Col>
            </Row>

            {/* 2행: 운영년도/학기/대학/부서 */}
            <Row className="mb-3">
              <Col md={3}>
                <FormLabel>운영년도</FormLabel>
                <FormSelect>
                  <option>전체</option>
                </FormSelect>
              </Col>
              <Col md={3}>
                <FormLabel>운영학기</FormLabel>
                <FormSelect>
                  <option>전체</option>
                </FormSelect>
              </Col>
              <Col md={3}>
                <FormLabel>참여대학/학과</FormLabel>
                <FormSelect>
                  <option>전체</option>
                </FormSelect>
              </Col>
              <Col md={3}>
                <FormLabel>운영부서</FormLabel>
                <FormSelect>
                  <option>전체</option>
                </FormSelect>
              </Col>
            </Row>

            {/* 3행: 프로그램명 */}
            <Row className="mb-3">
              <Col md={10}>
                <FormLabel>프로그램명</FormLabel>
                <FormControl
                  type="text"
                  placeholder="프로그램명을 입력하세요."
                />
              </Col>
              <Col md={2} className="d-flex align-items-end">
                <Button variant="primary" className="w-100">
                  검색
                </Button>
              </Col>
            </Row>
          </Form>
        </section>

        {/* 프로그램 카드 리스트 */}
        {programs.length > 0 ? (
          <ExtraCurricularCardList programs={programs} />
        ) : (
          <div>프로그램이 없습니다.</div>
        )}
      </div>
    </Container>
  );
}
