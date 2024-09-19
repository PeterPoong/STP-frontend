import React from 'react';
import "../../../css/StudentPortalStyles/StudentPortalWidget.css";

const WidgetPopUpError = ({ isOpen, onClose, errorMessage }) => {
    if (!isOpen) return null;

    return (
        <div className="delete-popup-overlay">
            <div className="delete-popup-content">
                <div className="delete-popup-header">
                    <div className="delete-popup-icon-wrap mt-0 mb-3">
                        <div className="delete-popup-icon">!</div>
                    </div>
                    <div className="delete-popup-text">
                        <h2 className="delete-popup-title">Error</h2>
                        <p className="delete-popup-message">
                            {errorMessage}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WidgetPopUpError;