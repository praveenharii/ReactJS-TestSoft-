import React, { useEffect, useState }from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../Components/LoaderSpinner"
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
               const [loading, setLoading] = useState(true); 

                 useEffect(() => {
                    const updatedProfileData = JSON.parse(
                      localStorage.getItem("updatedProfileData")
                    );
                   if(updatedProfileData){
                     setUserData(updatedProfileData);
                     localStorage.removeItem("updatedProfileData");
                   } else {     
                   fetch(`${process.env.REACT_APP_BASE_URL}/userData`, {
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

                       setLoading(false);

                       if (data.data == "token expired") {
                         alert("Token Expired!!Login again..");
                         window.localStorage.clear();
                         window.location.href = "./sign-in";
                       }
                     });
                   
                  }
                 }, [navigate]);
                 
                 if (loading) {
                   return <Spinner />;
                 }

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


              