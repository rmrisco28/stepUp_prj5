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
        <Col xs={12} md={8} lg={6}>
          <div className="mb-4"></div>
          <h2 className="text-center mb-5" style={{ fontWeight: "bold" }}>
            핵심역량 안내
          </h2>
          <h4 style={{ fontWeight: "bold" }}>핵심역량</h4>
          {/* 핵심역량 이미지*/}
          <img
            className="img-fluid mb-3"
            src="/image/핵심역량.png"
            alt="핵심역량"
            style={{ width: "100%" }}
          />
          <hr className="mb-5" />
          <Table
            striped
            responsive
            className="shadow-sm  overflow-hidden table-bordered custom-table-border "
            style={{ borderCollapse: `collapse` }}
          >
            <thead className="table-success">
              <tr>
                <th
                  style={{
                    width: "20%",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  핵심역량
                </th>
                <th
                  style={{
                    width: "25%",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  핵심역량 정의
                </th>
                <th
                  style={{
                    width: "20%",
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
              {groupedArray.length > 0 ? (
                groupedArray.map((group, groupIndex) =>
                  group.items.map((item, itemIndex) => (
                    <tr key={`${group.name}-${itemIndex}`}>
                      {/* 핵심역량 이름/정의는 첫 줄에만 rowSpan으로 출력 */}
                      {itemIndex === 0 && (
                        <>
                          <td
                            rowSpan={group.items.length}
                            style={{
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}
                          >
                            {group.name}
                          </td>
                          <td
                            rowSpan={group.items.length}
                            style={{
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}
                          >
                            {group.expln}
                          </td>
                        </>
                      )}
                      <td
                        style={{ textAlign: "center", verticalAlign: "middle" }}
                      >
                        {item.name}
                      </td>
                      <td style={{ verticalAlign: "middle" }}>{item.expln}</td>
                    </tr>
                  )),
                )
              ) : (
                <tr>
                  <td colSpan="4">데이터가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </Table>
          {/* 게시물 작성 editor 버튼*/}
          {/*<Button onClick={() => navigate("/competency/editor")}>*/}
          {/*  게시물 수정*/}
          {/*</Button>*/}
        </Col>
      </Row>
    </>
  );
}
