// CoursesButton.js
import React from "react";

import "../../css/StudentCss/course button group/CoursesButton.css";

const CoursesButton = ({ src, label, onClick }) => {
  return (
    <div className="custom-button coursebtn" onClick={onClick}>
      <img src={src} alt={label} className="custom-button-image" />
      <p className="custom-button-label" style={{ textAlign: "center" }}>
        {label}
      </p>
    </div>
  );
};

export default CoursesButton;
