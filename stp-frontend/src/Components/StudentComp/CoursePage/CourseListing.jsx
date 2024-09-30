import React, { useState, useEffect, useCallback } from "react";
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
import StudyPal from "../../../assets/StudentAssets/coursepage image/StudyPal.png";
import { useNavigate } from "react-router-dom";
import SearchCourse from "./SearchCourse";
import emptyStateImage from "../../../assets/StudentAssets/emptyStateImage/emptystate.png";

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
  resetTrigger,
}) => {
  const location = useLocation();
  const { searchQuery = "" } = location.state || {};
  const { selectedCategory } = location.state || {};
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

  // Function for Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 20;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = filteredPrograms.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // End of Function for Pagination

  // Reset Filter
  const resetFilters = () => {
    setSelectedLocationFilters([]);
    setCategoryFilters([]);
    setIntakeFilters([]);
    setModeFilters([]);
    setTuitionFee("");
  };

  // Watch for changes in resetTrigger and reset the filters accordingly
  useEffect(() => {
    resetFilters();
  }, [resetTrigger]);

  const fetchCourses = useCallback(async () => {
    if (!selectedCategory) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: selectedCategory }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setCourses(result.data || []);
      setFilteredPrograms(result.data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

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
      const courses = result.data;
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

  /* ----------------Qualification Dropdown-------------------------------- */
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
      const courses = result.data;
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
      const filtered = programs.filter(
        (program) =>
          !selectedQualification ||
          program.qualification === selectedQualification.qualification_name
      );
      setFilteredPrograms(filtered);
    }
  }, [programs, selectedQualification]);

  /* ----------------------- End of Qualification Dropdown --------------- */

  // Location Filter
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

  // Study Mode Filter
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

  // Category Filter
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
        setError(error);
      }
    };

    fetchCategories();
  }, [categoryAPIURL, setCategoriesData, setError]);

  useEffect(() => {
    if (selectedCategory) {
      setCategoryFilters([selectedCategory]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    filterPrograms();
  }, [locationFilters, categoryFilters, programs, searchResults]);

  // Call all filter
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
              category: selectedCategory?.category_name,
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
          setPrograms(result.data);
          filterPrograms();
          break; // Exit while loop if successful
        } catch (error) {
          // setError(error.message);
          // console.error("Error fetching course data:", error);
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
    searchQuery,
    selectedCategory,
  ]);

  // Intakes filter
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

  // Tuition fee filter
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
    console.log("Programs before filtering:", programs);
    console.log("Search Results:", searchResults);

    const searchResultIDs =
      searchResults && Array.isArray(searchResults)
        ? searchResults.map((result) => result.id)
        : [];

    const filtered = programs.filter((program) => {
      // (searchQuery
      //   ? program.name.toLowerCase().includes(searchQuery.toLowerCase())
      //   : true) &&
      //   (selectedCategory ? program.category === selectedCategory : true);

      const matchesSearchResults =
        searchResultIDs.length === 0 || searchResultIDs.includes(program.id);

      const matchesCountry =
        selectedCountry && selectedCountry.country_id
          ? program.countryID === selectedCountry.country_id
          : true;

      const matchesLocation =
        locationFilters.length === 0 ||
        selectedLocationFilters.length === 0 ||
        selectedLocationFilters.includes(program.state);

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

      const trimmedSearchQuery = searchQuery?.trim().toLowerCase() || "";

      const matchesSearchQuery = trimmedSearchQuery
        ? program.name.toLowerCase().includes(trimmedSearchQuery) ||
          program.school_name.toLowerCase().includes(trimmedSearchQuery)
        : true;

      return (
        matchesCountry &&
        matchesLocation &&
        matchesCategory &&
        matchesIntake &&
        matchesMode &&
        matchesInstitute &&
        matchesQualification &&
        matchesSearchQuery &&
        matchesSearchResults
      );
    });

    console.log("Filtered Programs:", filtered);
    setFilteredPrograms(filtered);
  };

  useEffect(() => {
    console.log("Filtering programs with:", {
      selectedLocationFilters,
      categoryFilters,
      intakeFilters,
      modeFilters,
      tuitionFee,
      programs,
      searchResults,
      searchQuery,
    });
    filterPrograms();
  }, [
    categoryFilters,
    selectedLocationFilters,
    intakeFilters,
    modeFilters,
    tuitionFee,
    programs,
    searchResults,
    searchQuery,
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

  // useEffect(() => {
  //   if (selectedCategory) {
  //     setCategoryFilters([selectedCategory]);
  //     filterPrograms();
  //   }
  // }, [
  //   selectedCategory,
  //   locationFilters,
  //   intakeFilters,
  //   modeFilters,
  //   tuitionFee,
  //   programs,
  // ]);

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
      locationFilters.length > 0 ? locationFilters : [],
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
       navigate(`/studentApplyCourses/${program.id}`, {
      state: {
        programId: program.id,
        schoolLogoUrl: `${import.meta.env.VITE_BASE_URL}storage/${program.logo}`,
        schoolName: program.school_name,
        courseName: program.name
      }
    });
  };

  const handleInstituteChange = (institute) => {
    setSelectedInstitute(institute);
  };

  const mappedPrograms = currentCourses.map((program, index) => (
    <>
      <div
        key={program.id} // Use a unique key for each item
        className="card mb-4 degree-card"
        style={{ position: "relative", height: "auto" }}
      >
        {program.featured && <div className="featured-badge">Featured</div>}
        <div className="card-body d-flex flex-column flex-md-row align-items-start">
          <Row>
            <Col md={6} lg={6}>
              <div className="card-image mb-3 mb-md-0">
                <h5 className="card-title">
                  <Link
                    style={{ color: "black" }}
                    to={{
                      pathname: `/courseDetails/${program.id}`,
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
                    <i
                      className="bi bi-geo-alt"
                      style={{ marginRight: "10px", color: "#AAAAAA" }}
                    ></i>
                    <span style={{ paddingLeft: "10px" }}>
                      {program.state || "N/A"}, {program.country || "N/A"}
                    </span>
                    <a
                      href="#"
                      className="map-link"
                      style={{
                        paddingLeft: "35px",
                        fontWeight: "lighter",
                        color: "#1745BA",
                      }}
                    >
                      click and view on map
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
                        <Row style={{ paddingTop: "10px" }}>
                          <div>
                            <i
                              className="bi bi-mortarboard"
                              style={{ marginRight: "10px" }}
                            ></i>
                            <span style={{ paddingLeft: "20px" }}>
                              {program.qualification}
                            </span>
                          </div>
                          <div style={{ marginTop: "10px" }}>
                            <i
                              className="bi bi-calendar-check"
                              style={{ marginRight: "10px" }}
                            ></i>
                            <span style={{ paddingLeft: "20px" }}>
                              {program.mode}
                            </span>
                          </div>
                          <div style={{ marginTop: "10px" }}>
                            <i
                              className="bi bi-clock"
                              style={{ marginRight: "10px" }}
                            ></i>
                            <span style={{ paddingLeft: "20px" }}>
                              {program.period}
                            </span>
                          </div>
                          <div style={{ marginTop: "10px", display: "flex" }}>
                            <i
                              className="bi bi-calendar2-week"
                              style={{ marginRight: "10px" }}
                            ></i>
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
                    <p style={{ fontSize: "14px", marginRight: "10px" }}>
                      estimate fee<br></br>
                      <p style={{ fontSize: "16px" }}>
                        <strong>RM </strong> {program.cost}
                      </p>
                    </p>
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
              </div>
            </Col>
          </Row>
        </div>
      </div>
      {index === 2 && (
        <div key="ad" className="ad-container">
          <img
            src={StudyPal}
            alt="Study Pal"
            className="studypal-image"
            style={{ height: "100px" }}
          />
        </div>
      )}
    </>
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
            <img
              src={StudyPal}
              alt="Study Pal"
              className="studypal-image"
              style={{ height: "175px" }}
            />
          </div>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : error ? (
            <div className="text-center text-danger">
              <p>Error: {error}</p>
            </div>
          ) : (
            <>
              {filteredPrograms && filteredPrograms.length > 0 ? (
                <>
                  {console.log(
                    "Filtered programs available:",
                    filteredPrograms
                  )}
                  {mappedPrograms}
                </>
              ) : (
                <>
                  {console.log(
                    "No filtered programs available, showing empty state"
                  )}
                  <div
                    className="blankslate-courses text-center"
                    style={{ marginLeft: "100px" }}
                  >
                    <img
                      className="blankslate-courses-top-img"
                      src={emptyStateImage}
                      alt="Empty State"
                    />
                    <div className="blankslate-courses-body">
                      <h4>No programs found ☹️</h4>
                      <p>
                        There are no programs that match your selected filters.
                        Please try adjusting your filters and search criteria.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </Col>

        {/* Pagination */}
        <Pagination className="d-flex justify-content-end">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <span aria-hidden="true">&laquo;</span>
          </Pagination.Prev>

          {[...Array(totalPages).keys()].map((number) => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 === currentPage}
              onClick={() => handlePageChange(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span aria-hidden="true">&raquo;</span>
          </Pagination.Next>
        </Pagination>
      </Row>
    </Container>
  );
};

export default CourseListing;
