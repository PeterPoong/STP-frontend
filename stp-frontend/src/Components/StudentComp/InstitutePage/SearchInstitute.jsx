import React, { useState, useEffect, useCallback, useRef, useMemo, Suspense, lazy } from "react";
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
import { debounce } from 'lodash';
import { FixedSizeList as List } from 'react-window';
import { dotWave, dotPulse } from 'ldrs'

// Register the ldrs loader
dotWave.register()
dotPulse.register()

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

  // Add this state near other state declarations
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Add new state for filter loading and search
  const [filterLoading, setFilterLoading] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState({});
  const [filterSearch, setFilterSearch] = useState("");

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

  // Optimize filter fetching with caching
  const fetchFilters = useCallback(async (countryID) => {
    setFilterLoading(true);
    try {
      // Check cache first
      const cacheKey = `institute_filters_${countryID}`;
      const cachedData = sessionStorage.getItem(cacheKey);
      
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        setFilterData(parsedData);
        setFilterLoading(false);
        return;
      }
      
      const response = await fetch(filterURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ countryID }),
      });
      const result = await response.json();

      if (result.success) {
        // Cache results for future visits
        sessionStorage.setItem(cacheKey, JSON.stringify(result.data));
        setFilterData(result.data);
      }
    } catch (error) {
      console.error("Error fetching filters:", error);
    } finally {
      setFilterLoading(false);
    }
  }, []);

  // Implement debounced search
  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchQuery(value);
    }, 500),
    []
  );

  // Add a virtualized list component for large filter sets
  const VirtualizedFilterList = ({ items, selectedItems, onItemSelect, height = 200 }) => {
    // Filter displayed items if there's a search term
    const filteredItems = useMemo(() => {
      if (!filterSearch) return items;
      return items.filter(item => {
        const label = item.category_name || item.state_name || item.level_name || '';
        return label.toLowerCase().includes(filterSearch.toLowerCase());
      });
    }, [items, filterSearch]);
    
    const Row = ({ index, style }) => {
      const item = filteredItems[index];
      if (!item) return null;
      return (
        <div style={style}>
          <Form.Check
            type="checkbox"
            id={`filter-${item.id}`}
            label={item.category_name || item.state_name || item.level_name}
            checked={selectedItems.includes(item.id)}
            onChange={() => onItemSelect(item.id)}
          />
        </div>
      );
    };

    return (
      <>
        {items.length > 15 && (
          <Form.Control
            size="sm"
            placeholder="Search filters..."
            value={filterSearch}
            onChange={e => setFilterSearch(e.target.value)}
            className="mb-2"
          />
        )}
        <List
          height={Math.min(height, filteredItems.length * 35)}
          itemCount={filteredItems.length}
          itemSize={35}
          width="100%"
          className="custom-filter-list"
        >
          {Row}
        </List>
      </>
    );
  };

  // Function to toggle expanded state of a filter section
  const toggleFilterExpand = (filterType) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  // Render a filter section with proper loading state and optimization
  const renderFilterSection = (title, filterType, items, selectedItems, onItemSelect) => {
    const isExpanded = expandedFilters[filterType];
    const itemCount = items ? items.length : 0;
    const showVirtualized = itemCount > 15;
    const displayLimit = 8;
    
    return (
      <div className="filter-group">
        <h5 style={{ marginTop: "25px" }}>
          {title}
          {itemCount > displayLimit && (
            <small 
              className="ms-2 text-primary cursor-pointer" 
              onClick={() => toggleFilterExpand(filterType)}
              style={{ cursor: 'pointer', fontSize: '0.8rem' }}
            >
              {isExpanded ? 'Show less' : `Show all (${itemCount})`}
            </small>
          )}
        </h5>
        
        {filterLoading ? (
          <div className="d-flex justify-content-center my-3">
            <l-dot-pulse
              size="30"
              speed="1.5" 
              color="#b71a18" 
            ></l-dot-pulse>
          </div>
        ) : !items || items.length === 0 ? (
          <p className="text-muted">No options available</p>
        ) : showVirtualized && isExpanded ? (
          <VirtualizedFilterList 
            items={items} 
            selectedItems={selectedItems}
            onItemSelect={onItemSelect}
          />
        ) : (
          <Form.Group>
            {(isExpanded ? items : items.slice(0, displayLimit)).map((item, index) => (
              <Form.Check
                key={index}
                type="checkbox"
                label={getItemLabel(item)}
                checked={selectedItems.includes(getItemId(item, filterType))}
                onChange={() => onItemSelect(getItemId(item, filterType))}
              />
            ))}
          </Form.Group>
        )}
      </div>
    );
  };

  // Helper function to get the appropriate label based on item type
  const getItemLabel = (item) => {
    if (item.category_name) return item.category_name;
    if (item.state_name) return item.state_name;
    if (item.qualification_name) return item.qualification_name;
    if (item.studyMode_name) return item.studyMode_name;
    if (item.month) return item.month;
    if (item.level_name) return item.level_name;
    return '';
  };

  // Helper function to get the appropriate ID based on filter type
  const getItemId = (item, filterType) => {
    if (filterType === "intakes") return item.month;
    return item.id;
  };

  // Step 3: Fetch Schools/Institutes
  const fetchInstitutes = async () => {
    if (!selectedCountry) return;

    setLoading(true);
    setError(null);
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

      console.log("Fetching institutes for page:", currentPage);
      
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
        setCurrentPage(result.current_page || currentPage);
        setTotalPages(result.last_page || 1);
        setResultCount(result.total || 0);
        
        console.log(`Loaded page ${result.current_page} of ${result.last_page}, with ${sortedData.length} institutes`);
      } else {
        console.error("API returned success:false", result);
        setError("Failed to fetch institutes data");
      }
    } catch (error) {
      console.error("Error fetching institutes:", error);
      setError(error.message || "An error occurred while fetching institutes");
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
    console.log("Changing page to:", pageNumber);
    setCurrentPage(pageNumber);
    scrollToTop();
  };

  // Replace your current pagination rendering function with this updated version
  const renderPagination = () => {
    if (!institutes.length || totalPages <= 1) return null;

    return (
      <Pagination className="pagination-custom">
        <Pagination.Prev
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <span aria-hidden="true">&laquo;</span>
        </Pagination.Prev>
        
        {/* First page */}
        <Pagination.Item
          active={1 === currentPage}
          onClick={() => handlePageChange(1)}
        >
          1
        </Pagination.Item>
        
        {/* Show dots if current page is more than 3 */}
        {currentPage > 3 && <Pagination.Ellipsis />}
        
        {/* Pages around current page */}
        {[...Array(totalPages)]
          .map((_, index) => {
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
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </Pagination.Item>
              );
            }
            return null;
          })
          .filter(Boolean)} {/* Remove null values */}
        
        {/* Show dots if there are more pages */}
        {currentPage < totalPages - 2 && <Pagination.Ellipsis />}
        
        {/* Last page */}
        {totalPages > 1 && (
          <Pagination.Item
            active={totalPages === currentPage}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </Pagination.Item>
        )}
        
        <Pagination.Next
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <span aria-hidden="true">&raquo;</span>
        </Pagination.Next>
      </Pagination>
    );
  };

  const renderInstitutes = () => {
    if (!institutes.length) {
      return (
        <div className="blankslate-institutes text-center mx-auto col-11 col-md-8 col-lg-6">
          <img
            loading="lazy"
            src={emptyStateImage}
            alt="No results"
            className="img-fluid"
            style={{ 
              maxWidth: "100%",
              height: "auto",
              maxHeight: "175px"
            }}
          />
          <div className="blankslate-institutes-body mt-3">
            <h4 className="h5 h4-md">No institutes found</h4>
            <p className="mb-0 d-none d-md-block">
              There are no institutes that match your selected filters. Please
              try adjusting your filters and search criteria.
            </p>
            <p className="mb-0 d-block d-md-none">
              No results match your filters. Try adjusting your search criteria.
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

  // Add this function to count selected filters
  const countSelectedFilters = () => {
    return Object.values(selectedFilters).reduce((count, filter) => {
      if (Array.isArray(filter)) {
        return count + filter.length;
      } else if (filter > 0) {
        return count + 1;
      }
      return count;
    }, 0);
  };

  // Optimize institute rendering with memoization
  const renderedInstitutes = useMemo(() => {
    return renderInstitutes();
  }, [institutes, handleKnowMoreInstitute]);

  // Optimize search functionality with debounce
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setTempSearch(value);
    debouncedSearch(value);
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
                    ? selectedInstitute.institute_name || selectedInstitute.core_metaName || selectedInstitute.name
                    : "University"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {filterData.institueList.map((institute, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => setSelectedInstitute(institute)}
                    >
                      {institute.institute_name || institute.core_metaName || institute.name}
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
          <Form.Control
            className="custom-placeholder searchinputborder saerchinstitute-display-none"
            style={{ height: "45px", marginTop: "9px" }}
            placeholder="Search for Institutions, Country"
            value={tempSearch}
            onChange={handleSearchChange}
          />
        </Form>

        <div className="institute-reset-display">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              fetchInstitutes();
            }}
            className="d-flex align-items-center gap-2"
          >
            <Form.Control
              className="custom-placeholder searchinputborder"
              style={{ height: "45px", marginTop: "9px" }}
              placeholder="Search for Institutions, Country"
              value={tempSearch}
              onChange={handleSearchChange}
            />
            
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="mobile-filter-button d-flex mt-3"
            >
              <i
                className={`bi bi-funnel${
                  countSelectedFilters() > 0 ? "-fill" : ""
                }`}
              ></i>
              <span>Filter</span>
              {countSelectedFilters() > 0 && (
                <span className="ms-1">({countSelectedFilters()})</span>
              )}
            </button>
          </Form>
        </div>

        {/* SEO-friendly heading below search bar */}
        {generateSEOHeading()}

        {/* Main Content */}
        <Container className="my-5">
          <Row>
            {/* Left Sidebar - Filters */}
            <Col
              md={3}
              className="location-container d-none d-md-block"
              style={{ backgroundColor: "white", padding: "10px" }}
            >
              {/* Desktop Filters */}
              <div className="filters-container">
                {/* Replace existing filter sections with optimized versions */}
                {renderFilterSection(
                  "Location", 
                  "locations", 
                  filterData.state || [], 
                  selectedFilters.locations,
                  (id) => handleFilterChange("locations", id)
                )}
                
                {renderFilterSection(
                  "Category", 
                  "categories", 
                  filterData.categoryList || [], 
                  selectedFilters.categories,
                  (id) => handleFilterChange("categories", id)
                )}
                
                {renderFilterSection(
                  "Study Level", 
                  "studyLevels", 
                  filterData.qualificationList || [], 
                  selectedFilters.studyLevels,
                  (id) => handleFilterChange("studyLevels", id)
                )}

                {/* Study Mode Filter */}
                {renderFilterSection(
                  "Study Mode", 
                  "studyModes", 
                  filterData.studyModeListing || [], 
                  selectedFilters.studyModes,
                  (id) => handleFilterChange("studyModes", id)
                )}

                {/* Intake Filter */}
                {renderFilterSection(
                  "Intakes", 
                  "intakes", 
                  filterData.intakeList || [], 
                  selectedFilters.intakes,
                  (month) => handleFilterChange("intakes", month)
                )}

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
                            objectFit: "contain",
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
                  <l-dot-wave 
                    color="#b71a18"
                  ></l-dot-wave>
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : error ? (
                <div className="text-center text-danger">
                  <p>Error: {error}</p>
                </div>
              ) : (
                <>{renderedInstitutes}</>
              )}
            </Col>
            {renderPagination()}
          </Row>
        </Container>
      </div>

      {/* Mobile Filters */}
      <div className={`mobile-filters-container ${showMobileFilters ? 'show' : ''}`}>
        {/* Close button */}
        <button 
          onClick={() => setShowMobileFilters(false)}
          className="mobile-close-button"
          style={{
            position: 'absolute',
            marginLeft: '-50px',
            marginTop:'-50px',
            background: 'none',
            border: 'none',
            fontSize: '2rem',
            color: '#495057',
            zIndex: 1
          }}
        > 
          &times;
        </button>
        
        <div className="accordion-scroll-container">
          <Accordion
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
                          type="radio"
                          name="country"
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

              {/* University Filter */}
              <Accordion.Item eventKey="1">
                <Accordion.Header className="custom-accordion-header">
                  {selectedInstitute 
                    ? selectedInstitute.institute_name || selectedInstitute.core_metaName || selectedInstitute.name 
                    : "Select University"}
                </Accordion.Header>
                <Accordion.Body>
                  {filterData.institueList.map((institute, index) => (
                    <Form.Check
                      key={index}
                      type="radio"
                      name="university"
                      id={`institute-${institute.id}`}
                      label={institute.institute_name || institute.core_metaName || institute.name}
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
                    {filterLoading ? (
                      <div className="text-center py-2">
                        <l-dot-pulse
                          size="30"
                          speed="1.5" 
                          color="#b71a18" 
                        ></l-dot-pulse>
                      </div>
                    ) : (
                      <Form.Group>
                        {expandedFilters.mobileLocations && filterData.state && filterData.state.length > 15 ? (
                          <VirtualizedFilterList 
                            items={filterData.state} 
                            selectedItems={selectedFilters.locations}
                            onItemSelect={(id) => handleFilterChange("locations", id)}
                          />
                        ) : (
                          filterData.state && filterData.state.map((location, index) => (
                            <Form.Check
                              key={index}
                              type="checkbox"
                              label={location.state_name}
                              checked={selectedFilters.locations.includes(location.id)}
                              onChange={() => handleFilterChange("locations", location.id)}
                            />
                          ))
                        )}
                      </Form.Group>
                    )}
                  </Accordion.Body>
                </Accordion.Item>

                {/* Category Filter */}
                <Accordion.Item eventKey="3">
                  <Accordion.Header className="custom-accordion-header">
                    Category
                  </Accordion.Header>
                  <Accordion.Body className="custom-accordion-body">
                    {filterLoading ? (
                      <div className="text-center py-2">
                        <l-dot-pulse
                          size="30"
                          speed="1.5" 
                          color="#b71a18" 
                        ></l-dot-pulse>
                      </div>
                    ) : (
                      <Form.Group>
                        {expandedFilters.mobileCategories && filterData.categoryList && filterData.categoryList.length > 15 ? (
                          <VirtualizedFilterList 
                            items={filterData.categoryList} 
                            selectedItems={selectedFilters.categories}
                            onItemSelect={(id) => handleFilterChange("categories", id)}
                          />
                        ) : (
                          filterData.categoryList && filterData.categoryList.map((category, index) => (
                            <Form.Check
                              key={index}
                              type="checkbox"
                              label={category.category_name}
                              checked={selectedFilters.categories.includes(category.id)}
                              onChange={() => handleFilterChange("categories", category.id)}
                            />
                          ))
                        )}
                      </Form.Group>
                    )}
                  </Accordion.Body>
                </Accordion.Item>

                {/* Study Level Filter */}
                <Accordion.Item eventKey="4">
                  <Accordion.Header className="custom-accordion-header">
                    Study Level
                  </Accordion.Header>
                  <Accordion.Body className="custom-accordion-body">
                    {filterLoading ? (
                      <div className="text-center py-2">
                        <l-dot-pulse
                          size="30"
                          speed="1.5" 
                          color="#b71a18" 
                        ></l-dot-pulse>
                      </div>
                    ) : (
                      <Form.Group>
                        {expandedFilters.mobileStudyLevels && filterData.qualificationList && filterData.qualificationList.length > 15 ? (
                          <VirtualizedFilterList 
                            items={filterData.qualificationList} 
                            selectedItems={selectedFilters.studyLevels}
                            onItemSelect={(id) => handleFilterChange("studyLevels", id)}
                          />
                        ) : (
                          filterData.qualificationList && filterData.qualificationList.map((level, index) => (
                            <Form.Check
                              key={index}
                              type="checkbox"
                              label={level.qualification_name}
                              checked={selectedFilters.studyLevels.includes(level.id)}
                              onChange={() => handleFilterChange("studyLevels", level.id)}
                            />
                          ))
                        )}
                      </Form.Group>
                    )}
                  </Accordion.Body>
                </Accordion.Item>

                {/* Study Mode Filter */}
                <Accordion.Item eventKey="5">
                  <Accordion.Header className="custom-accordion-header">
                    Study Mode
                  </Accordion.Header>
                  <Accordion.Body className="custom-accordion-body">
                    {filterLoading ? (
                      <div className="text-center py-2">
                        <l-dot-pulse
                          size="30"
                          speed="1.5" 
                          color="#b71a18" 
                        ></l-dot-pulse>
                      </div>
                    ) : (
                      <Form.Group>
                        {expandedFilters.mobileStudyModes && filterData.studyModeListing && filterData.studyModeListing.length > 15 ? (
                          <VirtualizedFilterList 
                            items={filterData.studyModeListing} 
                            selectedItems={selectedFilters.studyModes}
                            onItemSelect={(id) => handleFilterChange("studyModes", id)}
                          />
                        ) : (
                          filterData.studyModeListing && filterData.studyModeListing.map((mode, index) => (
                            <Form.Check
                              key={index}
                              type="checkbox"
                              label={mode.studyMode_name}
                              checked={selectedFilters.studyModes.includes(mode.id)}
                              onChange={() => handleFilterChange("studyModes", mode.id)}
                            />
                          ))
                        )}
                      </Form.Group>
                    )}
                  </Accordion.Body>
                </Accordion.Item>

                {/* Intakes Filter */}
                <Accordion.Item eventKey="6">
                  <Accordion.Header className="custom-accordion-header">
                    Intakes
                  </Accordion.Header>
                  <Accordion.Body className="custom-accordion-body">
                    {filterLoading ? (
                      <div className="text-center py-2">
                        <l-dot-pulse
                          size="30"
                          speed="1.5" 
                          color="#b71a18" 
                        ></l-dot-pulse>
                      </div>
                    ) : (
                      <Form.Group>
                        {expandedFilters.mobileIntakes && filterData.intakeList && filterData.intakeList.length > 15 ? (
                          <VirtualizedFilterList 
                            items={filterData.intakeList} 
                            selectedItems={selectedFilters.intakes}
                            onItemSelect={(id) => handleFilterChange("intakes", id)}
                          />
                        ) : (
                          filterData.intakeList && filterData.intakeList.map((intake, index) => (
                            <Form.Check
                              key={index}
                              type="checkbox"
                              label={intake.month}
                              checked={selectedFilters.intakes.includes(intake.month)}
                              onChange={() => handleFilterChange("intakes", intake.month)}
                            />
                          ))
                        )}
                      </Form.Group>
                    )}
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
        </div>
        
        <div className="mobile-filter-buttons">
          <button
            onClick={() => {
              resetFilters();
              setShowMobileFilters(false);
            }}
            className="mobile-reset-button"
          >
            Reset Filters
          </button>
          <button
            onClick={() => {
              fetchInstitutes();
              setShowMobileFilters(false);
            }}
            className="mobile-apply-button"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {showMobileFilters && (
        <div 
          className="mobile-filters-backdrop show"
          onClick={() => setShowMobileFilters(false)}
        ></div>
      )}
    </Container>
  );
};

// Export with memo to prevent unnecessary re-renders
export default React.memo(SearchInstitute);
