import { Col, Row, Table } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";

export function CompetencyList() {
  const [competency, setCompetency] = useState([]);

  useEffect(() => {
    axios
      .get("/api/competency/list")
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
      .put(`/api/competency/update/${seq}`, {
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
      .get("/api/competency/list")
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
          <h2 className="mb-3">핵심 역량 목록 </h2>
          <Table>
            <thead>
              <tr>
                <th>번호</th>
                <th>핵심역량</th>
                <th>핵심역량 설명</th>
                <th>사용여부</th>
              </tr>
            </thead>
            <tbody>
              {competency && competency.length > 0 ? (
                competency.map((data) => (
                  <tr key={data.seq}>
                    <td>{data.seq}</td>
                    <td>{data.competencyName}</td>
                    <td>{data.competencyExpln}</td>
                    <td>
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
        </Col>
      </Row>
    </>
  );
}
