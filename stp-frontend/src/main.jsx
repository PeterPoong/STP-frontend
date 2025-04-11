import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
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
import ProtectedAdminRoute from "./Components/AdminComp/ProtectedAdminRoute";
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
import AdminInterest from "./Pages/AdminPages/AdminInterest";
import AdminQuestion from "./Pages/AdminPages/AdminQuestion";
import AdminAddQuestion from "./Pages/AdminPages/AdminAddQuestion";
import AdminEditQuestion from "./Pages/AdminPages/AdminEditQuestion";
import AdminRiasec from "./Pages/AdminPages/AdminRiasec";
import AdminAddRiasec from "./Pages/AdminPages/AdminAddRiasec";
import AdminEditRiasec from "./Pages/AdminPages/AdminEditRiasec";
import ApplicantProfile from "./Pages/AdminPages/ApplicantProfile";

//StudentPortal Page
import StudentPortalLogin from "./Pages/StudentPortalPages/StudentPortalLogin";
import StudentPortalForgetPassword from "./Pages/StudentPortalPages/StudentPortalForgetPassword";
import StudentPortalResetPassword from "./Pages/StudentPortalPages/StudentPortalResetPassword";
import StudentPortalSignUp from "./Pages/StudentPortalPages/StudentPortalSignUp";
import StudentPortalBasicInformations from "./Pages/StudentPortalPages/StudentPortalBasicInformations";
import StudentApplyCourses from "./Pages/StudentPortalPages/StudentApplyCourses";
import StudentApplyCourse from "./Pages/StudentPortalPages/StudentApplyCourse";
import StudentApplicationSummary from "./Pages/StudentPortalPages/StudentApplicationSummary";
import StudentFeedback from "./Pages/StudentPortalPages/StudentFeedback";
import StudentStudyPath from "./Pages/StudentPages/StudentStudyPath";
import SharedRiasecResult from "./Pages/StudentPortalPages/SharedRiasecResult";

//schoolPortal Page
import SchoolPortalLogin from "./Pages/SchoolPages/SchoolPortalLogin";
import SchoolPortalSignup from "./Pages/SchoolPages/SchoolPortalSignup";
import SchoolDashboard from "./Pages/SchoolPages/SchoolDashboard";
import SchoolPortalForgetPassword from "./Pages/SchoolPages/schoolPortalForgetPassword";
import ExistSchool from "./Pages/SchoolPages/ExistSchool";
import SchoolViewApplicantDetail from "./Pages/SchoolPages/StudentApplicantDetail";
import SchoolBasicInformation from "./Pages/SchoolPages/SchoolBasicInformation";
import SchoolPackage from "./Pages/SchoolPages/SchoolPackage";
import RequestFeatured from "./Pages/SchoolPages/RequestFeatured";
import CourseRequestFeatured from "./Pages/SchoolPages/CourseRequestFeatured";
import SchoolRequestFeatured from "./Pages/SchoolPages/SchoolRequestFeatured";
import Checkout from "./Pages/SchoolPages/Checkout";
import Checkoutsc from "./Pages/SchoolPages/CheckoutSC";
import VerifyPhoneNumberPage from "./Pages/StudentPortalPages/VerifyPhoneNumberPage";

//marketing
import AccountPackages from "./Pages/MarketingPages/AccountPackages";
import AdvertisementPricingPage from "./Pages/MarketingPages/AdvertisementPricingPage";
import FeaturedPricingList from "./Pages/MarketingPages/FeaturedPricingList";

import FacebookSocialPageRedirectPage from "./Pages/StudentPortalPages/FacebookSocialPageRedirectPage";
import SocialContactPage from "./Pages/StudentPortalPages/SocialContactPage";
import TestSocialPage from "./Pages/StudentPortalPages/TestSocialPage";

const router = createBrowserRouter([
  {
    path: "/TestSocialPage",
    element: <TestSocialPage />,
  },
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/university-details/:school_name",
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
    path: "/course-details/:school_name/:course_name",
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
    path: "/university-details/:school_name",
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
    element: (
      <ProtectedAdminRoute>
        <AdminDashboard />,
      </ProtectedAdminRoute>
    ),
  },

  {
    path: "/adminSchool",
    element: (
      <ProtectedAdminRoute>
        <AdminSchool />,
      </ProtectedAdminRoute>
    ),
  },

  {
    path: "/adminAddSchool",
    element: (
      <ProtectedAdminRoute>
        <AdminAddSchool />,
      </ProtectedAdminRoute>
    ),
  },

  {
    path: "/adminEditSchool",
    element: (
      <ProtectedAdminRoute>
        <AdminEditSchool />,
      </ProtectedAdminRoute>
    ),
  },

  {
    path: "/adminStudent",
    element: (
      <ProtectedAdminRoute>
        <AdminStudent />,
      </ProtectedAdminRoute>
    ),
  },

  {
    path: "/adminAddStudent",
    element: (
      <ProtectedAdminRoute>
        <AdminAddStudent />,
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/adminEditStudent",
    element: (
      <ProtectedAdminRoute>
        <AdminEditStudent />,
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/adminCourses",
    element: (
      <ProtectedAdminRoute>
        <AdminCourses />,
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/adminAddCourse",
    element: (
      <ProtectedAdminRoute>
        <AdminAddCourse />,
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/adminEditCourse",
    element: (
      <ProtectedAdminRoute>
        <AdminEditCourse />,
      </ProtectedAdminRoute>
    ),
  },

  {
    path: "/adminCategory",
    element: (
      <ProtectedAdminRoute>
        <AdminCategory />,
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/adminAddCategory",
    element: (
      <ProtectedAdminRoute>
        <AdminAddCategory />,
      </ProtectedAdminRoute>
    ),
  },

  {
    path: "/adminEditCategory",
    element: (
      <ProtectedAdminRoute>
        <AdminEditCategory />,
      </ProtectedAdminRoute>
    ),
  },

  {
    path: "/adminSubject",
    element: (
      <ProtectedAdminRoute>
        <AdminSubject />,
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/adminAddSubject",
    element: (
      <ProtectedAdminRoute>
        <AdminAddSubject />,
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/adminEditSubject",
    element: (
      <ProtectedAdminRoute>
        <AdminEditSubject />,
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/adminList",
    element: (
      <ProtectedAdminRoute>
        <AdminList />,
      </ProtectedAdminRoute>
    ),
  },

  {
    path: "/adminApplicant",
    element: (
      <ProtectedAdminRoute>
        <AdminApplicant />,
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/adminEditApplicant",
    element: (
      <ProtectedAdminRoute>
        <AdminEditApplicant />,
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/adminBanner",
    element: (
      <ProtectedAdminRoute>
        <AdminBanner />,
      </ProtectedAdminRoute>
    ),
  },

  {
    path: "/adminAddbanner",
    element: (
      <ProtectedAdminRoute>
        <AdminAddBanner />,
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/adminEditBanner",
    element: (
      <ProtectedAdminRoute>
        <AdminEditBanner />,
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/adminPackage",
    element: (
      <ProtectedAdminRoute>
        <AdminPackage />,
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/adminAddPackage",
    element: (
      <ProtectedAdminRoute>
        <AdminAddPackage />,
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/adminEditPackage",
    element: (
      <ProtectedAdminRoute>
        <AdminEditPackage />,
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/adminData",
    element: (
      <ProtectedAdminRoute>
        <AdminData />,
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/adminEnquiry",
    element: (
      <ProtectedAdminRoute>
        <AdminEnquiry />,
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/adminReplyEnquiry",
    element: (
      <ProtectedAdminRoute>
        <AdminReplyEnquiry />,
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/adminFeatured",
    element: (
      <ProtectedAdminRoute>
        <AdminFeatured />,
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/adminEditFeatured",
    element: (
      <ProtectedAdminRoute>
        <AdminEditFeatured />,
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/adminInterest",
    element: (
      <ProtectedAdminRoute>
        <AdminInterest />,
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/adminQuestion",
    element: (
      <ProtectedAdminRoute>
        <AdminQuestion />,
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/adminAddQuestion",
    element: (
      <ProtectedAdminRoute>
        <AdminAddQuestion />,
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/adminEditQuestion",
    element: (
      <ProtectedAdminRoute>
        <AdminEditQuestion />,
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/adminRiasec",
    element: (
      <ProtectedAdminRoute>
        <AdminRiasec />,
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/adminAddRiasec",
    element: (
      <ProtectedAdminRoute>
        <AdminAddRiasec />,
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/adminEditRiasec",
    element: (
      <ProtectedAdminRoute>
        <AdminEditRiasec />,
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/applicantProfile",
    element: (
      <ProtectedAdminRoute>
        <ApplicantProfile />,
      </ProtectedAdminRoute>
    ),
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
    path: "/SocialContactPage",
    element: <SocialContactPage />,
  },

  {
    path: "/studentFeedback",
    element: <StudentFeedback />,
  },
  {
    path: "/studentStudyPath",
    element: <StudentStudyPath />,
  },

  {
    path: "/share/:username/:design/:type",
    element: <SharedRiasecResult />,
  },

  {
    path: "/VerifyPhoneNumberPage",
    element: <VerifyPhoneNumberPage />,
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
    path: "/RequestFeatured",
    element: <RequestFeatured />,
  },
  {
    path: "/CourseRequestFeatured",
    element: <CourseRequestFeatured />,
  },
  {
    path: "/SchoolRequestFeatured",
    element: <SchoolRequestFeatured />,
  },
  {
    path: "/Checkout",
    element: <Checkout />,
  },
  {
    path: "/Checkoutsc",
    element: <Checkoutsc />,
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
  {
    path: "/SchoolPackage",
    element: <SchoolPackage />,
  },

  //marketing
  {
    path: "/marketing/AccountPackages",
    element: <AccountPackages />,
  },
  {
    path: "/marketing/AdvertisementPricingPage",
    element: <AdvertisementPricingPage />,
  },
  {
    path: "/marketing/FeaturedPricingList",
    element: <FeaturedPricingList />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
