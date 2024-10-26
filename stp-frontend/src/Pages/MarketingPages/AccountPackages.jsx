import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../css/MarketingStyles/accountPackages.module.css";
import basicIcon from "../../assets/SchoolPortalAssets/Group 1686550950.png";
import premiumIcon from "../../assets/SchoolPortalAssets/Group 1686550952.png";

const AccountPackages = () => {
  const [packages, setPackages] = useState();

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
      <Row className={`justify-content-center ${styles.packageRow}`}>
        {packages &&
          packages.map((pkg, index) => (
            <Col md={5} lg={4} className={styles.packageCol} key={pkg.id}>
              <div
                className={`${styles.packageCard} ${
                  index === 0 ? styles.basicPackage : styles.premiumPackage
                }`}
              >
                <div className="text-start">
                  <img
                    src={index === 0 ? basicIcon : premiumIcon}
                    alt={`${pkg.package_name} icon`}
                    className={styles.packageIcon}
                  />
                </div>
                <h4 className={styles.packageName}>{pkg.package_name}</h4>
                <p
                  className={styles.packageDetails}
                  dangerouslySetInnerHTML={{ __html: pkg.package_detail }}
                />
                <div className="text-start">
                  <p className={styles.packagePrice}>RM {pkg.package_price}</p>
                  <p className={styles.packagePriceLabel}>per month</p>
                </div>
              </div>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default AccountPackages;
