import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Trash2, Edit, Calendar, User, Building, LucideFileChartColumnIncreasing, Save, Trophy, FileText, Upload, X, Plus, ChevronDown, Clock4, Landmark, CircleX, AlignJustify } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavButtonsSP from "../../Components/StudentPortalComp/NavButtonsSP";
import SpcFooter from "../../Components/StudentPortalComp/SpcFooter";
import ApplicationSummary from "../../Components/StudentPortalComp/ApplicationSummary";
import "../../css/StudentPortalStyles/StudentApplyCourse.css";
import "../../css/StudentPortalStyles/StudentButtonGroup.css";
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

import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//testing
import WidgetPopUpRemind from "../../Components/StudentPortalComp/WidgetPopUpRemind";
import WidgetPopUpSubmission from "../../Components/StudentPortalComp/WidgetPopUpSubmission";
import WidgetPopUpFillIn from "../../Components/StudentPortalComp/WidgetPopUpFillIn";

// ... existing code ...

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 25, // Half of the icon height (50/2) to center the connector
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#B71A18',
      borderWidth: "0.5rem"
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#B71A18',
      borderWidth: "0.5rem"
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#e0e0e0',
    borderWidth: "0.5rem",
  },
  '@media (max-width: 375px)': {
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 20,
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderWidth: "0.3rem",
    },
  },
}));

// Update the CustomStepper component
const CustomStepper = styled(Stepper)(({ theme }) => ({
  '& .MuiStepConnector-line': {
    borderWidth: "0.5rem",

  },
  '@media (max-width: 375px)': {
    '& .MuiStep-root': {
      padding: '0 4px', // Reduce padding between steps
    },
  },
}));

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
    border-radius: 10px;
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



const CustomStepLabel = styled(StepLabel)(({ theme }) => ({
  '& .MuiStepLabel-label': {
    fontSize: '0.8rem',
    color: '#e0e0e0',
    fontWeight: "bold",
    marginTop: '10px', // Add some margin to separate the label from the larger icon
    '&.Mui-active': {
      color: '#000',
      fontSize: '0.8rem',
      fontWeight: "bold"
    },
    '&.Mui-completed': {
      color: '#000',
      fontSize: '0.8rem',
      fontWeight: "bold"
    },
  },
  '@media (max-width: 375px)': {
    '& .MuiStepLabel-label': {
      fontSize: '0.7rem',
      marginTop: '5px',
    },
  },
}));

const CustomStepIcon = styled('div')(({ theme, ownerState }) => ({
  width: 50,
  height: 50,
  borderRadius: '50%',
  backgroundColor: ownerState.completed ? '#B71A18' : ownerState.active ? '#B71A18' : '#e0e0e0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '1.5rem',
  zIndex: 1,
  '@media (max-width: 375px)': {
    width: 40,
    height: 40,
    fontSize: '1.2rem',
  },
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
  //testing
  // const [showRemindPopup, setShowRemindPopup] = useState(false);
  const [showSubmissionPopup, setShowSubmissionPopup] = useState(false);
  // const [showFillInPopup, setShowFillInPopup] = useState(false);

  //
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    startDate: '',
    coCurriculum: [],
    achievements: [],
    otherDocs: [],  // Initialize as an empty array
    academicTranscripts: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    setShowSubmissionPopup(true);
  };

  const handleConfirmSubmission = () => {
    setShowSubmissionPopup(false);
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



  const handleDateChangeAchievement = (date, index) => {
    handleAchievementChange(index, 'date', date);
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
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


  const educationOptions = [
    { value: 'STPM', label: 'STPM' },
    { value: 'SPM', label: 'SPM' },
    { value: 'Foundation', label: 'Foundation' },
    { value: 'O-Level', label: 'O-Level' },
    { value: 'Diploma', label: 'Diploma' },
    { value: 'Previous', label: 'Previous' },
  ];

  // Modify the handleAddTranscript function
  const handleAddTranscript = () => {
    setFormData(prevData => ({
      ...prevData,
      academicTranscripts: [
        ...(prevData.academicTranscripts || []),
        { name: '', subjects: [], documents: [] }
      ]
    }));
  };

  // Add this new function to handle transcript type selection
  const handleTranscriptTypeChange = (index, selectedOption) => {
    setFormData(prevData => ({
      ...prevData,
      academicTranscripts: prevData.academicTranscripts.map((transcript, i) =>
        i === index ? { ...transcript, name: selectedOption.value } : transcript
      )
    }));
  };
  const handleTranscriptChange = (index, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      academicTranscripts: prevData.academicTranscripts.map((transcript, i) =>
        i === index ? { ...transcript, [field]: value } : transcript
      )
    }));
  };

  const handleRemoveTranscript = (index) => {
    setFormData(prevData => ({
      ...prevData,
      academicTranscripts: prevData.academicTranscripts.filter((_, i) => i !== index)
    }));
  };

  const handleAddSubject = (transcriptIndex) => {
    setFormData(prevData => ({
      ...prevData,
      academicTranscripts: prevData.academicTranscripts.map((transcript, i) =>
        i === transcriptIndex
          ? { ...transcript, subjects: [...transcript.subjects, { name: '', grade: '', isEditing: true }] }
          : transcript
      )
    }));
  };
  const handleAddDocument = (transcriptIndex) => {
    setFormData(prevData => ({
      ...prevData,
      academicTranscripts: prevData.academicTranscripts.map((transcript, i) =>
        i === transcriptIndex
          ? { ...transcript, documents: [...transcript.documents, { name: 'New Document', title: '', isEditing: true }] }
          : transcript
      )
    }));
  };


  const handleSubjectChange = (transcriptIndex, subjectIndex, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      academicTranscripts: prevData.academicTranscripts.map((transcript, i) =>
        i === transcriptIndex
          ? {
            ...transcript,
            subjects: transcript.subjects.map((subject, j) =>
              j === subjectIndex ? { ...subject, [field]: value } : subject
            )
          }
          : transcript
      )
    }));
  };

  const handleRemoveSubject = (transcriptIndex, subjectIndex) => {
    setFormData(prevData => ({
      ...prevData,
      academicTranscripts: prevData.academicTranscripts.map((transcript, i) =>
        i === transcriptIndex
          ? { ...transcript, subjects: transcript.subjects.filter((_, j) => j !== subjectIndex) }
          : transcript
      )
    }));
  };


  const handleDocumentChange = (transcriptIndex, documentIndex, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      academicTranscripts: prevData.academicTranscripts.map((transcript, i) =>
        i === transcriptIndex
          ? {
            ...transcript,
            documents: transcript.documents.map((doc, j) =>
              j === documentIndex ? { ...doc, [field]: value } : doc
            )
          }
          : transcript
      )
    }));
  };

  const handleRemoveDocument = (transcriptIndex, documentIndex) => {
    setFormData(prevData => ({
      ...prevData,
      academicTranscripts: prevData.academicTranscripts.map((transcript, i) =>
        i === transcriptIndex
          ? { ...transcript, documents: transcript.documents.filter((_, j) => j !== documentIndex) }
          : transcript
      )
    }));
  };

  const handleUploadTranscript = (transcriptIndex) => {
    // Implement file upload logic here
    console.log('Uploading transcript for index:', transcriptIndex);
  };

  const handleSaveSubject = (transcriptIndex, subjectIndex) => {
    setFormData(prevData => ({
      ...prevData,
      academicTranscripts: prevData.academicTranscripts.map((transcript, i) =>
        i === transcriptIndex ? {
          ...transcript,
          subjects: transcript.subjects.map((subject, j) =>
            j === subjectIndex ? { ...subject, isEditing: false } : subject
          )
        } : transcript
      )
    }));
  };

  const handleEditSubject = (transcriptIndex, subjectIndex) => {
    setFormData(prevData => ({
      ...prevData,
      academicTranscripts: prevData.academicTranscripts.map((transcript, i) =>
        i === transcriptIndex ? {
          ...transcript,
          subjects: transcript.subjects.map((subject, j) =>
            j === subjectIndex ? { ...subject, isEditing: true } : subject
          )
        } : transcript
      )
    }));
  };

  const handleSaveDocument = (transcriptIndex, documentIndex) => {
    setFormData(prevData => ({
      ...prevData,
      academicTranscripts: prevData.academicTranscripts.map((transcript, i) =>
        i === transcriptIndex ? {
          ...transcript,
          documents: transcript.documents.map((doc, j) =>
            j === documentIndex ? { ...doc, isEditing: false } : doc
          )
        } : transcript
      )
    }));
  };

  const handleEditDocument = (transcriptIndex, documentIndex) => {
    setFormData(prevData => ({
      ...prevData,
      academicTranscripts: prevData.academicTranscripts.map((transcript, i) =>
        i === transcriptIndex ? {
          ...transcript,
          documents: transcript.documents.map((doc, j) =>
            j === documentIndex ? { ...doc, isEditing: true } : doc
          )
        } : transcript
      )
    }));
  };

  const handleDocumentFileUpload = (transcriptIndex, docIndex) => {
    document.getElementById(`fileInput-${transcriptIndex}-${docIndex}`).click();
  };

  const handleDocumentFileChange = (transcriptIndex, docIndex, file) => {
    if (file) {
      setFormData(prevData => ({
        ...prevData,
        academicTranscripts: prevData.academicTranscripts.map((transcript, i) =>
          i === transcriptIndex ? {
            ...transcript,
            documents: transcript.documents.map((doc, j) =>
              j === docIndex ? { ...doc, name: file.name, file: file } : doc
            )
          } : transcript
        )
      }));
    }
  };

  // Drag and drop handlers
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    if (result.type === 'TRANSCRIPT') {
      const newTranscripts = Array.from(formData.academicTranscripts);
      const [reorderedItem] = newTranscripts.splice(source.index, 1);
      newTranscripts.splice(destination.index, 0, reorderedItem);

      setFormData(prevData => ({
        ...prevData,
        academicTranscripts: newTranscripts
      }));
    } else if (result.type === 'SUBJECT') {
      const transcriptIndex = parseInt(result.type.split('-')[1]);
      const newSubjects = Array.from(formData.academicTranscripts[transcriptIndex].subjects);
      const [reorderedItem] = newSubjects.splice(source.index, 1);
      newSubjects.splice(destination.index, 0, reorderedItem);

      setFormData(prevData => ({
        ...prevData,
        academicTranscripts: prevData.academicTranscripts.map((transcript, index) =>
          index === transcriptIndex ? { ...transcript, subjects: newSubjects } : transcript
        )
      }));
    }
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A': return 'success';
      case 'B': return 'primary';
      case 'C': return 'warning';
      case 'D': case 'E': case 'F': return 'danger';
      default: return 'secondary';
    }
  };

  //handle data change
  const handleDateChange = (date, index) => {
    handleAchievementChange(index, 'date', date);
  };

  // DragHandle component
  const DragHandle = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 4H11M7 9H11M7 14H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );



  //remove file for academic trancript
  const handleRemoveDocumentFile = (transcriptIndex, docIndex) => {
    setFormData(prevData => ({
      ...prevData,
      academicTranscripts: prevData.academicTranscripts.map((transcript, i) =>
        i === transcriptIndex ? {
          ...transcript,
          documents: transcript.documents.map((doc, j) =>
            j === docIndex ? { ...doc, file: null, name: 'New Document' } : doc
          )
        } : transcript
      )
    }));
  };


  const renderStep = () => {
    const renderNavButtons = () => (
      <div className="d-flex justify-content-between mt-4">
        {activeStep > 0 && (
          <Button onClick={() => setActiveStep(activeStep - 1)} className="me-2 rounded-pill px-5 sac-previous-button">
            Previous
          </Button>
        )}
        {activeStep < 4 && (
          <Button
            onClick={() => setActiveStep(activeStep + 1)}
            className={`${activeStep === 0 ? "ms-auto" : ""} sac-next-button rounded-pill px-5`}
          >
            Next
          </Button>
        )}
        {activeStep === 4 && (
          <Button
            onClick={handleSubmit}
            className="sac-next-button rounded-pill px-5"
          >
            Submit
          </Button>
        )}
      </div>
    );

    switch (activeStep) {
      case 0:
        return (
          <div className="step-content-caseone p-4 rounded">
            <h3 className="border-bottom pb-2 fw-normal">Basic Information</h3>
            <div className="sap-content-caseone w-100 d-flex justify-content-center">
              <div className="sap-content-caseone w-100 py-5 px-5">
                <div className="row mb-5">
                  <div className="col-md-6 ">
                    <div className="sac-form-group d-flex align-items-center">
                      <label htmlFor="firstName" className="me-2">First Name<span className="text-danger">*</span></label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="First Name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="sac-form-group d-flex align-items-center">
                      <label htmlFor="lastName" className="me-2">Last Name<span className="text-danger">*</span></label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Last Name"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-5">
                  <div className="col-md-6">
                    <div className="sac-form-group d-flex align-items-center">
                      <label htmlFor="icNumber" className="me-2">IC Number<span className="text-danger">*</span></label>
                      <input
                        type="text"
                        id="icNumber"
                        name="icNumber"
                        value={formData.icNumber}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="IC Number"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="sac-form-group d-flex align-items-center">
                      <label htmlFor="gender" className="me-2">Gender<span className="text-danger">*</span></label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row mb-5">
                  <div className="col-md-6">
                    <div className="sac-form-group d-flex align-items-center">
                      <label htmlFor="contactNumber" className="me-2">Contact Number<span className="text-danger">*</span></label>
                      <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Contact Number"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-5">
                  <div className="col-md-12">
                    <div className="sac-form-group d-flex align-items-center">
                      <label htmlFor="emailAddress" className="me-0 form-label">Email Address<span className="text-danger">*</span></label>
                      <input
                        type="email"
                        id="emailAddress"
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleInputChange}
                        className="form-control ms-2"
                        placeholder="Email Address"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-5">
                  <div className="col-md-12">
                    <div className="sac-form-group d-flex align-items-center">
                      <label htmlFor="address" className="me-0 form-label">Address<span className="text-danger">*</span></label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="form-control ms-2"
                        placeholder="Address"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-5">
                  <div className="col-md-6">
                    <div className="sac-form-group d-flex align-items-center">
                      <label htmlFor="country" className="me-2">Country<span className="text-danger">*</span></label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Country"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="sac-form-group d-flex align-items-center">
                      <label htmlFor="state" className="me-2">State<span className="text-danger">*</span></label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="State"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-5">
                  <div className="col-md-6">
                    <div className="sac-form-group d-flex align-items-center">
                      <label htmlFor="city" className="me-2">City<span className="text-danger">*</span></label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="City"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="sac-form-group d-flex align-items-center">
                      <label htmlFor="postcode" className="me-2">Postcode<span className="text-danger">*</span></label>
                      <input
                        type="text"
                        id="postcode"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Postcode"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {renderNavButtons()}
          </div>
        );

      case 1:

        return (
          <div className="step-content-casetwo p-4 rounded ">
            <h3 className="border-bottom pb-2 fw-normal">Academic Transcript</h3>
            <div className="academic-transcript-list">
              <DragDropContext onDragEnd={onDragEnd}>
                {formData.academicTranscripts && formData.academicTranscripts.map((transcript, index) => (
                  <div key={index} className="academic-transcript-item mb-4 border rounded py-4 ">
                    <div className="sac-container-casetwo d-flex  justify-content-between align-items-start align-items-sm-center mb-3 px-4">
                      <div className="d-flex align-items-center mb-2 mb-sm-0">
                        <AlignJustify className="me-2 align-self-center" size={15} />
                        <Form.Control
                          type="text"
                          value={transcript.name}
                          onChange={(e) => handleTranscriptChange(index, 'name', e.target.value)}
                          className="fw-bold border-0 sac-at-bg"
                        />
                      </div>
                      <div className="d-flex ">
                        <Button variant="link" className="p-0 me-2 " onClick={() => handleAddSubject(index)}>
                          <Plus size={18} color="grey" />
                        </Button>
                        <Button variant="link" className="p-0 me-2" onClick={() => handleUploadTranscript(index)}>
                          <Upload size={18} color="grey" />
                        </Button>
                        <Button variant="link" className="p-0" onClick={() => handleRemoveTranscript(index)}>
                          <Trash2 size={18} color="grey" />
                        </Button>
                      </div>
                    </div>
                    <div className="subjects-list">
                      {transcript.subjects.map((subject, subIndex) => (
                        <div className="px-4" key={subIndex}>
                          <div className="justify-content-between subject-item d-flex align-items-center mb-2 bg-white p-1 rounded-3">
                            {subject.isEditing ? (
                              // Edit mode
                              <>
                                <div className="d-flex align-items-center flex-grow-1">
                                  <AlignJustify className="mx-2 " size={15} color="grey" />
                                  <Form.Control
                                    type="text"
                                    value={subject.name}
                                    onChange={(e) => handleSubjectChange(index, subIndex, 'name', e.target.value)}
                                    className="me-2 w-25"
                                    placeholder="Enter Subject Name"
                                    style={{ fontSize: '0.9rem', fontWeight: "500" }}
                                    required
                                  />
                                  <Form.Control
                                    as="select"
                                    value={subject.grade}
                                    onChange={(e) => handleSubjectChange(index, subIndex, 'grade', e.target.value)}
                                    className={`me-2 w-auto px-2 py-1 px-3 rounded-5  border-0 text-white bg-${getGradeColor(subject.grade)}`}
                                    style={{ fontSize: '0.9rem', fontWeight: "500" }}
                                    required
                                  >
                                    <option value="" disabled>Grade</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                    <option value="E">E</option>
                                    <option value="F">F</option>
                                  </Form.Control>
                                </div>
                                <div className="d-flex">
                                  <Button variant="link" className="p-0 me-2" onClick={() => handleSaveSubject(index, subIndex)}>
                                    <Save size={15} color="grey" />
                                  </Button>
                                  <Button variant="link" className="p-0" onClick={() => handleRemoveSubject(index, subIndex)}>
                                    <Trash2 size={15} color="grey" />
                                  </Button>
                                </div>
                              </>
                            ) : (
                              // View mode
                              <>
                                <div className="d-flex align-items-center flex-grow-1">
                                  <DragHandle className="me-2" style={{ alignSelf: 'center' }} />
                                  <span className="me-21 " style={{ fontSize: '0.9rem', fontWeight: "500" }}> {subject.name}</span>
                                  <span style={{ fontSize: '0.9rem', fontWeight: "500" }} className={` ms-3 me-2 px-2 py-1 px-3 rounded-5 text-white bg-${getGradeColor(subject.grade)} `}>
                                    Grade: {subject.grade}
                                  </span>
                                </div>
                                <div className="d-flex">
                                  <Button variant="link" className="p-0 me-2" onClick={() => handleEditSubject(index, subIndex)}>
                                    <Edit size={15} color="grey" />
                                  </Button>
                                  <Button variant="link" className="p-0" onClick={() => handleRemoveSubject(index, subIndex)}>
                                    <Trash2 size={15} color="grey" />
                                  </Button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="upload-documents mt-3 border border-4 border-top-3 border-bottom-0 border-start-0 border-end-0">
                      <div className="d-flex justify-content-between align-items-center px-4">
                        <h6 className="mb-0">Upload Documents</h6>
                        <Button variant="link" className="p-0 me-2" onClick={() => handleAddDocument(index)}>
                          <Plus size={18} color="grey" />
                        </Button>
                      </div>
                      {transcript.documents.map((doc, docIndex) => (
                        <div className="px-4" key={docIndex}>
                          <div className="document-item d-flex align-items-center mb-2 bg-white p-1 gap-1 justify-content-between rounded-3">
                            {doc.isEditing ? (
                              // Edit mode
                              <>
                                <div className="d-flex flex-grow-1 align-items-center">
                                  <div className="me-3 border-end  px-3">
                                    {doc.file ? (
                                      <>
                                        <div className="sac-file-info">
                                          <FileText size={15} className="sac-file-icon" />
                                          <span className="sac-file-name">{doc.name}</span>
                                          <Button
                                            variant="link"
                                            className="sac-remove-file-btn"
                                            onClick={() => handleRemoveDocumentFile(index, docIndex)}
                                          >
                                            <CircleX size={15} color="red" />
                                          </Button>
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <Button
                                          variant="secondary"
                                          className="sac-upload-button"
                                          onClick={() => handleDocumentFileUpload(index, docIndex)}
                                        >
                                          <Upload size={15} className="me-2 upload-icon" />
                                          <span className="button-text">Upload File</span>
                                        </Button>
                                        <input
                                          type="file"
                                          id={`fileInput-${index}-${docIndex}`}
                                          className="d-none"
                                          onChange={(e) => handleDocumentFileChange(index, docIndex, e.target.files[0])}
                                        />
                                      </>
                                    )}
                                  </div>
                                  <div className="align-items-center flex-grow-1">
                                    <Form.Control
                                      type="text"
                                      value={doc.title}
                                      onChange={(e) => handleDocumentChange(index, docIndex, 'title', e.target.value)}
                                      className="me-2 w-100 border-0"
                                      placeholder="Name your file....."
                                      style={{ fontSize: '0.825rem' }}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <Button variant="link" className="p-0 me-2" onClick={() => handleSaveDocument(index, docIndex)}>
                                    <Save size={15} color="grey" />
                                  </Button>
                                  <Button variant="link" className="p-0" onClick={() => handleRemoveDocument(index, docIndex)}>
                                    <Trash2 size={15} color="grey" />
                                  </Button>
                                </div>
                              </>
                            ) : (
                              // View mode
                              <>
                                <div className="d-flex flex-grow-1">
                                  <div className="border-end me-4 px-3 align-items-center">
                                    <FileText size={15} className="me-2 ms-2" style={{ alignSelf: 'center' }} />
                                    <span className="me-2" style={{ fontSize: '0.825rem', textAlign: 'center', flex: 1 }}>{doc.name}</span>
                                  </div>
                                  <div className="align-items-center">
                                    <span style={{ fontSize: '0.825rem' }}>{doc.title}</span>
                                  </div>
                                </div>
                                <div>
                                  <Button variant="link" className="p-0 me-2" onClick={() => handleEditDocument(index, docIndex)}>
                                    <Edit size={15} color="grey" />
                                  </Button>
                                  <Button variant="link" className="p-0" onClick={() => handleRemoveDocument(index, docIndex)}>
                                    <Trash2 size={15} color="grey" />
                                  </Button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </DragDropContext>
            </div>
            <Button
              variant="outline-primary"
              onClick={handleAddTranscript}
              className="w-100 mt-3 sac-add-new-button"
            >
              Add New Transcript +
            </Button>
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
                      <div className="d-flex justify-content-between ps-0">
                        <div className="d-flex flex-grow-1 px-0">
                          <div className="d-flex align-items-center me-3 flex-shrink-0">
                            <Clock4 size={18} className="me-2" />
                            <DatePicker
                              selected={item.year ? new Date(item.year, 0) : null}
                              onChange={(date) => handleCoCurriculumChange(index, 'year', date.getFullYear())}
                              showYearPicker
                              dateFormat="yyyy"
                              yearItemNumber={9}
                              className="form-control py-0 px-2 date-picker-short"
                              placeholderText="Select year"
                            />
                          </div>
                          <div className="d-flex align-items-center me-3 flex-shrink-0">
                            <User size={18} className="me-2" />
                            <Form.Control
                              type="text"
                              placeholder="Position"
                              value={item.position}
                              onChange={(e) => handleCoCurriculumChange(index, 'position', e.target.value)}
                              className="py-0 px-2 input-short"
                            />
                          </div>
                          <div className="d-flex align-items-center flex-shrink-0">
                            <Landmark size={18} className="me-2" />
                            <Form.Control
                              type="text"
                              placeholder="Institution"
                              value={item.institution}
                              onChange={(e) => handleCoCurriculumChange(index, 'institution', e.target.value)}
                              className="py-0 px-2 input-short"
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
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-grow-1">
                          <div className="me-3"><Clock4 size={18} className="me-2" />{item.year}</div>
                          <div className="me-3"><User size={18} className="me-2" />{item.position}</div>
                          <div><Landmark size={18} className="me-2" />{item.institution}</div>
                        </div>
                        <div>
                          <Button variant="link" onClick={() => handleEditCoCurriculum(index)} className=" me-2">
                            <Edit size={18} color="black" />
                          </Button>
                          <Button variant="link" onClick={() => handleRemoveCoCurriculum(index)} className="">
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
              className="w-100 mt-3 sac-add-new-button"
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
                        className="mb-2 border-0 p-0 fw-bold w-25"
                        style={{ fontSize: '1.1rem' }}
                      />
                      <div className="d-flex justify-content-between ps-0">
                        <div className="d-flex flex-grow-1 px-0">
                          <div className="d-flex align-items-center me-3 flex-shrink-0">
                            <Clock4 size={18} className="me-2" />
                            <DatePicker
                              selected={item.date ? new Date(item.date) : null}
                              onChange={(date) => handleDateChangeAchievement(date, index)}
                              dateFormat="dd/MM/yyyy"
                              className="form-control py-0 px-2 date-picker-short"
                              placeholderText="Select date"
                            />
                          </div>
                          <div className="d-flex align-items-center me-3 flex-shrink-0">
                            <Trophy size={18} className="me-2" />
                            <Form.Control
                              type="text"
                              placeholder="Position"
                              value={item.position}
                              onChange={(e) => handleAchievementChange(index, 'position', e.target.value)}
                              className="py-0 px-2 input-short"
                            />
                          </div>
                          <div className="d-flex align-items-center me-3 flex-shrink-0">
                            <Landmark size={18} className="me-2" />
                            <Form.Control
                              type="text"
                              placeholder="Institution"
                              value={item.institution}
                              onChange={(e) => handleAchievementChange(index, 'institution', e.target.value)}
                              className="py-0 px-2 input-short"
                            />
                          </div>
                          <div className="d-flex justify-content-center align-items-center">
                            {item.file ? (
                              <div className="d-flex align-items-center">
                                <FileText size={18} className="me-2" />
                                <span className="mx-0 text-decoration-underline text-truncate file-name">{item.file.name}</span>
                                <Button
                                  variant="link"
                                  className="p-0 me-5 text-danger"
                                  onClick={() => handleRemoveAchievementFile(index)}
                                >
                                  <CircleX size={18} />
                                </Button>
                              </div>
                            ) : (
                              <div className="d-flex align-items-center ms-2">
                                <FileText size={18} className="me-2" />
                                <Button
                                  variant="secondary"
                                  className="d-flex align-items-center py-1 px-4 rounded-2"
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
                        <div className=" d-flex justify-content-end">
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
                          <div className="me-3">
                            <Clock4 size={18} className="me-2" />
                            {item.date ? formatDate(new Date(item.date)) : 'No date selected'}
                          </div>
                          <div className="me-3"><Trophy size={18} className="me-2" />{item.position}</div>
                          <div className="me-3"><Landmark size={18} className="me-2" />{item.institution}</div>
                          {item.file && (
                            <div className=" d-flex align-items-center text-decoration-underline">
                              <FileText size={18} className="me-2" />
                              <span>{item.file.name}</span>
                            </div>
                          )}
                        </div>
                        <div className=" d-flex justify-content-end">
                          <Button variant="link" onClick={() => handleEditAchievement(index)} className="me-2">
                            <Edit size={18} color="black" />
                          </Button>
                          <Button variant="link" onClick={() => handleRemoveAchievement(index)} className="">
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
              className="w-100 mt-3 sac-add-new-button"
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
                              <FileText size={18} className="me-2 " />
                              <span className="me-2 text-decoration-underline">{doc.file.name}</span>
                              <Button
                                variant="link"
                                className="p-0 text-danger"
                                onClick={() => handleRemoveOtherDocFile(index)}
                              >
                                <CircleX size={18} />
                              </Button>
                            </div>
                          ) : (
                            <div className="d-flex align-items-center ">
                              <FileText size={18} className="me-2" />
                              <Button
                                variant="secondary"
                                className="sac-upload-button"
                                onClick={() => document.getElementById(`otherDocFileInput-${index}`).click()}
                              >
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
                        <div className=" d-flex justify-content-end">
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
                        <div className="d-flex justify-content-end align-items-end ">
                          <Button variant="link" onClick={() => handleEditOtherDoc(index)} className=" me-2">
                            <Edit size={18} color="black" />
                          </Button>
                          <Button variant="link" onClick={() => handleRemoveOtherDoc(index)} className="">
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
              className="w-100 mt-3 sac-add-new-button"
            >
              Add New Document +
            </Button>
            {renderNavButtons()}
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
    <div>
      <div className="backgroundimage">
        <div className="widget-applying-course-success">
          <h1 className="text-danger fw-bold mb-4">Congratulations!</h1>
          <h3 className="text-black fw-normal">Your application has been successfully submitted.</h3>
        </div>
      </div>
      <div className="post-submission-buttons">
        <Button className="sac-submit-button" onClick={handleViewSummary}>
          View Summary
        </Button>
        <Button className="sac-submit-button" onClick={() => {/* Add logic to go back to course page */ }}>
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
      <div className="app-container-applycourse ">
        <NavButtonsSP />
        <div className="main-content-applycourse">
          {renderPostSubmission()}
        </div>
        <SpcFooter />
      </div>
    );
  }


  return (
    <div className="app-container-applycourse mt-4">
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
        <Box sx={{ width: '100%', mb: 4, mt: 4, mx: 0 }}>
          <CustomStepper activeStep={activeStep} alternativeLabel connector={<CustomConnector />}>
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
      <WidgetPopUpSubmission
        isOpen={showSubmissionPopup}
        onClose={() => setShowSubmissionPopup(false)}
        onConfirm={handleConfirmSubmission}
      />
      <SpcFooter />
    </div>
  );
};



export default StudentApplyCourse;