// adminDashboard.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HeadNavBar from '../../Components/AdminComp/headNavBar';
import SideNavBar from '../../Components/AdminComp/sideNavBar';
import AdminDashContent from '../../Components/AdminComp/AdminDashContent';

//Other Page Content(Testing)
import AdminQuestionContent from '../../Components/AdminComp/AdminQuestionContent';
import AdminEnquiryContent from '../../Components/AdminComp/AdminEnquiryContent';
import AdminCategoryContent from '../../Components/AdminComp/AdminCategoryContent';
import AdminCoursesContent from '../../Components/AdminComp/AdminCoursesContent';
import AdminSubjectContent from '../../Components/AdminComp/AdminSubjectContent';
import AdminStudentContent from '../../Components/AdminComp/AdminStudentContent';
import '../../css/AdminStyles/PageAdminDash.css';

const AdminQuestion = () => {
  return (
    <div className='PageContainer'>
      <div className='SideNavContainer'>
        <SideNavBar />
      </div>

      <div className='HeadNavBarContainer'>
        <HeadNavBar />
        <div className="content-area">
          <AdminQuestionContent />
        </div>
      </div>
    </div>
  );
};

export default AdminQuestion;
