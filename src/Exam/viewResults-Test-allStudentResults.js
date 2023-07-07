import React, { useState, useEffect } from "react";
import { MDBCol, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import { useNavigate, useParams } from "react-router-dom";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import jwt_decode from "jwt-decode";
import TutorTopBar from "../Pages/Topsidenavbar/dash-basicTop-bar-Tutor-Routes";
import AdminTopBar from "../Pages/Topsidenavbar/dash-basicTop-bar-Tutor-admin-Routes"

const COLORS = ["#ff0000", "#8884d8", "#82ca9d", "#00ff00"];

export default function AdminViewResultsSubjectAndTest() {
  let userType = null;
  const token = window.localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  userType = decodedToken.userType;
  let { subject, testId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [score, setScore] = useState(null);
  const [resultsID, setResultsID] = useState(null);
  const [username, setUsername] = useState(null);
  const [testName, setTestName] = useState("");
  const [alertModal, setAlertModal] = useState(false);
  const [graphVisible, setGraphVisible] = useState(false);
  const [totalStudents, setTotalStudents]= useState('');
  const [totalSubmitted, setTotalSubmitted] = useState("");

   const categorizeData = (data) => {
     const categories = {
       "Below 40%": [],
       "40-75%": [],
       "75-90%": [],
       "Above 90%": [],
     };

     data.forEach((item) => {
       if (item.percentageScore < 50) {
         categories["Below 40%"].push(item);
       } else if (item.percentageScore >= 50 && item.percentageScore < 75) {
         categories["40-75%"].push(item);
       } else if (item.percentageScore >= 75 && item.percentageScore < 90) {
         categories["75-90%"].push(item);
       } else {
         categories["Above 90%"].push(item);
       }
     });

     return categories;
   };

   

   const toggleGraphVisibility = () => {
     setGraphVisible(!graphVisible);
   };

  const viewAllStudentResults = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/getResults/${subject}/${testId}`)
      .then((res) => res.json())
      .then((data) => {
        setTotalStudents(data.totalStudents);
        setTotalSubmitted(data.totalSubmitted);
        if (data.error === "No results found") {
          setAlertModal(true);
        } else {
          setData(data.data);
          setTestName(data.data.testName[0]);
          setTotalStudents(data);
       
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  

  useEffect(() => {
    viewAllStudentResults();
  }, [subject, testId, navigate]);

  const toggleAlertModal = () => {
    setAlertModal(false);
    navigate("/dashboard");
  };

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

  const handleEditScore = async () => {
    editScore(score, resultsID);
  };


  const editScore = async (score, selectedResultID) => {
    console.log(score, selectedResultID);
    fetch(`${process.env.REACT_APP_BASE_URL}/editStudentScore/${selectedResultID}`, {
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
        viewAllStudentResults();
        handleClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteResult = async (selectedResultID) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/deleteStudentResult/${selectedResultID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.text();
      console.log(data);
      viewAllStudentResults();
      alert("Result deleted successfully");
    } catch (error) {
      console.error(error);
      alert("An error occurred while deleting the result.");
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p>{`Name: ${dataPoint.username}`}</p>
        <p>{`Score: ${dataPoint.percentageScore}`}</p>
      </div>
    );
  }

  return null;
};

const PieChartExample = () => {
  const categorizedData = categorizeData(data);

  const pieData = Object.keys(categorizedData).map((category, index) => ({
    name: category,
    value: categorizedData[category].length,
    dataPoints: categorizedData[category],
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div>
      <h3>Pie Chart</h3>
      <PieChart width={400} height={300}>
        <Pie
          data={pieData}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};



  return (
    <>
      {userType === "Admin" ? (
        <AdminTopBar />
      ) : userType === "Tutor" ? (
        <TutorTopBar />
      ) : null}
      <br />
      <div>
        <MDBModal
          animation
          show={alertModal}
          tabIndex="-1"
          onHide={toggleAlertModal}
        >
          <MDBModalDialog position="top-right" side>
            <MDBModalContent>
              <MDBModalHeader className="bg-danger text-white">
                <MDBModalTitle>Alert</MDBModalTitle>
              </MDBModalHeader>
              <MDBModalBody>
                <p>No student has taken the test</p>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="danger" onClick={toggleAlertModal}>
                  Close
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
        <MDBRow className="g-2">
          <MDBCol md="12" lg="12">
            <div className="auth-wrapper" style={{ height: "auto" }}>
              <div className="auth-inner" style={{ width: "auto" }}>
                <div>
                  <h3>{testName} Results</h3>
                </div>
                <div>
                  <h3>
                    <MDBBtn color="info" onClick={toggleGraphVisibility}>
                      Click to view Results Graph
                    </MDBBtn>
                    <div className="leftSide">
                      Submitted : {totalSubmitted}/{totalStudents}
                    </div>
                  </h3>
                  <div
                    className={`graph-container${
                      graphVisible ? " graph-visible" : ""
                    }`}
                  >
                    <div className="graph-inner">
                      <MDBRow>
                        <MDBCol>
                          <PieChartExample />
                        </MDBCol>
                        <MDBCol>
                          <h3>Scatter Chart</h3>
                          <ScatterChart width={400} height={300}>
                            <CartesianGrid />
                            <XAxis type="category" dataKey="name" />
                            <YAxis type="number" dataKey="percentageScore" />
                            <Tooltip
                              cursor={{ strokeDasharray: "3 3" }}
                              content={<CustomTooltip />}
                            />
                            <Scatter
                              name="Test Results"
                              data={data}
                              fill="#8884d8"
                            />
                          </ScatterChart>
                        </MDBCol>
                      </MDBRow>
                    </div>
                  </div>
                </div>
                <div>
                  <MDBTable striped>
                    <MDBTableHead dark>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Score</th>
                        <th scope="col">Percentage Score</th>
                        <th scope="col">Date/Time</th>
                        <th scope="col">Grade</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {data.map((result, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{result.username}</td>
                          <td>{`${result.score}/${result.totalQuestions}`}</td>
                          <td>{result.percentageScore.toFixed(2)}%</td>
                          <td>
                            {new Date(result.date).toLocaleDateString()}
                            <br /> {new Date(result.date).toLocaleTimeString()}
                          </td>
                          <td>
                            {result.percentageScore >= 40 ? (
                              <button
                                type="button"
                                className="btn btn-pass disabled"
                              >
                                <strong>Pass</strong>
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-fail disabled"
                              >
                                <strong>Fail</strong>
                              </button>
                            )}
                          </td>
                          <td>
                            <MDBBtn
                              style={{ width: "80px" }}
                              color="warning"
                              margin="100px"
                              onClick={() => handleShow(result)}
                            >
                              Edit
                            </MDBBtn>
                            <Modal
                              show={show}
                              onHide={handleClose}
                              animation={true}
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
                                      onChange={(e) => setScore(e.target.value)}
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
                            </MDBBtn>{" "}
                          </td>
                        </tr>
                      ))}
                    </MDBTableBody>
                  </MDBTable>
                </div>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </div>
    </>
  );
}
