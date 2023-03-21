import React from "react";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";

export default function test()  {
  return (
    <>
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <Navbar.Brand href="#">Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">Dashboard</Nav.Link>
              <Nav.Link href="#">Settings</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid>
        <Row>
          <Col md={3}>
            <Nav className="flex-column">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">Dashboard</Nav.Link>
              <Nav.Link href="#">Settings</Nav.Link>
            </Nav>
          </Col>
          <Col md={9}>
            <h1>Welcome to your Dashboard!</h1>
          </Col>
        </Row>
      </Container>
    </>
  );
}


