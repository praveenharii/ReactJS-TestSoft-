import React, {lazy , Suspense} from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

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
import SubjectTests from './Exam/studentViewTest';
import StudentTakeTest from './Exam/studentTakeTest';
import AdminViewResults from "./Exam/adminViewResults";
import StudentViewResults from './Exam/studentViewResults';
import AdminEditTestQuestions from './Exam/adminEditQuestions';

const Dashboard = lazy(() => import("./Pages/dashboard"));


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

   

  const ProtectedRoutes = () => {
    const { isLoggedIn, userType } = useAuth();
    const allowedUserTypes = ["Admin", "Tutor"];
    return isLoggedIn && allowedUserTypes.includes(userType) ? (
      <Outlet />
    ) : (
      <Navigate to="/" />
    );
  };

  
  return (
    <Router>
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

          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/dashboard/getAllUsers" element={<ViewUsers />} />
          </Route>

          <Route
            path="/dashboard/updateProfile/:id"
            element={<EditProfile />}
          />

          <Route path="/" element={<ProtectedRoutes />}>
            <Route
              path="/dashboard/getAllUsers/createUser"
              element={<CreateUser />}
            />
          </Route>

          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/dashboard/createExam" element={<CreateExamForm />} />
          </Route>

          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/subjects" element={<ViewSubject />} />
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

          <Route path="/" element={<ProtectedRoutes />}>
            <Route
              path="/dashboard/viewAllStudentResults"
              element={<AdminViewResults />}
            />
          </Route>

          <Route path="/" element={<ProtectedRoutes />}>
            <Route
              path="/subjects/:testname/editQuestions/:testid"
              element={<AdminEditTestQuestions />}
            />
          </Route>

          <Route
            path="/dashboard/viewTestResults"
            element={<StudentViewResults />}
          />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
export default App



