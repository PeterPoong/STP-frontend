import React from 'react';
import "../../../css/StudentPortalStyles/StudentPortalWidget.css";

const WidgetPopUpAcademicRemind = ({ isOpen, onClose}) => {
    if (!isOpen) return null;

    return (
        <div className="delete-popup-overlay">
            <div className="delete-popup-content">
                <div className="delete-popup-header">
                    <div className="delete-popup-icon-wrap mt-0">
                        <div className="delete-popup-icon">!</div>
                    </div>
                    <div className="delete-popup-text">
                        <h2 className="delete-popup-title">Please make sure at least key in the subject with grade and cgpa.</h2>
                    </div>
                </div>
                <div className="delete-popup-buttons">
                    <button className="delete-popup-cancel" onClick={onClose}>Ok</button>
                </div>
            </div>
        </div>
    );
};
export default WidgetPopUpAcademicRemind ;