import React, { useState } from 'react';
import { Form, Button, ProgressBar, FormGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavButtonsSP from "../../Components/StudentPortalComp/NavButtonsSP";
import SpcFooter from "../../Components/StudentPortalComp/SpcFooter";
import "../../css/StudentPortalStyles/StudentApplyCourse.css";
import image1 from "../../assets/StudentAssets/University Logo/image1.jpg";

const StudentApplyCourse = () => {
  const [step, setStep] = useState(1);
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
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    setStep(5); // Move to confirmation step
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="step-content d-flex row  ">
            <h2>Basic Information</h2>
            <div>
              <Form.Group className="d-flex column align-items-center mb-3">
                <Form.Label className="mb-0 me-2" style={{ width: '150px' }}>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  required
                />
              </Form.Group>
              <Form.Group className="d-flex align-items-center mb-3">
                <Form.Label className="mb-0 me-2" style={{ width: '150px' }}>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  required
                />
              </Form.Group>
            </div>
            <div className="d-flex column justify-content-center ">
              <Form.Group>
                <Form.Label>First_Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Last_Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  required
                />
              </Form.Group>
            </div>
            <Form.Group >
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <div className="d-flex column justify-content-center ">
              <Form.Group>
                <Form.Label>First_Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Last_Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  required
                />
              </Form.Group>
            </div>
            <div className="d-flex column justify-content-center ">
              <Form.Group>
                <Form.Label>First_Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Last_Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  required
                />
              </Form.Group>
            </div>

          </div>
        );
      case 2:
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
      case 3:
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
      case 4:
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
      case 5:
        return (
          <div className="step-content">
            <h2>Application Submitted</h2>
            <p>Thank you for your application. We will contact you soon with further information.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container-applycourse mt-5">
      <NavButtonsSP />
      <div className="main-content-applycourse">
        <div className="backgroundimage">
          <div>
            <div className="widget-applying justify-content-center">
              <a className="text-black align-self-center">You are now applying for </a>
              <h3 className="text-danger align-self-center">bachelor in mass communication</h3>
              <div className="d-flex justify-content-center " >
                <img src={image1} className="acp-university-logo" />
                <h5 className="text-black fw-bold align-self-center">Swinburne University of Technology</h5>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-center mb-4">Student Course Application</h1>

        <ProgressBar now={(step / 5) * 100} label={`Step ${step} of 5`} className="mb-4" />
        <Form onSubmit={handleSubmit}>
          {renderStep()}
          <div className="d-flex justify-content-between mt-4">
            {step > 1 && (
              <Button variant="secondary" onClick={() => setStep(step - 1)}>
                Previous
              </Button>
            )}
            {step < 4 ? (
              <Button variant="primary" onClick={() => setStep(step + 1)}>
                Next
              </Button>
            ) : step === 4 ? (
              <Button variant="success" type="submit">
                Submit Application
              </Button>
            ) : null}
          </div>
        </Form>
      </div>
      <SpcFooter />
    </div>
  );
};

export default StudentApplyCourse;