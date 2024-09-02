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

import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  return (
    <div className="app-container" style={{ backgroundColor: " #F5F4F4" }}>
      <NavButtons />
      <main>
        <div className="home-container">
          <div className="featured-uni-section">
            <FeaturedUni />
          </div>
          <div className="university-row-container">
            <UniversityRow />
          </div>
          {/* <h2>Featured Courses</h2> */}
          <div className="section-division-container">
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
        <Footer />
      </div>
    </div>
  );
};

export default Home;
