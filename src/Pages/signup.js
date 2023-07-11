import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase_config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Loginnavigation from "./Topsidenavbar/loginnavbar.js";
import Form from "react-bootstrap/Form";
import "../App.css";
import Spinner from '../Components/SignUpSpinner'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function SignUp() {
            const navigate = useNavigate();
            const [fname ,setFname] =  useState("");
            const [lname ,setLname] =  useState("");
            const [email ,setEmail] =  useState("");
            const [phoneNumber ,setPhoneNumber] =  useState("");
            const [password ,setPassword] =  useState("");           
             const [otp,setOTP] = useState("");
            const [userType, setUserType] = useState("");
            const [secretKey, setSecretKey] = useState("");
            const [verified,setVerified] = useState(false);
            const [showOTP, setShowOTP] = useState(false);

      
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
            setShowOTP(true);
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
             toast.success("Verified Successfully");
             setVerified(true);
           })
           .catch((error) => {
            toast.error("Invalid OTP");
             console.log(error);
           });
       }else{
        toast.error("Invalid OTP");
       }
    }       
  
    const handleSubmit = (e) => {
      e.preventDefault();

      // Password validation regular expression
      const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

      if (!regularExpression.test(password)) {
        toast.warning(
          "Password should have at least one digit, one special character, and be 6-16 characters long.",
          {
            position: toast.POSITION.BOTTOM_CENTER,
          }
        );
        return;
      }

      if (userType === "Tutor" && secretKey !== "Secret") {
         toast.warning("Invalid Tutor", {
           position: toast.POSITION.BOTTOM_CENTER,
         });
        return;
      }

      if (verified === false) {
        toast.warning("Please Verify Phone Number", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        return;
      }

      const loadingToastId = toast.info(<Spinner />, {
        autoClose: false,
      });

      fetch(`${process.env.REACT_APP_BASE_URL}/register`, {
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
          if (data.error !== "User Exists") {
            console.log(data, "userRegister");
            toast.success("Sign up successful");
            setTimeout(() => {
              toast.dismiss(loadingToastId);
              navigate("/sign-in"); // Navigate to login page
            }, 5000);
          } else {
            toast.error(data.error);
             setTimeout(() => {
               toast.dismiss(loadingToastId);
             }, 1000);
          }
        });
    };

         return (
           <>
             <Loginnavigation />
             <section className="text-center">
               <ToastContainer />
               <div
                 className="p-5 bg-image"
                 style={{
                   backgroundImage:
                     "url('https://mdbootstrap.com/img/new/textures/full/171.jpg')",
                   height: "300px",
                 }}
               ></div>
               <div
                 className="card mx-4 mx-md-5 shadow-5-strong"
                 style={{
                   marginTop: "-100px",
                   background: "hsla(0, 0%, 100%, 0.8)",
                   backdropFilter: "blur(30px)",
                 }}
               >
                 <div className="card-body py-5 px-md-5">
                   <div className="row d-flex justify-content-center">
                     <div className="col-lg-8">
                       <h2 className="fw-bold mb-5">Sign up now</h2>
                       <form onSubmit={handleSubmit}>
                         <div id="recaptcha-container"></div>
                         <div className="form-outline mb-4">
                           <div className="form-outline mb-4">
                             <Form.Select
                               className="form-control border border-dark text-center"
                               size="sm"
                               onChange={(e) => setUserType(e.target.value)}
                               required
                             >
                               <option value="" disabled selected>
                                 Select User Type
                               </option>
                               <option value="Student">Student</option>
                               <option value="Tutor">Tutor</option>
                             </Form.Select>
                             <label className="form-label visually-hidden">
                               User Type
                             </label>
                           </div>
                         </div>
                         <div className="row">
                           <div className="col-md-6 mb-4">
                             <div className="form-outline">
                               <label
                                 className="form-label"
                                 htmlFor="form3Example1"
                               >
                                 First name
                               </label>
                               <input
                                 type="text"
                                 id="form3Example1"
                                 className="form-control border border-dark"
                                 onChange={(e) => setFname(e.target.value)}
                                 required
                               />
                             </div>
                           </div>
                           <div className="col-md-6 mb-4">
                             <div className="form-outline">
                               <label
                                 className="form-label"
                                 htmlFor="form3Example2"
                               >
                                 Last name
                               </label>
                               <input
                                 type="text"
                                 id="form3Example2"
                                 className="form-control border border-dark"
                                 onChange={(e) => setLname(e.target.value)}
                                 required
                               />
                             </div>
                           </div>
                         </div>

                         {userType === "Tutor" ? (
                           <div className="form-outline mb-4">
                             <label
                               className="form-label"
                               htmlFor="form3Example3"
                             >
                               Secret Key
                             </label>
                             <input
                               type="text"
                               className="form-control border border-dark"
                               placeholder="Secret Key"
                               onChange={(e) => setSecretKey(e.target.value)}
                             />
                           </div>
                         ) : null}

                         <div className="form-outline mb-4">
                           <label
                             className="form-label"
                             htmlFor="form3Example3"
                           >
                             Email address
                           </label>
                           <input
                             type="email"
                             id="form3Example3"
                             className="form-control border border-dark"
                             onChange={(e) => setEmail(e.target.value)}
                             required
                           />
                         </div>

                         <div className="form-outline mb-4">
                           <label
                             className="form-label"
                             htmlFor="form3Example4"
                           >
                             Phone Number
                           </label>
                           <input
                             type="phoneNumber"
                             id="form3Example4"
                             className="form-control border border-dark"
                             onChange={(e) => setPhoneNumber(e.target.value)}
                             required
                           />
                           <button
                             type="button"
                             value={"Request OTP"}
                             onClick={requestOTP}
                             className="btn btn-primary btn-block mb-4"
                           >
                             Request OTP
                           </button>
                         </div>
                         {showOTP && (
                           <div className="form-outline mb-4">
                             <label
                               className="form-label"
                               htmlFor="form3Example4"
                             >
                               OTP
                             </label>
                             <input
                               type="OTP"
                               id="form3Example4"
                               className="form-control border border-dark"
                               onChange={(e) => setOTP(e.target.value)}
                               required
                             />
                             <button
                               type="button"
                               value="Verify"
                               onClick={() => verifyOTP(otp)}
                               className="btn btn-primary btn-block mb-4"
                             >
                               Verify OTP
                             </button>
                           </div>
                         )}
                         <div className="form-outline mb-4">
                           <label
                             className="form-label"
                             htmlFor="form3Example4"
                           >
                             Password
                           </label>
                           <input
                             type="password"
                             id="form3Example4"
                             className="form-control border border-dark"
                             onChange={(e) => setPassword(e.target.value)}
                             required
                           />
                         </div>

                         <button
                           type="submit"
                           className="btn btn-primary btn-block mb-4"
                         >
                           Sign up
                         </button>
                       </form>

                       <p className="forgot-password text-right">
                         Already registered <a href="/sign-in">sign in?</a>{" "}
                       </p>
                     </div>
                   </div>
                 </div>
               </div>
             </section>
           </>
         );     
  };

        

       



   
       
    
