import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/AdminStyles/AdminLoginStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { MDBSwitch } from 'mdb-react-ui-kit'; // Adjust the import based on your MDBReact version

// Images
import logo from '../../assets/AdminAssets/Images/logo.png';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // State to store error messages
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [countryCodes, setCountryCodes] = useState([]); // State for country codes

    const navigate = useNavigate();

    useEffect(() => {
        const handleTabClosing = () => {
            if (!JSON.parse(localStorage.getItem('rememberMe'))) {
                sessionStorage.removeItem('token');
                localStorage.removeItem('token');
            }
        };

        fetch(`${import.meta.env.VITE_BASE_URL}api/countryCode`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setCountryCodes(data.data);
                }
            })
            .catch(error => {
                console.error('Error fetching country codes:', error);
            });

        window.addEventListener('beforeunload', handleTabClosing);

        return () => {
            window.removeEventListener('beforeunload', handleTabClosing);
        };
    }, [navigate]);

    const handlePhoneChange = (value, country, e, formattedValue) => {
        setPhone(value);
        setCountryCode(country.dialCode);
    };

    const togglePassword = () => setShowPassword(!showPassword);

    const handleLogin = (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear any previous error messages
      
        const formData = {
          password: password,
          country_code: `+${countryCode}`,
          contact_number: phone.slice(countryCode.length),
        };
      
        fetch(`${import.meta.env.VITE_BASE_URL}api/admin/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
          console.log('API Response:', data); // Add this line
          if (data.true === true) {
            console.log('Login successful:', data);
            const { token, user } = data.data;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user', JSON.stringify(user)); // Store user data
            navigate('/adminSchool');
          } else {
            setErrorMessage('Login failed. Please try again.');
            console.error('Login failed:', data);
          }
        })
        .catch(error => {
          setErrorMessage('An error occurred during login. Please try again later.');
          console.error('Error during login:', error);
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
                        <Card.Title className="login-title">Log In</Card.Title>

                        {/* Display error message */}
                        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                        <Form onSubmit={handleLogin}>
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
                                        placeholder: 'Enter contact number'
                                    }}
                                    inputClass="form-control"
                                    containerClass="phone-input-container"
                                    buttonClass="btn btn-outline-secondary"
                                    dropdownClass="country-dropdown custom-dropdown"
                                    countryCodeEditable={false}
                                    required
                                />
                            </Form.Group>

                            {/* Password field */}
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <div className="password-container">
                                    <Form.Control
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span className="password-icon" onClick={togglePassword}>
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                    </span>
                                </div>
                            </Form.Group>

                            <Form.Group controlId="rememberMe" className="d-flex justify-content-between align-items-center">
                                <Form.Check type="checkbox" label="Remember me" />
                                <a href="/adminForgetPass" className="forgot-password">Forgot password?</a>
                            </Form.Group>

                            <Button variant="dark" type="submit" className="signup-button">Log in</Button>
                        </Form>

                        <div className="login-footer">
                            Don't have an account? <a href="/adminSignup">Sign up</a>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default AdminLogin;
