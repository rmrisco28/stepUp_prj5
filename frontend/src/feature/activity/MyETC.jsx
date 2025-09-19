import { Col, Row } from "react-bootstrap";

export function MyETC() {
  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <div>나의 활동 : 학생 기본 정보랑 같이 가져올까?</div>
        <div>로그인 안 된 사람은 로그인 화면으로</div>
      </Col>
    </Row>
  );
}
