import React, { Component } from "react";

export default class adminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: props.userData,
    };
  }
  logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  render() {
    return (
      //getting data displayed on Dashboard
      <div>
        Name
        <h1>
          {this.state.userData.fname} {this.state.userData.lname}
        </h1>
        Email<h1>{this.state.userData.email}</h1> <br />
        <button class="btn btn-danger" color="pink" onClick={this.logOut}>
          Log Out
        </button>
      </div>
    );
  }
}
