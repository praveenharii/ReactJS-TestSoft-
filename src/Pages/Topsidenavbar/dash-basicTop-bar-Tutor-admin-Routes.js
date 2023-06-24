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
   fetch(`${process.env.BASE_URL}/logout`, {
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
            <Nav.Link href="/dashboard/subjects">View Subjects</Nav.Link>
            <Nav.Link href="/dashboard/viewResultsTestsLists">
              View Student Results
            </Nav.Link>
            <NavDropdown title="Manage Users" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/dashboard/getAllUsers">
                View Users
              </NavDropdown.Item>
              <NavDropdown.Item href="/dashboard/adminApproveUser">
                Pending Users
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/dashboard/createUser">
                Create Users
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Button onClick={logOut} variant="danger">
            LogOut
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
