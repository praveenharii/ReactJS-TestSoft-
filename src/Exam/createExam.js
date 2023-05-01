import React, { useState } from 'react';
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { Form, Button } from "react-bootstrap";
import { BsPlusCircle } from "react-icons/bs";
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
      <div className="auth-wrapper" style={{ height: "auto" }}>
        <div className="auth-inner" style={{ width: 800 }}>
          <div className="container">
            <h1>Create Exam</h1>
            <br />
            <Form onSubmit={handleSubmit}>
              <MDBInput
                label="Subject Name"
                type="text"
                value={subjectName}
                onChange={(event) => setSubjectName(event.target.value)}
              />
              <br />
              <MDBInput
                label="Test Name"
                type="text"
                value={testName}
                onChange={(event) => setTestName(event.target.value)}
              />
              <br />
              <MDBInput
                autoFocus="true"
                label="Date"
                type="datetime-local"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
              <br />
              <MDBInput
                label="Time Limit (minutes)"
                type="number"
                value={timeLimit}
                onChange={(event) => setTimeLimit(event.target.value)}
              />
              <br />
              <br />
              {questions.map((question, index) => (
                <div key={index}>
                  <h4>Question {index + 1}:</h4>
                  <MDBInput
                    label="Question"
                    type="text"
                    name="question"
                    value={question.question}
                    onChange={(event) => handleInputChange(event, index)}
                  />
                  <br />
                  {question.options.map((option, optionIndex) => (
                    <div className="option" key={optionIndex}>
                      <MDBInput
                        label={`Option ${optionIndex + 1}`}
                        type="text"
                        value={option}
                        onChange={(event) =>
                          handleOptionChange(event, index, optionIndex)
                        }
                      />
                      {question.answer === option && (
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="icon"
                        />
                      )}
                    </div>
                  ))}
                  <Form.Group>
                    <Form.Label>Answer:</Form.Label>
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
                  </Form.Group>
                </div>
              ))}
              <Button
                variant="outline-secondary"
                className="mb-3"
                onClick={handleAddQuestion}
              >
                <BsPlusCircle className="me-2" />
                Add Question
              </Button>
              <br />
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