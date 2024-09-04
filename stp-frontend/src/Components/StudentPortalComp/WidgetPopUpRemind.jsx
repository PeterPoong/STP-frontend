import React from 'react';
import "../../css/StudentPortalStyles/StudentPortalWidget.css";

const WidgetPopUpRemind = ({ isOpen, onClose}) => {
    if (!isOpen) return null;

    return (
        <div className="delete-popup-overlay">
            <div className="delete-popup-content">
                <div className="delete-popup-header">
                    <div className="delete-popup-icon-wrap">
                        <div className="delete-popup-icon">!</div>
                    </div>
                    <div className="delete-popup-text">
                        <h2 className="delete-popup-title">Please include at least one academic qualification.</h2>
                        <p className="delete-popup-message">
                            "It is recommended to provide your <strong> highest</strong> qualification"
                        </p>
                    </div>
                </div>
                <div className="delete-popup-buttons">
                    <button className="delete-popup-cancel" onClick={onClose}>Ok</button>
                </div>
            </div>
        </div>
    );
};
export default WidgetPopUpRemind ;