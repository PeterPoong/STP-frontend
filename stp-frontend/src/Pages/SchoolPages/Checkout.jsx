import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/SchoolPortalComp/SchoolSidebar";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { ArrowBarLeft } from "react-bootstrap-icons";
import "../../css/SchoolPortalStyle/MyProfile/SchoolPortalBasicInformation.css";
import CheckoutFeatured from "../../Components/SchoolPortalComp/Featured/CheckoutFeatured";

import "typeface-ubuntu";

function Checkout() {
  const location = useLocation();
  const { state } = location;
  const token = sessionStorage.getItem("token");
  const [schoolDetail, setSchoolDetail] = useState();
  const [selectedDropdownItem, setSelectedDropdownItem] = useState("");
  const [selectedTab, setSelectedTab] = useState("requestFeatured");
  const navigate = useNavigate(); // useNavigate hook

  useEffect(() => {
    console.log("Checkout Data:", state);
  }, [state]);

  if (!token) {
    return <Navigate to="/schoolPortalLogin" />;
  }
  const handleBack = () => {
    navigate('/CourseRequestFeatured');
};
  const featuredPrice = state.featuredTypes.find((type) => type.featured_id === state.featuredType)?.price || 'None';

  return (
      <div style={{ display: "flex", height: "100vh" }}>
      {/* <h5 className="mb-4 mt-5">
      <span
        className={`btn btn-outline-danger px-5  mb-3 rounded-pill`}
        onClick={handleBack}
        style={{
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
        }} // Optional: styling for cursor and alignment
      >
        Back
       <Arrow90degLeft style={{ color: "#B71A18" }} className="mx-3" />
        </span>
        Add New Course
      </h5> */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <Container fluid className="profile-container" style={{backgroundColor:"#f8f9fa"}}>
          <CheckoutFeatured 
            requestName={state.requestName} 
            featuredType={state.featuredType} 
            quantity={state.quantity} 
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

export default Checkout;
