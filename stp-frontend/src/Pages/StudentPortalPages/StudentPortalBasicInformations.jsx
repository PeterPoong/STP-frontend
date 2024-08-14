import React, { useState } from "react";
import NavButtons from "../../Components/student components/NavButtons";
import MyProfileWidget from "../../Components/StudentPortalComp/MyProfileWidget";
import SpcFooter from "../../Components/StudentPortalComp/SpcFooter";
import BasicInformationWidget from "../../Components/StudentPortalComp/BasicInformationWidget";
import ManagePasswordWidget from "../../Components/StudentPortalComp/ManagePasswordWidget";
import WidgetAccepted from "../../Components/StudentPortalComp/WidgetAccepted";
import "aos/dist/aos.css";
import "../../css/StudentPortalCss/StudentPortalBasicInformation.css";

const StudentPortalBasicInformations = () => {
  const [selectedContent, setSelectedContent] = useState('basicInfo');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const renderContent = () => {
    switch(selectedContent) {
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
        return <ManagePasswordWidget/>;
      case 'transcript':
        return <TranscriptWidget />;
      case 'appliedCoursesPending':
        return <AppliedCoursesWidget status="pending" />;
      case 'appliedCoursesHistory':
        return <AppliedCoursesWidget status="history" />;
      default:
        return <BasicInformationWidget />;
    }
  };

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

      <WidgetAccepted
        isOpen={isPopupOpen}
        onClose={closePopup}
        date="February 20th, 2024"
      />

      <SpcFooter />
    </div>
  );
};

export default StudentPortalBasicInformations;