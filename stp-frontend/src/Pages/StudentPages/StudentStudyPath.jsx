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
import testingSchool from '../../assets/StudentPortalAssets/testingSchool.jpg';
const StudentStudyPath = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [userData, setUserData] = useState({
        username: '',
        answers: null,
        results: null
    });

    // RIASEC type attributes - defines strengths and courses for each type
    const typeAttributes = {
        Realistic: {
            strengths: [
                'Practical Problem-solving',
                'Technical Aptitude',
                'Physical Coordination',
                'Mechanical Skills'
            ],
            courses: [
                'Engineering',
                'Construction Management',
                'Technical Training',
                'Agriculture Science',
                'Automotive Technology',
                'Architecture'
            ]
        },
        Investigative: {
            strengths: [
                'Analytics Thinking',
                'Scientific Mindset',
                'Research Abilities',
                'Problem-solving Skills'
            ],
            courses: [
                'Computer Science',
                'Research Scientist',
                'Data Analyst',
                'Laboratory Technician',
                'Medical Studies',
                'Mathematics'
            ]
        },
        Artistic: {
            strengths: [
                'Creative Expression',
                'Innovative Thinking',
                'Visual Arts Skills',
                'Design Capabilities'
            ],
            courses: [
                'Fine Arts',
                'Graphic Design',
                'Music Production',
                'Creative Writing',
                'Fashion Design',
                'Interior Design'
            ]
        },
        Social: {
            strengths: [
                'Communication Skills',
                'Teaching Abilities',
                'Counseling Aptitude',
                'Interpersonal Skills'
            ],
            courses: [
                'Education',
                'Psychology',
                'Social Work',
                'Human Resources',
                'Healthcare Services',
                'Counseling'
            ]
        },
        Enterprising: {
            strengths: [
                'Leadership Skills',
                'Persuasion Abilities',
                'Business Acumen',
                'Decision Making'
            ],
            courses: [
                'Business Administration',
                'Marketing',
                'Sales Management',
                'Entrepreneurship',
                'Public Relations',
                'Project Management'
            ]
        },
        Conventional: {
            strengths: [
                'Organizational Skills',
                'Attention to Detail',
                'Data Management',
                'Systematic Thinking'
            ],
            courses: [
                'Accounting',
                'Office Administration',
                'Finance',
                'Information Management',
                'Banking',
                'Quality Control'
            ]
        }
    };

    const typeDescriptions = {
        Realistic: {
            unique: "Your practical nature and hands-on approach make you an excellent problem solver in real-world situations. You excel at working with tools, machines, and physical objects.",
            strength: "Your technical mindset and ability to work with concrete solutions makes you naturally adept at handling practical challenges and implementing tangible solutions."
        },
        Investigative: {
            unique: "Your dedication to finding answers and understanding complex systems makes you an excellent researcher and problem solver.",
            strength: "Your curious and analytical mind drives you to understand how and why things work. You excel at solving complex problems and uncovering new insights."
        },
        Artistic: {
            unique: "Your creative vision and innovative thinking allow you to see the world in unique ways and express ideas through various forms of art and design.",
            strength: "Your imaginative mind and creative abilities enable you to think outside the box and find innovative solutions to challenges."
        },
        Social: {
            unique: "Your natural ability to understand and connect with others makes you an excellent mentor and facilitator of personal growth.",
            strength: "Your empathetic nature and communication skills help you excel in situations that involve helping, teaching, or counseling others."
        },
        Enterprising: {
            unique: "Your leadership qualities and persuasive abilities make you excellent at taking charge and influencing others toward achieving goals.",
            strength: "Your natural business sense and decision-making abilities help you excel in competitive environments and leadership roles."
        },
        Conventional: {
            unique: "Your attention to detail and organizational skills make you excellent at creating and maintaining efficient systems and processes.",
            strength: "Your methodical approach and ability to work with data and systems help you excel in structured environments requiring precision and accuracy."
        }
    };

    const handleQuestionSubmit = (answers) => {
        // Extract the ranking and scores from the answers
        const { ranking, scores } = answers;
        
        // Get the top RIASEC type (ranked #1)
        const topType = ranking[1].type;
        
        // Format the top 3 types as expected by ResultSection
        const topTypes = Object.entries(ranking)
            .slice(0, 3)
            .map(([, data]) => ({
                type: data.type,
                percentage: data.score
            }));

        // Create the processed results
        const processedResults = {
            topTypes,
            scores,
            strengths: typeAttributes[topType].strengths,
            strengthsDesc: typeDescriptions[topType].strength,
            unique:typeDescriptions[topType].unique,
            recommendedCourses: typeAttributes[topType].courses,
            universities: [
                {
                    name: 'Swinburne University (Sarawak)',
                    image: testingSchool,
                    location: 'Sarawak',
                    course: typeAttributes[topType].courses[0],
                    courseType: "Diploma",
                    coursePeriod: "Full Time",
                    fee: 'RM 55,000',
                    duration: '2.3 Years',
                    intake: 'January, May, September'
                },
                {
                    name: 'Swinburne University (Sarawak)',
                    image: testingSchool,
                    location: 'Sarawak',
                    course: typeAttributes[topType].courses[0],
                    courseType: "Diploma",
                    coursePeriod: "Full Time",
                    fee: 'RM 55,000',
                    duration: '2.3 Years',
                    intake: 'January, May, September'
                },
                {
                    name: 'Swinburne University (Sarawak)',
                    image: testingSchool,
                    location: 'Sarawak',
                    course: typeAttributes[topType].courses[0],
                    courseType: "Diploma",
                    coursePeriod: "Full Time",
                    fee: 'RM 55,000',
                    duration: '2.3 Years',
                    intake: 'January, May, September'
                }
                // Add more universities as needed
            ]
        };

        // Update state with both raw answers and processed results
        setUserData(prev => ({
            ...prev,
            answers: answers,
            results: processedResults
        }));
        setCurrentStep(4);
    };

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
                        onAnswer={handleQuestionSubmit}
                    />
                );
            case 4:
                return <ResultSection userData={{ ...userData, results: userData.results }} />;
            default:
                return null;
        }
    };

    return (
        <div className="SSP-wrapper">
            <NavButtonsSP />

            {currentStep === 1 ? (
                <div>
                    <IntroSection onStart={() => setCurrentStep(2)} />
                </div>
            ) : (
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