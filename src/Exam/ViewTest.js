import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import {
  faTrash,
  faSquareArrowUpRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MDBBtn } from "mdb-react-ui-kit";

export default function ViewTest() {
  const [data, setData] = useState([]);
  const { subject } = useParams();
  let navigate = useNavigate();


     useEffect(() => {
       getAllTest();
     }, []);

    
  const getAllTest = () => {
    fetch(`http://localhost:5000/subjects/${subject}/tests`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setData(data.data);
          console.log(data.data);
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteTest = (id, name) => {
    if (
      window.confirm(`Please click OK if you want to delete subject ${name}`)
    ) {
      fetch(`http://localhost:5000/deleteTest/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message);
          getAllTest();
          console.log(data);
        })
        .catch((error) => {
          console.error("Error deleting test:", error);
        });
    }
  };


 



 

  return (
    <div className="auth-wrapper" style={{ height: "auto" }}>
      <div className="auth-inner" style={{ width: "auto" }}>
        <h3>All Tests:</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Test Name</th>
              <th>Created By</th>
              <th>Date Created</th>
              <th>Available Until</th>
              <th>View Questions</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((test) => (
              <tr key={test._id}>
                <td>{test.name}</td>
                <td>{test.createdBy}</td>
                <td>{new Date(test.createdAt).toLocaleString()}</td>
                <td>{new Date(test.date).toLocaleString()}</td>
                <td>
                  <MDBBtn
                    onClick={() => {
                      navigate(`/subjects/${subject}/tests/${test._id}`);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faSquareArrowUpRight}
                      className="me-2"
                    />
                    View Questions
                  </MDBBtn>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => deleteTest(test._id, test.name)}
                  >
                    <FontAwesomeIcon icon={faTrash} className="me-2" />
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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
