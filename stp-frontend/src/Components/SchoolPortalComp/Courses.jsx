import React, { useState, useEffect } from "react";
import {
  Search,
  GeoAlt,
  Alarm,
  CalendarCheck,
  Book,
} from "react-bootstrap-icons";
import studyPayLogo from "../../assets/SchoolPortalAssets/download.jpeg";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import styles from "../../css/SchoolPortalStyle/Courses.module.css";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

const courses = [
  {
    id: 1,
    title: "Degree of Medicine",
    university: "Swinburne University (Sarawak)",
    location: "Sarawak",
    duration: "28 months",
    intake: "January, July or September",
    fee: "24,000",
    mode: "Full time",
    type: "Degree",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Swinburne_University_of_Technology_logo.svg",
  },
  {
    id: 2,
    title: "Degree of Medicine",
    university: "Swinburne University (Sarawak)",
    location: "Sarawak",
    duration: "28 months",
    intake: "January, July or September",
    fee: "24,000",
    mode: "Full time",
    type: "Degree",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Swinburne_University_of_Technology_logo.svg",
  },
];

const Courses = () => {
  const token = sessionStorage.getItem("token");
  const [coursesList, setCoursesList] = useState("");

  function test() {
    console.log("set", coursesList);
  }
  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/school/courseList`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          console.log("Error Data:", errorData["errors"]);
          throw new Error(errorData["errors"] || "Internal Server Error");
        }
        const data = await response.json();
        setCoursesList(data.data);
        console.log("courses", data.data);

        test();

        // console.log("set", courses);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
  }, []);

  const [search, setSearch] = useState("");

  // Filter courses based on search input
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container my-4">
      <h5 className="mb-4">Manage Course</h5>

      <Row className={`mb-4`}>
        <Col md={4}>
          <Form.Group controlId="searchInput">
            <Form.Label className="ms-4 fw-light">Search:</Form.Label>

            <InputGroup>
              <InputGroup.Text style={{ border: "none", background: "none" }}>
                <Search />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search for Courses"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ border: "none", boxShadow: "none" }}
              />
            </InputGroup>
          </Form.Group>
        </Col>
        <Col md={5}>
          <div className="d-flex gap-3">
            {/* Sort By Dropdown */}
            <Form.Group controlId="sortBy">
              <Form.Label className="fw-light">Sort By:</Form.Label>
              <Form.Select>
                <option value="">Application Status</option>
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </Form.Select>
            </Form.Group>

            {/* Category Dropdown */}
            <Form.Group controlId="category">
              <Form.Label className="fw-light">Category:</Form.Label>
              <Form.Select>
                <option value="">Academic Qualification</option>
                <option value="SPM">SPM</option>
                <option value="STPM">STPM</option>
                <option value="Foundation">Foundation</option>
              </Form.Select>
            </Form.Group>
          </div>
        </Col>
        <Col md={3}>
          <Button variant="danger" className={`${styles.customRadius}`}>
            Add New Course
          </Button>
        </Col>
      </Row>

      <hr className="opacity-10" />

      {/* Courses Card */}
      {filteredCourses.map((course) => (
        <div key={course.id} className="card mb-4">
          <Row>
            {/* Header Column */}
            <Col md={7}>
              <Row>
                <Col md={12}>
                  <div
                    className="card-header mt-3 mb-4"
                    style={{ borderBottom: "none" }}
                  >
                    <h6>{course.title}</h6>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <div className="d-flex flex-column align-items-start ms-5">
                    <img
                      src={studyPayLogo}
                      alt="University Logo"
                      className="img-fluid mb-2"
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </Col>
                <Col md={8}>
                  <div className="ms-4">
                    <h6>{course.university}</h6>
                    <p className="mb-1">
                      <GeoAlt className="me-2" />
                      {course.location}
                      <a href="#map" className="text-primary ms-2">
                        click and view on map
                      </a>
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
            {/* icon */}
            <Col md={3}>
              <div>
                <div className="mb-2 mt-4">
                  <p>
                    <span role="img" aria-label="degree" className="me-2">
                      <SchoolOutlinedIcon />
                    </span>{" "}
                    {course.type}
                  </p>
                  <p>
                    <span role="img" aria-label="mode" className="me-2">
                      <CalendarCheck />
                    </span>{" "}
                    {course.mode}
                  </p>
                  <p>
                    <span role="img" aria-label="duration" className="me-2">
                      <Alarm />
                    </span>{" "}
                    {course.duration}
                  </p>
                  <p>
                    <span role="img" aria-label="intake" className="me-2">
                      <Book />
                    </span>{" "}
                    {course.intake}
                  </p>
                </div>
              </div>
            </Col>
            {/* Fee and Action */}
            <Col md={2}>
              <div className="text-end me-2" style={{ marginTop: "100px" }}>
                <div className="mb-3 me-3">
                  <span
                    className="d-block text-muted"
                    style={{ fontSize: "0.7rem" }}
                  >
                    Estimation fee
                  </span>
                  <p className="mb-0">
                    RM{" "}
                    <span className="fw-light" style={{ fontSize: "1.2rem" }}>
                      {course.fee}
                    </span>
                  </p>
                </div>
                <button
                  className={`btn btn-outline-danger ${styles.editButton} py-1 px-5`}
                >
                  Edit
                </button>
              </div>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
};

export default Courses;
