import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";
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
      //console.log("API Response:", result);
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

  const handleApplyNow = (course) => {
    if (course && course.id) {
      navigate(`/studentApplyCourses/${course.id}`, {
        state: {
          programId: course.id,
          schoolLogoUrl: `${import.meta.env.VITE_BASE_URL}storage/${course.course_logo
            }`,
          schoolName: course.course_school,
          courseName: course.course_name,
        }
      })
    } else {
      console.error("Course ID is undefined");
    }
  };

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {loading && <div>
        <div>
          <div className="d-flex justify-content-center align-items-center m-5 " >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </div></div>}
      {!loading && !error && courses.length > 0 && (
        <Container className="course-container">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={5}
            slidesPerView={5}
            loop={true}
            navigation
            // style={{ padding: "0 100px" }}
            breakpoints={{
              // Mobile phones (portrait)
              320: {
                slidesPerView: 17,
                spaceBetween: 20,
                //centeredSlides: true
              },
              // Large phones & small tablets
              576: {
                slidesPerView: 17,
                spaceBetween:20,
              },
              // Tablets & small laptops
              768: {
                slidesPerView: 3,
                spaceBetween: 5,
              },
              // Laptops & desktops
              992: {
                slidesPerView: 4,
                spaceBetween: 5,
              },
              // Large desktops
              1200: {
                slidesPerView: 5,
                spaceBetween: 5,
              }
            }}
          >
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
                        height: "3rem"
                      }}
                    >
                      <Link
                         style={{
                          color: "#514E4E"
                        }}
                        to={{
                          pathname: `/knowMoreInstitute/${course.school_id}`
                        }}
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
                        to={{
                          pathname: `/courseDetails/${course.id}`,
                          state: { course: course },
                        }}
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
                      onClick={() => handleKnowMoreClick(course.id)} // Add onClick event
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
        </Container>
      )
      }
    </div >
  );
};

export default FeaturedCoursesContainer;
