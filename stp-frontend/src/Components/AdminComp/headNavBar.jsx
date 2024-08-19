// headNavBar.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import '../../css/AdminStyles/AdminHeadNav.css';

const HeadNavBar = () => {
  const location = useLocation();

  // Function to get the title based on the path
  const getTitle = (pathname) => {
    switch (pathname) {
      case '/adminDashboard':
        return 'Dashboard';

      case '/adminSchool':
        return 'School';

      case '/adminStudent':
        return 'Student';

      case '/adminCourses':
        return 'Courses';

      case '/adminCategory':
        return 'Category';

      case '/adminSubject':
        return 'Subject';
      // Add more cases as needed
      default:
        return 'Dashboard'; // Default title if path doesn't match any case
    }
  };


  return (
    <header className="head-nav-bar">
      <div className="left-side">
        <h1>{getTitle(location.pathname)}</h1>
      </div>
      <div className="right-side">
        <span>Welcome John Doe</span>
        <div className="profile-info">
          <span>Admin</span>
          <i className="dropdown-arrow"></i>
        </div>
      </div>
    </header>
  );
};

export default HeadNavBar;