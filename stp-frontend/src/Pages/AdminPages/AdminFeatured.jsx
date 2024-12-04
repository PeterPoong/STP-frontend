// adminDashboard.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HeadNavBar from '../../Components/AdminComp/headNavBar';
import SideNavBar from '../../Components/AdminComp/sideNavBar';
import AdminDashContent from '../../Components/AdminComp/AdminDashContent';

//Other Page Content(Testing)
import AdminSchoolContent from '../../Components/AdminComp/AdminSchoolContent';
import AdminApplicantContent from '../../Components/AdminComp/AdminApplicantContent';
import AdminCategoryContent from '../../Components/AdminComp/AdminCategoryContent';
import AdminCoursesContent from '../../Components/AdminComp/AdminCoursesContent';
import AdminSubjectContent from '../../Components/AdminComp/AdminSubjectContent';
import AdminStudentContent from '../../Components/AdminComp/AdminStudentContent';
import AdminFeaturedContent from '../../Components/AdminComp/AdminFeaturedContent';
import '../../css/AdminStyles/PageAdminDash.css';

const AdminFeatured = () => {
  return (
    <div className='PageContainer'>
      <div className='SideNavContainer'>
        <SideNavBar />
      </div>

      <div className='HeadNavBarContainer'>
        <HeadNavBar />
        <div>
          <AdminFeaturedContent />
        </div>
      </div>
    </div>
  );
};

export default AdminFeatured;
