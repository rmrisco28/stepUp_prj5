import { useContext, useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate, useNavigation } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/menubar.css";
import { AuthProvider } from "./AuthContext.jsx";
import { useAuth } from "./AuthContext.jsx";
import axios from "axios";

export function MenuBar() {
  const { user, logout, isAuthenticated, isAdmin, isExtra } = useAuth();
  // const [isAdmin, setIsAdmin] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const navigate = useNavigate();

  const name = user?.name;
  const loginId = user?.loginId;
  // isAdmin 받아오면 이렇게 안 하고
  // useEffect(() => {
  //   axios
  //     .get("/api/auth/status") // 로그인 상태 확인 API
  //     .then((res) => {
  //       console.log("로그인된 사용자 정보:", res.data);
  //       setIsAdmin(res.data.authName === "admin"); // authName이 'admin'이면 관리자
  //     })
  //     .catch((err) => {
  //       console.log("로그인 상태 확인 실패");
  //     });
  // }, []);

  const menus = [
    {
      name: "비교과 프로그램",
      path: "/extracurricular",
      subItems: [
        { name: "프로그램 신청", path: "/extracurricular" },
        isExtra() ||
          (isAdmin() && {
            name: "프로그램 관리",
            path: "/extracurricular/manage",
          }),
      ].filter(Boolean),
    },
    {
      name: "핵심역량",
      path: "/competency",
      subItems: [
        { name: "역량 소개", path: "/competency" },
        { name: "진단 검사", path: "/competency/assessment" },
        // 요로케 간단베리하게도 할 수 있습니당! 필요한 정보 있는지 여쭤보기
        isAdmin() && { name: "관리자 핵심역량 목록", path: "/competency/list" },
        isAdmin() && {
          name: "관리자 하위역량 목록",
          path: "/competency/subList",
        },
      ].filter(Boolean),
    },
    {
      name: "나의 활동",
      path: "/activity",
      subItems: [
        { name: "비교과 내역", path: "/activity/etclog" },
        // { name: "마일리지 내역", path: "/activity/mileage" },
        { name: "역량진단 결과", path: "/competency/assessment" },
        isAuthenticated && {
          name: "비밀번호 변경",
          path: "/activity/changePw",
        },
        // isAdmin() && { name: "학생 계정 관리", path: "/activity/stdAccess" },
        // { name: "학생 계정 관리", path: "/activity/stdAccess" },
      ].filter(Boolean),
    },
    {
      name: "안내",
      path: "/board",
      subItems: [
        { name: "공지사항", path: "/board/notice" },
        { name: "FAQ", path: "/board/faq" },
        isAdmin() && { name: "FAQ 관리", path: "/board/faq/manage" },
      ].filter(Boolean),
    },
  ];

  // const logo = "../image/stepUp_logo_수정.png";

  function logoutButton() {
    alert("로그아웃 되었습니다.");
    logout();
    navigate("/");
  }

  return (
    <>
      <Navbar
        bg="success"
        className="py-0 border-bottom shadow-sm"
        style={{ height: "47px" }}
      >
        <Container className="justify-content-end">
          <Nav className="align-items-center" style={{ height: "47px" }}>
            {isAuthenticated ? (
              <div
                className="d-flex align-items-center text-white"
                style={{ height: "47px" }}
              >
                <span className="me-3">
                  [ {name}({loginId}) ] 님 환영합니다.
                </span>
                <Button
                  variant="outline-light"
                  size="sm"
                  className="px-3 rounded-pill shadow-sm"
                  onClick={logoutButton}
                >
                  <b>로그아웃</b>
                </Button>
              </div>
            ) : (
              <div
                className="d-flex align-items-center"
                style={{ height: "47px" }}
              >
                <Nav.Link as={Link} to="/login" className="text-white p-0">
                  <Button
                    variant="outline-light"
                    size="sm"
                    className="px-3 rounded-pill shadow-sm"
                  >
                    <b>로그인</b>
                  </Button>
                </Nav.Link>
              </div>
            )}
          </Nav>
        </Container>
      </Navbar>

      <Navbar bg="light" expand="lg" className="mb-3 shadow-sm">
        <Container>
          {/* 로고 */}
          <Navbar.Brand as={Link} to="/">
            <img
              src="/../image/stepUp_logo_수정.png"
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
