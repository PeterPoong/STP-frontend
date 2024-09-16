import React, { useState, useEffect } from "react";
import AddCourseBasicInformation from "./AddCourseTab/AddCourseBasicInformation";
import AddCourseAdvanceInformation from "./AddCourseTab/AddCourseAdvanceInformation";
import CourseDetail from "./CourseDetail";

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import {
  Arrow90degLeft,
  Stack,
  Clipboard2CheckFill,
} from "react-bootstrap-icons";

import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";

const AddCourseForm = ({ handleGoBack }) => {
  const [activeTab, setActiveTab] = useState("Basic Information");

  const [basicInfoData, setBasicInfoData] = useState("");
  const [courseID, setCourseID] = useState("");

  const nextPage = (basicInfo) => {
    setActiveTab("Advance Information");
    setBasicInfoData(basicInfo);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Basic Information":
        return <AddCourseBasicInformation list={handleGoBack} />;
      case "Advance Information":
        return <AddCourseAdvanceInformation basicInfoData={basicInfoData} />;
        break;
      case "Course Detail":
        return <CourseDetail courseId={courseID} />;
        break;
      default:
        return null; // Optional: Handle unexpected cases
    }
  };
  return (
    <div className="container my-4">
      <h5 className="mb-4 mt-5">
        {/* Make the icon clickable */}
        <span
          onClick={handleGoBack} // Add your click handler here
          style={{
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
          }} // Optional: styling for cursor and alignment
        >
          <Arrow90degLeft style={{ color: "#B71A18" }} className="mx-3" />
        </span>
        Add New Course
      </h5>

      {/* <Nav
        variant="tabs"
        activeKey={activeTab}
        onSelect={(selectedKey) => setActiveTab(selectedKey)}
      >
        <Nav.Item>
          <Nav.Link eventKey="Basic Information">
            <Stack className="mx-2" />
            Basic Information
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Advance Information">
            <Clipboard2CheckFill className="mx-2" />
            Advance Information{" "}
          </Nav.Link>
        </Nav.Item>
      </Nav> */}
      {renderTabContent()}
    </div>
  );
};

export default AddCourseForm;
