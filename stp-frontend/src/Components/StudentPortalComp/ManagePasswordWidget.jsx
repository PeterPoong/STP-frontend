import React, { useState } from 'react';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Check if new password is same as current password
    if (newPassword === currentPassword) {
      setError("New password must be different from the current password");
      return;
    }

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
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

      if (response.ok) {
        setSuccess("Password updated successfully!");
        // Clear the form
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(data.message || "Failed to update password. Please try again.");
      }
    } catch (error) {
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
          <Form onSubmit={handleSubmit} className="w-100 px-4">
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
              <Form.Label className="fw-bold small formlabel">Confirm New Password<span className="text-danger">    *</span></Form.Label>
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
            <div className="d-flex justify-content-end my-4">
              <div className="d-flex justify-content-end w-50 ">
                <Button 
                  variant="danger" 
                  type="submit" 
                  className="mpbtndiv fw-bold rounded-pill mx-0"
                  disabled={isLoading}
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