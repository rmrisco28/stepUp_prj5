import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import axios from "axios";
import { ExtraCurricularCardList } from "../feature/extracurricular/ExtraCurricularCardList.jsx";
import { StepUpBanner } from "./StepUpBanner.jsx";
import { useNavigate } from "react-router";
import { ExtraCurricular } from "../feature/extracurricular/ExtraCurricular.jsx";

export function MainPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true); // 초기값을 true로 변경
  const navigate = useNavigate();

  // programs 데이터를 불러오는 useEffect
  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/extracurricular/list")
      .then((res) => {
        setPrograms(res.data.programList);
      })
      .catch((err) => console.error("목록 불러오기 실패", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "60vh",
          background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        }}
      >
        <div className="text-center">
          <Spinner
            animation="border"
            style={{
              width: "3rem",
              height: "3rem",
              color: "#4CAF50",
            }}
          />
          <div
            className="mt-3"
            style={{ color: "#6c757d", fontSize: "1.1rem" }}
          >
            비교과 프로그램을 불러오는 중...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f1f3f4 100%)",
        minHeight: "100vh",
      }}
    >
      <Container className="py-4">
        <div className="mx-auto" style={{ maxWidth: "1200px" }}>
          {/* 배너 섹션 */}
          <div className="mb-5">
            <StepUpBanner />
          </div>

          {/* 프로그램 섹션 */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              borderRadius: "20px",
              padding: "2rem",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            {/* 섹션 헤더 */}
            <div className="text-center mb-4">
              <h2
                style={{
                  color: "#2c3e50",
                  fontWeight: "700",
                  fontSize: "2.2rem",
                  marginBottom: "0.5rem",
                  background: "linear-gradient(135deg, #4CAF50, #45a049)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                최신 등록 비교과 프로그램
              </h2>
              {/*🌟흠*/}
              {/*<div*/}
              {/*  style={{*/}
              {/*    width: "100px",*/}
              {/*    height: "4px",*/}
              {/*    background: "linear-gradient(90deg, #4CAF50, #45a049)",*/}
              {/*    margin: "0 auto",*/}
              {/*    // marginRight: "0",*/}
              {/*    borderRadius: "2px",*/}
              {/*  }}*/}
              {/*></div>*/}
              <p
                style={{
                  color: "#6c757d",
                  fontSize: "1.1rem",
                  marginTop: "1rem",
                  fontWeight: "400",
                }}
              >
                다양한 비교과 활동으로 여러분의 대학생활을 더욱 풍성하게
                만들어보세요!
              </p>
            </div>

            {/* 프로그램 리스트 또는 빈 상태 */}
            {programs.length > 0 ? (
              <div>
                <ExtraCurricularCardList programs={programs.slice(0, 6)} />

                {/* 더 많은 프로그램 보기 버튼 */}
                {programs.length > 6 && (
                  <div className="text-center mt-4">
                    <button
                      className="btn"
                      style={{
                        background: "linear-gradient(135deg, #4CAF50, #45a049)",
                        border: "none",
                        color: "white",
                        padding: "12px 30px",
                        borderRadius: "50px",
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        transition: "all 0.3s ease",
                        boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow =
                          "0 6px 20px rgba(76, 175, 80, 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow =
                          "0 4px 15px rgba(76, 175, 80, 0.3)";
                      }}
                      // onClick={() => <ExtraCurricular />}
                      onClick={() => navigate("/extracurricular")}
                    >
                      더 많은 프로그램 보러가기 {/*{programs.length - 6 >= 5*/}
                      {/*  ? `(${programs.length - 6}개)`*/}
                      {/*  : ">"}*/}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div
                className="text-center py-5"
                style={{
                  background:
                    "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                  borderRadius: "15px",
                  border: "2px dashed #dee2e6",
                }}
              >
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📚</div>
                <h4 style={{ color: "#6c757d", marginBottom: "0.5rem" }}>
                  아직 등록된 프로그램이 없습니다
                </h4>
                <p style={{ color: "#adb5bd", fontSize: "1rem" }}>
                  곧 새로운 비교과 프로그램이 업데이트될 예정입니다!
                </p>
              </div>
            )}
          </div>

          {/* 추가 정보 섹션 */}
          <div className="row mt-5">
            <div className="col-md-4 mb-3">
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.8)",
                  padding: "1.5rem",
                  borderRadius: "15px",
                  textAlign: "center",
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.08)",
                  transition: "transform 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.transform = "translateY(-5px)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.transform = "translateY(0)")
                }
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                  🎯
                </div>
                <h5 style={{ color: "#2c3e50", fontWeight: "600" }}>
                  목표 달성
                </h5>
                <p style={{ color: "#6c757d", fontSize: "0.9rem", margin: 0 }}>
                  체계적인 비교과 활동으로
                  <br />
                  목표를 달성하세요
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.8)",
                  padding: "1.5rem",
                  borderRadius: "15px",
                  textAlign: "center",
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.08)",
                  transition: "transform 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.transform = "translateY(-5px)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.transform = "translateY(0)")
                }
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                  🤝
                </div>
                <h5 style={{ color: "#2c3e50", fontWeight: "600" }}>
                  네트워킹
                </h5>
                <p style={{ color: "#6c757d", fontSize: "0.9rem", margin: 0 }}>
                  다양한 사람들과
                  <br />
                  의미있는 관계를 만들어보세요
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.8)",
                  padding: "1.5rem",
                  borderRadius: "15px",
                  textAlign: "center",
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.08)",
                  transition: "transform 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.transform = "translateY(-5px)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.transform = "translateY(0)")
                }
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                  🚀
                </div>
                <h5 style={{ color: "#2c3e50", fontWeight: "600" }}>성장</h5>
                <p style={{ color: "#6c757d", fontSize: "0.9rem", margin: 0 }}>
                  새로운 도전을 통해
                  <br />한 단계 성장하세요
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
