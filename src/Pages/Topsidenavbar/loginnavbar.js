import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function Loginnavigation() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>TestSoft</Navbar.Brand>
          <Nav className="mx-auto">
            <Nav.Item>
              <Nav.Link disabled>Welcome to TestSoft Examination System</Nav.Link>
            </Nav.Item>
          </Nav>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/sign-in">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/sign-up">
                Sign Up
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
