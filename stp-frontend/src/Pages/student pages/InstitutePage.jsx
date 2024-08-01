import React from "react";
// import NavButtons from "../Components/student components/NavButtons";
import NavButtons from "../../Components/student components/NavButtons";
// // import SearchInstitute from "../assets/student asset/institute image/SearchInstitute";
import SearchInstitute from "../../Components/student components/InstitutePage/SearchInstitute";
import headerImage from "../../assets/student asset/institute image/heading.png";
import InstituteListing from "../../Components/student components/InstitutePage/InstituteListing";
// import Footer from "../Components/student components/Footer";
import Footer from "../../Components/student components/Footer";
const InstitutePage = () => {
  return (
    <div style={{ backgroundColor: "#F5F4F4" }}>
      <NavButtons />
      <header className="masthead">
        <img src={headerImage} alt="Header" className="header-image" />
      </header>
      <SearchInstitute />
      <div>
        <InstituteListing />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default InstitutePage;
