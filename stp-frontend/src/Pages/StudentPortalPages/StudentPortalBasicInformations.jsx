import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Spinner, Modal } from "react-bootstrap";
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
  const modalBodyRef = useRef(null);
  const hasNavigated = useRef(false); // Track if we've already navigated

  // Loading check for token existence, redirecting to login if no token
  useEffect(() => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");
    const accountType =
      sessionStorage.getItem("accountType") ||
      localStorage.getItem("accountType");

    console.log("type", accountType);
    if (!token) {
      if (!hasNavigated.current) {
        hasNavigated.current = true;
        navigate("/studentPortalLogin");
      }
    } else {
      if (accountType == "school") {
        navigate("/schoolPortalDashboard");
      }
      verifyToken(token);
    }
  }, [navigate]);

  // Token verification logic
  const verifyToken = async (token) => {
    try {
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

      if (data && data.success === true) {
        setIsAuthenticated(true);
        // Add terms check after successful authentication
        checkTermsAgreement(token);
      } else {
        throw new Error("Token validation failed");
      }
    } catch (error) {
      sessionStorage.removeItem("token");
      localStorage.removeItem("token");
      navigate("/studentPortalLogin");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch terms agreement status
  const checkTermsAgreement = async (token) => {
    try {
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to check terms agreement");
      }

      const data = await response.json();
      if (!data.hasAgreed) {
        setShowTermsModal(true);
      }
    } catch (error) {
      setShowTermsModal(true); // Show the terms modal on error
    }
  };

  const handleAgree = async () => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");

    try {
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update agreement");
      }

      const data = await response.json();
      if (data.success) {
        setShowTermsModal(false);
      } else {
        throw new Error(data.message || "Failed to update agreement");
      }
    } catch (error) {
      console.error("Error updating agreement:", error);
    }
  };

  const handleDisagree = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    navigate("/studentPortalLogin");
  };

  const handleScroll = (e) => {
    const element = e.target;
    const isAtBottom =
      Math.abs(
        element.scrollHeight - element.scrollTop - element.clientHeight
      ) < 1;
    if (isAtBottom) {
      // Handle scroll action
    }
  };

  const renderContent = () => {
    switch (selectedContent) {
      case "basicInfo":
        return (
          <BasicInformationWidget onProfilePicUpdate={handleProfilePicUpdate} />
        );
      case "managePassword":
        return <ManagePasswordWidget />;
      case "transcript":
        return <CollapsibleSections />;
      case "appliedCoursePending":
        return <AppliedCoursePending status="pending" />;
      case "appliedCourseHistory":
        return <AppliedCourseHistory status="history" />;
      case "riasecresult":
        return <RiasecResult />;
      case "interestedList":
        return <InterestedList />;
      default:
        return <BasicInformationWidget />;
    }
  };

  const handleProfilePicUpdate = (newProfilePic) => {
    setProfilePic(newProfilePic);
  };

  if (isLoading) {
    return (
      <div>
        <div className="d-flex justify-content-center align-items-center m-5 h-100 w-100">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Or render an unauthorized message
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
