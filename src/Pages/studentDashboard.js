import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentSideBar from "./Topsidenavbar/Side-N-Topbar-Student";
import UpcomingTestCards from "../Components/upComingTestCards"
import BarChartResultsProgress from "../Components/barChartResultsProgress"
import TestsBarChart from '../Components/barChartPercentageScore_Tests'
import {
  MDBIcon,
  MDBCollapse,
  MDBRipple,
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
export default function StudentDashboard({ userData }){
    const navigate = useNavigate();
    const id = userData._id;
    


    const logOut = () =>{
      window.localStorage.clear();
      window.location.href = "./sign-in";
    };

    function editProfileCLick() {
      navigate(`/dashboard/updateProfile/${id}`, {
        state: {
          userData: userData,
        },
      });
    }

    function viewTest(){
      navigate("/dashboard/SubjectTests", {
        state: {
          id: id,
          userData: userData,
        }
      });
    }

    function testResults() {
      navigate("/dashboard/viewTestResults");
    }





    return (
      <>
        <StudentSideBar userData={userData} />

        <MDBContainer>
          <MDBRow className="g-2">
            <MDBCol size="2"></MDBCol>
            <MDBCol size="10">
              <div className="auth-wrapper" style={{ height: "auto" }}>
                <div className="auth-inner" style={{ width: 1024 }}>
                  <h1 className="lobster">Student Dashboard</h1>
                  <h2 className="mogra">Hi {userData.fname}</h2>
                  <TestsBarChart userId={id} />

                  <UpcomingTestCards />
                  {/* <BarChartResultsProgress /> */}
                  {/* <div>
                  Name
                  <h1>
                    {userData.fname} {userData.lname}
                  </h1>
                  Email <h1>{userData.email}</h1>
                  <br />
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={editProfileCLick}
                  >
                    {" "}
                    Edit Profile
                  </button>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={viewTest}
                  >
                    {" "}
                    View Test
                  </button>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={testResults}
                  >
                    {" "}
                    View Test Results
                  </button>
                  <button onClick={logOut} className="btn btn-primary">
                    Log Out
                  </button>
                </div> */}
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    );

    
    
}
