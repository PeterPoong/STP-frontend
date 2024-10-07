import React from 'react';
import "../../css/StudentPortalStyles/StudentPortalWidget.css";

const WidgetPopUpDelete = ({ isOpen, onClose, onConfirm,isDeleting }) => {
    if (!isOpen) return null;

    return (
        <div className="delete-popup-overlay">
            <div className="delete-popup-content">
                <div className="delete-popup-header">
                    <div className="delete-popup-icon-wrap">
                        <div className="delete-popup-icon">!</div>
                    </div>
                    <div className="delete-popup-text">
                        <h2 className="delete-popup-title">Are you sure you want to delete this?</h2>
                        <p className="delete-popup-message">
                            Deleting this record may cause the school to lose important
                            information, which could affect your application process.
                        </p>
                    </div>
                </div>
                <div className="delete-popup-buttons">
                    <button
                        className="delete-popup-confirm"
                        onClick={onConfirm}
                        disabled={isDeleting} // Disable Confirm button during deletion
                    >
                        {isDeleting ? (
                            <>
                                <div className="spinner"></div>
                                <span>Deleting...</span>
                            </>
                        ) : (
                            'Confirm'
                        )}
                    </button>
                    <button
                        className="delete-popup-cancel"
                        onClick={onClose}
                        disabled={isDeleting} // Optionally disable Cancel button during deletion
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
export default WidgetPopUpDelete;