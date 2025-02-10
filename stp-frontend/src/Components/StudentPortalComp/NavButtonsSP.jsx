import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Translate } from "react-bootstrap-icons";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import logo from "../../assets/StudentAssets/nav logo/logo.png";
import "../../css/StudentPortalStyles/StudentNavBar.css";
import { useTranslation } from "../../Context/TranslationContext";
import currency from 'currency.js';

const NavigationBar = () => {
  const [hasToken, setHasToken] = useState(null);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const { currentLanguage, changeLanguage } = useTranslation();
  const [displayLanguage, setDisplayLanguage] = useState(currentLanguage);
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
  const [selectedCurr, setSelectedCurr] = useState({ currency_code: "MYR", currency_symbol: "RM" });
  const [fetchedCountry, setFetchedCountry] = useState(null);
  const fetchExchangeRates = async (currencyCode) => {
    try {
      console.log("Fetching exchange rates..."); // Log before fetching
      const response = await fetch(`https://api.frankfurter.app/latest?from=MYR`);
      const data = await response.json();
  
      // Log the fetched data to the console
      // console.log("Fetched exchange rates:", data);
  
      if (data && data.rates) {
        setExchangeRates(data.rates);
      } else {
        console.warn("No rates found in the fetched data."); // Log if no rates found
      }
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  };
  const convertToFetchedCurrency = (amount) => {
    const currencyCode = selectedCurr.currency_code; // Use selectedCurr directly
    const currencySymbol = selectedCurr.currency_symbol;

    if (!exchangeRates || !Object.keys(exchangeRates).length) {
        return `${currencySymbol} ${amount}`; // Return original cost if no rates available
    }

    const rate = exchangeRates[currencyCode] || 1; // Default to 1 if rate not found
    return `${currencySymbol} ${currency(amount).multiply(rate).format()}`; // Convert MYR to the correct currency
  };
  const fetchCountry = async () => {
    try {
      const response = await fetch('https://ipinfo.io/json');
      const data = await response.json();
  
      if (data && data.country) {
        let country = data.country; // Get the real country code
        
        // Override country for testing
        // country = 'AU'; // Change this to 'SG' temporarily
  
        const currencyInfo = countryCurrencyMap[country] || { currency_code: "MYR", currency_symbol: "RM" };
  
        sessionStorage.setItem('userCountry', country);
        sessionStorage.setItem('userCurrencyCode', currencyInfo.currency_code);
        sessionStorage.setItem('userCurrencySymbol', currencyInfo.currency_symbol);
  
        // console.log("Fetched country:", country);
        // console.log("Currency Code:", currencyInfo.currency_code);
        // console.log("Currency Symbol:", currencyInfo.currency_symbol);
  
        setFetchedCountry(country);
        setSelectedCurr(currencyInfo); // Store currency info in state
  
        return country;
      } else {
        throw new Error('Unable to fetch location data');
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
  
        const currencyCode = sessionStorage.getItem('userCurrencyCode') || "MYR"; // Fetch from storage
        setSelectedCurr(countryCurrencyMap[country]); // Use country directly from fetchCountry
  
        // Fetch exchange rates based on the detected currency
        await fetchExchangeRates(currencyCode);
      }
    };
    fetchCountryAndSet();
  }, []);
  const languages = [
    { code: "en", label: "English", nativeLabel: "English" },
    { code: "ms", label: "Bahasa Melayu", nativeLabel: "Bahasa Melayu" },
    { code: "zh-CN", label: "中文", nativeLabel: "中文" },
  ];

  useEffect(() => {
    const syncLanguageDisplay = () => {
      // Get the current Google Translate language
      const translateElement = document.querySelector(".goog-te-combo");
      if (translateElement) {
        const currentValue = translateElement.value;
        setDisplayLanguage(currentValue || "en");
      } else {
        // If element not found, check localStorage
        const savedLang = localStorage.getItem("preferredLanguage");
        if (savedLang) {
          setDisplayLanguage(savedLang);
        }
      }
    };

    // Initial sync
    syncLanguageDisplay();

    // Set up a mutation observer to watch for Google Translate changes
    const observer = new MutationObserver(syncLanguageDisplay);
    const targetNode = document.body;
    observer.observe(targetNode, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const storedUserName =
        sessionStorage.getItem("userName") || localStorage.getItem("userName");

      setHasToken(!!token);
      if (storedUserName) {
        setUserName(storedUserName);
      }
    };

    checkAuth();
    // Add event listener for storage changes
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    // Clear session storage
    const itemsToRemove = [
      "token",
      "loginTimestamp",
      "userName",
      "lastAppliedCourseId",
      "id",
    ];

    itemsToRemove.forEach((item) => {
      sessionStorage.removeItem(item);
      localStorage.removeItem(item);
    });

    // Reset state
    setHasToken(false);
    setUserName("");

    // Force a re-render by updating localStorage
    localStorage.setItem("logoutTimestamp", Date.now().toString());

    // Navigate to home page
    navigate("/", { replace: true });
  };

  const handleRoute = () => {
    navigate("/studentPortalBasicInformations");
  };

  const handleCurrencyChange = (currencyInfo) => {
    console.log("Changing currency to:", currencyInfo); // Debugging line
    setSelectedCurr(currencyInfo);
    sessionStorage.setItem('userCurrencyCode', currencyInfo.currency_code);
    sessionStorage.setItem('userCurrencySymbol', currencyInfo.currency_symbol);
    
    // Optionally, you can also trigger a re-fetch of data in other components if needed
    // For example, if you need to fetch exchange rates again:
    fetchExchangeRates(currencyInfo.currency_code);
  };

  if (hasToken === null) return null;

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className="bg-white"
      style={{ paddingLeft: "20px", paddingRight: "20px" }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Logo" className="logo" loading="lazy" />
          {/*<img 
            src={logo} 
            alt="Logo" 
            className="logo"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            onLoad={(e) => {
              e.target.previousSibling?.remove();
            }}
          />*/}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Button
              variant="link"
              as={Link}
              to="/courses"
              className={`nav-link-custom ${
                location.pathname === "/courses" ||
                location.pathname.startsWith("/courses")
                  ? "active"
                  : ""
              }`}
              style={{ marginLeft: "10px" }}
            >
              Courses
            </Button>
            <Button
              variant="link"
              as={Link}
              to="/institute"
              className={`nav-link-custom ${
                location.pathname === "/institute" ||
                location.pathname.startsWith("/institute")
                  ? "active"
                  : ""
              }`}
              style={{ marginLeft: "10px" }}
            >
              Schools
            </Button>
            <Button
              variant="link"
              as={Link}
              to="/studentStudyPath"
              className={`nav-link-custom ${
                location.pathname === "/studentStudyPath" ||
                location.pathname.startsWith("/studentStudyPath")
                  ? "active"
                  : ""
              }`}
              style={{ marginLeft: "10px" }}
            >
              Find Your Path
            </Button>
            <Button
              variant="link"
              as={Link}
              to="/studentFeedback"
              className={`nav-link-custom ${
                location.pathname === "/studentFeedback" ||
                location.pathname.startsWith("/studentFeedback")
                  ? "active"
                  : ""
              }`}
              style={{ marginLeft: "10px" }}
            >
              Contact Us
            </Button>
          </Nav>
          <ButtonGroup className="me-2 nav-button-language-container">
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle
                className="nav-button-language"
                id="dropdown-custom-1"
              >
                <span className="notranslate" style={{ fontSize: "12px" }}>
                  <Translate size={20} color="#BA1718" className="me-2" />
                  {languages.find((lang) => lang.code === displayLanguage)
                    ?.nativeLabel || "English"}
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {languages.map((lang) => (
                  <Dropdown.Item
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setDisplayLanguage(lang.code);
                    }}
                    className="dropdown"
                    active={displayLanguage === lang.code}
                  >
                    <span className="notranslate">{lang.nativeLabel}</span>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </ButtonGroup>
          <ButtonGroup>
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle className="currency-dropdown">
                {selectedCurr.currency_code}
              </Dropdown.Toggle>
              <Dropdown.Menu className="currency-dropdown-menu">
                {Array.from(new Set(Object.entries(countryCurrencyMap).map(([countryCode, currencyInfo]) => currencyInfo.currency_code)))
                  .map((currencyCode) => {
                    const currencyInfo = Object.values(countryCurrencyMap).find(info => info.currency_code === currencyCode);
                    return (
                      <Dropdown.Item
                        key={currencyCode}
                        onClick={() => {
                          handleCurrencyChange(currencyInfo);
                          console.log("Selected Cur Info:", currencyInfo);
                        }}
                      >
                        {currencyInfo.currency_code} - {currencyInfo.currency_symbol}
                      </Dropdown.Item>
                    );
                  })}
              </Dropdown.Menu>
            </Dropdown>
          </ButtonGroup>
          {hasToken ? (
            <div className="m-10 navbutton-section-afterlogin">
              <Button className="m-0 btnfirst">Hi !</Button>
              <Button className="m-0 btnsecond" onClick={handleRoute}>
                {userName}
              </Button>
              <Button className="m-0 btnfirstlogout" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="m-10 navbutton-section">
              <ButtonGroup className="mb-2 mb-lg-0">
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle
                    className="nav-button"
                    id="dropdown-custom-1"
                  >
                    Login
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      className="dropdown"
                      as={Link}
                      to="/studentPortalLogin"
                    >
                      Login as Student
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/schoolPortalLogin">
                      Login as School
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ButtonGroup>
              <ButtonGroup>
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle
                    className="nav-button"
                    id="dropdown-custom-2"
                  >
                    Register
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/studentPortalSignUp">
                      Register as Student
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/schoolPortalSignUp">
                      Register as School
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ButtonGroup>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
