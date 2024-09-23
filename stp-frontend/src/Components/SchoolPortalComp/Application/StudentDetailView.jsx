import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "../../../css/SchoolPortalStyle/Applicant.module.css";
import defaultProfilePic from "../../../assets/SchoolPortalAssets/student1.png";

const StudentDetailView = ({ student, action, onBack }) => {
  return (
    <div className={styles["student-details"]}>
      <button onClick={onBack} className={styles["back-button"]}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back to List
      </button>
      <h2>{action === "details" ? "Student Details" : "Review Feedback"}</h2>
      <div className={styles["student-info"]}>
        <img
          src={
            student.profile_pic
              ? `${import.meta.env.VITE_BASE_URL}storage/${student.profile_pic}`
              : defaultProfilePic
          }
          alt={`${student.student_name}'s profile`}
          className={styles["student-profile-image"]}
        />
        <p><strong>Name:</strong> {student.student_name}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Course:</strong> {student.course_name}</p>
        <p><strong>Status:</strong> {student.form_status}</p>
        <p><strong>Contact:</strong> {student.country_code}{student.contact_number}</p>
        <p><strong>Awards Won:</strong> {student.award_count}</p>
        <p><strong>Co-curricular Activities:</strong> {student.cocurriculum_count}</p>
      </div>
      {action === "feedback" && (
        <div className={styles["feedback-section"]}>
          <h3>Feedback</h3>
          <p>Feedback functionality to be implemented.</p>
        </div>
      )}
    </div>
  );
};

export default StudentDetailView;