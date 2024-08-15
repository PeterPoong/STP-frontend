import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert, Modal } from "react-bootstrap";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/StudentPortalCss/StudentPortalLoginForm.css";
import studentPortalLogin from "../../assets/StudentPortalAssets/studentPortalLogin.png";
import studentPortalLoginLogo from "../../assets/StudentPortalAssets/studentPortalLoginLogo.png";
import { Eye, EyeOff } from 'react-feather';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const StudentPortalSignUp = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState('');
  const [identityCard, setIdentityCard] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupStatus, setSignupStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handlePhoneChange = (value, country, event, formattedValue) => {
    const digitsOnly = value.replace(/\D/g, '');
    setPhone(digitsOnly);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSignupStatus(null);
    if (password !== confirmPassword) {
      setSignupStatus('password_mismatch');
      return;
    }
    const countryCode = phone.slice(0, phone.length - 10);
    const contactNumber = phone.slice(-10);
    const formData = {
      name: name,
      email: email,
      password: password,
      confirm_password: confirmPassword,
      type: "student",
      country_code: countryCode.startsWith('+') ? countryCode : `+${countryCode}`,
      contact_number: contactNumber,
    };
    console.log('Sending signup data:', formData);
    axios.post('http://192.168.0.69:8000/api/student/register', formData)
      .then(response => {
        console.log('Full API response:', response);
        if (response.data.success === true) {
          console.log('Signup successful:', response.data);
          setSignupStatus('success');
          if (response.data.data && response.data.data.token) {
            sessionStorage.setItem('token', response.data.data.token);
          }
          setTimeout(() => navigate('/studentPortalBasicInformations'), 1500);
        } else {
          console.error('Signup failed:', response.data);
          setSignupStatus('failed');
        }
      })
      .catch(error => {
        console.error('Error during signup:', error);
        if (error.response && error.response.data && error.response.data.message) {
          if (error.response.data.message.includes("already registered")) {
            setShowModal(true);
          } else {
            setSignupStatus('error');
          }
        } else {
          setSignupStatus('error');
        }
      });
  };
  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col md={6} className="p-0">
          <img src={studentPortalLogin} className="w-100 h-100 object-fit-cover" alt="Background" />
        </Col>
        <Col md={6} className="d-flex align-items-center justify-content-center">
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <img src={studentPortalLoginLogo} className="img-fluid mb-4" alt="StudyPal Logo" />
            <h2 className="text-start mb-2 custom-color-title ">Start your journey here.</h2>
            <p className="text-start mb-4 custom-color-title small">Find the right university of your choice.</p>
            {signupStatus === 'success' && (
              <Alert variant="success">Signup successful! Redirecting...</Alert>
            )}
            {signupStatus === 'failed' && (
              <Alert variant="danger">Signup failed. Please try again.</Alert>
            )}
            {signupStatus === 'error' && (
              <Alert variant="danger">An error occurred. Please try again later.</Alert>
            )}
            {signupStatus === 'password_mismatch' && (
              <Alert variant="danger">Passwords do not match. Please try again.</Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="custom-label ">Name</Form.Label>
                <Form.Control type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
              </Form.Group>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group controlId="formBasicPhone" className="mb-3">
                    <Form.Label className="custom-label">Contact Number</Form.Label>
                    <PhoneInput
                      country={'us'}
                      value={phone}
                      onChange={handlePhoneChange}
                      inputProps={{
                        name: 'phone',
                        required: true,
                        placeholder: 'Enter phone number',
                      }}
                      inputClass="form-control"
                      containerClass="phone-input-container"
                      buttonClass="btn btn-outline-secondary"
                      dropdownClass="country-dropdown custom-dropdown"
                      countryCodeEditable={false}
                      disableCountryCode={false}
                      disableDropdown={false}
                      autoFormat={false}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="custom-label">Identity Card Number</Form.Label>
                    <Form.Control type="text" placeholder="XXXXXXXX" value={identityCard} onChange={(e) => setIdentityCard(e.target.value)} required />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label className="custom-label ">Email Address</Form.Label>
                <Form.Control type="email" placeholder="mail123@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="custom-label ">Password</Form.Label>
                    <div className="position-relative">
                      <Form.Control type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required />
                      <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                      </span>
                    </div>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="custom-label ">Confirm Password</Form.Label>
                    <div className="position-relative">
                      <Form.Control type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                      <span className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                      </span>
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="danger" type="submit" className="w-100 mt-3 mb-3 m-0">Sign Up</Button>
              <p className="text-center text-muted small">or Login/Sign Up using</p>
              <Row className="justify-content-center">
                <Col xs="auto">
                  <button type="button" className="btn btn-outline-primary rounded-circle p-0 social-btn facebook-btn" style={{ width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </button>
                </Col>
                <Col xs="auto">
                  <button type="button" className="btn btn-outline-danger rounded-circle p-0 mb-5 social-btn google-btn" style={{ width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z" />
                    </svg>
                  </button>
                </Col>
              </Row>
              <p className="text-center small mb-0">Already have an account? <Link to="/studentPortalLogin" className="text-danger">Login now</Link></p>
            </Form>
          </div>
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Account Already Exists</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>An account with this email or phone number is already registered. Would you like to login instead?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => navigate('/studentPortalLogin')}>
            Go to Login
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default StudentPortalSignUp;