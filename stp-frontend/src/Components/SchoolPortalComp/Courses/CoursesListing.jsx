import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  GeoAlt,
  Alarm,
  CalendarCheck,
  Book,
  ThreeDots,
} from "react-bootstrap-icons";

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Row, Col, Form, Button, InputGroup, Modal } from "react-bootstrap";
import styles from "../../../css/SchoolPortalStyle/Courses.module.css";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import CourseDetail from "./CourseDetail";

//AddCourseForm

// const CoursesListing = ({ onAddCourseClick }) => {
const CoursesListing = ({ onAddCourseClick, courseID, editCourse }) => {
  const token = sessionStorage.getItem("token");

  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const [search, setSearch] = useState("");

  const [coursesList, setCoursesList] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingQualification, setLoadingQualification] = useState(true);
  const [loadingCategory, setLoadingCategory] = useState(true);

  const [qualificationList, setQualificationList] = useState("");
  const [qualification, setQualification] = useState("");

  const [categoryList, setCategoryList] = useState("");
  const [category, setCategory] = useState("");

  //delete popout modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  //formdata
  const [formData, setFormData] = useState("");

  //drop down
  const [showCourseDropdown, setShowCourseDropDown] = useState(null); // Use id for specific dropdown
  const dropdownRef = useRef(null);
  const threeDotsRef = useRef(null);
  const toggleDropdown = (id) => {
    setShowCourseDropDown((prev) => (prev === id ? null : id));
  };

  const handleViewDetail = (id) => {
    console.log("View Detail clicked with ID:", id);
    setSelectedCourseId(id);
  };

  const getCourses = async (formData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/school/courseList`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
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

      // console.log("set", courses);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const confirmationDelete = (courseId) => {
    console.log("confirm", courseID);
    setCourseToDelete(courseId); // Set the course to be deleted
    setShowDeleteModal(true); // Show modal
  };

  const handleDeleteCourse = (courseId) => {
    const disableCourse = async () => {
      try {
        const formData = {
          id: courseId,
          type: "disable",
        };
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/school/editCourseStatus`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          console.log("Error Data:", errorData["errors"]);
          throw new Error(errorData["errors"] || "Internal Server Error");
        }

        // console.log("set", courses);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    disableCourse();
    getCourses("");
    setShowDeleteModal(false);

    // Add your delete course logic here
  };

  const handleConfirmDelete = () => {
    handleDeleteCourse(courseToDelete); // Call the delete function with the selected course ID
  };

  const resetFilters = () => {
    setSearch("");
    setQualification("");
    setCategory("");
  };

  useEffect(() => {
    const getQualification = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/student/qualificationFilterList`,
          {
            method: "GET",
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
        setQualificationList(data.data);
        console.log("qualification", data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setLoadingQualification(false);
      }
    };

    const getCourseCategory = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/student/categoryList`,
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
        setCategoryList(data.data);
        console.log("category", data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setLoadingCategory(false);
      }
    };

    getCourses("");
    getQualification();
    getCourseCategory();

    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        threeDotsRef.current &&
        !threeDotsRef.current.contains(event.target)
      ) {
        setShowCourseDropDown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    console.log("Choose", qualification);
  }, [qualification]);

  useEffect(() => {
    const searchCourse = () => {
      try {
        const formData = {
          search: search,
          category: category,
          qualification: qualification,
        };
        getCourses(formData);
      } catch (error) {
        console.error("Failed to search for course", error);
      }
    };
    searchCourse();
  }, [search, category, qualification]);

  // useEffect(() => {
  //   const filterByCategory = () => {
  //     try {
  //       const formData = {
  //         category: search,
  //       };
  //       getCourses(formData);
  //     } catch (error) {
  //       console.error("Failed to search for course", error);
  //     }
  //   };
  //   searchCourse();
  // }, [category]);

  const addCourse = () => {
    return <AddCourseForm />;
  };

  const detailPage = (id) => {
    console.log("courseid", id);
    courseID(id);
    // viewDetail(id);
  };

  const editCourseDetail = (id) => {
    editCourse(id);
  };

  return (
    <div className="container my-4">
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this course?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            // onClick={handleConfirmDelete()}
            onClick={() => handleConfirmDelete()}
          >
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <h5 className="mb-4 mt-5">Manage Course</h5>

      <Row className={`mb-4`}>
        <Col md={3}>
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

        <Col md={6}>
          <div className="d-flex gap-5">
            {/* Sort By Dropdown */}
            <Form.Group controlId="sortBy">
              <Form.Label className="fw-light">Sort By:</Form.Label>

              <Form.Select
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                required
              >
                <option value="">Course Qualification</option>

                {loadingQualification ? (
                  <p>Loading...</p>
                ) : qualificationList.length === 0 ? (
                  <p>No courses available.</p>
                ) : (
                  qualificationList.map((qualification) => (
                    <option value={qualification.id}>
                      {qualification.qualification_name}
                    </option>
                  ))
                )}
              </Form.Select>
            </Form.Group>

            {/* Category Dropdown */}
            <Form.Group controlId="category">
              <Form.Label className="fw-light">Category:</Form.Label>
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Course Category</option>

                {loadingCategory ? (
                  <p>Loading...</p>
                ) : categoryList.length === 0 ? (
                  <p>No courses available.</p>
                ) : (
                  categoryList.map((category) => (
                    <option value={category.id}>
                      {category.category_name}
                    </option>
                  ))
                )}
              </Form.Select>
            </Form.Group>

            <p className={`${styles.resetFilter}`} onClick={resetFilters}>
              Reset Filter
            </p>
          </div>
        </Col>

        <Col md={3}>
          {/* <Button
            className={`${styles.customRadius}`}
            onClick={onAddCourseClick} // Add this line to handle the button click
          >
            Add New Course
          </Button> */}
          <div className="d-flex mt-4 ms-4">
            <button
              className={`${styles.submitButton}`}
              onClick={onAddCourseClick}
            >
              Add New Course
            </button>
          </div>
        </Col>
      </Row>

      <hr className="opacity-1" />

      {/* Courses Card */}
      {/* Display loading message */}
      {loading ? (
        <p>Loading...</p>
      ) : coursesList.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        coursesList.map((course) => (
          <div key={course.id} className="card mb-4 mx-4 ">
            <Row>
              <Col md={7}>
                <Row>
                  <Col md={12}>
                    <div
                      className="card-header mt-3 mb-2 px-2"
                      style={{ borderBottom: "none" }}
                    >
                      <h6>{course.name}</h6>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <div className="d-flex flex-column align-items-start ms-4 mt-3">
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}storage/${
                          course.logo
                        }`}
                        alt="University Logo"
                        className="img-fluid mb-2"
                        style={{
                          height: "100px" /* Set fixed height */,
                          width:
                            "auto" /* Adjust width to maintain aspect ratio */,
                          objectFit:
                            "contain" /* Fit the image within the container */,
                          maxWidth:
                            "100%" /* Ensure the image doesn't exceed container width */,
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={8}>
                    <div className="ms-4 mt-3">
                      <h6>{course.school_name}</h6>
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
              <Col md={3}>
                <div>
                  <div className="mb-2 mt-4">
                    <p>
                      <span role="img" aria-label="degree" className="me-2">
                        <SchoolOutlinedIcon />
                      </span>{" "}
                      {course.qualification}
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
                      {course.period}
                    </p>
                    <p>
                      <span role="img" aria-label="intake" className="me-2">
                        <Book />
                      </span>{" "}
                      {course.intake.join(",")}
                    </p>
                  </div>
                </div>
              </Col>
              <Col md={2}>
                <div className="text-end me-2 position-relative">
                  <Row className="me-2 mt-2">
                    <div
                      onClick={() => toggleDropdown(course.id)}
                      className="cursor-pointer"
                      ref={threeDotsRef}
                    >
                      <ThreeDots className={`${styles.threeDotsIcon}`} />
                    </div>
                    {showCourseDropdown === course.id && (
                      <div
                        className={`dropdown-menu show position-absolute end-0 mt-2 ${styles.customDropdownMenu}`}
                        style={{ zIndex: 1000 }}
                        ref={dropdownRef}
                      >
                        <button
                          className={`dropdown-item ${styles.customDropdownItem}`}
                          onClick={() => detailPage(course.id)}

                          // onClick={() => handleViewDetail(course.id)} // Pass the function correctly
                        >
                          View Detail
                        </button>
                        <button
                          className={`dropdown-item ${styles.customDropdownItemDelete}`}
                          // onClick={() => handleDeleteCourse(course.id)}
                          onClick={() => confirmationDelete(course.id)}
                        >
                          Delete Course
                        </button>
                        {/* Modal for delete confirmation */}
                      </div>
                    )}
                  </Row>

                  <Row className="mt-5 me-2">
                    <div className="mb-4 me-3">
                      <span
                        className="d-block text-muted"
                        style={{ fontSize: "0.7rem" }}
                      >
                        Estimation fee
                      </span>
                      <p className="mb-0">
                        RM{" "}
                        <span
                          className="fw-light"
                          style={{ fontSize: "1.2rem" }}
                        >
                          {course.cost}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => editCourseDetail(course.id)}
                      className={`btn btn-outline-danger ${styles.editButton} py-1`}
                    >
                      Edit
                    </button>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        ))
      )}
    </div>
  );
};

export default CoursesListing;
