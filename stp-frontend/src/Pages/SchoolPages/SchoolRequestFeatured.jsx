import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/SchoolPortalComp/SchoolSidebar";
import { Navigate, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { ArrowBarLeft } from "react-bootstrap-icons";
import "../../css/SchoolPortalStyle/MyProfile/SchoolPortalBasicInformation.css";
import FeaturedRequest from "../../Components/SchoolPortalComp/Featured/FeaturedRequest";
import RequestSchoolFeature from "../../Components/SchoolPortalComp/Featured/RequestSchoolFeature"
import "typeface-ubuntu";

function SchoolRequestFeatured() {
  const [schoolDetail, setSchoolDetail] = useState();
  const [selectedDropdownItem, setSelectedDropdownItem] = useState("");
  const [selectedTab, setSelectedTab] = useState("requestFeatured");
  const [show, setShow] = useState(true);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate(); // useNavigate hook

  useEffect(() => {
    setSelectedTab("featured");
    console.log("Token in RequestFeatured:", token);
  }, []);

  if (!token) {
    return <Navigate to="/schoolPortalLogin" />;
  }
  const handleBack = () => {
    navigate('/RequestFeatured');
};
  const handleClose = () => setShow(false);

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
          {show && (
            <RequestSchoolFeature show={show} handleClose={handleClose} authToken={token} />
          )}
        </Container>
      </div>
    </div>
  );
}

export default SchoolRequestFeatured;
