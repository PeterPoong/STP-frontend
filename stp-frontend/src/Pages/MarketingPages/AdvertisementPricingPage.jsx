import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../css/MarketingStyles/advertisementPackages.module.css";
import topAdBanner from "../../assets/Marketing/TopAd Banners.png";
import secondAdBanner from "../../assets/Marketing/SecondAd Banner.png";
import detailAdBanner from "../../assets/Marketing/DetailAd Banner.png";

const AdvertisementPricingPage = () => {
  const [adPackages, setAdPackages] = useState([]); // Store ad packages
  const [activePricing, setActivePricing] = useState("daily"); // Default to daily pricing
  const [priceLabel, setPriceLabel] = useState("per day"); // Show "per day" or "per week"

  // Fetch the advertisement pricing data from the API
  const getAdvertisementPricing = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/marketing/advertisementPricing"
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData["error"] || "Failed to fetch advertisement pricing"
        );
      }

      const fetchedData = await response.json();
      setAdPackages(fetchedData.data); // Store the fetched packages
    } catch (error) {
      console.error("Failed to fetch advertisement pricing:", error);
    }
  };

  // Handle toggle between daily and weekly pricing
  const handleToggle = (pricing) => {
    setActivePricing(pricing);
    setPriceLabel(pricing === "daily" ? "per day" : "per week");
  };

  // Calculate the price with a 5% discount for weekly pricing
  const calculatePrice = (price, isWeekly) => {
    const validPrice = price && !isNaN(price) ? parseFloat(price) : 0;

    if (isWeekly) {
      const discount = 0.05; // 5% discount
      return (validPrice * (1 - discount)).toFixed(2);
    }
    return validPrice.toFixed(2); // Return the daily price without discount
  };

  // Fetch advertisement pricing data when component mounts
  useEffect(() => {
    getAdvertisementPricing();
  }, []);

  // Function to return the image based on advertisement name
  const getImageByName = (advertisementName) => {
    switch (advertisementName) {
      case "TopAd Banners":
        return topAdBanner;
      case "SecondAd Banner":
        return secondAdBanner;
      case "DetailAd Banner":
        return detailAdBanner;
      default:
        return topAdBanner; // Default image if the name doesn't match
    }
  };

  return (
    <Container fluid className={styles.manageAccountContainer}>
      <Row>
        <Col md={12} className="text-center">
          <h3 className={styles.heading}>Advertisement Packages</h3>
          <p className={styles.description}>
            Choose from our exclusive advertisement packages to boost your
            visibility.
          </p>
        </Col>
      </Row>

      {/* Toggle Buttons for Daily/Weekly Pricing */}
      <div className="d-flex justify-content-center align-items-center pb-4">
        <ButtonGroup className={`${styles.toggleGroup} no-gap`}>
          <Button
            variant={activePricing === "daily" ? "primary" : "outline-light"}
            onClick={() => handleToggle("daily")}
            className={`${styles.toggleButton} ${
              activePricing === "daily" ? styles.activeButton : ""
            }`}
          >
            Daily
          </Button>

          <Button
            variant={activePricing === "weekly" ? "primary" : "outline-light"}
            onClick={() => handleToggle("weekly")}
            className={`${styles.toggleButton} ${
              activePricing === "weekly" ? styles.activeButton : ""
            }`}
          >
            Weekly
          </Button>
        </ButtonGroup>
      </div>

      {/* Advertisement Packages Display */}
      <Row className="g-4 justify-content-center packageRow">
        {adPackages.length > 0 ? (
          adPackages.map((pkg) => (
            <Col
              md={12} // Full width for mobile
              lg={12} // Full width for large screens as well
              key={pkg.id}
              className="mb-4 packageCol" // Adjusted column class for vertical stacking
            >
              <div className="text-center mb-2">
                <h4 className={styles.packageName}>{pkg.advertisement_name}</h4>
              </div>

              <div className="text-center mb-3">
                <p className={styles.packagePrice}>
                  RM
                  {calculatePrice(
                    pkg.advertisement_price,
                    activePricing === "weekly"
                  )}{" "}
                  <span className={styles.perMonthText}>{priceLabel}</span>
                </p>
              </div>

              <div className={`${styles.packageCard} d-flex flex-column`}>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <div className={styles.packageIcon}>
                    <img
                      src={getImageByName(pkg.advertisement_name)}
                      alt={pkg.advertisement_name}
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
        )}
      </Row>
    </Container>
  );
};

export default AdvertisementPricingPage;
