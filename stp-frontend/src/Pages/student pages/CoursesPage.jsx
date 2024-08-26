import React from "react";
import NavButtonsSP from "../../Components/StudentPortalComp/NavButtonsSP";
import SearchCourse from "../../Components/student components/CoursePage/SearchCourse";
import headerImage from "../../assets/student asset/coursepage image/heading.png";
import CourseListing from "../../Components/student components/CoursePage/CourseListing";
import Footer from "../../Components/student components/Footer";

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
        <Footer />
      </div>
    </div>
  );
};

export default CoursesPage;
