import React from 'react';
import HeadNavBar from '../../Components/AdminComp/headNavBar';
import SideNavBar from '../../Components/AdminComp/sideNavBar';
import AdminEditFeaturedContent from '../../Components/AdminComp/AdminEditFeaturedContent';
import '../../css/AdminStyles/PageAdminDash.css';

const AdminEditFeatured = () => {
  return (
    <div className='PageContainer'>
      <div className='SideNavContainer'>
        <SideNavBar />
      </div>

      <div className='HeadNavBarContainer'>
        <HeadNavBar />
        <div className="content-area">
          <AdminEditFeaturedContent />
        </div>
      </div>
    </div>
  );
};

export default AdminEditFeatured;