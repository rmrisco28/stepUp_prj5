import {
  Button,
  Card,
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
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useAuth } from "../../common/AuthContext.jsx";

export function ExtraCurricularApplication() {
  const { user, loading } = useAuth(); // loading 상태 추가 -> 비동기적으로 처리 되므로 필요
  const [motive, setMotive] = useState("");
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [ApplicationInfo, setApplicationInfo] = useState();
  const { seq } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // loading이 완료되고 user가 있을 때만 API 호출
    if (!loading && user) {
      // 1. 프로그램 정보 가져오기
      axios
        .get(`/api/extracurricular/applicationList/${seq}`)
        .then((res) => {
          console.log(res.data);
          setApplicationInfo(res.data);
          console.log(user);
        })
        .catch((err) => {
          console.log("신청 프로그램 정보를 불러오는데 실패했습니다.", err);
        });
    }
  }, [loading, user, seq]);

  // 로딩 중이거나 사용자 정보가 없으면 로딩 표시
  if (loading) {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col sm={8}>
            <div className="text-center">로딩 중...</div>
          </Col>
        </Row>
      </Container>
    );
  }

  // 이중에서도 학생만 접근 되도록?
  if (!user) {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col sm={8}>
            <div className="text-center">로그인이 필요합니다.</div>
          </Col>
        </Row>
      </Container>
    );
  }

  function ETCApplicationButton() {
    // 개인정보 동의 체크 여부 확인
    if (!privacyAgreed) {
      alert("개인정보 수집 및 이용에 동의해야 신청할 수 있습니다.");
      return;
    }

    // 서버로 보낼 데이터 구성
    const submitData = {
      programSeq: ApplicationInfo.seq,
      memberSeq: user.memberSeq,
      motive: motive,
    };
    console.log(submitData);

    axios
      .post("/api/extracurricular/apply", submitData)
      .then(() => {
        alert("신청이 완료되었습니다.");
        navigate(-1); // 이전 페이지로 이동
      })
      .catch((err) => {
        console.error(err.response?.data || err.message);
        alert("신청에 실패했습니다.");
      });
  }

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
          {ApplicationInfo && (
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title className="text-primary fw-bold">
                  프로그램명: {ApplicationInfo.title}
                </Card.Title>
                <Card.Text>
                  <strong>일정:</strong>{" "}
                  {`${new Date(ApplicationInfo.operateStartDt).toLocaleString()} ~ ${new Date(
                    ApplicationInfo.operateEndDt,
                  ).toLocaleString()}`}
                </Card.Text>
                <Card.Text>
                  <strong>운영 방식:</strong> {ApplicationInfo.operationType}
                </Card.Text>
              </Card.Body>
            </Card>
          )}

          <Form>
            <h4 className="mb-4">신청서</h4>
            <hr />
            {/* 신청자 이름 */}
            <div>
              <FormGroup as={Row} className="mb-3" controlId="name">
                <FormLabel column sm={3}>
                  이름
                </FormLabel>
                <Col md={9}>
                  <FormControl
                    name="name"
                    type="text"
                    value={user.name}
                    readOnly
                  />
                </Col>
              </FormGroup>
            </div>

            {/* 신청 동기 */}
            <FormGroup as={Row} className="mb-3">
              <FormLabel column sm={3}>
                신청 동기
              </FormLabel>
              <Col md={9}>
                <FormControl
                  as="textarea"
                  name="motivation"
                  value={motive}
                  onChange={(e) => setMotive(e.target.value)}
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
                  rows={5}
                  value="- 법령에 따라 개인을 고유하게 구별하기 위하여 부여된 모든 식별정보(성명, 소속, 휴대폰, 이메일 등)의수집, 이용에 대한 동의를 받고 있습니다.
- 신청시 기재되는 모든 개인정보는 사업진행을 위하여 수집 및 이용될 수 있습니다.또한 대학평가관련 자료 요청시 교내 관련부서에 자료가 제공될 수 있으며, 철저하게 관리될 예정입니다.
- 수집된 개인정보는 5년 경과(대학 평가 관련 자료 요청 기간) 후 즉시 파기됩니다.
- 위와 관련하여 본인의 개인고유식별정보 수집, 이용에 관한 내용을 숙지하였고 이에 동의한다면 해당란에체크해 주십시오."
                  readOnly
                ></FormControl>
                <FormCheck
                  type="checkbox"
                  id="privacy-agree"
                  name="privacyAgreed"
                  label="개인정보 수집 및 이용에 동의합니다."
                  checked={privacyAgreed}
                  onChange={(e) => {
                    setPrivacyAgreed(e.target.checked);
                  }}
                />
              </Col>
            </FormGroup>

            {/* 버튼 */}
            <Row className="mt-4">
              <Col className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  className="me-2"
                  onClick={ETCApplicationButton}
                >
                  신청하기
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate(-1)}
                >
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
