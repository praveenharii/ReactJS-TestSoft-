import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  faTrash,
  faSquareArrowUpRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ViewTest() {
  const [data, setData] = useState([]);
  const { subject } = useParams();
  let navigate = useNavigate();

  //const { subject } = match.params;
   const deleteTest = (id, name) => {
     if (
       window.confirm(`Please Click Ok if you want to delete subject ${name}`)
     ) {
       fetch("http://localhost:5000/deleteTest", {
         method: "DELETE",
         crossDomain: true,
         headers: {
           "Content-Type": "application/json",
           Accept: "application/json",
           "Access-Control-Allow-Origin": "*",
         },
         body: JSON.stringify({
           testid: id,
         }),
       })
         .then((res) => res.json())
         .then((data) => {
           alert(data.data);
           //getAllTest();
           console.log(data);
         });
     } else {
     }
   }; 



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

 

  return (
    <div>
      <div className="auth-wrapper" style={{ height: "auto" }}>
        <div className="auth-inner" style={{ width: "auto" }}>
          <h3>All Test:</h3>
          <table class="centered" style={{ width: 350 }}>
            <thead>
              <tr>
                <th>Test Name</th>
                <th>View Test</th>
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
                          navigate(`/subjects/${subject}/tests/${i._id}`);
                        }}
                      />
                    </td>

                    <td>
                      <FontAwesomeIcon
                        center
                        icon={faTrash}
                        onClick={() => deleteTest(i._id, i.name)}
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


  //  <div>
  //     <h2>All Test for {subject}</h2>
  //     <div className="auth-wrapper">
  //       <div className="auth-inner">
  //         <ul>
  //           {data.map((i) => (
  //             <li key={i._id}>
  //               <td>{i.name}</td>
  //               <p>Date: {i.date}</p>
  //               <p>Time Limit: {i.timeLimit} Minutes</p>
  //               <Link
  //                 to={`http://localhost:5000/subjects/${subject}/tests/${i._id}`}
  //               >
  //                 Click here To View Test
  //               </Link>
  //             </li>
  //           ))}
  //         </ul>
  //       </div>
  //     </div>
  //   </div>
