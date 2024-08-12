// headNavBar.jsx
import React from 'react';
import '../../css/AdminStyles/AdminHeadNav.css';

const HeadNavBar = () => {
  return (
    <header className="head-nav-bar">
      <div className="left-side">
        <h1>Dashboard</h1>
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