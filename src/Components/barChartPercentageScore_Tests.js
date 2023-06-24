import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

export default function BarChartPercentageScoreTests({ userId }) {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [studentResults, setStudentResults] = useState([]);

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
  };

  useEffect(() => {
    const fetchStudentResults = async () => {
      try {
        const response = await fetch(`${process.env.BASE_URL}/getStudentResults`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        const data = await response.json();

        if (response.ok) {
          setStudentResults(data.studentResults);
        } else {
          console.log(data);
          throw new Error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudentResults();
  }, [userId]);

  const processData = (data) => {
    const groupedData = {};
    data.forEach((result) => {
      const { subject, testname, percentageScore } = result;
      if (!groupedData[subject]) {
        groupedData[subject] = [];
      }
      groupedData[subject].push({ name: testname, Score: percentageScore });
    });
    return groupedData;
  };

  const data = processData(studentResults);
  const filteredData = selectedSubject ? data[selectedSubject] : [];

  return (
    <div>
      <h3>Tests Results</h3>
      <Nav
        variant="tabs"
        activeKey={selectedSubject}
        onSelect={handleSelectSubject}
      >
        {Object.keys(data).map((subject, index) => (
          <Nav.Item key={index}>
            <Nav.Link eventKey={subject}>{subject} Tests</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <BarChart
        width={900}
        height={300}
        data={filteredData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        barSize={20}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="Score" fill="#8884d8" background={{ fill: "#eee" }} />
      </BarChart>
    </div>
  );
}
