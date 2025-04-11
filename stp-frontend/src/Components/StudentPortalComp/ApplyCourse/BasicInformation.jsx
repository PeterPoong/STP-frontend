import React, { useState, useEffect, useCallback } from "react";
import { Form, Row, Col, Alert, Spinner } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../../../css/StudentPortalStyles/StudentPortalLoginForm.css";
import WidgetPopUpFillIn from "../../../Components/StudentPortalComp/Widget/WidgetPopUpFillIn";
import documentIcon from "../../../assets/StudentPortalAssets/applyCustomCourses/upload icon.png";
import trash from "../../../assets/StudentPortalAssets/applyCustomCourses/trash.png";
import styles from "../../../css/StudentPortalStyles/StudentApplyCustomCourses.module.css";
const BasicInformation = ({ onSubmit, nextStep }) => {
  // Added nextStep as a prop
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    icNumber: "",
    gender: "",
    contactNumber: "",
    country_code: "",
    emailAddress: "",
    address: "",
    country: "Malaysia",
    state: "",
    city: "",
    postcode: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [genderList, setGenderList] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [initialDataFetched, setInitialDataFetched] = useState(false);

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

  const presetGender = useCallback((icNumber, countryCode) => {
    if (countryCode === "+60" && icNumber) {
      const lastDigit = parseInt(icNumber.slice(-1));
      if (!isNaN(lastDigit)) {
        return lastDigit % 2 === 0 ? "Female" : "Male";
      }
    }
    return "";
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchGenderList();
      await fetchStudentDetails();
      await fetchCountries();
      setInitialDataFetched(true);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (
      initialDataFetched &&
      formData.country_code === "+60" &&
      formData.icNumber &&
      !formData.gender
    ) {
      const presetGenderValue = presetGender(
        formData.icNumber,
        formData.country_code
      );
      if (presetGenderValue) {
        setFormData((prevData) => ({ ...prevData, gender: presetGenderValue }));
      }
    }
  }, [
    initialDataFetched,
    formData.country_code,
    formData.icNumber,
    formData.gender,
    presetGender,
  ]);

  useEffect(() => {
    if (countries.length > 0 && formData.country) {
      const countryId = countries.find(
        (c) => c.country_name === formData.country
      )?.id;
      if (countryId) fetchStates(countryId);
    }
  }, [formData.country, countries]);

  useEffect(() => {
    if (formData.state) {
      const stateId = states.find((s) => s.state_name === formData.state)?.id;
      if (stateId) fetchCities(stateId);
    }
  }, [formData.state, states]);

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
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/student/studentDetail`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch student details. Status: ${response.status}`
        );
      }
      const result = await response.json();

      if (result.success && result.data) {
        const updatedData = {
          username: result.data.username || "",
          firstName: result.data.firstName || "",
          lastName: result.data.lastName || "",
          icNumber: result.data.ic || "",
          gender: result.data.gender || "",
          contactNumber: result.data.contact || "",
          country_code: result.data.country_code || "",
          emailAddress: result.data.email || "",
          address: result.data.address || "",
          country: result.data.country || "Malaysia",
          state: result.data.state || "",
          city: result.data.city || "",
          postcode: result.data.postcode || "",
        };

        setStudentNationality(result.data.nationality ?? "malaysian");

        // //set front ic file
        setUploadedFrontIcFileName(result.data.frontIc.studentMedia_name ?? "");
        setUploadedFrontIcFileUrl(
          `${baseURL}storage/${result.data.frontIc.studentMedia_location}` ?? ""
        );

        // //set back ic file
        setUploadedBackIcFileName(result.data.backIc.studentMedia_name ?? "");
        setUploadedBackIcFileUrl(
          `${baseURL}storage/${result.data.backIc.studentMedia_location}` ?? ""
        );

        //set passport
        setUploadedPassportFileName(
          result.data.passport.studentMedia_name ?? ""
        );
        setUploadedPassportFileUrl(
          `${baseURL}storage/${result.data.passport.studentMedia_location}` ??
            ""
        );

        // Only preset gender if it's not already set
        if (!updatedData.gender) {
          updatedData.gender = presetGender(
            updatedData.icNumber,
            updatedData.country_code
          );
        }
        // console.log("detail", updatedData);
        setFormData(updatedData);
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
      setError("Failed to load student details. Please try again later.");
    } finally {
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
      if (!formData.country) {
        const malaysia = data.data.find((c) => c.country_name === "Malaysia");
        if (malaysia) {
          setFormData((prevData) => ({ ...prevData, country: "Malaysia" }));
          fetchStates(malaysia.id);
        }
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
      setError("Failed to load countries. Please try again later.");
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setStates(data.data || []);
    } catch (error) {
      console.error("Error fetching states:", error);
      setError("Failed to load states. Please try again later.");
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCities(data.data || []);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setError("Failed to load cities. Please try again later.");
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
    } else if (name === "icNumber") {
      if (studentNationality == "malaysian") {
        sanitizedValue = value.replace(/[^0-9]/g, "").slice(0, 12);
      }
    }

    setFormData((prevData) => {
      const newData = { ...prevData, [name]: sanitizedValue };

      if (name === "icNumber" && newData.country_code === "+60") {
        const presetGenderValue = presetGender(
          sanitizedValue,
          newData.country_code
        );
        if (presetGenderValue && !newData.gender) {
          newData.gender = presetGenderValue;
        }
      }

      return newData;
    });
  };

  const handlePhoneChange = (value, country) => {
    setFormData((prevData) => {
      const newData = {
        ...prevData,
        contactNumber: value.slice(country.dialCode.length),
        country_code: `+${country.dialCode}`,
      };

      if (country.dialCode === "60" && newData.icNumber) {
        const presetGenderValue = presetGender(
          newData.icNumber,
          newData.country_code
        );
        if (presetGenderValue && !newData.gender) {
          newData.gender = presetGenderValue;
        }
      }

      return newData;
    });
  };

  const handleCountryChange = (e) => {
    const selectedCountry = countries.find(
      (country) => country.id === parseInt(e.target.value)
    );
    setFormData((prevData) => ({
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
    setFormData((prevData) => ({
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
    setFormData((prevData) => ({
      ...prevData,
      city: selectedCity ? selectedCity.city_name : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation (check for required fields)
    const missingFields = [];
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) missingFields.push(key);
    });

    if (missingFields.length > 0) {
      // Show the popup if there are missing fields
      setShowPopup(true);
      return;
    }

    // // Clear error messages on valid submission
    setError("");
    setSuccess("");
    // onSubmit(formData);

    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");

      const formDatas = new FormData();

      formDatas.append("name", formData.username);
      formDatas.append("country_code", formData.country_code);
      formDatas.append("contact_number", formData.contactNumber);
      formDatas.append("email", formData.emailAddress);
      formDatas.append("first_name", formData.firstName);
      formDatas.append("last_name", formData.lastName);
      formDatas.append("student_nationality", studentNationality);
      formDatas.append(
        "country",
        countries
          .find((c) => c.country_name === formData.country)
          ?.id.toString() || ""
      );

      formDatas.append(
        "state",
        states.find((s) => s.state_name === formData.state)?.id.toString() || ""
      );

      formDatas.append(
        "city",
        cities.find((c) => c.city_name === formData.city)?.id.toString() || ""
      );
      formDatas.append("postcode", formData.postcode);
      formDatas.append("ic", formData.icNumber);
      formDatas.append("address", formData.address);
      formDatas.append(
        "gender",
        genderList
          .find((g) => g.core_metaName === formData.gender)
          ?.id.toString() || ""
      );
      if (uploadedFrontIcFile) {
        formDatas.append("student_frontIC", uploadedFrontIcFile);
      }
      if (uploadedBackIcFile) {
        formDatas.append("student_backIC", uploadedBackIcFile);
      }
      if (uploadedPassportFile) {
        formDatas.append("student_passport", uploadedPassportFile);
      }

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/student/editStudentDetail`,
        {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: formDatas,
        }
      );
      const responseData = await response.json();
      console.log("res", responseData);

      // if (responseData.success === false) {
      //   setShowPopup(true);
      // }

      if (!responseData.ok) {
        if (response.status === 422) {
          // console.log("response error", responseData);
          // If it's a validation error (422), handle it here
          const errorMessage =
            "Please make sure the file you upload is either jpeg,png,jpg or pdf";
          if (responseData.errors.student_frontIC) {
            setFrontIcFileError(errorMessage);
          }

          console.log("error message", errorMessage);
          if (responseData.errors.student_backIC) {
            setBackIcFileError(errorMessage);
          }
          if (responseData.errors.student_passport) {
            setPassportFileError(errorMessage);
          }

          const errorMessages = Object.values(responseData.errors)
            .flat()
            .join(", ");
          throw new Error(`Validation errors: ${errorMessages}`);
        }
        // Handle other HTTP errors
        throw new Error(
          `Failed to update student details. Status: ${response.status}`
        );
      } else {
        // if (responseData.success) {
        //   setSuccess("Student details updated successfully!");
        //   nextStep();
        // } else {
        //   setShowPopup(true); // Show the popup in case of a server error
        // }
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setShowPopup(true); // Show the popup if there's an error
    }

    // This will trigger the navigation to the next step
  };

  const handleRadioButton = (isLocal, nationality) => {
    setLocalStudent(isLocal);
    // setIdentityCard("");
    // setIcError("");
    formData.icNumber = "";

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

  if (isLoading)
    return (
      <div>
        <div className="d-flex justify-content-center align-items-center m-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </div>
    );

  return (
    <div className="step-content-caseone p-4 rounded">
      <h3 className="border-bottom pb-2 fw-normal">Basic Information</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <div className="sap-content-caseone w-100 d-flex justify-content-center">
        <div className="sap-content-caseone w-100 py-5">
          <div>
            {/* first name and last name  */}
            <Row className="applycourse-basicinfo-margin-bot">
              <Col md={6}>
                <Form.Group className="sac-form-group d-flex align-items-center">
                  <Form.Label htmlFor="firstName" className="me-2">
                    First Name<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name (letters and spaces only)"
                    required
                    pattern="[a-zA-Z\s]+"
                    title="First name can only contain letters and spaces"
                    className="std-input-placeholder"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="sac-form-group d-flex align-items-center">
                  <Form.Label htmlFor="lastName" className="me-2">
                    Last Name<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name (letters and spaces only)"
                    required
                    pattern="[a-zA-Z\s]+"
                    title="Last name can only contain letters and spaces"
                    className="std-input-placeholder"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* nationality and ic */}
            <Row className="applycourse-basicinfo-margin-bot">
              <Col md={6}>
                <Form.Group className="mb-3 ms-md-5">
                  <p className="text-start p-0 mb-2 ms-3 ">
                    <b>Nationality</b>
                  </p>
                  <div className="d-flex  ms-3 justify-content-start">
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
                <Form.Group className="sac-form-group d-flex align-items-center">
                  <Form.Label htmlFor="icNumber" className="me-2">
                    IC Number<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="icNumber"
                    name="icNumber"
                    value={formData.icNumber}
                    onChange={handleInputChange}
                    placeholder={
                      studentNationality == "malaysian"
                        ? "Enter 12-digit IC number"
                        : "Enter Your identical number"
                    }
                    required
                    title={
                      formData.country_code === "+60"
                        ? "IC must be exactly 12 digits"
                        : "IC can contain letters and numbers"
                    }
                    maxLength={formData.country_code === "+60" ? 12 : undefined}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="applycourse-basicinfo-margin-bot">
              <Col md={6}>
                <Form.Group className="sac-form-group d-flex align-items-center">
                  <Form.Label htmlFor="contactNumber" className="me-2">
                    Contact Number<span className="text-danger">*</span>
                  </Form.Label>
                  <PhoneInput
                    country={"my"}
                    value={`${formData.country_code}${formData.contactNumber}`}
                    onChange={handlePhoneChange}
                    inputProps={{
                      name: "contactNumber",
                      required: true,
                      placeholder: "Enter phone number",
                    }}
                    inputStyle={{ fontSize: "16px" }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="sac-form-group d-flex align-items-center">
                  <Form.Label htmlFor="gender" className="me-2">
                    Gender<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    {genderList.map((gender) => (
                      <option key={gender.id} value={gender.core_metaName}>
                        {gender.core_metaName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="applycourse-basicinfo-margin-bot">
              <Col md={12}>
                <Form.Group className="sac-form-group d-flex align-items-center">
                  <Form.Label htmlFor="emailAddress" className="me-2">
                    Email Address<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    id="emailAddress"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    className="std-input-placeholder"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="applycourse-basicinfo-margin-bot">
              <Col md={12}>
                <Form.Group className="sac-form-group d-flex align-items-center">
                  <Form.Label htmlFor="address" className="me-2">
                    Address<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter address"
                    className="std-input-placeholder"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="applycourse-basicinfo-margin-bot">
              <Col md={6}>
                <Form.Group className="sac-form-group d-flex align-items-center">
                  <Form.Label htmlFor="country" className="me-2">
                    Country<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    id="country"
                    name="country"
                    value={
                      countries.find((c) => c.country_name === formData.country)
                        ?.id || ""
                    }
                    onChange={handleCountryChange}
                    required
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
                <Form.Group className="sac-form-group d-flex align-items-center">
                  <Form.Label htmlFor="state" className="me-2">
                    State<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    id="state"
                    name="state"
                    value={
                      states.find((s) => s.state_name === formData.state)?.id ||
                      ""
                    }
                    onChange={handleStateChange}
                    required
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

            <Row className="mb-5">
              <Col md={6}>
                <Form.Group className="sac-form-group d-flex align-items-center">
                  <Form.Label htmlFor="city" className="me-2">
                    City<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    id="city"
                    name="city"
                    value={
                      cities.find((c) => c.city_name === formData.city)?.id ||
                      ""
                    }
                    onChange={handleCityChange}
                    required
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
                <Form.Group className="sac-form-group d-flex align-items-center">
                  <Form.Label htmlFor="postcode" className="me-2">
                    Postcode<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="postcode"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleInputChange}
                    placeholder="Enter postcode (numbers only)"
                    className="std-input-placeholder"
                    required
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
                    {/* <b style={{ fontSize: "0.8em", color: "#B71A18" }}>
                      {frontIcFileError}
                    </b> */}
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
                      <Col xs={4} md={2} className="d-flex align-self-center">
                        <img
                          src={documentIcon}
                          className={`${styles.applycustomcourses_icon} `}
                          alt="Custom Apply School icon"
                        />
                      </Col>
                      <Col xs={7} md={5} className="d-flex align-self-center">
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
                        <img
                          src={trash}
                          alt="Delete"
                          onClick={() => setUploadedFrontIcFileName("")}
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
                  {/* <p>
                    <b style={{ fontSize: "0.8em", color: "#B71A18" }}>
                      {backIcFileError}
                    </b>
                  </p> */}
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
                      <Col xs={4} md={2} className="d-flex align-self-center">
                        <img
                          src={documentIcon}
                          className={`${styles.applycustomcourses_icon} `}
                          alt="Custom Apply School icon"
                        />
                      </Col>
                      <Col xs={7} md={5} className="d-flex align-self-center">
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
                        xs={1}
                        md={2}
                        className="d-flex align-self-center justify-content-end"
                      >
                        <img
                          src={trash}
                          alt="Delete"
                          onClick={() => setUploadedBackIcFileName("")}
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
                  {/* <p>
                    <b style={{ fontSize: "0.8em", color: "#B71A18" }}>
                      {passportFileError}
                    </b>
                  </p> */}
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
                      <Col xs={4} md={2} className="d-flex align-self-center">
                        <img
                          src={documentIcon}
                          className={`${styles.applycustomcourses_icon} `}
                          alt="Custom Apply School icon"
                        />
                      </Col>
                      <Col xs={7} md={5} className="d-flex align-self-center">
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
                        <img
                          src={trash}
                          alt="Delete"
                          onClick={() => setUploadedPassportFileName("")}
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
              <button
                onClick={handleSubmit}
                className="sac-next-button rounded-pill px-5 py-2"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Popup for missing fields */}
      <WidgetPopUpFillIn
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
      />
    </div>
  );
};

export default BasicInformation;
