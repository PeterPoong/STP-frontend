import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/SchoolPortalComp/SchoolSidebar";
import { ArrowClockwise } from "react-bootstrap-icons";

import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
import "../../css/SchoolPortalStyle/MyProfile/SchoolPortalBasicInformation.css";
// import CustomTextArea from "../SchoolPortalComp/CustomTextArea";
import PhoneInput from "react-phone-input-2";
import GeneralInformationForm from "../../Components/SchoolPortalComp/MyProfile/BasicInformationTab/GeneralInformation";

import UploadImage from "../../Components/SchoolPortalComp/MyProfile/BasicInformationTab/UploadImage";
import "typeface-ubuntu";
import PersonInCharge from "../../Components/SchoolPortalComp/MyProfile/BasicInformationTab/PersonInCharge";
function BasicInformation() {
  // State for form fields
  const [schoolDetail, setSchoolDetail] = useState();
  const [selectedDropdownItem, setSelectedDropdownItem] = useState("");
  const [selectedTab, setSelectedTab] = useState("");
  const token = sessionStorage.getItem("token");
  const [activeTab, setActiveTab] = useState("general-information");

  if (!token) {
    return <Navigate to="/schoolPortalLogin" />;
  }

  useEffect(() => {
    const fetchSchoolDetail = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/school/schoolDetail`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("testing", data);
        setSchoolDetail(data);
      } catch (error) {
        console.error("Failed to fetch school details:", error);
      }
    };
    fetchSchoolDetail();
  }, [token]);

  if (!schoolDetail) {
    return <ArrowClockwise />;
  }

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
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        detail={schoolDetail}
        onDropdownItemSelect={setSelectedDropdownItem}
        selectTabPage={setSelectedTab}
      />
      <div style={{ flex: 1, overflowY: "auto" }}>
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
      </div>
    </div>
  );
}

export default BasicInformation;
