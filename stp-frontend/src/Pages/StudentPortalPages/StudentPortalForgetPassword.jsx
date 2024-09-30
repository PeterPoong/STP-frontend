import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/StudentPortalStyles/StudentPortalLoginForm.css";
import studentPortalLogin from "../../assets/StudentPortalAssets/studentPortalLogin.png";
import studentPortalLoginLogo from "../../assets/StudentPortalAssets/studentPortalLoginLogo.png";
import { Eye, EyeOff } from 'react-feather';

const StudentPortalForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otpError, setOtpError] = useState(""); // New state for OTP validation error

  const navigate = useNavigate();

  /* Send OTP API */
  const handleSendResetRequest = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setOtpError(""); // Reset OTP error

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/sendOtp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          type: "student"
        }),
      });

      const responseText = await response.text();

      if (response.ok) {
        setSuccess("OTP sent successfully. Please check your email for the OTP.");
        setStep(2); // Move to OTP input step
      } else {
        console.error("Failed to send reset request:", responseText);
        const responseData = JSON.parse(responseText);
        const errorMessage = responseData.error?.email?.[0] || "Failed to send reset request. Please try again.";
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Error in sending reset request:", error);
      setError("An error occurred while sending the reset request. Please try again later.");
    }
  };
  /* End */

  /* Validate OTP API */
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setOtpError(""); // Reset OTP error

    // Define your OTP regex (e.g., exactly 6 digits)
    const otpRegex = /^\d{6}$/;

    // Validate OTP format
    if (!otpRegex.test(otp)) {
      setOtpError("Please enter a valid 6-digit OTP.");
      return; // Prevent form submission
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/validateOtp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otp: otp,
          type: "student"
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess("OTP verified successfully. Please set your new password.");
        setStep(3); // Move to password reset step
      } else {
        // Use the message from the backend if available
        setError(data.message || "Failed to verify OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error in verifying OTP:", error);
      setError("An error occurred while verifying the OTP. Please check your internet connection and try again.");
    }
  };
  /* End */

  /* Reset Password API */
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setOtpError(""); // Reset OTP error

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/resetPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
          type: "student"
        }),
      });

      const responseText = await response.text();

      if (response.ok) {
        setSuccess("Password reset successfully. You can now login with your new password.");
        setTimeout(() => navigate('/studentPortalLogin'), 500);
      } else {
        console.error("Failed to reset password:", responseText);
        const responseData = JSON.parse(responseText);
        const errorMessage = responseData.error?.message || "Failed to reset password. Please try again.";
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Error in resetting password:", error);
      setError("An error occurred while resetting the password. Please check your internet connection and try again.");
    }
  };
  /* End */

  /* Handle OTP Change to restrict input to numbers only */
  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    setOtp(value);

    // Optional: Real-time validation
    if (value.length > 0 && value.length !== 6) {
      setOtpError("OTP must be exactly 6 digits.");
    } else {
      setOtpError("");
    }
  };
  /* End */

  return (
    <Container fluid className="h-100">
      <Row className="h-50">
        <Col md={6} className="p-0">
          <img
            src={studentPortalLogin}
            className="w-100 h-100 object-fit-cover"
            alt="Login background"
          />
        </Col>
        <Col md={6} className="d-flex align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} className="px-0">
                <img
                  src={studentPortalLoginLogo}
                  alt="StudyPal logo"
                />
                <h2 className="text-start mb-3 custom-color-title">Forget your password?</h2>
                <p className="text-start mb-4 small custom-color-title">Don't worry! It happens. Please follow the steps to reset your password.</p>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                {/* Step 1: Enter Email */}
                {step === 1 && (
                  <Form onSubmit={handleSendResetRequest}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label className="custom-label">Email address</Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Button
                      variant="danger"
                      type="submit"
                      className="my-3 m-0 btn-login-signup-forgetpassword"
                      style={{ width: '100%', height: '40px' }}
                    >
                      Send OTP
                    </Button>
                  </Form>
                )}

                {/* Step 2: Enter OTP */}
                {step === 2 && (
                  <Form onSubmit={handleVerifyOTP}>
                    <Form.Group controlId="formOTP">
                      <Form.Label className="custom-label">Enter OTP</Form.Label>
                      <Form.Control
                        type="text"
                        value={otp}
                        onChange={handleOtpChange} // Use the custom handler
                        required
                        maxLength={6} // Limit OTP to 6 digits
                        isInvalid={!!otpError} // Highlight input field if there's an error
                        placeholder="Enter 6-digit OTP"
                      />
                      <Form.Control.Feedback type="invalid">
                        {otpError}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button
                      variant="danger"
                      type="submit"
                      className="my-3 m-0 btn-login-signup-forgetpassword"
                      style={{ width: '100%', height: '40px' }}
                    >
                      Verify OTP
                    </Button>
                  </Form>
                )}

                {/* Step 3: Reset Password */}
                {step === 3 && (
                  <Form onSubmit={handleResetPassword}>
                    <Form.Group controlId="formNewPassword">
                      <Form.Label className="custom-label">New Password</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                          className="pe-5"
                        />
                        <div className="position-absolute top-50 end-0 translate-middle-y pe-3" style={{ zIndex: 10 }}>
                          <span
                            className="password-toggle"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            style={{ cursor: 'pointer' }}
                          >
                            {showNewPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                          </span>
                        </div>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formConfirmPassword">
                      <Form.Label className="custom-label">Confirm New Password</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          className="pe-5"
                        />
                        <div className="position-absolute top-50 end-0 translate-middle-y pe-3" style={{ zIndex: 10 }}>
                          <span
                            className="password-toggle"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            style={{ cursor: 'pointer' }}
                          >
                            {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                          </span>
                        </div>
                      </InputGroup>
                    </Form.Group>
                    <Button
                      variant="danger"
                      type="submit"
                      className="my-3 m-0 btn-login-signup-forgetpassword"
                      style={{ width: '100%', height: '40px' }}
                    >
                      Reset Password
                    </Button>
                  </Form>
                )}

                <div className="text-center text-lg-center m-5 pt-2">
                  <p className="small pt-1 mb-0 text-secondary">
                    Remember your password? <Link to="/studentPortalLogin" className="forgetpassword mx-2">Login now</Link>
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentPortalForgetPassword;
