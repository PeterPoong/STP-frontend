// CoursesContainer.js

import React from "react";
import CoursesButton from "../Components/student components/CoursesButton";
import { Container, Row, Col } from "react-bootstrap";
import business from "../assets/student asset/CoursesLogo/business.png";
import compsc from "../assets/student asset/CoursesLogo/compsc.png";
import accounting from "../assets/student asset/CoursesLogo/accounting.png";
import engineering from "../assets/student asset/CoursesLogo/engineering.png";
import humanresource from "../assets/student asset/CoursesLogo/hr.png";
import hospitality from "../assets/student asset/CoursesLogo/hosp.png";
import medicine from "../assets/student asset/CoursesLogo/medicine.png";
import finance from "../assets/student asset/CoursesLogo/finance.png";
import technology from "../assets/student asset/CoursesLogo/technology.png";
import architecture from "../assets/student asset/CoursesLogo/architecture.png";
import multimedia from "../assets/student asset/CoursesLogo/multimedia.png";
import economy from "../assets/student asset/CoursesLogo/economy.png";
import science from "../assets/student asset/CoursesLogo/science.png";
import languages from "../assets/student asset/CoursesLogo/language.png";

const CoursesContainer = () => {
  const buttons = [
    { id: 1, src: business, label: "Business" },
    { id: 2, src: compsc, label: "Computer Science" },
    { id: 3, src: accounting, label: "Accounting" },
    { id: 4, src: engineering, label: "Engineering" },
    { id: 5, src: humanresource, label: "Human Resource" },
    { id: 6, src: hospitality, label: "Hospitality Management" },
    { id: 7, src: medicine, label: "Medicine" },
    { id: 8, src: finance, label: "Finance" },
    { id: 9, src: technology, label: "Technology" },
    { id: 10, src: architecture, label: "Architecture" },
    { id: 11, src: multimedia, label: "Multimedia" },
    { id: 12, src: economy, label: "Economy" },
    { id: 13, src: science, label: "Science" },
    { id: 14, src: languages, label: "Languages" },
  ];

  return (
    <div style={{ backgroundColor: "white" }}>
      <Container>
        <h3
          style={{ color: "#a90000", textAlign: "center", paddingTop: "40px" }}
        >
          Hot pick courses
        </h3>
        <Row className="justify-content-center g-3">
          {buttons.map((button) => (
            <Col
              key={button.id}
              md={2}
              className="d-flex justify-content-center"
            >
              <CoursesButton src={button.src} label={button.label} />
            </Col>
          ))}
        </Row>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button
            className="findmore-button"
            size="lg"
            active
            // style={{ backgroundColor: " #a90000", borderColor: "#a90000" }}
          >
            Find More
          </button>
        </div>
      </Container>
    </div>
  );
};

export default CoursesContainer;
