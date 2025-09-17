import { useContext, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/menubar.css";
import { AuthProvider } from "./AuthContext.jsx";
import { useAuth } from "./AuthContext.jsx";

export function MenuBar() {
  const { user, isAdmin, logout, isAuthenticated } = useAuth();
  const [activeMenu, setActiveMenu] = useState(null);

  const menus = [
    {
      name: "비교과 프로그램",
      path: "/extracurricular",
      subItems: [
        { name: "프로그램 신청", path: "/extracurricular" },
        { name: "프로그램 관리", path: "/extracurricular/manage" },
      ],
    },
    {
      name: "핵심역량",
      path: "/competency",
      subItems: [
        { name: "역량 소개", path: "/competency" },
        { name: "진단 검사", path: "/competency/assessment" },
        { name: "관리자 핵심역량 목록", path: "/competency/list" },
        { name: "관리자 하위역량 목록", path: "/competency/subList" },
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
  ];

  return (
    <>
      <Navbar bg="success" className="py-0 border-bottom shadow-sm">
        <Container className="justify-content-end">
          <Nav>
            <Nav.Link
              as={Link}
              to={isAuthenticated ? "#" : "/login"}
              onClick={isAuthenticated ? logout : null}
              className="text-white"
            >
              {isAuthenticated ? "로그아웃" : "로그인"}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Navbar bg="light" expand="lg" className="mb-3 shadow-sm">
        <Container>
          {/* 로고 */}
          <Navbar.Brand as={Link} to="/">
            <img
              src="../image/stepUp_logo_수정.png"
              alt="logo"
              className="logo"
            />
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
    </>
  );
}
