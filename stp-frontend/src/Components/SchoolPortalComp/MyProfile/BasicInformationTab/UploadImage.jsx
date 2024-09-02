import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
import "../../../../css/SchoolPortalStyle/SchoolPortalBasicInformation.css";

import "typeface-ubuntu";
function UploadImage() {
  // State for form fields
  const token = sessionStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("uplaod Photo");
  };
  // Render content based on the selected tab

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h4 className="mb-2">Upload Images</h4>
        <hr className="divider-line" />
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="imageUpload">
              <Form.Label>Upload School Image</Form.Label>
              <Form.Control type="file" />
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

export default UploadImage;
