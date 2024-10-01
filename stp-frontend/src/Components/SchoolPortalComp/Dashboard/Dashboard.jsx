import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import styles from "../../../css/SchoolPortalStyle/Dashboard.module.css";

import {
  GeoAlt,
  People,
  GenderAmbiguous,
  Book,
  Bookmark,
} from "react-bootstrap-icons";
import Form from "react-bootstrap/Form";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

// tab component
import CountryChart from "./CountryChart";
import QualificationChart from "./QualificationChart";
import GenderChart from "./GenderChart";
import ProgramChart from "./ProgramChart";

const Dashboard = () => {
  const token = sessionStorage.getItem("token");

  const [newApplication, setNewApplication] = useState(null);
  const [pendingApplication, setPendingApplication] = useState(null);
  const [acceptApplication, setAcceptApplication] = useState(null);
  const [rejectApplication, setRejectApplication] = useState(null);
  const [renderChart, setRenderChart] = useState("");

  // State to track active button (country, age group, etc.)
  const [activeTab, setActiveTab] = useState("country");

  // Function to handle button click and set the active tab
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const [durationFilter, setDurationFilter] = useState("overall");
  const handleDurationChange = (e) => {
    setDurationFilter(e.target.value);
  };

  const [typeOfFilter, setTypeOfFilter] = useState("");

  const getNumberOfApplication = async (formData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/school/schoolApplicantList`,
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
        console.log("Error Data:", errorData["error"]);
        throw new Error(errorData["error"] || "Internal Server Error");
      }

      const data = await response.json();
      setNewApplication(data.data.total);
      setPendingApplication(data.data.pending);
      setAcceptApplication(data.data.accept);
      setRejectApplication(data.data.reject);
    } catch (error) {
      console.error("Failed to get number of Application:", error);
    }
  };

  useEffect(() => {
    try {
      let filterDurationType;
      switch (durationFilter) {
        case "overall":
          setTypeOfFilter("Overall");
          filterDurationType = durationFilter;
          break;
        case "today":
          setTypeOfFilter("Today's");
          filterDurationType = durationFilter;
          break;
        case "this_week":
          setTypeOfFilter("This week's");
          filterDurationType = durationFilter;
          break;
        case "previous_week":
          setTypeOfFilter("Last week's");
          filterDurationType = durationFilter;
          break;
        case "yesterday":
          setTypeOfFilter("Yesterday's");
          filterDurationType = durationFilter;
          break;
        case "this_month":
          setTypeOfFilter("Current Month's");
          filterDurationType = durationFilter;
          break;
        case "previous_month":
          setTypeOfFilter("Last Month's");
          filterDurationType = durationFilter;
          break;
        case "this_year":
          setTypeOfFilter("This Years's");
          filterDurationType = durationFilter;
          break;
        case "previous_year":
          setTypeOfFilter("Last Years's");
          filterDurationType = durationFilter;
          break;
      }

      const formData = {
        filterDuration: filterDurationType,
      };

      getNumberOfApplication(formData);
    } catch (error) {
      console.error("Something wrong after apply filter", error);
    }
  }, [durationFilter]);

  useEffect(() => {
    getNumberOfApplication();
  }, [token]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "country":
        return <CountryChart typeOfFilter={durationFilter} />;
      case "qualification":
        return <QualificationChart typeOfFilter={durationFilter} />;
      case "gender":
        return <GenderChart typeOfFilter={durationFilter} />;
      case "programs":
        return <ProgramChart typeOfFilter={durationFilter} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Container>
        <Row className="mt-5">
          <Col md={8}>
            <h5 className="ms-4">
              <span style={{ color: "#B71A18", fontWeight: "bold" }}>
                {typeOfFilter}
              </span>{" "}
              Statistic
            </h5>
          </Col>

          <Col md={4}>
            <Form>
              <Form.Group controlId="formDropdown">
                <Form.Label className="d-none">Select Duration</Form.Label>
                <Form.Select
                  className="float-end"
                  aria-label="Select Duration"
                  style={{ width: "150px" }}
                  value={durationFilter} // bind the value to the state
                  onChange={handleDurationChange} // handle change
                >
                  <option value="overall">Overall</option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="this_week">This Week</option>
                  <option value="previous_week">Last Week</option>
                  <option value="this_month">This Month</option>
                  <option value="previous_month">Previous Month</option>
                  <option value="this_year">This Year</option>
                  <option value="previous_year">Previous Year</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row className="mt-4">
          {/* Statistics */}
          <Col md={2} className="border shadow-sm rounded mx-4 ms-5">
            <p
              className="mt-2"
              style={{ fontSize: "0.8rem", color: "#B71A18" }}
            >
              NEW APPLICATIONS
            </p>
            {newApplication !== null ? (
              <h1 className={styles.applicantNumber}>{newApplication}</h1>
            ) : (
              <div className="text-center">
                <div
                  className="spinner-border spinner-border-sm"
                  role="status"
                ></div>
              </div>
            )}
          </Col>

          <Col md={2} className="border shadow-sm rounded mx-4 ms-5">
            <p
              className="mt-2"
              style={{ fontSize: "0.8rem", color: "#B71A18" }}
            >
              PENDING APPLICATIONS
            </p>
            {pendingApplication !== null ? (
              <h1 className={styles.applicantNumber}>{pendingApplication}</h1>
            ) : (
              <div className="text-center">
                <div
                  className="spinner-border spinner-border-sm"
                  role="status"
                ></div>
              </div>
            )}
          </Col>

          <Col md={2} className="border shadow-sm rounded mx-4 ms-5">
            <p
              className="mt-2"
              style={{ fontSize: "0.8rem", color: "#B71A18" }}
            >
              ACCEPT APPLICATION
            </p>
            {acceptApplication !== null ? (
              <h1 className={styles.applicantNumber}>{acceptApplication}</h1>
            ) : (
              <div className="text-center">
                <div
                  className="spinner-border spinner-border-sm"
                  role="status"
                ></div>
              </div>
            )}
          </Col>

          <Col md={2} className="border shadow-sm rounded mx-4 ms-5">
            <p
              className="mt-2"
              style={{ fontSize: "0.8rem", color: "#B71A18" }}
            >
              REJECT APPLICATIONS
            </p>
            {rejectApplication !== null ? (
              <h1 className={styles.applicantNumber}>{rejectApplication}</h1>
            ) : (
              <div className="text-center">
                <div
                  className="spinner-border spinner-border-sm"
                  role="status"
                ></div>
              </div>
            )}
          </Col>
        </Row>

        {/* sort by  */}
        <Row className="mt-5 ms-4">
          <h5>Sort By</h5>
        </Row>

        <Row>
          {/* Country */}
          <Col md={2}>
            <button
              className={`${styles.sortButton} ${
                activeTab === "country" ? styles.active : ""
              }`}
              onClick={() => handleTabClick("country")}
            >
              <GeoAlt className={styles.iconLarge} />
              <span>Country</span>
            </button>
          </Col>

          {/* Age group */}
          <Col md={2}>
            <button
              className={`${styles.sortButton} ${
                activeTab === "qualification" ? styles.active : ""
              }`}
              onClick={() => handleTabClick("qualification")}
            >
              <Bookmark className={styles.iconLarge} />
              <span>Qualification</span>
            </button>
          </Col>

          {/* Gender */}
          <Col md={2}>
            <button
              className={`${styles.sortButton} ${
                activeTab === "gender" ? styles.active : ""
              }`}
              onClick={() => handleTabClick("gender")}
            >
              <GenderAmbiguous className={styles.iconLarge} />
              <span>GENDER</span>
            </button>
          </Col>

          {/* Programs */}
          <Col md={2}>
            <button
              className={`${styles.sortButton} ${
                activeTab === "programs" ? styles.active : ""
              }`}
              onClick={() => handleTabClick("programs")}
            >
              <Book className={styles.iconLarge} />
              <span>PROGRAMS</span>
            </button>
          </Col>
        </Row>

        {renderTabContent()}
      </Container>
    </>
  );
};

export default Dashboard;
