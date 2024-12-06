import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/SchoolPortalComp/SchoolSidebar";
import { Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import "../../css/SchoolPortalStyle/MyProfile/SchoolPortalBasicInformation.css";
import FeaturedRequest from "../../Components/SchoolPortalComp/Featured/FeaturedRequest";
import "typeface-ubuntu";

function RequestFeatured() {
  const [schoolDetail, setSchoolDetail] = useState();
  const [selectedDropdownItem, setSelectedDropdownItem] = useState("");
  const [selectedTab, setSelectedTab] = useState("requestFeatured");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    setSelectedTab("requestFeatured");
    console.log("Token in RequestFeatured:", token);
  }, []);

  if (!token) {
    return <Navigate to="/schoolPortalLogin" />;
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        detail={schoolDetail}
        onDropdownItemSelect={setSelectedDropdownItem}
        selectTabPage={setSelectedTab}
        selectedTab={selectedTab}
      />
      <div style={{ flex: 1, overflowY: "auto" }}>
        <Container fluid className="profile-container">
          <FeaturedRequest authToken={token} />
        </Container>
      </div>
    </div>
  );
}

export default RequestFeatured;
