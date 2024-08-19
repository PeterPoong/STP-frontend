import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/AdminStyles/AdminLoginStyles.css';
// Images
import logo from '../../assets/AdminAssets/Images/logo.png';

const AdminPassCode = () => {
    const [code, setCode] = useState(['', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(20);
    const [isResendEnabled, setIsResendEnabled] = useState(false);
  
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
      const newCode = [...code];
      newCode[index] = e.target.value;
      setCode(newCode);
    };
  
    // Handle resend code (mock function)
    const handleResendCode = () => {
      // Logic to resend code
      console.log('Resend code');
      setTimeLeft(20);
      setIsResendEnabled(false);
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
                    <span>We've sent a code to helloworld@gmail.com</span>
                </div>
            <Form>
              <div className="code-inputs">
                {code.map((digit, index) => (
                  <Form.Control
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleCodeChange(e, index)}
                    className="code-input"
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
