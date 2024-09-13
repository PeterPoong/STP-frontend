import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Box, Stepper, Step, StepLabel } from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import NavButtonsSP from "../../Components/StudentPortalComp/NavButtonsSP";
import SpcFooter from "../../Components/StudentPortalComp/SpcFooter";
import BasicInformation from '../../Components/StudentPortalComp/ApplyCourse/BasicInformation'
import AcademicTranscript from '../../Components/StudentPortalComp/ApplyCourse/AcademicTranscript';
import CoCurriculum from '../../Components/StudentPortalComp/ApplyCourse/CoCurriculum'
import Achievements from '../../Components/StudentPortalComp/ApplyCourse/Achievements';
import OtherDocuments from '../../Components/StudentPortalComp/ApplyCourse/OtherDocuments';
import WidgetPopUpSubmission from "../../Components/StudentPortalComp/Widget/WidgetPopUpSubmission";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/StudentPortalStyles/StudentApplyCourse.css";
import "../../css/StudentPortalStyles/StudentButtonGroup.css";
import image1 from "../../assets/StudentAssets/University Logo/image1.jpg";

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

const CustomStepper = styled(Stepper)(({ theme }) => ({
  '& .MuiStepConnector-line': {
    borderWidth: "0.5rem",
  },
  '@media (max-width: 375px)': {
    '& .MuiStep-root': {
      padding: '0 4px',
    },
  },
}));


const CustomStepLabel = styled(StepLabel)(({ theme }) => ({
  '& .MuiStepLabel-label': {
    fontSize: '0.8rem',
    color: '#e0e0e0',
    fontWeight: "bold",
    marginTop: '10px',
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

const steps = [
  'Basic Information',
  'Academic Transcript',
  'Co-Curriculum',
  'Achievements',
  'Other Certificates/Documents'
];

const StudentApplyCourses = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { courseId } = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSubmissionPopup, setShowSubmissionPopup] = useState(false);
  const [formData, setFormData] = useState({
    basicInformation: {},
    academicTranscript: {},
    coCurriculum: [],
    achievements: [],
    otherDocs: []
  });

  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    setShowSubmissionPopup(true);
  };



  const handleConfirmSubmission = async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/applyCourse`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseID: courseId }),
      });

      if (response.ok) {
        setShowSubmissionPopup(false);
        setIsSubmitted(true);

        // Store only the most recently applied course ID
        sessionStorage.setItem('lastAppliedCourseId', courseId);
      } else {
        console.error('Error submitting course application:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting course application:', error);
    }
  };


  const updateFormData = (step, data) => {
    setFormData(prevData => ({
      ...prevData,
      [step]: data
    }));
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <BasicInformation
          data={formData.basicInformation}
          onSubmit={(data) => updateFormData('basicInformation', data)}
        />;
      case 1:
        return <AcademicTranscript
          data={formData.academicTranscript}
          updateData={(data) => updateFormData('academicTranscript', data)}
        />;
      case 2:
        return <CoCurriculum
          data={formData.coCurriculum}
          updateData={(data) => updateFormData('coCurriculum', data)}
        />;
      case 3:
        return <Achievements
          data={formData.achievements}
          updateData={(data) => updateFormData('achievements', data)}
        />;
      case 4:
        return <OtherDocuments
          data={formData.otherDocs}
          updateData={(data) => updateFormData('otherDocs', data)}
        />;
      default:
        return null;
    }
  };

  const StepIcon = (props) => {
    const { active, completed, className, icon } = props;
    return (
      <CustomStepIcon ownerState={{ active, completed }} className={className}>
        {icon}
      </CustomStepIcon>
    );
  };

  if (isSubmitted) {
    return (
      <div className="app-container-applycourse">
        <NavButtonsSP />
        <div className="main-content-applycourse">
          <div className="backgroundimage">
            <div className="widget-applying-course-success">
              <h1 className="text-danger fw-bold mb-4">Congratulations!</h1>
              <h3 className="text-black fw-normal">Your application has been successfully submitted.</h3>
            </div>
          </div>
          <div className="post-submission-buttons">
            <Button
              className="sac-submit-button"
              onClick={() => navigate(`/studentApplicationSummary/${sessionStorage.getItem('lastAppliedCourseId')}`)}
            >
              View Summary
            </Button>
            <Button className="sac-submit-button" onClick={() => navigate('/courses')}>
              Back to Course Page
            </Button>
          </div>
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
          <div className="widget-applying-course justify-content-center">
            <h4 className="text-black align-self-center fw-normal mb-4">You are now applying for </h4>
            <h3 className="text-danger align-self-center fw-bold mb-5">Bachelor in Mass Communication</h3>
            <div className="d-flex justify-content-center">
              <img src={image1} className="sac-image me-5" alt="University Logo" />
              <h3 className="text-black fw-bold align-self-center">Swinburne University of Technology</h3>
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
          <div className="d-flex justify-content-between mt-4">
            {activeStep > 0 && (
              <Button onClick={handleBack} className="me-2 rounded-pill px-5 sac-previous-button">
                Previous
              </Button>
            )}
            {activeStep < steps.length - 1 ? (
              <Button
                onClick={handleNext}
                className={`${activeStep === 0 ? "ms-auto" : ""} sac-next-button rounded-pill px-5`}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="sac-next-button rounded-pill px-5"
              >
                Submit
              </Button>
            )}
          </div>
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

export default StudentApplyCourses;