import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Pagination } from "react-bootstrap";
import "../../../css/student css/institutepage css/Institute.css";
import StudyPal from "../../../assets/student asset/institute image/StudyPal.png";
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
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_BASE_URL;
const apiURL = "http://192.168.0.69:8000/api/student/schoolList";

const InstituteListing = ({ searchResults = [] }) => {
  const [locationFilters, setLocationFilters] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [modeFilters, setModeFilters] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tuitionFee, setTuitionFee] = useState(5000); // Initial state for tuition fee range
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

  const modes = ["Full time", "Part time", "Remote"];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const maxRetries = 5;
      let attempt = 0;
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      while (attempt < maxRetries) {
        try {
          const response = await fetch(${apiURL}?page=${currentPage}, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.status === 429) {
            attempt++;
            const waitTime = Math.pow(2, attempt) * 1000; // Exponential backoff
            await delay(waitTime);
            continue; // Retry request
          }

          if (!response.ok) {
            throw new Error(HTTP error! Status: ${response.status});
          }

          const result = await response.json();

          setInstitutes(result.data);
          setTotalPages(result.last_page);
          break; // Exit while loop if successful
        } catch (error) {
          setError(error.message);
          console.error("Error fetching institutes:", error);
          if (response.status !== 429) break; // Exit while loop if an error occurs other than 429
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [searchResults]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
    navigate("/applynow", { state: { program } }); // Navigate with state
  };

  const displayInstitutes =
    searchResults.length > 0 ? searchResults : institutes;
  // Mapping institutes to JSX
  const mappedInstitutes = displayInstitutes.map((program, index) => (
    <div key={index} className="card mb-4 degree-card">
      <div className="card-body d-flex flex-column flex-md-row align-items-start">
        <div className="card-image mb-3 mb-md-0">
          <h5 className="card-title">{program.name}</h5>
          <div className="d-flex align-items-center">
            <div>
              <img
                src={${baseURL}storage/${program.category_icon}}
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
                    <p>Estimate Fee</p>
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
          xs={12}
          md={4}
          className="location-container"
          style={{ backgroundColor: "white", padding: "20px" }}
        >
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
          <h5 style={{ marginTop: "25px" }}>Tuition Fee</h5>
          <Form.Group id="customRange1">
            <Form.Label>{RM${tuitionFee}}</Form.Label>
            <Form.Control
              style={{ color: "#B71A18" }}
              type="range"
              min="0"
              max="100000"
              step="500"
              value={tuitionFee}
              onChange={(e) => setTuitionFee(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col xs={12} md={8} className="degreeprograms-division">
          <div>
            <img src={StudyPal} alt="Study Pal" className="studypal-image" />
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : institutes.length > 0 ? (
            mappedInstitutes
          ) : (
            <div>No institute available</div>
          )}
        </Col>
        <Col xs={12} className="d-flex justify-content-end">
          <Pagination className="pagination">
            <Pagination.Prev
              aria-label="Previous"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              aria-label="Next"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default InstituteListing;





import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Pagination,
  Accordion,
} from "react-bootstrap";
import "../../../css/student css/institutepage css/Institute.css";
import StudyPal from "../../../assets/student asset/institute image/StudyPal.png";
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
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_BASE_URL;
const apiURL = "http://192.168.0.69:8000/api/student/schoolList";

const InstituteListing = ({ searchResults = [] }) => {
  const [locationFilters, setLocationFilters] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [modeFilters, setModeFilters] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tuitionFee, setTuitionFee] = useState(5000); // Initial state for tuition fee range
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

  const modes = ["Full time", "Part time", "Remote"];

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

          const result = await response.json();

          if (Array.isArray(result.data)) {
            setInstitutes(result.data);
            // setTotalPages(result.last_page);
            console.log("Fetched courses:", result.data);
          } else {
            throw new Error("Invalid API response structure");
          }
          break; // Exit while loop if successful
        } catch (error) {
          setError(error.message);
          console.error("Error fetching institutes:", error);
          if (response && response.status !== 429) break; // Exit while loop if an error occurs other than 429
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [searchResults]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
    navigate("/applynow", { state: { program } }); // Navigate with state
  };

  // Ensure displayInstitutes is always an array
  const displayInstitutes = Array.isArray(searchResults) && searchResults.length > 0 ? searchResults : institutes;

  const mappedInstitutes = Array.isArray(displayInstitutes) ? displayInstitutes.map((program, index) => (
    <div key={index} className="card mb-4 degree-card">
      <div className="card-body d-flex flex-column flex-md-row align-items-start">
        <div className="card-image mb-3 mb-md-0">
          <h5 className="card-title">{program.name}</h5>
          <div className="d-flex align-items-center">
            <div>
              <img
                src={`${baseURL}storage/${program.logo}`}
                alt={program.name}
                width="100"
              />
            </div>
            <div style={{ paddingLeft: "10px" }}>
              <h5 className="card-text">{program.category}</h5>
              <FontAwesomeIcon icon={faLocationDot} />
              <span style={{ paddingLeft: "10px" }}>
                {program.city}, {program.state}, {program.country}
              </span>{" "}
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
                      {program.qualification || "N/A"}
                    </span>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faCalendarCheck} />
                    <span style={{ paddingLeft: "20px" }}>
                      {program.period || "N/A"}
                    </span>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faClock} />
                    <span style={{ paddingLeft: "20px" }}>
                      {program.duration || "N/A"}
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
                    <p>Estimate Fee</p>
                    <span>{program.fee || "N/A"}</span>
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
  )) : <div>No institutes to display</div>;

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
            </div>
            <div className="filter-group">
              <h5 style={{ marginTop: "10px" }}>Study Mode</h5>
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
          </div>
        </Col>
        <Col md={8}>
          {/* Map through the institutes here */}
          {mappedInstitutes}
          {/* Pagination Component */}
          <Pagination>
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default InstituteListing;


useEffect(() => {
  const fetchLocations = async (countryID) => {
    try {
      // Check the value of countryID here
      console.log("Fetching locations for countryID:", countryID);

      const response = await fetch(locationAPIURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          countryID: countryID || 1, // Default to 1 if no countryID is provided
        }),
      });

      const locationFilters = await response.json();

      // Check the API response here
      console.log("Location filters response:", locationFilters);

      if (locationFilters.data) {
        setLocationFilters(locationFilters.data);
        console.log("Fetched location data:", locationFilters.data);
      } else {
        console.warn("No location data found.");
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  if (selectedCountry) {
    fetchLocations(selectedCountry.country_id);
  } else {
    fetchLocations(); // Fetch locations with default countryID if no country is selected
  }
}, [selectedCountry]);