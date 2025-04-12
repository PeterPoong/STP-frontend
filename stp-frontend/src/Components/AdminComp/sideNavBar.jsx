import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt, faAd, faSchool, faUserGraduate, faBullhorn, 
  faBook, faThList, faClipboardList, faUserShield, faFileAlt, 
  faDatabase, faBars, faClipboardQuestion, faBell, faHeart,
  faFileCircleQuestion, faIdCard
} from '@fortawesome/free-solid-svg-icons';
import { NavLink, useLocation } from 'react-router-dom';
import '../../css/AdminStyles/AdminSideNav.css';
import logo from '../../assets/AdminAssets/Images/logo.png';

const SideNavBar = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setCollapsed(false);
      } else {
        setCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call on mount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Find the active nav link
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) {
      // Scroll the active link into view with a slight delay to ensure proper positioning
      setTimeout(() => {
        activeLink.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
    }
  }, [location.pathname]); // This will run whenever the route changes

  return (
    <>
      {/* Hamburger button - always render but control visibility with CSS */}
      <div className="collapse-btn-container">
        <button className="collapse-btn" onClick={toggleCollapse}>
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`SidebarContainer ${collapsed ? 'collapsed' : ''}`}>
        <div className='LogoContainer'>
          <img src={logo} alt='Logo' className="logo-img" />
        </div>

        <Nav className={`flex-column ${collapsed && isMobile ? 'd-none' : 'd-block'}`}>
          <NavLink 
            to='/adminSchool' 
            className={`nav-link ${
              location.pathname === '/adminSchool' || 
              location.pathname === '/adminAddSchool' || 
              location.pathname === '/adminEditSchool' 
              ? 'active' 
              : ''
            }`}
          >
            <FontAwesomeIcon icon={faSchool} fixedWidth />
            <span className="link-text">School</span>
          </NavLink>

          <NavLink 
            to='/adminStudent' 
            className={`nav-link ${
              location.pathname === '/adminStudent' || 
              location.pathname === '/adminAddStudent' || 
              location.pathname === '/adminEditStudent'
              ? 'active' 
              : ''
            }`}
          >
            <FontAwesomeIcon icon={faUserGraduate} fixedWidth />
            <span className="link-text">Student</span>
          </NavLink>

          <NavLink 
            to='/adminCourses' 
            className={`nav-link ${
              location.pathname === '/adminCourses' || 
              location.pathname === '/adminAddCourse' || 
              location.pathname === '/adminEditCourse'
              ? 'active' 
              : ''
            }`}
          >
            <FontAwesomeIcon icon={faBook} fixedWidth />
            <span className="link-text">Courses</span>
          </NavLink>

          <NavLink 
            to='/adminCategory' 
            className={`nav-link ${
              location.pathname === '/adminCategory' || 
              location.pathname === '/adminAddCategory' || 
              location.pathname === '/adminEditCategory'
              ? 'active' 
              : ''
            }`}
          >
            <FontAwesomeIcon icon={faThList} fixedWidth />
            <span className="link-text">Category</span>
          </NavLink>

          <NavLink 
            to='/adminSubject' 
            className={`nav-link ${
              location.pathname === '/adminSubject' || 
              location.pathname === '/adminAddSubject' || 
              location.pathname === '/adminEditSubject'
              ? 'active' 
              : ''
            }`}
          >
            <FontAwesomeIcon icon={faClipboardList} fixedWidth />
            <span className="link-text">Subject</span>
          </NavLink>

          <NavLink 
            to='/adminList' 
            className={`nav-link ${
              location.pathname === '/adminList' || 
              location.pathname === '/adminAddList' || 
              location.pathname === '/adminEditList'
              ? 'active' 
              : ''
            }`}
          >
            <FontAwesomeIcon icon={faUserShield} fixedWidth />
            <span className="link-text">Admin</span>
          </NavLink>

          <NavLink 
            to='/adminApplicant' 
            className={`nav-link ${
              location.pathname === '/adminApplicant' || 
              location.pathname === '/adminApplicantProfile' || 
              location.pathname === '/adminEditApplicant'
              ? 'active' 
              : ''
            }`}
          >
            <FontAwesomeIcon icon={faFileAlt} fixedWidth />
            <span className="link-text">Applicants</span>
          </NavLink>

          <NavLink 
            to='/adminBanner' 
            className={`nav-link ${
              location.pathname === '/adminBanner' || 
              location.pathname === '/adminAddbanner' || 
              location.pathname === '/adminEditBanner'
              ? 'active' 
              : ''
            }`}
          >
            <FontAwesomeIcon icon={faAd} fixedWidth />
            <span className="link-text">Banner</span>
          </NavLink>

          <NavLink 
            to='/adminPackage' 
            className={`nav-link ${
              location.pathname === '/adminPackage' || 
              location.pathname === '/adminAddPackage' || 
              location.pathname === '/adminEditPackage'
              ? 'active' 
              : ''
            }`}
          >
            <FontAwesomeIcon icon={faBullhorn} fixedWidth />
            <span className="link-text">Package</span>
          </NavLink>
          
          <NavLink 
            to='/adminData' 
            className={`nav-link ${
              location.pathname === '/adminData' || 
              location.pathname === '/adminAddData' || 
              location.pathname === '/adminEditData'
              ? 'active' 
              : ''
            }`}
          >
            <FontAwesomeIcon icon={faDatabase} fixedWidth />
            <span className="link-text">Data</span>
          </NavLink>

          <NavLink 
            to='/adminEnquiry' 
            className={`nav-link ${
              location.pathname === '/adminEnquiry' || 
              location.pathname === '/adminReplyEnquiry'
              ? 'active' 
              : ''
            }`}
          >
            <FontAwesomeIcon icon={faClipboardQuestion} fixedWidth />
            <span className="link-text">Enquiry</span>
          </NavLink>

          <NavLink 
            to='/adminFeatured' 
            className={`nav-link ${
              location.pathname === '/adminFeatured' || 
              location.pathname === '/adminAddFeatured' || 
              location.pathname === '/adminEditFeatured'
              ? 'active' 
              : ''
            }`}
          >
            <FontAwesomeIcon icon={faBell} fixedWidth />
            <span className="link-text">Featured</span>
          </NavLink>

          <NavLink 
            to='/adminInterest' 
            className={`nav-link ${
              location.pathname === '/adminInterest' || 
              location.pathname === '/adminAddInterest' || 
              location.pathname === '/adminEditInterest'
              ? 'active' 
              : ''
            }`}
          >
            <FontAwesomeIcon icon={faHeart} fixedWidth />
            <span className="link-text">Interest</span>
          </NavLink>

          <NavLink 
            to='/adminQuestion' 
            className={`nav-link ${
              location.pathname === '/adminQuestion' || 
              location.pathname === '/adminAddQuestion' || 
              location.pathname === '/adminEditQuestion'
              ? 'active' 
              : ''
            }`}
          >
            <FontAwesomeIcon icon={faFileCircleQuestion} fixedWidth />
            <span className="link-text">Question List</span>
          </NavLink>

          <NavLink 
            to='/adminRiasec' 
            className={`nav-link ${
              location.pathname === '/adminRiasec' || 
              location.pathname === '/adminAddRiasec' || 
              location.pathname === '/adminEditRiasec'
              ? 'active' 
              : ''
            }`}
          >
            <FontAwesomeIcon icon={faIdCard} fixedWidth />
            <span className="link-text">RIASEC</span>
          </NavLink>
        </Nav>
      </div>

      {/* Overlay */}
      {!collapsed && isMobile && (
        <div className="sidebar-overlay" onClick={toggleCollapse} />
      )}
    </>
  );
};

export default SideNavBar;
