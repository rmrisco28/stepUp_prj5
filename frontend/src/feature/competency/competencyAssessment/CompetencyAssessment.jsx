import { Button, Col, Modal, Pagination, Row, Table } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

export function CompetencyAssessment() {
  const [assessment, setAssessment] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalShow, setModalShow] = useState(false);
  const [selectAssment, setSelectAssment] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/competency/assessment")
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
  }, []);

  if (!pageInfo) {
    return <div>Loading...</div>;
  }

  function handlePageNumberClick(pageNumber) {
    // console.log(pageNumber + "페이지로 이동");
    // navigate(`/?p=${pageNumber}`);
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("p", pageNumber);
    setSearchParams(nextSearchParams);
  }

  const pageNumbers = [];
  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
  }

  function handleDeleteButton(seq) {
    axios
      .delete(`/api/competency/assessment/delete/${seq}`)
      .then((res) => {
        console.log(res);
        alert(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          alert(err.response.data.message);
        } else {
          alert("삭제에 실패했습니다.");
        }
      })
      .finally(() => {});
  }

  const today = new Date();

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={10} md={8} lg={6}>
          <h2 className="mb-4">역량 진단 검사 목록</h2>

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
                  진단하기
                </th>
                <th style={{ width: "10%" }}>관리자만</th>
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
                          onClick={() => navigate(`test/ready/${data.seq}`)}
                          disabled={inDisabled}
                          variant={inDisabled ? "secondary" : "primary"}
                        >
                          진단하기
                        </Button>
                      </td>
                      <td align="center">
                        <Button
                          variant="warning"
                          onClick={() => {
                            navigate(`admin/${data.seq}`);
                          }}
                        >
                          관리
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

      {/*페이지 네이션*/}
      <Row className="my-3">
        <Col>
          <Pagination className="justify-content-center">
            <Pagination.First
              disabled={pageInfo.currentPageNumber === 1}
              onClick={() => handlePageNumberClick(1)}
            ></Pagination.First>
            <Pagination.Prev
              disabled={pageInfo.leftPageNumber <= 1}
              onClick={() => handlePageNumberClick(pageInfo.leftPageNumber - 5)}
            ></Pagination.Prev>
            {pageNumbers.map((pageNumber) => (
              <Pagination.Item
                key={pageNumber}
                onClick={() => handlePageNumberClick(pageNumber)}
                active={pageInfo.currentPageNumber === pageNumber}
              >
                {pageNumber}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={pageInfo.rightPageNumber >= pageInfo.totalPages}
              onClick={() =>
                handlePageNumberClick(pageInfo.rightPageNumber + 1)
              }
            ></Pagination.Next>
            <Pagination.Last
              disabled={pageInfo.currentPageNumber === pageInfo.totalPages}
              onClick={() => handlePageNumberClick(pageInfo.totalPages)}
            ></Pagination.Last>
          </Pagination>
        </Col>
      </Row>
    </>
  );
}
