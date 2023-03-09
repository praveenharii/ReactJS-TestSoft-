import React, { Component }from "react";


export default class Dashboard extends Component {
    constructor(props) {//getting data
        super(props);
        this.state = {
            userData: "",
        };
    }

    componentDidMount(){
        fetch("http://localhost:5000/userData", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                token:window.localStorage.getItem("token")
                
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "userData");
                this.setState({ userData: data.data });//getting data
                /*if( data.data == "token expired") {
                    alert("token expired login again");
                    window.localStorage.clear();
                    window.location.href = "./sign-in";
                }*/
            });
    }
    logOut=()=>{
        window.localStorage.clear();
        window.location.href = "./sign-in";
    }

    

    render() {
        return(
            //getting data displayed on Dashboard
            <div>
                Name<h1>{this.state.userData.fname} {this.state.userData.lname}</h1>
                Email<h1>{this.state.userData.email}</h1> <br/>
                <button class="btn btn-danger" color="pink" onClick={this.logOut}>Log Out</button>
            </div>
        )
    }
}