import React, { useState,useEffect } from "react";

export default function AdminViewResults() {
  const [data, setData] = useState([]);

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
        setData(data, "allStudentResults");
        console.log(data);
      });
    
  }

  return (
    <div>
      
    </div>
  )
}
