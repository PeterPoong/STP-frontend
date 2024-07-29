import React from "react";
import {
  ButtonGroup,
  Container,
  Dropdown,
  InputGroup,
  Form,
  Pagination,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../InstitutePage/css/InstitutePage.css";
import malaysiaFlag from "../CoursesPage/images/malaysiaFlag.png";
import koreaFlag from "../CoursesPage/images/koreaFlag.png";

const SearchInstitute = () => {
  return (
    <Container>
      <h3 style={{ textAlign: "left", paddingTop: "15px" }}>
        Courses in Degree
      </h3>

      <div className="d-flex align-items-center mb-3">
        {/* Country */}
        <ButtonGroup className="mr-2">
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle className="country-button" id="dropdown-country">
              Country
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item className="dropdown" as={Link} to="/country">
                <img
                  src={malaysiaFlag}
                  alt="Malaysia Flag"
                  width="20"
                  height="20"
                  className="mr-2"
                />
                Malaysia
              </Dropdown.Item>
              <Dropdown.Item className="dropdown" as={Link} to="/country">
                <img
                  src={koreaFlag}
                  alt="Korea Flag"
                  width="20"
                  height="20"
                  className="mr-2"
                />
                Korea
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ButtonGroup>

        {/* Type of university */}
        <ButtonGroup className="mr-2">
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              className="university-button"
              id="dropdown-university"
            >
              University
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item className="dropdown" as={Link} to="/country">
                Private University
              </Dropdown.Item>
              <Dropdown.Item className="dropdown" as={Link} to="/country">
                Public University
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ButtonGroup>

        {/* Level of education */}
        <ButtonGroup className="mr-2">
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle className="degree-button" id="dropdown-degree">
              Education
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item className="dropdown" as={Link} to="/country">
                Diploma
              </Dropdown.Item>
              <Dropdown.Item className="dropdown" as={Link} to="/country">
                Degree
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ButtonGroup>

        {/* <ButtonGroup className="ml-auto">
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle className="pagination-button">
              1 - 20
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/page">
                Previous
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/page">
                Next
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ButtonGroup> */}
        <Pagination className="ml-auto">
          <Pagination.Prev aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </Pagination.Prev>
          <Pagination.Item active>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Next aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </Pagination.Next>
        </Pagination>
      </div>
      <Form>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Search for Courses, Institutions"
            aria-label="Search for Courses, Institutions"
            aria-describedby="search-icon"
          />
          {/* <InputGroup.Append>
            <InputGroup.Text id="search-icon">
              <i className="fas fa-search"></i>
            </InputGroup.Text>
          </InputGroup.Append> */}
        </InputGroup>
      </Form>
    </Container>
  );
};

export default SearchInstitute;
