import React from "react";
import ButtonGroup from "../Components/ButtonGroup";
import NavButtons from "../Components/NavButtons";
import image1 from "../assets/image1.jpg";
import FeaturedUni from "../Components/FeaturedUni";
import UniversityRow from "../Components/UniversityRow";
import WhyStudyPal from "../Components/WhyStudyPal";
import CoursesContainer from "./CoursesContainer";
import VideoSlide from "../Components/VideoSlide";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <div>
      <div className="app-container">
        <NavButtons />
      </div>
      <div className="home-container">
        <div className="featured-uni-section">
          <FeaturedUni />
        </div>
        <UniversityRow />
        <div className="section-division">
          <FeaturedCoursesContainer />
        </div>
        <WhyStudyPal />
      </div>
      <h3>Hot pick courses</h3>
      <div>
        <CoursesContainer />
      </div>
      <div>
        <VideoSlide />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
