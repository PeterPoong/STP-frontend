import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import studentPortalLogin from "../../assets/StudentPortalAssets/studentPortalLogin.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";

const SocialContactPage = () => {
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // React Router's hook for navigation
  const [identityCard, setIdentityCard] = useState("");
  const [localStudent, setLocalStudent] = useState();
  const [studentNationality, setStudentNationality] = useState();
  const [icError, setIcError] = useState("");

  const handlePhoneChange = (value, country) => {
    setPhone(value);
    setCountryCode(country.dialCode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      id: id ?? 1,
      country_id: `+${countryCode}`,
      contact_number: phone.slice(countryCode.length),
      student_icNumber: identityCard,
      student_nationality: studentNationality,
    };
    try {
      // console.log("icerror", icError);
      if (icError == "") {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/social/updateContact`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const data = await response.json();
        if (data["success"] == false) {
          setError(data["error"]);
        } else {
          setError("");
          setTimeout(() => {
            navigate("/studentPortalBasicInformations");
            // navigate("/SocialContactPage");
          }, 500);
        }
      } else {
        console.log("incorrect");
      }
    } catch (error) {
      setError(`Error update contact number: ${error.error}`);
    }
  };

  const validateMalaysianIC = (ic) => {
    // Malaysian IC should be exactly 12 digits
    return /^\d{12}$/.test(ic);
  };

  const handleRadioButton = (isLocal, nationality) => {
    setLocalStudent(isLocal);
    setIdentityCard("");
    setIcError("");
    if (isLocal == "true") {
      setStudentNationality(nationality);
      // setIcFormat("^d{12}$");
    } else {
      setStudentNationality(nationality);
      // setIcFormat("");
    }
  };

  const handleIdentityCardChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
    setIdentityCard(value);

    if (studentNationality === "malaysian") {
      // Check if the country is Malaysia
      if (!validateMalaysianIC(value)) {
        setIcError("Malaysian IC must be 12 digits");
      } else {
        setIcError("");
      }
    } else {
      setIcError(""); // Clear error for non-Malaysian ICs
    }
  };

  useEffect(() => {
    setId(localStorage.getItem("id"));
  });

  return (
    <Container fluid className="h-100">
      <Row className="h-50">
        <Col md={6} className="p-0 h-100">
          <img
            src={studentPortalLogin}
            alt="Student Portal Login"
            className="w-100 h-100 object-fit-cover"
          />
        </Col>
        <Col md={6} className="d-flex align-items-center bg-white">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} className="px-0">
                <h2 className="text-start mb-2 custom-color-title">
                  More Information
                </h2>
                <p className="text-start mb-4 small custom-color-title">
                  Please enter your contact number and Identical Card Number
                  (IC).
                </p>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicPhone" className="mb-3">
                    <p className="text-start p-0 mb-0 custom-color-title-label small">
                      Contact Number
                    </p>
                    <PhoneInput
                      country={"my"}
                      value={phone}
                      onChange={handlePhoneChange}
                      inputProps={{
                        name: "phone",
                        required: true,
                        placeholder: "Enter phone number",
                      }}
                      inputClass="form-control"
                      containerClass="phone-input-container"
                      buttonClass="btn btn-outline-secondary"
                      dropdownClass="country-dropdown custom-dropdown"
                      countryCodeEditable={false}
                      style={{ zIndex: 11 }}
                      required
                      inputStyle={{ fontSize: "16px" }}
                    />
                  </Form.Group>
                  {error && (
                    <div className="text-danger small mt-2">{error}</div>
                  )}

                  <Row>
                    <Col xs={12}>
                      <Form.Group className="mb-3">
                        <p className="text-start p-0 mb-0 custom-color-title-label small">
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
                            onChange={() =>
                              handleRadioButton(true, "malaysian")
                            }
                            required
                            // defaultChecked
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
                            onChange={() =>
                              handleRadioButton(false, "international")
                            }
                          />
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <p className="text-start p-0 mb-0 custom-color-title-label small">
                        Identity Card Number
                      </p>
                      <Form.Control
                        type="text"
                        placeholder={
                          localStudent == null
                            ? "Please select your nationality"
                            : "Please enter your IC number"
                        }
                        value={identityCard}
                        onChange={handleIdentityCardChange}
                        required={localStudent !== null}
                        title="IC can only contain letters and numbers"
                        className="std-input-placeholder"
                        disabled={localStudent == null}
                      />
                      {icError && (
                        <Form.Control.Feedback
                          type="invalid"
                          style={{ display: "block" }}
                        >
                          {icError}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                  <Button
                    variant="danger"
                    type="submit"
                    className="my-3 m-0 btn-login-signup-forgetpassword"
                    style={{ width: "100%", height: "40px" }}
                  >
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default SocialContactPage;
