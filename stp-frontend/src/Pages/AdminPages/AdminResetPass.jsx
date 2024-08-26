import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { Container, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/AdminStyles/AdminLoginStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// Images
import logo from '../../assets/AdminAssets/Images/logo.png';

const AdminResetPass = () => {
    const location = useLocation();
    const { email, type } = location.state || {}; // Destructure email and type from state

    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswordCreate, setShowPasswordCreate] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const togglePasswordCreate = () => setShowPasswordCreate(!showPasswordCreate);
    const togglePasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = {
            email,  // Email from state
            type,   // Type from state
            newPassword: password,
            confirmPassword: confirmPassword,
        };

        fetch('http://192.168.0.69:8000/api/resetPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Reset successfully', data);
                navigate('/adminLogin'); // Redirect to login page
            } else {
                setErrorMessage(`Reset password failed: ${data.message}`);
                console.error('Reset failed:', data);
            }
        })
        .catch(error => {
            setErrorMessage('An error occurred during reset password. Please try again later.');
            console.error('Error during reset password:', error);
        });
    };

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
                        <Form onSubmit={handleSubmit}>

                            <Form.Group controlId="passwordCreate">
                                <Form.Label className='FGP-email'>Create a Password</Form.Label>
                                <div className="password-container">
                                <Form.Control
                                    type={showPasswordCreate ? "text" : "password"}
                                    placeholder="Must be 8 characters"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span className="password-icon" onClick={togglePasswordCreate}>
                                        <FontAwesomeIcon icon={showPasswordCreate ? faEyeSlash : faEye} />
                                    </span>
                                </div>
                            </Form.Group>

                            <Form.Group controlId="passwordConfirm">
                                <Form.Label className='FGP-email'>Confirm Password</Form.Label>
                                <div className="password-container">
                                <Form.Control
                                    type={showPasswordConfirm ? "text" : "password"}
                                    placeholder="Repeat password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <span className="password-icon" onClick={togglePasswordConfirm}>
                                        <FontAwesomeIcon icon={showPasswordConfirm ? faEyeSlash : faEye} />
                                    </span>
                                </div>
                            </Form.Group>

                            <Button variant="dark" type="submit" className="signup-button">Reset Password</Button>
                        </Form>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
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
