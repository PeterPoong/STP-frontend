import React, { useState, useEffect } from "react";
import { Carousel, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/StudentCss/homePageStudent/Unicard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const baseURL = import.meta.env.VITE_BASE_URL;
const apiURL = "http://192.168.0.69:8000/api/student/hpFeaturedCoursesList";

const FeaturedCoursesContainer = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course_name: "updatedCourse",
          course_logo: "schoolLogo/1722387878.jpeg",
          course_qualification: "degree",
          course_school: "taylor",
          location: "miri",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON");
      }

      const result = await response.json();
      console.log("API Response:", result);
      setCourses(result.data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching course data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Group courses into chunks of 3
  const chunkedCourses = [];

  for (let i = 0; i < courses.length; i += 3) {
    chunkedCourses.push(courses.slice(i, i + 3));
  }

  console.log("Chunked courses:", chunkedCourses);

  return (
    <div>
      <h4 style={{ textAlign: "left", marginTop: "10px" }}>Featured Courses</h4>
      {error && <div>Error: {error}</div>}
      {loading && <div>Loading...</div>}
      {!loading && !error && chunkedCourses.length > 0 && (
        <div>
          <Container
            className="course-container"
            style={{
              height: "100%",
            }}
          >
            <Carousel
              controls={false}
              style={{
                marginTop: "30px",
              }}
            >
              {chunkedCourses.map((chunk, index) => (
                <Carousel.Item key={index} className="carousel-item">
                  <div className="d-flex justify-content-center flex-wrap">
                    {chunk.map((course, idx) => (
                      <div key={idx} className="featured-course-card">
                        <div style={{ position: "relative", height: "200px" }}>
                          {course.course_qualification && (
                            <span
                              className="position-absolute top-0 end-0 badge "
                              style={{
                                backgroundColor: "#04BADE",
                                color: "white",
                                padding: "5px 10px",
                                fontSize: "18px",
                                margin: "10px",
                              }}
                            >
                              {course.course_qualification.toUpperCase()}
                            </span>
                          )}
                          <img
                            src={`${baseURL}storage/${course.course_logo}`}
                            alt={course.course_school}
                            className="section-image"
                            style={{
                              marginTop: "30px",
                            }}
                          />
                        </div>
                        <div>
                          <h4>{course.course_school}</h4>
                          <p>{course.course_name}</p>
                          <div
                            className="d-flex justify-content-center"
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <FontAwesomeIcon
                              icon={faLocationDot}
                              style={{ marginRight: "10px" }}
                            />
                            <span>{course.location}</span>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center">
                          <button
                            className="btn me-2"
                            style={{
                              backgroundColor: "white",
                              borderColor: "#B71A18",
                              color: "#B71A18",
                            }}
                          >
                            {course.knowMoreText || "Know More"}
                          </button>
                          <button className="btn btn-danger">
                            {course.applyNowText || "Apply Now"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Container>
        </div>
      )}
    </div>
  );
};

export default FeaturedCoursesContainer;
