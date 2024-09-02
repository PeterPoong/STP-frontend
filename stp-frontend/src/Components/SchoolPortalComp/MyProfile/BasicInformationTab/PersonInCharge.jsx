import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
import "../../../../css/SchoolPortalStyle/SchoolPortalBasicInformation.css";

import "typeface-ubuntu";
function PersonInCharge() {
  // State for form fields
  const token = sessionStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("update person in charge");
  };
  // Render content based on the selected tab

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h4 className="mb-2">Person-In-Charge</h4>
        <hr className="divider-line" />
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="personInChargeName">
              <Form.Label>Person-In-Charge Name</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="personInChargeContact">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={12}>
            <Button variant="danger" type="submit" className="save-button">
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default PersonInCharge;
