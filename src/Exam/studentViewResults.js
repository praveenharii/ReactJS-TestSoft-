import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Table } from "react-bootstrap";
import StudentTopNavBar from "../Pages/Topsidenavbar/dash-basicTop-bar-Students-Routes";

export default function StudentViewResults() {
    let userId = null;
    const token = window.localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    userId = decodedToken.userId;
    const [studentResults, setStudentResults] = useState([]);
    console.log(studentResults);
    useEffect(() => {
      const fetchResults = async () => {
        const results = await fetchStudentResults(userId);
        setStudentResults(results);
      };

      fetchResults();
    }, [userId]);
 
    const fetchStudentResults = async (userId) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/getStudentResults`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        const data = await response.json();

        if (response.ok) {
          return data.studentResults;
        } else {
          console.log(data);
          throw new Error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <>
      <StudentTopNavBar />
      <br />
      <div className="auth-wrapper" style={{ height: "auto" }}>
        <div className="auth-inner" style={{ width: 800 }}>
          <h1>Taken Test Results</h1>

          <div className="text-success" style={{ fontSize: "12px" }}>
            The passing marks is 40%.
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Test Name</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Time Taken</th>
                <th>Score</th>
                <th>Total Percentage</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {studentResults.map((result, index) => (
                <tr key={result._id}>
                  <td>{index + 1}</td>
                  <td>{result.testname}</td>
                  <td>{result.subject}</td>
                  <td>{new Date(result.date).toLocaleDateString()}</td>
                  <td>{new Date(result.date).toLocaleTimeString()}</td>
                  <td>{`${result.score}/${result.totalQuestions}`}</td>
                  <td>{result.percentageScore.toFixed(2)}</td>
                  {result.percentageScore >= 40 ? (
                    <button type="button" className="btn btn-pass disabled">
                      <strong>Pass</strong>
                    </button>
                  ) : (
                    <button type="button" className="btn btn-fail disabled">
                      <strong>Fail</strong>
                    </button>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}
