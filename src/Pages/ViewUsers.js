
import React, {useEffect, useState, useRef } from 'react';
import {faTrash} from  "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from 'react-router-dom';
import ReactPaginate from "react-paginate";


export default function ViewUsers() {
     const [data, setData] = useState([]);
     const [limit, setLimit] = useState(5);
     const [pageCount, setPageCount] = useState(1);
     const currentPage = useRef();
     
    //  const [userType, setUserType] = useState("");
  
     useEffect(() => {
      currentPage.current=1;
      //  getAlluser();
       getPaginatedUsers();
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


     function handlePageClick(e){
      console.log(e);
      currentPage.current=e.selected+1;
      getPaginatedUsers();
     }

     function changeLimit(){
      currentPage.current=1;
      getPaginatedUsers();
     }

     function getPaginatedUsers(){
        fetch(
          `http://localhost:5000/paginatedUsers?page=${currentPage.current}&limit=${limit}`,
          {
            method: "GET",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "userData");
            setPageCount(data.pageCount)
            setData(data.result)
          });
     }



 return (
   <div className="auth-wrapper" style={{ height: "auto" }}>
     <div className="auth-inner" style={{ width: "auto" }}>
       <h3>Welcome Admin</h3>
       <Link
         to={{
           pathname: "/dashboard",
         }}
         className="btn btn-primary"
       >
         Dashboard
       </Link>
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
       </table> <br />

       <ReactPaginate
         breakLabel="..."
         nextLabel="next >"
         onPageChange={handlePageClick}
         pageRangeDisplayed={5}
         pageCount={pageCount}
         previousLabel="< previous"
         renderOnZeroPageCount={null}
         marginPagesDisplayed={2}
         containerClassName="pagination justify-content-center"
         pageClassName="page-item"
         pageLinkClassName="page-link"
         previousClassName="page-item"
         previousLinkClassName="page-link"
         nextClassName="page-item"
         nextLinkClassName="page-link"
         activeClassName="active"
         forcePage={currentPage.current-1}
       />
       <input placeholder='Limit' onChange={e=>setLimit(e.target.value)}/>
       <button onClick={changeLimit} >
         Set limit
       </button>

       <button onClick={logOut} className="btn btn-primary">
         Log Out
       </button>
     </div>
   </div>
 );
}
