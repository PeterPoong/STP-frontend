import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
import "../../css/SchoolPortalStyle/MyProfile/SchoolPortalBasicInformation.css";
import CustomTextArea from "../SchoolPortalComp/CustomTextArea";
import PhoneInput from "react-phone-input-2";
import GeneralInformationForm from "./MyProfile/BasicInformationTab/GeneralInformation";
import UploadImage from "./MyProfile/BasicInformationTab/UploadImage";
import "typeface-ubuntu";
import PersonInCharge from "./MyProfile/BasicInformationTab/PersonInCharge";
function BasicInformation() {
  // State for form fields
  const token = sessionStorage.getItem("token");
  const [activeTab, setActiveTab] = useState("general-information");

  // Render content based on the selected tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "general-information":
        return <GeneralInformationForm />;
        break;
      case "upload-images":
        return <UploadImage />;
        break;
      case "person-in-charge":
        return <PersonInCharge />;
        break;
      default:
        return null;
    }
  };

  return (
    <Container fluid className="profile-container">
      {/* "My Profile" Header */}
      <h5 className="my-profile-header">My Profile</h5>
      {/* Navigation Tabs */}
      <Nav
        variant="tabs"
        defaultActiveKey="general-information"
        onSelect={(selectedKey) => setActiveTab(selectedKey)}
      >
        <Nav.Item>
          <Nav.Link eventKey="general-information">
            General Information
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="upload-images">Upload Images</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="person-in-charge">Person-In-Charge</Nav.Link>
        </Nav.Item>
      </Nav>
      {renderTabContent()} {/* Render content based on active tab */}
    </Container>
  );
}

export default BasicInformation;
