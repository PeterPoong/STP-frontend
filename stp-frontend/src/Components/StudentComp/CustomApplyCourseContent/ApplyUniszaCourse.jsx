import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import styles from "../../../css/StudentPortalStyles/ApplyUniszaCourse.module.css";
import pending from "../../../../src/assets/StudentPortalAssets/applyCustomCourses/pendingImage.png";
import ApplyCustomCoursesStyle from "../../../css/StudentPortalStyles/StudentApplyCustomCourses.module.css";
import { useNavigate } from "react-router-dom";

const ApplyUniszaCourse = ({ courseId, courseName }) => {
  const [appliedCourses, setAppliedCourses] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkApplicant = async () => {
      try {
        const token =
          sessionStorage.getItem("token") || localStorage.getItem("token");

        const formData = {
          courseId: courseId,
        };

        console.log("courseId", courseId);

        const response = await fetch(
          `${
            import.meta.env.VITE_BASE_URL
          }api/student/checkCourseApplicationStatus`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData), // Stringify the body
          }
        );

        const result = await response.json();
        setAppliedCourses(result.success);
        console.log("check", result);
      } catch (error) {
        console.error("Error during submission:", error);
      }
    };
    checkApplicant();
  });

  const handleApplyUniszar = async () => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      // console.log("program", program);
      // setUniszarPopUp(false);

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/student/applyCourse`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courseID: courseId }),
        }
      );
      const data = await response.json();

      if (data.success) {
        window.location.reload();
        window.location.href = "https://www.unisza.edu.my/pendidikan/pesisir";
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return appliedCourses === true ? (
    <div>
      <Container className={`${styles.applyuniszaContainer} mt-md-5`}>
        <Row className="justify-content-center text-center">
          <b>
            We will notify the school and redirect you to another page for
            enrolling to the course.
          </b>
        </Row>
        <Row
          className="justify-content-center text-center"
          style={{ color: "#CE181B" }}
        >
          Are you sure you want to proceed?
        </Row>
        <Row className="justify-content-center">
          <div className="d-flex justify-content-center">
            <Button
              className="uniszarPopOutConfirmButton me-2"
              onClick={() => handleApplyUniszar()}
            >
              Confirm
            </Button>
            <Button
              className="uniszarPopOutCancelButton"
              onClick={() => navigate("/courses")}
            >
              Close
            </Button>
          </div>
        </Row>
      </Container>
    </div>
  ) : (
    <div className="mt-1 ms-5 mt-md-5 ms-md-0">
      <div className="d-flex flex-column align-items-center">
        <img
          src={pending}
          alt="Pending"
          className={ApplyCustomCoursesStyle.applycustomcourses_pendingImage}
        />
        <div className="d-flex">
          <Row className="align-self-center">
            <Col
              style={{
                fontSize: "clamp(16px, 4vw, 25px)",
                color: "#CE181B",
              }}
            >
              <b>Your Application Is Pending For Approval</b>
            </Col>
          </Row>
        </div>
        <div className="d-flex">
          <Row className="align-self-center">
            <Col style={{ fontSize: "13px" }}>
              We'll reach out to you soon, thank you for your patience!
            </Col>
          </Row>
        </div>
        <div className="d-flex">
          <Row className="align-self-center">
            <Col className="mt-md-5" style={{ fontSize: "13px" }}>
              <b>
                Haven't finish enrolling?{" "}
                <a
                  href="https://www.unisza.edu.my/pendidikan/pesisir"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  click here
                </a>
              </b>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ApplyUniszaCourse;
