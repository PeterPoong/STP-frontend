import React, { useState } from "react";
import { Carousel, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Unicard.css";

const apiURL =
  "https://glorious-cricket-largely.ngrok-free.app/api/student/hpFeaturedCoursesList";

const FeaturedCoursesContainer = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCourses = async () => {
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON");
      }

      const result = await response.json();
      console.log("API Response:", result); // Debug log
      setCourses(result);
      console.log("Fetched courses:", result); // Debug log
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

  return (
    <div>
      <div>
        <h4 style={{ textAlign: "left" }}>Featured Courses</h4>
        <Button onClick={loadCourses} disabled={loading}>
          {loading ? "Loading..." : "Load Courses"}
        </Button>
      </div>
      <div>
        {error && <div>Error: {error}</div>}
        {!loading && !error && courses.length > 0 && (
          <Container className="">
            <Carousel controls={true}>
              {chunkedCourses.map((chunk, index) => (
                <Carousel.Item key={index} className="carousel-item">
                  <div className="d-flex justify-content-center flex-wrap">
                    {chunk.map((course, idx) => (
                      <div key={idx} className="featured-course-card">
                        <div style={{ height: "240px" }}>
                          <img
                            src={`https://glorious-cricket-largely.ngrok-free.app/storage/${course.course_logo}`}
                            alt={course.course_school}
                            className="section-image"
                          />
                        </div>
                        <div>
                          <h4>{course.course_school}</h4>
                          <p>{course.course_name}</p>
                        </div>

                        <div className="d-flex justify-content-center">
                          <button className="btn btn-danger me-2">
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
        )}
      </div>
    </div>
  );
};

export default FeaturedCoursesContainer;
