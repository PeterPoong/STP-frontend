import React, { useEffect, useState } from "react";
import "../../css/SchoolPortalStyle/Courses.css";
import {
  Form,
  Container,
  Row,
  Col,
  InputGroup,
  Button,
  Alert,
} from "react-bootstrap";

import { Search } from "react-bootstrap-icons";

const courses = [
  {
    id: 1,
    title: "Degree of Medicine",
    university: "Swinburne University (Sarawak)",
    location: "Sarawak",
    duration: "28 months",
    intake: "January, July or September",
    fee: "RM 24,000",
    mode: "Full time",
    type: "Degree",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Swinburne_University_of_Technology_logo.svg", // Placeholder logo URL
  },
  // Add more courses if needed
];
const Courses = () => {
  // return (
  //   <Container fluid>
  //     <h5 className="my-profile-header">Manage Course</h5>

  //   </Container>
  // );
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Academic Qualification");
  const [category, setCategory] = useState("Business");

  // Filtered courses based on search input (for demonstration purposes)
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="container mx-auto p-4">
      <h5 className="my-ManageCourses-header">Manage Course</h5>
      <div className="flex items-center gap-4 mb-4">
        {/* Search Input */}
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search for Courses"
            className="p-2 border rounded w-full bg-transparent text-black transparent-input pl-8" // Adjust padding for icon
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search
            className="searchIcon"
            size={20} // Adjust size as needed
          />
        </div>
        {/* Sort By Dropdown */}
        <select
          className="p-2 border rounded"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="Academic Qualification">Academic Qualification</option>
          <option value="Duration">Duration</option>
          Add other sorting options
        </select>

        {/* Category Dropdown */}
        <select
          className="p-2 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Business">Business</option>
          <option value="Medicine">Medicine</option>
          {/* Add other categories */}
        </select>

        {/* Add New Course Button */}
        <button className="bg-red-500 text-white p-2 rounded">
          Add New Course
        </button>
      </div>

      {/* Suggestions */}
      {/* <div className="mb-4">
        <span className="font-semibold">Suggestion:</span>{" "}
        <span className="text-red-500 cursor-pointer">business computing</span>,{" "}
        <span className="text-red-500 cursor-pointer">e-commerce</span>,{" "}
        <span className="text-red-500 cursor-pointer">entrepreneurship</span>,{" "}
        <span className="text-red-500 cursor-pointer">marketing</span>
      </div> */}

      {/* Course List */}
    </div>
  );
};

export default Courses;
