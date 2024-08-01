// src/Pages/ApplyDetail.js
import React from "react";
import { useParams } from "react-router-dom";

const ApplyDetail = () => {
  const { applyId } = useParams();
  return (
    <div>
      <h1>Apply Now Detail for Application {applyId}</h1>
      {/* Add more details as needed */}
    </div>
  );
};

export default ApplyDetail;
