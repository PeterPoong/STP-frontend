import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/AdminStyles/AdminLoginStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
// Images
import logo from '../../assets/AdminAssets/Images/logo.png';

const AdminLogin = () => {
  // Toggleable Password Field
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="login-page">
      <Container className="logo-container">
        <img src={logo} alt="Logo" className="logo-image" />
      </Container>

      <Container className="login-card">
        <Card className="login-container">
          <Card.Body>
            <Card.Title className="login-title">Log-In</Card.Title>
            <Form>
              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Your email" />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <div className="password-container">
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                  />
                  <span className="password-icon" onClick={togglePassword}>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </span>
                </div>
              </Form.Group>

              <Form.Group controlId="rememberMe" className="d-flex justify-content-between align-items-center">
                <Form.Check type="checkbox" label="Remember me" />
                <a href="/forgot-password" className="forgot-password">Forgot password?</a>
              </Form.Group>

              <Button variant="dark" type="submit" className="signup-button">Log in</Button>
            </Form>

            <div className="social-login">
              <p>Or with</p>
              <Button variant="outline-dark" className="social-button">
                <FontAwesomeIcon icon={faFacebook} /> Facebook
              </Button>
              <Button variant="outline-dark" className="social-button">
                <FontAwesomeIcon icon={faGoogle} /> Google
              </Button>
            </div>

            <div className="login-footer">
              Don't have an account? <a href="/signup">Sign up</a>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AdminLogin;
