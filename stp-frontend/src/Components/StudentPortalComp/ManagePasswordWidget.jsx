import React, { useState, useEffect } from 'react';
import "../../css/StudentPortalStyles/StudentPortalLoginForm.css";
import { Eye, EyeOff } from 'react-feather';
import { Form, Button, Container, Row, Col, InputGroup, Card, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ManagePasswordWidget = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordFeedback, setPasswordFeedback] = useState([]);
  const [isSameAsCurrentPassword, setIsSameAsCurrentPassword] = useState(false);

  useEffect(() => {
    validatePassword(newPassword);
    setIsSameAsCurrentPassword(newPassword === currentPassword && newPassword !== "");
  }, [newPassword, currentPassword]);

  const validatePassword = (password) => {
    let strength = 0;
    let feedback = [];

    if (password.length >= 8) {
      strength += 1;
    } else {
      feedback.push("Password must be at least 8 characters long");
    }
/*
    if (/[A-Z]/.test(password)) {
      strength += 1;
    } else {
      feedback.push("Password must contain at least one uppercase letter");
    }

    if (/[a-z]/.test(password)) {
      strength += 1;
    } else {
      feedback.push("Password must contain at least one lowercase letter");
    }

    if (/[0-9]/.test(password)) {
      strength += 1;
    } else {
      feedback.push("Password must contain at least one number");
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      strength += 1;
    } else {
      feedback.push("Password must contain at least one special character");
    }
      */

    setPasswordStrength(strength);
    setPasswordFeedback(feedback);
  };

  const validatePasswords = () => {
    if (newPassword.length < 8 || confirmPassword.length < 8) {
      setError("New password and confirm password must be at least 8 characters long");
      return false;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return false;
    }

    if (newPassword === currentPassword) {
      setError("New password must be different from the current password");
      return false;
    }

    if (passwordStrength < 1) {
      setError("Password is not strong enough. Please follow the password requirements.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validatePasswords()) {
      return;
    }

    setIsLoading(true);

    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch('http://192.168.0.69:8000/api/student/resetStudentPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: currentPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword
        })
      });

      const data = await response.json();

      console.log('API Response:', response);
      console.log('Response status:', response.status);
      console.log('Response data:', data);

      if (data.success) {
        console.log('Password reset successful');
        setSuccess(data.data.messenger || "Password updated successfully!");
        // Clear the form
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setPasswordStrength(0);
        setPasswordFeedback([]);
        setIsSameAsCurrentPassword(false);
      } else {
        console.log('Password reset failed');
        if (data.message === "Validation Error" && data.error && data.error[0]) {
          setError(data.error[0][0] || "Failed to update password. Please check your current password and try again.");
        } else {
          setError(data.message || "Failed to update password. Please try again.");
        }
      }
    } catch (error) {
      console.error('Error in API call:', error);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div>
      <h4 className="title-widget">David Lim's Profile</h4>
      <Card className="mb-4">
        <Card.Body className="mx-4">
          <div className="border-bottom mb-4">
            <h2 className="fw-light title-widgettwo" style={{ color: "black" }}>Basic Information</h2>
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit} className="w-100 px-4 ">
            <Form.Group className="mb-3" controlId="formCurrentPassword">
              <Form.Label className="fw-bold small formlabel">Current Password<span className="text-danger">    *</span></Form.Label>
              <InputGroup className="password-input-group">
                <Form.Control
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
                <InputGroup.Text
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="bg-transparent border-start-0 password-toggle"
                >
                  {showCurrentPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNewPassword">
              <Form.Label className="fw-bold small formlabel">New Password<span className="text-danger">    *</span></Form.Label>
              <InputGroup className="password-input-group">
                <Form.Control
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <InputGroup.Text
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="bg-transparent border-start-0 password-toggle"
                >
                  {showNewPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </InputGroup.Text>
              </InputGroup>
              <div className="password-strength-meter mt-2">
                <div className="strength-bar" style={{ width: `${passwordStrength * 20}%` }}></div>
              </div>
              {passwordFeedback.map((feedback, index) => (
                <small key={index} className="text-danger d-block">{feedback}</small>
              ))}
              {isSameAsCurrentPassword && (
                <small className="text-danger d-block">New password must be different from the current password</small>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label className="fw-bold small formlabel">Confirm New Password<span className="text-danger">    *</span></Form.Label>
              <InputGroup className="password-input-group">
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <InputGroup.Text
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="bg-transparent border-start-0 password-toggle"
                >
                  {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </InputGroup.Text>
              </InputGroup>
              {confirmPassword && newPassword !== confirmPassword && (
                <small className="text-danger">Passwords do not match</small>
              )}
            </Form.Group>
            <div className="d-flex justify-content-end my-4">
              <div className="d-flex justify-content-end w-50 ">
                <Button 
                  variant="danger" 
                  type="submit" 
                  className="mpbtndiv fw-bold rounded-pill mx-0"
                 
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ManagePasswordWidget;