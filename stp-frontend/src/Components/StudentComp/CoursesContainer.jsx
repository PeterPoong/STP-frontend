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
const apiURL = `${baseURL}api/student/categoryList`;

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

  // Split buttons into two arrays of 7 each
  const splitButtons = (buttons) => {
    const mid = Math.ceil(buttons.length / 2);
    return [buttons.slice(0, mid), buttons.slice(mid)];
  };

  const [firstRowButtons, secondRowButtons] = splitButtons(buttons);

  // Helper function to chunk array into slides
  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  // Chunk each row into slides of 6 buttons
  const firstRowSlides = chunkArray(firstRowButtons, 6);
  const secondRowSlides = chunkArray(secondRowButtons, 6);

  return (
    <div style={{ backgroundColor: "white" }}>
      <Container>
        <h4
          style={{ color: "#a90000", textAlign: "center", paddingTop: "40px" }}
        >
          Hot pick courses
        </h4>
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>Loading...</div>
        ) : error ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            Error: {error}
          </div>
        ) : buttons.length > 0 ? (
          <>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={10}
              slidesPerView={1}
              navigation
            >
              {firstRowSlides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "50px",
                      padding: "0 50px",
                    }}
                  >
                    {slide.map((button) => (
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

            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={10}
              slidesPerView={1}
              navigation
              style={{ marginTop: "20px" }}
            >
              {secondRowSlides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "50px",
                      padding: "0 50px",
                    }}
                  >
                    {slide.map((button) => (
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
          </>
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
