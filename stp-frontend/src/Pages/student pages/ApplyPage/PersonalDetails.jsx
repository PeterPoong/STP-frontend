import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../css/student css/Apply.css";
// import NavButtons from "../Components/student components/NavButtons";
import NavButtons from "../../../Components/student components/NavButtons";
const ApplyForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { program } = location.state || {}; // Access the passed program data

  // Log program details for debugging
  console.log("Program Details:", program);

  const handleNext = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Navigate to the next form (e.g., "/applyform2")
    navigate("/personaldetails", { state: { program } }); // Adjust the path as needed
  };

  return (
    <Container className="form-container" style={{ marginTop: "20px" }}>
      <NavButtons />
      <Row className="justify-content-md-center">
        <Col md={8}>
          <div className="form-header text-center mb-4">
            <h2>{program ? program.title : "Personal Details"}</h2>
            {program ? (
              <div>
                <p>
                  <strong>University:</strong> {program.university}
                </p>
                <p>
                  <strong>Location:</strong> {program.location}
                </p>
                <p>
                  <strong>Enrollment:</strong> {program.enrollment}
                </p>
                <p>
                  <strong>Duration:</strong> {program.duration}
                </p>
                <p>
                  <strong>Intakes:</strong> {program.intakes.join(", ")}
                </p>
                <p>
                  <strong>Fee:</strong> {program.fee}
                </p>
              </div>
            ) : (
              <p>No program data available.</p>
            )}
            <div className="stepper mb-4">
              <div className="step active">1</div>
              <div className="step">2</div>
              <div className="step">3</div>
              <div className="step">4</div>
              <div className="step">5</div>
            </div>
            <p>Step 1 of 5</p>
          </div>
          <Form onSubmit={handleNext}>
            <Form.Group controlId="formName">
              <Form.Label>Your Name</Form.Label>
              <Form.Control type="text" placeholder="e.g. Smith" />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email ID</Form.Label>
              <Form.Control
                type="email"
                placeholder="e.g. mymail@example.com"
              />
            </Form.Group>

            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" placeholder="e.g. +60 1823356482" />
            </Form.Group>

            <Form.Group controlId="formNationality">
              <Form.Label>Nationality</Form.Label>
              <Form.Control as="select">
                <option>Malaysian</option>
                <option>Non-Malaysian</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formICNumber">
              <Form.Label>IC Number</Form.Label>
              <Form.Control type="text" placeholder="e.g. 910711205312" />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4" block>
              Next
            </Button>
            <Button variant="primary" type="submit" className="mt-4" block>
              Previous
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ApplyForm;
