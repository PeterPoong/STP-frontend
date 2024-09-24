import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { CheckCircleFill } from "react-bootstrap-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import stickman from "../../../../assets/SchoolPortalAssets/20856932_6381326 1.png";
import styles from "../../../../css/SchoolPortalStyle/ManageAccount.module.css";
import basicIcon from "../../../../assets/SchoolPortalAssets/Group 1686550950.png";
import premiumIcon from "../../../../assets/SchoolPortalAssets/Group 1686550952.png";

const ManageAccount = () => {
  const token = sessionStorage.getItem("token");
  const [basicPackage, setBasicPackage] = useState({});
  const [premiumPackage, setPremiumPackage] = useState({});

  const getPackage = async (type) => {
    try {
      const formData = { package_type: type };
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/admin/packageList`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData["error"] || "Internal Server Error");
      }

      const fetchedData = await response.json();
      if (type === 76) {
        setBasicPackage(fetchedData.data[0]);
      } else if (type === 77) {
        setPremiumPackage(fetchedData.data[0]);
      }
    } catch (error) {
      console.error("Failed to get package data", error);
    }
  };

  useEffect(() => {
    getPackage(76); // Basic Package
    getPackage(77); // Premium Package
  }, [token]);

  const decodeHTML = (html) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = html;
    return textArea.value;
  };

  const packageDetails = decodeHTML(basicPackage.package_detail);
  const listItems = packageDetails
    .split("<li>")
    .slice(1)
    .map((item) => item.replace(/<\/li>/, ""));

  const handleRedirect = () => {
    window.location.href = "https://example.com"; // Change to the desired URL
  };

  return (
    <Container fluid className={` ${styles.manageAccountContainer}`}>
      <Row>
        <Col
          md={7}
          className={` d-flex flex-column justify-content-start ${styles.basicText}`}
        >
          <h3 className={styles.heading}>Upgrade your Account</h3>
          <p className={styles.description}>
            Enhance your experience with advanced features and exclusive access.
          </p>
        </Col>
      </Row>
      <Row className="d-flex align-items-stretch">
        <Col md={6}>
          <img
            src={stickman}
            alt="Stickman Illustration"
            className={styles.leftCornerImage}
          />
          <div
            className={`px-5 py-5  ${styles.packageBasicCard} ${styles.basicPackage}`}
          >
            <div className="text-start">
              <img src={basicIcon} alt="basic package icon" />
            </div>

            <h4 className={`mt-3 text-start ${styles.packageName}`}>
              {basicPackage.package_name || "Basic Package"}
            </h4>

            <div className="d-flex">
              <button className={`${styles.customBtn}`}>Features</button>
            </div>

            <p
              className="text-start "
              dangerouslySetInnerHTML={{
                __html:
                  decodeHTML(basicPackage.package_detail) ||
                  "Basic package description",
              }}
            />

            <div className="text-start">
              <p className={styles.price}>
                ${basicPackage.package_price || "350"}
              </p>
              <p className={styles.priceLabel}>per year/pack</p>
            </div>

            <button className={`mt-2 ${styles.customCurrentBtn}`}>
              Current Package
            </button>
          </div>
        </Col>
        {/* Right Side: Package Cards */}
        <Col
          md={6}
          className={` justify-content-around  ${styles.premiumText}`}
        >
          {/* Premium Package */}
          <div
            className={`${styles.packagePremiumCard} ${styles.premiumPackage}`}
          >
            {/* icon  */}
            <Row className="my-1">
              <div className="text-start">
                <img src={premiumIcon} alt="premium icon" />
              </div>
            </Row>

            {/* package name  */}
            <Row className="my-1">
              <h4 className={`mt-3 text-start ${styles.premiumPackageName}`}>
                {premiumPackage.package_name || "Basic Package"}
              </h4>
            </Row>

            {/* feeatured  */}
            <Row className="mb-2">
              <div className="d-flex">
                <button className={`${styles.customPremiumBtn}`}>
                  Features
                </button>
              </div>
            </Row>

            {/* description  */}
            <Row>
              <p
                className="text-start fs-6"
                dangerouslySetInnerHTML={{
                  __html:
                    decodeHTML(premiumPackage.package_detail) ||
                    "Basic package description",
                }}
              />
            </Row>

            {/* price  */}
            <Row>
              <div className="text-start">
                <p className={`text-start ${styles.PremiumPrice}`}>
                  ${premiumPackage.package_price || "0"}
                </p>
                <p className={styles.PremiumPriceLabel}>per year/pack</p>
              </div>
            </Row>

            {/* contact button  */}
            <Row>
              <div className="d-flex justify-content-center">
                <Button
                  variant="danger"
                  onClick={handleRedirect}
                  className={`px-5 ${styles.contactButton}`}
                >
                  Contact Now →
                </Button>
              </div>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ManageAccount;
