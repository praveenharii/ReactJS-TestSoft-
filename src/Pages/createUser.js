import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { authentication } from "./firebase_config";
// // const firebase = require("./firebase_config");
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import userEvent from '@testing-library/user-event';
import Loginnavigation from "./Topnavbar/loginnavbar.js";

//const countryCode = "+60";
export default function CreateUser() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [OTP,setOTP] = useState("");
  const [userType, setUserType] = useState("");
  let navigate = useNavigate();
  



 

  const handleSubmit = (e) => {
    
      e.preventDefault();
    

      console.log(fname, lname, email, password, userType);
      fetch("http://localhost:5000/createUser", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          fname,
          lname,
          email,
          password,
          userType,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error !== "User Exists") {
            console.log(data, "userRegister");
            alert("User Created Successfully");
          } else {
            alert(data.error);
          }
        });
      
  };

  return (
    <>
      <Loginnavigation />
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <button
              type="button"
              onClick={() => {
                navigate("/dashboard/getAllUsers");
              }}
            >
              View Users
            </button>
            <h3>Create User</h3>
            <div id="recaptcha-container"></div>

            <div>
              Create user As
              <input
                type="radio"
                name="UserType"
                value="Student"
                onChange={(e) => setUserType(e.target.value)}
                required
              />{" "}
              Student
              <input
                type="radio"
                name="UserType"
                value="Tutor"
                onChange={(e) => setUserType(e.target.value)}
                required
              />{" "}
              Tutor
              <input
                type="radio"
                name="UserType"
                value="Admin"
                onChange={(e) => setUserType(e.target.value)}
                required
              />{" "}
              Admin
            </div>

            <div className="mb-3">
              <label>First name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                onChange={(e) => setFname(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label>Last name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                onChange={(e) => setLname(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
