import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/AdminStyles/AdminLoginStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
// Images
import logo from '../../assets/AdminAssets/Images/logo.png';

const AdminSignup = () => {
    const navigate = useNavigate();

    const [countryCode, setCountryCode] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPasswordCreate, setShowPasswordCreate] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const togglePasswordCreate = () => setShowPasswordCreate(!showPasswordCreate);
    const togglePasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);

    useEffect(() => {
        fetch('http://192.168.0.69:8000/api/countryCode')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setCountryCodes(data.data);
                }
            })
            .catch(error => {
                console.error('Error fetching country codes:', error);
            });
    }, []);

    const handlePhoneChange = (value, country) => {
        setPhone(value);
        setCountryCode(country.dialCode);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            name: name,
            email: email,
            password: password,
            confirm_password: confirmPassword,
            type: "admin",
            country_code: `+${countryCode}`,
            contact_number: phone.slice(countryCode.length),
        };

        fetch('http://192.168.0.69:8000/api/admin/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Registration successful:', data);
                    navigate('/adminLogin'); // Redirect to login page
                } else {
                    setErrorMessage(`Registration failed: ${data.message}`);
                    console.error('Registration failed:', data);
                }
            })
            .catch(error => {
                setErrorMessage('An error occurred during registration. Please try again later.');
                console.error('Error during registration:', error);
            });
    };

    return (
        <div className="login-page">
            <Container className="logo-container">
                <img src={logo} alt="Logo" className="logo-image" />
            </Container>

            <Container className="login-card">
                <Card className="login-container">
                    <Card.Body>
                        <Card.Title className="login-title">Sign Up</Card.Title>

                        {/* Display error message */}
                        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            {/* Name field */}
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>

                            {/* Email field */}
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="example@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            {/* Mobile Number field */}
                            <Form.Group controlId="formBasicPhone" className="mb-3">
                                <Form.Label className="custom-label">Contact Number</Form.Label>
                                <PhoneInput
                                    country={'my'}
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    inputProps={{
                                        name: 'phone',
                                        required: true,
                                        placeholder: 'Enter phone number'
                                    }}
                                    inputClass="form-control"
                                    containerClass="phone-input-container"
                                    buttonClass="btn btn-outline-secondary"
                                    dropdownClass="country-dropdown custom-dropdown"
                                    countryCodeEditable={false}
                                    disableCountryCode={false}
                                    disableDropdown={false}
                                    autoFormat={true}
                                />
                            </Form.Group>

                            {/* Password creation field */}
                            <Form.Group controlId="passwordCreate">
                                <Form.Label>Create a Password</Form.Label>
                                <div className="password-container">
                                    <Form.Control
                                        type={showPasswordCreate ? 'text' : 'password'}
                                        placeholder="Password must be 8 characters"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span className="password-icon" onClick={togglePasswordCreate}>
                                        <FontAwesomeIcon icon={showPasswordCreate ? faEyeSlash : faEye} />
                                    </span>
                                </div>
                            </Form.Group>

                            {/* Password confirmation field */}
                            <Form.Group controlId="passwordConfirm">
                                <Form.Label>Confirm Password</Form.Label>
                                <div className="password-container">
                                    <Form.Control
                                        type={showPasswordConfirm ? 'text' : 'password'}
                                        placeholder="Repeat password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <span className="password-icon" onClick={togglePasswordConfirm}>
                                        <FontAwesomeIcon icon={showPasswordConfirm ? faEyeSlash : faEye} />
                                    </span>
                                </div>
                            </Form.Group>

                            <Button variant="dark" type="submit" className="signup-button">Sign Up</Button>
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

export default AdminSignup;
