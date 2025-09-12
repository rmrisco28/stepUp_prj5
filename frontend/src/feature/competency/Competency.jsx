import { Button, Col, Row, Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export function Competency() {
  const [competency, setCompetency] = useState([]);
  let navigate = useNavigate();

  const grouped = {};
  competency.forEach((item) => {
    const key = item.competencySeqCompetencyName;
    if (!grouped[key]) {
      grouped[key] = {
        expln: item.subCompetencyExpln, // 같은 정의
        count: 1,
      };
    } else {
      grouped[key].count += 1;
    }
  });

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
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="mb-4"></div>
          <h2 className="text-center mb-5" style={{ fontWeight: "bold" }}>
            핵심역량 소개
          </h2>
          <h4 style={{ fontWeight: "bold" }}> 핵심역량 정의</h4>
          {/* 핵심역량 이미지*/}
          <img
            className="img-fluid mb-3"
            src="/image/핵심역량.png"
            alt="핵심역량"
            style={{ width: "100%" }}
          />
          <hr className="mb-5" />
          <Table>
            <thead>
              <tr>
                <th
                  style={{
                    width: "15%",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  핵심역량
                </th>
                <th
                  style={{
                    width: "15%",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  핵심역량 정의
                </th>
                <th
                  style={{
                    width: "15%",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  하위역량
                </th>
                <th
                  style={{
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  하위역량 정의
                </th>
              </tr>
            </thead>
            <tbody>
              {competency && competency.length > 0 ? (
                competency.map((data, index) => (
                  <tr key={data.seq}>
                    <td
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      {data.competencySeqCompetencyName}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      {data.competencySeqCompetencyExpln}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      {data.subCompetencyName}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                      }}
                    >
                      {data.subCompetencyExpln}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">데이터가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </Table>
          <hr />
          <hr />
          <hr />
          <hr />
          {/*핵심역량 */}
          <h4 className=" mb-4" style={{ fontWeight: "bold" }}>
            핵심역량 및 하위역량 정의
          </h4>
          {/* 핵심역량 표 */}
          <Table className="mb-5" summary="핵심역량 및 하위역량">
            <thead>
              <tr>
                <th
                  scope="col"
                  style={{
                    width: "100px",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  핵심역량
                </th>
                <th
                  scope="col"
                  style={{
                    width: "150px",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  핵심역량 정의
                </th>
                <th
                  scope="col"
                  style={{
                    width: "100px",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  하위역량
                </th>
                <th
                  scope="col"
                  style={{
                    width: "200px",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  하위역량의 정의
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan="3" align="center" valign="middle">
                  <strong className="es_tit">글로벌 소통역량</strong>
                </td>
                <td rowSpan="3" align="center" valign="middle">
                  공간과 시간, 언어의 장벽을 넘어 소통하고 협력할 수 있는 역량
                </td>
                <td>1. 효율적 커뮤니케이션</td>
                <td>
                  타인과의 커뮤니케이션 상황에서 적절한 수준과 스타일, 수단을
                  선택적으로 활용할 수 있는 능력
                </td>
              </tr>
              <tr>
                <td>2. 외국어 의사소통</td>
                <td>외국어로 자신의 주의, 주장, 관점을 전달할 수 있는 능력</td>
              </tr>
              <tr>
                <td>3. 타 문화 이해</td>
                <td>
                  문화의 보편성 뿐만 아니라 자문화 중심에서 벗어나 다양한 문화의
                  특수성을 이해하고 포용하는 능력
                </td>
              </tr>
              <tr>
                <td rowSpan="3" align="center" valign="middle">
                  <strong className="es_tit">전문탐구역량</strong>
                </td>
                <td rowSpan="3" align="center" valign="middle">
                  전문분야에 대한 기본 역량을 바탕으로 문제를 해결할 수 있는
                  역량
                </td>
                <td>4. 체계적 전공지식 습득</td>
                <td>
                  전공분야의 폭넓은 지식습득을 통한 전공에 대한 체계적 관점 형성
                  능력
                </td>
              </tr>
              <tr>
                <td>5. 전공-타전공 관련성 파악</td>
                <td>
                  전공분야와 인접학문의 관련성을 명확히 이해함으로써 전공의
                  가능성과 한계를 인식할 수 있는 능력
                </td>
              </tr>
              <tr>
                <td>6. 전공관련 의도적 문제제기</td>
                <td>
                  전공분야의 핵심이슈를 중심으로 의도적으로 문제를 제기하고 이를
                  해결할 수 있는 아이디어를 도출할 수 있는 능력
                </td>
              </tr>
              <tr>
                <td rowSpan="3" align="center" valign="middle">
                  <strong className="es_tit">통섭융합역량</strong>
                  <p className="es_txt">All-round Expert</p>
                </td>
                <td rowSpan="3" align="center" valign="middle">
                  인문학적 소양과 전문 분야의 지식을 융합하여 문제를 해결할 수
                  있는 역량
                </td>
                <td>7. 폭넓은 인문지식 습득</td>
                <td>
                  전공의 한계에서 벗어나 현상을 보는 다양한 관점을 체계적으로
                  습득할 수 있는 능력
                </td>
              </tr>
              <tr>
                <td>8. 비판적 사고</td>
                <td>
                  현실에서 마주하게 되는 다양한 현상의 원인을 다양한 각도에서
                  비판적으로 성찰할 수 있는 능력
                </td>
              </tr>
              <tr>
                <td>9. 융합적 사고</td>
                <td>
                  다양한 지적 안목이 요구되는 구체적 문제상황을 설정하고, 해결
                  대안을 제시하는 능력
                </td>
              </tr>
              <tr>
                <td rowSpan="3" align="center" valign="middle">
                  <strong className="es_tit">창의도전역량</strong>
                  <p className="es_txt">Creative Challenge</p>
                </td>
                <td rowSpan="3" align="center" valign="middle">
                  창의와 도전정신으로 새로운 미래를 개척할 수 있는 역량
                </td>
                <td>10. 감수성</td>
                <td>
                  문제상황에 직, 간접적으로 영향을 미치는 요인들을 세밀하게
                  관찰하여 필요, 아픔을 감지해 낼 수 있는 능력
                </td>
              </tr>
              <tr>
                <td>11. 도전정신</td>
                <td>
                  현실의 한계에도 불구, 한계를 돌파하고자 하는 열정과 신념을
                  유지할 수 있는 능력
                </td>
              </tr>
              <tr>
                <td>12. 창조성</td>
                <td>
                  다양한 아이디어를 도출하고 이를 구체적 현실로 구현할 수 있는
                  능력
                </td>
              </tr>
              <tr>
                <td rowSpan="3" align="center" valign="middle">
                  <strong className="es_tit">윤리인성역량</strong>
                  <p className="es_txt">Ethical Leaders</p>
                </td>
                <td rowSpan="3" align="center" valign="middle">
                  도덕성을 바탕으로 화합과 봉사의 정신을 구현할 수 있는 역량
                </td>
                <td>13. 윤리적 실천</td>
                <td>
                  공동체가 소중히 여기는 윤리적 가치를 이해하고 이를 현실에서
                  실천하는 능력
                </td>
              </tr>
              <tr>
                <td>14. 화합과 협력</td>
                <td>
                  타인과의 협업 과정에서 발생하는 다양한 갈등을 극복하고
                  시너지를 창출할 수 있는 능력
                </td>
              </tr>
              <tr>
                <td>15. 배려와 봉사</td>
                <td>
                  자신의 관심과 전공을 중심으로 타인 배려를 통한 연대의식을
                  심화할 수 있는 능력
                </td>
              </tr>
            </tbody>
          </Table>
          {/* 게시물 작성 editor 버튼*/}
          <Button onClick={() => navigate("/competency/editor")}>
            게시물 수정
          </Button>
        </Col>
      </Row>
    </>
  );
}
