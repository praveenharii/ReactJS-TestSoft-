import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table,Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { BiRadioCircleMarked } from "react-icons/bi";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import jwt_decode from "jwt-decode";
import AdminTopbar from "../Pages/Topsidenavbar/dash-basicTop-bar-Tutor-admin-Routes";
import TutorTopbar from "../Pages/Topsidenavbar/dash-basicTop-bar-Tutor-Routes";
import './Styles/tutorViewQuestions.css'
import { MDBBtn } from "mdb-react-ui-kit";
import { AlignMiddle } from "react-bootstrap-icons";

export default function ViewQuestions() {
  const [data, setData] = useState([]);
  const { subject, testid } = useParams();
  const navigate = useNavigate();
  let userType = null;
  const token = window.localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  userType = decodedToken.userType;
  console.log(userType);

  const handleNavigate = (data) => {
    navigate(`/subjects/${data.name}/editQuestions/${data.id}`, {
      state: {
        data : data,
      }
    });
  }


  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/subjects/${subject}/tests/${testid}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setData(data.data);
          console.log(data);
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [subject,testid]);

  return (
    <div>
      {userType === "Admin" ? <AdminTopbar /> : <TutorTopbar />}
      <br />
      <div className="display-wrapper" style={{ height: "auto" }}>
        <div className="display-inner">
          <h3 className="align-middle">All Questions:</h3>
          <br />
          <h4>Test Name: {data.name}</h4>
          <h4>
            Available Until: {data.date && data.date.substring(0, 10)} at{" "}
            {data.date && data.date.substring(11, 16)} Hours
          </h4>
          <h4>Time Limit: {data.timeLimit} Minutes</h4>
          <br />
          {data.questions ? (
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Question</th>
                  <th>Options</th>
                  <th>Answer</th>
                </tr>
              </thead>
              <tbody>
                {data.questions.map((question, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{question.question}</td>
                    <td>
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="option">
                          <BiRadioCircleMarked className="radio-icon" />
                          {option}
                        </div>
                      ))}
                    </td>
                    <td>
                      {question.options.indexOf(question.answer) !== -1 ? (
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="text-success answer-icon"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          className="text-danger answer-icon"
                        />
                      )}
                      {question.answer}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No questions found.</p>
          )}
          {userType !== "Admin" ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <MDBBtn
                color="primary"
                type="submit"
                onClick={() => handleNavigate(data)}
              >
                Edit Questions
              </MDBBtn>
            </div>
          ) : null}
        </div>
      </div>
      <br />
    </div>
  );
}



