import React from "react";
import NavButtons from "../Components/NavButtons";
import SearchInstitute from "../InstitutePage/SearchInstitute";
import headerImage from "../InstitutePage/images/heading.png";
import InstituteListing from "../InstitutePage/InstituteListing";
import Footer from "../Components/Footer";

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
