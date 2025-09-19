import {
  Button,
  Col,
  Container,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Table,
} from "react-bootstrap";
import { useState } from "react";

export function ExtraCurricularApplication() {
  const [formData, setFormData] = useState({
    phone: "",
    motive: "",
    privacyAgreed: false,
  });

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={8}>
          <h3 className="mb-4 text-center text-primary fw-bold">
            프로그램 신청
          </h3>

          {/* 신청 프로그램 정보 */}
          <h4 className="mb-3">신청 프로그램</h4>
          <hr />
          <Table bordered className="mb-5">
            <thead>
              <tr className="text-center">
                <th className="bg-light">프로그램명</th>
                <th className="bg-light">일정</th>
                <th className="bg-light">운영 방식</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>몰러</td>
                <td>몰러</td>
                <td>몰러</td>
              </tr>
            </tbody>
          </Table>

          <Form>
            <h4 className="mb-4">신청서</h4>
            <hr />
            {/* 신청자 이름 */}
            <div>
              <FormGroup as={Row} className="mb-3" controlId="name">
                <FormLabel column sm={3}>
                  신청자 정보
                </FormLabel>
                <Col md={9}>
                  <FormControl name="name" type="text" placeholder="홍길동" />
                </Col>
              </FormGroup>
            </div>

            {/* 전화번호 */}
            <FormGroup as={Row} className="mb-3">
              <FormLabel column sm={3}>
                전화번호
              </FormLabel>
              <Col md={9}>
                <FormControl
                  type="tel"
                  name="phone"
                  placeholder="010-1234-5678"
                  required
                />
              </Col>
            </FormGroup>

            {/* 신청 동기 */}
            <FormGroup as={Row} className="mb-3">
              <FormLabel column sm={3}>
                신청 동기
              </FormLabel>
              <Col md={9}>
                <FormControl
                  as="textarea"
                  name="motivation"
                  rows={4}
                  placeholder="신청 동기를 입력하세요"
                />
              </Col>
            </FormGroup>

            {/* 개인정보 활용 동의 */}
            <FormGroup as={Row} className="mb-3">
              <FormLabel column sm={3}>
                개인정보 활용 동의
              </FormLabel>
              <Col md={9}>
                <FormControl
                  as="textarea"
                  rows={8}
                  value="- 법령에 따라 개인을 고유하게 구별하기 위하여 부여된 모든 식별정보(성명, 소속, 휴대폰, 이메일 등)의수집, 이용에 대한 동의를 받고 있습니다.
- 신청시 기재되는 모든 개인정보는 사업진행을 위하여 수집 및 이용될 수 있습니다.또한 대학평가관련 자료 요청시 교내 관련부서에 자료가 제공될 수 있으며, 철저하게 관리될 예정입니다.
- 수집된 개인정보는 5년 경과(대학 평가 관련 자료 요청 기간) 후 즉시 파기됩니다.
- 위와 관련하여 본인의 개인고유식별정보 수집, 이용에 관한 내용을 숙지하였고 이에 동의한다면 해당란에체크해 주십시오."
                ></FormControl>
                <FormCheck
                  type="checkbox"
                  id="privacy-agree"
                  name="privacyAgreed"
                  label="개인정보 수집 및 이용에 동의합니다."
                  required
                />
              </Col>
            </FormGroup>

            {/* 버튼 */}
            <Row className="mt-4">
              <Col className="d-flex justify-content-center">
                <Button variant="primary" className="me-2">
                  신청하기
                </Button>
                <Button type="button" variant="secondary">
                  신청취소
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
