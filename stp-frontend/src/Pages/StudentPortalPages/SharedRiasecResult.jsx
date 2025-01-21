import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { HeartPulse } from 'react-bootstrap-icons';
import SpcFooter from "../../Components/StudentPortalComp/SpcFooter";
import NavButtonsSP from "../../Components/StudentPortalComp/NavButtonsSP";
import StudyPalLogoYPNG from "../../assets/StudentPortalAssets/studypalLogoYPNG.png"
import StudyPalLogoYPNGWhite from "../../assets/StudentPortalAssets/studypalLogoYPNGWhite.png"
import StudyPalLogoYPNGBlack from "../../assets/StudentPortalAssets/studypalLogoYPNGBlack.png"
import WMYSpecialLogo from "../..//assets/StudentPortalAssets/wmyspecialLogo.svg";
import WMYSpecialLogoWhite from "../../assets/StudentPortalAssets/wmyspecialLogoWhite.png";
import QRCode from "../../assets/StudentPortalAssets/qrCode.png"
import studentPortalLogin from "../../assets/StudentPortalAssets/studentPortalLogin.png";
import { QRCodeSVG } from 'qrcode.react';

// Realistic type imports
import realisticMain from "../../assets/StudentPortalAssets/realisticmain.png";
import realisticBg2 from "../../assets/StudentPortalAssets/realisticbg2.png";
import realisticBg3 from "../../assets/StudentPortalAssets/realisticbg3.png";
import realisticBg4 from "../../assets/StudentPortalAssets/realisticbg4.png";
import realisticGradient from "../../assets/StudentPortalAssets/realisticgradient.png";

// Investigative type imports
import investigativeMain from "../../assets/StudentPortalAssets/investigativemain.png";
import investigativeBg2 from "../../assets/StudentPortalAssets/investigativebg2.png";
import investigativeBg3 from "../../assets/StudentPortalAssets/investigativebg3.png";
import investigativeBg4 from "../../assets/StudentPortalAssets/investigativebg4.png";
import investigativeGradient from "../../assets/StudentPortalAssets/investigativegradient.png";

// Artistic type imports
import artisticMain from "../../assets/StudentPortalAssets/artisticmain.png";
import artisticBg2 from "../../assets/StudentPortalAssets/artisticbg2.png";
import artisticBg3 from "../../assets/StudentPortalAssets/artisticbg3.png";
import artisticBg4 from "../../assets/StudentPortalAssets/artisticbg4.png";
import artisticGradient from "../../assets/StudentPortalAssets/artisticgradient.png";

// Social type imports
import socialMain from "../../assets/StudentPortalAssets/socialmain.png";
import socialBg2 from "../../assets/StudentPortalAssets/socialbg2.png";
import socialBg3 from "../../assets/StudentPortalAssets/socialbg3.png";
import socialBg4 from "../../assets/StudentPortalAssets/socialbg4.png";
import socialGradient from "../../assets/StudentPortalAssets/socialgradient.png";

// Enterprising type imports
import enterprisingMain from "../../assets/StudentPortalAssets/enterprisingmain.png";
import enterprisingBg2 from "../../assets/StudentPortalAssets/enterprisingbg2.png";
import enterprisingBg3 from "../../assets/StudentPortalAssets/enterprisingbg3.png";
import enterprisingBg4 from "../../assets/StudentPortalAssets/enterprisingbg4.png";
import enterprisingGradient from "../../assets/StudentPortalAssets/enterprisinggradient.png";

// Conventional type imports
import conventionalMain from "../../assets/StudentPortalAssets/conventionalmain.png";
import conventionalBg2 from "../../assets/StudentPortalAssets/conventionalbg2.png";
import conventionalBg3 from "../../assets/StudentPortalAssets/conventionalbg3.png";
import conventionalBg4 from "../../assets/StudentPortalAssets/conventionalbg4.png";
import conventionalGradient from "../../assets/StudentPortalAssets/conventionalgradient.png";


const RIASEC_BACKGROUNDS = {
    Realistic: {
        main: realisticMain,
        background2: realisticBg2,
        background3: realisticBg3,
        background4: realisticBg4,
        gradient: realisticGradient
    },
    Investigative: {
        main: investigativeMain,
        background2: investigativeBg2,
        background3: investigativeBg3,
        background4: investigativeBg4,
        gradient: investigativeGradient
    },
    Artistic: {
        main: artisticMain,
        background2: artisticBg2,
        background3: artisticBg3,
        background4: artisticBg4,
        gradient: artisticGradient
    },
    Social: {
        main: socialMain,
        background2: socialBg2,
        background3: socialBg3,
        background4: socialBg4,
        gradient: socialGradient
    },
    Enterprising: {
        main: enterprisingMain,
        background2: enterprisingBg2,
        background3: enterprisingBg3,
        background4: enterprisingBg4,
        gradient: enterprisingGradient
    },
    Conventional: {
        main: conventionalMain,
        background2: conventionalBg2,
        background3: conventionalBg3,
        background4: conventionalBg4,
        gradient: conventionalGradient
    }
};

const RiasecBackground = ({ type, variant }) => {
    // Default to Realistic if type is not found
    const backgrounds = RIASEC_BACKGROUNDS[type] || RIASEC_BACKGROUNDS.Realistic;

    switch (variant) {
        case 'main':
            return backgrounds.main;
        case 'background2':
            return backgrounds.background2;
        case 'background3':
            return backgrounds.background3;
        case 'background4':
            return backgrounds.background4;
        case 'gradient':
            return backgrounds.gradient;
        default:
            return backgrounds.main;
    }
};

// Predefined type attributes and descriptions (same as in your original code)
const typeAttributes = {
    Realistic: {
        strengths: [
            'Technical Expertise',
            'Hands-on Skills',
            'Physical Coordination',
            'Mechanical Aptitude'
        ],
        courses: [
            'Agriculture & Plantation',
            'Aviation',
            'Engineering',
            'Manufacturing & Processing',
            'Marine',
            'Oil and Gas',
            'Technology',
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
            'Computing & IT',
            'Dentistry',
            'Environmental Protection',
            'Mathematics & Statistics',
            'Medicine & Healthcare',
            'Pharmacy',
            'Science'
        ]
    },
    Artistic: {
        strengths: [
            'Creative Expression',
            'Innovative Thinking',
            'Aesthetic Awareness',
            'Original Ideas'
        ],
        courses: [
            'Architecture',
            'Arts, Design & Multimedia',
            'Audio-visual Techniques & Media Production',
            'Culinary Arts',
            'Humanities',
            'Language Studies',
            'Media & Communication',
        ]
    },
    Social: {
        strengths: [
            'People Skills',
            'Emotional Intelligence',
            'Communication Ability',
            'Teaching Aptitude'
        ],
        courses: [
            'Allied Health Sciences',
            'Early Childhood Education & Education',
            'Hospitality & Tourism',
            'Human Resource',
            'Social Sciences',
            'Psychology',
        ]
    },
    Enterprising: {
        strengths: [
            'Leadership Skills',
            'Persuasion Ability',
            'Goal-oriented Drive',
            'Strategic Thinking'
        ],
        courses: [
            'Banking & Finance',
            'Business & Marketing',
            'Economy',
            'Law',
            'Pre University'
        ]
    },
    Conventional: {
        strengths: [
            'Organizational Skills',
            'Attention to Detail',
            'Data Management',
            'System Development'
        ],
        courses: [
            'Accounting',
            'Security Services'
        ]
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

const SharedRiasecResult = () => {
    const { username, design, type } = useParams();
    const navigate = useNavigate();
    const designNum = parseInt(design);
    const designRef = useRef(null);
    const [metaImage, setMetaImage] = useState('');
    const validTypes = ['Realistic', 'Investigative', 'Artistic', 'Social', 'Enterprising', 'Conventional'];
    const cleanType = validTypes.includes(type) ? type : 'Realistic'; // Default to Realistic if invalid

    // Clean up URL if needed (remove tracking parameters while preserving the essential ones)
    useEffect(() => {
        const url = new URL(window.location.href);
        const cleanUrl = `${window.location.pathname}`;

        // Only update URL if there are tracking parameters to remove
        if (url.search) {
            window.history.replaceState({}, '', cleanUrl);
        }
    }, []);
    // Get the attributes for the specified type
    const attributes = typeAttributes[cleanType] || typeAttributes.Realistic;
    const descriptions = typeDescriptions[cleanType] || typeDescriptions.Realistic;
    const courses = attributes.courses || [];
    const gradientBackgroundStyle = {
        backgroundImage: `url(${RiasecBackground({ type: type, variant: 'gradient' })})`,
        backgroundSize: 'auto 130%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    };
    const handleStartTest = () => {
        navigate('/studentStudyPath'); // Replace '/riasec-test' with your desired path
    };
    useEffect(() => {
        const generatePreviewImage = async () => {
            if (designRef.current) {
                try {
                    const canvas = await html2canvas(designRef.current, {
                        scale: 2,
                        useCORS: true,
                        allowTaint: true,
                        backgroundColor: designNum === 0 ? '#BA1718' : '#FFFFFF'
                    });

                    const imageUrl = canvas.toDataURL('image/png');
                    setMetaImage(imageUrl);
                } catch (error) {
                    console.error('Error generating preview image:', error);
                }
            }
        };

        generatePreviewImage();
    }, [designNum]);

    const renderDesign = () => {
        switch (designNum) {
            case 0:
                return (
                    <div className="RS-Design-Wrapper" >
                        <div
                            className="RS-Design-Option-Div"
                            style={{ width: "24rem", cursor: "auto" }}
                        >
                            <div className="RS-Design-Header-Container">
                                <img src={StudyPalLogoYPNGWhite} style={{ width: "15px", height: "20px" }} />
                                <p>RIASEC RESULT</p>
                            </div>
                            <div className="RS-Design-Result-Container">
                                <img
                                    src={RiasecBackground({ type: type, variant: 'background4' })}
                                    alt="RIASEC Mascot"
                                    className="RS-Design-Mascot-Image"
                                />
                                <div className="ms-1 d-flex row justify-content-between">
                                    <div>
                                        <p>{username}, Your TOP 1 RIASEC test result are</p>
                                        <h1>{type}</h1>
                                    </div>
                                    <div className="text-end">
                                        <HeartPulse size={15} color="#ffffff" />
                                    </div>
                                </div>
                            </div>
                            <div className="RS-Design-Superpower-Container">
                                <p className="mb-1 text-white">Your Learning Superpower:</p>
                                <div>
                                    {attributes.strengths.map((strength, index) => (
                                        <div key={index} className="RS-Design-Superpower-List">
                                            {strength}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="RS-Design-Category-Container">
                                <p className="mb-1 text-white">Recommended Courses:</p>
                                <div className="RS-Design-Category-Course">
                                    {courses.map((course, index) => (
                                        <span key={index}>{course}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="RS-Unique-QR-Container">
                                <div className="RS-Unique-Container">
                                    <p className="mb-0 text-white">What Makes You Unique</p>
                                    <div className="RS-Unique-Inner-Container">
                                        <img src={WMYSpecialLogoWhite} style={{ width: '12.5px', height: "12.5px", marginTop: "5px", marginRight: "10px" }} />
                                        <p className="text-white">{descriptions.unique}</p>
                                    </div>
                                </div>
                                <div>
                                    <p style={{ marginBottom: "0", fontSize: "10px", fontWeight: "bold", color: "#ffffff" }}>Share to your friends</p>
                                    <div style={{ height: "110px", width: "110px", background: "#ffffff", border: "2px #000000 solid", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <QRCodeSVG
                                            value={window.location.href}
                                            size={100}
                                            bgColor={"#ffffff"}
                                            fgColor={"#000000"}
                                            level={"L"}
                                            includeMargin={false}
                                            className="m-1"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                );

            case 1:
                return (
                    <div className="RS-Design-Wrapper" >
                        <div
                            className="RS-Design-Option-Div-SecondDesign"
                            style={{ width: "24rem", cursor: "auto" }}
                        >
                            <div className="RS-Design-Header-Container">
                                <img src={StudyPalLogoYPNG} style={{ width: "15px", height: "20px" }} />
                                <p style={{ color: "#BA1718" }}>RIASEC RESULT</p>
                            </div>
                            <div className="RS-Design-Result-Container">
                                <img
                                    src={RiasecBackground({ type: type, variant: 'background2' })}
                                    alt="RIASEC Mascot"
                                    className="RS-Design-Mascot-Image"
                                />
                                <div className="ms-1 d-flex row justify-content-between">
                                    <div>
                                        <p style={{ color: "#BA1718" }}>{username}, Your TOP 1 RIASEC test result are</p>
                                        <h1 style={{ color: "#BA1718" }}>{type}</h1>
                                    </div>
                                    <div className="text-end">
                                        <HeartPulse size={15} color="#BA1718" />
                                    </div>
                                </div>
                            </div>
                            <div className="RS-Design-Superpower-Container">
                                <p className="mb-1">Your Learning Superpower:</p>
                                <div>
                                    {attributes.strengths.map((strength, index) => (
                                        <div key={index} className="RS-Design-Superpower-List">
                                            {strength}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="RS-Design-Category-Container">
                                <p className="mb-1">Recommended Courses:</p>
                                <div className="RS-Design-Category-Course" >
                                    {courses.map((course, index) => (
                                        <span key={index} style={{ color: "#BA1718", border: "1px #BA1718 dashed" }}>{course}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="RS-Unique-QR-Container">
                                <div className="RS-Unique-Container">
                                    <p className="mb-0">What Makes You Unique</p>
                                    <div className="RS-Unique-Inner-Container">
                                        <img src={WMYSpecialLogo} style={{ width: '12.5px', height: "12.5px", marginTop: "5px", marginRight: "10px" }} />
                                        <p>{descriptions.unique}</p>
                                    </div>
                                </div>
                                <div>
                                    <p style={{ marginBottom: "0", fontSize: "10px", fontWeight: "bold" }}>Share to your friends</p>
                                    <div style={{ height: "110px", width: "110px", background: "#ffffff", border: "2px #000000 solid", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <QRCodeSVG
                                            value={window.location.href}
                                            size={100}
                                            bgColor={"#ffffff"}
                                            fgColor={"#000000"}
                                            level={"L"}
                                            includeMargin={false}
                                            className="m-1"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                );

            case 2:
                return (
                    <div className="RS-Design-Wrapper" >
                        <div
                            className="RS-Design-Option-Div-ThirdDesign"
                            style={{ width: "24rem", cursor: "auto" }}
                        >
                            <div className="RS-Design-Header-Container">
                                <img src={StudyPalLogoYPNGBlack} style={{ width: "20px", height: "20px" }} />
                                <p className="RS-Design-Header-Thrid-Title" >RIASEC RESULT</p>
                            </div>
                            <div className="RS-Design-Result-Container">
                                <img
                                    src={RiasecBackground({ type: type, variant: 'background3' })}
                                    alt="RIASEC Mascot"
                                    className="RS-Design-Mascot-Image"
                                />
                                <div className="ms-1 d-flex row justify-content-between">
                                    <div>
                                        <p style={{ color: "#000000" }}>{username}, Your TOP 1 RIASEC test result are</p>
                                        <svg viewBox="0 0 300 80">
                                            <text
                                                x="0%"
                                                y="70%"
                                                text-anchor=""
                                                fill="white"
                                                font-size="45px"
                                                font-weight="bold"
                                                stroke="black"
                                                stroke-width="1"
                                                stroke-dasharray="10,5"
                                                filter="drop-shadow(2px 2px 2px rgba(0,0,0,0.5))"
                                            >
                                                {type}
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
                                    {attributes.strengths.map((strength, index) => (
                                        <div key={index} className="RS-Design-Superpower-List">
                                            {strength}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="RS-Design-Category-Container">
                                <p className="mb-1">Recommended Courses:</p>
                                <div className="RS-Design-Category-Course">
                                    {courses.map((course, index) => (
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
                                        <p>{descriptions.unique}</p>
                                    </div>
                                </div>
                                <div>
                                    <p style={{ marginBottom: "0", fontSize: "10px", fontWeight: "bold" }}>Share to your friends</p>
                                    <div style={{ height: "110px", width: "110px", background: "#ffffff", border: "2px #000000 solid", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <QRCodeSVG
                                            value={window.location.href}
                                            size={100}
                                            bgColor={"#ffffff"}
                                            fgColor={"#000000"}
                                            level={"L"}
                                            includeMargin={false}
                                            className="m-1"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                );

            default:
                return <div>Invalid design selected</div>;
        }
    };

    return (
        <>
            <Helmet>
                {/* Basic Meta Tags */}
                <title>{`${username}'s RIASEC Result - ${type} Type`}</title>
                <meta name="description" content={`Check out ${username}'s RIASEC personality type: ${type}. ${descriptions.unique}`} />
                <meta name="keywords" content={`RIASEC, career test, personality test, ${type}, career assessment, study path, education`} />
                <meta name="author" content="StudyPal" />
                <meta name="robots" content="index, follow" />
                <meta name="language" content="English" />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content={`${username}'s RIASEC Result - ${type} Type`} />
                <meta property="og:description" content={`Check out ${username}'s RIASEC personality type: ${type}. ${descriptions.unique}`} />
                <meta property="og:image" content={studentPortalLogin} /> {/* Updated this line */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:site_name" content="StudyPal RIASEC Assessment" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content={`${username}'s RIASEC Result Card showing ${type} type`} />


                {/* Twitter Card Meta Tags 
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${username}'s RIASEC Result - ${type} Type`} />
                <meta name="twitter:description" content={`Check out ${username}'s RIASEC personality type: ${type}. ${descriptions.unique}`} />
                <meta name="twitter:image" content={metaImage} />
                <meta name="twitter:image:alt" content={`${username}'s RIASEC Result Card showing ${type} type`} />
                <meta name="twitter:site" content="@studypal" />
                <meta name="twitter:creator" content="@studypal" />*/}
            </Helmet>

            <div>
                <NavButtonsSP />
                <div className="SRR-Body-Container">
                    <div className="SRR-Result-Card" style={gradientBackgroundStyle}>
                        <h1 className="SRR-Result-Card-h1">This is {username}'s' RIASEC Test Result</h1>
                        {/*<h5 style={{ color: "#1E1E1E", fontStyle: "italic", letterSpacing: "0.3rem", textAlign: "center" }}>{type}</h5>*/}
                        <div ref={designRef}>
                            {/* Your existing design rendering code */}
                            {renderDesign()}
                        </div>
                        <p className="SRR-Result-Card-p">Want to discover your own RIASEC type?</p>
                        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                            <button className="SSP-Start-Button" onClick={handleStartTest}>
                                Take RIASEC Test
                            </button>
                        </div>
                    </div>
                </div>
                <SpcFooter />
            </div>
        </>
    );
};

export default SharedRiasecResult;