import React, { useState, useEffect } from 'react';
import { X, Upload, FileText, Trash2 } from 'lucide-react';
import "../../css/StudentPortalStyles/StudentPortalWidget.css";

const WidgetFileUpload = ({ isOpen, onClose, onSave, item }) => {
  const [name, setName] = useState('');
  const [media, setMedia] = useState(null);

  useEffect(() => {
    if (item) {
      setName(item.name || '');
      setMedia(item.media || null);
    } else {
      // Reset form for new entries
      setName('');
      setMedia(null);
    }
  }, [item]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      id: item ? item.id : null,
      name,
      media
    });
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

  return (
    <div className="upload-widget-overlay">
      <div className="upload-widget-popup">
        <div className="upload-header">
          <h5 className="small">Upload</h5>
          <button className="close-button" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="upload-title-input">
          <input
            type="text"
            placeholder="Enter file title"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="file-title-input"
          />
        </div>

        {!media ? (
          <div className="upload-area">
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
          </div>
        ) : (
          <div className="file-uploaded">
            <div className="file-info">
              <FileText size={18} />
              <div className="file-details">
                <span className="file-name">
                  {media instanceof File ? media.name : media}
                </span>
                <button className="view-button">Click to view</button>
              </div>
            </div>
            <button className="delete-button" onClick={handleFileDelete}>
              <Trash2 size={18} />
            </button>
          </div>
        )}

        <div className="save-button-container">
          <button className="save-button" onClick={handleSave}>
            {item ? 'UPDATE' : 'SAVE'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WidgetFileUpload;