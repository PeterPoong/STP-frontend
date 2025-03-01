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
import "../../css/SchoolPortalStyle/SchoolPortalLoginForm.css";
import schoolPortalLoginBanner from "../../assets/SchoolPortalAssets/SchoolPortalLogin.png";
import schoolPortalLoginLogo from "../../assets/SchoolPortalAssets/SchoolPortalLoginLogo.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import moment from "moment";
import { Eye, EyeOff } from "react-feather";
import styles from "../../css/SchoolPortalStyle/SchoolPortalLogin.module.css";

const SchoolPortalLogin = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginStatus, setLoginStatus] = useState(null);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const rememberedPhone = localStorage.getItem("rememberedPhone");
    const rememberedPassword = localStorage.getItem("rememberedPassword");
    if (rememberedPhone && rememberedPassword) {
      setPhone(rememberedPhone);
      setPassword(rememberedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginStatus(null);
    const formData = {
      email: email,
      password: password,
    };

    fetch(`${import.meta.env.VITE_BASE_URL}api/school/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("Full API response:", data);
        // console.log("trueTest", data.true);
        if (data.true == true) {
          setErrorMessage("");
          console.log("Login successful:", data.data.user.school_status);
          setLoginStatus("success");
          sessionStorage.setItem("name", data.data.user.school_name);
          sessionStorage.setItem("accountType", "school");
          // sessionStorage.setItem("token", data.data.token);
          // localStorage.setItem("token", data.data.token);
          localStorage.setItem("account_type", data.data.user.account_type);
          sessionStorage.setItem("loginTimestamp", moment().toISOString());

          if (rememberMe) {
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("rememberedPhone", phone);
            localStorage.setItem("rememberedPassword", password);
          } else {
            sessionStorage.setItem("token", data.data.token);
            localStorage.removeItem("rememberedPhone");
            localStorage.removeItem("rememberedPassword");
          }
          if (data.data.user.school_status == 3) {
            setTimeout(() => navigate("/schoolExistingAccount"), 500);
          } else {
            setTimeout(() => navigate("/schoolPortalDashboard"), 500);
          }
        } else {
          console.error("Login failed:", data.message);
          setErrorMessage(data.message);
          setLoginStatus("failed");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setLoginStatus("error");
        if (error.response) {
          console.error("Error response from server:", error.response.data);
          console.error("Error status:", error.response.status);
          console.error("Error headers:", error.response.headers);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
      });
  };

  const handleFacebookLogin = async () => {
    try {
      // Make an API request to your backend's Facebook authentication route
      // const response = await axios.get(
      //   "http://127.0.0.1:8000/api/auth/facebook"
      // );

      // const response = await fetch(`http://127.0.0.1:8000/api/auth/facebook`, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   console.log("error", errorData);

      //   throw new Error(errorData["error"] || "Internal Server Error");
      // }

      const response = await fetch(`http://127.0.0.1:8000/api/auth/facebook`, {
        method: "GET",
        headers: {
          // Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        //  console.log("Error Data:", errorData["errors"]);
        throw new Error(errorData["errors"] || "Internal Server Error");
      }

      // Handle the response, for example, redirect to Facebook login
      // if (response.data.redirect_url) {
      //   window.location.href = response.data.redirect_url; // Redirect user to Facebook login page
      // }
    } catch (error) {
      console.error("There was an error during the Facebook login:", error);
    }
  };

  const handleBackClick = () => {
    navigate("/"); // This navigates to the previous page in history
  };

  return (
    <Container
      fluid
      className="h-100 notranslate "
      style={{ backgroundColor: "red" }}
    >
      <Row className="h-50">
        <div className="position-absolute top-0 ">
          <button
            className="p-1 login-back-button rounded-circle"
            onClick={handleBackClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5rem"
              height="1.25rem"
              fill="#FFFFFFFF"
              class="bi bi-chevron-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
              />
            </svg>
          </button>
        </div>
        <Col md={6} className="d-flex align-items-center bg-white h-100">
          <Container>
            <Row className="justify-content-center mt-4">
              <Col md={8} lg={6} className="px-0">
                <div className="studypal-school-logo-div"></div>
                <h2 className="text-start mb-2 custom-color-title">
                  Login as School
                </h2>
                <p className="text-start mb-4 small custom-color-title">
                  Log in to get started.
                </p>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                {loginStatus === "success" && (
                  <Alert variant="success">
                    Login successful! Redirecting...
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicPhone" className="mb-3">
                    <p className="text-start p-0 mb-0 custom-color-title-label small ">
                      Email
                    </p>
                    <InputGroup>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="forminputlogin pe-5"
                        style={{ paddingLeft: "10px" }}
                      />
                    </InputGroup>
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
                        className="forminputlogin pe-5"
                        style={{ paddingLeft: "10px" }}
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
                    <Col xs={12} className="d-flex justify-content-between">
                      <Form.Check
                        type="checkbox"
                        id="rememberMe"
                        label="Remember me"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="custom-checkbox"
                      />
                      <Link
                        to="/schoolPortalForgetPassword"
                        className="forgetpassword"
                      >
                        Forgot password?
                      </Link>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <Button
                        variant="danger"
                        type="submit"
                        style={{ width: "100%", padding: "0.5rem" }}
                        className={`my-3 m-0 ${styles.schoolLoginButton}`}
                      >
                        Login
                      </Button>
                    </Col>
                  </Row>
                  <div className="text-center text-lg-center m-5 pt-2">
                    <p className="small pt-1 mb-0 text-secondary">
                      Not Registered Yet?{" "}
                      <Link
                        to="/schoolPortalSignUp"
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

        <Col md={6} className="p-0 h-100 d-md-flex d-none">
          <img
            src={schoolPortalLoginBanner}
            alt="Student Portal Login"
            className="w-100 h-100 object-fit-cover"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default SchoolPortalLogin;
