import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const ButtonGroup = ({ schoolId, schoolName }) => {
  return (
    <div className="button-container">
      <Button
        onClick={() => {
          sessionStorage.setItem("schoolId", schoolId);
          window.location.href = `/university-details/${schoolName.replace(/\s+/g, '-').toLowerCase()}`;
        }}
      >
        Know More
      </Button>
      <Link to="/applynow">
        <Button>Apply Now</Button>
      </Link>
    </div>
  );
};

export default ButtonGroup;
