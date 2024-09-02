import React from "react";
import { Form, Row, Col, Button, Image } from "react-bootstrap";

const AdminFormComponent = ({
  formTitle,
  fields,
  schoolLogo,
  handleSubmit,
  handleInputChange,
  handleFileChange,
  handleSelectChange,
  handleCourseChange,
  searchQuery,
  filteredCourses,
  selectedCourses,
  error,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <h3 className="fw-light text-left mt-4 mb-4">{formTitle}</h3>
      {error && <p className="text-danger">{error}</p>}
      <hr />
      <Row className="mb-3">
        {fields.map((field, index) => (
          <Col md={6} key={index}>
            <Form.Group controlId={field.id}>
              <Form.Label>{field.label}</Form.Label>
              <Form.Control
                type={field.type}
                placeholder={field.placeholder}
                value={field.value}
                onChange={field.onChange}
                as={field.as}
                rows={field.rows}
                required={field.required}
              />
            </Form.Group>
          </Col>
        ))}
      </Row>

      {schoolLogo && (
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formLogo">
              <Form.Label>School Logo</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} required />
              {schoolLogo && (
                <Image src={schoolLogo} alt="School Logo" thumbnail className="mt-2" />
              )}
            </Form.Group>
          </Col>
        </Row>
      )}

      <Row className="mb-3">
        <Col md={12}>
          <h4 className="fw-light text-left mt-4 mb-4">Select Courses</h4>
          <Form.Control
            type="text"
            placeholder="Search for courses"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <div className="course-list mt-3">
            {filteredCourses.map((course) => (
              <Button
                key={course.id} // Add a unique key here
                value={course.name}
                onClick={() => handleCourseChange({ name: course.name, value: course.name, checked: true })}
                className="course-button"
              >
                {course.name}
              </Button>
            ))}
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={12}>
          <div className="course">
            {selectedCourses.map((course) => (
              <div key={course.id} className="course-item"> {/* Add a unique key here */}
                {course.name}
                <Button
                  variant="link"
                  onClick={() => handleCourseChange({ name: course.name, value: course.name, checked: false })}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={12}>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AdminFormComponent;
