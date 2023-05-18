import React, { Component, useState, Link } from 'react'
import Loginnavigation from './Topsidenavbar/loginnavbar.js';
import Footer from '../Components/Footer.js';


export default function Login()  {
    
        const [email ,setEmail] =  useState("");
        const [password ,setPassword] =  useState("");
    

   function handleSubmit(e){ /*submit function*/
    e.preventDefault();
    
    console.log( email, password);
    
    fetch("http://localhost:5000/login-user", { /* sending login-user API*/
        method: "POST",
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ /*passing email and password*/
            email,
            password,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "userRegister");
            //alert(data.error);
            try {
               if (data.status === "ok") {
                 alert("Login Successfully");
                 
                 window.localStorage.setItem(
                   "token",
                   data.data
                 ); /*storing token in nodejs(localStorage)*/
                 window.localStorage.setItem("loggedIn", true); // to allow user logged in when open another window

                 window.location.href = "./dashboard";
               }
               if (data.error === "User not exists") {
                 alert("User Not Exist");
               }
               if (data.status === "error") {
                 alert("Wrong Password, please try again..");
               }
               if (data.error === "You are not a verified, please wait for admin to accept your Sign Up request!!!"){
                alert("You are not a verified, please wait for admin to accept your Sign Up request!!!");
               }
            } 
            catch (error) {
              alert(data.error);
            }
            // else{
            //   alert(data.error)
            // }
        });
}


    
        return (
          <>
            <Loginnavigation />       
            <div className="auth-wrapper">
              <div className="auth-inner">
                <form onSubmit={handleSubmit}>
                  <h3>Sign In</h3>

                  <div className="mb-3">
                    <label>Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div class="mb-3 form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="exampleCheck1"
                    />
                    <label class="form-check-label" for="exampleCheck1">
                      Remember Me
                    </label>
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                  <p className="forgot-password text-right">
                    Forgot <a href="/forgot-password">password?</a>
                  </p>
                  <p className="forgot-password text-right">
                    Click here to <a href="/sign-up">Sign Up</a>
                  </p>
                </form>
              </div>
            </div>
            <Footer />
          </>
        );
    }
