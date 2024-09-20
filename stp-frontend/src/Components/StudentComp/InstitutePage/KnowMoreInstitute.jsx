import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NavButtons from "../NavButtons";
import NavButtonsSP from "../../../Components/StudentPortalComp/NavButtonsSP";
import headerImage from "../../../assets/StudentAssets/institute image/StudyPal10.png";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faClock,
  faCalendarAlt,
  faCalendarCheck,
  faLocationDot,
  faSchool,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";

import studypal11 from "../../../assets/StudentAssets/institute image/StudyPal11.png";
import Footer from "../../../Components/StudentComp/Footer";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const baseURL = import.meta.env.VITE_BASE_URL;
const schoolDetailAPIURL = `${baseURL}api/student/schoolDetail`;

const KnowMoreInstitute = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showAllPhotosModal, setShowAllPhotosModal] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

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

  useEffect(() => {
    console.log("Institute ID: ", id);

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
          console.log("Fetched School Detail Data: ", data);
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
        console.log("Fetched Featured Institutes Data: ", data);
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
  }, [id]);

  if (!institutes || institutes.length === 0) {
    return (
      <p>No institute selected. Please go back and choose an institute.</p>
    );
  }

  const handleApplyNow = (program) => {
    navigate("/applynow", { state: { program } }); // Navigate with state
  };

  const handleKnowMoreClick = (id) => {
    navigate(`/knowMoreInstitute/${id}`); // Navigate to CourseDetail with the courseID
  };

  return (
    <div style={{ backgroundColor: "#F5F4F4" }}>
      <NavButtonsSP />
      {Array.isArray(institutes) &&
        institutes.map((institute) => (
          <div key={institute.id}>
            <header className="know-more-masthead">
              <img
                src={`${baseURL}storage/${institute.school_cover.schoolMedia_location}`}
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
                    width="250"
                  />
                </Col>
                <Col xs={12} md={6} className="d-flex align-items-center">
                  <div>
                    <h4>{institute.name}</h4>
                    <Row>
                      <p>
                        <i className="bi bi-geo-alt"></i>
                        <span style={{ paddingLeft: "10px" }}>
                          {institute.city}, {institute.state},{" "}
                          {institute.country}
                        </span>
                        <i
                          className="bi bi-mortarboard"
                          style={{ marginLeft: "30px" }}
                        ></i>
                        <span style={{ paddingLeft: "10px" }}>
                          {institute.category}
                        </span>
                      </p>
                    </Row>
                  </div>
                </Col>
                <Col
                  xs={12}
                  md={3}
                  className="d-flex align-items-center justify-content-center"
                >
                  <Button
                    style={{
                      backgroundColor: "#FF6B00",
                      fontWeight: "lighter",
                      border: "none",
                      width: "180px",
                      height: "50px",
                      marginTop: "20px",
                      marginLeft: "130px",
                    }}
                  >
                    Contact School
                  </Button>
                </Col>
              </Row>

              <div className="image-gallery" style={{ marginTop: "20px" }}>
                {institutes.map((institute) =>
                  institute.school_photo.map((photo, index) => (
                    <div
                      key={photo.id}
                      style={{ display: "inline-block", position: "relative" }}
                      onClick={() => openModal(institute.school_photo, index)}
                    >
                      <img
                        src={`${baseURL}storage/${photo.schoolMedia_location}`}
                        className="gallery-image"
                        alt={`Slide ${photo.id}`}
                      />
                      {index === 4 && (
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
                  <Modal.Header closeButton>
                    <Modal.Title>Image Gallery</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Swiper
                      initialSlide={startIndex}
                      spaceBetween={10}
                      slidesPerView={1}
                      navigation
                      loop={true}
                      pagination={{ clickable: true }}
                      modules={[Navigation, Pagination]}
                    >
                      {selectedPhotos.map((photo) => (
                        <SwiperSlide key={photo.id}>
                          <img
                            src={`${baseURL}storage/${photo.schoolMedia_location}`}
                            className="w-100"
                            alt={`Slide ${photo.id}`}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </Modal.Body>
                </Modal>

                <Modal
                  show={showAllPhotosModal}
                  onHide={handleCloseAllPhotosModal}
                  size="lg"
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title>All Photos</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="image-gallery-institute-modal">
                      {selectedPhotos.map((photo) => (
                        <img
                          key={photo.id}
                          src={`${baseURL}storage/${photo.schoolMedia_location}`}
                          className="gallery-image"
                          alt={photo.schoolMedia_name}
                          style={{
                            margin: "5px",
                            display: "inline-block",
                          }}
                        />
                      ))}
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={handleCloseAllPhotosModal}
                    >
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>

              <div className="card mt-4 know-more-card">
                <div className="card-body">
                  <Row>
                    <Col md={10} className="d-flex align-items-center">
                      <div>
                        <h5 className="card-title">Course Overview</h5>
                      </div>
                    </Col>
                    <Col md={12}>
                      <Collapse in={open}>
                        <div>
                          <p>{institute.short_description}</p>
                        </div>
                      </Collapse>
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
                <div className="card-body" style={{ height: "250px" }}>
                  <Row>
                    <Col md={12}>
                      <div className="map-responsive">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15909.76315163879!2d114.0178298!3d4.5143003!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x321f4826b4a6b637%3A0xe688be6fc8cd1d35!2sCurtin%20University%20Malaysia!5e0!3m2!1sen!2smy!4v1723620924688!5m2!1sen!2smy"
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              <Row className="d-flex flex-wrap">
                <Col xs={6} sm={6} md={6} className="d-flex">
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
                            style={{ paddingLeft: "20px", fontSize: "2rem" }}
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
                            {institute.category}
                          </h5>
                        </div>
                      </Row>
                    </div>
                  </div>
                </Col>

                <Col xs={6} sm={6} md={6} className="d-flex">
                  <div className="card mt-4 intake-period-card w-100">
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
                              Intake Period
                            </h6>
                          </div>
                        </Col>
                        <div>
                          <i
                            className="bi bi-book"
                            style={{ paddingLeft: "20px", fontSize: "2rem" }}
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
                            {institute.intake && institute.intake.length > 0
                              ? institute.intake.join(", ")
                              : "N/A"}
                          </h5>
                        </div>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>

            {/* <img
              src={`${baseURL}storage/${institute.school_cover.schoolMedia_location}`}
              alt="Header"
              className="about-institute-image"
            /> */}

            <Container className="my-4 about-institute-container">
              <div
                style={{
                  position: "relative",
                  top: 0,
                  left: 0,
                  zIndex: 0,
                  marginBottom: openAbout ? "20px" : "0px",
                  marginTop: "10%",
                  overflow: "hidden",
                  transition: "height 0.5s ease",
                }}
              >
                {/* Background Image */}
                <div
                  style={{
                    position: "relative", // Position the background image absolutely
                    top: 0,
                    left: 0,
                    zIndex: 0, // Behind other elements
                    width: "100%", // Set width to 1457px
                    height: openAbout ? "600px" : "300px", // Adjust height as needed
                    overflow: "hidden",
                    transition: "height 0.5s ease", // Smooth transition for height
                  }}
                >
                  <img
                    src={`${baseURL}storage/${institute.school_cover.schoolMedia_location}`}
                    alt="Header"
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
                    className="card know-more-card"
                    style={{
                      bottom: -10,
                      width: "100%", // Set the card's width to a percentage or specific px value
                      margin: "0 auto", // Center the card horizontally
                      position: "absolute",
                      zIndex: 1, // Ensure it appears above the background image
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
                          <div style={{ zIndex: 1 }}>
                            <p>{institute.long_description}</p>
                          </div>
                        </Col>
                        <Col md={12}>
                          <Collapse in={openAbout}>
                            <div style={{ zIndex: 1 }}>
                              <p>
                                The purpose of this programme is to produce
                                graduates with in-depth knowledge of Arabic
                                linguistics. From the aspects of national
                                aspiration and global importance, this programme
                                aims to produce graduates who demonstrate those
                                aspects.
                              </p>
                            </div>
                          </Collapse>
                        </Col>
                        <Col className="d-flex justify-content-center">
                          <Button
                            style={{ textDecoration: "none" }}
                            variant="link"
                            onClick={() => setOpenAbout(!openAbout)}
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

              {/* Contact School Button */}
              <div className="d-flex justify-content-center">
                <Button
                  style={{
                    fontWeight: "lighter",

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

              {/* Course Offered List */}
              {courses.length > 0 && (
                <Container className="my-4">
                  <h4>Courses Offered</h4>
                  {courses.slice(0, 1).map((course) => (
                    <div className="card mt-3" key={course.id}>
                      <div className="card-body d-flex flex-column flex-md-row align-items-start">
                        <Row className="w-100">
                          <Col md={6} lg={6}>
                            <div className="card-image mb-3 mb-md-0">
                              <h5
                                className="card-title"
                                style={{
                                  paddingLeft: "20px",
                                  backgroundColor: "#efefef",
                                }}
                              >
                                <a
                                  style={{ color: "black" }}
                                  href={`/courseDetails/${course.id}`}
                                >
                                  {course.course_name}
                                </a>
                              </h5>
                              <div className="d-flex align-items-center">
                                <div style={{ paddingLeft: "20px" }}>
                                  <img
                                    src={`${baseURL}storage/${
                                      course.course_logo || institute.logo
                                    }`}
                                    alt={institute.name}
                                    width="100"
                                  />
                                </div>
                                <div style={{ paddingLeft: "30px" }}>
                                  <h5 className="card-text">
                                    {institute.name}
                                  </h5>
                                  <i className="bi bi-geo-alt"></i>
                                  <span style={{ paddingLeft: "10px" }}>
                                    {institute.city}, {institute.state}
                                  </span>
                                  <a
                                    href="#"
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
                            <div className="d-flex flex-grow-1 justify-content-between">
                              <div className="details-div">
                                <div className="d-flex align-items-center flex-wrap">
                                  <Col>
                                    <div>
                                      <Row style={{ paddingTop: "20px" }}>
                                        <div>
                                          <i
                                            className="bi bi-mortarboard"
                                            style={{ marginRight: "10px" }}
                                          ></i>
                                          <span style={{ paddingLeft: "20px" }}>
                                            {course.qualification}
                                          </span>
                                        </div>
                                        <div>
                                          <i
                                            className="bi bi-calendar-check"
                                            style={{ marginRight: "10px" }}
                                          ></i>
                                          <span style={{ paddingLeft: "20px" }}>
                                            {course.study_mode}
                                          </span>
                                        </div>
                                        <div>
                                          <i
                                            className="bi bi-clock"
                                            style={{ marginRight: "10px" }}
                                          ></i>{" "}
                                          <span style={{ paddingLeft: "20px" }}>
                                            {course.course_period}
                                          </span>
                                        </div>
                                        <div>
                                          <i
                                            className="bi bi-calendar2-week"
                                            style={{ marginRight: "10px" }}
                                          ></i>
                                          <span style={{ paddingLeft: "20px" }}>
                                            {course.course_intake}
                                          </span>
                                        </div>
                                      </Row>
                                    </div>
                                  </Col>
                                </div>
                              </div>
                              <div className="fee-apply">
                                <div
                                  className="fee-info text-right"
                                  style={{ marginTop: "25px" }}
                                >
                                  <p>Estimate fee</p>
                                  <span>
                                    <strong>RM </strong>
                                    {course.course_cost}
                                  </span>
                                </div>
                                <div className="apply-button mt-3">
                                  <button
                                    className="featured"
                                    onClick={() => handleApplyNow(course)}
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
                  {courses.length > 1 && (
                    <>
                      <Collapse in={openCourses}>
                        <div id="collapse-courses">
                          {courses.slice(1).map((course) => (
                            <div className="card mt-3" key={course.id}>
                              <div className="card-body d-flex flex-column flex-md-row align-items-start">
                                <Row className="w-100">
                                  <Col md={6} lg={6}>
                                    <div className="card-image mb-3 mb-md-0">
                                      <h5
                                        className="card-title"
                                        style={{
                                          paddingLeft: "20px",
                                          backgroundColor: "#efefef",
                                        }}
                                      >
                                        <a
                                          style={{ color: "black" }}
                                          href={`/courseDetails/${course.id}`}
                                        >
                                          {course.course_name}
                                        </a>
                                      </h5>
                                      <div className="d-flex align-items-center">
                                        <div style={{ paddingLeft: "20px" }}>
                                          <img
                                            src={`${baseURL}storage/${
                                              course.course_logo ||
                                              institute.logo
                                            }`}
                                            alt={institute.name}
                                            width="100"
                                          />
                                        </div>
                                        <div style={{ paddingLeft: "30px" }}>
                                          <h5 className="card-text">
                                            {institute.name}
                                          </h5>
                                          <i className="bi bi-geo-alt"></i>
                                          <span style={{ paddingLeft: "10px" }}>
                                            {institute.city}, {institute.state}
                                          </span>
                                          <a
                                            href="#"
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
                                    <div className="d-flex flex-grow-1 justify-content-between">
                                      <div className="details-div">
                                        <div className="d-flex align-items-center flex-wrap">
                                          <Col>
                                            <div>
                                              <Row
                                                style={{ paddingTop: "20px" }}
                                              >
                                                <div>
                                                  <i
                                                    className="bi bi-mortarboard"
                                                    style={{
                                                      marginRight: "10px",
                                                    }}
                                                  ></i>
                                                  <span
                                                    style={{
                                                      paddingLeft: "20px",
                                                    }}
                                                  >
                                                    {course.qualification}
                                                  </span>
                                                </div>
                                                <div>
                                                  <i
                                                    className="bi bi-calendar-check"
                                                    style={{
                                                      marginRight: "10px",
                                                    }}
                                                  ></i>
                                                  <span
                                                    style={{
                                                      paddingLeft: "20px",
                                                    }}
                                                  >
                                                    {course.study_mode}
                                                  </span>
                                                </div>
                                                <div>
                                                  <i
                                                    className="bi bi-clock"
                                                    style={{
                                                      marginRight: "10px",
                                                    }}
                                                  ></i>
                                                  <span
                                                    style={{
                                                      paddingLeft: "20px",
                                                    }}
                                                  >
                                                    {course.course_period}
                                                  </span>
                                                </div>
                                                <div>
                                                  <i
                                                    className="bi bi-calendar2-week"
                                                    style={{
                                                      marginRight: "10px",
                                                    }}
                                                  ></i>
                                                  <span
                                                    style={{
                                                      paddingLeft: "20px",
                                                    }}
                                                  >
                                                    {course.course_intake}
                                                  </span>
                                                </div>
                                              </Row>
                                            </div>
                                          </Col>
                                        </div>
                                      </div>
                                      <div className="fee-apply">
                                        <div
                                          className="fee-info text-right"
                                          style={{ marginTop: "25px" }}
                                        >
                                          <p>Estimate fee</p>
                                          <span>
                                            <strong>RM </strong>
                                            {course.course_cost}
                                          </span>
                                        </div>
                                        <div className="apply-button mt-3">
                                          <button
                                            className="featured"
                                            onClick={() =>
                                              handleApplyNow(course)
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
                        </div>
                      </Collapse>
                      <Col className="d-flex justify-content-center">
                        <Button
                          onClick={() => setOpenCourses(!openCourses)}
                          aria-controls="collapse-courses"
                          aria-expanded={openCourses}
                          style={{
                            marginTop: "20px",
                            textDecoration: "none",
                            backgroundColor: "#B71A18",
                            borderColor: "#B71A18",
                            width: "200px",
                            padding: "10px 20px",
                            borderRadius: "5px",
                            color: "white",
                          }}
                        >
                          {openCourses
                            ? "Hide More Courses"
                            : "View More Courses"}
                        </Button>
                      </Col>
                    </>
                  )}
                  {/* Render featured institutes */}
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
                              <div style={{ position: "relative" }}>
                                {institute.institute_qualification && (
                                  <span
                                    className="badge"
                                    style={{ fontSize: "16px" }}
                                  >
                                    {institute.institute_qualification.toUpperCase()}
                                  </span>
                                )}
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
                              </div>
                              <div>
                                <p
                                  className="institute-title"
                                  style={{
                                    color: "#514E4E",
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    marginBottom: "15px",
                                  }}
                                >
                                  {institute.school_name}
                                </p>
                                <p
                                  className="featured-type"
                                  style={{
                                    color: "#B71A18",
                                    fontSize: "18px",
                                    fontWeight: "500",
                                    marginBottom: "15px",
                                  }}
                                >
                                  {institute.featured_type}
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
                                    {institute.location}
                                  </span>
                                </div>
                              </div>
                              <div className="d-flex justify-content-center">
                                <button
                                  className="button-know-more"
                                  onClick={() =>
                                    navigate(
                                      `/knowMoreInstitute/${institute.id}`
                                    )
                                  }
                                >
                                  {institute.knowMoreText || "Know More"}
                                </button>
                                <button
                                  className="button-apply-now"
                                  onClick={() =>
                                    navigate(
                                      `/studentApplyCourse/${institute.school_id}`
                                    )
                                  }
                                >
                                  {institute.applyNowText || "Apply Now"}
                                </button>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </Container>
                  )}
                </Container>
              )}
              <img src={studypal11} alt="Header" className="adverstise-image" />
            </Container>
          </div>
        ))}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default KnowMoreInstitute;
