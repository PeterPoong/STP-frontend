import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

import { Box, Stepper, Step, StepLabel } from "@mui/material";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import NavButtonsSP from "../../Components/StudentPortalComp/NavButtonsSP";
import SpcFooter from "../../Components/StudentPortalComp/SpcFooter";
import BasicInformation from "../../Components/StudentPortalComp/ApplyCourse/BasicInformation";
import AcademicTranscript from "../../Components/StudentPortalComp/ApplyCourse/AcademicTranscript";
import CoCurriculum from "../../Components/StudentPortalComp/ApplyCourse/CoCurriculum";
import Achievements from "../../Components/StudentPortalComp/ApplyCourse/Achievements";
import OtherDocuments from "../../Components/StudentPortalComp/ApplyCourse/OtherDocuments";
import WidgetPopUpSubmission from "../../Components/StudentPortalComp/Widget/WidgetPopUpSubmission";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../../css/StudentPortalStyles/StudentApplyCourse.css";
import "../../css/StudentPortalStyles/StudentButtonGroup.css";
import image1 from "../../assets/StudentAssets/University Logo/image1.jpg";
import WidgetPopUpError from "../../Components/StudentPortalComp/Widget/WidgetPopUpError";
import StudentApplyCustomCourses from "../../Components/StudentComp/StudentApplyCustomCourses";

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 25, // Half of the icon height (50/2) to center the connector
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#B71A18",
      borderWidth: "0.5rem",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#B71A18",
      borderWidth: "0.5rem",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#e0e0e0",
    borderWidth: "0.5rem",
  },
  "@media screen and (max-width: 426px) and (min-width: 250px)": {
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 17.5,
      left: "calc(-50% + 10.825px)",
      right: "calc(50% + 0px)",
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderWidth: "0.35rem",
      width: "7rem",
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#B71A18",
        borderWidth: "0.35rem",
        width: "5rem",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#B71A18",
        borderWidth: "0.35rem",
        width: "10rem",
      },
    },
  },
}));

const CustomStepper = styled(Stepper)(({ theme }) => ({
  "& .MuiStepConnector-line": {
    borderWidth: "0.5rem",
  },
  "@media screen and (max-width: 426px) and (min-width: 250px)": {
    "& .MuiStep-root": {
      padding: "0 0.25px",
    },
  },
}));

const CustomStepLabel = styled(StepLabel)(({ theme }) => ({
  "& .MuiStepLabel-label": {
    fontSize: "0.9rem",
    color: "#e0e0e0",
    fontWeight: "bold",
    marginTop: "10px",
    "&.Mui-active": {
      color: "#000",
      fontSize: "0.9rem",
      fontWeight: "bold",
    },
    "&.Mui-completed": {
      color: "#000",
      fontSize: "0.9rem",
      fontWeight: "bold",
    },
  },
  "@media screen and (max-width: 426px) and (min-width: 250px)": {
    "& .MuiStepLabel-label": {
      fontSize: "0.625rem",
      marginTop: "10px",
      "&.Mui-active": {
        fontSize: "0.625em",
      },
      "&.Mui-completed": {
        fontSize: "0.625rem",
      },
    },
  },
}));

const CustomStepIcon = styled("div")(({ theme, ownerState }) => ({
  width: 50,
  height: 50,
  borderRadius: "50%",
  backgroundColor: ownerState.completed
    ? "#B71A18"
    : ownerState.active
    ? "#B71A18"
    : "#e0e0e0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "1.5rem",
  zIndex: 1,
  "@media screen and (max-width: 426px) and (min-width: 250px)": {
    width: 35,
    height: 35,
    fontSize: "0.825rem",
  },
}));

const steps = [
  "Basic Information",
  "Academic Transcript",
  "Co-Curriculum",
  "Achievements",
  "Other Certificates/Documents",
];

const StudentApplyCourses = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { courseId } = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSubmissionPopup, setShowSubmissionPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const { schoolLogoUrl, schoolId, schoolName, courseName } =
    location.state || {};
  const [formData, setFormData] = useState({
    basicInformation: {},
    academicTranscript: {},
    coCurriculum: [],
    achievements: [],
    otherDocs: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log("course", schoolId);
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");

    if (!token) {
      navigate("/studentPortalLogin");
    }
  }, [navigate]);

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
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/student/applyCourse`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courseID: courseId }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setShowSubmissionPopup(false);
        setIsSubmitted(true);
        sessionStorage.setItem("lastAppliedCourseId", courseId);
      } else if (data.error && data.error.courses) {
        setErrorMessage(data.error.courses[0]);
        setShowErrorPopup(true);
        setShowSubmissionPopup(false);
        setTimeout(() => {
          navigate("/courses");
        }, 3000);
      } else {
        throw new Error(
          data.message || "An error occurred while submitting the application"
        );
      }
    } catch (error) {
      setErrorMessage(error.message);
      setShowErrorPopup(true);
      setShowSubmissionPopup(false);
    }
  };

  const updateFormData = (step, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [step]: data,
    }));
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <BasicInformation
            data={formData.basicInformation}
            onSubmit={(data) => {
              updateFormData("basicInformation", data);
              handleNext();
            }}
          />
        );
      case 1:
        return (
          <AcademicTranscript
            data={formData.academicTranscript}
            onNext={handleNext} // Pass handleNext for the "Next" button
            onBack={handleBack} // Pass handleBack for the "Previous" button
          />
        );
      case 2:
        return (
          <CoCurriculum
            data={formData.coCurriculum}
            onNext={handleNext} // Pass handleNext for the "Next" button
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <Achievements
            data={formData.achievements}
            onNext={handleNext} // Pass handleNext for the "Next" button
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <OtherDocuments
            data={formData.otherDocs}
            onSubmit={(data) => {
              updateFormData("otherDocs", data);
              handleSubmit();
            }}
            onBack={handleBack}
          />
        );
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

  // Add early return for schoolId 118
  if (schoolId === 118) {
    return (
      <StudentApplyCustomCourses
        courseId={courseId}
        schoolLogoUrl={schoolLogoUrl}
        schoolName={schoolName}
        courseName={courseName}
      />
    );
  }

  if (isSubmitted) {
    return (
      <div className="app-container-applycourse">
        <NavButtonsSP />
        <div className="main-content-applycourse">
          <div className="backgroundimage">
            <div className="widget-applying-course-success">
              <h1 className="text-danger fw-bold mb-4">Congratulations!</h1>
              <h3 className="text-black fw-normal">
                You have successfully applied for
                <span className="fw-bold">
                  {" "}
                  {courseName || "the course"}
                </span>{" "}
                at
                <span className="fw-bold"> {schoolName || "the school"}</span>.
              </h3>
            </div>
          </div>
          <div className="post-submission-buttons">
            <Button
              className="sac-submit-button"
              onClick={() =>
                navigate(
                  `/studentApplicationSummary/${sessionStorage.getItem(
                    "lastAppliedCourseId"
                  )}`
                )
              }
            >
              View Summary
            </Button>
            <Button
              className="sac-submit-button"
              onClick={() => navigate("/courses")}
            >
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
            <h3 className="text-black align-self-center fw-normal mb-3">
              You are now applying for{" "}
            </h3>
            <p className="coursetext-applycourse  align-self-center fw-bold ">
              {courseName || "Bachelor in Mass Communication"}
            </p>
            <div className="d-flex justify-content-center">
              <img
                src={schoolLogoUrl || image1}
                className="sac-image-applycourse "
                alt={`${schoolName || "University"} Logo`}
              />
              <p className="schooltext-applycourse text-black fw-bold align-self-center">
                {schoolName || "Swinburne University of Technology"}
              </p>
            </div>
          </div>
        </div>

        <Box sx={{ width: "100%", mb: 4, mt: 4, mx: 0 }}>
          <CustomStepper
            activeStep={activeStep}
            alternativeLabel
            connector={<CustomConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <CustomStepLabel StepIconComponent={StepIcon}>
                  {label}
                </CustomStepLabel>
              </Step>
            ))}
          </CustomStepper>
        </Box>
        {renderStep()}
      </div>
      <WidgetPopUpSubmission
        isOpen={showSubmissionPopup}
        onClose={() => setShowSubmissionPopup(false)}
        onConfirm={handleConfirmSubmission}
      />
      <WidgetPopUpError
        isOpen={showErrorPopup}
        onClose={() => setShowErrorPopup(false)}
        errorMessage={errorMessage}
      />
      <SpcFooter />
    </div>
  );
};

export default StudentApplyCourses;
