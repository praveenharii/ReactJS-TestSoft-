import React, { Component }from "react";
import adminDashboard from './adminDashboard';
import studentDashboard from "./studentDashboard";


export default class Dashboard extends Component {
                 constructor(props) {
                   //getting data
                   super(props);
                   this.state = {
                       admin: false,
                       userData: ""
                   };
                 }

                 componentDidMount() {
                   fetch("http://localhost:5000/userData", {
                     method: "POST",
                     crossDomain: true,
                     headers: {
                       "Content-Type": "application/json",
                       Accept: "application/json",
                       "Access-Control-Allow-Origin": "*",
                     },
                     body: JSON.stringify({
                       token: window.localStorage.getItem("token"),
                     }),
                   })
                     .then((res) => res.json())
                     .then((data) => {
                       console.log(data, "userData");
                       if (data.data.userData == "Admin") {
                         this.setState({
                           admin: true,
                         });
                       }

                       this.setState({ userData: data.data }); //getting data
                       /*if( data.data == "token expired") {
                    alert("token expired login again");
                    window.localStorage.clear();
                    window.location.href = "./sign-in";
                }*/
                     });
                 }
                 logOut = () => {
                   window.localStorage.clear();
                   window.location.href = "./sign-in";
                 };

                 //     render() {

                 //        if(this.state.admin){
                 //         return this.adminDashboard(this.state.userData);
                 //        }
                 //        else{
                 //         return this.studentDashboard(this.state.userData);
                 //        }

                 // }
                 render() {
                   const { admin, userData } = this.state;
                  
                   if (admin) {
                     return <adminDashboard />;
                   } else {
                     return <studentDashboard userData={userData} />;
                   }
                 }
               }


              