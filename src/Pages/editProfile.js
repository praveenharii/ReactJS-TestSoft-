import React , {useState} from 'react';
import { useLocation, useParams, useNavigate } from "react-router-dom";
import TopNavBar from './Topsidenavbar/dash-basicTop-bar-Tutor-admin-Routes'
import {
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";  




export default function EditProfile() {
  const location = useLocation();
  let navigate = useNavigate();
  const userData = location.state.userData;
  const [fname, setFname] = useState(userData.fname);
  const [lname, setLname] = useState(userData.lname);
  const [password, setPassword] = useState("");
  const { id } = useParams();
  const token = localStorage.getItem("token");
  
 

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/updateProfile/${id}`, {
      /* sending login-user API*/
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fname,
        lname,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");

        if (data.data === "User Exists") {
          alert("First name exists, try different..");
        }
        if (data.status === "ok") {
          alert("Updated Successfully");
          localStorage.setItem("token", data.token);
          //window.location.href = "../Dashboard";
          localStorage.setItem("updatedProfileData", JSON.stringify(data.data));
          console.log(data.data);
          //navigate("/dashboard");
        } else {
          alert(data.err);
        }
      });
      
  };

  return (
    <>
      {/* <AdminSidebar userData={userData} /> */}
      <TopNavBar />
    
        <div>
          Second auto-column
          <div>
            <MDBRow className="g-2">
              <MDBCol size="3">3 of 12</MDBCol>
              <MDBCol size="5">
                5 of 12
                <div className="auth-inner">
                  <form onSubmit={handleSubmit}>

                    <h3>Update Profile</h3>

                    <div className="mb-3">
                      <label>First name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First name"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label>Last name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last name"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                        required
                      />
                    </div>
                    {/* 
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div> */}

                    <div className="mb-3">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary">
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </MDBCol>
              <MDBCol size="4">4 of 12</MDBCol>
            </MDBRow>
          </div>
        </div>
     
    </>
  );
};
