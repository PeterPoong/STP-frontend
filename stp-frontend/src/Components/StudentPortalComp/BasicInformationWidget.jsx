import React from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import "../../css/StudentPortalCss/StudentPortalLoginForm.css";
import PhoneInput from 'react-phone-input-2';

const BasicInformationWidget = () => {
  return (
    <div>
      <h4 className="title-widget">David Lim's Profile</h4>
      <Card className="mb-4">
        <Card.Body className="mx-4">
          <div className="border-bottom  mb-4">
            <h2 className=" fw-light title-widgettwo" style={{ color: "black" }}>Basic Information</h2>
          </div>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label className="fw-bold small formlabel">Username <span className="text-danger">    *</span></Form.Label>
                  <Form.Control type="text" required className="w-75" />
                </Form.Group>
              </Col>
              <Col md={6}>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="firstName">
                  <Form.Label className="fw-bold small formlabel">First Name <span className="text-danger">    *</span></Form.Label>
                  <Form.Control className="w-75" type="text" required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="lastName">
                  <Form.Label className="fw-bold small formlabel">Last Name <span className="text-danger">    *</span></Form.Label>
                  <Form.Control type="text" required className="w-75" />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="identityCardNumber">
                  <Form.Label className="fw-bold small formlabel">Identity Card Number <span className="text-danger">    *</span></Form.Label>
                  <Form.Control type="text" required className="w-75" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="gender">
                  <Form.Label className="fw-bold small formlabel">Gender <span className="text-danger">     *</span></Form.Label>
                  <Form.Select required className="w-75">
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formBasicPhone" className="mb-3">
                  <Form.Label className="fw-bold small formlabel" >Contact Number</Form.Label>
                  <PhoneInput
                    country={'us'}
                    onChange={(value) => setPhone(value)}
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
                    className="w-75"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="emailAddress">
                  <Form.Label className="fw-bold small formlabel">Email Address <span className="text-danger">    *</span></Form.Label>
                  <Form.Control type="email" required className="w-75" />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label className="fw-bold small formlabel"> Address <span className="text-danger">    *</span></Form.Label>
              <Form.Control as="textarea" rows={3} required className="w-100" />
            </Form.Group>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="country">
                  <Form.Label className="fw-bold small formlabel">Country <span className="text-danger">    *</span></Form.Label>
                  <Form.Select required className="w-75">
                    <option value="">Select country</option>
                    {/* Add country options here */}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="state">
                  <Form.Label className="fw-bold small formlabel">State <span className="text-danger">    *</span></Form.Label>
                  <Form.Select required className="w-75">
                    <option value="">Select state</option>
                    {/* Add state options here */}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="city">
                  <Form.Label className="fw-bold small formlabel">City <span className="text-danger">    *</span></Form.Label>
                  <Form.Select required className="w-75">
                    <option value="">Select city</option>
                    {/* Add city options here */}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="postcode">
                  <Form.Label className="fw-bold small formlabel">Postcode <span className="text-danger">    *</span></Form.Label>
                  <Form.Control type="text" required className="w-75" />
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-end mt-3">
              <div className="w-25">
                <Button variant="danger" type="submit" className="m-0 w-100 fw-bold rounded-pill">
                  Save
                </Button>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BasicInformationWidget;