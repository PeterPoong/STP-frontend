import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import library from "../../assets/StudentAssets/background image/library.jpg";
import blurbg from "../../assets/StudentAssets/background image/blurbg.png";
import "../../css/StudentCss/homePageStudent/FeaturedUni.css";

const FeaturedUni = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim().toLowerCase();

    if (!trimmedQuery) {
      console.warn("Search query is empty!");
      return;
    }

    navigate(`/courses`, {
      state: {
        searchQuery: trimmedQuery,
      },
    });
  };

  return (
    <div className="featured-uni-carousel">
      <Carousel style={{ width: "100%", height: "400px" }}>
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
        <Form
          className="d-flex mt-3 align-items-center justify-content-center"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <InputGroup
            className="search-bar-homepage"
            style={{ width: "817px", height: "47px", position: "relative" }}
          >
            <FormControl
              type="search"
              placeholder="Find your best Schools or Courses"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                textAlign: "center",
              }}
            />
            <i
              className="bi bi-search"
              style={{
                position: "absolute",
                left: "30%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "18px",
                color: "#aaa",
              }}
            ></i>
          </InputGroup>
        </Form>
        <div className="button-container mt-3 d-flex justify-content-center">
          <button className="diploma-button mb-2 mx-2">Diploma</button>
          <button className="degree1-button mb-2 mx-2">Degree</button>
          <button className="master-button mb-2 mx-2">Master</button>
          <button className="studyInMalaysia-button mb-2 mx-2">
            Study in Malaysia
          </button>
        </div>
      </div>
      <h4
        className="university-row-title"
        style={{
          textAlign: "left",
          paddingTop: "25px",
          fontSize: "20px",
          paddingLeft: "100px",
          paddingBottom: "30px",
        }}
      >
        Featured Universities
      </h4>
    </div>
  );
};

export default FeaturedUni;
