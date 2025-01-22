import React, { useEffect } from "react";
import NavButtonsSP from "../../Components/StudentPortalComp/NavButtonsSP";
import SearchCourse from "../../Components/StudentComp/CoursePage/SearchCourse";
import headerImage from "../../assets/StudentAssets/coursepage image/heading.webp";
import CourseListing from "../../Components/StudentComp/CoursePage/CourseListing";
import Footer from "../../Components/StudentComp/Footer";
import NavButtons from "../../Components/StudentComp/NavButtons";
import "../../css/StudentCss/course page css/CoursesPage.css";
import SpcFooter from "../../Components/StudentPortalComp/SpcFooter";
import { useParams } from "react-router-dom";

const CoursesPage = () => {
  const { location } = useParams();
  
  // Map locations to state IDs (get these IDs from your backend)
  const locationMap = {
    'sarawak': 1,
    'kuala-lumpur': 2,
    'johor': 3,
    'melaka': 4,
    'penang': 5,
    'pahang': 6,
    'sabah': 7,
    'negeri-sembilan': 8,
    'terengganu': 9,
    'kedah': 10,
    'kelantan': 11,
    'johor-bahru': 12,
    'kuching': 13,
    // Add all other locations
  };

  const locationDisplayNames = {
    'sarawak': 'Sarawak',
    'kuala-lumpur': 'Kuala Lumpur',
    'johor': 'Johor',
    // ... add all locations
  };

  useEffect(() => {
    const displayName = locationDisplayNames[location] || 'Malaysia';
    
    // Update page title and meta description
    document.title = `Study in ${displayName} - Find Courses | StudyPal`;
    
    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = `Find and compare courses to study in ${displayName}. Explore universities, colleges, and education opportunities in ${displayName} with StudyPal.`;
    document.head.appendChild(metaDescription);

    return () => {
      document.head.removeChild(metaDescription);
    };
  }, [location]);

  return (
    <div style={{ backgroundColor: "#F5F4F4" }}>
      <NavButtonsSP />
      <header className="masthead">
        <img 
          src={headerImage} 
          alt={`Study in ${locationDisplayNames[location] || 'Malaysia'}`} 
          className="header-image" 
          loading="lazy" 
        />
      </header>
      <SearchCourse 
        initialLocation={locationMap[location]} 
        locationName={locationDisplayNames[location]}
      />
      <div>
        <SpcFooter />
      </div>
    </div>
  );
};

export default CoursesPage;
