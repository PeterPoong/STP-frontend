import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/StudentPortalCss/StudentPortalLoginForm.css";
import studentPortalLogin from "../../assets/StudentPortalAssets/studentPortalLogin.png";
import studentPortalLoginLogo from "../../assets/StudentPortalAssets/studentPortalLoginLogo.png";
import 'react-phone-input-2/lib/style.css';
import { Eye, EyeOff } from 'react-feather';


const StudentPortalResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
      console.log("New Password:", newPassword);
    }
  };
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
                  className="img-fluid mb-4 "
                  alt="StudyPal logo"
                />
                <h2 className="text-start mb-3 custom-color-title">Account exists.</h2>
                <p className="text-start mb-4  small custom-color-title">An account with your information existed in our databases. Please create a new password to activate the account.</p>
                <Form onSubmit={handleSubmit}>
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
                  {passwordError && <p className="text-danger">{passwordError}</p>}
                  <Button
                    variant="danger"
                    type="submit"
                    className="my-3 m-0"
                    style={{ width: '100%', height: '40px' }}
                  >
                    Save New Password
                  </Button>
                  <div className="text-center text-lg-center m-5 pt-2">
                    <p className="small pt-1 mb-0">Not Registered Yet? <Link to="/studentPortalSignUp" className="forgetpassword mx-2">Create an account</Link></p>
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