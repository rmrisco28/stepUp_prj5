import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Pagination,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router";
import { IoSearch } from "react-icons/io5";

export function ExtraCurricularManage() {
  const [programList, setProgramList] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const q = searchParams.get("q") || "";
    setKeyword(q);

    axios
      .get(`/api/extracurricular/list?${searchParams}`)
      .then((res) => {
        setProgramList(res.data.programList);
        setPageInfo(res.data.pageInfo);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, [searchParams]);

  if (!programList || !pageInfo) return <Spinner animation="border" />;

  const pageNumbers = [];
  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
  }

  function handlePageNumberClick(pageNumber) {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("page", pageNumber);
    setSearchParams(nextSearchParams);
  }

  function handleSearchFormSubmit(e) {
    e.preventDefault();
    navigate(`/extracurricular/manage?q=${keyword}&page=1`);
  }

  return (
    <Container className="my-5">
      <div className="mx-auto" style={{ maxWidth: "1000px" }}>
        {/* 헤더 + 검색 */}
        <Row className="justify-content-between align-items-center mb-4">
          <Col>
            <h3 className="text-primary fw-bold">비교과 프로그램 관리</h3>
          </Col>
          <Col md="auto">
            <Form className="d-flex" onSubmit={handleSearchFormSubmit}>
              <InputGroup>
                <Form.Control
                  placeholder="검색어 입력"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <Button type="submit" variant="primary">
                  <IoSearch />
                </Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>

        {/* 테이블 */}
        <Table hover striped className="text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>프로그램명</th>
              <th>등록일시</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {programList.length > 0 ? (
              programList.map((program) => (
                <tr key={program.seq}>
                  <td>{program.seq}</td>
                  <td>{program.title}</td>
                  <td>{program.createdAt.replace("T", " ")}</td>
                  <td>{program.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">데이터가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* 페이지네이션 */}
        <Row className="my-3" style={{ position: "relative" }}>
          <Button
            variant="outline-primary"
            onClick={() => navigate("/extracurricular/add")}
            style={{
              position: "absolute",
              left: 10,
              bottom: 0,
              width: "130px",
            }}
          >
            프로그램 등록
          </Button>
          <Col className="d-flex justify-content-center">
            <Pagination className="mb-0">
              <Pagination.First
                disabled={pageInfo.currentPageNumber === 1}
                onClick={() => handlePageNumberClick(1)}
              />
              <Pagination.Prev
                disabled={pageInfo.leftPageNumber <= 1}
                onClick={() =>
                  handlePageNumberClick(pageInfo.leftPageNumber - 10)
                }
              />
              {pageNumbers.map((num) => (
                <Pagination.Item
                  key={num}
                  active={pageInfo.currentPageNumber === num}
                  onClick={() => handlePageNumberClick(num)}
                >
                  {num}
                </Pagination.Item>
              ))}
              <Pagination.Next
                disabled={pageInfo.rightPageNumber >= pageInfo.totalPages}
                onClick={() =>
                  handlePageNumberClick(pageInfo.rightPageNumber + 1)
                }
              />
              <Pagination.Last
                disabled={pageInfo.currentPageNumber === pageInfo.totalPages}
                onClick={() => handlePageNumberClick(pageInfo.totalPages)}
              />
            </Pagination>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
