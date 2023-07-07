import React from "react";
import { MDBSpinner } from "mdb-react-ui-kit";

export default function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <MDBSpinner
        grow
        className="mx-2"
        color="secondary"
        style={{ width: "4rem", height: "4rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    </div>
  );
}
