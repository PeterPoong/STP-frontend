import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
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
      //console.log("API Response:", result);
      setCourses(result.data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching course data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKnowMoreClick = (course) => {
    sessionStorage.setItem("courseId", course.id); // Store the course ID
    const schoolName = course.course_school.replace(/\s+/g, "-").toLowerCase(); // Use course_school for school name
    const courseName = course.course_name.replace(/\s+/g, "-").toLowerCase(); // Use course_name for course name
    navigate(`/course-details/${schoolName}/${courseName}`); // Navigate to CourseDetail with the courseID
  };

  const handleApplyNow = (course) => {
    if (course && course.id) {
      navigate(`/studentApplyCourses/${course.id}`, {
        state: {
          programId: course.id,
          schoolLogoUrl: `${import.meta.env.VITE_BASE_URL}storage/${
            course.course_logo
          }`,
          schoolName: course.course_school,
          courseName: course.course_name,
          schoolId: course.school_id,
        },
      });
    } else {
      console.error("Course ID is undefined");
    }
  };

  const getSlidesPerView = () => {
    return courses.length > 0 ? courses.length - 1 : 1;
  };
  const getAutoplaySettings = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= 768
        ? {
            delay: 3000,
            disableOnInteraction: false,
          }
        : false;
    }
    return false;
  };

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {loading && (
        <div>
          <div>
            <div className="d-flex justify-content-center align-items-center m-5 ">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          </div>
        </div>
      )}
      {!loading && !error && courses.length > 0 && (
        <Container
          className="course-container"
          style={{ position: "relative" }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={5}
            slidesPerView={5}
            loop={true}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              clickable: true,
            }}
            autoplay={getAutoplaySettings()}
            style={{
              "--swiper-pagination-bottom": "-5px",
              "--swiper-navigation-color": "#BA1718",
              "--swiper-navigation-size": "25px",
              "--swiper-pagination-color": "#BA1718",
              "--swiper-pagination-bullet-inactive-color": "#CCCCCC",
              "--swiper-pagination-bullet-inactive-opacity": "0.5",
              "--swiper-pagination-bullet-size": "8px",
              "--swiper-pagination-bullet-horizontal-gap": "4px",
              paddingBottom: "20px",
              paddingLeft: "25px",
              paddingRight: "25px",
            }}
            grabCursor={true}
            resistance={true}
            resistanceRatio={0.85}
            touchRatio={1.5}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              576: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: getSlidesPerView(),
                spaceBetween: 10,
              },
              992: {
                slidesPerView: getSlidesPerView(),
                spaceBetween: 5,
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 5,
              },
            }}
          >
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
            {courses.map((course, idx) => (
              <SwiperSlide key={idx} className="swiper-slide-course">
                <div
                  className="featured-course-card"
                  style={{ width: "230px", height: "auto", marginTop: "25px" }}
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
                    <Link
                      to={`/university-details/${course.course_school
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`} // Correctly using course_school
                      onClick={() =>
                        sessionStorage.setItem("schoolId", course.school_id)
                      }
                    >
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
                    </Link>
                  </div>
                  <div>
                    <p
                      className="course-school-title"
                      style={{
                        color: "#514E4E",
                        fontSize: "16px",
                        fontWeight: "500",
                        marginBottom: "15px",
                        height: "3rem",
                      }}
                    >
                      <Link
                        style={{
                          color: "#514E4E",
                        }}
                        to={`/university-details/${course.course_school
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`}
                        onClick={() =>
                          sessionStorage.setItem("schoolId", course.school_id)
                        }
                      >
                        {course.course_school}
                      </Link>
                    </p>
                    <p
                      className="course-title"
                      // style={{
                      //   color: "#B71A18",
                      //   fontSize: "18px",
                      //   fontWeight: "500",
                      //   marginBottom: "15px",
                      // }}
                    >
                      <Link
                        style={{ color: "#BA1718" }}
                        onClick={() => handleKnowMoreClick(course)}
                      >
                        {course.course_name}
                      </Link>
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
                      onClick={() => handleKnowMoreClick(course)} // Pass the entire course object
                    >
                      {course.knowMoreText || "Know More"}
                    </button>
                    <button
                      className="button-apply-now"
                      onClick={() => handleApplyNow(course)} // Pass the whole course object
                    >
                      {course.applyNowText || "Apply Now"}
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-pagination"></div>
        </Container>
      )}
    </div>
  );
};

export default FeaturedCoursesContainer;
