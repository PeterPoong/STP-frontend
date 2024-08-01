import React from "react";
import ButtonGroup from "../Components/ButtonGroup";
import NavButtons from "../Components/student components/NavButtons";
import image1 from "../assets/image1.jpg";
import FeaturedUni from "../Components/student components/FeaturedUni";
import UniversityRow from "../Components/student components/UniversityRow";
import WhyStudyPal from "../Components/student components/WhyStudyPal";
import CoursesContainer from "../Components/student components/CoursesContainer";
import VideoSlide from "../Components/student components/VideoSlide";
import Footer from "../Components/student components/Footer";

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
