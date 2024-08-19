import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/AdminStyles/AdminLoginStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// Images
import logo from '../../assets/AdminAssets/Images/logo.png';

const AdminSignup = () => {

    // State for storing fetched country codes
    const [countryCodes, setCountryCodes] = useState([]);

    // State for form inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Toggleable Password Field
    const [showPasswordCreate, setShowPasswordCreate] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const togglePasswordCreate = () => setShowPasswordCreate(!showPasswordCreate);
    const togglePasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);

    // useEffect hook to fetch country codes when the component mounts
    useEffect(() => {
      // Function to fetch country codes from the API
      axios.get('http://192.168.0.69:8000/api/countryCode')
          .then(response => {
              if (response.data.success) { // Check if the API call was successful
                  setCountryCodes(response.data.data); // Update the state with fetched data
              }
          })
          .catch(error => {
              console.error('Error fetching country codes:', error); // Handle any errors during the API call
          });
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    // Handle form submission
const handleSubmit = (e) => {
  e.preventDefault();

  // Prepare form data
  const formData = {
      name,
      email,
      password,
      confirm_password: confirmPassword,  // Check if API expects 'confirm_password' or 'confirmPassword'
      country_code: countryCode,
      contact_number: contactNumber,  // Ensure the format matches API expectations
  };

  // Make POST request to register endpoint
  axios.post('http://192.168.0.69:8000/api/admin/register', formData)
      .then(response => {
          if (response.data.success) {
              // Handle successful registration
              console.log('Registration successful:', response.data);
          } else {
              // Handle registration failure
              console.error('Registration failed:', response.data);
          }
      })
      .catch(error => {
          // Log detailed error response
          console.error('Error during registration:', error.response?.data || error.message);
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
                            <Form.Group controlId="phone">
                                <Form.Label>Mobile Number</Form.Label>
                                <div className="phone-container" style={{ display: 'flex', alignItems: 'center' }}>
                                    {/* Dropdown for country codes */}
                                    <Form.Control
                                        as="select"
                                        className="country-code"
                                        style={{ maxWidth: '80px', marginRight: '10px' }}
                                        value={countryCode}
                                        onChange={(e) => setCountryCode(e.target.value)} // Update countryCode state
                                    >
                                        <option value=""> </option> {/* Default placeholder option */}
                                        {countryCodes.map(code => (
                                            <option key={code.id} value={code.country_code}>
                                                {code.country_code}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    {/* Input field for phone number */}
                                    <Form.Control
                                        type="tel"
                                        placeholder="1234567890"
                                        value={contactNumber}
                                        onChange={(e) => setContactNumber(e.target.value)}
                                    />
                                </div>
                            </Form.Group>

                            {/* Password creation field */}
                            <Form.Group controlId="passwordCreate">
                                <Form.Label>Create a Password</Form.Label>
                                <div className="password-container">
                                    <Form.Control
                                        type={showPasswordCreate ? 'text' : 'password'}
                                        placeholder="must be 8 characters"
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
                                        placeholder="repeat password"
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
