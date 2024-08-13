import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/StudentPortalCss/StudentPortalLoginForm.css";
import StudentPortalLogin1 from "../../assets/StudentPortalAssets/StudentPortalLogin1.png";
import StudentPortalLoginLogo from "../../assets/StudentPortalAssets/StudentPortalLoginLogo.png";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import "../../css/StudentPortalCss/StudentPortalLoginForm.css";


const StudentPortalForgetPassword = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Email:", email);
  };
  return (   
      <Container fluid className="h-100">
        <Row className="h-50">
          <Col md={6} className="p-0">
            <img
              src={StudentPortalLogin1} 
              className="w-100 h-100 object-fit-cover "
            />
          </Col>
          <Col md={6} className="d-flex align-items-center ">
            <Container>
              <Row className="justify-content-center">       
                <Col md={8} lg={6}>
                  <img 
                      src={StudentPortalLoginLogo}   
                      className="img-fluid  "                  
                  />
                  <h2 className="text-start mb-3 custom-color-title">Forget your password?</h2>
                  <p className="text-start mb-4 small custom-color-title">Don't worry! it happens. Please enter the email associated with your account.</p>                 
                  <Form onSubmit={handleSubmit}>                                      
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className="custom-label">Email address</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Row className="mb-3">               
                    </Row>           
                    <Button 
                      variant="danger" 
                      type="submit" 
                      className="my-3 m-0"
                      style={{ width: '100%', height: '40px' }} // Adjust height as needed
                    >Send Codes
                    </Button>      
                    <div class="text-center text-lg-center m-5 pt-2">  
                      <p class="small  pt-1 mb-0 text-secondary">Already have an account? <Link to="/studentPortalLogin" className="forgetpassword mx-2 ">Login now</Link></p>
                    </div>      
                  </Form>                 
                </Col> 
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
  );
};

export default StudentPortalForgetPassword;