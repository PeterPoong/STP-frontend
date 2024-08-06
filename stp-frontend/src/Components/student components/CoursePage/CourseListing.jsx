import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Pagination,
  Accordion,
} from "react-bootstrap";
import "../../../css/student css/course page css/CoursesPage.css";
import StudyPal from "../../../assets/student asset/coursepage image/StudyPal.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faClock,
  faCalendarAlt,
  faCalendarCheck,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_BASE_URL;
const apiURL = "http://192.168.0.69:8000/api/student/courseList";

const CourseListing = ({ searchResults = [] }) => {
  const [locationFilters, setLocationFilters] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [modeFilters, setModeFilters] = useState([]);
  const [tuitionFee, setTuitionFee] = useState(0); // Initial state for tuition fee range
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const maxRetries = 5;
      let attempt = 0;
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      while (attempt < maxRetries) {
        try {
          const response = await fetch(apiURL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          });

          if (response.status === 429) {
            attempt++;
            const waitTime = Math.pow(2, attempt) * 1000; // Exponential backoff
            await delay(waitTime);
            continue; // Retry request
          }

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Response is not JSON");
          }

          const result = await response.json();
          setPrograms(result.data);

          if (result.data) {
            console.log("Fetched courses:", result.data);
          } else {
            throw new Error("Invalid API response structure");
          }
          break; // Exit while loop if successful
        } catch (error) {
          setError(error.message);
          console.error("Error fetching course data:", error);
          break; // Exit while loop if an error occurs
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [searchResults]);

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

  const modes = ["Full time", "Part time", "Remote"];

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

  const handleApplyNow = (program) => {
    navigate("/applynow", { state: { program } });
  };

  // Use searchResults prop if provided
  const displayPrograms = searchResults.length > 0 ? searchResults : programs;

  const mappedPrograms = displayPrograms.map((program, index) => (
    <div key={index} className="card mb-4 degree-card">
      <div className="card-body d-flex flex-column flex-md-row align-items-start">
        <div className="card-image mb-3 mb-md-0">
          <h5 className="card-title">{program.name}</h5>
          <div className="d-flex align-items-center">
            <div>
              <img
                src={`${baseURL}storage/${program.category_icon}`}
                alt={program.school_id}
                width="100"
              />
            </div>
            <div style={{ paddingLeft: "10px" }}>
              <h5 className="card-text">{program.school_id}</h5>
              <FontAwesomeIcon icon={faLocationDot} />
              <span style={{ paddingLeft: "10px" }}>{program.location}</span>
              <a href="#" className="map-link" style={{ paddingLeft: "5px" }}>
                click and view on map
              </a>
            </div>
          </div>
        </div>
        <div
          className="details-div flex-grow-1"
          style={{ paddingLeft: "80px" }}
        >
          <div className="d-flex align-items-center flex-wrap">
            <Col>
              <div>
                <Row>
                  <div>
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
                  <div>
                    <FontAwesomeIcon icon={faClock} />
                    <span style={{ paddingLeft: "20px" }}>
                      {program.duration}
                    </span>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    <span style={{ paddingLeft: "20px" }}>
                      {program.intakes ? program.intakes.join(", ") : "N/A"}
                    </span>
                  </div>
                </Row>
              </div>
            </Col>
            <Col>
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
  ));

  return (
    <Container className="my-5">
      <Row>
        <Col
          md={4}
          className="location-container"
          style={{ backgroundColor: "white", padding: "20px" }}
        >
          {/* Filters always visible on larger screens */}
          <div className="filters-container">
            <div className="filter-group">
              <h5 style={{ marginTop: "10px" }}>Location</h5>
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
            </div>
            <div className="filter-group">
              <h5 style={{ marginTop: "25px" }}>Category</h5>
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
            </div>
            <div className="filter-group">
              <h5 style={{ marginTop: "25px" }}>Study Mode</h5>
              <Form.Group>
                {modes.map((mode, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    label={mode}
                    checked={modeFilters.includes(mode)}
                    onChange={() => handleModeChange(mode)}
                  />
                ))}
              </Form.Group>
            </div>
            <div className="filter-group">
              <h5 style={{ marginTop: "25px" }}>Tuition Fee</h5>
              <Form.Group id="customRange1">
                <Form.Label className="custom-range-label">{`RM${tuitionFee}`}</Form.Label>
                <Form.Control
                  className="custom-range-input"
                  type="range"
                  min="0"
                  max="100000"
                  step="500"
                  value={tuitionFee}
                  onChange={(e) => setTuitionFee(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>

          {/* Accordion visible on smaller screens */}
          <Accordion defaultActiveKey="0" className="custom-accordion">
            <Accordion.Item eventKey="0">
              <Accordion.Header className="custom-accordion-header">
                Location
              </Accordion.Header>
              <Accordion.Body className="custom-accordion-body">
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
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header className="custom-accordion-header">
                Category
              </Accordion.Header>
              <Accordion.Body className="custom-accordion-body">
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
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header className="custom-accordion-header">
                Study Mode
              </Accordion.Header>
              <Accordion.Body className="custom-accordion-body">
                <Form.Group>
                  {modes.map((mode, index) => (
                    <Form.Check
                      key={index}
                      type="checkbox"
                      label={mode}
                      checked={modeFilters.includes(mode)}
                      onChange={() => handleModeChange(mode)}
                    />
                  ))}
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header className="custom-accordion-header">
                Tuition Fee
              </Accordion.Header>
              <Accordion.Body className="custom-accordion-body">
                <Form.Group id="customRange1">
                  <Form.Label className="custom-range-label">{`RM${tuitionFee}`}</Form.Label>
                  <Form.Control
                    className="custom-range-input"
                    type="range"
                    min="0"
                    max="100000"
                    step="500"
                    value={tuitionFee}
                    onChange={(e) => setTuitionFee(e.target.value)}
                  />
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col xs={12} md={8} className="degreeprograms-division">
          <div>
            <img src={StudyPal} alt="Study Pal" className="studypal-image" />
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : programs.length > 0 ? (
            mappedPrograms
          ) : (
            <div>No programs available</div>
          )}
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
