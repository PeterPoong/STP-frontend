import React from "react";
import { useLocation } from "react-router-dom";
import NavButtons from "../NavButtons";
import headerImage from "../../../assets/student asset/institute image/StudyPal10.png";
import "../../../css/student css/institutepage css/KnowMoreInstitute.css";
import { Container, Row, Col, Button, Carousel } from "react-bootstrap";
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

import studypal1 from "../../../assets/student asset/institute image/StudyPal1.png";
import studypal2 from "../../../assets/student asset/institute image/StudyPal2.png";
import studypal3 from "../../../assets/student asset/institute image/StudyPal3.png";
import studypal4 from "../../../assets/student asset/institute image/StudyPal4.png";
import studypal11 from "../../../assets/student asset/institute image/StudyPal11.png";
// import Footer from "../Components/student components/Footer";
import Footer from "../../../Components/student components/Footer";
import image1 from "../../../assets/student asset/institute image/image1.jpg";
import image7 from "../../../assets/student asset/institute image/image7.png";
import image5 from "../../../assets/student asset/institute image/image5.jpg";

const KnowMoreInstitute = () => {
  const location = useLocation();
  const { program } = location.state || {};

  if (!program) {
    return <p>No program selected. Please go back and choose a program.</p>;
  }
  const filteredPrograms = [
    {
      image: image1,
      title: "Degree of Business Management",
      university: "Swinburne University (Sarawak)",
      location: "Sarawak",
      enrollment: "Full time",
      duration: "30 months",
      intakes: ["January", "July", "September"],
      fee: "RM 28,000",
    },
    {
      image: image7,
      title: "Degree of Multimedia Computing",
      university: "Curtin University (Sarawak)",
      location: "Sarawak",
      enrollment: "Full time",
      duration: "30 months",
      intakes: ["January", "July"],
      fee: "RM 27,000",
    },
    {
      image: image5,
      title: "Degree of Advance Information Technology",
      university: "Universiti Teknikal Malaysia Melaka",
      location: "Melaka",
      enrollment: "Full time",
      duration: "28 months",
      intakes: ["January", "July", "September"],
      fee: "RM 27,000",
    },
    {
      image: image1,
      title: "Degree of Medicine",
      university: "Swinburne University (Sarawak)",
      location: "Sarawak",
      enrollment: "Full time",
      duration: "28 months",
      intakes: ["January", "July", "September"],
      fee: "RM 27,000",
    },
    {
      image: image1,
      title: "Degree of Computer Science",
      university: "Swinburne University (Sarawak)",
      location: "Sarawak",
      enrollment: "Full time",
      duration: "28 months",
      intakes: ["January", "July", "September"],
      fee: "RM 27,000",
    },
    {
      image: image1,
      title: "Degree of Advance Information Technology",
      university: "Swinburne University (Sarawak)",
      location: "Sarawak",
      enrollment: "Full time",
      duration: "28 months",
      intakes: ["January", "July", "September"],
      fee: "RM 27,000",
    },
  ];

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
      <Container className="my-4 know-more-container">
        <Row className="know-more-row no-gutters">
          <Col
            md={3}
            className="d-flex align-items-center justify-content-center position-relative know-more-image-col"
          >
            <img
              src={program.image}
              alt="Program"
              className="img-fluid img-thumbnail know-more-program-image"
            />
          </Col>
          <Col md={6} className="d-flex align-items-center">
            <div style={{ paddingBottom: "25px" }}>
              <h4>{program.university}</h4>
              <p>
                <FontAwesomeIcon icon={faLocationDot} />
                <span style={{ paddingLeft: "10px" }}>{program.location}</span>
                <a
                  href="https://maps.google.com"
                  style={{ paddingLeft: "15px" }}
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
              }}
            >
              {program.school}
            </Button>
          </Col>
        </Row>

        <Carousel className="random-images-carousel">
          <Carousel.Item>
            <img className="d-block w-100" src={studypal1} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={studypal2} alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={studypal3} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={studypal4} alt="First slide" />
          </Carousel.Item>
          {/* <Carousel.Item>
            <div className="d-block w-100 text-center bg-dark">
              <Button variant="light" href="your-link-here">
                See More
              </Button>
            </div>
          </Carousel.Item> */}
        </Carousel>

        <div className="card mt-4 know-more-card">
          <div className="card-body">
            <Row>
              <Col md={10} className="d-flex align-items-center">
                <div>
                  <h5 className="card-title">Course Overview</h5>
                </div>
              </Col>
              <div>
                <p>
                  The purpose of this programme is to produce graduates with
                  in-depth knowledge of Arabic linguistics. From the aspects of
                  national aspiration and global importance, this programme aims
                  to produce graduates who demonstrate those aspects.
                </p>
                <p>
                  Having the ability to apply their knowledge and skills as well
                  as communicate well in Arabic would further enable them to
                  contribute at the international stage and realise the features
                  of a Malaysian society as envisioned in Vision 2020.
                </p>
              </div>
              <Col className="d-flex justify-content-center">
                <Button
                  style={{ textDecoration: "none" }}
                  variant="link"
                  href="https://www.example.com"
                >
                  View More{" "}
                </Button>
              </Col>
            </Row>
          </div>
        </div>
        <div className="card mt-4 know-more-card">
          <div className="card-body">
            <Row>
              <Col md={10} className="d-flex align-items-center">
                <div>
                  <h5 className="card-title">Entry Requirement</h5>
                </div>
              </Col>
              <div>
                <ul>
                  <li>map here</li>
                </ul>
              </div>
            </Row>
          </div>
        </div>
        <Row>
          <Col md={6}>
            <div className="card mt-4 total-course-card">
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
                      style={{ fontSize: "5rem" }}
                      icon={faGraduationCap}
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
                      {program.offered}
                    </h5>
                  </div>
                </Row>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="card mt-4 intake-period-card">
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
                      style={{ fontSize: "5rem" }}
                      icon={faBookOpen}
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
                      {program.intakes.join(", ")}
                    </h5>
                  </div>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <img src={headerImage} alt="Header" className="about-institute-image" />
      <Container className="my-4 about-institute-container">
        <div className="card mt-4 know-more-card">
          <div className="card-body" style={{ padding: "50px" }}>
            <Row>
              <Col md={10} className="d-flex align-items-center">
                <div>
                  <h5 className="card-title">About {program.university}</h5>
                </div>
              </Col>
              <div>
                <p>
                  The purpose of this programme is to produce graduates with
                  in-depth knowledge of Arabic linguistics. From the aspects of
                  national aspiration and global importance, this programme aims
                  to produce graduates who demonstrate those aspects.
                </p>
                <p>
                  Having the ability to apply their knowledge and skills as well
                  as communicate well in Arabic would further enable them to
                  contribute at the international stage and realise the features
                  of a Malaysian society as envisioned in Vision 2020.
                </p>
                <p>
                  The purpose of this programme is to produce graduates with
                  in-depth knowledge of Arabic linguistics. From the aspects of
                  national aspiration and global importance, this programme aims
                  to produce graduates who demonstrate those aspects.
                </p>
                <p>
                  Having the ability to apply their knowledge and skills as well
                  as communicate well in Arabic would further enable them to
                  contribute at the international stage and realise the features
                  of a Malaysian society as envisioned in Vision 2020.
                </p>
              </div>
              <Col className="d-flex justify-content-center">
                <Button
                  style={{ textDecoration: "none" }}
                  variant="link"
                  href="https://www.example.com"
                >
                  View More{" "}
                </Button>
              </Col>
            </Row>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <Button
            style={{
              backgroundColor: "#FFA500",
              border: "none",
              width: "180px",
              height: "50px",
              marginTop: "20px",
            }}
          >
            Contact School
          </Button>
        </div>
        {/* <div className="container">
          <div className="row justify-content-center">
            {filteredPrograms.map((program, index) => (
              <div key={index} className="col-md-8 mb-4">
                <div className="card degree-card">
                  <div className="card-body d-flex align-items-center">
                    <div
                      className="card-image mr-4"
                      style={{ paddingLeft: "30px" }}
                    >
                      <h5 className="card-title">{program.title}</h5>
                      <div className="d-flex align-items-center">
                        <div>
                          <img
                            src={program.image}
                            alt={program.title}
                            width="100"
                          />
                        </div>
                        <div style={{ paddingLeft: "10px" }}>
                          <h5 className="card-text">{program.university}</h5>
                          <FontAwesomeIcon icon={faLocationDot} />
                          <span style={{ paddingLeft: "10px" }}>
                            {program.location}
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
                    <div
                      className="details-div"
                      style={{ paddingLeft: "100px" }}
                    >
                      <div className="d-flex align-items-center">
                        <div>
                          <Row>
                            <div>
                              <FontAwesomeIcon icon={faGraduationCap} />
                              <span style={{ paddingLeft: "20px" }}>
                                Degree
                              </span>
                            </div>
                            <div>
                              <FontAwesomeIcon icon={faCalendarCheck} />
                              <span style={{ paddingLeft: "20px" }}>
                                {program.enrollment}
                              </span>
                            </div>
                            <div>
                              <FontAwesomeIcon icon={faClock} />
                              <span style={{ paddingLeft: "20px" }}>
                                {program.duration}
                              </span>
                            </div>
                            <div>
                              <FontAwesomeIcon icon={faCalendarAlt} />
                              <span style={{ paddingLeft: "20px" }}>
                                {program.intakes.join(", ")}
                              </span>
                            </div>
                          </Row>
                        </div>
                        <div className="apply-button">
                          <button
                            className="featured"
                            onClick={() => handleApplyNow(program)}
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        <img src={studypal11} alt="Header" className="adverstise-image" />
      </Container>
      <Container></Container>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default KnowMoreInstitute;
