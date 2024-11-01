import React from "react";
import NavButtonsSP from "../../Components/StudentPortalComp/NavButtonsSP";
import SearchCourse from "../../Components/StudentComp/CoursePage/SearchCourse";
import headerImage from "../../assets/StudentAssets/coursepage image/heading.webp";
import CourseListing from "../../Components/StudentComp/CoursePage/CourseListing";
import Footer from "../../Components/StudentComp/Footer";
import NavButtons from "../../Components/StudentComp/NavButtons";
import "../../css/StudentCss/course page css/CoursesPage.css";
import SpcFooter from "../../Components/StudentPortalComp/SpcFooter";

const CoursesPage = () => {
  return (
    <div style={{ backgroundColor: "#F5F4F4" }}>
      <NavButtonsSP />
      <header className="masthead">
        <img src={headerImage} alt="Header" className="header-image" />
      </header>
      <SearchCourse />
      <div></div>
      <div>
        {/* <Footer /> */}
        <SpcFooter />
      </div>
    </div>
  );
};

export default CoursesPage;
