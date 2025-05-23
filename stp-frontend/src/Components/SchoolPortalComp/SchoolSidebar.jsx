import React, { useState, useEffect, useRef } from "react";
import { Nav, Navbar, Collapse, Image, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "typeface-ubuntu";
import { ArrowClockwise } from "react-bootstrap-icons";

import {
  House,
  Person,
  Book,
  Grid,
  List,
  X,
  BoxArrowRight,
  CardList,
  Gem,
  ChevronDown,
  ChevronUp,
  ArrowReturnRight,
  PencilSquare,
} from "react-bootstrap-icons";
import studyPayLogo from "../../assets/SchoolPortalAssets/SchoolPortalLoginLogo.png";
import defaultProfilePic from "../../assets/SchoolPortalAssets/profileDefaultIcon.png";
import "../../css/SchoolPortalStyle/SchoolPortalSidebar.css";

// const Sidebar = ({ detail, onDropdownItemSelect, selectTabPage }) => {
const Sidebar = ({ onDropdownItemSelect, selectTabPage }) => {
  // Destructure `detail` from props
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("");
  const [selectedDropdownItem, setSelectedDropdownItem] = useState("");
  // const [accountType, setAccountType] = useState(detail.data.account_type);
  const [accountType, setAccountType] = useState("");
  const [schoolLogo, setSchoolLogo] = useState(defaultProfilePic);
  const [detail, setDetail] = useState("");

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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

        setDetail(data.data);
      } catch (error) {
        console.error("Failed to fetch school details:", error);
      }
    };
    fetchSchoolDetail();
  }, [token]);

  if (!setDetail) {
    return <ArrowClockwise />;
  }

  //getDetail
  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
    setIsProfileDropdownOpen(false);
    setSelectedDropdownItem("");
    selectTabPage(tabName);
    onDropdownItemSelect("");
    // Close sidebar when a tab is clicked
    if (isSidebarOpen) {
      toggleSidebar();
    }
  };
  const handleManageAccount = () => {
    setIsProfileDropdownOpen(true);
    setSelectedTab("myProfile");
    setSelectedDropdownItem("manageAccount");
    onDropdownItemSelect("manageAccount");
  };

  useEffect(() => {
    if (!detail) {
      return;
    }
    // This will run once when the component mounts or when `detail` changes
    const checkForNullValues = (data, excludeKeys = []) => {
      // console.log("detail", data);
      for (const key in data) {
        if (!excludeKeys.includes(key) && data[key] === null) {
          //console.log("not gull", key);
          setIsProfileDropdownOpen(true);
          setSelectedTab("myProfile");
          setSelectedDropdownItem("basicInfo");
          onDropdownItemSelect("basicInfo");
          return;
        }
      }

      // console.log("logo", detail);
      setSchoolLogo(
        `${import.meta.env.VITE_BASE_URL}storage/${detail["school_logo"]}`
      );
      //  // console.log("All keys have values.");
      //   handleTabClick("dashboard");
    };

    setAccountType(detail.account_type);

    const excludeKeys = [
      "created_by",
      "school_lg",
      "school_lat",
      "school_officalWebsite",
      "school_location",
      "school_logo",
    ];

    checkForNullValues(detail || {}, excludeKeys);
  }, [detail]); // Dependency array includes `detail`

  const toggleProfileDropdown = () => {
    setSelectedTab("myProfile");
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleSignOut = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    localStorage.removeItem("account_type");
    sessionStorage.removeItem("accountType");
    sessionStorage.removeItem("name");
    navigate("/schoolPortalLogin");
  };

  const handleDropdownItemClick = (itemName) => {
    setSelectedDropdownItem(itemName);
    onDropdownItemSelect(itemName);

    // Close the sidebar if it's open
    if (isSidebarOpen) {
      toggleSidebar(); // This function should handle toggling the sidebar open/close
    }
  };

  const testHandleTabClick = (tab) => {
    switch (tab) {
      case "basicInfo":
        setSelectedDropdownItem(tab);
        onDropdownItemSelect(tab);
        navigate("/schoolBasicInformation");
        break;
      case "managePassword":
        setSelectedDropdownItem(tab);
        onDropdownItemSelect(tab);
        navigate("/schoolManagePassword");
        break;
    }
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
    // console.log("Selected file:", file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      // Create FormData and append the selected file
      const formData = new FormData();
      formData.append("logo", selectedFile);
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

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
          const errorData = await response.json();
          setErrorUploadMessage("Image must be either: jpeg,png or jpg");
          // console.log("errorTest:", errorData);
          throw new Error("error:".response);
        }
        const data = await response.json();
        //console.log("File uploaded successfully:", data.data);
        setShowModal(false); // Close the modal after successful upload
        setSchoolLogo(`${import.meta.env.VITE_BASE_URL}storage/${data.data}`);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleRequestFeaturedClick = () => {
    setSelectedTab("featured");
    navigate("/RequestFeatured", { replace: true }); // Avoids creating a new history entry
    if (isSidebarOpen) {
      toggleSidebar();
    }

    // Refresh the page after navigation
    window.location.reload();
  };

  useEffect(() => {
    if (location.pathname === "/RequestFeatured") {
      setSelectedTab("featured");
    }
  }, [location]);

  return (
    <div>
      <div
        className="d-flex flex-column vh-100 notranslate"
        style={{
          width: "100%",
          maxWidth: "200px",
          backgroundColor: "#f8f9fa",
          boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        }}
      >
        {/* Mobile Toggle Button (Hamburger Menu) */}
        <Button
          className="mobile-toggle-btn mb-5"
          onClick={toggleSidebar}
          style={{ backgroundColor: "#B71A18", border: "none" }}
        >
          {isSidebarOpen ? (
            <X size={20} style={{ color: "#FFF" }} />
          ) : (
            <List size={20} style={{ color: "#FFF" }} />
          )}
        </Button>

        {/* Sidebar */}
        <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          {/* Close button on mobile
     <Button className="sidebar-close-btn" onClick={toggleSidebar}>
       &times;
     </Button> */}

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
                className="rounded-circle position-absolute d-flex justify-content-center align-items-center UploadSchoolLogo"
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
              <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
              >
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
                  <Button
                    variant="secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleUpload}>
                    Upload
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>

            {accountType === 64 ? (
              <Button
                variant="outline-warning"
                size="sm"
                className="custom-blue-button"
                onClick={() => handleManageAccount()}
              >
                <Person className="pe-1" />
                Basic
              </Button>
            ) : accountType === 65 ? (
              <Button
                variant="outline-warning"
                size="sm"
                className="custom-border-gradient-button"
                onClick={() => handleManageAccount()}
              >
                <Gem className="pe-1" />
                Premium
              </Button>
            ) : (
              "Unknown"
            )}
          </div>

          {/* Navigation Links */}
          <Nav className="flex-column px-0">
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
                  // onClick={() => testHandleTabClick("basicInfo")}
                  className={`text-dark py-2 small-text ${
                    selectedDropdownItem === "basicInfo" ? "selected-tab" : ""
                  }`}
                >
                  <ArrowReturnRight />
                  Basic Information
                </Nav.Link>

                <Nav.Link
                  onClick={() => handleDropdownItemClick("managePassword")}
                  // onClick={() => testHandleTabClick("managePassword")}
                  className={`text-dark py-2 small-text ${
                    selectedDropdownItem === "managePassword"
                      ? "selected-tab"
                      : ""
                  }`}
                >
                  <ArrowReturnRight />
                  Manage Password
                </Nav.Link>
                <Nav.Link
                  onClick={() => handleDropdownItemClick("manageAccount")}
                  className={`text-dark py-2 small-text ${
                    selectedDropdownItem === "manageAccount"
                      ? "selected-tab"
                      : ""
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

            <Nav.Item className="pb-1">
              <Nav.Link
                className={`d-flex align-items-center text-dark w-100 py-2 ${
                  selectedTab === "featured" ? "selected-tab" : ""
                }`}
                style={{ fontSize: "15px", cursor: "pointer" }}
                onClick={handleRequestFeaturedClick}
              >
                <PencilSquare className="me-2" />
                Request Featured
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
      </div>
    </div>
  );
};

export default Sidebar;
