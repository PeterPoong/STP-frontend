import React, { useState } from 'react';
import "../../../css/StudentPortalStyles/StudentPortalWidget.css";

const WidgetPending = ({ isOpen, onClose, date, feedbacks, formID }) => {
  const [isSending, setIsSending] = useState(false);
  const [reminderSent, setReminderSent] = useState(false);

  if (!isOpen) return null;

  /*sendReminder api */
  const sendReminder = async () => {
    //console.log('Sending reminder for formID:', formID);
    setIsSending(true);
    try {
      const token = sessionStorage.getItem("token") || localStorage.getItem("token");
      if (!token) {
        console.error('No authentication token found');
        throw new Error('No authentication token found');
      }
      //console.log('Sending POST request to sendReminder API...');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/sendReminder`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formID: formID }),
      });
      //console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      //console.log('API response:', result);
      if (result.success) {
        //console.log('Reminder sent successfully');
        setReminderSent(true);
      } else {
        console.error('Failed to send reminder:', result.message);
      }
    } catch (error) {
      console.error('Error sending reminder:', error);
    } finally {
      setIsSending(false);
      //console.log('Reminder sending process completed');
    }
  };
  /*end */

  return (
    <div className="popup-overlay">
      <div className="popup-content-pending">
        <div className="trophy-image-pending"></div>
        <button className="close-button" onClick={onClose}>×</button>
        <div className='position-absolute  text-center'><h1 className='display-6 fw-bolder'>Your application is pending.</h1></div>

        <p className='fw-normal mb-5 mt-5'>We hope you got accepted!</p>
        <div className="date-container">
          <span className="date-icon">🕒</span>
          <span>Applied on {date}</span>
        </div>
        <div className="feedback-container">
          <div className="feedback-scroll">
            {Array.isArray(feedbacks) && feedbacks.length > 0 ? (
              feedbacks.map((feedback, index) => (
                <p key={index}>{feedback}</p>
              ))
            ) : (
              <p>Your application is currently on hold pending further review. To proceed, we kindly request that you submit the necessary documentation, such as proof of qualifications or additional references. </p>
            )}
            <button
              className="buttonpending"
              onClick={sendReminder}
              disabled={isSending || reminderSent}
            >
              {isSending ? 'Sending...' : reminderSent ? 'Reminder Sent' : 'Send a reminder'}
            </button>
          </div>
          <span className="feedback-label-pending">Feedbacks</span>
        </div>

      </div>
    </div>
  );
};

export default WidgetPending;