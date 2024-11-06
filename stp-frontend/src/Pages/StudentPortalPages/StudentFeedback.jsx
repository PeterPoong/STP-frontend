import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Loader2 } from "lucide-react";

//component
import NavButtonsSP from "../../Components/StudentPortalComp/NavButtonsSP";
import SpcFooter from "../../Components/StudentPortalComp/SpcFooter";

//asset and style
import "../../css/StudentPortalStyles/StudentFeedback.css";
import StudyPalLogo from "../../assets/StudentPortalAssets/StudyPalLogo.svg";
import contactUs from "../../assets/StudentPortalAssets/contactUs.JPEG";

const StudentFeedback = () => {
  const [saveState, setSaveState] = useState('idle'); // idle, saving, success

  const handleSave = async (e) => {
    e.preventDefault();
    setSaveState('saving');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSaveState('success');
    
    // Reset button state after showing success
    setTimeout(() => {
      setSaveState('idle');
    }, 1500);
  };

  const getButtonContent = () => {
    switch (saveState) {
      case 'saving':
        return (
          <>
            <Loader2 className="animate-spin h-4 w-4 mr-2 inline-block" />
            Saving...
          </>
        );
      case 'success':
        return 'Saved!';
      default:
        return 'Save';
    }
  };

  const getButtonStyle = () => {
    const baseStyle = "SF-Form-Button transition-all duration-200 flex items-center justify-center";
    switch (saveState) {
      case 'saving':
        return `${baseStyle} bg-gray-400 cursor-not-allowed`;
      case 'success':
        return `${baseStyle} bg-green-500 text-white`;
      default:
        return baseStyle;
    }
  };

  return (
    <div>
      <NavButtonsSP />
      <div className="SF-container">
        <div className="SF-image-container">
          <img src={contactUs} alt="contactus" className="SF-image" />
        </div>
        <div className="SF-Form-Container">
          <div className="SF-Form-Logo">
            <img
              src={StudyPalLogo}
              alt="StudentFeedbackLogo"
            />
            <h2 className="text-start mb-1 custom-color-title">
              Contact Us
            </h2>
            <p className="text-start mb-4 small custom-color-title">
              We'd love to hear from you. Please fill out this form.
            </p>
          </div>

          <Form onSubmit={handleSave}>
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
                placeholder="Your Email"
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
                placeholder="Your Contact"
                required
                pattern="[a-zA-Z0-9]+"
                title="Username can only contain letters and numbers"
                className="SF-Form-Placeholder"
              />
            </Form.Group>
            <Form.Group className="SF-Form-Group">
              <p>Subject</p>
              <Form.Label visuallyHidden>Subject</Form.Label>
              <Form.Select
                required
                className="SF-Form-Placeholder"
                defaultValue=""
              >
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
                  '&:focus': {
                    boxShadow: 'none',
                    borderColor: '#B71A18'
                  }
                }}
              />
            </Form.Group>
            <button 
              type="submit"
              className={getButtonStyle()}
              disabled={saveState !== 'idle'}
            >
              {getButtonContent()}
            </button>
          </Form>
        </div>
      </div>
      <SpcFooter />
    </div>
  );
};

export default StudentFeedback;