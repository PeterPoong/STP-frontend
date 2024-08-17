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
import SchoolIcon from "../../../assets/student asset/icons/SchoolIcon.png";
import GraduationCapIcon from "../../../assets/student asset/icons/GraduationCapIcon.png";
import BookOpenIcon from "../../../assets/student asset/icons/BookOpenIcon.png";
import LocationIcon from "../../../assets/student asset/icons/LocationIcon.png";

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
const locationAPIURL =
  "http://192.168.0.69:8000/api/student/locationFilterList";
const studylevelAPIURL =
  "http://192.168.0.69:8000/api/student/qualificationFilterList";
const studyModeAPIURL =
  "http://192.168.0.69:8000/api/student/studyModeFilterlist";
const tuitionFeeAPIURL =
  "http://192.168.0.69:8000/api/student/tuitionFeeFilterRange";
const categoryAPIURL =
  "http://192.168.0.69:8000/api/student/categoryFilterList";

const InstituteListing = ({ searchResults, countryID }) => {
  const [locationFilters, setLocationFilters] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [studyLevelFilters, setStudyLevelFilters] = useState([]);
  const [intakeFilters, setIntakeFilters] = useState([]);
  const [modeFilters, setModeFilters] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tuitionFee, setTuitionFee] = useState(0);
  const [minTuitionFee, setMinTuitionFee] = useState(0);
  const [maxTuitionFee, setMaxTuitionFee] = useState(100000);
  const navigate = useNavigate(); // Initialize useNavigate
  const [locations, setLocations] = useState([]); // New state for locations
  const [studyLevels, setStudyLevels] = useState([]);
  const [studyModes, setStudyModes] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(countryID);
  const [filteredPrograms, setFilteredPrograms] = useState([]);

  const StudyLevel = ["PRE UNIVERSITY", "DIPLOMA", "DEGREE", "MASTER", "PHD"];

  const Intakes = ["MARCH", "AUGUST", "OCTOBER", "SEPTEMBER"];

  const modes = ["Full time", "Part time", "Remote"];

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

          const locationData = await response.json();
          console.log("Fetched Location Filters:", locationData); // Debugging line
          if (
            Array.isArray(locationData.data) &&
            locationData.data.length > 0
          ) {
            setLocationFilters(locationData.data); // Populate location filters
          } else {
            setLocationFilters([]); // Set to empty array if no data
          }
        } catch (error) {
          console.error("Error fetching locations:", error);
          setLocationFilters([]); // Set to empty array in case of error
        }
      } else {
        setLocationFilters([]); // Reset location filters if no countryID is selected
      }
    };

    fetchLocationFilters();
  }, [countryID]);

  useEffect(() => {
    const fetchStudyLevels = async () => {
      try {
        const response = await fetch(studylevelAPIURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const studyLevelsData = await response.json();
        setStudyLevels(studyLevelsData.data);
      } catch (error) {
        console.error("Error fetching study levels:", error);
      }
    };

    fetchStudyLevels();
  }, []);

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
              // countryID: selectedCountry,

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
          setInstitutes(result.data);
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

  const handleTuitionFeeChange = (e) => {
    const { value } = e.target;
    setTuitionFee(value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLocationChange = (location) => {
    const locationName = location.state;
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
      institutes
    );
  };

  const filterPrograms = (
    locations,
    categories,
    modes,
    fee,
    allPrograms = institutes
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
      filtered = filtered.filter((institute) =>
        locations.includes(institute.location)
      );
    }

    // Apply category filter
    if (categories.length > 0) {
      filtered = filtered.filter((institute) =>
        institute.includes(institute.category)
      );
    }

    // Apply study mode filter
    if (modes.length > 0) {
      filtered = filtered.filter((institute) => modes.includes(institute.mode));
    }

    // Apply tuition fee filter
    if (fee > 0) {
      filtered = filtered.filter((institute) => institute.cost <= fee);
    }

    // Set the filtered programs
    setFilteredPrograms(filtered);
  };

  const handleCountryChange = async (country) => {
    setSelectedCountry(country);
    if (country) {
      const response = await fetch(locationAPIURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ countryID: countryID }),
      });
      const locationFiltersData = await response.json();
      setLocationFilters(locationFiltersData.data);
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

  const handleIntakeChange = (intake) => {
    if (intakeFilters.includes(intake)) {
      setIntakeFilters(intakeFilters.filter((i) => i !== intake));
    } else {
      setIntakeFilters([...intakeFilters, intake]);
    }
  };

  const handleModeChange = (mode) => {
    if (modeFilters.includes(mode.studyMode_name)) {
      setModeFilters(modeFilters.filter((m) => m !== mode.studyMode_name));
    } else {
      setModeFilters([...modeFilters, mode.studyMode_name]);
    }
  };

  const handleStudyLevelChange = (level) => {
    if (studyLevelFilters.includes(level.id)) {
      setStudyLevelFilters(studyLevelFilters.filter((l) => l !== level.id));
    } else {
      setStudyLevelFilters([...studyLevelFilters, level.id]);
    }
  };

  const handleKnowMoreInstitute = (institute) => {
    navigate(`/knowMoreInstitute/${institute.id}`, {
      state: { institute: institute },
    }); // Navigate with state
  };

  // Ensure displayInstitutes is always an array
  // const displayInstitutes =
  //   Array.isArray(searchResults) && searchResults.length > 0
  //     ? searchResults
  //     : institutes;
  const displayInstitutes =
    Array.isArray(searchResults) && searchResults.length > 0
      ? searchResults
      : Array.isArray(institutes)
      ? institutes.filter((institute) => {
          const matchesLocation =
            locationFilters.length === 0 ||
            locationFilters.includes(institute.location);
          const matchesCategory =
            categoryFilters.length === 0 ||
            categoryFilters.includes(institute.category);
          const matchesMode =
            modeFilters.length === 0 || modeFilters.includes(institute.mode);
          // const matchesFee = tuitionFee === 0 || program.cost <= tuitionFee&& matchesFee;
          return matchesLocation && matchesCategory && matchesMode;
        })
      : [];

  const mappedInstitutes = displayInstitutes.map((institute, index) => (
    <div
      key={index}
      className="card mb-4 institute-card"
      style={{ height: "auto" }}
    >
      {institute.featured && <div className="featured-badge">Featured</div>}
      <div className="card-body d-flex flex-column flex-md-row align-items-start">
        <Row>
          <Col md={7} lg={7}>
            <div className="card-image mb-3 mb-md-0">
              <h5 className="card-title" style={{ paddingLeft: "20px" }}>
                {institute.name}
              </h5>
              <div className="d-flex align-items-center">
                <div style={{ paddingLeft: "20px" }}>
                  <img
                    src={`${baseURL}storage/${institute.logo}`}
                    alt={institute.name}
                    width="100"
                  />
                </div>
                <div style={{ paddingLeft: "10px" }}>
                  <h5 className="card-text">{institute.category}</h5>
                  <div className="d-flex align-items-center">
                    <img src={LocationIcon} alt="Location" width="40" />{" "}
                    {/* Adjusted width */}
                    <span style={{ paddingLeft: "10px" }}>
                      {institute.city}, {institute.state}, {institute.country}
                    </span>
                  </div>
                  <div>
                    <a
                      href="#"
                      className="map-link"
                      style={{ paddingLeft: "5px" }}
                    >
                      click and view on map
                    </a>
                  </div>
                  <p className="card-text mt-2">{institute.description}</p>
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
                          <img src={SchoolIcon} alt="School" width="40" />
                          <span style={{ paddingLeft: "20px" }}>
                            {institute.category}
                          </span>
                        </div>
                        <div>
                          <img
                            src={GraduationCapIcon}
                            alt="Graduation Cap"
                            width="40"
                          />
                          <span style={{ paddingLeft: "20px" }}>
                            {institute.id}
                          </span>
                        </div>
                        <div>
                          <img src={BookOpenIcon} alt="Book Open" width="40" />
                          <span style={{ paddingLeft: "20px" }}>
                            {institute.intakes
                              ? institute.intakes.join(", ")
                              : "N/A"}
                          </span>
                        </div>
                      </Row>
                    </div>
                  </Col>
                </div>
              </div>
              <div className="fee-apply">
                <div className="knowmore-button">
                  <button
                    className="featured"
                    onClick={() => handleKnowMoreInstitute(institute)}
                    style={{ marginTop: "90px", width: "150px" }}
                  >
                    Know More
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
                      label={location.state}
                      checked={locationFilters.includes(location.state)}
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
              <h5 style={{ marginTop: "25px" }}>Study Level</h5>
              <Form.Group>
                {studyLevels.map((level, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    label={level.qualification_name}
                    checked={studyLevelFilters.includes(level.id)}
                    onChange={() => handleStudyLevelChange(level)}
                  />
                ))}
              </Form.Group>
            </div>
            <div className="filter-group">
              <h5 style={{ marginTop: "25px" }}>Intakes</h5>
              <Form.Group>
                {Intakes.map((intake, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    label={intake}
                    checked={intakeFilters.includes(intake)}
                    onChange={() => handleIntakeChange(intake)}
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
                Study Level
              </Accordion.Header>
              <Accordion.Body className="custom-accordion-body">
                <Form.Group>
                  {StudyLevel.map((level, index) => (
                    <Form.Check
                      key={index}
                      type="checkbox"
                      label={level}
                      checked={studyLevelFilters.includes(level)}
                      onChange={() => handleStudyLevelChange(level)}
                    />
                  ))}
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
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
            <Accordion.Item eventKey="3">
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
            <Accordion.Item eventKey="4">
              <Accordion.Header className="custom-accordion-header">
                Intakes
              </Accordion.Header>
              <Accordion.Body className="custom-accordion-body">
                <Form.Group>
                  {Intakes.map((intake, index) => (
                    <Form.Check
                      key={index}
                      type="checkbox"
                      label={intake}
                      checked={intakeFilters.includes(intake)}
                      onChange={() => handleIntakeChange(intake)}
                    />
                  ))}
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
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
          ) : institutes.length > 0 ? (
            mappedInstitutes
          ) : (
            <div>No institute available</div>
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
        {/* <Col xs={12} className="d-flex justify-content-end">
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
        </Col> */}
      </Row>
    </Container>
  );
};

export default InstituteListing;
