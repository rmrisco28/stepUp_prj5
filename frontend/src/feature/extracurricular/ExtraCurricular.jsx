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
} from "react-bootstrap";

export function ExtraCurricular() {
  return (
    <Container className="my-5">
      <div className="mx-auto" style={{ maxWidth: "1000px" }}>
        {/* 헤더 */}
        <Row className="justify-content-between align-items-center mb-4">
          <Col>
            <h3 className="text-primary fw-bold">비교과 프로그램</h3>
          </Col>
          <Col xs="auto">
            <Badge bg="secondary">총 0개 프로그램</Badge>
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
                <FormLabel>역량</FormLabel>
                <FormSelect>
                  <option>전체</option>
                </FormSelect>
              </Col>
              <Col md={3}>
                <FormLabel>신청학년</FormLabel>
                <FormSelect>
                  <option>전체</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </FormSelect>
              </Col>
              <Col md={3}>
                <FormLabel>담당센터</FormLabel>
                <FormSelect>
                  <option>전체</option>
                  <option>역량관리센터</option>
                  <option>비교과센터</option>
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

        {/* 프로그램 카드 미리보기 */}
        <Row className="g-4">
          <Col md={6} lg={4}>
            <Card className="h-100 shadow-sm border-0">
              {/* 카드 헤더 (색 배경) */}
              <div
                style={{
                  height: "150px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                }}
              >
                <h6 className="fw-bold">분야명</h6>
              </div>

              <Card.Body>
                {/* 제목 + 상태 */}
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <Card.Title className="fw-bold flex-grow-1 me-2">
                    프로그램명
                  </Card.Title>
                  <Badge bg="secondary">상태</Badge>
                </div>

                {/* 설명 */}
                <Card.Text className="text-muted small mb-3">
                  프로그램 설명
                </Card.Text>

                {/* 태그 */}
                <div className="mb-3">
                  <Badge bg="light" text="dark" className="me-1">
                    태그1
                  </Badge>
                  <Badge bg="light" text="dark" className="me-1">
                    태그2
                  </Badge>
                </div>

                {/* 정보 */}
                <div className="text-muted small mb-3">
                  <div className="d-flex align-items-center mb-1">
                    운영부서:
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    모집기간:
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    활동기간:
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    모집인원:
                  </div>
                </div>

                {/* 버튼 */}
                <Button variant="primary" className="w-100 rounded-pill">
                  신청하기
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card className="h-100 shadow-sm border-0">
              {/* 카드 헤더 (색 배경) */}
              <div
                style={{
                  height: "150px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                }}
              >
                <h6 className="fw-bold">분야명</h6>
              </div>

              <Card.Body>
                {/* 제목 + 상태 */}
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <Card.Title className="fw-bold flex-grow-1 me-2">
                    프로그램명
                  </Card.Title>
                  <Badge bg="secondary">상태</Badge>
                </div>

                {/* 설명 */}
                <Card.Text className="text-muted small mb-3">
                  프로그램 설명
                </Card.Text>

                {/* 태그 */}
                <div className="mb-3">
                  <Badge bg="light" text="dark" className="me-1">
                    태그1
                  </Badge>
                  <Badge bg="light" text="dark" className="me-1">
                    태그2
                  </Badge>
                </div>

                {/* 정보 */}
                <div className="text-muted small mb-3">
                  <div className="d-flex align-items-center mb-1">
                    운영부서:
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    모집기간:
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    활동기간:
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    모집인원:
                  </div>
                </div>

                {/* 버튼 */}
                <Button variant="primary" className="w-100 rounded-pill">
                  신청하기
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card className="h-100 shadow-sm border-0">
              {/* 카드 헤더 (색 배경) */}
              <div
                style={{
                  height: "150px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                }}
              >
                <h6 className="fw-bold">분야명</h6>
              </div>

              <Card.Body>
                {/* 제목 + 상태 */}
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <Card.Title className="fw-bold flex-grow-1 me-2">
                    프로그램명
                  </Card.Title>
                  <Badge bg="secondary">상태</Badge>
                </div>

                {/* 설명 */}
                <Card.Text className="text-muted small mb-3">
                  프로그램 설명
                </Card.Text>

                {/* 태그 */}
                <div className="mb-3">
                  <Badge bg="light" text="dark" className="me-1">
                    태그1
                  </Badge>
                  <Badge bg="light" text="dark" className="me-1">
                    태그2
                  </Badge>
                </div>

                {/* 정보 */}
                <div className="text-muted small mb-3">
                  <div className="d-flex align-items-center mb-1">
                    운영부서:
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    모집기간:
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    활동기간:
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    모집인원:
                  </div>
                </div>

                {/* 버튼 */}
                <Button variant="primary" className="w-100 rounded-pill">
                  신청하기
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
