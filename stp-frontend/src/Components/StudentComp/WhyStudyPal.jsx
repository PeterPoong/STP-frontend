import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import gif from "../../assets/StudentAssets/stp.gif";
import cc from "../../assets/StudentAssets/circlecheck.png";

const WhyStudyPal = () => {
  return (
    <div className="container-fluid">
      <Container className="whystp-container" style={{ marginTop: "100px" }}>
        <Row className="why-study-pal-card wider-card responsive-card">
          <Col xs={12} md={6} className="text-center text-md-left">
            <div>
              <h3
                style={{
                  color: "#a90000",
                  paddingLeft: "70px",
                  width: "100%",
                  textAlign: "left",
                  fontWeight: "lighter",
                }}
              >
                Why StudyPal?
              </h3>
            </div>
            <div style={{ marginTop: "70px", marginLeft: "20px" }}>
              {[
                "Most choice courses",
                "Most quality university",
                "Most easy access to university",
                "Most quick to find your dream course",
              ].map((text, index) => (
                <div
                  className="d-flex align-items-center justify-content-start justify-content-md-start mt-2"
                  key={index}
                >
                  <img
                    src={cc}
                    alt="Circle Check"
                    className="why-study-pal-item" // Add the class here
                    style={{
                      // marginRight: "10px",
                      // width: "40px",
                      // height: "40px",
                      // marginRight: "10px",
                      // marginLeft: "100px",
                      width: "90px", // Adjust width to fit well with text
                      height: "50px", // Adjust height to fit well with text
                    }}
                  />
                  <p className="text-left mb-0">{text}</p>
                </div>
              ))}
            </div>
          </Col>
          <Col xs={12} md={6} className="text-center">
            <img
              src={gif}
              className="img-fluid"
              alt="Why StudyPal"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WhyStudyPal;
