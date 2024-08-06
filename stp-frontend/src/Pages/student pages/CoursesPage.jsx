import React from "react";
import NavButtons from "../../Components/student components/NavButtons";
import SearchCourse from "../../Components/student components/CoursePage/SearchCourse";
import headerImage from "../../assets/student asset/coursepage image/heading.png";
import CourseListing from "../../Components/student components/CoursePage/CourseListing";
import Footer from "../../Components/student components/Footer";

const CoursesPage = () => {
  return (
    <div style={{ backgroundColor: "#F5F4F4" }}>
      <NavButtons />
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
