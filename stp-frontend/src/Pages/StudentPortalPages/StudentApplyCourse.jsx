import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavButtonsSP from "../../Components/StudentPortalComp/NavButtonsSP";
import SpcFooter from "../../Components/StudentPortalComp/SpcFooter";
import "../../css/StudentPortalStyles/StudentApplyCourse.css";
import image1 from "../../assets/StudentAssets/University Logo/image1.jpg";

// Material-UI imports
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  'Basic Information',
  'Course Selection',
  'Start Date',
  'Review Information',
  'Save and Submit'
];

const StudentApplyCourse = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    startDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className="step-content p-4 rounded ">
            <h3 className="border-bottom pb-2 fw-normal">Basic Information</h3>
            <div className="sap-content  w-100 d-flex justify-content-center">
              <div className="sap-content w-50">
                <Row className="mb-3">
                  <Col xs={6}>
                    <Form.Group controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group controlId="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={6}>
                    <Form.Group controlId="icNumber">
                      <Form.Label>IC Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="icNumber"
                        value={formData.icNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group controlId="gender">
                      <Form.Label>Gender</Form.Label>
                      <Form.Control
                        as="select"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={6}>
                    <Form.Group controlId="contactNumber">
                      <Form.Label>Contact Number</Form.Label>
                      <Form.Control
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    
                  </Col>
                </Row>
                <Form.Group controlId="emailAddress">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Row className="mb-3">
                  <Col xs={6}>
                    <Form.Group controlId="country">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group controlId="state">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={6}>
                    <Form.Group controlId="city">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group controlId="postcode">
                      <Form.Label>Postcode</Form.Label>
                      <Form.Control
                        type="text"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="step-content">
            <h2>Course Selection</h2>
            <Form.Group>
              <Form.Label>Select Course</Form.Label>
              <Form.Control
                as="select"
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                required
              >
                <option value="">Choose a course</option>
                <option value="web-development">Web Development</option>
                <option value="data-science">Data Science</option>
                <option value="mobile-app-development">Mobile App Development</option>
              </Form.Control>
            </Form.Group>
          </div>
        );
      case 2:
        return (
          <div className="step-content">
            <h2>Start Date</h2>
            <Form.Group>
              <Form.Label>Select Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </div>
        );
      case 3:
        return (
          <div className="step-content">
            <h2>Review Information</h2>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Course:</strong> {formData.course}</p>
            <p><strong>Start Date:</strong> {formData.startDate}</p>
          </div>
        );
      case 4:
        return (
          <div className="step-content">
            <h2>Save and Submit</h2>
            <p>Please review your information carefully before submitting your application.</p>
            <Button variant="success" onClick={handleSubmit}>
              Save and Submit Application
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  const renderPostSubmission = () => (
    <div className="post-submission-content">
      <h2>Congratulations!</h2>
      <p>Your application has been successfully submitted.</p>
      <div className="d-flex justify-content-center mt-4">
        <Button variant="primary" className="me-3" onClick={() => {/* Add logic to view summary */ }}>
          View Summary
        </Button>
        <Button variant="secondary" onClick={() => {/* Add logic to go back to course page */ }}>
          Back to Course Page
        </Button>
      </div>
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="app-container-applycourse mt-5">
        <NavButtonsSP />
        <div className="main-content-applycourse">
          {renderPostSubmission()}
        </div>
        <SpcFooter />
      </div>
    );
  }

  return (
    <div className="app-container-applycourse mt-5">
      <NavButtonsSP />
      <div className="main-content-applycourse">
        <div className="backgroundimage">
          <div>
            <div className="widget-applying-course justify-content-center ">
              <h4 className="text-black align-self-center fw-normal mb-4">You are now applying for </h4>
              <h3 className="text-danger align-self-center fw-bold mb-5">Bachelor in Mass Communication</h3>
              <div className="d-flex justify-content-center " >
                <img src={image1} className="sac-image me-5" alt="University Logo" />
                <h3 className="text-black fw-bold align-self-center">Swinburne University of Technology</h3>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-center mb-4">Student Course Application</h1>

        <Box sx={{ width: '100%', mb: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Form onSubmit={(e) => e.preventDefault()}>
          {renderStep()}
          <div className="d-flex justify-content-center mt-4">
            {activeStep > 0 && (
              <Button variant="secondary" onClick={() => setActiveStep(activeStep - 1)}>
                Back
              </Button>
            )}
            {activeStep < 4 && (
              <Button variant="primary" onClick={() => setActiveStep(activeStep + 1)}>
                Next
              </Button>
            )}
          </div>
        </Form>
      </div>
      <SpcFooter />
    </div>
  );
};

export default StudentApplyCourse;