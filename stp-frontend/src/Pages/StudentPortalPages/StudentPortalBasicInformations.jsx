import React, { useState, useEffect, useRef } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { Spinner, Modal, Button } from "react-bootstrap";
import NavButtonsSP from "../../Components/StudentPortalComp/NavButtonsSP";
import MyProfileWidget from "../../Components/StudentPortalComp/MyProfileWidget";
import SpcFooter from "../../Components/StudentPortalComp/SpcFooter";
import RiasecResult from "../../Components/StudentPortalComp/RiasecResult";
import InterestedList from "../../Components/StudentPortalComp/InterestedList";
import BasicInformationWidget from "../../Components/StudentPortalComp/MyProfile/BasicInformationWidget";
import ManagePasswordWidget from "../../Components/StudentPortalComp/MyProfile/ManagePasswordWidget";
import CollapsibleSections from "../../Components/StudentPortalComp/CollapsibleSections";
import AppliedCourseHistory from "../../Components/StudentPortalComp/AppliedCourse/AppliedCourseHistory";
import AppliedCoursePending from "../../Components/StudentPortalComp/AppliedCourse/AppliedCoursePending";
import "aos/dist/aos.css";
import "../../css/StudentPortalStyles/StudentPortalBasicInformation.css";
import styled from "styled-components";
import Term from "../../Components/StudentPortalComp/Term";
const ScrollableModalBody = styled(Modal.Body)`
  max-height: 70vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
`;

const StudentPortalBasicInformations = () => {
  const location = useLocation();
  const [selectedContent, setSelectedContent] = useState("basicInfo");
  const [profilePic, setProfilePic] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [hasReachedBottom, setHasReachedBottom] = useState(false);
  const modalBodyRef = useRef(null);

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

  useEffect(() => {
    if (location.state?.selectedContent) {
      setSelectedContent(location.state.selectedContent);
    }
  }, [location]);

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
        // Add terms check after successful authentication
        checkTermsAgreement(token);
      } else {
        //console.log("Token is invalid based on response structure");
        throw new Error("Token validation failed");
      }
    } catch (error) {
      // console.error("Error during token verification:", error);
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
            <BasicInformationWidget
              onProfilePicUpdate={handleProfilePicUpdate}
            />
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
        case "riasecresult":
          return <RiasecResult/>;
        case "interestedList":
          return <InterestedList/>;
      default:
        return <BasicInformationWidget />;
    }
  };
  /*end */

  const checkTermsAgreement = async (token) => {
    try {
      // console.log("Checking terms agreement...");
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/student/checkTermsAgreement`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.message || "Failed to check terms agreement");
      }

      const data = await response.json();
      // console.log("Terms agreement response:", data);

      if (!data.hasAgreed) {
        setShowTermsModal(true);
      }
    } catch (error) {
      // console.error("Error checking terms agreement:", error);
      // Optionally show modal on error for testing
      setShowTermsModal(true);
    }
  };

  const handleScroll = (e) => {
    const element = e.target;
    const isAtBottom =
      Math.abs(
        element.scrollHeight - element.scrollTop - element.clientHeight
      ) < 1;

    if (isAtBottom) {
      setHasReachedBottom(true);
    }
  };

  const handleAgree = async () => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      // console.log("Submitting agreement...");

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/student/agreeTerms`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ agreed: true }),
        }
      );

      // console.log("Agreement response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.message || "Failed to update agreement");
      }

      const data = await response.json();
      // console.log("Agreement update response:", data);

      if (data.success) {
        setShowTermsModal(false);
      } else {
        throw new Error(data.message || "Failed to update agreement");
      }
    } catch (error) {
      console.error("Error updating agreement:", error);
      // Optionally show an error message to the user
    }
  };

  const handleDisagree = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    navigate("/studentPortalLogin");
  };

  if (isLoading) {
    return (
      <div>
        <div>
          <div className="d-flex justify-content-center align-items-center m-5 h-100 w-100">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </div>
      </div>
    );
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
            <MyProfileWidget
              onSelectContent={setSelectedContent}
              profilePic={profilePic}
            />
          </div>
          <div className="content-area">{renderContent()}</div>
        </div>
      </main>
      <SpcFooter />
    </div>
  );
};

export default StudentPortalBasicInformations;
