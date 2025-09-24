import { Badge, Button, Card, Col, ProgressBar, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

export function ExtraCurricularCardList({ programs }) {
  const navigate = useNavigate();

  const statusMap = {
    DRAFT: "임시저장",
    OPEN: "모집중",
    CLOSED: "모집마감",
  };

  // 운영방식 맵핑
  const operationTypeMap = {
    ONLINE: "온라인",
    OFFLINE: "대면",
    HYBRID: "혼합",
  };

  // 상태 필터링: OPEN, CLOSED만 표시
  const visiblePrograms = programs.filter(
    (p) => p.status === "OPEN" || p.status === "CLOSED",
  );

  return (
    <Row className="g-4">
      {visiblePrograms.map((p) => {
        // ProgressBar 퍼센트 계산, capacity 0 방어
        const applicantPercent =
          p.capacity > 0 ? Math.min(100, (p.applicants / p.capacity) * 100) : 0;

        return (
          <Col key={p.seq} md={6} lg={4}>
            <Card className="h-100" style={{ borderRadius: "10px" }}>
              <div
                style={{
                  width: "100%",
                  height: "150px",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  overflow: "hidden",
                }}
              >
                {p.thumbUrl ? (
                  <img
                    src={p.thumbUrl}
                    alt={p.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      navigate(`/extracurricular/program/${p.seq}`)
                    }
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  ></div>
                )}
              </div>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <Card.Title
                    className="fw-bold me-2"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate(`/extracurricular/program/${p.seq}`)
                    }
                  >
                    {p.title}
                  </Card.Title>
                  <Badge bg="secondary">
                    {statusMap[p.status] || p.status}
                  </Badge>
                </div>
                <div className="text-muted small mb-3">
                  <div className="mb-2">
                    모집기간 |{" "}
                    {new Date(p.applyStartDt).toISOString().slice(0, 10)} ~{" "}
                    {new Date(p.applyEndDt).toISOString().slice(0, 10)}
                  </div>
                  <div className="mb-2">
                    활동기간 |{" "}
                    {new Date(p.operateStartDt).toISOString().slice(0, 10)} ~{" "}
                    {new Date(p.operateEndDt).toISOString().slice(0, 10)}
                  </div>
                  <div className="mb-2">
                    핵심역량 | {p.competencyName || "미정"}
                  </div>
                  <div className="mb-2">
                    {" "}
                    운영방식 |{" "}
                    {operationTypeMap[p.operationType] || p.operationType}
                  </div>
                  <div className="mb-2">대상학년 | {p.grades}</div>
                  <div className="position-relative flex-grow-1 mt-2">
                    {p.capacity > 0 ? (
                      <>
                        <ProgressBar variant="warning" now={applicantPercent} />
                        <span className="position-absolute top-50 start-50 translate-middle fw-bold">
                          {p.applicants}명 / {p.capacity}명
                        </span>
                      </>
                    ) : (
                      <>
                        <ProgressBar variant="warning" />
                        <span className="position-absolute top-50 start-50 translate-middle fw-bold">
                          {p.applicants}명 / 0명
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <Button
                  variant="success"
                  className="w-100 rounded-pill"
                  onClick={() => navigate(`/extracurricular/program/${p.seq}`)}
                >
                  신청하기
                </Button>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}
