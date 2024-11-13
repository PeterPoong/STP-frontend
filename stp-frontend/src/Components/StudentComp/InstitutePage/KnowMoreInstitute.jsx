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
import "../../../css/StudentCss/course page css/SearchCourse.css"
import studypal11 from "../../../assets/StudentAssets/institute image/StudyPal11.png";
import Footer from "../../../Components/StudentComp/Footer";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

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

  const handleContentHeight = () => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  };

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
    // Fetch school detail if institutes are not loaded
    if (!institutes || institutes.length === 0) {
      fetch(`${baseURL}api/student/schoolDetail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log("Fetched School Detail Data: ", data);
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
        })
        .catch((error) => {
          console.error("Error fetching school detail data: ", error);
          setInstitutes([]);
        });
    }

    // Fetch featured institutes with type "thirdPage"
    fetch(`${baseURL}api/student/featuredInstituteList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "thirdPage", // Use the required type value
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //    console.log("Fetched Featured Institutes Data: ", data);
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
  }, [id]);


  if (!institutes || institutes.length === 0) {
    return (
      <div className="spinner-container">
        <div className="custom-spinner"></div>
      </div>
    );
  }

  const handleKnowMoreClick = (id) => {
    navigate(`/knowMoreInstitute/${id}`); // Navigate to CourseDetail with the courseID
  };

  const handleApplyNow = (program, institute) => {
    //  console.log("Program object:", program);
    navigate(`/studentApplyCourses/${program.id}`, {
      state: {
        programId: program.id,
        schoolLogoUrl: `${import.meta.env.VITE_BASE_URL}storage/${program.course_logo || program.logo
          }`,
        schoolName: institute.name,
        courseName: program.course_name,
      },
    });
  };

  const handleContactSchool = (email) => {
    if (email) {
      // Remove any semicolons or other potential invalid characters
      const cleanEmail = email.replace(/[;,\s]+$/, '');
      window.location.href = `mailto:${cleanEmail}`;
    } else {
      alert('School email is not available at the moment.');
    }
  };



  return (
    <div style={{ backgroundColor: "#F5F4F4" }}>
      <NavButtonsSP />
      {Array.isArray(institutes) &&
        institutes.map((institute) => (
          <div key={institute.id}>
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
                  <div style={{ marginLeft: "15px", marginTop: "15px" }}>
                    <h4>{institute.name}</h4>
                    <p>
                      <i className="bi bi-geo-alt"></i>
                      <span style={{ paddingLeft: "10px" }}>
                        {institute.city}, {institute.state}, {institute.country}
                      </span>
                      <i
                        className="bi bi-mortarboard"
                        style={{ marginLeft: "30px" }}
                      ></i>
                      <span style={{ paddingLeft: "10px" }}>
                        {institute.category}
                      </span>
                    </p>
                  </div>
                </Col>
                <Col
                  xs={12}
                  md={3}
                  className="d-flex align-items-center justify-content-center justify-content-md-end"
                >
                  <Button
                    onClick={() => handleContactSchool("institute.school_email")}
                    style={{
                      backgroundColor: "#FF6B00",
                      border: "none",
                      width: "100%",
                      maxWidth: "180px",
                      height: "50px",
                      marginTop: "20px",
                    }}
                  >
                    Contact School
                  </Button>
                </Col>
              </Row>

              {/* Image Swiper */}
              <div className="image-gallery" style={{ marginTop: "20px" }}>
                {institutes.map((institute) =>
                  // Check if school_photo exists, otherwise use studypal12
                  (institute.school_photo && institute.school_photo.length > 0
                    ? institute.school_photo.slice(0, 5)
                    : [{ id: "default", schoolMedia_location: null }]
                  ) // Use a placeholder with default image
                    .map((photo, index) => (
                      <div
                        key={photo.id}
                        style={{
                          display: "inline-block",
                          position: "relative",
                        }}
                        onClick={() => openModal(institute.school_photo, index)}
                      >
                        <img
                          src={
                            photo.schoolMedia_location
                              ? `${baseURL}storage/${photo.schoolMedia_location}`
                              : studypal12 // Use studypal12 as the default image if schoolMedia_location is not available
                          }
                          className="gallery-image"
                          alt={`Slide ${photo.id}`}
                          width="500"
                          style={{ objectFit: "cover" }}
                        />
                        {index === 4 && institute.school_photo.length > 5 && (
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
                                handleShowMore(institute.school_photo);
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
                    ))
                )}
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
                      navigation
                      loop={true}
                      pagination={{ clickable: true }}
                      modules={[Navigation, Pagination]}
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
                              marginBottom: "2rem"
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
                    <div
                      className="image-gallery-institute-modal"
                    >
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
                        selectedPhotos={selectedPhotos.map(photo => photo.schoolMedia_location)}
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
                      modules={[Navigation, Pagination]}
                      initialSlide={activePhotoIndex} // Start Swiper on the clicked photo
                      spaceBetween={30} // Space between slides
                      slidesPerView={1} // Show one photo at a time
                      navigation
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
                      {!open ? (
                        <div id="collapse-course-overview" className="student-knowmoreinsti-wordbreak">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: institute.short_description,
                            }}
                          />
                        </div>
                      ) : (
                        <Collapse in={open}>
                          {/* <div>
                          <p>{institute.short_description}</p>
                        </div> */}
                          <div id="collapse-course-overview" >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: institute.short_description,
                              }}
                            />
                          </div>
                        </Collapse>
                      )}
                    </Col>
                    <Col className="d-flex justify-content-center">
                      <Button
                        style={{ textDecoration: "none" }}
                        variant="link"
                        onClick={() => setOpen(!open)}
                        aria-controls="collapse-course-overview"
                        aria-expanded={open}
                      >
                        {open ? "View Less" : "View More"}
                      </Button>
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
                            {/*{institute.category}*/} {institute.number_courses} Courses
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
                              alignSelf: "center" // Adjust as per your container height
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
                <div style={{
                  position: "relative",
                  top: 0,
                  left: 0,
                  zIndex: 0,
                  borderRadius: '1rem',
                  width: "100%",
                  height: openAbout ? `${contentHeight + 500}px` : "25rem", // Add padding for other elements
                  overflow: "hidden",
                  transition: "height 0.5s ease",
                }}>
                  {/* Image with zoom effect */}
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: openAbout ? "20rem" : "100%", // This creates the partial reveal effect
                    transition: "height 0.5s ease",
                  }}>
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
                            <h5 className="card-title">About {institute.name}</h5>
                          </div>
                        </Col>
                        <Col md={12}>
                          <div
                            ref={contentRef}
                            style={{
                              zIndex: 1,
                              maxHeight: openAbout ? "none" : "100px",
                              overflow: "hidden",
                              transition: "max-height 0.5s ease",
                            }}
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: institute.long_description,
                              }}
                            />
                          </div>
                        </Col>
                        <Col className="d-flex justify-content-center">
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
                              // Add a small delay to ensure the content is rendered before measuring
                              setTimeout(() => {
                                handleContentHeight();
                              }, 0);
                            }}
                            aria-controls="collapse-about-institute"
                            aria-expanded={openAbout}
                          >
                            {openAbout ? "View Less" : "View More"}
                          </Button>
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
                              <h5
                                className="card-title knowmoreinstitute-cardtitle-courselist"

                              >
                                <a
                                  style={{ color: "black" }}
                                  href={`/courseDetails/${course.id}`}
                                >
                                  {course.course_name}
                                </a>
                              </h5>
                              <div className="d-flex align-items-center knowmoreinstitute-cardtitle-courselist-name">
                                <div className="knowmoreinstitute-cardtitle-courselist-img">
                                  <img
                                    src={`${baseURL}storage/${course.course_logo || institute.logo
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
                                  {/*<a
                                    href="#"
                                    className="map-link"
                                    style={{ paddingLeft: "5px" }}
                                  >
                                    click and view on map
                                  </a>*/}
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col md={6} lg={6}>
                            <div className="d-flex flex-grow-1 justify-content-between knowmoreinstitute-cardtitle-courselist-list" >
                              <div className="details-div">
                                <div className="d-flex align-items-center flex-wrap">
                                  <Col>
                                    <div>
                                      <Row style={{ paddingTop: "20px" }}>
                                        <div className="knowmoreinstitute-dflex-center" >
                                          <i
                                            className="bi bi-mortarboard"
                                            style={{ marginRight: "10px" }}
                                          ></i>
                                          <p style={{ paddingLeft: "20px" }}>
                                            {course.qualification}
                                          </p>
                                        </div>
                                        <div style={{ marginTop: "10px" }} className="knowmoreinstitute-dflex-center">
                                          <i
                                            className="bi bi-calendar-check"
                                            style={{ marginRight: "10px" }}
                                          ></i>
                                          <p style={{ paddingLeft: "20px" }} >
                                            {course.study_mode}
                                          </p>
                                        </div>
                                        <div style={{ marginTop: "10px" }} className="knowmoreinstitute-dflex-center">
                                          <i
                                            className="bi bi-clock"
                                            style={{ marginRight: "10px" }}
                                          ></i>{" "}
                                          <p style={{ paddingLeft: "20px" }} >
                                            {course.course_period}
                                          </p>
                                        </div>
                                        <div
                                          style={{
                                            marginTop: "10px",
                                            display: "flex",
                                          }}
                                          className="knowmoreinstitute-dflex-center"
                                        >
                                          <i
                                            className="bi bi-calendar2-week"
                                            style={{ marginRight: "10px" }}
                                          ></i>
                                          <p style={{ paddingLeft: "20px" }}>
                                            {Array.isArray(course.course_intake)
                                              ? course.course_intake.join(", ")
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
                                      {course.course_cost === "0" || course.course_cost === "RM0.00" ? (
                                        "N/A"
                                      ) : (
                                        <>
                                          <strong>RM </strong> {course.course_cost}
                                        </>
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
                          marginTop: "20px",
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
                      <Swiper
                        spaceBetween={30}
                        slidesPerView={5}
                        navigation
                        style={{ padding: "0 50px" }}
                        loop={true}
                        modules={[Pagination, Navigation]}
                        className="featured-institute-swiper"
                        breakpoints={{
                          640: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                          },
                          768: {
                            slidesPerView: 2,
                            spaceBetween: 15,
                          },
                          1024: {
                            slidesPerView: 5,
                            spaceBetween: 10,
                          },
                        }}
                      >
                        {featuredInstitutes.map((institute) => (
                          <SwiperSlide key={institute.id}>
                            <div
                              className="featured-institute-card"
                              style={{ width: "230px", height: "245px" }}
                            >
                              {/* Wrap the image inside a Link for navigation */}
                              <Link
                                to={`/knowMoreInstitute/${institute.school_id}`}
                                target="_parent"
                                rel="noopener noreferrer"
                              >
                                <img
                                  src={`${baseURL}storage/${institute.school_logo}`}
                                  alt={institute.school_name}
                                  className="section-image"
                                  style={{
                                    height: "80px",
                                    width: "150px",
                                    objectFit: "contain",
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

              {Array.isArray(adsImage) && adsImage.length > 0 ? (
                <div className="advertisements-container">
                  {adsImage.map((ad, index) => (
                    <div key={ad.id} className="advertisement-item mb-3">
                      <a
                        href={ad.banner_url.startsWith('http') ? ad.banner_url : `https://${ad.banner_url}`}
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
                            marginBottom: index < adsImage.length - 1 ? "20px" : "0"
                          }}
                        />
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <img src={studypal11} alt="Header" className="KMI-adverstise-image" />
              )}
            </Container>
          </div>
        ))
      }
      <div>
        <SpcFooter />
      </div>
    </div >
  );
};

export default KnowMoreInstitute;
