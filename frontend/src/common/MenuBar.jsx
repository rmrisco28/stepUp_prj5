import { Nav, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router";

export function MenuBar() {
  return (
    <div className="menu-bar bg-primary">
      <Container>
        <Nav className="d-flex justify-content-center gap-5 py-3">
          <Navbar.Brand as={Link} to="/">
            임 시 로 고
          </Navbar.Brand>
          <Nav.Link as={Link} to="/">
            홈
          </Nav.Link>
          <Nav.Link as={Link} to="/products">
            제품
          </Nav.Link>
          <Nav.Link as={Link} to="/services">
            서비스
          </Nav.Link>
          <Nav.Link as={Link} to="/community">
            커뮤니티
          </Nav.Link>
          <Nav.Link as={Link} to="/contact">
            문의
          </Nav.Link>
        </Nav>
      </Container>
    </div>
  );
}
