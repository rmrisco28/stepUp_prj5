import { useEffect, useState } from "react";
import { Col, Container, Row, Table, Spinner } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../common/AuthContext.jsx";
import { useNavigate } from "react-router";

export function MyETC() {
  const { user, loading: authLoading } = useAuth(); // 로그인 상태와 user 가져오기
  const [etcList, setEtcList] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return; // 로그인 사용자 없으면 호출하지 않음

    setLoading(true);
    axios
      .get(`/api/extracurricular/complete/${user.memberSeq}`)
      .then((res) => {
        const sorted = res.data.sort((a, b) => b.seq - a.seq); // seq 내림차순

        setEtcList(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("비교과 내역 조회 실패:", err);
        setLoading(false);
      });
  }, [user]);

  if (authLoading) {
    return (
      <Container className="my-2 text-center">
        <Spinner animation="border" /> 로그인 상태 확인 중...
      </Container>
    );
  }

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
              {!user ? ( // 로그인 안 됐을 때
                <tr>
                  <td colSpan="4" className="fw-bold">
                    로그인 후 이용해주세요.
                  </td>
                </tr>
              ) : etcList.length === 0 ? ( // 로그인 했는데 데이터 없음
                <tr>
                  <td colSpan="4">등록된 내역이 없습니다.</td>
                </tr>
              ) : (
                // 로그인 했고 데이터 있음
                etcList.map((etc, idx) => (
                  <tr key={etc.seq}>
                    <td>{idx + 1}</td>
                    <td
                      className="text-start"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(`/extracurricular/program/${etc.programSeq}`)
                      }
                    >
                      {etc.title}
                    </td>
                    <td>
                      {new Date(etc.operateStartDt).toLocaleDateString()} ~{" "}
                      {new Date(etc.operateEndDt).toLocaleDateString()}
                    </td>
                    <td>{etc.completeStatus}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
