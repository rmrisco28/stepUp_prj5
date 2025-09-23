import { Button, Col, Form, FormControl, Row, Spinner } from "react-bootstrap";
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

  const isDisabled =
    isProcessing || !notice.title.trim() || !notice.content.trim();

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}.${mm}.${dd}`;
  };

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
        navigate(`/board/notice/${notice.seq}`); // 수정 후 상세 보기 페이지 이동
      })
      .catch((err) => {
        const message = err.response?.data?.message || {
          text: "게시물 수정 중 오류가 발생했습니다.",
          type: "warning",
        };
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
        <h2 className="mb-4">공지사항 수정</h2>

        <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
          <div>
            <small className="text-muted">
              등록일 | {formatDate(notice.insertedAt)}
            </small>
          </div>
        </div>

        {/* 제목 */}
        <div className="mb-3">
          <label htmlFor="title-input" className="form-label fw-semibold">
            제목
          </label>
          <FormControl
            id="title-input"
            type="text"
            value={notice.title || ""}
            onChange={(e) => setNotice({ ...notice, title: e.target.value })}
            placeholder="제목을 입력하세요"
          />
        </div>

        {/* 본문 */}
        <div className="mb-4">
          <label htmlFor="content-input" className="form-label fw-semibold">
            본문
          </label>
          <FormControl
            id="content-input"
            as="textarea"
            rows={10}
            value={notice.content || ""}
            onChange={(e) => setNotice({ ...notice, content: e.target.value })}
            placeholder="내용을 입력하세요"
          />
        </div>

        {/*파일 추가할 자리*/}
        <Form.Group className="mb-3" controlId="noticeFiles">
          <Form.Label className="fw-bold">첨부 파일</Form.Label>
        </Form.Group>

        <Form.Group className="mb-4" controlId="noticeAuthor">
          <Form.Label className="fw-bold">작성자</Form.Label>
          <Form.Control type="text" value={notice.author} readOnly />
        </Form.Group>

        <div className="d-flex">
          <Button
            variant="outline-secondary"
            onClick={() => navigate(-1)}
            className="me-2"
          >
            취소
          </Button>
          <Button
            variant="success"
            onClick={NoticeSaveButton}
            disabled={isDisabled}
          >
            {isProcessing ? "저장 중..." : "저장"}
          </Button>
        </div>
      </Col>
    </Row>
  );
}
