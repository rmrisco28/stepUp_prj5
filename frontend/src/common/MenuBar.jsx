import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

export function MenuBar() {
  // const [showSubMenu, setShowSubMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const menus = [
    {
      name: "비교과 프로그램",
      path: "/extra_curricular",
      subItems: [
        { name: "프로그램 신청", path: "/extra_curricular/apply" },
        { name: "프로그램 현황", path: "/extra_curricular/status" },
      ],
    },
    {
      name: "핵심 역량",
      path: "/competency",
      subItems: [
        { name: "역량 소개", path: "/competency" },
        { name: "진단 검사", path: "/competency/test" },
        { name: "관리자 핵심역량 추가", path: "/competency/add" },
        { name: "관리자 역량 변경", path: "/competency/editor" },
        { name: "관리자 하위 역량 변경", path: "/competency/subEditor" },
      ],
    },
    {
      name: "마일리지",
      path: "/mileage",
      subItems: [
        { name: "마일리지 현황", path: "/mileage/status" },
        { name: "마일리지 사용", path: "/mileage/use" },
      ],
    },
    {
      name: "진로 설계",
      path: "/career",
      subItems: [
        { name: "진로 로드맵", path: "/career/roadmap" },
        { name: "취업 자료실", path: "/career/resources" },
      ],
    },
    {
      name: "통합 상담",
      path: "/counseling",
      subItems: [
        { name: "상담 신청", path: "/counseling/apply" },
        { name: "상담 내역", path: "/counseling/history" },
      ],
    },
    {
      name: "로그인",
      path: "/login",
      subItems: [
        { name: "로그인", path: "/login" },
        { name: "회원가입", path: "/signup" },
      ],
    },
  ];

  return (
    <Navbar bg="light" expand="lg" className="mb-3 shadow-sm">
      <Container>
        {/* 로고 */}
        <Navbar.Brand as={Link} to="/">
          임 시 로 고
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            {menus.map((menu, idx) => (
              // 부모에 position-relative + hover 제어
              <div
                key={menu.name}
                className="nav-item position-relative"
                onMouseEnter={() => setActiveMenu(idx)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                {/* 대분류 */}
                <Nav.Link
                  as={Link}
                  to={menu.path}
                  className="px-3"
                  style={{ fontSize: "1.2rem" }}
                >
                  {menu.name}
                </Nav.Link>

                {/* 하위 메뉴 */}
                <div
                  className={`dropdown-menu border-0 border-top rounded-0 shadow-sm ${
                    activeMenu === idx ? "show" : ""
                  }`}
                  style={{ left: 10, top: "100%" }} // 바로 아래
                >
                  {menu.subItems.map((sub) => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      className="dropdown-item py-2"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
