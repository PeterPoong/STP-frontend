import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "../../../css/StudentPortalStyles/StudentStudyPath.css"

const NameInputSection = ({ username, onSubmit }) => {
    const [inputValue, setInputValue] = useState(username || '');
    const navigate = useNavigate();
    useEffect(() => {
        const token =
            sessionStorage.getItem("token") || localStorage.getItem("token");
        //console.log("Token found:", token ? "Yes" : "No");
        if (!token) {
            //console.log("No token found, redirecting to login");
            navigate("/studentPortalLogin");
        }
    }, [navigate]);
    /*end */

    useEffect(() => {
        // Get username from session storage when component mounts
        const storedUsername = sessionStorage.getItem('userName');
        if (storedUsername) {
            setInputValue(storedUsername);
        }
    }, []);

    const handleNext = () => {
        if (inputValue.trim()) {
            sessionStorage.setItem('riasecUserName', inputValue.trim());
            localStorage.setItem('riasecUserName', inputValue.trim());
            onSubmit(inputValue);
        }
    };

    return (
        <div className="NIS-Section-Container">
            <div>
                <h1 className="SSP-Title">
                    Lets Get Started
                </h1>
                <p className="NIS-Section-Subtitle">
                    May i know your name?
                </p>

                <div className="NIS-Section-Form">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Username"
                        className="NIS-Input"
                    />

                    <button
                        onClick={handleNext}
                        className="SSP-Start-Button m-0"
                        disabled={!inputValue.trim()}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NameInputSection;