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
import CourseListing from "../../../Components/StudentComp/CoursePage/CourseListing";

const baseURL = import.meta.env.VITE_BASE_URL;
const apiURL = `${baseURL}api/student/courseList`;
const countriesURL = `${baseURL}api/student/countryList`;
const instituteURL = `${baseURL}api/student/instituteType`;
const locationAPIURL = `${baseURL}api/student/locationFilterList`;

const qualificationURL = `${baseURL}api/student/qualificationFilterList`;

const SearchCourse = () => {
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
  const [qualifications, setQualifications] = useState([]);
  const [selectedQualification, setSelectedQualification] = useState(null);

  // Fetch qualification from API
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

  // Fetch countries from API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(countriesURL);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
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

  // Fetch locations when a country is selected
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
            institute: selectedInstitute?.id,
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
        setSearchResults(result.data.data || []);
        setTotalPages(result.totalPages || 1);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError("Failed to fetch search results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery.trim()) {
      fetchData();
    }
  }, [searchQuery, currentPage, selectedCountry, selectedInstitute]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    setCurrentPage(1);
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
    console.log("Selected Qualification ID:", qualification?.id);
  };

  return (
    <Container>
      <h3 className="pt-3">Courses in Degree</h3>
      <Row className="align-items-center mb-3">
        {/* Country Dropdown */}
        <Col xs={12} sm={4} md={3} lg={2} className="mb-2 mb-sm-0">
          <ButtonGroup className="w-100">
            <Dropdown as={ButtonGroup} className="w-100">
              <Dropdown.Toggle
                className="country-button w-100"
                id="dropdown-country"
              >
                {selectedCountry ? selectedCountry.country_name : "Country"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {countries.length > 0 ? (
                  countries.map((country, index) => (
                    <Dropdown.Item
                      key={index}
                      className="dropdown"
                      onClick={() => handleCountryChange(country)}
                    >
                      <img
                        src={country.country_flag}
                        width="20"
                        height="20"
                        className="mr-2"
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
                className="university-button w-100"
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

        {/* Qualification Dropdown */}
        <Col xs={12} sm={4} md={3} lg={2} className="mb-2 mb-sm-0">
          <ButtonGroup className="w-100">
            <Dropdown as={ButtonGroup} className="w-100">
              <Dropdown.Toggle
                className="degree-button w-100"
                id="dropdown-degree"
              >
                {selectedQualification
                  ? selectedQualification.qualification_name
                  : "Qualification"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {qualifications.length > 0 ? (
                  qualifications.map((qualification, index) => (
                    <Dropdown.Item
                      key={index}
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

      <CourseListing
        searchResults={searchResults}
        countryID={selectedCountry?.id}
        selectedInstitute={selectedInstitute?.core_metaName}
        selectedQualification={selectedQualification?.qualification_name}
      />
    </Container>
  );
};

export default SearchCourse;
