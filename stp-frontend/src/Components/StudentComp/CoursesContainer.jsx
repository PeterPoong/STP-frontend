import React, { useState, useEffect } from "react";
import CoursesButton from "../../Components/StudentComp/CoursesButton";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../css/StudentCss/course button group/CoursesButton.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const baseURL = import.meta.env.VITE_BASE_URL;
const apiURL = "http://192.168.0.70:8000/api/student/hotPickCategoryList"; // Updated API URL

const CoursesContainer = () => {
  const [buttons, setButtons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(apiURL, {
          method: "GET", // Changed to GET method
          headers: {
            "Content-Type": "application/json",
          },
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
          src: `${baseURL}storage/${item.category_icon}`, // Adjusted for proper icon path
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

  // Helper function to chunk array into slides
  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  // Split buttons into chunks of 12 (6 for each row)
  const slides = chunkArray(buttons, 14);

  return (
    <div style={{ backgroundColor: "white" }}>
      <Container>
        <h4
          style={{ color: "#a90000", textAlign: "center", paddingTop: "40px" }}
        >
          Hot pick Courses
        </h4>
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>Loading...</div>
        ) : error ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            Error: {error}
          </div>
        ) : buttons.length > 0 ? (
          <Swiper
            key={buttons.length} // This forces a re-render only when the data changes
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            effect="slide"
            navigation
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div
                  className="button-grid first-row"
                  style={{
                    justifyContent: "center",
                    display: "flex",
                    gap: "50px",
                    padding: "0 50px",
                  }}
                >
                  {/* First row */}
                  {slide.slice(0, 7).map((button) => (
                    <CoursesButton
                      key={button.id}
                      src={button.src}
                      label={button.label}
                      onClick={() => handleButtonClick(button)}
                    />
                  ))}
                </div>

                <div
                  className="button-grid second-row"
                  style={{
                    justifyContent: "center",
                    display: "flex",
                    gap: "50px",
                    padding: "0 50px",
                  }}
                >
                  {/* Second row */}
                  {slide.slice(7).map((button) => (
                    <CoursesButton
                      key={button.id}
                      src={button.src}
                      label={button.label}
                      onClick={() => handleButtonClick(button)}
                    />
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div style={{ textAlign: "center", padding: "40px" }}>
            No courses available.
          </div>
        )}
      </Container>
    </div>
  );
};

export default CoursesContainer;
