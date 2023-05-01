import React, { useEffect, useState }from "react";
import { useNavigate } from "react-router-dom";
// import AdminDashboard from './adminDashboard';
// import StudentDashboard from "./studentDashboard";
// import TutorDashboard from "./tutorDashboard";
const AdminDashboard = React.lazy(() => import("./adminDashboard"));
const TutorDashboard = React.lazy(() => import("./tutorDashboard"));
const StudentDashboard = React.lazy(() => import("./studentDashboard"));




export default function Dashboard() {
               const [userData, setUserData] = useState({});
               const [adminDashboard, setAdminDashboard] = useState(false);
               const [tutorDashboard, setTutorDashboard] =useState(false);
               const [studentDashboard, setStudentDashboard] =useState(false);
               const navigate = useNavigate();
               const token = localStorage.getItem("token"); 
        

                 useEffect(() => {
                    const updatedProfileData = JSON.parse(
                      localStorage.getItem("updatedProfileData")
                    );
                   if(updatedProfileData){
                     setUserData(updatedProfileData);
                     localStorage.removeItem("updatedProfileData");
                   } else {     
                   fetch("http://localhost:5000/userData", {
                     method: "POST",
                     crossDomain: true,
                     headers: {
                       "Content-Type": "application/json",
                       Accept: "application/json",
                       "Access-Control-Allow-Origin": "*",
                       Authorization: `Bearer ${token}`,
                     },
                     body: JSON.stringify({
                       token: window.localStorage.getItem("token"),
                     }),
                   })
                     .then((res) => res.json())
                     .then((data) => {
                       console.log(data, "userData");

                       setUserData(data.data);

                       if (data.data.userType === "Admin") {
                         setAdminDashboard(true);
                       }
                       if (data.data.userType === "Tutor") {
                         setTutorDashboard(true);
                       }
                       if (data.data.userType === "Student") {
                         setStudentDashboard(true);
                       }

                     
                       if( data.data == "token expired") {
                    alert("Token Expired!!Login again..");
                    window.localStorage.clear();
                    window.location.href = "./sign-in";
                      }
                      
                     });
                   
                  }
                 }, [navigate]);
                 
                
                return adminDashboard ? (
                  <AdminDashboard userData={userData} />
                ) : (
                  tutorDashboard ? (
                   <TutorDashboard userData={userData} />
                ) : (
                   <StudentDashboard userData={userData} />
                )

              );
}


              