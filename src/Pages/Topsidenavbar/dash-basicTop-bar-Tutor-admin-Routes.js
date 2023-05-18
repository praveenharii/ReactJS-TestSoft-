import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dashboard from './../dashboard';
import {
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import AppLogo from "../../images/TestSoftLogo.png";

function NavScrollExample() {

  const logOut = () => {
    window.localStorage.clear();
    window.location.assign("http://localhost:3000/");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <MDBNavbarBrand href="/">
          <img
            src={AppLogo}
            height="50"
            width="150"
            alt=""
            loading="lazy"
            style={{ borderRadius: "10px" }}
          />
        </MDBNavbarBrand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            {/* <Nav.Link href="/dashboard/getAllUsers">Manage Users</Nav.Link> */}
            <NavDropdown title="Manage Users" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/dashboard/getAllUsers">
                View Users
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/dashboard/getAllUsers/createUser">
                Create Users
              </NavDropdown.Item>

              {/* <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item> */}
            </NavDropdown>
            <NavDropdown title="Manage Exam" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/dashboard/createExam">
                Create Exam
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/subjects">
                View Subjects
              </NavDropdown.Item>

              {/* <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            
          </Form> */}
          <Button onClick={logOut} variant="danger">
            LogOut
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
