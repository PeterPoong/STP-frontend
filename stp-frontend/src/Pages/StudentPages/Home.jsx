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
import LoadingWidget2 from "../../Components/StudentPortalComp/LoadingWidget2";

import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
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
            style={{ marginTop: "40px" }}
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

          {/*<LoadingWidget2
            width={1000}
            height={1200}
            id={1}
            baseColors={{ 1: '#BA1718' }}
            animation="shimmer"
            childrenAnimation="blink"
          >
            <div className="skeleton-line mb-5" style={{ width: '45%', height: '2rem', marginBottom: '3.5rem' }} />
            <div className="bg-transparent d-flex gap-5 mb-5">
              <div className="skeleton-line" style={{ width: '45%', height: '2rem' }} />
              <div className="skeleton-line" style={{ width: '45%', height: '2rem' }} />
            </div>
            <div className="bg-transparent d-flex gap-5 mb-5">
              <div className="skeleton-line" style={{ width: '45%', height: '2rem' }} />
              <div className="skeleton-line" style={{ width: '45%', height: '2rem' }} />
            </div>
            <div className="bg-transparent d-flex gap-5 mb-5">
              <div className="skeleton-line" style={{ width: '45%', height: '2rem' }} />
              <div className="skeleton-line" style={{ width: '45%', height: '2rem' }} />
            </div>
            <div className="skeleton-line mb-5" style={{ width: '95%', height: '2rem', marginBottom: '3.5rem' }} />
            <div className="bg-transparent d-flex gap-5 mb-5">
              <div className="skeleton-line" style={{ width: '45%', height: '2rem' }} />
              <div className="skeleton-line" style={{ width: '45%', height: '2rem' }} />
            </div>
            <div className="bg-transparent d-flex gap-5 mb-5">
              <div className="skeleton-line" style={{ width: '45%', height: '2rem' }} />
              <div className="skeleton-line" style={{ width: '45%', height: '2rem' }} />
            </div>

          </LoadingWidget2>*/}
        </div>
      </main>
      <div>
        <SpcFooter />
      </div>
    </div>
  );
};

export default Home;
