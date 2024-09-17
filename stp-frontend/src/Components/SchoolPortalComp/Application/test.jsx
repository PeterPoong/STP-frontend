import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import styles from "../../../css/SchoolPortalStyle/test.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

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
    <div className={`${styles["applicant-container"]} container-fluid`}>
      <div className="row">
        <div className="col-12">
          <div className={styles["applicant-title"]}>
            <h1>Manage Your Applicants</h1>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className={styles["search-filter-container"]}>
            <label className={styles["search-label"]}>Search:</label>
            <div
              className={`${styles["filter-column"]} flex-column flex-md-row`}
            >
              <div className={`${styles["search-bar"]} mb-3 mb-md-0`}>
                <input
                  type="text"
                  placeholder="Search for Students"
                  className="form-control"
                />
                <i className={styles["search-icon"]}></i>
              </div>
              <div className={`${styles["filter-dropdowns"]} d-flex flex-wrap`}>
                <div className={`${styles["dropdown"]} mb-2 mb-md-0 me-md-2`}>
                  <select className="form-select">
                    <option value="">Application Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div className={`${styles["dropdown"]} mb-2 mb-md-0 me-md-2`}>
                  <select className="form-select">
                    <option value="">Academic Qualification</option>
                    <option value="SPM">SPM</option>
                    <option value="STPM">STPM</option>
                    <option value="Foundation">Foundation</option>
                  </select>
                </div>
                <div className={`${styles["dropdown"]} mb-2 mb-md-0 me-md-2`}>
                  <select className="form-select">
                    <option value="">Courses Applied</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.course_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles["reset-filter"]}>
                  <a href="#">Reset Filter</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className={styles["results-message"]}>
            <p>
              <b>31</b> results found for "<b>Ed</b>"
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div
            className={`${styles["student-card"]} d-flex flex-column flex-md-row`}
          >
            <div className={`${styles["student-profile"]} mb-3 mb-md-0`}>
              <div className={styles["cgpa-banner"]}>
                <p>STPM CGPA: 3.94</p>
              </div>
            </div>
            <div className={styles["information"]}>
              <div className={styles["student-info"]}>
                <div
                  className={styles["options-menu"]}
                  onClick={toggleDropdown}
                  ref={ellipsisButtonRef}
                >
                  <FontAwesomeIcon icon={faEllipsisH} />
                </div>
                {dropdownVisible && (
                  <div
                    className={styles["dropdown-menu"]}
                    ref={dropdownMenuRef}
                  >
                    <ul>
                      <li>More Details</li>
                      <li>Review Feedback</li>
                    </ul>
                  </div>
                )}
                <div className={`${styles["first-row"]} flex-wrap`}>
                  <h2 className={styles["student-name"]}>
                    Eddison Lee Boon Kiat
                  </h2>
                  <div className={styles["application-status"]}>
                    <p>Pending</p>
                  </div>
                  <div className={styles["reminder-count"]}>
                    <p>15 Reminders</p>
                  </div>
                </div>
              </div>
              <div className={`${styles["second-row"]} flex-wrap`}>
                <div className={styles["email"]}>
                  <i className="bi bi-envelope contact-icon"></i>
                  <p>eddison@gmail.com</p>
                </div>
                <div className={styles["contact-number"]}>
                  <i className="bi bi-telephone contact-icon"></i>
                  <p>011-19039139</p>
                </div>
              </div>
              <div className={`${styles["third-row"]} flex-column flex-md-row`}>
                <div className={styles["applied-degree"]}>
                  <p className={styles["applied-for"]}>Applied For:</p>
                  <p className={styles["degree-name"]}>
                    Degree in Business Computing
                  </p>
                </div>
                <div className={`${styles["profile-completion"]} mt-3 mt-md-0`}>
                  <p className={styles["profile-bar-title"]}>
                    Profile Completion
                  </p>
                  <div className={styles["progress-container"]}>
                    <div className={`${styles["progress-bar"]} progress`}>
                      <div
                        className={`${styles["progress-fill"]} progress-bar`}
                        style={{ width: "90%" }}
                      ></div>
                    </div>
                    <span className={styles["progress-percentage"]}>90%</span>
                  </div>
                </div>
              </div>
              <hr className={styles["separator"]} />
              <div
                className={`${styles["fourth-row"]} flex-column flex-md-row`}
              >
                <div className={`${styles["awards-curriculum"]} mb-3 mb-md-0`}>
                  <div className={styles["awards"]}>
                    <p className={styles["awards-number"]}>18</p>
                    <p className={styles["awards-label"]}>Major Awards Won</p>
                  </div>
                  <div className={styles["curriculum"]}>
                    <p className={styles["curriculum-number"]}>10</p>
                    <p className={styles["curriculum-label"]}>
                      Active Co-curricular Activities
                    </p>
                  </div>
                </div>
                <div
                  className={`${styles["reject-accept"]} d-flex justify-content-center justify-content-md-end`}
                >
                  <button
                    className={`btn ${styles["custom-btn"]} ${styles["custom-btn-accept"]} me-2`}
                  >
                    Accept
                  </button>
                  <button
                    className={`btn ${styles["custom-btn"]} ${styles["custom-btn-reject"]}`}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applicant;
