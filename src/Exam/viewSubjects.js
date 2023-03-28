import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ViewSubject() {
  const [data, setData] = useState([]);

  useEffect(() => {
            fetch("http://localhost:5000/subjects", {
                     method: "GET",
                   })
                   .then((res) => res.json())
                   .then((data) => {
                    console.log(data, "Subjects");
                    setData(data.data);
                   });
                   
                },[]);

    
    // async function fetchSubjects() {
    //   const response = await fetch("/subjects");
    //   const data = await response.json();
    //   setSubjects(data.subjects);
    //}
    
    //fetchSubjects();
//  }, []);

  return (
    <div> 
      <h2>All Subjects:</h2>
      <div className="auth-wrapper">     
        <div className="auth-inner">
          <ul>
            {data.map((i) => (
              <li key={i._id}>
                <Link to={`/subjects/${i.name}/tests`}>{i.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ViewSubject;
