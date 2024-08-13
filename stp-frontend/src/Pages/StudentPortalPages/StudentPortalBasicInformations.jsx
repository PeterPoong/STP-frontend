import React, { useEffect } from "react";
import ButtonGroup from "../../Components/student components/ButtonGroup";
// import NavButtons from "../../../Components/student components/NavButtons";
import NavButtons from "../../Components/student components/NavButtons";
import MyProfileWidget from "../../Components/StudentPortalComp/MyProfileWidget";
import SpcFooter from "../../Components/StudentPortalComp/SpcFooter";
import "aos/dist/aos.css";

const StudentPortalBasicInformations = () => {
  return (
    <div className="app-container" style={{ backgroundColor: " #F5F4F4" }}>
      <NavButtons />
      <main>
        <div><p>hellow world</p></div>
        <div><p>hellow world</p></div>
        <div><p>hellow world</p></div>
        <div><p>hellow world</p></div>
        < div className="home-container">
        <div><p>hellow world</p></div>
            <MyProfileWidget/>
        </div>
        <div><p>hellow world</p></div>
        <div><p>hellow world</p></div>

      </main>
      <div>
        <SpcFooter />
      </div>
    </div>
  );
};

export default StudentPortalBasicInformations;
