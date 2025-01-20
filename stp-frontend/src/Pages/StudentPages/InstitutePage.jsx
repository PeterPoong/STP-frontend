import React, { useEffect } from "react";
// import NavButtons from "../Components/student components/NavButtons";
import NavButtons from "../../Components/StudentComp/NavButtons";
import NavButtonsSP from "../../Components/StudentPortalComp/NavButtonsSP";
// // import SearchInstitute from "../assets/StudentAssets/institute image/SearchInstitute";
import SearchInstitute from "../../Components/StudentComp/InstitutePage/SearchInstitute";
import headerImage from "../../assets/StudentAssets/institute image/heading.png";
import InstituteListing from "../../Components/StudentComp/InstitutePage/InstituteListing";
// import Footer from "../Components/StudentComp/Footer";
import Footer from "../../Components/StudentComp/Footer";
import SpcFooter from "../../Components/StudentPortalComp/SpcFooter";
import { useParams } from "react-router-dom";

const InstitutePage = () => {
  const { location } = useParams();
  
  // Use the same locationMap and locationDisplayNames as CoursesPage
  
  useEffect(() => {
    const displayName = locationDisplayNames[location] || 'Malaysia';
    
    document.title = `Universities in ${displayName} | StudyPal`;
    
    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = `Find universities and higher education institutions in ${displayName}. Compare programs, facilities, and apply online with StudyPal.`;
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
          alt={`Universities in ${locationDisplayNames[location] || 'Malaysia'}`} 
          className="header-image" 
        />
      </header>
      <SearchInstitute 
        initialLocation={locationMap[location]}
        locationName={locationDisplayNames[location]} 
      />
      <div>
        <SpcFooter />
      </div>
    </div>
  );
};

export default InstitutePage;
