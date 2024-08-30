import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../css/StudentCss/homePageStudent/UniversityRow.css";

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
      console.log("API Response:", result);
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
      <h4 className="university-row-title" style={{ textAlign: "left" }}>
        Featured Universities
      </h4>
      <div>
        {error && <div>Error: {error}</div>}
        {loading && <div>Loading...</div>}
        {!loading && schools.length > 0 && (
          <Container className="university-row-carousel" fluid>
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
              {schools.map((school, index) => (
                <SwiperSlide key={index}>
                  <Col xs={12} className="mb-3">
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
