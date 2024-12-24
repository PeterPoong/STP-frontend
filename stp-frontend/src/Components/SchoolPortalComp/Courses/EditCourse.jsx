import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Form, Container, Button, Modal } from "react-bootstrap";
import styles from "../../../css/SchoolPortalStyle/Courses/AddCourseBasicInfo.module.css";
// import styles from "../../../../../css/SchoolPortalStyle/Courses/AddCourseBasicInfo.module.css"; // Import the CSS module
import { XLg, Image, Upload } from "react-bootstrap-icons";
import CustomTextArea from "../CustomTextArea";
import { Arrow90degLeft } from "react-bootstrap-icons";

// import CustomTextArea from "../../CustomTextArea";

const EditCourse = ({ courseId, handleGoBack }) => {
  const token = sessionStorage.getItem("token");

  const [courseName, setCourseName] = useState("");
  const [period, setPeriod] = useState("");
  const [fee, setFee] = useState("");

  const [courseCategory, setCourseCategory] = useState("");
  const [categoryList, setCategoryList] = useState("");
  const [loadingCategory, setLoadingCategory] = useState(true);

  const [studyMode, setStudyMode] = useState("");
  const [studyModeList, setStudyModeList] = useState("");
  const [loadingStudyMode, setLoadingStudyMode] = useState("");

  const [qualification, setQualification] = useState("");
  const [qualificationList, setQualificationList] = useState("");
  const [loadingQualification, setLoadingQualification] = useState("");

  const [intake, setIntake] = useState("");
  const [intakeList, setIntakeList] = useState("");
  const [loadingIntake, setLoadingIntake] = useState("");

  const [selectedIntakes, setSelectedIntakes] = useState([]);

  const [uploadPhoto, setUploadPhoto] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const [courseDescription, setCourseDescription] = useState("");
  const [courseRequirement, setCourseRequirement] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalErrorMessage, setModalErrorMessage] = useState([]);

  const [detail, setDetail] = useState("");

  // error
  const [intakeError, SetIntakeError] = useState("");
  const [courseDescriptionError, setCourseDescriptionError] = useState("");
  const [courseRequirementError, setCourseRequirementError] = useState("");
  const [courseNameError, setCourseNameError] = useState("");
  const [logoError, setLogoError] = useState("");

  const [previewPhoto, setPreviewPhoto] = useState("");

  //intake month
  const handleIntakeChange = (event) => {
    const selectedIntakeId = event.target.value;
    const selectedIntake = intakeList.find(
      (intake) => intake.id === parseInt(selectedIntakeId)
    );

    // Add the selected intake if not already included
    if (
      selectedIntake &&
      !selectedIntakes.some((i) => i.id === selectedIntake.id)
    ) {
      setSelectedIntakes([...selectedIntakes, selectedIntake]);

      // Remove the selected intake from the intakeList
      setIntakeList(
        intakeList.filter((intake) => intake.id !== selectedIntake.id)
      );
    }

    // Reset the dropdown to its default state
    event.target.value = "";
  };

  // Handle the removal of a selected intake
  const removeIntake = (id) => {
    const intakeToRemove = selectedIntakes.find((intake) => intake.id === id);

    if (intakeToRemove) {
      // Remove from selectedIntakes
      setSelectedIntakes(selectedIntakes.filter((intake) => intake.id !== id));

      // Re-add the removed intake to the intakeList
      if (!intakeList.some((intake) => intake.id === intakeToRemove.id)) {
        setIntakeList([...intakeList, intakeToRemove]);
      }
    }
  };

  let draftPhoto;

  //handle upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileURL = URL.createObjectURL(file);
    setPreviewPhoto(fileURL);
    setSelectedFile(file);
    // console.log("Selected file:", file);
  };

  const handleUploadClick = () => {
    // Programmatically click the file input to open the file dialog
    fileInputRef.current.click();
  };

  //handle submit

  const handleSubmit = (event) => {
    // console.log(token);
    event.preventDefault(); // Prevent default form submission behavior

    //validate input field
    let errors = [];

    if (selectedIntakes.length === 0) {
      SetIntakeError("Please select at least one intake month.");
      errors.push("Please select at least one intake month.");
    } else {
      SetIntakeError("");
    }

    if (!courseDescription) {
      setCourseDescriptionError("Please fill course description");
      errors.push("Please fill course description");
    } else {
      setCourseDescriptionError("");
    }

    if (!courseRequirement) {
      setCourseRequirementError("Please fill course requirement");
      errors.push("Please fill course requirement");
    } else {
      setCourseRequirementError("");
    }

    // If there are errors, update the modalErrorMessage state and show the modal
    if (errors.length > 0) {
      setModalErrorMessage(errors);
      setShowModal(true);
      // console.log("errorMessage", errors);
      return;
    } else {
      // console.log("intake", selectedIntakes);
      const formData = new FormData();
      formData.append("name", courseName);
      formData.append("schoolID", detail.id);
      formData.append("description", courseDescription);
      formData.append("cost", fee);
      formData.append("period", period);
      formData.append("category", courseCategory);
      formData.append("qualification", qualification);
      formData.append("requirement", courseRequirement);
      formData.append("mode", studyMode);
      formData.append("id", courseId);
      if (selectedFile) {
        formData.append("logo", selectedFile);
      }

      selectedIntakes.forEach((intake, index) => {
        formData.append(`intake[${index}]`, intake.id);
      });

      // formData.forEach((value, key) => {
      //   console.log(`${key}: ${value}`);
      // });

      // formData.forEach((value, key) => {
      //   if (value instanceof Blob) {
      //     console.log(`${key}: ${value.name}`);
      //   } else {
      //     console.log(`${key}: ${value}`);
      //   }
      // });

      // console.log("data", formData);

      const updateCourseDetail = async () => {
        try {
          // console.log("formdata", formData);
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}api/school/editCourses`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            //console.log("Error Data:", errorData["errors"]);
            throw new Error(errorData["errors"] || "Internal Server Error");
          }
          const data = await response.json();
          if (data.success === false) {
            let error = [];
            // console.log("error test", data);
            const courseArrayError = data.error.courses ?? [];
            if (courseArrayError.length > 0) {
              setCourseNameError(courseArrayError[0]);
              error.push(courseArrayError[0]);
            } else {
              setCourseNameError("");
            }

            const logoArrayError = data.error.logo ?? [];
            if (logoArrayError.length > 0) {
              setLogoError(logoArrayError[0]);
              error.push(logoArrayError[0]);
            } else {
              setLogoError("");
            }
            if (error.length > 0) {
              setModalErrorMessage(error);
              setShowModal(true);
            }
          } else {
            handleGoBack();
          }
        } catch (error) {
          console.error("Failed to update course", error);
        }
      };

      updateCourseDetail();
    }
  };

  useEffect(() => {
    try {
      const getCourseCategory = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}api/student/categoryList`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            // console.log("Error Data:", errorData["errors"]);
            throw new Error(errorData["errors"] || "Internal Server Error");
          }
          const data = await response.json();
          setCategoryList(data.data);
          // console.log("category", data);
        } catch (error) {
          console.error("There was a problem with the fetch operation:", error);
        } finally {
          setLoadingCategory(false);
        }
      };

      const studyMode = async () => {
        try {
          const response = await fetch(
            ` ${import.meta.env.VITE_BASE_URL}api/student/studyModeFilterlist`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            // console.log("Error Data:", errorData["errors"]);
            throw new Error(errorData["errors"] || "Internal Server Error");
          }
          const data = await response.json();
          setStudyModeList(data.data);
        } catch (error) {
          console.error("Failed to get studyMode list", error);
        } finally {
          setLoadingStudyMode(false);
        }
      };

      const getQualification = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL
            }api/student/qualificationFilterList`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            // console.log("Error Data:", errorData["errors"]);
            throw new Error(errorData["errors"] || "Internal Server Error");
          }
          const data = await response.json();
          setQualificationList(data.data);
          // console.log("qualification", data);
        } catch (error) {
          console.error("There was a problem with the fetch operation:", error);
        } finally {
          setLoadingQualification(false);
        }
      };

      const intake = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}api/getMonth`,
            {
              method: "GET",
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            // console.log("Error Data:", errorData["errors"]);
            throw new Error(errorData["errors"] || "Internal Server Error");
          }
          const data = await response.json();
          setIntakeList(data.data);
          // console.log("inatake", data);
        } catch (error) {
          console.error("Failed to get intake month", error);
        }
      };

      const schoolDetail = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}api/school/schoolDetail`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            //console.log("Error Data:", errorData["errors"]);
            throw new Error(errorData["errors"] || "Internal Server Error");
          }
          const data = await response.json();
          setDetail(data.data);
          // console.log("detail", data);
        } catch (error) {
          console.error("Faild to get detail", error);
        }
      };

      const getCourseDetail = async () => {
        const formData = {
          courseID: courseId,
        };
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/school/courseDetail`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          // console.log("Error Data:", errorData);
          throw new Error(errorData["errors"] || "Internal Server Error");
        }
        const data = await response.json();
        setCourseName(data.data.course_name);
        setPeriod(data.data.course_period);
        setFee(data.data.course_cost);
        setCourseCategory(data.data.category.categoryId);
        setStudyMode(data.data.study_mode.studyModeId);
        setQualification(data.data.qualification.qualificationId);
        setSelectedIntakes(data.data.course_intake);
        // setSelectedFile(data.data.course_logo.replace("courseLogo/", ""));
        setPreviewPhoto(
          `${import.meta.env.VITE_BASE_URL}storage/${data.data.course_logo}`
        );
        setCourseDescription(data.data.course_description);
        setCourseRequirement(data.data.course_requirement);
      };

      getCourseCategory();
      studyMode();
      getQualification();
      intake();
      schoolDetail();
      getCourseDetail();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }, []);

  return (
    <>
      <Container>
        <h5 className="mb-4 mt-5">
          {/* Make the icon clickable */}
          <span
            onClick={handleGoBack} // Add your click handler here
            style={{
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
            }} // Optional: styling for cursor and alignment
          >
            <Arrow90degLeft style={{ color: "#B71A18" }} className="mx-3" />
          </span>
          Edit Course Detail
        </h5>
        <h4 className="mt-3 ms-4">Basic Information</h4>
        <hr />
        <Form onSubmit={handleSubmit}>
          {/* course name */}
          <Row className="mt-3">
            <Col md={12}>
              <Form.Group className="mx-3" controlId="CourseName">
                <Form.Label className="ms-1" style={{ fontWeight: "normal" }}>
                  Course Name <span className="span-style">*</span>{" "}
                  {courseNameError ? (
                    <span className="ms-2" style={{ color: "red" }}>
                      {courseNameError}
                    </span>
                  ) : null}
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Your Course title"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className={styles.placeholderStyle} // Apply the CSS module class
                />
              </Form.Group>
            </Col>
          </Row>

          {/* period and course fee */}
          <Row className="mt-3">
            {/* period */}
            <Col md={6}>
              <Form.Group className="mx-3 mt-3" controlId="Period">
                <Form.Label className="ms-1" style={{ fontWeight: "normal" }}>
                  Period <span className="span-style">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Your Course's duration. Exp: 20 Months"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className={styles.placeholderStyle} // Apply the CSS module class
                />
              </Form.Group>
            </Col>
            {/* course fee  */}
            <Col md={6}>
              <Form.Group className="mx-3 mt-3" controlId="CourseFee">
                <Form.Label className="ms-1" style={{ fontWeight: "normal" }}>
                  Course Fee (RM) <span className="span-style">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Course Fee"
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  className={styles.placeholderStyle} // Apply the CSS module class
                />
              </Form.Group>
            </Col>
          </Row>

          {/* category and study mode  */}
          <Row className="mt-3">
            {/* category  */}
            <Col md={6}>
              <Form.Group className="mx-3 mt-3" controlId="category">
                <Form.Label className="ms-1" style={{ fontWeight: "normal" }}>
                  Category <span className="span-style">*</span>
                </Form.Label>{" "}
                <Form.Select
                  value={courseCategory}
                  onChange={(e) => setCourseCategory(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Course Category
                  </option>
                  {loadingCategory ? (
                    <option disabled>Loading...</option>
                  ) : categoryList.length === 0 ? (
                    <option disabled>No courses available.</option>
                  ) : (
                    categoryList.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.category_name}
                      </option>
                    ))
                  )}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* study mode */}
            <Col md={6}>
              <Form.Group className="mx-3 mt-3" controlId="studyMode">
                <Form.Label className="ms-1" style={{ fontWeight: "normal" }}>
                  Study Mode <span className="span-style">*</span>
                </Form.Label>{" "}
                <Form.Select
                  value={studyMode}
                  onChange={(e) => setStudyMode(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Study Mode
                  </option>
                  {loadingStudyMode ? (
                    <option disabled>Loading...</option>
                  ) : studyModeList.length === 0 ? (
                    <option disabled>No courses available.</option>
                  ) : (
                    studyModeList.map((studyMode) => (
                      <option key={studyMode.id} value={studyMode.id}>
                        {studyMode.studyMode_name}
                      </option>
                    ))
                  )}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* Qualification and Intake  */}
          <Row className="mt-3">
            <Col md={6}>
              <Form.Group className="mx-3 mt-3" controlId="qualification">
                <Form.Label className="ms-1" style={{ fontWeight: "normal" }}>
                  Qualification <span className="span-style">*</span>
                </Form.Label>
                <Form.Select
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Qualification
                  </option>
                  {loadingQualification ? (
                    <option disabled>Loading...</option>
                  ) : qualificationList.length === 0 ? (
                    <option disabled>No courses available.</option>
                  ) : (
                    qualificationList.map((qualification) => (
                      <option key={qualification.id} value={qualification.id}>
                        {qualification.qualification_name}
                      </option>
                    ))
                  )}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* intake  */}
            <Col md={6}>
              <Form.Group className="mx-3 mt-3" controlId="intake">
                <Form.Label className="ms-1" style={{ fontWeight: "normal" }}>
                  Intake <span className="span-style">*</span>{" "}
                  {intakeError ? (
                    <span className="ms-2" style={{ color: "red" }}>
                      {intakeError}
                    </span>
                  ) : null}
                </Form.Label>

                {/* Select input to choose multiple intakes */}
                <Form.Select onChange={handleIntakeChange} defaultValue="">
                  <option value="" disabled>
                    Select Month
                  </option>
                  {loadingIntake ? (
                    <option disabled>Loading...</option>
                  ) : intakeList.length === 0 ? (
                    <option disabled>No intakes available.</option>
                  ) : (
                    intakeList.map((intake) => (
                      <option key={intake.id} value={intake.id}>
                        {intake.core_metaName}
                      </option>
                    ))
                  )}
                </Form.Select>

                {/* Display the selected intakes */}
                {selectedIntakes.length > 0 && (
                  <Container className="p-3 border border-top-0 rounded">
                    <Row>
                      {selectedIntakes.map((intake) => (
                        <Col md={4} key={intake.id} className="mb-2">
                          <Container
                            className="border rounded"
                            style={{ backgroundColor: "#f0f0f0" }}
                          >
                            <Row>
                              <Col md={9}>
                                <h6>{intake.core_metaName}</h6>
                              </Col>
                              <Col md={3}>
                                <XLg
                                  style={{
                                    cursor: "pointer",
                                    fontSize: "0.7rem",
                                  }} // Styling for the icon
                                  onClick={() => removeIntake(intake.id)} // Event handler to remove intake
                                  title="Remove intake" // Optional: Tooltip on hover
                                />
                              </Col>
                            </Row>

                            {/* <p>{intake.details}</p> */}
                          </Container>
                        </Col>
                      ))}
                    </Row>
                  </Container>
                )}
              </Form.Group>
            </Col>
          </Row>

          {/* Advance Information  */}
          <Row>
            <h4 className="mt-5 ms-4">Advance Information</h4>
            <hr />
          </Row>

          {/* upload thumbnail  */}
          {/* <Row className="my-3 ms-3">Course Thumbnail</Row> */}
          <Form.Label className="ms-4" style={{ fontWeight: "normal" }}>
            Course Thumbnail
          </Form.Label>
          <Row className="ms-1">
            {logoError ? (
              <span className="ms-2" style={{ color: "red" }}>
                {logoError}
              </span>
            ) : null}
          </Row>
          <Row className="ms-3">
            {previewPhoto ? (
              <Col
                md={3}
                className="border mb-2 p-3"
                style={{ height: "200px", width: "auto" }}
              >
                <img
                  // src={URL.createObjectURL(selectedFile)}
                  src={previewPhoto}
                  alt="Preview"
                  style={{
                    width: "auto", // Width will adjust based on the aspect ratio
                    height: "100%", // Fills the column's height
                    objectFit: "cover", // Ensures the image covers the area without distortion
                    display: "block", // Prevents extra spacing around the image
                    margin: "0 auto", // Centers the image horizontally within the Col
                  }}
                />
              </Col>
            ) : (
              <Col md={3} className={styles.iconContainer}>
                <Image className={styles.iconSize} />
              </Col>
            )}

            <Col md={6} className="mb-2 p-3">
              <Row>
                <p>
                  Upload your course Thumbnail here. Important guidelines:
                  1200x800 pixels or 12:8 Ratio. Supported format: .jpg, .jpeg,
                  or .png
                </p>
              </Row>
              {/* upload button  */}
              <Row>
                <Col md={6} className="text-left ">
                  <Form.Group controlId="formFile">
                    <Form.Control
                      type="file"
                      ref={fileInputRef} // Attach the ref to the file input
                      onChange={handleFileChange}
                      accept="image/*"
                      className="d-none" // Hide the default file input
                    />
                  </Form.Group>
                  <Button
                    // className="rounded-5 border-0"
                    className={`btn btn-danger ${styles.customUploadButton}`}
                    onClick={handleUploadClick}
                  >
                    Upload Photo <Upload className="ms-2 mb-1 bold-icon" />
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* course description  */}
          <Row>
            <Row className="mt-5 ms-1">
              <Form.Group controlId="courseDescription">
                <Form.Label className="ms-1" style={{ fontWeight: "normal" }}>
                  Course Description <span className="span-style">*</span>{" "}
                  {courseDescriptionError ? (
                    <span className="ms-2" style={{ color: "red" }}>
                      {courseDescriptionError}
                    </span>
                  ) : null}
                </Form.Label>

                <CustomTextArea
                  required
                  value={courseDescription}
                  onChange={(content) => setCourseDescription(content)}
                />
              </Form.Group>
            </Row>
          </Row>

          {/* course requirement  */}
          <Row>
            <Row className="mt-5 ms-1">
              <Form.Group controlId="courseRequirement">
                <Form.Label className="ms-1" style={{ fontWeight: "normal" }}>
                  Course Requirement <span className="span-style">*</span>{" "}
                  {courseRequirementError ? (
                    <span className="ms-2" style={{ color: "red" }}>
                      {courseRequirementError}
                    </span>
                  ) : null}
                </Form.Label>
                <CustomTextArea
                  value={courseRequirement}
                  onChange={(content) => setCourseRequirement(content)}
                />
              </Form.Group>
            </Row>
          </Row>

          {/* submit button  */}
          <Row
            className=" mt-4 d-flex justify-content-end align-items-end"
            style={{ height: "100%" }}
          >
            <Col style={{ textAlign: "right", marginTop: "auto" }}>
              <button
                type="submit"
                className={`btn btn-danger ${styles.customDangerButton}`}
              >
                Next
              </button>
            </Col>
          </Row>
          <Modal
            show={showModal}
            onHide={() => {
              setShowModal(false); // Hide the modal
              setModalErrorMessage([]); // Clear error messages (set to an empty array)
            }}
            centered
          >
            {" "}
            <Modal.Header closeButton>
              <Modal.Title>Missing Required Field</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ul>
                {modalErrorMessage.map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </ul>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowModal(false); // Close the modal
                  setModalErrorMessage([]); // Clear error messages
                }}
              >
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        </Form>
      </Container>
    </>
  );
};

export default EditCourse;
