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
  CardBody,
} from "react-bootstrap";
import axios from "axios";
import { FaUserCheck } from "react-icons/fa6";
import { FaUserClock } from "react-icons/fa6";

// 비교과 카드 누르면 나오는 컴포넌트
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
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <Container className="my-5">
        <Row className="mb-5">
          {/* 프로그램 포스터 이미지 */}
          <Col md={5} className="me-4">
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
          <Col md={6} className="mb-5">
            <h4 className="fw-bold mb-2">{program.title}</h4>
            <p className="text-muted">{program.author}</p>
            <hr />
            <Table borderless size="sm">
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
          <h4 className="fw-bold mb-3">👥 신청인원 현황</h4>
          <Row className="align-items-center mb-3 bg-light p-3 rounded">
            {/* 모집인원 */}
            <Col md={6} className="d-flex align-items-center">
              <div
                className="d-flex align-items-center me-2"
                style={{ whiteSpace: "nowrap" }}
              >
                <FaUserCheck
                  style={{
                    fontSize: "1.7rem",
                    marginRight: "7px",
                    color: "#057e97",
                  }}
                />
                <span className="fw-semibold">모집인원</span>
              </div>
              <div className="position-relative flex-grow-1">
                <ProgressBar
                  variant="info"
                  now={applicantPercent}
                  className="custom-progress"
                />
                <span className="position-absolute top-50 start-50 translate-middle fw-bold">
                  {program.applicants}명 / {program.capacity}명
                </span>
              </div>
            </Col>
            {/* 대기인원 */}
            <Col md={6} className="d-flex align-items-center">
              <div
                className="d-flex align-items-center me-2"
                style={{ whiteSpace: "nowrap" }}
              >
                <FaUserClock
                  style={{
                    fontSize: "1.6rem",
                    marginRight: "7px",
                    color: "#f8be06",
                  }}
                />
                <span className="fw-semibold">대기인원</span>
              </div>
              <div className="position-relative flex-grow-1">
                <ProgressBar
                  variant="warning"
                  now={waitingPercent}
                  className="custom-progress"
                />
                <span className="position-absolute top-50 start-50 translate-middle fw-bold">
                  {program.waiting}명 / 10명
                </span>
              </div>
            </Col>
          </Row>
        </div>
        {/* 담당자 정보 */}
        <div className="mb-5">
          <h4 className="fw-bold mb-3">프로그램 담당자</h4>
          <Card className="shadow-sm">
            <Card.Body className="d-flex justify-content-center flex-wrap gap-4">
              {/* 담당자 */}
              <div className="d-flex align-items-center">
                <div className="fw-bold me-3" style={{ fontSize: "1.2rem" }}>
                  담당자 l
                </div>
                <div>{program.manager}</div>
              </div>

              {/* 문의 */}
              <div className="d-flex align-items-center">
                <div className="fw-bold me-3" style={{ fontSize: "1.2rem" }}>
                  문의 l
                </div>
                <div>{program.managerPhone}</div>
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* 프로그램 내용 */}
        <div>
          <h4 className="fw-bold mb-3">프로그램 내용</h4>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              {/* 줄바꿈 반영 */}
              <div style={{ whiteSpace: "pre-line" }}>{program.content}</div>

              {/* 포스터 이미지 */}
              {contentImages.length > 0 && (
                <div className="d-flex flex-wrap gap-3 mt-3">
                  {contentImages.map((imgUrl, index) => (
                    <Card key={index} className="shadow-sm">
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
          <Button
            variant="primary"
            onClick={() => navigate(`/extracurricular/application/${seq}`)}
          >
            신청하기
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate("/extracurricular")}
          >
            목록보기
          </Button>
        </div>
      </Container>
    </div>
  );
}
