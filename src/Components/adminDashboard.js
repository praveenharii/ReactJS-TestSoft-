import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function AdminDashboard({ userData }) {
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link to="/getAllUsers">View Users</Link>
          </li>
          {/* Add more links as needed */}
        </ul>
      </nav>
    </div>
  );
}
