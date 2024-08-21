import React, { useState } from 'react';
import { X, Edit2, Calendar, ChevronDown, Upload } from 'lucide-react';
import '../../css/StudentPortalStyles/StudentPortalWidget.css';

const WidgetAchievement = ({ isOpen, onClose }) => {
  const [achievementTitle, setAchievementTitle] = useState('ASC 2021');
  const [dateOfAchievement, setDateOfAchievement] = useState('01/02/2021');
  const [titleObtained, setTitleObtained] = useState('Champion');
  const [organization, setOrganization] = useState('UCSI University');

  if (!isOpen) return null;

  return (
    <div className="achievement-overlay">
      <div className="achievement-popup">
        <button className="achievement-close-btn" onClick={onClose}>
          <X size={24} color="white" />
        </button>
        <h2 className="achievement-title">
          {achievementTitle} <Edit2 size={20} color="white" />
        </h2>
        
        <div className="achievement-form">
          <div className="achievement-input-group">
            <div className="achievement-input-field">
              <label className="achievement-label">Date of Achievement</label>
              <div className="achievement-date-input">
                <input 
                  type="text" 
                  className="achievement-input"
                  value={dateOfAchievement}
                  onChange={(e) => setDateOfAchievement(e.target.value)}
                />
                <Calendar size={20} color="white" />
              </div>
            </div>
            <div className="achievement-input-field">
              <label className="achievement-label">Title Obtained</label>
              <div className="achievement-select-input">
                <input 
                  type="text" 
                  className="achievement-input"
                  value={titleObtained}
                  onChange={(e) => setTitleObtained(e.target.value)}
                />
                <ChevronDown size={20} color="white" />
              </div>
            </div>
            <div className="achievement-input-field">
              <label className="achievement-label">Organization</label>
              <input 
                type="text" 
                className="achievement-input"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              />
            </div>
          </div>
          
          <div className="achievement-upload-section">
            <label className="achievement-label">Upload Certificate/ Documents</label>
            <div className="achievement-upload-area">
              <Upload size={24} color="#dc3545" />
              <span>Click to Upload</span>
              <span className="achievement-file-limit">(Max. File size: 25 MB)</span>
            </div>
          </div>
        </div>
        
        <button className="achievement-save-btn">SAVE</button>
      </div>
    </div>
  );
};

export default WidgetAchievement;