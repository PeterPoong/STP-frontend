import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import NavButtons from "../NavButtons";
import headerImage from "../../../assets/StudentAssets/coursepage image/StudyPal10.png";
import "../../../css/StudentCss/course page css/ApplyPage.css";
import { Container, Row, Col, Collapse, Button, Modal } from "react-bootstrap";
import studypal11 from "../../../assets/StudentAssets/coursepage image/StudyPal11.png";
import studypal12 from "../../../assets/StudentAssets/coursepage image/StudyPal12.jpg";
import Footer from "../Footer";
import SpcFooter from "../../../Components/StudentPortalComp/SpcFooter";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const baseURL = import.meta.env.VITE_BASE_URL;
const courseDetailAPI = `${baseURL}api/student/courseDetail`;

const CourseDetail = () => {
  const [openDescription, setOpenDescription] = useState(false);
  const [openRequirement, setOpenRequirement] = useState(false);
  const [openAboutInstitute, setOpenAboutInstitute] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showAllPhotosModal, setShowAllPhotosModal] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  const [showSwiperModal, setShowSwiperModal] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

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

  const handleKnowMoreClick = (courseID) => {
    if (courseID) {
      navigate(`/courseDetails/${courseID}`);
    } else {
      console.error("Course ID is undefined");
    }
  };
  const handleApplyNow = (courseID) => {
    if (courseID) {
      navigate(`/studentApplyCourses/${courseID}`);
    } else {
      console.error("Course ID is undefined");
    }
  };

  useEffect(() => {
    console.log("Program ID:", id);

    if (!programs || programs.length === 0) {
      fetch(courseDetailAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseID: id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched Course Data:", data);
          if (data && data.data && Array.isArray(data.data)) {
            const selectedProgram = data.find(
              (item) => item.id === parseInt(id)
            );
            console.log("Selected Program:", selectedProgram);
            setPrograms(selectedProgram ? [selectedProgram] : []);
          } else {
            console.error("Invalid data structure:", data);
            setPrograms([data.data]);
          }
        })
        .catch((error) => {
          console.error("Error fetching course data:", error);
          setPrograms([]);
        });
    }

    fetch(`${baseURL}api/student/featuredCourseList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "thirdPage" }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Featured Courses:", data.data);
        if (data && data.success && Array.isArray(data.data)) {
          setFeaturedCourses(data.data);
        } else {
          console.error("Invalid data structure for featured courses:", data);
          setFeaturedCourses([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching featured courses:", error);
        setFeaturedCourses([]);
      });
  }, [id]);

  if (!programs || programs.length === 0) {
    return <p>No program selected. Please go back and choose a program.</p>;
  }

  return (
    <div style={{ backgroundColor: "#F5F4F4" }}>
      <NavButtons />
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
                  md={3}
                  className="d-flex align-items-center justify-content-center position-relative apply-now-image-col"
                >
                  <img
                    src={`${baseURL}storage/${program.logo}`}
                    alt="Program"
                    className="img-fluid img-thumbnail apply-now-program-image"
                    style={{
                      maxWidth: "auto",
                      marginLeft: "30px",
                    }}
                  />
                </Col>

                <Col md={6} className="d-flex align-items-center">
                  <div style={{ paddingBottom: "25px", marginLeft: "30px" }}>
                    <h4>{program.school}</h4>
                    <p>{import.meta.env.VITE_random_Var}</p>
                    <p>
                      <i
                        className="bi bi-geo-alt"
                        style={{ marginRight: "10px", color: "#AAAAAA" }}
                      ></i>{" "}
                      <span style={{ paddingLeft: "10px" }}>
                        {program.location}
                      </span>
                      <a
                        href="https://www.google.com/maps/place/Curtin+University+Malaysia/@4.5143003,114.0152549,17z/data=!3m1!4b1!4m6!3m5!1s0x321f4826b4a6b637:0xe688be6fc8cd1d35!8m2!3d4.5143003!4d114.0178298!16s%2Fm%2F02qj2fj?entry=ttu&g_ep=EgoyMDI0MDgyMS4wIKXMDSoASAFQAw%3D%3D"
                        style={{ paddingLeft: "15px" }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Click and view on map
                      </a>
                    </p>
                  </div>
                </Col>
                <Col
                  md={3}
                  className="d-flex align-items-center justify-content-center"
                >
                  <Button
                    style={{
                      backgroundColor: "#B71A18",
                      border: "none",
                      width: "180px",
                      height: "50px",
                      marginBottom: "20px",
                      marginLeft: "130px",
                    }}
                    onClick={() => handleApplyNow(program.id)} // Ensure you pass the correct course or program ID
                  >
                    Apply Now
                  </Button>
                </Col>
              </Row>

              <div
                className="card mt-3 apply-now-card"
                style={{ paddingLeft: "25px" }}
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
                  <Row style={{ paddingLeft: "50px" }}>
                    <Col md={4}>
                      <div style={{ marginBottom: "10px" }}>
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
                      <div style={{ marginBottom: "10px" }}>
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
                    <Col md={10} className="d-flex align-items-center">
                      <div>
                        <h5 className="card-title">Estimate Fee</h5>
                      </div>
                    </Col>
                    <Col
                      md={2}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <div>
                        <p>
                          <strong>RM </strong>
                          {program.cost}/year
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="card mt-4 apply-now-card">
                <div className="card-body">
                  <Row>
                    <Col md={10} className="d-flex align-items-center">
                      <div>
                        <h5 className="card-title">Course Overview</h5>
                      </div>
                    </Col>
                    <Col md={12}>
                      <p>{program.description}</p>
                      <Collapse in={openDescription}>
                        <div id="collapse-description">
                          {program.description}
                          <p>
                            The purpose of this programme is to produce
                            graduates with in-depth knowledge of Arabic
                            linguistics. From the aspects of national aspiration
                            and global importance, this programme aims to
                            produce graduates who demonstrate those aspects.
                          </p>
                        </div>
                      </Collapse>
                    </Col>
                    <Col className="d-flex justify-content-center">
                      <Button
                        onClick={() => setOpenDescription(!openDescription)}
                        aria-controls="collapse-description"
                        aria-expanded={openDescription}
                        style={{ textDecoration: "none" }}
                        variant="link"
                      >
                        {openDescription ? "View Less" : "View More"}
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="card mt-4 apply-now-card">
                <div className="card-body">
                  <Row>
                    <Col md={10} className="d-flex align-items-center">
                      <div>
                        <h5 className="card-title">Entry Requirement</h5>
                      </div>
                    </Col>
                    <Col md={12}>
                      <p>{program.requirement}</p>

                      <Collapse in={openRequirement}>
                        <div id="collapse-requirement">
                          {program.requirement}
                          <p>
                            The purpose of this programme is to produce
                            graduates with in-depth knowledge of Arabic
                            linguistics. From the aspects of national aspiration
                            and global importance, this programme aims to
                            produce graduates who demonstrate those aspects.
                          </p>
                        </div>
                      </Collapse>
                      <Col className="d-flex justify-content-center">
                        <Button
                          onClick={() => setOpenRequirement(!openRequirement)}
                          aria-controls="collapse-requirement"
                          aria-expanded={openRequirement}
                          style={{ textDecoration: "none" }}
                          variant="link"
                        >
                          {openRequirement ? "View Less" : "View More"}
                        </Button>
                      </Col>
                    </Col>
                  </Row>
                </div>
              </div>
            </Container>
            {/* <img
            src={headerImage}
            alt="Header"
            className="about-institute-image"
          /> */}
            <Container className="my-4 about-institute-container">
              <div
                style={{
                  position: "relative",
                  marginBottom: openAboutInstitute ? "20px" : "0px",
                  marginTop: "10%",
                }}
              >
                {/* Background Image */}
                <div
                  style={{
                    position: "relative",
                    top: 0,
                    left: 0,
                    zIndex: 0,
                    width: "100%",
                    height: openAboutInstitute ? "600px" : "300px",
                    overflow: "hidden",
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
                    width={1457}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      zIndex: 0,
                    }}
                  />

                  {/* Card */}
                  <div
                    className="card  apply-now-card"
                    style={{
                      bottom: -10,
                      width: "100%",
                      margin: "0 auto",
                      zIndex: 1,
                      position: "absolute",

                      // bottom: openAboutInstitute ? "-310px" : "-10px", // Adjust based on height
                      // transition: "bottom 0.5s ease",
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
                          <div style={{ zIndex: 1 }}>
                            <p>{program.description}</p>
                          </div>
                        </Col>
                        <Col md={12}>
                          <Collapse in={openAboutInstitute}>
                            <div
                              id="collapse-about-institute"
                              style={{ zIndex: 1 }}
                            >
                              <p>
                                Having the ability to apply their knowledge and
                                skills as well as communicate well in Arabic
                                would further enable them to contribute at the
                                international stage and realise the features of
                                a Malaysian society as envisioned in Vision
                                2020.
                              </p>
                            </div>
                          </Collapse>
                        </Col>
                        <Col className="d-flex justify-content-center">
                          <Button
                            style={{ textDecoration: "none" }}
                            variant="link"
                            onClick={() =>
                              setOpenAboutInstitute(!openAboutInstitute)
                            }
                            aria-controls="collapse-about-institute"
                            aria-expanded={openAboutInstitute}
                          >
                            {openAboutInstitute ? "View Less" : "View More"}
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Swiper */}
              <div className="image-gallery-course">
                {programs.map((program) =>
                  (Array.isArray(program.schoolPhoto) &&
                  program.schoolPhoto.length > 0
                    ? program.schoolPhoto.slice(0, 5)
                    : [{ id: "default", schoolPhoto: null }]
                  ).map((photo, index) => (
                    <div
                      key={photo.id}
                      style={{
                        display: "inline-block",
                        position: "relative",
                        cursor: "pointer", // Indicates the images are clickable
                      }}
                      onClick={() => openModal(program.schoolPhoto, index)}
                    >
                      <img
                        src={
                          program.schoolPhoto
                            ? `${baseURL}storage/${program.schoolPhoto}`
                            : studypal12
                        }
                        className="gallery-image-courses"
                        alt={photo.schoolMedia_name}
                        width="500"
                        style={{
                          objectFit: "cover",
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
                            backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for emphasis
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
                              height: "100%", // Smooth hover effect
                            }}
                            onMouseOver={(e) =>
                              (e.target.style.color = "#f8f9fa")
                            } // Lighten on hover
                            onMouseOut={(e) => (e.target.style.color = "white")} // Reset on hover out
                          >
                            see more
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}

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
                      backgroundColor: "#B71A18", // Dark background for the Swiper modal
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
                        padding: "20px 0", // Padding to create breathing space for the swiper
                      }}
                    >
                      {selectedPhotos.map((program) => (
                        <SwiperSlide key={program.id}>
                          <img
                            src={
                              program.schoolPhoto
                                ? `${baseURL}storage/${program.schoolPhoto}`
                                : studypal12
                            }
                            className="w-100"
                            alt={`Slide ${program.id}`}
                            style={{
                              objectFit: "contain", // Maintain aspect ratio
                              maxHeight: "70vh", // Prevent image from being too large
                            }}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </Modal.Body>
                </Modal>

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
                      paddingRight: "15px", // Padding for a more spacious feel
                    }}
                  >
                    <div
                      className="image-gallery-course-modal"
                      style={{
                        display: "grid", // Grid layout for image gallery
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(150px, 1fr))", // Responsive grid
                        gridGap: "10px", // Spacing between images
                      }}
                    >
                      {selectedPhotos.map((program) => (
                        <img
                          key={program.id}
                          src={
                            program.schoolPhoto
                              ? `${baseURL}storage/${program.schoolPhoto}`
                              : studypal12
                          }
                          className="gallery-image"
                          alt={program.course}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover", // Ensure images are cropped nicely
                            borderRadius: "4px", // Rounded corners
                            cursor: "pointer", // Add a pointer cursor to indicate it's clickable
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
                          }}
                        />
                      ))}
                    </div>
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
                <Button
                  style={{
                    backgroundColor: "#B71A18",
                    border: "none",
                    width: "180px",
                    height: "50px",
                    marginTop: "20px",
                  }}
                  onClick={() => handleApplyNow(program.id)} // Ensure you pass the correct course or program ID
                >
                  Apply Now
                </Button>
                <Button
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
                </Button>
              </div>

              {/* Featured courses */}
              {featuredCourses.length > 0 && (
                <Container className="my-4">
                  <h4>Featured Courses</h4>
                  <Swiper
                    spaceBetween={30}
                    slidesPerView={5}
                    navigation
                    style={{ padding: "0 50px" }}
                    loop={true}
                    modules={[Pagination, Navigation]}
                    className="featured-courses-swiper"
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
                    {featuredCourses.map((course) => (
                      <SwiperSlide key={course.id}>
                        <div
                          className="featured-course-card"
                          style={{ width: "230px", height: "245px" }}
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
                          </div>
                          <div>
                            <p
                              className="course-school-title"
                              style={{
                                color: "#514E4E",
                                fontSize: "16px",
                                fontWeight: "500",
                                marginBottom: "15px",
                              }}
                            >
                              {course.course_school}
                            </p>
                            <p
                              className="course-title"
                              style={{
                                color: "#B71A18",
                                fontSize: "18px",
                                fontWeight: "500",
                                marginBottom: "15px",
                              }}
                            >
                              {course.course_name}
                            </p>
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
                              onClick={() =>
                                handleKnowMoreClick(
                                  course.id || course.course_id
                                )
                              } // Ensure correct ID is used
                            >
                              {course.knowMoreText || "Know More"}
                            </button>
                            <button
                              className="button-apply-now"
                              onClick={() =>
                                handleApplyNow(course.id || course.course_id)
                              } // Ensure correct ID is used
                            >
                              {course.applyNowText || "Apply Now"}
                            </button>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Container>
              )}
              {/* End of Featured courses */}
            </Container>
          </div>
        ))}
      <img src={studypal11} alt="Header" className="adverstise-image" />
      <div>
        <SpcFooter />
      </div>
    </div>
  );
};

export default CourseDetail;
