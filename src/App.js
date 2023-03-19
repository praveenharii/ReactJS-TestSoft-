import React from 'react'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Login from './Components/login';
import SignUp from './Components/signup';
import Dashboard from './Components/dashboard';
import ResetPassword from './Components/resetpassword';
import ViewUsers from './Components/ViewUsers';


function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={isLoggedIn === "true" ? <Dashboard /> : <Login />}
          />

          <Route path="/sign-in" element={<Login />} />
          <Route path="/forgot-password" element={<ResetPassword />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/getAllUsers" element={<ViewUsers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App

//  <nav className="navbar navbar-expand-lg navbar-light fixed-top">
//           <div className="container">
//             <Link className="navbar-brand" to={'/sign-in'}>
//               TestSoft
//             </Link>
//             <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
//               <ul className="navbar-nav ml-auto">
//                 <li className="nav-item">
//                   <Link className="nav-link" to={'/sign-in'}>
//                     Login
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to={'/sign-up'}>
//                     Sign up
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </nav>

{/* <div className="auth-wrapper ">
          <div className="auth-inner"></div> 
        */}