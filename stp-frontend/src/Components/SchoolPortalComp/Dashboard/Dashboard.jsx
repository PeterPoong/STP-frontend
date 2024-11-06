import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import "../../../css/SchoolPortalStyle/SchoolDashboard.css";
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
      <Container className="px-4 py-3">
        <div className="SchoolDashboard-Title-Container">
          <div className="SchoolDashboard-Title-Container-Title">
            <h5>
              <span style={{ color: "#B71A18", fontWeight: "bold" }}>
                {typeOfFilter}
              </span>
              &nbsp; Statistics
            </h5>
          </div>
          <div>
            <Form>
              <Form.Group controlId="formDropdown">
                <Form.Label className="d-none">Select Duration</Form.Label>
                <Form.Select
                  className="float-end-md float-start"
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
          </div>
        </div>
        <div className="SchoolDashboard-Application-Container">
          <div className="border shadow-sm rounded SchoolDasboard-Application-Content">
            <p className="SchoolDashboard-Application-Title">
              NEW APPLICATIONS
            </p>
            {newApplication !== null ? (
              <h1 >{newApplication}</h1>
            ) : (
              <div className="text-center">
                <div
                  className="spinner-border spinner-border-sm"
                  role="status"
                ></div>
              </div>
            )}
          </div>

          <div className="border shadow-sm rounded SchoolDasboard-Application-Content">
            <p className="SchoolDashboard-Application-Title">
              PENDING APPLICATIONS
            </p>
            {pendingApplication !== null ? (
              <h1 >{pendingApplication}</h1>
            ) : (
              <div className="text-center">
                <div
                  className="spinner-border spinner-border-sm"
                  role="status"
                ></div>
              </div>
            )}
          </div>
          <div className="border shadow-sm rounded SchoolDasboard-Application-Content">
            <p className="SchoolDashboard-Application-Title">
              ACCEPT APPLICATION
            </p>
            {acceptApplication !== null ? (
              <h1 >{acceptApplication}</h1>
            ) : (
              <div className="text-center">
                <div
                  className="spinner-border spinner-border-sm"
                  role="status"
                ></div>
              </div>
            )}
          </div>
          <div className="border shadow-sm rounded SchoolDasboard-Application-Content">
            <p className="SchoolDashboard-Application-Title">
              REJECT APPLICATIONS
            </p>
            {rejectApplication !== null ? (
              <h1 >{rejectApplication}</h1>
            ) : (
              <div className="text-center">
                <div
                  className="spinner-border spinner-border-sm"
                  role="status"
                ></div>
              </div>
            )}
          </div>
        </div>
        <div className="SchoolDashboard-SortBy-Container">
          <h5>Sort By</h5>
        </div>
        <div className="SchoolDashboard-SortBy-Buttons">
          {/* Country */}
          <button
            onClick={() => handleTabClick("country")}
          >
            <GeoAlt size={22}/>
            <p>Country</p>
          </button>
          {/* Age group */}
          <button
            onClick={() => handleTabClick("qualification")}
          >
            <Bookmark size={22} />
            <p>Qualification</p>
          </button>
          <button
            onClick={() => handleTabClick("gender")}
          >
            <GenderAmbiguous size={22} />
            <p>Gender</p>
          </button>
          {/* Programs */}
          <button
            onClick={() => handleTabClick("programs")}
          >
            <Book size={22}/>
            <p>Category</p>
          </button>
        </div>
        {renderTabContent()}
      </Container>
    </>
  );
};

export default Dashboard;
