import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NavButtons from "../NavButtons";
import headerImage from "../../../assets/StudentAssets/institute image/StudyPal10.png";
import "../../../css/StudentCss/institutepage css/KnowMoreInstitute.css";
import { Container, Row, Col, Button, Collapse, Card } from "react-bootstrap";
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

import studypal1 from "../../../assets/StudentAssets/institute image/StudyPal1.png";
import studypal2 from "../../../assets/StudentAssets/institute image/StudyPal2.png";
import studypal3 from "../../../assets/StudentAssets/institute image/StudyPal3.png";
import studypal4 from "../../../assets/StudentAssets/institute image/StudyPal4.png";
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
  const [open, setOpen] = useState(false);
  const [openCourses, setOpenCourses] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [courses, setCourses] = useState([]);

  const { id } = useParams();
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

  return (
    <div style={{ backgroundColor: "#F5F4F4" }}>
      <NavButtons />
      <header className="know-more-masthead">
        <img
          src={headerImage}
          alt="Header"
          className="know-more-header-image"
        />
      </header>
      {Array.isArray(institutes) &&
        institutes.map((institute) => (
          <>
            <Container key={institute.id} className="my-4 know-more-container">
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
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span style={{ paddingLeft: "10px" }}>
                          {institute.city}, {institute.state},{" "}
                          {institute.country}
                        </span>
                        <FontAwesomeIcon
                          icon={faGraduationCap}
                          style={{ paddingLeft: "20px" }}
                        />
                        <span style={{ paddingLeft: "10px" }}>
                          {institute.category}
                        </span>
                        {/* <a
                          href="https://maps.google.com"
                          style={{ paddingLeft: "15px" }}
                        >
                          Click and view on map
                        </a> */}
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
                      fontWeight: "bold",
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
                <img src={studypal1} className="gallery-image" alt="Slide 1" />
                <img src={studypal2} className="gallery-image" alt="Slide 2" />
                <img src={studypal3} className="gallery-image" alt="Slide 3" />
                <img src={studypal4} className="gallery-image" alt="Slide 4" />
                <img src={studypal1} className="gallery-image" alt="Slide 1" />
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
                          <FontAwesomeIcon
                            icon={faGraduationCap}
                            style={{ paddingLeft: "20px" }}
                            className="icon-lg"
                          />
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
                          <FontAwesomeIcon
                            icon={faBookOpen}
                            style={{ paddingLeft: "20px" }}
                            className="icon-lg"
                          />
                        </div>
                        <div>
                          <h5
                            style={{
                              paddingTop: "10px",
                              fontStyle: "italic",
                              color: "#514E4E",
                            }}
                          >
                            {Array.isArray(institute.intakes)
                              ? institute.intakes.join(", ")
                              : "N/A"}
                          </h5>
                        </div>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
            <img
              src={headerImage}
              alt="Header"
              className="about-institute-image"
            />
            <Container className="my-4 about-institute-container">
              <div className="card mt-4 know-more-card">
                <div className="card-body" style={{ padding: "50px" }}>
                  <Row>
                    <Col md={10} className="d-flex align-items-center">
                      <div>
                        <h5 className="card-title">About {institute.name}</h5>
                      </div>
                    </Col>
                    <div>
                      <p>{institute.long_description}</p>
                    </div>
                    <Col md={12}>
                      <Collapse in={openAbout}>
                        <div>
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
              <div className="d-flex justify-content-center">
                <Button
                  style={{
                    backgroundColor: "#FF6B00",
                    border: "none",
                    width: "180px",
                    height: "50px",
                    marginTop: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Contact School
                </Button>
              </div>

              {/*Course Offered List */}
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
                                  href={`/applyDetail/${course.id}`}
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
                                  <FontAwesomeIcon icon={faLocationDot} />
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
                                          <FontAwesomeIcon
                                            icon={faGraduationCap}
                                          />
                                          <span style={{ paddingLeft: "20px" }}>
                                            {course.qualification_id}
                                          </span>
                                        </div>
                                        <div>
                                          <FontAwesomeIcon
                                            icon={faCalendarCheck}
                                          />
                                          <span style={{ paddingLeft: "20px" }}>
                                            {course.study_mode}
                                          </span>
                                        </div>
                                        <div>
                                          <FontAwesomeIcon icon={faClock} />
                                          <span style={{ paddingLeft: "20px" }}>
                                            {course.course_period}
                                          </span>
                                        </div>
                                        <div>
                                          <FontAwesomeIcon
                                            icon={faCalendarAlt}
                                          />
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
                                          href={`/applyDetail/${course.id}`}
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
                                          <FontAwesomeIcon
                                            icon={faLocationDot}
                                          />
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
                                                  <FontAwesomeIcon
                                                    icon={faGraduationCap}
                                                  />
                                                  <span
                                                    style={{
                                                      paddingLeft: "20px",
                                                    }}
                                                  >
                                                    {course.qualification_id}
                                                  </span>
                                                </div>
                                                <div>
                                                  <FontAwesomeIcon
                                                    icon={faCalendarCheck}
                                                  />
                                                  <span
                                                    style={{
                                                      paddingLeft: "20px",
                                                    }}
                                                  >
                                                    {course.study_mode}
                                                  </span>
                                                </div>
                                                <div>
                                                  <FontAwesomeIcon
                                                    icon={faClock}
                                                  />
                                                  <span
                                                    style={{
                                                      paddingLeft: "20px",
                                                    }}
                                                  >
                                                    {course.course_period}
                                                  </span>
                                                </div>
                                                <div>
                                                  <FontAwesomeIcon
                                                    icon={faCalendarAlt}
                                                  />
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
                        slidesPerView={2}
                        navigation
                        pagination={{ clickable: true }}
                        loop={true}
                        modules={[Pagination, Navigation]}
                        className="featured-institute-swiper"
                      >
                        {featuredInstitutes.map((institute) => (
                          <SwiperSlide key={institute.id}>
                            <Card className="featured-institute-card">
                              <Card.Body>
                                <Card.Title>
                                  Institute ID: {institute.school_id}
                                </Card.Title>
                                <Card.Text>
                                  Featured Type: {institute.featured_type}
                                </Card.Text>
                                {/* Add any additional details you want to display */}
                                <a
                                  href={`/knowMoreInstitute/${institute.school_id}`}
                                  className="btn btn-primary"
                                  style={{
                                    borderColor: "#B71A18",
                                    backgroundColor: "#B71A18",
                                  }}
                                >
                                  View Details
                                </a>
                              </Card.Body>
                            </Card>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </Container>
                  )}
                  <img
                    src={studypal11}
                    alt="Header"
                    className="adverstise-image"
                  />
                </Container>
              )}
            </Container>
          </>
        ))}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default KnowMoreInstitute;
