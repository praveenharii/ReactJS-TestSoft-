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
  //const [phoneNumber, setphoneNumber] = (userData.phoneNumber)
  const [email, setEmail] = useState(userData.email);
  console.log(userData);
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const phoneNumber = userData.phoneNumber
  const userType = userData.userType;
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [postcode, setPostcode] = useState("");
  const [state, setState] = useState("");
  const [area, setArea] = useState("");
  const [education, setEducation] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [experience, setExperience] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
console.log(userData.phoneNumber);
  const handleSaveProfile = () => {
    // Handle saving profile data
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatchError(false);
  };

  const handleRetypePasswordChange = (e) => {
    setRetypePassword(e.target.value);
    setPasswordMatchError(false);
  };
 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== retypePassword) {
      setPasswordMatchError(true);
      return;
    }

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
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <span className="font-weight-bold">Welcome {userType}</span>
              <img
                className="rounded-circle mt-5"
                width="150px"
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                alt="Profile"
              />
              <span className="font-weight-bold">
                {fname} {lname}
              </span>
              <span className="text-black-50">{email}</span>
              <span className="text-black-50">{phoneNumber}</span>
            </div>
          </div>
          <div className="col-md-8 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mt-3">
                {/* <div className="col-md-12">
                  <label className="labels">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => setphoneNumber(e.target.value)}
                  />
                </div> */}

                <div className="col-md-12">
                  <label className="labels">Email ID</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter email ID"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {userData.userType === "Student" && (
                  <div className="col-md-12">
                    <label className="labels">Education</label>
                    <select
                      className="form-control"
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                    >
                      <option value="">Select educational level</option>
                      <option value="Form 1">Form 1</option>
                      <option value="Form 2">Form 2</option>
                      <option value="Form 3">Form 3</option>
                      <option value="Form 4">Form 4</option>
                      <option value="Form 5">Form 5</option>
                    </select>
                  </div>
                )}
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label className="labels">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Retype Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Retype Password"
                    onChange={(e) => setRetypePassword(e.target.value)}
                  />
                </div>
              </div>
              {passwordMatchError && (
                <div className="alert alert-danger mt-3">
                  Passwords do not match. Please retype them correctly.
                </div>
              )}
              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button"
                  type="button"
                  onClick={handleSubmit}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
          {/* <div className="col-md-4">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center experience">
                <span>Edit Experience</span>
                <span
                  className="border px-3 p-1 add-experience"
                  onClick={handleAddExperience}
                >
                  <i className="fa fa-plus"></i>&nbsp;Experience
                </span>
              </div>
              <br />
              <div className="col-md-12">
                <label className="labels">Experience in Designing</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
              </div>
              <br />
              <div className="col-md-12">
                <label className="labels">Additional Details</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Additional details"
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};
