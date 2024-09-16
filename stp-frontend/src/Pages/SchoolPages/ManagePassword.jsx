import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom"; // Ensure this import is included
import { ArrowClockwise } from "react-bootstrap-icons";
import "../../css/SchoolPortalStyle/ManagePassword.css";
import Sidebar from "../../Components/SchoolPortalComp/SchoolSidebar";

import {
  Form,
  Container,
  Row,
  Col,
  InputGroup,
  Button,
  Alert,
} from "react-bootstrap";
import { Eye, EyeOff } from "react-feather";

const ManagePassword = () => {
  const [schoolDetail, setSchoolDetail] = useState();
  const [selectedDropdownItem, setSelectedDropdownItem] = useState("");
  const [selectedTab, setSelectedTab] = useState("");
  // const [redirectToLogin, setRedirectToLogin] = useState(false); // State to manage redirection
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/schoolPortalLogin" />;
  }

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [updateStatus, setUpdateStatus] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [currentPasswordError, setCurrentPasswordError] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmNewPassword,
    };

    const resetPassword = async () => {
      try {
        setUpdateStatus("");
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/school/resetSchoolPassword`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          setCurrentPasswordError(errorData["error"][0]);
          console.log("Error Data:", errorData["error"][0]);
          throw new Error(errorData["errors"] || "Internal Server Error");
        } else {
          setCurrentPasswordError("");
          setUpdateStatus("success");
        }
      } catch (error) {
        console.error("Failed to reset password:", error);
      }
    };
    await resetPassword();
  };

  useEffect(() => {
    if (updateStatus === "success") {
      setShowAlert(true);
      // Set a timer to hide the alert after 3 seconds
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 1000); // Change the time in milliseconds as needed

      // Clean up the timer when the component unmounts or updateStatus changes
      return () => clearTimeout(timer);
    }
  }, [updateStatus]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        onDropdownItemSelect={setSelectedDropdownItem}
        selectTabPage={setSelectedTab}
      />
      <div style={{ flex: 1, overflowY: "auto" }}>
        <Container fluid className="profile-container">
          <h5 className="my-profile-header">My Profile</h5>
          <h3 className="sub-heading">Manage Password</h3>
          <hr className="divider-line" />

          <Form onSubmit={handleSubmit}>
            {showAlert && (
              <Alert
                variant="success"
                className={`fade-alert alert-position ${
                  showAlert ? "show" : "hide"
                }`}
              >
                Update Successfully
              </Alert>
            )}
            {/* Current Password */}
            <Row className="mb-4 justify-content-center">
              <Col md={6} className="mx-auto pt-3">
                <Form.Group
                  controlId="currentPassword"
                  className="position-relative"
                >
                  <Form.Label>
                    Current Password <span className="span-style">*</span>
                  </Form.Label>
                  <InputGroup hasValidation className="position-relative">
                    <Form.Control
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      isInvalid={
                        currentPassword.length > 0 && currentPassword.length < 8
                      }
                      className="pe-5"
                    />
                    <span
                      className="password-toggle position-absolute top-50 end-0 translate-middle-y pe-3"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      style={{ cursor: "pointer", zIndex: 10 }}
                    >
                      {showCurrentPassword ? (
                        <Eye size={18} />
                      ) : (
                        <EyeOff size={18} />
                      )}
                    </span>
                    <Form.Control.Feedback type="invalid">
                      Password must be at least 8 characters long.
                    </Form.Control.Feedback>
                  </InputGroup>
                  {currentPasswordError && (
                    <p className="error-message">{currentPasswordError}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>

            {/* New Password */}
            <Row className="mb-4 justify-content-center">
              <Col md={6} className="mx-auto pt-3">
                <Form.Group
                  controlId="newPassword"
                  className="position-relative"
                >
                  <Form.Label>
                    New Password <span className="span-style">*</span>
                  </Form.Label>
                  <InputGroup hasValidation className="position-relative">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      isInvalid={
                        newPassword.length > 0 && newPassword.length < 8
                      }
                      className="pe-5"
                    />
                    <span
                      className="password-toggle position-absolute top-50 end-0 translate-middle-y pe-3"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: "pointer", zIndex: 10 }}
                    >
                      {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </span>
                    <Form.Control.Feedback type="invalid">
                      Password must be at least 8 characters long.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            {/* Confirm New Password */}
            <Row className="mb-4 justify-content-center">
              <Col md={6} className="mx-auto pt-3">
                <Form.Group
                  controlId="confirmNewPassword"
                  className="position-relative"
                >
                  <Form.Label>
                    Confirm New Password <span className="span-style">*</span>
                  </Form.Label>
                  <InputGroup hasValidation className="position-relative">
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      required
                      isInvalid={
                        confirmNewPassword.length > 0 &&
                        (confirmNewPassword !== newPassword ||
                          confirmNewPassword.length < 8)
                      }
                      className="pe-5"
                    />
                    <span
                      className="password-toggle position-absolute top-50 end-0 translate-middle-y pe-3"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      style={{ cursor: "pointer", zIndex: 10 }}
                    >
                      {showConfirmPassword ? (
                        <Eye size={18} />
                      ) : (
                        <EyeOff size={18} />
                      )}
                    </span>
                    <Form.Control.Feedback type="invalid">
                      Passwords must match and be at least 8 characters long.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            {/* Button */}
            <Row className="mb-4 justify-content-center">
              <Col md={6} className="d-flex justify-content-end">
                <Button type="submit" className="password-btn">
                  Save Changes
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default ManagePassword;
