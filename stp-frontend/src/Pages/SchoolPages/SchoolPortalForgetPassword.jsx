import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/SchoolPortalStyle/SchoolPortalLoginForm.css";
import schoolPortalLoginBanner from "../../assets/SchoolPortalAssets/SchoolPortalLogin.png";
import schoolPortalLoginLogo from "../../assets/SchoolPortalAssets/SchoolPortalLoginLogo.png";
import "react-phone-input-2/lib/style.css";
import styles from "../../css/SchoolPortalStyle/ForgotPassword.module.css";

const SchoolPortalForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSendResetRequest = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    console.log("Initiating password reset request for email:", email);

    try {
      //console.log(
      //  "Sending request to:",
      //  `${import.meta.env.VITE_BASE_URL}sendOtp`
      //);
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/sendOtp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            type: "school",
          }),
        }
      );

      // console.log("Response status:", response.status);

      const responseText = await response.text();
      // console.log("Raw response:", responseText);

      if (response.ok) {
        console.log("Reset request sent successfully");
        setSuccess(
          "OTP sent successfully. Please check your email for the OTP."
        );
        setStep(2); // Move to OTP input step
      } else {
        console.error("Failed to send reset request:", responseText);
        const response = JSON.parse(responseText);
        const errorMessage =
          response.error?.email?.[0] ||
          "Failed to send reset request. Please try again.";
        setError(errorMessage);
        // setError(responseText || "Failed to send reset request. Please try again.");
      }
    } catch (error) {
      console.error("Error in sending reset request:", error);
      setError(
        "An error occurred while sending the reset request. Please try again later."
      );
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    //console.log("Verifying OTP for email:", email);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/validateOtp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            otp: otp,
            type: "school",
          }),
        }
      );

      // console.log("Response status:", response.status);
      const responseText = await response.json();
      // console.log("Raw responses:", responseText);

      if (response.ok) {
        // console.log("OTP verified successfully");
        setSuccess("OTP verified successfully. Please set your new password.");
        setStep(3); // Move to password reset step
      } else if (response.status === 404) {
        // console.error("Verify OTP endpoint not found");
        setError(
          "The OTP verification service is currently unavailable. Please try again later or contact support."
        );
      } else {
        if (responseText.message === "Validation Error") {
          setError(responseText.error.otp);
          // console.log("error message", responseText.error.otp);
        } else {
          setError(responseText.message);

          // console.log("wrong");
        }
        // setError(
        //   responseText["success"] || "Failed to verify OTP. Please try again."
        // );
      }
    } catch (error) {
      console.error("Error in verifying OTP:", error);
      setError(
        "An error occurred while verifying the OTP. Please check your internet connection and try again."
      );
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    //console.log("Initiating password reset for email:", email);

    try {
      //console.log(
      //  "Sending request to:",
      //  "http://192.168.0.69:8000/api/resetPassword"
      //);
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/resetPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
            type: "school",
          }),
        }
      );

      //console.log("Response status:", response.status);
      const responseText = await response.text();
      //console.log("Raw response:", responseText);

      if (response.ok) {
        console.log("Password reset successful");
        setSuccess(
          "Password reset successfully. You can now login with your new password."
        );
        setTimeout(() => navigate("/schoolPortalLogin"), 3000);
      } else {
        console.error("Failed to reset password:", responseText);
        setError(responseText || "Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Error in resetting password:", error);
      setError(
        "An error occurred while resetting the password. Please check your internet connection and try again."
      );
    }
  };
  return (
    <Container fluid className="h-100">
      <Row className="h-50">
        <Col md={6} className="d-flex align-items-center bg-white">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} className="px-0">
                <div className="studypal-school-logo-div"></div>

                <h2 className="text-start mb-3 custom-color-title">
                  Forget your password?
                </h2>
                <p className="text-start mb-4 small custom-color-title">
                  Don't worry! It happens. Please follow the steps to reset your
                  password.
                </p>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                {step === 1 && (
                  <Form onSubmit={handleSendResetRequest}>
                    <Form.Group controlId="formBasicEmail">
                      <p className="text-start p-0 mb-0 custom-color-title-label small ">
                        Email address
                      </p>
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
                      // className="my-3 m-0"
                      className={`my-3 m-0 ${styles.sendOtpButton}`}
                    // style={{ width: "100%", height: "40px" }}
                    >
                      Send OTP
                    </Button>
                  </Form>
                )}
                {step === 2 && (
                  <Form onSubmit={handleVerifyOTP}>
                    <Form.Group controlId="formOTP">
                      <p className="text-start p-0 mb-0 custom-color-title-label small ">
                        Enter OTP
                      </p>
                      <Form.Control
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Button
                      variant="danger"
                      type="submit"
                      className="my-3 m-0"
                      style={{ width: "100%", height: "40px" }}
                    >
                      Verify OTP
                    </Button>
                  </Form>
                )}
                {step === 3 && (
                  <Form onSubmit={handleResetPassword}>
                    <Form.Group controlId="formNewPassword">
                      <p className="text-start p-0 mb-0 custom-color-title-label small ">
                        New Password
                      </p>
                      <Form.Control
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="formConfirmPassword">
                      <p className="text-start p-0 mb-0 custom-color-title-label small ">
                        Confirm New Password
                      </p>
                      <Form.Control
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
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
                )}
                <div className="text-center text-lg-center m-5 pt-2">
                  <p className="small pt-1 mb-0 text-secondary">
                    Remember your password?{" "}
                    <Link
                      to="/schoolPortalLogin"
                      className="forgetpassword mx-2"
                    >
                      Login now
                    </Link>
                  </p>
                </div>
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

export default SchoolPortalForgetPassword;
