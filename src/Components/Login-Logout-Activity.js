import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";


export default function LoginLogoutActivity() {
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/activity-data`)
      .then((response) => response.json())
      .then((data) => setActivityData(data))
      .catch((error) => console.log(error));
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Extract only the date portion
  };

  return (
    <LineChart width={600} height={400} data={activityData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" tickFormatter={formatDate} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="logins"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line
        type="monotone"
        dataKey="logouts"
        stroke="#82ca9d"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
}
