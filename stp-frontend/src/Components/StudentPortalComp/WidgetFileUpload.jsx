import React, { useState } from 'react';
import { X, Upload, FileText, Trash2 } from 'lucide-react';
import "../../css/StudentPortalStyles/StudentPortalWidget.css";

const WidgetFileUpload = ({ isOpen, onClose }) => {
  const [file, setFile] = useState(null);
  const [fileTitle, setFileTitle] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleDelete = () => {
    setFile(null);
  };

  const handleSave = () => {
    // Implement save functionality here
    console.log("Saving file:", file);
    console.log("File title:", fileTitle);
    onClose(); // Close the popup after saving
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
            value={fileTitle}
            onChange={(e) => setFileTitle(e.target.value)}
            className="file-title-input"
          />
        </div>
        
        {!file ? (
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
                <span className="file-name">{file.name}</span>
                <button className="view-button">Click to view</button>
              </div>
            </div>
            <button className="delete-button" onClick={handleDelete}>
              <Trash2 size={18} />
            </button>
          </div>
        )}

        {file && (
          <div className="save-button-container">
            <button className="save-button" onClick={handleSave}>SAVE</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WidgetFileUpload;