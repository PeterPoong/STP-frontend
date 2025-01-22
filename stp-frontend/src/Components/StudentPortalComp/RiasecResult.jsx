import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import "../../css/StudentPortalStyles/StudentStudyPath.css";
import { GraduationCap, Calendar, Clock, CalendarDays, MapPin } from 'lucide-react';
import StudyPalLogoYPNG from "../../assets/StudentPortalAssets/studypalLogoYPNG.png"
import StudyPalLogoYPNGWhite from "../../assets/StudentPortalAssets/studypalLogoYPNGWhite.png"
import StudyPalLogoYPNGBlack from "../../assets/StudentPortalAssets/studypalLogoYPNGBlack.png"
import testingSchool from '../../assets/StudentPortalAssets/testingSchool.jpg';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';
import WMYSpecialLogo from "../../assets/StudentPortalAssets/wmyspecialLogo.svg"
import WMYSpecialLogoWhite from "../../assets/StudentPortalAssets/wmyspecialLogoWhite.png"
import StrengthIcon from "../../assets/StudentPortalAssets/strengthIcon.svg"
import StrengthIconFill from "../../assets/StudentPortalAssets/strengthIconFill.svg"
import { HeartPulse, Whatsapp, Tiktok, Twitter, Instagram, TwitterX } from 'react-bootstrap-icons';
import { Spinner } from 'react-bootstrap';
import QRCode from "../../assets/StudentPortalAssets/qrCode.png"
import { QRCodeSVG } from 'qrcode.react';
import {
    FacebookShareButton,
    WhatsappShareButton,
    TwitterShareButton,
    TelegramShareButton,
    FacebookMessengerShareButton,
    LinkedinShareButton,
    FacebookIcon,
    WhatsappIcon,
    TwitterIcon,
    TelegramIcon,
    LinkedinIcon,
    FacebookMessengerIcon
} from 'react-share';

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

const typeAttributes = {
    Realistic: {
        strengths: [
            'Technical Expertise',
            'Hands-on Skills',
            'Physical Coordination',
            'Mechanical Aptitude'
        ]
    },
    Investigative: {
        strengths: [
            'Analytics Thinking',
            'Scientific Mindset',
            'Research Abilities',
            'Problem-solving Skills'
        ]
    },
    Artistic: {
        strengths: [
            'Creative Expression',
            'Innovative Thinking',
            'Aesthetic Awareness',
            'Original Ideas'
        ]
    },
    Social: {
        strengths: [
            'People Skills',
            'Emotional Intelligence',
            'Communication Ability',
            'Teaching Aptitude'
        ]
    },
    Enterprising: {
        strengths: [
            'Leadership Skills',
            'Persuasion Ability',
            'Goal-oriented Drive',
            'Strategic Thinking'
        ]
    },
    Conventional: {
        strengths: [
            'Organizational Skills',
            'Attention to Detail',
            'Data Management',
            'System Development'
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

const baseURL = import.meta.env.VITE_BASE_URL;
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

const processResults = (scores) => {
    // Convert scores to array and sort to get top types
    const typeRanking = Object.entries(scores)
        .sort(([, a], [, b]) => b - a)
        .map(([type, score]) => ({
            type: type.charAt(0).toUpperCase() + type.slice(1),
            percentage: score
        }));

    const topTypes = typeRanking.slice(0, 3);
    const topType = topTypes[0].type;

    return {
        topTypes,
        scores,
        strengths: typeAttributes[topType].strengths,
        strengthsDesc: typeDescriptions[topType].strength,
        unique: typeDescriptions[topType].unique
    };
};

const CareerProfile = ({ }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const shareButtonRef = useRef(null);
    const [results, setResults] = useState(null);
    const [username, setUsername] = useState("");
    const [createdAt, setCreatedAt] = useState();
    const [selectedDesign, setSelectedDesign] = useState(0);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [recommendedCourses, setRecommendedCourses] = useState([]);
    const [recommendedCategories, setRecommendedCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCourseLoading, setIsCourseLoading] = useState(true);
    const [error, setError] = useState(null);
    const designRef0 = useRef(null);
    const designRef1 = useRef(null);
    const designRef2 = useRef(null);

    // Initialize username from session storage
    useEffect(() => {
        const storedUsername = sessionStorage.getItem('riasecUserName') || localStorage.getItem('riasecUserName') || sessionStorage.getItem('userName') || localStorage.getItem('userName');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const createUrlFriendlyString = (str) => {
        if (!str) return '';
        return str.toLowerCase().replace(/\s+/g, '-');
    };

    // Render course link with safety checks

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const token = sessionStorage.getItem('token') || localStorage.getItem('token');
                if (!token) {
                    throw new Error('No authorization token found');
                }

                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/getTestResult`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => null);
                    throw new Error(errorData?.message || 'Failed to fetch results');
                }

                const data = await response.json();
                //console.log('API Response:', data); // Debug log

                if (data.success && data.data && data.data.score) {
                    const processedResults = processResults(data.data.score);
                    setResults(processedResults);
                    setCreatedAt(data.data.created_at)
                    await fetchRecommendedCategories(processedResults.topTypes[0].type);
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, []);

    useEffect(() => {
        if (results && recommendedCategories.length > 0) {
            setSelectedCourse(0);
            fetchCoursesByCategory(recommendedCategories[0].id);
        }
    }, [results, recommendedCategories]);

    const fetchRecommendedCategories = async (topType) => {
        try {
            const riasecTypeMap = {
                'Realistic': 1,
                'Investigative': 6,
                'Artistic': 2,
                'Social': 3,
                'Enterprising': 4,
                'Conventional': 5
            };

            const token = sessionStorage.getItem('token') || localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/riasecCourseCategory`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    riasecType: riasecTypeMap[topType]
                })
            });

            const data = await response.json();
            //console.log('Categories Response:', data); // Debug log

            if (data.success && Array.isArray(data.data)) {
                setRecommendedCategories(data.data);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Only access topType after results is available
    const topType = results?.topTypes?.[0]?.type || 'Realistic';
    const gradientBackgroundStyle = {
        backgroundImage: `url(${RiasecBackground({ type: topType, variant: 'gradient' })})`,
        backgroundSize: 'auto 140%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    };

    const fetchCoursesByCategory = async (categoryId) => {
        setIsCourseLoading(true);
        try {
            const token = sessionStorage.getItem('token') || localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/courseList`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    category: [categoryId]
                })
            });

            const result = await response.json();
            if (result && result.data && Array.isArray(result.data)) {
                setRecommendedCourses(result.data.slice(0, 3));
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setIsCourseLoading(false);
        }
    };

    //share button social media
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const shareUrl = `https://studypal.my/share/${encodeURIComponent(username)}/${selectedDesign}/${topType}`;
    //const shareUrl = `${window.location.origin}/share/${username}/${selectedDesign}/${topType}`;
    const title = `Check out my RIASEC test result! My top type is ${topType}! \n`;
    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-4 " >
                <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "10px" }}>No RIASEC Results Found</h2>
                <p>Take the assessment to discover your career interests</p>
                <button
                    className="SSP-Start-Button"
                    onClick={() => navigate('/studentStudyPath')}
                >
                    Take RIASEC Test
                </button>
            </div>
        );
    }

    if (!results) {
        return (
            <div className="text-center p-4 " >
                <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "10px" }}>No RIASEC Results Found</h2>
                <p>Take the assessment to discover your career interests</p>
                <button
                    className="SSP-Start-Button"
                    onClick={() => navigate('/studentStudyPath')}
                >
                    Take RIASEC Test
                </button>
            </div>
        );
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


    const waitForImageLoad = (imgElement) => {
        return new Promise((resolve) => {
            // Check if image is already loaded
            if (imgElement.complete && imgElement.naturalWidth !== 0) {
                resolve();
                return;
            }

            // For Safari: explicitly set crossOrigin to anonymous
            if (!imgElement.crossOrigin) {
                imgElement.crossOrigin = "anonymous";
            }

            const handleLoad = () => {
                resolve();
                cleanup();
            };

            const handleError = () => {
                console.error('Image failed to load:', imgElement.src);
                resolve(); // Resolve anyway to prevent hanging
                cleanup();
            };

            const cleanup = () => {
                imgElement.removeEventListener('load', handleLoad);
                imgElement.removeEventListener('error', handleError);
            };

            imgElement.addEventListener('load', handleLoad);
            imgElement.addEventListener('error', handleError);
        });
    };

    const convertImageToBase64 = (imgElement) => {
        return new Promise((resolve) => {
            try {
                const canvas = document.createElement('canvas');
                // Use natural dimensions if available, fallback to element dimensions
                canvas.width = imgElement.naturalWidth || imgElement.width || 100;
                canvas.height = imgElement.naturalHeight || imgElement.height || 100;
                const ctx = canvas.getContext('2d', { alpha: true });

                // Fill background based on design
                ctx.fillStyle = selectedDesign === 0 ? '#BA1718' : '#FFFFFF';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // For Safari: Try-catch around drawImage
                try {
                    ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
                    resolve(canvas.toDataURL('image/png', 1.0));
                } catch (e) {
                    console.error('Safari drawImage error:', e);
                    // Fallback: return original source
                    resolve(imgElement.src);
                }
            } catch (error) {
                console.error('Canvas error:', error);
                resolve(imgElement.src);
            }
        });
    };

    const ensureQRCodeLoaded = async (element) => {
        const qrCodeImg = element.querySelector('img[src*="qrCode"]');
        if (!qrCodeImg) return Promise.resolve();

        return new Promise((resolve) => {
            if (qrCodeImg.complete && qrCodeImg.naturalWidth !== 0) {
                resolve();
                return;
            }

            // For Safari: Set crossOrigin
            qrCodeImg.crossOrigin = "anonymous";

            const handleLoad = () => {
                resolve();
                cleanup();
            };

            const handleError = () => {
                console.error('QR Code failed to load');
                resolve();
                cleanup();
            };

            const cleanup = () => {
                qrCodeImg.removeEventListener('load', handleLoad);
                qrCodeImg.removeEventListener('error', handleError);
            };

            qrCodeImg.addEventListener('load', handleLoad);
            qrCodeImg.addEventListener('error', handleError);
        });
    };


    const generateDesignImage = async () => {
        try {
            let targetRef;
            switch (selectedDesign) {
                case 0: targetRef = designRef0; break;
                case 1: targetRef = designRef1; break;
                case 2: targetRef = designRef2; break;
                default: return null;
            }

            if (!targetRef.current) return null;

            // Wait for all images to load
            const images = Array.from(targetRef.current.getElementsByTagName('img'));
            await Promise.all([
                ...images.map(img => {
                    img.crossOrigin = "anonymous"; // For Safari
                    return waitForImageLoad(img);
                }),
                ensureQRCodeLoaded(targetRef.current)
            ]);

            const clone = targetRef.current.cloneNode(true);

            // Style adjustments
            const titleElement = clone.querySelector('.RS-Design-Header-Container p');
            if (titleElement) {
                titleElement.style.whiteSpace = 'nowrap';
                titleElement.style.width = 'auto';
            }

            // Process images in clone
            const cloneImages = clone.getElementsByTagName('img');
            for (let img of cloneImages) {
                const originalImage = images.find(origImg =>
                    origImg.src === img.src ||
                    origImg.getAttribute('src') === img.getAttribute('src')
                );

                if (originalImage?.complete) {
                    try {
                        const base64 = await convertImageToBase64(originalImage);
                        img.crossOrigin = "anonymous"; // For Safari
                        img.src = base64;

                        // Specific styling for QR container images
                        if (img.closest('.RS-Unique-QR-Container')) {
                            if (img.closest('.RS-Unique-Inner-Container')) {
                                Object.assign(img.style, {
                                    width: '12.5px',
                                    height: '12.5px',
                                    marginTop: '5px',
                                    marginRight: '10px'
                                });
                            } else {
                                Object.assign(img.style, {
                                    width: '100px',
                                    height: '100px',
                                    display: 'block'
                                });
                            }
                        }
                    } catch (e) {
                        console.error('Image processing error:', e);
                    }
                }
            }

            // Position clone for capture
            Object.assign(clone.style, {
                position: 'fixed',
                top: '1px',
                left: '1px',
                zIndex: '-9999',
                width: getComputedStyle(targetRef.current).width,
                height: getComputedStyle(targetRef.current).height
            });

            // Style QR container
            const qrContainer = clone.querySelector('.RS-Unique-QR-Container');
            if (qrContainer) {
                Object.assign(qrContainer.style, {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                });
            }

            document.body.appendChild(clone);

            // Wait for Safari to properly render
            await new Promise(resolve => setTimeout(resolve, 4000));

            const canvas = await html2canvas(clone, {
                scale: 3,
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
            });

            document.body.removeChild(clone);
            return canvas;
        } catch (error) {
            console.error('Error generating image:', error);
            return null;
        }
    };

    // Add this helper function at the component level
    const preloadRiasecBackgrounds = async (type) => {
        const backgroundTypes = ['main', 'background2', 'background3', 'background4'];
        const loadPromises = backgroundTypes.map(variant => {
            return new Promise((resolve) => {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.onload = () => resolve();
                img.onerror = () => {
                    console.error(`Failed to load ${variant} background`);
                    resolve(); // Resolve anyway to prevent hanging
                };
                img.src = RiasecBackground({ type, variant });
            });
        });

        await Promise.all(loadPromises);
    };

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            // First, ensure all RIASEC background images are loaded
            await preloadRiasecBackgrounds(topType);

            // Add delay for Safari to fully load images
            if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                await new Promise(resolve => setTimeout(resolve, 4000));
            }

            // Preload QR code specifically for Safari
            if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                const qrCodeImg = new Image();
                qrCodeImg.crossOrigin = "anonymous";
                await new Promise((resolve) => {
                    qrCodeImg.onload = resolve;
                    qrCodeImg.src = QRCode;
                });
            }

            const canvas = await generateDesignImage();
            if (!canvas) {
                throw new Error('Failed to generate canvas');
            }

            // For iOS Safari
            if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                // Additional wait for iOS Safari to ensure everything is rendered
                await new Promise(resolve => setTimeout(resolve, 4000));

                const dataUrl = canvas.toDataURL('image/png', 1.0);
                const link = document.createElement('a');
                link.download = `RIASEC-Result-${username}-Design${selectedDesign + 1}.png`;
                link.href = dataUrl;

                if (window.navigator.standalone) {
                    window.open(dataUrl);
                } else {
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            } else {
                // For other browsers
                canvas.toBlob((blob) => {
                    if (!blob) {
                        throw new Error('Failed to generate image blob');
                    }

                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `RIASEC-Result-${username}-Design${selectedDesign + 1}.png`;

                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                }, 'image/png', 1.0);
            }
        } catch (error) {
            console.error('Download error:', error);
            alert('Failed to download image. Please try again.');
        } finally {
            setIsDownloading(false);
        }
    };

    {/*
           const handleDownload = async () => {
        setIsDownloading(true);
        try {
            // Preload QR code specifically for Safari
            if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                const qrCodeImg = new Image();
                qrCodeImg.crossOrigin = "anonymous";
                await new Promise((resolve) => {
                    qrCodeImg.onload = resolve;
                    qrCodeImg.src = QRCode;
                });
            }

            const canvas = await generateDesignImage();
            if (!canvas) return;

            // For iOS Safari
            if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                // Wait a bit to ensure QR code is rendered
                await new Promise(resolve => setTimeout(resolve, 100));

                const dataUrl = canvas.toDataURL('image/png', 1.0);
                const link = document.createElement('a');
                link.download = `RIASEC-Result-${username}-Design${selectedDesign + 1}.png`;
                link.href = dataUrl;

                if (window.navigator.standalone) {
                    window.open(dataUrl);
                } else {
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            } else {
                canvas.toBlob((blob) => {
                    if (!blob) {
                        console.error('Failed to generate image');
                        return;
                    }

                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `RIASEC-Result-${username}-Design${selectedDesign + 1}.png`;

                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                }, 'image/png', 1.0);
            }
        } catch (error) {
            console.error('Download error:', error);
        } finally {
            setIsDownloading(false);
        }
    };
*/}
    const handleSocialShare = async (platform) => {
        try {
            const canvas = await generateDesignImage();
            if (!canvas) return;

            canvas.toBlob(async (blob) => {
                if (!blob) {
                    console.error('Failed to generate image');
                    return;
                }

                const shareText = `Check out my RIASEC test result! My top type is ${topType}!`;

                // Download image function
                const downloadImage = () => {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `RIASEC-Result-${username}.png`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                };

                // Download the image first
                downloadImage();

                // Wait a brief moment to ensure download starts before redirecting
                setTimeout(() => {
                    switch (platform) {
                        case 'whatsapp':
                            // Detect mobile or desktop
                            if (/Android|iPhone/i.test(navigator.userAgent)) {
                                window.open(`whatsapp://send?text=${encodeURIComponent(shareText)}`);
                            } else {
                                window.open(`https://web.whatsapp.com`);
                            }
                            alert('Image downloaded! You can now share it on WhatsApp along with the message.');
                            break;

                        case 'twitter':
                            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`);
                            alert('Image downloaded! You can now share it on Twitter along with the message.');
                            break;

                        case 'tiktok':
                            if (/Android|iPhone/i.test(navigator.userAgent)) {
                                window.open('tiktok://');
                            } else {
                                window.open('https://www.tiktok.com/upload');
                            }
                            alert('Image downloaded! You can now share it on TikTok along with the message.');
                            break;

                        case 'instagram':
                            if (/Android|iPhone/i.test(navigator.userAgent)) {
                                window.open('instagram://');
                            } else {
                                navigator.clipboard.writeText(shareText).then(() => {
                                    window.open('https://www.instagram.com');
                                    alert('Image downloaded and message copied to clipboard! You can now share it on Instagram.');
                                });
                            }
                            break;
                    }
                }, 100);
            }, 'image/png', 1.0);
        } catch (error) {
            console.error('Share error:', error);
        }
    };

    const handleShareResult = () => {
        shareButtonRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    };

    const handleShare = () => {
        const shareableUrl = `${window.location.origin}/share/${username}/${selectedDesign}/${topType}`;
        navigator.clipboard.writeText(shareableUrl);
        alert('Share link copied to clipboard!');
    };

    const handleCategorySelect = (index, categoryName) => {
        setSelectedCourse(index);
        fetchCoursesByCategory(categoryName);
    };

    const handleSeeMore = () => {
        if (selectedCourse !== null) {
            const selectedCategory = recommendedCategories[selectedCourse];
            if (selectedCategory && selectedCategory.id) {
                navigate('/courses', {
                    state: {
                        initialCategory: selectedCategory.id,
                        categoryTrigger: Date.now()
                    }
                });
            }
        }
    };

    const handleRetakeTest = () => {
        sessionStorage.setItem('retakeRiasecTest', 'true');
        navigate('/studentStudyPath');
    };

    return (
        <div className="RR-Career-Profile-Container">
            {/* Header Section */}
            <div className="RS-Header-Section">
                <div>
                    <h1>Your RIASEC Assessment Results</h1>
                    <p className="mb-0">{username}, Here's Your Study Path Analysis</p>
                    <p style={{ fontSize: "14px", marginBottom: "10px" }}>Most recent test: {new Date(createdAt).toISOString().split('T')[0]}</p>
                </div>
                <button
                    className="SSP-Start-Button"
                    onClick={handleRetakeTest}
                >
                    Retake RIASEC Test
                </button>
                {/*<button className="SSP-Start-Button" onClick={handleShare}>
                    SHARE RESULT
                </button>*/}
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
                    <h3 className="RS-Section-Title">Recommended Study Paths</h3>
                    <p className="RS-Section-Subtitle">Based on your {topType} type,here are your recommended courses category</p>
                    {/* In ResultSection.jsx, update the course grid section */}
                    <div className="RS-Courses-Grid">
                        {recommendedCategories.map((course, index) => (
                            <div
                                key={index}
                                className={`RS-Course-Item ${selectedCourse === index ? 'selected' : ''}`}
                                onClick={() => handleCategorySelect(index, course.id)} // Pass the ID instead of the whole object
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
                                <span>{course.category_name}</span> {/* Use course.category_name instead of course */}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Universities Section */}
                <div className="RS-Section-Card">
                    <h3 className="RS-Section-Title">Featured Courses for Your Study Path</h3>
                    <div className="RS-Universities-Grid">
                        {isCourseLoading ? (
                            <div className="RS-Universities-Grid-Spinner">
                                <div className="" >
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                </div>
                            </div>
                        ) : (
                            recommendedCourses.map((course, index) => (
                                <div key={index} className="RS-University-Card">
                                    {course.featured && <span className="RS-Featured-Tag">FEATURED</span>}
                                    <div className="RS-Uni-Header">
                                        <Link
                                            rel="preload"
                                            onClick={() => {
                                                sessionStorage.setItem('selectedCourseId', course.id); // Store course ID in session
                                            }}
                                            to={`/course-details/${course.school_name.replace(/\s+/g, '-').toLowerCase()}/${course.name.replace(/\s+/g, '-').toLowerCase()}`}
                                            style={{ color: "#000000" }}
                                        >
                                            <h4 className="RS-Course-Name">{course.name}</h4>
                                        </Link>
                                        <Link
                                            rel="preload"
                                            to={`/university-details/${course.school_name.replace(/\s+/g, '-').toLowerCase()}`}
                                            onClick={() => {
                                                sessionStorage.setItem('selectedSchoolId', course.school_id);
                                            }}
                                        >
                                            <img
                                                src={`${baseURL}storage/${course.logo}`}
                                                style={{ width: "150px", height: "100px", objectFit: "contain" }}
                                            />
                                        </Link>
                                        <Link
                                            rel="preload"
                                            to={`/university-details/${course.school_name.replace(/\s+/g, '-').toLowerCase()}`}
                                            onClick={() => {
                                                sessionStorage.setItem('selectedSchoolId', course.school_id);
                                            }}
                                            style={{ color: "black" }}
                                        >
                                            <h4 className="RS-Uni-Name">{course.school_name}</h4>
                                        </Link>
                                        <p className="RS-Uni-Location">
                                            <span className="me-2"><MapPin size={15} /></span>
                                            {course.state}
                                        </p>
                                    </div>
                                    <div className="RS-Uni-Details">
                                        <div>
                                            <GraduationCap size={15} />
                                            <span className="text-sm">{course.qualification}</span>
                                        </div>
                                        <div>
                                            <Calendar size={15} />
                                            <span className="text-sm">{course.mode}</span>
                                        </div>
                                        <div>
                                            <Clock size={15} />
                                            <span className="text-sm">{course.period}</span>
                                        </div>
                                        <div>
                                            <CalendarDays size={15} />
                                            <span style={{ width: "40px", height: "30px", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                {Array.isArray(course.intake) ? course.intake.join(", ") : course.intake}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="RS-Apply-Container">
                                        <p>Estimated Fee<br />
                                            {course.cost === "0" ? (
                                                <span>N/A</span>
                                            ) : (
                                                <span><strong>RM</strong> {course.cost}</span>
                                            )}
                                        </p>
                                        <button>Apply Now</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className='text-end my-2'>
                        <a
                            className="RS-Course-SeeMore"
                            onClick={handleSeeMore}
                            style={{ cursor: selectedCourse !== null ? 'pointer' : 'default' }}
                        >
                            See More
                        </a>
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
                                        <span className="RS-Type-Percentage" style={{ color: "#E31D1E" }}>{type.percentage}%</span>
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
                                                    <p>{username}, Your TOP 1 RIASEC test result are</p>
                                                    <h1>{topType}</h1>
                                                </div>
                                                <div className="text-end">
                                                    <HeartPulse size={15} color="#ffffff" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="RS-Design-Superpower-Container">
                                            <p className="mb-1 text-white">Your Learning Superpower:</p>
                                            <div>
                                                {results.strengths.map((strength, index) => (
                                                    <div key={index} className="RS-Design-Superpower-List">
                                                        {strength}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="RS-Design-Category-Container">
                                            <p className="mb-1 text-white">Recommended Courses:</p>
                                            <div className="RS-Design-Category-Course">
                                                {recommendedCategories.map((course, index) => (
                                                    <span key={index}>{course.category_name}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="RS-Unique-QR-Container">
                                            <div className="RS-Unique-Container">
                                                <p className="mb-0 text-white">What Makes You Unique</p>
                                                <div className="RS-Unique-Inner-Container">
                                                    <img src={WMYSpecialLogoWhite} style={{ width: '12.5px', height: "12.5px", marginTop: "5px", marginRight: "10px" }} />
                                                    <p className="text-white">{results.unique}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p style={{ marginBottom: "0", fontSize: "10px", fontWeight: "bold", color: "#ffffff" }}>Share to your friends</p>
                                                <div style={{ height: "110px", width: "110px", background: "#ffffff", border: "2px #000000 solid", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <QRCodeSVG
                                                        value={`https://studypal.my/share/${encodeURIComponent(username)}/0/${topType}`}
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
                                                    <p style={{ color: "#BA1718" }}>{username}, Your TOP 1 RIASEC test result are</p>
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
                                                {recommendedCategories.map((course, index) => (
                                                    <span key={index} style={{ color: "#BA1718", border: "1px #BA1718 dashed" }}>{course.category_name}</span>
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
                                                <div style={{ height: "110px", width: "110px", background: "#ffffff", border: "2px #000000 solid", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <QRCodeSVG
                                                        value={`https://studypal.my/share/${encodeURIComponent(username)}/1/${topType}`}
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
                                                {recommendedCategories.map((course, index) => (
                                                    <span
                                                        key={index}
                                                        style={{ color: "#000000", border: "1px #000000 dashed" }}
                                                    >{course.category_name}</span>
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
                                                <div style={{ height: "110px", width: "110px", background: "#ffffff", border: "2px #000000 solid", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <QRCodeSVG
                                                        value={`https://studypal.my/share/${encodeURIComponent(username)}/2/${topType}`}
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
                        disabled={selectedDesign === null || selectedDesign === undefined || isDownloading}
                    >
                        {isDownloading ? (
                            <div className="d-flex align-items-center align-content-center justify-content-center py-0">
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    className="me-2 py-0 align-self-center"
                                />
                                Downloading...
                            </div>
                        ) : (
                            'DOWNLOAD'
                        )}
                    </button>
                    <button
                        ref={shareButtonRef}
                        onClick={handleToggle}
                        onMouseEnter={() => setIsOpen(true)}
                    >
                        SHARE
                    </button>
                    <div
                        className={`RS-Share-Menu ${isOpen ? 'RS-Share-Menu-Open' : ''}`}
                        onMouseLeave={() => setIsOpen(false)}
                    >
                        <div className="RS-Share-Icons-Container">
                            <WhatsappShareButton
                                url={shareUrl}
                                title={title}
                                separator=" "
                                className="RS-Share-Icon RS-Share-Whatsapp"
                            >
                                <WhatsappIcon size={50} round />
                            </WhatsappShareButton>

                            <FacebookShareButton
                                url={shareUrl}
                                quote={title}
                                /*hashtag="#StudyPal #IMedia #Miri #Sarawak #Education #Academics #UniversityApplications #StudentLife "*/
                                className="RS-Share-Icon"
                            >
                                <FacebookIcon size={50} round />
                            </FacebookShareButton>

                            <TwitterShareButton
                                url={shareUrl}
                                title={title}
                                className="RS-Share-Icon"
                            >
                                <TwitterIcon size={50} round />
                            </TwitterShareButton>

                            {/*<FacebookMessengerShareButton
                                url={shareUrl}
                                appId="YOUR_FACEBOOK_APP_ID" // Replace with your Facebook App ID
                                className="RS-Share-Icon"
                            >
                                <FacebookMessengerIcon size={32} round />
                            </FacebookMessengerShareButton>*/}


                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CareerProfile; 