import React, { Component, useEffect, useState } from "react";
import StudentSideBar from "./Topsidenavbar/Side-N-Topbar-Student";
import UpcomingTestCards from "../Components/upComingTestCards"
import BarChartResultsProgress from "../Components/barChartResultsProgress"
import TestsBarChart from '../Components/barChartPercentageScore_Tests'
import UpComingTestCalender from "../Components/upComingTestCalender";
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

    const id = userData._id;
    
    return (
      <>
        <StudentSideBar userData={userData} />

        <MDBContainer>
          <MDBRow className="g-2">
            <MDBCol size="2"></MDBCol>
            <MDBCol size="10">
              <div className="auth-wrapper" style={{ height: "auto" }}>
                <div className="auth-inner" style={{ width: "auto" }}>
                  <h2 className="mogra">
                    Hi {userData.fname} {userData.lname}
                    <span role="img" aria-label="student-emoji">
                      🎓
                    </span>
                  </h2>
                  <UpComingTestCalender userData={userData} />
                  <br />
                  <TestsBarChart userId={id} />
                  <br />
                  <UpcomingTestCards userId={id} />
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    );

    
    
}
