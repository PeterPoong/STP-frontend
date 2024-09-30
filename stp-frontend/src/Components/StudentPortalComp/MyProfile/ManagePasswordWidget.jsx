import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'react-feather';
import { Form, Button, InputGroup, Card, Alert } from "react-bootstrap";

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
  const [hasToken, setHasToken] = useState(false);
  const [userName, setUserName] = useState("");
  const [showValidation, setShowValidation] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    if (token) {
      setHasToken(true);
      const storedUserName = sessionStorage.getItem("userName") || localStorage.getItem("userName");
      if (storedUserName) {
        setUserName(storedUserName);
      }
    } else {
      setHasToken(false);
    }
  }, []);

  useEffect(() => {
    validatePassword(newPassword);
    setIsSameAsCurrentPassword(newPassword === currentPassword && newPassword !== "");
    setHasChanges(currentPassword !== "" || newPassword !== "" || confirmPassword !== "");
  }, [newPassword, currentPassword, confirmPassword]);

  const validatePassword = (password) => {
    let strength = 0;
    let feedback = [];

    if (password.length >= 8) {
      strength += 1;
    } else {
      feedback.push("Password must be at least 8 characters long");
    }

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
    setShowValidation(true);

    if (!validatePasswords()) {
      return;
    }

    setIsLoading(true);

    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/resetStudentPassword`, {
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

      if (data.success) {
        setSuccess(data.data.messenger || "Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setPasswordStrength(0);
        setPasswordFeedback([]);
        setIsSameAsCurrentPassword(false);
        setHasChanges(false);
        setShowValidation(false);
      } else {
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
      <h4 className="title-widget">{userName}'s Profile</h4>
      <Card className="mb-4">
        <Card.Body className="mx-4">
          <div className="border-bottom mb-4">
            <h2 className="fw-light title-widgettwo" style={{ color: "black" }}>Manage Password</h2>
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit} className="w-75 mx-auto">
            <Form.Group className="mb-3 mpw-inputholder" controlId="formCurrentPassword">
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
                  className="bg-transparent border-start-0 password-toggle-mp"
                  style={{ zIndex: 10 }}
                >
                  {showCurrentPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3 mpw-inputholder" controlId="formNewPassword">
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
                  className="bg-transparent border-start-0 password-toggle-mp"
                  style={{ zIndex: 10 }}
                >
                  {showNewPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </InputGroup.Text>
              </InputGroup>
              <div className="password-strength-meter mt-2">
                <div className="strength-bar" style={{ width: `${passwordStrength * 20}%` }}></div>
              </div>
              {showValidation && passwordFeedback.map((feedback, index) => (
                <small key={index} className="text-danger d-block">{feedback}</small>
              ))}
              {showValidation && isSameAsCurrentPassword && (
                <small className="text-danger d-block">New password must be different from the current password</small>
              )}
            </Form.Group>
            <Form.Group className="mb-3 mpw-inputholder" controlId="formConfirmPassword">
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
                  className="bg-transparent border-start-0 password-toggle-mp"
                  style={{ zIndex: 10 }}
                >
                  {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </InputGroup.Text>
              </InputGroup>
              {showValidation && confirmPassword && newPassword !== confirmPassword && (
                <small className="text-danger">Passwords do not match</small>
              )}
            </Form.Group>
            <div className="d-flex justify-content-end my-4">
              <div className="d-flex justify-content-end">
                <Button 
                  variant="danger" 
                  type="submit" 
                  className="mpbtndiv fw-bold rounded-pill mx-0"
                  disabled={!hasChanges}
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