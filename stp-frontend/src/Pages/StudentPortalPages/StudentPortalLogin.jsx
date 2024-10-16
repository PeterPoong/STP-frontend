import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  InputGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import studentPortalLogin from "../../assets/StudentPortalAssets/studentPortalLogin.png";
import studentPortalLoginLogo from "../../assets/StudentPortalAssets/studentPortalLoginLogo.png";
import "react-phone-input-2/lib/style.css";
import { Eye, EyeOff } from "react-feather";
import "../../css/StudentPortalStyles/StudentPortalLoginForm.css";
import "../../css/StudentPortalStyles/StudentButtonGroup.css";

const StudentPortalLogin = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  // const [countryCodes, setCountryCodes] = useState([]);
  const [loginStatus, setLoginStatus] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  /*Loading to check remember me, token for session and local storage, navigations to studentportalbasicinformation if have token*/
  useEffect(() => {
    const rememberMe = JSON.parse(
      localStorage.getItem("rememberMe") || "false"
    );
    const token = rememberMe
      ? localStorage.getItem("token")
      : sessionStorage.getItem("token");
    if (token) {
      navigate("/studentPortalBasicInformations");
    }
    const handleTabClosing = () => {
      if (!rememberMe) {
        sessionStorage.removeItem("token");
      }
    };
    window.addEventListener("beforeunload", handleTabClosing);

    //fetch(`${import.meta.env.VITE_BASE_URL}api/countryCode`)
    //  .then((response) => response.json())
    //  .then((data) => {
    //    if (data.success) {
    //      setCountryCodes(data.data);
    //    }
    //  })
    //  .catch((error) => {
    //    console.error("Error fetching country codes:", error);
    //  });
    const rememberedCountryCode = localStorage.getItem("rememberedCountryCode");
    const rememberedContactNumber = localStorage.getItem(
      "rememberedContactNumber"
    );
    const rememberedPassword = localStorage.getItem("rememberedPassword");
    if (rememberedCountryCode && rememberedContactNumber) {
      setCountryCode(rememberedCountryCode);
      setPhone(rememberedCountryCode + rememberedContactNumber);
      setRememberMe(true);
    }
    if (rememberedPassword) {
      setPassword(rememberedPassword);
    }
    return () => {
      window.removeEventListener("beforeunload", handleTabClosing);
    };
  }, [navigate]);
  /*end*/

  /* handle phone change */
  const handlePhoneChange = (value, country, e, formattedValue) => {
    setPhone(value);
    setCountryCode(country.dialCode);
  };
  /*end*/

  /*Longin api*/
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginStatus(null);
    setError("");

    const formData = {
      password: password,
      country_code: `+${countryCode}`,
      contact_number: phone.slice(countryCode.length),
    };

    //console.log("Sending login data:", formData);
    fetch(`${import.meta.env.VITE_BASE_URL}api/student/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 429) {
          throw new Error(
            "The website is currently busy, please try again later."
          );
        }
        if (!response.ok) {
          return response.json().then((err) => Promise.reject(err));
        }
        return response.json();
      })
      .then((data) => {
        //console.log("Full API response:", data);
        if (data.true === true && data.data && data.data.user) {
          //console.log("Login successful:", data);
          setLoginStatus("success");

          const studentStatus = data.data.user.student_status;
          const token = data.data.token;
          const userId = data.data.user.id;
          const userName = data.data.user.student_userName;
          if (studentStatus === 3) {
            // Redirect to password reset page with token and user ID
            navigate("/studentPortalResetPassword", {
              state: { token: token, userId: userId },
            });
          } else {
            // Existing login logic
            if (data.data.token) {
              sessionStorage.setItem("token", data.data.token);
              localStorage.setItem("rememberMe", JSON.stringify(rememberMe));
              sessionStorage.setItem("userName", userName);
              if (rememberMe) {
                localStorage.setItem("token", data.data.token);
                localStorage.setItem(
                  "rememberedContactNumber",
                  phone.slice(countryCode.length)
                );
                localStorage.setItem("rememberedCountryCode", countryCode);
                localStorage.setItem("rememberedPassword", password);
                localStorage.setItem("userName", userName);
              } else {
                localStorage.removeItem("token");
                localStorage.removeItem("rememberedContactNumber");
                localStorage.removeItem("rememberedCountryCode");
                localStorage.removeItem("rememberedPassword");
                localStorage.setItem("userName", userName);
              }

              const userId = data.data.user.id;
              if (userId) {
                const id = userId.toString();
                sessionStorage.setItem("id", id);
                if (rememberMe) {
                  localStorage.setItem("id", id);
                }
              } else {
                console.error("User ID not found in response:", data);
              }

              setTimeout(
                () => navigate("/studentPortalBasicInformations"),
                500
              );
            } else {
              console.error("Token not found in response");
              setError(
                "Login successful, but token not received. Please try again."
              );
            }
          }
        } else {
          console.error("Login failed:", data);
          setLoginStatus("failed");
          setError(
            data.message || "Login failed. Please check your credentials."
          );
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setError(error.message || "An error occurred. Please try again later.");
        setLoginStatus("error");
      });
  };
  /*end*/

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
                <div className="studypal-logo-div">
                  {/*<img
   src={studentPortalLoginLogo}
   className="img-fluid mb-4"
   alt="StudyPal Logo"
 />*/}
                </div>
                <h2 className="text-start mb-2 custom-color-title">
                  Login as Student
                </h2>
                <p className="text-start mb-4 small custom-color-title">
                  Log in to get started.
                </p>
                {loginStatus === "success" && (
                  <Alert variant="success">
                    Login successful! Redirecting...
                  </Alert>
                )}
                {loginStatus === "failed" && (
                  <Alert variant="danger">
                    {error || "Login failed. Please check your credentials."}
                  </Alert>
                )}
                {loginStatus === "error" && (
                  <Alert variant="danger">
                    {error || "An error occurred. Please try again later."}
                  </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicPhone" className="mb-3">
                    <p className="text-start p-0 mb-0 custom-color-title-label small ">
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
                  <Form.Group controlId="formBasicPassword" className="mb-3">
                    <p className="text-start p-0 mb-0 custom-color-title-label small ">
                      Password
                    </p>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pe-5"
                      />
                      <div
                        className="position-absolute top-50 end-0 translate-middle-y pe-3"
                        style={{ zIndex: 10 }}
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
                    </InputGroup>
                  </Form.Group>
                  <Row className="mb-3">
                    <Col>
                      <Form.Check
                        type="checkbox"
                        id="rememberMe"
                        label="Remember me"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="custom-checkbox"
                      />
                    </Col>
                    <Col className="text-end">
                      <Link
                        to="/studentPortalForgetPassword"
                        className="forgetpassword"
                      >
                        Forgot password?
                      </Link>
                    </Col>
                  </Row>
                  <Button
                    variant="danger"
                    type="submit"
                    className="my-3 m-0 btn-login-signup-forgetpassword"
                    style={{ width: "100%", height: "40px" }}
                  >
                    Login
                  </Button>
                  <Row>
                    <Col>
                      <p className="text-center text-secondary small">
                        or Login/Signup using
                      </p>
                    </Col>
                  </Row>
                  {/* <Row className="justify-content-center">
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
                  </Row>*/}

                  <div className="text-center text-lg-center m-5 pt-2">
                    <p className="small pt-1 mb-0 text-secondary">
                      Not Registered Yet?{" "}
                      <Link
                        to="/studentPortalSignUp"
                        className="forgetpassword mx-1"
                      >
                        Create an account
                      </Link>
                    </p>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentPortalLogin;
