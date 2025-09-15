import { Button, Col, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

export function CompetencyAssessment() {
  const [assessment, setAssessment] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/competency/assessment")
      .then((res) => {
        console.log("yes");
        setAssessment(res.data);
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
        <Col xs={10} md={8} lg={6}>
          <h2 className="mb-4">역량 진단 목록</h2>

          <Table className="mb-4">
            <thead>
              <tr>
                <td
                  style={{
                    width: "7%",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  번호
                </td>
                <td
                  style={{
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  제목
                </td>
                <td
                  style={{
                    width: "30%",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  진단기간
                </td>
                <td
                  style={{
                    width: "20%",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  진단하기
                </td>
              </tr>
            </thead>
            <tbody>
              {assessment && assessment.length > 0 ? (
                assessment.map((data) => (
                  <tr>
                    <td align="center" valign="middle">
                      {data.seq}
                    </td>
                    <td valign="middle">{data.caTtl}</td>
                    <td align="center" valign="middle">
                      {data.startDttm} ~ {data.endDttm}
                    </td>
                    <td align="center" valign="middle">
                      <Button>진단하기</Button>
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

          <div className="d-flex justify-content-end">
            <Button
              variant="outline-success"
              className="me-3"
              onClick={() => navigate("/competency/assessment/add")}
            >
              역량 진단 추가
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}
