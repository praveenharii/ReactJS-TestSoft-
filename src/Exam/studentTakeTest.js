import React, { useState, useEffect } from "react";
import { useNavigate, useParams , useLocation, Navigate } from "react-router-dom";
import { Table, Button, Card, Container } from "react-bootstrap";
import { MDBBtn } from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "moment-duration-format";
import "./Styles/examPage.css";


export default function StudentTakeTest() {
      const location = useLocation();
      const {id} = location.state;
      const navigate = useNavigate();
      
      
     
    const [test, setTest] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(0);
    const { subjectname , taketestid } = useParams();
    const [submitted, setSubmitted] = useState(false);

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
         // alert("Please complete the test before submitting!")
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
       setSubmitted(true);
     } catch (error) {
       console.error(error);
     }
   };

  //  useEffect(() => {
  //   if (submitted) {
  //     navigate("/dashboard");
  //  }
  // }, [submitted,navigate]);

useEffect(() => {
  const handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = "";
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
}, []);

const handleNavigate = async (path) => {
  if (window.confirm("Are you sure you want to leave? YOUR ANSWERS WILL BE SUBMITTED!!")) {
    await handleSubmitTest();
    navigate(path);
  }
};

   if (!test) {
     return <div>Loading...</div>;
   }

  return (
    <div className="container-wrapper">
      <div className="container-inner">
        <Container>
          <div className="exam-heading">
            <div className="home-btn">
              <MDBBtn onClick={() => handleNavigate("/dashboard")}>
                <FontAwesomeIcon icon={faHome} className="me-2" />
                Home
              </MDBBtn>
            </div>
            <div className="time-remaining">
              <h4>Time Remaining:</h4>
              <p>{timeRemainingFormatted}</p>
            </div>
          </div>
          <Card className="question-card">
            <Card.Body>
              {test.questions.map((question, index) => (
                <div key={index}>
                  <h5>{`Q${index + 1}. ${question.question}`}</h5>
                  <div className="options">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`option-button ${
                          userAnswers[index] === option ? "selected" : ""
                        }`}
                        onClick={() => handleAnswerSelect(index, option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
          <div className="submit-btn">
            <Button variant="success" onClick={handleSubmitTest}>
              Submit Test
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
}
