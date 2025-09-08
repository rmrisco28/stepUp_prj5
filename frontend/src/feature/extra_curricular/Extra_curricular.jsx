import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";

export function Extra_curricular() {
  return (
    <Row className="justify-content-center w-100">
      <Col xs={12} md={8} lg={6}>
        <h3 className="mb-5">비교과 프로그램</h3>
        <section className="bg-primary px-3 px-sm-5 py-4 rounded-4">
          <div>
            <FormGroup>
              <FormLabel>검색</FormLabel>
              <FormControl className="w-100 mb-3" />
            </FormGroup>
            <Button variant="outline-light">검색</Button>
          </div>
        </section>
      </Col>
    </Row>
  );
}
