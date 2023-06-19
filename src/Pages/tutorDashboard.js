import React, {  useEffect, useState } from "react";
import TutorSideBar from "./Topsidenavbar/Side-N-Topbar-Tutor";
import LoginLogoutActivity from "../Components/Login-Logout-Activity";
import UpComingTestCalender from "../Components/upComingTestCalender";
import {
  MDBCol,
  MDBRow,
  MDBContainer,
} from "mdb-react-ui-kit";
import Footer from "../Components/Footer";
const baseUrl = require("../config");

export default function tutorDashboard({ userData }) {
  const [userNum, setUserNum] = useState([]);


  const getNumberOfUsers = () => {
    fetch(`${baseUrl}/getNumbersOfUsers`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((users) => {
        console.log(users, "allUsers");
        setUserNum(users);
      });
  };

  useEffect(() => {
    getNumberOfUsers();
  }, []);

  return (
    <>
      <TutorSideBar userData={userData} />
      <div>
        <br />
        <MDBContainer>
          <MDBRow className="g-2">
            <MDBCol size="2"></MDBCol>
            <MDBCol size="10">
              <div className="App">
                <div className="auth-wrapper" style={{ height: "auto" }}>
                  <div className="auth-inner" style={{ width: 1024 }}>
                    <h2 className="mogra">
                      Hi {userData.fname} {userData.lname}
                      <span role="img" aria-label="teacher-emoji">
                        👨‍🏫
                      </span>
                    </h2>
                    <br />
                    <h3>Total Users</h3>
                    <div className="totalUser-wrapper">
                      <div
                        className="totalUser-inner"
                        style={{ width: "auto" }}
                      >
                        {userNum.map((user) => (
                          <UserCountCard
                            key={user._id}
                            userType={user._id}
                            count={user.count}
                          />
                        ))}
                      </div>
                    </div>
                    <br />
                    <UpComingTestCalender userData={userData} />
                    <br />
                    <h3>Login & Logout Activity</h3>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <LoginLogoutActivity />
                    </div>
                    <br />
                  </div>
                </div>
              </div>
              <Footer />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </>
  );
  //getting data displayed on Dashboard
}

function UserCountCard({ userType, count }) {
  const cardStyle = {
    padding: "20px",
    borderRadius: "20px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "calc(33.33% - 10px)",
    background: `linear-gradient(to bottom, ${
      userType === "Admin"
        ? "#f44336"
        : userType === "Tutor"
        ? "#2196f3"
        : userType === "Student"
        ? "#4caf50"
        : "#9e9e9e"
    }, #312)`,
    color: "#fff",
    margin: "16px",
    display: "inline-block",
  };

  return (
    <div style={cardStyle}>
      <h3>{userType}</h3>
      <p>{count} Users</p>
    </div>
  );
}
