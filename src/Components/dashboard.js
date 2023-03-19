import React, { Component, useEffect, useState }from "react";
import AdminDashboard from './adminDashboard';
import StudentDashboard from "./studentDashboard";
import tutorDashboard from "./tutorDashboard";



export default function Dashboard() {
               const [userData, setDashboard] = useState("");
               const [adminDashboard, setAdminDashboard] = useState(false);
               const [tutorDashboard, setTutorDashboard] =useState(false);
               const [studentDashboard, setStudentDashboard] =useState(false);   
              

                 useEffect(() => {
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
                       setDashboard(data.data);
                       if (data.data.userType == "Admin") {
                           setAdminDashboard(true);
                           
                       }
                      //  if (data.data.userType == "Tutor") {
                      //    setTutorDashboard(true);
                      //  }
                       if (data.data.userType == "Student") {
                         setStudentDashboard(true);
                       }
                        

                      //  setDashboard(data.data);; //getting data
                       /*if( data.data == "token expired") {
                    alert("token expired login again");
                    window.localStorage.clear();
                    window.location.href = "./sign-in";
                }*/

              
          });
                 }, []);
                 
                
                return adminDashboard? <AdminDashboard /> : <StudentDashboard userData={userData} />;
              
               }


              