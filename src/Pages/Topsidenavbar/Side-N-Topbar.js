import React, { Component, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import AppLogo from "../../images/logo_testSoft.png";
import AppLogo from "../../images/TestSoftLogo.png";
import "../dashboard.css";
//import "./dashboard.css";
import { MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
  MDBRipple,
  MDBBadge,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";


const adminsidebar = ({userData}) => {
    const [showShow, setShowShow] = useState(false);
     const navigate = useNavigate();
    const id = userData._id; 
    const toggleShow = () => setShowShow(!showShow);


const logOut = () => {
  fetch(`${process.env.REACT_APP_BASE_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"), // Send the token in the "token" header
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "ok") {
        // Clear local storage and redirect to sign-in page
        console.log("Logout Succesfully");
        window.localStorage.clear();
        window.location.href = "./sign-in";
      } else {
        console.log("Logout error:", data.error);
      }
    })
    .catch((error) => {
      console.log("Logout error:", error);
    });
};

const dashboard = () => { 
  navigate("/dashboard");
};

function editProfileCLick() {
  navigate(`/dashboard/updateProfile/${id}`, {
    state: {
      id,
      userData: userData,
    },
  });
}

function ViewSubject() {
  navigate("/dashboard/subjects");
}

function ViewUsers() {
  navigate("/dashboard/getAllUsers");
}

// function CreateExam() {
//   navigate("/dashboard/createExam");
// }

function ViewStudentResults() {
  navigate("/dashboard/viewResultsTestsLists");
}

function CreateUser(){
  navigate("/dashboard/createUser");
}

function ApproveUsers() {
  navigate("/dashboard/adminApproveUser");
}

  return (
    <div>
      <link
        href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
        rel="stylesheet"
      />
      {/*Sidebar*/}

      <MDBCollapse
        show={showShow}
        tag="nav"
        className="d-lg-block bg-white sidebar"
      >
        <div className="position-sticky">
          <MDBListGroup flush className="mx-3 mt-4">
            <MDBRipple rippleTag="span">
              <MDBListGroupItem
                tag="a"
                onClick={dashboard}
                action
                className="border-0 border-bottom rounded rounded"
              >
                <MDBIcon fas icon="tachometer-alt me-3" />
                Main Dashboard
              </MDBListGroupItem>
            </MDBRipple>

            <MDBRipple rippleTag="span">
              <MDBListGroupItem
                tag="a"
                onClick={editProfileCLick}
                action
                className="border-0 border-bottom rounded"
                // active
                aria-current="true"
              >
                <MDBIcon fas icon="user-edit me-3" />
                Edit Profile
              </MDBListGroupItem>
            </MDBRipple>

            <MDBRipple rippleTag="span">
              <MDBListGroupItem
                tag="a"
                onClick={ViewUsers}
                action
                className="border-0 border-bottom rounded"
              >
                <MDBIcon fas icon="users me-3" />
                View Users
              </MDBListGroupItem>
            </MDBRipple>

            <MDBRipple rippleTag="span">
              <MDBListGroupItem
                tag="a"
                onClick={ApproveUsers}
                action
                className="border-0 border-bottom rounded"
              >
                <MDBIcon fas icon="users me-3" />
                Pending Users
              </MDBListGroupItem>
            </MDBRipple>

            <MDBRipple rippleTag="span">
              <MDBListGroupItem
                tag="a"
                onClick={CreateUser}
                action
                className="border-0 border-bottom rounded"
              >
                <MDBIcon fas icon="user-plus me-3" />
                Create User
              </MDBListGroupItem>
            </MDBRipple>

            <MDBRipple rippleTag="span">
              <MDBListGroupItem
                tag="a"
                onClick={ViewSubject}
                action
                className="border-0 border-bottom rounded"
              >
                <MDBIcon fas icon="book-open me-3" />
                View Subjects
              </MDBListGroupItem>
            </MDBRipple>

            <MDBRipple
              rippleTag="span"
              style={{ padding: "0px", margin: "5px 0", lineHeight: "1.5" }}
            >
              <MDBListGroupItem
                tag="a"
                onClick={ViewStudentResults}
                action
                className="border-0 border-bottom rounded"
              >
                <MDBIcon fas icon="clipboard-list me-3" />
                Student Results
              </MDBListGroupItem>
            </MDBRipple>
          </MDBListGroup>
        </div>
      </MDBCollapse>

      {/*Topbar*/}

      <MDBNavbar expand="lg" light style={{ backgroundColor: "#B6C0E5" }}>
        <MDBContainer fluid>
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
          <MDBNavbarNav className="d-flex justify-content-center align-items-center w-100">
            <div className="text-center">
              <h1 className="lobster">Admin Dashboard</h1>
            </div>
          </MDBNavbarNav>
          <MDBNavbarNav className="d-flex flex-row justify-content-end w-auto">
            <MDBNavbarItem className="me-3 me-lg-0 d-flex align-items-center">
              <MDBDropdown>
                <MDBDropdownToggle
                  tag="a"
                  href="#!"
                  className="hidden-arrow nav-link"
                >
                  <MDBIcon fas icon="bell" />
                  <MDBBadge color="danger" notification pill>
                    1
                  </MDBBadge>
                </MDBDropdownToggle>

                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <div href="#">Some news</div>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <div href="#">Another news</div>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <div href="#">Something else here</div>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            <MDBNavbarItem className="me-3 me-lg-0 d-flex align-items-center">
              <MDBDropdown>
                <MDBDropdownToggle
                  tag="a"
                  onClick={editProfileCLick}
                  className="hidden-arrow nav-link"
                >
                  <img
                    src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                    className="rounded-circle"
                    height="45"
                    alt=""
                    loading="lazy"
                  />
                </MDBDropdownToggle>

                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <div href="#">My profile</div>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <div href="#">Settings</div>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <div href="#">Logout</div>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
              <MDBBtn
                onClick={logOut}
                color="danger"
                style={{ width: "100px", marginLeft: "10px" }}
              >
                Log Out
              </MDBBtn>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
};

export default adminsidebar;
