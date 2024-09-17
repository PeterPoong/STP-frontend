import React, { useState, useEffect } from "react";
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
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../css/StudentCss/institutepage css/Institute.css";
// import InstituteListing from "./InstituteListing";
import InstituteListing from "../../../Components/StudentComp/InstitutePage/InstituteListing";
import CountryFlag from "react-country-flag";

const baseURL = import.meta.env.VITE_BASE_URL;

const apiURL = `${baseURL}api/student/schoolList`;
const countriesURL = `${baseURL}api/student/countryList`;
const instituteURL = `${baseURL}api/student/instituteType`;
const locationAPIURL = `${baseURL}api/student/locationFilterList`;

const qualificationURL = `${baseURL}api/student/qualificationFilterList`;

const SearchInstitute = () => {
  const [locationFilters, setLocationFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [institutes, setInstitutes] = useState([]);
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [countryFilter, setCountryFilter] = useState("");
  const [countries, setCountries] = useState([]);

  const location = useLocation();

  /* Reset Filter here */
  const [resetTrigger, setResetTrigger] = useState(false);

  const resetAllFilters = () => {
    setSelectedCountry(null);
    setSelectedInstitute(null);
    setCountryFilter("");
    setSearchQuery("");
    setCurrentPage(1);

    setResetTrigger((prev) => !prev);

    fetchData("");
  };

  /* End of Reset Filter here */

  const handleCountryFilterChange = (event) => {
    setCountryFilter(event.target.value.toLowerCase());
  };

  const filteredCountries = Array.isArray(countries)
    ? countries.filter((country) =>
        country.country_name.toLowerCase().includes(countryFilter)
      )
    : [];

  useEffect(() => {
    if (location.state) {
      const { country } = location.state;

      if (country) {
        const selectedCountry = countries.find(
          (c) => c.country_name === country
        );
        setSelectedCountry(selectedCountry);
      }
    }
  }, [location.state, countries]);

  // Fetch countries from API
  useEffect(() => {
    fetch(countriesURL)
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  // Fetch locations when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      fetch(locationAPIURL, {
        method: "POST", // Change method to POST if that's what the API expects
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ countryID: selectedCountry.id }), // Send countryId in the request body
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setLocationFilters(data);
        })
        .catch((error) => {
          console.error("Error fetching locations:", error);
          setLocationFilters([]); // Reset if there's an error
        });
    } else {
      setLocationFilters([]); // Reset locations if no country is selected
    }
  }, [selectedCountry]);

  // Fetch countries from API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(countriesURL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();

        // Ensure the response is an array
        setCountries(result.data || []);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setCountries([]);
      }
    };

    fetchCountries();
  }, []);

  // Fetch institutes from API
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

  // Effect to fetch data when searchQuery or currentPage changes

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
          page: currentPage,
          country: selectedCountry?.id || "",
          category: selectedInstitute?.id,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON");
      }

      const result = await response.json();

      setSearchResults(result.data || []); // Assuming result.data contains search results
      setTotalPages(result.totalPages || 1); // Update total pages based on API response
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError("Failed to fetch search results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() || selectedCountry) {
      fetchData(searchQuery); // Pass the search query to fetchData
    }
  }, [searchQuery, currentPage, selectedCountry, selectedInstitute]);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    // setSearchQuery(""); // Clear search query when a country is selected
    setCurrentPage(1); // Reset pagination
  };

  const handleInstituteChange = (institute) => {
    setSelectedInstitute(institute);
    console.log("Selected University ID:", institute);
  };

  return (
    <Container>
      <h3 style={{ textAlign: "left", paddingTop: "20px" }}>
        Institute in Malaysia
      </h3>
      {/* Country Dropdown */}
      <Row className="align-items-center mb-2 mb-md-0">
        <Col xs={12} sm={4} md={3} lg={2} className="mb-2 mb-sm-0">
          <ButtonGroup className="w-100">
            <Dropdown as={ButtonGroup} className="w-100">
              <Dropdown.Toggle
                className="country-dropdown-institute w-100"
                id="dropdown-country"
                style={{
                  backgroundColor: selectedCountry ? "white" : "", // Set background color to white if a country is selected
                  color: selectedCountry ? "#000" : "", // Optional: Change text color for better contrast
                  border: selectedCountry ? "1px solid #B71A18" : "", // Set border width, style, and color
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

        {/* University Dropdown */}
        <Col xs={12} sm={4} md={3} lg={2} className="mb-2 mb-sm-0">
          <ButtonGroup className="w-100">
            <Dropdown as={ButtonGroup} className="w-100">
              <Dropdown.Toggle
                className="university-dropdown-institute w-100"
                id="dropdown-university"
                style={{
                  backgroundColor: selectedInstitute ? "white" : "", // Set background color to white if a country is selected
                  color: selectedInstitute ? "#000" : "", // Optional: Change text color for better contrast
                  border: selectedInstitute ? "1px solid #B71A18" : "", // Set border width, style, and color
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
              marginTop: "30px",
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

        <Col className="d-flex justify-content-end">
          <Pagination className="ml-auto mb-2 mb-md-0">
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
      </Row>

      <Form>
        <InputGroup className="mb-3">
          <Form.Control
            className="custom-placeholder"
            style={{ height: "45px", marginTop: "9px" }}
            placeholder="Search for Institutions, Country"
            aria-label="Search for Institutions, Country"
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

      <InstituteListing
        searchResults={searchResults}
        countryID={selectedCountry?.id}
        selectedInstitute={selectedInstitute?.core_metaName}
        resetTrigger={resetTrigger}
      />
    </Container>
  );
};

export default SearchInstitute;
