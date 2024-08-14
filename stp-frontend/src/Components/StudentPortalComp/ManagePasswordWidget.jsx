import React,  { useState } from 'react';
import "../../css/StudentPortalCss/StudentPortalLoginForm.css";
import PhoneInput from 'react-phone-input-2';
import "../../css/StudentPortalCss/StudentPortalLoginForm.css";
import { Eye, EyeOff } from 'react-feather'; 
import { Form, Button, Container, Row, Col, InputGroup,Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ManagePasswordWidget = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (newPassword !== confirmPassword) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
        // Handle password reset logic here
        console.log("New Password:", newPassword);
      }
    };
  return (
    <div>
    <h4>David Lim's Profile</h4>
    <Card className="mb-4 ">
      <Card.Body >
        <div className="border-bottom  mb-4">
        <h2 className=" lead fw-normal " style={{color:"black"}}>Basic Information</h2>
        </div>
        <Form onSubmit={handleSubmit} className="w-0 ">
        <Form.Group className="mb-3" controlId="formCurrentPassword">
              <Form.Label className="fw-bold small">Current Password<span className="text-danger">    *</span></Form.Label>
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
            <Form.Label className="fw-bold small">New Password<span className="text-danger">    *</span></Form.Label>
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
            <Form.Label className="fw-bold small">Comfirm New Password<span className="text-danger">    *</span></Form.Label>
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
                    {passwordError && <p className="text-danger">{passwordError}</p>}
                    <div className="d-flex justify-content-end mt-3">
            <div className="w-25">
              <Button variant="danger" type="submit" className="m-0 w-100 fw-bold rounded-pill">
                Save
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