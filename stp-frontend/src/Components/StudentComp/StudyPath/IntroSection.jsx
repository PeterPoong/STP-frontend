// Components/StudentPortalComp/StudyPath/IntroSection.jsx
import React from 'react';
import "../../../css/StudentPortalStyles/StudentStudyPath.css"
import InformationIcon from "../../../assets/StudentPortalAssets/InformationIcon.svg"

const IntroSection = ({ onStart }) => {
    return (
        <div className="SSP-Intro-Overall-Container" >
            <div className="SSP-Inner-Container">
                {/* Header Section */}
                <div className="SSP-Header">
                    <h1 className="SSP-Title">
                        RIASEC Career Assessment:<br />
                        Find Your Study Path
                    </h1>
                    <p className="SSP-Quote mb-0">
                        "Discover your ideal study direction in 10 minutes"
                    </p>
                </div>

                <p className="SSP-Description-Text">
                    What is RIASEC?<br />
                    The RIASEC assessment identifies your career interests across six key dimensions:
                    Realistic, Investigative, Artistic, Social, Enterprising, and Conventional.
                    By understanding your unique combination of these traits, you can make informed
                    decisions about your educational and career path.
                </p>
                <div className="SSP-Assessment-Info">
                    <div className="SSP-Info-Item">
                        <img src={InformationIcon} color="BA1718" height="15px" width="15px" />
                        <span className="SSP-Info-Text">
                            40 questions total, Approximate 15 seconds per question
                        </span>
                    </div>
                </div>
                <button className="SSP-Start-Button" onClick={onStart}>
                    START
                </button>
            </div>
        </div>

    );
};

export default IntroSection;