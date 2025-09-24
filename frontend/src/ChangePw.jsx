import { useState, useEffect } from "react";
import {
  Modal,
  Button,
  FormGroup,
  FormLabel,
  FormText,
  FormControl,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from "./common/AuthContext.jsx";

export function ChangePw() {
  const { user, loading } = useAuth();
  const [passwordModalShow, setPasswordModalShow] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      // 페이지 진입 시 바로 모달 열기
      setPasswordModalShow(true);
    }
  }, [loading, user]);

  useEffect(() => {
    if (!loading && !user) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [loading, user, navigate]);

  const handleClose = () => {
    setOldPassword("");
    setNewPassword1("");
    setNewPassword2("");
    setPasswordModalShow(false);
    navigate(-1);
  };

  function handleChange() {
    if (!loading && user) {
      // 비밀번호 변경 요청
      axios
        .put(`/api/member/changePw`, {
          memberSeq: user.memberSeq,
          oldPassword: oldPassword,
          newPassword: newPassword1,
        })
        .then((res) => {
          alert(res.data.message.text);
          handleClose();
        })
        .catch((err) => {
          alert(err.response.data.message || "비밀번호 변경에 실패하였습니다.");
          console.log(err);
        });
    }
  }

  // const passwordRegex =
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=-]).{8,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+=-]).{8,}$/;
  const isPasswordValid = passwordRegex.test(newPassword1);
  const isPasswordMatch = newPassword1 === newPassword2;
  const isChangePasswordDisabled =
    !oldPassword ||
    !newPassword1 ||
    !newPassword2 ||
    !isPasswordValid ||
    !isPasswordMatch;

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

  return (
    <Modal
      show={passwordModalShow}
      onHide={handleClose}
      centered
      className="modal-brutal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">비밀번호 변경</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGroup className="mb-3" controlId="password2">
          <FormLabel className="info-label-brutal">현재 비밀번호</FormLabel>
          <FormControl
            type="password"
            value={oldPassword}
            placeholder="현재 비밀번호를 입력하세요."
            onChange={(e) => setOldPassword(e.target.value)}
            className="form-control-brutal"
          />
        </FormGroup>
        <FormGroup className="mb-3" controlId="password3">
          <FormLabel className="info-label-brutal">변경할 비밀번호</FormLabel>
          <FormControl
            type="password"
            value={newPassword1}
            maxLength={255}
            placeholder="8자 이상, 영문자, 숫자, 특수문자 포함"
            onChange={(e) => setNewPassword1(e.target.value)}
            className="form-control-brutal"
          />
          {newPassword1 && !isPasswordValid && (
            <FormText className="text-danger">
              비밀번호는 8자 이상, 영문자, 숫자, 특수문자를 포함해야 합니다.
            </FormText>
          )}
        </FormGroup>
        <FormGroup className="mb-3" controlId="password4">
          <FormLabel className="info-label-brutal">
            변경할 비밀번호 확인
          </FormLabel>
          <FormControl
            type="password"
            value={newPassword2}
            maxLength={255}
            placeholder="변경할 비밀번호를 다시 입력하세요."
            onChange={(e) => setNewPassword2(e.target.value)}
            className="form-control-brutal"
          />
          {newPassword2 && !isPasswordMatch && (
            <FormText className="text-danger">
              비밀번호가 일치하지 않습니다.
            </FormText>
          )}
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          취소
        </Button>
        <Button
          variant="success"
          onClick={handleChange}
          disabled={isChangePasswordDisabled}
        >
          변경
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
