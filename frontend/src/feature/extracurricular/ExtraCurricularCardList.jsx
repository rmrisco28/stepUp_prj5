import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

export function ExtraCurricularCardList({ programs }) {
  const navigate = useNavigate();

  const statusMap = {
    DRAFT: "임시저장",
    OPEN: "모집중",
    CLOSED: "모집마감",
  };

  return (
    <Row className="g-4">
      {programs.map((p) => (
        <Col key={p.seq} md={6} lg={4}>
          <Card
            className="h-100"
            style={{ borderRadius: "10px", cursor: "pointer" }}
            onClick={() => navigate(`/extracurricular/program/${p.seq}`)}
          >
            <div
              style={{
                height: "150px",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h6 className="fw-bold">썸네일</h6>
            </div>

            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <Card.Title className="fw-bold flex-grow-1 me-2">
                  {p.title}
                </Card.Title>
                <Badge bg="secondary">{statusMap[p.status] || p.status}</Badge>
              </div>

              <Card.Text className="text-muted small mb-3">설명</Card.Text>

              <div className="text-muted small mb-3">
                <div className="mb-2">
                  모집기간:{" "}
                  {new Date(p.applyStartDt).toISOString().slice(0, 10)} ~{" "}
                  {new Date(p.applyEndDt).toISOString().slice(0, 10)}
                </div>
                <div className="mb-2">
                  활동기간:{" "}
                  {new Date(p.operateStartDt).toISOString().slice(0, 10)} ~{" "}
                  {new Date(p.operateEndDt).toISOString().slice(0, 10)}
                </div>
                <div>모집인원: {p.capacity}명</div>
              </div>

              <Button variant="primary" className="w-100 rounded-pill">
                신청하기
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
