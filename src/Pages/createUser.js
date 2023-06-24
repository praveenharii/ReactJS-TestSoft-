import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopDashbar from "./Topsidenavbar/dash-basicTop-bar-Tutor-admin-Routes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function CreateUser() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  let navigate = useNavigate();
  
  const handleSubmit = (e) => {
    
      e.preventDefault();
    

      console.log(fname, lname, email, password, userType);
      fetch(`${process.env.REACT_APP_BASE_URL}/createUser`, {
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
            toast("User Created Successfully", {
              type: "success",
              autoClose: 5000,
            });
             setTimeout(() => {
              navigate('/dashboard');
             }, 5000);
          } else {
            alert(data.error);
          }
        });
      
  };

  return (
    <>
      <TopDashbar />
      {/* <AdminSidebar userData={userData} /> */}
      <ToastContainer />
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <h3>Create User</h3>
            <div id="recaptcha-container"></div>

            <div>
              Create user As:
              <br />
              <input
                type="radio"
                name="UserType"
                value="Student"
                onChange={(e) => setUserType(e.target.value)}
                required
              />{" "}
              Student{" "}
              <input
                type="radio"
                name="UserType"
                value="Tutor"
                onChange={(e) => setUserType(e.target.value)}
                required
              />{" "}
              Tutor{" "}
              <input
                type="radio"
                name="UserType"
                value="Admin"
                onChange={(e) => setUserType(e.target.value)}
                required
              />{" "}
              Admin{" "}
            </div>

            <br />

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
