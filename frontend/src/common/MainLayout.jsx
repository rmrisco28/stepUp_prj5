import { MenuBar } from "./MenuBar.jsx";
import React from "react";
import { Outlet } from "react-router";
import { AppFooter } from "./AppFooter.jsx";

export function MainLayout() {
  return (
    // 전체 레이아웃을 Flexbox 컨테이너로 설정
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f1f3f4 100%)",
        fontFamily:
          "'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* 메뉴바 */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 2px 20px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.95)",
          borderBottom: "none", // 이거 해도 안 없어짐
        }}
      >
        <MenuBar />
      </div>

      {/* 메인 콘텐츠 영역 */}
      <main
        style={{
          flex: "1", // 이 부분이 콘텐츠가 길어질 때 늘어나게 하는 역할
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 배경 장식 요소들 */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "-5%",
            width: "300px",
            height: "300px",
            background:
              "radial-gradient(circle, rgba(76, 175, 80, 0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            zIndex: 0,
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            bottom: "20%",
            left: "-10%",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(33, 150, 243, 0.08) 0%, transparent 70%)",
            borderRadius: "50%",
            zIndex: 0,
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(156, 39, 176, 0.05) 0%, transparent 70%)",
            borderRadius: "50%",
            zIndex: 0,
          }}
        ></div>

        {/* 실제 콘텐츠 */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <Outlet />
        </div>
      </main>

      {/* 푸터 */}
      <footer
        style={{
          marginTop: "auto",
          background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
          boxShadow: "0 -5px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <AppFooter />
      </footer>
    </div>
  );
}
