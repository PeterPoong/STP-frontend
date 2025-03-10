import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Alert } from "react-bootstrap";
import "../../css/StudentCss/course page css/SearchCourse.css";
import currency from "currency.js";

const baseURL = import.meta.env.VITE_BASE_URL;

const InterestedList = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseInterests, setCourseInterests] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const countryCurrencyMap = {
    // Asia
    MY: { currency_code: "MYR", currency_symbol: "RM" }, // Malaysia
    SG: { currency_code: "SGD", currency_symbol: "S$" }, // Singapore
    ID: { currency_code: "IDR", currency_symbol: "Rp" }, // Indonesia
    TH: { currency_code: "THB", currency_symbol: "฿" }, // Thailand
    VN: { currency_code: "VND", currency_symbol: "₫" }, // Vietnam
    PH: { currency_code: "PHP", currency_symbol: "₱" }, // Philippines
    IN: { currency_code: "INR", currency_symbol: "₹" }, // India
    CN: { currency_code: "CNY", currency_symbol: "¥" }, // China (Renminbi)
    JP: { currency_code: "JPY", currency_symbol: "¥" }, // Japan
    KR: { currency_code: "KRW", currency_symbol: "₩" }, // South Korea
    HK: { currency_code: "HKD", currency_symbol: "HK$" }, // Hong Kong
    TW: { currency_code: "TWD", currency_symbol: "NT$" }, // Taiwan

    // Europe
    GB: { currency_code: "GBP", currency_symbol: "£" }, // United Kingdom
    DE: { currency_code: "EUR", currency_symbol: "€" }, // Germany
    FR: { currency_code: "EUR", currency_symbol: "€" }, // France
    IT: { currency_code: "EUR", currency_symbol: "€" }, // Italy
    ES: { currency_code: "EUR", currency_symbol: "€" }, // Spain
    NL: { currency_code: "EUR", currency_symbol: "€" }, // Netherlands
    CH: { currency_code: "CHF", currency_symbol: "CHF" }, // Switzerland
    SE: { currency_code: "SEK", currency_symbol: "kr" }, // Sweden
    NO: { currency_code: "NOK", currency_symbol: "kr" }, // Norway
    DK: { currency_code: "DKK", currency_symbol: "kr" }, // Denmark

    // North America
    US: { currency_code: "USD", currency_symbol: "$" }, // United States
    CA: { currency_code: "CAD", currency_symbol: "C$" }, // Canada
    MX: { currency_code: "MXN", currency_symbol: "Mex$" }, // Mexico

    // South America
    BR: { currency_code: "BRL", currency_symbol: "R$" }, // Brazil
    AR: { currency_code: "ARS", currency_symbol: "ARS$" }, // Argentina
    CL: { currency_code: "CLP", currency_symbol: "CLP$" }, // Chile
    CO: { currency_code: "COP", currency_symbol: "COP$" }, // Colombia
    PE: { currency_code: "PEN", currency_symbol: "S/" }, // Peru

    // Middle East
    AE: { currency_code: "AED", currency_symbol: "د.إ" }, // United Arab Emirates
    SA: { currency_code: "SAR", currency_symbol: "﷼" }, // Saudi Arabia
    TR: { currency_code: "TRY", currency_symbol: "₺" }, // Turkey
    QA: { currency_code: "QAR", currency_symbol: "﷼" }, // Qatar
    EG: { currency_code: "EGP", currency_symbol: "E£" }, // Egypt
    IL: { currency_code: "ILS", currency_symbol: "₪" }, // Israel
    BD: { currency_code: "BDT", currency_symbol: "৳" }, // Bangladesh

    // Africa
    ZA: { currency_code: "ZAR", currency_symbol: "R" }, // South Africa
    NG: { currency_code: "NGN", currency_symbol: "₦" }, // Nigeria
    KE: { currency_code: "KES", currency_symbol: "KSh" }, // Kenya
    GH: { currency_code: "GHS", currency_symbol: "₵" }, // Ghana

    // Oceania
    AU: { currency_code: "AUD", currency_symbol: "A$" }, // Australia
    NZ: { currency_code: "NZD", currency_symbol: "NZ$" }, // New Zealand
  };
  const [exchangeRates, setExchangeRates] = useState({});
  const [fetchedCountry, setFetchedCountry] = useState(null);

  const [selectedCurrency, setSelectedCurrency] = useState({});

  const fetchExchangeRates = async () => {
    try {
      const response = await fetch(
        `https://api.frankfurter.app/latest?from=MYR`
      );
      const data = await response.json();

      if (data && data.rates) {
        setExchangeRates(data.rates);
      }
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  };

  useEffect(() => {
    const fetchCurrencyOnChange = async () => {
      const currencyCode = sessionStorage.getItem("userCurrencyCode") || "MYR";
      const currencySymbol =
        sessionStorage.getItem("userCurrencySymbol") || "RM";

      // Fetch exchange rates based on the selected currency
      await fetchExchangeRates(currencyCode);

      setSelectedCurrency({
        currency_code: currencyCode,
        currency_symbol: currencySymbol,
      });
    };
    fetchCurrencyOnChange(); // Fetch the currency rates immediately on component mount or currency change
  }, [sessionStorage.getItem("userCurrencyCode")]); // Trigger on currency code change in session storage
  useEffect(() => {
    const interval = setInterval(() => {
      const newCurrencyCode =
        sessionStorage.getItem("userCurrencyCode") || "MYR";

      if (newCurrencyCode !== selectedCurrency.currency_code) {
        setSelectedCurrency({
          currency_code: newCurrencyCode,
          currency_symbol: sessionStorage.getItem("userCurrencySymbol") || "RM",
        });

        console.log(
          "Detected currency change in sessionStorage:",
          newCurrencyCode
        );

        fetchExchangeRates(newCurrencyCode);
        fetchCourses();
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [selectedCurrency]);
  const convertToFetchedCurrency = (amount) => {
    const currencyCode = sessionStorage.getItem("userCurrencyCode") || "MYR"; // Use sessionStorage value
    const currencySymbol = sessionStorage.getItem("userCurrencySymbol") || "RM";

    if (!exchangeRates || !Object.keys(exchangeRates).length) {
      return `${currencySymbol} ${amount}`; // Return original cost if no rates available
    }

    const rate = exchangeRates[currencyCode] || 1;
    return `${currencySymbol} ${currency(amount).multiply(rate).format()}`; // Convert MYR to the correct currency
  };
  const fetchCountry = async () => {
    try {
      const response = await fetch("https://ipinfo.io/json");
      const data = await response.json();

      if (data && data.country) {
        let country = data.country; // Get the real country code

        // Override country for testing
        // country = 'CN'; // Change this to 'SG' temporarily

        const currencyInfo = countryCurrencyMap[country] || {
          currency_code: "MYR",
          currency_symbol: "RM",
        };

        sessionStorage.setItem("userCountry", country);
        sessionStorage.setItem("userCurrencyCode", currencyInfo.currency_code);
        sessionStorage.setItem(
          "userCurrencySymbol",
          currencyInfo.currency_symbol
        );

        setFetchedCountry(country);
        setSelectedCurrency(currencyInfo); // Store currency info in state

        return country;
      } else {
        throw new Error("Unable to fetch location data");
      }
    } catch (error) {
      console.error("Error fetching country:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchCountryAndSet = async () => {
      const country = await fetchCountry(); // Fetch the country
      if (country) {
        // console.log("User country:", country);

        const currencyCode =
          sessionStorage.getItem("userCurrencyCode") || "MYR"; // Fetch from storage
        setSelectedCurrency(countryCurrencyMap[country]); // Use country directly from fetchCountry

        // Fetch exchange rates based on the detected currency
        await fetchExchangeRates(currencyCode);
      }
    };
    fetchCountryAndSet();
  }, []);

  const courseListURL = `${baseURL}api/student/interestedCourseList`;

  const handleInterestClick = async (courseId) => {
    if (!isAuthenticated) {
      navigate("/studentPortalLogin");
      return;
    }

    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      if (!courseInterests[courseId]) {
        // Add interest
        const requestBody = { course_id: courseId };
        const response = await fetch(
          `${baseURL}api/student/addInterestedCourse`,
          {
            method: "POST",
            headers,
            body: JSON.stringify(requestBody),
          }
        );

        const data = await response.json();
        if (data.success) {
          setCourseInterests((prev) => ({
            ...prev,
            [courseId]: {
              id: data.data.id,
              status: 1,
            },
          }));
        }
      } else {
        // Toggle interest status
        const requestBody = {
          course_id: courseId,
          type: courseInterests[courseId].status === 1 ? "disable" : "enable",
        };
        const response = await fetch(
          `${baseURL}api/student/removeInterestedCourse`,
          {
            method: "POST",
            headers,
            body: JSON.stringify(requestBody),
          }
        );

        const data = await response.json();
        if (data.success) {
          setCourseInterests((prev) => ({
            ...prev,
            [courseId]: {
              ...prev[courseId],
              status: prev[courseId].status === 1 ? 0 : 1,
            },
          }));
        }
      }
    } catch (error) {
      console.error("Error handling interest:", error);
    }
  };

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      if (!token) {
        throw new Error("No authorization token found");
      }
      const response = await fetch(courseListURL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (!result.success || !result.data) {
        throw new Error("Invalid response structure");
      }

      setResults(result.data || []);

      const interests = {};
      result.data.forEach((course) => {
        interests[course.course_id] = {
          id: course.id,
          status: course.status,
        };
      });
      setCourseInterests(interests);
    } catch (error) {
      setError(`Failed to fetch courses: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");
    setIsAuthenticated(!!token);
    fetchCourses();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (results.length === 0) {
    return (
      <div className="no-favourite-courses text-center mt-5">
        <h5>No Favourite Course Yet, Let's add more Favourite Courses!</h5>
      </div>
    );
  }

  return (
    <div className="RR-Career-Profile-Container">
      <div className="RS-Header-Section">
        <h3>Favourite Courses</h3>
      </div>

      {results.filter(
        (program) => courseInterests[program.course_id]?.status === 1
      ).length > 0 ? (
        results
          .filter((program) => courseInterests[program.course_id]?.status === 1)
          .map((program) => (
            <div
              key={program.id}
              className="card mb-4 degree-card"
              style={{ position: "relative", height: "auto" }}
            >
              {program.featured && (
                <div className="featured-badge">Featured</div>
              )}
              <div className="card-body d-flex flex-column flex-md-row align-items-start">
                <Row>
                  <Col md={6} xs={12}>
                    <div className="card-image mb-3 mb-md-0">
                      <h5 className="card-title">
                        <Link
                          to={`/course-details/${program.school_name
                            .replace(/\s+/g, "-")
                            .toLowerCase()}/${program.name
                            .replace(/\s+/g, "-")
                            .toLowerCase()}`}
                          style={{ color: "black" }}
                        >
                          {program.name}
                        </Link>
                      </h5>
                      <div className="d-flex align-items-center">
                        <img
                          src={`${baseURL}storage/${program.logo}`}
                          alt={program.school_name}
                          width="100"
                        />
                        <div style={{ paddingLeft: "20px" }}>
                          <h5 className="card-text">{program.school_name}</h5>
                          <i
                            className="bi bi-geo-alt"
                            style={{ marginRight: "10px", color: "#AAAAAA" }}
                          ></i>
                          <span>
                            {program.state || "N/A"}, {program.country || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} xs={12}>
                    <div className="d-flex flex-grow-1 justify-content-between">
                      <div className="details-div" style={{ width: "100%" }}>
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
                                <div style={{ marginTop: "10px" }}>
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
                            Estimate Fee
                            <br />
                            <strong>
                              {program.cost > 0
                                ? convertToFetchedCurrency(program.cost)
                                : "N/A"}{" "}
                              {/* Show "N/A" if cost is 0 */}
                            </strong>
                          </p>
                        </div>
                        <div className="interest-division">
                          <div className="interest">
                            <button
                              onClick={() =>
                                handleInterestClick(program.course_id)
                              }
                              className="interest-button"
                              aria-label={
                                courseInterests[program.course_id]?.status === 1
                                  ? "Remove from interests"
                                  : "Add to interests"
                              }
                            >
                              <span style={{ fontSize: "16px" }}>
                                {courseInterests[program.course_id]?.status ===
                                1
                                  ? "Favourites"
                                  : "Favourites"}
                              </span>
                              <i
                                className={
                                  courseInterests[program.course_id]?.status ===
                                  1
                                    ? "bi bi-heart-fill"
                                    : "bi bi-heart"
                                }
                              ></i>
                            </button>
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
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          ))
      ) : (
        <div className="no-favourite-courses text-center">
          <h5>No Favourite Course Yet, Let's add more Favourite Courses!</h5>
        </div>
      )}

      {results.some(
        (program) => courseInterests[program.course_id]?.status === 0
      ) && (
        <>
          <h6 style={{ color: "grey" }}>Previously Favourite Courses</h6>
          {results
            .filter(
              (program) => courseInterests[program.course_id]?.status === 0
            )
            .map((program) => (
              <div
                className="card mb-4 degree-card"
                key={program.id}
                style={{ position: "relative", height: "auto" }}
              >
                {program.featured && (
                  <div className="featured-badge">Featured</div>
                )}
                <div className="card-body d-flex flex-column flex-md-row align-items-start">
                  <Row>
                    <Col md={6} lg={6}>
                      <div className="card-image mb-3 mb-md-0">
                        <h5 className="card-title">
                          <Link
                            rel="preload"
                            to={`/course-details/${program.school_name
                              .replace(/\s+/g, "-")
                              .toLowerCase()}/${program.name
                              .replace(/\s+/g, "-")
                              .toLowerCase()}`}
                            style={{ color: "black" }}
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
                            <span>
                              {program.state || "N/A"},{" "}
                              {program.country || "N/A"}
                            </span>
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
                                  <div style={{ marginTop: "10px" }}>
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
                            <p
                              style={{ fontSize: "14px", marginRight: "10px" }}
                            >
                              Estimate Fee
                              <br />
                              <strong>
                                {program.cost > 0
                                  ? convertToFetchedCurrency(program.cost)
                                  : "N/A"}{" "}
                                {/* Show "N/A" if cost is 0 */}
                              </strong>
                            </p>
                          </div>
                          <div className="interest-division">
                            <div className="interest">
                              <button
                                onClick={() =>
                                  handleInterestClick(program.course_id)
                                }
                                className="interest-button"
                                aria-label={
                                  courseInterests[program.course_id]?.status ===
                                  1
                                    ? "Remove from interests"
                                    : "Add to interests"
                                }
                              >
                                <span style={{ fontSize: "16px" }}>
                                  {courseInterests[program.course_id]
                                    ?.status === 1
                                    ? "Favourites"
                                    : "Favourites"}
                                </span>
                                <i
                                  className={
                                    courseInterests[program.course_id]
                                      ?.status === 1
                                      ? "bi bi-heart-fill"
                                      : "bi bi-heart"
                                  }
                                ></i>
                              </button>
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
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default InterestedList;
