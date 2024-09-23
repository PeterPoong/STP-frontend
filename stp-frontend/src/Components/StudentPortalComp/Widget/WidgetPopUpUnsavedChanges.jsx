import React from 'react';
import "../../../css/StudentPortalStyles/StudentPortalWidget.css";

const WidgetPopUpUnsavedChanges = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="delete-popup-overlay">
            <div className="delete-popup-content">
                <div className="delete-popup-header">
                    <div className="delete-popup-icon-wrap">
                        <div className="delete-popup-icon">!</div>
                    </div>
                    <div className="delete-popup-text">
                        <h2 className="delete-popup-title">Unsaved Changes</h2>
                        <p className="delete-popup-message">
                            You have unsaved changes . 
                            Do you want to proceed without saving?
                        </p>
                    </div>
                </div>
                <div className="delete-popup-buttons">
                    <button className="delete-popup-cancel" onClick={onCancel}>Cancel</button>
                    <button className="delete-popup-confirm" onClick={onConfirm}>Proceed</button>
                </div>
            </div>
        </div>
    );
};

export default WidgetPopUpUnsavedChanges;