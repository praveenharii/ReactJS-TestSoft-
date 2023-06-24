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
  //const {useData} = userData.userData;
   
   const id = userData._id; 
   const [data, setData] = useState([]);
   const [userNum, setUserNum] = useState([]);
   const [loading, setLoading] = useState(true);
   console.log(userData);

  
    const getNumberOfUsers = () => {
      fetch(`${process.env.BASE_URL}/getNumbersOfUsers`, {
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
      fetch(`${process.env.BASE_URL}/getAllPendingUsers`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "allPendingUsers");
          setData(data.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    const verifyUser = async (id,name,email) => {
      if(window.confirm(`Please Click Ok if you want to Verify user ${name}`)){
        const res = await fetch(`${process.env.BASE_URL}/verifyUser`, {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            userid: id,
            email: email,
          }),
        });
        const data = await res.json();
        alert(data.message);
        getAllPendingUsers();
      }else{
        alert("There was error to verify the user.")
      }
    }
   

    useEffect(() => {
      getAllPendingUsers();
      getNumberOfUsers();
    }, []);

   

    return (
      <>
        <AdminSidebar userData={userData} />

        <div>
          <br />
          <MDBContainer>
            <MDBRow className="g-2">
              <MDBCol size="2"></MDBCol>
              <MDBCol size="10">
                <div className="App">
                  <div className="auth-wrapper" style={{ height: "auto" }}>
                    <div className="auth-inner" style={{ width: 1024 }}>
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
                      {/* <h3>User Approval Status</h3>
                      <Table bordered hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>User Type</th>
                            <th>Status</th>
                            <th>Verify</th>
                            <th>Reject</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((i, index) => {
                            return (
                              <tr key={i}>
                                <td>{index + 1}</td>
                                <td>
                                  {i.fname} {i.lname}
                                </td>
                                <td>{i.email}</td>
                                <td>{i.userType}</td>
                                <td>{i.status}</td>
                                <td>
                                  <FontAwesomeIcon
                                    type="button"
                                    class="btn btn-success common-btn"
                                    icon={faCheck}
                                    onClick={() =>
                                      verifyUser(i._id, i.fname, i.email)
                                    }
                                  />
                                </td>
                                <td>
                                  <FontAwesomeIcon
                                    type="button"
                                    class="btn btn-danger common-btn"
                                    icon={faPersonCircleXmark}
                                    onClick={() => rejectUser(i._id, i.fname)}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>{" "} */}
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

