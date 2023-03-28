import React , {useState} from 'react';
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Dashboard from './dashboard';
  

export default function EditProfile() {
        let navigate = useNavigate();
        const [fname ,setFname] =  useState("");
        const [lname ,setLname] =  useState("");
        //const [email, setEmail] = useState("");
        const  location  = useLocation();
        const { id } = useParams();
        console.log(id);
        //const { id } = location;
        //const id  = location.state;
        //const {Id} = useParams(id);
        //const userID = useLocation().state.ID;
        //console.log(id["UserID"]);
        //const ID = id["UserID"];
        //console.log("User ID" , userID);
        const token = localStorage.getItem("token");
        const [password, setPassword] = useState("");
        // const location = useLocation();
        // const {_id} = location.state;
       

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
             "Authorization": `Bearer ${token}`
           },
           body: JSON.stringify({
             fname,
             lname,
             password
           }),
         })
           .then((res) => res.json())
           .then((data) => {
           
             console.log(data, "userUpdate");

             if (data.data === "User Exists"){
              alert("First name exists, try different..");
              }
             if (data.status === "ok") {
               alert("Updated Successfully");
               window.localStorage.setItem(
                 "token",
                 data.data
               ); 
               //window.location.href = "../Dashboard";
               localStorage.setItem(
                 "updatedProfileData",
                 JSON.stringify(data.data)
                 
               );
                navigate("/dashboard");
             }
           else{
              
                 alert(data.err);
             }
             
           });
}

    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <button
              type="button"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Dashboard
            </button>
            <h3>Update Profile</h3>
            
            <div className="mb-3">
              <label>First name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
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
      </div>
    );
};
