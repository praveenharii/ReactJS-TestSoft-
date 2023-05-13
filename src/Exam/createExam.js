import React, { useState } from 'react';
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { Form, Button } from "react-bootstrap";
import { BsPlusCircle, BsDashCircle } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import './Styles/createExamStyles.css';
import TopBar from "../Pages/Topsidenavbar/dash-basicTop-bar-Tutor-admin-Routes"
import { MdCenterFocusStrong } from './../../node_modules/react-icons/md/index.esm';


export default function CreateExamForm() {
  const [subjectName, setSubjectName] = useState('');
  const [testName, setTestName] = useState('');
  const [date, setDate] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], answer: '' }]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      subject: { name: subjectName },
      test: { name: testName, date, timeLimit, questions },
    };
    const response = await fetch("http://localhost:5000/createExam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    })
    const json = await response.json();
    console.log(json);
    alert(json.status);
  };

  return (
    <>
      <TopBar />
      <br />
      <div className="createExam-wrapper" style={{ height: "auto" }}>
        <div className="createExam-inner">
          <div className="container">
            <h1>Create Exam</h1>
            <br />
            <Form onSubmit={handleSubmit} className="exam-form">
              <div className="form-group">
                <label>Subject Name</label>
                <MDBInput
                  type="text"
                  value={subjectName}
                  onChange={(event) => setSubjectName(event.target.value)}
                />
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
              <MDBBtn color="primary" type="submit">
                Create Exam
              </MDBBtn>
            </Form>
          </div>
        </div>
      </div>
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