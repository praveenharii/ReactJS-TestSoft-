import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";


function ViewTest({}) {
  const [data, setData] = useState([]);
  const { subject } = useParams();
  //const { subject } = match.params;

  useEffect(() => {
    fetch(`http://localhost:5000/subjects/${subject}/tests`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setData(data.data);
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [subject]);

  // async function fetchSubjects() {
  //   const response = await fetch("/subjects");
  //   const data = await response.json();
  //   setSubjects(data.subjects);
  //}

  //fetchSubjects();
  //  }, []);

  return (
    <div>
      <h2>All Test for {subject}</h2>
      <div className="auth-wrapper">
        <div className="auth-inner">
      <ul>
        {data.map((i) => (
          <li key={i._id}>
            <td>{i.name}</td>
            <p>Date: {i.date}</p>
            <p>Time Limit: {i.timeLimit} Minutes</p>
            <Link to={`http://localhost:5000/subjects/${subject}/tests/${i._id}`}>Click here To View Test</Link>
          </li>
        ))}
      </ul></div></div>
    </div>
  );
}

export default ViewTest;
