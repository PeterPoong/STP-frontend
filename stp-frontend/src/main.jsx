import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import NotFoundPage from "./Pages/NotFoundPage";
import KnowMore from "./Pages/KnowMore"; // Import KnowMore component
import ApplyNow from "./Pages/ApplyNow"; // Import ApplyNow component
import ApplyDetail from "./Pages/ApplyDetail"; // Import ApplyDetail component
import "./index.css";
import "./coursesbutton.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./Pages/LoginPage";
import CoursesPage from "./Pages/CoursesPage";
import InstitutePage from "./Pages/InstitutePage";
import KnowMoreInstitute from "./InstitutePage/KnowMoreInstitute";
import ApplyForm from "./ApplyPage/ApplyForm";
import PersonalDetails from "./ApplyPage/PersonalDetails";
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
