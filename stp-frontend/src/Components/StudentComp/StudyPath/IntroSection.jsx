import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../../css/StudentPortalStyles/StudentStudyPath.css";
import InformationIcon from "../../../assets/StudentPortalAssets/InformationIcon.svg";

const IntroSection = ({ onStart }) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleStart = async () => {
        setIsLoading(true);
        try {
            const token = sessionStorage.getItem('token') || localStorage.getItem('token');

            if (!token) {
                // If no token, set a flag and redirect to login
                sessionStorage.setItem('redirectToStudyPath', 'true');
                navigate('/studentPortalLogin');
                return;
            }


            // Check if user has an existing test result
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/getTestResult`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            // If there's existing test data and retake button wasn't pressed
            if (data.success && data.data && !sessionStorage.getItem('retakeRiasecTest')) {
                // Redirect to basic information page with RIASEC results tab
                navigate('/studentPortalBasicInformations', {
                    state: { selectedContent: 'riasecresult' }
                });
            } else {
                // Clear retake flag if it exists
                sessionStorage.removeItem('retakeRiasecTest');
                // Proceed with starting the test
                onStart();
            }
        } catch (error) {
            console.error('Error checking test status:', error);
            // In case of error, allow starting the test
            onStart();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="SSP-Intro-Overall-Container">
            <div className="SSP-Inner-Container">
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
                <button
                    className="SSP-Start-Button"
                    onClick={handleStart}
                    disabled={isLoading}
                >
                    {isLoading ? 'START' : 'START'}
                </button>
            </div>
        </div>
    );
};

export default IntroSection;