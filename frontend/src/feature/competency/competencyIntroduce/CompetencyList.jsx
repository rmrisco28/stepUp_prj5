import { Button, Col, Modal, Row, Table } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function CompetencyList() {
  const [competency, setCompetency] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedCompetency, setSelectedCompetency] = useState({}); // 선택된 항목의 정보

  const navigate = useNavigate();

  useEffect(() => {
    // 관리자만
    axios
      .get("/api/auth/status") // 로그인 상태 확인 API
      .then((res) => {
        if (res.data.authName !== "admin") {
          alert("잘못된 접근입니다...!");
          navigate("/");
        } else {
          console.log("로그인된 사용자 정보:", res.data);
        }
      })
      .catch((err) => {
        console.log("로그인 상태 확인 실패");
        navigate("/login");
      });

    axios
      .get("/api/competency/list")
      .then((res) => {
        console.log("yes");
        setCompetency(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("no");
      })
      .finally(() => {
        console.log("finally");
      });
  }, []);

  function handleUseYnChange(seq, currentUseYn) {
    axios
      .put(`/api/competency/update/${seq}`, {
        useYn: !currentUseYn,
      })
      .then((res) => {
        console.log("yes");
        setCompetency((prevCompetency) => {
          prevCompetency.map((data) =>
            competency.seq === seq
              ? { ...data, useYn: !currentUseYn }
              : competency,
          );
        });

        fetchCompetencies();
      })
      .catch((err) => {
        console.log("no");
      })
      .finally(() => {
        console.log("finally");
      });
  }

  // 데이터를 다시 불러오는 함수
  const fetchCompetencies = () => {
    axios
      .get("/api/competency/list")
      .then((res) => {
        setCompetency(res.data); // 데이터 새로 설정
      })
      .catch((err) => {
        console.log("데이터 불러오기 실패", err);
      });
  };

  function handleDeleteButton(seq) {
    axios
      .delete(`/api/competency/delete/${seq}`)
      .then((res) => {
        console.log(res);
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          alert(err.response.data.message);
        } else {
          alert("삭제에 실패했습니다.");
        }
      })
      .finally(() => {
        console.log("finally");
        setModalShow(false);
        fetchCompetencies();
      });
  }

  return (
    <>
      <Row className="justify-content-center my-5">
        <Col xs={10} md={8} lg={6}>
          <div className="mb-3"></div>
          <h2 className="mb-3">핵심역량 목록 </h2>
          <Table>
            <thead>
              <tr
                style={{
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                <th
                  style={{
                    width: "7%",
                  }}
                >
                  번호
                </th>
                <th
                  style={{
                    width: "25%",
                  }}
                >
                  핵심역량
                </th>
                <th
                  style={{
                    width: "200px",
                  }}
                >
                  핵심역량 정의
                </th>
                <th
                  style={{
                    width: "15%",
                  }}
                >
                  사용여부
                </th>
                <th
                  style={{
                    width: "10%",
                  }}
                >
                  삭제
                </th>
              </tr>
            </thead>
            <tbody>
              {competency && competency.length > 0 ? (
                competency.map((data) => (
                  <tr key={data.seq} align="center" valign="middle">
                    <td>{data.seq}</td>
                    <td>{data.competencyName}</td>
                    <td valign="middle">{data.competencyExpln}</td>
                    <td>
                      {/* 체크박스 추가, 클릭 시 handleUseYnChange 호출 */}
                      <input
                        type="checkbox"
                        checked={data.useYn} // useYn 값에 따라 체크 여부 결정
                        onChange={() => handleUseYnChange(data.seq, data.useYn)} // 체크박스 상태 변경 시 호출
                      />
                    </td>
                    <td>
                      <Button
                        variant="outline-danger"
                        onClick={() => {
                          setSelectedCompetency({
                            seq: data.seq,
                            competencyName: data.competencyName,
                          });
                          setModalShow(true);
                        }}
                      >
                        삭제
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">데이터가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </Table>
          <div
            className="d-flex justify-content-end"
            style={{ marginTop: "20px" }}
          >
            <Button
              className="me-3 "
              onClick={() => navigate("/competency/add")}
            >
              핵심역량 추가
            </Button>
          </div>
        </Col>

        {/*모달*/}
        <Modal show={modalShow} onHide={() => setModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>핵심역량 삭제 확인</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            핵심역량 "{selectedCompetency.competencyName}" 을 삭제하시겠습니까?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-dark" onClick={() => setModalShow(false)}>
              취소
            </Button>

            <Button
              variant="outline-danger"
              onClick={() => {
                if (selectedCompetency) {
                  handleDeleteButton(selectedCompetency.seq); // 삭제 처리 함수 호출
                }
              }}
            >
              삭제
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </>
  );
}
