import React, { useState } from "react";
import { Container, Row, Col, Form, Pagination } from "react-bootstrap";
// import "../css/student css/course page css/CoursesPage.css";
import "../../css/student css/course page css/CoursesPage.css";
import StudyPal from "../../assets/student asset/coursepage image/StudyPal.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faClock,
  faCalendarAlt,
  faCalendarCheck,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import image1 from "../../assets/student asset/coursepage image/image1.jpg";
import image7 from "../../assets/student asset/coursepage image/image7.png";
import image5 from "../../assets/student asset/coursepage image/image5.jpg";
import { useNavigate } from "react-router-dom";

const CourseListing = () => {
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
    <Container className="my-5">
      <Row>
        <Col
          md={4}
          className="location-container"
          style={{ backgroundColor: "white" }}
        >
          <h5 style={{ marginTop: "20px" }}>Location</h5>
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
          <h5 style={{ marginTop: "10px" }}>Category</h5>
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
          <h5 style={{ marginTop: "10px" }}>Study Mode</h5>
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
            <div key={index} className="card mb-4 degree-card">
              <div className="card-body d-flex flex-column flex-md-row align-items-start">
                <div className="card-image mb-3 mb-md-0">
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
                  className="details-div  flex-grow-1"
                  style={{ paddingLeft: "80px" }}
                >
                  <div className="d-flex align-items-center flex-wrap">
                    <Col>
                      <div>
                        <Row>
                          <div>
                            <FontAwesomeIcon icon={faGraduationCap} />
                            <span style={{ paddingLeft: "20px" }}>Degree</span>
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
                    </Col>
                    <Col>
                      {" "}
                      <Row className="align-items-center justify-content-end">
                        <div className="fee-apply ms-5">
                          <div className="fee-info">
                            <p>estimate fee</p>
                            <span>{program.fee}</span>
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
                      </Row>
                    </Col>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Col>
        <Pagination className="d-flex justify-content-end">
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
      </Row>
    </Container>
  );
};

export default CourseListing;
