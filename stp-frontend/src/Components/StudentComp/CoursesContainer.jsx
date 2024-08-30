import React, { useState, useEffect } from "react";
import CoursesButton from "../../Components/StudentComp/CoursesButton";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../../css/StudentCss/course button group/CoursesButton.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const baseURL = import.meta.env.VITE_BASE_URL;
const apiURL = `${baseURL}api/student/categoryList`;

const CoursesContainer = () => {
  const [buttons, setButtons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchData = async () => {
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
        const data = result.data;

        const mappedButtons = data.map((item) => ({
          id: item.id,
          src: `${baseURL}storage/${item.category_icon}`,
          label: item.category_name,
        }));

        setButtons(mappedButtons);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = (category) => {
    navigate("/courses", {
      state: { selectedCategory: category.label },
    });
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <Container>
        <h3
          style={{ color: "#a90000", textAlign: "center", paddingTop: "40px" }}
        >
          Hot pick courses
        </h3>
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>Loading...</div>
        ) : error ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            Error: {error}
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={7}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 7,
                spaceBetween: 10,
              },
            }}
          >
            {buttons.map((button) => (
              <SwiperSlide key={button.id}>
                <CoursesButton
                  src={button.src}
                  label={button.label}
                  onClick={() => handleButtonClick(button)} // Handle button click
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Container>
    </div>
  );
};

export default CoursesContainer;
