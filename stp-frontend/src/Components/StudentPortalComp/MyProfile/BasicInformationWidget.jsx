import React, { useState, useEffect } from "react";
import { Card, Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import "../../../css/StudentPortalStyles/StudentPortalLoginForm.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../../../css/StudentPortalStyles/StudentButtonGroup.css";
// import documentIcon from "../../../../assets/icons/document.png";
import documentIcon from "../../../assets/StudentPortalAssets/applyCustomCourses/upload icon.png";
import trash from "../../../assets/StudentPortalAssets/applyCustomCourses/trash.png";
import styles from "../../../css/StudentPortalStyles/StudentApplyCustomCourses.module.css";
const baseURL = import.meta.env.VITE_BASE_URL;
const BasicInformationWidget = ({ onProfilePicUpdate }) => {
  const [studentData, setStudentData] = useState({
    id: "",
    username: "",
    contact: "",
    country_code: "",
    email: "",
    firstName: "",
    lastName: "",
    country: "Malaysia",
    city: "",
    state: "",
    postcode: "",
    ic: "",
    address: "",
    gender: "",
  });
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [genderList, setGenderList] = useState([]);

  // const [identityCard, setIdentityCard] = useState("");
  const [localStudent, setLocalStudent] = useState();
  const [studentNationality, setStudentNationality] = useState("");
  const [icError, setIcError] = useState("");

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

  useEffect(() => {
    const fetchData = async () => {
      await fetchGenderList();
      await fetchStudentDetails();
      await fetchCountries();
    };
    fetchData();
  }, []);

  useEffect(() => {
    //console.log('Student data updated:', studentData);
    if (studentData.contact && studentData.country_code) {
      setPhone(`${studentData.country_code}${studentData.contact}`);
    }
    if (countries.length > 0 && studentData.country) {
      const countryId = countries.find(
        (c) => c.country_name === studentData.country
      )?.id;
      if (countryId) fetchStates(countryId);
    }
    // New logic for gender preselection
    if (
      studentData.country_code === "+60" &&
      studentData.ic &&
      !studentData.gender
    ) {
      const lastDigit = parseInt(studentData.ic.slice(-1));
      const presetGender = lastDigit % 2 === 0 ? "Female" : "Male";
      setStudentData((prevData) => ({ ...prevData, gender: presetGender }));
    }
  }, [studentData, countries]);

  useEffect(() => {
    if (studentData.state) {
      const stateId = states.find(
        (s) => s.state_name === studentData.state
      )?.id;
      if (stateId) fetchCities(stateId);
    }
  }, [studentData.state, states]);

  const fetchGenderList = async () => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/student/genderList`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch gender list. Status: ${response.status}`
        );
      }

      const data = await response.json();
      setGenderList(data.data || []);
    } catch (error) {
      console.error("Error fetching gender list:", error);
      setError("Failed to load gender options. Please try again later.");
    }
  };

  const fetchStudentDetails = async () => {
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
        // Map gender ID to name
        // Use the gender from the response directly, as it's already the core_metaName
        const genderName = responseData.data.gender || "";
        setStudentNationality(responseData.data.nationality ?? "malaysian");

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

        const updatedStudentData = {
          ...responseData.data,
          gender: genderName, // This is already the core_metaName, not the ID
          // contact: responseData.data.contact_number || '',
          // country_code: responseData.data.country_code || ''
          country: responseData.data.country || "Malaysia",
        };

        //console.log('Updated student data:', updatedStudentData);

        setStudentData(updatedStudentData);

        // Set phone state
        setPhone(
          `${updatedStudentData.country_code}${updatedStudentData.contact}`
        );

        // Add this line to update the profile picture
        onProfilePicUpdate(responseData.data.profilePic || "");

        setIsLoading(false);
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

  const fetchCountries = async () => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/student/countryList`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCountries(data.data || []);
      if (!studentData.country) {
        const malaysia = data.data.find((c) => c.country_name === "Malaysia");
        if (malaysia) {
          setStudentData((prevData) => ({ ...prevData, country: "Malaysia" }));
          fetchStates(malaysia.id);
        }
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
      setError("Failed to load countries. Please try again later.");
      setCountries([]);
    }
  };

  const fetchStates = async (countryId) => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/getState`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: countryId }),
        }
      );
      if (!response.ok) {
        if (response.status === 404) {
          console.warn(`No states found for country ID: ${countryId}`);
          setStates([]);
          return;
        }
        const errorData = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${JSON.stringify(
            errorData
          )}`
        );
      }
      const data = await response.json();
      setStates(data.data || []);
    } catch (error) {
      console.error("Error fetching states:", error);
      setError(`Failed to load states: ${error.message}`);
      setStates([]);
    }
  };

  const fetchCities = async (stateId) => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/getCities`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: stateId }),
        }
      );
      if (!response.ok) {
        if (response.status === 404) {
          console.warn(`No cities found for state ID: ${stateId}`);
          setCities([]);
          return;
        }
        const errorData = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${JSON.stringify(
            errorData
          )}`
        );
      }
      const data = await response.json();
      setCities(data.data || []);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setError(`Failed to load cities: ${error.message}`);
      setCities([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let sanitizedValue = value;

    if (name === "username") {
      sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, "");
    } else if (name === "firstName" || name === "lastName") {
      sanitizedValue = value.replace(/[^a-zA-Z\s]/g, "");
    } else if (name === "postcode") {
      sanitizedValue = value.replace(/[^0-9]/g, "");
    } else if (name === "ic") {
      if (studentNationality == "malaysian") {
        sanitizedValue = value.replace(/[^0-9]/g, "").slice(0, 12);
      }
    }

    setStudentData((prevData) => ({
      ...prevData,
      [name]: sanitizedValue,
    }));

    if (name === "gender") {
      const selectedGender = genderList.find((g) => g.core_metaName === value);
      if (selectedGender) {
        setStudentData((prevData) => ({
          ...prevData,
          gender: selectedGender.core_metaName,
        }));
      }
    }

    // If IC number changes and country code is Malaysia, preset gender
    if (name === "ic" && studentData.country_code === "+60") {
      const lastDigit = parseInt(sanitizedValue.slice(-1));
      if (!isNaN(lastDigit)) {
        const presetGender = lastDigit % 2 === 0 ? "Female" : "Male";
        setStudentData((prevData) => ({ ...prevData, gender: presetGender }));
      }
    }
  };

  const handlePhoneChange = (value, country, e, formattedValue) => {
    setPhone(value);
    setCountryCode(country.dialCode);
    setStudentData((prevData) => ({
      ...prevData,
      contact: value.slice(country.dialCode.length),
      country_code: `+${country.dialCode}`,
    }));

    // If country code changes to Malaysia and IC exists, preset gender
    if (country.dialCode === "60" && studentData.ic) {
      const lastDigit = parseInt(studentData.ic.slice(-1));
      if (!isNaN(lastDigit)) {
        const presetGender = lastDigit % 2 === 0 ? "Female" : "Male";
        setStudentData((prevData) => ({ ...prevData, gender: presetGender }));
      }
    }
  };

  const handleCountryChange = (e) => {
    const selectedCountry = countries.find(
      (country) => country.id === parseInt(e.target.value)
    );
    setStudentData((prevData) => ({
      ...prevData,
      country: selectedCountry ? selectedCountry.country_name : "",
      state: "",
      city: "",
    }));
    fetchStates(e.target.value);
    setCities([]);
  };

  const handleStateChange = (e) => {
    const selectedState = states.find(
      (state) => state.id === parseInt(e.target.value)
    );
    setStudentData((prevData) => ({
      ...prevData,
      state: selectedState ? selectedState.state_name : "",
      city: "",
    }));
    fetchCities(e.target.value);
  };

  const handleCityChange = (e) => {
    const selectedCity = cities.find(
      (city) => city.id === parseInt(e.target.value)
    );
    setStudentData((prevData) => ({
      ...prevData,
      city: selectedCity ? selectedCity.city_name : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("name", studentData.username);
    formData.append("country_code", studentData.country_code);
    formData.append("contact_number", studentData.contact);
    formData.append("email", studentData.email);
    formData.append("first_name", studentData.firstName);
    formData.append("last_name", studentData.lastName);
    formData.append("student_nationality", studentNationality);
    formData.append(
      "country",
      countries
        .find((c) => c.country_name === studentData.country)
        ?.id.toString() || ""
    );
    formData.append(
      "state",
      states.find((s) => s.state_name === studentData.state)?.id.toString() ||
        ""
    );
    formData.append(
      "city",
      cities.find((c) => c.city_name === studentData.city)?.id.toString() || ""
    );
    formData.append("postcode", studentData.postcode);
    formData.append("ic", studentData.ic);
    formData.append("address", studentData.address);
    formData.append(
      "gender",
      genderList
        .find((g) => g.core_metaName === studentData.gender)
        ?.id.toString() || ""
    );
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
        `${import.meta.env.VITE_BASE_URL}api/student/editStudentDetail`,
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

      // If the request was successful
      if (responseData.success) {
        setSuccess("Student details updated successfully!");
        localStorage.removeItem("userName");
        localStorage.setItem("userName", studentData.username);
        window.location.reload();
      } else {
        // If the response indicates failure
        setError(responseData.message || "Failed to update student details");
      }
    } catch (error) {
      // This will handle any errors, including validation errors
      console.error("Error test", error); // Log the error object

      // If the error message contains validation errors, extract them
      if (error.message.includes("Validation error")) {
        console.error("Validation error details:", error.message);
        // setError(error.message); // Set the error message to show on the UI
      } else {
        // For other errors (e.g., network or non-validation errors)
        // setError(`Error updating student details: ${error.message}`);
      }
    }
  };

  const handleRadioButton = (isLocal, nationality) => {
    setLocalStudent(isLocal);
    // setIdentityCard("");
    // setIcError("");
    studentData.ic = "";

    if (isLocal == "true") {
      setStudentNationality(nationality);
      // setIcFormat("^d{12}$");
    } else {
      setStudentNationality(nationality);
      // setIcFormat("");
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
      console.log("File selected:", file);
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
      console.log("File back selected:", file);
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
      console.log("File passport selected:", file);
      // You can also update the state to show a preview or upload the file
    }
  };

  if (isLoading) {
    return (
      <div>
        <div>
          <div className="d-flex justify-content-center align-self-center m-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <h4 className="title-widget">{studentData.username || ""}'s Profile</h4>
      <Card className="mb-4">
        <Card.Body className="mx-4">
          <div className="border-bottom mb-4">
            <h2 className="fw-light title-widgettwo" style={{ color: "black" }}>
              Basic Information
            </h2>
          </div>
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3 " controlId="username">
                  <Form.Label className="fw-bold small formlabel">
                    Username<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    required
                    className="w-75 std-input-placeholder"
                    name="username"
                    value={studentData.username || ""}
                    onChange={handleInputChange}
                    placeholder="Enter username (letters and numbers only)"
                    pattern="[a-zA-Z0-9]+"
                    title="Username can only contain letters and numbers"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formBasicPhone" className="mb-3">
                  <Form.Label className="fw-bold small formlabel">
                    Contact Number
                  </Form.Label>
                  <PhoneInput
                    country={"my"}
                    value={phone}
                    onChange={handlePhoneChange}
                    inputProps={{
                      name: "contact",
                      required: true,
                      placeholder: "Enter phone number",
                    }}
                    inputClass="form-control"
                    containerClass="phone-input-container"
                    buttonClass="btn btn-outline-secondary"
                    dropdownClass="country-dropdown custom-dropdown"
                    countryCodeEditable={false}
                    className="w-75"
                    inputStyle={{ fontSize: "16px" }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3 px-0">
              <Col md={6}>
                <Form.Group controlId="first_name">
                  <Form.Label className="fw-bold small formlabel">
                    First Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    className="w-75 std-input-placeholder"
                    type="text"
                    required
                    name="firstName"
                    value={studentData.firstName || ""}
                    onChange={handleInputChange}
                    placeholder="Enter first name (letters and spaces only)"
                    pattern="[a-zA-Z\s]+"
                    title="First name can only contain letters and spaces"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="last_name">
                  <Form.Label className="fw-bold small formlabel">
                    Last Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    required
                    className="w-75 std-input-placeholder"
                    name="lastName"
                    value={studentData.lastName || ""}
                    onChange={handleInputChange}
                    placeholder="Enter last name (letters and spaces only)"
                    pattern="[a-zA-Z\s]+"
                    title="Last name can only contain letters and spaces"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3 px-0">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <p className="text-start p-0 mb-2 custom-color-title-label small">
                    Nationality
                  </p>
                  <div className="d-flex justify-content-start">
                    <Form.Check
                      type="radio"
                      label={
                        <span className="custom-color-title-label">
                          Malaysian
                        </span>
                      }
                      name="userType"
                      id="local"
                      className="me-3"
                      onChange={() => handleRadioButton(true, "malaysian")}
                      required
                      checked={studentNationality === "malaysian"}
                    />
                    <Form.Check
                      type="radio"
                      label={
                        <span className="custom-color-title-label">
                          Non Malaysian
                        </span>
                      }
                      name="userType"
                      id="international"
                      onChange={() => handleRadioButton(false, "international")}
                      checked={studentNationality !== "malaysian"}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="ic">
                  <Form.Label className="fw-bold small formlabel">
                    Identity Card Number <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    required
                    className="w-75 std-input-placeholder"
                    name="ic"
                    value={studentData.ic || ""}
                    onChange={handleInputChange}
                    placeholder={
                      studentNationality == "malaysian"
                        ? "Enter 12-digit IC number"
                        : "Enter Your identical number"
                    }
                    // pattern={
                    //   studentData.country_code === "+60"
                    //     ? "[0-9]{12}"
                    //     : "[a-zA-Z0-9]+"
                    // }
                    // title={
                    //   studentData.country_code === "+60"
                    //     ? "IC must be exactly 12 digits"
                    //     : "IC can only contain letters and numbers"
                    // }
                    // maxLength={
                    //   studentData.country_code === "+60" ? 12 : undefined
                    // }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3 px-0">
              <Col md={6}>
                <Form.Group controlId="gender">
                  <Form.Label className="fw-bold small formlabel">
                    Gender <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    required
                    className="w-75 form-select "
                    name="gender"
                    value={studentData.gender || ""}
                    onChange={handleInputChange}
                  >
                    {genderList.map((gender) => (
                      <option
                        key={gender.id}
                        value={gender.core_metaName}
                        style={{ color: "#000000" }}
                      >
                        {gender.core_metaName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label className="fw-bold small formlabel">
                    Email Address <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    required
                    className="w-75 std-input-placeholder"
                    name="email"
                    value={studentData.email || ""}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={11}>
                <Form.Group className="mb-3 pe-4" controlId="address">
                  <Form.Label className="fw-bold small formlabel">
                    Address <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    className="w-100 std-input-placeholder"
                    name="address"
                    value={studentData.address || ""}
                    onChange={handleInputChange}
                    placeholder="Enter address"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3 px-0">
              <Col md={6}>
                <Form.Group controlId="country">
                  <Form.Label className="fw-bold small formlabel">
                    Country <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    required
                    className="w-75 "
                    name="country"
                    value={
                      countries.find(
                        (c) => c.country_name === studentData.country
                      )?.id || ""
                    }
                    onChange={handleCountryChange}
                  >
                    <option value="">Select country</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.country_name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="state">
                  <Form.Label className="fw-bold small formlabel">
                    State <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    required
                    className="w-75"
                    name="state"
                    value={
                      states.find((s) => s.state_name === studentData.state)
                        ?.id || ""
                    }
                    onChange={handleStateChange}
                  >
                    <option value="">Select state</option>
                    {states.map((state) => (
                      <option key={state.id} value={state.id}>
                        {state.state_name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-4 ">
              <Col md={6}>
                <Form.Group controlId="city">
                  <Form.Label className="fw-bold small formlabel">
                    City <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    required
                    className="w-75"
                    name="city"
                    value={
                      cities.find((c) => c.city_name === studentData.city)
                        ?.id || ""
                    }
                    onChange={handleCityChange}
                  >
                    <option value="">Select city</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.city_name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="postcode">
                  <Form.Label className="fw-bold small formlabel">
                    Postcode <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    required
                    className="w-75 std-input-placeholder"
                    name="postcode"
                    value={studentData.postcode || ""}
                    onChange={handleInputChange}
                    placeholder="Enter postcode (numbers only)"
                    pattern="[0-9]+"
                    title="Postcode can only contain numbers"
                  />
                </Form.Group>
              </Col>
            </Row>

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
                      }}
                    >
                      <Col xs={3} md={2} className="d-flex align-self-center">
                        <img
                          src={documentIcon}
                          className={`${styles.applycustomcourses_icon} `}
                          alt="Custom Apply School icon"
                        />
                      </Col>
                      <Col xs={9} md={5} className="d-flex align-self-center">
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
                        {/* <img
                          src={trash}
                          alt="Delete"
                          onClick={() => setUploadedFrontIcFileName("")}
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
                      }}
                    >
                      <Col xs={3} md={2} className="d-flex align-self-center">
                        <img
                          src={documentIcon}
                          className={`${styles.applycustomcourses_icon} `}
                          alt="Custom Apply School icon"
                        />
                      </Col>
                      <Col xs={9} md={7} className="d-flex align-self-center">
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
                            document.getElementById("backIcFileInput").click()
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
                      }}
                    >
                      <Col xs={3} md={2} className="d-flex align-self-center">
                        <img
                          src={documentIcon}
                          className={`${styles.applycustomcourses_icon} `}
                          alt="Custom Apply School icon"
                        />
                      </Col>
                      <Col xs={10} md={5} className="d-flex align-self-center">
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
                            document.getElementById("passportFileInput").click()
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
            <div className="d-flex justify-content-end mt-3">
              <div className="my-2">
                <Button
                  variant="danger"
                  type="submit"
                  className="mpbtndiv m-0 fw-bold rounded-pill"
                >
                  Save
                </Button>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BasicInformationWidget;
