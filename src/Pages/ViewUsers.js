
import React, {useEffect, useState } from 'react';
import {faTrash} from  "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from 'react-router-dom';
import createUser from './createUser';


export default function ViewUsers() {
     const [data, setData] = useState([]);
    //  const [userType, setUserType] = useState("");
  
     useEffect(() => {
       getAlluser();
    }, []);

     

    const getAlluser = () =>{
      fetch("http://localhost:5000/getAllUsers", {
                     method: "GET",
                   })
                   .then((res) => res.json())
                   .then((data) => {
                    console.log(data, "userData");
                    setData(data.data);
                    //setUserType(data.data.userType);
     });
    }

   

     const logOut = () => {
       window.localStorage.clear();
       window.location.href = "../sign-in";
     };

     const deleteUser = (id,name) => {
      if(window.confirm(`Please Click Ok if you want to delete user ${name}`)){
        fetch("http://localhost:5000/deleteUser", {
        method: "DELETE",
                     crossDomain: true,
                     headers: {
                       "Content-Type": "application/json",
                       Accept: "application/json",
                       "Access-Control-Allow-Origin": "*",
                     },
                     body: JSON.stringify({
                       userid: id,
                       
                     }),
                   })
                     .then((res) => res.json())
                     .then((data) => {
                      alert(data.data);
                      getAlluser();
                     });
      }else{
        
      }
     };

 return (
   <div className="auth-wrapper" style={{ height: "auto" }}>
     <div className="auth-inner" style={{ width: "auto" }}>
       <h3>Welcome Admin</h3>

       <Link
         to={{
           pathname: "/dashboard/getAllUsers/createUser",
         }}
         className="btn btn-primary"
       >
         createUser
       </Link>
       <table style={{ width: 500 }}>
         <thead>
           <tr>
             <th>Name</th>
             <th>Email</th>
             <th>User Type</th>
             <th>Delete</th>
           </tr>
         </thead>
         {data.map((i) => {
           return (
             <tbody>
               <tr>
                 <td key={i}>
                   {i.fname} {i.lname}
                 </td>
                 <td>{i.email}</td>
                 <td>{i.userType}</td>
                 <td>
                   <FontAwesomeIcon
                     center
                     icon={faTrash}
                     onClick={() => deleteUser(i._id, i.fname)}
                   />
                 </td>
               </tr>
             </tbody>
           );
         })}
       </table>

       <button onClick={logOut} className="btn btn-primary">
         Log Out
       </button>
       <Link
         to={{
           pathname: "/dashboard",
         }}
         className="btn btn-primary"
       >
         Dashboard
       </Link>
     </div>
   </div>
 );
}
