import { useEffect, useState } from "react";
import {
  Badge,
  Button,
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
import { IoSearch } from "react-icons/io5";

export function ExtraCurricular() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [competencies, setCompetencies] = useState([]); // 역량 목록을 저장할 상태

  const [keyword, setKeyword] = useState("");
  const [selectedCompetency, setSelectedCompetency] = useState(""); // 역량 선택
  const [selectedOperationType, setSelectedOperationType] = useState(""); // 운영방식 선택
  const [selectedGrade, setSelectedGrade] = useState(""); // 학년 선택

  useEffect(() => {
    axios
      .get("/api/extracurricular/list")
      .then((res) => {
        setPrograms(res.data.programList);
      })
      .catch((err) => console.error("목록 불러오기 실패", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    axios
      .get("/api/competency/subList")
      .then((response) => {
        setCompetencies(response.data);
      })
      .catch((error) => {
        console.error("역량 목록을 불러오는 데 실패했습니다.", error);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  // 상태 필터링: OPEN, CLOSED만 표시
  const visiblePrograms = programs.filter(
    (p) => p.status === "OPEN" || p.status === "CLOSED",
  );

  const handleSearch = () => {
    setLoading(true);

    axios
      .get("/api/extracurricular/list", {
        params: {
          q: keyword,
          competency: selectedCompetency,
          operationType: selectedOperationType,
          grade: selectedGrade,
        },
      })
      .then((res) => {
        setPrograms(res.data.programList);
      })
      .catch((err) => console.error("검색 실패", err))
      .finally(() => setLoading(false));
  };

  return (
    <Container className="my-5">
      <div className="mx-auto" style={{ maxWidth: "1000px" }}>
        {/* 헤더 */}
        <Row className="justify-content-between align-items-center mb-4">
          <Col>
            <h3 className="text-success fw-bold">비교과 프로그램</h3>
          </Col>
          <Col xs="auto">
            <Badge bg="secondary">총 {visiblePrograms.length}개 프로그램</Badge>
          </Col>
        </Row>

        {/* 검색 필터 */}
        <section className="bg-light border p-4 mb-5">
          <Form>
            {/* 1행 */}
            <Row className="mb-3">
              <Col md={4}>
                {/*<FormLabel>역량</FormLabel>*/}
                <FormSelect
                  style={{
                    width: "100%",
                    border: "none",
                    boxShadow: "none",
                    borderRadius: 0,
                    backgroundColor: "transparent",
                    borderBottom: "2px solid gray",
                  }}
                  value={selectedCompetency}
                  onChange={(e) => setSelectedCompetency(e.target.value)}
                >
                  <option value="">역량</option>
                  {competencies.map((comp) => (
                    <option key={comp.seq} value={comp.seq}>
                      {comp.subCompetencyName}
                    </option>
                  ))}
                </FormSelect>
              </Col>
              <Col md={4}>
                {/*<FormLabel>운영방식</FormLabel>*/}
                <FormSelect
                  style={{
                    width: "100%",
                    border: "none",
                    boxShadow: "none",
                    borderRadius: 0,
                    backgroundColor: "transparent",
                    borderBottom: "2px solid gray",
                  }}
                  value={selectedOperationType}
                  onChange={(e) => setSelectedOperationType(e.target.value)}
                >
                  <option value="">운영형태</option>
                  <option value="대면">대면</option>
                  <option value="비대면">비대면</option>
                  <option value="혼합">혼합</option>
                </FormSelect>
              </Col>
              <Col md={4}>
                {/*<FormLabel>대상학년</FormLabel>*/}
                <FormSelect
                  style={{
                    width: "100%",
                    border: "none",
                    boxShadow: "none",
                    borderRadius: 0,
                    backgroundColor: "transparent",
                    borderBottom: "2px solid gray",
                  }}
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                >
                  <option value="">학년</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </FormSelect>
              </Col>
            </Row>

            {/* 2행: 프로그램명 */}
            <Row className="mb-3">
              <Col md={11}>
                {/*<FormLabel>프로그램명</FormLabel>*/}

                <FormControl
                  style={{
                    width: "100%",
                    border: "none",
                    boxShadow: "none",
                    borderRadius: 0,
                    backgroundColor: "transparent",
                    borderBottom: "2px solid gray",
                  }}
                  type="text"
                  placeholder="프로그램명을 입력하세요."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </Col>
              <Col md={1} className="d-flex align-items-end">
                <Button
                  variant="secondary"
                  className="w-100"
                  onClick={handleSearch}
                >
                  <IoSearch style={{ fontSize: "1.3rem" }} />
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
