import React from "react";
// import NavButtons from "../Components/student components/NavButtons";
import NavButtons from "../../Components/StudentComp/NavButtons";
// // import SearchInstitute from "../assets/StudentAssets/institute image/SearchInstitute";
import SearchInstitute from "../../Components/StudentComp/InstitutePage/SearchInstitute";
import headerImage from "../../assets/StudentAssets/institute image/heading.png";
import InstituteListing from "../../Components/StudentComp/InstitutePage/InstituteListing";
// import Footer from "../Components/StudentComp/Footer";
import Footer from "../../Components/StudentComp/Footer";
import SpcFooter from "../../Components/StudentPortalComp/SpcFooter";

const InstitutePage = () => {
  return (
    <div style={{ backgroundColor: "#F5F4F4" }}>
      <NavButtons />
      <header className="masthead">
        <img src={headerImage} alt="Header" className="header-image" />
      </header>
      <SearchInstitute />
      <div> </div>
      <div>
        <SpcFooter />
      </div>
    </div>
  );
};

export default InstitutePage;
