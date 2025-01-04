// src/Pages/courseDetails.js
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import CourseDetail from "../../Components/StudentComp/CoursePage/CourseDetail";

const CourseDetailsPage = () => {
  const { school_name, course_name } = useParams(); // Extract parameters from URL

  useEffect(() => {
    // Set the page title
    document.title = `StudyPal - Course detail for ${course_name} at ${school_name}`;

    // Set meta description
    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = `Details of the ${course_name} course at ${school_name} for future students.`;
    document.head.appendChild(metaDescription);

    // Clean up by removing the meta tag when component unmounts
    return () => {
      document.head.removeChild(metaDescription);
    };
  }, [school_name, course_name]);

  return (
    <div>
      <CourseDetail />
    </div>
  );
};

export default CourseDetailsPage;
