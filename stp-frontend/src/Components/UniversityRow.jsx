import React from "react";
import { Container, Row, Col, Carousel, Card } from "react-bootstrap";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.jpg";
import image6 from "../assets/image6.png";
import image7 from "../assets/image7.png";
import image8 from "../assets/image8.png";
import umslogo from "../assets/umslogo.png";
import usmlogo from "../assets/usmlogo.jpeg";

const images = [
  image1,
  image2,
  umslogo,
  image8,
  image4,
  image5,
  usmlogo,
  image7,
];

const itemsPerSlide = 4;

const UniversityRow = () => {
  const numSlides = Math.ceil(images.length / itemsPerSlide);

  return (
    <div>
      <h4>Featured Universities</h4>
      <Container
        className="universityimages-container my-6"
        style={{ padding: "20px" }}
      >
        <Carousel controls={true} style={{ height: "auto" }}>
          {Array.from({ length: numSlides }).map((_, slideIndex) => (
            <Carousel.Item key={slideIndex}>
              <Row className="justify-content-center g-0">
                {images
                  .slice(
                    slideIndex * itemsPerSlide,
                    (slideIndex + 1) * itemsPerSlide
                  )
                  .map((src, index) => (
                    <Col xs={12} md={4} lg={3} className="mb-3" key={index}>
                      <Card className="university-card">
                        <Card.Img
                          variant="top"
                          src={src}
                          alt={`Slide ${
                            slideIndex * itemsPerSlide + index + 1
                          }`}
                        />
                      </Card>
                    </Col>
                  ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </div>
  );
};

export default UniversityRow;
