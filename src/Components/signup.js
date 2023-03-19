import React, { useState } from 'react';
// import { authentication } from "./firebase_config";
// // const firebase = require("./firebase_config");
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import userEvent from '@testing-library/user-event';





//const countryCode = "+60";
export default function SignUp() {
            const [fname ,setFname] =  useState("");
            const [lname ,setLname] =  useState("");
            const [email ,setEmail] =  useState("");
            //const [phoneNumber ,setPhoneNumber] =  useState("");
            const [password ,setPassword] =  useState("");
            // const [expandForm, setExpandForm] = useState(false);
            // const [OTP,setOTP] = useState("");
            const [userType, setUserType] = useState("");
            const [secretKey, setSecretKey] = useState("");
      
// const generateRecaptcha = () => {
//   window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
//             'size': 'invisible',
//             'callback': (response) => {
//               // reCAPTCHA solved, allow signInWithPhoneNumber.
//             }
//           },
//           authentication
//         );
// }
           
//     const requestOTP = (e) =>{
//       e.preventDefault();
//       if (phoneNumber.length >=10 ){
//         setExpandForm(true);
//         generateRecaptcha();
//         let appVerifier =  window.recaptchaVerifier;
//         signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
//         .then(confirmationResult => {
//           window.confirmationResult = confirmationResult
//         }).catch((error) => {
//           // Error; SMS not sent
//           // ...
//         // console.log(error);
//         });
//           }
//         } 
//     const verifyOTP = (e) => {
//         let otp =  e.target.value;
//         setOTP(otp);

//         if(otp.length === 6){
//           console.log(otp);
//         }
//     }       
  

    const handleSubmit = (e) => {
       if (userType == "Admin" && secretKey != "Secret") {
            e.preventDefault();
            alert("Invalid Admin");
          }
          else{
            e.preventDefault();
          
          //  if (){ 
        
            
            console.log(fname, lname, email, password, userType);
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
                    password,
                    userType,     
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                  if(data.error != "User Exists"){
                    console.log(data, "userRegister");
                    alert("User Created Successfully");
                    }else{
                    alert(data.error);
                  }

                });
            //  }else{
           // alert("Please Verify Phone Number");
      } 
    };

         return (
           <div className="auth-wrapper">
             <div className="auth-inner">
               <form onSubmit={handleSubmit}>
                 <h3>Sign Up</h3>
                 <div id="recaptcha-container"></div>

                 <div>
                   Register As
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

                 {userType == "Admin" ? (
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
                   />
                 </div>

                 <div className="mb-3">
                   <label>Last name</label>
                   <input
                     type="text"
                     className="form-control"
                     placeholder="Last name"
                     onChange={(e) => setLname(e.target.value)}
                   />
                 </div>

                 <div className="mb-3">
                   <label>Email address</label>
                   <input
                     type="email"
                     className="form-control"
                     placeholder="Enter email"
                     onChange={(e) => setEmail(e.target.value)}
                   />
                 </div>

                 {/* <div className="mb-3">
              <label>Phone Number(01x-xxxxxxx)</label>
              <input
                type="phoneNumber"
                className="form-control"
                placeholder="Enter Phone Number"
                
                onChange={(e) => setPhoneNumber(e.target.value)}
                
             
              />
              {expandForm === false? ( 
                <input
                  type="button"
                  
                  onClick={requestOTP}
                  style={{
                    backgroundColor: "#0163d2",
                    width: "100%",
                    padding: 8,
                    color: "white",
                    border: "none",
                  }}
                  value={OTP}
                  
                />
             ):null }
            </div> 

             {expandForm === true?(
              <div className="mb-3">
                <label>OTP</label>
                <input
                  type="number"
                  value="OTP"
                  className="form-control"
                  placeholder="OTP" 
                  onChange={verifyOTP}
                 // value={}
                  //onChange={(e) => setVerificationCode(e.target.value)}
                />
                <input
                  type="button"
                  value="OTP"
                  //onClick={}
                  style={{
                    backgroundColor: "#0163d2",
                    width: "100%",
                    padding: 8,
                    color: "white",
                    border: "none",
                  }}
                 
                />
              </div>
            ): null } */}

                 <div className="mb-3">
                   <label>Password</label>
                   <input
                     type="password"
                     className="form-control"
                     placeholder="Enter password"
                     onChange={(e) => setPassword(e.target.value)}
                   />
                 </div>

                 <div className="d-grid">
                   <button type="submit" className="btn btn-primary">
                     Sign Up
                   </button>
                 </div>
                 <p className="forgot-password text-right">
                   Already registered <a href="/sign-in">sign in?</a>
                 </p>
               </form>
             </div>
           </div>
         );     
  }

        

       



   
       
    
