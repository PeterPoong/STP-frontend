import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card,Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
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
     //console.log("API Response:", result);
      setSchools(result.data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching university images:", error);
    } finally {
      setLoading(false);
    }
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
              modules={[Navigation, Pagination]} // Add required modules here
              spaceBetween={5}
              slidesPerView={9}
              loop={true}
              navigation
              // style={{ padding: "0 5px" }}
              breakpoints={{
                640: {
                  slidesPerView: 10,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 5,
                  spaceBetween: 15,
                },
                1024: {
                  slidesPerView: 9,
                  spaceBetween: 10,
                },
              }}
            >
             
              {schools.map((school, index) => (
                <SwiperSlide key={index} className="swiper-slide-image">
                  
                  <Col xs={12} className="mb-3 ">
                    <Card className="university-card">
                      <Link
                        to={`/knowMoreInstitute/${school.schoolID}`}
                        target="_parent"
                        rel="noopener noreferrer"
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
