import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Container, Row, Col, InputGroup, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/StudentPortalStyles/StudentPortalLoginForm.css";
import studentPortalLogin from "../../assets/StudentPortalAssets/studentPortalLogin.png";
import studentPortalLoginLogo from "../../assets/StudentPortalAssets/studentPortalLoginLogo.png";
import 'react-phone-input-2/lib/style.css';
import { Eye, EyeOff } from 'react-feather';


const StudentPortalResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  /*loading to check whether have token or not if dont will navigate back to login page */
  useEffect(() => {
    if (!location.state || !location.state.token || !location.state.userId) {
      setError("No authentication token or user ID provided. Please log in first.");
      setTimeout(() => navigate('/studentPortalLogin'), 3000);
    }
  }, [location.state, navigate]);
  /*end */

  /*api for reset Dummy Account Password */
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const token = location.state?.token;
    const userId = location.state?.userId;
    if (!token || !userId) {
      setError("No authentication token or user ID found. Please log in again.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/resetDummyAccountPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: userId,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        }),
      });
      //console.log("Response status:", response.status);
      const responseData = await response.json();
      //console.log("Response data:", responseData); 
      if (response.ok) {
        //console.log("Password reset successful");
        setSuccess("Password reset successfully. You can now login with your new password.");
        setTimeout(() => navigate('/studentPortalLogin'), 2000);
      } else {
        console.error("Failed to reset password:", responseData.message);
        setError(responseData.message || "Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Error in resetting password:", error);
      setError("An error occurred while resetting the password. Please check your internet connection and try again.");
    }
  };
  /*end*/

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
                <h2 className="text-start mb-3 custom-color-title">Reset Your Password</h2>
                <p className="text-start mb-4 small custom-color-title">Please create a new password for your account.</p>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <Form onSubmit={handleResetPassword}>
                  <Form.Group className="mb-3" controlId="formNewPassword">
                    <Form.Label className="custom-label">New Password</Form.Label>
                    <InputGroup className="password-input-group">
                      <Form.Control
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                      <InputGroup.Text
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="bg-transparent border-start-0 password-toggle"
                      >
                        {showNewPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formConfirmPassword">
                    <Form.Label className="custom-label">Confirm New Password</Form.Label>
                    <InputGroup className="password-input-group">
                      <Form.Control
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <InputGroup.Text
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="bg-transparent border-start-0 password-toggle"
                      >
                        {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Button
                    variant="danger"
                    type="submit"
                    className="my-3 m-0 btn-login-signup-forgetpassword"
                    style={{ width: '100%', height: '40px' }}
                  >
                    Save New Password
                  </Button>
                  <div className="text-center text-lg-center m-5 pt-2">
                    <p className="small pt-1 mb-0">Remember your password? <Link to="/studentPortalLogin" className="forgetpassword mx-2">Login here</Link></p>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentPortalResetPassword;