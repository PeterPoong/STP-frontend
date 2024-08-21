import { React, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import NavButtons from "../../Components/StudentComp/NavButtons";
// import headerImage from "../../assets/student asset/coursepage image/StudyPal10.png";
import headerImage from "../../assets/StudentAssets/coursepage image/StudyPal10.png";
import "../../css/StudentCss/Apply.css";
import { Container, Row, Col, Button, Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faClock,
  faCalendarAlt,
  faCalendarCheck,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import studypal1 from "../../assets/StudentAssets/coursepage image/StudyPal1.png";
import studypal2 from "../../assets/StudentAssets/coursepage image/StudyPal2.png";
import studypal3 from "../../assets/StudentAssets/coursepage image/StudyPal3.png";
import studypal4 from "../../assets/StudentAssets/coursepage image/StudyPal4.png";
import studypal11 from "../../assets/StudentAssets/coursepage image/StudyPal11.png";
import Footer from "../../Components/StudentComp/Footer";

const ApplyNow = () => {
  const location = useLocation();
  const { program } = location.state || {};

  const test = import.meta.env.VITE_TEST;

  useEffect(() => {
    // Log environment variables to verify they are loaded
    console.log(import.meta.env);
  }, []);

  if (!program) {
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
      <Container className="my-4 apply-now-container">
        <Row className="apply-now-row no-gutters">
          <Col
            md={3}
            className="d-flex align-items-center justify-content-center position-relative apply-now-image-col"
          >
            <img
              src={program.image}
              alt="Program"
              className="img-fluid img-thumbnail apply-now-program-image"
            />
          </Col>
          <Col md={6} className="d-flex align-items-center">
            <div style={{ paddingBottom: "25px" }}>
              <h4>{program.university}</h4>
              <p>{import.meta.env.VITE_random_Var}</p>
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
              <h3 style={{ color: " #B71A18" }}>{program.title}</h3>
            </div>
          </div>
        </div>
        <div className="card mt-4 apply-now-card">
          <div className="card-body">
            <h5 className="card-title">Summary{test}</h5>
            <Row style={{ paddingLeft: "50px" }}>
              <Col md={4}>
                <div style={{ marginBottom: "10px" }}>
                  <FontAwesomeIcon icon={faGraduationCap} />
                  <span style={{ paddingLeft: "20px" }}>Degree</span>
                </div>
                <div>
                  <FontAwesomeIcon icon={faCalendarCheck} />
                  <span style={{ paddingLeft: "20px" }}>
                    {program.enrollment}
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
                    {program.intakes.join(", ")}
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
                  <p>{program.fee}/year</p>
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
                  <li>
                    Pass in STPM with 2 principal passes including Mathematics
                    and one relevant Natural Science subject
                  </li>
                  <li>
                    Pass in A-Level with 2 principal passes including
                    Mathematics and one relevant Natural Science subject
                  </li>
                  <li>
                    Pass in UEC with 5 Bs (must include Mathematics and one
                    relevant Natural Science subject)
                  </li>
                  <li>
                    Pass in Foundation Studies in Sciences or Engineering with
                    CGPA at least 2.00 in relevant field from institute of
                    higher education recognised by the Malaysian Government
                  </li>
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
      <img src={headerImage} alt="Header" className="about-institute-image" />
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
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ApplyNow;
