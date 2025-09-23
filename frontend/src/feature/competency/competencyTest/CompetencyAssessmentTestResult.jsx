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
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "하위역량별 점수 비율",
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100, // 최대값 100으로 고정
        ticks: {
          callback: function (value) {
            return value + "%"; // y축에 % 표시
          },
        },
      },
    },
  };

  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <h3 className="">진단검사 결과</h3>
          <div className="mb-5"></div>
          이름: {memberName}
          <br />
          학번: {studentNo}
          <br />
          학과: {memberMajor}
          <br />
          <hr />
          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={8}>
              <Bar data={data} options={options} className="mb-5" />
            </Col>
          </Row>
          <hr className="mb-5" />
          <h3 className="mb-3">역량 별 세부 결과</h3>
          {/* 역량 별 데이터 보여주기*/}
          <Table
            striped
            bordered
            hover
            responsive
            className="text-center align-middle"
          >
            <thead style={{ backgroundColor: "#f0f4f8", fontWeight: "bold" }}>
              <tr
                style={{
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                <th>핵심역량</th>
                <th>하위역량</th>
                <th>문항 점수</th>
                <th>합계 점수</th>
                <th>평균 점수</th>
              </tr>
            </thead>
            <tbody>
              {groupedArray.length > 0 ? (
                groupedArray.map((group, groupIndex) =>
                  group.items.map((item, itemIndex) => {
                    const percent =
                      totalScores[item.name] > 0
                        ? (studentScores[item.name] / totalScores[item.name]) *
                          100
                        : 0;

                    // 점수에 따라 배경색
                    let bgColor = "";
                    if (percent >= 70)
                      bgColor = "#d4edda"; // 초록
                    else if (percent >= 40)
                      bgColor = "#fff3cd"; // 노랑
                    else bgColor = "#f8d7da"; // 빨강

                    return (
                      <tr
                        key={`${group.name}-${itemIndex}`}
                        style={{ backgroundColor: bgColor }}
                      >
                        {itemIndex === 0 && (
                          <td rowSpan={group.items.length}>{group.name}</td>
                        )}
                        <td>{item.name}</td>
                        <td>{totalScores[item.name]?.toFixed(1) || 0}</td>
                        <td>{studentScores[item.name]?.toFixed(1) || 0}</td>
                        <td>{percent.toFixed(1)}%</td>
                      </tr>
                    );
                  }),
                )
              ) : (
                <tr>
                  <td colSpan="5">데이터가 없습니다.</td>
                </tr>
              )}
            </tbody>
            <tfoot style={{ fontWeight: "bold", backgroundColor: "#e9ecef" }}>
              <tr
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                <td colSpan={2}>총점</td>
                <td>
                  {Object.values(totalScores)
                    .reduce((a, b) => a + b, 0)
                    .toFixed(1)}
                </td>
                <td>
                  {Object.values(studentScores)
                    .reduce((a, b) => a + b, 0)
                    .toFixed(1)}
                </td>
                <td>
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
        </Col>
      </Row>
    </>
  );
}
