import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";

export function CompetencyList() {
  const [data, setData] = useState();
  axios
    .get("/competency/list")
    .then((res) => {
      console.log("yes");
      setData(res.data);
    })
    .catch((err) => {
      console.log("no");
    })
    .finally(() => {
      console.log("finally");
    });

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={10} md={8} lg={4}>
          <div className="mb-3"></div>
          <h2 className="mb-3">핵심 역량 목록 </h2>
        </Col>
      </Row>
    </>
  );
}
