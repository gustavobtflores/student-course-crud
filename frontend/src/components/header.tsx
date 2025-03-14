import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, LinkProps } from "react-router";

const RouterLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => <Link ref={ref} {...props} />);

const Header: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/students">
              Estudantes
            </Nav.Link>
            <Nav.Link as={Link} to="/courses">
              Cursos
            </Nav.Link>
            <Nav.Link as={Link} to="/enrollments">
              Matrículas
            </Nav.Link>
          </Nav>
          <Nav>
            <RouterLink to="/login">
              <Button variant="outline-light">Logout</Button>
            </RouterLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
