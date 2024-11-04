import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavButtonsSP from "../../Components/StudentPortalComp/NavButtonsSP";
import SpcFooter from "../../Components/StudentPortalComp/SpcFooter";
import "../../css/StudentPortalStyles/StudentFeedback.css";
const StudentFeedback = () => {
 

  return (
   <div>
    <NavButtonsSP/>
    <div className="SF-container">
       <div>
            <p>Howard</p>
       </div>
       <div>

       </div>
    </div>
    <SpcFooter/>
   </div>
  );
};

export default StudentFeedback;