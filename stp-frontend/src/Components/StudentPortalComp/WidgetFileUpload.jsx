import React, { useState, useEffect } from 'react';
import { X, Upload, FileText, Trash2 } from 'lucide-react';
import { Alert } from 'react-bootstrap';
import "../../css/StudentPortalStyles/StudentPortalWidget.css";

const WidgetFileUpload = ({ isOpen, onClose, onSave, item, isViewMode }) => {
  const [name, setName] = useState('');
  const [media, setMedia] = useState(null);
  const [existingFileUrl, setExistingFileUrl] = useState(null);
  const [errors, setErrors] = useState({}); // Keep this for multiple errors
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  /*loading and pop up the widget can check if open will set the info that retrieve from api respsonse or null, if close will reset the form */
  useEffect(() => {
    if (isOpen) {
      if (item) {
        setName(item.name || '');
        setMedia(item.media || null);
      } else {
        resetForm();
      }
      setErrors({}); // Clear any previous errors
    }
  }, [isOpen, item]);
  /*end */

  /*reset form function*/
  const resetForm = () => {
    setName('');
    setMedia(null);
    setExistingFileUrl(null);
    setErrors({}); // Reset errors here
  };
  /*end */

  /*close popup widget function */
  const handleClose = () => {
    resetForm();
    onClose();
  };
  /*end */

  if (!isOpen) return null;

  /*save button function when user press save button */
  const handleSave = async () => {
    setErrors({}); // Clear previous errors
    const newErrors = {};
    if (!name.trim()) newErrors.title = "Title is required"; // Set title error
    if (!media && !item) newErrors.file = "File is required"; // Set file error

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set errors if any
      return;
    }
    setIsSaving(true);
    setSaveStatus(null);

    try {
      const result = await onSave({
        id: item ? item.id : null,
        name,
        media
      });

      if (!result.success) {
        if (result.message === "Validation Error" && result.error) {
          const errorMessages = Object.values(result.error).flat();
          setErrors({ title: errorMessages.join('. ') || "Validation failed. Please check your input." });
        } else {
          setErrors({ message: result.message || "Failed to save certificate. Please try again." });
        }
        setSaveStatus('error');
      } else {
        setSaveStatus('success');
        setTimeout(() => {
          handleClose();
        }, 1500); // Close the widget after 1.5 seconds on success
      }
    } catch (error) {
      console.error('Error saving certificate:', error);
      setErrors({ message: "An error occurred. Please try again later." });
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };
/*end */

/*file change handle function */
const handleFileChange = (event) => {
  const uploadedFile = event.target.files[0];
  if (uploadedFile) {
    setMedia(uploadedFile);
  }
};
/*end */

/*click to view button function */
const handleFileDelete = () => {
  setMedia(null);
};
/*end */

/*click to view button function */
const handleViewClick = () => {
  if (media instanceof File) {
    // For newly uploaded files
    const fileUrl = URL.createObjectURL(media);
    window.open(fileUrl, '_blank');
  } else if (media) {
    // For existing files
    const fullUrl = `${import.meta.env.VITE_BASE_URL}storage/${media}`;
    window.open(fullUrl, '_blank');
  }
};
/*end */

return (
  <div className="upload-widget-overlay">
    <div className="upload-widget-popup">
      <div className="upload-header">
        <h5 className="small">{isViewMode ? 'View' : 'Upload'}</h5>
        <button className="close-button" onClick={handleClose}><X size={20} /></button>
      </div>

      <div className="upload-title-input">
        <input
          type="text"
          placeholder="Enter file title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="file-title-input"
          readOnly={isViewMode}
        />
      </div>
      {errors.title && <div className="error-message">{errors.title}</div>} {/* Display title error */}
      {errors.file && <div className="error-message">{errors.file}</div>} {/* Display file error */}
      {!media ? (
        <div className="upload-area">
          {!isViewMode && (
            <label htmlFor="file-upload" className="upload-label">
              <Upload size={24} color="#dc3545" />
              <span>Click to Upload</span>
              <span className="file-size-limit">(Max. File size: 25 MB)</span>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </label>
          )}
        </div>
      ) : (
        <div className="file-uploaded">
          <div className="file-info-wfu">
            <FileText size={18} />
            <div className="file-details">
              <span className="file-name text-wrap">
                {media instanceof File ? media.name : media}
              </span>
              <button className="view-button" onClick={handleViewClick}>Click to view</button>
            </div>
          </div>
          {!isViewMode && (
            <button className="delete-button" onClick={handleFileDelete}>
              <Trash2 size={18} />
            </button>
          )}
        </div>
      )}
     {!isViewMode && (
          <div className="save-button-container">
            <button 
              className={`save-button ${isSaving ? 'saving' : ''} ${saveStatus ? saveStatus : ''}`} 
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <div className="spinner"></div>
                  <span>Saving...</span>
                </>
              ) : saveStatus === 'success' ? (
                <>
                  <Check size={18} />
                  <span>Saved!</span>
                </>
              ) : saveStatus === 'error' ? (
                <span>Failed</span>
              ) : (
                <span>{item ? 'UPDATE' : 'SAVE'}</span>
              )}
            </button>
          </div>
        )}
        
        {saveStatus === 'error' && (
          <Alert variant="danger" className="mt-3">
            {errors.message || "An error occurred. Please try again."}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default WidgetFileUpload;