import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons"; // Importing the ellipsis icon
import emailIcon from "../../../assets/SchoolPortalAssets/email.png";
import phoneIcon from "../../../assets/SchoolPortalAssets/telephone.png";
import styles from "../../../css/SchoolPortalStyle/test.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Applicant = () => {
  const token = sessionStorage.getItem("token");
  const [courses, setCourses] = useState([]); // State to hold the course data
  const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility
  const dropdownMenuRef = useRef(null); // Ref for the dropdown menu
  const ellipsisButtonRef = useRef(null); // Ref for the three-dot button

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
        );
        const data = await response.json();
        setCourses(data.data); // Set the course data to state
        console.log("test", data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses(); // Call the function to fetch data when component mounts
  }, []);

  // Function to toggle dropdown
  const toggleDropdown = () => {
    setDropdownVisible((prevVisible) => !prevVisible);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the clicked target is not within the dropdown or the three-dot menu
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target) &&
        ellipsisButtonRef.current &&
        !ellipsisButtonRef.current.contains(event.target)
      ) {
        setDropdownVisible(false); // Close the dropdown
      }
    };

    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles["applicant-container"]}>
      {/* Title Section */}
      <div className={styles["applicant-title"]}>
        <h1>Manage Your Applicants</h1>
      </div>

      {/* Search and Filter Section */}
      <div className={styles["search-filter-container"]}>
        <label className={styles["search-label"]}>Search:</label>

        <div className={styles["filter-column"]}>
          <div className={styles["search-bar"]}>
            <input type="text" placeholder="Search for Students" />
            <i className={styles["search-icon"]}></i>
          </div>

          {/* Filter Dropdowns */}
          <div className={styles["filter-dropdowns"]}>
            <div className={styles["dropdown"]}>
              <select>
                <option value="">Application Status</option>
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className={styles["dropdown"]}>
              <select>
                <option value="">Academic Qualification</option>
                <option value="SPM">SPM</option>
                <option value="STPM">STPM</option>
                <option value="Foundation">Foundation</option>
              </select>
            </div>
            <div className={styles["dropdown"]}>
              <select>
                <option value="">Courses Applied</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.course_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Filter */}
            <div className={styles["reset-filter"]}>
              <a href="#">Reset Filter</a>
            </div>
          </div>
        </div>
      </div>

      {/* Results Message Section */}
      <div className={styles["results-message"]}>
        <p>
          <b>31</b> results found for "<b>Ed</b>"
        </p>
      </div>

      {/* Student Card Section */}
      <div className={styles["student-card"]}>
        {/* Profile Picture Section */}
        <div className={styles["student-profile"]}>
          <div className={styles["cgpa-banner"]}>
            <p>STPM CGPA: 3.94</p>
          </div>
        </div>

        {/* Student Information Section */}
        <div className={styles["information"]}>
          <div className={styles["student-info"]}>
            {/* Ellipsis (Three Dots) */}
            <div
              className={styles["options-menu"]}
              onClick={toggleDropdown}
              ref={ellipsisButtonRef} // Ref for the ellipsis button
            >
              <FontAwesomeIcon icon={faEllipsisH} />
            </div>

            {/* Dropdown Menu */}
            {dropdownVisible && (
              <div className={styles["dropdown-menu"]} ref={dropdownMenuRef}>
                <ul>
                  <li>More Details</li>
                  <li>Review Feedback</li>
                </ul>
              </div>
            )}

            <div className={styles["first-row"]}>
              <h2 className={styles["student-name"]}>Eddison Lee Boon Kiat</h2>
              <div className={styles["application-status"]}>
                <p>Pending</p>
              </div>
              <div className={styles["reminder-count"]}>
                <p>15 Reminders</p>
              </div>
            </div>
          </div>

          <div className={styles["second-row"]}>
            <div className={styles["email"]}>
              <i className="bi bi-envelope contact-icon"></i>
              <p>eddison@gmail.com</p>
            </div>
            <div className={styles["contact-number"]}>
              <i className="bi bi-telephone contact-icon"></i>
              <p>011-19039139</p>
            </div>
          </div>

          <div className={styles["third-row"]}>
            <div className={styles["applied-degree"]}>
              <p className={styles["applied-for"]}>Applied For:</p>
              <p className={styles["degree-name"]}>
                Degree in Business Computing
              </p>
            </div>
            <div className={styles["profile-completion"]}>
              <p className={styles["profile-bar-title"]}>Profile Completion</p>
              <div className={styles["progress-container"]}>
                <div className={styles["progress-bar"]}>
                  <div
                    className={styles["progress-fill"]}
                    style={{ width: "90%" }}
                  ></div>
                </div>
                <span className={styles["progress-percentage"]}>90%</span>
              </div>
            </div>
          </div>

          <hr className={styles["separator"]} />

          <div className={styles["fourth-row"]}>
            <div className={styles["awards-curriculum"]}></div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applicant;
