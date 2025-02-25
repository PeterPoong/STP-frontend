import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import NavButtons from "../NavButtons";
import NavButtonsSP from "../../../Components/StudentPortalComp/NavButtonsSP";
// import NavButtons from "../../StudentComp/NavButtons";
import headerImage from "../../../assets/StudentAssets/institute image/StudyPal10.png";
import studypal12 from "../../../assets/StudentAssets/coursepage image/StudyPal12.jpg";
import SpcFooter from "../../../Components/StudentPortalComp/SpcFooter";
import ImageSlider from "../../../Components/StudentComp/ImageSlider";
import "../../../css/StudentCss/institutepage css/KnowMoreInstitute.css";
import {
  Container,
  Row,
  Col,
  Button,
  Collapse,
  Card,
  Modal,
} from "react-bootstrap";
import "../../../css/StudentCss/course page css/SearchCourse.css";
import studypal11 from "../../../assets/StudentAssets/institute image/StudyPal11.png";
import Footer from "../../../Components/StudentComp/Footer";
import currency from "currency.js";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { Helmet } from "react-helmet";

const baseURL = import.meta.env.VITE_BASE_URL;
const schoolDetailAPIURL = `${baseURL}api/student/schoolDetail`;
const adsAURL = `${baseURL}api/student/advertisementList`;
const KnowMoreInstitute = () => {
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showAllPhotosModal, setShowAllPhotosModal] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  const [enlargedImageIndex, setEnlargedImageIndex] = useState(null);
  const { school_name } = useParams();
  const formattedSchoolName = decodeURIComponent(school_name)
    .replace(/\((.*?)\)/g, (match) => match.replace(/-/g, "###HYPHEN###")) // Temporarily replace hyphens in parentheses
    .replace(/-/g, " ") // Replace remaining hyphens with spaces
    .replace(/\###HYPHEN###/g, "-") // Restore original hyphens in parentheses
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .trim(); // Remove leading/trailing spaces

  console.log("Original school name from URL:", school_name);
  console.log("Formatted school name:", formattedSchoolName);

  const [showSwiperModal, setShowSwiperModal] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0); // To track the clicked photo

  // State to track the number of displayed courses
  const [visibleCourses, setVisibleCourses] = useState(5);
  const [expanded, setExpanded] = useState(false); // Track if the list is expanded

  const [adsImage, setAdsImage] = useState(null);

  // Function to handle displaying more courses
  const handleViewMore = () => {
    setExpanded(!expanded); // Toggle collapse state
    if (!expanded) {
      setVisibleCourses(courses.length); // Show all courses when expanded
    } else {
      setVisibleCourses(5); // Show only 5 courses when collapsed
    }
  };

  // Function to handle opening the Swiper modal and set the active photo
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

  const [open, setOpen] = useState(false);
  const [openCourses, setOpenCourses] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [courses, setCourses] = useState([]);

  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  const location = useLocation();
  const [institutes, setInstitutes] = useState([]);
  const [featuredInstitutes, setFeaturedInstitutes] = useState([]);
  const navigate = useNavigate();
  const storedSchoolId = sessionStorage.getItem("schoolId"); // Retrieve school_id from session
  console.log("School Name from URL:", formattedSchoolName); // Log the school name
  const handleContentHeight = () => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  };
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
      console.log("Fetching exchange rates..."); // Log before fetching
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

        console.log(
          "Detected currency change in sessionStorage:",
          newCurrencyCode
        );

        fetchExchangeRates(newCurrencyCode);
        fetchSchool();
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
  useEffect(() => {
    const fetchCountryAndSet = async () => {
      const country = await fetchCountry(); // Fetch the country
      if (country) {
        // console.log("User country:", country);

        const currencyCode =
          sessionStorage.getItem("userCurrencyCode") || "MYR"; // Fetch from storage
        setSelectedCurrency(countryCurrencyMap[country]); // Use country directly from fetchCountry

        // Fetch exchange rates based on the detected currency
        await fetchExchangeRates(currencyCode);
      }
    };
    fetchCountryAndSet();
  }, []);
  //Fecth Ads Image
  const fetchAddsImage = async () => {
    try {
      const response = await fetch(adsAURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ advertisement_type: 73 }),
      });

      const result = await response.json();
      // console.log(result);
      if (result.success) {
        setAdsImage(result.data);
      }
    } catch (error) {
      console.error("Error fetching advertisements:", error);
    }
  };

  const fetchSchool = async () => {
    if (storedSchoolId) {
      try {
        const response = await fetch(`${baseURL}api/student/schoolDetail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: storedSchoolId }), // Use the stored school_id
        });
        const data = await response.json();
        if (data && data.success && data.data) {
          setInstitutes([data.data]);
          setCourses(data.data.courses);
        } else {
          console.error(
            "Invalid data structure for school detail: ",
            data.data
          );
          setInstitutes([]);
        }
      } catch (error) {
        console.error("Error fetching school detail data: ", error);
        setInstitutes([]);
      }
    } else if (formattedSchoolName) {
      try {
        const response = await fetch(`${baseURL}api/student/schoolDetail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ schoolName: formattedSchoolName }),
        });
        const data = await response.json();
        if (data && data.success && data.data) {
          setInstitutes([data.data]);
          setCourses(data.data.courses);
          sessionStorage.setItem("schoolId", data.data.id);
        } else {
          console.error("School not found:", formattedSchoolName);
          setInstitutes([]);
          // You might want to show a user-friendly error message here
          // or redirect to a 404 page
        }
      } catch (error) {
        console.error("Error fetching school detail data: ", error);
        setInstitutes([]);
      }
    }
    // Fetch featured institutes with type "thirdPage"
    fetch(`${baseURL}api/student/featuredInstituteList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "thirdPage", // Use the required type value
        schoolId: storedSchoolId || schoolId, // Use storedSchoolId if available, otherwise use schoolId
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.success && Array.isArray(data.data)) {
          setFeaturedInstitutes(data.data);
        } else {
          console.error(
            "Invalid data structure for featured institutes: ",
            data
          );
          setFeaturedInstitutes([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching featured institutes data: ", error);
        setFeaturedInstitutes([]);
      });
  };

  useEffect(() => {
    // console.log("Institute ID: ", id);
    fetchSchool();
    fetchAddsImage();
  }, []);

  if (!institutes || institutes.length === 0) {
    return (
      <div className="spinner-container">
        <div className="custom-spinner"></div>
      </div>
    );
  }

  const handleKnowMoreClick = (id) => {
    navigate(`/knowMoreInstitute/${id}`);
  };

  const handleApplyNow = (program, institute) => {
    //  console.log("Program object:", program);
    navigate(`/studentApplyCourses/${program.id}`, {
      state: {
        programId: program.id,
        schoolLogoUrl: `${import.meta.env.VITE_BASE_URL}storage/${
          program.course_logo || program.logo
        }`,
        schoolName: institute.name,
        courseName: program.course_name,
      },
    });
  };

  const handleContactSchool = (email) => {
    if (email) {
      // Remove any semicolons or other potential invalid characters
      const cleanEmail = email.replace(/[;,\s]+$/, "");
      window.location.href = `mailto:${cleanEmail}`;
    } else {
      alert("School email is not available at the moment.");
    }
  };

  const generateInstitutionStructuredData = (institute) => {
    return {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: institute.name,
      description: institute.description,
      address: {
        "@type": "PostalAddress",
        addressRegion: institute.state,
        addressCountry: institute.country,
        addressLocality: institute.city,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: institute.latitude,
        longitude: institute.longitude,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        numberOfItems: institute.number_courses,
        itemListElement: institute.courses.map((course) => ({
          "@type": "Course",
          name: course.course_name,
          educationalLevel: course.qualification,
          timeRequired: course.course_period,
          educationalProgramMode: course.study_mode,
        })),
      },
    };
  };

  const generateSEOMetadata = (institute) => {
    if (!institute) return null;
    return (
      <Helmet>
        <title>{`${institute.name} - Programs, Courses, and Admissions | Study in ${institute.state}`}</title>
        <meta
          name="description"
          content={`Discover ${institute.number_courses} courses at ${institute.name}. Learn about programs, fees, intake dates, and campus facilities. Apply online now!`}
        />
        <meta
          name="keywords"
          content={`${institute.name}, university in ${institute.state}, ${institute.category}, courses, admissions, apply online, study in malaysia`}
        />
        <script type="application/ld+json">
          {JSON.stringify(generateInstitutionStructuredData(institute))}
        </script>
      </Helmet>
    );
  };

  const countWords = (html) => {
    if (!html) return 0;
    const text = html.replace(/<[^>]+>/g, ' '); // Remove HTML tags
    return text.trim().split(/\s+/).filter(word => word).length;
  };

  return (
    <div style={{ backgroundColor: "#F5F4F4" }}>
      <NavButtonsSP />
      {Array.isArray(institutes) &&
        institutes.map((institute) => (
          <div key={institute.id}>
            {generateSEOMetadata(institute)}
            <header className="know-more-masthead">
              <img
                src={
                  institute.school_cover &&
                  institute.school_cover.schoolMedia_location
                    ? `${baseURL}storage/${institute.school_cover.schoolMedia_location}`
                    : headerImage // Use headerImage as the default if school_cover is not available
                }
                alt="Header"
                className="know-more-header-image"
              />
            </header>
            <Container className="my-4 know-more-container">
              <Row className="know-more-row no-gutters">
                <Col
                  xs={12}
                  md={3}
                  className="d-flex align-items-center justify-content-center position-relative know-more-image-col"
                >
                  <img
                    src={`${baseURL}storage/${institute.logo}`}
                    alt="Institute"
                    className="img-fluid img-thumbnail know-more-program-image"
                    style={{
                      maxWidth: "80%",
                    }}
                  />
                </Col>
                <Col
                  xs={12}
                  md={6}
                  className="d-flex flex-column align-items-start"
                >
                  <div
                    style={{
                      margin: window.innerWidth < 768 ? "5px 15px" : "15px", // Equal horizontal margins
                      width: "100%", // Ensure full width for proper centering
                    }}
                    className="institute-name-container"
                  >
                    <h4
                      className="institute-name"
                      style={{
                        textAlign: window.innerWidth < 768 ? "center" : "left",
                        width: "100%", // Added to ensure full width
                      }}
                    >
                      {institute.name}
                    </h4>
                    <div className="d-flex flex-column flex-md-row align-items-start">
                      <p className="mb-2 mb-md-0 padding-10 text-center text-md-start w-100">
                        <i className="bi bi-geo-alt"></i>
                        <span style={{ paddingLeft: "10px" }}>
                          {institute.city}, {institute.state},{" "}
                          {institute.country}
                        </span>
                      </p>
                      <p className="mb-0 text-center text-md-start w-100">
                        <i
                          className="bi bi-mortarboard"
                          style={{
                            marginLeft: { xs: "0", md: "30px" },
                          }}
                        ></i>
                        <span style={{ paddingLeft: "10px" }}>
                          {institute.category}
                        </span>
                      </p>
                    </div>
                  </div>
                </Col>
                <Col
                  xs={12}
                  md={3}
                  className="d-flex align-items-center justify-content-center justify-content-md-end"
                >
                  <Button
                    onClick={() =>
                      handleContactSchool("institute.school_email")
                    }
                    style={{
                      backgroundColor: "#FF6B00",
                      border: "none",
                      width: "100%",
                      maxWidth: "180px",
                      height: "50px",
                      marginTop: "20px",
                      display: "block",
                      margin: "20px auto",
                    }}
                  >
                    Contact School
                  </Button>
                </Col>
              </Row>

              {/* Image Swiper */}
              <div className="image-gallery" style={{ marginTop: "20px" }}>
                {institutes.map((institute) => {
                  // Get photos array or use default - ensure proper fallback
                  const photos = institute.school_photo?.length > 0 
                    ? institute.school_photo 
                    : [{ id: "default", schoolMedia_location: null }];
                    
                  return photos.slice(0, 5).map((photo, index) => (
                    <div
                      key={`${institute.id}-${photo.id}`}
                      style={{
                        display: "inline-block",
                        position: "relative",
                      }}
                      onClick={() => openModal(photos, index)}
                    >
                      <img
                        src={
                          photo.schoolMedia_location
                            ? `${baseURL}storage/${photo.schoolMedia_location}`
                            : studypal12
                        }
                        className="gallery-image"
                        alt={`${institute.name} photo ${index + 1}`}
                        width="500"
                        style={{ objectFit: "cover" }}
                      />
                      {/* Check against the actual photos array length */}
                      {index === 4 && photos.length > 5 && (
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
                              handleShowMore(photos);
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
                <Modal
                  show={modalIsOpen}
                  onHide={closeModal}
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
                    <Modal.Title>Image Gallery</Modal.Title>
                  </Modal.Header>

                  <Modal.Body
                    style={{
                      backgroundColor: "#fff", // Black background to emphasize the photos
                      padding: "0", // Remove padding for a full-width swiper
                    }}
                  >
                    <Swiper
                      initialSlide={startIndex}
                      spaceBetween={10}
                      slidesPerView={1}
                      loop={true}
                      pagination={{ clickable: true }}
                      modules={[Pagination]}
                      style={{
                        padding: "20px 0", // Padding to add spacing around the Swiper content
                      }}
                    >
                      {selectedPhotos.map((photo) => (
                        <SwiperSlide key={photo.id}>
                          <img
                            src={
                              photo.schoolMedia_location
                                ? `${baseURL}storage/${photo.schoolMedia_location}`
                                : studypal12 // Use studypal12 as the default image if schoolMedia_location is not available
                            }
                            className=""
                            alt={`Slide ${photo.id}`}
                            style={{
                              objectFit: "contain", // Ensure the image maintains its aspect ratio
                              maxHeight: "70vh", // Limit the height for better viewing on small screens
                              marginBottom: "2rem",
                            }}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </Modal.Body>
                </Modal>

                {/*Show More Content*/}

                <Modal
                  show={showAllPhotosModal}
                  onHide={handleCloseAllPhotosModal}
                  size="lg"
                  centered
                >
                  <Modal.Header
                    closeButton
                    style={{
                      backgroundColor: "#B71A18", // Dark background color for contrast
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
                    <div className="image-gallery-institute-modal">
                      {selectedPhotos.map((photo, index) => (
                        <img
                          key={photo.id}
                          src={
                            photo.schoolMedia_location
                              ? `${baseURL}storage/${photo.schoolMedia_location}`
                              : studypal12 // Use studypal12 as the default image if schoolMedia_location is not available
                          }
                          alt={photo.schoolMedia_name}
                          style={{
                            width: "100%",
                            height: "150px",
                            objectFit: "cover",
                            borderRadius: "4px",
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                            cursor: "pointer", // Add a pointer cursor to indicate it's clickable
                          }}
                          onClick={() => setEnlargedImageIndex(index)}
                        />
                      ))}
                    </div>
                    {enlargedImageIndex !== null && (
                      <ImageSlider
                        selectedPhotos={selectedPhotos.map(
                          (photo) => photo.schoolMedia_location
                        )}
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
                        letterSpacing: "0.5px",
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
                      modules={[Pagination]}
                      initialSlide={activePhotoIndex} // Start Swiper on the clicked photo
                      spaceBetween={30} // Space between slides
                      slidesPerView={1} // Show one photo at a time
                      loop={true}
                      pagination={{ clickable: true }} // Optional: Add pagination
                    >
                      {selectedPhotos.map((photo) => (
                        <SwiperSlide key={photo.id}>
                          <img
                            src={
                              photo.schoolMedia_location
                                ? `${baseURL}storage/${photo.schoolMedia_location}`
                                : studypal12 // Use studypal12 as the default image if schoolMedia_location is not available
                            }
                            alt={photo.schoolMedia_name}
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

              <div className="card mt-4 know-more-card">
                <div className="card-body">
                  <Row>
                    <Col md={10} className="d-flex align-items-center">
                      <div className="knowmoreinstitute-cardtitle">
                        <h5 className="card-title ">School Overview</h5>
                      </div>
                    </Col>
                    <Col md={12}>
                      <div
                        id="collapse-course-overview"
                        className="student-knowmoreinsti-wordbreak"
                        style={{
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: open ? 'unset' : 3,
                          WebkitBoxOrient: 'vertical',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        <div dangerouslySetInnerHTML={{ __html: institute.short_description }} />
                      </div>
                    </Col>
                    <Col className="d-flex justify-content-center">
                      {institute.short_description && countWords(institute.short_description) > 100 && (
                        <Button
                          style={{ textDecoration: "none" }}
                          variant="link"
                          onClick={() => setOpen(!open)}
                          aria-controls="collapse-course-overview"
                          aria-expanded={open}
                        >
                          {open ? "View Less" : "View More"}
                        </Button>
                      )}
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="card mt-4 know-more-card">
                <div
                  className="card-body"
                  style={{ height: "250px", width: "auto" }}
                >
                  <Row>
                    <Col md={12}>
                      <div
                        className="map-responsive"
                        style={{ height: "100%", width: "100%" }}
                      >
                        {institute.location ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: institute.location,
                            }}
                            style={{
                              border: 0,
                              width: "100%",
                              height: "100%",
                            }}
                          ></div>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              padding: "75px 50px 75px 100px",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "100%",
                              width: "100%",
                              fontSize: "20px",
                              backgroundColor: "transparent",
                            }}
                          >
                            <p>Map is currently unavailable</p>
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              <Row className="d-flex flex-wrap ">
                <Col xs={12} sm={6} md={6} className="d-flex mb-3">
                  <div className="card mt-4 total-course-card w-100">
                    <div className="card-body">
                      <Row className="justify-content-center">
                        <Col
                          md={10}
                          className="d-flex flex-column align-items-center"
                        >
                          <div>
                            <h6
                              style={{
                                color: "#514E4E",
                              }}
                              className="card-title"
                            >
                              Total Courses Offered
                            </h6>
                          </div>
                        </Col>
                        <div>
                          <i
                            className="bi bi-mortarboard"
                            style={{ paddingLeft: "10px", fontSize: "2rem" }}
                          ></i>
                        </div>
                        <div>
                          <h5
                            style={{
                              paddingTop: "10px",
                              fontStyle: "italic",
                              color: "#514E4E",
                            }}
                          >
                            {/*{institute.category}*/}{" "}
                            {institute.number_courses} Courses
                          </h5>
                        </div>
                      </Row>
                    </div>
                  </div>
                </Col>

                <Col xs={12} sm={6} md={6} className="d-flex mb-3">
                  <div className="card mt-4 intake-period-card w-100">
                    <div className="card-body">
                      <Row className="justify-content-center">
                        <Col
                          md={10}
                          className="d-flex flex-column align-items-center"
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "100%",
                              alignSelf: "center", // Adjust as per your container height
                            }}
                          >
                            <h6
                              style={{
                                color: "#514E4E",
                              }}
                              className="card-title "
                            >
                              Intake Period
                            </h6>
                          </div>
                        </Col>
                        <div>
                          <i
                            className="bi bi-book"
                            style={{ paddingLeft: "10px", fontSize: "2rem" }}
                          ></i>
                        </div>
                        <div>
                          <h5
                            style={{
                              paddingTop: "10px",
                              fontStyle: "italic",
                              color: "#514E4E",
                              textAlign: "center", // Center text
                              whiteSpace: "normal", // Allow wrapping
                              wordWrap: "break-word", // Break long words and wrap
                            }}
                          >
                            {institute.month && institute.month.length > 0
                              ? institute.month.join(", ")
                              : "N/A"}
                          </h5>
                        </div>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>

            {/* --------- About School --------- */}
            <Container className="my-4 about-institute-school-container">
              <div
                style={{
                  position: "relative",
                  top: 0,
                  left: 0,
                  zIndex: 0,
                  marginBottom: openAbout ? "1rem" : "0px",
                  marginTop: "10%",
                  overflow: "hidden",
                  transition: "all 0.5s ease", // Added transition for smooth effect
                }}
              >
                {/* Background Image Container */}
                <div
                  style={{
                    position: "relative",
                    top: 0,
                    left: 0,
                    zIndex: 0,
                    borderRadius: "1rem",
                    width: "100%",
                    height: openAbout ? `${contentHeight + 500}px` : "25rem", // Add padding for other elements
                    overflow: "hidden",
                    transition: "height 0.5s ease",
                  }}
                >
                  {/* Image with zoom effect */}
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
                        institute.school_cover &&
                        institute.school_cover.schoolMedia_location
                          ? `${baseURL}storage/${institute.school_cover.schoolMedia_location}`
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
                    className="card know-more-card"
                    style={{
                      bottom: -10,
                      width: "100%",
                      margin: "0 auto",
                      position: "absolute",
                      zIndex: 1,
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
                              About {institute.name}
                            </h5>
                          </div>
                        </Col>
                        <Col md={12}>
                          <div
                            ref={contentRef}
                            style={{
                              zIndex: 1,
                              maxHeight: openAbout ? `${contentRef.current?.scrollHeight}px` : "100px",
                              overflow: "hidden",
                              transition: "max-height 0.5s ease",
                            }}
                          >
                            <div 
                              className="truncate-text" 
                              style={{ 
                                display: '-webkit-box',
                                WebkitLineClamp: openAbout ? 'unset' : 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}
                            >
                              <div 
                                dangerouslySetInnerHTML={{ __html: institute.long_description }} 
                                style={{ 
                                  display: 'inline', // Makes nested elements inline
                                  lineClamp: 3 
                                }} 
                              />
                            </div>
                          </div>
                        </Col>
                        <Col className="d-flex justify-content-center">
                          {countWords(institute.long_description) > 100 && (
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
                                setOpenAbout(!openAbout);
                                if (!openAbout) {
                                  setTimeout(() => {
                                    setContentHeight(contentRef.current?.scrollHeight);
                                  }, 50);
                                }
                              }}
                              aria-controls="collapse-about-institute"
                              aria-expanded={openAbout}
                            >
                              {openAbout ? "View Less" : "View More"}
                            </Button>
                          )}
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
              {/* --------- End of About School --------- */}

              {/* Contact School Button */}
              <div className="d-flex justify-content-center mt-3">
                <Button
                  onClick={() => handleContactSchool(institute.school_email)}
                  style={{
                    backgroundColor: "#FF6B00",
                    border: "none",
                    width: "180px",
                    height: "50px",
                    // marginTop: openAbout ? "30px" : "10%", // Adjust margin when expanded
                  }}
                >
                  Contact School
                </Button>
              </div>
              {/* End of Contact School Button */}

              {/* ------  Course Offered List ------- */}
              {courses.length > 0 && (
                <Container className="my-4">
                  <h4>Courses Offered</h4>
                  {courses.slice(0, visibleCourses).map((course) => (
                    <div
                      className="card mt-3"
                      key={course.id}
                      style={{ position: "relative", height: "auto" }}
                    >
                      <div className="card-body d-flex flex-column flex-md-row align-items-start">
                        <Row className="w-100">
                          <Col md={6} lg={6}>
                            <div className="card-image mb-3 mb-md-0">
                              <h5 className="card-title knowmoreinstitute-cardtitle-courselist">
                                <a
                                  style={{
                                    color: "black",
                                    textDecoration: "none",
                                  }}
                                  href={`/course-details/${institute.name
                                    .replace(/\s+/g, "-")
                                    .toLowerCase()}/${course.course_name
                                    .replace(/\s+/g, "-")
                                    .toLowerCase()}`}
                                  onClick={(e) => {
                                    e.preventDefault(); // Prevent the default anchor behavior
                                    sessionStorage.setItem(
                                      "courseId",
                                      course.id
                                    ); // Store course ID in session
                                    navigate(
                                      `/course-details/${institute.name
                                        .replace(/\s+/g, "-")
                                        .toLowerCase()}/${course.course_name
                                        .replace(/\s+/g, "-")
                                        .toLowerCase()}`
                                    ); // Navigate to course details
                                  }}
                                >
                                  {course.course_name}
                                </a>
                              </h5>
                              <div className="d-flex align-items-center knowmoreinstitute-cardtitle-courselist-name">
                                <div className="knowmoreinstitute-cardtitle-courselist-img">
                                  <img
                                    src={`${baseURL}storage/${
                                      course.course_logo || institute.logo
                                    }`}
                                    alt={institute.name}
                                    width="100"
                                  />
                                </div>
                                <div className="knowmoreinstitute-cardtitle-courselist-institutecity">
                                  <h5 className="card-text">
                                    {institute.name}
                                  </h5>
                                  <i className="bi bi-geo-alt"></i>
                                  <span style={{ paddingLeft: "10px" }}>
                                    {institute.city}, {institute.state}
                                  </span>
                                  <a
                                    href={institute.google_map_location}
                                    className="map-link"
                                    style={{ paddingLeft: "5px" }}
                                  >
                                    click and view on map
                                  </a>
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col md={6} lg={6}>
                            <div className="d-flex flex-grow-1 justify-content-between knowmoreinstitute-cardtitle-courselist-list">
                              <div className="details-div">
                                <div className="d-flex align-items-center flex-wrap">
                                  <Col>
                                    <div>
                                      <Row style={{ paddingTop: "20px" }}>
                                        <div className="knowmoreinstitute-dflex-center">
                                          <i
                                            className="bi bi-mortarboard"
                                            style={{ marginRight: "10px" }}
                                          ></i>
                                          <p style={{ paddingLeft: "20px" }}>
                                            {course.qualification}
                                          </p>
                                        </div>
                                        <div
                                          style={{ marginTop: "10px" }}
                                          className="knowmoreinstitute-dflex-center"
                                        >
                                          <i
                                            className="bi bi-calendar-check"
                                            style={{ marginRight: "10px" }}
                                          ></i>
                                          <p style={{ paddingLeft: "20px" }}>
                                            {course.study_mode}
                                          </p>
                                        </div>
                                        <div
                                          style={{ marginTop: "10px" }}
                                          className="knowmoreinstitute-dflex-center"
                                        >
                                          <i
                                            className="bi bi-clock"
                                            style={{ marginRight: "10px" }}
                                          ></i>{" "}
                                          <p style={{ paddingLeft: "20px" }}>
                                            {course.course_period}
                                          </p>
                                        </div>
                                        <div
                                          style={{
                                            marginTop: "10px",
                                            display: "flex",
                                            flexWrap: "nowrap",
                                            width: "100%",
                                            alignItems: "center"
                                          }}
                                          className="knowmoreinstitute-dflex-center"
                                        >
                                          <i
                                            className="bi bi-calendar2-week"
                                            style={{ marginRight: "10px", flexShrink: 0 }}
                                          ></i>
                                          <p
                                            style={{
                                              paddingLeft: "20px",
                                              margin: 0,
                                              whiteSpace: "normal",
                                              wordBreak: "break-word",
                                              overflowWrap: "break-word",
                                              display: "inline-block",
                                              flex: 1,
                                              minWidth: 0
                                            }}
                                          >
                                            {Array.isArray(course.course_intake)
                                              ? course.course_intake
                                                  .map((intake) => intake.trim())
                                                  .join(", ")
                                              : course.course_intake}
                                          </p>
                                        </div>
                                      </Row>
                                    </div>
                                  </Col>
                                </div>
                              </div>
                              <div className="fee-apply knowmoreinstitute-cardtitle-courselist-feeapply">
                                <div
                                  className="fee-info text-right"
                                  style={{
                                    marginTop: "25px",
                                    alignItems: "flex-end",
                                    textAlign: "right",
                                  }}
                                >
                                  <p
                                    style={{
                                      fontSize: "14px",
                                      marginRight: "10px",
                                    }}
                                  >
                                    estimate fee<br></br>
                                    <p style={{ fontSize: "16px" }}>
                                      {console.log("Fetched Country:", fetchedCountry)}
                                      {console.log("Institute Country Code:", institute.country_code)}
                                      {console.log("Are they equal?:", fetchedCountry?.toUpperCase() === institute.country_code?.toUpperCase())}
                                      
                                      {fetchedCountry?.toUpperCase() === institute.country_code?.toUpperCase() ? (
                                        course.course_cost === "0" ? (
                                          "N/A"
                                        ) : (
                                          <>
                                            <strong>
                                              {sessionStorage.getItem("userCurrencySymbol") || "RM"}
                                            </strong>{" "}
                                            {convertToFetchedCurrency(course.course_cost).replace(/^.*?(\d+.*)/, "$1")}
                                          </>
                                        )
                                      ) : (
                                        course.international_cost === "0" ? (
                                          course.course_cost === "0" ? (
                                            "N/A"
                                          ) : (
                                            <>
                                              <strong>
                                                {sessionStorage.getItem("userCurrencySymbol") || "RM"}
                                              </strong>{" "}
                                              {convertToFetchedCurrency(course.course_cost).replace(/^.*?(\d+.*)/, "$1")}
                                            </>
                                          )
                                        ) : (
                                          <>
                                            <strong>
                                              {sessionStorage.getItem("userCurrencySymbol") || "RM"}
                                            </strong>{" "}
                                            {convertToFetchedCurrency(course.international_cost).replace(/^.*?(\d+.*)/, "$1")}
                                          </>
                                        )
                                      )}
                                    </p>
                                  </p>
                                </div>
                                <div className="apply-button mt-3">
                                  <button
                                    className="featured"
                                    onClick={() =>
                                      handleApplyNow(course, institute)
                                    }
                                  >
                                    Apply Now
                                  </button>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  ))}

                  {/* View More / Hide Courses Button */}
                  {courses.length > 5 && (
                    <Col className="d-flex justify-content-center">
                      <Button
                        onClick={handleViewMore}
                        aria-controls="collapse-courses"
                        aria-expanded={expanded}
                        style={{
                          marginTop: "50px",
                          textDecoration: "none",
                          backgroundColor: "#B71A18",
                          borderColor: "#B71A18",
                          width: "200px",
                          padding: "10px 20px",
                          borderRadius: "5px",
                          color: "white",
                          transition: "0.3s ease",
                        }}
                      >
                        {expanded ? "Hide Courses" : "View More Courses"}
                      </Button>
                    </Col>
                  )}

                  {/* ------ End of Course Offered List ------ */}

                  {/* ------ Featured institutes ------- */}
                  {featuredInstitutes.length > 0 && (
                    <Container className="my-4">
                      <h4>Featured Institutes</h4>
                      <style>
                        {`
                          /* Hide navigation arrows on mobile */
                          @media (max-width: 768px) {
                            .swiper-button-next,
                            .swiper-button-prev {
                              display: none !important;
                            }
                          }
                        `}
                      </style>
                      <Swiper
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation
                        style={{
                          padding: "0",
                          backgroundColor: "white",
                        }}
                        loop={true}
                        autoplay={{
                          delay: 2000, // Slides every 3 seconds
                          disableOnInteraction: false, // Continues autoplay after user interaction
                        }}
                        modules={[Pagination, Navigation, Autoplay]}
                        className="featured-institute-swiper"
                        breakpoints={{
                          320: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                          },
                          576: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                          },
                          768: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                          },
                          992: {
                            slidesPerView: 4,
                            spaceBetween: 30,
                          },
                          1200: {
                            slidesPerView: 5,
                            spaceBetween: 30,
                          },
                        }}
                      >
                        {featuredInstitutes.map((institute) => (
                          <SwiperSlide key={institute.id}>
                            <div
                              className="featured-institute-card"
                              style={{
                                width: "100%",
                                height: "120px",
                                padding: "10px 0",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "white",
                                margin: "0 auto",
                              }}
                            >
                              <Link
                                to={`/university-details/${institute.school_name
                                  .replace(/\s+/g, "-")
                                  .toLowerCase()}`}
                                target="_parent"
                                rel="noopener noreferrer"
                                onClick={() =>
                                  sessionStorage.setItem(
                                    "schoolId",
                                    institute.school_id
                                  )
                                }
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  textDecoration: "none",
                                  padding: "0 10px",
                                }}
                              >
                                <img
                                  src={`${baseURL}storage/${institute.school_logo}`}
                                  alt={institute.school_name}
                                  className="section-image"
                                  style={{
                                    maxHeight: "80px",
                                    maxWidth: "70%",
                                    objectFit: "contain",
                                    margin: "0 auto",
                                    display: "block",
                                  }}
                                />
                              </Link>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </Container>
                  )}
                  {/* End of Featured institutes */}
                </Container>
              )}
            </Container>
            {Array.isArray(adsImage) && adsImage.length > 0 ? (
              <div className="advertisements-container">
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 5000, disableOnInteraction: false }} // Ensure autoplay is enabled
                  modules={[Pagination, Autoplay]}
                  style={{ padding: "20px 0" }}
                >
                  {adsImage.map((ad, index) => (
                    <SwiperSlide
                      key={ad.id}
                      className="advertisement-item mb-3"
                    >
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
                            objectFit: "fill",
                            marginBottom:
                              index < adsImage.length - 1 ? "20px" : "0",
                          }}
                        />
                      </a>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ) : (
              <img
                src={studypal11}
                alt="Header"
                className="KMI-adverstise-image mt-0"
              />
            )}
          </div>
        ))}
      <div>
        <SpcFooter />
      </div>
    </div>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="error-container"
          style={{
            padding: "2rem",
            textAlign: "center",
            marginTop: "2rem",
          }}
        >
          <h2>Oops! Something went wrong.</h2>
          <p>We're having trouble loading this page. Please try again later.</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#FF6B00",
              color: "white",
              border: "none",
              borderRadius: "4px",
              marginTop: "1rem",
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function KnowMoreInstituteWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <KnowMoreInstitute />
    </ErrorBoundary>
  );
}
