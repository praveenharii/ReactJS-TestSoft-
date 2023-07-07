import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Pages/dashboard.css";

export default function stackCards({ userId }) {
  const navigate = useNavigate();
  const [upcomingTests, setUpcomingTests] = useState([]);
  console.log(userId, "userId");
 
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/upcomingTests`)
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

  const Card = ({ title, content, daysLeft }) => (
    <div className="newcard" onClick={ViewAvailableTests}>
      <h3 className="">{title}</h3>
      <div className="bar">
        <div className="emptybar"></div>
        <div className="filledbar"></div>
        <div className="content">
          {content} ↯
          <br />
          {daysLeft} Days Left
        </div>
      </div>
      <div className="circle">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
          <circle className="stroke" cx="60" cy="70" r="45" />
        </svg>
      </div>
    </div>
  );

  return (
    <>
      <div className="backbody">
        <div className="newcontainer">
          {upcomingTests.map((test, index) => (
            <Card key={index} title={test.subject} content={test.testName} daysLeft={test.daysLeft} />
          ))}
        </div>
      </div>
    </>
  );
}
