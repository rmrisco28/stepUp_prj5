import { MenuBar } from "./MenuBar.jsx";
import React from "react";
import { Outlet, useLocation } from "react-router";
import { AppFooter } from "./AppFooter.jsx";
import { useAuth } from "./AuthContext.jsx";

export function MainLayout() {
  const location = useLocation();
  const hideMenu = location.pathname === "/login";

  return (
    // 전체 레이아웃을 Flexbox 컨테이너로 설정
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* 메뉴바 */}
      <div className="mb-5">{!hideMenu && <MenuBar />}</div>

      {/* 메인 콘텐츠 영역 */}
      <div
        className="mb-5"
        style={{
          flex: "1", // 이 부분이 콘텐츠가 길어질 때 늘어나게 하는 역할
        }}
      >
        <Outlet />
      </div>

      {/* 푸터 */}
      <div className="mb-0">
        <AppFooter />
      </div>
    </div>
  );
}
