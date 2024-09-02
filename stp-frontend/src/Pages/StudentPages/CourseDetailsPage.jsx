// src/Pages/courseDetails.js
import React from "react";
import { useParams } from "react-router-dom";
import CourseDetail from "../../Components/StudentComp/CoursePage/CourseDetail";
const CourseDetailsPage = () => {
  // const { id } = useParams();
  return (
    <div>
      {/* <h2>Apply Now Detail for Application {id}</h2> */}
      <CourseDetail />
    </div>
  );
};

export default CourseDetailsPage;
