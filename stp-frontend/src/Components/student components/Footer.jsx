import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import "../css/student css/Footer.css"; // Ensure this path is correct
import "../../css/student css/Footer.css";
// import fb from "../assets/student asset/logo/fblogo.png";
import fb from "../../assets/student asset/logo/fblogo.png";
import ig from "../../assets/student asset/logo/instalogo.png";
import sms from "../../assets/student asset/logo/smslogo.png";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#202220",
        color: "white",
        textAlign: "center",
        padding: "10px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ marginBottom: "5px" }}>
          <img
            src={fb}
            alt="Facebook Logo"
            style={{ height: "70px", margin: "0 10px" }}
          />
          <img
            src={ig}
            alt="Instagram Logo"
            style={{ height: "70px", margin: "0 10px" }}
          />
          <img
            src={sms}
            alt="SMS Logo"
            style={{ height: "70px", margin: "0 10px" }}
          />
        </div>
        <div style={{ marginBottom: "5px" }}>
          Lot 3493, No.13 2nd Floor, Jalan Piasau, Piasau Commercial, 98000
          Miri, Sarawak
        </div>
        <div style={{ fontSize: "12px" }}>
          Copyright © 2024 iMedia Enterprise. Designed by iMedia.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
