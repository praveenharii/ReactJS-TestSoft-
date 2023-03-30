import React, { Component, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import ViewSubject from './../Exam/viewSubjects';


export default function AdminDashboard({ userData }) {
  //const {useData} = userData.userData;
   const navigate = useNavigate();
   const id = userData._id; 
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

    function editProfileCLick() {
      navigate(`/dashboard/updateProfile/${id}`, {
        state: {
          id,
        },
      });
    }

    function ViewSubject(){
      navigate("../subjects");
    }


  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard/getAllUsers">View Users</Link>
          </li>
          <li>
            Name<h1>{userData.fname}</h1>
            Last<h1>{userData.lname}</h1>
            Email<h1>{userData.email}</h1>
            UserType<h1>{userData.userType}</h1>
            ID<h1>{userData._id}</h1>
            <button type="button" onClick={editProfileCLick}>
              {" "}
              Edit Profile
            </button>
            <button type="button" onClick={ViewSubject}>
              {" "}
              View Subjects
            </button>
            
            {/* <Link
              to={{
                pathname: "/updateProfile",
                state:   { _id:userData._id },
              }}
              className="btn btn-primary"
            >
              Update Profile
            </Link> */}
          </li>
          <span>Hi</span>
        </ul>
      </nav>
      <button onClick={logOut} className="btn btn-primary">
        Log Out
      </button>
    </div>
  );
}
