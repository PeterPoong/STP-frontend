// CourseDetail.jsx
import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Form, Container, Button, Modal } from "react-bootstrap";
import { Arrow90degLeft } from "react-bootstrap-icons";
import styles from "../../../css/SchoolPortalStyle/Courses/CourseDetail.module.css"; // Import the CSS module

const CourseDetail = ({ courseId, handleGoBack, editCourse }) => {
  const token = sessionStorage.getItem("token");
  const [courseName, setCourseName] = useState("");

  const [period, setPeriod] = useState("");
  const [fee, setFee] = useState("");

  const [courseCategory, setCourseCategory] = useState("");

  const [studyMode, setStudyMode] = useState("");

  const [qualification, setQualification] = useState("");

  const [selectedIntakes, setSelectedIntakes] = useState([]);

  const [courseLogo, setCourseLogo] = useState(null);

  const [courseDescription, setCourseDescription] = useState(null);

  const [courseRequirement, setCourseRequirement] = useState(null);

  const editCourseDetail = (id) => {
    editCourse(id);
  };

  useEffect(() => {
    const formData = {
      courseID: courseId,
    };
    const getCourseDetail = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/school/courseDetail`,
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
        console.log("Error Data:", errorData);
        throw new Error(errorData["errors"] || "Internal Server Error");
      }
      const data = await response.json();
      setCourseName(data.data.course_name);
      setPeriod(data.data.course_period);
      setFee(data.data.course_cost);
      setCourseCategory(data.data.category.categoryName);
      setStudyMode(data.data.study_mode.studyModeName);
      setQualification(data.data.qualification.qualificationName);
      setSelectedIntakes(data.data.course_intake);
      setCourseLogo(
        `${import.meta.env.VITE_BASE_URL}storage/${data.data.course_logo}`
      );
      setCourseDescription(data.data.course_description);
      setCourseRequirement(data.data.course_requirement);
    };
    getCourseDetail();
  }, []);

  return (
    <div className="container my-4">
      <h5 className="mb-4 mt-5">
        {/* Make the icon clickable */}
        <span
          onClick={handleGoBack} // Add your click handler here
          style={{
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
          }} // Optional: styling for cursor and alignment
        >
          <Arrow90degLeft style={{ color: "#B71A18" }} className="mx-3" />
        </span>
        Course Detail
      </h5>

      <Container>
        <Row>
          <Col md={10}>
            <h4 className="mt-3 ms-4">Basic Information</h4>
          </Col>
          <Col md={2}>
            <button
              onClick={() => editCourseDetail(courseId)}
              className={`btn btn-outline-danger px-5  mb-3 rounded-pill`}
            >
              Edit
            </button>
          </Col>
        </Row>

        <hr />
        <Form>
          {/* course name */}
          <Row className="mt-3">
            <Col md={12}>
              <Form.Group className="mx-3" controlId="CourseName">
                <Form.Label className="ms-1" style={{ fontWeight: "normal" }}>
                  Course Name <span className="span-style">*</span>{" "}
                </Form.Label>
                <Form.Control
                  type="text"
                  value={courseName}
                  readOnly
                  style={{
                    border: "none" /* Remove the border */,
                    boxShadow: "none" /* Remove any box shadow */,
                  }}
                  className={`${styles.placeholderStyle}`} // Apply Bootstrap and custom styles
                />
              </Form.Group>
            </Col>
          </Row>

          {/* period and course fee */}
          <Row className="mt-3">
            {/* period */}
            <Col md={6}>
              <Form.Group className="mx-3 mt-3" controlId="Period">
                <Form.Label className="ms-1" style={{ fontWeight: "normal" }}>
                  Period <span className="span-style">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={period}
                  className={styles.placeholderStyle} // Apply the CSS module class
                />
              </Form.Group>
            </Col>
            {/* course fee  */}
            <Col md={6}>
              <Form.Group className="mx-3 mt-3" controlId="CourseFee">
                <Form.Label className="ms-1" style={{ fontWeight: "normal" }}>
                  Course Fee (RM) <span className="span-style">*</span>
                </Form.Label>
                <Form.Control
                  required
                  readOnly
                  value={fee}
                  className={styles.placeholderStyle} // Apply the CSS module class
                />
              </Form.Group>
            </Col>
          </Row>

          {/* category and study mode  */}
          <Row className="mt-3">
            {/* category  */}
            <Col md={6}>
              <Form.Group className="mx-3 mt-3" controlId="category">
                <Form.Label className="ms-1" style={{ fontWeight: "normal" }}>
                  Course Category{" "}
                </Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={courseCategory}
                  className={styles.placeholderStyle} // Apply the CSS module class
                />
              </Form.Group>
            </Col>

            {/* study mode */}
            <Col md={6}>
              <Form.Group className="mx-3 mt-3" controlId="studyMode">
                <Form.Label className="ms-1" style={{ fontWeight: "normal" }}>
                  Study Mode
                </Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={studyMode}
                  className={styles.placeholderStyle} // Apply the CSS module class
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Qualification and Intake  */}
          <Row className="mt-3">
            <Col md={6}>
              <Form.Group className="mx-3 mt-3" controlId="qualification">
                <Form.Label className="ms-1" style={{ fontWeight: "normal" }}>
                  Qualification <span className="span-style">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={qualification}
                  className={styles.placeholderStyle} // Apply the CSS module class
                />
              </Form.Group>
            </Col>

            {/* intake  */}
            <Col md={6}>
              <Form.Group className="mx-3 mt-3" controlId="qualification">
                <Form.Label className="ms-1" style={{ fontWeight: "normal" }}>
                  Intake <span className="span-style">*</span>
                </Form.Label>
              </Form.Group>
              <Container className="p-3  rounded">
                <Row>
                  {selectedIntakes.map((intake, index) => (
                    <Col md={4} key={index} className="mb-2">
                      <Container
                        className="border rounded"
                        style={{ backgroundColor: "#f0f0f0" }}
                      >
                        <Row>
                          <Col md={9}>
                            <h10>{intake.core_metaName}</h10>
                          </Col>
                        </Row>
                      </Container>
                    </Col>
                  ))}
                </Row>
              </Container>
            </Col>
          </Row>

          {/* Advance Information  */}
          <Row>
            <h4 className="mt-5 ms-4">Advance Information</h4>
            <hr />
          </Row>

          <Form.Label className="ms-4" style={{ fontWeight: "normal" }}>
            Course Thumbnail
          </Form.Label>
          <Row className="ms-3">
            <Col
              md={3}
              className=" mb-2 p-3"
              style={{ height: "200px", width: "auto" }}
            >
              <img
                src={courseLogo}
                alt="Preview"
                style={{
                  width: "auto", // Width will adjust based on the aspect ratio
                  height: "100%", // Fills the column's height
                  objectFit: "cover", // Ensures the image covers the area without distortion
                  display: "block", // Prevents extra spacing around the image
                  margin: "0 auto", // Centers the image horizontally within the Col
                }}
              />
            </Col>
          </Row>

          {/* course description  */}
          <Row>
            <Row className="mt-5 ms-1">
              <Form.Group controlId="courseDescription">
                <Form.Label className="ms-1" style={{ fontWeight: "normal" }}>
                  Course Description
                </Form.Label>
                <Container
                  className="border"
                  dangerouslySetInnerHTML={{ __html: courseDescription }}
                />
              </Form.Group>
            </Row>
          </Row>

          {/* course requirement  */}
          <Row>
            <Row className="mt-5 ms-1">
              <Form.Group controlId="courseDescription">
                <Form.Label className="ms-1" style={{ fontWeight: "normal" }}>
                  Course Requirement
                </Form.Label>
                <Container
                  className="border"
                  dangerouslySetInnerHTML={{ __html: courseRequirement }}
                />
              </Form.Group>
            </Row>
          </Row>
        </Form>
      </Container>
    </div>
    // <div>

    //   <div>ID: {courseId}</div>
    // </div>
  );
};

export default CourseDetail;
