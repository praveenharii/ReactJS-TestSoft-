import React from "react";
import { MDBNavbar, MDBContainer, MDBNavbarBrand } from "mdb-react-ui-kit";

export default function App() {
  return (
    <>
      <MDBNavbar sticky light bgColor="dark">
        <MDBContainer fluid className="d-flex justify-content-center">
          <MDBNavbarBrand className="text-white">
            Test Page
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}
