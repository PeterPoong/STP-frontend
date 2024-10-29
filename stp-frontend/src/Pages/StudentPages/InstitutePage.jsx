import React, { useEffect } from "react";
// import NavButtons from "../Components/student components/NavButtons";
import NavButtons from "../../Components/StudentComp/NavButtons";
import NavButtonsSP from "../../Components/StudentPortalComp/NavButtonsSP";
// // import SearchInstitute from "../assets/StudentAssets/institute image/SearchInstitute";
import SearchInstitute from "../../Components/StudentComp/InstitutePage/SearchInstitute";
import headerImage from "../../assets/StudentAssets/institute image/heading.png";
import InstituteListing from "../../Components/StudentComp/InstitutePage/InstituteListing";
// import Footer from "../Components/StudentComp/Footer";
import Footer from "../../Components/StudentComp/Footer";
import SpcFooter from "../../Components/StudentPortalComp/SpcFooter";

const InstitutePage = () => {

  useEffect(() => {
    // Set the page title
    document.title = "StudyPal - Search for University";

    // Set meta description
    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Explore premier universities to continue your education, with diploma certificate, degree, master's, and PhD courses available through StudyPal at studypal.my.";
    document.head.appendChild(metaDescription);

    // Clean up by removing the meta tag when component unmounts
    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);

  return (
    <div style={{ backgroundColor: "#F5F4F4" }}>
      <NavButtonsSP />
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
