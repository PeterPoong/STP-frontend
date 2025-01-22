// import React, { useState, useEffect } from "react";
// import { initializeApp } from "firebase/app";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import studentPortalLogin from "../../assets/StudentPortalAssets/studentPortalLogin.png";
// import {
//   getAuth,
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
// } from "firebase/auth";
// import PhoneInput from "react-phone-input-2";
// import OtpInput from "react-otp-input";
// import "react-phone-input-2/lib/bootstrap.css";

// const firebaseConfig = {
//   apiKey: "AIzaSyBfcKwsjhYkyVijTo8WuUemg76uTLEEEd0",
//   authDomain: "studypal-otp.firebaseapp.com",
//   projectId: "studypal-otp",
//   storageBucket: "studypal-otp.firebasestorage.app",
//   messagingSenderId: "792580480176",
//   appId: "1:792580480176:web:3347118f935df3c541ef75",
// };

// // Add custom styles for OTP input
// const otpInputStyle = {
//   width: "40px",
//   height: "40px",
//   margin: "0 8px",
//   fontSize: "20px",
//   borderRadius: "4px",
//   border: "1px solid #ced4da",
//   textAlign: "center",
//   WebkitAppearance: "none",
//   MozAppearance: "textfield",
// };

// const TestSocialPage = () => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState("phone");
//   const [loading, setLoading] = useState(false);
//   const [confirmationResult, setConfirmationResult] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     // Initialize Firebase
//     const app = initializeApp(firebaseConfig);
//     const auth = getAuth(app);

//     // Set up reCAPTCHA verifier
//     window.recaptchaVerifier = new RecaptchaVerifier(
//       auth,
//       "recaptcha-container",
//       {
//         size: "normal",
//         callback: (response) => {
//           // reCAPTCHA solved
//         },
//         "expired-callback": () => {
//           // Reset reCAPTCHA
//         },
//       }
//     );

//     // Add global styles to hide number input spinners
//     const style = document.createElement("style");
//     style.textContent = `
//       input[type="number"]::-webkit-inner-spin-button,
//       input[type="number"]::-webkit-outer-spin-button {
//         -webkit-appearance: none;
//         margin: 0;
//       }
//       input[type="number"] {
//         -moz-appearance: textfield;
//       }
//     `;
//     document.head.appendChild(style);

//     return () => {
//       document.head.removeChild(style);
//     };
//   }, []);

//   const handleSendOTP = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const auth = getAuth();
//       const formattedPhoneNumber = `+${phoneNumber}`;

//       const confirmation = await signInWithPhoneNumber(
//         auth,
//         formattedPhoneNumber,
//         window.recaptchaVerifier
//       );

//       setConfirmationResult(confirmation);
//       setStep("otp");
//     } catch (err) {
//       setError(err.message);
//       console.error("Error sending OTP:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOTP = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       await confirmationResult.confirm(otp);
//       alert("Phone number verified successfully!");
//       // Here you can redirect or update your app state
//     } catch (err) {
//       setError(err.message);
//       console.error("Error verifying OTP:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6 col-lg-4">
//           <div className="card">
//             <div className="card-body">
//               <h3 className="card-title text-center mb-4">
//                 <i className="bi bi-telephone me-2"></i>
//                 Phone Verification
//               </h3>

//               {error && (
//                 <div className="alert alert-danger" role="alert">
//                   {error}
//                 </div>
//               )}

//               {step === "phone" ? (
//                 <>
//                   <p className="text-muted text-center mb-4">
//                     Enter your phone number to receive a verification code
//                   </p>
//                   <form onSubmit={handleSendOTP}>
//                     <div className="mb-3">
//                       <PhoneInput
//                         country="my"
//                         value={phoneNumber}
//                         onChange={setPhoneNumber}
//                         inputClass="form-control form-control-lg"
//                         buttonClass="btn btn-light"
//                         containerClass="mb-3"
//                         inputProps={{
//                           required: true,
//                         }}
//                       />
//                     </div>

//                     {/* reCAPTCHA container */}
//                     <div id="recaptcha-container" className="mb-3"></div>

//                     <button
//                       type="submit"
//                       className="btn btn-primary w-100"
//                       disabled={loading || !phoneNumber}
//                     >
//                       {loading ? (
//                         <>
//                           <span
//                             className="spinner-border spinner-border-sm me-2"
//                             role="status"
//                             aria-hidden="true"
//                           ></span>
//                           Sending...
//                         </>
//                       ) : (
//                         "Send Verification Code"
//                       )}
//                     </button>
//                   </form>
//                 </>
//               ) : (
//                 <>
//                   <p className="text-muted text-center mb-4">
//                     Enter the verification code sent to +{phoneNumber}
//                   </p>
//                   <form onSubmit={handleVerifyOTP}>
//                     <div className="mb-4 d-flex justify-content-center">
//                       <OtpInput
//                         value={otp}
//                         onChange={setOtp}
//                         numInputs={6}
//                         renderInput={(props) => (
//                           <input
//                             {...props}
//                             style={otpInputStyle}
//                             type="number"
//                           />
//                         )}
//                         shouldAutoFocus={true}
//                         inputStyle={otpInputStyle}
//                       />
//                     </div>
//                     <button
//                       type="submit"
//                       className="btn btn-primary w-100 mb-3"
//                       disabled={loading || otp.length !== 6}
//                     >
//                       {loading ? (
//                         <>
//                           <span
//                             className="spinner-border spinner-border-sm me-2"
//                             role="status"
//                             aria-hidden="true"
//                           ></span>
//                           Verifying...
//                         </>
//                       ) : (
//                         "Verify Code"
//                       )}
//                     </button>
//                     <button
//                       type="button"
//                       className="btn btn-outline-secondary w-100"
//                       onClick={() => {
//                         setStep("phone");
//                         setOtp("");
//                       }}
//                     >
//                       Change Phone Number
//                     </button>
//                   </form>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestSocialPage;

import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import studentPortalLogin from "../../assets/StudentPortalAssets/studentPortalLogin.png";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import PhoneInput from "react-phone-input-2";
import OtpInput from "react-otp-input";
import "react-phone-input-2/lib/bootstrap.css";

// Import CSS Module
import styles from "../../css/StudentCss/Otp.module.css";

const firebaseConfig = {
  apiKey: "AIzaSyBfcKwsjhYkyVijTo8WuUemg76uTLEEEd0",
  authDomain: "studypal-otp.firebaseapp.com",
  projectId: "studypal-otp",
  storageBucket: "studypal-otp.firebasestorage.app",
  messagingSenderId: "792580480176",
  appId: "1:792580480176:web:3347118f935df3c541ef75",
};

// Add custom styles for OTP input
const otpInputStyle = {
  width: "40px",
  height: "40px",
  margin: "0 8px",
  fontSize: "20px",
  borderRadius: "4px",
  border: "1px solid #ced4da",
  textAlign: "center",
  WebkitAppearance: "none",
  MozAppearance: "textfield",
};

const TestSocialPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone");
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // Set up reCAPTCHA verifier
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {
          // reCAPTCHA solved
        },
        "expired-callback": () => {
          // Reset reCAPTCHA
        },
      }
    );

    // Add global styles to hide number input spinners
    const style = document.createElement("style");
    style.textContent = `
      input[type="number"]::-webkit-inner-spin-button,
      input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      input[type="number"] {
        -moz-appearance: textfield;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const auth = getAuth();
      const formattedPhoneNumber = `+${phoneNumber}`;

      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        window.recaptchaVerifier
      );

      setConfirmationResult(confirmation);
      setStep("otp");
    } catch (err) {
      setError(err.message);
      console.error("Error sending OTP:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await confirmationResult.confirm(otp);
      alert("Phone number verified successfully!");
      // Here you can redirect or update your app state
    } catch (err) {
      setError(err.message);
      console.error("Error verifying OTP:", err);
    } finally {
      setLoading(false);
    }
  };

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
                  Phone Verification
                </h2>
                <p className="text-start mb-4 small custom-color-title">
                  Please enter your phone number to receive a verification code.
                </p>

                {error && <div className="text-danger small mt-2">{error}</div>}

                {step === "phone" ? (
                  <>
                    <Form onSubmit={handleSendOTP}>
                      <Form.Group controlId="formBasicPhone" className="mb-3">
                        <p className="text-start p-0 mb-0 custom-color-title-label small">
                          Contact Number
                        </p>
                        <PhoneInput
                          country={"my"}
                          value={phoneNumber}
                          onChange={setPhoneNumber}
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

                      <div id="recaptcha-container" className="mb-3"></div>

                      <Button
                        variant="danger"
                        type="submit"
                        className={`${styles.btnSendVerificationCode} my-3 m-0 btn-login-signup-forgetpassword`}
                        style={{ width: "100%", height: "40px" }}
                        // disabled={loading || !phoneNumber} // Button is disabled if no phone number
                      >
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Sending...
                          </>
                        ) : (
                          "Send Verification Code"
                        )}
                      </Button>
                    </Form>
                  </>
                ) : (
                  <>
                    <p className="text-muted text-center mb-4">
                      Enter the verification code sent to +{phoneNumber}
                    </p>
                    <Form onSubmit={handleVerifyOTP}>
                      <div className="mb-4 d-flex justify-content-center">
                        <OtpInput
                          value={otp}
                          onChange={setOtp}
                          numInputs={6}
                          renderInput={(props) => (
                            <input
                              {...props}
                              style={otpInputStyle}
                              type="number"
                            />
                          )}
                          shouldAutoFocus={true}
                        />
                      </div>
                      <Button
                        variant="danger"
                        type="submit"
                        className="my-3 m-0 btn-login-signup-forgetpassword"
                        style={{ width: "100%", height: "40px" }}
                        disabled={loading || otp.length !== 6}
                      >
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Verifying...
                          </>
                        ) : (
                          "Verify Code"
                        )}
                      </Button>
                    </Form>

                    <Button
                      variant="outline-secondary"
                      className="w-100 mt-3"
                      onClick={() => {
                        setStep("phone");
                        setOtp("");
                      }}
                    >
                      Change Phone Number
                    </Button>
                  </>
                )}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default TestSocialPage;
