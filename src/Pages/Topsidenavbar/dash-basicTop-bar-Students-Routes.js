import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dashboard from "./../dashboard";
import { MDBNavbarBrand } from "mdb-react-ui-kit";
import AppLogo from "../../images/TestSoftLogo.png";
import { useNavigate } from "react-router-dom";

function StudentTopbar({userData}) {
   const navigate = useNavigate();
  console.log(userData._id);
  
  function ViewAvailableTests() {
    navigate("/dashboard/SubjectTests", {
      state: {
        userData: userData,
      },
    });
  }

  function ViewTestResults() {
    navigate("/dashboard/viewTestResults", {
      state: {
        userData: userData,
      },
    });
  }

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
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
            <Nav.Link onClick={ViewAvailableTests}>Take Tests</Nav.Link>
            <Nav.Link onClick={ViewTestResults}>View Results</Nav.Link>
            {/* <Nav.Link href="/dashboard/getAllUsers">Manage Users</Nav.Link> */}
            
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

export default StudentTopbar;
