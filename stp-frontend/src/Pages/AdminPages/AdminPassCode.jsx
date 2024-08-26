import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/AdminStyles/AdminLoginStyles.css';
// Images
import logo from '../../assets/AdminAssets/Images/logo.png';

const AdminPassCode = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || ''; // Get email from state or fallback to an empty string

    const [code, setCode] = useState(['', '', '', '', '', '']); // 6 digits instead of 4
    const [timeLeft, setTimeLeft] = useState(20);
    const [isResendEnabled, setIsResendEnabled] = useState(false);
    const inputRefs = useRef([]); // Use ref to manage focus on input fields

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else {
            setIsResendEnabled(true);
        }
    }, [timeLeft]);

    // Handle code input change
    const handleCodeChange = (e, index) => {
        const { value } = e.target;
        const newCode = [...code];
        
        // Only accept a single digit, and move to the next input
        if (/^\d$/.test(value)) {
            newCode[index] = value;
            setCode(newCode);
            
            // Automatically focus the next input field if not the last one
            if (index < code.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        } else if (value === '') {
            // If the value is empty (e.g., from backspace), update the code array
            newCode[index] = '';
            setCode(newCode);
        }
    };

    // Handle key down to manage backspace functionality
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (code[index] === '') {
                // If the current input is already empty, move to the previous input
                if (index > 0) {
                    inputRefs.current[index - 1].focus();
                }
            } else {
                // If there's a digit in the current input, clear it
                const newCode = [...code];
                newCode[index] = '';
                setCode(newCode);
            }
        }
    };

    // Handle resend code (mock function)
    const handleResendCode = () => {
        // Logic to resend code
        console.log('Resend code');
        setTimeLeft(20);
        setIsResendEnabled(false);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const otp = code.join(''); // Combine the 6 digits into a single string
        const data = {
            email: email,
            otp: otp,
            type: 'admin',
        };

        try {
            const response = await axios.post('http://192.168.0.69:8000/api/validateOtp', data);
            if (response.status === 200) {
                // Handle success, redirect to reset password page
                alert('OTP validated successfully!');
                navigate('/adminResetPass', { state: { email: email, type: 'admin' } });
            }
        } catch (error) {
            // Handle errors, e.g., show an error message
            alert('Failed to validate OTP. Please try again.');
            console.error('There was an error validating the OTP:', error);
        }
    };

    return (
        <div className="login-page">
            <Container className="logo-container">
                <img src={logo} alt="Logo" className="logo-image" />
            </Container>

            <Container className="login-card">
                <Card className="login-container">
                    <Card.Body>
                        <Card.Title className="login-title">Please check your email</Card.Title>
                        <div className='spanHolder'>
                            <span>We've sent a code to {email}</span> {/* Display the email */}
                        </div>
                        <Form onSubmit={handleSubmit}>
                            <div className="code-inputs">
                                {code.map((digit, index) => (
                                    <Form.Control
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleCodeChange(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        className="code-input"
                                        ref={(el) => inputRefs.current[index] = el} // Set ref for each input
                                    />
                                ))}
                            </div>

                            <Button variant="dark" type="submit" className="signup-button">Verify</Button>
                        </Form>
                        <div className="login-footer">
                            <Button
                                variant="link"
                                className="resend-button"
                                onClick={handleResendCode}
                                disabled={!isResendEnabled}
                            >
                                Send code again {timeLeft > 0 && `00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`}
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default AdminPassCode;
