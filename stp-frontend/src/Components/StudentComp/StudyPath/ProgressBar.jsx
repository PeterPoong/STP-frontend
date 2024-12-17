// Components/StudentComp/StudyPath/ProgressBar.jsx
import React from 'react';
import "../../../css/StudentPortalStyles/StudentStudyPath.css"

const ProgressBar = ({ currentStep }) => {
    const steps = [
        { label: 'Step 1 (Key In Name)' },
        { label: 'Step 2 (RIASEC Test)' },
        { label: 'Step 3 (See Result)' }
    ];

    return (
        <div className="PB-Stepper-Container">
            <div className="PB-Vertical-Line"></div>
            <div className="PB-Steps-Container">
                {steps.map((step, index) => (
                    <div key={index} className="PB-Step-Item">
                        <div className="PB-Indicator-Container">
                            <div className={`PB-Step-Circle ${
                                index === currentStep - 1 ? 'current' : 
                                index < currentStep - 1 ? 'completed' : 'pending'
                            }`}>
                                {index < currentStep - 1 && (
                                    <svg 
                                        className="PB-Checkmark" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path 
                                            d="M5 13l4 4L19 7" 
                                        />
                                    </svg>
                                )}
                                {index === currentStep - 1 && (
                                    <div className="PB-Pulse-Dot"></div>
                                )}
                            </div>
                        </div>
                        <span className={`PB-Step-Label ${
                            index === currentStep - 1 ? 'current' : 
                            index < currentStep - 1 ? 'completed' : 'pending'
                        }`}>
                            {step.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProgressBar;