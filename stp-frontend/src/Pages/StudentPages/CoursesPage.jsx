import React from "react";
import NavButtonsSP from "../../Components/StudentPortalComp/NavButtonsSP";
import SearchCourse from "../../Components/StudentComp/CoursePage/SearchCourse";
import headerImage from "../../assets/StudentAssets/coursepage image/heading.png";
import CourseListing from "../../Components/StudentComp/CoursePage/CourseListing";
import Footer from "../../Components/StudentComp/Footer";
import NavButtons from "../../Components/StudentComp/NavButtons";
import "../../css/StudentCss/course page css/CoursesPage.css";

const CoursesPage = () => {
  return (
    <div style={{ backgroundColor: "#F5F4F4" }}>
      <NavButtons />
      <header className="masthead">
        <img src={headerImage} alt="Header" className="header-image" />
      </header>

      <div>
        <SearchCourse />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CoursesPage;
