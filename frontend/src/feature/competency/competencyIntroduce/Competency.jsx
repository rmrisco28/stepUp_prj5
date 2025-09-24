import { Button, Col, Row, Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";

export function Competency() {
  const [competency, setCompetency] = useState([]);

  // 핵심역량 구분
  const groupedCompetency = {};

  competency.forEach((item) => {
    const key = item.competencySeqCompetencyName;

    if (!groupedCompetency[key]) {
      groupedCompetency[key] = {
        name: key,
        expln: item.competencySeqCompetencyExpln,
        items: [],
      };
    }

    groupedCompetency[key].items.push({
      name: item.subCompetencyName,
      expln: item.subCompetencyExpln,
    });
  });

  // Object.values로 배열로 변환
  const groupedArray = Object.values(groupedCompetency);

  useEffect(() => {
    axios
      .get("/api/competency")
      .then((res) => {
        console.log("yes");
        setCompetency(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("no");
      })
      .finally(() => {
        console.log("finally");
      });
  }, []);

  return (
    <>
      <Row className="justify-content-center my-5">
        <Col xs={12} md={10} lg={8} xl={7}>
          <div className="mb-4"></div>

          {/* 메인 타이틀 */}
          <div
            style={{
              background: "linear-gradient(135deg, #e8f5e8, #f1f8f1)",
              borderRadius: "15px",
              padding: "25px",
              marginBottom: "40px",
              boxShadow: "0 4px 15px rgba(46, 125, 50, 0.1)",
              border: "1px solid rgba(129, 199, 132, 0.2)",
            }}
          >
            <h2
              className="text-center mb-0"
              style={{
                fontWeight: "bold",
                color: "#2e7d32",
                fontSize: "28px",
              }}
            >
              🌿 핵심역량 안내
            </h2>
          </div>

          {/* 핵심역량 섹션 */}
          <div
            style={{
              background: "linear-gradient(135deg, #f8fdf8, #f1f8f1)",
              borderRadius: "20px",
              padding: "30px",
              marginBottom: "30px",
              boxShadow: "0 6px 20px rgba(46, 125, 50, 0.08)",
              border: "1px solid rgba(129, 199, 132, 0.15)",
            }}
          >
            <h4
              style={{
                fontWeight: "bold",
                color: "#2e7d32",
                marginBottom: "25px",
                fontSize: "22px",
              }}
            >
              📋 핵심역량
            </h4>

            {/* 이미지 컨테이너 - 은은한 배경 */}
            <div
              style={{
                background: "linear-gradient(135deg, #e8f5e8, #f4f9f4)",
                borderRadius: "15px",
                padding: "20px",
                marginBottom: "25px",
                boxShadow: "0 4px 12px rgba(46, 125, 50, 0.05)",
                border: "1px solid rgba(129, 199, 132, 0.1)",
              }}
            >
              <img
                className="img-fluid"
                src="/image/핵심역량.png"
                alt="핵심역량"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                }}
              />
            </div>
          </div>

          <hr
            className="mb-5"
            style={{
              borderTop: "2px solid #c8e6c9",
              borderRadius: "1px",
              opacity: "0.6",
            }}
          />

          {/* 테이블 컨테이너 */}
          <div
            style={{
              background: "linear-gradient(135deg, #fafdfb, #f8fcf8)",
              borderRadius: "20px",
              padding: "25px",
              boxShadow: "0 6px 20px rgba(46, 125, 50, 0.06)",
              border: "1px solid rgba(129, 199, 132, 0.12)",
            }}
          >
            <Table
              responsive
              className="mb-0"
              style={{
                borderCollapse: "separate",
                borderSpacing: "0",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 2px 10px rgba(46, 125, 50, 0.04)",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "linear-gradient(135deg, #c8e6c9, #d4edda)",
                  }}
                >
                  <th
                    style={{
                      width: "20%",
                      textAlign: "center",
                      verticalAlign: "middle",
                      padding: "18px 15px",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#1b5e20",
                      border: "1px solid rgba(129, 199, 132, 0.2)",
                      borderBottom: "2px solid rgba(129, 199, 132, 0.3)",
                    }}
                  >
                    🎯 핵심역량
                  </th>
                  <th
                    style={{
                      width: "25%",
                      textAlign: "center",
                      verticalAlign: "middle",
                      padding: "18px 15px",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#1b5e20",
                      border: "1px solid rgba(129, 199, 132, 0.2)",
                      borderBottom: "2px solid rgba(129, 199, 132, 0.3)",
                    }}
                  >
                    📖 핵심역량 정의
                  </th>
                  <th
                    style={{
                      width: "20%",
                      textAlign: "center",
                      verticalAlign: "middle",
                      padding: "18px 15px",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#1b5e20",
                      border: "1px solid rgba(129, 199, 132, 0.2)",
                      borderBottom: "2px solid rgba(129, 199, 132, 0.3)",
                    }}
                  >
                    🔹 하위역량
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      padding: "18px 15px",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#1b5e20",
                      border: "1px solid rgba(129, 199, 132, 0.2)",
                      borderBottom: "2px solid rgba(129, 199, 132, 0.3)",
                    }}
                  >
                    📝 하위역량 정의
                  </th>
                </tr>
              </thead>
              <tbody>
                {groupedArray.length > 0 ? (
                  groupedArray.map((group, groupIndex) =>
                    group.items.map((item, itemIndex) => (
                      <tr
                        key={`${group.name}-${itemIndex}`}
                        style={{
                          background:
                            itemIndex % 2 === 0
                              ? "rgba(248, 255, 248, 0.8)"
                              : "rgba(241, 248, 241, 0.6)",
                          transition: "background-color 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(232, 245, 232, 0.8)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            itemIndex % 2 === 0
                              ? "rgba(248, 255, 248, 0.8)"
                              : "rgba(241, 248, 241, 0.6)";
                        }}
                      >
                        {/* 핵심역량 이름/정의는 첫 줄에만 rowSpan으로 출력 */}
                        {itemIndex === 0 && (
                          <>
                            <td
                              rowSpan={group.items.length}
                              style={{
                                textAlign: "center",
                                verticalAlign: "middle",
                                padding: "16px 12px",
                                fontSize: "15px",
                                fontWeight: "600",
                                color: "#2e7d32",
                                border: "1px solid rgba(129, 199, 132, 0.15)",
                                background:
                                  "linear-gradient(135deg, rgba(232, 245, 232, 0.3), rgba(241, 248, 241, 0.3))",
                              }}
                            >
                              {group.name}
                            </td>
                            <td
                              rowSpan={group.items.length}
                              style={{
                                textAlign: "left",
                                verticalAlign: "middle",
                                padding: "16px 12px",
                                fontSize: "14px",
                                color: "#388e3c",
                                lineHeight: "1.5",
                                border: "1px solid rgba(129, 199, 132, 0.15)",
                                background:
                                  "linear-gradient(135deg, rgba(232, 245, 232, 0.3), rgba(241, 248, 241, 0.3))",
                              }}
                            >
                              {group.expln}
                            </td>
                          </>
                        )}
                        <td
                          style={{
                            textAlign: "center",
                            verticalAlign: "middle",
                            padding: "14px 12px",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#2e7d32",
                            border: "1px solid rgba(129, 199, 132, 0.15)",
                          }}
                        >
                          {item.name}
                        </td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            padding: "14px 12px",
                            fontSize: "14px",
                            color: "#388e3c",
                            lineHeight: "1.5",
                            border: "1px solid rgba(129, 199, 132, 0.15)",
                          }}
                        >
                          {item.expln}
                        </td>
                      </tr>
                    )),
                  )
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      style={{
                        textAlign: "center",
                        padding: "30px",
                        fontSize: "16px",
                        color: "#66bb6a",
                        fontWeight: "500",
                      }}
                    >
                      📂 데이터가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          {/* 게시물 작성 editor 버튼*/}
          {/*<Button onClick={() => navigate("/competency/editor")}>*/}
          {/*  게시물 수정*/}
          {/*</Button>*/}
        </Col>
      </Row>
    </>
  );
}
