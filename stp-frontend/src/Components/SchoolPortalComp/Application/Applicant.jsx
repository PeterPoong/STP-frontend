import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../../../css/SchoolPortalStyle/Applicant.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import defaultProfilePic from "../../../assets/SchoolPortalAssets/student1.png";
import WarningPopup from "./WarningPopUp";
import StudentDetailView from "./StudentDetailView";

const Applicant = () => {
  const token = sessionStorage.getItem("token");
  const [courses, setCourses] = useState([]);
  const [courseQualification, setCourseQualification] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [qualificationFilter, setQualificationFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [courseMapping, setCourseMapping] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [warningType, setWarningType] = useState(null);
  const [warningStage, setWarningStage] = useState(1);
  const [applicantToProcess, setApplicantToProcess] = useState(null);
  const [loading, setLoading] = useState("");

  const getApplicantList = async (FormData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/school/applicantDetailInfo`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(FormData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Applicants API Error Response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("data", data.data);

      setApplicants(data.data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

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
        throw new Error(`HTTP error! status: ${coursesResponse.status}`);
      }

      const coursesData = await coursesResponse.json();
      setCourses(coursesData.data);

      // Create course mapping
      const courseMappingObj = {};
      coursesData.data.forEach((course) => {
        courseMappingObj[course.course_name.toLowerCase()] = {
          id: course.id,
          qualificationId: course.qualification_id,
        };
      });
      setCourseMapping(courseMappingObj);

      // Fetch applicants
      // const applicantsResponse = await fetch(
      //   `${import.meta.env.VITE_BASE_URL}api/school/applicantDetailInfo`,
      //   {
      //     method: "POST",
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({}),
      //   }
      // );

      // if (!applicantsResponse.ok) {
      //   const errorText = await applicantsResponse.text();
      //   console.error("Applicants API Error Response:", errorText);
      //   throw new Error(`HTTP error! status: ${applicantsResponse.status}`);
      // }

      // const applicantsData = await applicantsResponse.json();
      // setApplicants(applicantsData.data);
      getApplicantList();

      // Fetch course categories
      const qualificationResponse = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/student/qualificationFilterList`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!qualificationResponse.ok) {
        const errorText = await qualificationResponse.text();
        console.error("Categories API Error Response:", errorText);
        throw new Error(`HTTP error! status: ${qualificationResponse.status}`);
      }

      const qualificationData = await qualificationResponse.json();
      setCourseQualification(qualificationData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const formData = {
      search: searchTerm,
      courses_id: courseFilter,
      form_status: statusFilter,
      qualification_id: qualificationFilter,
    };
    console.log("formdata", formData);
    getApplicantList(formData);
    // const filteredResults = applicants.filter((applicant) => {
    //   const nameMatch = applicant.student_name
    //     .toLowerCase()
    //     .includes(searchTerm.toLowerCase());
    //   const statusMatch =
    //     statusFilter === "" || applicant.form_status === statusFilter;

    //   const courseInfo = courseMapping[applicant.course_name.toLowerCase()];
    //   const categoryMatch =
    //     qualificationFilter === "" ||
    //     (courseInfo &&
    //       courseInfo.qualificationId === parseInt(qualificationFilter));
    //   const courseMatch =
    //     courseFilter === "" ||
    //     (courseInfo && courseInfo.id === parseInt(courseFilter));

    //   return nameMatch && statusMatch && categoryMatch && courseMatch;
    // });
    // setFilteredApplicants(filteredResults);
  }, [searchTerm, statusFilter, qualificationFilter, courseFilter]);

  const toggleDropdown = (applicantId) => {
    setDropdownVisible((prev) => ({
      ...prev,
      [applicantId]: !prev[applicantId],
    }));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleQualificationFilter = (e) => {
    setQualificationFilter(e.target.value);
  };

  const handleCourseFilter = (e) => {
    setCourseFilter(e.target.value);
  };

  const resetFilters = (e) => {
    e.preventDefault();
    setSearchTerm("");
    setStatusFilter("");
    setQualificationFilter("");
    setCourseFilter("");
  };

  const getStatusClassName = (status) => {
    switch (status) {
      case "Accepted":
        return styles["status-accepted"];
      case "Rejected":
        return styles["status-rejected"];
      case "Pending":
      default:
        return styles["status-pending"];
    }
  };

  const handleBackToList = () => {
    setSelectedStudent(null);
    setSelectedAction(null);
    setWarningType(null);
  };

  const StatusMessage = ({ status }) => {
    const isAccepted = status === "Accepted";
    return (
      <div
        className={`${styles["status-message"]} ${
          isAccepted ? styles["accepted"] : styles["rejected"]
        }`}
      >
        <FontAwesomeIcon
          icon={isAccepted ? faCheck : faTimes}
          className={styles["status-icon"]}
        />
        <span>
          {isAccepted
            ? "You have accepted this applicant."
            : "You have rejected this applicant."}
        </span>
      </div>
    );
  };

  const handleOptionClick = (applicant, action) => {
    setSelectedStudent(applicant);
    setSelectedAction(action);
    setDropdownVisible({});
  };

  const handleActionClick = (applicant, type) => {
    setApplicantToProcess(applicant);
    setWarningType(type);
    setWarningStage(1);
    setShowWarning(true);
  };

  const handleWarningConfirm = () => {
    setWarningStage(2);
  };

  const handleWarningCancel = () => {
    setShowWarning(false);
    setApplicantToProcess(null);
    setWarningType(null);
    setWarningStage(1);
  };

  const handleWarningYes = () => {
    setShowWarning(false);
    handleOptionClick(applicantToProcess, "details");
  };

  const handleWarningNo = () => {
    setShowWarning(false);
    handleOptionClick(applicantToProcess, "feedback");
  };
  // Callback to handle successful action
  const handleActionSuccess = () => {
    // Navigate back to the applicant list
    fetchData(); // Refresh the applicaFnts list
    handleBackToList();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (selectedStudent) {
    return (
      <StudentDetailView
        key={selectedStudent.id} // 2. Add key prop
        student={selectedStudent}
        viewAction="details"
        acceptRejectAction={warningType} // 'accept' or 'reject'
        onBack={handleBackToList}
        onActionSuccess={handleActionSuccess} // Pass the callback
      />
    );
  }

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
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <i className={styles["search-icon"]}></i>
              </div>
              <div className={`${styles["filter-dropdowns"]} d-flex flex-wrap`}>
                <div className={`${styles["dropdown"]} mb-2 mb-md-0 me-md-2`}>
                  <select
                    className="form-select"
                    value={statusFilter}
                    onChange={handleStatusFilter}
                  >
                    <option value="">All Application Status</option>
                    <option value="2">Pending</option>
                    <option value="4">Accepted</option>
                    <option value="3">Rejected</option>
                  </select>
                </div>
                <div className={`${styles["dropdown"]} mb-2 mb-md-0 me-md-2`}>
                  <select
                    className="form-select"
                    value={qualificationFilter}
                    onChange={handleQualificationFilter}
                  >
                    <option value="">All Course Qualification</option>
                    {courseQualification.map((qualification) => (
                      <option key={qualification.id} value={qualification.id}>
                        {qualification.qualification_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={`${styles["dropdown"]} mb-2 mb-md-0 me-md-2`}>
                  <select
                    className="form-select"
                    value={courseFilter}
                    onChange={handleCourseFilter}
                  >
                    <option value="">All Courses Applied</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.course_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles["reset-filter"]}>
                  <a href="#" onClick={resetFilters}>
                    Reset Filter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className={styles["results-message"]}>
            {filteredApplicants.length > 0 ? (
              <p>
                <b>{filteredApplicants.length}</b> results found
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            ) : (
              <p>No results found {searchTerm && ` for "${searchTerm}"`}</p>
            )}
          </div>
        </div>
      </div>

      {applicants.length > 0 ? (
        applicants.map((applicant) => (
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
                      e.target.onerror = null;
                      e.target.src = defaultProfilePic;
                    }}
                  />
                </div>

                <div className={styles["information"]}>
                  <div className={styles["student-info"]}>
                    <div
                      className={styles["options-menu"]}
                      onClick={() => toggleDropdown(applicant.id)}
                    >
                      <FontAwesomeIcon icon={faEllipsisH} />
                    </div>
                    {dropdownVisible[applicant.id] && (
                      <div className={styles["dropdown-menu"]}>
                        <ul>
                          <li
                            onClick={() =>
                              handleOptionClick(applicant, "details")
                            }
                          >
                            More Details
                          </li>
                          <li
                            onClick={() =>
                              handleOptionClick(applicant, "feedback")
                            }
                          >
                            Review Feedback
                          </li>
                        </ul>
                      </div>
                    )}
                    <div className={`${styles["first-row"]} flex-wrap`}>
                      <h2 className={styles["student-name"]}>
                        {`${applicant.student_name}`}
                      </h2>
                      <div
                        className={`${
                          styles["application-status"]
                        } ${getStatusClassName(applicant.form_status)}`}
                      >
                        <p>{applicant.form_status}</p>
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
                        <p className={styles["awards-label"]}>
                          Major Awards Won
                        </p>
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
                    <div className={styles["reject-accept"]}>
                      {showWarning && (
                        <WarningPopup
                          type={warningType}
                          stage={warningStage}
                          onConfirm={handleWarningConfirm}
                          onCancel={handleWarningCancel}
                          onYes={handleWarningYes}
                          onNo={handleWarningNo}
                        />
                      )}
                      {applicant.form_status === "Pending" ? (
                        <>
                          <button
                            className={`btn ${styles["custom-btn"]} ${styles["custom-btn-accept"]} me-2`}
                            onClick={() =>
                              handleActionClick(applicant, "accept")
                            }
                          >
                            Accept
                          </button>
                          <button
                            className={`btn ${styles["custom-btn"]} ${styles["custom-btn-reject"]}`}
                            onClick={() =>
                              handleActionClick(applicant, "reject")
                            }
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <StatusMessage status={applicant.form_status} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="row">
          <div className="col-12">
            <div className={styles["no-results-message"]}>
              <p>
                No matching applicants found. Please try different search
                criteria or reset the filters.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applicant;
