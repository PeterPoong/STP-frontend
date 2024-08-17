import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert, InputGroup } from "react-bootstrap";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/StudentPortalCss/StudentPortalLoginForm.css";
import studentPortalLogin from "../../assets/StudentPortalAssets/studentPortalLogin.png";
import studentPortalLoginLogo from "../../assets/StudentPortalAssets/studentPortalLoginLogo.png";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import moment from 'moment';
import { Eye, EyeOff } from 'react-feather';

const StudentPortalLogin = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [countryCodes, setCountryCodes] = useState([]);
  const [loginStatus, setLoginStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://192.168.0.69:8000/api/countryCode')
      .then(response => {
        if (response.data.success) {
          setCountryCodes(response.data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching country codes:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginStatus(null);
    const countryCode = phone.slice(0, phone.length - 10);
    const contactNumber = phone.slice(-10);
    const formattedCountryCode = countryCode.startsWith('+') ? countryCode : `+${countryCode}`;
    const formData = {
      password: password,
      country_code: formattedCountryCode,
      contact_number: contactNumber,
    };
    console.log('Sending login data:', formData);
    axios.post('http://192.168.0.69:8000/api/student/login', formData)
      .then(response => {
        console.log('Full API response:', response);
        if (response.data.true === true) {
          console.log('Login successful:', response.data);
          setLoginStatus('success');
          sessionStorage.setItem('token', response.data.data.token)
          sessionStorage.setItem('loginTimestamp', moment().toISOString());
          setTimeout(() => navigate('/studentPortalBasicInformations'), 6000);
        } else {
          console.error('Login failed:', response.data);
          setLoginStatus('failed');
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
        setLoginStatus('error');
        if (error.response) {
          console.error('Error response from server:', error.response.data);
          console.error('Error status:', error.response.status);
          console.error('Error headers:', error.response.headers);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
      });
  };

  return (
    <Container fluid className="h-100">
      <Row className="h-50">
        <Col md={6} className="p-0 h-100">
          <img
            src={studentPortalLogin}
            alt="Student Portal Login"
            className="w-100 h-100 object-fit-cover"
          />
        </Col>
        <Col md={6} className="d-flex align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} className="px-0">
                <img
                  src={studentPortalLoginLogo}
                  alt="Student Portal Login Logo"
                  className="img-fluid d-flex justify-content-start"
                />
                <h2 className="text-start mb-2 custom-color-title">Login as Student</h2>
                <p className="text-start mb-4 small custom-color-title">Log in to get started.</p>
                {loginStatus === 'success' && (
                  <Alert variant="success">Login successful! Redirecting...</Alert>
                )}
                {loginStatus === 'failed' && (
                  <Alert variant="danger">Login failed. Please check your credentials.</Alert>
                )}
                {loginStatus === 'error' && (
                  <Alert variant="danger">An error occurred. Please try again later.</Alert>
                )}
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicPhone" className="mb-3">
                    <Form.Label className="custom-label">Contact Number</Form.Label>
                    <PhoneInput
                      country={'us'}
                      value={phone}
                      onChange={(value) => setPhone(value)}
                      inputProps={{
                        name: 'phone',
                        required: true,
                        placeholder: 'Enter phone number'
                      }}
                      inputClass="form-control"
                      containerClass="phone-input-container"
                      buttonClass="btn btn-outline-secondary"
                      dropdownClass="country-dropdown custom-dropdown"
                      countryCodeEditable={true}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword" className="mb-3">
                    <Form.Label className="custom-label">Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pe-5"
                      />
                      <div className="position-absolute top-50 end-0 translate-middle-y pe-3" style={{ zIndex: 10 }}>
                        <span
                          className="password-toggle"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ cursor: 'pointer' }}
                        >
                          {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                        </span>
                      </div>
                    </InputGroup>
                  </Form.Group>
                  <Row className="mb-3">
                    <Col>
                      <Form.Check
                        type="checkbox"
                        id="rememberMe"
                        label="Remember me"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="custom-checkbox"
                      />
                    </Col>
                    <Col className="text-end">
                      <Link to="/studentPortalForgetPassword" className="forgetpassword">Forgot password?</Link>
                    </Col>
                  </Row>
                  <Button
                    variant="danger"
                    type="submit"
                    className="my-3 m-0"
                    style={{ width: '100%', height: '40px' }}
                  >
                    Login
                  </Button>
                  <Row>
                    <Col>
                      <p className="text-center text-secondary small">or Login/Signup using</p>
                    </Col>
                  </Row>
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
                  <div className="text-center text-lg-center m-5 pt-2">
                    <p className="small pt-1 mb-0 text-secondary">Not Registered Yet? <Link to="/studentPortalSignUp" className="forgetpassword mx-1">Create an account</Link></p>
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

export default StudentPortalLogin;