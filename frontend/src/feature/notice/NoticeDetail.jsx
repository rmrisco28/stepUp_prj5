import { useNavigate, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Image, Modal, Spinner, Col, Row } from "react-bootstrap";

export function NoticeDetail() {
  const [notice, setNotice] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/notice/${id}`)
      .then((res) => {
        console.log(res.data);
        setNotice(res.data);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          toast.warning("해당 공지사항이 없습니다.");
          navigate("/api/notice");
        } else {
          toast.error("공지사항을 불러오는 중 오류가 발생했습니다.");
        }
      });
  }, [id, navigate]);

  // 나중에 Delete 할 때 Update 버튼은 Edit으로 넘어가게
  // function handleDeleteButtonClick() {
  //   axios
  //     .delete(`/api/board/${id}`)
  //     .then((res) => {
  //       const message = res.data.message;
  //       if (message) {
  //         toast(message.text, { type: message.type });
  //       }
  //       navigate("/board/list");
  //     })
  //     .catch(() => {
  //       toast.warning("게시물이 삭제되지 않았습니다.");
  //     });
  // }

  if (!notice) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <h3 className="mb-4">공지사항</h3>
        <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
          <div className="d-flex align-items-center">
            <div>
              {/*작성자 이름 부분인데 아직 안 보내는 중*/}
              {/*<p className="mb-0 fw-bold">{notice.writer}</p>*/}
              <small className="text-muted">{notice.insertedAt}</small>
            </div>
          </div>
          <div>
            <p className="mb-0">번호: {notice.seq}</p>
          </div>
        </div>

        <div className="border-bottom pb-4 mb-4">
          <h4>{notice.title}</h4>
          <div className="my-3" style={{ whiteSpace: "pre-wrap" }}>
            {notice.content}
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <Button variant="outline-secondary" onClick={() => navigate(-1)}>
            목록
          </Button>
          <div>
            {/* 로그인한 사용자가 작성자와 일치할 경우 수정/삭제 버튼 표시 */}
            {/* <Button variant="outline-primary" className="me-2">
              수정 또는 삭제
            </Button>
            <Button variant="outline-danger">삭제</Button> */}
          </div>
        </div>
      </Col>
    </Row>
  );
}
