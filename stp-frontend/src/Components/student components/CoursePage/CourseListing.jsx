import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Form,
  Pagination,
  Accordion,
  Badge,
} from "react-bootstrap";
import "../../../css/student css/course page css/CoursesPage.css";
import featuredBadge from "../../../assets/student asset/featuredBadge/featuredBadge.png";
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
import SearchCourse from "./SearchCourse";

const baseURL = import.meta.env.VITE_BASE_URL;
const apiURL = "http://192.168.0.69:8000/api/student/courseList";
const locationAPIURL =
  "http://192.168.0.69:8000/api/student/locationFilterList";
const studyModeAPIURL =
  "http://192.168.0.69:8000/api/student/studyModeFilterlist";
const categoryAPIURL =
  "http://192.168.0.69:8000/api/student/categoryFilterList";
const tuitionFeeAPIURL =
  "http://192.168.0.69:8000/api/student/tuitionFeeFilterRange";

const CourseListing = ({ searchResults, countryID }) => {
  const [locationFilters, setLocationFilters] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [modeFilters, setModeFilters] = useState([]);
  const [tuitionFee, setTuitionFee] = useState(0);
  const [minTuitionFee, setMinTuitionFee] = useState(0);
  const [maxTuitionFee, setMaxTuitionFee] = useState(100000);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [locationsData, setLocationsData] = useState([]);
  const [studyModes, setStudyModes] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [filteredPrograms, setFilteredPrograms] = useState([]);

  useEffect(() => {
    const fetchLocationFilters = async () => {
      if (countryID) {
        try {
          const response = await fetch(
            "http://192.168.0.69:8000/api/student/locationFilterList",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ countryID: countryID }),
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const locationFilters = await response.json();
          console.log("Fetched Location Filters:", locationFilters); // Debugging line

          if (Array.isArray(locationFilters.data)) {
            setLocationFilters(locationFilters.data);
          } else {
            setLocationFilters([]);
          }
        } catch (error) {
          console.error("Error fetching locations:", error);
          setLocationFilters([]);
        }
      } else {
        setLocationFilters([]);
      }
    };

    fetchLocationFilters();
  }, [countryID]);

  useEffect(() => {
    const fetchStudyModes = async () => {
      try {
        const response = await fetch(studyModeAPIURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const studyModesData = await response.json();
        setStudyModes(studyModesData.data);
      } catch (error) {
        console.error("Error fetching study modes:", error);
      }
    };

    fetchStudyModes();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(categoryAPIURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const categoriesData = await response.json();
        setCategoriesData(categoriesData.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

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
            body: JSON.stringify({
              locationFilters: locationFilters,
              categoryFilters: categoryFilters,
              modeFilters: modeFilters,
              tuitionFee: tuitionFee,
            }),
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
          setPrograms(result.data.data);
          filterPrograms(
            searchResults,
            locationFilters,
            categoryFilters,
            modeFilters,
            tuitionFee
          );

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
  }, [
    locationFilters,
    categoryFilters,
    modeFilters,
    tuitionFee,
    searchResults,
  ]);

  useEffect(() => {
    const fetchTuitionFeeRange = async () => {
      try {
        const response = await fetch(tuitionFeeAPIURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const tuitionFeeData = await response.json();
        console.log("FEE:", tuitionFeeData.data);
        setTuitionFee(tuitionFeeData.data);
        if (tuitionFeeData.success) {
          setMinTuitionFee(0);
          setMaxTuitionFee(tuitionFeeData.data);
        }
      } catch (error) {
        console.error("Error fetching tuition fee range:", error);
      }
    };

    fetchTuitionFeeRange();
  }, []);

  const handleLocationChange = (location) => {
    const locationName = location.state_name;
    let updatedLocations;

    if (locationFilters.includes(locationName)) {
      updatedLocations = locationFilters.filter(
        (item) => item !== locationName
      );
    } else {
      updatedLocations = [...locationFilters, locationName];
    }

    setLocationFilters(updatedLocations);
    filterPrograms(
      updatedLocations.length > 0 ? updatedLocations : [],
      categoryFilters,
      modeFilters,
      tuitionFee,
      programs
    );
  };

  const filterPrograms = (
    locations,
    categories,
    modes,
    fee,
    allPrograms = programs
  ) => {
    if (!allPrograms) {
      console.error("allPrograms is null or undefined");
      return;
    }

    if (!Array.isArray(allPrograms)) {
      console.error("allPrograms is not an array");
      return;
    }

    let filtered = allPrograms;

    // Apply location filter only if locations array is not empty
    if (locations.length > 0) {
      filtered = filtered.filter((program) =>
        locations.includes(program.location)
      );
    }

    // Apply category filter
    if (categories.length > 0) {
      filtered = filtered.filter((program) =>
        categories.includes(program.category)
      );
    }

    // Apply study mode filter
    if (modes.length > 0) {
      filtered = filtered.filter((program) => modes.includes(program.mode));
    }

    // Apply tuition fee filter
    if (fee > 0) {
      filtered = filtered.filter((program) => program.cost <= fee);
    }

    // Set the filtered programs
    setFilteredPrograms(filtered);
  };

  const handleCountryChange = async (country) => {
    setSelectedCountry(country);
    if (country && country.country_id) {
      await fetchLocations(country.country_id); // Fetch locations when country changes
    } else {
      setLocationFilters([]);
    }
  };

  const handleCategoryChange = (category) => {
    if (categoryFilters.includes(category.category_name)) {
      setCategoryFilters(
        categoryFilters.filter((c) => c !== category.category_name)
      );
    } else {
      setCategoryFilters([...categoryFilters, category.category_name]);
    }
  };

  const handleModeChange = (mode) => {
    if (modeFilters.includes(mode.studyMode_name)) {
      setModeFilters(modeFilters.filter((m) => m !== mode.studyMode_name));
    } else {
      setModeFilters([...modeFilters, mode.studyMode_name]);
    }
  };

  const handleTuitionFeeChange = (e) => {
    const { value } = e.target;
    setTuitionFee(value);
  };

  const handleApplyNow = (program) => {
    navigate("/applynow", { state: { program } });
  };

  // Use searchResults prop if provided
  const displayPrograms =
    Array.isArray(searchResults) && searchResults.length > 0
      ? searchResults
      : Array.isArray(programs)
      ? locationFilters.length > 0
        ? programs.filter((program) =>
            locationFilters.includes(program.location)
          )
        : programs
      : [];

  const mappedPrograms = displayPrograms.map((program, index) => (
    <div
      key={index}
      className="card mb-4 degree-card"
      style={{ position: "relative", height: "auto" }}
    >
      {program.featured && <div className="featured-badge">Featured</div>}
      <div className="card-body d-flex flex-column flex-md-row align-items-start">
        <Row>
          <Col md={7} lg={7}>
            <div className="card-image mb-3 mb-md-0">
              <h5 className="card-title" style={{ paddingLeft: "20px" }}>
                <Link
                  style={{ color: "black" }}
                  to={{
                    pathname: `/applyDetail/${program.id}`,
                    state: { program: program },
                  }}
                >
                  {program.name}
                </Link>
              </h5>
              <div className="d-flex align-items-center">
                <div style={{ paddingLeft: "20px" }}>
                  <img
                    src={`${baseURL}storage/${program.logo}`}
                    alt={program.school_id}
                    width="100"
                  />
                </div>
                <div style={{ paddingLeft: "30px" }}>
                  <h5 className="card-text">{program.school_id}</h5>
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
          </Col>
          <Col md={5} lg={5}>
            <div className="d-flex flex-grow-1 justify-content-between">
              <div className="details-div" style={{ width: "60%" }}>
                <div className="d-flex align-items-center flex-wrap">
                  <Col>
                    <div>
                      <Row style={{ paddingTop: "20px" }}>
                        <div>
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
                        <div>
                          <FontAwesomeIcon icon={faClock} />
                          <span style={{ paddingLeft: "20px" }}>
                            {program.period}
                          </span>
                        </div>
                        <div>
                          <FontAwesomeIcon icon={faCalendarAlt} />
                          <span style={{ paddingLeft: "20px" }}>
                            {program.intakes
                              ? program.intakes.join(", ")
                              : "N/A"}
                          </span>
                        </div>
                      </Row>
                    </div>
                  </Col>
                </div>
              </div>
              <div className="fee-apply">
                <div
                  className="fee-info text-right"
                  style={{ marginTop: "25px" }}
                >
                  <p>Estimate fee</p>
                  <span>
                    <strong>RM </strong>
                    {program.cost}
                  </span>
                </div>
                <div className="apply-button mt-3">
                  <button
                    className="featured"
                    onClick={() => handleApplyNow(program)}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
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
                {locationFilters &&
                  locationFilters.map((location, index) => (
                    <Form.Check
                      key={index}
                      type="checkbox"
                      label={location.state_name}
                      checked={locationFilters.includes(location.state_name)}
                      onChange={() => handleLocationChange(location)}
                    />
                  ))}
              </Form.Group>
            </div>
            <div className="filter-group">
              <h5 style={{ marginTop: "25px" }}>Category</h5>
              <Form.Group>
                {categoriesData.map((category, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    label={category.category_name}
                    checked={categoryFilters.includes(category.category_name)}
                    onChange={() => handleCategoryChange(category)}
                  />
                ))}
              </Form.Group>
            </div>
            <div className="filter-group">
              <h5 style={{ marginTop: "25px" }}>Study Mode</h5>
              <Form.Group>
                {studyModes.map((mode, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    label={mode.studyMode_name}
                    checked={modeFilters.includes(mode.studyMode_name)}
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
                  min={minTuitionFee}
                  max={maxTuitionFee}
                  step="500"
                  value={tuitionFee}
                  onChange={handleTuitionFeeChange}
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
                  {locationFilters &&
                    locationFilters.map((location, index) => (
                      <Form.Check
                        key={index}
                        type="checkbox"
                        label={location.state_name}
                        checked={locationFilters.includes(location.state_name)}
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
                  {categoriesData.map((category, index) => (
                    <Form.Check
                      key={index}
                      type="checkbox"
                      label={category.category_name}
                      checked={categoryFilters.includes(category.category_name)}
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
                  {studyModes.map((mode, index) => (
                    <Form.Check
                      key={index}
                      type="checkbox"
                      label={mode.studyMode_name}
                      checked={modeFilters.includes(mode.studyMode_name)}
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
                    min={minTuitionFee}
                    max={maxTuitionFee}
                    step="500"
                    value={tuitionFee}
                    onChange={handleTuitionFeeChange}
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
