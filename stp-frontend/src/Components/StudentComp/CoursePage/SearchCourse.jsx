import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
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
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CourseListing from "../../../Components/StudentComp/CoursePage/CourseListing";
import "../../../css/StudentCss/course page css/CoursesPage.css";
import CountryFlag from "react-country-flag";
import debounce from "lodash.debounce";
import emptyStateImage from "../../../assets/StudentAssets/emptyStateImage/emptystate.png";

const baseURL = import.meta.env.VITE_BASE_URL;
const apiURL = `${baseURL}api/student/courseList`;
const countriesURL = `${baseURL}api/student/countryList`;
const instituteURL = `${baseURL}api/student/instituteType`;
const locationAPIURL = `${baseURL}api/student/locationFilterList`;
const qualificationURL = `${baseURL}api/student/qualificationFilterList`;

const SearchCourse = ({ currentCourses }) => {
  const location = useLocation();
  const [locationFilters, setLocationFilters] = useState([]);
  const initialSearchQuery = location.state?.searchQuery || "";
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery); // Set initial search query
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [institutes, setInstitutes] = useState([]);
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [qualifications, setQualifications] = useState([]);
  const [selectedQualification, setSelectedQualification] = useState(null);
  const [countryFilter, setCountryFilter] = useState("");

  // Function for Pagination
  const itemsPerPage = 20;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  currentCourses = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (searchResults.length > 0) {
      setTotalPages(Math.ceil(searchResults.length / itemsPerPage));
    }
  }, [searchResults]);

  const handlePageChange = (current_page) => {
    fetchData(searchQuery); // Fetch the new data based on the updated page
    scrollToTop(); // Optional, to scroll back to the top after the page change
  };

  // End of Function for Pagination

  const shouldDisplayBlankSlate =
    !loading && searchResults.length === 0 && selectedCountry !== null;

  // Function for Reset Filter
  const [resetTrigger, setResetTrigger] = useState(false);

  const resetAllFilters = () => {
    setSelectedCountry(null);
    setSelectedInstitute(null);
    setSelectedQualification(null);
    setCountryFilter("");
    setSearchQuery("");
    setCurrentPage(1);

    // Toggle reset trigger to notify CourseListing of the reset
    setResetTrigger((prev) => !prev);

    fetchData(""); // Fetch data with reset filters
  };
  // End of Reset function

  useEffect(() => {
    fetchData(searchQuery);
  }, [
    searchQuery,
    currentPage,
    selectedCountry,
    selectedInstitute,
    selectedQualification,
  ]);

  const handleCountryFilterChange = (event) => {
    setCountryFilter(event.target.value.toLowerCase());
  };

  const filteredCountries = countries.filter((country) =>
    country.country_name.toLowerCase().includes(countryFilter)
  );

  // Load the selected country from sessionStorage when the component mounts
  useEffect(() => {
    const savedCountry = sessionStorage.getItem("selectedCountry");
    if (savedCountry) {
      setSelectedCountry(JSON.parse(savedCountry)); // Parse back to an object
    }
  }, []);

  // Save the selected country to sessionStorage whenever it changes
  useEffect(() => {
    if (selectedCountry) {
      sessionStorage.setItem(
        "selectedCountry",
        JSON.stringify(selectedCountry)
      );
    }
  }, [selectedCountry]);

  // From HomePage Button
  useEffect(() => {
    if (location.state) {
      const { qualification, country } = location.state;

      if (qualification) {
        const qual = qualifications.find(
          (q) => q.qualification_name === qualification
        );
        setSelectedQualification(qual);
      }

      if (country) {
        const selectedCountry = countries.find(
          (c) => c.country_name === country.country_name
        );
        setSelectedCountry(selectedCountry);
      }
    }
  }, [location.state, qualifications, countries]);
  // End of From HomePage Button

  // Qualification Dropdown
  useEffect(() => {
    const fetchQualifications = async () => {
      try {
        const response = await fetch(qualificationURL);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setQualifications(result.data || []);
      } catch (error) {
        console.error("Error fetching qualifications:", error);
        setQualifications([]);
      }
    };

    fetchQualifications();
  }, []);
  // End of Qualification Dropdown

  // Function for Country Dropdown
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(countriesURL);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setCountries(result.data || []);

        // Set Malaysia as the default country if it exists
        const malaysia = result.data.find(
          (country) => country.country_name === "Malaysia"
        );
        if (malaysia) {
          setSelectedCountry(malaysia);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
        setCountries([]);
      }
    };

    fetchCountries();
  }, []);
  // End of Function for Country Dropdown

  // Function for Institutes Dropdown
  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const response = await fetch(instituteURL);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setInstitutes(result.data || []);
      } catch (error) {
        console.error("Error fetching institutes:", error);
        setInstitutes([]);
      }
    };

    fetchInstitutes();
  }, []);
  // End of Function for Institutes Dropdown

  // Fetch Location
  useEffect(() => {
    if (selectedCountry) {
      fetch(locationAPIURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ countryID: selectedCountry.id }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setLocationFilters(data || []);
        })
        .catch((error) => {
          console.error("Error fetching locations:", error);
          setLocationFilters([]);
        });
    } else {
      setLocationFilters([]);
    }
  }, [selectedCountry]);
  // End of Fetch Location

  const fetchData = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search: selectedCountry ? "" : query.trim(),
          current_page: currentPage,
          countryID: selectedCountry?.id,
          institute: selectedInstitute?.id,
          qualification: selectedQualification?.id,
          name: query.trim(),
          school_name: query.trim(),
        }),
      });

      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON");
      }

      const result = await response.json();
      // console.log("filter result", result);

      setSearchResults(result.data || []);
      setTotalPages(result.totalPages || 1);
    } catch (error) {
      console.error("Error fetching search results:", error); // Log the full error
      setError(`Failed to fetch search results. Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchData = useCallback(debounce(fetchData, 300), [
    currentPage,
    selectedCountry,
    selectedInstitute,
    selectedQualification,
  ]);

  const handleInputChange = debounce((value) => {
    console.log("Input changed:", value);
  }, 300);

  useEffect(() => {
    if (searchQuery.trim()) {
      debouncedFetchData(searchQuery);
    }
  }, [
    searchQuery,
    currentPage,
    selectedCountry,
    selectedInstitute,
    selectedQualification,
    debouncedFetchData,
  ]);

  // Handle input change in the search bar
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update searchQuery state as user types
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchData(searchQuery); // Fetch data when user submits the search form
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedInstitute(null);
    console.log("Selected Country ID:", country?.id);
  };

  const handleInstituteChange = (institute) => {
    setSelectedInstitute(institute);
    console.log("Selected University ID:", institute);
  };

  const handleQualificationChange = (qualification) => {
    setSelectedQualification(qualification);
  };

  const resetFilters = () => {
    setSelectedCountry(null);
    setSelectedInstitute(null);
    setSelectedQualification(null);
    setSearchQuery("");
    setCurrentPage(1);
    fetchData(""); // Fetch data with reset filters
  };

  return (
    <Container>
      <h3 style={{ textAlign: "left", paddingTop: "15px" }}>
        {selectedQualification
          ? `Courses in ${selectedQualification.qualification_name}`
          : "Courses in Degree"}
      </h3>
      <Row className="align-items-center mb-2 mb-md-0">
        {/* Country Dropdown */}
        <Col xs={12} sm={4} md={3} lg={2} className="mb-2 mb-sm-0">
          <ButtonGroup className="w-100">
            <Dropdown as={ButtonGroup} className="w-100">
              <Dropdown.Toggle
                className="country-dropdown-course w-100"
                id="dropdown-country"
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
                <InputGroup className="mb-2">
                  <Form.Control
                    placeholder="Filter countries"
                    onChange={handleCountryFilterChange}
                    value={countryFilter}
                  />
                  <i
                    className="bi bi-search"
                    style={{
                      position: "absolute",
                      left: "90%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      fontSize: "14px",
                      color: "#808080",
                    }}
                  ></i>
                </InputGroup>
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country, index) => (
                    <Dropdown.Item
                      key={index}
                      className="dropdown"
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
                  ))
                ) : (
                  <Dropdown.Item>No countries available</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </ButtonGroup>
        </Col>
        {/* End of Country Dropdown */}
        {/* University Dropdown */}
        <Col xs={12} sm={4} md={3} lg={2} className="mb-2 mb-sm-0">
          <ButtonGroup className="w-100">
            <Dropdown as={ButtonGroup} className="w-100">
              <Dropdown.Toggle
                className="university-dropdown-course w-100"
                id="dropdown-university"
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
                {institutes.length > 0 ? (
                  institutes.map((institute, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => handleInstituteChange(institute)}
                    >
                      {institute.core_metaName}
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item>No institutes available</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </ButtonGroup>
        </Col>
        {/* End of University Dropdown */}
        {/* Qualification Dropdown */}
        <Col xs={12} sm={4} md={3} lg={2} className="mb-2 mb-sm-0">
          <ButtonGroup className="w-100">
            <Dropdown as={ButtonGroup} className="w-100">
              <Dropdown.Toggle
                className="qualification-dropdown-course w-100"
                id="dropdown-degree"
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
                {qualifications.length > 0 ? (
                  qualifications.map((qualification) => (
                    <Dropdown.Item
                      key={qualification.id}
                      onClick={() => handleQualificationChange(qualification)}
                    >
                      {qualification.qualification_name}
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item>No qualifications available</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </ButtonGroup>
        </Col>
        {/* End of Qualification Dropdown */}
        {/* Reset Filter */}
        <Col xs={12} sm={4} md={3} lg={2} className="mb-2 mb-sm-0">
          <button
            onClick={(e) => {
              e.preventDefault();
              resetAllFilters();
            }}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#B71A18",
              fontWeight: "lighter",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <i
              className="bi bi-funnel"
              style={{
                marginRight: "5px",
              }}
            />{" "}
            Reset Filters
          </button>
        </Col>
        {/*End of Reset Filter */}

        {/* Pagination  */}
        <Col className="d-flex justify-content-end">
          <Pagination className="pagination-course ml-auto mb-2 mb-md-0">
            <Pagination.Prev
              aria-label="Previous"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <span aria-hidden="true">&laquo;</span>
            </Pagination.Prev>

            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index}
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
            >
              <span aria-hidden="true">&raquo;</span>
            </Pagination.Next>
          </Pagination>
        </Col>
        {/* End of  Pagination  */}
      </Row>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          fetchData(searchQuery);
        }}
      >
        <InputGroup className="mb-3">
          <Form.Control
            className="custom-placeholder"
            style={{ height: "45px", marginTop: "9px" }}
            placeholder="Search for Courses, Institutions"
            aria-label="Search for Courses, Institutions"
            aria-describedby="search-icon"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </InputGroup>
      </Form>
      {loading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}

      {shouldDisplayBlankSlate ? (
        <div className="blankslate-courses">
          <img
            className="blankslate-courses-top-img"
            src={emptyStateImage}
            alt="Empty State"
            style={{ height: "175px" }}
          />
          <div className="blankslate-courses-body">
            <h4>
              <strong>No programs found ☹️</strong>
            </h4>
            <p>
              There are no courses that match your selected country. Please try
              adjusting your filters and search criteria.
            </p>
          </div>
        </div>
      ) : (
        <CourseListing
          searchResults={searchResults}
          countryID={selectedCountry?.id}
          selectedInstitute={selectedInstitute?.core_metaName}
          selectedQualification={selectedQualification?.qualification_name}
          resetTrigger={resetTrigger} // Pass reset trigger here
        />
      )}
    </Container>
  );
};

export default SearchCourse;
