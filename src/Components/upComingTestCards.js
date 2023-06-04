import React from "react";
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

export default function upComingTestsCards() {
  const upcomingTests = [
    {
      subject: "English",
      testName: "testtest",
      daysLeft: 2,
    },
    {
      subject: "English",
      testName: "testtesting",
      daysLeft: 10,
    },
    {
      subject: "Maths",
      testName: "Test1",
      daysLeft: 5,
    },
    {
      subject: "TestSubject",
      testName: "Test01",
      daysLeft: 15,
    },
    {
      subject: "TestSubject",
      testName: "Test02",
      daysLeft: 30,
    },
    // Add more test data as needed
  ];

  return (
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
              <MDBBtn href="#">Button</MDBBtn>
            </MDBCardBody>
            <MDBCardFooter className="text-muted">2 days ago</MDBCardFooter>
          </MDBCard>
        </MDBCol>
      ))}
    </MDBRow>
  );
}
