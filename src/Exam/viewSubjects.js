import React, { useState, useEffect } from "react";
import {
  faTrash,
  faSquareArrowUpRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { MDBBtn } from "mdb-react-ui-kit";

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
          alert(data.message);
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
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Subject Name</th>
                <th>View Test</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((i) => (
                <tr key={i._id}>
                  <td>{i.name}</td>
                  <td>
                    <MDBBtn
                      onClick={() => {
                        navigate(`/subjects/${i.name}/tests`);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faSquareArrowUpRight}
                        className="me-2"
                      />
                      View Test
                    </MDBBtn>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => deleteSubject(i._id, i.name)}
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
    </div>
  );
}



