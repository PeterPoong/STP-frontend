import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import NavButtons from "../NavButtons";
// import headerImage from "../../assets/student asset/coursepage image/StudyPal10.png";
import headerImage from "../../../assets/student asset/coursepage image/StudyPal10.png";
import "../../../css/student css/course page css/ApplyPage.css";
import { Container, Row, Col, Button, Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faClock,
  faCalendarAlt,
  faCalendarCheck,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import studypal1 from "../../../assets/student asset/coursepage image/StudyPal1.png";
import studypal2 from "../../../assets/student asset/coursepage image/StudyPal2.png";
import studypal3 from "../../../assets/student asset/coursepage image/StudyPal3.png";
import studypal4 from "../../../assets/student asset/coursepage image/StudyPal4.png";
import studypal11 from "../../../assets/student asset/coursepage image/StudyPal11.png";
import Footer from "../Footer";

const baseURL = import.meta.env.VITE_BASE_URL;
const CourseDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [programs, setPrograms] = useState(location.state?.program || []);

  useEffect(() => {
    console.log("Program ID:", id);

    if (!programs || programs.length === 0) {
      fetch(`http://192.168.0.69:8000/api/student/courseList`, {
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
          console.log("Fetched Data:", data);
          if (data && data.data && Array.isArray(data.data)) {
            const selectedProgram = data.data.find(
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
                  <h4>{program.school_id}</h4>
                  <p>{import.meta.env.VITE_random_Var}</p>
                  <p>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span style={{ paddingLeft: "10px" }}>
                      {program.location}
                    </span>
                    <a
                      href="https://maps.google.com"
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
                        {program.period}
                      </span>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div style={{ marginBottom: "10px" }}>
                      <FontAwesomeIcon icon={faClock} />
                      <span style={{ paddingLeft: "20px" }}>
                        {program.duration}
                      </span>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faCalendarAlt} />
                      <span style={{ paddingLeft: "20px" }}>
                        {Array.isArray(program.intakes)
                          ? program.intakes.join(", ")
                          : "N/A"}
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
                    <p>{program.description}</p>
                    <p>{program.description}</p>
                    <div className="d-flex justify-content-center mt-auto">
                      {" "}
                      <Button
                        className="viewmore-button"
                        style={{
                          color: "blue",
                          backgroundColor: "transparent",
                        }}
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseExample"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                      >
                        View More
                      </Button>
                    </div>
                    <div className="collapse" id="collapseExample">
                      <div className="card card-body">
                        {program.description}
                        <p>
                          The purpose of this programme is to produce graduates
                          with in-depth knowledge of Arabic linguistics. From
                          the aspects of national aspiration and global
                          importance, this programme aims to produce graduates
                          who demonstrate those aspects.
                        </p>
                      </div>
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
                      <h5 className="card-title">Entry Requirement</h5>
                    </div>
                  </Col>
                  <div>
                    <ul>
                      <li>{program.requirement}</li>
                      <li>{program.requirement}</li>
                      <li>{program.requirement}</li>
                      <li>{program.requirement}</li>
                    </ul>
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
                    <p>
                      The purpose of this programme is to produce graduates with
                      in-depth knowledge of Arabic linguistics. From the aspects
                      of national aspiration and global importance, this
                      programme aims to produce graduates who demonstrate those
                      aspects.
                    </p>
                    <p>
                      Having the ability to apply their knowledge and skills as
                      well as communicate well in Arabic would further enable
                      them to contribute at the international stage and realise
                      the features of a Malaysian society as envisioned in
                      Vision 2020.
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
            <Carousel className="random-images-carousel">
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={studypal1}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={studypal2}
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={studypal3}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={studypal4}
                  alt="First slide"
                />
              </Carousel.Item>
            </Carousel>
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
