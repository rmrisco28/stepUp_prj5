import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

export function MainPage() {
  const [loginStatus, setLoginStatus] =
    useState("로그인 상태를 확인해 주세요.");

  async function handleStatusButton() {
    try {
      // API 호출
      const response = await axios.get("/api/auth/status");
      console.log(response.data);
      // 서버에서 보낸 JSON 응답 확인
      if (response.data.success) {
        // 로그인 성공 상태
        const loginId = response.data.member.loginId;
        setLoginStatus(
          `현재 로그인 상태: ${loginId} (${response.data.message})`,
        );
      } else {
        // 로그인 실패 상태
        setLoginStatus(`로그인되지 않음: ${response.data.message}`);
      }
    } catch (error) {
      // API 호출 실패(403 Forbidden 등) 처리
      if (error.response && error.response.status === 403) {
        setLoginStatus("로그인되지 않음: 접근 권한이 없습니다.");
      } else {
        setLoginStatus(`오류 발생: ${error.message}`);
      }
    }
  }

  return (
    <>
      <Button onClick={handleStatusButton}>로그인 상태 확인</Button>
      <p>{loginStatus}</p>
    </>
  );
}
