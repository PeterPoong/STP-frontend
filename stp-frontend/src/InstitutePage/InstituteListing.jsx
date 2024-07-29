import React, { useState } from "react";
import { Container, Row, Col, Form, Pagination } from "react-bootstrap";
import "../InstitutePage/css/Institute.css";
import StudyPal from "../InstitutePage/images/StudyPal.png";
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
import image1 from "../InstitutePage/images/image1.jpg";
import image7 from "../InstitutePage/images/image7.png";
import image5 from "../InstitutePage/images/image5.jpg";
import { useNavigate } from "react-router-dom";

const InstituteListing = () => {
  const [locationFilters, setLocationFilters] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [modeFilters, setModeFilters] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  const locations = [
    "Johor",
    "Kedah",
    "Melaka",
    "Negeri Sembilan",
    "Pahang",
    "Penang",
    "Perak",
    "Sabah",
    "Sarawak",
    "Terengganu",
    "Kuala Lumpur",
    "Putrajaya",
    "Labuan",
  ];

  const categories = [
    "Business & Marketing",
    "Accounting",
    "Agricultural",
    "Architecture",
    "Arts, Design & Multimedia",
    "Aviation",
    "Computer & Technology",
    "Hospitality & Tourism",
    "Language Studies",
    "Mathematics & Actuarial",
  ];

  const mode = ["Full time", "Part time", "Remote"];

  const handleLocationChange = (location) => {
    if (locationFilters.includes(location)) {
      setLocationFilters(locationFilters.filter((l) => l !== location));
    } else {
      setLocationFilters([...locationFilters, location]);
    }
  };

  const handleCategoryChange = (category) => {
    if (categoryFilters.includes(category)) {
      setCategoryFilters(categoryFilters.filter((c) => c !== category));
    } else {
      setCategoryFilters([...categoryFilters, category]);
    }
  };

  const handleModeChange = (mode) => {
    if (modeFilters.includes(mode)) {
      setModeFilters(modeFilters.filter((m) => m !== mode));
    } else {
      setModeFilters([...modeFilters, mode]);
    }
  };

  const filteredPrograms = [
    {
      image: image1,
      university: "Swinburne University (Sarawak)",
      location: "Sarawak",
      description:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, ...",
      enrollment: "Full time",
      duration: "30 months",
      intakes: ["January", "July", "September"],
      fee: "RM 28,000",
      school: "Private School",
      offered: "85 Courses offered",
    },
    {
      image: image7,
      university: "Curtin University (Sarawak)",
      location: "Sarawak",
      description:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, ...",
      enrollment: "Full time",
      duration: "30 months",
      intakes: ["January", "July"],
      fee: "RM 27,000",
      school: "Private School",
      offered: "85 Courses offered",
    },
    {
      image: image5,
      university: "Universiti Teknikal Malaysia Melaka",
      location: "Melaka",
      description:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, ...",
      enrollment: "Full time",
      duration: "28 months",
      intakes: ["January", "July", "September"],
      fee: "RM 27,000",
      school: "Public School",
      offered: "85 Courses offered",
    },
    {
      image: image1,
      university: "Swinburne University (Sarawak)",
      location: "Sarawak",
      description:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, ...",
      enrollment: "Full time",
      duration: "28 months",
      intakes: ["January", "July", "September"],
      fee: "RM 27,000",
      school: "Private School",
      offered: "85 Courses offered",
    },
    {
      image: image1,
      university: "Swinburne University (Sarawak)",
      location: "Sarawak",
      description:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, ...",
      enrollment: "Full time",
      duration: "28 months",
      intakes: ["January", "July", "September"],
      fee: "RM 27,000",
      school: "Private School",
      offered: "85 Courses offered",
    },
    {
      image: image1,
      university: "Swinburne University (Sarawak)",
      location: "Sarawak",
      description:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, ...",
      enrollment: "Full time",
      duration: "28 months",
      intakes: ["January", "July", "September"],
      fee: "RM 27,000",
      school: "Private School",
      offered: "85 Courses offered",
    },
  ];

  const handleKnowMoreInstitute = (program) => {
    navigate("/knowmoreinstitute", { state: { program } }); // Navigate with state
  };

  return (
    <Container className="my-5">
      <Row>
        <Col
          xs={12}
          md={4}
          className="location-container"
          style={{ backgroundColor: "white", padding: "20px" }}
        >
          <h5>Location</h5>
          <Form.Group>
            {locations.map((location, index) => (
              <Form.Check
                key={index}
                type="checkbox"
                label={location}
                checked={locationFilters.includes(location)}
                onChange={() => handleLocationChange(location)}
              />
            ))}
          </Form.Group>
          <h5>Category</h5>
          <Form.Group>
            {categories.map((category, index) => (
              <Form.Check
                key={index}
                type="checkbox"
                label={category}
                checked={categoryFilters.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
            ))}
          </Form.Group>
          <h5>Study Mode</h5>
          <Form.Group>
            {mode.map((mode, index) => (
              <Form.Check
                key={index}
                type="checkbox"
                label={mode}
                checked={modeFilters.includes(mode)}
                onChange={() => handleModeChange(mode)}
              />
            ))}
          </Form.Group>
        </Col>
        <Col xs={12} md={8} className="degreeprograms-division">
          <div>
            <img src={StudyPal} alt="Study Pal" className="studypal-image" />
          </div>
          {filteredPrograms.map((program, index) => (
            <div key={index} className="card mb-4 institute-card">
              <div className="card-body d-flex flex-column flex-md-row align-items-start">
                <div className="card-image mb-3 mb-md-0">
                  <img src={program.image} alt={program.university} />
                </div>
                <div className="card-content">
                  <h5 className="card-text">{program.university}</h5>
                  <div className="d-flex align-items-center mb-2">
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
                  <p
                    className="card-description"
                    style={{ fontSize: "14px", textAlign: "justify" }}
                  >
                    {program.description}
                  </p>
                </div>
                <div className="details-div">
                  <div
                    className="d-flex align-items-center"
                    style={{ paddingTop: "10px" }}
                  >
                    <FontAwesomeIcon icon={faSchool} />
                    <span style={{ paddingLeft: "10px" }}>
                      {program.school}
                    </span>
                  </div>
                  <div
                    className="d-flex align-items-center"
                    style={{ paddingTop: "10px" }}
                  >
                    <FontAwesomeIcon icon={faGraduationCap} />
                    <span style={{ paddingLeft: "10px" }}>
                      {program.offered}
                    </span>
                  </div>
                  <div
                    className="d-flex align-items-center"
                    style={{ paddingTop: "10px" }}
                  >
                    <FontAwesomeIcon icon={faBookOpen} />
                    <span style={{ paddingLeft: "10px" }}>
                      {program.intakes.join(", ")}
                    </span>
                  </div>
                </div>
                <div className="knowmore-button mt-3">
                  <button
                    className="featured"
                    onClick={() => handleKnowMoreInstitute(program)}
                  >
                    Know More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Col>
        <Col xs={12} className="d-flex justify-content-end">
          <Pagination className="pagination">
            <Pagination.Prev aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </Pagination.Prev>
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Next aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </Pagination.Next>
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default InstituteListing;
