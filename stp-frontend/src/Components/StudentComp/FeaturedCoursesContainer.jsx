import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../../css/StudentCss/homePageStudent/Unicard.css";

const baseURL = import.meta.env.VITE_BASE_URL;
const apiURL = `${baseURL}api/student/hpFeaturedCoursesList`;

const FeaturedCoursesContainer = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate

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

  const handleKnowMoreClick = (courseID) => {
    navigate(`/courseDetails/${courseID}`); // Navigate to CourseDetail with the courseID
  };

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {loading && <div>Loading...</div>}
      {!loading && !error && courses.length > 0 && (
        <Container className="course-container">
          <Swiper
            modules={[Navigation, Pagination]} // Add required modules here
            spaceBetween={30}
            slidesPerView={4}
            loop={true}
            navigation
            style={{ padding: "0 50px" }}
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
                slidesPerView: 4,
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
                      <span
                        className="badge"
                        style={{
                          fontSize: "16px",
                          fontWeight: "normal",
                          backgroundColor: course.course_qualification_color, // Dynamically set background color from API
                        }}
                      >
                        {course.course_qualification}
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
                    <p
                      className="course-school-title"
                      style={{
                        color: "#514E4E",
                        fontSize: "16px",
                        fontWeight: "500",
                        marginBottom: "15px",
                      }}
                    >
                      {course.course_school}
                    </p>
                    <p
                      className="course-title"
                      style={{
                        color: "#B71A18",
                        fontSize: "18px",
                        fontWeight: "500",
                        marginBottom: "15px",
                      }}
                    >
                      {course.course_name}
                    </p>
                    <div className="d-flex justify-content-center">
                      <i
                        className="bi bi-geo-alt"
                        style={{ marginRight: "10px", color: "#AAAAAA" }}
                      ></i>
                      <span style={{ color: "#AAAAAA" }}>
                        {course.location}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center ">
                    <button
                      className="button-know-more"
                      onClick={() => handleKnowMoreClick(course.id)} // Add onClick event
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
