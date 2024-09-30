import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

//AddCourseForm
import AddCourseForm from "../Courses/AddCourseForm";
import CoursesListing from "./CoursesListing";
import CourseDetail from "./CourseDetail";
import EditCourseDetail from "./EditCourse";

const Courses = () => {
  const [testreturn, setTestreturn] = useState("testing");
  const [toggle, setToggle] = useState("false");
  const [backToList, setBackToList] = useState("true");
  const [addCourseButton, setAddCourseButton] = useState("false");
  const [page, setPage] = useState("courseList");

  const handleAddCourseClick = (page) => {
    setAddCourseButton(true);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const handleFormClose = () => {
    setAddCourseButton(false);
  };

  const [courseID, setCourseId] = useState("");

  const handleCourse = (courseId) => {
    setCourseId(courseId);
    handlePage("courseDetail");
  };

  const handleEditCourse = (courseId) => {
    setCourseId(courseId);
    handlePage("editCourse");
  };

  const renderPage = () => {
    switch (page) {
      case "addCourse":
        return <AddCourseForm handleGoBack={() => handlePage("courseList")} />;
        break;
      case "courseList":
        return (
          <CoursesListing
            viewDetail={() => handlePage("courseDetail")}
            onAddCourseClick={() => handlePage("addCourse")}
            courseID={(id) => handleCourse(id)}
            editCourse={(id) => handleEditCourse(id)}
          />
        );
        break;
      case "courseDetail":
        return (
          <CourseDetail
            courseId={courseID}
            handleGoBack={() => handlePage("courseList")}
            editCourse={(id) => handleEditCourse(id)}
          />
        );
        break;
      case "editCourse":
        return (
          <EditCourseDetail
            courseId={courseID}
            handleGoBack={() => handlePage("courseList")}
          />
        );
    }
  };

  return (
    <div>
      {/* Conditionally render the AddCourseForm */}
      {/* {addCourseButton == true ? (
        <AddCourseForm handleGoBack={handleFormClose} />
      ) : (
        <CoursesListing onAddCourseClick={handleAddCourseClick} />
      )} */}
      {renderPage()}
    </div>
  );
};

export default Courses;
