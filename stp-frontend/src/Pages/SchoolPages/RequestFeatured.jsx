import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../Components/SchoolPortalComp/SchoolSidebar";
import { Navigate } from "react-router-dom";
import { ArrowClockwise } from "react-bootstrap-icons";
import FeaturedRequest from "../../Components/SchoolPortalComp/Featured/FeaturedRequest";
import ManageAccount from "../../Components/SchoolPortalComp/MyProfile/ManageAccount/ManageAccount";
import Courses from "../../Components/SchoolPortalComp/Courses/Courses";
import BasicInformation from "../../Components/SchoolPortalComp/BasicInformation";
import ManagePassword from "../../Components/SchoolPortalComp/MyProfile/ManagePassword/ManagePassword";
import Applicant from "../../Components/SchoolPortalComp/Application/Applicant";
import Dashboard from "../../Components/SchoolPortalComp/Dashboard/Dashboard";

function RequestFeatured() {
  const [schoolDetail, setSchoolDetail] = useState();
  const [selectedDropdownItem, setSelectedDropdownItem] = useState("");
  const [selectedTab, setSelectedTab] = useState("featured"); // Ensure default tab is set to 'featured'
  const token = sessionStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
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

  // Ensure selectedTab is correctly set to 'featured' when navigating to /RequestFeatured
  useEffect(() => {
    if (location.pathname === "/RequestFeatured") {
      setSelectedTab("featured");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.state?.showManageAccount) {
      setSelectedDropdownItem("manageAccount");
      setSelectedTab("");
      // Clear the navigation state
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleUpgradeNow = () => {
    setSelectedDropdownItem("manageAccount");
    setSelectedTab(""); // Clear the selected tab
  };

  const renderContent = () => {
    if (selectedDropdownItem === "manageAccount") return <ManageAccount />;
    if (selectedDropdownItem === "basicInfo") return <BasicInformation />;
    if (selectedDropdownItem === "managePassword") return <ManagePassword />;

    switch (selectedTab) {
      case "featured":
        return <FeaturedRequest authToken={token} />;
      case "courses":
        return <Courses />;
      case "application":
        return <Applicant onActionUpgrade={handleUpgradeNow} />;
      case "dashboard":
        return <Dashboard />;
      default:
        return <FeaturedRequest authToken={token} />;
    }
  };

  if (!token) {
    return <Navigate to="/schoolPortalLogin" />;
  }

  if (!schoolDetail) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <ArrowClockwise className="spinner" size={50} />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", height: "100vh"}}>
      <Sidebar
        detail={schoolDetail}
        onDropdownItemSelect={setSelectedDropdownItem}
        selectTabPage={setSelectedTab} // Passes tab updates to setSelectedTab
        selectedTab={selectedTab}
      />
      <div style={{ flex: 1, overflowY: "auto" }} key={selectedTab} >
        {renderContent()}
      </div>
    </div>
  );
}

export default RequestFeatured;
