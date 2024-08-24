import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/student pages/Home";
import NotFoundPage from "./Pages/student pages/NotFoundPage";
import KnowMore from "./Pages/student pages/KnowMore"; // Import KnowMore component
import ApplyNow from "./Pages/student pages/ApplyNow"; // Import ApplyNow component
import ApplyDetail from "./Pages/student pages/ApplyDetail"; // Import ApplyDetail component
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./Pages/student pages/LoginPage";
import CoursesPage from "./Pages/student pages/CoursesPage";
import InstitutePage from "./Pages/student pages/InstitutePage";
import KnowMoreInstitute from "./Components/student components/InstitutePage/KnowMoreInstitute";
import ApplyForm from "./Pages/student pages/ApplyPage/ApplyForm";
import PersonalDetails from "./Pages/student pages/ApplyPage/PersonalDetails";

// Admin Login Page
import AdminSignup from "./Pages/AdminPages/AdminSignup";
import AdminLogin from "./Pages/AdminPages/AdminLogin"
import AdminForgetPass from "./Pages/AdminPages/AdminForgetPass";
import AdminPassCode from "./Pages/AdminPages/AdminPassCode";
import AdminResetPass from "./Pages/AdminPages/AdminResetPass";

// Admin Dashboard Pages
import AdminDashboard from "./Pages/AdminPages/AdminDashboard";
import AdminSchool from "./Pages/AdminPages/AdminSchool";
import AdminStudent from "./Pages/AdminPages/AdminStudent";
import AdminCourses from "./Pages/AdminPages/AdminCourses";
import AdminCategory from "./Pages/AdminPages/AdminCategory";
import AdminSubject from "./Pages/AdminPages/AdminSubject";

//StudentPortal Page
import StudentPortalLogin from "./Pages/StudentPortalPages/StudentPortalLogin";
import StudentPortalForgetPassword from "./Pages/StudentPortalPages/StudentPortalForgetPassword";
import StudentPortalResetPassword from "./Pages/StudentPortalPages/StudentPortalResetPassword";
import StudentPortalSignUp from "./Pages/StudentPortalPages/StudentPortalSignUp";
import StudentPortalBasicInformations from "./Pages/StudentPortalPages/StudentPortalBasicInformations";
import StudentApplyCourse from "./Pages/StudentPortalPages/StudentApplyCourse";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/knowMore",
    element: <KnowMore />,
  },
  {
    path: "/applynow",
    element: <ApplyNow />,
  },
  {
    path: "/applynow/:applyId",
    element: <ApplyDetail />,
  },
  {
    path: "/applyDetail/:id",
    element: <ApplyDetail />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/courses",
    element: <CoursesPage />,
  },
  {
    path: "/institute",
    element: <InstitutePage />,
  },
  {
    path: "/knowMoreInstitute/:id",
    element: <KnowMore />,
  },
  {
    path: "/applycourse",
    element: <ApplyForm />,
  },
  {
    path: "/personaldetails",
    element: <PersonalDetails />,
  },

  // Admin Logins
  {
    path: "/adminSignup",
    element: <AdminSignup/>
  },

  {
    path: "/adminLogin",
    element: <AdminLogin/>
  },

  {
    path: "/adminForgetPass",
    element: <AdminForgetPass/>
  },

  {
    path: "/adminPassCode",
    element: <AdminPassCode/>
  },

  {
    path: "/adminResetPass",
    element: <AdminResetPass/>
  },

  // Admin Dashboard Pages
  {
    path: "/adminDashboard",
    element: <AdminDashboard/>
  },

  {
    path: "/adminSchool",
    element: <AdminSchool/>
  },

  {
    path: "/adminStudent",
    element: <AdminStudent/>
  },

  {
    path: "/adminCourses",
    element: <AdminCourses/>
  },

  {
    path: "/adminCategory",
    element: <AdminCategory/>
  },

  {
    path: "/adminSubject",
    element: <AdminSubject/>
  },

  //Student Portal Page
  {
    path: "/studentPortalLogin",
    element: <StudentPortalLogin/>
  },

  {
    path: "/studentPortalForgetPassword",
    element: <StudentPortalForgetPassword/>
  },

  {
    path: "/studentPortalResetPassword",
    element: <StudentPortalResetPassword/>
  },

  {
    path: "/studentPortalSignUp",
    element: <StudentPortalSignUp/>
  },

  {
    path: "/studentPortalBasicInformations",
    element: <StudentPortalBasicInformations/>
  },

  {
    path: "/studentApplyCourse",
    element: <StudentApplyCourse/>
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
