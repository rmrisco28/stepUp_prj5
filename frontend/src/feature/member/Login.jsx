import React, { useState } from "react";
import {
  Form,
  Button,
  Spinner,
  Alert,
  Card,
  Navbar,
  Row,
  Col,
} from "react-bootstrap";
import { useAuth } from "../../common/AuthContext.jsx";
import { useNavigate } from "react-router";
import { AppFooter } from "../../common/AppFooter.jsx";

export function Login() {
  const { login, loading, user } = useAuth();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const result = await login(loginId, password);
    if (result.success) {
      setSuccess("로그인 성공!");
      navigate("/");
    } else {
      setError(result.message || "로그인 실패");
      navigate("/login");
    }
  };

  if (user) {
    return (
      <Alert variant="success">이미 로그인되어 있습니다: {user.name}</Alert>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* 상단 헤더 */}
      <header
        className="bg-success text-white text-center py-3 d-flex flex-column justify-content-center align-items-center"
        style={{ width: "100%", height: "200px" }}
      >
        <img
          src="../image/stepUp_logo_수정.png"
          alt="logo"
          style={{ height: "100px", objectFit: "contain", cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
        <span
          style={{ marginTop: "5px", fontWeight: "bold", cursor: "pointer" }}
        >
          stepUp university extracurricular
        </span>
      </header>

      {/* 메인 컨텐츠 영역 */}
      <main
        className="container my-5"
        style={{ flexGrow: 1, display: "flex", alignItems: "center" }}
      >
        <Row className="justify-content-center align-items-stretch g-4 w-100">
          {/* 오른쪽 로그인 카드 */}
          <Col xs={12} lg={6} className="d-flex order-lg-2">
            <Card
              className="flex-fill border-secondary-subtle shadow-sm"
              style={{ minHeight: "450px" }} // 카드 높이 증가
            >
              <Card.Body className="d-flex flex-column justify-content-center">
                <h3 className="mb-3 text-center">stepUp에 로그인하세요</h3>
                <h6 className="mb-3 text-center">비교과 통합관리시스템</h6>
                <hr />
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formLoginId">
                    <Form.Label>
                      <b>아이디</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="아이디 입력"
                      value={loginId}
                      onChange={(e) => setLoginId(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>
                      <b>비밀번호</b>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="비밀번호 입력"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="outline-success"
                    className="w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "로그인"
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* 왼쪽 테스트 계정 정보 */}
          <Col xs={12} lg={5} className="d-flex order-lg-1">
            <Card
              className="flex-fill bg-light text-muted small border-success-subtle shadow-sm"
              style={{ minHeight: "450px" }} // 카드 높이 증가
            >
              <Card.Body className="d-flex flex-column justify-content-center">
                <h5 className="mb-3 text-center text-dark">테스트 계정 정보</h5>
                <div className="mb-2">
                  학생 아이디 : <b>2021134001</b> | 비밀번호 : <b>050405</b>
                </div>
                <div className="mb-2">
                  센터 아이디 : <b>EC93001</b> | 비밀번호 : <b>690928</b>
                </div>
                <div>
                  관리자 아이디 : <b>CM21007</b> | 비밀번호 : <b>000524</b>
                </div>
                <hr />
                <h6 className="mb-3 text-center text-dark">
                  로그인 후 체험해보세요
                </h6>
                <div className="mb-2">
                  <b>&lt;학생&gt;</b>
                  <div>
                    비교과 신청, 비교과/마일리지 내역 확인, 비밀번호 변경
                  </div>
                  <b>&lt;센터&gt;</b>
                  <div>
                    비교과 추가, 비교과/마일리지 내역 관리, 비밀번호 변경
                  </div>
                  <b>&lt;관리자&gt;</b>
                  <div>학생 역량 관리, 비밀번호 변경</div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </main>

      {/* 푸터 */}
      <AppFooter />
    </div>
  );
}
