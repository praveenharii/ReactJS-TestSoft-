import React, { Component, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ViewSubject from "./../Exam/viewSubjects";
import {
  faCheck,
  faPersonCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminTopBar from "./Topsidenavbar/dash-basicTop-bar-Tutor-admin-Routes";
import "./dashboard.css";
import { MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
import {
  MDBIcon,
  MDBCollapse,
  MDBRipple,
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import Footer from "../Components/Footer";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import LoginLogoutActivity from "../Components/Login-Logout-Activity";
import UpComingTestCalender from "../Components/upComingTestCalender";
const baseUrl = require("../config");
export default function adminUserApproval() {
    const [data, setData] = useState([]);

    const getAllPendingUsers = () => {
      fetch(`${baseUrl}/getAllPendingUsers`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "allPendingUsers");
          setData(data.data);
        });
    };

    const verifyUser = async (id, name, email) => {
      if (
        window.confirm(`Please Click Ok if you want to Verify user ${name}`)
      ) {
        const res = await fetch(`${baseUrl}/verifyUser`, {
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
        });
        const data = await res.json();
        alert(data.message);
        getAllPendingUsers();
      } else {
        alert("There was error to verify the user.");
      }
    };

     const rejectUser = (id, name) => {
       if (
         window.confirm(
           `Please Click Ok if you want to reject this user ${name}. This user details will be deleted`
         )
       ) {
         fetch(`${baseUrl}/deleteUser`, {
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
    <>
      <AdminTopBar />
      <br />
      <div className="auth-wrapper" style={{ height: "auto" }}>
        <div className="auth-inner" style={{ width: 1024 }}>
          <h3>User Approval Status</h3>
          {data.length === 0 ? (
            <div className="alert alert-danger mt-3">
             No users has requested to Register this system.
            </div>
          ) : (
            <Table bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>User Type</th>
                  <th>Status</th>
                  <th>Verify</th>
                  <th>Reject</th>
                </tr>
              </thead>
              <tbody>
                {data.map((i, index) => {
                  return (
                    <tr key={i}>
                      <td>{index + 1}</td>
                      <td>
                        {i.fname} {i.lname}
                      </td>
                      <td>{i.email}</td>
                      <td>{i.userType}</td>
                      <td>{i.status}</td>
                      <td>
                        <FontAwesomeIcon
                          type="button"
                          class="btn btn-success common-btn"
                          icon={faCheck}
                          onClick={() => verifyUser(i._id, i.fname, i.email)}
                        />
                      </td>
                      <td>
                        <FontAwesomeIcon
                          type="button"
                          class="btn btn-danger common-btn"
                          icon={faPersonCircleXmark}
                          onClick={() => rejectUser(i._id, i.fname)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </>
  );
}
