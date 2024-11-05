import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavButtonsSP from "../../Components/StudentPortalComp/NavButtonsSP";
import SpcFooter from "../../Components/StudentPortalComp/SpcFooter";
import "../../css/StudentPortalStyles/StudentFeedback.css";
import contactUs from "../../assets/StudentPortalAssets/contactUs.JPEG";
import { Form } from "react-bootstrap";
const StudentFeedback = () => {


  return (
    <div>
      <NavButtonsSP />
      <div className="SF-container">
        <div className="SF-image-container">
          <img src={contactUs} alt="contactus" className="SF-image" />
        </div>
        <div className="SF-Form-Container">
          <Form >
            <Form.Group className="SF-Form-Group">
              <p>Full Name</p>
              <Form.Control
                type="text"
                placeholder="Your Name "
                required
                pattern="[a-zA-Z0-9]+"
                title="Username can only contain letters and numbers"
                className="SF-Form-Placeholder"
              />
            </Form.Group>
            <Form.Group className="SF-Form-Group">
              <p>Email Address</p>
              <Form.Control
                type="text"
                placeholder="Your Name "
                required
                pattern="[a-zA-Z0-9]+"
                title="Username can only contain letters and numbers"
                className="SF-Form-Placeholder"
              />
            </Form.Group>
            <Form.Group className="SF-Form-Group">
              <p>Contact Number</p>
              <Form.Control
                type="text"
                placeholder="Your Name "
                required
                pattern="[a-zA-Z0-9]+"
                title="Username can only contain letters and numbers"
                className="SF-Form-Placeholder"
              />
            </Form.Group>
            <Form.Group className="SF-Form-Group">
              <p>Subject</p>
              <Form.Label visuallyHidden>Subject</Form.Label>  <Form.Select
                required
                className="SF-Form-Placeholder"
                defaultValue=""  >
                <option value="" disabled>Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="technical">Technical Support</option>
                <option value="feedback">Feedback</option>
                <option value="partnership">Partnership</option>

                <option value="other">Other</option>

              </Form.Select>
            </Form.Group>
            <Form.Group className="SF-Form-Group">
              <p>Message</p>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Your Message"
                required
                className="SF-Form-Placeholder"
                style={{
                  resize: 'none',
                  // Remove Bootstrap's default focus styles
                  '&:focus': {
                    boxShadow: 'none',
                    borderColor: '#B71A18'
                  }
                }}
              />
            </Form.Group>
          </Form>
          <button className="SF-Form-Button">Save</button>
        </div>
      </div>
      <SpcFooter />
    </div>
  );
};

export default StudentFeedback;