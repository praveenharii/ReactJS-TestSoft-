import React, { Component, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";



export default function AdminDashboard({ userData }) {
  //const {useData} = userData.userData;
  let navigate = useNavigate();
  

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };


  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li>
            <button
              type="button"
              onClick={() => {
                navigate("/dashboard/getAllUsers");
              }}
            >
              View Users
            </button>
          </li>
          <li>
            Name<h1>{userData.fname}</h1>
            Last<h1>{userData.lname}</h1>
            Email<h1>{userData.email}</h1>
            UserType<h1>{userData.userType}</h1>
            ID<h1>{userData._id}</h1>
            <button
              type="button"
              onClick={() => {
                navigate(`/dashboard/updateProfile/${userData._id}`);
              }}
            >
              Update Profile
            </button>

            
            
            <Link
              to={{
                pathname: "/dashboard",
              }}
              className="btn btn-primary"
            >
              Dashboard
            </Link>
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
