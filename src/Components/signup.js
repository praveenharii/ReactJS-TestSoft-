import React, { Component } from 'react';
import app from "./firebase_config";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


const auth = getAuth(app);
export default class SignUp extends Component  {
    constructor(props) {
        super(props);
        this.state={
            fname: "",
            lname: "",
            email: "",
            phoneNumber: "",
            password: "",
            verifyButton: false,
            verifyOTP: false,
            otp: "",
            verified: false,
            userType: "",
            secretKey: "",    
        };
        this.handleSubmit=this.handleSubmit.bind(this); //binding function
        this.onSignInSubmit=this.onSignInSubmit.bind(this);
        this.verifyCode=this.verifyCode.bind(this);

    }

          
           
            
    onCaptchaVerify(){
       
        window.recaptchaVerifier = new RecaptchaVerifier(
            'recaptcha-container' ,
        {
        'size': 'invisible',
         'callback': (response) => {
            this.onSignInSubmit();
         // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
         },
        
        }, auth
        );
    }

    onSignInSubmit(){
        this.onCaptchaVerify();
        const phoneNumber = "+60" + this.state.phoneNumber;
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                alert("OTP sended");
                this.setState({ verifyOTP: true });
                // ...
            }).catch((error) => {
                // Error; SMS not sent
                // ...
            });
    }

    verifyCode(){
        window.confirmationResult.confirm(this.state.otp).then((result) => {
            // User signed in successfully.
            const user = result.user;
            console.log(user);
            alert("Verification Done");
            this.setState({
                verified: true,
                verifyOTP: false,
            })
            // ...
        }).catch((error) => {
            alert("Invalid OTP");
            // User couldn't sign in (bad verification code?)
            // ...
        });
    }

    changeMobile(e) {
        this.setState({ phoneNumber: e.target.value },function(){
            if(this.state.phoneNumber.length===10){
                this.setState({
                    verifyButton: true,
                });
            }

        });
        
    }

    handleSubmit(e){
        if(this.state.userType == "Admin" && this.state.secretKey != "secret"){
            e.preventDefault();
            alert("Invalid Admin");
        } else{
            e.preventDefault();
            
            if (this.state.verified){
            const { fname, lname, email, phoneNumber, password, userType } = this.state;
            console.log(fname, lname, email, phoneNumber, password, userType);
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
                  if(data.error != "User Exists"){
                    console.log(data, "userRegister");
                    alert("User Created Successfully");
                    }else{
                    alert(data.error);
                  }

                });
        }else{
            alert("Please Verify Phone Number");
        }      
    }
        }

       



    render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <h3>Sign Up</h3>
            <div id="recaptcha-container"></div>

            <div>
              Register As
              <input
                type="radio"
                name="UserType"
                value="User"
                onChange={(e) => this.setState({ userType: e.target.value })}
              />{" "}
              User
              <input
                type="radio"
                name="UserType"
                value="Admin"
                onChange={(e) => this.setState({ userType: e.target.value })}
              />{" "}
              Admin
            </div>

            {this.state.userType == "Admin" ? (
              <div className="mb-3">
                <label>Secret Key</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Secret Key"
                  onChange={(e) => this.setState({ secretKey: e.target.value })}
                />
              </div>
            ) : null}

            <div className="mb-3">
              <label>First name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                onChange={(e) => this.setState({ fname: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label>Last name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                onChange={(e) => this.setState({ lname: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label>Phone Number(01x-xxxxxxx)</label>
              <input
                type="phoneNumber"
                className="form-control"
                placeholder="Enter Phone Number"
                onChange={(e) => this.changeMobile(e)}
              />
              {this.state.verifyButton ? (
                <input
                  type="button"
                  value={this.state.verified ? "Verified" : "Verify"}
                  onClick={this.onSignInSubmit}
                  style={{
                    backgroundColor: "#0163d2",
                    width: "100%",
                    padding: 8,
                    color: "white",
                    border: "none",
                  }}
                />
              ) : null}
            </div>

            {this.state.verifyOTP ? (
              <div className="mb-3">
                <label>OTP</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="OTP"
                  onChange={(e) => this.setState({ otp: e.target.value })}
                />
                <input
                  type="button"
                  value="OTP"
                  onClick={this.verifyCode}
                  style={{
                    backgroundColor: "#0163d2",
                    width: "100%",
                    padding: 8,
                    color: "white",
                    border: "none",
                  }}
                />
              </div>
            ) : null}

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) =>  this.setState({ password: e.target.value })}
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
        );
    }
}