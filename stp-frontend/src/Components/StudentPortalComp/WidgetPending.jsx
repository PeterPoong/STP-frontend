import React from 'react';
import "../../css/StudentPortalStyles/StudentPortalWidget.css";

const WidgetPending = ({ isOpen, onClose, date , feedbacks }) => {
  if (!isOpen) return null;
  return (
    <div className="popup-overlay">
      <div className="popup-content-pending">
        <button className="close-button" onClick={onClose}>×</button>
        <h1 className='display-6 fw-bolder'>Your application is pending.</h1>
        <p className='fw-normal'>We hope you got accepted!</p>
        <div className="date-container">
          <span className="date-icon">🕒</span>
          <span>Applied on {date}</span>
        </div>
        <div className="feedback-container">
          <div className="feedback-scroll">
            {feedbacks.map((feedback, index) => (
              <p key={index}>{feedback}</p>
            ))}
            <button className="buttonpending">Send a reminder</button>
          </div>
          <span className="feedback-label-pending">Feedbacks</span>
        </div>
        <div className="trophy-image"></div>
      </div>
    </div>
  );
};

export default WidgetPending;