import { Col, Container, Row, Table } from "react-bootstrap";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

export function MyETC() {
  return (
    <Container className="my-2">
      <Row className="justify-content-center">
        <Col xs={12} md={9}>
          <h2 className="mb-5 fw-bold">비교과 내역</h2>
          <Table hover className="mb-4 text-center">
            <thead>
              <tr>
                <th>번호</th>
                <th>프로그램 제목</th>
                <th>진행 기간</th>
                <th>이수 여부</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>그렇죠</td>
                <td className="text-start">그렇죠</td>
                <td>그렇죠</td>
                <td>그렇죠</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
