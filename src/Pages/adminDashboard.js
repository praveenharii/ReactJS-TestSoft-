import React, { Component, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import ViewSubject from './../Exam/viewSubjects';
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function AdminDashboard({ userData }) {
  //const {useData} = userData.userData;
   const navigate = useNavigate();
   const id = userData._id; 
   const [data, setData] = useState([]);
   
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

    function editProfileCLick() {
      navigate(`/dashboard/updateProfile/${id}`, {
        state: {
          id,
          userData: userData,
        },
      });
    }

    function ViewSubject(){
      navigate("../subjects");
    }

    function ViewUsers(){
      navigate("/dashboard/getAllUsers");
    }

    function CreateExam(){
      navigate("/createExam");
    }

    function ViewStudentResults() {
      navigate("/dashboard/viewAllStudentResults");
    }

    const getAllPendingUsers = () => {
      fetch("http://localhost:5000/getAllPendingUsers", {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "allPendingUsers");
          setData(data.data);
        });
    };

    const verifyUser = async (id,name,email) => {
      if(window.confirm(`Please Click Ok if you want to Verify user ${name}`)){
        const res = await fetch("http://localhost:5000/verifyUser", {
        method: "POST",
           crossDomain: true,
           headers: {
             "Content-Type": "application/json",
             Accept: "application/json",
             "Access-Control-Allow-Origin": "*",
           },
           body: JSON.stringify({
             userid: id,
             email: email,
           }),
         })
        const data = await res.json();
        alert(data.message);
        getAllPendingUsers();
      }else{
        alert("There was error to verify the user.")
      }
    }
   

     const rejectUser = (id, name) => {
       if (
         window.confirm(`Please Click Ok if you want to reject this user ${name}. This user details will be deleted`)
       ) {
         fetch("http://localhost:5000/deleteUser", {
           method: "DELETE",
           crossDomain: true,
           headers: {
             "Content-Type": "application/json",
             Accept: "application/json",
             "Access-Control-Allow-Origin": "*",
           },
           body: JSON.stringify({
             userid: id,
           }),
         })
           .then((res) => res.json())
           .then((data) => {
             alert(data.data);
             getAllPendingUsers();
           });
       } else {
       }
     };

    useEffect(() => {
      getAllPendingUsers();
    }, []);

  return (
    <div>
      <div className="auth-wrapper" style={{ height: "auto" }}>
        <div className="auth-inner" style={{ width: "auto" }}>
          <h1>Admin Dashboard</h1>
          <table style={{ width: 500 }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>User Type</th>
                <th>Status</th>
                <th>Verify</th>
                <th>Reject</th>
              </tr>
            </thead>
            {data.map((i) => {
              return (
                <tbody>
                  <tr>
                    <td key={i}>
                      {i.fname} {i.lname}
                    </td>
                    <td>{i.email}</td>
                    <td>{i.userType}</td>
                    <td>{i.status}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faCheck}
                        onClick={() => verifyUser(i._id, i.fname, i.email)}
                      />
                    </td>
                    <td>
                      <FontAwesomeIcon
                        icon={faXmark}
                        onClick={() => rejectUser(i._id, i.fname)}
                      />
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>{" "}
          <br />
          <nav>
            <ul>
              Name<h1>{userData.fname}</h1>
              Last<h1>{userData.lname}</h1>
              Email<h1>{userData.email}</h1>
              UserType<h1>{userData.userType}</h1>
              ID<h1>{userData._id}</h1>
              <button type="button" onClick={editProfileCLick}>
                {" "}
                Edit Profile
              </button>
              <button type="button" onClick={ViewSubject}>
                {" "}
                View Subjects
              </button>
              <button type="button" onClick={ViewUsers}>
                {" "}
                View Users
              </button>
              <button type="button" onClick={CreateExam}>
                {" "}
                Create Exam
              </button>
              <button type="button" onClick={ViewStudentResults}>
                {" "}
                View All student results
              </button>
            </ul>
          </nav>
          <button onClick={logOut} className="btn btn-primary">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
