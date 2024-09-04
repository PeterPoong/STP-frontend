import React from 'react';
import "../../css/StudentPortalStyles/StudentPortalWidget.css";

const WidgetRejected = ({ isOpen, onClose, date , feedbacks  }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content-rejected">
        <button className="close-button" onClick={onClose}>×</button>
        <h1 className='display-6 fw-bolder'>Your application has been rejected.</h1>
        <p className='fw-normal'>We understand this is disappointing news, but please don't give up-your efforts are valued.</p>
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
        <div className="trophy-image"></div>
      </div>
    </div>
  );
};

export default WidgetRejected;