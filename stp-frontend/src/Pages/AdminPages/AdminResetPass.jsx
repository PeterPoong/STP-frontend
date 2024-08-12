import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirect
import { Container, Form, Button, Card, CardBody } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/AdminStyles/AdminLoginStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// Images
import logo from '../../assets/AdminAssets/Images/logo.png';

const AdminResetPass = () => {
    return (
        <div className='login-page'>
            <Container className="logo-container">
                <img src={logo} alt="Logo" className="logo-image" />
            </Container>

            <Container className='login-card'>
                <Card className='login-container'>
                    <Card.Body>
                        <Card.Title className="login-title">Reset Password</Card.Title>
                        <span>Please type something you’ll remember</span>
                    <Form>
                        <Form.Group controlId="passwordCreate">
                            <Form.Label className='FGP-email'>Create a Password</Form.Label>
                            <Form.Control type="password" placeholder="must be 8 characters" />
                        </Form.Group>

                        <Form.Group controlId="passwordConfirm">
                            <Form.Label className='FGP-email'>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="repeat password" />
                        </Form.Group>

                        <Button variant="dark" type="submit" className="signup-button">Reset Password</Button>
                    </Form>
                        <div className="login-footer">
                            Already have an account? <a href="/adminLogin">Log in</a>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default AdminResetPass;