
import { React, useEffect, useState } from 'react';


export default function ViewUsers() {
     const [data, setData] = useState([]);
    

     useEffect(() => {
        fetch("http://localhost:5000/getAllUsers", {
                     method: "GET",
                   })
                   .then((res) => res.json())
                   .then((data) => {
                    console.log(data, "userData");
                    setData(data.data);
     });
    }, []);

     const logOut = () => {
       window.localStorage.clear();
       window.location.href = "./sign-in";
     };

 return (
   <div className="auth-wrapper" style={{ height: "auto" }}>
     <div className="auth-inner" style={{ width: "auto" }}>
       <h3>Welcome Admin</h3>
       <table style={{ width: 500 }}>
         <tr>
           <th>Name</th>
           <th>Email</th>
           <th>User Type</th>
           <th>Delete</th>
         </tr>
         {data.map((i) => {
           return (
             <tr>
               <td>{i.fname}</td>
               <td>{i.email}</td>
               <td>{i.userType}</td>
               <td>
                 {/* <FontAwesomeIcon
                   icon={faTrash}
                   onClick={() => deleteUser(i._id, i.fname)}
                 /> */}
               </td>
             </tr>
           );
         })}
       </table>
       <button onClick={logOut} className="btn btn-primary">
         Log Out
       </button>
     </div>
   </div>
 );
}
