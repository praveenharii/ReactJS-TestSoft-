import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase_config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Loginnavigation from "./Topsidenavbar/loginnavbar.js";
import Form from "react-bootstrap/Form";
import Footer from '../Components/Footer';
import { Container, Card, Button } from "react-bootstrap";

export default function SignUp() {
            const navigate = useNavigate();
            const [fname ,setFname] =  useState("");
            const [lname ,setLname] =  useState("");
            const [email ,setEmail] =  useState("");
            const [phoneNumber ,setPhoneNumber] =  useState("");
            const [password ,setPassword] =  useState("");
             //const [expandForm, setExpandForm] = useState(false);
             const [otp,setOTP] = useState("");
            const [userType, setUserType] = useState("");
            const [secretKey, setSecretKey] = useState("");
            const [verified,setVerified] = useState(false);
      
const generateRecaptcha = () => {
  window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
              console.log(response);
            }
          },        
          auth
        );
}         
    const requestOTP = (e) =>{
      e.preventDefault();
      if (phoneNumber.length >=10 ){
        //setExpandForm(true);
        const phoneNumberWithCountryCode = "+60" + phoneNumber;
        generateRecaptcha();
        let appVerifier =  window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phoneNumberWithCountryCode, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
          })
          .catch((error) => {
            // Error; SMS not sent
            // ...
             console.log(error);
             alert(error);
          });
          }
        } 

    const verifyOTP = (otp) => {
       if (otp.length === 6) {
         window.confirmationResult
           .confirm(otp)
           .then((result) => {
             console.log(result);
             alert("verified Successfully");
             setVerified(true);
           })
           .catch((error) => {
             console.log(error);
           });
       }
    }       
  

    const handleSubmit = (e) => {
      
       if (userType === "Tutor" && secretKey !== "Secret") {
            e.preventDefault();
            alert("Invalid Tutor");
          }
          else{
            e.preventDefault();
          
             if (verified !== false){ 
        
            
            console.log(fname, lname, email, password,phoneNumber, userType);
            fetch("http://localhost:5000/register", {
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
                    phoneNumber,
                    password,
                    userType,     
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                  if(data.error !== "User Exists"){
                    console.log(data, "userRegister");
                    alert("User Created Successfully");
                    setTimeout(() => {
                      navigate("/sign-in"); // Navigate to login page
                    }, 10);
                    }else{
                    alert(data.error);
                  }

                });
              }else{
            alert("Please Verify Phone Number");
              }
      } 
    };

         return (
           <>
             <Loginnavigation />
             <div />
             <div />
             <div className="auth-wrapper" style={{ paddingTop: "100px" }}>
               <div className="auth-inner">
                 <form onSubmit={handleSubmit}>
                   <h3>Sign Up</h3>
                   <div id="recaptcha-container"></div>

                   <div className="mb-3">
                     <label>Register As:</label>
                     <br />
                     <Form.Select
                       className="form-control"
                       size="sm"
                       onChange={(e) => setUserType(e.target.value)}
                       required
                     >
                       <option value="" disabled selected>
                         Select User Type
                       </option>
                       <option value="Student">Student</option>
                       <option value="Tutor">Tutor</option>
                       {/* <option value="Admin">Admin</option> */}
                     </Form.Select>
                     <br />
                   </div>

                   {userType === "Tutor" ? (
                     <div className="mb-3">
                       <label>Secret Key</label>
                       <input
                         type="text"
                         className="form-control"
                         placeholder="Secret Key"
                         onChange={(e) => setSecretKey(e.target.value)}
                       />
                     </div>
                   ) : null}

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
                     <label>Phone Number(01xxxxxxxx)</label>
                     <input
                       type="phoneNumber"
                       className="form-control"
                       placeholder="Enter Phone Number"
                       onChange={(e) => setPhoneNumber(e.target.value)}
                     />
                     <input
                       type="button"
                       value={"Request OTP"}
                       onClick={requestOTP}
                       style={{
                         backgroundColor: "#0163d2",
                         width: "100%",
                         padding: 8,
                         color: "white",
                         border: "none",
                       }}
                     />
                   </div>
                   <div className="mb-3">
                     <label>OTP</label>
                     <input
                       type="number"
                       className="form-control"
                       placeholder="OTP"
                       onChange={(e) => setOTP(e.target.value)}
                     />
                     <input
                       type="button"
                       value="Verify"
                       onClick={() => verifyOTP(otp)}
                       style={{
                         backgroundColor: "#0163d2",
                         width: "100%",
                         padding: 8,
                         color: "white",
                         border: "none",
                       }}
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
                       Request Sign Up
                     </button>
                   </div>
                   <p className="forgot-password text-right">
                     Already registered <a href="/sign-in">sign in?</a>
                   </p>
                 </form>
               </div>
             </div>
             <Footer />
           </>
         );     
  };

        

       



   
       
    
