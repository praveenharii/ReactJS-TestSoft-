import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { BiRadioCircleMarked } from "react-icons/bi";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
export default function ViewQuestions() {
  const [data, setData] = useState([]);
  const { subject, testid } = useParams();
  

 

  // //const { subject } = match.params;
  // const deleteQuestion = (id, question) => {
  //   if (
  //     window.confirm(`Please Click Ok if you want to delete this question ${question}`)
  //   ) {
  //     fetch("http://localhost:5000/deleteQuestion", {
  //       method: "DELETE",
  //       crossDomain: true,
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //       body: JSON.stringify({
  //         questionid: id,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         alert(data.data);
  //         console.log(data);
  //       });
  //   } else {
  //   }
  // };

  useEffect(() => {
    fetch(`http://localhost:5000/subjects/${subject}/tests/${testid}`, {
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
      <div className="auth-wrapper" style={{ height: "auto" }}>
        <div className="auth-inner" style={{ width: "auto" }}>
          <h3>All Questions:</h3>
          <h3>{data.id}</h3>
          <h3>{data.name}</h3>
          <h3>{data.date}</h3>
          <h3>{data.timeLimit}</h3>
          {data.questions ? (
            <Table bordered hover>
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
                        <div key={optionIndex}>
                          <BiRadioCircleMarked />
                          {option}
                        </div>
                      ))}
                    </td>
                    <td>
                      {question.options.indexOf(question.answer) !== -1 ? (
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="text-success"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          className="text-danger"
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
        </div>
      </div>
    </div>
  );
}



{/* <table className="centered" style={{ width: 350 }}>
            <tbody>
              {data.questions.map((question, index) => (
                <tr key={index}>
                  <td>{question.question}</td>
                  
                 
                </tr>
              ))}
            </tbody>
          </table> */}



//  <td>
//                       <FontAwesomeIcon
//                         center
//                         icon={faTrash}
//                         onClick={() => deleteTest(i._id, i.questionid)}
//                       />
//                     </td>
