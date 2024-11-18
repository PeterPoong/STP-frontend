import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt, faAd, faSchool, faUserGraduate, faBullhorn, 
  faBook, faThList, faClipboardList, faUserShield, faFileAlt, 
  faDatabase, faBars, faClipboardQuestion
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import '../../css/AdminStyles/AdminSideNav.css';
import logo from '../../assets/AdminAssets/Images/logo.png';

const SideNavBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  // Toggle collapse for mobile
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  // Close sidebar on resize if screen is larger than mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && collapsed) {
        setCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [collapsed]);

  return (
    <div className={`SidebarContainer ${collapsed ? 'collapsed' : ''}`}>
      <div className='LogoContainer'>
        <img src={logo} alt='Logo' className="logo-img" />
        <div className="collapse-btn-container d-md-none">
          <button className="collapse-btn" onClick={toggleCollapse}>
            <FontAwesomeIcon icon={faBars} fixedWidth />
          </button>
        </div>
      </div>

      <Nav className={`flex-column ${collapsed ? 'd-none' : 'd-block d-md-block'}`}>
        <NavLink 
          to='/adminSchool' 
          className='nav-link' 
          activeClassName="active"
        >
          <FontAwesomeIcon icon={faSchool} fixedWidth />
          <span className="link-text">School</span>
        </NavLink>

        <NavLink 
          to='/adminStudent' 
          className='nav-link' 
          activeClassName="active"
        >
          <FontAwesomeIcon icon={faUserGraduate} fixedWidth />
          <span className="link-text">Student</span>
        </NavLink>

        <NavLink 
          to='/adminCourses' 
          className='nav-link' 
          activeClassName="active"
        >
          <FontAwesomeIcon icon={faBook} fixedWidth />
          <span className="link-text">Courses</span>
        </NavLink>

        <NavLink 
          to='/adminCategory' 
          className='nav-link' 
          activeClassName="active"
        >
          <FontAwesomeIcon icon={faThList} fixedWidth />
          <span className="link-text">Category</span>
        </NavLink>

        <NavLink 
          to='/adminSubject' 
          className='nav-link' 
          activeClassName="active"
        >
          <FontAwesomeIcon icon={faClipboardList} fixedWidth />
          <span className="link-text">Subject</span>
        </NavLink>

        <NavLink 
          to='/adminList' 
          className='nav-link' 
          activeClassName="active"
        >
          <FontAwesomeIcon icon={faUserShield} fixedWidth />
          <span className="link-text">Admin</span>
        </NavLink>

        <NavLink 
          to='/adminApplicant' 
          className='nav-link' 
          activeClassName="active"
        >
          <FontAwesomeIcon icon={faFileAlt} fixedWidth />
          <span className="link-text">Applicants</span>
        </NavLink>

        <NavLink 
          to='/adminBanner' 
          className='nav-link' 
          activeClassName="active"
        >
          <FontAwesomeIcon icon={faAd} fixedWidth />
          <span className="link-text">Banner</span>
        </NavLink>

        <NavLink 
          to='/adminPackage' 
          className='nav-link' 
          activeClassName="active"
        >
          <FontAwesomeIcon icon={faBullhorn} fixedWidth />
          <span className="link-text">Package</span>
        </NavLink>
        
        <NavLink 
          to='/adminData' 
          className='nav-link' 
          activeClassName="active"
        >
          <FontAwesomeIcon icon={faDatabase} fixedWidth />
          <span className="link-text">Data</span>
        </NavLink>

        <NavLink 
          to='/adminEnquiry' 
          className='nav-link' 
          activeClassName="active"
        >
          <FontAwesomeIcon icon={faClipboardQuestion} fixedWidth />
          <span className="link-text">Enquiry</span>
        </NavLink>
      </Nav>
    </div>
  );
};

export default SideNavBar;
