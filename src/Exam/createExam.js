import React, { useState } from 'react';
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { Form, Button } from "react-bootstrap";
import { BsPlusCircle, BsDashCircle } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import './Styles/createExamStyles.css';
import TopBar from "../Pages/Topsidenavbar/dash-basicTop-bar-Tutor-Routes"
import jwt_decode from "jwt-decode";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { MdCenterFocusStrong } from './../../node_modules/react-icons/md/index.esm';
import { useNavigate, useLocation } from "react-router-dom";

export default function CreateExamForm() {
  const navigate = useNavigate();
  let userId = null;
  const token = window.localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  userId = decodedToken.userId;
   const [showPassword, setShowPassword] = useState(false);
  const [subjectName, setSubjectName] = useState('');
  const [testName, setTestName] = useState('');
  const [date, setDate] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [testPassword, settestPassword] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], answer: '' }]);
  console.log(userId);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index][name] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (event, index, optionIndex) => {
    const { value } = event.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], answer: '' }]);
  };

  const handleDeleteQuestion = () => {
    const updatedQuestions = [...questions];
    updatedQuestions.pop();
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !testName ||
      !date ||
      !timeLimit ||
      questions.some(
        (q) => !q.question || !q.answer || q.options.some((o) => !o)
      )
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const data = {
      subject: { name: subjectName },
      test: { name: testName, date, timeLimit, testPassword, questions },
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/createExam/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(data),
      });

     const json = await response.json();

     if (
       json.status === "New Test Created" ||
       json.status === "New Test and Subject Created"
     ) {
       alert(json.status);
       navigate("/dashboard");
     } else {
       throw new Error(json.message);
     }
    } catch (error) {
      console.error(error);
      alert(error);
      // Handle error case here
    }
  };

  return (
    <>
      <TopBar />
      <br />
      <div className="createExam-wrapper" style={{ height: "auto" }}>
        <div className="createExam-inner" style={{ width: 1100 }}>
          <div className="container">
            <div style={{ textAlign: "center" }}>
              <h1>Create Exam</h1>
            </div>
            <br />
            <Form onSubmit={handleSubmit} className="exam-form">
              <div className="form-group">
                <label>Subject Name</label>
                <select
                  className="form-control"
                  value={subjectName}
                  onChange={(event) => setSubjectName(event.target.value)}
                >
                  <option value="">Select a subject</option>
                  <option value="Bahasa Melayu">Bahasa Melayu</option>
                  <option value="Math">Math</option>
                  <option value="Science">Science</option>
                  <option value="Sejarah">Sejarah</option>
                  <option value="English">English</option>
                </select>
              </div>
              <div className="form-group">
                <label>Test Name</label>
                <MDBInput
                  type="text"
                  value={testName}
                  onChange={(event) => setTestName(event.target.value)}
                />
              </div>
              <div className="form-group">
                <div className="date-time-group">
                  <label>Date</label>
                  <MDBInput
                    type="datetime-local"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Time Limit (minutes)</label>
                  <MDBInput
                    type="number"
                    value={timeLimit}
                    onChange={(event) => setTimeLimit(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Test Password</label>
                  <div className="input-group">
                    <MDBInput
                      type={showPassword ? "text" : "password"}
                      value={testPassword}
                      onChange={(event) => settestPassword(event.target.value)}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-tertiary"
                        type="button"
                        onClick={toggleShowPassword}
                      >
                        {showPassword ? <BsEyeSlash /> : <BsEye />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {questions.map((question, index) => (
                <div className="question-container" key={index}>
                  <h4>Question {index + 1}:</h4>
                  <div className="form-group">
                    <label>Question</label>
                    <MDBInput
                      type="text"
                      name="question"
                      value={question.question}
                      onChange={(event) => handleInputChange(event, index)}
                    />
                  </div>
                  {question.options.map((option, optionIndex) => (
                    <div className="option" key={optionIndex}>
                      <div className="form-group">
                        <label>{`Option ${optionIndex + 1}`}</label>
                        <MDBInput
                          type="text"
                          value={option}
                          onChange={(event) =>
                            handleOptionChange(event, index, optionIndex)
                          }
                        />
                      </div>
                      {question.answer === option && (
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="icon"
                        />
                      )}
                    </div>
                  ))}
                  <div className="form-group">
                    <label>Answer:</label>
                    <Form.Control
                      size="lg"
                      as="select"
                      value={question.answer}
                      onChange={(event) => handleInputChange(event, index)}
                      name="answer"
                    >
                      {question.options.map((option, optionIndex) => (
                        <option key={optionIndex} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Control>
                  </div>
                </div>
              ))}
              <Button
                variant="outline-secondary"
                className="mb-3 add-question-btn"
                onClick={handleAddQuestion}
              >
                <BsPlusCircle className="me-2" />
                Add Question
              </Button>
              <Button
                variant="outline-secondary"
                className="mb-3 delete-question-btn"
                onClick={handleDeleteQuestion}
              >
                <BsDashCircle className="me-2" />
                Delete Question
              </Button>
              <br />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <MDBBtn color="primary" type="submit">
                  Create Exam
                </MDBBtn>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};


//  <form onSubmit={handleSubmit}>
//       <label>
//         Subject Name:
//         <input
//           type="text"
//           value={subjectName}
//           onChange={(event) => setSubjectName(event.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Test Name:
//         <input
//           type="text"
//           value={testName}
//           onChange={(event) => setTestName(event.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Date:
//         <input
//           type="datetime-local"
//           value={date}
//           onChange={(event) => setDate(event.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Time Limit (minutes):
//         <input
//           type="number"
//           value={timeLimit}
//           onChange={(event) => setTimeLimit(event.target.value)}
//         />
//       </label>
//       <br />
//       {questions.map((question, index) => (
//         <div key={index}>
//           <label>
//             Question {index + 1}:
//             <input
//               type="text"
//               name="question"
//               value={question.question}
//               onChange={(event) => handleInputChange(event, index)}
//             />
//           </label>
//           <br />
//           {question.options.map((option, optionIndex) => (
//             <label key={optionIndex}>
//               Option {optionIndex + 1}:
//               <input
//                 type="text"
//                 value={option}
//                 onChange={(event) =>
//                   handleOptionChange(event, index, optionIndex)
//                 }
//               />
//             </label>
//           ))}
//           <br />
//           <label>
//             Answer:
//             <select
//               value={question.answer}
//               onChange={(event) => handleInputChange(event, index)}
//               name="answer"
//             >
//               {question.options.map((option, optionIndex) => (
//                 <option key={optionIndex} value={option}>
//                   {option}
//                 </option>
//               ))}
//         </select>
//       </label>
//       <br />
//     </div>
//   ))}
//   <button type="button" onClick={handleAddQuestion}>
//     Add Question
//   </button>
//   <br />
//   <br />
//   <button type="submit">Create Exam</button>
// </form>