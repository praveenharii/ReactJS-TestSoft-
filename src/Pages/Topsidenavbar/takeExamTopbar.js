import React from "react";
import { MDBNavbar, MDBContainer, MDBNavbarBrand } from "mdb-react-ui-kit";

export default function App() {
  return (
    <>
      <MDBNavbar sticky light bgColor="light">
        <MDBContainer fluid className="d-flex justify-content-center">
          <MDBNavbarBrand href="#">Test Page</MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}
