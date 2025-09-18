import { MenuBar } from "./MenuBar.jsx";
import React from "react";
import { Outlet } from "react-router";
import { AppFooter } from "./AppFooter.jsx";

export function MainLayout() {
  return (
    <>
      <div className="mb-5">
        {/*메뉴바*/}
        <MenuBar />
      </div>

      {/*메인콘텐츠 영역-비교과,역량 등등..*/}
      <div className="mb-5">
        <Outlet />
      </div>

      {/*푸터*/}
      <div className="mb-0">
        <AppFooter />
      </div>
    </>
  );
}
