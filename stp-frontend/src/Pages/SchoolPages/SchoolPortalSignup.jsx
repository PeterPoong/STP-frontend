import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Modal,
  InputGroup,
} from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/StudentPortalStyles/StudentPortalLoginForm.css";
import schoolPortalLoginBanner from "../../assets/SchoolPortalAssets/SchoolPortalLogin.png";
import schoolPortalLoginLogo from "../../assets/SchoolPortalAssets/SchoolPortalLoginLogo.png";
import { Eye, EyeOff } from "react-feather";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const SchoolPortalSignup = () => {
  const [schoolName, setSchoolName] = useState("");
  const [schoolContact, setSchoolContact] = useState("");
  const [schoolCountryCode, setSchoolCountryCode] = useState("");
  const [schoolWebsite, setSchoolWebsite] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");
  const [schoolAddress, setSchoolAddress] = useState("");

  const [personInChargeName, setPersonInChargeName] = useState("");
  const [personInChargeContact, setPersonInChargeContact] = useState("");
  const [personInChargeEmail, setPersonInChargeEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [schoolNameErrorMessage, setSchoolNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [schoolContactErrorMessage, setSchoolContactErrorMessage] =
    useState("");

  const [signupStatus, setSignupStatus] = useState("failed");
  const [showModal, setShowModal] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const isValid =
  //     name.trim() !== "" &&
  //     phone.length >= 10 &&
  //     identityCard.trim() !== "" &&
  //     email.trim() !== "" &&
  //     password.length >= 8 &&
  //     confirmPassword === password;
  //   setIsFormValid(isValid);
  // }, [name, phone, identityCard, email, password, confirmPassword]);

  // const handlePhoneChange = (value, country, event, formattedValue) => {
  //   const digitsOnly = value.replace(/\D/g, "");
  //   setSchoolContact(digitsOnly);
  // };

  const handlePhoneChange = (value, country) => {
    const dialCode = country.dialCode;
    setSchoolContact(value); // Set the contact number without the dial code
    setSchoolCountryCode(dialCode); // Set the dial code separately
  };

  const handlePersonPhoneChange = (value, country) => {
    setPersonInChargeContact(value); // Set the contact number without the dial code
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: schoolName,
      email: schoolEmail,
      country_code: schoolCountryCode.startsWith("+")
        ? schoolCountryCode
        : `+${schoolCountryCode}`,
      contact_number: schoolContact.slice(schoolCountryCode.length),
      password: password,
      confirm_password: confirmPassword,
      school_address: schoolAddress,
      school_website: schoolWebsite,
      person_in_charge_name: personInChargeName,
      person_in_charge_contact: personInChargeContact,
      person_in_charge_email: personInChargeEmail,
    };
    console.log("Sending signup data:", formData);
    console.log("codeLength", schoolCountryCode.length);
    console.log("contact", schoolContact.slice(2));

    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}api/school/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      setEmailErrorMessage("");
      setSchoolNameErrorMessage("");
      setSchoolContactErrorMessage("");
      setSignupStatus("success");
      setTimeout(() => navigate("/schoolPortalLogin"), 500);
    } else if (response.status == 422) {
      setSignupStatus("failed");
      const errorData = await response.json();
      setEmailErrorMessage(errorData.errors.email);
      setSchoolNameErrorMessage(errorData.errors.name);
      setSchoolContactErrorMessage(errorData.errors.contact_no);
      console.log("emailError", errorData.errors.email);
      console.log(errorData);
    }
  };
  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <img
              src={schoolPortalLoginLogo}
              className="img-fluid mb-4"
              alt="StudyPal Logo"
            />
            <h3 className="text-start mb-2 custom-color-title ">
              Connect with Students Worldwide
            </h3>
            <p className="text-start mb-4 custom-color-title small">
              Engage with students everywhere.
            </p>
            {signupStatus === "success" && (
              <Alert variant="success">Signup successful! Redirecting...</Alert>
            )}
            {/* {signupStatus === "failed" && (
              <Alert variant="danger">Signup failed. Please try again.</Alert>
            )}
            {signupStatus === "error" && (
              <Alert variant="danger">
                An error occurred. Please try again later.
              </Alert>
            )}
            {signupStatus === "password_mismatch" && (
              <Alert variant="danger">
                Passwords do not match. Please try again.
              </Alert>
            )}
            {signupStatus === "password_too_short" && (
              <Alert variant="danger">
                Password must be at least 8 characters long.
              </Alert>
            )} */}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="custom-label">Institute Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Institute Name"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  required
                />
                {schoolNameErrorMessage && (
                  <div style={{ color: "red", marginTop: "0.5rem" }}>
                    {schoolNameErrorMessage.map((error, index) => (
                      <div key={index}>{error}</div>
                    ))}
                  </div>
                )}
              </Form.Group>

              <Row>
                <Col xs={12} md={6}>
                  <Form.Group controlId="formBasicPhone" className="mb-3">
                    <Form.Label className="custom-label">
                      Contact Number
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
                    {schoolContactErrorMessage && (
                      <div style={{ color: "red", marginTop: "0.5rem" }}>
                        {schoolContactErrorMessage.map((error, index) => (
                          <div key={index}>{error}</div>
                        ))}
                      </div>
                    )}
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="custom-label">
                      Institute Website
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Institute Website"
                      value={schoolWebsite}
                      onChange={(e) => setSchoolWebsite(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label className="custom-label">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Institute Email"
                  value={schoolEmail}
                  onChange={(e) => setSchoolEmail(e.target.value)}
                  required
                />
                {emailErrorMessage && (
                  <div style={{ color: "red", marginTop: "0.5rem" }}>
                    {emailErrorMessage.map((error, index) => (
                      <div key={index}>{error}</div>
                    ))}
                  </div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="custom-label">
                  Institute Address
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Institute Address"
                  value={schoolAddress}
                  onChange={(e) => setSchoolAddress(e.target.value)}
                  required
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="custom-label">
                      Person-In-Charge's Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Person-In-Charge's Name"
                      value={personInChargeName}
                      onChange={(e) => setPersonInChargeName(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="formBasicPhone" className="mb-3">
                    <Form.Label className="custom-label">
                      Person-In-Charge's Contact
                    </Form.Label>
                    <PhoneInput
                      country={"my"}
                      value={personInChargeContact}
                      onChange={handlePersonPhoneChange}
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
              </Row>

              <Row>
                <Form.Group className="mb-3">
                  <Form.Label className="custom-label">
                    Person-In-Charge's Email Address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Person-In-Charge's Email"
                    value={personInChargeEmail}
                    onChange={(e) => setPersonInChargeEmail(e.target.value)}
                    required
                    style={{ "::placeholder": { color: "rgba(0, 0, 0, 0.5)" } }}
                  />
                </Form.Group>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="custom-label">Password</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        isInvalid={password.length > 0 && password.length < 8}
                        className="pe-5"
                      />
                      {(password.length === 0 || password.length >= 8) && (
                        <div
                          className="position-absolute top-50 end-0 translate-middle-y pe-3"
                          style={{ zIndex: 0 }}
                        >
                          <span
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ cursor: "pointer" }}
                          >
                            {showPassword ? (
                              <Eye size={18} />
                            ) : (
                              <EyeOff size={18} />
                            )}
                          </span>
                        </div>
                      )}
                      <Form.Control.Feedback type="invalid">
                        Password must be at least 8 characters long.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="custom-label">
                      Confirm Password
                    </Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        isInvalid={
                          confirmPassword.length > 0 &&
                          confirmPassword !== password
                        }
                        className="pe-5"
                      />
                      {(confirmPassword.length === 0 ||
                        (confirmPassword === password &&
                          password.length >= 8)) && (
                        <div
                          className="position-absolute top-50 end-0 translate-middle-y pe-3"
                          style={{ zIndex: 10 }}
                        >
                          <span
                            className="password-toggle"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {showConfirmPassword ? (
                              <Eye size={18} />
                            ) : (
                              <EyeOff size={18} />
                            )}
                          </span>
                        </div>
                      )}
                      <Form.Control.Feedback type="invalid">
                        Passwords do not match.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
              <Button
                variant="danger"
                type="submit"
                className="w-100 mt-3 mb-3 m-0"
              >
                Sign Up
              </Button>
              <p className="text-center text-muted small">
                or Login/Sign Up using
              </p>
              <Row className="justify-content-center">
                <Col xs="auto">
                  <button
                    type="button"
                    className="btn btn-outline-primary rounded-circle p-0 social-btn facebook-btn"
                    style={{
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </button>
                </Col>
                <Col xs="auto">
                  <button
                    type="button"
                    className="btn btn-outline-danger rounded-circle p-0 mb-5 social-btn google-btn"
                    style={{
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z" />
                    </svg>
                  </button>
                </Col>
              </Row>
              <p className="text-center small mb-0">
                Already have an account?{" "}
                <Link to="/schoolPortalLogin" className="text-danger">
                  Login now
                </Link>
              </p>
            </Form>
          </div>
        </Col>

        <Col md={6} className="p-0">
          <img
            src={schoolPortalLoginBanner}
            className="w-100 h-100 object-fit-cover"
            alt="Background"
          />
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Account Already Exists</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            An account with this email or phone number is already registered.
            Would you like to login instead?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate("/studentPortalLogin")}
          >
            Go to Login
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SchoolPortalSignup;
