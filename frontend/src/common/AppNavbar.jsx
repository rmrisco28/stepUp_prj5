import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router";

export function AppNavbar() {
  return (
    <Navbar bg="light" expand="lg" className="mb-3 shadow-sm custom-navbar">
      <Container className="d-flex justify-content-between align-items-center">
        {/*로고*/}
        <Navbar.Brand as={Link} to="/">
          임 시 로 고
        </Navbar.Brand>

        {/*메뉴 버튼*/}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex justify-content-center gap-4 ms-5 flex-grow-1">
            <Nav.Link
              as={Link}
              to="/extracurricular"
              style={{ fontSize: "1.2rem" }}
            >
              비교과 프로그램
            </Nav.Link>
            <Nav.Link as={Link} to="/competency" style={{ fontSize: "1.2rem" }}>
              핵심 역량
            </Nav.Link>
            <Nav.Link as={Link} to="/mileage" style={{ fontSize: "1.2rem" }}>
              마일리지
            </Nav.Link>
            <Nav.Link as={Link} to="/Career" style={{ fontSize: "1.2rem" }}>
              진로 설계
            </Nav.Link>
            <Nav.Link as={Link} to="/counseling" style={{ fontSize: "1.2rem" }}>
              통합 상담
            </Nav.Link>{" "}
            <Nav.Link as={Link} to="/login" style={{ fontSize: "1.2rem" }}>
              로그인
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
