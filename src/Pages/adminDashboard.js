import React, { Component, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import ViewSubject from './../Exam/viewSubjects';
import {
  faCheck,
  faPersonCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminSidebar from './Topsidenavbar/Side-N-Topbar.js';
import "./dashboard.css";
import { MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
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
import Footer from "../Components/Footer";


export default function AdminDashboard({ userData }) {
  //const {useData} = userData.userData;
   const navigate = useNavigate();
   const id = userData._id; 
   const [data, setData] = useState([]);
   const [userNum, setUserNum] = useState([]);
   console.log(userData);
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

    function editProfileCLick() {
      navigate(`/dashboard/updateProfile/${id}`, {
        state: {
          id,
          userData: userData,
        },
      });
    }

    function ViewSubject(){
      navigate("../subjects");
    }

    function ViewUsers(){
      navigate("/dashboard/getAllUsers");
    }

    function CreateExam(){
      navigate("/dashboard/createExam");
    }

    function ViewStudentResults() {
      navigate("/dashboard/viewAllStudentResults", {
        state: {
          id,
          userData: userData,
        },
      });
    }

    const getNumberOfUsers = () => {
      fetch("http://localhost:5000/getNumbersOfUsers", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((users) => {
          console.log(users, "allUsers");
          setUserNum(users);
        });
    };

    const getAllPendingUsers = () => {
      fetch("http://localhost:5000/getAllPendingUsers", {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "allPendingUsers");
          setData(data.data);
        });
    };

    const verifyUser = async (id,name,email) => {
      if(window.confirm(`Please Click Ok if you want to Verify user ${name}`)){
        const res = await fetch("http://localhost:5000/verifyUser", {
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
         })
        const data = await res.json();
        alert(data.message);
        getAllPendingUsers();
      }else{
        alert("There was error to verify the user.")
      }
    }
   

     const rejectUser = (id, name) => {
       if (
         window.confirm(`Please Click Ok if you want to reject this user ${name}. This user details will be deleted`)
       ) {
         fetch("http://localhost:5000/deleteUser", {
           method: "DELETE",
           crossDomain: true,
           headers: {
             "Content-Type": "application/json",
             Accept: "application/json",
             "Access-Control-Allow-Origin": "*",
           },
           body: JSON.stringify({
             userid: id,
           }),
         })
           .then((res) => res.json())
           .then((data) => {
             alert(data.data);
             getAllPendingUsers();
           });
       } else {
       }
     };

    useEffect(() => {
      getAllPendingUsers();
      getNumberOfUsers();
    }, []);

  
   

    return (
      <>
        <AdminSidebar userData={userData} />
        {/* <DashTopbar /> */}
        <div>
          <br />
          <MDBContainer>
            <MDBRow className="g-2">
              <MDBCol size="2"></MDBCol>
              <MDBCol size="10">
                <div className="App">
                  <div className="auth-wrapper" style={{ height: "auto" }}>
                    <div className="auth-inner" style={{ width: 1024 }}>
                      <h1 className="lobster">Admin Dashboard</h1>
                      <h2 className="mogra">Hi {userData.fname}</h2>
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
                      <h3>User Approval Status</h3>
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
                      </Table>{" "}
                      <br />
                    </div>
                  </div>
                </div>
                <Footer />
              </MDBCol>
              {/* <MDBCol size="auto" className="me-auto">
                <div className="profileDetails-wrapper">
                  <div className="profileDetails-inner">
                    <MDBCard>
                      <MDBCardBody className="text-center">
                        <MDBCardImage
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                          alt="avatar"
                          className="rounded-circle"
                          style={{ width: "150px" }}
                          fluid
                        />
                        {" "}
                        <p className="text-muted mb-1">{userData.fname}</p>
                        <p className="text-muted mb-4">
                          Bay Area, San Francisco, CA
                        </p>
                        <div className="d-flex justify-content-center mb-2">
                          <MDBBtn>Follow</MDBBtn>
                          <MDBBtn outline className="ms-1">
                            Message
                          </MDBBtn>
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </div>
                </div>
              </MDBCol> */}
              {/* <MDBCol size="4">
                <div className="profileDetails-wrapper">
                  <div className="profileDetails-inner">HI</div>
                </div>
              </MDBCol> */}
            </MDBRow>
          </MDBContainer>
        </div>

        {/* 
        <MDBRow className="g-5">
          <MDBCol sm="5" md="12">
            .col-sm-6 .col-md-8
          </MDBCol>
          <MDBCol size="6" md="4">
            .col-6 .col-md-5
          </MDBCol>
        </MDBRow> */}
      </>
    );
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

