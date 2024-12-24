import React, { useEffect } from "react";
import ButtonGroup from "../../Components/StudentComp/ButtonGroup";
import NavButtons from "../../Components/StudentComp/NavButtons";
import NavButtonsSP from "../../Components/StudentPortalComp/NavButtonsSP";
import FeaturedUni from "../../Components/StudentComp/FeaturedUni";
import UniversityRow from "../../Components/StudentComp/UniversityRow";
import WhyStudyPal from "../../Components/StudentComp/WhyStudyPal";
import CoursesContainer from "../../Components/StudentComp/CoursesContainer";
import { Button } from "react-bootstrap";
import FeaturedCoursesContainer from "../../Components/StudentComp/FeaturedCoursesContainer";
import VideoSlide from "../../Components/StudentComp/VideoSlide";
import Footer from "../../Components/StudentComp/Footer";
import "../../css/StudentCss/homePageStudent/UniversityRow.css";
import SpcFooter from "../../Components/StudentPortalComp/SpcFooter";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    // Set the page title
    document.title = "StudyPal - Home";

    // Set meta description
    const metaDescription = document.createElement('meta');
    metaDescription.name = "description";
    metaDescription.content = "Explore top universities, featured courses, and study options with StudyPal at studypal.my.";
    document.head.appendChild(metaDescription);

    // Clean up by removing the meta tag when component unmounts
    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);

  return (
    <div className="app-container" style={{ backgroundColor: " #F5F4F4" }}>
      <NavButtonsSP />
      <main>
        <div className="home-container">
          <div className="featured-uni-section">
            <FeaturedUni />
          </div>
          <div
            className="university-row-container"
            style={{ marginTop: "115px" }}
          >
            <UniversityRow />
          </div>
          <h4
            style={{
              textAlign: "left",
              fontSize: "20px",
              paddingLeft: "100px",
              width: "100%",
              marginBottom: "0",
            }}
          >
            Featured Courses
          </h4>
          <div
            className="section-division-container"
            style={{ height: "210px", marginBottom: "40px" }}
          >
            <FeaturedCoursesContainer />
          </div>
          <div>
            <WhyStudyPal />
          </div>
        </div>
        <div>
          <CoursesContainer />
          <div>
            <VideoSlide />
          </div>
        </div>
      </main>
      <div>
        <SpcFooter />
      </div>
    </div>
  );
};

export default Home;
