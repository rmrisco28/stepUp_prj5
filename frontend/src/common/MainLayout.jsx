import { MenuBar } from "./MenuBar.jsx";
import React from "react";
import { Outlet, useLocation } from "react-router";
import { AppFooter } from "./AppFooter.jsx";
import { useAuth } from "./AuthContext.jsx";

export function MainLayout() {
  const location = useLocation();
  const hideMenu = location.pathname === "/login";

  return (
    <>
      <div className="mb-5">
        {/*메뉴바*/}
        {!hideMenu && <MenuBar />}
      </div>

      {/*메인콘텐츠 영역-비교과,역량 등등..*/}
      <div className="mb-5">
        <Outlet />
      </div>

      {/*푸터*/}
      {/*평소엔 보이는 화면 아래에 위치하는데, Outlet에 있는 데이터에 따라 밀려나도록*/}
      <div className="mb-0">
        <AppFooter />
      </div>
    </>
  );
}
