import React, { Component, useEffect, useState} from "react";
import { Link, useLocation, Navigate } from "react-router-dom";


export default function AdminDashboard({ userData }) {
  //const {useData} = userData.userData;
  const location = useLocation();
  const UserID= userData._id; 
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  function editProfileCLick(){
    Navigate("/testapp1/src/Pages/editProfile");
  }



  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link to="/getAllUsers">View Users</Link>
          </li>
          <li>
            Name<h1>{userData.fname}</h1>
            Last<h1>{userData.lname}</h1>
            Email<h1>{userData.email}</h1>
            UserType<h1>{userData.userType}</h1>
            ID<h1>{userData._id}</h1>
            <button type="button" onClick={editProfileCLick}> Edit Profile</button>
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
