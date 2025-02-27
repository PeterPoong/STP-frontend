import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
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
import "../../../css/StudentCss/institutepage css/Institute.css";
import StudyPal from "../../../assets/StudentAssets/institute image/StudyPal.png";
import emptyStateImage from "../../../assets/StudentAssets/emptyStateImage/emptystate.png";
import "../../../css/StudentCss/course page css/SearchCourse.css";
import { Helmet } from "react-helmet";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";
import { Navigation, Autoplay } from "swiper/modules";
const baseURL = import.meta.env.VITE_BASE_URL;
const countriesURL = `${baseURL}api/student/countryList`;
const filterURL = `${baseURL}api/student/listingFilterList`;
const schoolListURL = `${baseURL}api/student/schoolList`;
const adsAURL = `${baseURL}api/student/advertisementList`;
const SearchInstitute = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Country States
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryFilter, setCountryFilter] = useState("");

  //ads image
  const [adsImageA, setAdsImageA] = useState(null);
  const [adsImageB, setAdsImageB] = useState([]);

  // Filter States
  const [filterData, setFilterData] = useState({
    state: [],
    categoryList: [],
    qualificationList: [], // This will be used for study level
    studyModeListing: [],
    intakeList: [],
    maxAmount: 0,
    institueList: [],
  });

  // Selected Filter States
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    locations: [],
    categories: [],
    studyLevels: [], // Changed from qualifications
    studyModes: [],
    intakes: [],
    tuitionFee: 0,
  });

  // Schools/Institutes State
  const [institutes, setInstitutes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 20;

  //search state
  const [tempSearch, setTempSearch] = useState("");

  // Add this with your other state declarations at the top
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


  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };


  // Step 1: Fetch Countries
  const fetchCountries = async () => {
    try {
      const response = await fetch(countriesURL);
      const result = await response.json();

      if (result.data) {
        setCountries(result.data);

        // Set Malaysia as default
        const malaysia = result.data.find(
          (country) => country.country_name === "Malaysia"
        );
        if (malaysia) {
          setSelectedCountry(malaysia);
        }
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
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
      // console.log(result);
      if (result.success) {
        setFilterData(result.data);
      }
    } catch (error) {
      console.error("Error fetching filters:", error);
    }
  };

  // Step 3: Fetch Schools/Institutes
  const fetchInstitutes = async () => {
    if (!selectedCountry) return;

    setLoading(true);
    try {
      const requestBody = {
        country: selectedCountry.id,
        page: currentPage,
        ...(searchQuery && { search: searchQuery }),
        ...(selectedInstitute?.id && { institute: selectedInstitute.id }),
        ...(selectedFilters.locations?.length > 0 && { 
          location: selectedFilters.locations 
        }),
        ...(selectedFilters.categories?.length > 0 && {
          category_id: selectedFilters.categories
        }),
        ...(selectedFilters.studyLevels?.length > 0 && {
          qualification_id: selectedFilters.studyLevels[0]
        }),
        ...(selectedFilters.studyModes?.length > 0 && {
          study_mode: selectedFilters.studyModes
        }),
        ...(selectedFilters.tuitionFee > 0 && {
          tuition_fee: selectedFilters.tuitionFee
        })
      };

      const response = await fetch(schoolListURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (result.success) {
        let data = Array.isArray(result.data) ? result.data : Object.values(result.data);
        const sortedData = data.length > 0 ? data.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return a.id - b.id;
        }) : [];

        setInstitutes(sortedData);
        setCurrentPage(result.current_page);
        setTotalPages(result.last_page);
        setResultCount(result.total || 0);
      }
    } catch (error) {
      console.error("Error fetching institutes:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  //Fecth Ads Image A
  const fetchAddsImageA = async () => {
    try {

      const response = await fetch(adsAURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ advertisement_type: 71 }),
      });

      const result = await response.json();
      // console.log(result);
      if (result.success) {
        setAdsImageA(result.data);
      }
    } catch (error) {
      console.error("Error fetching advertisements:", error);
    }
  };


  //Fecth Ads Image B
  const fetchAddsImageB = async () => {
    try {

      const response = await fetch(adsAURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ advertisement_type: 72 }),
      });

      const result = await response.json();
      //console.log(result);
      if (result.success) {
        setAdsImageB(result.data);
      }
    } catch (error) {
      console.error("Error fetching advertisements:", error);
    }
  };


  // Initial Load
  useEffect(() => {
    fetchCountries();
  }, []);

  // Fetch filters when country changes
  useEffect(() => {
    if (selectedCountry) {
      fetchFilters(selectedCountry.id);
    }
  }, [selectedCountry]);

  // Fetch institutes when filters change
  useEffect(() => {
    if (selectedCountry) {
      fetchInstitutes();
      fetchAddsImageA();
      fetchAddsImageB();
    }
  }, [
    selectedCountry,
    selectedInstitute,
    selectedFilters,
    searchQuery,
    currentPage,
  ]);

  // Handler Functions
  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setCurrentPage(1);
    resetFilters();
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
    setSelectedFilters({
      locations: [],
      categories: [],
      studyLevels: [],
      studyModes: [],
      intakes: [],
      tuitionFee: 0,
    });
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleKnowMoreInstitute = (institute) => {
    sessionStorage.setItem("schoolId", institute.id);
    navigate(`/university-details/${institute.name.replace(/\s+/g, '-').toLowerCase()}`);
  };

  // Update the pagination handling functions
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Replace your current pagination JSX with this updated version
  const renderPagination = () => {
    if (!institutes.length || totalPages <= 1) return null;

    return (
      <div className="d-flex justify-content-end mt-4">
        <Pagination>
          <Pagination.Prev
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          />
          {/* Pages around current page */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
              if (totalPages <= 5) return true;
              return (
                Math.abs(page - currentPage) <= 1 ||
                page === 1 ||
                page === totalPages
              );
            })
            .map((page, index, array) => {
              // Add ellipsis where there are gaps
              if (index > 0 && page - array[index - 1] > 1) {
                return (
                  <React.Fragment key={`ellipsis-${page}`}>
                    <Pagination.Ellipsis />
                    <Pagination.Item
                      active={page === currentPage}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Pagination.Item>
                  </React.Fragment>
                );
              }
              return (
                <Pagination.Item
                  key={page}
                  active={page === currentPage}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Pagination.Item>
              );
            })}

          <Pagination.Next
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    );
  };

  const renderInstitutes = () => {
    if (!institutes.length) {
      return (
        <div className="blankslate-institutes text-center">
          <img
            loading="lazy"
            src={emptyStateImage}
            alt="No results"
            style={{ height: "175px" }}
          />
          <div className="blankslate-institutes-body">
            <h4>No institutes found</h4>
            <p>
              There are no institutes that match your selected filters. Please
              try adjusting your filters and search criteria.
            </p>
          </div>
        </div>
      );
    }

    return institutes.map((institute, index) => (
      <React.Fragment key={institute.id}>
        <div className="card mb-4 institute-card">
          {institute.featured && <div className="featured-badge">Featured</div>}
          <div className="card-body d-flex flex-column flex-md-row align-items-start">
            <Row>
              <Col md={6} lg={6} className="display-potrait-school">
                <div className="card-image mb-3 mb-md-0">
                  <div
                    className="d-flex searchinstitute-one"
                    style={{ width: "100%", marginTop: "10px" }}
                  >
                    <div
                      style={{ paddingLeft: "10px" }}
                      className="searchinstitute-one-linkimage"
                    >
                      <Link
                        to={`/university-details/${institute.name.replace(/\s+/g, '-').toLowerCase()}`}
                        style={{ textDecoration: "none", color: "black" }}
                        onClick={() => sessionStorage.setItem("schoolId", institute.id)}
                      >
                        <img
                          loading="lazy"
                          src={`${baseURL}storage/${institute.logo}`}
                          alt={institute.name}
                          width="100"
                          className="searchinstitute-one-image"
                        />
                      </Link>
                    </div>
                    <div className="searchinstitute-two">
                      <Link
                        to={`/university-details/${institute.name.replace(/\s+/g, '-').toLowerCase()}`}
                        style={{ textDecoration: "none", color: "black" }}
                        onClick={() => sessionStorage.setItem("schoolId", institute.id)}
                      >
                        <h5 className="card-text">{institute.name}</h5>
                      </Link>
                      <i
                        className="bi bi-geo-alt"
                        style={{ marginRight: "10px", color: "#AAAAAA" }}
                      ></i>
                      <span>
                        {institute.state}, {institute.country}
                      </span>
                      <div>
                        <a
                        href={institute.google_map_location}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Click and view on map
                      </a>
                      </div>
                      <div>
                        <p className="card-text m-0 searchinstitute-two-description institutepage-wordbreak-all">
                          {institute.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={6} lg={6} className="display-potrait-school-two">
                <div className="d-flex flex-grow-1 justify-content-between searchinstitute-three">
                  <div
                    className="details-div-institute"
                    style={{ width: "70%" }}
                  >
                    <div className=" searchinstitute-three-list flex-wrap">
                      <Col>
                        <div>
                          <Row style={{ paddingTop: "10px" }}>
                            <div className="searchinstitute-dflex-center" >
                              <i
                                className="bi bi-building"
                                style={{ marginRight: "10px" }}
                              ></i>
                              <p style={{ paddingLeft: "20px" }}>
                                {institute.category}
                              </p>
                            </div>
                            <div style={{ marginTop: "10px" }} className="searchinstitute-dflex-center">
                              <i
                                className="bi bi-mortarboard"
                                style={{ marginRight: "10px" }}
                              ></i>
                              <p style={{ paddingLeft: "20px" }}>
                                {institute.course_count} courses offered
                              </p>
                            </div>
                            <div
                              style={{ marginTop: "10px" }}
                              className="searchinstitute-dflex-center"
                            >
                              <i
                                className="bi bi-calendar2-week"
                                style={{ marginRight: "10px" }}
                              ></i>
                              <p style={{ paddingLeft: "20px" }}>
                                {Array.isArray(institute.intake) &&
                                  institute.intake.length > 0
                                  ? institute.intake.join(", ")
                                  : "N/A"}
                              </p>
                            </div>
                          </Row>
                        </div>
                      </Col>
                    </div>
                  </div>
                  <div className="knowmore-button searchinstitute-four">
                    <button
                      className="featured-institute-button"
                      onClick={() => handleKnowMoreInstitute(institute)}
                    >
                      Know More
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        {index === 2 && (
          <div className="ad-container">
            {/*} <img
              src={StudyPal}
              alt="Study Pal"
              className="studypal-image"
              style={{ height: "100px" }}
            />*/}

            {Array.isArray(adsImageB) && adsImageB.length > 0 ? (
              <div className="advertisements-container">
                 <Swiper
                 spaceBetween={10}
                 slidesPerView={1}
                 navigation
                 autoplay={{ delay: 5000, disableOnInteraction: false }} // Ensure autoplay is enabled
                 modules={[Navigation, Autoplay]} 
                 style={{ padding: "20px 0" }}
               >
                {adsImageB.map((ad, index) => (
                  <SwiperSlide key={ad.id} className="advertisement-item mb-3">
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
                  </SwiperSlide>
                ))}
                </Swiper>
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

  // Add this function to generate SEO-friendly title and description
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

    const instituteTypeText = selectedInstitute 
      ? `${selectedInstitute.core_metaName} ` 
      : "Universities";

    const title = `Top ${resultCount} ${instituteTypeText} in ${locationText} | StudyPal Malaysia`;
    const description = `Find and compare ${resultCount} ${instituteTypeText} in ${locationText}. Get detailed information about courses, fees, scholarships, and more.`;

    return (
      <Helmet className="notranslate">
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={`universities, ${locationText.toLowerCase()}, higher education, ${instituteTypeText.toLowerCase()}`} />
        <script type="application/ld+json">
          {JSON.stringify(generateStructuredData(institutes))}
        </script>
      </Helmet>
    );
  };

  // Add the SEO heading generator function
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

    const instituteTypeText = selectedInstitute 
      ? selectedInstitute.core_metaName
      : 'Universities';
    
    return (
      <div className="seo-heading mt-4 mb-4 notranslate">
        <h1 style={{ 
          fontSize: '1.5rem', 
          color: '#333', 
          marginBottom: '1rem',
          fontWeight: '600'
        }}>
          {resultCount > 0 ? `${resultCount} ` : ''}
          {instituteTypeText} in {locationText}
        </h1>
        {searchQuery && (
          <p className="text-muted">
            Showing results for "{searchQuery}"
          </p>
        )}
      </div>
    );
  };

  const generateStructuredData = (institutes) => {
    const locationText = selectedFilters.locations.length > 0
      ? filterData.state
          .filter(loc => selectedFilters.locations.includes(loc.id))
          .map(loc => loc.state_name)
          .join(", ")
      : selectedCountry?.country_name || "Malaysia";

    const instituteTypeText = selectedInstitute 
      ? selectedInstitute.core_metaName
      : 'Universities';

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": institutes.map((institute, index) => ({
        "@type": "EducationalOrganization",
        "position": index + 1,
        "name": institute.name,
        "description": institute.description,
        "address": {
          "@type": "PostalAddress",
          "addressRegion": institute.state,
          "addressCountry": institute.country
        },
        "url": `${window.location.origin}/knowMoreInstitute/${institute.id}`,
        "offers": {
          "@type": "Offer",
          "category": institute.category,
          "availabilityStarts": institute.intake?.join(", ")
        }
      }))
    };
  };

  const handleKnowMoreClick = (id) => {
    const schoolName = institutes.find(institute => institute.id === id)?.school_name; // Get the school name
    if (schoolName) {
        sessionStorage.setItem("schoolId", id); // Store schoolId in session
        navigate(`/university-details/${schoolName.replace(/\s+/g, '-').toLowerCase()}`); // Navigate to the new URL
    }
  };

  return (
    <Container>
      <Helmet>
        <title>
          {`${selectedInstitute ? selectedInstitute.core_metaName + ' ' : ''}Universities in ${
            selectedFilters.locations.length > 0
              ? filterData.state
                  .filter(loc => selectedFilters.locations.includes(loc.id))
                  .map(loc => loc.state_name)
                  .reduce((text, location, index, array) => {
                    if (index === 0) return location;
                    if (index === array.length - 1) return `${text} and ${location}`;
                    return `${text}, ${location}`;
                  }, "")
              : selectedCountry?.country_name || "Malaysia"
          } | StudyPal Malaysia`}
        </title>
        <meta name="description" content={`Find and compare ${resultCount || ''} universities in ${
          selectedFilters.locations.length > 0
            ? filterData.state
                .filter(loc => selectedFilters.locations.includes(loc.id))
                .map(loc => loc.state_name)
                .join(", ")
            : selectedCountry?.country_name || "Malaysia"
        }. Get detailed information about courses, fees, scholarships and more.`} />
        <script type="application/ld+json">
          {JSON.stringify(generateStructuredData(institutes))}
        </script>
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <div ref={topRef}>
        <h3 style={{ textAlign: "left", paddingTop: "15px" }}>
          Institute in{" "}
          {selectedCountry ? selectedCountry.country_name : "Malaysia"}
        </h3>

        {/* Top Row - Dropdowns */}
        <Row className="align-items-center mb-2 mb-md-0 saerchinstitute-display-none">
          {/* Country Dropdown */}

          <Col xs={12} sm={4} md={3} lg={2} className="mb-2 mb-sm-0">
            <ButtonGroup className="w-100">
              <Dropdown as={ButtonGroup} className="w-100">
                <Dropdown.Toggle
                  className="country-dropdown-institute w-100"
                  style={{
                    backgroundColor: selectedCountry ? "white" : "",
                    color: selectedCountry ? "#000" : "",
                    border: selectedCountry ? "1px solid #B71A18" : "#B71A18",
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
                  <InputGroup className="mb-2 ps-3 pe-3">
                    <Form.Control
                      placeholder="Filter countries"
                      onChange={(e) =>
                        setCountryFilter(e.target.value.toLowerCase())
                      }
                      value={countryFilter}
                      className="ps-1 countryinput"
                    />
                  </InputGroup>
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

          {/* University Type Dropdown */}
          <Col xs={12} sm={4} md={3} lg={2} className="mb-2 mb-sm-0 ">
            <ButtonGroup className="w-100 ">
              <Dropdown as={ButtonGroup} className="w-100">
                <Dropdown.Toggle
                  className="university-dropdown-institute w-100"
                  style={{
                    backgroundColor: selectedInstitute ? "white" : "",
                    color: selectedInstitute ? "#000" : "",
                    border: selectedInstitute ? "1px solid #B71A18" : "#B71A18",
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

          {/* Reset Button */}
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
            fetchInstitutes();
          }}
        >
          <InputGroup className="mb-3">
            <Form.Control
              className="custom-placeholder searchinputborder"
              style={{ height: "45px", marginTop: "9px" }}
              placeholder="Search for Institutions, Country"
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

        <div className="institute-reset-display">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              fetchInstitutes();
            }}
          >
            <InputGroup >
              <Form.Control
                className="custom-placeholder searchinputborder"
                style={{ height: "45px", marginTop: "9px" }}
                placeholder="Search for Institutions, Country"
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

        {/* SEO-friendly heading below search bar */}
        {generateSEOHeading()}

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

                {/* Study Level Filter */}
                <div className="filter-group">
                  <h5 style={{ marginTop: "25px" }}>Study Level</h5>
                  <Form.Group>
                    {filterData.qualificationList.map((level, index) => (
                      <Form.Check
                        key={index}
                        type="checkbox"
                        label={level.qualification_name}
                        checked={selectedFilters.studyLevels.includes(level.id)}
                        onChange={() =>
                          handleFilterChange("studyLevels", level.id)
                        }
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

                {/* Intake Filter */}
                <div className="filter-group">
                  <h5 style={{ marginTop: "25px" }}>Intakes</h5>
                  <Form.Group>
                    {filterData.intakeList.map((intake, index) => (
                      <Form.Check
                        key={index}
                        type="checkbox"
                        label={intake.month}
                        checked={selectedFilters.intakes.includes(intake.month)}
                        onChange={() =>
                          handleFilterChange("intakes", intake.month)
                        }
                      />
                    ))}
                  </Form.Group>
                </div>

                {/* Tuition Fee Filter */}
                <div className="filter-group">
                  <h5 style={{ marginTop: "25px" }}>Tuition Fee</h5>
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
                      onChange={(e) =>
                        handleFilterChange("tuitionFee", Number(e.target.value))
                      }
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
                    <InputGroup className="mb-2 ps-3 pe-3">
                      <Form.Control
                        placeholder="Filter countries"
                        onChange={(e) => setCountryFilter(e.target.value.toLowerCase())}
                        value={countryFilter}
                      className="ps-1 countryinput"
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

                {/* University Type Accordion Item */}
                <Accordion.Item eventKey="1">
                  <Accordion.Header className="custom-accordion-header">
                    {selectedInstitute ? selectedInstitute.core_metaName : "Select University Type"}
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
                {/* Location Filter */}
                <Accordion.Item eventKey="2">
                  <Accordion.Header className="custom-accordion-header">
                    Location
                  </Accordion.Header>
                  <Accordion.Body className="custom-accordion-body">
                    <Form.Group>
                      {filterData.state && filterData.state.length > 0 ? (
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
                        <p>No location available</p>
                      )}
                    </Form.Group>
                  </Accordion.Body>
                </Accordion.Item>

                {/* Category Filter */}
                <Accordion.Item eventKey="3">
                  <Accordion.Header className="custom-accordion-header">
                    Category
                  </Accordion.Header>
                  <Accordion.Body className="custom-accordion-body">
                    <Form.Group>
                      {filterData.categoryList &&
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
                        ))}
                    </Form.Group>
                  </Accordion.Body>
                </Accordion.Item>

                {/* Study Level Filter */}
                <Accordion.Item eventKey="4">
                  <Accordion.Header className="custom-accordion-header">
                    Study Level
                  </Accordion.Header>
                  <Accordion.Body className="custom-accordion-body">
                    <Form.Group>
                      {filterData.qualificationList &&
                        filterData.qualificationList.map((level, index) => (
                          <Form.Check
                            key={index}
                            type="checkbox"
                            label={level.qualification_name}
                            checked={selectedFilters.studyLevels.includes(
                              level.id
                            )}
                            onChange={() =>
                              handleFilterChange("studyLevels", level.id)
                            }
                          />
                        ))}
                    </Form.Group>
                  </Accordion.Body>
                </Accordion.Item>

                {/* Study Mode Filter */}
                <Accordion.Item eventKey="5">
                  <Accordion.Header className="custom-accordion-header">
                    Study Mode
                  </Accordion.Header>
                  <Accordion.Body className="custom-accordion-body">
                    <Form.Group>
                      {filterData.studyModeListing &&
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
                        ))}
                    </Form.Group>
                  </Accordion.Body>
                </Accordion.Item>

                {/* Intakes Filter */}
                <Accordion.Item eventKey="6">
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
                        <p>No intakes available</p>
                      )}
                    </Form.Group>
                  </Accordion.Body>
                </Accordion.Item>

                {/* Tuition Fee Filter */}
                <Accordion.Item eventKey="7">
                  <Accordion.Header className="custom-accordion-header">
                    Tuition Fee
                  </Accordion.Header>
                  <Accordion.Body className="custom-accordion-body">
                    <Form.Group id="customRange1">
                      <Form.Label className="custom-range-label">{`RM${selectedFilters.tuitionFee}`}</Form.Label>
                      <Form.Control
                        className="custom-range-input"
                        type="range"
                        min={0}
                        max={filterData.maxAmount || 100000}
                        step="500"
                        value={selectedFilters.tuitionFee}
                        onChange={(e) =>
                          handleFilterChange("tuitionFee", Number(e.target.value))
                        }
                      />
                    </Form.Group>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>

            {/* Right Content - Institute Listings */}
            <Col xs={12} md={9} className="degreeinstitutes-division">
              {Array.isArray(adsImageA) && adsImageA.length > 0 ? (
                 <Swiper
                 spaceBetween={10}
                 slidesPerView={1}
                 navigation
                 autoplay={{ delay: 5000, disableOnInteraction: false }} // Ensure autoplay is enabled
                 modules={[Navigation, Autoplay]} 
                 style={{ padding: "20px 0" }}
               >
                  {adsImageA.map((ad, index) => (
                     <SwiperSlide key={ad.id} className="advertisement-item mb-3">
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
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <img
                  loading="lazy"
                  src={StudyPal}
                  alt="Study Pal"
                  className="studypal-image"
                  style={{ height: "175px" }}
                />
              )}

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
                <>{renderInstitutes()}</>
              )}
            </Col>
            {renderPagination()}
          </Row>
        </Container>
      </div>
    </Container>
  );
};

export default SearchInstitute;
