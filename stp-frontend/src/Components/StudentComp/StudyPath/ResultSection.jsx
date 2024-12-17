// Components/StudentPortalComp/StudyPath/ResultSection.jsx
import React from 'react';


const ResultSection = ({ userData }) => {
    // Sample data structure (replace with actual computed results)
    const results = {
        topTypes: [
            { type: 'Realistic', percentage: 90 },
            { type: 'Investigative', percentage: 84 },
            { type: 'Artistic', percentage: 74 }
        ],
        strengths: [
            'Analytics Thinking',
            'Scientific Mindset',
            'Research Abilities',
            'Problem-solving Skills'
        ],
        recommendedCourses: [
            { title: 'Strategic Consultant' },
            { title: 'Computer Science' },
            { title: 'Software Developer' },
            { title: 'Research Scientist' },
            { title: 'Data Analyst' },
            { title: 'University Professor' }
        ],
        universities: [
            {
                name: 'Swinburne University (Sarawak)',
                location: 'Sarawak',
                course: 'Diploma in Digital Game Art',
                fee: 'RM 55,000',
                duration: '2.3 Years',
                intake: 'January, May, September'
            }
            // Add more universities as needed
        ]
    };

    const downloadResult = () => {
        // Implement download functionality
        console.log('Downloading result...');
    };

    const shareResult = () => {
        // Implement share functionality
        console.log('Sharing result...');
    };

    return (
        <div className="result-section">
            <div className="result-header">
                <h1 className="result-title">Your Career Profile Results</h1>
                <p className="result-subtitle">{userData.username}, Here's Your Personalized Career Analysis</p>
                <button className="share-button" onClick={shareResult}>SHARE RESULT</button>
            </div>

            {/* Main Result Card with Mascot */}
            <div className="result-main-card">
                <div className="mascot-container">
                    <img src="/mascot.png" alt="RIASEC Mascot" className="mascot-image" />
                </div>
                <div className="main-result-info">
                    <h2 className="result-type-title">Your top 1 type of RIASEC test are</h2>
                    <h3 className="primary-result">REALISTIC</h3>
                </div>
            </div>

            {/* RIASEC Types Graph */}
            <div className="riasec-graph-section">
                <h3 className="section-title">Your Top 3 RIASEC Types:</h3>
                <div className="riasec-types">
                    {results.topTypes.map((type, index) => (
                        <div key={type.type} className="riasec-type-item">
                            <div className="type-number">{index + 1}</div>
                            <div className="type-info">
                                <span className="type-name">{type.type}</span>
                                <span className="type-percentage">{type.percentage}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Strengths Section */}
            <div className="strengths-section">
                <h3 className="section-title">Your Strength</h3>
                <div className="strengths-grid">
                    {results.strengths.map((strength, index) => (
                        <div key={index} className="strength-item">
                            {strength}
                        </div>
                    ))}
                </div>
                <p className="strength-description">
                    Your curious and analytical mind drives you to understand how and why things work. You 
                    excel at solving complex problems and uncovering new insights.
                </p>
            </div>

            {/* Recommended Courses */}
            <div className="recommended-courses">
                <h3 className="section-title">Recommended Course</h3>
                <div className="courses-grid">
                    {results.recommendedCourses.map((course, index) => (
                        <div key={index} className="course-item">
                            <span className="course-icon">📚</span>
                            <span className="course-title">{course.title}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Featured Universities */}
            <div className="universities-section">
                <h3 className="section-title">Featured University Based On Recommended Course</h3>
                <div className="universities-grid">
                    {results.universities.map((uni, index) => (
                        <div key={index} className="university-card">
                            <div className="uni-header">
                                <h4 className="uni-name">{uni.name}</h4>
                                <span className="featured-tag">FEATURED</span>
                            </div>
                            <div className="uni-details">
                                <p>Location: {uni.location}</p>
                                <p>Course: {uni.course}</p>
                                <p>Estimated Fee: {uni.fee}</p>
                                <p>Duration: {uni.duration}</p>
                                <p>Intake: {uni.intake}</p>
                            </div>
                            <button className="apply-button">Apply Now</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Share/Download Options */}
            <div className="result-actions">
                <div className="design-options">
                    <h3>Choose one of the design you like to SHARE or DOWNLOAD</h3>
                    {/* Add design options/templates here */}
                </div>
                <div className="action-buttons">
                    <button className="download-button" onClick={downloadResult}>DOWNLOAD</button>
                    <button className="share-button" onClick={shareResult}>SHARE</button>
                </div>
            </div>
        </div>
    );
};

export default ResultSection;