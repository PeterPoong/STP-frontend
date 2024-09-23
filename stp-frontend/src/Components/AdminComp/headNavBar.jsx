import React, { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from 'react-router-dom';
import '../../css/AdminStyles/AdminHeadNav.css';
import { FaArrowCircleRight } from 'react-icons/fa';


const HeadNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState(null);
  
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
      default:
        return 'Dashboard'; // Default title if path doesn't match any case
    }
  };

  // Fetch user data from sessionStorage on component mount
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      setUserData(user);
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    sessionStorage.removeItem('token'); // Clear token
    sessionStorage.removeItem('user');  // Clear user data
    navigate('/adminLogin'); // Redirect to login page
  };

  return (
    <header className="head-nav-bar">
      <div className="left-side">
        <h1>{getTitle(location.pathname)}</h1>
      </div>
      <div className="right-side">
        {userData ? (
          <div className="user-info">
            <span>Welcome {userData.name}</span>
            <div className="profile-info">
              <span>{userData.user_role === 1 ? 'Admin' : 'User'}</span>
              <i className="dropdown-arrow"></i>
            </div>
          </div>
        ) : (
          <span>Loading...</span>
        )}
          <Button className="logout-button" variant="dark" onClick={handleLogout}>
          Logout< FaArrowCircleRight className='ms-2'/> 
        </Button>
      </div>
    </header>
  );
};

export default HeadNavBar;
