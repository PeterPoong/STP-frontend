import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/AdminStyles/AdminLoginStyles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// Images
import logo from '../../assets/AdminAssets/Images/logo.png'

const AdminSignup = () =>{

    // Toggleable Password Field
    const [showPasswordCreate, setShowPasswordCreate] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const togglePasswordCreate = () => setShowPasswordCreate(!showPasswordCreate);
    const togglePasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);

    return(
        <div className="login-page">
      <Container className="logo-container">
        <img src={logo} alt="Logo" className="logo-image" />
      </Container>

      <Container className="login-card">
        <Card className="login-container">
          <Card.Body>
            <Card.Title className="login-title">Sign Up</Card.Title>
            <Form>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="example@gmail.com" />
              </Form.Group>

              <Form.Group controlId="passwordCreate">
              <Form.Label>Create a Password</Form.Label>
              <div className="password-container">
                <Form.Control
                  type={showPasswordCreate ? 'text' : 'password'}
                  placeholder="must be 8 characters"
                />
                <span className="password-icon" onClick={togglePasswordCreate}>
                  <FontAwesomeIcon icon={showPasswordCreate ? faEyeSlash : faEye} />
                </span>
              </div>
            </Form.Group>

            <Form.Group controlId="passwordConfirm">
              <Form.Label>Confirm Password</Form.Label>
              <div className="password-container">
                <Form.Control
                  type={showPasswordConfirm ? 'text' : 'password'}
                  placeholder="repeat password"
                />
                <span className="password-icon" onClick={togglePasswordConfirm}>
                  <FontAwesomeIcon icon={showPasswordConfirm ? faEyeSlash : faEye} />
                </span>
              </div>
            </Form.Group>

              <Button variant="dark" type="submit" className="signup-button">Sign Up</Button>
            </Form>
            <div className="login-footer">
              Already have an account? <a href="/login">Log in</a>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
    );
};

export default AdminSignup;