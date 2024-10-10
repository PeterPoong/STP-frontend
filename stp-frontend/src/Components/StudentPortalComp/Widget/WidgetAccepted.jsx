import React from 'react';
import "../../../css/StudentPortalStyles/StudentPortalWidget.css";

const WidgetAccepted = ({ isOpen, onClose, date , feedbacks }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
      <div className=" trophy-image"></div>
        <button className="close-button" onClick={onClose}>×</button>
        <div className='position-absolute  text-center'>
        <h1 className=' display-6 fw-bolder mt-4  '>Your application has been accepted.</h1>
        </div>
        
        
        <p className='fw-normal wa-margin'>Congratulations, we knew you could do it!</p>
        <div className="date-container">
          <span className="date-icon">🕒</span>
          <span>Received on {date}</span>
        </div>
        
        <div className="feedback-container">
          <div className="feedback-scroll" >
            {feedbacks.map((feedback, index) => (
              <p key={index}>{feedback}</p>
            ))}
          </div>
          <span className="feedback-label">Feedbacks</span>
        </div>
        
      </div>
    </div>
  );
};

export default WidgetAccepted;