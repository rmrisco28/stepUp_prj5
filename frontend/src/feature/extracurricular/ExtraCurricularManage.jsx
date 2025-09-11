import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useState } from "react";

export function ExtraCurricularManage() {
  const [program, setProgram] = useState(null);

  return (
    <Container className="my-5">
      <div className="mx-auto" style={{ maxWidth: "1000px" }}>
        {/* 헤더 */}
        <Row className="justify-content-between align-items-center mb-4">
          <Col>
            <h3 className="text-primary fw-bold">비교과 프로그램 관리</h3>
          </Col>
          <Col xs="auto">
            <Button variant="outline-primary">프로그램 등록</Button>
          </Col>
        </Row>

        {/* 프로그램 목록 */}
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
            {program && program.length > 0 ? (
              program.map((data) => (
                <tr key={data.seq}>
                  <td>{data.seq}</td>
                  <td>{data.competencyName}</td>
                  <td>{data.competencyExpln}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">데이터가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}
