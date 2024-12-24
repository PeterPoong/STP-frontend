import React from 'react';
import '../../css/AdminStyles/SkeletonLoader.css'; // Make sure to add this CSS file

function SkeletonLoader() {
  return (
    <div className="skeleton-loader">
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-line"></div>
      <div className="skeleton skeleton-line short"></div>
      <div className="skeleton skeleton-line"></div>
      <div className="skeleton skeleton-line short"></div>
      <div className="skeleton skeleton-line"></div>
      <div className="skeleton skeleton-image"></div>
      <div className="skeleton skeleton-line"></div>
    </div>
  );
}

export default SkeletonLoader;
