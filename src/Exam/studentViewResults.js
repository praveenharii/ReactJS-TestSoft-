import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Table } from "react-bootstrap";
export default function StudentViewResults() {
    let userId = null;
    const token = window.localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    userId = decodedToken.userId;
    const [studentResults, setStudentResults] = useState([]);
    console.log(userId);

    useEffect(() => {
      const fetchResults = async () => {
        const results = await fetchStudentResults(userId);
        setStudentResults(results);
      };

      fetchResults();
    }, [userId]);
 
    const fetchStudentResults = async (userId) => {
      try {
        const response = await fetch(
          `http://localhost:5000/getStudentResults`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          }
        );

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
      <div className="auth-wrapper">
        <div className="auth-inner" style={{ width: 800 }}>
          <h1> Test Results</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Test Name</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Time</th>
                <th>Score</th>
                <th>Total Percentage</th>
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
                  <td>{(result.percentageScore).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}
