import { useAuth } from "./common/AuthContext.jsx";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

export function ETCMenage() {
  const { user, loading, isAdmin, isExtra } = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!loading && user) {
      console.log(user);
      setUserInfo(user);
    }
  }, [loading, user]);

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={9}>
          <h2>비교과 내역 관리</h2>
          <div>페이지 제작중입니다 .. </div>
          {/* isExtra 면 프로그램 정보 및 이수 관리 컴포넌트 가져오기 */}
          {/* isAdmin 이면 .. 예시화면입니다. 센터아이디로 로그인해주세요. 등등으로 */}
        </Col>
      </Row>
    </Container>
  );
}
