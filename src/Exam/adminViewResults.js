import React, { useState,useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { MDBCol, MDBRow, MDBBtn } from "mdb-react-ui-kit";

import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";
export default function AdminViewResults() {
  const [data, setData] = useState([]);
  // const location = useLocation();
  // let navigate = useNavigate();
  // const userData = location.state.userData;
  const [groupedData, setGroupedData] = useState({});
  // console.log(userData);
  useEffect(() => {
    ViewAllStudentresult();
  }, []);

  const ViewAllStudentresult = () => {
    fetch("http://localhost:5000/getAllStudentResults", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setData(data.data, "allStudentResults");
        const groupedData = data.data.reduce((groups, item) => {
        if (!groups[item.subject]) {
          groups[item.subject] = [];
        }
        groups[item.subject].push(item);
        return groups;
      }, {});
      setGroupedData(groupedData);
      console.log(data);
    });
     
  }



  return (
    <>
      {/* <AdminSidebar userData={userData} /> */}

      <div>
        <MDBRow className="g-2">
          <MDBCol size="3">3 of 12</MDBCol>
          <MDBCol size="5">
            <h1>Student Results</h1>
            <div className="auth-wrapper" style={{ height: "auto" }}>
              <div className="auth-inner" style={{ width: "auto" }}>
                {data &&
                  Object.entries(
                    data.reduce((groups, item) => {
                      if (!groups[item.subject]) {
                        groups[item.subject] = [];
                      }
                      groups[item.subject].push(item);
                      return groups;
                    }, {})
                  ).map(([subject, results], index) => (
                    <div key={index}>
                      <h2>{subject} Results</h2>
                      <MDBTable>
                        <MDBTableHead dark>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Test Name</th>
                            <th scope="col">Percentage Score</th>
                            <th scope="col">Date/Time</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                          {results.map((result, index) => (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{result.username}</td>
                              <td>{result.subject}</td>
                              <td>{result.percentageScore.toFixed(2)}</td>
                              <td>
                                {new Date(result.date).toLocaleDateString()}{" "}
                                {new Date(result.date).toLocaleTimeString()}
                              </td>
                              <td>
                                <MDBBtn
                                  style={{ width: "80px" }}
                                  color="warning"
                                  margin="100px"
                                >
                                  Edit
                                </MDBBtn>
                                
                                
                                <MDBBtn
                                  style={{ width: "80px" }}
                                  color="danger"
                                >
                                  Delete
                                </MDBBtn>
                              </td>
                            </tr>
                          ))}
                        </MDBTableBody>
                      </MDBTable>
                    </div>
                  ))}
              </div>
            </div>
          </MDBCol>

          <MDBCol size="4">Any cards</MDBCol>
        </MDBRow>
      </div>
    </>
  );
}
