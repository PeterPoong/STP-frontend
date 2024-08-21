import React, { useState, useEffect } from "react";
import { Container, Row, Col, Carousel, Card } from "react-bootstrap";
// import './UniversityRow.css';  // Import the CSS file
import "../../css/StudentCss/homePageStudent/UniversityRow.css";

const itemsPerSlide = 4;
const baseURL = import.meta.env.VITE_BASE_URL;
const apiURL = import.meta.env.VITE_API_URL;

const UniversityRow = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSchools();
  }, []);

  const loadSchools = async () => {
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          schoolID: 1,
          schoolName: "updated School",
          schoolLogo: "schoolLogo/1721804035.png",

          schoolID: 2,
          schoolName: "swinbrune",
          schoolLogo: "schoolLogo/1721804464.png",

          schoolID: 3,
          schoolName: "curtin",
          schoolLogo: "schoolLogo/1721804783.png",
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
      console.log("API Response:", result); // Debug log
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
      <div className="university-row-container" style={{ width: "100%" }}>
        {error && <div>Error: {error}</div>}
        {loading && <div>Loading...</div>}
        {!loading && schools.length > 0 && (
          <Container className="university-row-carousel" fluid>
            <Carousel controls={false} style={{ height: "auto" }}>
              {Array.from({
                length: Math.ceil(schools.length / itemsPerSlide),
              }).map((_, slideIndex) => (
                <Carousel.Item key={slideIndex}>
                  <Row className="justify-content-center g-0">
                    {schools
                      .slice(
                        slideIndex * itemsPerSlide,
                        (slideIndex + 1) * itemsPerSlide
                      )
                      .map((school, index) => {
                        const imgUrl = `${baseURL}storage/${school.schoolLogo}`;
                        console.log("Image URL:", imgUrl); // Debug log
                        return (
                          <Col
                            xs={12}
                            md={4}
                            lg={3}
                            className="mb-3"
                            key={index}
                          >
                            <Card className="university-card">
                              <Card.Img
                                variant="top"
                                src={imgUrl}
                                alt={school.schoolName}
                              />
                            </Card>
                          </Col>
                        );
                      })}
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>
          </Container>
        )}
      </div>
    </div>
  );
};

export default UniversityRow;
