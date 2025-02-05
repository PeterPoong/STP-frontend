import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import "../../../css/SchoolPortalStyle/SchoolDashboard.css";
import {
  GeoAlt,
  People,
  GenderAmbiguous,
  Book,
  Bookmark,
  Heart,
} from "react-bootstrap-icons";
import Form from "react-bootstrap/Form";
import Lock from "../../../assets/StudentPortalAssets/lock.svg";

// Tab components
import CountryChart from "./CountryChart";
import QualificationChart from "./QualificationChart";
import GenderChart from "./GenderChart";
import ProgramChart from "./ProgramChart";
import InterestedCategory from "./CourseCategoryInterested";

const Dashboard = () => {
  const token = sessionStorage.getItem("token");

  const [newApplication, setNewApplication] = useState(null);
  const [pendingApplication, setPendingApplication] = useState(null);
  const [acceptApplication, setAcceptApplication] = useState(null);
  const [rejectApplication, setRejectApplication] = useState(null);
  const [accountType, setAccountType] = useState("");
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

      const storedAccountType =
        sessionStorage.getItem("account_type") ||
        localStorage.getItem("account_type");
      setAccountType(parseInt(storedAccountType, 10));
    } catch (error) {
      console.error("Something wrong after apply filter", error);
    }
  }, [durationFilter]);

  useEffect(() => {
    getNumberOfApplication();
  }, [token]);

  // const renderTabContent = () => {
  //   const isLocked = accountType !== 65; // Check if the account type is not 65
  //   const chartContainerClass = `chart-container ${isLocked ? "locked" : ""}`;

  //   switch (activeTab) {
  //     case "country":
  //       return (
  //         <div className={chartContainerClass}>
  //           <div className="haze-overlay"></div>{" "}
  //           {/* Haze effect before the chart */}
  //           <CountryChart typeOfFilter={durationFilter} />
  //         </div>
  //       );
  //     case "qualification":
  //       return (
  //         <div className={chartContainerClass}>
  //           <div className="haze-overlay"></div>{" "}
  //           {/* Haze effect before the chart */}
  //           <QualificationChart typeOfFilter={durationFilter} />
  //         </div>
  //       );
  //     case "gender":
  //       return (
  //         <div className={chartContainerClass}>
  //           <div className="haze-overlay"></div>{" "}
  //           {/* Haze effect before the chart */}
  //           <GenderChart typeOfFilter={durationFilter} />
  //         </div>
  //       );
  //     case "programs":
  //       return (
  //         <div className={chartContainerClass}>
  //           <div className="haze-overlay"></div>{" "}
  //           {/* Haze effect before the chart */}
  //           <ProgramChart typeOfFilter={durationFilter} />
  //         </div>
  //       );
  //     default:
  //       return null;
  //   }
  // };

  const renderTabContent = () => {
    const isLocked = accountType !== 65; // Check if the account type is not 65
    const chartContainerClass = `chart-container ${isLocked ? "locked" : ""}`;

    // Render the overlay if the account is locked
    const renderOverlay = () => {
      if (!isLocked) return null;

      return (
        <>
          <div className="haze-overlay"></div>
          <div className="lock-overlay">
            <img src={Lock} alt="Lock Icon" className="lock-icon" />
            <p>
              {" "}
              This feature is locked and available only with a premium account.
            </p>
          </div>
        </>
      );
    };

    return (
      <div className={chartContainerClass}>
        {/* Render the overlay conditionally */}
        {renderOverlay()}

        {/* Render the chart based on the active tab */}
        {renderChartContent()}
      </div>
    );
  };
  const renderChartContent = () => {
    switch (activeTab) {
      case "country":
        return <CountryChart typeOfFilter={durationFilter} />;
      case "qualification":
        return <QualificationChart typeOfFilter={durationFilter} />;
      case "gender":
        return <GenderChart typeOfFilter={durationFilter} />;
      case "programs":
        return <ProgramChart typeOfFilter={durationFilter} />;
      case "interested":
        return <InterestedCategory typeOfFilter={durationFilter} />;
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

        {/* Application Stats Section */}
        <div className="SchoolDashboard-Application-Container">
          <div className="border shadow-sm rounded SchoolDasboard-Application-Content">
            <p className="SchoolDashboard-Application-Title">
              NEW APPLICATIONS
            </p>
            {newApplication !== null ? (
              <h1>{newApplication}</h1>
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
              <h1>{pendingApplication}</h1>
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
              ACCEPT APPLICATIONS
            </p>
            {acceptApplication !== null ? (
              <h1>{acceptApplication}</h1>
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
              REJECT APPLICATION
            </p>
            {rejectApplication !== null ? (
              <h1>{rejectApplication}</h1>
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

        {/* Sort By Section */}
        <div className="SchoolDashboard-SortBy-Container">
          <h5>Sort By</h5>
        </div>
        <div className="SchoolDashboard-SortBy-Buttons">
          {/* Country */}
          <button onClick={() => handleTabClick("country")}>
            <GeoAlt size={22} />
            <p>Country</p>
          </button>
          {/* Qualification */}
          <button onClick={() => handleTabClick("qualification")}>
            <Bookmark size={22} />
            <p>Qualification</p>
          </button>
          {/* Gender */}
          <button onClick={() => handleTabClick("gender")}>
            <GenderAmbiguous size={22} />
            <p>Gender</p>
          </button>
          {/* Programs */}
          <button onClick={() => handleTabClick("programs")}>
            <Book size={22} />
            <p>Category</p>
          </button>
          {/* Interested */}
          <button onClick={() => handleTabClick("interested")}>
            <Heart size={22} />
            <p>Interested</p>
          </button>
        </div>

        {/* Render chart */}
        {renderTabContent()}
      </Container>
    </>
  );
};

export default Dashboard;
