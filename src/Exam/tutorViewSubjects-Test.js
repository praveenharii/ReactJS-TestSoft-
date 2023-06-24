import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import { Table, Nav, Button } from "react-bootstrap";
import {
  MDBRow,
  MDBCol,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
} from "mdb-react-ui-kit";
import {
  faTrash,
  faSquareArrowUpRight,
} from "@fortawesome/free-solid-svg-icons";
import TutorTopbar from "../Pages/Topsidenavbar/dash-basicTop-bar-Tutor-Routes";

export default function TutorViewSubjects() {
  const [data, setData] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    getAllSubjects();
  }, []);

  const getAllSubjects = () => {
    fetch(`${process.env.BASE_URL}/subjects/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "Subjects");
        if (data.data && data.data.length > 0) {
          setData(data.data);
          setSelectedSubject(data.data[0].name);
        }
        if (data.data.length <= 0) {
          setError(true);
        }
      })
      .catch((error) => {
        console.error("Error retrieving subjects:", error);
        setError(true);
      });
  };

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
  };

  const handleNavigateToViewQuestions = (subject, testId) => {
    navigate(`/subjects/${subject}/tests/${testId}`);
  };



  const deleteTest = (id, name) => {
    if (
      window.confirm(`Please click OK if you want to delete subject ${name}`)
    ) {
      fetch(`${process.env.BASE_URL}/deleteTest/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message);
          getAllSubjects();
          console.log(data);
        })
        .catch((error) => {
          console.error("Error deleting test:", error);
        });
    }
  };

  const isTestAvailable = (availableUntil) => {
    const currentDate = new Date();
    const availableUntilDate = new Date(availableUntil);
    return availableUntilDate > currentDate ? (
      <button type="button" class="btn btn-success btn-rounded">
        Test Active
      </button>
    ) : (
      <button type="button" class="btn btn-warning btn-rounded">
        Test is due
      </button>
    );
  };


  return (
    <div>
      <TutorTopbar />
      <br />
      <MDBRow className="g-2">
        <MDBCol size="2"></MDBCol>
        <MDBCol size="8">
          <div className="auth-wrapper" style={{ height: "auto" }}>
            <div className="auth-inner" style={{ width: "auto" }}>
              <div>
                <h3>List Of Subjects and Tests you handle</h3>
                {error ? (
                  <div className="alert alert-danger mt-3">
                    No subjects available. Create one test to view your test
                    based on subject you handle.
                  </div>
                ) : (
                  <>
                    <Nav
                      variant="tabs"
                      activeKey={selectedSubject}
                      onSelect={handleSelectSubject}
                    >
                      {data.map((subject) => (
                        <Nav.Item key={subject._id}>
                          <Nav.Link eventKey={subject.name}>
                            {subject.name} Tests
                          </Nav.Link>
                        </Nav.Item>
                      ))}
                    </Nav>
                    {selectedSubject && (
                      <MDBTable striped>
                        <MDBTableHead dark>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Test Name</th>
                            <th scope="col">Created By</th>
                            <th scope="col">Date Created(MM/DD/YY)</th>
                            <th scope="col">Available Until(MM/DD/YY)</th>
                            <th scope="col">Status</th>
                            <th scope="col">View Questions</th>
                            <th scope="col">Delete Test</th>
                          </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                          {data.map((subject) => {
                            if (subject.name === selectedSubject) {
                              return subject.tests.map((test, index) => (
                                <tr key={test._id}>
                                  <th scope="row">{index + 1}</th>
                                  <td>{test.name}</td>
                                  <td>{test.createdBy}</td>
                                  <td>
                                    {new Date(test.createdAt).toLocaleString()}
                                  </td>
                                  <td>
                                    {new Date(test.date).toLocaleString()}
                                  </td>
                                  <td>{isTestAvailable(test.date)}</td>
                                  <td>
                                    <MDBBtn
                                      style={{ width: "120px" }}
                                      color="primary"
                                      onClick={() =>
                                        handleNavigateToViewQuestions(
                                          subject.name,
                                          test._id
                                        )
                                      }
                                    >
                                      View Questions
                                    </MDBBtn>
                                  </td>
                                  <td>
                                    <Button
                                      variant="danger"
                                      onClick={() =>
                                        deleteTest(test._id, test.name)
                                      }
                                    >
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        className="me-2"
                                      />
                                      Delete
                                    </Button>
                                  </td>
                                </tr>
                              ));
                            }
                            return null;
                          })}
                        </MDBTableBody>
                      </MDBTable>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </div>
  );
}
