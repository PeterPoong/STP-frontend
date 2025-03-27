import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import cover from "../../../src/assets/StudentPortalAssets/applyCustomCourses/customApplySchoolPhoto.png";
import icon from "../../../src/assets/StudentPortalAssets/applyCustomCourses/icon.png";
import documentIcon from "../../../src/assets/StudentPortalAssets/applyCustomCourses/document-text.png";
import uplaodIcon from "../../../src/assets/StudentPortalAssets/applyCustomCourses/upload icon.png";
import trash from "../../../src/assets/StudentPortalAssets/applyCustomCourses/trash.png";
import pending from "../../../src/assets/StudentPortalAssets/applyCustomCourses/pendingImage.png";
import NavButtonsSP from "../../Components/StudentPortalComp/NavButtonsSP";
import styles from "../../css/StudentPortalStyles/StudentApplyCustomCourses.module.css";
import SpcFooter from "../../Components/StudentPortalComp/SpcFooter";
import ApplyUniszaPage from "../../Components/StudentComp/CustomApplyCourseContent/ApplyUniszaCourse.jsx";

import { useDropzone } from "react-dropzone";

const StudentApplyCustomCourses = ({
  courseId,
  schoolLogoUrl,
  schoolName,
  courseName,
  schoolId,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [appliedCourses, setAppliedCourses] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const onDrop = (acceptedFiles) => {
    // Handle the uploaded files here
    console.log(acceptedFiles);
    setSelectedFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please upload a document before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("certificate_media", selectedFile);
    formData.append("course_id", courseId);

    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/student/applyCustomSchool`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (result.success == true) {
        // Handle success
        console.log("Submission successful!");
        setSubmissionSuccess(true);
      } else {
        // Handle error
        console.error("Submission failed:", result.error);
      }
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  useEffect(() => {
    const checkApplicant = async () => {
      try {
        const token =
          sessionStorage.getItem("token") || localStorage.getItem("token");

        const formData = {
          courseId: courseId,
        };

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

  useEffect(() => {
    if (submissionSuccess) {
      console.log("Page will rerender due to successful submission.");
    }
  }, [submissionSuccess]);

  useEffect(() => {
    console.log("test", schoolName);
  });

  let content;

  switch (schoolId) {
    case 122:
      // case 2:
      content = (
        <Col md={6} className={styles.applycustomcourses_column}>
          <ApplyUniszaPage courseId={courseId} courseName={courseName} />
        </Col>
      );
      break;
    default:
      content = (
        <Col md={6} className={styles.applycustomcourses_column}>
          {appliedCourses === true ? (
            <div>
              <div className={styles.applycustomcourses_content}>
                <Row>
                  <Col>
                    <img
                      src={icon}
                      className={`${styles.applycustomcourses_icon} ms-4 mt-md-5 ms-md-0`}
                      alt="Custom Apply School icon"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p className="ms-4 ms-md-0 mt-3">
                      Please upload a clear, legible frontal scan or photo of
                      your identification card (IC) / passport
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {selectedFile ? (
                      <div
                        className={`${styles.applycustomcourses_uploadedFileContainer} ps-2 d-flex align-items-center py-0`}
                      >
                        <Col xs={2} md={1} className="d-flex align-self-center">
                          <img
                            src={documentIcon}
                            className={styles.applycustomcourses_document_icon}
                            alt="Custom Apply School icon"
                          />
                        </Col>
                        <Col
                          xs={5}
                          md={6}
                          className="d-flex  align-self-center"
                        >
                          <p
                            className="pt-3 pt-md-3"
                            style={{ color: "black" }}
                          >
                            {selectedFile.name}
                          </p>
                        </Col>
                        <Col
                          xs={3}
                          md={4}
                          className="d-flex  align-self-center " // Applies pt-1 for xs and pt-0 for md and larger
                        >
                          <a
                            href={URL.createObjectURL(selectedFile)}
                            target="_blank"
                            style={{ color: "#B71A18", fontSize: "13px" }}
                            rel="noopener noreferrer"
                          >
                            Click to view
                          </a>
                        </Col>
                        <Col
                          xs={2}
                          md={1}
                          className="d-flex justify-content-end pe-3 align-self-center"
                        >
                          <img
                            src={trash}
                            alt="Delete"
                            onClick={() => setSelectedFile(null)}
                            style={{
                              cursor: "pointer",
                              width: "20px",
                              height: "20px",
                            }}
                          />
                        </Col>
                      </div>
                    ) : (
                      <div
                        {...getRootProps({
                          className: `${styles.studentapplycustomcourses_dropzone} border border-dashed p-4 text-center rounded-3`,
                        })}
                      >
                        <input {...getInputProps()} />
                        <Row>
                          <Col className="d-flex justify-content-center">
                            <img
                              src={uplaodIcon}
                              className={styles.applycustomcourses_upload_icon}
                              alt="Custom Apply School icon"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <p className="mb-0" style={{ color: "#B71A18" }}>
                              Click to Upload or Drag and Drop
                            </p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <p className="mb-0" style={{ fontSize: "10px" }}>
                              (Max. File size: 25 MB)
                            </p>
                          </Col>
                        </Row>
                      </div>
                    )}
                  </Col>
                </Row>
              </div>
              <Row>
                <Col>
                  <p
                    className="ms-5 ms-md-4 "
                    style={{ fontSize: "13px", color: "#B71A18" }}
                  >
                    (*You must upload a document before submitting.)
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="d-flex justify-content-end pe-3">
                    <button
                      onClick={handleSubmit}
                      className={`${styles.button_customCourse} btn`}
                    >
                      Submit
                    </button>
                  </div>
                </Col>
              </Row>
            </div>
          ) : (
            // Render something when appliedCourses is false
            <div className="ms-5 mt-md-5 ms-md-0">
              <div className="d-flex flex-column align-items-md-center">
                <img
                  src={pending}
                  alt="Pending"
                  className={styles.applycustomcourses_pendingImage}
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
              </div>
            </div>
          )}
        </Col>
      );
  }

  return (
    <div className={styles.container}>
      <Container className={styles.studentapplycustomcourses_nav_container}>
        <Row>
          <Col xs={12} md={8} lg={6}>
            <NavButtonsSP />
          </Col>
        </Row>
      </Container>

      <Row className={styles.applycustomcourses_row}>
        <Col
          md={6}
          className={`${styles.applycustomcourses_column} mb-3 mb-md-0`}
        >
          <div className={styles.applycustomcourses_content}>
            <div className={styles.applycustomcourses_image_container}>
              <img
                src={cover}
                alt="Custom Apply School"
                className={styles.applycustomcourses_image}
              />
              <div className={styles.applycustomcourses_text_overlay}>
                <p
                  className={`${styles.applycustomcourses_subtitle} text-center text-md-start`}
                >
                  You are applying for
                </p>
                <h2
                  className={`${styles.applycustomcourses_title} text-center text-md-start`}
                >
                  {courseName}{" "}
                  <span style={{ color: "white", fontSize: "20px" }}>at</span>
                </h2>
                <Row className="align-items-center text-center text-md-start">
                  <Col
                    xs="auto"
                    className="d-flex justify-content-center justify-content-md-start"
                  >
                    <div className={styles.applycustomcourses_logo_container}>
                      <img
                        src={schoolLogoUrl}
                        alt="School Logo"
                        className={styles.applycustomcourses_school_logo}
                      />
                    </div>
                  </Col>
                  <Col className="d-flex justify-content-center justify-content-md-start align-items-center">
                    <p
                      className={`${styles.applycustomcourses_school_name} mb-0`}
                    >
                      {schoolName}
                    </p>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </Col>
        {content}
      </Row>
      <SpcFooter />
    </div>
  );
};

export default StudentApplyCustomCourses;
