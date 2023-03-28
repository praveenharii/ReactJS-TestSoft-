import React, {lazy , Suspense} from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './Pages/login';
import SignUp from './Pages/signup';
//import Dashboard from './Pages/dashboard';
import ResetPassword from './Pages/resetpassword';
import ViewUsers from './Pages/ViewUsers';
import EditProfile from './Pages/editProfile';
import CreateUser from './Pages/createUser';
import CreateExamForm from './Exam/createExam'
import ErrorPage from './Pages/ErrorPage'
import ViewSubject from './Exam/viewSubjects';
import ViewTest from "./Exam/ViewTest";


const Dashboard = lazy(() => import("./Pages/dashboard"));



function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
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

            <Route path="/dashboard/getAllUsers" element={<ViewUsers />} />

            <Route
              path="/dashboard/updateProfile/:id"
              element={<EditProfile />}
            />

            <Route
              path="/dashboard/getAllUsers/createUser"
              element={<CreateUser />}
            />
            <Route path="/createExam" element={<CreateExamForm />} />
            <Route path="/subjects" element={<ViewSubject />} />
            <Route path="/subjects/:subject/tests" element={<ViewTest />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
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

