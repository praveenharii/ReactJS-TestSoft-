import React, {lazy , Suspense} from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router';
import jwt_decode from 'jwt-decode';
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
import ViewQuestions from './Exam/viewQuestions';
import TutorEditTestQuestions from './Exam/tutorEditQuestions';
import AdminViewTestsList from "./Exam/viewResults-Subject-Test";
import AdminViewAllStudentResults from './Exam/viewResults-Test-allStudentResults';
import AdminApproveUser from './Pages/adminUserApproval';
import TutorViewSubjectsAndTests from './Exam/tutorViewSubjects-Test';
import TutorViewStudentResults from './Exam/tutorViewResults-Subject-Test';
import TutorViewUsers from './Pages/tutorViewUsers';
import StudentTakeTest from './Exam/studentTakeTest';
import StudentViewResults from './Exam/studentViewResults';
import SubjectTests from './Exam/studentViewTest';
import Spinner from './Components/LoaderSpinner';
import { Alert } from 'react-bootstrap';
const Dashboard = lazy(() => import("./Pages/dashboard"));
const baseUrl = require("./config");

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  const token = window.localStorage.getItem('token');
  let userType = null;

  const useAuth = () => {
  if (token) {
     const decodedToken = jwt_decode(token);
    userType = decodedToken.userType;
    return { isLoggedIn: true, userType: userType };
  }
}

  //  setInterval(async () => {
  //    try {
  //      await axios.get(`${baseUrl}/ping`); // Send a request to the server to keep the connection active
  //    } catch (error) {
  //      // Handle error
  //      alert("Internet Connection Cut")
  //      console.log("Internet connection cut");
  //    }
  //  }, 15000);

  const ProtectedRoutes = () => {
    const { isLoggedIn, userType } = useAuth();
    const allowedUserTypes = ["Admin"];
    return isLoggedIn && allowedUserTypes.includes(userType) ? (
      <Outlet />
    ) : (
      <Navigate to="/" />
    );
  };

  const TutorProtectedRoutes = () => {
    const { isLoggedIn, userType } = useAuth();
    const allowedUserTypes = ["Tutor"];
    return isLoggedIn && allowedUserTypes.includes(userType) ? (
      <Outlet />
    ) : (
      <Navigate to="/" />
    );
  };

  
  return (
    <Router>
      <Suspense fallback={<Spinner />}>
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
          
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/dashboard/getAllUsers" element={<ViewUsers />} />
          </Route>
          <Route
            path="/dashboard/updateProfile/:id"
            element={<EditProfile />}
          />
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/dashboard/createUser" element={<CreateUser />} />
          </Route>
          <Route path="/" element={<TutorProtectedRoutes />}>
            <Route path="/dashboard/createExam" element={<CreateExamForm />} />
          </Route>
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="dashboard/subjects" element={<ViewSubject />} />
          </Route>
          <Route path="/" element={<TutorProtectedRoutes />}>
            <Route
              path="/subjects/:id"
              element={<TutorViewSubjectsAndTests />}
            />
          </Route>
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/subjects/:subject/tests" element={<ViewTest />} />
          </Route>
          <Route
            path="/subjects/:subject/tests/:testid"
            element={<ViewQuestions />}
          />
          <Route path="/dashboard/SubjectTests" element={<SubjectTests />} />
          <Route
            path="/dashboard/SubjectTests/:subjectname/:taketestid"
            element={<StudentTakeTest />}
          />
          <Route path="/" element={<TutorProtectedRoutes />}>
            <Route
              path="/subjects/:testname/editQuestions/:testid"
              element={<TutorEditTestQuestions />}
            />
          </Route>
          TutorViewUsers
          <Route path="/" element={<TutorProtectedRoutes />}>
            <Route
              path="/dashboard/tutorViewUsers"
              element={<TutorViewUsers />}
            />
          </Route>
          <Route
            path="/dashboard/viewTestResults"
            element={<StudentViewResults />}
          />
          <Route path="/" element={<ProtectedRoutes />}>
            <Route
              path="/dashboard/adminApproveUser"
              element={<AdminApproveUser />}
            />
          </Route>
          <Route path="/" element={<ProtectedRoutes />}>
            <Route
              path="/dashboard/viewResultsTestsLists"
              element={<AdminViewTestsList />}
            />
          </Route>
          <Route path="/" element={<ProtectedRoutes />}>
            <Route
              path="/dashboard/viewResultsTestsLists/:subject/:testId"
              element={<AdminViewAllStudentResults />}
            />
          </Route>
          <Route path="/" element={<TutorProtectedRoutes />}>
            <Route
              path="/dashboard/tutorViewStudentResults/:userId"
              element={<TutorViewStudentResults />}
            />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
export default App



