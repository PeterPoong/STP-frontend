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
import "../../css/student css/NavButtons.css";

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      // You should fetch the user's name here from your API or local storage
      setUserName("David Lim"); // Replace with actual user name
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('loginTimestamp');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
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
          <div className="ml-auto navbutton-section">
            {isLoggedIn ? (
              <>
                <Button variant="danger" className="me-2">Hi !</Button>
                <Button variant="outline-secondary" className="me-2">{userName}</Button>
                <Button variant="danger" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <NavButtonsSP />
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const NavButtonsSP = () => {
  return (
    <Nav className="ms-auto" style={{ paddingLeft: "60px" }} expand="lg">
      <ButtonGroup>
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle className="nav-button" id="dropdown-custom-1">
            Login
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item className="dropdown" as={Link} to="/studentPortalLogin">
              Login as Student
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/login-school">
              Login as School
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ButtonGroup>
      <ButtonGroup>
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle className="nav-button" id="dropdown-custom-1">
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
    </Nav>
  );
};

export default NavigationBar;