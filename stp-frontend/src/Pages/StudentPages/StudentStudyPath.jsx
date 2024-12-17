// Pages/StudentPortal/StudentStudyPath.jsx
import React, { useState } from 'react';
import "../../css/StudentPortalStyles/StudentStudyPath.css"
import SpcFooter from "../../Components/StudentPortalComp/SpcFooter";
import NavButtonsSP from "../../Components/StudentPortalComp/NavButtonsSP";
import IntroSection from '../../Components/StudentComp/StudyPath/IntroSection';
import NameInputSection from '../../Components/StudentComp/StudyPath/NameInputSection';
import QuestionSection from '../../Components/StudentComp/StudyPath/QuestionSection';
import ResultSection from '../../Components/StudentComp/StudyPath/ResultSection';
import ProgressBar from '../../Components/StudentComp/StudyPath/ProgressBar';

const StudentStudyPath = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [userData, setUserData] = useState({
        username: '',
        answers: {},
        results: null
    });

    const renderAssessmentContent = () => {
        switch (currentStep) {
            case 2:
                return (
                    <NameInputSection
                        username={userData.username}
                        onSubmit={(name) => {
                            setUserData(prev => ({ ...prev, username: name }));
                            setCurrentStep(3);
                        }}
                    />
                );
            case 3:
                return (
                    <QuestionSection
                        answers={userData.answers}
                        onAnswer={(answers) => {
                            setUserData(prev => ({ ...prev, answers }));
                            setCurrentStep(4);
                        }}
                    />
                );
            case 4:
                return <ResultSection userData={userData} />;
            default:
                return null;
        }
    };

    return (
        <div className="SSP-wrapper">
            <NavButtonsSP />

            {currentStep === 1 ? (
                // Intro Section rendered outside the assessment container
                <div >
                    <IntroSection onStart={() => setCurrentStep(2)} />
                </div>
            ) : (
                // Assessment content with progress bar
                <div className="SSP-Question-Overall-Container">
                    <div className="SSP-Progress-Sidebar">
                        <ProgressBar currentStep={currentStep - 1} />
                    </div>
                    <div className="SSP-Content-Area">
                        {renderAssessmentContent()}
                    </div>
                </div>
            )}

            <SpcFooter />
        </div>
    );
};

export default StudentStudyPath;