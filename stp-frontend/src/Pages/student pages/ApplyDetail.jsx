// src/Pages/ApplyDetail.js
import React from "react";
import { useParams } from "react-router-dom";

const ApplyDetail = () => {
  const { applyId } = useParams();
  return (
    <div>
      <h2>Apply Now Detail for Application {applyId}</h2>
      {/* Add more details as needed */}
    </div>
  );
};

export default ApplyDetail;
