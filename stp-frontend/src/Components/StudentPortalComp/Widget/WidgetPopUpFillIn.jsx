import React from "react";
import "../../../css/StudentPortalStyles/StudentPortalWidget.css";

const WidgetPopUpFillIn = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="delete-popup-overlay">
      <div className="delete-popup-content">
        <div className="delete-popup-header">
          <div className="delete-popup-icon-wrap">
            <div className="delete-popup-icon">!</div>
          </div>

          <h2 className="delete-popup-title mt-4 ">Oh No Something wrong.</h2>
        </div>
        <div className="delete-popup-buttons">
          <button className="delete-popup-cancel" onClick={onClose}>
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};
export default WidgetPopUpFillIn;
