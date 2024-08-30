import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Pagination,
  Accordion,
  Badge,
  Spinner,
} from "react-bootstrap";
import "../../../css/StudentCss/course page css/CoursesPage.css";
import featuredBadge from "../../../assets/StudentAssets/featuredBadge/featuredBadge.png";
import StudyPal from "../../../assets/StudentAssets/coursepage image/StudyPal.png";
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

//const apiURL = `${baseURL}api/student/hpFeaturedCoursesList`;

const baseURL = import.meta.env.VITE_BASE_URL;
const apiURL = `${baseURL}api/student/courseList`;
const locationAPIURL = `${baseURL}api/student/locationFilterList`;
const studyModeAPIURL = `${baseURL}api/student/studyModeFilterlist`;
const categoryAPIURL = `${baseURL}api/student/categoryFilterList`;
const tuitionFeeAPIURL = `${baseURL}api/student/tuitionFeeFilterRange`;
const intakeAPIURL = `${baseURL}api/student/intakeFilterList`;

const CourseListing = ({
  searchResults,
  countryID,
  selectedInstitute,
  selectedQualification,
}) => {
  const [locationFilters, setLocationFilters] = useState([]);
  const [locationsData, setLocationsData] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [intakeFilters, setIntakeFilters] = useState([]);
  const [intakeData, setIntakeData] = useState([]);
  const [modeFilters, setModeFilters] = useState([]);
  const [studyModes, setStudyModes] = useState([]);
  const [tuitionFee, setTuitionFee] = useState(0);
  const [minTuitionFee, setMinTuitionFee] = useState(0);
  const [maxTuitionFee, setMaxTuitionFee] = useState(100000);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [locationOptions, setLocationOptions] = useState([]);
  const [selectedLocationFilters, setSelectedLocationFilters] = useState([]);

  const location = useLocation();
  const { selectedCategory } = location.state || {}; // Retrieve the selected category from the state

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
      const response = await fetch(`${baseURL}api/student/courseList`, {
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
      const courses = result.data.data;
      setPrograms(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Failed to fetch courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (programs.length > 0) {
      console.log("Programs before filtering:", programs);
      const filtered = programs.filter((program) => {
        console.log(
          `Program: ${program.name}, Institute Category: ${program.institute_category}`
        );
        return program.institute_category === selectedInstitute;
      });
      console.log("Filtered Programs:", filtered);
      setFilteredPrograms(filtered);
    } else {
      console.log("No programs available to filter.");
    }
  }, [programs, selectedInstitute]);

  /* --------------------End of University Dropdown------------------------ */

  /* ---------------Qualification Dropdown-------------------------------- */
  useEffect(() => {
    if (selectedQualification) {
      fetchCoursesForQualification(selectedQualification);
    }
  }, [selectedQualification]);

  const fetchCoursesForQualification = async (qualification) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseURL}api/student/courseList`, {
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
      const courses = result.data.data;
      setPrograms(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Failed to fetch courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (programs.length > 0) {
      console.log("Programs before filtering qualification: ", programs);
      const filtered = programs.filter((program) => {
        console.log(
          `Program: ${program.name}, Course Qualification: ${program.qualification}`
        );
        return program.qualification === selectedQualification;
      });
      console.log("Filtered Qualification Programs:", filtered);
      setFilteredPrograms(filtered);
    }
  }, [programs, selectedQualification]);

  /* ----------------------- End of Qualification Dropdown --------------- */

  useEffect(() => {
    console.log("Country ID changed:", countryID);
    const fetchLocationFilters = async () => {
      if (!countryID) {
        setLocationFilters([]);
        setFilteredPrograms(programs);
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

        if (Array.isArray(locationData.data) && locationData.data.length > 0) {
          setLocationFilters(locationData.data);
        } else {
          setLocationFilters([]);
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

  // useEffect(() => {
  //   if (selectedCountry) {
  //     // Fetch courses based on the selected country
  //     fetchCoursesByCountry(selectedCountry.id);
  //   }
  // }, [selectedCountry]);

  // const fetchCoursesByCountry = async (countryID) => {
  //   try {
  //     const response = await fetch(
  //       `http://192.168.0.69:8000/api/student/courseList?countryID=${countryID}`
  //     );
  //     const courses = await response.json();
  //     setCourses(courses);
  //   } catch (error) {
  //     console.error("Error fetching courses:", error);
  //   }
  // };

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
    if (selectedCategory) {
      setCategoryFilters([selectedCategory]);
    }
  }, [selectedCategory]);

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
          setPrograms(result.data.data);
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
      programs
    );
  };

  const filterPrograms = () => {
    // Extract the IDs from the searchResults array
    const searchResultIDs = searchResults
      ? searchResults.map((result) => result.id)
      : [];

    const filtered = programs.filter((program) => {
      // Convert program.id to a string if necessary for comparison
      const programIdString = String(program.id);

      // Check if the program ID matches any ID in the search results
      const matchesSearchResults =
        searchResultIDs.length === 0 || searchResultIDs.includes(program.id);

      // Debugging: Log the match status
      console.log("Program ID:", program.id);
      console.log("Matches Search Results:", matchesSearchResults);

      const matchesCountry =
        selectedCountry && selectedCountry.country_id
          ? program.countryID === selectedCountry.country_id
          : true;

      const matchesLocation =
        locationFilters.length === 0 ||
        selectedLocationFilters.length === 0 ||
        selectedLocationFilters.includes(program.location);

      const matchesCategory =
        categoryFilters.length === 0 ||
        categoryFilters.includes(program.category);

      const matchesIntake =
        intakeFilters.length === 0 ||
        (Array.isArray(program.intake) &&
          program.intake.some((intake) => intakeFilters.includes(intake)));

      const matchesMode =
        modeFilters.length === 0 || modeFilters.includes(program.mode);

      const matchesInstitute =
        !selectedInstitute || program.institute_category === selectedInstitute;

      const matchesQualification =
        !selectedQualification ||
        program.qualification === selectedQualification;

      // Return true only if the program matches all the criteria
      return (
        matchesCountry &&
        matchesLocation &&
        matchesCategory &&
        matchesIntake &&
        matchesMode &&
        matchesInstitute &&
        matchesQualification &&
        matchesSearchResults
      );
    });

    // Update the state with the filtered programs
    setFilteredPrograms(filtered);
  };

  // Ensure that filterPrograms is called whenever the relevant dependencies change
  useEffect(() => {
    filterPrograms(
      selectedLocationFilters,
      categoryFilters,
      intakeFilters,
      modeFilters,
      tuitionFee,
      programs
    );
  }, [
    selectedLocationFilters,
    categoryFilters,
    intakeFilters,
    modeFilters,
    tuitionFee,
    programs,
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
    const categoryName = category.category_name;
    let updatedCategory;

    if (categoryFilters.includes(categoryName)) {
      updatedCategory = categoryFilters.filter((c) => c !== categoryName);
    } else {
      updatedCategory = [...categoryFilters, categoryName];
    }
    setCategoryFilters(updatedCategory);
    filterPrograms(
      updatedLocations.length > 0 ? updatedLocations : [],
      updatedCategory.length > 0 ? updatedCategory : [],
      intakeFilters,
      modeFilters,
      tuitionFee,
      programs
    );
  };

  const handleIntakeChange = (intake) => {
    const intakeMonth = intake.month; // Assuming `intake` is an object with a `month` property
    const updatedIntakeFilters = [...intakeFilters];

    if (updatedIntakeFilters.includes(intakeMonth)) {
      updatedIntakeFilters.splice(updatedIntakeFilters.indexOf(intakeMonth), 1);
    } else {
      updatedIntakeFilters.push(intakeMonth);
    }

    setIntakeFilters(updatedIntakeFilters);
    filterPrograms(); // Apply filters after updating
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

  const handleInstituteChange = (institute) => {
    setSelectedInstitute(institute);
  };

  const mappedPrograms = filteredPrograms.map((program, index) => (
    <div
      key={index}
      className="card mb-4 degree-card"
      style={{ position: "relative", height: "auto" }}
    >
      {program.featured && <div className="featured-badge">Featured</div>}
      <div className="card-body d-flex flex-column flex-md-row align-items-start">
        <Row>
          <Col md={6} lg={6}>
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
                    alt={program.school_name}
                    width="100"
                  />
                </div>
                <div style={{ paddingLeft: "30px" }}>
                  <h5 className="card-text">{program.school_name}</h5>
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span style={{ paddingLeft: "10px" }}>
                    {program.location}
                  </span>
                  <a
                    href="#"
                    className="map-link"
                    style={{ paddingLeft: "5px" }}
                  >
                    Click and view on map
                  </a>
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
                            {Array.isArray(program.intake) &&
                            program.intake.length > 0
                              ? program.intake.join(", ")
                              : "N/A"}{" "}
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
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
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
