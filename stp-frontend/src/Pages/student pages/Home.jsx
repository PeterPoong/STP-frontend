import React, { useEffect } from "react";
import ButtonGroup from "../../Components/student components/ButtonGroup";
// import NavButtons from "../../../Components/student components/NavButtons";
import NavButtons from "../../Components/student components/NavButtons";
import FeaturedUni from "../Components/student components/FeaturedUni";
import UniversityRow from "../Components/student components/UniversityRow";
import WhyStudyPal from "../Components/student components/WhyStudyPal";
import CoursesContainer from "../Components/student components/CoursesContainer";
import { Button } from "react-bootstrap";
import FeaturedCoursesContainer from "../Components/student components/FeaturedCoursesContainer";
import VideoSlide from "../Components/student components/VideoSlide";
import Footer from "../Components/student components/Footer";

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
          <div>
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
