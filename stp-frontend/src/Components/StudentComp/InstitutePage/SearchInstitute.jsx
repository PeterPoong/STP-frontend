import React, { useState, useEffect } from "react";
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
import InstituteListing from "./InstituteListing";
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
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [institutes, setInstitutes] = useState([]);
  const [selectedInstitute, setSelectedInstitute] = useState(null);

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
    const fetchCountries = async (countryID) => {
      try {
        const response = await fetch(countriesURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        if (result.data && Array.isArray(result.data)) {
          setCountries(result.data);
        } else {
          setCountries([]); // Ensure countries is always an array
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
        setCountries([]); // Ensure countries is always an array
      }
    };

    fetchCountries();
  }, []);

  // Fetch institutes from API
  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const response = await fetch(instituteURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        if (result.data && Array.isArray(result.data)) {
          setInstitutes(result.data);
        } else {
          setInstitutes([]); // Ensure institutes is always an array
        }
      } catch (error) {
        console.error("Error fetching institutes:", error);
        setInstitutes([]); // Ensure institutes is always an array
      }
    };

    fetchInstitutes();
  }, []);

  // Effect to fetch data when searchQuery or currentPage changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(apiURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            search: searchQuery,
            page: currentPage,
            countryID: selectedCountry?.country_id,
            instituteId: selectedInstitute?.id,
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

        setSearchResults(result.data); // Assuming result.data.data contains search results
        setTotalPages(result.totalPages); // Update total pages based on API response
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError("Failed to fetch search results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    // Fetch data.data only if searchQuery is not empty
    if (searchQuery.trim()) {
      fetchData();
    }
  }, [searchQuery, currentPage, selectedCountry, selectedInstitute]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when search query changes
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    console.log("Selected Country ID:", country?.id); // Debugging line
  };

  const handleInstituteChange = (institute) => {
    setSelectedInstitute(institute);
    console.log("Selected University ID:", institute);
  };

  return (
    <Container>
      <h3 style={{ textAlign: "left", paddingTop: "15px" }}>
        Institute in Malaysia
      </h3>
      {/* Country Dropdown */}
      <Row className="align-items-center mb-3">
        <Col xs={12} sm={4} md={3} lg={2} className="mb-2 mb-sm-0">
          <ButtonGroup className="w-100">
            <Dropdown as={ButtonGroup} className="w-100">
              <Dropdown.Toggle
                className="country-dropdown-institute w-100"
                id="dropdown-country"
              >
                {selectedCountry ? selectedCountry.country_name : "Country"}
              </Dropdown.Toggle>
              <Dropdown.Menu className="scrollable-dropdown">
                {countries.length > 0 ? (
                  countries.map((country, index) => (
                    <Dropdown.Item
                      key={index}
                      className="dropdown"
                      onClick={() => handleCountryChange(country)}
                    >
                      <CountryFlag
                        countryCode={country.country_code} // Use country code
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
                      className="dropdown"
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
            style={{ height: "45px", marginTop: "9px" }}
            placeholder="Search for Courses, Institutions"
            aria-label="Search for Courses, Institutions"
            aria-describedby="search-icon"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button className="search-button" onClick={handleSearch}>
            Search
          </Button>
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
      />
    </Container>
  );
};

export default SearchInstitute;