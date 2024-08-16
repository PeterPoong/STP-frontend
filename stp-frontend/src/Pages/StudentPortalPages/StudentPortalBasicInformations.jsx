import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavButtons from "../../Components/student components/NavButtons";
import MyProfileWidget from "../../Components/StudentPortalComp/MyProfileWidget";
import SpcFooter from "../../Components/StudentPortalComp/SpcFooter";
import BasicInformationWidget from "../../Components/StudentPortalComp/BasicInformationWidget";
import ManagePasswordWidget from "../../Components/StudentPortalComp/ManagePasswordWidget";
import WidgetAccepted from "../../Components/StudentPortalComp/WidgetAccepted";
import WidgetPending from "../../Components/StudentPortalComp/WidgetPending";
import WidgetRejected from "../../Components/StudentPortalComp/WidgetRejected";
import CollapsibleSections from "../../Components/StudentPortalComp/CollapsibleSections";
import "aos/dist/aos.css";
import "../../css/StudentPortalCss/StudentPortalBasicInformation.css";
import axios from 'axios';

const StudentPortalBasicInformations = () => {
  const [selectedContent, setSelectedContent] = useState('basicInfo');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    console.log('Token from sessionStorage:', token);
    if (!token) {
      console.log('No token found, redirecting to login');
      navigate('/studentPortalLogin');
    } else {
      verifyToken(token);
    }
  }, [navigate]);

  const verifyToken = async (token) => {
    try {
      console.log('Verifying token:', token);
      const response = await axios.get('http://192.168.0.69:8000/api/validateToken', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Token validation response:', response.data);
      
      // Check if the response has the expected structure
      if (response.data && response.data.success === true) {
        console.log('Token is valid');
        setIsAuthenticated(true);
      } else {
        console.log('Token is invalid based on response structure');
        throw new Error('Token validation failed');
      }
    } catch (error) {
      console.error('Error during token verification:', error);
      if (error.response) {
        console.error('Error response from server:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      sessionStorage.removeItem('token');
      navigate('/studentPortalLogin');
    } finally {
      setIsLoading(false);
    }
  };

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const renderContent = () => {
    switch (selectedContent) {
      case 'basicInfo':
        return (
          <div>
            <BasicInformationWidget />
            <button onClick={openPopup} className="btn btn-primary mt-3">
              Open Accepted Widget
            </button>
          </div>
        );
      case 'managePassword':
        return <ManagePasswordWidget />;
      case 'transcript':
        return <CollapsibleSections/>;
      case 'appliedCoursesPending':
        return <AppliedCoursesWidget status="pending" />;
      case 'appliedCoursesHistory':
        return <AppliedCoursesWidget status="history" />;
      default:
        return <BasicInformationWidget />;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // Or you could render a "Not Authorized" message
  }

  return (
    <div className="app-container">
      <NavButtons />
      <main className="main-content">
        <div className="content-wrapper">
          <div className="profile-widget-container">
            <MyProfileWidget onSelectContent={setSelectedContent} />
          </div>
          <div className="content-area">
            {renderContent()}
          </div>
        </div>
      </main>
      <WidgetRejected
        isOpen={isPopupOpen}
        onClose={closePopup}
        date="February 20th, 2024"
      />
      <SpcFooter />
    </div>
  );
};

export default StudentPortalBasicInformations;