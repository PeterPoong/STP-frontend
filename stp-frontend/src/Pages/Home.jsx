import React, { useEffect } from "react";
import ButtonGroup from "../Components/ButtonGroup";
import NavButtons from "../Components/NavButtons";
import image1 from "../assets/image1.jpg";
import FeaturedUni from "../Components/FeaturedUni";
import UniversityRow from "../Components/UniversityRow";
import WhyStudyPal from "../Components/WhyStudyPal";
import CoursesContainer from "../Components/CoursesContainer";
import { Button } from "react-bootstrap";
import FeaturedCoursesContainer from "../Components/FeaturedCoursesContainer";
import VideoSlide from "../Components/VideoSlide";
import Footer from "../Components/Footer";

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
