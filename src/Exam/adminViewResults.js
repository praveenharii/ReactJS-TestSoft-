import React, { useState,useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { MDBCol, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
export default function AdminViewResults() {
  const [data, setData] = useState([]);
 const [groupedData, setGroupedData] = useState({});
  const [show, setShow] = useState(false);
  const [score, setScore] = useState(null);
  const [resultsID, setResultsID] = useState(null);
  const [username, setUsername] = useState(null);

  const handleClose = () => {
    setShow(false);
    setScore(null);
    setResultsID(null);
    setUsername(null);
  };

  const handleShow = (result) => {
    setScore(result.percentageScore);
    setResultsID(result._id);
    setUsername(result.username);
    setShow(true);
    
  };



  useEffect(() => {
    ViewAllStudentresult();
  }, []);

 

  const ViewAllStudentresult = () => {
    fetch("http://localhost:5000/getAllStudentResults", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setData(data.data, "allStudentResults");
        const groupedData = data.data.reduce((groups, item) => {
        if (!groups[item.subject]) {
          groups[item.subject] = [];
        }
        groups[item.subject].push(item);
        return groups;
      }, {});
      setGroupedData(groupedData);
      console.log(data);
    });
     
  }

 const editScore = async (score,selectedResultID) => {
  console.log(score,selectedResultID)
   fetch(`http://localhost:5000/editStudentScore/${selectedResultID}`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({
        score: score,
     }),
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data);
       ViewAllStudentresult();
       handleClose();
     });
 };

 const deleteResult = async (selectedResultID) => {
   try {
     const response = await fetch(
       `http://localhost:5000/deleteStudentResult/${selectedResultID}`,
       {
         method: "DELETE",
         headers: {
           "Content-Type": "application/json",
         },
       }
     );
     const data = await response.text();
     console.log(data);
     ViewAllStudentresult();
     alert("Result deleted successfully");

   } catch (error) {
     console.error(error);
     alert("An error occurred while deleting the result.");
   }
 };


 
 

  const handleEditScore = async () => {
    editScore(score, resultsID);
  };

  return (
    <>
      {/* <AdminSidebar userData={userData} /> */}

      <div>
        <MDBRow className="g-2">
          <MDBCol size="2">2 of 12</MDBCol>
          <MDBCol size="8">
            <div className="auth-wrapper" style={{ height: "auto" }}>
              <div className="auth-inner" style={{ width: "auto" }}>
                <center>
                  <h1>Student Results</h1>
                </center>
                
                {data &&
                  Object.entries(
                    data.reduce((groups, item) => {
                      if (!groups[item.subject]) {
                        groups[item.subject] = [];
                      }
                      groups[item.subject].push(item);
                      return groups;
                    }, {})
                  ).map(([subject, results], index) => (
                    <div key={index}>
                      <h2>{subject} Results</h2>
                      <MDBTable>
                        <MDBTableHead dark>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Test Name</th>
                            <th scope="col">Score</th>
                            <th scope="col">Percentage Score</th>
                            <th scope="col">Date/Time</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                          {results.map((result, index) => (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{result.username}</td>
                              <td>{result.subject}</td>
                              <td>{`${result.score}/${result.totalQuestions}`}</td>
                              <td>{result.percentageScore.toFixed(2)}%</td>
                              <td>
                                {new Date(result.date).toLocaleDateString()}
                                <br />{" "}
                                {new Date(result.date).toLocaleTimeString()}
                              </td>
                              <td>
                                <MDBBtn
                                  style={{ width: "80px" }}
                                  color="warning"
                                  margin="100px"
                                  onClick={() => {
                                    setScore(result.percentageScore);
                                    handleShow(result);
                                  }}
                                >
                                  Edit
                                </MDBBtn>
                                <Modal
                                  show={show}
                                  onHide={handleClose}
                                  animation={false}
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title>
                                      Edit Score for {username}
                                    </Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    <Form>
                                      <Form.Group
                                        className="mb-3"
                                        controlId="exampleForm.ControlInput1"
                                      >
                                        <Form.Label>Score</Form.Label>
                                        <Form.Control
                                          type="number"
                                          placeholder="New Score"
                                          value={score}
                                          onChange={(e) =>
                                            setScore(e.target.value)
                                          }
                                          autoFocus
                                        />
                                      </Form.Group>
                                    </Form>
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button
                                      variant="secondary"
                                      onClick={handleClose}
                                    >
                                      Close
                                    </Button>
                                    <Button
                                      variant="primary"
                                      onClick={handleEditScore}
                                    >
                                      Save Changes
                                    </Button>
                                  </Modal.Footer>
                                </Modal>

                                <MDBBtn
                                  style={{ width: "80px" }}
                                  color="danger"
                                  onClick={() => deleteResult(result._id)}
                                >
                                  Delete
                                </MDBBtn>
                              </td>
                            </tr>
                          ))}
                        </MDBTableBody>
                      </MDBTable>
                    </div>
                  ))}
              </div>
            </div>
          </MDBCol>

          <MDBCol size="2">Any cards</MDBCol>
        </MDBRow>
      </div>
    </>
  );
}
