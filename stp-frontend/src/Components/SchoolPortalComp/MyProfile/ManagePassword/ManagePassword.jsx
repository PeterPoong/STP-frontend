import React, { useEffect, useState } from "react";
// import styles from "../../../../css/SchoolPortalStyle/ManagePassword.module.css";
import styles from "../../../../css/SchoolPortalStyle/ManagePassword.module.css";
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
  const token = sessionStorage.getItem("token");

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
    <Container fluid className={styles.profileContainer}>
      <h5 className={` ${styles.myProfileHeader}`}>My Profile</h5>
      <h3 className={styles.subHeading}>Manage Password</h3>
      <hr className={styles.dividerLine} />

      <Form onSubmit={handleSubmit}>
        {showAlert && (
          <Alert
            variant="success"
            className={`${styles.fadeAlert} ${styles.alertPosition} ${
              showAlert ? styles.show : styles.hide
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
                Current Password <span className={styles.spanStyle}>*</span>
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
                  className={`position-absolute top-50 end-0 translate-middle-y pe-3 ${styles.passwordToggle}`}
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
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
                <p className={styles.errorMessage}>{currentPasswordError}</p>
              )}
            </Form.Group>
          </Col>
        </Row>

        {/* New Password */}
        <Row className="mb-4 justify-content-center">
          <Col md={6} className="mx-auto pt-3">
            <Form.Group controlId="newPassword" className="position-relative">
              <Form.Label>
                New Password <span className={styles.spanStyle}>*</span>
              </Form.Label>
              <InputGroup hasValidation className="position-relative">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  isInvalid={newPassword.length > 0 && newPassword.length < 8}
                  className="pe-5"
                />
                <span
                  className={`position-absolute top-50 end-0 translate-middle-y pe-3 ${styles.passwordToggle}`}
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
                Confirm New Password <span className={styles.spanStyle}>*</span>
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
                  className={`position-absolute top-50 end-0 translate-middle-y pe-3 ${styles.passwordToggle}`}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ cursor: "pointer", zIndex: 10 }}
                >
                  {showConfirmPassword ? (
                    <Eye size={18} />
                  ) : (
                    <EyeOff size={18} />
                  )}
                </span>
                <Form.Control.Feedback type="invalid">
                  {confirmNewPassword !== newPassword
                    ? "Passwords do not match."
                    : "Password must be at least 8 characters long."}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={9}>
            <Button
              variant="danger"
              type="submit"
              className={styles.saveButton}
            >
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ManagePassword;
