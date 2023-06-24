import React , {useState} from 'react';
import { useLocation, useParams, useNavigate } from "react-router-dom";
import AdminTopNavBar from './Topsidenavbar/dash-basicTop-bar-Tutor-admin-Routes'
import StudentTopNavBar from './Topsidenavbar/dash-basicTop-bar-Students-Routes'
import TutorTopNavBar  from './Topsidenavbar/dash-basicTop-bar-Tutor-Routes';
import { MDBCol, MDBRow, MDBBtn } from "mdb-react-ui-kit";  
import { useEffect } from 'react';
import { BsEye, BsEyeSlash } from "react-icons/bs";



export default function EditProfile() {
  const location = useLocation();
  let navigate = useNavigate();
  const userData = location.state.userData;
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  //const [phoneNumber, setphoneNumber] = (userData.phoneNumber)
  const [email, setEmail] = useState("");
  //console.log(userData);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypeNewPassword, setRetypeNewPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [Alert, setAlert] = useState(null);
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [phoneNumber,setPhoneNumber] = useState("");
  const userType = userData.userType;
  const [showPassword, setShowPassword] = useState(false);
  const [education, setEducation] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  

useEffect(() => {
  setFname(userData.fname);
  setLname(userData.lname);
  setEmail(userData.email);
  setPhoneNumber(userData.phoneNumber);
}, [userData])


  const handlePasswordChange = (e) => {
    setNewPassword(e);
    setPasswordMatchError(false);
  };

  const handleRetypePasswordChange = (e) => {
    setRetypeNewPassword(e);
    setPasswordMatchError(false);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };


  const checkCurrentPassword = (e) => {
    e.preventDefault();
     return fetch(`${process.env.REACT_APP_BASE_URL}/checkOldPassword/${email}/${oldPassword}`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         Accept: "application/json",
       },
     })
       .then((res) => res.json())
       .then((data) => {
         return data.status;
       })
       .catch((error) => {
         //console.error(error);
         throw error;
       });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();

     if (newPassword !== retypeNewPassword) {
       setPasswordMatchError(true);
       return;
     }

     const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    

      const requestBody = {
        fname,
        lname,
        phoneNumber,
      };

      if (changePassword && !newPassword) {
        setAlert("Password should not be empty!");
        return;
      }

     if (changePassword && newPassword) {
       
       if (!regularExpression.test(newPassword)) {
         setAlert(
           "Password should be between 6 to 16 characters and contain at least one digit and one special character."
         );
         return;
       }      
       requestBody.newPassword = newPassword;
     }
     console.log(newPassword);
     //localStorage.removeItem("token");
     fetch(`${process.env.REACT_APP_BASE_URL}/updateProfile/${id}`, {
       /* sending login-user API*/
       method: "POST",
       crossDomain: true,
       headers: {
         "Content-Type": "application/json",
         Accept: "application/json",
         "Access-Control-Allow-Origin": "*",
         Authorization: `Bearer ${token}`,
       },
       body: JSON.stringify(requestBody),
     })
       .then((res) => {
         const authorizationHeader = res.headers.get("authorization");
         if (authorizationHeader) {
           const newToken = authorizationHeader.split(" ")[1];
           localStorage.setItem("token", newToken);
         }
         return res.json();
       })
       .then((data) => {
         //console.log(data, "userData");

         if (data.data === "User Exists") {
           setAlert("First name exists, try different..");
         }
         if (data.status === "ok") {
          //  localStorage.setItem("token", data.token);
           localStorage.setItem(
             "updatedProfileData",
             JSON.stringify(data.data)
           );

           alert("Updated Successfully");
           navigate("/dashboard");
         } else {
           setAlert(data.err);
         }
       });

  }


  const handleSubmit = (e) => {
    e.preventDefault();

    if (changePassword) {
      checkCurrentPassword(e)
        .then((status) => {
          if (status === "ok") {
            handleUpdateProfile(e);
          } else {
            setAlert("Current password is incorrect.");
          }
        })
        .catch((error) => {
          //console.error(error);
          setAlert("An error occurred while checking the current password.");
        });
    } else {
      handleUpdateProfile(e);
    }
  };

  return (
    <>
      {userData.userType === "Student" ? (
        <StudentTopNavBar userData={userData} />
      ) : userData.userType === "Admin" ? (
        <AdminTopNavBar />
      ) : userData.userType === "Tutor" ? (
        <TutorTopNavBar />
      ) : null}
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
                <div className="col-md-12">
                  <label className="labels">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
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

              {changePassword && (
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">Current Password</label>
                    <div className="input-group mb-3">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Current Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-tertiary"
                          type="button"
                          onClick={toggleShowPassword}
                        >
                          {showPassword ? <BsEyeSlash /> : <BsEye />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="labels">New Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-tertiary"
                          type="button"
                          onClick={toggleShowPassword}
                        >
                          {showPassword ? <BsEyeSlash /> : <BsEye />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="labels">Retype New Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Retype Password"
                        value={retypeNewPassword}
                        onChange={(e) => setRetypeNewPassword(e.target.value)}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-tertiary"
                          type="button"
                          onClick={toggleShowPassword}
                        >
                          {showPassword ? <BsEyeSlash /> : <BsEye />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <MDBBtn
                className="btn btn-info mt-4 profile-button"
                type="button"
                onClick={() => setChangePassword(!changePassword)}
              >
                {changePassword ? "Cancel" : "Change Password"}
              </MDBBtn>
              {passwordMatchError && (
                <div className="alert alert-danger mt-3">
                  Passwords do not match. Please retype them correctly.
                </div>
              )}
              {Alert && <div className="alert alert-danger mt-3">{Alert}</div>}
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
