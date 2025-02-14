import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card,Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../css/StudentCss/homePageStudent/UniversityRow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const baseURL = import.meta.env.VITE_BASE_URL;
const apiURL = `${baseURL}api/student/hpFeaturedSchoolList`;

const UniversityRow = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSchools();
  }, []);

  const loadSchools = async () => {
    setLoading(true);
    setError(null);

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

      setSchools(result.data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching university images:", error);
    } finally {
      setLoading(false);
    }
  };
  const getAutoplaySettings = () => {
    // Check if window exists (for SSR compatibility)
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768 ? {
        delay: 3000,
        disableOnInteraction: false,
      } : false;
    }
    return false;
  };
  return (
    <div>
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
        {!loading && !error && schools.length > 0 && (
          <Container className="university-row-carousel">
            
            <Swiper
               modules={[Navigation, Pagination, Autoplay]}
               spaceBetween={5}
               slidesPerView={5}
               loop={true}
               navigation={true}
               pagination={{ 
                 clickable: true 
               }}
               autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
               style={{
                 '--swiper-pagination-bottom': '-5px',
                 paddingBottom: '30px'
               }}
               grabCursor={true}
               resistance={true}
               resistanceRatio={0.85}
               touchRatio={1.5}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                  centeredSlides: true,
                },
                576: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                992: {
                  slidesPerView: 4,
                  spaceBetween: 5,
                },
                1200: {
                  slidesPerView: 5,
                  spaceBetween: 5,
                }
              }}
            >
             
              {schools.map((school, index) => (
                <SwiperSlide key={index} className="swiper-slide-image">
                  
                  <Col xs={12} className="mb-3 ">
                    <Card className="university-card">
                      <Link
                        to={`/university-details/${school.schoolName.replace(/\s+/g, '-').toLowerCase()}`}
                        target="_parent"
                        rel="noopener noreferrer"
                        onClick={() => sessionStorage.setItem('schoolId', school.schoolID)}
                      >
                        <img
                          className="uni-image"
                          src={`${baseURL}storage/${school.schoolLogo}`}
                          alt={school.schoolName}
                        />
                      </Link>
                    </Card>
                  </Col>

                </SwiperSlide>
              ))}
              
            </Swiper>
           
          </Container>
        )}
      </div>
    </div>
  );
};

export default UniversityRow;
