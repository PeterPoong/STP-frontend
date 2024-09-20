import React from 'react';
import styles from "../../../css/SchoolPortalStyle/test.module.css";

const WarningPopup = ({ type, stage, onConfirm, onCancel, onYes, onNo }) => {
  const isAccept = type === 'accept';
  const action = isAccept ? 'accept' : 'reject';

  if (stage === 1) {
    return (
      <div className={styles.warningPopup}>
        <p>Are you sure you want to {action} this applicant?</p>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    );
  } else {
    return (
      <div className={styles.warningPopup}>
        <p>You are about to {action} this applicant. Would you like to review the student's detail before {action}ing?</p>
        <button onClick={onYes}>Yes</button>
        <button onClick={onNo}>No</button>
      </div>
    );
  }
};

export default WarningPopup;