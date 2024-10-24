import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import logo from "../../assets/StudentAssets/nav logo/logo.png";
import "../../css/StudentPortalStyles/StudentNavBar.css";

const NavigationBar = () => {
  const [hasToken, setHasToken] = useState(null); // Set initial state to null
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");
    if (token) {
      setHasToken(true);
      const storedUserName =
        sessionStorage.getItem("userName") || localStorage.getItem("userName");
      if (storedUserName) {
        setUserName(storedUserName);
      }
    } else {
      setHasToken(false);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("loginTimestamp");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("lastAppliedCourseId");
    setHasToken(false);
    navigate("/");
  };

  const handleRoute = () => {
    navigate("/studentPortalBasicInformations");
  };

  if (hasToken === null) return null; // Prevent rendering until check is complete

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className="bg-white"
      style={{ paddingLeft: "20px", paddingRight: "20px" }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img 
          src={logo} 
          alt="Logo" 
          className="logo"
          loading="eager" // Prioritize this image
          fetchPriority="high"
          decoding="async"
          onLoad={(e) => {
            // Remove placeholder when image loads
            e.target.previousSibling?.remove();
          }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Button
              variant="link"
              as={Link}
              to="/courses"
              className={`nav-link-custom ${location.pathname === "/courses" ||
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
              className={`nav-link-custom ${location.pathname === "/institute" ||
                location.pathname.startsWith("/institute")
                ? "active"
                : ""
                }`}
              style={{ marginLeft: "10px" }}
            >
              Schools
            </Button>
          </Nav>

          {hasToken ? (
            <>
              <div className="m-10 navbutton-section-afterlogin">
                <Button className="m-0 btnfirst" >Hi !</Button>
                <Button className="m-0 btnsecond" onClick={handleRoute}>
                  {userName}
                </Button>
                <Button className="m-0 btnfirstlogout" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
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
                      <Dropdown.Item as={Link} to="/register-school">
                        Register as School
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </ButtonGroup>
              </div>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
