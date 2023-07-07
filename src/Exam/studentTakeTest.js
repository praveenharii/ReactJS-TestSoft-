// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Button, Card, Container } from "react-bootstrap";
// import moment from "moment";
// import "moment-duration-format";
// import "./Styles/examPage.css";
// import jwt_decode from "jwt-decode";
// import Badge from "react-bootstrap/Badge";
// import Stack from "react-bootstrap/Stack";
// import Spinner from "../Components/Spinner"
// import Topbar from '../Pages/Topsidenavbar/takeExamTopbar'
// const baseUrl = require("../config");


// export default function StudentTakeTest() {
//   let id = null;
//   const token = window.localStorage.getItem("token");
//   const decodedToken = jwt_decode(token);
//   id = decodedToken.userId;
//   const navigate = useNavigate();
//   console.log(id);

//   const [test, setTest] = useState(null);
//   const [userAnswers, setUserAnswers] = useState({});
//   const [timeRemaining, setTimeRemaining] = useState(0);
//   const { subjectname, taketestid } = useParams();
//   const [submitted, setSubmitted] = useState(false);
//   const timeRemainingFormatted = moment
//   .duration(timeRemaining, "seconds")
//   .format("mm:ss", { trim: false });
  
//   console.log(timeRemaining);


//   useEffect(() => {
//     console.log("Fetching test data...");
//     fetch(`${baseUrl}/studentViewTest/${taketestid}`, {
//       method: "GET",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setTest(data.data);
//         setTimeRemaining(
//           moment.duration(data.data.timeLimit, "minutes").asSeconds()
//         );
//         console.log(data);
//         if (data["status"] === "ok") {
//            //alert("Reminder: Do not Refresh the page or else your test will be submitted.")
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//     console.log("Finished fetching test data...");
//   }, [taketestid]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeRemaining((prevTime) => prevTime - 1);
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);



//   const handleAnswerSelect = (questionIndex, selectedOption) => {
//     setUserAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [questionIndex]: selectedOption,
//     }));
//   };

//   const handleSubmitTest = async () => {
//     console.log(userAnswers);
//     try {
//       const response = await fetch(
//         `${baseUrl}/${id}/${subjectname}/tests/${taketestid}/submit`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             answers: userAnswers,
//           }),
//         }
//       );
//       const data = await response.json();
//       console.log(data);
//       alert(data.message);
//       setSubmitted(true);
//       navigate("/dashboard");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     const totalSeconds = timeRemaining * 60; // Convert minutes to seconds

//     if (totalSeconds <= 0 && timeRemaining << 0) {
//       handleSubmitTest();
//     }
//   }, [timeRemaining]);


//   useEffect(() => {
//     const handleBackButton = () => {
//       if (
//         window.confirm(
//           "Are you sure you want to leave? YOUR ANSWERS WILL BE SUBMITTED!!"
//         )
//       ) {
//         handleSubmitTest();
//       }
//     };
    
//     window.history.pushState(null, null, window.location.pathname);
//     window.addEventListener("popstate", handleBackButton);

//     return () => {
//       window.removeEventListener("popstate", handleBackButton);
//     };
//   }, []);
  

//   // useEffect(() => {
//   //   const handleBeforeUnload = (event) => {
//   //     event.preventDefault();
//   //     event.returnValue = "";
//   //     if (
//   //       window.confirm(
//   //         "Are you sure you want to Refresh? YOUR ANSWERS WILL BE SUBMITTED!!"
//   //       )
//   //     ) {
//   //       handleSubmitTest();
//   //     }
//   //   };

//   //   window.addEventListener("beforeunload", handleBeforeUnload);

//   //   return () => {
//   //     window.removeEventListener("beforeunload", handleBeforeUnload);
//   //   };
//   // }, []);

//   if (!test) {
//     return (
//       <div>
//         <Spinner />
//       </div>
//     );
//   }

//   return (
//     <>
//       <Topbar />
//       <br />
   
//         <div className="container-wrapper">
//           <div className="container-inner">
//             <Container>
//               <h1>{test.name}</h1>
//               <div className="exam-heading">
//                 <br />
//                 <Stack direction="vertical" gap={2}>
//                   <Badge bg="primary">Goodluck!</Badge>
//                   <Badge bg="success">
//                     Submit your test once you have completed.
//                   </Badge>
//                   <Badge bg="danger">
//                     Do not refresh the page!Or else your test will be
//                     submitted!!
//                   </Badge>
//                   <Badge bg="warning" text="dark">
//                     Do not navigate to other pages! Your test will auto submit
//                     if you try to navigate.
//                   </Badge>
//                 </Stack>
//                 <div className="time-remaining p-4">
//                   <Card>
//                     <Card.Body>
//                       Time Remaining:
//                       <p>{timeRemainingFormatted}</p>
//                     </Card.Body>
//                   </Card>
//                 </div>
//               </div>
//               <h3>Answer all the questions below:</h3>
//               <Card className="question-card">
//                 <Card.Body>
//                   {test.questions.map((question, index) => (
//                     <div key={index} className="unselectable">
//                       <h5>{`Q${index + 1}. ${question.question}`}</h5>
//                       <div className="options">
//                         {question.options.map((option, optionIndex) => (
//                           <div
//                             key={optionIndex}
//                             className={`option-button ${
//                               userAnswers[index] === option ? "selected" : ""
//                             }`}
//                             onClick={() => handleAnswerSelect(index, option)}
//                           >
//                             {option}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </Card.Body>
//               </Card>
//               <div className="submit-btn">
//                 <Button variant="success" onClick={handleSubmitTest}>
//                   Submit Test
//                 </Button>
//               </div>
//             </Container>
//           </div>
//         </div>

//     </>
//   );
// }


import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Container } from "react-bootstrap";
import moment from "moment";
import "moment-duration-format";
import "./Styles/examPage.css";
import jwt_decode from "jwt-decode";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import Spinner from "../Components/Spinner";
import Topbar from "../Pages/Topsidenavbar/takeExamTopbar";


export default function StudentTakeTest() {
  let id = null;
  const token = window.localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  id = decodedToken.userId;
  const navigate = useNavigate();
  console.log(id);

  const [test, setTest] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const { subjectname, taketestid } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const [initialTimestamp, setInitialTimestamp] = useState(null);
  const timeRemainingFormatted = moment
    .duration(timeRemaining, "seconds")
    .format("mm:ss", { trim: false });

  console.log(timeRemaining);

  useEffect(() => {
    console.log("Fetching test data...");
    fetch(`${process.env.REACT_APP_BASE_URL}/studentViewTest/${taketestid}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setTest(data.data);
        setTimeRemaining(
          moment.duration(data.data.timeLimit, "minutes").asSeconds()
        );
        const storedTimestamp = localStorage.getItem("initialTimestamp");
        if (storedTimestamp) {
          setInitialTimestamp(parseInt(storedTimestamp, 10));
        } else {
          setInitialTimestamp(Date.now());
          localStorage.setItem("initialTimestamp", Date.now().toString());
        }
        console.log(data);
        if (data["status"] === "ok") {
          //alert("Reminder: Do not Refresh the page or else your test will be submitted.")
        }
      })
      .catch((error) => {
        console.error(error);
      });
    console.log("Finished fetching test data...");
  }, [taketestid]);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = Date.now();
      const elapsedSeconds = Math.floor(
        (currentTime - initialTimestamp) / 1000
      );
      const remainingSeconds = timeRemaining - elapsedSeconds;

         const totalSeconds = remainingSeconds * 60;
      if (remainingSeconds <= 0 && totalSeconds << 0) {
        handleSubmitTest();
      } else {
        setTimeRemaining(remainingSeconds);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [initialTimestamp]);

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
        `${process.env.REACT_APP_BASE_URL}/${id}/${subjectname}/tests/${taketestid}/submit`,
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
      localStorage.removeItem("initialTimestamp");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleBackButton = () => {
      if (
        window.confirm(
          "Are you sure you want to leave? YOUR ANSWERS WILL BE SUBMITTED!!"
        )
      ) {
        handleSubmitTest();
      }
    };

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  if (!test) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Topbar />
      <br />
     
      <div className="container-wrapper">
        <div className="container-inner">
          <Container>
            <h1>{test.name}</h1>
            <div className="exam-heading">
              <br />
              <Stack direction="vertical" gap={2}>
                <Badge bg="primary">Goodluck!</Badge>
                <Badge bg="success">
                  Submit your test once you have completed.
                </Badge>
               
                <Badge bg="warning" text="dark">
                  Do not navigate to other pages! Your test will auto submit if
                  you try to navigate.
                </Badge>
              </Stack>
              <div className="time-remaining p-4">
                <Card>
                  <Card.Body>
                    Time Remaining:
                    <p>{timeRemainingFormatted}</p>
                  </Card.Body>
                </Card>
              </div>
            </div>
            <h3>Answer all the questions below:</h3>
            <Card className="question-card">
              <Card.Body>
                {test.questions.map((question, index) => (
                  <div key={index} className="unselectable">
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
    </>
  );
}
