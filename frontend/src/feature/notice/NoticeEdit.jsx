import { Button, Col, FormControl, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export function NoticeEdit() {
  const [notice, setNotice] = useState({
    title: "",
    content: "",
    seq: null,
  });
  const [isProcessing, setIsProcessing] = useState(false);
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
          navigate("/board/notice");
        } else {
          toast.error("공지사항을 불러오는 중 오류가 발생했습니다.");
        }
      });
  }, [id, navigate]);

  function NoticeSaveButton() {
    if (!notice.seq) return;

    setIsProcessing(true);

    const formData = new FormData();
    formData.append("title", notice.title ?? "");
    formData.append("content", notice.content ?? "");
    formData.append("seq", notice.seq); // 컨트롤러 @ModelAttribute용

    axios
      .put(`/api/notice/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        const message = res.data.message || {
          text: "게시물이 성공적으로 수정되었습니다.",
          type: "success",
        };
        toast(message.text, { type: message.type });
        navigate(`/board/notice/${notice.seq}`); // 수정 후 상세 보기 페이지 이동
      })
      .catch((err) => {
        const message = err.response?.data?.message || {
          text: "게시물 수정 중 오류가 발생했습니다.",
          type: "warning",
        };
        toast(message.text, { type: message.type });
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }

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
        <h3 className="mb-4">공지사항 수정</h3>
        <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
          <div className="d-flex align-items-center">
            <div>
              {/*작성자 이름 부분인데 아직 안 보내는 중*/}
              {/*<p className="mb-0 fw-bold">{notice.writer}</p>*/}
              <small className="text-muted">{notice.insertedAt}</small>
            </div>
          </div>
          <div>{/*<p className="mb-0">번호: {notice.seq}</p>*/}</div>
        </div>
        <div>
          <label htmlFor="title-input" className="form-label">
            제목
          </label>
          <FormControl
            id="title-input"
            type="text"
            value={notice.title}
            onChange={(e) => setNotice({ ...notice, title: e.target.value })}
            placeholder="제목을 입력하세요"
          />
        </div>
        {/* 본문 */}
        <div className="mb-3">
          <label htmlFor="content-input" className="form-label">
            본문
          </label>
          <FormControl
            id="content-input"
            as="textarea"
            rows={10}
            value={notice.content ?? ""}
            onChange={(e) => setNotice({ ...notice, content: e.target.value })}
            placeholder="내용을 입력하세요"
          />
        </div>

        <div className="d-flex">
          <div>
            <Button
              variant="outline-secondary"
              // onClick={() => navigate(`/board/notice/${notice.seq}`)}
              onClick={() => navigate(-1)}
              className="me-2"
            >
              취소
            </Button>
            <Button
              variant="outline-primary"
              onClick={NoticeSaveButton}
              className="me-2"
            >
              저장
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
}
