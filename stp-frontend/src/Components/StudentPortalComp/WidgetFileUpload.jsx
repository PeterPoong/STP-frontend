import React, { useState, useEffect } from 'react';
import { X, Upload, FileText, Trash2 } from 'lucide-react';
import { Alert } from 'react-bootstrap';
import "../../css/StudentPortalStyles/StudentPortalWidget.css";

const WidgetFileUpload = ({ isOpen, onClose, onSave, item, isViewMode }) => {
  const [name, setName] = useState('');
  const [media, setMedia] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (item) {
        setName(item.name || '');
        setMedia(item.media || null);
      } else {
        resetForm();
      }
      setError(''); // Clear any previous errors
    }
  }, [isOpen, item]);

  const resetForm = () => {
    setName('');
    setMedia(null);
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  const handleSave = async () => {
    setError('');
    try {
      const result = await onSave({
        id: item ? item.id : null,
        name,
        media
      });
      
      if (!result.success) {
        if (result.message === "Validation Error" && result.error) {
          // Handle validation errors
          const errorMessages = Object.values(result.error).flat();
          setError(errorMessages.join('. ') || "Validation failed. Please check your input.");
        } else {
          setError(result.message || "Failed to save certificate. Please try again.");
        }
      } else {
        handleClose();
      }
    } catch (error) {
      console.error('Error saving certificate:', error);
      setError("An error occurred. Please try again later.");
    }
  };

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setMedia(uploadedFile);
    }
  };

  const handleFileDelete = () => {
    setMedia(null);
  };

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

  return (
    <div className="upload-widget-overlay">
      <div className="upload-widget-popup">
        <div className="upload-header">
          <h5 className="small">{isViewMode ? 'View' : 'Upload'}</h5>
          <button className="close-button" onClick={handleClose}><X size={20} /></button>
        </div>
        
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        
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
            <div className="file-info">
              <FileText size={18} />
              <div className="file-details">
                <span className="file-name">
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
            <button className="save-button" onClick={handleSave}>
              {item ? 'UPDATE' : 'SAVE'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WidgetFileUpload;