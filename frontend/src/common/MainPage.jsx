import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { ExtraCurricular } from "../feature/extracurricular/ExtraCurricular.jsx";
import { AppFooter } from "./AppFooter.jsx";
import { ExtraCurricularCardList } from "../feature/extracurricular/ExtraCurricularCardList.jsx";

export function MainPage() {
  const [loginStatus, setLoginStatus] =
    useState("로그인 상태를 확인해 주세요.");
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);

  // programs 데이터를 불러오는 useEffect
  useEffect(() => {
    axios
      .get("/api/extracurricular/list")
      .then((res) => {
        setPrograms(res.data.programList);
      })
      .catch((err) => console.error("목록 불러오기 실패", err))
      .finally(() => setLoading(false));
  }, []); // 빈 배열을 넣어 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  async function handleStatusButton() {
    try {
      // API 호출
      const response = await axios.get("/api/auth/status");
      console.log(response.data);
      // 서버에서 보낸 JSON 응답 확인
      if (response.data.success) {
        // 로그인 성공 상태
        setLoginStatus(
          `현재 로그인 상태: ${response.data.name} (${response.data.loginId})님 환영합니다.`,
        );
      } else {
        // 로그인 실패 상태
        setLoginStatus(`로그인 상태: ${response.data.message}`);
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
      {/* 캐루셀로 뭐 보이게? 근데 이러면 세션 그거 해야함 !! 흠*/}
      <ExtraCurricularCardList programs={programs} />
      <AppFooter />
    </>
  );
}
