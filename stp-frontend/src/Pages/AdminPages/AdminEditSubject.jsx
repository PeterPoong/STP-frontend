// adminDashboard.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HeadNavBar from '../../Components/AdminComp/headNavBar';
import SideNavBar from '../../Components/AdminComp/sideNavBar';
import AdminDashContent from '../../Components/AdminComp/AdminDashContent';

//Other Page Content(Testing)
import AdminAddSchoolContent from '../../Components/AdminComp/AdminAddSchoolContent';
import AdminEditSubjectContent from '../../Components/AdminComp/AdminEditSubjectContent';
import AdminSchoolContent from '../../Components/AdminComp/AdminSchoolContent';
import AdminEditCourseContent from '../../Components/AdminComp/AdminEditCourseContent';
import AdminCategoryContent from '../../Components/AdminComp/AdminCategoryContent';
import AdminCoursesContent from '../../Components/AdminComp/AdminCoursesContent';
import AdminSubjectContent from '../../Components/AdminComp/AdminSubjectContent';
import AdminStudentContent from '../../Components/AdminComp/AdminStudentContent';
import '../../css/AdminStyles/PageAdminDash.css';

const AdminEditSubject = () => {
  return (
    <div className='PageContainer'>
      <div className='SideNavContainer'>
        <SideNavBar />
      </div>

      <div className='HeadNavBarContainer'>
        <HeadNavBar />
        <div className="content-area">
          <AdminEditSubjectContent />
        </div>
      </div>
    </div>
  );
};

export default AdminEditSubject;
