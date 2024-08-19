import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/AdminStyles/AdminLoginStyles.css';
// Images
import logo from '../../assets/AdminAssets/Images/logo.png';

const AdminForgetPass = () => {
    const [email, setEmail] = useState(''); // State to manage the email input
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: email,
            type: 'admin' // Fixed type value
        };

        try {
            const response = await axios.post('http://192.168.0.69:8000/api/sendOtp', data);
            if (response.status === 200) {
                // Redirect to /adminPassCode with the email as state
                navigate('/adminPassCode', { state: { email: email } });
            }
        } catch (error) {
            // Handle errors, e.g., show an error message
            alert('Failed to send OTP. Please try again.');
            console.error('There was an error sending the OTP:', error);
        }
    };

    return (
        <div className='login-page'>
            <Container className="logo-container">
                <img src={logo} alt="Logo" className="logo-image" />
            </Container>

            <Container className='login-card'>
                <Card className='login-container'>
                    <Card.Body>
                        <Card.Title className="login-title">Forgot Password?</Card.Title>
                        <span>Don’t worry! It happens. Please enter the email associated with your account.</span>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="email">
                                <Form.Label className='FGP-email'>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="example@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} // Update email state on change
                                    required
                                />
                            </Form.Group>
                            <input type="hidden" value="admin" /> {/* Hidden input for type */}
                            <Button variant="dark" type="submit" className="signup-button">Send Code</Button>
                        </Form>
                        <div className="login-footer">
                            Remember Password? <a href="/adminLogin">Log in</a>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default AdminForgetPass;
