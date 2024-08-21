import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/SchoolPortalStyle/SchoolPortalLoginForm.css";
import schoolPortalLoginBanner from "../../assets/SchoolPortalAssets/SchoolPortalLogin.png";
import schoolPortalLoginLogo from "../../assets/SchoolPortalAssets/SchoolPortalLoginLogo.png";
import "react-phone-input-2/lib/style.css";
import { Eye, EyeOff } from "react-feather";

const ExistSchool = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const formData = {
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
    console.log("Checking formData:", formData);

    const response = await fetch(
      "http://192.168.0.69:8000/api/school/resetSchoolPassword",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      console.log("Password Reset Successfully");
      setSuccess("Password Reset Successfully");
      setError("");
      setTimeout(() => navigate("/schoolPortalLogin"), 500);
      // navigate("/schoolPortalLogin");
    } else if (response.status == 400) {
      const errorData = await response.json();
      setCurrentPasswordError(errorData.error.currentPassword ?? "");
      setNewPasswordError(errorData.error.newPassword ?? "");
      setConfirmPasswordError(errorData.error.confirmPassword ?? "");
      console.log(errorData);
      if (
        errorData.error.currentPassword == null &&
        errorData.error.newPassword == null &&
        errorData.error.confirmPassword == null
      ) {
        setError(errorData.error[0]);
        console.log(errorData);
      }
    } else {
      const errorData = await response.json();
      setError(errorData.error);
    }
  };

  return (
    <Container fluid className="h-100">
      <Row className="h-50">
        <Col md={6} className="d-flex align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} className="px-0">
                <img
                  src={schoolPortalLoginLogo}
                  className=" mb-4"
                  alt="StudyPal Logo"
                />

                <h2 className="text-start mb-3 custom-color-title">
                  Reset Temporary Password
                </h2>
                <p className="text-start mb-4 small custom-color-title">
                  It looks like you're using a temporary password to log in.
                  Please reset your password here to ensure your account remains
                  secure.
                </p>
                {error && (
                  <Alert variant="danger" style={{ textAlign: "center" }}>
                    {error}
                  </Alert>
                )}
                {success && <Alert variant="success">{success}</Alert>}
                <Form onSubmit={handleResetPassword}>
                  <Form.Group controlId="formCurrentPassword">
                    <Form.Label className="custom-label">
                      Current Password
                    </Form.Label>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                      <Form.Control
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        style={{ paddingRight: "2.5rem" }}
                      />
                      <div
                        className="position-absolute top-50 end-0 translate-middle-y pe-3"
                        style={{ cursor: "pointer", zIndex: 10 }}
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                      >
                        {showCurrentPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </div>
                    </div>

                    {Array.isArray(currentPasswordError) &&
                      currentPasswordError.length > 0 && (
                        <div style={{ color: "red", marginTop: "0.5rem" }}>
                          {currentPasswordError.map((error, index) => (
                            <div key={index}>{error}</div>
                          ))}
                        </div>
                      )}
                  </Form.Group>

                  <Form.Group controlId="formNewPassword">
                    <Form.Label className="custom-label">
                      New Password
                    </Form.Label>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                      <Form.Control
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={{ paddingRight: "2.5rem" }}
                        required
                      />
                      <div
                        className="position-absolute top-50 end-0 translate-middle-y pe-3"
                        style={{ cursor: "pointer", zIndex: 10 }}
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </div>
                    </div>
                    {Array.isArray(newPasswordError) &&
                      newPasswordError.length > 0 && (
                        <div style={{ color: "red", marginTop: "0.5rem" }}>
                          {newPasswordError.map((error, index) => (
                            <div key={index}>{error}</div>
                          ))}
                        </div>
                      )}
                  </Form.Group>

                  <Form.Group controlId="formConfirmPassword">
                    <Form.Label className="custom-label">
                      Confirm New Password
                    </Form.Label>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                      <Form.Control
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={{ paddingRight: "2.5rem" }} // Ensures space for the icon
                      />
                      <div
                        className="position-absolute top-50 end-0 translate-middle-y pe-3"
                        style={{ cursor: "pointer", zIndex: 10 }}
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </div>
                    </div>

                    {Array.isArray(confirmPasswordError) &&
                      confirmPasswordError.length > 0 && (
                        <div style={{ color: "red", marginTop: "0.5rem" }}>
                          {confirmPasswordError.map((error, index) => (
                            <div key={index}>{error}</div>
                          ))}
                        </div>
                      )}
                  </Form.Group>

                  <Button
                    variant="danger"
                    type="submit"
                    className="my-3 m-0"
                    style={{ width: "100%", height: "40px" }}
                  >
                    Reset Password
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col md={6} className="p-0">
          <img
            src={schoolPortalLoginBanner}
            className="w-100 h-100 object-fit-cover"
            alt="Login background"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ExistSchool;
