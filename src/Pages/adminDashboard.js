import React, { useEffect, useState} from "react";
import AdminSidebar from './Topsidenavbar/Side-N-Topbar.js';
import "./dashboard.css";
import {
  MDBCol,
  MDBRow,
  MDBContainer,
} from "mdb-react-ui-kit";
import Footer from "../Components/Footer";
import LoginLogoutActivity from "../Components/Login-Logout-Activity";
import UpComingTestCalender from "../Components/upComingTestCalender";
import Spinner from "../Components/LoaderSpinner"



export default function AdminDashboard({ userData }) {
   const id = userData._id; 
   const [data, setData] = useState([]);
   const [userNum, setUserNum] = useState([]);
   const [loading, setLoading] = useState(true);
   const [dataCount, setDataCount] = useState('')
  // console.log(dataLength);

  
    const getNumberOfUsers = () => {
      setLoading(true);
      fetch(`${process.env.REACT_APP_BASE_URL}/getNumbersOfUsers`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((users) => {
          console.log(users, "allUsers");
          setUserNum(users);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });;
    };

    const getAllPendingUsers = () => {
      fetch(`${process.env.REACT_APP_BASE_URL}/getAllPendingUsers`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "allPendingUsers");
         const dataLength = data.data.length; // Get the length of the data
         setDataCount(dataLength);
         console.log("Data length:", dataLength);
          setData(data.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };



    useEffect(() => {
      getAllPendingUsers();
      getNumberOfUsers();
    }, []);

   

    return (
      <>
        <AdminSidebar userData={userData} dataLength={dataCount} />

        <div>
          <MDBContainer>
            <MDBRow className="g-2">
              <MDBCol size="2"></MDBCol>
              <MDBCol size="10">
                <br />
                <div className="App">
                  <div className="auth-wrapper" style={{ height: "auto" }}>
                    <div className="auth-inner" style={{ width: "auto" }}>
                      <h2>
                        Hi {userData.fname} {userData.lname}
                        <span role="img" aria-label="admin-emoji">
                          👑
                        </span>
                      </h2>
                      <br />
                      <h3>Total Users</h3>
                      <div className="totalUser-wrapper">
                        {loading ? (
                          <Spinner />
                        ) : (
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
                        )}
                      </div>
                      <br />
                      <UpComingTestCalender userData={userData} />
                      <br />
                      <h3>Login & Logout Activity</h3>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <LoginLogoutActivity />
                      </div>
                      <br />
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
}

function UserCountCard({ userType, count }) {
  const cardStyle = {
    padding: "20px",

    borderRadius: "20px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "150px",
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

