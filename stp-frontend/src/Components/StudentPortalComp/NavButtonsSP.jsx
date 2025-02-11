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

const NavigationBar = () => {
  const [hasToken, setHasToken] = useState(false); // Initialize to false
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const { currentLanguage, changeLanguage } = useTranslation();
  const [displayLanguage, setDisplayLanguage] = useState(currentLanguage);

  const languages = [
    { code: "en", label: "English", nativeLabel: "English" },
    { code: "ms", label: "Bahasa Melayu", nativeLabel: "Bahasa Melayu" },
    { code: "zh-CN", label: "中文", nativeLabel: "中文" },
  ];

  // Sync language display on load and any DOM changes
  useEffect(() => {
    const syncLanguageDisplay = () => {
      const translateElement = document.querySelector(".goog-te-combo");
      if (translateElement) {
        const currentValue = translateElement.value;
        setDisplayLanguage(currentValue || "en");
      } else {
        const savedLang = localStorage.getItem("preferredLanguage");
        if (savedLang) {
          setDisplayLanguage(savedLang);
        }
      }
    };

    syncLanguageDisplay();

    const observer = new MutationObserver(syncLanguageDisplay);
    const targetNode = document.body;
    observer.observe(targetNode, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  // Check authentication and set token and username
  useEffect(() => {
    const checkAuth = () => {
      const accountType = sessionStorage.getItem("accountType");
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");

      let storedUserName = "";
      if (accountType === "school") {
        storedUserName =
          sessionStorage.getItem("name") || localStorage.getItem("name");
      } else {
        storedUserName =
          sessionStorage.getItem("userName") ||
          localStorage.getItem("userName");
      }

      setHasToken(!!token); // Set hasToken based on token presence
      console.log("token", !!token); // Log whether the token is found
      console.log("accountType", accountType);
      if (storedUserName) {
        setUserName(storedUserName); // Set the stored username
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    const itemsToRemove = [
      "token",
      "loginTimestamp",
      "userName",
      "lastAppliedCourseId",
      "id",
      "accountType",
      "name",
    ];

    itemsToRemove.forEach((item) => {
      sessionStorage.removeItem(item);
      localStorage.removeItem(item);
    });

    setHasToken(false);
    setUserName("");
    localStorage.setItem("logoutTimestamp", Date.now().toString());
    navigate("/", { replace: true });
  };

  const handleRoute = () => {
    const accountType = sessionStorage.getItem("accountType");
    if (accountType == "school") {
      navigate("/schoolPortalDashboard");
    } else {
      navigate("/studentPortalBasicInformations");
    }
  };

  if (hasToken === null) return null; // Wait until hasToken is determined

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
