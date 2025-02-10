import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { Container, Row, Col, Form, Button, Nav, Alert } from "react-bootstrap";
import "../../../../css/SchoolPortalStyle/MyProfile/SchoolPortalBasicInformation.css";
import CustomTextArea from "../../CustomTextArea";
// import CustomTextArea from "../SchoolPortalComp/CustomTextArea";
import PhoneInput from "react-phone-input-2";

import "typeface-ubuntu";
function GeneralInformationForm() {
  // State for form fields
  const token = sessionStorage.getItem("token");

  const [accountType, setAccountType] = useState("");
  const [schoolName, setSchoolName] = useState("");

  const [schoolContact, setSchoolContact] = useState("");
  const [schoolCountryCode, setSchoolCountryCode] = useState("");
  const [instituteCategory, setInstituteCategory] = useState("");

  const [schoolEmail, setSchoolEmail] = useState("");
  const [schoolWebsite, setSchoolWebsite] = useState("");

  const [schoolAddress, setSchoolAddress] = useState("");

  const [country, setCountry] = useState(132);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");

  const [instituteCategoryList, setInstituteCategoryList] = useState("");
  const [countryList, setCountryList] = useState("");
  const [stateList, setStateList] = useState("");
  const [cityList, setCityList] = useState("");

  const [updateStatus, setUpdateStatus] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);

  const [contactError, setContactError] = useState("");
  const [fullDescError, setFullDescError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: schoolName,
      email: schoolEmail,
      countryCode: schoolCountryCode.startsWith("+")
        ? schoolCountryCode
        : `+${schoolCountryCode}`,
      contact: schoolContact.slice(schoolCountryCode.length),
      school_fullDesc: longDescription,
      school_shortDesc: shortDescription,
      school_address: schoolAddress,
      school_website: schoolWebsite,
      country: country,
      state: state,
      city: city,
      category: instituteCategory,
      account_type: accountType,
    };

    // console.log("formData", formData);
    const update = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/school/editSchool`,
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
          console.log("response fail");

          setUpdateStatus("fail");
          const errorData = await response.json();
          console.log("Error Data:", errorData["errors"]);
          const error = errorData["errors"];
          if (error["contact"] !== null) {
            setContactError(error["contact"]);
          } else {
            setContactError("");
          }

          if (error["school_fullDesc"] !== null) {
            setFullDescError(error["school_fullDesc"]);
          } else {
            setFullDescError("");
          }

          throw new Error(errorData["errors"] || "Internal Server Error");
        }
        setUpdateStatus("success");
        // console.log(response);
      } catch (error) {
        console.error("There was a problem submit:", error);
      }
    };

    await update();
  };

  useEffect(() => {
    const fetchData = async () => {
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
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setAccountType(data.data.account_type);
        setSchoolName(data.data.school_name);
        setSchoolCountryCode(data.data.school_countryCode);
        const code = data.data.school_countryCode;
        setSchoolContact(
          code.replace("+", "") + data.data.school_contactNo ?? ""
        );
        setInstituteCategory(data.data.institue_category ?? "");
        setSchoolEmail(data.data.school_email ?? "");
        setSchoolWebsite(data.data.school_officalWebsite ?? "");
        setSchoolAddress(data.data.school_address ?? "");
        setCountry(data.data.country_id ?? 132);
        setState(data.data.state_id ?? "");
        setCity(data.data.city_id ?? "");
        setShortDescription(data.data.school_shortDesc ?? "");

        // const test = <p style={{ textAlign: "center" }}>fullok update</p>;
        // const testing = ReactDOMServer.renderToStaticMarkup(test);
        // setLongDescription(testing);
        setLongDescription(
          data.data.school_fullDesc?.trim() === ""
            ? ""
            : data.data.school_fullDesc
        );
        console.log("presetlog", data.data.school_fullDesc);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    const getInstituteList = async () => {
      try {
        const schoolCat = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/school/instituteType`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!schoolCat.ok) {
          throw new Error("Network response was not ok");
        }
        const schoolCatList = await schoolCat.json();

        setInstituteCategoryList(schoolCatList.data);
        // console.log("school_cat", instituteCategoryList);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    const getCountryList = async () => {
      try {
        const countryList = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/student/countryList`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!countryList.ok) {
          throw new Error("Network response was not ok");
        }
        const countriesList = await countryList.json();
        setCountryList(countriesList.data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchData();
    getInstituteList();
    getCountryList();
  }, []);

  //set stateList
  useEffect(() => {
    const getState = async () => {
      try {
        const countryID = parseInt(country);
        if (countryID === null || !Number.isInteger(countryID)) {
          setStateList("");
        } else {
          const stateList = await fetch(
            `${import.meta.env.VITE_BASE_URL}api/getState`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id: countryID }),
            }
          );
          if (!stateList.ok) {
            const errorData = await stateList.json();
            throw new Error(errorData["Error"] || "Internal Server Error");
          }
          const state = await stateList.json();
          setStateList(state.data);
        }
      } catch (error) {
        console.error(
          "There was a problem with the get state operation:",
          error
        );
      }
    };
    getState();
  }, [country]);

  //set cityList
  useEffect(() => {
    const getCities = async () => {
      try {
        const stateID = parseInt(state);
        if (stateID === null || !Number.isInteger(stateID)) {
          setCityList("");
        } else {
          const cityList = await fetch(
            `${import.meta.env.VITE_BASE_URL}api/getCities`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id: stateID }),
            }
          );
          if (!cityList.ok) {
            const errorData = await cityList.json();

            throw new Error(errorData["error"] || "Internal Server Error");
          }
          const city = await cityList.json();
          setCityList(city.data);
        }
      } catch (error) {
        console.error(
          "There was a problem with the get state operation:",
          error
        );
      }
    };
    getCities();
  }, [state]);

  useEffect(() => {
    // console.log("chnage update status value");
    if (!updateStatus) {
      console.log("skip");
      return;
    }
    if (updateStatus === "success") {
      // console.log("success update");
      setFullDescError("");

      setShowAlert(true);

      // Set a timer to hide the alert after 3 seconds
      const timer = setTimeout(() => {
        setShowAlert(false);
        setUpdateStatus("");
      }, 1000); // Change the time in milliseconds as needed

      // Clean up the timer when the component unmounts or updateStatus changes
      return () => clearTimeout(timer);
    } else {
      // console.log("fail");
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
        setUpdateStatus("");
      }, 1000);
    }
  }, [updateStatus]);

  const handlePhoneChange = (value, country) => {
    const dialCode = country.dialCode;
    setSchoolContact(value); // Set the contact number without the dial code
    setSchoolCountryCode(dialCode); // Set the dial code separately
  };

  // Render content based on the selected tab
  // const renderTabContent = () => {
  //   switch (activeTab) {
  //     case "general-information":
  //       return (
  //         <>
  //           <h4 className="mb-2">General Information</h4>
  //           <hr className="divider-line" />
  //           <Row className="mb-3">
  //             <Col md={9}>
  //               <Form.Group controlId="schoolName">
  //                 <Form.Label>
  //                   School Name <span className="span-style">*</span>
  //                 </Form.Label>
  //                 <Form.Control
  //                   type="text"
  //                   value={schoolName}
  //                   readOnly
  //                   onChange={(e) => setSchoolName(e.target.value)}
  //                 />
  //               </Form.Group>
  //             </Col>
  //           </Row>

  //           <Row className="mb-3">
  //             <Col md={4}>
  //               <Form.Group controlId="contactNumber">
  //                 <Form.Label>
  //                   Contact Number <span className="span-style">*</span>
  //                 </Form.Label>
  //                 <PhoneInput
  //                   country={"my"}
  //                   value={schoolContact}
  //                   onChange={handlePhoneChange}
  //                   inputProps={{
  //                     name: "phone",
  //                     placeholder: "Enter phone number",
  //                   }}
  //                   inputClass="form-control"
  //                   containerClass="phone-input-container"
  //                   buttonClass="btn btn-outline-secondary"
  //                   dropdownClass="country-dropdown custom-dropdown"
  //                   countryCodeEditable={false}
  //                   disableCountryCode={false}
  //                   disableDropdown={false}
  //                   autoFormat={true}
  //                 />
  //               </Form.Group>
  //             </Col>
  //             <Col md={5}>
  //               <Form.Group controlId="instituteCategory">
  //                 <Form.Label>
  //                   Institute Category <span className="span-style">*</span>
  //                 </Form.Label>
  //                 <Form.Select
  //                   value={instituteCategory}
  //                   onChange={(e) => setInstituteCategory(e.target.value)}
  //                   required
  //                 >
  //                   <option value="">Select a category</option>
  //                   {/* Dynamically populate options from instituteCategoryList */}
  //                   {instituteCategoryList &&
  //                     instituteCategoryList.map((category, index) => (
  //                       <option key={index} value={category.id}>
  //                         {category.core_metaName}{" "}
  //                         {/* Replace 'id' and 'name' based on your API response structure */}
  //                       </option>
  //                     ))}
  //                 </Form.Select>
  //               </Form.Group>
  //             </Col>
  //           </Row>

  //           <Row className="mb-3">
  //             <Col md={4}>
  //               <Form.Group controlId="schoolName">
  //                 <Form.Label>
  //                   Email Address <span className="span-style">*</span>
  //                 </Form.Label>
  //                 <Form.Control
  //                   type="email"
  //                   value={schoolEmail}
  //                   onChange={(e) => setSchoolEmail(e.target.value)}
  //                 />
  //               </Form.Group>
  //             </Col>
  //             <Col md={5}>
  //               <Form.Group controlId="schoolName">
  //                 <Form.Label>
  //                   School Website <span className="span-style">*</span>
  //                 </Form.Label>
  //                 <Form.Control
  //                   type="text"
  //                   value={schoolWebsite}
  //                   onChange={(e) => setSchoolWebsite(e.target.value)}
  //                 />
  //               </Form.Group>
  //             </Col>
  //           </Row>

  //           <Row className="mb-3">
  //             <Col md={9}>
  //               <Form.Group controlId="schoolName">
  //                 <Form.Label>
  //                   School Address <span className="span-style">*</span>
  //                 </Form.Label>
  //                 <Form.Control
  //                   type="text"
  //                   value={schoolAddress}
  //                   onChange={(e) => setSchoolAddress(e.target.value)}
  //                 />
  //               </Form.Group>
  //             </Col>
  //           </Row>

  //           <Row className="mb-3">
  //             <Col md={3}>
  //               <Form.Group controlId="schoolName">
  //                 <Form.Label>
  //                   Country <span className="span-style">*</span>
  //                 </Form.Label>
  //                 <Form.Select
  //                   value={country}
  //                   onChange={(e) => setCountry(e.target.value)}
  //                   required
  //                 >
  //                   <option value="">Select a Country</option>
  //                   {/* Dynamically populate options from instituteCategoryList */}
  //                   {countryList &&
  //                     countryList.map((country, index) => (
  //                       <option key={index} value={country.id}>
  //                         {country.country_name}{" "}
  //                         {/* Replace 'id' and 'name' based on your API response structure */}
  //                       </option>
  //                     ))}
  //                 </Form.Select>
  //               </Form.Group>
  //             </Col>
  //             <Col md={3}>
  //               <Form.Group controlId="schoolName">
  //                 <Form.Label>
  //                   State <span className="span-style">*</span>
  //                 </Form.Label>
  //                 <Form.Select
  //                   value={state}
  //                   onChange={(e) => setState(e.target.value)}
  //                   required
  //                 >
  //                   <option value="">Select a State</option>
  //                   {/* Dynamically populate options from instituteCategoryList */}
  //                   {stateList &&
  //                     stateList.map((state, index) => (
  //                       <option key={index} value={state.id}>
  //                         {state.state_name}{" "}
  //                         {/* Replace 'id' and 'name' based on your API response structure */}
  //                       </option>
  //                     ))}
  //                 </Form.Select>
  //               </Form.Group>
  //             </Col>
  //             <Col md={3}>
  //               <Form.Group controlId="schoolName">
  //                 <Form.Label>
  //                   City <span className="span-style">*</span>
  //                 </Form.Label>
  //                 <Form.Select
  //                   value={city}
  //                   onChange={(e) => setCity(e.target.value)}
  //                   required
  //                 >
  //                   <option value="">Select a City</option>
  //                   {/* Dynamically populate options from instituteCategoryList */}
  //                   {cityList &&
  //                     cityList.map((city, index) => (
  //                       <option key={index} value={city.id}>
  //                         {city.city_name}{" "}
  //                         {/* Replace 'id' and 'name' based on your API response structure */}
  //                       </option>
  //                     ))}
  //                 </Form.Select>
  //               </Form.Group>
  //             </Col>
  //           </Row>

  //           <Row className="mb-3">
  //             <Col md={9}>
  //               <Form.Group controlId="schoolName">
  //                 <Form.Label>
  //                   Short Description <span className="span-style">*</span>
  //                 </Form.Label>
  //                 <Form.Control
  //                   type="text"
  //                   value={shortDescription}
  //                   onChange={(e) => setShortDescription(e.target.value)}
  //                 />
  //               </Form.Group>
  //             </Col>
  //           </Row>

  //           <Row className="mb-3">
  //             <Col md={9}>
  //               <Form.Group controlId="longDescription">
  //                 <Form.Label>
  //                   Long Description <span className="span-style">*</span>
  //                 </Form.Label>
  //                 <CustomTextArea
  //                   value={longDescription}
  //                   onChange={(content) => setLongDescription(content)}
  //                 />
  //               </Form.Group>
  //             </Col>
  //           </Row>
  //         </>
  //       );
  //     case "upload-images":
  //       return (
  //         <>
  //           <h4 className="mb-2">Upload Images</h4>
  //           <hr className="divider-line" />
  //           <Row className="mb-3">
  //             <Col md={12}>
  //               <Form.Group controlId="imageUpload">
  //                 <Form.Label>Upload School Image</Form.Label>
  //                 <Form.Control type="file" />
  //               </Form.Group>
  //             </Col>
  //           </Row>
  //         </>
  //       );
  //     case "person-in-charge":
  //       return (
  //         <>
  //           <h4 className="mb-2">Person-In-Charge</h4>
  //           <hr className="divider-line" />
  //           <Row className="mb-3">
  //             <Col md={6}>
  //               <Form.Group controlId="personInChargeName">
  //                 <Form.Label>Person-In-Charge Name</Form.Label>
  //                 <Form.Control type="text" />
  //               </Form.Group>
  //             </Col>
  //             <Col md={6}>
  //               <Form.Group controlId="personInChargeContact">
  //                 <Form.Label>Contact Number</Form.Label>
  //                 <Form.Control type="text" />
  //               </Form.Group>
  //             </Col>
  //           </Row>
  //         </>
  //       );
  //     default:
  //       return null;
  //   }
  // };

  return (
    <Form onSubmit={handleSubmit}>
      {showAlert && (
        <Alert
          variant="success"
          className={`fade-alert alert-position ${showAlert ? "show" : "hide"}`}
        >
          Update Successfully
        </Alert>
      )}

      {showError && (
        <Alert
          variant="danger"
          className={`fade-alert alert-position ${showError ? "show" : "hide"}`}
        >
          Something wrong !!
        </Alert>
      )}
      <h4 className="mb-2">General Information</h4>
      <hr className="divider-line" />
      <Row className="mb-3">
        <Col md={9}>
          <Form.Group controlId="schoolName">
            <Form.Label>
              School Name <span className="span-style">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={schoolName}
              readOnly
              onChange={(e) => setSchoolName(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="contactNumber">
            <Form.Label>
              Contact Number <span className="span-style">*</span>
              {contactError && (
                <span className="span-style">{contactError}</span>
              )}
            </Form.Label>
            <PhoneInput
              country={"my"}
              value={schoolContact}
              onChange={handlePhoneChange}
              inputProps={{
                name: "phone",
                placeholder: "Enter phone number",
              }}
              inputClass="form-control"
              containerClass="phone-input-container"
              buttonClass="btn btn-outline-secondary"
              dropdownClass="country-dropdown custom-dropdown"
              countryCodeEditable={false}
              disableCountryCode={false}
              disableDropdown={false}
              autoFormat={true}
            />
          </Form.Group>
        </Col>
        <Col md={5}>
          <Form.Group controlId="instituteCategory">
            <Form.Label>
              Institute Category <span className="span-style">*</span>
            </Form.Label>
            <Form.Select
              value={instituteCategory}
              onChange={(e) => setInstituteCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {/* Dynamically populate options from instituteCategoryList */}
              {instituteCategoryList &&
                instituteCategoryList.map((category, index) => (
                  <option key={index} value={category.id}>
                    {category.core_metaName}{" "}
                    {/* Replace 'id' and 'name' based on your API response structure */}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="schoolName">
            <Form.Label>
              Email Address <span className="span-style">*</span>
            </Form.Label>
            <Form.Control
              type="email"
              value={schoolEmail}
              required
              onChange={(e) => setSchoolEmail(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={5}>
          <Form.Group controlId="schoolName">
            <Form.Label>School Website</Form.Label>
            <Form.Control
              type="text"
              value={schoolWebsite}
              onChange={(e) => setSchoolWebsite(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={9}>
          <Form.Group controlId="schoolName">
            <Form.Label>
              School Address <span className="span-style">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={schoolAddress}
              required
              onChange={(e) => setSchoolAddress(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <Form.Group controlId="schoolName">
            <Form.Label>
              Country <span className="span-style">*</span>
            </Form.Label>
            <Form.Select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              <option value="">Select a Country</option>
              {/* Dynamically populate options from instituteCategoryList */}
              {countryList &&
                countryList.map((country, index) => (
                  <option key={index} value={country.id}>
                    {country.country_name}{" "}
                    {/* Replace 'id' and 'name' based on your API response structure */}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="schoolName">
            <Form.Label>
              State <span className="span-style">*</span>
            </Form.Label>
            <Form.Select
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            >
              <option value="">Select a State</option>
              {/* Dynamically populate options from instituteCategoryList */}
              {stateList &&
                stateList.map((state, index) => (
                  <option key={index} value={state.id}>
                    {state.state_name}{" "}
                    {/* Replace 'id' and 'name' based on your API response structure */}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="schoolName">
            <Form.Label>
              City <span className="span-style">*</span>
            </Form.Label>
            <Form.Select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            >
              <option value="">Select a City</option>
              {/* Dynamically populate options from instituteCategoryList */}
              {cityList &&
                cityList.map((city, index) => (
                  <option key={index} value={city.id}>
                    {city.city_name}{" "}
                    {/* Replace 'id' and 'name' based on your API response structure */}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={9}>
          <Form.Group controlId="schoolName">
            <Form.Label>
              Short Description <span className="span-style">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={9}>
          <Form.Group controlId="longDescription">
            <Form.Label>
              Long Description <span className="span-style">*</span>
              {fullDescError && (
                <span className="span-style">{fullDescError}</span>
              )}
            </Form.Label>
            <CustomTextArea
              value={longDescription}
              onChange={(content) => setLongDescription(content)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={9}>
          <Button variant="danger" type="submit" className="save-button">
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default GeneralInformationForm;
