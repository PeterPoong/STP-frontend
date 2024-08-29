import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Trash2, Edit, Calendar, User, Building, LucideFileChartColumnIncreasing, Save, Trophy, FileText, Upload, X } from 'lucide-react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavButtonsSP from "../../Components/StudentPortalComp/NavButtonsSP";
import SpcFooter from "../../Components/StudentPortalComp/SpcFooter";
import ApplicationSummary from "../../Components/StudentPortalComp/ApplicationSummary";
import "../../css/StudentPortalStyles/StudentApplyCourse.css";
import image1 from "../../assets/StudentAssets/University Logo/image1.jpg";
import { components } from 'react-select';
import styled from 'styled-components';

// Material-UI imports
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { Justify } from 'react-bootstrap-icons';

const steps = [
  'Basic Information',
  'Academic Transcript',
  'Co-Curriculum',
  'Achievements',
  'Other Certificates/\nDocuments'
];

const CustomFileInput = styled.div`
  display: inline-block;
  position: relative;
  
  input[type="file"] {
    position: absolute;
    left: -9999px;
  }
  
  label {
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    background-color: #f8f9fa;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 14px;
    color: #495057;
    transition: all 0.2s ease-in-out;
    
    &:hover {
      background-color: #e9ecef;
    }
  }
  
  span {
    margin-left: 10px;
    color: #6c757d;
  }
`;

const CustomStepper = styled(Stepper)(({ theme }) => ({
  '& .MuiStepConnector-line': {
    borderTopWidth: 3,
    borderColor: '#e0e0e0',
  },
  '& .MuiStepConnector-active, & .MuiStepConnector-completed': {
    '& .MuiStepConnector-line': {
      borderColor: '#dc3545',
    },
  },
}));

const CustomStepLabel = styled(StepLabel)(({ theme }) => ({
  '& .MuiStepLabel-label': {
    fontSize: '0.8rem',
    color: '#6c757d',
    '&.Mui-active': {
      color: '#000',
      fontWeight: 'bold',
    },
  },
}));

const CustomStepIcon = styled('div')(({ theme, ownerState }) => ({
  width: 30,
  height: 30,
  borderRadius: '50%',
  backgroundColor: ownerState.active ? '#dc3545' : '#e0e0e0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff',
  fontWeight: 'bold',
}));

const StepIcon = (props) => {
  const { active, completed, className, icon } = props;
  return (
    <CustomStepIcon ownerState={{ active, completed }} className={className}>
      {icon}
    </CustomStepIcon>
  );
};

const StudentApplyCourse = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    startDate: '',
    coCurriculum: [],
    achievements: [],
    otherDocs: []  // Initialize as an empty array
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

  const handleAddCoCurriculum = () => {
    setFormData(prevData => ({
      ...prevData,
      coCurriculum: [...prevData.coCurriculum, { name: '', year: '', position: '', institution: '', isEditing: true }]
    }));
  };

  const handleRemoveCoCurriculum = (index) => {
    setFormData(prevData => ({
      ...prevData,
      coCurriculum: prevData.coCurriculum.filter((_, i) => i !== index)
    }));
  };

  const handleCoCurriculumChange = (index, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      coCurriculum: prevData.coCurriculum.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleEditCoCurriculum = (index) => {
    setFormData(prevData => ({
      ...prevData,
      coCurriculum: prevData.coCurriculum.map((item, i) =>
        i === index ? { ...item, isEditing: true } : item
      )
    }));
  };

  const handleSaveCoCurriculum = (index) => {
    setFormData(prevData => ({
      ...prevData,
      coCurriculum: prevData.coCurriculum.map((item, i) =>
        i === index ? { ...item, isEditing: false } : item
      )
    }));
  };

  const handleAchievementChange = (index, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      achievements: prevData.achievements.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleAchievementFileUpload = (index, file) => {
    if (file) {
      setFormData(prevData => ({
        ...prevData,
        achievements: prevData.achievements.map((item, i) =>
          i === index ? { ...item, file: file } : item
        )
      }));
    }
  };

  const handleAddAchievement = () => {
    setFormData(prevData => ({
      ...prevData,
      achievements: [...prevData.achievements, { name: '', year: '', position: '', institution: '', file: null, isEditing: true }]
    }));
  };

  const handleEditAchievement = (index) => {
    setFormData(prevData => ({
      ...prevData,
      achievements: prevData.achievements.map((item, i) =>
        i === index ? { ...item, isEditing: true } : item
      )
    }));
  };

  const handleSaveAchievement = (index) => {
    setFormData(prevData => ({
      ...prevData,
      achievements: prevData.achievements.map((item, i) =>
        i === index ? { ...item, isEditing: false } : item
      )
    }));
  };

  const handleRemoveAchievement = (index) => {
    setFormData(prevData => ({
      ...prevData,
      achievements: prevData.achievements.filter((_, i) => i !== index)
    }));
  };

  const handleRemoveAchievementFile = (index) => {
    setFormData(prevData => ({
      ...prevData,
      achievements: prevData.achievements.map((item, i) =>
        i === index ? { ...item, file: null } : item
      )
    }));
  };

  const handleOtherDocChange = (index, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      otherDocs: (prevData.otherDocs || []).map((doc, i) =>
        i === index ? { ...doc, [field]: value } : doc
      )
    }));
  };

  const handleOtherDocFileUpload = (index, file) => {
    if (file) {
      setFormData(prevData => ({
        ...prevData,
        otherDocs: (prevData.otherDocs || []).map((doc, i) =>
          i === index ? { ...doc, file: file } : doc
        )
      }));
    }
  };

  const handleAddOtherDoc = () => {
    setFormData(prevData => ({
      ...prevData,
      otherDocs: [...(prevData.otherDocs || []), { name: '', file: null, isEditing: true }]
    }));
  };

  const handleEditOtherDoc = (index) => {
    setFormData(prevData => ({
      ...prevData,
      otherDocs: (prevData.otherDocs || []).map((doc, i) =>
        i === index ? { ...doc, isEditing: true } : doc
      )
    }));
  };

  const handleSaveOtherDoc = (index) => {
    setFormData(prevData => ({
      ...prevData,
      otherDocs: (prevData.otherDocs || []).map((doc, i) =>
        i === index ? { ...doc, isEditing: false } : doc
      )
    }));
  };

  const handleRemoveOtherDoc = (index) => {
    setFormData(prevData => ({
      ...prevData,
      otherDocs: (prevData.otherDocs || []).filter((_, i) => i !== index)
    }));
  };

  const handleRemoveOtherDocFile = (index) => {
    setFormData(prevData => ({
      ...prevData,
      otherDocs: (prevData.otherDocs || []).map((doc, i) =>
        i === index ? { ...doc, file: null } : doc
      )
    }));
  };

  const yearOptions = Array.from({ length: 10 }, (_, i) => ({ value: new Date().getFullYear() - i, label: (new Date().getFullYear() - i).toString() }));

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#007bff' : '#ced4da',
      boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0,123,255,.25)' : null,
      '&:hover': {
        borderColor: '#80bdff',
      },
      minHeight: '38px', // This sets the minimum height of the control
      height: '38px', // This sets the exact height of the control
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: '38px', // This ensures the value container matches the control height
      padding: '0 6px', // Adjust padding as needed
    }),
    input: (provided) => ({
      ...provided,
      margin: '0px', // Remove any margin
    }),
    placeholder: (provided) => ({
      ...provided,
      lineHeight: '38px', // This aligns the placeholder text vertically
    }),
    singleValue: (provided) => ({
      ...provided,
      lineHeight: '38px', // This aligns the selected value text vertically
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#007bff' : state.isFocused ? '#f8f9fa' : null,
      color: state.isSelected ? 'white' : 'black',
    }),
  };

  const CustomOption = props => (
    <components.Option {...props}>
      <div className="d-flex align-items-center">
        <Calendar size={18} className="me-2" />
        {props.children}
      </div>
    </components.Option>
  );

  const renderStep = () => {
    const renderNavButtons = () => (
      <div className="d-flex justify-content-between mt-4">
        {activeStep > 0 && (
          <Button variant="secondary" onClick={() => setActiveStep(activeStep - 1)} className="me-2">
            Back
          </Button>
        )}
        {activeStep < 7 && (
          <Button
            variant="primary"
            onClick={() => setActiveStep(activeStep + 1)}
            className={activeStep === 0 ? "ms-auto" : ""}
          >
            Next
          </Button>
        )}
      </div>
    );

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
            {renderNavButtons()}
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
            {renderNavButtons()}
          </div>
        );
      case 2:
        return (
          <div className="step-content p-4 rounded">
            <h3 className="border-bottom pb-2 fw-normal">Co-Curriculum</h3>
            <div className="co-curriculum-list">
              {formData.coCurriculum && formData.coCurriculum.map((item, index) => (
                <div key={index} className="co-curriculum-item mb-4 border rounded p-4">
                  {item.isEditing ? (
                    // Editing mode
                    <>
                      <Form.Control
                        type="text"
                        placeholder="Name of Co-curriculum..."
                        value={item.name}
                        onChange={(e) => handleCoCurriculumChange(index, 'name', e.target.value)}
                        className="mb-2 border-0 p-0 fw-bold"
                        style={{ fontSize: '1.1rem' }}
                      />
                      <div className="d-flex justify-content-between">
                        <div className="d-flex flex-grow-1">
                          <div className="d-flex align-items-center me-3 w-25">
                            <Calendar size={18} className="me-2" />
                            <Select
                              options={yearOptions}
                              value={{ value: item.year, label: item.year }}
                              onChange={(selectedOption) => handleCoCurriculumChange(index, 'year', selectedOption.value)}
                              placeholder="Year"
                              className="flex-grow-1"
                              styles={customStyles}
                              components={{ Option: CustomOption }}
                              isClearable={false}
                              isSearchable={true}
                            />
                          </div>
                          <div className="d-flex align-items-center me-3">
                            <User size={18} className="me-2" />
                            <Form.Control
                              type="text"
                              placeholder="Position"
                              value={item.position}
                              onChange={(e) => handleCoCurriculumChange(index, 'position', e.target.value)}
                              className="py-0 px-2"
                            />
                          </div>
                          <div className="d-flex align-items-center">
                            <Building size={18} className="me-2" />
                            <Form.Control
                              type="text"
                              placeholder="Institution"
                              value={item.institution}
                              onChange={(e) => handleCoCurriculumChange(index, 'institution', e.target.value)}
                              className="py-0 px-2"
                            />
                          </div>
                        </div>
                        <div>
                          <Button variant="link" onClick={() => handleSaveCoCurriculum(index)} className="me-2">
                            <Save size={18} color="black" />
                          </Button>
                          <Button variant="link" onClick={() => handleRemoveCoCurriculum(index)}>
                            <Trash2 size={18} color="red" />
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    // View mode
                    <>
                      <div className="fw-bold mb-2" style={{ fontSize: '1.1rem' }}>{item.name}</div>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex flex-grow-1">
                          <div className="me-3"><Calendar size={18} className="me-2" />{item.year}</div>
                          <div className="me-3"><User size={18} className="me-2" />{item.position}</div>
                          <div><Building size={18} className="me-2" />{item.institution}</div>
                        </div>
                        <div>
                          <Button variant="link" onClick={() => handleEditCoCurriculum(index)} className="p-0 me-2">
                            <Edit size={18} color="black" />
                          </Button>
                          <Button variant="link" onClick={() => handleRemoveCoCurriculum(index)} className="p-0">
                            <Trash2 size={18} color="red" />
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
            <Button
              variant="outline-primary"
              onClick={handleAddCoCurriculum}
              className="w-100 mt-3"
            >
              Add New +
            </Button>
            {renderNavButtons()}
          </div>
        );
      case 3:
        return (
          <div className="step-content p-4 rounded">
            <h3 className="border-bottom pb-2 fw-normal">Achievements</h3>
            <div className="achievement-list">
              {formData.achievements && formData.achievements.map((item, index) => (
                <div key={index} className="achievement-item row mb-4 border rounded p-4">
                  {item.isEditing ? (
                    // Editing mode
                    <>
                      <Form.Control
                        type="text"
                        placeholder="Name of Achievement..."
                        value={item.name}
                        onChange={(e) => handleAchievementChange(index, 'name', e.target.value)}
                        className="mb-2 border-0 p-0 fw-bold"
                        style={{ fontSize: '1.1rem' }}
                      />
                      <div className="d-flex justify-content-between">
                        <div className="d-flex flex-grow-1 ">
                          <div className="d-flex align-items-center me-3 w-25">
                            <Calendar size={18} className="me-2" />
                            <Select
                              options={yearOptions}
                              value={{ value: item.year, label: item.year }}
                              onChange={(selectedOption) => handleAchievementChange(index, 'year', selectedOption.value)}
                              placeholder="Year"
                              className="flex-grow-1"
                              styles={customStyles}
                              components={{ Option: CustomOption }}
                              isClearable={false}
                              isSearchable={true}
                            />
                          </div>
                          <div className="d-flex align-items-center me-3">
                            <Trophy size={18} className="me-2" />
                            <Form.Control
                              type="text"
                              placeholder="Position"
                              value={item.position}
                              onChange={(e) => handleAchievementChange(index, 'position', e.target.value)}
                              className="py-0 px-2"
                            />
                          </div>
                          <div className="d-flex align-items-center">
                            <Building size={18} className="me-2" />
                            <Form.Control
                              type="text"
                              placeholder="Institution"
                              value={item.institution}
                              onChange={(e) => handleAchievementChange(index, 'institution', e.target.value)}
                              className="py-0 px-2 me-2"
                            />
                          </div>
                          <div className="mt-2">
                            {item.file ? (
                              <div className="d-flex align-items-center">
                                <FileText size={18} className="me-2" />
                                <span className="me-2">{item.file.name}</span>
                                <Button
                                  variant="link"
                                  className="p-0 text-danger"
                                  onClick={() => handleRemoveAchievementFile(index)}
                                >
                                  <X size={18} />
                                </Button>
                              </div>
                            ) : (
                              <div className="d-flex align-items-center">
                                <FileText size={18} className="me-2" />
                                <Button
                                  variant="secondary"
                                  className="d-flex align-items-center"
                                  onClick={() => document.getElementById(`achievementFileInput-${index}`).click()}
                                >
                                  Upload File
                                </Button>
                                <input
                                  id={`achievementFileInput-${index}`}
                                  type="file"
                                  className="d-none"
                                  onChange={(e) => handleAchievementFileUpload(index, e.target.files[0])}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="mt-2 d-flex justify-content-end">
                          <Button variant="link" onClick={() => handleSaveAchievement(index)} className="me-2">
                            <Save size={18} color="black" />
                          </Button>
                          <Button variant="link" onClick={() => handleRemoveAchievement(index)}>
                            <Trash2 size={18} color="red" />
                          </Button>
                        </div>
                      </div>


                    </>
                  ) : (
                    // View mode
                    <>
                      <div className="fw-bold mb-2" style={{ fontSize: '1.1rem' }}>{item.name}</div>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex flex-grow-1 align-items-center">
                          <div className="me-3"><Calendar size={18} className="me-2" />{item.year}</div>
                          <div className="me-3"><Trophy size={18} className="me-2" />{item.position}</div>
                          <div className="me-3"><Building size={18} className="me-2" />{item.institution}</div>
                          {item.file && (
                            <div className=" d-flex align-items-center text-decoration-underline">
                              <FileText size={18} className="me-2" />
                              <span>{item.file.name}</span>
                            </div>
                          )}
                        </div>
                        <div className=" d-flex justify-content-end">
                          <Button variant="link" onClick={() => handleEditAchievement(index)} className="p-0 me-2">
                            <Edit size={18} color="black" />
                          </Button>
                          <Button variant="link" onClick={() => handleRemoveAchievement(index)} className="p-0">
                            <Trash2 size={18} color="red" />
                          </Button>
                        </div>
                      </div>


                    </>
                  )}
                </div>
              ))}
            </div>
            <Button
              variant="outline-primary"
              onClick={handleAddAchievement}
              className="w-100 mt-3"
            >
              Add New Achievement +
            </Button>
            {renderNavButtons()}
          </div>
        );
      case 4:
        return (
          <div className="step-content p-4 rounded">
            <h3 className="border-bottom pb-2 fw-normal">Other Documents</h3>
            <div className="other-docs-list">
              {formData.otherDocs && formData.otherDocs.map((doc, index) => (
                <div key={index} className="other-doc-item mb-4 border rounded p-4">
                  {doc.isEditing ? (
                    // Editing mode
                    <>
                      <Form.Control
                        type="text"
                        placeholder="Name of certificate/document..."
                        value={doc.name}
                        onChange={(e) => handleOtherDocChange(index, 'name', e.target.value)}
                        className="mb-2 border-0 p-0 fw-bold"
                        style={{ fontSize: '1.1rem' }}
                      />
                      <div className="d-flex justify-content-between">
                        <div className="mt-2">
                          {doc.file ? (
                            <div className="d-flex align-items-center">
                              <FileText size={18} className="me-2" />
                              <span className="me-2">{doc.file.name}</span>
                              <Button
                                variant="link"
                                className="p-0 text-danger"
                                onClick={() => handleRemoveOtherDocFile(index)}
                              >
                                <X size={18} />
                              </Button>
                            </div>
                          ) : (
                            <div className="d-flex align-items-center">
                              <Button
                                variant="secondary"
                                className="d-flex align-items-center"
                                onClick={() => document.getElementById(`otherDocFileInput-${index}`).click()}
                              >
                                <Upload size={18} className="me-2" />
                                Upload File
                              </Button>
                              <input
                                id={`otherDocFileInput-${index}`}
                                type="file"
                                className="d-none"
                                onChange={(e) => handleOtherDocFileUpload(index, e.target.files[0])}
                              />
                            </div>
                          )}
                        </div>
                        <div className="mt-2 d-flex justify-content-end">
                          <Button variant="link" onClick={() => handleSaveOtherDoc(index)} className="me-2">
                            <Save size={18} color="black" />
                          </Button>
                          <Button variant="link" onClick={() => handleRemoveOtherDoc(index)}>
                            <Trash2 size={18} color="red" />
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    // View mode
                    <>
                      <div className="d-flex justify-content-between">
                        <div>
                          <div className="fw-bold mb-2" style={{ fontSize: '1.1rem' }}>{doc.name}</div>
                          {doc.file && (
                            <div className="mt-2 d-flex align-items-center  text-decoration-underline">
                              <FileText size={18} className="me-2" />
                              <span>{doc.file.name}</span>
                            </div>
                          )}
                        </div>
                        <div className="mt-2 d-flex justify-content-end ">
                          <Button variant="link" onClick={() => handleEditOtherDoc(index)} className="p-0 me-2">
                            <Edit size={18} />
                          </Button>
                          <Button variant="link" onClick={() => handleRemoveOtherDoc(index)} className="p-0">
                            <Trash2 size={18} color="red" />
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
            <Button
              variant="outline-primary"
              onClick={handleAddOtherDoc}
              className="w-100 mt-3"
            >
              Add New Document +
            </Button>
            {renderNavButtons()}
          </div>
        );
      case 5:
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
            {renderNavButtons()}
          </div>
        );
      case 6:
        return (
          <div className="step-content">
            <h2>Review Information</h2>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Course:</strong> {formData.course}</p>
            <p><strong>Start Date:</strong> {formData.startDate}</p>
            {renderNavButtons()}
          </div>
        );
      case 7:
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
  const [showSummary, setShowSummary] = useState(false);

  const handleViewSummary = () => {
    setShowSummary(true);
  };

  const renderPostSubmission = () => (
    <div className="main-content-applycourse">
      <div className="backgroundimage">
        <div>
          <div className="widget-applying-course-success justify-content-center">
            <h1 className="text-danger align-self-center fw-bold mb-5 display-6">Congratulations!</h1>
            <h3 className="text-black align-self-center fw-normal mb-4">Your application has been successfully submitted.</h3>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <Button variant="primary" className="me-3" onClick={handleViewSummary}>
          View Summary
        </Button>
        <Button variant="secondary" onClick={() => {/* Add logic to go back to course page */ }}>
          Back to Course Page
        </Button>
      </div>
    </div>
  );

  if (showSummary) {
    return (
      <div className="app-container-applycourse-viewsummary mt-5">
        <NavButtonsSP />
            <ApplicationSummary />
        <SpcFooter />
      </div>
      
    );
  }

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

        <Box sx={{ width: '100%', mb: 4, mt: 4, mx: 6 }}>
          <CustomStepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <CustomStepLabel StepIconComponent={StepIcon}>{label}</CustomStepLabel>
              </Step>
            ))}
          </CustomStepper>
        </Box>

        <Form onSubmit={(e) => e.preventDefault()}>
          {renderStep()}
        </Form>
      </div>
      <SpcFooter />
    </div>
  );
};

export default StudentApplyCourse;