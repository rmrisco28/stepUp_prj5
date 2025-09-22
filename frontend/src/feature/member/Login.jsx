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
    <>
      {/* 상단 헤더 */}
      <div
        className="bg-success text-white text-center py-3 d-flex flex-column justify-content-center align-items-center"
        style={{
          width: "100vw",
          height: "150px",
          position: "fixed",
          top: 0,
          left: 0,
        }}
      >
        <img
          src="../image/stepUp_logo_수정.png"
          alt="logo"
          style={{
            height: "80%",
            objectFit: "contain",
            display: "block",
          }}
        />
        <span style={{ marginTop: "5px", fontWeight: "bold" }}>
          stepUp university extracurricular
        </span>
      </div>

      {/* 헤더 아래 여백 */}
      <div style={{ height: "160px" }} />

      {/* 메인 컨텐츠 */}
      <div className="container">
        <Row className="justify-content-center">
          {/* 왼쪽 테스트 계정 정보 */}
          <Col xs={12} md={4} className="mb-4 mb-md-0">
            <Card className="h-100 bg-light text-muted small">
              <Card.Body>
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
              </Card.Body>
            </Card>
          </Col>

          {/* 오른쪽 로그인 카드 */}
          <Col xs={12} md={5}>
            <Card>
              <Card.Body>
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
        </Row>
      </div>
    </>
  );
}
