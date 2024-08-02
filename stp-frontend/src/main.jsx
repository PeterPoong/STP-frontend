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


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/knowmore",
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
    path: "/knowmoreinstitute",
    element: <KnowMoreInstitute />,
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
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
