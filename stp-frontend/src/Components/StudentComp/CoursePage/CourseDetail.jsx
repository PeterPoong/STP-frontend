import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import NavButtons from "../NavButtons";
// import headerImage from "../../assets/StudentAssets/coursepage image/StudyPal10.png";
import headerImage from "../../../assets/StudentAssets/coursepage image/StudyPal10.png";
import "../../../css/StudentCss/course page css/ApplyPage.css";
import {
  Container,
  Row,
  Col,
  Collapse,
  Button,
  Carousel,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faClock,
  faCalendarAlt,
  faCalendarCheck,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import studypal1 from "../../../assets/StudentAssets/coursepage image/StudyPal1.png";
import studypal2 from "../../../assets/StudentAssets/coursepage image/StudyPal2.png";
import studypal3 from "../../../assets/StudentAssets/coursepage image/StudyPal3.png";
import studypal4 from "../../../assets/StudentAssets/coursepage image/StudyPal4.png";
import studypal11 from "../../../assets/StudentAssets/coursepage image/StudyPal11.png";
import Footer from "../Footer";

const baseURL = import.meta.env.VITE_BASE_URL;

const CourseDetail = () => {
  const [openDescription, setOpenDescription] = useState(false); //for Collapse Description
  const [openRequirement, setOpenRequirement] = useState(false); //for Collapse Requirement
  const [openAboutInstitute, setOpenAboutInstitute] = useState(false); // for Collapse About Institute

  const { id } = useParams();
  const location = useLocation();
  const [programs, setPrograms] = useState(location.state?.program || []);

  useEffect(() => {
    console.log("Program ID:", id);

    if (!programs || programs.length === 0) {
      fetch(`${baseURL}api/student/courseList`, {
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
          console.log("Fetched Data:", data.data);
          if (data && data.data && Array.isArray(data.data.data)) {
            const selectedProgram = data.data.data.find(
              //add .data
              (item) => item.id === parseInt(id)
            );
            console.log("Selected Program:", selectedProgram);
            setPrograms(selectedProgram ? [selectedProgram] : []);
          } else {
            console.error("Invalid data structure:", data);
            setPrograms([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching course data:", error);
          setPrograms([]);
        });
    }
  }, [id]);

  if (!programs || programs.length === 0) {
    return <p>No program selected. Please go back and choose a program.</p>;
  }

  return (
    <div style={{ backgroundColor: "#F5F4F4" }}>
      <NavButtons />
      <header className="apply-now-masthead">
        <img
          src={headerImage}
          alt="Header"
          className="apply-now-header-image"
        />
      </header>
      {programs.map((program) => (
        <>
          <Container key={program.id} className="my-4 apply-now-container">
            <Row className="apply-now-row no-gutters">
              <Col
                md={3}
                className="d-flex align-items-center justify-content-center position-relative apply-now-image-col"
              >
                <img
                  src={`${baseURL}storage/${program.logo}`}
                  alt="Program"
                  className="img-fluid img-thumbnail apply-now-program-image"
                  width="250"
                />
              </Col>
              <Col md={6} className="d-flex align-items-center">
                <div style={{ paddingBottom: "25px" }}>
                  <h4>{program.school_name}</h4>
                  <p>{import.meta.env.VITE_random_Var}</p>
                  <p>
                    <FontAwesomeIcon icon={faLocationDot} />
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
                <Link
                  to={{
                    pathname: "/applycourse",
                    state: { program },
                  }}
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
                  >
                    Apply Now
                  </Button>
                </Link>
              </Col>
            </Row>

            <div
              className="card mt-3 apply-now-card"
              style={{ paddingLeft: "25px" }}
            >
              <div className="row">
                <div className="col-md-12">
                  <h3 style={{ color: " #B71A18" }}>{program.name}</h3>
                </div>
              </div>
            </div>
            <div className="card mt-4 apply-now-card">
              <div className="card-body">
                <h5 className="card-title">Summary</h5>
                <Row style={{ paddingLeft: "50px" }}>
                  <Col md={4}>
                    <div style={{ marginBottom: "10px" }}>
                      <FontAwesomeIcon icon={faGraduationCap} />
                      <span style={{ paddingLeft: "20px" }}>
                        {program.qualification}
                      </span>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faCalendarCheck} />
                      <span style={{ paddingLeft: "20px" }}>
                        {program.mode}
                      </span>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div style={{ marginBottom: "10px" }}>
                      <FontAwesomeIcon icon={faClock} />
                      <span style={{ paddingLeft: "20px" }}>
                        {program.period}
                      </span>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faCalendarAlt} />
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
                          The purpose of this programme is to produce graduates
                          with in-depth knowledge of Arabic linguistics. From
                          the aspects of national aspiration and global
                          importance, this programme aims to produce graduates
                          who demonstrate those aspects.
                        </p>
                      </div>
                    </Collapse>
                  </Col>
                  <Col className="d-flex justify-content-center">
                    {" "}
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
                          The purpose of this programme is to produce graduates
                          with in-depth knowledge of Arabic linguistics. From
                          the aspects of national aspiration and global
                          importance, this programme aims to produce graduates
                          who demonstrate those aspects.
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
            <div className="d-flex justify-content-center">
              <Button
                style={{
                  backgroundColor: "#B71A18",
                  border: "none",
                  width: "180px",
                  height: "50px",
                  marginBottom: "20px",
                  marginTop: "20px",
                }}
              >
                Apply Now
              </Button>
            </div>
          </Container>
          <img
            src={headerImage}
            alt="Header"
            className="about-institute-image"
          />
          <Container className="my-4 about-institute-container">
            <div className="card mt-4 apply-now-card">
              <div className="card-body" style={{ padding: "50px" }}>
                <Row>
                  <Col md={10} className="d-flex align-items-center">
                    <div>
                      <h5 className="card-title">About Institute</h5>
                    </div>
                  </Col>
                  <div>
                    {" "}
                    <p>
                      The purpose of this programme is to produce graduates with
                      in-depth knowledge of Arabic linguistics. From the aspects
                      of national aspiration and global importance, this
                      programme aims to produce graduates who demonstrate those
                      aspects.
                    </p>
                  </div>
                  <Col md={12}>
                    <Collapse in={openAboutInstitute}>
                      <div id="collapse-about-institute">
                        <p>
                          The purpose of this programme is to produce graduates
                          with in-depth knowledge of Arabic linguistics. From
                          the aspects of national aspiration and global
                          importance, this programme aims to produce graduates
                          who demonstrate those aspects.
                        </p>
                        <p>
                          Having the ability to apply their knowledge and skills
                          as well as communicate well in Arabic would further
                          enable them to contribute at the international stage
                          and realise the features of a Malaysian society as
                          envisioned in Vision 2020.
                        </p>
                      </div>
                    </Collapse>
                  </Col>
                  <Col className="d-flex justify-content-center">
                    <Button
                      style={{ textDecoration: "none" }}
                      variant="link"
                      onClick={() => setOpenAboutInstitute(!openAboutInstitute)}
                      aria-controls="collapse-about-institute"
                      aria-expanded={openAboutInstitute}
                    >
                      {openAboutInstitute ? "View Less" : "View More"}
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="image-gallery-course" style={{ marginTop: "40px" }}>
              <img src={studypal1} className="gallery-image" alt="Slide 1" />
              <img src={studypal2} className="gallery-image" alt="Slide 2" />
              <img src={studypal3} className="gallery-image" alt="Slide 3" />
              <img src={studypal4} className="gallery-image" alt="Slide 4" />
              <img src={studypal1} className="gallery-image" alt="Slide 1" />
            </div>

            <div className="d-flex justify-content-center">
              <Button
                style={{
                  backgroundColor: "#B71A18",
                  border: "none",
                  width: "180px",
                  height: "50px",
                  marginTop: "20px",
                }}
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
              >
                Know More
              </Button>
            </div>
            <img src={studypal11} alt="Header" className="adverstise-image" />
          </Container>
        </>
      ))}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CourseDetail;
