import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import '../Exam/Styles/calender.css'

export default function upComingTestCalender({ userData }) {
    const navigate = useNavigate();
    const userId = userData._id;
 const [testData, setTestData] = useState([]);

 useEffect(() => {
   fetchTestCalendarData();
 }, []);

 const fetchTestCalendarData = async () => {
   try {
     const response = await fetch(`${process.env.REACT_APP_BASE_URL}/upComingTestCalender`);
     const data = await response.json();
     setTestData(data.data);
   } catch (error) {
     console.error("Error fetching test data:", error);
   }
 };

  const tileContent = ({ date }) => {
    const formattedDate = date.toISOString().split("T")[0];
    const test = testData.find((test) => test.date === formattedDate);
    if (test) {

        function ViewAvailableTests() {
          navigate("/dashboard/SubjectTests", {
            state: {
              id: userId,
              userData: userData,
            },
          });
        }

      return (
        <div onClick={ViewAvailableTests}>
        <div className="test-tile">
          <div className="test-date">{test.subjectName}</div>
          <div className="test-name">{test.testName}</div>
        </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='calendar-container'>
      <h3>Upcoming Test Calendar</h3>
      <Calendar
        tileContent={tileContent}
        calendarType="US"
        className="custom-calendar"
      />
    </div>
  );
}
