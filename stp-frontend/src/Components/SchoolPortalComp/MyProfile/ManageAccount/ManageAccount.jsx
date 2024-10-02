import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import stickman from "../../../../assets/SchoolPortalAssets/20856932_6381326 1.png";
import styles from "../../../../css/SchoolPortalStyle/ManageAccount.module.css";
import basicIcon from "../../../../assets/SchoolPortalAssets/Group 1686550950.png";
import premiumIcon from "../../../../assets/SchoolPortalAssets/Group 1686550952.png";

const ManageAccount = () => {
  const token = sessionStorage.getItem("token");
  const [basicPackage, setBasicPackage] = useState({});
  const [premiumPackage, setPremiumPackage] = useState({});
  const [accountType, setAccountType] = useState("");

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

  const getAccountDetail = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/school/schoolDetail`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData["error"] || "Internal Server Error");
      }

      const fetchedData = await response.json();
      setAccountType(fetchedData.data.account_type);
      // setAccountType(65);
    } catch (error) {
      console.error("Failed to get package data", error);
    }
  };

  useEffect(() => {
    getPackage(76); // Basic Package
    getPackage(77); // Premium Package
    getAccountDetail();
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
      <Row className="d-flex align-items-stretch ">
        <Col md={6} className={styles.alignBottom}>
          <div
            className={`px-5 py-5 ${styles.packageBasicCard} ${styles.premiumPackage} `} // Use Premium styles for Basic
            style={{
              backgroundColor: accountType === 64 ? "#B71A18" : "white", // Conditional color
            }}
          >
            <div className="text-start">
              <img
                src={accountType === 64 ? premiumIcon : basicIcon}
                alt="basic package icon"
              />
            </div>

            <h4
              className={`mt-3 text-start ${styles.packageName}`}
              style={{
                color: accountType === 64 ? "white" : "#B71A18", // Conditional color
              }}
            >
              {basicPackage.package_name || "Basic Package"}
            </h4>

            <div className="d-flex">
              <button
                className={`${styles.customBtn}`}
                style={{
                  backgroundColor: accountType === 64 ? "white" : "#B71A18",
                  color: accountType === 64 ? "#B71A18" : "white",
                }}
              >
                Features
              </button>
            </div>

            <p
              className="text-start"
              style={{
                color: accountType === 64 ? "white" : "#B71A18",
              }}
              dangerouslySetInnerHTML={{
                __html:
                  decodeHTML(basicPackage.package_detail) ||
                  "Basic package description",
              }}
            />

            <div className="text-start">
              <p
                className={styles.BasicPrice}
                style={{
                  color: accountType === 64 ? "white" : "black",
                }}
              >
                ${basicPackage.package_price || "350"}
              </p>
              <p
                className={styles.BasicPriceLabel}
                style={{
                  color: accountType === 64 ? "white" : "black",
                }}
              >
                per month
              </p>
            </div>

            {accountType === 64 ? (
              <button
                className={`mt-2 ${styles.customCurrentBtn}`}
                style={{
                  backgroundColor: "white",
                  color: "#B71A18",
                }}
              >
                Current Package
              </button>
            ) : (
              <Button
                variant="danger"
                onClick={handleRedirect}
                className={`px-5 ${styles.contactButton}`}
                style={{
                  backgroundColor: "#B71A18",
                  color: "white",
                }}
              >
                Contact Now →
              </Button>
            )}
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
            style={{
              backgroundColor: accountType === 64 ? "white" : "#B71A18", // Conditional color
            }}
          >
            {/* icon  */}
            <Row className="my-1">
              <div className="text-start">
                <img
                  src={accountType === 64 ? basicIcon : premiumIcon}
                  alt="premium icon"
                />
              </div>
            </Row>

            {/* package name  */}
            <Row className="my-1">
              <h4
                className={`mt-3 text-start ${styles.premiumPackageName}`}
                style={{
                  color: accountType === 64 ? "#B71A18" : "white", // Conditional color
                }}
              >
                {premiumPackage.package_name || "Basic Package"}
              </h4>
            </Row>

            {/* feeatured  */}
            <Row className="mb-2">
              <div className="d-flex">
                <button
                  className={`${styles.customPremiumBtn}`}
                  style={{
                    backgroundColor: accountType === 64 ? "#B71A18" : "white",
                    color: accountType === 64 ? "white" : "#B71A18",
                  }}
                >
                  Features
                </button>
              </div>
            </Row>

            {/* description  */}
            <Row>
              <p
                className="text-start fs-6"
                style={{
                  color: accountType === 64 ? "#B71A18" : "white",
                }}
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
                <p
                  className={`text-start ${styles.PremiumPrice}`}
                  style={{
                    color: accountType === 64 ? "black" : "white",
                  }}
                >
                  ${premiumPackage.package_price || "0"}
                </p>
                <p
                  className={styles.PremiumPriceLabel}
                  style={{
                    color: accountType === 64 ? "black" : "white",
                  }}
                >
                  per month
                </p>
              </div>
            </Row>

            {/* contact button  */}
            <Row>
              <div className="d-flex justify-content-center">
                {accountType === 64 ? (
                  <Button
                    variant="danger"
                    onClick={handleRedirect}
                    className={`px-5 ${styles.contactButton}`}
                    style={{
                      backgroundColor: "#B71A18",
                      color: "white",
                    }}
                  >
                    Contact Now →
                  </Button>
                ) : (
                  <button
                    className={`mt-2 ${styles.customCurrentBtn}`}
                    style={{
                      backgroundColor: "white",
                      color: "#B71A18",
                    }}
                  >
                    Current Package
                  </button>
                )}
              </div>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ManageAccount;
