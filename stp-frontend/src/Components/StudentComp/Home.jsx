import React from "react";
import ButtonGroup from "../Components/ButtonGroup";
import NavButtons from "../Components/StudentComp/NavButtons";
import image1 from "../assets/image1.jpg";
import FeaturedUni from "../Components/StudentComp/FeaturedUni";
import UniversityRow from "../Components/StudentComp/UniversityRow";
import WhyStudyPal from "../Components/StudentComp/WhyStudyPal";
import CoursesContainer from "../Components/StudentComp/CoursesContainer";
import VideoSlide from "../Components/StudentComp/VideoSlide";
import Footer from "../Components/StudentComp/Footer";
import FeaturedCoursesContainer from "../../Components/StudentComp/FeaturedCoursesContainer";

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
      <h4>Hot pick courses</h4>
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
