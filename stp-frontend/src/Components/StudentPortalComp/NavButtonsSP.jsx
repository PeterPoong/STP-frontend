import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import logo from "../../assets/student asset/nav logo/logo.png";
import "../../css/StudentPortalStyles/StudentNavBar.css";

const NavigationBar = () => {
  const [hasToken, setHasToken] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    if (token) {
      setHasToken(true);
      // You should fetch the user's name here from your API or local storage
      setUserName("David Lim"); // Replace with actual user name
    } else {
      setHasToken(false);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('loginTimestamp');
    localStorage.removeItem('token');
    setHasToken(false);
    navigate('/');
  };

  const handleRoute = () => {
    navigate('/studentPortalBasicInformations');
  };

  const handleLoginAsSchool = () => {
    // Add logic for logging in as school
    navigate('/login-school');
  };

  const handleLoginAsStudent = () => {
    // Add logic for logging in as student
    navigate('/studentPortalLogin');
  };

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className="bg-white"
      style={{ paddingLeft: "80px" }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Button
              variant="link"
              as={Link}
              to="/courses"
              className="nav-link-custom"
              style={{ marginLeft: "20px" }}
            >
              Courses
            </Button>
            <Button
              variant="link"
              as={Link}
              to="/institute"
              className="nav-link-custom"
              style={{ marginLeft: "10px" }}
            >
              Schools
            </Button>
            <NavDropdown
              title="Scholarships"
              id="scholarship-nav-dropdown"
              className="nav-dropdown-custom"
              style={{ marginLeft: "10px" }}
            >
              {/* Scholarship dropdown items */}
            </NavDropdown>
            <NavDropdown
              title="Study Guides"
              id="study-guide-nav-dropdown"
              className="nav-dropdown-custom"
              style={{ marginLeft: "10px" }}
            >
              {/* Study Guides dropdown items */}
            </NavDropdown>
          </Nav>
          <div className="m-10 navbutton-section">
            {hasToken ? (
              <>
                <Button className="m-0 btnfirst">Hi !</Button>
                <Button className="m-0 btnsecond" onClick={handleRoute}>{userName}</Button>
                <Button className="m-0 btnfirst" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Button className="m-0 btnfirst">Hi !</Button>
                <Button className="m-0 btnsecond" onClick={handleLoginAsStudent}>Login as student</Button>
                <Button className="m-0 btnsecond" onClick={handleLoginAsSchool}>Login as school</Button>
                <Button className="m-0 btnfirst" >Welcome</Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;