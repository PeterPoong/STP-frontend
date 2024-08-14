import React from 'react';
import "../../css/StudentPortalCss/StudentPortalWidget.css";

const WidgetAccepted = ({ isOpen, onClose, date = "February 20th, 2024", feedbacks = ["Your application has been approved by the institution."] }) => {
    if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="content-wrapper">
          <div className="text-content">
            <h1>Your application has been accepted.</h1>
            <p>Congratulations, we knew you could do it!</p>
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
              <span className="feedback-label">Feedbacks</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WidgetAccepted;