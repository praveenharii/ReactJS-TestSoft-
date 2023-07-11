import React, {  useState  } from 'react'
import Loginnavigation from './Topsidenavbar/loginnavbar.js';
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../Components/SignUpSpinner";
import "react-toastify/dist/ReactToastify.css";
import '../App.css'


export default function Login()  {
        const [email ,setEmail] =  useState("");
        const [password ,setPassword] =  useState("");
        const [alert, setAlert] = useState(null);
        const [successLogin, setSuccessLogin] = useState(null);
   //console.log(process.env.REACT_APP_BASE_URL);
   function handleSubmit(e){
    e.preventDefault();
    
    //console.log( email, password);
     const loadingToastId = toast.info(<Spinner />, {
       autoClose: false,
     });
    
    fetch(`${process.env.REACT_APP_BASE_URL}/login-user`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        try {
          if (data.status === "ok") {
            toast("Successfully Logged In", {
              type: "success",
              autoClose: 5000,
            });
            setSuccessLogin("Login Successfully");
            window.localStorage.setItem(
              "token",
              data.data
            ); /*storing token in nodejs(localStorage)*/
            window.localStorage.setItem("loggedIn", true);

            toast.dismiss(loadingToastId);
            setTimeout(() => {
              window.location.href = "./dashboard";
            }, 5000);
          }
          if (
            data.error ===
            "You are not verified yet. Please wait for the admin to accept your sign-up request!"
          ) {
            toast.error(
              "You are not a verified, please wait for admin to accept your Sign Up request!"
            );       
            setTimeout(() => {
              toast.dismiss(loadingToastId);
            }, 1000);
          }
           
          if (data.error === "User does not exist") {
            toast.error("User does not Exist", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setTimeout(() => {
              toast.dismiss(loadingToastId);
            }, 1000);
             
          }
          if (data.status === "error") {
             toast.error("Wrong Password, please try again!", {
               position: "top-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "light",
             });
              setTimeout(() => {
                toast.dismiss(loadingToastId);
              }, 1000);
          }
          if (
            data.error ===
            "You are already logged in from another tab or browser."
          ) {
            setAlert("You are already logged in from another tab or browser.");
              setTimeout(() => {
                toast.dismiss(loadingToastId);
              }, 1000);
          } else {
            //alert(data.error);
          }
        } catch (error) {
          setAlert(error);
          setTimeout(() => {
            toast.dismiss(loadingToastId);
          }, 1000);
        }
      });
}


    
        return (
          <>
            <Loginnavigation />
            <div className="signup-container">
              <ToastContainer />
              <div className="signup-card">
                <h2 className="signup-title">Sign In now</h2>
                <form className="signup-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="EmailAddress">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Enter password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  {/* <div className="form-group form-check">
                    <input
                      type="checkbox"
                      id="newsletter"
                      className="form-check-input"
                    />
                    <label htmlFor="newsletter" className="form-check-label">
                      Remember Me
                    </label>
                  </div> */}
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign In
                  </button>
                  {alert && (
                    <div className="d-grid">
                      <button type="alert" className="alert alert-danger mt-3">
                        {alert}
                      </button>
                    </div>
                  )}
                  {successLogin && (
                    <div className="d-grid">
                      <button type="alert" className="alert alert-success mt-3">
                        {successLogin}
                      </button>
                    </div>
                  )}
                  <p className="forgot-password text-right">
                    Click here if <a href="/forgot-password">Forgot Password</a>
                  </p>
                  <p className="forgot-password text-right">
                    Click here to <a href="/sign-up">Sign Up</a>
                  </p>
                </form>
              </div>
            </div>
          </>
        );
    }
