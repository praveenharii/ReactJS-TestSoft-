import React from "react";
import StudentSideBar from "./Topsidenavbar/Side-N-Topbar-Student";
import TestsBarChart from '../Components/barChartPercentageScore_Tests'
import UpComingTestCalender from "../Components/upComingTestCalender";
import  CardList  from '../Components/StackUpcomingTestCards';
import Footer from "../Components/Footer";
import {
  MDBCol,
  MDBRow,
  MDBContainer,

} from "mdb-react-ui-kit";
import './dashboard.css'

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
                  <CardList userId={id} />
                  <br />
                  <br />
                  <br />
                  <UpComingTestCalender userData={userData} />
                  <br />
                  <TestsBarChart userId={id} />
                  <br />
                  <link
                    href="https://fonts.googleapis.com/css?family=Open+Sans:300i,400"
                    rel="stylesheet"
                  />
                </div>
              </div>
              <Footer />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    );

    
    
}
