import React from "react";
import { MDBSpinner } from "mdb-react-ui-kit";

export default function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        //height: "100vh",
        width: "100%",
      }}
    >
      <MDBSpinner role="status">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    </div>
  );
}
