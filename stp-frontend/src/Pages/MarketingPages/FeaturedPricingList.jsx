import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../css/MarketingStyles/featuredPricingList.module.css";
import topAdBanner from "../../assets/Marketing/TopAd Banners.png";
import secondAdBanner from "../../assets/Marketing/SecondAd Banner.png";
import detailAdBanner from "../../assets/Marketing/DetailAd Banner.png";

// School Images
import schoolHomapage from "../../assets/Marketing/FeaturedPricing/FeaturedSchoolHomepage.png";
import schoolSecondPage from "../../assets/Marketing/FeaturedPricing/FeaturedSchoolSecondPage.png";
import schoolThirdPage from "../../assets/Marketing/FeaturedPricing/FeaturedSchoolThirdPage.png";

// Course Images
import courseHomepage from "../../assets/Marketing/FeaturedPricing/FeaturedCoursesHomepage.png";
import courseSecondpage from "../../assets/Marketing/FeaturedPricing/FeaturedCourseSecondPage.png";
import courseThirdpage from "../../assets/Marketing/FeaturedPricing/FeaturedCourseThirdPage.png";

const FeaturedPricingList = () => {
  const [schoolFeatured, setSchoolFeatured] = useState([]); // Store school data
  const [courseFeatured, setCourseFeatured] = useState([]); // Store course data
  const [featureCategoryTab, setFeatureCategoryTab] = useState("School"); // Default to School

  // Fetch the advertisement pricing data from the API
  const getFeaturedPricing = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/marketing/featuredPricingList`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData["error"] || "Failed to fetch advertisement pricing"
        );
      }

      const fetchedData = await response.json();
      console.log("data", fetchedData.data.school[0].feature_name);
      setSchoolFeatured(fetchedData.data.school);
      setCourseFeatured(fetchedData.data.course);
    } catch (error) {
      console.error("Failed to fetch advertisement pricing:", error);
    }
  };

  // Handle tab switching between School and Courses
  const handleCategoryToggle = (category) => {
    setFeatureCategoryTab(category);
  };

  // Fetch advertisement pricing data when component mounts
  useEffect(() => {
    getFeaturedPricing();
  }, []);

  // Function to return the image based on feature_name and category
  const getImageByName = (featureName, category) => {
    if (category === "School") {
      switch (featureName) {
        case "homepage university":
          return schoolHomapage;
        case "second page":
          return schoolSecondPage;
        case "third page":
          return schoolThirdPage;
        default:
          return schoolHomapage; // Default if no match
      }
    } else if (category === "Course") {
      switch (featureName) {
        case "homepage courses":
          return courseHomepage;
        case "second page":
          return courseSecondpage;
        case "third page":
          return courseThirdpage;
        default:
          return courseHomepage; // Default if no match
      }
    }
    return topAdBanner; // Default fallback image
  };

  // Function to render the featured packages (school or course)
  const renderFeaturedPackages = (data, category) => {
    return data.length > 0 ? (
      data.map((pkg) => (
        <Col
          md={12} // Full width for mobile
          lg={12} // Full width for large screens as well
          key={pkg.featuredId} // Unique key for each package
          className="mb-4 packageCol" // Adjusted column class for vertical stacking
        >
          <div className="text-center mb-2">
            <h4 className={styles.packageName}>
              {pkg.feature_name} {/* Display the feature_name instead */}
            </h4>
          </div>

          <div className="text-center mb-3">
            {/* Conditionally set price label based on category */}
            <p className={styles.packagePrice}>
              RM{pkg.price}{" "}
              <span className={styles.perMonthText}>{"per month"}</span>
            </p>
          </div>

          <div className={`${styles.packageCard} d-flex flex-column`}>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className={styles.packageIcon}>
                <img
                  src={getImageByName(pkg.feature_name, category)} // Use the updated image mapping function
                  alt={pkg.feature_name}
                  className={styles.bannerImage}
                />
              </div>
            </div>
          </div>
        </Col>
      ))
    ) : (
      <Col md={12} className="text-center">
        <p>Loading advertisement packages...</p>
      </Col>
    );
  };

  return (
    <Container fluid className={styles.manageAccountContainer}>
      <Row>
        <Col md={12} className="text-center">
          <h3 className={styles.heading}>Featured Pricing List</h3>
          <p className={styles.description}>
            Choose from our exclusive Featured Feature to boost your visibility.
          </p>
        </Col>
      </Row>

      {/* Toggle Buttons for School / Courses */}
      <div className="d-flex justify-content-center align-items-center pb-4">
        <ButtonGroup className={`${styles.toggleGroup} no-gap`}>
          <Button
            variant={
              featureCategoryTab === "School" ? "primary" : "outline-light"
            }
            onClick={() => handleCategoryToggle("School")}
            className={`${styles.toggleButton} ${
              featureCategoryTab === "School" ? styles.activeButton : ""
            }`}
          >
            School
          </Button>

          <Button
            variant={
              featureCategoryTab === "Course" ? "primary" : "outline-light"
            }
            onClick={() => handleCategoryToggle("Course")}
            className={`${styles.toggleButton} ${
              featureCategoryTab === "Course" ? styles.activeButton : ""
            }`}
          >
            Course
          </Button>
        </ButtonGroup>
      </div>

      {/* Render the featured packages based on the selected category */}
      <Row className="g-4 justify-content-center packageRow">
        {featureCategoryTab === "School" &&
          renderFeaturedPackages(schoolFeatured, "School")}
        {featureCategoryTab === "Course" &&
          renderFeaturedPackages(courseFeatured, "Course")}
      </Row>
    </Container>
  );
};

export default FeaturedPricingList;
