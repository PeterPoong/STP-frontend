import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { Form, FormControl, InputGroup, Button } from "react-bootstrap";
import library from "../../assets/StudentAssets/background image/library.jpg";
import blurbg from "../../assets/StudentAssets/background image/blurbg.png";
import "../../css/StudentCss/homePageStudent/FeaturedUni.css";

const FeaturedUni = () => {
  return (
    <div className="featured-uni-carousel">
      <Carousel controls={true} style={{ width: "100%", height: "400px" }}>
        <Carousel.Item>
          <div className="carousel-image-wrapper">
            <img
              className="d-block w-100 carousel-image"
              src={library}
              alt="First slide"
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-image-wrapper">
            <img
              className="d-block w-100 carousel-image"
              src={blurbg}
              alt="Second slide"
            />
          </div>
        </Carousel.Item>
      </Carousel>
      <div className="carousel-caption-wrapper text-center">
        <h3 style={{ marginTop: "50px" }}>Study in your dream school</h3>
        <Form className="d-flex mt-3 align-items-center justify-content-center">
          <InputGroup className="search-bar">
            <FormControl
              type="search"
              placeholder="Search your best Schools or Courses"
              aria-label="Search"
            />
          </InputGroup>
          <button variant="outline-danger">Search</button>
        </Form>
        <div className="button-container mt-3 d-flex justify-content-center ">
          <button className="diploma-button mb-2 mx-2" size="lg">
            Diploma
          </button>
          <button className="degree1-button mb-2 mx-2">Degree</button>
          <button className="master-button mb-2 mx-2">Master</button>
          <button className="studyInMalaysia-button mb-2 mx-2">
            Study in Malaysia
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedUni;
