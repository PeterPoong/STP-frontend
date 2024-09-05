import React, { useState, useEffect, useRef } from "react";
import { Nav, Image, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import 'typeface-ubuntu';

import {
  House,
  Person,
  Book,
  Grid,
  BoxArrowRight,
  CardList,
  Gem,
  ChevronDown,
  ChevronUp,
  ArrowReturnRight,
} from "react-bootstrap-icons";
import studyPayLogo from "../../assets/SchoolPortalAssets/SchoolPortalLoginLogo.png";
import defaultProfilePic from "../../assets/SchoolPortalAssets/profileDefaultIcon.png";
import "../../css/SchoolPortalStyle/SchoolPortalSidebar.css";

const Sidebar = ({ detail, onDropdownItemSelect, selectTabPage }) => {
  // Destructure `detail` from props
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [selectedDropdownItem, setSelectedDropdownItem] = useState("");

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const logo = detail?.data?.school_logo
    ? `${import.meta.env.VITE_BASE_URL}storage/${detail.data.school_logo}`
    : defaultProfilePic;
  const [schoolLogo, setSchoolLogo] = useState(logo);

  useEffect(() => {
    // This will run once when the component mounts or when `detail` changes
    const checkForNullValues = (data, excludeKeys = []) => {
      for (const key in data) {
        if (!excludeKeys.includes(key) && data[key] === null) {
          console.log("empty");
          setIsProfileDropdownOpen(true);
          setSelectedTab("myProfile");
          setSelectedDropdownItem("basicInfo");
          onDropdownItemSelect("basicInfo");
          return;
        }
      }
      console.log("All keys have values.");
    };

    const excludeKeys = ["created_by"];
    checkForNullValues(detail?.data || {}, excludeKeys);
  }, [detail]); // Dependency array includes `detail`

  const toggleProfileDropdown = () => {
    setSelectedTab("myProfile");
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleSignOut = () => {
    sessionStorage.removeItem("token");
    navigate("/schoolPortalLogin");
  };

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
    setIsProfileDropdownOpen(false);
    setSelectedDropdownItem("");
    selectTabPage(tabName);
    onDropdownItemSelect("");
  };

  const handleDropdownItemClick = (itemName) => {
    setSelectedDropdownItem(itemName);
    onDropdownItemSelect(itemName);
  };

  const isProfileSelected = selectedTab === "profile";

  //upload file
  const fileInputRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorUploadMessage, setErrorUploadMessage] = useState();

  const handleButtonClick = () => {
    setShowModal(true); // Open the modal when the button is clicked
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log("Selected file:", file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      // Create FormData and append the selected file
      const formData = new FormData();
      formData.append("logo", selectedFile);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/school/updateSchoolLogo`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (!response.ok) {
          setErrorUploadMessage(response.statusText);
          const errorData = await response.json();
          console.log("errorTest:", errorData.error);
          throw new Error("error:".response);
        }
        const data = await response.json();
        console.log("File uploaded successfully:", data.data);
        setShowModal(false); // Close the modal after successful upload
        setSchoolLogo(`${import.meta.env.VITE_BASE_URL}storage/${data.data}`);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div
      className="d-flex flex-column vh-100"
      style={{
        width: "100%",
        maxWidth: "200px",
        backgroundColor: "#f8f9fa",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
      }}
    >
      {/* Logo */}
      <div className="text-center py-3">
        <Image
          src={studyPayLogo}
          alt="StudyPal Logo"
          className="img-fluid"
          style={{ height: "40px" }}
        />
      </div>

      {/* Profile Section */}
      <div
        className={`text-center border-bottom px-3 ${
          isProfileSelected ? "selected-tab" : ""
        }`}
      >
        <div className="position-relative d-inline-block">
          <Image
            src={schoolLogo}
            roundedCircle
            className="img-fluid"
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
            }}
          />

          {/* uplaod photo button */}
          <Button
            variant="danger"
            size="sm"
            className="rounded-circle position-absolute d-flex justify-content-center align-items-center"
            style={{
              bottom: "5px",
              right: "10px",
              width: "20px",
              height: "20px",
              padding: "0",
              transform: "translate(50%, 50%)",
            }}
            onClick={handleButtonClick} // Trigger file input click on button click
          >
            {" "}
            +
          </Button>

          {/* Modal for selecting and uploading a photo */}
          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Select a Photo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*" // Restrict to image files only
              />
              {errorUploadMessage && (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {errorUploadMessage}
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleUpload}>
                Upload
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        <Button
          variant="outline-warning"
          size="sm"
          style={{ borderRadius: "12px" }}
          className="custom-border-gradient-button"
        >
          <Gem className="pe-1" />
          Premium
        </Button>
      </div>

      {/* Navigation Links */}
      <Nav className="flex-column px-0">
        {/* Application Tab */}
        <Nav.Item className="pb-1">
          <Nav.Link
            className={`d-flex align-items-center text-dark w-100 py-2 ${
              selectedTab === "application" ? "selected-tab" : ""
            }`}
            style={{ fontSize: "15px", cursor: "pointer" }}
            onClick={() => handleTabClick("application")}
          >
            <CardList className="me-2" />
            Application
          </Nav.Link>
        </Nav.Item>

        {/* My Profile Tab */}
        <Nav.Item className="pb-1">
          <Nav.Link
            onClick={toggleProfileDropdown}
            className={`d-flex align-items-center text-dark w-100 py-2 ${
              selectedTab === "myProfile" ? "selected-tab" : ""
            }`}
            style={{ fontSize: "15px", cursor: "pointer" }}
          >
            <Person className="me-2" />
            My Profile
            <span className="ms-auto">
              {isProfileDropdownOpen ? <ChevronUp /> : <ChevronDown />}
            </span>
          </Nav.Link>

          {/* Dropdown Items with Tree Branch Styling */}
          <div
            className={`profile-dropdown ${
              isProfileDropdownOpen ? "open" : ""
            } ms-4`}
          >
            <Nav.Link
              onClick={() => handleDropdownItemClick("basicInfo")}
              className={`text-dark py-2 small-text ${
                selectedDropdownItem === "basicInfo" ? "selected-tab" : ""
              }`}
            >
              <ArrowReturnRight />
              Basic Information
            </Nav.Link>
            <Nav.Link
              onClick={() => handleDropdownItemClick("managePassword")}
              className={`text-dark py-2 small-text ${
                selectedDropdownItem === "managePassword" ? "selected-tab" : ""
              }`}
            >
              <ArrowReturnRight />
              Manage Password
            </Nav.Link>
            <Nav.Link
              onClick={() => handleDropdownItemClick("manageAccount")}
              className={`text-dark py-2 small-text ${
                selectedDropdownItem === "manageAccount" ? "selected-tab" : ""
              }`}
            >
              <ArrowReturnRight />
              Manage Account
            </Nav.Link>
          </div>
        </Nav.Item>

        {/* Courses Tab */}
        <Nav.Item className="pb-1">
          <Nav.Link
            className={`d-flex align-items-center text-dark w-100 py-2 ${
              selectedTab === "courses" ? "selected-tab" : ""
            }`}
            style={{ fontSize: "15px", cursor: "pointer" }}
            onClick={() => handleTabClick("courses")}
          >
            <Book className="me-2" />
            Courses
          </Nav.Link>
        </Nav.Item>

        {/* Dashboard Tab */}
        <Nav.Item className="pb-1">
          <Nav.Link
            className={`d-flex align-items-center text-dark w-100 py-2 ${
              selectedTab === "dashboard" ? "selected-tab" : ""
            }`}
            style={{ fontSize: "15px", cursor: "pointer" }}
            onClick={() => handleTabClick("dashboard")}
          >
            <Grid className="me-2" />
            Dashboard
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Sign Out */}
      <div className="mt-auto border-top px-0 py-0">
        <Nav.Link
          onClick={handleSignOut}
          className="d-flex align-items-center text-dark w-100 py-2"
          style={{ fontSize: "15px", cursor: "pointer" }}
        >
          <BoxArrowRight className="me-2" />
          Sign-out
        </Nav.Link>
      </div>
    </div>
  );
};

export default Sidebar;
