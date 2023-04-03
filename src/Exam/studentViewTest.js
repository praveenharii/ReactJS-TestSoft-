import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { BsPlay } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";


function SubjectTests() {
   const [tests, setTests] = useState([]);
   const location = useLocation();
   const id = location.state.id;
   const navigate = useNavigate();
   console.log(tests);
   useEffect(() => {
     async function fetchData() {
       const res = await fetch("http://localhost:5000/subTests");
       const data = await res.json();
       setTests(data.data);
     }
     fetchData();
   }, []);


   function takeTest(subject, testid) {
     console.log(subject, testid);
     navigate(`/dashboard/SubjectTests/${subject}/${testid}`,{
      state: {
          id,
        },
     });
     
   }


  return (
    <div className="auth-wrapper" style={{ height: "auto" }}>
      <div className="auth-inner" style={{ width: "auto" }}>
        <h2>All Tests:</h2>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Name</th>
              <th>Date</th>
              <th>Time Limit</th>
              <th>Take Exam</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test) => (
              <tr key={test._id}>
                <td>{test.subject}</td>
                <td>{test.name}</td>
                <td>{new Date(test.date).toISOString().slice(0, 10)}</td>
                <td>{test.timeLimit} min</td>
                <td>
                  <button className="btn btn-primary" type="button" onClick={() => takeTest(test.subject, test._id)}>
                    <BsPlay /> Take Test
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default SubjectTests;
