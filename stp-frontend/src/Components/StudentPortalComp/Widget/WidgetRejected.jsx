import React from 'react';
import "../../../css/StudentPortalStyles/StudentPortalWidget.css";

const WidgetRejected = ({ isOpen, onClose, date , feedbacks  }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content-rejected">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="trophy-image-rejected"></div>
        <div className='position-absolute  text-center'>
        <h1 className='display-6 fw-bolder'>Your application has been rejected.</h1>
        </div>
        <div className='w-50'>
        <p className='fw-normal wa-margin-reject'>We understand this is disappointing news, but please don't give up-your efforts are valued.</p>
        </div>
        <div className="date-container">
          <span className="date-icon">🕒</span>
          <span>Received on {date}</span>
        </div>
        <div className="feedback-container">
          <div className="feedback-scroll">
            {feedbacks.map((feedback, index) => (
              <p key={index}>{feedback}</p>
            ))}
          </div>
          <span className="feedback-label-rejected">Feedbacks</span>
        </div>
        
      </div>
    </div>
  );
};

export default WidgetRejected;