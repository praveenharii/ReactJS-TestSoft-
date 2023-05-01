import React, { Component } from 'react'

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this); //binding function
    }

    handleSubmit(e) { /*submit function*/
        e.preventDefault();
        const { email } = this.state;
        console.log(email);
        
        /* sending login-user API*/
        fetch("http://localhost:5000/forgot-password", { 
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ /*passing email*/
                email,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "userRegister");
                alert(data.status);
                
                
            });
    }

    render() {
        return (
          <>
            <br />
            <div className="auth-inner">
              <form onSubmit={this.handleSubmit}>
                <h3>Forgot Password</h3>

                <div className="mb-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
                <p className="forgot-password text-right">
                  <a href="/sign-up">Click here to Sign Up</a>
                </p>
              </form>
            </div>
          </>
        );
    }
}