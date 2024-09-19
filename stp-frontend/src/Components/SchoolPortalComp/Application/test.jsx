import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import styles from "../../../css/SchoolPortalStyle/test.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import defaultProfilePic from "../../../assets/SchoolPortalAssets/student1.jpg";

const Applicant = () => {
  const token = sessionStorage.getItem("token");
  const [courses, setCourses] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const dropdownMenuRef = useRef(null);
  const ellipsisButtonRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch courses
        const coursesResponse = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/school/dropDownCourseList`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!coursesResponse.ok) {
          const errorText = await coursesResponse.text();
          console.error("Courses API Error Response:", errorText);
          const errordata = await coursesResponse.json();
          throw new Error(`HTTP error! status: ${errordata}`);
        }

        const coursesData = await coursesResponse.json();
        setCourses(coursesData.data);

        // Fetch applicants
        const applicantsResponse = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/school/applicantDetailInfo`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}), // Add any required body data here
          }
        );

        if (!applicantsResponse.ok) {
          const errorText = await applicantsResponse.text();
          console.error("Applicants API Error Response:", errorText);
          throw new Error(`HTTP error! status: ${applicantsResponse.status}`);
        }

        const applicantsData = await applicantsResponse.json();
        setApplicants(applicantsData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible((prevVisible) => !prevVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target) &&
        ellipsisButtonRef.current &&
        !ellipsisButtonRef.current.contains(event.target)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getApplicationStatus = (statusId) => {
    const statusMap = {
      0: "Disable",
      1: "Active",
      2: "Pending",
      3: "Rejected",
      4: "Accepted",
    };
    return statusMap[statusId] || "Unknown";
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
                    <option value="Active">Active</option>
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
              <b>{applicants.length}</b> results found
            </p>
          </div>
        </div>
      </div>

      {applicants.map((applicant) => (
        <div key={applicant.id} className="row">
          <div className="col-12">
            <div
              className={`${styles["student-card"]} d-flex flex-column flex-md-row`}
            >
              <div
                className={`${styles["student-profile-container"]} mb-3 mb-md-0`}
              >
                <img
                  src={
                    applicant.profile_pic
                      ? `${import.meta.env.VITE_BASE_URL}storage/${
                          applicant.profile_pic
                        }`
                      : defaultProfilePic
                  }
                  alt={`${applicant.student_name}'s profile`}
                  className={styles["student-profile-image"]}
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = defaultProfilePic;
                  }}
                />
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
                      {`${applicant.student_name}`}
                    </h2>
                    <div className={styles["application-status"]}>
                      <p>{getApplicationStatus(applicant.form_status)}</p>
                    </div>
                  </div>
                </div>
                <div className={`${styles["second-row"]} flex-wrap`}>
                  <div className={styles["email"]}>
                    <i className="bi bi-envelope contact-icon"></i>
                    <p>{applicant.email}</p>
                  </div>
                  <div className={styles["contact-number"]}>
                    <i className="bi bi-telephone contact-icon"></i>
                    <p>
                      {applicant.country_code}
                      {applicant.contact_number}
                    </p>
                  </div>
                </div>
                <div
                  className={`${styles["third-row"]} flex-column flex-md-row`}
                >
                  <div className={styles["applied-degree"]}>
                    <p className={styles["applied-for"]}>Applied For:</p>
                    <p className={styles["degree-name"]}>
                      {applicant.course_name}
                    </p>
                  </div>
                </div>
                <hr className={styles["separator"]} />
                <div
                  className={`${styles["fourth-row"]} flex-column flex-md-row`}
                >
                  <div
                    className={`${styles["awards-curriculum"]} mb-3 mb-md-0`}
                  >
                    <div className={styles["awards"]}>
                      <p className={styles["awards-number"]}>
                        {applicant.award_count}
                      </p>
                      <p className={styles["awards-label"]}>Major Awards Won</p>
                    </div>
                    <div className={styles["curriculum"]}>
                      <p className={styles["curriculum-number"]}>
                        {applicant.cocurriculum_count}
                      </p>
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
      ))}
    </div>
  );
};

export default Applicant;
