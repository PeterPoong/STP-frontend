import React, { useState } from 'react';
import "../../../css/StudentPortalStyles/StudentStudyPath.css";
import { GraduationCap, Calendar, Clock, CalendarDays, MapPin } from 'lucide-react';
import RealisticBackground from "../../../assets/StudentPortalAssets/realisticBackground.png"
import RealisticBackground2 from "../../../assets/StudentPortalAssets/realisticBackground2.png"
import RealisticBackground3 from "../../../assets/StudentPortalAssets/realisticBackground3.png"
import RealisticBackground4 from "../../../assets/StudentPortalAssets/realisticBackground4.png"
import RealisticGradientBackground from "../../../assets/StudentPortalAssets/realisticGradientBackground.png"
import StudyPalLogoYPNG from "../../../assets/StudentPortalAssets/studypalLogoYPNG.png"
import StudyPalLogoYPNGWhite from "../../../assets/StudentPortalAssets/studypalLogoYPNGWhite.png"
import StudyPalLogoYPNGBlack from "../../../assets/StudentPortalAssets/studypalLogoYPNGBlack.png"
import testingSchool from '../../../assets/StudentPortalAssets/testingSchool.jpg';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import WMYSpecialLogo from "../../../assets/StudentPortalAssets/wmyspecialLogo.svg"
import StrengthIcon from "../../../assets/StudentPortalAssets/strengthIcon.svg"
import StrengthIconFill from "../../../assets/StudentPortalAssets/strengthIconFill.svg"
import { HeartPulse } from 'react-bootstrap-icons';
import QRCode from "../../../assets/StudentPortalAssets/qrCode.png"
const CareerProfile = ({ userData = { username: "David Lim" } }) => {
    const [selectedDesign, setSelectedDesign] = useState(0);
    const [selectedCourse, setSelectedCourse] = useState(null);
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
            'Strategic Consultant',
            'Computer Science',
            'Software Developer',
            'Research Scientist',
            'Data Analyst',
            'University Professor'
        ],
        universities: [
            {
                name: 'Swinburne University (Sarawak)',
                image: testingSchool,
                location: 'Sarawak',
                course: 'Diploma in Digital Game Art',
                courseType: "Diploma",
                coursePeriod: "Full Time",
                fee: 'RM 55,000',
                duration: '2.3 Years',
                intake: 'January, May, September'
            }, {
                name: 'Swinburne University (Sarawak)',
                image: testingSchool,
                location: 'Sarawak',
                course: 'Diploma in Digital Game Art',
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
                course: 'Diploma in Digital Game Art',
                courseType: "Diploma",
                coursePeriod: "Full Time",
                fee: 'RM 55,000',
                duration: '2.3 Years',
                intake: 'January, May, September'
            }
        ]
    };

    const handleDownload = () => {
        console.log('Downloading...');
    };

    const handleShare = () => {
        console.log('Sharing...');
    };

    return (
        <div className="RS-Career-Profile-Container">
            {/* Header Section */}
            <div className="RS-Header-Section">
                <div>
                    <h1>Your Career Profile Results</h1>
                    <p>{userData.username}, Here's Your Personalized Career Analysis</p>
                </div>
                <button className="SSP-Start-Button" onClick={handleShare}>SHARE RESULT</button>
            </div>

            {/* Main Result Card with Mascot */}
            <div className="RS-Result-Card">
                <img
                    src={RealisticBackground}
                    alt="RIASEC Mascot"
                    className="RS-Mascot-Image"
                />
                <h2 className="RS-Result-Subtitle">Your top 1 type of RIASEC test are</h2>
                <h3 className="RS-Result-Type">REALISTIC</h3>
            </div>
            {/* Recommended Courses */}
            <div className="RS-Recommended-Course-Container">
                <div className="RS-Section-Card">
                    <h3 className="RS-Section-Title">Recommended Course</h3>
                    <p className="RS-Section-Subtitle">Based on your Realistic type, here are your top career mathces</p>
                    <div className="RS-Courses-Grid">
                        {results.recommendedCourses.map((course, index) => (
                            <div
                                key={index}
                                className={`RS-Course-Item ${selectedCourse === index ? 'selected' : ''}`}
                                onClick={() => setSelectedCourse(index)}
                            >
                                <span>
                                    <img
                                        src={selectedCourse === index ? StudyPalLogoYPNGWhite : StudyPalLogoYPNG}
                                        style={{
                                            width: "15px",
                                            height: "25px"
                                        }}
                                        className="course-logo"
                                    />
                                </span>
                                <span>{course}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Universities Section */}
                <div className="RS-Section-Card">
                    <h3 className="RS-Section-Title">Featured University Based On Recommended Course</h3>
                    <div className="RS-Universities-Grid">
                        {results.universities.map((uni, index) => (
                            <div key={index} className="RS-University-Card">
                                <span className="RS-Featured-Tag">FEATURED</span>
                                <div className="RS-Uni-Header">
                                    <h4 className="RS-Course-Name">{uni.course}</h4>
                                    <img src={uni.image} style={{ width: "80px", height: "38.5px" }}
                                    />
                                    <h4 className="RS-Uni-Name">{uni.name}</h4>
                                    <p className="RS-Uni-Location"><span className="me-2"><MapPin size={15} /></span> {uni.location}</p>

                                </div>
                                <div className="RS-Uni-Details">
                                    <div >
                                        <GraduationCap size={15} />
                                        <span className="text-sm">{uni.courseType}</span>
                                    </div>

                                    <div>
                                        <Calendar size={15} />
                                        <span className="text-sm">{uni.coursePeriod}</span>
                                    </div>

                                    <div >
                                        <Clock size={15} />
                                        <span className="text-sm">{uni.duration}</span>
                                    </div>

                                    <div >
                                        <CalendarDays size={15} />
                                        <span style={{ width: "30px" }}>{uni.intake}</span>
                                    </div>
                                </div>
                                <div className="RS-Apply-Container">
                                    <p>Estimated Fee<br /><strong>RM</strong> {uni.fee}</p>
                                    <button>Apply Now</button>
                                </div>

                            </div>
                        ))}
                    </div>
                    <div className='text-end my-2'>
                        <a className="RS-Course-SeeMore">See More</a>
                    </div>
                </div>
            </div>


            {/* RIASEC Types */}
            <div className="RS-Chart-Overall-Container">
                <h3 className="RS-Section-Title">Your RIASEC Profile Visualization</h3>
                <div className="RS-Chart-Section">
                    <div className="RS-Chart-Section-RadarChart">
                        <RadarChart
                            width={400}
                            height={300}
                            data={[
                                { subject: 'Realistic', A: 90 },
                                { subject: 'Investigative', A: 84 },
                                { subject: 'Artistic', A: 74 },
                                { subject: 'Social', A: 45 },
                                { subject: 'Enterprising', A: 50 },
                                { subject: 'Conventional', A: 40 }
                            ]}
                        >
                            <PolarGrid
                                stroke="#BA1718"
                                strokeWidth={2}
                                radialLines={false}
                            />
                            <PolarAngleAxis
                                dataKey="subject"
                                stroke="#666"
                                fontSize={14}
                                fontWeight={500}
                                tick={{ fill: '#BA1718' }}
                                tickLine={false}  // This removes the tick marks
                                axisLine={false}
                            />
                            <PolarRadiusAxis
                                angle={30}
                                domain={[0, 100]}
                                tick={false}
                                tickCount={5}

                            />
                            <Radar
                                name="RIASEC Profile"
                                dataKey="A"
                                stroke="#BA1718"
                                fill="#BA1718"
                                fillOpacity={0.5}
                                strokeWidth={3}
                                dot={(props) => {
                                    const { cx, cy } = props;
                                    return (
                                        <circle
                                            cx={cx}
                                            cy={cy}
                                            r={4}
                                            fill="#BA1718"
                                            stroke="#BA1718"
                                            strokeWidth={2}
                                        />
                                    );
                                }}

                            />

                        </RadarChart>
                    </div>
                    <div >
                        <h3 className="RS-Section-Title" style={{ fontSize: "24px" }}>Your Top 3 RIASEC Types:</h3>
                        <div >
                            {results.topTypes.map((type, index) => (
                                <div key={index} className="RS-Type-Container">
                                    <div className="RS-Type-Number">{index + 1}</div>
                                    <div className="RS-Type-Details">
                                        <span className="RS-Type-Name">{type.type}</span>
                                        <span className="RS-Type-Percentage">{type.percentage}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="RS-Strength-Suggestion-Container">
                {/* Strengths Section */}
                <div className="RS-Strength-Inner-Container">
                    <h3 className="RS-Section-Title">What Makes You Unique</h3>
                    <div className="d-flex pt-2">
                        <img src={WMYSpecialLogo} style={{ width: '15px', height: "15px", marginTop: "5px", marginRight: "10px" }} />
                        <p>Your Dedication to finding answers and understanding complex system makes you an excellent researcher and problem solver.</p>
                    </div>
                </div>
                {/* Strengths Section */}
                <div className="RS-Strength-Inner-Container">
                    <h3 className="RS-Section-Title">Your Strength</h3>
                    <div className="RS-Strengths-Four-Type">
                        {results.strengths.map((strength, index) => (
                            <div key={index} className="RS-Strength-Item">
                                <img src={StrengthIcon} style={{ width: "15px", height: "15px" }} />
                                {strength}

                            </div>
                        ))}
                    </div>
                    <div className="d-flex mt-4">
                        <img src={StrengthIconFill} style={{ width: "15px", height: "15px", marginTop: "5px" }} />
                        <p className="RS-Strength-Description">
                            Your curious and analytical mind drives you to understand how and why things work. You
                            excel at solving complex problems and uncovering new insights.
                        </p>
                    </div>

                </div>
            </div>



            {/* Share/Download Section */}
            <div className="RS-Share-Section-Container">
                <h3 className="RS-Share-Section-Title">Choose one of the design you like to <strong>SHARE</strong> or <strong>DOWNLOAD</strong></h3>
                <div className="RS-Share-Design-Container">
                    {[0, 1, 2].map((design) => {
                        if (design === 0) {
                            // Original vertical design
                            return (
                                <div
                                    key={design}
                                    className={`RS-Design-Option-Div ${selectedDesign === design ? 'selected' : ''}`}
                                    onClick={() => setSelectedDesign(design)}
                                >
                                    <div className="RS-Design-Header-Container">
                                        <img src={StudyPalLogoYPNGWhite} style={{ width: "15px", height: "20px" }} />
                                        <p>RIASEC RESULT</p>
                                    </div>
                                    <div className="RS-Design-Result-Container">
                                        <img
                                            src={RealisticBackground4}
                                            alt="RIASEC Mascot"
                                            className="RS-Design-Mascot-Image"
                                        />
                                        <div className="ms-1 d-flex row justify-content-between">
                                            <div>
                                                <p>{userData.username}, Your TOP 1 RIASEC test result are</p>
                                                <h1>REALISTIC</h1>
                                            </div>
                                            <div className="text-end">
                                                <HeartPulse size={15} color="#ffffff" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="RS-Design-Superpower-Container">
                                        <p className="mb-1">Your Learning Superpower:</p>
                                        <div>
                                            {results.strengths.map((strength, index) => (
                                                <div key={index} className="RS-Design-Superpower-List">
                                                    {strength}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="RS-Design-Category-Container">
                                        <p className="mb-1">Recommended Courses:</p>
                                        <div className="RS-Design-Category-Course">
                                            {results.recommendedCourses.map((course, index) => (
                                                <span key={index}>{course}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="RS-Unique-QR-Container">
                                        <div className="RS-Unique-Container">
                                            <p className="mb-0">What Makes You Unique</p>
                                            <div className="RS-Unique-Inner-Container">
                                                <img src={WMYSpecialLogo} style={{ width: '12.5px', height: "12.5px", marginTop: "5px", marginRight: "10px" }} />
                                                <p>Your dedication to finding answers and understanding complex systems makes you an excellent researcher and problem solver.</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p style={{ marginBottom: "0", fontSize: "10px", fontWeight: "bold" }}>Share to your friends</p>
                                            <div style={{ height: "110px", width: "110px", background: "#ffffff", border: "2px #000000 solid" }}>
                                                <img src={QRCode} style={{ height: "100px", width: "100px" }} className="m-1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        } else if (design === 1) {
                            // Horizontal layout design
                            return (
                                <div
                                    key={design}
                                    className={`RS-Design-Option-Div-SecondDesign ${selectedDesign === design ? 'selected' : ''}`}
                                    onClick={() => setSelectedDesign(design)}
                                >
                                    <div className="RS-Design-Header-Container">
                                        <img src={StudyPalLogoYPNG} style={{ width: "15px", height: "20px" }} />
                                        <p style={{ color: "#BA1718" }}>RIASEC RESULT</p>
                                    </div>
                                    <div className="RS-Design-Result-Container">
                                        <img
                                            src={RealisticBackground2}
                                            alt="RIASEC Mascot"
                                            className="RS-Design-Mascot-Image"
                                        />
                                        <div className="ms-1 d-flex row justify-content-between">
                                            <div>
                                                <p style={{ color: "#BA1718" }}>{userData.username}, Your TOP 1 RIASEC test result are</p>
                                                <h1 style={{ color: "#BA1718" }}>REALISTIC</h1>
                                            </div>
                                            <div className="text-end">
                                                <HeartPulse size={15} color="#BA1718" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="RS-Design-Superpower-Container">
                                        <p className="mb-1">Your Learning Superpower:</p>
                                        <div>
                                            {results.strengths.map((strength, index) => (
                                                <div key={index} className="RS-Design-Superpower-List">
                                                    {strength}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="RS-Design-Category-Container">
                                        <p className="mb-1">Recommended Courses:</p>
                                        <div className="RS-Design-Category-Course" >
                                            {results.recommendedCourses.map((course, index) => (
                                                <span key={index} style={{ color: "#BA1718", border: "1px #BA1718 dashed" }}>{course}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="RS-Unique-QR-Container">
                                        <div className="RS-Unique-Container">
                                            <p className="mb-0">What Makes You Unique</p>
                                            <div className="RS-Unique-Inner-Container">
                                                <img src={WMYSpecialLogo} style={{ width: '12.5px', height: "12.5px", marginTop: "5px", marginRight: "10px" }} />
                                                <p>Your dedication to finding answers and understanding complex systems makes you an excellent researcher and problem solver.</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p style={{ marginBottom: "0", fontSize: "10px", fontWeight: "bold" }}>Share to your friends</p>
                                            <div style={{ height: "110px", width: "110px", background: "#ffffff", border: "2px #000000 solid" }}>
                                                <img src={QRCode} style={{ height: "100px", width: "100px" }} className="m-1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        } else {
                            // Modern card design
                            return (
                                <div
                                    key={design}
                                    className={`RS-Design-Option-Div-ThirdDesign ${selectedDesign === design ? 'selected' : ''}`}
                                    onClick={() => setSelectedDesign(design)}
                                >
                                    <div className="RS-Design-Header-Container">
                                        <img src={StudyPalLogoYPNGBlack} style={{ width: "20px", height: "20px" }} />
                                        <p className="RS-Design-Header-Thrid-Title" >RIASEC RESULT</p>
                                    </div>
                                    <div className="RS-Design-Result-Container">
                                        <img
                                            src={RealisticBackground3}
                                            alt="RIASEC Mascot"
                                            className="RS-Design-Mascot-Image"
                                        />
                                        <div className="ms-1 d-flex row justify-content-between">
                                            <div>
                                                <p style={{ color: "#000000" }}>{userData.username}, Your TOP 1 RIASEC test result are</p>
                                                <svg viewBox="0 0 300 80">
                                                    <text
                                                        x="0%"
                                                        y="70%"
                                                        text-anchor=""
                                                        fill="white"
                                                        font-size="55px"
                                                        font-weight="bold"
                                                        stroke="black"
                                                        stroke-width="1"
                                                        stroke-dasharray="10,5"
                                                        filter="drop-shadow(2px 2px 2px rgba(0,0,0,0.5))"
                                                    >
                                                        REALISTIC
                                                    </text>
                                                </svg>
                                            </div>
                                            <div className="text-end">
                                                <HeartPulse size={15} color="#black" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="RS-Design-Superpower-Container">
                                        <p className="mb-1">Your Learning Superpower:</p>
                                        <div>
                                            {results.strengths.map((strength, index) => (
                                                <div key={index} className="RS-Design-Superpower-List">
                                                    {strength}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="RS-Design-Category-Container">
                                        <p className="mb-1">Recommended Courses:</p>
                                        <div className="RS-Design-Category-Course">
                                            {results.recommendedCourses.map((course, index) => (
                                                <span 
                                                key={index}
                                                style={{ color: "#000000", border: "1px #000000 dashed" }}
                                                >{course}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="RS-Unique-QR-Container">
                                        <div className="RS-Unique-Container">
                                            <p className="mb-0">What Makes You Unique</p>
                                            <div className="RS-Unique-Inner-Container">
                                                <img src={WMYSpecialLogo} style={{ width: '12.5px', height: "12.5px", marginTop: "5px", marginRight: "10px" }} />
                                                <p>Your dedication to finding answers and understanding complex systems makes you an excellent researcher and problem solver.</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p style={{ marginBottom: "0", fontSize: "10px", fontWeight: "bold" }}>Share to your friends</p>
                                            <div style={{ height: "110px", width: "110px", background: "#ffffff", border: "2px #000000 solid" }}>
                                                <img src={QRCode} style={{ height: "100px", width: "100px" }} className="m-1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
                <div className="RS-Download-Share-Buttons">
                    <button onClick={handleDownload}>DOWNLOAD</button>
                    <button onClick={handleShare}>SHARE</button>
                </div>
            </div>
        </div>
    );
};

export default CareerProfile;