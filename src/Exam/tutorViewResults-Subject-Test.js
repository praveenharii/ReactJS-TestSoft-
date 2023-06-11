import React, { useState, useEffect } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import TutorTopbar from "../Pages/Topsidenavbar/dash-basicTop-bar-Tutor-Routes";

export default function tutorViewResultsSubjectTest() {
  let userId = null;
  const token = window.localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  userId = decodedToken.userId;
  const [data, setData] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    viewTest();
  }, []);

  const viewTest = async () => {
    fetch(`http://localhost:5000/getSubjectAndTestNames/${userId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setData(data.data);
        setSelectedSubject(data.data[0].subject); // Set the first subject as the initially selected subject
      });
  };

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
  };

  const handleNavigateTOviewResults = (subject, testId) => {
    console.log(subject, testId);
    navigate(`/dashboard/viewResultsTestsLists/${subject}/${testId}`);
  };

  const handleDownloadTest = async (subjectName, testName) => {
    try {
      const response = await fetch(
        `http://localhost:5000/downloadResults/${subjectName}/${testName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const blob = await response.blob();

        // Extract the filename from the response headers
        const contentDispositionHeader = response.headers.get(
          "Content-Disposition"
        );
        const filename = contentDispositionHeader
          ? contentDispositionHeader.split("filename=")[1]
          : "result.csv";

        // Create a temporary anchor element
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;

        // Simulate a click on the anchor element to start the download
        link.click();

        // Clean up
        link.remove();

        alert("Result downloaded successfully");
      } else {
        throw new Error("Failed to download the results");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred while downloading the results");
    }
  };

 return (
   <>
    <TutorTopbar />
      <br />
     <div>
       <MDBRow className="g-2">
         <MDBCol size="2">2 of 12</MDBCol>
         <MDBCol size="8">
           <div className="auth-wrapper" style={{ height: "auto" }}>
             <div className="auth-inner" style={{ width: "auto" }}>
               <div>
                 <h3>List Of Tests</h3>
                 <Nav
                   variant="tabs"
                   activeKey={selectedSubject}
                   onSelect={handleSelectSubject}
                 >
                   {data.map((subject, index) => (
                     <Nav.Item key={index}>
                       <Nav.Link eventKey={subject.subject}>
                         {subject.subject} Tests
                       </Nav.Link>
                     </Nav.Item>
                   ))}
                 </Nav>
               </div>
               <div>
                 {data.map((subject) => {
                   if (subject.subject === selectedSubject) {
                     return (
                       <MDBTable striped>
                         <MDBTableHead dark>
                           <tr>
                             <th scope="col">#</th>
                             <th scope="col">Test Name</th>
                             <th scope="col">Actions</th>
                           </tr>
                         </MDBTableHead>
                         <MDBTableBody>
                           {subject.tests.map((test, index) => (
                             <tr key={index}>
                               <th scope="row">{index + 1}</th>
                               <td>{test.testName}</td>
                               <td>
                                 <MDBBtn
                                   style={{
                                     width: "80px",
                                     marginRight: "10px",
                                   }}
                                   color="primary"
                                   onClick={() =>
                                     handleNavigateTOviewResults(
                                       subject.subject,
                                       test.testId
                                     )
                                   }
                                 >
                                   View Results
                                 </MDBBtn>
                                 <MDBBtn
                                   style={{ width: "120px" }}
                                   color="success"
                                   onClick={() =>
                                     handleDownloadTest(
                                       subject.subject,
                                       test.testName
                                     )
                                   }
                                 >
                                   Download
                                 </MDBBtn>
                               </td>
                             </tr>
                           ))}
                         </MDBTableBody>
                       </MDBTable>
                     );
                   }
                   return null;
                 })}
               </div>
             </div>
           </div>
         </MDBCol>
       </MDBRow>
     </div>
   </>
 );

}
