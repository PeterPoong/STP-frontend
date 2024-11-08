import React, { useState, useEffect } from "react";
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
  const [saveState, setSaveState] = useState('idle');
  const [subjectList, setSubjectList] = useState([]);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    contact: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  // Fetch subject list on component mount
  useEffect(() => {
    fetchSubjectList();
  }, []);

  const fetchSubjectList = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/enquirySubjectList`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization if needed
          'Authorization': `Bearer ${sessionStorage.getItem('token') || localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setSubjectList(data.data);
      } else {
        console.error('Invalid subject list data format:', data);
      }
    } catch (error) {
      console.error('Error fetching subject list:', error);
    }
  };

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case 'full_name':
        return /^[a-zA-Z\s]+$/.test(value) ? '' : 'Name can only contain letters and spaces';
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Please enter a valid email address';
      case 'contact':
        return /^\d+$/.test(value) ? '' : 'Contact number can only contain digits';
      case 'subject':
        return value ? '' : 'Please select a subject';
      case 'message':
        return value.trim() ? '' : 'Message is required';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validate field on change
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  
  const handleSave = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSaveState('saving');
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/createEnquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token') || localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          contact: formData.contact,
          subject: parseInt(formData.subject),
          message: formData.message
        })
      });

      const data = await response.json();

      if (data.success) {
        setSaveState('success');
        // Reset form
        setFormData({
          full_name: '',
          email: '',
          contact: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error(data.message || 'Failed to submit enquiry');
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      setSaveState('error');
    } finally {
      // Reset button state after showing status
      setTimeout(() => {
        setSaveState('idle');
      }, 1500);
    }
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
      case 'error':
        return 'Error! Try again';
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
      case 'error':
        return `${baseStyle} bg-red-500 text-white`;
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
            <img src={StudyPalLogo} alt="StudentFeedbackLogo" />
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
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                placeholder="Your Name"
                className="SF-Form-Placeholder"
                isInvalid={!!errors.full_name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.full_name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="SF-Form-Group">
              <p>Email Address</p>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                className="SF-Form-Placeholder"
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="SF-Form-Group">
              <p>Contact Number</p>
              <Form.Control
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                placeholder="Your Contact"
                className="SF-Form-Placeholder"
                isInvalid={!!errors.contact}
              />
              <Form.Control.Feedback type="invalid">
                {errors.contact}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="SF-Form-Group">
              <p>Subject</p>
              <Form.Select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="SF-Form-Placeholder"
                isInvalid={!!errors.subject}
              >
                <option value="">Select a subject</option>
                {subjectList.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.core_metaName}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.subject}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="SF-Form-Group">
              <p>Message</p>
              <Form.Control
                as="textarea"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                placeholder="Your Message"
                className="SF-Form-Placeholder"
                isInvalid={!!errors.message}
                style={{
                  resize: 'none',
                  '&:focus': {
                    boxShadow: 'none',
                    borderColor: '#B71A18'
                  }
                }}
              />
              <Form.Control.Feedback type="invalid">
                {errors.message}
              </Form.Control.Feedback>
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