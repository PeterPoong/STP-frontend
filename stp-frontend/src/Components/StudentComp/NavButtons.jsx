import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import logo from "../../assets/StudentAssets/nav logo/logo.png";
import "../../css/StudentCss/NavButtons.css";

const NavigationBar = () => {
  const location = useLocation();
  return (
    <Navbar
      expand="lg"
      fixed="top"
      className="bg-white"
      style={{ paddingLeft: "20px", paddingRight: "20px" }}
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
            <NavDropdown
              title="Scholarships"
              id="scholarship-nav-dropdown"
              className="nav-dropdown-custom"
              style={{ marginLeft: "10px 0" }}
            >
              <NavDropdown.Item as={Link} to="#action/3.1">
                Action
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="#action/3.3">
                Something
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="Study Guides"
              id="study-guide-nav-dropdown"
              className="nav-dropdown-custom"
              style={{ marginLeft: "10px 0" }}
            >
              <NavDropdown.Item as={Link} to="#action/3.1">
                Action
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="#action/3.3">
                Something
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div className="ml-auto navbutton-section">
            <NavButtons />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const NavButtons = () => {
  return (
    <Nav
      className="ms-auto d-flex flex-column flex-lg-row"
      style={{ paddingLeft: "0" }}
    >
      <ButtonGroup className="mb-2 mb-lg-0">
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle className="nav-button" id="dropdown-custom-1">
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
