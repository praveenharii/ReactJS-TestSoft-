import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { BsPlay } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import StudentTopNavBar from '../Pages/Topsidenavbar/dash-basicTop-bar-Students-Routes'
import {  Button, Modal, Form } from "react-bootstrap";

export default function SubjectTests() {
   const [tests, setTests] = useState([]);
   const [testPassword, settestPassword] = useState('');
   const [show, setShow] = useState(false);
    const location = useLocation();
    const userData = location.state.userData;
    const  id  = location.state.id;
    console.log(userData);
    console.log(id);
   const navigate = useNavigate();
   const [currentTest, setCurrentTest] = useState(null);
   

  const handleShow = (subjectname, taketestid) => {
    setCurrentTest({ subjectname, taketestid });
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    settestPassword("");
  };

   //console.log(tests);
   useEffect(() => {
     async function fetchData() {
       const res = await fetch("http://localhost:5000/subTests");
       const data = await res.json();
       setTests(data.data);
     }
     fetchData();
   }, []);


   function takeTest(subjectname, taketestid) {
     console.log(subjectname, taketestid, testPassword);
     
     fetch(`http://localhost:5000/${id}/checkUserTakenTest/${taketestid}`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         testPassword: testPassword,
       }),
     })
       .then((response) => response.json())
       .then((data) => {
         console.log(data);
         if (data.message === "You have already taken the test") {
           setShow(false);
           alert(data.message);
         }
        if (data.message === "Wrong password") {
          setShow(false);
          alert(data.message);
        }
        if (data.message === "OK") {
          navigate(`/dashboard/SubjectTests/${subjectname}/${taketestid}`, {
            state: {
              id,
            },
          });
        }
       })
       .catch((error) => console.error(error));    
   }


  return (
    <>
      <StudentTopNavBar userData={userData} />
      <br />
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
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => handleShow(test.subject, test._id)}
                    >
                      <BsPlay /> Take Test
                    </button>
                    <Modal show={show} onHide={handleClose} animation={true}>
                      <Modal.Header closeButton>
                        <Modal.Title>Password</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Key in password for the test</Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="Password"
                              value={testPassword}
                              onChange={(e) => settestPassword(e.target.value)}
                              autoFocus
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() =>
                            takeTest(
                              currentTest.subjectname,
                              currentTest.taketestid
                            )
                          }
                        >
                          Ok
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      {/* Modal Popup */}
    </>
  );
}


