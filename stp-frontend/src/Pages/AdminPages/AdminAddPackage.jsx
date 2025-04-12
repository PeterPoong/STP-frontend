// adminDashboard.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HeadNavBar from '../../Components/AdminComp/headNavBar';
import SideNavBar from '../../Components/AdminComp/sideNavBar';
import AdminDashContent from '../../Components/AdminComp/AdminDashContent';

//Other Page Content(Testing)
import AdminAddSchoolContent from '../../Components/AdminComp/AdminAddSchoolContent';
import AdminSchoolContent from '../../Components/AdminComp/AdminSchoolContent';
import AdminCategoryContent from '../../Components/AdminComp/AdminCategoryContent';
import AdminCoursesContent from '../../Components/AdminComp/AdminCoursesContent';
import AdminSubjectContent from '../../Components/AdminComp/AdminSubjectContent';
import AdminStudentContent from '../../Components/AdminComp/AdminStudentContent';
import AdminAddPackageContent from '../../Components/AdminComp/AdminAddPackageContent';
import '../../css/AdminStyles/PageAdminDash.css';

const AdminAddPackage = () => {
  return (
    <div className='PageContainer'>
      <div className='SideNavContainer'>
        <SideNavBar />
      </div>

      <div className='HeadNavBarContainer'>
        <HeadNavBar />
        <div className="content-area">
          <AdminAddPackageContent />
        </div>
      </div>
    </div>
  );
};

export default AdminAddPackage;
