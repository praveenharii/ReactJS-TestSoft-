import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

export default function tutorDashboard({userData}){
  const navigate = useNavigate();
   const id = userData._id;
 const logOut = () =>{
      window.localStorage.clear();
      window.location.href = "./sign-in";
 }

 function editProfileCLick() {
   navigate(`/dashboard/updateProfile/${id}`, {
     state: {
       userData: userData,
     },
   });
 }

  function ViewSubject() {
    navigate("../subjects");
  }

 function CreateExam() {
   navigate("/createExam");
 }



    
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <div>
            Name<h1>{userData.fname}</h1>
            Email <h1>{userData.email}</h1>
            <br />
            <button type="button" onClick={editProfileCLick}>
              {" "}
              Edit Profile
            </button>
            <button type="button" onClick={ViewSubject}>
              {" "}
              View Subjects
            </button>
            <button type="button" onClick={CreateExam}>
              {" "}
              Create Exam
            </button>
            <button onClick={logOut} className="btn btn-primary">
              Log Out
            </button>
          </div>
        </div>
      </div>
    );
      //getting data displayed on Dashboard
 
}
