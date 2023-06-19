import React, {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
  MDBBtn,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { FaCalendarAlt } from "react-icons/fa";
import "../index.css"
const baseUrl = require("../config");

export default function upComingTestsCards({userId}) {
    const navigate = useNavigate();
    const [upcomingTests, setUpcomingTests] = useState([]);
    console.log(userId, "userId");
    useEffect(() => {
      fetch(`${baseUrl}/upcomingTests`)
        .then((response) => response.json())
        .then((data) => {
          setUpcomingTests(data.data);
          console.log(data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

    function ViewAvailableTests() {
      navigate("/dashboard/SubjectTests", {
        state: {
          id: userId,
        },
      });
    }

  return (
    <>
      <h3>Upcoming Test Reminders</h3>
      <MDBRow className="row-cols-1 row-cols-md-3 g-2">
        {upcomingTests.map((test, index) => (
          <MDBCol key={index} className="col-4">
            <MDBCard className="custom-card" alignment="center">
              <MDBCardHeader>
                <FaCalendarAlt /> Reminder
              </MDBCardHeader>
              <MDBCardBody>
                <h5>{test.subject}</h5>
                <h6>{test.testName}</h6>
                <p>{test.daysLeft} days left</p>
                <MDBBtn onClick={ViewAvailableTests}>View</MDBBtn>
              </MDBCardBody>
              <MDBCardFooter className="text-muted"></MDBCardFooter>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </>
  );
}
