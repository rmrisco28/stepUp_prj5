import React, { useState } from "react";
import { Form, Button, Spinner, Alert, Card, Navbar } from "react-bootstrap";
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
          src="../../image/stepUp_logo_수정.png"
          alt="logo"
          style={{
            height: "80%", // 부모 높이의 80% 정도 차지
            objectFit: "contain", // 비율 유지
            display: "block",
          }}
        />
        <span style={{ marginTop: "5px", fontWeight: "bold" }}>
          stepUp university extracurricular
        </span>
      </div>
      <div style={{ height: "120px" }} />
      <Card style={{ maxWidth: "400px", margin: "2rem auto" }}>
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
              {loading ? <Spinner animation="border" size="sm" /> : "로그인"}
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="bg-light text-muted small">
          <div className="mb-2">
            <b>테스트 계정 정보</b>
          </div>
          <div className="mb-1">
            학생 아이디 : 2021134001 | 비밀번호 : 050405
          </div>
          <div className="mb-1">센터 아이디 : EC93001 | 비밀번호 : 690928</div>
          <div>관리자 아이디 : CM21007 | 비밀번호 : 000524</div>
        </Card.Footer>
      </Card>
    </>
  );
}
