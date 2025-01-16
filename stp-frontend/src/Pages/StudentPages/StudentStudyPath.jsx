// Pages/StudentPortal/StudentStudyPath.jsx
import React, { useState, useEffect } from 'react';
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
    const [categories, setCategories] = useState([]); // Add this
    const [userData, setUserData] = useState({
        username: '',
        answers: null,
        results: null
    });

    // Add this useEffect to fetch categories when component mounts
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/categoryFilterList`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('token') || localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                //console.log('Fetched categories:', data);
                if (data.success && Array.isArray(data.data)) {
                    setCategories(data.data);
                    //console.log('Categories set in state:', data.data);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);


    // RIASEC type attributes - defines strengths and courses for each type
    const typeAttributes = {
        Realistic: {
            strengths: [
                'Technical Expertise',
                'Hands-on Skills',
                'Physical Coordination',
                'Mechanical Aptitude'
            ]/*,
            courses: [
                'Agriculture & Plantation',
                'Aviation',
                'Engineering',
                'Manufacturing & Processing',
                'Marine',
                'Oil and Gas',
                'Technology',
            ]*/
        },
        Investigative: {
            strengths: [
                'Analytics Thinking',
                'Scientific Mindset',
                'Research Abilities',
                'Problem-solving Skills'
            ]/*,
            courses: [
                'Computing & IT',
                'Dentistry',
                'Environmental Protection',
                'Mathematics & Statistics',
                'Medicine & Healthcare',
                'Pharmacy',
                'Science'
            ]*/
        },
        Artistic: {
            strengths: [
                'Creative Expression',
                'Innovative Thinking',
                'Aesthetic Awareness',
                'Original Ideas'
            ]/*,
            courses: [
                'Architecture',
                'Arts, Design & Multimedia',
                'Audio-visual Techniques & Media Production',
                'Culinary Arts',
                'Humanities',
                'Language Studies',
                'Media & Communication',
            ]*/
        },
        Social: {
            strengths: [
                'People Skills',
                'Emotional Intelligence',
                'Communication Ability',
                'Teaching Aptitude'
            ]/*,
            courses: [
                'Allied Health Sciences',
                'Early Childhood Education & Education',
                'Hospitality & Tourism',
                'Human Resource',
                'Social Sciences',
                'Psychology',
            ]*/
        },
        Enterprising: {
            strengths: [
                'Leadership Skills',
                'Persuasion Ability',
                'Goal-oriented Drive',
                'Strategic Thinking'
            ]/*,
            courses: [
                'Banking & Finance',
                'Business & Marketing',
                'Economy',
                'Law',
                'Pre University'
            ]*/
        },
        Conventional: {
            strengths: [
                'Organizational Skills',
                'Attention to Detail',
                'Data Management',
                'System Development'
            ]/*,
            courses: [
                'Accounting',
                'Security Services'
            ]*/
        }
    };

    const typeDescriptions = {
        Realistic: {
            unique: "Your natural ability to understand how things work and your hands-on approach makes you the go-to person for turning ideas into reality.",
            strength: "Your practical mindset and hands-on capabilities allow you to tackle real-world challenges with confidence and precision."
        },
        Investigative: {
            unique: "Your dedication to finding answers and understanding complex systems makes you an excellent researcher and problem solver.",
            strength: "Your curious and analytical mind drives you to understand how and why things work. You excel at solving complex problems and uncovering new insights."
        },
        Artistic: {
            unique: " Your creative vision and ability to think outside the box allows you to see possibilities where others see limitations.",
            strength: "Your imaginative mind and creative instincts enable you to see the world differently and create unique solutions that others might never consider."
        },
        Social: {
            unique: "Your genuine interest in people and natural ability to understand others makes you an inspiring force for positive change.",
            strength: "Your natural empathy and people-focused mindset help you build meaningful connections and make a positive impact in others' lives."
        },
        Enterprising: {
            unique: "Your natural leadership and ability to inspire others makes you the perfect person to turn visions into successful ventures.",
            strength: "Your dynamic personality and leadership instincts make you naturally effective at motivating teams and driving initiatives to success."
        },
        Conventional: {
            unique: "Your exceptional attention to detail and organizational skills make you the master of creating order from chaos.",
            strength: "Your systematic approach and precise attention to detail make you exceptional at creating and maintaining efficient, well-organized systems."
        }
    };

    const handleQuestionSubmit = (answers) => {
        const { ranking, scores } = answers;
        const topType = ranking[1].type;
        //  console.log('Available categories:', categories);

        // Map the recommended courses to their category IDs
        /*const recommendedCategories = typeAttributes[topType].courses
                    .map(courseName => {
                        const category = categories.find(cat => cat.category_name === courseName);
                        //console.log('Mapping course:', courseName, 'to category:', category);
                        return {
                            name: courseName,
                            id: category?.id
                        };
                    });
        */
        const topTypes = Object.entries(ranking)
            .slice(0, 3)
            .map(([, data]) => ({
                type: data.type,
                percentage: data.score
            }));

        const processedResults = {
            topTypes,
            scores,
            strengths: typeAttributes[topType].strengths,
            strengthsDesc: typeDescriptions[topType].strength,
            unique: typeDescriptions[topType].unique,
            //recommendedCourses: recommendedCategories, // Now includes IDs
            universities: [] // We'll fetch these in ResultSection
        };

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
                return <ResultSection
                    userData={{ ...userData, results: userData.results }}
                    categories={categories}
                />;
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