import React, { useState } from "react";
import {
  Form,
  Button,
  Spinner,
  Alert,
  Card,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { useAuth } from "../../common/AuthContext.jsx";
import { useNavigate } from "react-router";
import { AppFooter } from "../../common/AppFooter.jsx";
import {
  FaCheckCircle,
  FaUserCog,
  FaUserGraduate,
  FaUserTie,
} from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

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
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f1f3f4 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Alert
          variant="success"
          style={{
            borderRadius: "15px",
            padding: "2rem",
            fontSize: "1.2rem",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          }}
        >
          ✅ 이미 로그인되어 있습니다: <strong>{user.name}</strong>
        </Alert>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f1f3f4 100%)",
        fontFamily:
          "'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* 상단 헤더 */}
      <header
        style={{
          background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
          color: "white",
          padding: "2rem 0",
          textAlign: "center",
          boxShadow: "0 4px 20px rgba(76, 175, 80, 0.3)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 배경 장식 */}
        <div
          style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "200px",
            height: "200px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: "-30px",
            left: "-30px",
            width: "150px",
            height: "150px",
            background: "rgba(255, 255, 255, 0.08)",
            borderRadius: "50%",
          }}
        ></div>

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* stepUp 로고 디자인 */}
          <div
            onClick={() => navigate("/")}
            style={{
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              marginBottom: "1rem",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {/* 계단 아이콘 */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                marginRight: "1rem",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "15px",
                  background: "rgba(255, 255, 255, 0.9)",
                  marginRight: "2px",
                  borderRadius: "1px",
                }}
              ></div>
              <div
                style={{
                  width: "8px",
                  height: "25px",
                  background: "rgba(255, 255, 255, 0.9)",
                  marginRight: "2px",
                  borderRadius: "1px",
                }}
              ></div>
              <div
                style={{
                  width: "8px",
                  height: "35px",
                  background: "rgba(255, 255, 255, 0.9)",
                  marginRight: "2px",
                  borderRadius: "1px",
                }}
              ></div>
              <div
                style={{
                  width: "8px",
                  height: "45px",
                  background: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "1px",
                }}
              ></div>
            </div>

            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "2.5rem",
                  fontWeight: "800",
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                stepUp
              </h2>
              <div
                style={{
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  letterSpacing: "1px",
                  opacity: 0.9,
                }}
              >
                UNIVERSITY EXTRACURRICULAR
              </div>
            </div>
          </div>

          <p
            style={{
              fontSize: "1.2rem",
              margin: 0,
              opacity: 0.95,
              fontWeight: "500",
            }}
          >
            비교과 통합관리시스템에 오신 것을 환영합니다
          </p>
        </div>
      </header>

      {/* 메인 컨텐츠 영역 */}
      <main style={{ flex: 1, position: "relative", padding: "3rem 0" }}>
        {/* 배경 장식 */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "5%",
            width: "300px",
            height: "300px",
            background:
              "radial-gradient(circle, rgba(76, 175, 80, 0.1) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "10%",
            width: "200px",
            height: "200px",
            background:
              "radial-gradient(circle, rgba(33, 150, 243, 0.08) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        ></div>

        <Container style={{ position: "relative", zIndex: 1 }}>
          <Row className="justify-content-center align-items-stretch g-4">
            {/* 오른쪽 로그인 카드 */}
            <Col xs={12} lg={6} className="d-flex order-lg-2">
              <Card
                style={{
                  width: "100%",
                  minHeight: "500px",
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "20px",
                  boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(0, 0, 0, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 35px rgba(0, 0, 0, 0.1)";
                }}
              >
                <Card.Body className="d-flex flex-column justify-content-center p-4">
                  <div className="text-center mb-4">
                    <h3
                      style={{
                        color: "#2c3e50",
                        fontWeight: "700",
                        fontSize: "1.8rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      🔐 stepUp 로그인
                    </h3>
                    <div
                      style={{
                        width: "60px",
                        height: "3px",
                        background: "linear-gradient(90deg, #4CAF50, #45a049)",
                        margin: "0 auto",
                        borderRadius: "2px",
                      }}
                    ></div>
                  </div>

                  {error && (
                    <Alert
                      variant="danger"
                      style={{
                        borderRadius: "10px",
                        border: "none",
                        background:
                          "linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%)",
                      }}
                    >
                      ❌ {error}
                    </Alert>
                  )}
                  {success && (
                    <Alert
                      variant="success"
                      style={{
                        borderRadius: "10px",
                        border: "none",
                        background:
                          "linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%)",
                      }}
                    >
                      ✅ {success}
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formLoginId">
                      <Form.Label
                        style={{ fontWeight: "600", color: "#2c3e50" }}
                      >
                        👤 아이디
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="아이디를 입력하세요"
                        value={loginId}
                        onChange={(e) => setLoginId(e.target.value)}
                        style={{
                          borderRadius: "10px",
                          border: "2px solid #e9ecef",
                          padding: "12px 16px",
                          fontSize: "1rem",
                          transition: "all 0.3s ease",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#4CAF50";
                          e.target.style.boxShadow =
                            "0 0 0 0.2rem rgba(76, 175, 80, 0.25)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e9ecef";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formPassword">
                      <Form.Label
                        style={{ fontWeight: "600", color: "#2c3e50" }}
                      >
                        🔒 비밀번호
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                          borderRadius: "10px",
                          border: "2px solid #e9ecef",
                          padding: "12px 16px",
                          fontSize: "1rem",
                          transition: "all 0.3s ease",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#4CAF50";
                          e.target.style.boxShadow =
                            "0 0 0 0.2rem rgba(76, 175, 80, 0.25)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e9ecef";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </Form.Group>

                    <Button
                      type="submit"
                      disabled={loading}
                      style={{
                        width: "100%",
                        padding: "14px",
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        borderRadius: "10px",
                        border: "none",
                        background: loading
                          ? "linear-gradient(135deg, #95a5a6, #7f8c8d)"
                          : "linear-gradient(135deg, #4CAF50, #45a049)",
                        transition: "all 0.3s ease",
                        boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)",
                      }}
                      onMouseEnter={(e) => {
                        if (!loading) {
                          e.target.style.transform = "translateY(-2px)";
                          e.target.style.boxShadow =
                            "0 6px 20px rgba(76, 175, 80, 0.4)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow =
                          "0 4px 15px rgba(76, 175, 80, 0.3)";
                      }}
                    >
                      {loading ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          로그인 중...
                        </>
                      ) : (
                        "🚀 로그인"
                      )}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            {/* 왼쪽 테스트 계정 정보 */}
            <Col xs={12} lg={5} className="d-flex order-lg-1">
              <Card
                style={{
                  width: "100%",
                  minHeight: "500px",
                  background: "rgba(248, 249, 250, 0.95)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(76, 175, 80, 0.2)",
                  borderRadius: "20px",
                  boxShadow: "0 15px 35px rgba(0, 0, 0, 0.08)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(0, 0, 0, 0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 35px rgba(0, 0, 0, 0.08)";
                }}
              >
                <Card.Body className="d-flex flex-column justify-content-center p-4">
                  <div className="text-center mb-4">
                    <h5
                      style={{
                        color: "#2c3e50",
                        fontWeight: "700",
                        fontSize: "1.5rem",
                      }}
                    >
                      🔑 테스트 계정 정보
                    </h5>
                    <div
                      style={{
                        width: "60px",
                        height: "3px",
                        background: "linear-gradient(90deg, #4CAF50, #45a049)",
                        margin: "0 auto",
                        borderRadius: "2px",
                      }}
                    ></div>
                  </div>

                  <div style={{ marginBottom: "1.5rem" }}>
                    {[
                      {
                        icon: FaUserGraduate,
                        role: "학생",
                        id: "2021134001",
                        pw: "050405",
                        color: "#4CAF50",
                      },
                      {
                        icon: FaUserCog,
                        role: "센터",
                        id: "EC93001",
                        pw: "690928",
                        color: "#2196F3",
                      },
                      {
                        icon: FaUserTie,
                        role: "관리자",
                        id: "CM21007",
                        pw: "000524",
                        color: "#FF9800",
                      },
                    ].map((account, index) => (
                      <div
                        key={index}
                        style={{
                          background: "rgba(255, 255, 255, 0.8)",
                          padding: "1rem",
                          borderRadius: "12px",
                          marginBottom: "0.8rem",
                          border: `1px solid ${account.color}30`,
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateX(5px)";
                          e.currentTarget.style.boxShadow = `0 4px 12px ${account.color}40`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateX(0)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <account.icon
                            style={{
                              color: account.color,
                              fontSize: "1.2rem",
                              marginRight: "0.8rem",
                            }}
                          />
                          <div>
                            <div
                              style={{
                                fontWeight: "600",
                                color: "#2c3e50",
                                marginBottom: "2px",
                              }}
                            >
                              {account.role}
                            </div>
                            <div
                              style={{ fontSize: "0.9rem", color: "#6c757d" }}
                            >
                              ID: <strong>{account.id}</strong> | PW:{" "}
                              <strong>{account.pw}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.9)",
                      padding: "1.5rem",
                      borderRadius: "15px",
                      border: "1px solid rgba(76, 175, 80, 0.2)",
                    }}
                  >
                    <h6
                      style={{
                        color: "#2c3e50",
                        fontWeight: "700",
                        textAlign: "center",
                        marginBottom: "1rem",
                      }}
                    >
                      ✨ 로그인 후 이용 가능한 기능
                    </h6>

                    {[
                      {
                        icon: FaUserGraduate,
                        role: "학생",
                        desc: "비교과 신청, 비교과/마일리지 내역 확인",
                      },
                      {
                        icon: FaUserCog,
                        role: "센터",
                        desc: "비교과 추가, 비교과/마일리지 내역 관리",
                      },
                      {
                        icon: FaUserTie,
                        role: "관리자",
                        desc: "학생 역량 관리",
                      },
                      { icon: FaGear, role: "공통", desc: "비밀번호 변경" },
                    ].map((item, index) => (
                      <div key={index} style={{ marginBottom: "0.8rem" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontWeight: "600",
                            color: "#2c3e50",
                            marginBottom: "0.3rem",
                          }}
                        >
                          <item.icon
                            style={{ marginRight: "0.5rem", color: "#4CAF50" }}
                          />
                          {item.role}
                        </div>
                        <div
                          style={{
                            fontSize: "0.9rem",
                            color: "#6c757d",
                            marginLeft: "1.5rem",
                            lineHeight: "1.4",
                          }}
                        >
                          {item.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>

      {/* 푸터 */}
      <footer
        style={{
          marginTop: "auto",
          background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
          boxShadow: "0 -5px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <AppFooter />
      </footer>
    </div>
  );
}
