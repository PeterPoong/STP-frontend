import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Pagination,
  Accordion,
} from "react-bootstrap";
import "../../../css/StudentCss/institutepage css/Institute.css";
import SchoolIcon from "../../../assets/StudentAssets/icons/SchoolIcon.png";
import GraduationCapIcon from "../../../assets/StudentAssets/icons/GraduationCapIcon.png";
import BookOpenIcon from "../../../assets/StudentAssets/icons/BookOpenIcon.png";
import LocationIcon from "../../../assets/StudentAssets/icons/LocationIcon.png";

import StudyPal from "../../../assets/StudentAssets/institute image/StudyPal.png";
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
const apiURL = `${baseURL}api/student/schoolList`;
const locationAPIURL = `${baseURL}api/student/locationFilterList`;
const studylevelAPIURL = `${baseURL}api/student/qualificationFilterList`;
const studyModeAPIURL = `${baseURL}api/student/studyModeFilterlist`;
const tuitionFeeAPIURL = `${baseURL}api/student/tuitionFeeFilterRange`;
const categoryAPIURL = `${baseURL}api/student/categoryFilterList`;
const intakeAPIURL = `${baseURL}api/student/intakeFilterList`;

const InstituteListing = ({ searchResults, countryID, selectedInstitute }) => {
  const [locationFilters, setLocationFilters] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [studyLevelFilters, setStudyLevelFilters] = useState([]);
  const [intakeFilters, setIntakeFilters] = useState([]);
  const [intakeData, setIntakeData] = useState({ data: [] });
  const [modeFilters, setModeFilters] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tuitionFee, setTuitionFee] = useState(0);
  const [minTuitionFee, setMinTuitionFee] = useState(0);
  const [maxTuitionFee, setMaxTuitionFee] = useState(100000);
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [studyLevels, setStudyLevels] = useState([]);
  const [studyModes, setStudyModes] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(countryID);
  const [filteredPrograms, setFilteredPrograms] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Adjust the number of items per page as needed
  const [totalPages, setTotalPages] = useState(1);
  const [selectedLocationFilters, setSelectedLocationFilters] = useState([]);

  // Pagination
  useEffect(() => {
    setTotalPages(Math.ceil(institutes.length / itemsPerPage));
  }, [institutes, itemsPerPage]);

  const paginatedInstitutes = filteredPrograms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  /* ----------------------University Dropdown--------------------------- */

  useEffect(() => {
    if (selectedInstitute) {
      fetchCoursesForInstitute(selectedInstitute);
    }
  }, [selectedInstitute]);

  const fetchCoursesForInstitute = async (institute) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseURL}api/student/schoolList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      const courses = result.data;
      setInstitutes(courses);
    } catch (error) {
      console.error("Error fetching institutes:", error);
      setError("Failed to fetch institutes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (institutes.length > 0) {
      console.log("Programs before filtering:", institutes);
      const filtered = institutes.filter((institute) => {
        console.log(
          `Program: ${institute.name}, Institute Category: ${institute.category}`
        );
        return institute.category === selectedInstitute;
      });
      console.log("Filtered Institutrd:", filtered);
      setFilteredPrograms(filtered);
    } else {
      console.log("No institutes available to filter.");
    }
  }, [institutes, selectedInstitute]);

  /* --------------------End of University Dropdown------------------------ */

  useEffect(() => {
    console.log("Country ID changed:", countryID);
    const fetchLocationFilters = async () => {
      if (!countryID) {
        setLocationFilters([]);
        setFilteredPrograms(institutes);
        return;
      }

      try {
        console.log("Country ID received in CourseListing:", countryID);
        const response = await fetch(
          `${baseURL}api/student/locationFilterList`,
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
        console.log("Fetched Location Filters:", locationData);

        // Check if the fetched data is an array and has elements
        if (Array.isArray(locationData.data) && locationData.data.length > 0) {
          setLocationFilters(locationData.data); // Populate location filters
        } else {
          setLocationFilters([]); // Set to empty array if no data
        }
        // Filter programs after fetching location filters
        filterPrograms();
      } catch (error) {
        console.error("Error fetching locations:", error);
        setLocationFilters([]);
      }
    };

    setTimeout(() => {
      fetchLocationFilters();
    }, 100);
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
              locationFilters: locationFilters,
              categoryFilters: categoryFilters,
              intakeFilters: intakeFilters,
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
          filterPrograms();

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
    intakeFilters,
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

  useEffect(() => {
    const fetchIntakes = async () => {
      try {
        const response = await fetch(intakeAPIURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const intakeData = await response.json();
        setIntakeData(intakeData.data);
        console.log("Intakes: ", intakeData.data);
      } catch (error) {
        console.error("Error fetching intakes:", error);
      }
    };

    fetchIntakes();
  }, []);

  const handleTuitionFeeChange = (e) => {
    const { value } = e.target;
    setTuitionFee(value);
  };

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  const handleLocationChange = (location) => {
    const locationName = location.state_name.trim();
    let updatedFilters;

    if (selectedLocationFilters.includes(locationName)) {
      updatedFilters = selectedLocationFilters.filter(
        (item) => item !== locationName && item !== ""
      );
    } else {
      updatedFilters = [...selectedLocationFilters, locationName];
    }

    setSelectedLocationFilters(updatedFilters);
    console.log("Updated Location Filters:", updatedFilters);
    filterPrograms(
      updatedFilters,
      categoryFilters,
      intakeFilters,
      modeFilters,
      tuitionFee,
      institutes
    );
  };

  const filterPrograms = () => {
    const searchResultIDs = searchResults
      ? searchResults.map((result) => result.id)
      : [];

    const filtered = institutes.filter((institute) => {
      // Convert program.id to a string if necessary for comparison
      const programIdString = String(institute.id);

      // Check if the program ID matches any ID in the search results
      const matchesSearchResults =
        searchResultIDs.length === 0 || searchResultIDs.includes(institute.id);

      // Debugging: Log the match status
      console.log("Institute ID:", institute.id);
      console.log("Matches Search Results:", matchesSearchResults);

      const matchesCountry =
        selectedCountry && selectedCountry.country_id
          ? institute.countryID === selectedCountry.country_id
          : true;

      const matchesLocation =
        locationFilters.length === 0 ||
        selectedLocationFilters.length === 0 ||
        selectedLocationFilters.includes(institute.state);

      const matchesCategory =
        categoryFilters.length === 0 ||
        categoryFilters.includes(institute.category);

      // Check if any of the selected intake filters match any of the intake values in the institute
      const matchesIntake =
        intakeFilters.length === 0 ||
        (Array.isArray(institute.intake) &&
          institute.intake.some((intake) => intakeFilters.includes(intake)));

      const matchesMode =
        modeFilters.length === 0 || modeFilters.includes(institute.mode);

      const matchesInstitute =
        !selectedInstitute ||
        institute.institute_category === selectedInstitute;

      return (
        matchesCountry &&
        matchesLocation &&
        matchesCategory &&
        matchesIntake &&
        matchesMode &&
        matchesInstitute &&
        matchesSearchResults
      );
    });

    setFilteredPrograms(filtered);
  };

  useEffect(() => {
    filterPrograms(
      selectedLocationFilters,
      categoryFilters,
      intakeFilters,
      modeFilters,
      tuitionFee,
      institutes
    );
  }, [
    selectedLocationFilters,
    categoryFilters,
    intakeFilters,
    modeFilters,
    tuitionFee,
    institutes,
    searchResults, // Add searchResults as a dependency to trigger filtering when it changes
  ]);

  const handleCountryChange = async (country) => {
    setSelectedCountry(country);
    if (country && country.country_id) {
      const response = await fetch(locationAPIURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ countryID: country.country_id }),
      });

      if (response.ok) {
        const locationData = await response.json();
        setLocationFilters(locationData.data);
      } else {
        setLocationFilters([]);
      }
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
    if (intakeFilters.includes(intake.month)) {
      setIntakeFilters(intakeFilters.filter((i) => i !== intake.month));
    } else {
      setIntakeFilters([...intakeFilters, intake.month]);
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
      state_name: { institute: institute },
    }); // Navigate with state_name
  };

  const mappedInstitutes = filteredPrograms.map((institute, index) => (
    <div
      key={index}
      className="card mb-4 institute-card"
      style={{ height: "auto" }}
    >
      {institute.featured && <div className="featured-badge">Featured</div>}
      <div className="card-body d-flex flex-column flex-md-row align-items-start">
        <Row>
          <Col md={6} lg={6}>
            <div className="card-image mb-3 mb-md-0">
              <div className="d-flex align-items-center">
                <div style={{ paddingLeft: "20px" }}>
                  <img
                    src={`${baseURL}storage/${institute.logo}`}
                    alt={institute.name}
                    width="100"
                  />
                </div>
                <div style={{ paddingLeft: "10px" }}>
                  <h5 className="card-title" style={{ paddingLeft: "10px" }}>
                    {institute.name}
                  </h5>
                  {/* <h5 className="card-text">{institute.category}</h5> */}
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
                  <p className="card-text mt-2" style={{ paddingLeft: "10px" }}>
                    {institute.description}
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col md={6} lg={6}>
            <div className="d-flex flex-grow-1 justify-content-between">
              <div className="details-div" style={{ width: "60%" }}>
                <div className="d-flex align-items-center flex-wrap">
                  <Col>
                    <div>
                      <Row style={{}}>
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
                            {institute.intake
                              ? institute.intake.join(", ")
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
                    className="featured-institute-button"
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
                {locationFilters.length > 0 ? (
                  locationFilters.map(
                    (location, index) =>
                      location.state_name &&
                      location.state_name.trim() !== "" && (
                        <Form.Check
                          key={index}
                          type="checkbox"
                          label={location.state_name}
                          checked={selectedLocationFilters.includes(
                            location.state_name
                          )}
                          onChange={() => handleLocationChange(location)}
                        />
                      )
                  )
                ) : (
                  <p>No location available</p>
                )}
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
                {intakeData.length > 0 ? (
                  intakeData.map((intake) => (
                    <Form.Check
                      key={intake.id} // Use a unique key if available, `intake.id` is preferred
                      type="checkbox"
                      label={intake.month}
                      checked={intakeFilters.includes(intake.month)}
                      onChange={() => handleIntakeChange(intake)}
                    />
                  ))
                ) : (
                  <p>No intakes available</p> // Display a message if no data is available
                )}
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
                  {locationFilters.length > 0 ? (
                    locationFilters.map(
                      (location, index) =>
                        location.state_name &&
                        location.state_name.trim() !== "" && (
                          <Form.Check
                            key={index}
                            type="checkbox"
                            label={location.state_name}
                            checked={locationFilters.includes(
                              location.state_name
                            )}
                            onChange={() => handleLocationChange(location)}
                          />
                        )
                    )
                  ) : (
                    <p>No location available</p>
                  )}
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header className="custom-accordion-header">
                Study Level
              </Accordion.Header>
              <Accordion.Body className="custom-accordion-body">
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
            <Accordion.Item eventKey="4">
              <Accordion.Header className="custom-accordion-header">
                Intakes
              </Accordion.Header>
              <Accordion.Body className="custom-accordion-body">
                <Form.Group>
                  {intakeData.length > 0 ? (
                    intakeData.map((intake) => (
                      <Form.Check
                        key={intake.id} // Use a unique key if available, `intake.id` is preferred
                        type="checkbox"
                        label={intake.month}
                        checked={intakeFilters.includes(intake.month)}
                        onChange={() => handleIntakeChange(intake)}
                      />
                    ))
                  ) : (
                    <p>No intakes available</p> // Display a message if no data is available
                  )}
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
        <Col xs={12} md={8} className="degreeinstitutes-division">
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
