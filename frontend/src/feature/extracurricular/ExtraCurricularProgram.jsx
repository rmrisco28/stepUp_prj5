import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Badge,
  ProgressBar,
  Spinner,
} from "react-bootstrap";
import axios from "axios";

export function ExtraCurricularProgram() {
  const { seq } = useParams(); // URL에서 seq 받아오기
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const statusMap = {
    DRAFT: "임시저장",
    OPEN: "모집중",
    CLOSED: "모집마감",
  };

  useEffect(() => {
    axios
      .get(`/api/extracurricular/detail/${seq}`)
      .then((res) => {
        console.log(res.data);
        setProgram(res.data);
      })
      .catch((err) => {
        console.error("프로그램 상세 조회 실패", err);
      })
      .finally(() => setLoading(false));
  }, [seq]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!program) {
    return (
      <p className="text-center text-danger">
        프로그램 정보를 불러올 수 없습니다.
      </p>
    );
  }

  // progress 계산
  const applicantPercent = (program.applicants / program.capacity) * 100;
  const waitingPercent = program.waiting
    ? (program.waiting / 10) * 100 // 대기정원 있으면 DTO에 필드 추가
    : 0;

  // 여러 이미지 가져왔을 때 배열로 저장해주기
  const isImageFile = (url) =>
    /\.(jpg|jpeg|png|gif|webp)$/i.test(url?.split("?")[0]);
  const contentImages = program.contentImages?.filter(isImageFile) || [];

  return (
    <Container className="my-4">
      <Row className="mb-5">
        {/* 프로그램 포스터 이미지 */}
        <Col md={4} className="me-4 border">
          <div className="position-relative">
            <img
              src={program.thumbnails}
              alt="프로그램 포스터"
              className="img-fluid rounded"
            />
            {/* 왼쪽 상단 배지 */}
            <Badge
              bg="light"
              text="dark"
              className="position-absolute top-0 start-0 m-2"
            ></Badge>
            {/* 오른쪽 상단 배지 */}
            <Badge bg="info" className="position-absolute top-0 end-0 m-2">
              {statusMap[program.status] || program.status}
            </Badge>
          </div>
        </Col>

        {/* 프로그램 기본 정보 */}
        <Col md={7} className="mb-5">
          <div className="me-1 text-danger fw-bold text-end">3 🤍</div>
          <h4 className="fw-bold mb-2">{program.title}</h4>
          <p className="text-muted">{program.author}</p>
          <Table borderless size="sm" className="align-middle">
            <tbody>
              <tr>
                <th style={{ width: "20%" }}>모집기간</th>
                <td>
                  {program.applyStartDt} ~ {program.applyEndDt}
                </td>
              </tr>
              <tr>
                <th>활동기간</th>
                <td>
                  {program.operateStartDt} ~ {program.operateEndDt}
                </td>
              </tr>
              <tr>
                <th>핵심역량</th>
                <td>{program.competency}</td>
              </tr>
              <tr>
                <th>참여학년</th>
                <td>{program.grades}</td>
              </tr>
              <tr>
                <th>장소</th>
                <td>{program.location}</td>
              </tr>
              <tr>
                <th>운영방식</th>
                <td>{program.operationType}</td>
              </tr>
              <tr>
                <th>마일리지점수</th>
                <td>{program.mileagePoints}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* 신청인원 현황 */}
      <div className="mb-5">
        <h5 className="fw-bold mb-3">👥 신청인원 현황</h5>
        <Row className="align-items-center mb-3 bg-light p-3 rounded">
          {/* 모집인원 */}
          <Col md={6}>
            <div className="d-flex align-items-center mb-2">
              <span style={{ fontSize: "1.2rem", marginRight: "8px" }}>👤</span>
              <span className="fw-semibold me-2">모집인원</span>
              <span>
                {program.applicants}명 / {program.capacity}명
              </span>
            </div>
            <ProgressBar
              now={applicantPercent}
              label={`${program.applicants}/${program.capacity}`}
            />
          </Col>
          {/* 대기인원 */}
          <Col md={6}>
            <div className="d-flex align-items-center mb-2">
              <span style={{ fontSize: "1.2rem", marginRight: "8px" }}>🕒</span>
              <span className="fw-semibold me-2">대기인원</span>
              <span>{program.waiting}명 / 10명</span>
            </div>
            <ProgressBar
              variant="warning"
              now={waitingPercent}
              label={`${program.waiting}/10`}
            />
          </Col>
        </Row>
      </div>

      {/* 프로그램 내용 */}
      <div>
        <h5 className="fw-bold mb-3">프로그램 내용</h5>
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <p>{program.content}</p>
            {/* 포스터 이미지 */}
            {contentImages.length > 0 && (
              <div className="d-flex flex-wrap gap-3 mt-3">
                {contentImages.map((imgUrl, index) => (
                  <Card
                    key={index}
                    className="shadow-sm"
                    style={{ width: "250px" }}
                  >
                    <Card.Img
                      variant="bottom"
                      src={imgUrl}
                      alt={`프로그램 이미지 ${index + 1}`}
                      className="img-fluid rounded"
                    />
                  </Card>
                ))}
              </div>
            )}
          </Card.Body>
        </Card>
      </div>

      {/* 하단 버튼 */}
      <div className="d-flex justify-content-center gap-2 my-3">
        <Button variant="primary">신청하기</Button>
        <Button
          variant="secondary"
          onClick={() => navigate("/extracurricular")}
        >
          목록보기
        </Button>
      </div>
    </Container>
  );
}
