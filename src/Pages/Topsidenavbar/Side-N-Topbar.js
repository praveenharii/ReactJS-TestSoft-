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
} from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";


const adminsidebar = ({userData}) => {
    const [showShow, setShowShow] = useState(false);
     const navigate = useNavigate();
    const id = userData._id; 
    const toggleShow = () => setShowShow(!showShow);


const logOut = () => {
  window.localStorage.clear();
  window.location.href = "./sign-in";
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
  navigate("../subjects");
}

function ViewUsers() {
  navigate("/dashboard/getAllUsers");
}

function CreateExam() {
  navigate("/dashboard/createExam");
}

function ViewStudentResults() {
  navigate("/dashboard/viewAllStudentResults");
}

function CreateUser(){
  navigate("/dashboard/getAllUsers/createUser");
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

            <MDBRipple rippleTag="span">
              <MDBListGroupItem
                tag="a"
                onClick={CreateExam}
                action
                className="border-0 border-bottom rounded"
              >
                <MDBIcon fas icon="file me-3" />
                Create Exam
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

            {/* <MDBRipple rippleTag="span">
                <MDBListGroupItem
                  tag="a"
                  href="#"
                  action
                  className="border-0 border-bottom rounded"
                >
                  <MDBIcon fas icon="building me-3" />
                  Partners
                </MDBListGroupItem>
              </MDBRipple>

              <MDBRipple rippleTag="span">
                <MDBListGroupItem
                  tag="a"
                  href="#"
                  action
                  className="border-0 border-bottom rounded"
                >
                  <MDBIcon fas icon="calendar me-3" />
                  Calendar
                </MDBListGroupItem>
              </MDBRipple>

              <MDBRipple rippleTag="span">
                <MDBListGroupItem
                  tag="a"
                  href="#"
                  action
                  className="border-0 border-bottom rounded"
                >
                  <MDBIcon fas icon="users me-3" />
                  User
                </MDBListGroupItem>
              </MDBRipple>

              <MDBRipple rippleTag="span">
                <MDBListGroupItem
                  tag="a"
                  href="#"
                  action
                  className="border-0 rounded"
                  onClick={ViewSubject}
                >
                  <MDBIcon fas icon="money-bill me-3" />
                  Sales
                </MDBListGroupItem>
              </MDBRipple> */}
          </MDBListGroup>
        </div>
      </MDBCollapse>

      {/*Topbar*/}

      <MDBNavbar expand="lg" light style={{ backgroundColor: "#B6C0E5" }}>
        <MDBContainer fluid>
          <MDBNavbarNav className="d-flex flex-row align-items-center w-auto">
            <MDBNavbarToggler
              type="button"
              aria-label="Toggle navigation"
              onClick={toggleShow}
            >
              <MDBIcon icon="bars" fas />
            </MDBNavbarToggler>
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

            <MDBCollapse navbar>
              <MDBNavbarItem
                className="d-flex align-items-center"
                style={{ border: "1px solid black" }}
              >
                <MDBInput
                  label='Search (ctrl + "/" to focus)'
                  id="form1"
                  type="text"
                />
                <MDBIcon fas icon="search mx-2" />
              </MDBNavbarItem>
            </MDBCollapse>
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

            <MDBNavbarItem className="me-3 me-lg-0">
              <MDBNavbarLink href="#">
                <MDBIcon fas icon="fill-drip" />
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem className="me-3 me-lg-0">
              <MDBNavbarLink href="#">
                <MDBIcon fab icon="github" />
              </MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem className="me-3 me-lg-0 d-flex align-items-center">
              <MDBDropdown>
                <MDBDropdownToggle
                  tag="a"
                  href="#!"
                  className="hidden-arrow nav-link"
                >
                  <img
                    src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg"
                    className="rounded-circle"
                    height="22"
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
              <Button onClick={logOut} variant="danger">
                Log Out
              </Button>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
};

export default adminsidebar;
