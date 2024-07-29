import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const ButtonGroup = () => {
  return (
    <div className="button-container">
      <Link to="/knowmore">
        <Button>Know More</Button>
      </Link>
      <Link to="/applynow">
        <Button>Apply Now</Button>
      </Link>
    </div>
  );
};

export default ButtonGroup;
