import React, { useState, useEffect } from "react";
import CoursesButton from "../../Components/StudentComp/CoursesButton";
import { Container, Row, Col } from "react-bootstrap";
import "../../css/StudentCss/course button group/CoursesButton.css";

const baseURL = import.meta.env.VITE_BASE_URL;
const apiURL = "http://192.168.0.69:8000/api/student/categoryList";

const CoursesContainer = () => {
  const [buttons, setButtons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Clear previous errors

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
        console.log("API Response:", result);

        const mappedButtons = data.map((item, index) => ({
          id: item.id,
          src: `${baseURL}storage/${item.category_icon}`,
          label: item.category_name,
        }));

        setButtons(mappedButtons);
        console.log("Fetched courses:", result); // Debug log
      } catch (error) {
        setError(error.message);
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
          <Row className="justify-content-center g-0">
            {buttons.map((button) => (
              <Col
                key={button.id}
                md={2}
                className="d-flex justify-content-center"
              >
                <CoursesButton src={button.src} label={button.label} />
              </Col>
            ))}
          </Row>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button
            className="findmore-button"
            size="lg"
            active
            // style={{ backgroundColor: " #a90000", borderColor: "#a90000" }}
          >
            Find More
          </button>
        </div>
      </Container>
    </div>
  );
};

export default CoursesContainer;
