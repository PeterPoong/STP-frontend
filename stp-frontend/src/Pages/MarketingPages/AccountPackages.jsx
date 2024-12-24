import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button, ButtonGroup } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../css/MarketingStyles/accountPackages.module.css";
import basicIcon from "../../assets/SchoolPortalAssets/Group 1686550950.png";
import premiumIcon from "../../assets/SchoolPortalAssets/Group 1686550952.png";

const AccountPackages = () => {
  const [packages, setPackages] = useState();
  const [activePlan, setActivePlan] = useState("annual");
  const [priceLabel, setPriceLabel] = useState("billed annually");
  const [priceDiscount, setPriceDiscount] = useState(95);

  const getPackageDetail = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/marketing/packageList`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData["error"] || "Internal Server Error");
      }

      const fetchedData = await response.json();
      setPackages(fetchedData.data);
    } catch (error) {
      console.error("Failed to fetch package details:", error);
    }
  };

  const handleToggle = (plan) => {
    setActivePlan(plan);
    switch (plan) {
      case "annual":
        setPriceLabel("billed annually");
        setPriceDiscount(95);
        break;
      case "quarterly":
        setPriceLabel("billed quarterly");
        setPriceDiscount(97);
        break;
      case "monthly":
        setPriceLabel("billed monthly");
        setPriceDiscount(100);
        break;
    }
  };

  const calculatePrice = (price) => {
    const discount = priceDiscount / 100;
    const discountPrice = price * discount;
    return discountPrice.toFixed(2);
  };

  useEffect(() => {
    getPackageDetail();
  }, []);

  return (
    <Container fluid className={styles.manageAccountContainer}>
      <Row>
        <Col md={12} className="text-center">
          <h3 className={styles.heading}>Our Packages</h3>
          <p className={styles.description}>
            Enhance your experience with advanced features and exclusive access.
          </p>
        </Col>
      </Row>

      {/* Toggle Buttons */}
      <div className="d-flex justify-content-center align-items-center pb-4">
        <ButtonGroup className={`${styles.toggleGroup} no-gap`}>
          {/* monthly */}
          <Button
            variant={activePlan === "monthly" ? "primary" : "outline-light"}
            onClick={() => handleToggle("monthly")}
            className={`${styles.toggleButton} ${
              activePlan === "monthly" ? styles.activeButton : ""
            }`}
          >
            Monthly
          </Button>

          {/* quarterly */}
          <Button
            variant={activePlan === "quarterly" ? "primary" : "outline-light"}
            onClick={() => handleToggle("quarterly")}
            className={`${styles.toggleButton} ${
              activePlan === "quarterly" ? styles.activeButton : ""
            }`}
          >
            Quarterly
            <br />
            {/* <span className={styles.discount}>
              <b>(3% off)</b>
            </span> */}
          </Button>

          {/* annual */}
          <Button
            variant={activePlan === "annual" ? "primary" : "outline-light"}
            onClick={() => handleToggle("annual")}
            className={`${styles.toggleButton} ${
              activePlan === "annual" ? styles.activeButton : ""
            }`}
          >
            Annual
            {/* <span className={styles.discount}>
              <b>(5% off)</b>
            </span> */}
          </Button>
        </ButtonGroup>
      </div>

      {/* Package Display */}
      <Row className={`justify-content-center ${styles.packageRow}`}>
        {packages &&
          packages.map((pkg, index) => (
            <Col md={5} lg={4} className={styles.packageCol} key={pkg.id}>
              <div
                className={`${styles.packageCard} ${
                  index === 0 ? styles.basicPackage : styles.premiumPackage
                } d-flex flex-column`} // Flex container for the card
              >
                {/* Centering the icon and package name */}
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <img
                    src={index === 0 ? basicIcon : premiumIcon}
                    alt={`${pkg.package_name} icon`}
                    className={styles.packageIcon}
                  />
                  <h4 className={styles.packageName}>{pkg.package_name}</h4>
                </div>

                <p
                  className={styles.packageDetails}
                  dangerouslySetInnerHTML={{ __html: pkg.package_detail }}
                />

                {/* Sticky pricing at the bottom */}
                <div className="text-center mt-auto">
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    {" "}
                    {/* Center everything */}
                    <Col md={12}>
                      <div className={styles.packagePriceContainer}>
                        <p className={styles.packagePrice}>
                          RM{calculatePrice(pkg.package_price)}{" "}
                          <span className={styles.perMonthText}>/month</span>
                        </p>
                      </div>
                      <span className={styles.priceLabel}>({priceLabel})</span>
                    </Col>
                  </div>
                </div>
              </div>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default AccountPackages;
