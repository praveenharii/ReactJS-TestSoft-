import React, { useState, useEffect } from "react";
import {
  faTrash,
  faSquareArrowUpRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import ViewTest from './ViewTest';

export default function ViewSubject() {
  const [data, setData] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    getAllSubject();
  }, []);

  const getAllSubject = () => {
    fetch("http://localhost:5000/subjects", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "Subjects");
        setData(data.data);
      });
  };



  const deleteSubject = (id, name) => {
    if (
      window.confirm(`Please Click Ok if you want to delete subject ${name}`)
    ) {
      fetch("http://localhost:5000/deleteSubject", {
        method: "DELETE",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          subjectid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getAllSubject();
          console.log(data);
          
        });
    } else {
    }
  };

  return (
    <div>
      <div className="auth-wrapper" style={{ height: "auto" }}>
        <div className="auth-inner" style={{ width: "auto" }}>
          <h3>All Subjects:</h3>
          <table class="centered" style={{ width: 350 }}>
            <thead>
              <tr>
                <th>Subject Name</th>
                <th>View Subject</th>
                <th>Delete</th>
              </tr>
            </thead>
            {data.map((i) => {
              return (
                <tbody>
                  <tr>
                    <td>{i.name}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faSquareArrowUpRight}
                        onClick={() => {
                          navigate(`/subjects/${i.name}/tests`);
                        }}
                      />
                    </td>

                    <td>
                      <FontAwesomeIcon
                        center
                        icon={faTrash}
                        onClick={() => deleteSubject(i._id, i.name)}
                      />
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}

// <ul>
//             {data.map((i) => (
//               <li key={i._id}>
//                 <Link to={`/subjects/${i.name}/tests`}>{i.name}</Link>

//                 <FontAwesomeIcon
//                   center
//                   icon={faTrash}
//                   onClick={() => deleteSubject(i._id, i.name)}
//                 />
//               </li>
//             ))}
//           </ul>


