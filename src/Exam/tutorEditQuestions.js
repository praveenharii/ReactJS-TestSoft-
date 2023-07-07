import React, { useState, useEffect } from "react";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { Form, Button } from "react-bootstrap";
import { BsPlusCircle, BsDashCircle } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import "./Styles/createExamStyles.css";
import TopBar from "../Pages/Topsidenavbar/dash-basicTop-bar-Tutor-Routes";
import { MdCenterFocusStrong } from "react-icons/md/index.esm";
import { useLocation, useParams, useNavigate } from "react-router-dom";


export default function EditQuestions() {
  const navigate=useNavigate();
  const location = useLocation();
  const data = location.state.data;
  const { testname , testid }= useParams();
  console.log(testname, testid)
  console.log(data.id); 

  console.log(data.questions[0].question); 
  console.log(data.questions[1].answer); 

    const [testName, setTestName] = useState("");
    const [date, setDate] = useState("");
    const [timeLimit, setTimeLimit] = useState(0);
    const [questions, setQuestions] = useState([
      { question: "", options: ["", "", "", ""], answer: "" },
    ]);

    useEffect(() => {
      setTestName(data.name);
      setDate(formatDate(data.date));
      setTimeLimit(data.timeLimit);
      setQuestions(data.questions);
    }, [data]);

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const formattedDate = date.toISOString().slice(0, 16);
      return formattedDate;
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
      setQuestions([
        ...questions,
        { question: "", options: ["", "", "", ""], answer: "" },
      ]);
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
      
      const updatedData = {
        test: {
          name: testName,
          date: date,
          timeLimit: timeLimit,
          questions: questions,
        },
      };
      console.log(updatedData);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/updateQuestions/${testname}/${testid}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(updatedData),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          alert(data.status);
          navigate("/dashboard");
        } else {
          console.error("Error:", response.status);
        }
      } catch (error) {
        console.error(error);
      }
    };

 
  return (
    <>
      <TopBar />
      <br />
      <div className="createExam-wrapper" style={{ height: "auto" }}>
        <div className="createExam-inner">
          <div className="container">
            <h1>Edit Test</h1>
            <br />
            <Form onSubmit={handleSubmit} className="exam-form">
              {/* <div className="form-group">
                  <label>Subject Name</label>
                <MDBInput
                  type="text"
                  value={subjectName}
                  onChange={(event) => setSubjectName(event.target.value)}
                />
              </div> */}
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
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <MDBBtn color="primary" type="submit">
                  Update
                </MDBBtn>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <br />
    </>
  );
}

