import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Nav, Alert } from "react-bootstrap";
import "../../../../css/SchoolPortalStyle/MyProfile/SchoolPortalBasicInformation.css";
import PhoneInput from "react-phone-input-2";

import "typeface-ubuntu";
function PersonInCharge() {
  // State for form fields
  const token = sessionStorage.getItem("token");

  const [personInChargeName, setPersonInChargeName] = useState("");
  const [personContact, setPersonContact] = useState("");
  const [personEmail, setPersonEmail] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");

  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    setUpdateStatus("false");
    e.preventDefault();
    const formData = {
      person_name: personInChargeName,
      person_contact: personContact,
      person_email: personEmail,
    };
    const update = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/school/editPersonInCharge`,
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
          console.log("Error Data:", errorData["errors"]);
          throw new Error(errorData["errors"] || "Internal Server Error");
        }
      } catch (error) {
        console.error("Failed to update person in charge:", error);
      }
    };
    await update();
    console.log("status", updateStatus);
    setUpdateStatus("success");
    console.log("update person in charge");
  };

  const handlePhoneChange = (value, country) => {
    setPersonContact(value); // Set the contact number without the dial code
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
        setPersonInChargeName(data.data.person_inChargeName ?? "");
        setPersonContact(data.data.person_inChargeNumber ?? null);
        setPersonEmail(data.data.person_inChargeEmail ?? null);

        console.log("data", data);
      } catch (error) {
        console.error("Failed to get Person In Charge Detail", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (updateStatus === "success") {
      setShowAlert(true);
      // Set a timer to hide the alert after 3 seconds
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 1000); // Change the time in milliseconds as needed

      // Clean up the timer when the component unmounts or updateStatus changes
      return () => clearTimeout(timer);
    }
  }, [updateStatus]);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {showAlert && (
          <Alert
            variant="success"
            className={`fade-alert alert-position ${
              showAlert ? "show" : "hide"
            }`}
          >
            Update Successfully
          </Alert>
        )}
        <h4 className="mb-2">Person-In-Charge</h4>
        <hr className="divider-line" />
        <Row className="mb-3">
          <Col md={5}>
            <Form.Group controlId="personInChargeName">
              <Form.Label>
                Person-In-Charge Name <span className="span-style">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={personInChargeName}
                required
                onChange={(e) => setPersonInChargeName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={5}>
            <Form.Group controlId="personInChargeContact">
              <Form.Label>
                Contact Number <span className="span-style">*</span>
              </Form.Label>
              <PhoneInput
                country={"my"}
                value={personContact}
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
        </Row>
        <Row className="mb-3">
          <Col md={5}>
            <Form.Group controlId="personInChargeName">
              <Form.Label>
                Email Address <span className="span-style">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                value={personEmail}
                onChange={(e) => setPersonEmail(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={10}>
            <Button variant="danger" type="submit" className="save-button">
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default PersonInCharge;
