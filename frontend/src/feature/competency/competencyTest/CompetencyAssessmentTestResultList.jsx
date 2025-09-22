import { Button, Col, Row, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router";

export function CompetencyAssessmentTestResultList() {
  const [assessment, setAssessment] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/competency/assessment?${searchParams}`)
      .then((res) => {
        console.log("yes");
        setAssessment(res.data.assessmentList);
        setPageInfo(res.data.pageInfo);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("no");
      })
      .finally(() => {
        console.log("finally");
      });
  }, [searchParams]);

  if (!pageInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col xs={12} md={10} lg={6}>
          <h3 className=" d-flex justify-content-center mb-3">
            진단검사 결과 목록
          </h3>

          <Table className="mb-4" striped={true} hover={true}>
            <thead>
              <tr
                style={{
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                <th
                  style={{
                    width: "7%",
                  }}
                >
                  번호
                </th>
                <th>제목</th>
                <th
                  style={{
                    width: "30%",
                  }}
                >
                  진단기간
                </th>
                <th
                  style={{
                    width: "20%",
                  }}
                >
                  결과 보기
                </th>
              </tr>
            </thead>
            <tbody>
              {assessment && assessment.length > 0 ? (
                assessment.map((data) => {
                  const endDate = new Date(data.endDttm);
                  const endDateOnly = new Date(
                    endDate.getFullYear(),
                    endDate.getMonth(),
                    endDate.getDate(),
                  );

                  const today = new Date();
                  const todayOnly = new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                  );

                  const inDisabled = endDateOnly < todayOnly;

                  return (
                    <tr key={data.seq} valign="middle">
                      <td align="center">{data.seq}</td>
                      <td valign="middle">{data.caTitle}</td>
                      <td align="center">
                        {data.startDttm} ~ {data.endDttm}
                      </td>
                      <td align="center">
                        <Button
                          onClick={() =>
                            navigate(
                              `/competency/assessment/test/result/${data.seq}`,
                            )
                          }
                          disabled={inDisabled}
                          variant={inDisabled ? "secondary" : "primary"}
                        >
                          결과보기
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5">데이터가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
}
