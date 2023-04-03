import React, { useState, useEffect } from "react";
import { useNavigate, useParams , useLocation } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "moment-duration-format";


export default function StudentTakeTest() {
      const location = useLocation();
      const id = location.state.id;
      //console.log(id);
     
     
    const [test, setTest] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const timeRemainingInMinutes = Math.floor(timeRemaining / 60);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const { subjectname , taketestid } = useParams();
    //console.log(subjectname, taketestid);
    // console.log(id);
    

  useEffect(() => {
    
     console.log("Fetching test data...");
    fetch(`http://localhost:5000/studentViewTest/${taketestid}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setTest(data.data);
        setTimeRemaining(moment(data.data.timeLimit).diff(moment(), "seconds"));
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
      console.log("Finished fetching test data...");
  }, [taketestid]);
  

   useEffect(() => {
     const timer = setInterval(() => {
       setTimeRemaining((prevTime) => prevTime - 1);
     }, 1000);
     return () => clearInterval(timer);
   }, []);

   const handleAnswerSelect = (questionIndex, optionIndex) => {
     setUserAnswers((prevAnswers) => ({
       ...prevAnswers,
       [questionIndex]: optionIndex,
     }));
   };

   const handleSubmitTest = async () => {
     try {
       const response = await fetch(
         `/subjects/${id}/${subjectname}/tests/${taketestid}/submit`,
         {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({
             answers: userAnswers,
           }),
         }
       );
       const data = await response.json();
       console.log(data);
     } catch (error) {
       console.error(error);
     }
   };

   if (!test) {
     return <div>Loading...</div>;
   }

  return (
    <div className="auth-wrapper" style={{ height: "auto" }}>
      <div className="auth-inner" style={{ width: 900 }}>
        <div className="container">
          <h1>{test.name}</h1>
          <h5>
            Time Remaining:{" "}
            {moment
              .duration(timeRemainingInMinutes, "minutes")
              .format("hh:mm:ss", { trim: false })}
          </h5>
          <Table bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Question</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {test.questions.map((question, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{question.question}</td>
                  <td>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex}>
                        <Button
                          variant={
                            userAnswers[index] === optionIndex
                              ? "primary"
                              : "outline-secondary"
                          }
                          onClick={() => handleAnswerSelect(index, optionIndex)}
                        >
                          {option}
                        </Button>
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="success" onClick={handleSubmitTest}>
            Submit Test
          </Button>
        </div>
      </div>
    </div>
  );
}
