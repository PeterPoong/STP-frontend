import React,{useState} from 'react';
import "../../../css/StudentPortalStyles/StudentPortalWidget.css";

const WidgetPopUpSubmission = ({ isOpen, onClose, onConfirm }) => {
    const [isConfirming, setIsConfirming] = useState(false);
    if (!isOpen) return null;

    const handleConfirm = () => {
        setIsConfirming(true);
        onConfirm()
            .then(() => {
                onClose();
            })
            .catch((error) => {
                console.error('Error confirming submission:', error);
                // Optionally handle error, e.g., show an error message
            })
            .finally(() => {
                setIsConfirming(false);
            });
    };

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
                <button 
                        className={`delete-popup-confirm ${isConfirming ? 'confirming' : ''}`}
                        onClick={handleConfirm}
                        disabled={isConfirming}
                    >
                        {isConfirming ? (
                            <>
                                <div className="spinner"></div>
                                <span>Confirming...</span>
                            </>
                        ) : (
                            'Confirm'
                        )}
                    </button>
                    <button className="delete-popup-cancel" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default WidgetPopUpSubmission;