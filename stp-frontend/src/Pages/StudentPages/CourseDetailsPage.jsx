// src/Pages/courseDetails.js
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import CourseDetail from "../../Components/StudentComp/CoursePage/CourseDetail";
const CourseDetailsPage = () => {

  useEffect(() => {
    // Set the page title
    document.title = "StudyPal - Course detail for student";

    // Set meta description
    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "The details of the course and university for the future student at studypal.my.";
    document.head.appendChild(metaDescription);

    // Clean up by removing the meta tag when component unmounts
    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);
  // const { id } = useParams();
  return (
    <div>
      {/* <h2>Apply Now Detail for Application {id}</h2> */}
      <CourseDetail />
    </div>
  );
};

export default CourseDetailsPage;
