import React, { useState } from 'react';
import SearchBar from '../../../Components/SchoolPortalComp/Application/SearchBar';
import StudentCard from '../../../Components/SchoolPortalComp/Application/StudentCard';
import "../../../css/SchoolPortalStyle/StudentApplication.css";


const Applicant = () => {
  const [students, setStudents] = useState([
    // Example student data
    {
      name: 'Eddison Lee Boon Kiat',
      email: 'eddison@gmail.com',
      contact: '011-19039139',
      course: 'Degree in Business Computing',
      status: 'Pending',
      cgpa: 'STPM CGPA: 3.94',
      awards: 18,
      activities: 10,
      profileCompletion: 90,
      photo: 'path/to/photo.jpg'
    },
    // Add more student data here
  ]);

  const handleSearch = (query) => {
    // Implement search logic
  };

  const handleReset = () => {
    // Implement reset logic
  };

  return (
    <div className="student-management">
      <h1>Manage Your Applicants</h1>
      <SearchBar onSearch={handleSearch} onReset={handleReset} />
      <div className="student-list">
        {students.map((student, index) => (
          <StudentCard key={index} student={student} />
        ))}
      </div>
    </div>
  );
};

export default Applicant;
