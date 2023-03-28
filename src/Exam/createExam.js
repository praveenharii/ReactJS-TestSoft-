import React, { useState } from "react";
import axios from "axios";

const CreateExamForm = () => {
  const [subjectName, setSubjectName] = useState("");
  const [testName, setTestName] = useState("");
  const [date, setDate] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], answer: "" },
  ]);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...questions];
    list[index][name] = value;
    setQuestions(list); 
  };

  const handleOptionChange = (event, questionIndex, optionIndex) => {
    const { value } = event.target;
    const list = [...questions];
    list[questionIndex].options[optionIndex] = value;
    setQuestions(list);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], answer: "" },
    ]);
  };

 const handleSubmit = async (event) => {
   event.preventDefault();
   const examData = {
     subject: { name: subjectName },
     test: { name: testName, date, timeLimit, questions, answer:"welcome" },
   };
   try {
     const response = await fetch("http://localhost:5000/createExam", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(examData),
     });
     const data = await response.json();
     console.log(data.exam.subject.test.answer);
     // use the exam result data in your application
   } catch (error) {
     console.error(error);
   }
 };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Subject Name:
        <input
          type="text"
          value={subjectName}
          onChange={(event) => setSubjectName(event.target.value)}
        />
      </label>
      <br />
      <label>
        Test Name:
        <input
          type="text"
          value={testName}
          onChange={(event) => setTestName(event.target.value)}
        />
      </label>
      <br />
      <label>
        Date:
        <input
          type="datetime-local"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </label>
      <br />
      <label>
        Time Limit (minutes):
        <input
          type="number"
          value={timeLimit}
          onChange={(event) => setTimeLimit(event.target.value)}
        />
      </label>
      <br />
      {questions.map((question, index) => (
        <div key={index}>
          <label>
            Question {index + 1}:
            <input
              type="text"
              name="question"
              value={question.question}
              onChange={(event) => handleInputChange(event, index)}
            />
          </label>
          <br />
          {question.options.map((option, optionIndex) => (
            <label key={optionIndex}>
              Option {optionIndex + 1}:
              <input
                type="text"
                value={option}
                onChange={(event) =>
                  handleOptionChange(event, index, optionIndex)
                }
              />
            </label>
          ))}
          <br />
          <label>
            Answer:
            <select
              value={question.answer}
              onChange={(event) => handleInputChange(event, index)}
              name="answer"
            >
              {question.options.map((option, optionIndex) => (
                <option key={optionIndex} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <br />
        </div>
      ))}
      <button type="button" onClick={handleAddQuestion}>
        Add Question
      </button>
      <br />
      <br />
      <button type="submit">Create Exam</button>
    </form>
  );
};

export default CreateExamForm;
