import React from 'react';

const StudentCard = ({ student }) => {
  const { name, email, contact, course, status, cgpa, awards, activities, profileCompletion } = student;

  return (
    <div className="student-card">
      <img src={student.photo} alt={name} className="student-photo" />
      <div className="student-info">
        <h3>{name}</h3>
        <p>Email: {email}</p>
        <p>Contact: {contact}</p>
        <p>Applied For: {course}</p>
        <span className={`status ${status.toLowerCase()}`}>{status}</span>
        <div className="profile-completion">
          <span>Profile Completion:</span>
          <progress value={profileCompletion} max="100"></progress>
        </div>
        <div className="awards-activities">
          <span>Major Awards: {awards}</span>
          <span>Co-curricular Activities: {activities}</span>
        </div>
      </div>
      <div className="actions">
        {status === 'Pending' && (
          <>
            <button className="accept-btn">Accept</button>
            <button className="reject-btn">Reject</button>
          </>
        )}
        {status === 'Rejected' && <p>You have rejected this applicant.</p>}
        {status === 'Accepted' && <p>You have accepted this applicant.</p>}
      </div>
    </div>
  );
};

export default StudentCard;
