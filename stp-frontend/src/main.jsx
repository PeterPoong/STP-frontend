import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/StudentPages/Home";
import NotFoundPage from "./Pages/StudentPages/NotFoundPage";
import KnowMore from "./Pages/StudentPages/KnowMore"; // Import KnowMore component
import ApplyNow from "./Pages/StudentPages/ApplyNow"; // Import ApplyNow component
import CourseDetailsPage from "./Pages/StudentPages/CourseDetailsPage"; // Import courseDetails component
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
import AdminAddSchool from "./Pages/AdminPages/AdminAddSchool";
import AdminEditSchool from "./Pages/AdminPages/AdminEditSchool";
import AdminApplicant from "./Pages/AdminPages/AdminApplicant";
import AdminEditApplicant from "./Pages/AdminPages/AdminEditApplicant";
import AdminStudent from "./Pages/AdminPages/AdminStudent";
import AdminAddStudent from "./Pages/AdminPages/AdminAddStudent";
import AdminEditStudent from "./Pages/AdminPages/AdminEditStudent";
import AdminCourses from "./Pages/AdminPages/AdminCourses";
import AdminAddCourse from "./Pages/AdminPages/AdminAddCourse";
import AdminEditCourse from "./Pages/AdminPages/AdminEditCourse";
import AdminCategory from "./Pages/AdminPages/AdminCategory";
import AdminAddCategory from "./Pages/AdminPages/AdminAddCategory";
import AdminEditCategory from "./Pages/AdminPages/AdminEditCategory";
import AdminSubject from "./Pages/AdminPages/AdminSubject";
import AdminEditSubject from "./Pages/AdminPages/AdminEditSubject";
import AdminAddSubject from "./Pages/AdminPages/AdminAddSubject";
import AdminList from "./Pages/AdminPages/AdminList";
import AdminPackage from "./Pages/AdminPages/AdminPackage";
import AdminAddPackage from "./Pages/AdminPages/AdminAddPackage";
import AdminEditPackage from "./Pages/AdminPages/AdminEditPackage";
import AdminData from "./Pages/AdminPages/AdminData";
import AdminBanner from "./Pages/AdminPages/AdminBanner";
import AdminAddBanner from "./Pages/AdminPages/AdminAddBanner";
import AdminEditBanner from "./Pages/AdminPages/AdminEditBanner";
import AdminEnquiry from "./Pages/AdminPages/AdminEnquiry";
import AdminReplyEnquiry from "./Pages/AdminPages/AdminReplyEnquiry";
import AdminFeatured from "./Pages/AdminPages/AdminFeatured";
import AdminEditFeatured from "./Pages/AdminPages/AdminEditFeatured";


//StudentPortal Page
import StudentPortalLogin from "./Pages/StudentPortalPages/StudentPortalLogin";
import StudentPortalForgetPassword from "./Pages/StudentPortalPages/StudentPortalForgetPassword";
import StudentPortalResetPassword from "./Pages/StudentPortalPages/StudentPortalResetPassword";
import StudentPortalSignUp from "./Pages/StudentPortalPages/StudentPortalSignUp";
import StudentPortalBasicInformations from "./Pages/StudentPortalPages/StudentPortalBasicInformations";
import StudentApplyCourses from "./Pages/StudentPortalPages/StudentApplyCourses";
import StudentApplyCourse from "./Pages/StudentPortalPages/StudentApplyCourse";
import StudentApplicationSummary from "./Pages/StudentPortalPages/StudentApplicationSummary";
import StudentFeedback from  "./Pages/StudentPortalPages/StudentFeedback";
import Testing from "./Pages/StudentPortalPages/Testing";
import Testing2 from "./Pages/StudentPortalPages/Testing2";
//schoolPortal Page
import SchoolPortalLogin from "./Pages/SchoolPages/SchoolPortalLogin";
import SchoolPortalSignup from "./Pages/SchoolPages/SchoolPortalSignup";
import SchoolDashboard from "./Pages/SchoolPages/SchoolDashboard";
import SchoolPortalForgetPassword from "./Pages/SchoolPages/schoolPortalForgetPassword";
import ExistSchool from "./Pages/SchoolPages/ExistSchool";
import SchoolViewApplicantDetail from "./Pages/SchoolPages/StudentApplicantDetail";
import SchoolBasicInformation from "./Pages/SchoolPages/SchoolBasicInformation";

//marketing
import AccountPackages from "./Pages/MarketingPages/AccountPackages";

import FacebookSocialPageRedirectPage from "./Pages/StudentPortalPages/FacebookSocialPageRedirectPage";

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
    element: <CourseDetailsPage />,
  },
  {
    path: "/courseDetails/:id",
    element: <CourseDetailsPage />,
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
    path: "/adminEditSchool",
    element: <AdminEditSchool />,
  },

  {
    path: "/adminStudent",
    element: <AdminStudent />,
  },

  {
    path: "/adminAddStudent",
    element: <AdminAddStudent />,
  },
  {
    path: "/adminEditStudent",
    element: <AdminEditStudent />,
  },
  {
    path: "/adminCourses",
    element: <AdminCourses />,
  },
  {
    path: "/adminAddCourse",
    element: <AdminAddCourse />,
  },
  {
    path: "/adminEditCourse",
    element: <AdminEditCourse />,
  },

  {
    path: "/adminCategory",
    element: <AdminCategory />,
  },
  {
    path: "/adminAddCategory",
    element: <AdminAddCategory />,
  },

  {
    path: "/adminEditCategory",
    element: <AdminEditCategory />,
  },

  {
    path: "/adminSubject",
    element: <AdminSubject />,
  },
  {
    path: "/adminAddSubject",
    element: <AdminAddSubject />,
  },
  {
    path: "/adminEditSubject",
    element: <AdminEditSubject />,
  },
  {
    path: "/adminList",
    element: <AdminList />,
  },

  {
    path: "/adminApplicant",
    element: <AdminApplicant />,
  },
  {
    path: "/adminEditApplicant",
    element: <AdminEditApplicant />,
  },
  {
    path: "/adminBanner",
    element: <AdminBanner />,
  },

  {
    path: "/adminAddbanner",
    element: <AdminAddBanner />,
  },
  {
    path: "/adminEditBanner",
    element: <AdminEditBanner />,
  },
  {
    path: "/adminPackage",
    element: <AdminPackage />,
  },
  {
    path: "/adminAddPackage",
    element: <AdminAddPackage />,
  },
  {
    path: "/adminEditPackage",
    element: <AdminEditPackage />,
  },
  {
    path: "/adminData",
    element: <AdminData />,
  },
  {
    path: "/adminEnquiry",
    element: <AdminEnquiry />,
  },
  {
    path: "/adminReplyEnquiry",
    element: <AdminReplyEnquiry />,
  },
  {
    path: "/adminFeatured",
    element: <AdminFeatured />,
  },
  {
    path: "/adminEditFeatured",
    element: <AdminEditFeatured />,
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
    path: "/studentApplyCourse",
    element: <StudentApplyCourse />,
  },

  {
    path: "/FacebookSocialPageRedirectPage",
    element: <FacebookSocialPageRedirectPage />,
  },

  {
    path: "/studentFeedback",
    element: <StudentFeedback/>,
  },

  {
    path:"/testing",
    element:<Testing/>,
  },

  {
    path:"/testing2",
    element:<Testing2/>,
  },

  //School Portal
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

  {
    path: "/studentApplyCourses/:courseId",
    element: <StudentApplyCourses />,
  },

  {
    path: "/studentApplicationSummary/:courseId",
    element: <StudentApplicationSummary />,
  },
  {
    path: "/school/ApplicantDetail/:applicantID",
    element: <SchoolViewApplicantDetail />,
  },



  //marketing
  {
    path: "/marketing/AccountPackages",
    element: <AccountPackages />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
