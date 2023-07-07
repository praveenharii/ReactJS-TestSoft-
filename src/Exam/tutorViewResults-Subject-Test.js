import React, { useState, useEffect } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import TutorTopbar from "../Pages/Topsidenavbar/dash-basicTop-bar-Tutor-Routes";
import {
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Scatter,
  Tooltip,
} from "recharts";

export default function TutorViewResultsSubjectTest() {
  let userId = null;
  const token = window.localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  userId = decodedToken.userId;
  const [data, setData] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  let navigate = useNavigate();
  const [error, setError] = useState(false);
  const [dataScatter, setDataScatter] = useState([]);
  const [graphVisible, setGraphVisible] = useState(false);

  useEffect(() => {
    viewTest();
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      viewScatterGraph();
    }
  }, [selectedSubject]);

  const viewScatterGraph = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/getScatterGraphforALLTEST/${selectedSubject}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(data);
      setDataScatter(data);
    } catch (error) {
      console.error(error);
    }
  };

  const ScatterGraph = () => (
    <ScatterChart width={600} height={400}>
      <CartesianGrid />
      <YAxis type="number" dataKey="percentageScore" name="Percentage Score" />
      <XAxis type="category" dataKey="testname" name="Test Name" />
      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
      <Scatter data={dataScatter} fill="#8884d8" />
    </ScatterChart>
  );

  const viewTest = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/getSubjectAndTestNames/${userId}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(data.data);
      if (data.data && data.data.length > 0) {
        setData(data.data);
        setSelectedSubject(data.data[0].subject); // Set the first subject as the initially selected subject
      } else {
        setError(true);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
  };

  const handleNavigateToViewResults = (subject, testId) => {
    console.log(subject, testId);
    navigate(`/dashboard/viewResultsTestsLists/${subject}/${testId}`);
  };

  const handleDownloadTest = async (subjectName, testName) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/downloadResults/${subjectName}/${testName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const contentDispositionHeader = response.headers.get(
          "Content-Disposition"
        );
        const filename = contentDispositionHeader
          ? contentDispositionHeader.split("filename=")[1]
          : "result.csv";

        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        link.remove();

        alert("Result downloaded successfully");
      } else {
        throw new Error("Failed to download the results");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred while downloading the results");
    }
  };

  const toggleGraphVisibility = () => {
    setGraphVisible(!graphVisible);
  };

  return (
    <>
      <TutorTopbar />
      <br />
      <div>
        <MDBRow className="g-2">
          <MDBCol size="2"></MDBCol>
          <MDBCol size="8">
            <div className="auth-wrapper" style={{ height: "auto" }}>
              <div className="auth-inner" style={{ width: "auto" }}>
                <div>
                  <h3>List Of Tests</h3>
                  <h3>
                    <MDBBtn color="info" onClick={toggleGraphVisibility}>
                      Click Graph
                    </MDBBtn>
                  </h3>
                  <div
                    className={`graph-container${
                      graphVisible ? " graph-visible" : ""
                    }`}
                  >
                    <div className="graph-inner">
                      <MDBRow>
                        <MDBCol>
                          <h3>Scatter Graph for Student Marks</h3>
                      <ScatterGraph /></MDBCol></MDBRow>
                    </div>
                  </div>
                  
                  {error ? (
                    <div className="alert alert-danger mt-3">
                      No students have taken the test yet.
                    </div>
                  ) : (
                    <Nav
                      variant="tabs"
                      activeKey={selectedSubject}
                      onSelect={handleSelectSubject}
                      className="justify-content-center mt-3"
                    >
                      {data.map((subject, index) => (
                        <Nav.Item key={index}>
                          <Nav.Link eventKey={subject.subject}>
                            {subject.subject} Tests
                          </Nav.Link>
                        </Nav.Item>
                      ))}
                    </Nav>
                  )}
                </div>
                <div>
                  {data.map((subject) => {
                    if (subject.subject === selectedSubject) {
                      return (
                        <MDBTable striped key={subject.subject}>
                          <MDBTableHead dark>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Test Name</th>
                              <th scope="col">Actions</th>
                              <th scope="col">Download</th>
                            </tr>
                          </MDBTableHead>
                          <MDBTableBody>
                            {subject.tests.map((test, index) => (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{test.testName}</td>
                                <td>
                                  <MDBBtn
                                    style={{
                                      width: "80px",
                                      marginRight: "10px",
                                    }}
                                    color="primary"
                                    onClick={() =>
                                      handleNavigateToViewResults(
                                        subject.subject,
                                        test.testId
                                      )
                                    }
                                  >
                                    View Results
                                  </MDBBtn>
                                </td>
                                <td>
                                  <MDBBtn
                                    style={{ width: "120px" }}
                                    color="success"
                                    onClick={() =>
                                      handleDownloadTest(
                                        subject.subject,
                                        test.testName
                                      )
                                    }
                                  >
                                    Download
                                  </MDBBtn>
                                </td>
                              </tr>
                            ))}
                          </MDBTableBody>
                        </MDBTable>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </div>
    </>
  );
}
