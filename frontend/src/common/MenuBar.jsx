import { useContext, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/menubar.css";
import { AuthProvider } from "./AuthContext.jsx";
import { useAuth } from "./AuthContext.jsx";

export function MenuBar() {
  const { user, isAdmin, logout, isAuthenticated } = useAuth();
  const [activeMenu, setActiveMenu] = useState(null);

  const name = user?.name;
  const loginId = user?.loginId;

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
      name: "나의 활동",
      path: "/activity",
      subItems: [
        { name: "비교과 내역", path: "/activity/etclog" },
        { name: "마일리지 내역", path: "/activity/mileage" },
      ],
    },
    {
      name: "안내",
      path: "/board",
      subItems: [
        { name: "공지사항", path: "/board/notice" },
        { name: "FAQ", path: "/board/faq" },
        { name: "FAQ 관리", path: "/board/faq/manage" },
      ],
    },
  ];

  // const logo = "../image/stepUp_logo_수정.png";

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
              {isAuthenticated ? (
                <>
                  <span className="me-3" style={{ cursor: "default" }}>
                    [ {name}({loginId}) ] 님 환영합니다.
                  </span>
                  <Button
                    variant="outline-light"
                    size="sm"
                    className="px-3 rounded-pill shadow-sm"
                  >
                    <b>로그아웃</b>
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline-light"
                  size="sm"
                  className="px-3 rounded-pill shadow-sm"
                >
                  <b>로그인</b>
                </Button>
              )}
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
                    <b>{menu.name}</b>
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
