import React, { useState, useEffect } from "react";
import { useNavigate, useParams , useLocation } from "react-router-dom";
import { Table, Button } from "react-bootstrap";

import moment from "moment";
import "moment-duration-format";


export default function StudentTakeTest() {
      const location = useLocation();
      const {id} = location.state;
      //console.log(id);
     
     
    const [test, setTest] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(0);
    const { subjectname , taketestid } = useParams();
    //const [submitted, setSubmitted] = useState(false);

    const timeRemainingFormatted = moment
    .duration(timeRemaining, "seconds")
    .format("mm:ss", { trim: false });
    
    

  useEffect(() => {
    
     console.log("Fetching test data...");
    fetch(`http://localhost:5000/studentViewTest/${taketestid}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setTest(data.data);
        setTimeRemaining(moment.duration(data.data.timeLimit, "minutes").asSeconds());
        console.log(data);
        if ((data["status"]) = "ok"){
          alert("Please complete the test before submitting!")
        }
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

   const handleAnswerSelect = (questionIndex, selectedOption) => {
     setUserAnswers((prevAnswers) => ({
       ...prevAnswers,
       [questionIndex]: selectedOption,
     }));
   };

   const handleSubmitTest = async () => {
    console.log(userAnswers);
     try {
       const response = await fetch(
         `http://localhost:5000/${JSON.stringify(id)}/${subjectname}/tests/${taketestid}/submit`,
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
       alert(data.message);
       //setSubmitted(true);
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
            Time Remaining:{timeRemainingFormatted}
            {/* {moment
              .duration(timeRemainingInMinutes, "minutes")
              .format("hh:mm:ss", { trim: false })} */}
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
                            userAnswers[index] === option 
                              ? "primary"
                              : "outline-secondary"
                          }
                          onClick={() => handleAnswerSelect(index, option)}
                          
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
          <Button
            variant="success"
            onClick={handleSubmitTest}
            
          >
            Submit Test
          </Button>
        </div>
      </div>
    </div>
  );
}
// && !submitted
// disabled = { submitted };
// disabled = { submitted };