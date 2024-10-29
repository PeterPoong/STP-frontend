import React, { useEffect } from "react";
import NavButtonsSP from "../../Components/StudentPortalComp/NavButtonsSP";
import SearchCourse from "../../Components/StudentComp/CoursePage/SearchCourse";
import headerImage from "../../assets/StudentAssets/coursepage image/heading.webp";
import CourseListing from "../../Components/StudentComp/CoursePage/CourseListing";
import Footer from "../../Components/StudentComp/Footer";
import NavButtons from "../../Components/StudentComp/NavButtons";
import "../../css/StudentCss/course page css/CoursesPage.css";
import SpcFooter from "../../Components/StudentPortalComp/SpcFooter";

const CoursesPage = () => {
  useEffect(() => {
    // Set the page title
    document.title = "StudyPal- Search for Courses";

    // Set meta description
    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Explore top courses, featured courses, and universities options with StudyPal at studypal.my.";
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
