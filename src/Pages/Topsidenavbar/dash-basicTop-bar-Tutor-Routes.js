import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { MDBNavbarBrand } from "mdb-react-ui-kit";
import AppLogo from "../../images/TestSoftLogo.png";
import jwt_decode from "jwt-decode";
import "../../index.css"

function NavScrollExample() {
  let id = null;
  const token = window.localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  id = decodedToken.userId;
  const navigate = useNavigate();

  const logOut = () => {
  fetch(`${process.env.REACT_APP_BASE_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "ok") {
        console.log("Logout Succesfully");
        window.localStorage.clear();
        const signInPath = "/sign-in"; // Update this with your actual sign-in page path
        const redirectURL = window.location.origin + signInPath;
        window.location.href = redirectURL;
      } else {
        console.log("Logout error:", data.error);
      }
    })
    .catch((error) => {
      console.log("Logout error:", error);
    });
 };

 function ViewSubject() {
   navigate(`/subjects/${id}`);
 }

  return (
    <Navbar style={{ backgroundColor: "#B6C0E5" }} expand="lg">
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
            <Nav.Link href="/dashboard/tutorViewUsers">View Users</Nav.Link>
            <NavDropdown title="Manage Exam" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/dashboard/createExam">
                Create Exam
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={ViewSubject}>
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
