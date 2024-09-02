import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../../css/StudentCss/homePageStudent/Unicard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const baseURL = import.meta.env.VITE_BASE_URL;
const apiURL = `${baseURL}api/student/hpFeaturedCoursesList`;

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

  return (
    <div>
      <h4 style={{ textAlign: "left", marginTop: "10px" }}>Featured Courses</h4>
      {error && <div>Error: {error}</div>}
      {loading && <div>Loading...</div>}
      {!loading && !error && courses.length > 0 && (
        <Container className="course-container">
          <Swiper
            spaceBetween={30}
            slidesPerView={3}
            loop={true}
            pagination={{ clickable: true }}
            navigation
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
            }}
          >
            {courses.map((course, idx) => (
              <SwiperSlide key={idx} className="swiper-slide-course">
                <div
                  className="featured-course-card"
                  style={{ width: "230px", height: "245px" }}
                >
                  <div style={{ position: "relative" }}>
                    {course.course_qualification && (
                      <span className="badge" style={{ fontSize: "16px" }}>
                        {course.course_qualification.toUpperCase()}
                      </span>
                    )}
                    <img
                      src={`${baseURL}storage/${course.course_logo}`}
                      alt={course.course_school}
                      className="section-image"
                      style={{
                        height: "80px",
                        width: "150px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div>
                    <h4>{course.course_school}</h4>
                    <p>{course.course_name}</p>
                    <div className="d-flex justify-content-center">
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        style={{ marginRight: "10px" }}
                      />
                      <span>{course.location}</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      className="button-know-more"
                      style={{
                        backgroundColor: "white",
                        borderColor: "#B71A18",
                        color: "#B71A18",
                      }}
                    >
                      {course.knowMoreText || "Know More"}
                    </button>
                    <button className="button-apply-now">
                      {course.applyNowText || "Apply Now"}
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      )}
    </div>
  );
};

export default FeaturedCoursesContainer;
