import React from "react";
import NavButtons from "../Components/NavButtons";
import SearchCourse from "../Components/SearchCourse";
import headerImage from "../CoursesPage/images/heading.png";
import CourseListing from "../Components/CourseListing";
import Footer from "../Components/Footer";

const CoursesPage = () => {
  return (
    <div style={{ backgroundColor: "#F5F4F4" }}>
      <NavButtons />
      <header className="masthead">
        <img src={headerImage} alt="Header" className="header-image" />
      </header>
      <SearchCourse />
      <div>
        <CourseListing />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CoursesPage;
