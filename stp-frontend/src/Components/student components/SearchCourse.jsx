import React from "react";
import {
  ButtonGroup,
  Container,
  Dropdown,
  InputGroup,
  Form,
  Pagination,
  Row,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/student css/course page css/CoursesPage.css";
import malaysiaFlag from "../../assets/student asset/coursepage image/malaysiaFlag.png";
import koreaFlag from "../../assets/student asset/coursepage image/koreaFlag.png";

const SearchCourse = () => {
  return (
    <Container>
      <h3 className="pt-3">Courses in Degree</h3>

      <Row className="align-items-center mb-3">
        <Col xs={12} sm={4} md={3} lg={2} className="mb-2 mb-sm-0">
          <ButtonGroup>
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
        </Col>

        <Col xs={12} sm={4} md={3} lg={2} className="mb-2 mb-sm-0">
          <ButtonGroup>
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
        </Col>

        <Col xs={12} sm={4} md={3} lg={2} className="mb-2 mb-sm-0">
          <ButtonGroup>
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
        </Col>

        <Col className="d-flex justify-content-end">
          <Pagination className="ml-auto mb-2 mb-md-0">
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
        </Col>
      </Row>

      <Form>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Search for Courses, Institutions"
            aria-label="Search for Courses, Institutions"
            aria-describedby="search-icon"
          />
        </InputGroup>
      </Form>
    </Container>
  );
};

export default SearchCourse;
