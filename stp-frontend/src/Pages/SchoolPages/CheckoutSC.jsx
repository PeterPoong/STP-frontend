import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/SchoolPortalComp/SchoolSidebar";
import { Navigate, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import "../../css/SchoolPortalStyle/MyProfile/SchoolPortalBasicInformation.css";
import CheckoutSchool from "../../Components/SchoolPortalComp/Featured/CheckoutSchool";

import "typeface-ubuntu";

function Checkoutsc() {
  const location = useLocation();
  const { state } = location;
  const token = sessionStorage.getItem("token");
  const [schoolDetail, setSchoolDetail] = useState();
  const [selectedDropdownItem, setSelectedDropdownItem] = useState("");
  const [selectedTab, setSelectedTab] = useState("requestFeatured");

  useEffect(() => {
    console.log("Checkout Data:", state);
  }, [state]);

  if (!token) {
    return <Navigate to="/schoolPortalLogin" />;
  }

  const featuredPrice = state.featuredTypes.find((type) => type.featured_id === state.featuredType)?.price || 'None';

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
          <CheckoutSchool 
            requestName={state.requestName} 
            featuredType={state.featuredType} 
            start_date={state.start_date} 
            duration={state.duration} 
            calculatedPrice={state.calculatedPrice} 
            featuredTypes={state.featuredTypes}
            authToken={token} 
          />
        </Container>
      </div>
    </div>
  );
}

export default Checkoutsc;
