import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from 'react-bootstrap';
import NavButtonsSP from "../../Components/StudentPortalComp/NavButtonsSP";
import MyProfileWidget from "../../Components/StudentPortalComp/MyProfileWidget";
import SpcFooter from "../../Components/StudentPortalComp/SpcFooter";
import BasicInformationWidget from "../../Components/StudentPortalComp/MyProfile/BasicInformationWidget";
import ManagePasswordWidget from "../../Components/StudentPortalComp/MyProfile/ManagePasswordWidget";
import CollapsibleSections from "../../Components/StudentPortalComp/CollapsibleSections";
import AppliedCourseHistory from "../../Components/StudentPortalComp/AppliedCourse/AppliedCourseHistory";
import AppliedCoursePending from "../../Components/StudentPortalComp/AppliedCourse/AppliedCoursePending";
import "aos/dist/aos.css";
import "../../css/StudentPortalStyles/StudentPortalBasicInformation.css";

const StudentPortalBasicInformations = () => {
  const [selectedContent, setSelectedContent] = useState("basicInfo");
  const [profilePic, setProfilePic] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  /*loading to check if have  token or not if dont have will navigaate back to studentPortalLogin Page */
  useEffect(() => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");
    //console.log("Token found:", token ? "Yes" : "No");
    if (!token) {
      //console.log("No token found, redirecting to login");
      navigate("/studentPortalLogin");
    } else {
      verifyToken(token);
    }
  }, [navigate]);
  /*end */

  /*validate Token api t check if have token or not if dont have will navigate back to studentPortalLoginPage and will remove the token */
  const verifyToken = async (token) => {
    try {
      //console.log("Verifying token:", token);
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/validateToken`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      //console.log("Token validation response:", data);

      if (data && data.success === true) {
        // console.log("Token is valid");
        setIsAuthenticated(true);
      } else {
        //console.log("Token is invalid based on response structure");
        throw new Error("Token validation failed");
      }
    } catch (error) {
      console.error("Error during token verification:", error);
      sessionStorage.removeItem("token");
      localStorage.removeItem("token");
      navigate("/studentPortalLogin");
    } finally {
        setIsLoading(false); 
    }
  };
  /*end */

  /*passing the profilepic url from basicInfomationWidget t MyProfileWidget */
  const handleProfilePicUpdate = (newProfilePic) => {
    setProfilePic(newProfilePic);
  };
  /*end */

  /*rendercontent function */
  const renderContent = () => {
    switch (selectedContent) {
      case "basicInfo":
        return (
          <div>
            <BasicInformationWidget onProfilePicUpdate={handleProfilePicUpdate} />
          </div>
        );
      case "managePassword":
        return <ManagePasswordWidget />;
      case "transcript":
        return <CollapsibleSections />;
      case "appliedCoursePending": // Ensure this matches the case of the component name
        return <AppliedCoursePending status="pending" />; // Check if this is correctly imported
      case "appliedCourseHistory":
        return <AppliedCourseHistory status="history" />;
      default:
        return <BasicInformationWidget />;
    }
  };
  /*end */

  if (isLoading) {
    return <div>
      <div>
        <div className="d-flex justify-content-center align-items-center m-5 h-100 w-100" >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </div>
    </div >;
  }
if (!isAuthenticated) {
  return null; // Or you could render a "Not Authorized" message
}

return (
  <div className="app-container">
    <NavButtonsSP />
    <main className="main-content mt-5">
      <div className="SPBI-Content-Wrapper">
        <div className="profile-widget-container">
          <MyProfileWidget onSelectContent={setSelectedContent} profilePic={profilePic} />
        </div>
        <div className="content-area">{renderContent()}</div>
      </div>
    </main>
    <SpcFooter />
  </div>
);
};

export default StudentPortalBasicInformations;
