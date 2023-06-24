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
  const [error, setError] = useState(false);

  useEffect(() => {
    viewTest();
  }, []);

  const viewTest = async () => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}/getSubjectAndTestNames/${userId}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(data.data);
      if (data.data && data.data.length > 0) {
        setData(data.data);
        setSelectedSubject(data.data[0].subject); // Set the first subject as the initially selected subject
      }
       if (data.data.length <= 0) {
         setError(true);
       }
       else{
        console.error(error);
        //setError(true);
       }
    } catch (error) {
      console.error(error);
      setError(true);
      // Handle the error here, such as showing an error message to the user
    }
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
        `${process.env.BASE_URL}/downloadResults/${subjectName}/${testName}`,
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
         <MDBCol size="2"></MDBCol>
         <MDBCol size="8">
           <div className="auth-wrapper" style={{ height: "auto" }}>
             <div className="auth-inner" style={{ width: "auto" }}>
               <div>
                 <h3>List Of Tests</h3>
                 {error ? (
                   <div className="alert alert-danger mt-3">
                     No Students has taken Test yet.
                   </div>
                 ) : (
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
                 )}
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
