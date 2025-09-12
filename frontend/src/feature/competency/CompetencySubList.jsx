import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router";

export function CompetencySubList() {
  const [competency, setCompetency] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/competency/subList")
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

  function handleUseYnChange(seq, currentUseYn) {
    axios
      .put(`/api/competency/subUpdate/${seq}`, {
        useYn: !currentUseYn,
      })
      .then((res) => {
        console.log("yes");
        setCompetency((prevCompetency) => {
          prevCompetency.map((data) =>
            competency.seq === seq
              ? { ...data, useYn: !currentUseYn }
              : competency,
          );
        });

        fetchCompetencies();
      })
      .catch((err) => {
        console.log("no");
      })
      .finally(() => {
        console.log("finally");
      });
  }

  // 데이터를 다시 불러오는 함수
  const fetchCompetencies = () => {
    axios
      .get("/api/competency/subList")
      .then((res) => {
        setCompetency(res.data); // 데이터 새로 설정
      })
      .catch((err) => {
        console.log("데이터 불러오기 실패", err);
      });
  };

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={10} md={8} lg={6}>
          <div className="mb-3"></div>
          <h2 className="mb-3">하위역량 목록 </h2>
          <Table>
            <thead>
              <tr>
                <th
                  style={{
                    width: "6%",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  번호
                </th>
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
                <th
                  style={{
                    width: "10%",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  사용여부
                </th>
              </tr>
            </thead>
            <tbody>
              {competency && competency.length > 0 ? (
                competency.map((data) => (
                  <tr key={data.seq}>
                    <td
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      {data.seq}
                    </td>
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
                      {data.subCompetencyName}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                      }}
                    >
                      {data.subCompetencyExpln}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      {/* 체크박스 추가, 클릭 시 handleUseYnChange 호출 */}
                      <input
                        type="checkbox"
                        checked={data.useYn} // useYn 값에 따라 체크 여부 결정
                        onChange={() => handleUseYnChange(data.seq, data.useYn)} // 체크박스 상태 변경 시 호출
                      />
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
          <div
            className="d-flex justify-content-end"
            style={{ marginTop: "20px" }}
          >
            <Button
              className="me-3"
              onClick={() => navigate("/competency/subAdd")}
            >
              하위역량 추가
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}
