import { Col, Row, Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export function CompetencyAssessmentTestResult() {
  const [memberSeq, setMemberSeq] = useState("");
  const [resultData, setResultData] = useState([]);
  const [memberName, setMemberName] = useState("");
  const [memberMajor, setMemberMajor] = useState("");
  const [studentNo, setStudentNo] = useState("");
  const [competency, setCompetency] = useState([]);
  const [questionList, setQuestionList] = useState([]);

  const navigate = useNavigate();
  const { assessmentSeq } = useParams();

  useEffect(() => {
    // 사용자 여부
    axios
      .get("/api/auth/status") // 로그인 상태 확인 API
      .then((res) => {
        if (!res.data.authName) {
          // 로그아웃 상태
          alert("로그인이 필요합니다.");
          navigate("/login");
        } else {
          // 로그인 상태
          console.log("로그인된 사용자 정보:", res.data);
          setMemberSeq(res.data.memberSeq);
          setMemberName(res.data.name);
        }
      })
      .catch((err) => {
        console.log("로그인 상태 확인 실패");
        navigate("/login");
      });

    // 점수 비교를 위한 문항 정보 가져오기
    axios
      .get(`/api/competency/assessment/test/resultQuestion/${assessmentSeq}`)
      .then((res) => {
        console.log("문항 정보 가져오기 성공", res.data);
        setQuestionList(res.data);
        if (res.data.length === 0) {
          alert("진단검사 결과가 없습니다.");
          navigate("/competency/assessment");
        }
      })
      .catch((err) => {
        console.log(
          "문항 정보 가져오기 실패",
          err.data(err.response.data.message),
        );
      });
  }, []);

  useEffect(() => {
    // 하위역량 불러오기
    axios
      .get("/api/competency/assessment/admin/subCompetency")
      .then((res) => {
        console.log("하위역량", res.data);
        setCompetency(res.data);
      })
      .catch((err) => {
        console.log("sub no");
      });

    // 결과(응답) 정보 가져오기
    axios
      .get(
        `/api/competency/assessment/test/result/${assessmentSeq}?memberSeq=${memberSeq}`,
      )
      .then((res) => {
        console.log("불러오기 성공", res.data);
        if (res.data.length === 0) {
          alert("진단검사 결과가 없습니다.");
          navigate("/competency/assessment");
        }
        setResultData(res.data);
        console.log("실험", res.data[0].memberSeqStudentMajor);
        setMemberMajor(res.data[0].memberSeqStudentMajor);
        setStudentNo(res.data[0].memberSeqStudentStudentNo);
      })
      .catch((err) => {
        console.log("불러오기 실패 ㅠㅠ", err.response.data.message);
      });
  }, [memberSeq, assessmentSeq]);

  if (!memberSeq) {
    return <div>로딩 중...</div>; // 혹은 스피너 컴포넌트 등 로딩 표시
  }

  // 역량, 점수 테이블 만들기
  const totalScores = {}; // 하위역량별 문제 총점
  const groupedResult = {}; // 핵심역량별 그룹화

  questionList.forEach((q) => {
    const core = q.subCompetencySeqCompetencySeqCompetencyName;
    const sub = q.subCompetencySeqSubCompetencyName;
    // 핵심역량 그룹화
    if (!groupedResult[core]) groupedResult[core] = { name: core, items: [] };

    // 중복 하위역량 방지
    if (!groupedResult[core].items.find((i) => i.name === sub)) {
      groupedResult[core].items.push({ name: sub });
    }

    // 하위역량별 총점
    totalScores[sub] = (totalScores[sub] || 0) + q.score;
  });
  // 학생 점수 매핑
  const studentScores = {}; // 하위역량별 학생 점수
  resultData.forEach((r) => {
    const sub = r.subCompetencySeqSubCompetencyName;
    const question = questionList.find((q) => q.caSeqSeq === r.caSeqSeq);
    const actualScore = question ? question.score * r.score : 0;
    studentScores[sub] = (studentScores[sub] || 0) + actualScore;
  });

  // Object.values로 배열 변환
  const groupedArray = Object.values(groupedResult);

  /*그래프 */
  // 퍼센트 계산
  const labels = Object.keys(totalScores);
  const percentages = labels.map((key) =>
    totalScores[key] > 0
      ? ((studentScores[key] || 0) / totalScores[key]) * 100
      : 0,
  );

  const data = {
    labels,
    datasets: [
      {
        label: "학생 점수 (%)",
        data: percentages.map((v) => v.toFixed(1)), // 소수점 1자리
        backgroundColor: "rgba(46, 125, 50, 0.8)", // 더 진한 초록색
        borderColor: "rgba(27, 94, 32, 1)", // 테두리 색상
        borderWidth: 2,
        borderRadius: 8, // 모서리 둥글게
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 16, // 범례 글자 크기 키움
            weight: "bold",
          },
          color: "#2e7d32",
        },
      },
      title: {
        display: true,
        text: "🌱 하위역량별 점수 비율",
        font: {
          size: 20, // 제목 글자 크기 키움
          weight: "bold",
        },
        color: "#1b5e20",
        padding: 20,
      },
      tooltip: {
        backgroundColor: "rgba(46, 125, 50, 0.9)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(27, 94, 32, 1)",
        borderWidth: 2,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 13,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 14, // x축 글자 크기 키움
            weight: "600",
          },
          color: "#2e7d32",
        },
        grid: {
          color: "rgba(129, 199, 132, 0.3)",
        },
      },
      y: {
        min: 0,
        max: 100, // 최대값 100으로 고정
        ticks: {
          callback: function (value) {
            return value + "%"; // y축에 % 표시
          },
          font: {
            size: 14, // y축 글자 크기 키움
            weight: "600",
          },
          color: "#2e7d32",
        },
        grid: {
          color: "rgba(129, 199, 132, 0.3)",
        },
      },
    },
  };
  return (
    <>
      {/* 상단 섹션: 학생 정보 + 그래프 */}
      <Row className="d-flex justify-content-center my-5">
        <Col xs={12} md={10} lg={10} xl={9}>
          <Row className="align-items-stretch">
            {" "}
            {/* align-items-stretch로 높이 맞춤 */}
            {/* 왼쪽: 학생 정보 */}
            <Col xs={12} md={12} lg={4} xl={4} className="mb-5">
              <div className="h-100 d-flex flex-column mb-5">
                {" "}
                {/* h-100으로 전체 높이, flex-column으로 세로 배치 */}
                {/* 타이틀 */}
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, #2e7d32, #66bb6a, #4caf50)",
                    borderRadius: "20px",
                    padding: "20px 25px",
                    marginBottom: "20px",
                    boxShadow: "0 8px 25px rgba(46, 125, 50, 0.3)",
                    border: "3px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <h2
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "24px",
                      textAlign: "center",
                      margin: 0,
                      textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                      letterSpacing: "1px",
                    }}
                  >
                    🎯 진단검사 결과
                  </h2>
                </div>
                {/* 학생 정보 카드 - flex-grow-1로 남은 공간 채우기 */}
                <div
                  className="flex-grow-1 d-flex flex-column justify-content-center"
                  style={{
                    background: "linear-gradient(135deg, #e8f5e9, #f1f8e9)",
                    padding: "25px",
                    borderRadius: "20px",
                    boxShadow: "0 8px 20px rgba(46, 125, 50, 0.15)",
                    border: "2px solid rgba(129, 199, 132, 0.3)",
                  }}
                >
                  {/* 이름 카드 */}
                  <div
                    style={{
                      background: "linear-gradient(135deg, #c8e6c9, #dcedc8)",
                      padding: "18px 25px",
                      borderRadius: "15px",
                      marginBottom: "15px",
                      boxShadow: "0 4px 10px rgba(46, 125, 50, 0.15)",
                      border: "2px solid rgba(102, 187, 106, 0.3)",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.transform = "translateY(-2px)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.transform = "translateY(0px)")
                    }
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span
                        style={{
                          fontSize: "20px",
                          marginRight: "10px",
                        }}
                      >
                        👤
                      </span>
                      <span
                        style={{
                          color: "#2e7d32",
                          fontWeight: "600",
                          fontSize: "18px",
                        }}
                      >
                        이름:
                      </span>
                      <span
                        style={{
                          color: "#1b5e20",
                          fontWeight: "bold",
                          fontSize: "18px",
                          marginLeft: "8px",
                        }}
                      >
                        {memberName}
                      </span>
                    </div>
                  </div>

                  {/* 학번 카드 */}
                  <div
                    style={{
                      background: "linear-gradient(135deg, #c8e6c9, #dcedc8)",
                      padding: "18px 25px",
                      borderRadius: "15px",
                      marginBottom: "15px",
                      boxShadow: "0 4px 10px rgba(46, 125, 50, 0.15)",
                      border: "2px solid rgba(102, 187, 106, 0.3)",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.transform = "translateY(-2px)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.transform = "translateY(0px)")
                    }
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span
                        style={{
                          fontSize: "20px",
                          marginRight: "10px",
                        }}
                      >
                        🎓
                      </span>
                      <span
                        style={{
                          color: "#2e7d32",
                          fontWeight: "600",
                          fontSize: "18px",
                        }}
                      >
                        학번:
                      </span>
                      <span
                        style={{
                          color: "#1b5e20",
                          fontWeight: "bold",
                          fontSize: "18px",
                          marginLeft: "8px",
                        }}
                      >
                        {studentNo}
                      </span>
                    </div>
                  </div>

                  {/* 학과 카드 */}
                  <div
                    style={{
                      background: "linear-gradient(135deg, #c8e6c9, #dcedc8)",
                      padding: "18px 25px",
                      borderRadius: "15px",
                      boxShadow: "0 4px 10px rgba(46, 125, 50, 0.15)",
                      border: "2px solid rgba(102, 187, 106, 0.3)",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.transform = "translateY(-2px)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.transform = "translateY(0px)")
                    }
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span
                        style={{
                          fontSize: "20px",
                          marginRight: "10px",
                        }}
                      >
                        🏫
                      </span>
                      <span
                        style={{
                          color: "#2e7d32",
                          fontWeight: "600",
                          fontSize: "18px",
                        }}
                      >
                        학과:
                      </span>
                      <span
                        style={{
                          color: "#1b5e20",
                          fontWeight: "bold",
                          fontSize: "18px",
                          marginLeft: "8px",
                        }}
                      >
                        {memberMajor}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            {/* 오른쪽: 그래프 */}
            <Col xs={12} md={12} lg={8} xl={8} className="mb-5">
              <div className="h-100 d-flex flex-column">
                {" "}
                {/* h-100으로 전체 높이, flex-column으로 세로 배치 */}
                {/* 그래프 타이틀 */}
                <div
                  style={{
                    background: "linear-gradient(135deg, #2e7d32, #4caf50)",
                    borderRadius: "20px",
                    padding: "20px 25px",
                    marginBottom: "20px",
                    boxShadow: "0 8px 25px rgba(46, 125, 50, 0.3)",
                    border: "3px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <h2
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "24px",
                      textAlign: "center",
                      margin: 0,
                      textShadow: "1px 1px 3px rgba(0,0,0,0.3)",
                      letterSpacing: "1px",
                    }}
                  >
                    📊 역량별 점수 현황
                  </h2>
                </div>
                {/* 그래프 컨테이너 - flex-grow-1로 남은 공간 채우기 */}
                <div
                  className="flex-grow-1 d-flex align-items-center justify-content-center"
                  style={{
                    background: "linear-gradient(135deg, #f1f8e9, #e8f5e9)",
                    padding: "30px",
                    borderRadius: "20px",
                    boxShadow: "0 8px 25px rgba(46, 125, 50, 0.15)",
                    border: "2px solid rgba(129, 199, 132, 0.3)",
                    minHeight: "400px", // 최소 높이 보장
                  }}
                >
                  <div style={{ width: "100%", height: "100%" }}>
                    <Bar data={data} options={options} />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* 하단 섹션: 테이블 */}
      <Row className="d-flex justify-content-center mb-5">
        <Col xs={12} md={11} lg={10} xl={9}>
          <hr
            style={{
              borderTop: "3px solid #66bb6a",
              marginBottom: "40px",
              borderRadius: "2px",
              opacity: "0.8",
            }}
          />

          {/* 테이블 제목 */}
          <div
            style={{
              background: "linear-gradient(135deg, #2e7d32, #4caf50)",
              borderRadius: "15px",
              padding: "20px",
              marginBottom: "25px",
              boxShadow: "0 6px 20px rgba(46, 125, 50, 0.25)",
            }}
          >
            <h3
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: "24px",
                textAlign: "center",
                margin: 0,
                textShadow: "1px 1px 3px rgba(0,0,0,0.3)",
              }}
            >
              📊 역량별 세부 결과
            </h3>
          </div>

          {/* 테이블 */}
          <div
            style={{
              background: "linear-gradient(135deg, #f1f8e9, #e8f5e9)",
              padding: "25px",
              borderRadius: "20px",
              boxShadow: "0 8px 25px rgba(46, 125, 50, 0.3)",
              border: "3px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <Table
              striped
              bordered
              hover
              responsive
              className="text-center align-middle"
              style={{
                margin: 0,
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 4px 15px rgba(46, 125, 50, 0.1)",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "linear-gradient(135deg, #2e7d32, #388e3c)",
                    color: "white",
                  }}
                >
                  <th
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      padding: "18px 15px",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                      border: "2px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    🎯 핵심역량
                  </th>
                  <th
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      padding: "18px 15px",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                      border: "2px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    🔹 하위역량
                  </th>
                  <th
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      padding: "18px 15px",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                      border: "2px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    📝 문항 점수
                  </th>
                  <th
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      padding: "18px 15px",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                      border: "2px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    📊 합계 점수
                  </th>
                  <th
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      padding: "18px 15px",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                      border: "2px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    💯 평균 점수
                  </th>
                </tr>
              </thead>
              <tbody>
                {groupedArray.length > 0 ? (
                  groupedArray.map((group, groupIndex) =>
                    group.items.map((item, itemIndex) => {
                      const percent =
                        totalScores[item.name] > 0
                          ? (studentScores[item.name] /
                              totalScores[item.name]) *
                            100
                          : 0;

                      // 색상 구분
                      let bgColor = "";
                      let textColor = "#1b5e20";
                      let emoji = "";
                      if (percent >= 80) {
                        bgColor = "linear-gradient(135deg, #c8e6c9, #a5d6a7)";
                        emoji = "🌟";
                      } else if (percent >= 70) {
                        bgColor = "linear-gradient(135deg, #dcedc8, #c5e1a5)";
                        emoji = "✨";
                      } else if (percent >= 50) {
                        bgColor = "linear-gradient(135deg, #fff9c4, #f0f4c3)";
                        emoji = "⚡";
                      } else if (percent >= 30) {
                        bgColor = "linear-gradient(135deg, #ffe0b2, #ffcc02)";
                        emoji = "⚠️";
                      } else {
                        bgColor = "linear-gradient(135deg, #ffcdd2, #ef9a9a)";
                        emoji = "🔥";
                      }

                      return (
                        <tr
                          key={`${group.name}-${itemIndex}`}
                          style={{
                            background: bgColor,
                            transition: "all 0.3s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.02)";
                            e.currentTarget.style.boxShadow =
                              "0 4px 15px rgba(46, 125, 50, 0.2)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        >
                          {itemIndex === 0 && (
                            <td
                              rowSpan={group.items.length}
                              style={{
                                fontSize: "15px",
                                fontWeight: "bold",
                                color: textColor,
                                padding: "15px",
                                verticalAlign: "middle",
                                border: "1px solid rgba(129, 199, 132, 0.3)",
                              }}
                            >
                              {group.name}
                            </td>
                          )}
                          <td
                            style={{
                              fontSize: "15px",
                              fontWeight: "600",
                              color: textColor,
                              padding: "15px",
                              border: "1px solid rgba(129, 199, 132, 0.3)",
                            }}
                          >
                            {item.name}
                          </td>
                          <td
                            style={{
                              fontSize: "15px",
                              fontWeight: "600",
                              color: textColor,
                              padding: "15px",
                              border: "1px solid rgba(129, 199, 132, 0.3)",
                            }}
                          >
                            {totalScores[item.name]?.toFixed(1) || 0}
                          </td>
                          <td
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              color: textColor,
                              padding: "15px",
                              border: "1px solid rgba(129, 199, 132, 0.3)",
                            }}
                          >
                            {studentScores[item.name]?.toFixed(1) || 0}
                          </td>
                          <td
                            style={{
                              fontSize: "16px",
                              fontWeight: "bold",
                              color: textColor,
                              padding: "15px",
                              border: "1px solid rgba(129, 199, 132, 0.3)",
                            }}
                          >
                            {emoji} {percent.toFixed(1)}%
                          </td>
                        </tr>
                      );
                    }),
                  )
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        fontSize: "16px",
                        padding: "30px",
                        color: "#2e7d32",
                        fontWeight: "600",
                      }}
                    >
                      📂 데이터가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr
                  style={{
                    background: "linear-gradient(135deg, #1b5e20, #2e7d32)",
                    color: "white",
                  }}
                >
                  <td
                    colSpan={2}
                    style={{
                      fontSize: "17px",
                      fontWeight: "bold",
                      padding: "20px 15px",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                      border: "2px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    🏆 총점
                  </td>
                  <td
                    style={{
                      fontSize: "17px",
                      fontWeight: "bold",
                      padding: "20px 15px",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                      border: "2px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    {Object.values(totalScores)
                      .reduce((a, b) => a + b, 0)
                      .toFixed(1)}
                  </td>
                  <td
                    style={{
                      fontSize: "17px",
                      fontWeight: "bold",
                      padding: "20px 15px",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                      border: "2px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    {Object.values(studentScores)
                      .reduce((a, b) => a + b, 0)
                      .toFixed(1)}
                  </td>
                  <td
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      padding: "20px 15px",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                      border: "2px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    🎯{" "}
                    {Object.keys(totalScores).length > 0
                      ? (
                          (Object.values(studentScores).reduce(
                            (a, b) => a + b,
                            0,
                          ) /
                            Object.values(totalScores).reduce(
                              (a, b) => a + b,
                              0,
                            )) *
                          100
                        ).toFixed(1) + "%"
                      : "0%"}
                  </td>
                </tr>
              </tfoot>
            </Table>
          </div>
        </Col>
      </Row>
    </>
  );
}
