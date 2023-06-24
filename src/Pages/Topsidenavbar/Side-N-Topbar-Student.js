import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppLogo from "../../images/TestSoftLogo.png";
import "../dashboard.css";
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
  MDBBtn,
} from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";


const StudentSidebar = ({ userData }) => {
  const [showShow, setShowShow] = useState(false);
  const navigate = useNavigate();
  const id = userData._id;
  const toggleShow = () => setShowShow(!showShow);

 const logOut = () => {
   fetch(`${process.env.BASE_URL}/logout`, {
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
         // Handle any error response
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


  function ViewAvailableTests() {
    navigate("/dashboard/SubjectTests", {
      state: {
        id: id,
      },
    });
  }

  function ViewTestResults() {
    navigate("/dashboard/viewTestResults");
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
                onClick={ViewAvailableTests}
                action
                className="border-0 border-bottom rounded"
              >
                <MDBIcon fas icon="fas fa-book me-3" />
                Available Tests
              </MDBListGroupItem>
            </MDBRipple>

            <MDBRipple rippleTag="span">
              <MDBListGroupItem
                tag="a"
                onClick={ViewTestResults}
                action
                className="border-0 border-bottom rounded"
              >
                <MDBIcon fas icon="fas fa-receipt me-3" />
                View Test Results
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
              <h1 className="lobster">Student Dashboard</h1>
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
                    <div onClick={ViewAvailableTests}>View Your Tests</div>
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
                style={{ width: "100px", marginLeft:"10px" }}
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

export default StudentSidebar;
