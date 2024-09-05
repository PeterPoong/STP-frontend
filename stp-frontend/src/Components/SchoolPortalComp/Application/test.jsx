import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'; // Importing the ellipsis icon
import emailIcon from '../../../assets/SchoolPortalAssets/email.png';
import phoneIcon from '../../../assets/SchoolPortalAssets/telephone.png';
import "../../../css/SchoolPortalStyle/test.css";

const Applicant = () => {
  const token = sessionStorage.getItem("token");
  const [courses, setCourses] = useState([]); // State to hold the course data
  const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility

  useEffect(() => {
    // Function to fetch course data
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/school/dropDownCourseList`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); // Replace with your API URL
        const data = await response.json();
        setCourses(data.data); // Set the course data to state
        console.log('test',data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses(); // Call the function to fetch data when component mounts
  }, []);

    // Function to toggle dropdown
    const toggleDropdown = () => {
      setDropdownVisible(!dropdownVisible);
    };

  return (
    <div className="applicant-container">
      {/* Title Section */}
      <div className="applicant-title">
        <h1>Manage Your Applicants</h1>
      </div>

      {/* Search and Filter Section */}
      <div className="search-filter-container">
        <label className="search-label">Search:</label>

        <div className='filter-column'>
          <div className="search-bar">
            <input type="text" placeholder="Search for Students" />
            <i className="search-icon"></i>
          </div>

          {/* Filter Dropdowns */}
          <div className="filter-dropdowns">
            <div className="dropdown">
              <select>
                <option value="">Application Status</option>
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="dropdown">
              <select>
                <option value="">Academic Qualification</option>
                <option value="SPM">SPM</option>
                <option value="STPM">STPM</option>
                <option value="Foundation">Foundation</option>
              </select>
            </div>
            <div className="dropdown">
              <select>
                <option value="">Courses Applied</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.course_name}</option>
                ))}
              </select>
            </div>

            {/* Reset Filter */}
            <div className="reset-filter">
              <a href="#">Reset Filter</a>
            </div>
          </div>
        </div>
      </div>

      {/* Results Message Section */}
      <div className="results-message">
        <p><b>31</b> results found for "<b>Ed</b>"</p>
      </div>

      {/* Student Card Section */}
      <div className="student-card">
        {/* Profile Picture Section */}
        <div className="student-profile">
          <div className="cgpa-banner">
            <p>STPM CGPA: 3.94</p>
          </div>
        </div>

        {/* Student Information Section */}
        <div className='information'>
        <div className="student-info">
          {/* Ellipsis (Three Dots) */}
          <div className="options-menu" onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faEllipsisH} />
          </div>

          {/* Dropdown for More Details and Review Feedback */}
          {dropdownVisible && (
            <div className="dropdown-menu">
              <ul>
                <li>More Details</li>
                <li>Review Feedback</li>
              </ul>
            </div>
          )}
            
            <div className='name-row'>
              <h2 className="student-name">Eddison Lee Boon Kiat</h2>
              <div className="application-status">
                <p>Pending</p>
              </div>
              <div className="reminder-count">
                <p>15 Reminders</p>
              </div>
            </div>
          </div>

          <div className='second-row'>
            <div className='email'>
              <img src={emailIcon} alt='Email Icon' className='contact-icon' />
              <p>eddison@gmail.com</p>
            </div>
            <div className='contact-number'>
              <img src={phoneIcon} alt='Phone Icon' className='contact-icon' />
              <p>011-19039139</p>
            </div>
          </div>

          <div className='third-row'>
            <div className='applied-degree'></div>
            <div className='profile-completion'></div>
          </div>


        </div>
      </div>


    </div>
    
  );
};

export default Applicant;
