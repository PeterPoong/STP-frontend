import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import NavButtons from "../NavButtons";
import NavButtonsSP from "../../../Components/StudentPortalComp/NavButtonsSP";
import headerImage from "../../../assets/StudentAssets/coursepage image/StudyPal10.png";
import "../../../css/StudentCss/course page css/ApplyPage.css";
import { Container, Row, Col, Collapse, Button, Modal } from "react-bootstrap";
import studypal11 from "../../../assets/StudentAssets/coursepage image/StudyPal11.png";
import studypal12 from "../../../assets/StudentAssets/coursepage image/StudyPal12.jpg";
import Footer from "../Footer";
import SpcFooter from "../../../Components/StudentPortalComp/SpcFooter";
import ImageSlider from "../../../Components/StudentComp/ImageSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "../../../css/StudentCss/course page css/ApplyPage.css";
import currency from "currency.js";

const baseURL = import.meta.env.VITE_BASE_URL;
const courseDetailAPI = `${baseURL}api/student/courseDetail`;
const adsAURL = `${baseURL}api/student/advertisementList`;
const formatUrlString = (str) => {
  return str
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .trim() // Trim whitespace
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen
};
const CourseDetail = () => {
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);
  const [openDescription, setOpenDescription] = useState(false);
  const [openRequirement, setOpenRequirement] = useState(false);
  const [openAboutInstitute, setOpenAboutInstitute] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);

  const [enlargedImageIndex, setEnlargedImageIndex] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showAllPhotosModal, setShowAllPhotosModal] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  const [showSwiperModal, setShowSwiperModal] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const [adsImage, setAdsImage] = useState(null);

  const { school_name, course_name } = useParams();
  const [courseId, setCourseId] = useState(null);
  const [schoolId, setSchoolId] = useState(null);
  const countryCurrencyMap = {
    // Asia
    MY: { currency_code: "MYR", currency_symbol: "RM" }, // Malaysia
    SG: { currency_code: "SGD", currency_symbol: "S$" }, // Singapore
    ID: { currency_code: "IDR", currency_symbol: "Rp" }, // Indonesia
    TH: { currency_code: "THB", currency_symbol: "฿" }, // Thailand
    VN: { currency_code: "VND", currency_symbol: "₫" }, // Vietnam
    PH: { currency_code: "PHP", currency_symbol: "₱" }, // Philippines
    IN: { currency_code: "INR", currency_symbol: "₹" }, // India
    CN: { currency_code: "CNY", currency_symbol: "¥" }, // China (Renminbi)
    JP: { currency_code: "JPY", currency_symbol: "¥" }, // Japan
    KR: { currency_code: "KRW", currency_symbol: "₩" }, // South Korea
    HK: { currency_code: "HKD", currency_symbol: "HK$" }, // Hong Kong
    TW: { currency_code: "TWD", currency_symbol: "NT$" }, // Taiwan

    // Europe
    GB: { currency_code: "GBP", currency_symbol: "£" }, // United Kingdom
    DE: { currency_code: "EUR", currency_symbol: "€" }, // Germany
    FR: { currency_code: "EUR", currency_symbol: "€" }, // France
    IT: { currency_code: "EUR", currency_symbol: "€" }, // Italy
    ES: { currency_code: "EUR", currency_symbol: "€" }, // Spain
    NL: { currency_code: "EUR", currency_symbol: "€" }, // Netherlands
    CH: { currency_code: "CHF", currency_symbol: "CHF" }, // Switzerland
    SE: { currency_code: "SEK", currency_symbol: "kr" }, // Sweden
    NO: { currency_code: "NOK", currency_symbol: "kr" }, // Norway
    DK: { currency_code: "DKK", currency_symbol: "kr" }, // Denmark

    // North America
    US: { currency_code: "USD", currency_symbol: "$" }, // United States
    CA: { currency_code: "CAD", currency_symbol: "C$" }, // Canada
    MX: { currency_code: "MXN", currency_symbol: "Mex$" }, // Mexico

    // South America
    BR: { currency_code: "BRL", currency_symbol: "R$" }, // Brazil
    AR: { currency_code: "ARS", currency_symbol: "ARS$" }, // Argentina
    CL: { currency_code: "CLP", currency_symbol: "CLP$" }, // Chile
    CO: { currency_code: "COP", currency_symbol: "COP$" }, // Colombia
    PE: { currency_code: "PEN", currency_symbol: "S/" }, // Peru

    // Middle East
    AE: { currency_code: "AED", currency_symbol: "د.إ" }, // United Arab Emirates
    SA: { currency_code: "SAR", currency_symbol: "﷼" }, // Saudi Arabia
    TR: { currency_code: "TRY", currency_symbol: "₺" }, // Turkey
    QA: { currency_code: "QAR", currency_symbol: "﷼" }, // Qatar
    EG: { currency_code: "EGP", currency_symbol: "E£" }, // Egypt
    IL: { currency_code: "ILS", currency_symbol: "₪" }, // Israel
    BD: { currency_code: "BDT", currency_symbol: "৳" }, // Bangladesh

    // Africa
    ZA: { currency_code: "ZAR", currency_symbol: "R" }, // South Africa
    NG: { currency_code: "NGN", currency_symbol: "₦" }, // Nigeria
    KE: { currency_code: "KES", currency_symbol: "KSh" }, // Kenya
    GH: { currency_code: "GHS", currency_symbol: "₵" }, // Ghana

    // Oceania
    AU: { currency_code: "AUD", currency_symbol: "A$" }, // Australia
    NZ: { currency_code: "NZD", currency_symbol: "NZ$" }, // New Zealand
  };
  const [exchangeRates, setExchangeRates] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState({});
  const [fetchedCountry, setFetchedCountry] = useState(null);
  const fetchExchangeRates = async (currencyCode) => {
    try {
      // console.log("Fetching exchange rates..."); // Log before fetching
      const response = await fetch(
        `https://api.frankfurter.app/latest?from=MYR`
      );
      const data = await response.json();

      // Log the fetched data to the console
      // console.log("Fetched exchange rates:", data);

      if (data && data.rates) {
        setExchangeRates(data.rates);
      } else {
        console.warn("No rates found in the fetched data."); // Log if no rates found
      }
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  };
  useEffect(() => {
    const fetchCurrencyOnChange = async () => {
      const currencyCode = sessionStorage.getItem("userCurrencyCode") || "MYR";
      const currencySymbol =
        sessionStorage.getItem("userCurrencySymbol") || "RM";

      // Fetch exchange rates based on the selected currency
      await fetchExchangeRates(currencyCode);

      setSelectedCurrency({
        currency_code: currencyCode,
        currency_symbol: currencySymbol,
      });
    };
    fetchCurrencyOnChange(); // Fetch the currency rates immediately on component mount or currency change
  }, [sessionStorage.getItem("userCurrencyCode")]); // Trigger on currency code change in session storage

  useEffect(() => {
    const interval = setInterval(() => {
      const newCurrencyCode =
        sessionStorage.getItem("userCurrencyCode") || "MYR";

      if (newCurrencyCode !== selectedCurrency.currency_code) {
        setSelectedCurrency({
          currency_code: newCurrencyCode,
          currency_symbol: sessionStorage.getItem("userCurrencySymbol") || "RM",
        });

        // console.log("Detected currency change in sessionStorage:", newCurrencyCode);

        fetchExchangeRates(newCurrencyCode);
        fetchProgram();
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [selectedCurrency]);

  const convertToFetchedCurrency = (amount) => {
    const currencyCode = sessionStorage.getItem("userCurrencyCode") || "MYR"; // Use sessionStorage value
    const currencySymbol = sessionStorage.getItem("userCurrencySymbol") || "RM";

    if (!exchangeRates || !Object.keys(exchangeRates).length) {
      return `${currencySymbol} ${amount}`; // Return original cost if no rates available
    }

    const rate = exchangeRates[currencyCode] || 1;
    return `${currencySymbol} ${currency(amount).multiply(rate).format()}`; // Convert MYR to the correct currency
  };

  const fetchCountry = async () => {
    try {
      const response = await fetch("https://ipinfo.io/json");
      const data = await response.json();

      if (data && data.country) {
        let country = data.country; // Get the real country code

        // Override country for testing
        // country = 'AU'; // Change this to 'SG' temporarily

        const currencyInfo = countryCurrencyMap[country] || {
          currency_code: "MYR",
          currency_symbol: "RM",
        };

        sessionStorage.setItem("userCountry", country);
        sessionStorage.setItem("userCurrencyCode", currencyInfo.currency_code);
        sessionStorage.setItem(
          "userCurrencySymbol",
          currencyInfo.currency_symbol
        );

        // console.log("Fetched country:", country);
        // console.log("Currency Code:", currencyInfo.currency_code);
        // console.log("Currency Symbol:", currencyInfo.currency_symbol);

        setFetchedCountry(country);
        setSelectedCurrency(currencyInfo); // Store currency info in state

        return country;
      } else {
        throw new Error("Unable to fetch location data");
      }
    } catch (error) {
      console.error("Error fetching country:", error);
      return null;
    }
  };

  const recordVisit = async () => {
    console.log("school name", formattedSchoolName);
    try {
      response = await fetch(`${baseURL}api/student/increaseNumberVisit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ school_name: formattedSchoolName }),
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    const fetchCountryAndSet = async () => {
      const country = await fetchCountry(); // Fetch the country
      if (country) {
        const currencyCode =
          sessionStorage.getItem("userCurrencyCode") || "MYR"; // Fetch from storage
        setSelectedCurrency(countryCurrencyMap[country]); // Use country directly from fetchCountry

        // Fetch exchange rates based on the detected currency
        await fetchExchangeRates(currencyCode);
      }
    };
    fetchCountryAndSet();

    recordVisit();
  }, []);

  // Convert hyphenated names to space-separated names while preserving hyphens in parentheses
  const formattedSchoolName = decodeURIComponent(school_name)
    .replace(/\((.*?)\)/g, (match) => match.replace(/-/g, "###HYPHEN###")) // Temporarily replace hyphens in parentheses
    .replace(/-/g, " ") // Replace remaining hyphens with spaces
    .replace(/\###HYPHEN###/g, "-") // Restore original hyphens in parentheses
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .trim(); // Remove leading/trailing spaces

  const formattedCourseName = course_name.replace(/-/g, " ");

  // Log the formatted names to the console
  // console.log("School Name from URL:", formattedSchoolName); // Log the school name
  // console.log("Course Name from URL:", formattedCourseName); // Log the course name

  // Check for undefined values
  if (!formattedSchoolName || !formattedCourseName) {
    console.error("School Name or Course Name is undefined");
    return <div>Error: Missing school or course information.</div>;
  }

  const handleContentHeight = () => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  };

  const openSwiperModal = (index) => {
    setActivePhotoIndex(index);
    setShowSwiperModal(true);
  };

  const handleCloseSwiperModal = () => {
    setShowSwiperModal(false);
  };

  const openModal = (photos, index) => {
    setSelectedPhotos(photos);
    setStartIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleShowMore = (photos) => {
    setSelectedPhotos(photos);
    setShowAllPhotosModal(true);
  };

  const handleCloseAllPhotosModal = () => {
    setShowAllPhotosModal(false);
  };
  const { id } = useParams();
  const location = useLocation();
  const [programs, setPrograms] = useState(location.state?.program || []);
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const navigate = useNavigate();

  const handleKnowMoreClick = (course) => {
    if (course) {
      // Store the courseID in session storage
      sessionStorage.setItem("courseId", course.course_id);
      // Format the school and course names for the URL
      const formattedSchoolName = formatUrlString(course.course_school);
      const formattedCourseName = formatUrlString(course.course_name);
      // Navigate to the new URL format
      navigate(
        `/course-details/${formattedSchoolName}/${formattedCourseName}`,
        { replace: true }
      );
      // Refresh the page to fetch new data
      window.location.reload(); // This will refresh the page
    } else {
      console.error("Course is undefined");
    }
  };
  const handleApplyNow = (program) => {
    // Change the parameter to receive the full program object
    if (program) {
      navigate(`/studentApplyCourses/${program.id}`, {
        state: {
          programId: program.id,
          schoolLogoUrl: `${import.meta.env.VITE_BASE_URL}storage/${
            program.logo
          }`,
          schoolName: program.school,
          courseName: program.course,
          schoolId: program.schoolID,
        },
      });
    } else {
      console.error("Program is undefined");
    }
  };

  //Fecth Ads Image
  const fetchAddsImage = async () => {
    try {
      const response = await fetch(adsAURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ advertisement_type: 74 }),
      });

      const result = await response.json();

      if (result.success) {
        setAdsImage(result.data);
      }
    } catch (error) {
      console.error("Error fetching advertisements:", error);
    }
  };

  const fetchProgram = async (courseID) => {
    try {
      let response;
      let requestBody;

      if (courseID) {
        requestBody = { courseID: courseID };
      } else {
        requestBody = {
          schoolName: formattedSchoolName,
          courseName: formattedCourseName,
        };
      }

      // Fetch course details
      response = await fetch(courseDetailAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data && data.data) {
        const selectedProgram = data.data;
        if (selectedProgram) {
          setPrograms([selectedProgram]);
          sessionStorage.setItem("courseId", selectedProgram.id);
          sessionStorage.setItem("schoolId", selectedProgram.schoolID);

          // Immediately fetch featured courses
          const featuredResponse = await fetch(
            `${baseURL}api/student/featuredCourseList`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                type: "thirdPage",
                courseId: selectedProgram.id,
              }),
            }
          );

          const featuredData = await featuredResponse.json();
          console.log("featured", featuredData);

          if (
            featuredData &&
            featuredData.success &&
            Array.isArray(featuredData.data)
          ) {
            setFeaturedCourses(featuredData.data);
          } else {
            console.error(
              "Invalid data structure for featured courses:",
              featuredData
            );
            setFeaturedCourses([]);
          }
        } else {
          console.error("No matching program found for the given course name.");
          setPrograms([]);
          setFeaturedCourses([]);
        }
      } else {
        console.error("Invalid data structure:", data);
        setPrograms([]);
        setFeaturedCourses([]);
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
      setPrograms([]);
      setFeaturedCourses([]);
    }
  };

  useEffect(() => {
    const storedCourseId = sessionStorage.getItem("courseId");
    const courseID = storedCourseId || id;

    fetchProgram(courseID);
    fetchAddsImage();
  }, [id]);

  if (!programs || programs.length === 0) {
    return (
      <div className="spinner-container">
        <div className="custom-spinner"></div>
      </div>
    );
  }
  // Function to handle displaying more courses
  const handleViewMore = () => {
    setExpanded(!expanded); // Toggle collapse state
    if (!expanded) {
      setVisibleCourses(courses.length); // Show all courses when expanded
    } else {
      setVisibleCourses(5); // Show only 5 courses when collapsed
    }
  };

  return (
    <div style={{ backgroundColor: "#F5F4F4" }}>
      <NavButtonsSP />
      {programs &&
        programs.map((program) => (
          <div key={program.id}>
            <header className="apply-now-masthead">
              <img
                src={
                  program?.coverPhoto && program.coverPhoto.length > 0 //later replace with coverPhoto
                    ? `${baseURL}storage/${program.coverPhoto}`
                    : headerImage // Use headerImage as the default if coverPhoto is not available
                }
                alt="Header"
                className="apply-now-header-image"
              />
            </header>

            <Container className="my-4 apply-now-container">
              <Row className="apply-now-row no-gutters">
                <Col
                  xs={12}
                  md={3}
                  className="d-flex align-items-center justify-content-center position-relative apply-now-image-col"
                >
                  <img
                    src={`${baseURL}storage/${program.logo}`}
                    alt="Program"
                    className="img-thumbnail apply-now-program-image"
                    style={{
                      height: "8rem",
                      borderRadius: "8px",
                      maxWidth: "auto",
                      marginLeft: "30px",
                    }}
                  />
                </Col>

                <Col
                  xs={12}
                  md={6}
                  className="d-flex flex-column flex-md-row align-items-center"
                  style={{ paddingBottom: "25px" }}
                >
                  <div style={{ marginLeft: "30px" }}>
                    <h4 className="pb-0">{program.school}</h4>
                    <p>{import.meta.env.VITE_random_Var}</p>
                    <a
                      href={program.google_map_location}
                      style={{ paddingLeft: "0px" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Click and view on map
                    </a>
                  </div>
                </Col>

                <Col
                  xs={12}
                  md={3}
                  className="d-flex justify-content-center justify-content-md-end"
                >
                  {program.schoolCategory === "Local University" ? (
                    <Button
                      onClick={() =>
                        (window.location.href = `mailto:${program.schoolEmail}`)
                      }
                      style={{
                        backgroundColor: "#B71A18",
                        border: "none",
                        width: "180px",
                        height: "50px",
                        marginBottom: "20px",
                      }} // Pass the correct ID
                    >
                      Contact Now
                    </Button>
                  ) : (
                    <Button
                      style={{
                        backgroundColor: "#B71A18",
                        border: "none",
                        width: "180px",
                        height: "50px",
                        marginBottom: "20px",
                      }}
                      onClick={() => handleApplyNow(program)} // Pass the correct ID
                    >
                      Apply Now
                    </Button>
                  )}
                </Col>
              </Row>

              <div
                className="card mt-3 apply-now-card"
                style={{
                  paddingLeft: "25px",
                  paddingTop: "1rem",
                  paddingBottom: "1rem",
                }}
              >
                <div className="row">
                  <div className="col-md-12">
                    <h3 style={{ color: " #B71A18" }}>{program.course}</h3>
                  </div>
                </div>
              </div>
              <div className="card mt-4 apply-now-card">
                <div className="card-body">
                  <h5 className="card-title">Summary</h5>
                  <Row
                    /*style={{ paddingLeft: "50px"}}*/ className="coursedetail-summary-content"
                  >
                    <Col md={4}>
                      <div style={{ marginBottom: "25px", marginTop: "10px" }}>
                        <i
                          className="bi bi-mortarboard"
                          style={{ marginRight: "10px" }}
                        ></i>{" "}
                        <span style={{ paddingLeft: "20px" }}>
                          {program.qualification}
                        </span>
                      </div>
                      <div>
                        <i
                          className="bi bi-calendar-check"
                          style={{ marginRight: "10px" }}
                        ></i>{" "}
                        <span style={{ paddingLeft: "20px" }}>
                          {program.mode}
                        </span>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div style={{ marginBottom: "25px", marginTop: "10px" }}>
                        <i
                          className="bi bi-clock"
                          style={{ marginRight: "10px" }}
                        ></i>{" "}
                        <span style={{ paddingLeft: "20px" }}>
                          {program.period}
                        </span>
                      </div>
                      <div>
                        <i
                          className="bi bi-calendar2-week"
                          style={{ marginRight: "10px" }}
                        ></i>{" "}
                        <span style={{ paddingLeft: "20px" }}>
                          {Array.isArray(program.intake) &&
                          program.intake.length > 0
                            ? program.intake.join(", ")
                            : "N/A"}{" "}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="card mt-4 apply-now-card">
                <div className="card-body">
                  <Row>
                    <Col md={10} className="">
                      <div>
                        <h5 className="card-title">Estimate Fee</h5>
                      </div>
                    </Col>
                    <Col
                      md={2}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <div>
                        <p className="mb-0">
                          {/* {console.log('Program Country:', program.country_code, 'Fetched Country:', fetchedCountry)} */}
                          {fetchedCountry &&
                          program.international_cost &&
                          program.country_code &&
                          program.country_code !== fetchedCountry ? (
                            // console.log('Showing international cost'),
                            program.international_cost === "0" ? (
                              program.cost === "0" || program.cost === "RM0" ? (
                                "N/A"
                              ) : (
                                <>
                                  <strong>
                                    {sessionStorage.getItem(
                                      "userCurrencySymbol"
                                    ) || "RM"}
                                  </strong>
                                  {convertToFetchedCurrency(
                                    program.cost
                                  ).replace(/^.*?(\d+.*)/, "$1")}
                                </>
                              )
                            ) : (
                              <>
                                <strong>
                                  {sessionStorage.getItem(
                                    "userCurrencySymbol"
                                  ) || "RM"}
                                </strong>
                                {convertToFetchedCurrency(
                                  program.international_cost
                                ).replace(/^.*?(\d+.*)/, "$1")}
                              </>
                            )
                          ) : // console.log('Showing local cost'),
                          program.cost === "0" || program.cost === "RM0" ? (
                            "N/A"
                          ) : (
                            <>
                              <strong>
                                {sessionStorage.getItem("userCurrencySymbol") ||
                                  "RM"}
                              </strong>
                              {convertToFetchedCurrency(program.cost).replace(
                                /^.*?(\d+.*)/,
                                "$1"
                              )}
                            </>
                          )}
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="card mt-4 apply-now-card">
                <div className="card-body">
                  <Row>
                    <Col md={10} className="">
                      <div>
                        <h5 className="card-title">Course Overview</h5>
                      </div>
                    </Col>
                    <Col md={12}>
                      {!openDescription ? (
                        <div
                          id="collapse-description"
                          className="student-coursedetil-wordbreak"
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: program.description,
                            }}
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          />
                        </div>
                      ) : (
                        <Collapse in={openDescription}>
                          <div id="collapse-description">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: program.description,
                              }}
                            />
                          </div>
                        </Collapse>
                      )}
                    </Col>
                    <Col className="d-flex justify-content-center">
                      {program.description &&
                        program.description.length > 100 && (
                          <Button
                            onClick={() => setOpenDescription(!openDescription)}
                            aria-controls="collapse-description"
                            aria-expanded={openDescription}
                            style={{ textDecoration: "none" }}
                            variant="link"
                          >
                            {openDescription ? "View Less" : "View More"}
                          </Button>
                        )}
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="card mt-4 apply-now-card">
                <div className="card-body">
                  <Row>
                    <Col
                      md={10}
                      className="d-flex align-items-center coursedetail-entryrequirement-title"
                    >
                      <div>
                        <h5 className="card-title">Entry Requirement</h5>
                      </div>
                    </Col>
                    <Col md={12}>
                      {!openRequirement ? (
                        <div
                          id="collapse-requirement"
                          className="student-coursedetil-wordbreak"
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: program.requirement,
                            }}
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          />
                        </div>
                      ) : (
                        <Collapse in={openRequirement}>
                          <div id="collapse-requirement">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: program.requirement,
                              }}
                            />
                          </div>
                        </Collapse>
                      )}
                    </Col>
                    <Col className="d-flex justify-content-center">
                      {program.requirement &&
                        program.requirement.length > 300 && (
                          <Button
                            onClick={() => setOpenRequirement(!openRequirement)}
                            aria-controls="collapse-requirement"
                            aria-expanded={openRequirement}
                            style={{ textDecoration: "none" }}
                            variant="link"
                          >
                            {openRequirement ? "View Less" : "View More"}
                          </Button>
                        )}
                    </Col>
                  </Row>
                </div>
              </div>
            </Container>

            <Container className="my-4 about-institute-container">
              <div
                style={{
                  position: "relative",
                  top: 0,
                  left: 0,
                  zIndex: 0,
                  marginBottom: openAboutInstitute ? "1rem" : "0px",
                  marginTop: "10%",
                  overflow: "hidden",
                  transition: "all 0.5s ease", // Added transition for smooth effect
                }}
              >
                {/* Background Image */}
                <div
                  style={{
                    position: "relative",
                    top: 0,
                    left: 0,
                    zIndex: 0,
                    borderRadius: "1rem",
                    width: "100%",
                    height: openAboutInstitute
                      ? `${contentHeight + 500}px`
                      : "25rem",
                    overflow: "hidden",
                    transition: "height 0.5s ease",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: openAbout ? "20rem" : "100%", // This creates the partial reveal effect
                      transition: "height 0.5s ease",
                    }}
                  >
                    <img
                      src={
                        program.coverPhoto
                          ? `${baseURL}storage/${program.coverPhoto}`
                          : headerImage
                      }
                      alt="Header"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "fill",
                        objectPosition: "center top", // Anchor image to top
                        transition: "transform 0.5s ease",
                        transform: openAbout ? "scale(1)" : "scale(1.1)", // Subtle zoom effect
                      }}
                    />
                  </div>

                  {/* Card */}
                  <div
                    className="card apply-now-card"
                    style={{
                      bottom: -10,
                      width: "100%",
                      margin: "0 auto",
                      zIndex: 1,
                      position: "absolute",
                      backgroundColor: "white",
                      boxShadow: "0 -4px 10px rgba(0,0,0,0.1)",
                      borderRadius: "20px 20px 0 0",
                    }}
                  >
                    <div className="card-body" style={{ padding: "50px" }}>
                      <Row>
                        <Col md={10} className="d-flex align-items-center">
                          <div>
                            <h5 className="card-title">
                              About {program.school}
                            </h5>
                          </div>
                        </Col>
                        <Col md={12}>
                          <div
                            ref={contentRef}
                            style={{
                              zIndex: 1,
                              maxHeight: openAboutInstitute ? "none" : "100px",
                              overflow: "hidden",
                              transition: "max-height 0.5s ease",
                              position: "relative",
                            }}
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: program.schoolLongDescription,
                              }}
                              style={{
                                display: "-webkit-box",
                                WebkitLineClamp: openAboutInstitute
                                  ? "unset"
                                  : 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            />
                          </div>
                        </Col>
                        <Col md={12}>
                          <Collapse in={openAboutInstitute}>
                            <div
                              id="collapse-about-institute"
                              style={{ zIndex: 1 }}
                            ></div>
                          </Collapse>
                        </Col>
                        <Col className="d-flex justify-content-center">
                          {program.schoolLongDescription &&
                            program.schoolLongDescription.length > 100 && (
                              <Button
                                style={{
                                  textDecoration: "none",
                                  color: "#007bff",
                                  background: "none",
                                  border: "none",
                                  marginTop: "20px",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  setOpenAboutInstitute(!openAboutInstitute);
                                  setTimeout(() => {
                                    handleContentHeight();
                                  }, 0);
                                }}
                                aria-controls="collapse-about-institute"
                                aria-expanded={openAboutInstitute}
                              >
                                {openAboutInstitute ? "View Less" : "View More"}
                              </Button>
                            )}
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
              {/* Image Swiper */}
              <div className="image-gallery-course">
                {programs.map((program) => {
                  // Ensure schoolPhoto is an array and has items
                  const photos = Array.isArray(program.schoolPhoto)
                    ? program.schoolPhoto
                    : [];

                  return photos.slice(0, 5).map((photoPath, index) => (
                    <div
                      key={index}
                      style={{
                        display: "inline-block",
                        position: "relative",
                        cursor: "pointer",
                      }}
                      onClick={() => openModal(program.schoolPhoto, index)}
                    >
                      <img
                        src={`${baseURL}storage/${photoPath}`} // Direct use of the photo path
                        className="gallery-image-courses"
                        alt={`School Photo ${index + 1}`}
                        width="500"
                        style={{
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          //  console.log('Image failed to load:', e.target.src);
                          e.target.src = studypal12;
                        }}
                      />
                      {index === 4 && program.schoolPhoto.length > 5 && (
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 1,
                          }}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShowMore(program.schoolPhoto);
                            }}
                            style={{
                              color: "white",
                              backgroundColor: "transparent",
                              padding: "10px 20px",
                              border: "none",
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            see more
                          </button>
                        </div>
                      )}
                    </div>
                  ));
                })}

                {/* Modal for Swiper Gallery */}
                <Modal
                  show={modalIsOpen}
                  onHide={closeModal}
                  size="md"
                  centered
                >
                  <Modal.Header
                    closeButton
                    style={{
                      backgroundColor: "#B71A18",
                      color: "#fff",
                    }}
                  >
                    <Modal.Title>Image Gallery</Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={{ backgroundColor: "#fff", padding: "0" }}>
                    <Swiper
                      initialSlide={startIndex}
                      spaceBetween={10}
                      slidesPerView={1}
                      navigation
                      loop={true}
                      pagination={{ clickable: true }}
                      modules={[Navigation, Pagination]}
                      style={{
                        padding: "20px 0",
                      }}
                    >
                      {selectedPhotos.map((photoPath, index) => (
                        <SwiperSlide key={index}>
                          <img
                            src={`${baseURL}storage/${photoPath}`}
                            /*className="w-100"*/
                            alt={`Slide ${index + 1}`}
                            style={{
                              objectFit: "contain",
                              maxHeight: "70vh",
                              marginBottom: "2rem",
                            }}
                            onError={(e) => {
                              //   console.log('Modal image failed to load:', e.target.src);
                              e.target.src = studypal12;
                            }}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </Modal.Body>
                </Modal>

                {/* Modal for All Photos */}
                {/* Modal for All Photos */}
                <Modal
                  show={showAllPhotosModal}
                  onHide={handleCloseAllPhotosModal}
                  size="lg"
                  centered
                >
                  <Modal.Header
                    closeButton
                    style={{
                      backgroundColor: "#B71A18",
                      color: "#fff",
                      padding: "20px",
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                      borderBottom: "2px solid #dee2e6",
                    }}
                  >
                    <Modal.Title
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "600",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      All Photos
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body
                    style={{
                      maxHeight: "70vh",
                      overflowY: "auto",
                      paddingRight: "15px",
                    }}
                  >
                    <div className="image-gallery-course-modal">
                      {selectedPhotos.map((photoPath, index) => (
                        <img
                          key={index}
                          src={`${baseURL}storage/${photoPath}`}
                          alt={`School Photo ${index + 1}`}
                          style={{
                            width: "100%",
                            height: "150px",
                            objectFit: "cover",
                            borderRadius: "4px",
                            cursor: "pointer",
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                          }}
                          onClick={() => setEnlargedImageIndex(index)}
                          onError={(e) => {
                            // console.log('Modal image failed to load:', e.target.src);
                            e.target.src = studypal12;
                          }}
                        />
                      ))}
                    </div>
                    {enlargedImageIndex !== null && (
                      <ImageSlider
                        selectedPhotos={selectedPhotos}
                        enlargedImageIndex={enlargedImageIndex}
                        baseURL={baseURL}
                        onClose={() => setEnlargedImageIndex(null)}
                      />
                    )}
                  </Modal.Body>
                  <Modal.Footer
                    style={{
                      backgroundColor: "#f8f9fa",
                      padding: "15px 20px",
                      borderTop: "2px solid #dee2e6",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      onClick={handleCloseAllPhotosModal}
                      style={{
                        backgroundColor: "#007bff",
                        color: "#fff",
                        borderRadius: "5px",
                        padding: "8px 16px",
                        fontWeight: "600",
                        border: "none",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#0056b3";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = "#007bff";
                      }}
                    >
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
                {/* Swiper Modal */}
                <Modal
                  show={showSwiperModal}
                  onHide={handleCloseSwiperModal}
                  size="md"
                  centered
                >
                  <Modal.Header
                    closeButton
                    style={{
                      backgroundColor: "#B71A18", // Dark background for the Swiper modal
                      color: "#fff",
                    }}
                  >
                    <Modal.Title>Photo Viewer</Modal.Title>
                  </Modal.Header>
                  <Modal.Body
                    style={{
                      backgroundColor: "#fff", // Keep the background dark for photo viewing
                      padding: "0", // Remove padding for full-width Swiper
                    }}
                  >
                    <Swiper
                      modules={[Navigation, Pagination]}
                      initialSlide={activePhotoIndex} // Start Swiper on the clicked photo
                      spaceBetween={30} // Space between slides
                      slidesPerView={1} // Show one photo at a time
                      navigation
                      pagination={{ clickable: true }} // Optional: Add pagination
                    >
                      {selectedPhotos.map((program) => (
                        <SwiperSlide key={program.id}>
                          <img
                            src={
                              program.schoolPhoto
                                ? `${baseURL}storage/${program.schoolPhoto}`
                                : studypal12
                            }
                            alt={program.schoolMedia_name}
                            style={{
                              width: "100%",
                              height: "auto", // Maintain aspect ratio
                              objectFit: "contain", // Ensure the image fits inside the slide
                            }}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={handleCloseSwiperModal}
                    >
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
              {/* End of Image Swiper */}
              <div className="d-flex justify-content-center">
                {program.schoolCategory === "Local University" ? (
                  <Button
                    onClick={() =>
                      (window.location.href = `mailto:${program.schoolEmail}`)
                    }
                    style={{
                      backgroundColor: "#B71A18",
                      border: "none",
                      width: "180px",
                      height: "50px",
                      marginBottom: "20px",
                    }} // Pass the correct ID
                  >
                    Contact Now
                  </Button>
                ) : (
                  <Button
                    style={{
                      backgroundColor: "#B71A18",
                      border: "none",
                      width: "180px",
                      height: "50px",
                      marginBottom: "20px",
                    }}
                    onClick={() => handleApplyNow(program)} // Pass the correct ID
                  >
                    Apply Now
                  </Button>
                )}
                {/* <Button
                  style={{
                    backgroundColor: "#FFA500",
                    border: "none",
                    width: "180px",
                    height: "50px",
                    marginTop: "20px",
                  }}
                  onClick={() => handleKnowMoreClick(program.id)} // Pass the correct course ID
                >
                  Know More
                </Button>*/}
              </div>
              {/* Featured courses */}
              {featuredCourses.length > 0 && (
                <Container className="university-row-carousel pt-5">
                  <h4>Featured Courses</h4>
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    style={{
                      padding: window.innerWidth < 768 ? "0 20px" : "10px",
                    }}
                    loop={true}
                    modules={[Pagination, Navigation]}
                    breakpoints={{
                      400: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                      },
                      // Large phones & small tablets
                      576: {
                        slidesPerView: 2,
                        spaceBetween: 5,
                      },
                      640: {
                        slidesPerView: 1,
                        spaceBetween: 5,
                      },
                      768: {
                        slidesPerView: 2,
                        spaceBetween: 5,
                      },
                      1024: {
                        slidesPerView: 3,
                        spaceBetween: 5,
                      },
                      1025: {
                        // Custom breakpoint for specific screen height
                        slidesPerView: 4, // Adjust as needed
                        spaceBetween: 1, // Adjust as needed
                      },
                      1254: {
                        slidesPerView: 4,
                        spaceBetween: 1,
                      },
                      1324: {
                        slidesPerView: 4,
                        spaceBetween: 1,
                      },
                      1488: {
                        slidesPerView: 5,
                        spaceBetween: 1,
                      },
                    }}
                  >
                    {featuredCourses.map((course) => (
                      <SwiperSlide key={course.id}>
                        <div
                          className="featured-course-card"
                          style={{ width: "230px", height: "300px" }}
                        >
                          <div style={{ position: "relative" }}>
                            {course.course_qualification && (
                              <span
                                className="badge"
                                style={{
                                  fontSize: "16px",
                                  fontWeight: "normal",
                                  backgroundColor:
                                    course.course_qualification_color, // Dynamically set background color from API
                                }}
                              >
                                {course.course_qualification}
                              </span>
                            )}
                            <Link
                              to={`/university-details/${formatUrlString(
                                course.course_school
                              )}`}
                              onClick={() =>
                                sessionStorage.setItem(
                                  "schoolId",
                                  course.school_id
                                )
                              }
                              target="_parent"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={`${baseURL}storage/${course.course_logo}`}
                                alt={course.course_school}
                                className="section-image"
                                style={{
                                  height: "80px",
                                  width: "150px",
                                  objectFit: "contain",
                                }}
                              />
                            </Link>
                          </div>
                          <div>
                            <Link
                              to={`/university-details/${formatUrlString(
                                course.course_school
                              )}`}
                              onClick={() =>
                                sessionStorage.setItem(
                                  "schoolId",
                                  course.school_id
                                )
                              }
                              target="_parent"
                              rel="noopener noreferrer"
                            >
                              <p
                                className="course-school-title"
                                style={{
                                  color: "#514E4E",
                                  fontSize: "16px",
                                  fontWeight: "500",
                                  marginBottom: "15px",
                                  height: "3.5rem",
                                }}
                              >
                                {course.course_school}
                              </p>
                            </Link>
                            <Link
                              onClick={() => handleKnowMoreClick(course)}
                              target="_parent"
                              rel="noopener noreferrer"
                            >
                              <p
                                className="course-title"
                                style={{
                                  color: "#B71A18",
                                  fontSize: "18px",
                                  fontWeight: "500",
                                  marginBottom: "15px",
                                  height: "55px",
                                  paddingTop: "0.1rem",
                                }}
                              >
                                {course.course_name}
                              </p>
                            </Link>
                            <div className="d-flex justify-content-center">
                              <i
                                className="bi bi-geo-alt"
                                style={{
                                  marginRight: "10px",
                                  color: "#AAAAAA",
                                }}
                              ></i>
                              <span style={{ color: "#AAAAAA" }}>
                                {course.state},{course.country}
                              </span>
                            </div>
                          </div>
                          <div className="d-flex justify-content-center">
                            <button
                              className="button-know-more"
                              onClick={() => handleKnowMoreClick(course)}
                            >
                              {course.knowMoreText || "Know More"}
                            </button>

                            {course.school_category === "Local University" ? (
                              <button
                                onClick={() =>
                                  (window.location.href = `mailto:${course.school_email}`)
                                }
                                className="button-apply-now"
                                style={{ fontSize: "12px" }}
                              >
                                Contact Now
                              </button>
                            ) : (
                              <button
                                className="button-apply-now"
                                onClick={() =>
                                  handleApplyNow({
                                    id: course.id || course.course_id,
                                    logo: course.course_logo,
                                    school: course.course_school,
                                    course: course.course_name,
                                  })
                                }
                              >
                                {course.applyNowText || "Apply Now"}
                              </button>
                            )}
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Container>
              )}
              {/* End of Featured courses */}
              {/* Adjusted margin to reduce gap */}
              <div style={{ margin: "10px 0" }}></div> {/* Reduced gap here */}
            </Container>
          </div>
        ))}
      {Array.isArray(adsImage) && adsImage.length > 0 ? (
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }} // Ensure autoplay is enabled
          modules={[Pagination, Navigation, Autoplay]}
          style={{ padding: "0px 0" }}
        >
          {adsImage.map((ad, index) => (
            <SwiperSlide key={ad.id} className="advertisement-item mb-3">
              <a
                href={
                  ad.banner_url.startsWith("http")
                    ? ad.banner_url
                    : `https://${ad.banner_url}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`${baseURL}storage/${ad.banner_file}`}
                  alt={`Advertisement ${ad.banner_name}`}
                  className="adverstise-image"
                  style={{
                    height: "175px",
                    objectFit: "contain",
                  }}
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <img src={studypal11} alt="Header" className="adverstise-image" />
      )}
      <div>
        <SpcFooter />
      </div>
    </div>
  );
};

export default CourseDetail;
