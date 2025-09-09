import { Button, Col, Form, Row } from "react-bootstrap";

export function Extra_curricular() {
  return (
    <Row className="justify-content-center w-100">
      <Col xs={12} md={10} lg={9}>
        <h3 className="mb-4">비교과 프로그램</h3>

        <section className="bg-light border rounded-4 p-4">
          <Form>
            {/* 1행: 모집시작일 / 모집종료일 */}
            <Row className="mb-3">
              <Col md={3}>
                <Form.Label>모집시작일</Form.Label>
                <Form.Control type="date" />
              </Col>
              <Col md={3}>
                <Form.Label>모집종료일</Form.Label>
                <Form.Control type="date" />
              </Col>
              <Col md={3}>
                <Form.Label>활동시작일</Form.Label>
                <Form.Control type="date" />
              </Col>
              <Col md={3}>
                <Form.Label>활동종료일</Form.Label>
                <Form.Control type="date" />
              </Col>
            </Row>

            {/* 2행: 활동시작일 / 활동종료일 */}
            <Row className="mb-3">
              <Col md={3}>
                <Form.Label>운영년도</Form.Label>
                <Form.Select>
                  <option>전체</option>
                  <option>2025</option>
                  <option>2024</option>
                  <option>2023</option>
                  <option>2022</option>
                  <option>2021</option>
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Label>운영학기</Form.Label>
                <Form.Select>
                  <option>전체</option>
                  <option>1학기</option>
                  <option>여름계절학기</option>
                  <option>2학기</option>
                  <option>겨울계절학기</option>
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Label>참여대학/학과</Form.Label>
                <Form.Select>
                  <option>전체</option>
                  <option>공과대학</option>
                  <option>인문대학</option>
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Label>운영부서</Form.Label>
                <Form.Select>
                  <option>전체</option>
                  <option>학생처</option>
                  <option>취업지원팀</option>
                </Form.Select>
              </Col>
            </Row>

            {/* 3행: 프로그램명 검색 */}
            <Row className="mb-3">
              <Col md={11}>
                <Form.Label>프로그램명</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="프로그램명을 입력하세요."
                />
              </Col>
              <Col md={1} className="d-flex align-items-end">
                <Button variant="primary" className="w-100">
                  검색
                </Button>
              </Col>
            </Row>
          </Form>
        </section>
      </Col>
    </Row>
  );
}
