import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import "../../../css/StudentPortalStyles/StudentStudyPath.css";
import { GraduationCap, Calendar, Clock, CalendarDays, MapPin } from 'lucide-react';
import StudyPalLogoYPNG from "../../../assets/StudentPortalAssets/studypalLogoYPNG.png"
import StudyPalLogoYPNGWhite from "../../../assets/StudentPortalAssets/studypalLogoYPNGWhite.png"
import StudyPalLogoYPNGBlack from "../../../assets/StudentPortalAssets/studypalLogoYPNGBlack.png"
import testingSchool from '../../../assets/StudentPortalAssets/testingSchool.jpg';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';
import WMYSpecialLogo from "../../../assets/StudentPortalAssets/wmyspecialLogo.svg"
import StrengthIcon from "../../../assets/StudentPortalAssets/strengthIcon.svg"
import StrengthIconFill from "../../../assets/StudentPortalAssets/strengthIconFill.svg"
import { HeartPulse } from 'react-bootstrap-icons';
import QRCode from "../../../assets/StudentPortalAssets/qrCode.png"
// Realistic type imports
import realisticMain from "../../../assets/StudentPortalAssets/realisticmain.png";
import realisticBg2 from "../../../assets/StudentPortalAssets/realisticbg2.png";
import realisticBg3 from "../../../assets/StudentPortalAssets/realisticbg3.png";
import realisticBg4 from "../../../assets/StudentPortalAssets/realisticbg4.png";
import realisticGradient from "../../../assets/StudentPortalAssets/realisticgradient.png";

// Investigative type imports
import investigativeMain from "../../../assets/StudentPortalAssets/investigativemain.png";
import investigativeBg2 from "../../../assets/StudentPortalAssets/investigativebg2.png";
import investigativeBg3 from "../../../assets/StudentPortalAssets/investigativebg3.png";
import investigativeBg4 from "../../../assets/StudentPortalAssets/investigativebg4.png";
import investigativeGradient from "../../../assets/StudentPortalAssets/investigativegradient.png";

// Artistic type imports
import artisticMain from "../../../assets/StudentPortalAssets/artisticmain.png";
import artisticBg2 from "../../../assets/StudentPortalAssets/artisticbg2.png";
import artisticBg3 from "../../../assets/StudentPortalAssets/artisticbg3.png";
import artisticBg4 from "../../../assets/StudentPortalAssets/artisticbg4.png";
import artisticGradient from "../../../assets/StudentPortalAssets/artisticgradient.png";

// Social type imports
import socialMain from "../../../assets/StudentPortalAssets/socialmain.png";
import socialBg2 from "../../../assets/StudentPortalAssets/socialbg2.png";
import socialBg3 from "../../../assets/StudentPortalAssets/socialbg3.png";
import socialBg4 from "../../../assets/StudentPortalAssets/socialbg4.png";
import socialGradient from "../../../assets/StudentPortalAssets/socialgradient.png";

// Enterprising type imports
import enterprisingMain from "../../../assets/StudentPortalAssets/enterprisingmain.png";
import enterprisingBg2 from "../../../assets/StudentPortalAssets/enterprisingbg2.png";
import enterprisingBg3 from "../../../assets/StudentPortalAssets/enterprisingbg3.png";
import enterprisingBg4 from "../../../assets/StudentPortalAssets/enterprisingbg4.png";
import enterprisingGradient from "../../../assets/StudentPortalAssets/enterprisinggradient.png";

// Conventional type imports
import conventionalMain from "../../../assets/StudentPortalAssets/conventionalmain.png";
import conventionalBg2 from "../../../assets/StudentPortalAssets/conventionalbg2.png";
import conventionalBg3 from "../../../assets/StudentPortalAssets/conventionalbg3.png";
import conventionalBg4 from "../../../assets/StudentPortalAssets/conventionalbg4.png";
import conventionalGradient from "../../../assets/StudentPortalAssets/conventionalgradient.png";

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

const CareerProfile = ({ userData = { username: "David Lim" } }) => {
    const [selectedDesign, setSelectedDesign] = useState(0);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const { username = "User", results = null } = userData;

    // Add refs for each design
    const designRef0 = useRef(null);
    const designRef1 = useRef(null);
    const designRef2 = useRef(null);


    const topType = results.topTypes[0]?.type || 'Realistic';

    const gradientBackgroundStyle = {
        backgroundImage: `url(${RiasecBackground({ type: topType, variant: 'gradient' })})`,
        backgroundSize: 'auto 140%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    };
    if (!results) {
        return <div>Loading results...</div>;
    }

    const formatRadarData = () => {
        if (!results.scores) {
            return [
                { subject: 'Realistic', A: 0 },
                { subject: 'Investigative', A: 0 },
                { subject: 'Artistic', A: 0 },
                { subject: 'Social', A: 0 },
                { subject: 'Enterprising', A: 0 },
                { subject: 'Conventional', A: 0 }
            ];
        }

        return Object.entries(results.scores).map(([type, score]) => ({
            subject: type,
            A: Math.round(score) // Ensure score is rounded to whole number
        }));
    };

    const radarData = formatRadarData();

    const [isDownloading, setIsDownloading] = useState(false);

    const waitForImageLoad = (imgElement) => {
        return new Promise((resolve) => {
            if (imgElement.complete) {
                resolve();
            } else {
                imgElement.onload = resolve;
            }
        });
    };

    // Add this function right after your existing state declarations:
    const convertImageToBase64 = (imgElement) => {
        return new Promise((resolve) => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = imgElement.naturalWidth || imgElement.width || 100;
                canvas.height = imgElement.naturalHeight || imgElement.height || 100;
                const ctx = canvas.getContext('2d');

                // Set background to white first
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Then draw the image
                ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL('image/png'));
            } catch (error) {
                console.error('Error converting image:', error);
                resolve(imgElement.src); // Return original source if conversion fails
            }
        });
    };

    const ensureQRCodeLoaded = async (element) => {
        const qrCodeImg = element.querySelector('img[src*="qrCode"]');
        if (qrCodeImg) {
            return new Promise((resolve) => {
                if (qrCodeImg.complete) {
                    resolve();
                } else {
                    qrCodeImg.onload = resolve;
                }
            });
        }
        return Promise.resolve();
    };

    // Then modify your handleDownload function to include image conversion:
    // Modify the handleDownload function
    const handleDownload = async () => {
        try {
            setIsDownloading(true);

            let targetRef;
            switch (selectedDesign) {
                case 0:
                    targetRef = designRef0;
                    break;
                case 1:
                    targetRef = designRef1;
                    break;
                case 2:
                    targetRef = designRef2;
                    break;
                default:
                    return;
            }

            if (!targetRef.current) {
                console.log('No design selected');
                return;
            }

            // Wait for all images including QR code to load
            const images = targetRef.current.getElementsByTagName('img');
            await Promise.all([
                ...images].map(img => waitForImageLoad(img)),
                ensureQRCodeLoaded(targetRef.current)
            );

            // Clone the element and apply computed styles
            const clone = targetRef.current.cloneNode(true);

            // Fix title wrapping by ensuring container width
            const titleElement = clone.querySelector('.RS-Design-Header-Container p');
            if (titleElement) {
                titleElement.style.whiteSpace = 'nowrap';
                titleElement.style.width = 'auto';
            }

            // Convert all images in clone to base64
            const cloneImages = clone.getElementsByTagName('img');
            for (let img of cloneImages) {
                const originalImage = [...images].find(origImg =>
                    origImg.src === img.src ||
                    origImg.getAttribute('src') === img.getAttribute('src')
                );
                if (originalImage && originalImage.complete) {
                    try {
                        const base64 = await convertImageToBase64(originalImage);
                        img.src = base64;

                        // Ensure proper sizing for different image types
                        if (img.closest('.RS-Unique-QR-Container')) {
                            if (img.closest('.RS-Unique-Inner-Container')) {
                                // Fix for "What Makes You Unique" icon
                                img.style.width = '12.5px';
                                img.style.height = '12.5px';
                                img.style.marginTop = '5px';
                                img.style.marginRight = '10px';
                            } else {
                                // QR Code sizing
                                img.style.width = '100px';
                                img.style.height = '100px';
                                img.style.display = 'block';
                            }
                        }
                    } catch (e) {
                        console.error('Error converting image:', e);
                    }
                }
            }

            // Apply fixed dimensions and styles
            clone.style.width = getComputedStyle(targetRef.current).width;
            clone.style.height = getComputedStyle(targetRef.current).height;
            clone.style.position = 'fixed';
            clone.style.top = '0';
            clone.style.left = '0';
            clone.style.zIndex = '-9999';
            //clone.style.backgroundColor = '#FFFFFF';

            // Ensure QR code container maintains its structure
            const qrContainer = clone.querySelector('.RS-Unique-QR-Container');
            if (qrContainer) {
                qrContainer.style.display = 'flex';
                qrContainer.style.justifyContent = 'space-between';
                qrContainer.style.alignItems = 'center';
            }

            document.body.appendChild(clone);

            const options = {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#FFFFFF',
                height: targetRef.current.offsetHeight,
                width: targetRef.current.offsetWidth,
                scrollX: 0,
                scrollY: 0,
                windowWidth: document.documentElement.offsetWidth,
                windowHeight: document.documentElement.offsetHeight,
                foreignObjectRendering: true,
                removeContainer: false,
                logging: true
            };

            // Add slight delay to ensure styles are applied
            await new Promise(resolve => setTimeout(resolve, 100));

            const canvas = await html2canvas(clone, options);
            document.body.removeChild(clone);

            canvas.toBlob((blob) => {
                if (!blob) {
                    console.error('Failed to generate image');
                    return;
                }

                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `RIASEC-Result-${userData.username}-Design${selectedDesign + 1}.png`;

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                URL.revokeObjectURL(url);
                console.log('Download complete!');
            }, 'image/png', 1.0);

        } catch (error) {
            console.error('Download error:', error);
        } finally {
            setIsDownloading(false);
        }
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
            <div className="RS-Result-Card" style={gradientBackgroundStyle}>
                <img
                    src={RiasecBackground({ type: topType, variant: 'main' })}
                    alt="RIASEC Mascot"
                    className="RS-Mascot-Image"
                />
                <h2 className="RS-Result-Subtitle">Your top 1 type of RIASEC test are</h2>
                <h3 className="RS-Result-Type">{topType}</h3>
            </div>
            {/* Recommended Courses */}
            <div className="RS-Recommended-Course-Container">
                <div className="RS-Section-Card">
                    <h3 className="RS-Section-Title">Recommended Course</h3>
                    <p className="RS-Section-Subtitle">Based on your {topType} type, here are your top career mathces</p>
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
                        <ResponsiveContainer width="100%" height="100%" >
                            <RadarChart data={radarData}>
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
                        </ResponsiveContainer>
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
                        <p>{results.unique}</p>
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
                            {results.strengthsDesc}
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
                                <div className="RS-Design-Wrapper" key={design}>
                                    <div
                                        ref={designRef0}
                                        className="RS-Design-Option-Div"
                                        onClick={() => setSelectedDesign(design)}
                                    >
                                        <div className="RS-Design-Header-Container">
                                            <img src={StudyPalLogoYPNGWhite} style={{ width: "15px", height: "20px" }} />
                                            <p>RIASEC RESULT</p>
                                        </div>
                                        <div className="RS-Design-Result-Container">
                                            <img
                                                src={RiasecBackground({ type: topType, variant: 'background4' })}
                                                alt="RIASEC Mascot"
                                                className="RS-Design-Mascot-Image"
                                            />
                                            <div className="ms-1 d-flex row justify-content-between">
                                                <div>
                                                    <p>{userData.username}, Your TOP 1 RIASEC test result are</p>
                                                    <h1>{topType}</h1>
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
                                                    <p>{results.unique}</p>
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
                                    <div className="RS-Radio-Container">
                                        <div
                                            className={`RS-Radio-Button ${selectedDesign === design ? 'selected' : ''}`}
                                            onClick={() => setSelectedDesign(design)}
                                        >
                                            {selectedDesign === design && <div className="RS-Radio-Inner" />}
                                        </div>
                                    </div>
                                </div>
                            );
                        } else if (design === 1) {
                            // Horizontal layout design
                            return (
                                <div className="RS-Design-Wrapper" key={design}>
                                    <div
                                        ref={designRef1}
                                        className="RS-Design-Option-Div-SecondDesign"
                                        onClick={() => setSelectedDesign(design)}
                                    >
                                        <div className="RS-Design-Header-Container">
                                            <img src={StudyPalLogoYPNG} style={{ width: "15px", height: "20px" }} />
                                            <p style={{ color: "#BA1718" }}>RIASEC RESULT</p>
                                        </div>
                                        <div className="RS-Design-Result-Container">
                                            <img
                                                src={RiasecBackground({ type: topType, variant: 'background2' })}
                                                alt="RIASEC Mascot"
                                                className="RS-Design-Mascot-Image"
                                            />
                                            <div className="ms-1 d-flex row justify-content-between">
                                                <div>
                                                    <p style={{ color: "#BA1718" }}>{userData.username}, Your TOP 1 RIASEC test result are</p>
                                                    <h1 style={{ color: "#BA1718" }}>{topType}</h1>
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
                                                    <p>{results.unique}</p>
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
                                    <div className="RS-Radio-Container">
                                        <div
                                            className={`RS-Radio-Button ${selectedDesign === design ? 'selected' : ''}`}
                                            onClick={() => setSelectedDesign(design)}
                                        >
                                            {selectedDesign === design && <div className="RS-Radio-Inner" />}
                                        </div>
                                    </div>
                                </div>
                            );
                        } else {
                            // Modern card design
                            return (
                                <div className="RS-Design-Wrapper" key={design}>
                                    <div
                                        ref={designRef2}
                                        className="RS-Design-Option-Div-ThirdDesign"
                                        onClick={() => setSelectedDesign(design)}
                                    >
                                        <div className="RS-Design-Header-Container">
                                            <img src={StudyPalLogoYPNGBlack} style={{ width: "20px", height: "20px" }} />
                                            <p className="RS-Design-Header-Thrid-Title" >RIASEC RESULT</p>
                                        </div>
                                        <div className="RS-Design-Result-Container">
                                            <img
                                                src={RiasecBackground({ type: topType, variant: 'background3' })}
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
                                                            font-size="45px"
                                                            font-weight="bold"
                                                            stroke="black"
                                                            stroke-width="1"
                                                            stroke-dasharray="10,5"
                                                            filter="drop-shadow(2px 2px 2px rgba(0,0,0,0.5))"
                                                        >
                                                            {topType}
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
                                                    <p>{results.unique}</p>
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
                                    <div className="RS-Radio-Container">
                                        <div
                                            className={`RS-Radio-Button ${selectedDesign === design ? 'selected' : ''}`}
                                            onClick={() => setSelectedDesign(design)}
                                        >
                                            {selectedDesign === design && <div className="RS-Radio-Inner" />}
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
                <div className="RS-Download-Share-Buttons">
                    <button
                        onClick={handleDownload}
                        className="RS-Download-Button"
                        disabled={selectedDesign === null || selectedDesign === undefined}
                    >
                        DOWNLOAD
                    </button>
                    <button onClick={handleShare}>SHARE</button>
                </div>
            </div>
        </div>
    );
};

export default CareerProfile;