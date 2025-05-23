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
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/StudentPortalStyles/StudentPortalLoginForm.css";
import studentPortalLogin from "../../assets/StudentPortalAssets/studentPortalLogin.png";
import studentPortalLoginLogo from "../../assets/StudentPortalAssets/studentPortalLoginLogo.png";
import { Eye, EyeOff } from "react-feather";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const StudentPortalSignUp = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [identityCard, setIdentityCard] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupStatus, setSignupStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const navigate = useNavigate();
  const [localStudent, setLocalStudent] = useState();
  const [studentNationality, setStudentNationality] = useState();
  // const [icFormat, setIcFormat] = useState("^d{12}$");
  const [icError, setIcError] = useState("");
  /*Checking if have token or not if dont have navigate back to studentportalbasicinformations page */
  useEffect(() => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");
    if (token) {
      navigate("/studentPortalBasicInformations");
    }
  }, [navigate]);

  /*end */

  /*checking if user ipnut the required information or not */
  useEffect(() => {
    const isValid =
      name.trim() !== "" &&
      phone.length >= 10 &&
      identityCard.trim() !== "" &&
      email.trim() !== "" &&
      password.length >= 8 &&
      confirmPassword === password;
    setIsFormValid(isValid);
  }, [name, phone, identityCard, email, password, confirmPassword]);
  /*end */

  /* handle phone value*/
  const handlePhoneChange = (value, country) => {
    setPhone(value);
    setCountryCode(country.dialCode);
    if (value.length <= country.dialCode.length) {
      setPhoneError("Phone number is required");
    } else {
      setPhoneError("");
    }

    // Revalidate IC when country changes
    // if (country.dialCode === "60" && identityCard) {
    //   if (!validateMalaysianIC(identityCard)) {
    //     setIcError("Malaysian IC must be 12 digits");
    //   } else {
    //     setIcError("");
    //   }
    // } else {
    //   setIcError(""); // Clear error for non-Malaysian ICs
    // }
  };
  /*end */

  /*signup api */
  const handleSubmit = (e) => {
    e.preventDefault();
    setSignupStatus(null);

    if (phone.length <= countryCode.length) {
      setPhoneError("Phone number is required");
      return;
    }
    if (password !== confirmPassword) {
      setSignupStatus("password_mismatch");
      return;
    }

    if (password.length < 8) {
      setSignupStatus("password_too_short");
      return;
    }
    // if (countryCode === "60" && !validateMalaysianIC(identityCard)) {
    //   setIcError("Malaysian IC must be 12 digits");
    //   return;
    // }

    const formData = {
      name: name,
      email: email,
      password: password,
      confirm_password: confirmPassword,
      ic: identityCard,
      student_nationality: studentNationality,
      type: "student",
      country_code: `+${countryCode}`,
      contact_number: phone.slice(countryCode.length),
    };

    //console.log("Sending signup data:", formData);

    fetch(`${import.meta.env.VITE_BASE_URL}api/student/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw errorData;
          });
        }
        return response.json();
      })
      .then((data) => {
        //console.log("Full API response:", data);
        if (data.success === true) {
          //console.log("Signup successful:", data);
          setSignupStatus("success");
          if (data.data && data.data.token) {
            sessionStorage.setItem("token", data.data.token);
          }
          setTimeout(() => navigate("/studentPortalBasicInformations"), 1500);
        } else {
          console.error("Signup failed:", data);
          setSignupStatus("failed");
        }
      })
      .catch((error) => {
        console.error("Error during signup:", error);
        if (error.errors) {
          if (error.errors.email) {
            setSignupStatus("email_exists");
          } else if (error.errors.contact_no) {
            setSignupStatus("phone_exists");
          } else if (error.errors.ic) {
            setSignupStatus("ic_exists");
          } else {
            setSignupStatus("validation_error");
          }
        } else {
          setSignupStatus("error");
        }
      });
  };

  const validateMalaysianIC = (ic) => {
    // Malaysian IC should be exactly 12 digits
    return /^\d{12}$/.test(ic);
  };

  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
    setName(value);
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
  /*end */

  const handleBackClick = () => {
    navigate("/"); // This navigates to the previous page in history
  };

  const handleGoogleLogin = (e) => {
    window.location.href = `${import.meta.env.VITE_BASE_URL}api/auth/google`;
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

  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col md={6} className="p-0 h-100 d-md-flex d-none">
          <img
            src={studentPortalLogin}
            alt="Student Portal Login"
            className="w-100 h-100 object-fit-cover"
          />
        </Col>
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center bg-white"
        >
          <div className="w-100" style={{ maxWidth: "600px" }}>
            <div className="studypal-logo-div">
              {/*<img
              src={studentPortalLoginLogo}
              className="img-fluid mb-4"
              alt="StudyPal Logo"
            />*/}
            </div>
            <h2 className="text-start mb-2 custom-color-title ">
              Start your journey here.
            </h2>
            <p className="text-start mb-4 custom-color-title small">
              Find the right university of your choice.
            </p>
            {signupStatus === "success" && (
              <Alert variant="success">Signup successful! Redirecting...</Alert>
            )}
            {signupStatus === "failed" && (
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
            )}
            {signupStatus === "email_exists" && (
              <Alert variant="warning">
                This email is already registered. Please use a different email
                or try logging in.
              </Alert>
            )}

            {signupStatus === "ic_exists" && (
              <Alert variant="warning">
                This ic is already registered. Please use a different ic or try
                logging in.
              </Alert>
            )}
            {signupStatus === "phone_exists" && (
              <Alert variant="warning">
                This contact number is already registered. Please use a
                different number or try logging in.
              </Alert>
            )}
            <Form onSubmit={handleSubmit} className="pt-4">
              <Form.Group className="mb-3 ">
                <p className="text-start p-0 mb-0 custom-color-title-label small ">
                  Username
                </p>
                <Form.Control
                  type="text"
                  placeholder="Your Name "
                  value={name}
                  onChange={handleNameChange}
                  required
                  pattern="[a-zA-Z0-9]+"
                  title="Username can only contain letters and numbers"
                  className="std-input-placeholder"
                />
              </Form.Group>
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
                        onChange={() => handleRadioButton(true, "malaysian")}
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
              <Row classname="std-fix-align ">
                <Col xs={12} md={6}>
                  <Form.Group controlId="formBasicPhone" className="mb-3">
                    <p className="text-start p-0 mb-0 custom-color-title-label small ">
                      Contact Number
                    </p>
                    <PhoneInput
                      country={"my"}
                      rules={{ required: true }}
                      value={phone}
                      onChange={handlePhoneChange}
                      inputProps={{
                        name: "phone",
                        required: true,
                        placeholder: "Enter phone number",
                      }}
                      inputClass={`form-control ${
                        phoneError ? "is-invalid" : ""
                      }`}
                      containerClass="phone-input-container"
                      buttonClass="btn btn-outline-secondary"
                      dropdownClass="country-dropdown custom-dropdown"
                      countryCodeEditable={false}
                      disableCountryCode={false}
                      disableDropdown={false}
                      autoFormat={true}
                      style={{ zIndex: 13 }}
                      inputStyle={{ fontSize: "16px" }}
                    />
                    {phoneError && (
                      <Form.Control.Feedback
                        type="invalid"
                        style={{ display: "block" }}
                      >
                        {phoneError}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                </Col>
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
              </Row>
              <Form.Group className="mb-3">
                <p className="text-start p-0 mb-0 custom-color-title-label small ">
                  Email Address
                </p>
                <Form.Control
                  type="email"
                  placeholder="mail123@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="std-input-placeholder"
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3 login-password-input">
                    <p className="text-start p-0 mb-0 custom-color-title-label small ">
                      Password
                    </p>
                    <InputGroup hasValidation>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        isInvalid={password.length > 0 && password.length < 8}
                        className="loginpassword pe-5"
                      />
                      {(password.length === 0 || password.length >= 8) && (
                        <div
                          className="position-absolute top-50 end-0 translate-middle-y pe-3"
                          style={{ zIndex: 11 }}
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
                  <Form.Group className="mb-3 login-password-input">
                    <p className="text-start p-0 mb-0 custom-color-title-label small ">
                      Confirm Password
                    </p>
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
                        className="loginpassword pe-5"
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
              <div className="d-flex justify-content-center">
                <Button
                  variant="danger"
                  type="submit"
                  className="btn-signup-forgetpassword mt-3 mb-3  "
                >
                  Sign Up
                </Button>
              </div>
              <p className="text-center text-muted small">
                or Login/Sign Up using
              </p>
              <Row className="justify-content-center">
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
                    onClick={handleGoogleLogin}
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

              <p className="text-center small mb-0 mt-5">
                Already have an account?{" "}
                <Link to="/studentPortalLogin" className="text-danger">
                  Login now
                </Link>
              </p>
            </Form>
          </div>
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

export default StudentPortalSignUp;
