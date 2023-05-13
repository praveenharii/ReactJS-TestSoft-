import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentSideBar from "./Topsidenavbar/Side-N-Topbar-Student";


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
          id: id
        }
      });
    }

    function testResults() {
      //navigate("");
    }




    return (
      <>
        <StudentSideBar userData={userData} />
        <br />
        <div className="auth-wrapper" style={{ height: "auto" }}>
          <div className="auth-inner" style={{ width: "auto" }}>
            <h1>Student Dashboard</h1>
            <div>
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
            </div>
          </div>
        </div>
      </>
    );

    
    
}
