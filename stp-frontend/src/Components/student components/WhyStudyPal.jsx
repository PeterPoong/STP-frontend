import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import gif from "../assets/student asset/stp.gif"; // Import the GIF file
import cc from "../assets/student asset/circlecheck.png"; // Import the circle-check image

const WhyStudyPal = () => {
  return (
    <div className="container-fluid">
      <Container className="whystp-container">
        <Row className="why-study-pal-card wider-card responsive-card">
          <Col md={8}>
            <div>
              <h2
                className="text-left"
                style={{ color: "#a90000", paddingLeft: "50px" }}
              >
                Why StudyPal?
              </h2>
            </div>
            <div>
              <div className="d-flex align-items-center">
                <img
                  src={cc}
                  alt="Circle Check"
                  style={{
                    marginRight: "10px",
                    marginLeft: "100px",
                    width: "90px", // Adjust width to fit well with text
                    height: "50px", // Adjust height to fit well with text
                  }}
                />
                <p className="text-left mb-0">Most choice courses</p>
              </div>
              <div className="d-flex align-items-center mt-2">
                <img
                  src={cc}
                  alt="Circle Check"
                  style={{
                    marginRight: "10px",
                    marginLeft: "100px",

                    width: "90px", // Adjust width to fit well with text
                    height: "50px", // Adjust height to fit well with text
                  }}
                />
                <p className="text-left mb-0">Most quality university</p>
              </div>
              <div className="d-flex align-items-center mt-2">
                <img
                  src={cc}
                  alt="Circle Check"
                  style={{
                    marginRight: "10px",
                    marginLeft: "100px",

                    width: "90px", // Adjust width to fit well with text
                    height: "50px", // Adjust height to fit well with text
                  }}
                />
                <p className="text-left mb-0">Most easy access to university</p>
              </div>
              <div className="d-flex align-items-center mt-2">
                <img
                  src={cc}
                  alt="Circle Check"
                  style={{
                    marginRight: "10px",
                    marginLeft: "100px",

                    width: "90px", // Adjust width to fit well with text
                    height: "50px", // Adjust height to fit well with text
                  }}
                />
                <p className="text-left">
                  Most quick to find your dream course
                </p>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <img
              src={gif}
              className="img-fluid"
              alt="Why StudyPal"
              style={{ maxWidth: "100%", height: "auto" }} // Adjust max-width and height as needed
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WhyStudyPal;
