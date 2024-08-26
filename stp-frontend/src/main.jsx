import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/StudentPages/Home";
import NotFoundPage from "./Pages/StudentPages/NotFoundPage";
import KnowMore from "./Pages/StudentPages/KnowMore"; // Import KnowMore component
import ApplyNow from "./Pages/StudentPages/ApplyNow"; // Import ApplyNow component
import ApplyDetail from "./Pages/StudentPages/ApplyDetail"; // Import ApplyDetail component
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./Pages/StudentPages/LoginPage";
import CoursesPage from "./Pages/StudentPages/CoursesPage";
import InstitutePage from "./Pages/StudentPages/InstitutePage";
import KnowMoreInstitute from "./Components/StudentComp/InstitutePage/KnowMoreInstitute";
import ApplyForm from "./Pages/StudentPages/ApplyPage/ApplyForm";
import PersonalDetails from "./Pages/StudentPages/ApplyPage/PersonalDetails";

// Admin Login Page
import AdminSignup from "./Pages/AdminPages/AdminSignup";
import AdminLogin from "./Pages/AdminPages/AdminLogin";
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
import AdminAddSchool from "./Pages/AdminPages/AdminAddSchool";

//StudentPortal Page
import StudentPortalLogin from "./Pages/StudentPortalPages/StudentPortalLogin";
import StudentPortalForgetPassword from "./Pages/StudentPortalPages/StudentPortalForgetPassword";
import StudentPortalResetPassword from "./Pages/StudentPortalPages/StudentPortalResetPassword";
import StudentPortalSignUp from "./Pages/StudentPortalPages/StudentPortalSignUp";
import StudentPortalBasicInformations from "./Pages/StudentPortalPages/StudentPortalBasicInformations";

//schoolPortal Page
import SchoolPortalLogin from "./Pages/SchoolPages/SchoolPortalLogin";
import SchoolPortalSignup from "./Pages/SchoolPages/SchoolPortalSignup";
import SchoolDashboard from "./Pages/SchoolPages/SchoolDashboard";
import SchoolPortalForgetPassword from "./Pages/SchoolPages/schoolPortalForgetPassword";
import ExistSchool from "./Pages/SchoolPages/ExistSchool";

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
    element: <AdminSignup />,
  },

  {
    path: "/adminLogin",
    element: <AdminLogin />,
  },

  {
    path: "/adminForgetPass",
    element: <AdminForgetPass />,
  },

  {
    path: "/adminPassCode",
    element: <AdminPassCode />,
  },

  {
    path: "/adminResetPass",
    element: <AdminResetPass />,
  },

  // Admin Dashboard Pages
  {
    path: "/adminDashboard",
    element: <AdminDashboard />,
  },

  {
    path: "/adminSchool",
    element: <AdminSchool />,
  },

  {
    path: "/adminAddSchool",
    element: <AdminAddSchool />,
  },

  {
    path: "/adminStudent",
    element: <AdminStudent />,
  },

  {
    path: "/adminCourses",
    element: <AdminCourses />,
  },

  {
    path: "/adminCategory",
    element: <AdminCategory />,
  },

  {
    path: "/adminSubject",
    element: <AdminSubject />,
  },

  //Student Portal Page
  {
    path: "/studentPortalLogin",
    element: <StudentPortalLogin />,
  },

  {
    path: "/studentPortalForgetPassword",
    element: <StudentPortalForgetPassword />,
  },

  {
    path: "/studentPortalResetPassword",
    element: <StudentPortalResetPassword />,
  },

  {
    path: "/studentPortalSignUp",
    element: <StudentPortalSignUp />,
  },

  {
    path: "/studentPortalBasicInformations",
    element: <StudentPortalBasicInformations />,
  },
  {
    path: "/schoolPortalLogin",
    element: <SchoolPortalLogin />,
  },
  {
    path: "/schoolPortalSignUp",
    element: <SchoolPortalSignup />,
  },
  {
    path: "/schoolPortalForgetPassword",
    element: <SchoolPortalForgetPassword />,
  },
  {
    path: "/schoolPortalDashboard",
    element: <SchoolDashboard />,
  },
  {
    path: "/schoolExistingAccount",
    element: <ExistSchool />,
  },

  {
    path: "/studentApplyCourse",
    element: <StudentApplyCourse />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
