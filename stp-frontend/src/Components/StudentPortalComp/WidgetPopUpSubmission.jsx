import React from 'react';
import "../../css/StudentPortalStyles/StudentPortalWidget.css";

const WidgetPopUpSubmission = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="delete-popup-overlay">
            <div className="delete-popup-content">
                <div className="delete-popup-header">
                    <div className="delete-popup-icon-wrap">
                        <div className="delete-popup-icon">!</div>
                    </div>
                    <h2 className="delete-popup-title mt-4">Confirm Submission?</h2>
                </div>
                <div className="delete-popup-buttons">
                    <button className="delete-popup-confirm" onClick={onConfirm}>Confirm</button>
                    <button className="delete-popup-cancel" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default WidgetPopUpSubmission;