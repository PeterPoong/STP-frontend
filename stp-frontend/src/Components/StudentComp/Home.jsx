import React from "react";
import { Helmet } from 'react-helmet';
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
import { requestUserCountry } from "../../utils/locationRequest"; 
const Home = () => {
  // Generate structured data for the homepage
  useEffect(() => {
    const fetchCountry = async () => {
        const country = await requestUserCountry();
        if (country) {
            console.log("User country:", country); // Log the country to the console
        } else {
            console.log("No country fetched.");
        }
    };

    fetchCountry();
}, []);


  const generateStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "StudyPal Malaysia",
      "url": window.location.origin,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${window.location.origin}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    };
  };

  // Generate organization structured data
  const generateOrganizationData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "StudyPal Malaysia",
      "url": window.location.origin,
      "logo": `${window.location.origin}/logo.png`,
      "sameAs": [
        "https://www.facebook.com/studypalmalaysia",
        "https://www.instagram.com/studypalmalaysia",
        // Add other social media links
      ]
    };
  };

  return (
    <div>
      <Helmet>
        <title>StudyPal Malaysia | Find Your Perfect University & Course</title>
        <meta name="description" content="Discover top universities and courses in Malaysia. Compare programs, fees, and admission requirements. Get expert guidance for your education journey." />
        <meta name="keywords" content="malaysia universities, study in malaysia, university courses, higher education malaysia, college admission, scholarship malaysia, diploma programs, degree courses, 
        top universities in malaysia, top courses in malaysia, best universities in malaysia, best courses in malaysia, best universities in malaysia, best courses in malaysia" />
        
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content="StudyPal Malaysia | Find Your Perfect University & Course" />
        <meta property="og:description" content="Discover top universities and courses in Malaysia. Compare programs, fees, and admission requirements." />
        <meta property="og:image" content={`${window.location.origin}/og-image.jpg`} />
        <meta property="og:url" content={window.location.href} />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="StudyPal Malaysia | Find Your Perfect University & Course" />
        <meta name="twitter:description" content="Discover top universities and courses in Malaysia. Compare programs, fees, and admission requirements." />
        <meta name="twitter:image" content={`${window.location.origin}/twitter-image.jpg`} />
        
        {/* Structured data */}
        <script type="application/ld+json">
          {JSON.stringify(generateStructuredData())}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(generateOrganizationData())}
        </script>

        {/* Canonical URL */}
        <link rel="canonical" href={window.location.origin} />
      </Helmet>

      <main>
        <div className="app-container">
          <NavButtonsSP />
        </div>
        <div className="home-container">
          <section className="featured-uni-section" aria-label="Featured Universities">
            <h1 className="visually-hidden">Featured Universities in Malaysia</h1>
            <FeaturedUni />
          </section>
          
          <section aria-label="Top Universities">
            <UniversityRow />
          </section>

          <section className="section-division" aria-label="Featured Courses">
            <FeaturedCoursesContainer />
          </section>
          
          <section aria-label="Why Choose StudyPal">
            <WhyStudyPal />
          </section>
        </div>
        
        <section aria-label="Popular Courses">
          <h2 className="section-heading">Hot Pick Courses</h2>
          <CoursesContainer />
        </section>
        
        <section aria-label="Video Gallery">
          <VideoSlide />
        </section>
        
        <Footer />
      </main>
    </div>
  );
};

export default Home;
