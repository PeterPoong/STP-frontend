// CoursesButton.js
import React from "react";
// import "../css/student css/course button group/CoursesButton.css";
import "../../css/student css/course button group/CoursesButton.css";

const CoursesButton = ({ src, label }) => {
  return (
    <div className="custom-button coursebtn">
      <img src={src} alt={label} className="custom-button-image" />
      <p className="custom-button-label" style={{ textAlign: "center" }}>
        {label}
      </p>
    </div>
  );
};

export default CoursesButton;
