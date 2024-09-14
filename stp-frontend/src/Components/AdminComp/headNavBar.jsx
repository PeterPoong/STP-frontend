import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../css/AdminStyles/AdminHeadNav.css';

const HeadNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Function to get the title based on the path
  const getTitle = (pathname) => {
    switch (pathname) {
      case '/adminDashboard':
        return 'Dashboard';

      case '/adminSchool':
        return 'School';

      case '/adminBanner':
        return 'Banner';

      case '/adminStudent':
        return 'Student';

      case '/adminCourses':
        return 'Courses';

      case '/adminCategory':
        return 'Category';

      case '/adminSubject':
        return 'Subject';

      case '/adminList':
        return 'Admin';

      case '/adminApplicant':
        return 'Applicant';

      case '/adminPackage':
        return 'Package';

      case '/adminData':
        return 'Data';
      // Add more cases as needed
      default:
        return 'Dashboard'; // Default title if path doesn't match any case
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // For localStorage
  // sessionStorage.removeItem('token'); // For sessionStorage
  // document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'; // For cookies
    navigate('/adminLogin');
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
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default HeadNavBar;
