import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirect
import { Container, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/AdminStyles/AdminLoginStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// Images
import logo from '../../assets/AdminAssets/Images/logo.png';

const AdminLogin = () => {
  const [countryCodes, setCountryCodes] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState(''); // State to capture selected country code
  const [contactNumber, setContactNumber] = useState(''); // State to capture phone number
  const [password, setPassword] = useState(''); // State to capture password
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const navigate = useNavigate(); // Hook for navigation

  // Toggle password visibility
  const togglePassword = () => setShowPassword(!showPassword);

  // Fetch country codes when the component mounts
  useEffect(() => {
    axios.get('http://192.168.0.69:8000/api/countryCode')
      .then(response => {
        if (response.data.success) {
          setCountryCodes(response.data.data); // Update state with fetched country codes
        }
      })
      .catch(error => {
        console.error('Error fetching country codes:', error); // Log any errors
      });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Prepare form data
    const formData = {
        country_code: selectedCountryCode,
        contact_number: contactNumber,
        password: password,
    };

    // Make POST request to login endpoint
    axios.post('http://192.168.0.69:8000/api/admin/login', formData)
        .then(response => {
            // Assuming success is indicated by the 'true' key in the response
            if (response.data.true) {
                console.log('Login successful:', response.data);
                // Store token in sessionStorage
                sessionStorage.setItem('token', response.data.data.token);
                // Redirect to admin dashboard
                navigate('/adminDashboard');
            } else {
                console.error('Login failed:', response.data);
            }
        })
        .catch(error => {
            // Log any errors during the request
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
            <Card.Title className="login-title">Log-In</Card.Title>
            <Form onSubmit={handleLogin}> {/* Attach handleLogin to form submission */}
              <Form.Group controlId="phone">
                <Form.Label>Mobile Number</Form.Label>
                <div className="phone-container" style={{ display: 'flex', alignItems: 'center' }}>
                  {/* Dropdown for country codes */}
                  <Form.Control
                    as="select"
                    className="country-code"
                    style={{ maxWidth: '80px', marginRight: '10px' }}
                    value={selectedCountryCode} // Bind value to state
                    onChange={(e) => setSelectedCountryCode(e.target.value)} // Update state on change
                  >
                    <option value=""></option> {/* Default placeholder */}
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
                    value={contactNumber} // Bind value to state
                    onChange={(e) => setContactNumber(e.target.value)} // Update state on change
                  />
                </div>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <div className="password-container">
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password} // Bind value to state
                    onChange={(e) => setPassword(e.target.value)} // Update state on change
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
