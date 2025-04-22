import React, { useEffect, useState } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import cover from "../../../src/assets/StudentPortalAssets/applyCustomCourses/customApplySchoolPhoto.png";
import icon from "../../../src/assets/StudentPortalAssets/applyCustomCourses/icon.png";
// import documentIcon from "../../../src/assets/StudentPortalAssets/applyCustomCourses/document-text.png";
// import documentIcon from "../../../assets/StudentPortalAssets/applyCustomCourses/upload icon.png";
import documentIcon from "../../../src/assets/StudentPortalAssets/applyCustomCourses/upload icon.png";
import trash from "../../../src/assets/StudentPortalAssets/applyCustomCourses/trash.png";
import pending from "../../../src/assets/StudentPortalAssets/applyCustomCourses/pendingImage.png";
import NavButtonsSP from "../../Components/StudentPortalComp/NavButtonsSP";
import styles from "../../css/StudentPortalStyles/StudentApplyCustomCourses.module.css";

import SpcFooter from "../../Components/StudentPortalComp/SpcFooter";
import ApplyUniszaPage from "../../Components/StudentComp/CustomApplyCourseContent/ApplyUniszaCourse.jsx";
const baseURL = import.meta.env.VITE_BASE_URL;
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

  const [uploadedFrontIcFileName, setUploadedFrontIcFileName] = useState("");
  const [uploadedFrontIcFile, setUploadedFrontIcFile] = useState(null);
  const [uploadedFrontIcFileUrl, setUploadedFrontIcFileUrl] = useState("");
  const [frontIcFileError, setFrontIcFileError] = useState("");

  const [uploadedBackIcFileName, setUploadedBackIcFileName] = useState("");
  const [uploadedBackIcFile, setUploadedBackIcFile] = useState(null);
  const [uploadedBackIcFileUrl, setUploadedBackIcFileUrl] = useState("");
  const [backIcFileError, setBackIcFileError] = useState("");

  const [uploadedPassportFileName, setUploadedPassportFileName] = useState("");
  const [uploadedPassportFile, setUploadedPassportFile] = useState(null);
  const [uploadedPassportFileUrl, setUploadedPassportFileUrl] = useState("");
  const [passportFileError, setPassportFileError] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onDrop = (acceptedFiles) => {
    // Handle the uploaded files here
    console.log(acceptedFiles);
    setSelectedFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // const handleSubmit = async () => {
  //   if (!selectedFile) {
  //     alert("Please upload a document before submitting.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("certificate_media", selectedFile);
  //   formData.append("course_id", courseId);

  //   try {
  //     const token =
  //       sessionStorage.getItem("token") || localStorage.getItem("token");
  //     const response = await fetch(
  //       `${import.meta.env.VITE_BASE_URL}api/student/applyCustomSchool`,
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: formData,
  //       }
  //     );

  //     const result = await response.json();

  //     if (result.success == true) {
  //       // Handle success
  //       console.log("Submission successful!");
  //       setSubmissionSuccess(true);
  //     } else {
  //       // Handle error
  //       console.error("Submission failed:", result.error);
  //     }
  //   } catch (error) {
  //     console.error("Error during submission:", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData();
    if (uploadedFrontIcFile) {
      formData.append("student_frontIC", uploadedFrontIcFile);
    }
    if (uploadedBackIcFile) {
      formData.append("student_backIC", uploadedBackIcFile);
    }
    if (uploadedPassportFile) {
      formData.append("student_passport", uploadedPassportFile);
    }

    //console.log('Data to be sent to the API:', JSON.stringify(submissionData, null, 2));
    // console.log("front", uploadedFrontIcFile);
    // console.log("back", uploadedBackIcFile);
    // console.log("passport", uploadedPassportFile);
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/student/updateICPassport`,
        {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",  // Uncomment if you're sending JSON
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      // Parse the response data
      const responseData = await response.json();

      // Check if the response is not okay (non-2xx status)
      if (!response.ok) {
        if (response.status === 422) {
          // If it's a validation error (422), handle it here
          const errorMessage =
            "Please make sure the file you upload is either jpeg,png,jpg or pdf";
          if (responseData.errors.student_frontIC) {
            setFrontIcFileError(errorMessage);
          }

          if (responseData.errors.student_backIC) {
            setBackIcFileError(errorMessage);
          }
          if (responseData.errors.student_passport) {
            setPassportFileError(errorMessage);
          }

          const errorMessages = Object.values(responseData.errors)
            .flat()
            .join(", ");
          throw new Error(`Validation error: ${errorMessages}`);
        }

        // Handle other HTTP errors
        throw new Error(
          `Failed to update student details. Status: ${response.status}`
        );
      }

      // // If the request was successful
      if (responseData.success) {
        console.log("apply course");
        setSuccess("Student details updated successfully!");
        const token =
          sessionStorage.getItem("token") || localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/student/applyCourse`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Uncomment if you're sending JSON
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ courseID: courseId }),
          }
        );
        const responseData = await response.json();
        console.log("apply course", responseData);

        window.location.reload();
      } else {
        setError(responseData.message || "Failed to update student details");
      }
    } catch (error) {
      // This will handle any errors, including validation errors
      // If the error message contains validation errors, extract them
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
        // console.log("check", result);
      } catch (error) {
        console.error("Error during submission:", error);
      }
    };

    const getStudentDetail = async () => {
      try {
        const token =
          sessionStorage.getItem("token") || localStorage.getItem("token");
        const id = sessionStorage.getItem("id") || localStorage.getItem("id");

        if (!id) {
          setError("User ID not found. Please log in again.");
          setIsLoading(false);
          return;
        }

        const url = `${
          import.meta.env.VITE_BASE_URL
        }api/student/studentDetail?id=${id}`;

        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch student details. Status: ${response.status}`
          );
        }

        const responseData = await response.json();

        // console.log("student data", responseData);
        // console.log("Fetched student data:", responseData);

        if (!responseData.data || Object.keys(responseData.data).length === 0) {
          throw new Error(
            "No data received from the server. Your profile might be incomplete."
          );
        }

        if (responseData.data) {
          //set front ic file
          setUploadedFrontIcFileName(
            responseData.data.frontIc.studentMedia_name ?? ""
          );
          setUploadedFrontIcFileUrl(
            `${baseURL}storage/${responseData.data.frontIc.studentMedia_location}` ??
              ""
          );
          // //set back ic file
          setUploadedBackIcFileName(
            responseData.data.backIc.studentMedia_name ?? ""
          );
          setUploadedBackIcFileUrl(
            `${baseURL}storage/${responseData.data.backIc.studentMedia_location}` ??
              ""
          );

          //set passport
          setUploadedPassportFileName(
            responseData.data.passport.studentMedia_name ?? ""
          );
          setUploadedPassportFileUrl(
            `${baseURL}storage/${responseData.data.passport.studentMedia_location}` ??
              ""
          );
        }
      } catch (error) {
        console.error("Error in fetchStudentDetails:", error.message);
        setError(
          error.message ||
            "Error fetching student details. Please try logging out and back in."
        );
        setIsLoading(false);
      }
    };

    checkApplicant();
    getStudentDetail();
  }, []);

  useEffect(() => {
    if (submissionSuccess) {
      console.log("Page will rerender due to successful submission.");
    }
  }, [submissionSuccess]);

  useEffect(() => {
    console.log("test", schoolName);
  });

  //front ic file
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileChange({ target: { files } });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFrontIcFile(file);
      setUploadedFrontIcFileName(file.name);
      // console.log("File selected:", file);
      // You can also update the state to show a preview or upload the file
    }
  };

  //back ic file
  const handleBackIcFileDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleBackIcFileChange({ target: { files } });
    }
  };

  const handleBackIcFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedBackIcFile(file);
      setUploadedBackIcFileName(file.name);
      // console.log("File back selected:", file);
      // You can also update the state to show a preview or upload the file
    }
  };

  //passport file
  const handlePassportFileDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handlePassportFileChange({ target: { files } });
    }
  };

  const handlePassportFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedPassportFile(file);
      setUploadedPassportFileName(file.name);
      // console.log("File passport selected:", file);
      // You can also update the state to show a preview or upload the file
    }
  };

  const formatFileName = (fileName) => {
    // Check if the filename contains spaces
    if (fileName.length > 15) {
      // Truncate the filename to the first 15 characters and add "..."
      return `${fileName.slice(0, 25)}...`;
    }
    return fileName; // Return the original filename if it contains spaces
  };

  let content;

  switch (schoolId) {
    // unisza
    case 122:
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
                {/* front ic and back ic */}
                <Row className="mb-4">
                  {/* front ic */}
                  <Col md={6} className="mb-5 mb-md-0">
                    <Form.Group controlId="photoUpload">
                      <Form.Label className="fw-bold small formlabel">
                        Front Ic <span className="text-danger"></span>
                      </Form.Label>
                      <br></br>
                      <p>
                        <b style={{ fontSize: "0.8em", color: "#B71A18" }}>
                          {frontIcFileError}
                        </b>
                      </p>

                      {uploadedFrontIcFileName ? (
                        <div
                          className="d-flex align-items-center py-2"
                          style={{
                            border: "2px solid white",
                            borderRadius: "5px",
                            padding: "10px",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                            backgroundColor: "white",
                          }}
                        >
                          <Col
                            xs={3}
                            md={2}
                            className="d-flex align-self-center"
                          >
                            <img
                              src={documentIcon}
                              className={`${styles.applycustomcourses_icon} `}
                              alt="Custom Apply School icon"
                            />
                          </Col>
                          <Col
                            xs={9}
                            md={5}
                            className="d-flex align-self-center"
                          >
                            <a
                              href={
                                uploadedFrontIcFileUrl ||
                                (uploadedFrontIcFile
                                  ? URL.createObjectURL(uploadedFrontIcFile)
                                  : "#")
                              } // Use the file object if URL is empty
                              target="_blank"
                              style={{ color: "#B71A18", fontSize: "13px" }}
                              rel="noopener noreferrer"
                            >
                              {formatFileName(uploadedFrontIcFileName)}
                            </a>
                          </Col>

                          <Col
                            xs={1}
                            md={2}
                            className="d-flex align-self-center justify-content-end"
                          >
                            <Button
                              variant="danger"
                              style={{
                                color: "#B71A18",
                                fontSize: "11px",
                                padding:
                                  "clamp(2px, 1vw, 6px) clamp(5px, 5vw, 10px)",
                              }}
                              className={`${styles.reupload_button}`}
                              onClick={() =>
                                document.getElementById("fileInput").click()
                              }
                            >
                              Reupload
                            </Button>
                            <input
                              type="file"
                              id="fileInput"
                              accept="image/*"
                              onChange={handleFileChange}
                              style={{ display: "none" }}
                            />
                          </Col>
                        </div>
                      ) : (
                        <div
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={handleDrop}
                          onClick={() =>
                            document.getElementById("fileInput").click()
                          }
                          style={{
                            border: "2px solid white",
                            borderRadius: "5px",
                            padding: "10px",
                            textAlign: "center",
                            cursor: "pointer",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <div className="d-flex justify-content-center">
                            <img
                              src={documentIcon}
                              className={`${styles.applycustomcourses_icon}`}
                              alt="Custom Apply School icon"
                            />
                          </div>
                          <p className="mt-2">
                            Drag and drop your photo here, or click to select
                          </p>

                          <p style={{ fontSize: "0.8em" }}>
                            <b>(Max File Size 10MB)</b>
                          </p>

                          <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                          />
                        </div>
                      )}
                    </Form.Group>
                  </Col>

                  {/* back ic */}
                  <Col md={6} className="mb-5 mb-md-0">
                    <Form.Group controlId="photoUpload">
                      <Form.Label className="fw-bold small formlabel">
                        Back Ic <span className="text-danger"></span>
                      </Form.Label>
                      <br></br>
                      <p>
                        <b style={{ fontSize: "0.8em", color: "#B71A18" }}>
                          {backIcFileError}
                        </b>
                      </p>
                      {uploadedBackIcFileName ? (
                        <div
                          className="d-flex align-items-center py-2"
                          style={{
                            border: "2px solid white",
                            borderRadius: "5px",
                            padding: "10px",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                            backgroundColor: "white",
                          }}
                        >
                          <Col
                            xs={3}
                            md={2}
                            className="d-flex align-self-center"
                          >
                            <img
                              src={documentIcon}
                              className={`${styles.applycustomcourses_icon} `}
                              alt="Custom Apply School icon"
                            />
                          </Col>
                          <Col
                            xs={9}
                            md={7}
                            className="d-flex align-self-center"
                          >
                            <a
                              href={
                                uploadedBackIcFileUrl ||
                                (uploadedBackIcFile
                                  ? URL.createObjectURL(uploadedBackIcFile)
                                  : "#")
                              } // Use the file object
                              target="_blank"
                              style={{ color: "#B71A18", fontSize: "13px" }}
                              rel="noopener noreferrer"
                            >
                              {formatFileName(uploadedBackIcFileName)}
                            </a>
                          </Col>

                          <Col
                            xs={2}
                            md={2}
                            className="d-flex align-self-center justify-content-end"
                          >
                            {/* <img
                          src={trash}
                          alt="Delete"
                          onClick={() => setUploadedBackIcFileName("")}
                          style={{
                            cursor: "pointer",
                            width: "20px",
                            height: "20px",
                          }}
                        /> */}
                            <Button
                              variant="danger"
                              style={{
                                color: "#B71A18",
                                fontSize: "11px",
                                padding:
                                  "clamp(2px, 1vw, 6px) clamp(5px, 5vw, 10px)",
                              }}
                              className={`${styles.reupload_button}`}
                              onClick={() =>
                                document
                                  .getElementById("backIcFileInput")
                                  .click()
                              }
                            >
                              Reupload
                            </Button>
                            <input
                              type="file"
                              id="backIcFileInput"
                              accept="image/*"
                              onChange={handleBackIcFileChange}
                              style={{ display: "none" }}
                            />
                          </Col>
                        </div>
                      ) : (
                        <div
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={handleBackIcFileDrop}
                          onClick={() =>
                            document.getElementById("backIcFileInput").click()
                          }
                          style={{
                            border: "2px solid white",
                            borderRadius: "5px",
                            padding: "10px",
                            textAlign: "center",
                            cursor: "pointer",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <div className="d-flex justify-content-center">
                            <img
                              src={documentIcon}
                              className={`${styles.applycustomcourses_icon}`}
                              alt="Custom Apply School icon"
                            />
                          </div>
                          <p className="mt-2">
                            Drag and drop your photo here, or click to select
                          </p>
                          <p style={{ fontSize: "0.8em" }}>
                            <b>(Max File Size 10MB)</b>
                          </p>
                          <input
                            type="file"
                            id="backIcFileInput"
                            accept="image/*"
                            onChange={handleBackIcFileChange}
                            style={{ display: "none" }}
                          />
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                {/* passport  */}
                <Row>
                  <Col className="mb-5 mb-md-0">
                    <Form.Group controlId="photoUpload">
                      <Form.Label className="fw-bold small formlabel">
                        Passport<span className="text-danger"></span>
                      </Form.Label>
                      <br></br>
                      <p>
                        <b style={{ fontSize: "0.8em", color: "#B71A18" }}>
                          {passportFileError}
                        </b>
                      </p>
                      {uploadedPassportFileName ? (
                        <div
                          className="d-flex align-items-center py-2"
                          style={{
                            border: "2px solid white",
                            borderRadius: "5px",
                            padding: "10px",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                            backgroundColor: "white",
                          }}
                        >
                          <Col
                            xs={3}
                            md={2}
                            className="d-flex align-self-center"
                          >
                            <img
                              src={documentIcon}
                              className={`${styles.applycustomcourses_icon} `}
                              alt="Custom Apply School icon"
                            />
                          </Col>
                          <Col
                            xs={10}
                            md={5}
                            className="d-flex align-self-center"
                          >
                            {/* Link for mobile view */}
                            <a
                              href={
                                uploadedPassportFileUrl ||
                                (uploadedPassportFile
                                  ? URL.createObjectURL(uploadedPassportFile)
                                  : "#")
                              } // Use the file object
                              target="_blank"
                              style={{
                                color: "#B71A18",
                                fontSize: "13px",
                                display: "block",
                              }} // Ensure it takes full width
                              rel="noopener noreferrer"
                              className="d-md-none" // Only show on mobile
                            >
                              {formatFileName(uploadedPassportFileName)}
                            </a>
                            {/* Paragraph for laptop view */}
                            <p
                              className="pt-3 pt-md-3 d-none d-md-block" // Only show on larger screens
                              style={{ fontSize: "13px", color: "black" }}
                            >
                              {formatFileName(uploadedPassportFileName)}
                            </p>
                          </Col>
                          <Col xs={2} md={2} className="d-none d-md-block">
                            {" "}
                            {/* Hide on mobile */}
                            <a
                              href={
                                uploadedPassportFileUrl ||
                                (uploadedPassportFile
                                  ? URL.createObjectURL(uploadedPassportFile)
                                  : "#")
                              } // Use the file object
                              target="_blank"
                              style={{ color: "#B71A18", fontSize: "13px" }}
                              rel="noopener noreferrer"
                            >
                              Click to View
                            </a>
                          </Col>
                          <Col
                            xs={1}
                            md={2}
                            className="d-flex align-self-center justify-content-end"
                          >
                            {/* <img
                          src={trash}
                          alt="Delete"
                          onClick={() => setUploadedPassportFileName("")}
                          style={{
                            cursor: "pointer",
                            width: "20px",
                            height: "20px",
                          }}
                        /> */}
                            <Button
                              variant="danger"
                              style={{
                                color: "#B71A18",
                                fontSize: "11px",
                                padding: "5px 10px",
                              }}
                              className={`${styles.reupload_button}`}
                              onClick={() =>
                                document
                                  .getElementById("passportFileInput")
                                  .click()
                              }
                            >
                              Reupload
                            </Button>
                            <input
                              type="file"
                              id="passportFileInput"
                              accept="image/*"
                              onChange={handlePassportFileChange}
                              style={{ display: "none" }}
                            />
                          </Col>
                        </div>
                      ) : (
                        <div
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={handlePassportFileDrop}
                          onClick={() =>
                            document.getElementById("passportFileInput").click()
                          }
                          style={{
                            border: "2px solid white",
                            borderRadius: "5px",
                            padding: "10px",
                            textAlign: "center",
                            cursor: "pointer",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <div className="d-flex justify-content-center">
                            <img
                              src={documentIcon}
                              className={`${styles.applycustomcourses_icon}`}
                              alt="Custom Apply School icon"
                            />
                          </div>
                          <p className="mt-2">
                            Drag and drop your photo here, or click to select
                          </p>
                          <p style={{ fontSize: "0.8em" }}>
                            <b>(Max File Size 10MB)</b>
                          </p>
                          <input
                            type="file"
                            id="passportFileInput"
                            accept="image/*"
                            onChange={handlePassportFileChange}
                            style={{ display: "none" }}
                          />
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
              </div>
              {/* submit button  */}
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
