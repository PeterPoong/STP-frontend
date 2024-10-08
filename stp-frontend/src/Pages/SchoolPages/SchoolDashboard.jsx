import { useParams, Navigate } from "react-router-dom";
import Sidebar from "../../Components/SchoolPortalComp/SchoolSidebar";
import { useEffect, useState } from "react";
import { ArrowClockwise } from "react-bootstrap-icons";
import BasicInformation from "../../Components/SchoolPortalComp/BasicInformation";
import ManagePassword from "../../Components/SchoolPortalComp/MyProfile/ManagePassword/ManagePassword";
import ManageAccount from "../../Components/SchoolPortalComp/MyProfile/ManageAccount/ManageAccount";
import Applicant from "../../Components/SchoolPortalComp/Application/Applicant";
// import Dashboard from "../../Components/SchoolPortalComp/Dashboard";
import Dashboard from "../../Components/SchoolPortalComp/Dashboard/Dashboard";

import Courses from "../../Components/SchoolPortalComp/Courses/Courses";

const SchoolDashboard = () => {
  const [schoolDetail, setSchoolDetail] = useState();
  const [selectedDropdownItem, setSelectedDropdownItem] = useState("");
  const [selectedTab, setSelectedTab] = useState("");
  // const token = sessionStorage.getItem("token");
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/schoolPortalLogin" />;
  }

  useEffect(() => {
    sessionStorage.setItem("token", token);

    const fetchSchoolDetail = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/school/schoolDetail`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSchoolDetail(data);
      } catch (error) {
        console.error("Failed to fetch school details:", error);
      }
    };
    fetchSchoolDetail();
  }, [token]);

 
  const handleUpgradeNow = () => {
    setSelectedDropdownItem("manageAccount");
    setSelectedTab(""); // Clear the selected tab
  };

  if (!schoolDetail) {
    return <ArrowClockwise />;
  }

  const renderContent = () => {
    if (selectedDropdownItem === "manageAccount") {
      return <ManageAccount />;
    }
    
    switch (selectedDropdownItem) {
      case "basicInfo":
        return <BasicInformation />;
      case "managePassword":
        return <ManagePassword />;
      case "manageAccount":
        return <ManageAccount />;
      default:
        switch (selectedTab) {
          case "application":
            return <Applicant
            onActionUpgrade={handleUpgradeNow}/>;
          case "dashboard":
            return <Dashboard />;
          case "courses":
            return <Courses />;
          default:
            return <Dashboard />;
        }
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        detail={schoolDetail}
        onDropdownItemSelect={setSelectedDropdownItem}
        selectTabPage={setSelectedTab}
      />
      <div style={{ flex: 1, overflowY: "auto" }}>{renderContent()}</div>
    </div>
  );
};

export default SchoolDashboard;
