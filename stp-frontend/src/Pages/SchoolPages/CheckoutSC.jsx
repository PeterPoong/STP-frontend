import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/SchoolPortalComp/SchoolSidebar";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Container, Button} from "react-bootstrap";
import { ArrowBarLeft } from "react-bootstrap-icons";
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
  const navigate = useNavigate(); // useNavigate hook

  useEffect(() => {

  }, [state]);

  if (!token) {
    return <Navigate to="/schoolPortalLogin" />;
  }
  const handleBack = () => {
    navigate('/SchoolRequestFeatured');
};
  const featuredPrice = state.featuredTypes.find((type) => type.featured_id === state.featuredType)?.price || 'None';

  return (
      <div style={{ display: "flex", height: "100vh" }}>
       {/* <Button 
        className={`btn btn-outline-danger px-5  mb-3 rounded-pill`}
        onClick={handleBack}
        style={{color:'white', height:"6vh"}}><ArrowBarLeft/>
        Back
      </Button> */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <Container fluid className="profile-container" style={{backgroundColor:"#f8f9fa"}}>
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
