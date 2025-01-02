import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "../../../css/StudentCss/course page css/SearchCourse.css";
import {
  ButtonGroup,
  Container,
  Dropdown,
  InputGroup,
  Form,
  Pagination,
  Row,
  Col,
  Spinner,
  Accordion,
  Alert,
} from "react-bootstrap";
import CountryFlag from "react-country-flag";
import debounce from "lodash.debounce";
import StudyPal from "../../../assets/StudentAssets/coursepage image/StudyPal.webp"
import emptyStateImage from "../../../assets/StudentAssets/emptyStateImage/emptystate.png";
import { Helmet } from 'react-helmet';

const baseURL = import.meta.env.VITE_BASE_URL;
const countriesURL = `${baseURL}api/student/countryList`;
const filterURL = `${baseURL}api/student/listingFilterList`;
const courseListURL = `${baseURL}api/student/courseList`;
const adsAURL = `${baseURL}api/student/advertisementList`;
const SearchCourse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Country States
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryFilter, setCountryFilter] = useState("");

  //search state
  const [tempSearch, setTempSearch] = useState("");

  // Filter States
  const [filterData, setFilterData] = useState({
    categoryList: [],
    qualificationList: [],
    studyModeListing: [],
    intakeList: [],
    maxAmount: 0,
    institueList: [],
    state: [],
  });

  // Selected Filter States
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [selectedQualification, setSelectedQualification] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    locations: [],
    categories: [],
    intakes: [],
    studyModes: [],
    tuitionFee: 0,
  });

  // Course States
  const [programs, setPrograms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //ads image
  const [adsImageA, setAdsImageA] = useState(null);
  const [adsImageB, setAdsImageB] = useState([]);

  // Add this to your state declarations at the top of the component
  const [resultCount, setResultCount] = useState(0);

  const topRef = useRef(null);
  const scrollToTop = () => {
    // Method 2: Using scrollIntoView
    topRef.current?.scrollIntoView({ behavior: 'smooth' });

    const scrollStep = () => {
      const currentPosition = window.pageYOffset;
      if (currentPosition > 0) {
        window.requestAnimationFrame(scrollStep);
        window.scrollTo(0, currentPosition - currentPosition / 8);
      }
    };
    window.requestAnimationFrame(scrollStep);
  };

  useEffect(() => {
    if (currentPage) {
      scrollToTop();
    }
  }, [currentPage]);

  // Step 1: Fetch Countries
  const fetchCountries = async () => {
    try {
      const response = await fetch(countriesURL);
      const result = await response.json();

      if (result.data) {
        setCountries(result.data);

        // Set Malaysia as default if exists
        const malaysia = result.data.find(
          (country) => country.country_name === "Malaysia"
        );
        if (malaysia) {
          setSelectedCountry(malaysia);
        }
      }
    } catch (error) {
      //console.error("Error fetching countries:", error);
    }
  };

  // Step 2: Fetch Filters
  const fetchFilters = async (countryID) => {
    try {
      const response = await fetch(filterURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ countryID }),
      });
      const result = await response.json();
      //console.log(result)
      if (result.success) {
        setFilterData(result.data);
      }
    } catch (error) {
      // console.error("Error fetching filters:", error);
    }
  };

  // Step 3: Fetch Courses
  const fetchCourses = async () => {
    if (!selectedCountry) {
      console.log("No country selected, returning early");
      return;
    }
    setLoading(true);
    try {
      const requestBody = {
        countryID: selectedCountry.id,
        page: currentPage,
      };
      if (selectedInstitute) {
        requestBody.institute = selectedInstitute.id;
      }
      if (selectedQualification) {
        requestBody.qualification = selectedQualification.id;
      }
      if (selectedFilters.locations && selectedFilters.locations.length > 0) {
        requestBody.location = selectedFilters.locations;
      }
      if (selectedFilters.categories && selectedFilters.categories.length > 0) {
        requestBody.category = selectedFilters.categories;
      }
      if (selectedFilters.intakes && selectedFilters.intakes.length > 0) {
        requestBody.intake = selectedFilters.intakes;
      }
      if (selectedFilters.studyModes && selectedFilters.studyModes.length > 0) {
        requestBody.studyMode = selectedFilters.studyModes;
      }
      if (selectedFilters.tuitionFee) {
        requestBody.tuitionFee = selectedFilters.tuitionFee;
      }
      if (searchQuery) {
        requestBody.search = searchQuery;
      }
      if (currentPage) {
        requestBody.page = currentPage;
      }
      const response = await fetch(courseListURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      // console.log("Response status:", response.status);
      const rawResponse = await response.text();
      // console.log("Raw response:", rawResponse);
      const result = JSON.parse(rawResponse);
      //console.log(result);
      if (!result.data) {
        throw new Error("Invalid response structure");
      }
      if (result.data.length === 0) {
        console.warn("No courses found with current filters:", {
          filters: requestBody,
          total: result.total,
        });
      } else {
        console.log("fetch data");
      }
      setResultCount(result.total || 0);
      setPrograms(result.data || []);
      setTotalPages(result.last_page);
    } catch (error) {
      setError(`Failed to fetch courses: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchAddsImageA = async () => {
    try {
      const response = await fetch(adsAURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ advertisement_type: 69 }),
      });
      const result = await response.json();
      //console.log(result);
      if (result.success) {
        setAdsImageA(result.data);
      }
    } catch (error) {
      console.error("Error fetching advertisements:", error);
    }
  };

  const fetchAddsImageB = async () => {
    try {
      const response = await fetch(adsAURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ advertisement_type: 70 }),
      });
      const result = await response.json();
      // console.log(result);
      if (result.success) {
        setAdsImageB(result.data);
      }
    } catch (error) {
      console.error("Error fetching advertisements:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetchFilters(selectedCountry.id);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry) {
      fetchCourses();
      fetchAddsImageA();
      fetchAddsImageB();
    }
  }, [
    selectedCountry,
    selectedInstitute,
    selectedQualification,
    selectedFilters,
    searchQuery,
    currentPage,
  ]);

  // Uncomment and modify this useEffect to handle incoming search
  useEffect(() => {
    if (location.state?.initialSearchQuery) {
      setTempSearch(location.state.initialSearchQuery);
      setSearchQuery(location.state.initialSearchQuery);
    }
  }, [location.state?.initialSearchQuery, location.state?.searchTrigger]);

  // Add this new useEffect to trigger the search
  useEffect(() => {
    if (searchQuery && selectedCountry) {
      fetchCourses();
    }
  }, [searchQuery, selectedCountry]);

  // Handle qualification and country filters from FeaturedUni
  useEffect(() => {
    if (location.state?.initialQualification) {
      const qualification = filterData.qualificationList.find(
        (q) => q.qualification_name === location.state.initialQualification
      );
      if (qualification) {
        setSelectedQualification(qualification);
      }
    }

    if (location.state?.initialCountry) {
      const country = countries.find(
        (c) => c.country_name === location.state.initialCountry
      );
      if (country) {
        setSelectedCountry(country);
      }
    }
  }, [
    location.state?.initialQualification,
    location.state?.initialCountry,
    location.state?.filterTrigger,
    filterData.qualificationList,
    countries,
  ]);

  // Handle category filter from CoursesContainer
  useEffect(() => {
    if (location.state?.initialCategory && filterData.categoryList) {
      const category = filterData.categoryList.find(
        (c) => c.category_name === location.state.initialCategory
      );
      if (category) {
        setSelectedFilters((prev) => ({
          ...prev,
          categories: [category.id],
        }));
      }
    }
  }, [
    location.state?.initialCategory,
    location.state?.categoryTrigger,
    filterData.categoryList,
  ]);

  // Handler Functions
  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setCurrentPage(1);
    //resetFilters();
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (Array.isArray(newFilters[filterType])) {
        if (newFilters[filterType].includes(value)) {
          newFilters[filterType] = newFilters[filterType].filter(
            (v) => v !== value
          );
        } else {
          newFilters[filterType] = [...newFilters[filterType], value];
        }
      } else {
        newFilters[filterType] = value;
      }
      return newFilters;
    });
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedInstitute(null);
    setSelectedQualification(null);
    setSelectedFilters({
      locations: [],
      categories: [],
      intakes: [],
      studyModes: [],
      tuitionFee: 0,
    });
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleApplyNow = (program) => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");
    if (!token) {
      navigate("/studentPortalLogin");
    } else {
      navigate(`/studentApplyCourses/${program.id}`, {
        state: {
          programId: program.id,
          schoolLogoUrl: `${baseURL}storage/${program.logo}`,
          schoolName: program.school_name,
          courseName: program.name,
        },
      });
    }
  };

  const renderPrograms = () => {
    if (!programs.length) {
      return (
        <div
          className="blankslate-courses text-center"
          style={{ marginLeft: "100px" }}
        >
          <img
            loading="lazy"
            className="blankslate-courses-top-img"
            src={emptyStateImage}
            alt="Empty State"
          />
          <div className="blankslate-courses-body">
            <h4>No programs found</h4>
            <p>
              There are no programs that match your selected filters. Please try
              adjusting your filters and search criteria.
            </p>
          </div>
        </div>
      );
    }

    return programs.map((program, index) => (
      <React.Fragment key={program.id}>
        <div
          className="card mb-4 degree-card"
          style={{ position: "relative", height: "auto" }}
        >
          {program.featured && <div className="featured-badge">Featured</div>}
          {/* Program card content - same as your original design */}
          <div className="card-body d-flex flex-column flex-md-row align-items-start">
            <Row className="coursepage-row">
              <Col md={6} lg={6} className="course-card-ipad">
                <div className="card-image mb-3 mb-md-0">
                  <h5 className="card-title">
                    <Link
                      rel="preload"
                      to={`/courseDetails/${program.id}`}
                      style={{ color: "black" }}
                    >
                      {program.name}
                    </Link>
                  </h5>
                  <div className="coursepage-searchcourse-courselist-first">
                    <div
                      className="coursepage-img"
                      style={{ paddingLeft: "20px" }}
                    >
                      <Link
                        rel="preload"
                        to={`/knowMoreInstitute/${program.school_id}`}
                        style={{ color: "black" }}
                      >
                        <img
                          loading="lazy"
                          src={`${baseURL}storage/${program.logo}`}
                          alt={program.school_name}
                          width="100"
                          className="coursepage-img-size"
                        />
                      </Link>
                    </div>
                    <div
                      className="searchcourse-coursename-schoolname"
                    >
                      <div>
                        <Link
                            rel="preload"
                            to={`/knowMoreInstitute/${program.school_id}`}
                            style={{ color: "black" }}
                          >
                            <h5 className="card-text">
                              {program.school_name}

                            </h5>
                          </Link>

                          <i
                            className="bi bi-geo-alt"
                            style={{ marginRight: "10px", color: "#AAAAAA" }}
                          ></i>
                          <span >
                            {program.state || "N/A"}, {program.country || "N/A"}
                          </span>
                      </div>
                      <div>
                        <a
                          href={program.school_location}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Click and view on map
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={6} lg={6} className="course-card-fee-ipad">
              <div className="d-flex flex-grow-1 coursepage-searchcourse-courselist-second">
                  <div className="details-div">
                    <div className="flex-wrap coursepage-info-one">
                      <Col>
                        <div>
                          {/*<Row
                            style={{ paddingTop: "10px" }}
                            className=" coursepage-seaerchcourse-courselist-list"
                          >
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
                            <div
                              style={{ marginTop: "10px" }}
                              className="d-flex"
                            >
                              <i
                                className="bi bi-calendar2-week"
                                style={{ marginRight: "10px" }}
                              ></i>
                              <span style={{ paddingLeft: "20px" }}>
                                {Array.isArray(program.intake) &&
                                  program.intake.length > 0
                                  ? program.intake.join(", ")
                                  : "N/A"}
                              </span>
                            </div>

                          </Row>*/}
                           <div> {/* Align to bottom on iPad */}
                            <Row>
                              <div className="searchcourse-dflex-center" >
                                <i
                                  className="bi bi-mortarboard"
                                  style={{ marginRight: "10px" }}
                                ></i>
                                <p style={{ paddingLeft: "20px" }}>
                                  {program.qualification}
                                </p>
                              </div>
                              <div style={{ marginTop: "10px" }} className="searchcourse-dflex-center">
                                <i
                                  className="bi bi-calendar-check"
                                  style={{ marginRight: "10px" }}
                                ></i>
                                <p style={{ paddingLeft: "20px" }}>
                                  {program.mode}
                                </p>
                              </div>
                              <div style={{ marginTop: "10px" }} className="searchcourse-dflex-center">
                                <i
                                  className="bi bi-clock"
                                  style={{ marginRight: "10px" }}
                                ></i>
                                <p style={{ paddingLeft: "20px" }}>
                                  {program.period}
                                </p>
                              </div>
                              <div
                                style={{ marginTop: "10px" }}
                                className="searchcourse-dflex-center"
                              >
                                <i
                                  className="bi bi-calendar2-week"
                                  style={{ marginRight: "10px" }}
                                ></i>
                                <p style={{ paddingLeft: "20px" }}>
                                  {Array.isArray(program.intake) &&
                                    program.intake.length > 0
                                    ? program.intake.join(", ")
                                    : "N/A"}
                                </p>
                              </div>
                            </Row>
                          </div>
                        </div>
                      </Col>
                    </div>
                  </div>
                  <div className="fee-apply">
                    <div
                      className="fee-info text-right"
                      style={{ marginTop: "25px" }}
                    >
                      <p
                        style={{ fontSize: "14px" }}
                        className="coursepage-estimatefee"
                      >
                        estimate fee
                        <br />
                        <p style={{ fontSize: "16px" }}>
                          {program.cost === "0" || program.cost === "RM0" ? (
                            "N/A"
                          ) : (
                            <>
                              <strong>RM </strong> {program.cost}
                            </>
                          )}
                        </p>
                      </p>
                    </div>
                    <div className="apply-button">
                      {program.institute_category === "Local University" ? (
                        <button
                          onClick={() => window.location.href = `mailto:${program.email}`}
                          className="featured coursepage-applybutton"
                        >
                          Contact Now
                        </button>
                      ) : (
                        <button className="featured coursepage-applybutton" onClick={() => handleApplyNow(program)}>
                          Apply Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        {index === 2 && (
          <div key="ad" className="ad-container">
            {/*<img
              src={StudyPal}
              alt="Study Pal"
              className="studypal-image"
              style={{ height: "100px" }}
            />*/}

            {Array.isArray(adsImageB) && adsImageB.length > 0 ? (
              <div className="advertisements-container">
                {adsImageB.map((ad, index) => (
                  <div key={ad.id} className="advertisement-item mb-3">
                    <a
                      href={ad.banner_url.startsWith('http') ? ad.banner_url : `https://${ad.banner_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        loading="lazy"
                        src={`${baseURL}storage/${ad.banner_file}`}
                        alt={`Advertisement ${ad.banner_name}`}
                        className="studypal-image"
                        style={{
                          height: "100px",
                          objectFit: "fill",
                          marginBottom: index < adsImageB.length - 1 ? "20px" : "0"
                        }}
                      />
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <img
                loading="lazy"
                src={StudyPal}
                alt="Study Pal"
                className="studypal-image"
                style={{ height: "100px" }}
              />
            )}
          </div>
        )}
      </React.Fragment>
    ));
  };

  // Add these useEffects after your state declarations
  useEffect(() => {
    // Initial fetch of countries when component mounts
    fetchCountries();
  }, []);

  useEffect(() => {
    // When selectedCountry changes, fetch filters
    if (selectedCountry) {
      fetchFilters(selectedCountry.id);
    }
  }, [selectedCountry]);

  // Handle the incoming search query from FeaturedUni
  useEffect(() => {
    if (location.state?.initialSearchQuery) {
      setTempSearch(location.state.initialSearchQuery);
      setSearchQuery(location.state.initialSearchQuery);
    }
  }, [location.state]);

  // Trigger search when searchQuery or selectedCountry changes
  useEffect(() => {
    if (searchQuery && selectedCountry) {
      fetchCourses();
    }
  }, [searchQuery, selectedCountry, currentPage]);

  // Add this useEffect to handle initial data loading
  useEffect(() => {
    const initializeData = async () => {
      await fetchCountries();
      if (location.state?.initialSearchQuery && selectedCountry) {
        setTempSearch(location.state.initialSearchQuery);
        setSearchQuery(location.state.initialSearchQuery);
        fetchCourses();
      }
    };

    initializeData();
  }, []);

  const generateCourseStructuredData = (programs) => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": programs.map((program, index) => ({
        "@type": "Course",
        "position": index + 1,
        "name": program.course_name,
        "description": program.description,
        "provider": {
          "@type": "EducationalOrganization",
          "name": program.school_name,
          "address": {
            "@type": "PostalAddress",
            "addressRegion": program.state,
            "addressCountry": program.country
          }
        },
        "educationalLevel": program.qualification,
        "timeRequired": program.period,
        "startDate": program.intake?.join(", "),
        "educationalProgramMode": program.study_mode,
        "offers": {
          "@type": "Offer",
          "price": program.cost,
          "priceCurrency": "MYR"
        }
      }))
    };
  };

  // Add SEO-friendly headings and meta descriptions
  const generateSEOMetadata = () => {
    const locationText = selectedFilters.locations.length > 0
      ? filterData.state
          .filter(loc => selectedFilters.locations.includes(loc.id))
          .map(loc => loc.state_name)
          .reduce((text, location, index, array) => {
            if (index === 0) return location;
            if (index === array.length - 1) return `${text} and ${location}`;
            return `${text}, ${location}`;
          }, "")
      : selectedCountry?.country_name || "Malaysia";

    const qualificationText = selectedQualification 
      ? `${selectedQualification.qualification_name} ` 
      : "";

    const title = `Top ${resultCount} ${qualificationText}Courses in ${locationText} | StudyPal Malaysia`;
    const description = `Find and compare ${resultCount} ${qualificationText}courses in ${locationText}. Get information about fees, intake dates, and apply online.`;

    return (
      <Helmet className="notranslate">
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={`courses, ${qualificationText.toLowerCase()}, study in ${locationText.toLowerCase()}`} />
        <script type="application/ld+json">
          {JSON.stringify(generateCourseStructuredData(programs))}
        </script>
      </Helmet>
    );
  };

  const generateSEOHeading = () => {
    const locationText = selectedFilters.locations.length > 0
      ? filterData.state
          .filter(loc => selectedFilters.locations.includes(loc.id))
          .map(loc => loc.state_name)
          .reduce((text, location, index, array) => {
            if (index === 0) return location;
            if (index === array.length - 1) return `${text} and ${location}`;
            return `${text}, ${location}`;
          }, "")
      : selectedCountry?.country_name || "Malaysia";

    const searchTerms = searchQuery ? `"${searchQuery}" ` : "";
    const qualificationText = selectedQualification 
      ? `${selectedQualification.qualification_name} ` 
      : "";
    
    return (
      <div className="seo-heading mt-4 mb-4 notranslate">
        <h1 style={{ fontSize: '1.5rem', color: '#333', marginBottom: '0' }}>
          {resultCount > 0 ? `${resultCount} ` : ''}{qualificationText}Courses {searchTerms}
          in {locationText}
        </h1>
        {searchQuery && (
          <p className="text-muted">
            Showing results for "{searchQuery}" in {locationText}
          </p>
        )}
      </div>
    );
  };

  return (
    <Container>
      {generateSEOMetadata()}
      <div ref={topRef}>
        <Container>
          {generateSEOHeading()}
          {/* <h3 style={{ textAlign: "left", paddingTop: "15px" }}>
            {selectedQualification
              ? `Courses in ${selectedQualification.qualification_name}`
              : "Courses in Degree"}
          </h3> */}

          {/* Top Row - Country, University, Qualification Dropdowns */}
          <Row
            className="align-items-center mb-2 mb-md-0 saerchcourse-display-none"
            style={{ marginTop: "10px" }}
          >
            {/* Country Dropdown */}
            <Col xs={12} sm={4} md={3} lg={2} className="mb-2 mb-sm-0">
              <ButtonGroup className="w-100">
                <Dropdown as={ButtonGroup} className="w-100">
                  <Dropdown.Toggle
                    className="country-dropdown-course w-100"
                    style={{
                      backgroundColor: selectedCountry ? "white" : "",
                      color: selectedCountry ? "#000" : "",
                      border: selectedCountry ? "1px solid #B71A18" : "",
                    }}
                  >
                    {selectedCountry ? (
                      <>
                        <CountryFlag
                          countryCode={selectedCountry.country_code}
                          svg
                          style={{
                            width: "20px",
                            height: "20px",
                            marginRight: "10px",
                          }}
                        />
                        {selectedCountry.country_name}
                      </>
                    ) : (
                      "Country"
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="scrollable-dropdown">
                    {/* Country filter input */}
                    <InputGroup className="mb-2">
                      <Form.Control
                        placeholder="Filter countries"
                        onChange={(e) =>
                          setCountryFilter(e.target.value.toLowerCase())
                        }
                        value={countryFilter}
                      />
                    </InputGroup>
                    {/* Country list */}
                    {countries
                      .filter((country) =>
                        country.country_name.toLowerCase().includes(countryFilter)
                      )
                      .map((country, index) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() => handleCountryChange(country)}
                        >
                          <CountryFlag
                            countryCode={country.country_code}
                            svg
                            style={{
                              width: "20px",
                              height: "20px",
                              marginRight: "10px",
                            }}
                          />
                          {country.country_name}
                        </Dropdown.Item>
                      ))}
                  </Dropdown.Menu>
                </Dropdown>
              </ButtonGroup>
            </Col>

            {/* University Dropdown */}
            <Col xs={12} sm={4} md={3} lg={2} className="mb-2 mb-sm-0">
              <ButtonGroup className="w-100">
                <Dropdown as={ButtonGroup} className="w-100">
                  <Dropdown.Toggle
                    className="university-dropdown-course w-100"
                    style={{
                      backgroundColor: selectedInstitute ? "white" : "",
                      color: selectedInstitute ? "#000" : "",
                      border: selectedInstitute ? "1px solid #B71A18" : "",
                    }}
                  >
                    {selectedInstitute
                      ? selectedInstitute.core_metaName
                      : "University"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {filterData.institueList.map((institute, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() => setSelectedInstitute(institute)}
                      >
                        {institute.core_metaName}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </ButtonGroup>
            </Col>

            {/* Qualification Dropdown */}
            <Col xs={12} sm={4} md={3} lg={2} className="mb-2 mb-sm-0">
              <ButtonGroup className="w-100">
                <Dropdown as={ButtonGroup} className="w-100">
                  <Dropdown.Toggle
                    className="qualification-dropdown-course w-100"
                    style={{
                      backgroundColor: selectedQualification ? "white" : "",
                      color: selectedQualification ? "#000" : "",
                      border: selectedQualification ? "1px solid #B71A18" : "",
                    }}
                  >
                    {selectedQualification
                      ? selectedQualification.qualification_name
                      : "Qualification"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {filterData.qualificationList.map((qualification, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() => setSelectedQualification(qualification)}
                      >
                        {qualification.qualification_name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </ButtonGroup>
            </Col>

            {/* Reset Filter Button */}
            <Col xs={12} sm={4} md={3} lg={2} className="mb-2 mb-sm-0">
              <button
                onClick={resetFilters}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#B71A18",
                  fontWeight: "lighter",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                <i className="bi bi-funnel" style={{ marginRight: "5px" }} />
                Reset Filters
              </button>
            </Col>
          </Row>

          {/* Search Bar */}
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              fetchCourses();
            }}
          >
            <InputGroup className="mb-3  saerchcourse-display-none">
              <Form.Control
                className="custom-placeholder"
                style={{ height: "45px", marginTop: "9px" }}
                placeholder="Search for Courses, Institutions"
                value={tempSearch}
                onChange={(e) => {
                  setTempSearch(e.target.value);
                  // After 500ms, update the main searchQuery which triggers API call
                  setTimeout(() => {
                    setSearchQuery(e.target.value);
                  },1500);
                }}
              />
            </InputGroup>
          </Form>
          <div className="coursepage-reset-display-search">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                fetchCourses();
              }}
            >
              <InputGroup >
                <Form.Control
                  className="custom-placeholder"
                  style={{ height: "45px", marginTop: "9px" }}
                  placeholder="Search for Courses, Institutions"
                  value={tempSearch}
                  onChange={(e) => {
                    setTempSearch(e.target.value);
                    // After 500ms, update the main searchQuery which triggers API call
                    setTimeout(() => {
                      setSearchQuery(e.target.value);
                    }, 1500);
                  }}
                />
              </InputGroup>
            </Form>
            <button
              onClick={resetFilters}
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#B71A18",
                fontWeight: "lighter",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              <i className="bi bi-funnel" style={{ marginRight: "5px" }} />
              Reset Filters
            </button>
          </div>
          {/* Main Content */}
          <Container className="my-5">
            <Row>
              {/* Left Sidebar - Filters */}
              <Col
                md={3}
                className="location-container"
                style={{ backgroundColor: "white", padding: "10px" }}
              >
                {/* Desktop Filters */}
                <div className="filters-container">
                  {/* Location Filter */}
                  <div className="filter-group">
                    <h5 style={{ marginTop: "10px" }}>Location</h5>
                    <Form.Group>
                      {filterData.state.map((location, index) => (
                        <Form.Check
                          key={index}
                          type="checkbox"
                          label={location.state_name}
                          checked={selectedFilters.locations.includes(location.id)}
                          onChange={() =>
                            handleFilterChange("locations", location.id)
                          }
                        />
                      ))}
                    </Form.Group>
                  </div>

                  {/* Category Filter */}
                  <div className="filter-group">
                    <h5 style={{ marginTop: "25px" }}>Category</h5>
                    <Form.Group>
                      {filterData.categoryList.map((category, index) => (
                        <Form.Check
                          key={index}
                          type="checkbox"
                          label={category.category_name}
                          checked={selectedFilters.categories.includes(category.id)}
                          onChange={() =>
                            handleFilterChange("categories", category.id)
                          }
                        />
                      ))}
                    </Form.Group>
                  </div>

                  {/* Intake Filter */}
                  <div className="filter-group">
                    <h5 style={{ marginTop: "25px" }}>Intakes</h5>
                    <Form.Group>
                      {filterData.intakeList.map((intake, index) => (
                        <Form.Check
                          key={index}
                          type="checkbox"
                          label={intake.month}
                          checked={selectedFilters.intakes.includes(intake.id)}
                          onChange={() => handleFilterChange("intakes", intake.id)}
                        />
                      ))}
                    </Form.Group>
                  </div>

                  {/* Study Mode Filter */}
                  <div className="filter-group">
                    <h5 style={{ marginTop: "25px" }}>Study Mode</h5>
                    <Form.Group>
                      {filterData.studyModeListing.map((mode, index) => (
                        <Form.Check
                          key={index}
                          type="checkbox"
                          label={mode.studyMode_name}
                          checked={selectedFilters.studyModes.includes(mode.id)}
                          onChange={() => handleFilterChange("studyModes", mode.id)}
                        />
                      ))}
                    </Form.Group>
                  </div>

                  {/* Tuition Fee Filter */}
                  <div className="filter-group">
                    <h5 style={{ marginTop: "25px" }}>
                      Tuition Fee
                    </h5>
                    <Form.Group id="customRange1">
                      <Form.Label className="custom-range-label d-flex justify-content-between">
                        <span>Current: RM{(selectedFilters.tuitionFee)}</span>
                      </Form.Label>
                      <Form.Control
                        className="custom-range-input"
                        type="range"
                        min={0}
                        max={filterData.maxAmount || 100000}
                        step="500"
                        value={selectedFilters.tuitionFee}
                        onChange={(e) => handleFilterChange("tuitionFee", Number(e.target.value))}
                      />
                      <div className="d-flex justify-content-between mt-2">
                        <p>RM0</p>
                        <p>RM{(filterData.maxAmount || 100000)}</p>
                      </div>
                    </Form.Group>
                  </div>
                </div>

                {/* Mobile Accordion Filters */}
                {/* Mobile Accordion Filters */}
                <Accordion
                  //defaultActiveKey="0"
                  className="custom-accordion d-md-none"
                >
                  <Accordion.Item eventKey="0">
                    <Accordion.Header className="custom-accordion-header">
                      {selectedCountry ? (
                        <>
                          <CountryFlag
                            countryCode={selectedCountry.country_code}
                            svg
                            style={{
                              width: "20px",
                              height: "20px",
                              marginRight: "10px",
                            }}
                          />
                          {selectedCountry.country_name}
                        </>
                      ) : (
                        "Select Country"
                      )}
                    </Accordion.Header>
                    <Accordion.Body>
                      <InputGroup className="mb-2">
                        <Form.Control
                          placeholder="Filter countries"
                          onChange={(e) => setCountryFilter(e.target.value.toLowerCase())}
                          value={countryFilter}
                        />
                      </InputGroup>
                      <div className="country-list">
                        {countries
                          .filter((country) =>
                            country.country_name.toLowerCase().includes(countryFilter)
                          )
                          .map((country, index) => (
                            <Form.Check
                              key={index}
                              type="checkbox"
                              id={`country-${country.id}`}
                              label={
                                <div
                                  className="d-flex align-items-center"
                                  style={{
                                    marginRight: "10px",
                                    paddingTop: "0",
                                    paddingBottom: "0"
                                  }}>
                                  <CountryFlag
                                    countryCode={country.country_code}
                                    svg
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      marginRight: "10px",
                                      paddingTop: "0",
                                      paddingBottom: "0"
                                    }}
                                  />
                                  {country.country_name}
                                </div>
                              }
                              checked={selectedCountry?.id === country.id}
                              onChange={() => handleCountryChange(country)}
                              className="mb-2"
                            />
                          ))}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* University Accordion Item */}
                  <Accordion.Item eventKey="1">
                    <Accordion.Header className="custom-accordion-header">
                      {selectedInstitute ? selectedInstitute.core_metaName : "Select University"}
                    </Accordion.Header>
                    <Accordion.Body>
                      {filterData.institueList.map((institute, index) => (

                        <Form.Check
                          key={index}
                          type="checkbox"
                          id={`institute-${institute.id}`}
                          label={institute.core_metaName}
                          checked={selectedInstitute?.id === institute.id}
                          onChange={() => setSelectedInstitute(institute)}
                          className="mb-2"
                        />
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* Qualification Accordion Item */}
                  <Accordion.Item eventKey="2">
                    <Accordion.Header className="custom-accordion-header">
                      {selectedQualification ? selectedQualification.qualification_name : "Qualification"}
                    </Accordion.Header>
                    <Accordion.Body className="custom-accordion-body">
                      <Form.Group>
                        {filterData.qualificationList.map((qualification, index) => (
                          <Form.Check
                            key={index}
                            type="checkbox"
                            id={`qualification-${qualification.id}`}
                            label={qualification.qualification_name}
                            checked={selectedQualification?.id === qualification.id}
                            onChange={() => setSelectedQualification(qualification)}
                            className="mb-2"
                          />
                        ))}
                      </Form.Group>
                    </Accordion.Body>
                  </Accordion.Item>
                  {/* Location Filter */}
                  <Accordion.Item eventKey="3">
                    <Accordion.Header className="custom-accordion-header">
                      Location
                    </Accordion.Header>
                    <Accordion.Body className="custom-accordion-body">
                      <Form.Group>
                        {filterData.state && filterData.state.length > 0 ? ( // Changed from filterData.locations to filterData.state
                          filterData.state.map((location, index) => (
                            <Form.Check
                              key={index}
                              type="checkbox"
                              label={location.state_name}
                              checked={selectedFilters.locations.includes(
                                location.id
                              )}
                              onChange={() =>
                                handleFilterChange("locations", location.id)
                              }
                            />
                          ))
                        ) : (
                          <p className="text-muted">No locations available</p>
                        )}
                      </Form.Group>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* Course Category Filter */}
                  <Accordion.Item eventKey="4">
                    <Accordion.Header className="custom-accordion-header">
                      Category
                    </Accordion.Header>
                    <Accordion.Body className="custom-accordion-body">
                      <Form.Group>
                        {filterData.categoryList &&
                          filterData.categoryList.length > 0 ? ( // Changed from filterData.categories to filterData.categoryList
                          filterData.categoryList.map((category, index) => (
                            <Form.Check
                              key={index}
                              type="checkbox"
                              label={category.category_name}
                              checked={selectedFilters.categories.includes(
                                category.id
                              )}
                              onChange={() =>
                                handleFilterChange("categories", category.id)
                              }
                            />
                          ))
                        ) : (
                          <p className="text-muted">No categories available</p>
                        )}
                      </Form.Group>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* Qualification Filter
                  <Accordion.Item eventKey="5">
                    <Accordion.Header className="custom-accordion-header">
                      Qualification
                    </Accordion.Header>
                    <Accordion.Body className="custom-accordion-body">
                      <Form.Group>
                        {filterData.qualificationList &&
                          filterData.qualificationList.length > 0 ? (
                          filterData.qualificationList.map(
                            (qualification, index) => (
                              <Form.Check
                                key={index}
                                type="checkbox"
                                label={qualification.qualification_name}
                                checked={selectedFilters.qualifications?.includes(
                                  qualification.id
                                )}
                                onChange={() =>
                                  handleFilterChange(
                                    "qualifications",
                                    qualification.id
                                  )
                                }
                              />
                            )
                          )
                        ) : (
                          <p className="text-muted">No qualifications available</p>
                        )}
                      </Form.Group>
                    </Accordion.Body>
                  </Accordion.Item> */}

                  {/* Study Mode Filter */}
                  <Accordion.Item eventKey="6">
                    <Accordion.Header className="custom-accordion-header">
                      Study Mode
                    </Accordion.Header>
                    <Accordion.Body className="custom-accordion-body">
                      <Form.Group>
                        {filterData.studyModeListing &&
                          filterData.studyModeListing.length > 0 ? (
                          filterData.studyModeListing.map((mode, index) => (
                            <Form.Check
                              key={index}
                              type="checkbox"
                              label={mode.studyMode_name}
                              checked={selectedFilters.studyModes.includes(mode.id)}
                              onChange={() =>
                                handleFilterChange("studyModes", mode.id)
                              }
                            />
                          ))
                        ) : (
                          <p className="text-muted">No study modes available</p>
                        )}
                      </Form.Group>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* Intake Filter */}
                  <Accordion.Item eventKey="7">
                    <Accordion.Header className="custom-accordion-header">
                      Intakes
                    </Accordion.Header>
                    <Accordion.Body className="custom-accordion-body">
                      <Form.Group>
                        {filterData.intakeList &&
                          filterData.intakeList.length > 0 ? (
                          filterData.intakeList.map((intake, index) => (
                            <Form.Check
                              key={index}
                              type="checkbox"
                              label={intake.month}
                              checked={selectedFilters.intakes.includes(
                                intake.month
                              )}
                              onChange={() =>
                                handleFilterChange("intakes", intake.month)
                              }
                            />
                          ))
                        ) : (
                          <p className="text-muted">No intakes available</p>
                        )}
                      </Form.Group>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* Tuition Fee Filter */}
                  <Accordion.Item eventKey="8">
                    <Accordion.Header className="custom-accordion-header">
                      Tuition Fee
                    </Accordion.Header>
                    <Accordion.Body className="custom-accordion-body">
                      <Form.Group>
                        <Form.Label className="mb-3">
                          Range: RM{selectedFilters.tuitionFee || 0}
                        </Form.Label>
                        <Form.Control
                          type="range"
                          className="custom-range"
                          min={0}
                          max={filterData.maxAmount || 100000}
                          step={500}
                          value={selectedFilters.tuitionFee || 0}
                          onChange={(e) =>
                            handleFilterChange("tuitionFee", Number(e.target.value))
                          }
                        />
                        <div className="d-flex justify-content-between mt-2">
                          <small>RM0</small>
                          <small>RM{filterData.maxAmount || 100000}</small>
                        </div>
                      </Form.Group>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>

              {/* Right Content - Course Listings */}
              <Col xs={12} md={9}  className="degreeprograms-division">
                <div>
                  {Array.isArray(adsImageA) && adsImageA.length > 0 ? (
                    <div >
                      {adsImageA.map((ad, index) => (
                        <div key={ad.id} className="advertisement-item mb-3">
                          <a
                            href={ad.banner_url.startsWith('http') ? ad.banner_url : `https://${ad.banner_url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              loading="lazy"
                              src={`${baseURL}storage/${ad.banner_file}`}
                              alt={`Advertisement ${ad.banner_name}`}
                              className="studypal-image"
                              style={{
                                height: "175px",
                                objectFit: "fill",
                                marginBottom: index < adsImageA.length - 1 ? "20px" : "0"
                              }}
                            />
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <img
                      loading="lazy"
                      src={StudyPal}
                      alt="Study Pal"
                      className="studypal-image"
                      style={{ height: "175px" }}
                    />
                  )}
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
                  <>{renderPrograms()}</>
                )}
              </Col>
              {/* Pagination */}
              {programs.length > 0 && (
                <Pagination className="d-flex justify-content-end">
                  <Pagination.Prev
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    disabled={currentPage === 1}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </Pagination.Prev>

                  {/* First page */}
                  <Pagination.Item
                    active={1 === currentPage}
                    onClick={() => setCurrentPage(1)}
                  >
                    1
                  </Pagination.Item>

                  {/* Show dots if current page is more than 3 */}
                  {currentPage > 3 && <Pagination.Ellipsis />}

                  {/* Pages around current page */}
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    // Only show pages around current page
                    if (
                      pageNumber !== 1 && // Skip first page as it's already shown
                      pageNumber !== totalPages && // Skip last page as it will be shown separately
                      pageNumber >= currentPage - 1 &&
                      pageNumber <= currentPage + 1
                    ) {
                      return (
                        <Pagination.Item
                          key={pageNumber}
                          active={pageNumber === currentPage}
                          onClick={() => setCurrentPage(pageNumber)}
                        >
                          {pageNumber}
                        </Pagination.Item>
                      );
                    }
                    return null;
                  }).filter(Boolean)} {/* Remove null values */}

                  {/* Show dots if there are more pages */}
                  {currentPage < totalPages - 2 && <Pagination.Ellipsis />}

                  {/* Last page */}
                  {totalPages > 1 && (
                    <Pagination.Item
                      active={totalPages === currentPage}
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      {totalPages}
                    </Pagination.Item>
                  )}
                  <Pagination.Next
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </Pagination.Next>
                </Pagination>
              )}
            </Row>
          </Container >
        </Container >
      </div>
    </Container>
  );
};

export default SearchCourse;
