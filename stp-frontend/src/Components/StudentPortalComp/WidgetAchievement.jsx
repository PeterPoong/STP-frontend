import React, { useState, useEffect } from 'react';
import { X, Edit2, Calendar, ChevronDown, Upload, Check } from 'lucide-react';
import '../../css/StudentPortalStyles/StudentPortalWidget.css';

const WidgetAchievement = ({ isOpen, onClose, onSave, item }) => {
  const [achievementTitle, setAchievementTitle] = useState('');
  const [dateOfAchievement, setDateOfAchievement] = useState('');
  const [titleObtained, setTitleObtained] = useState('');
  const [organization, setOrganization] = useState('');
  const [uploads, setUploads] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  useEffect(() => {
    if (item) {
      setAchievementTitle(item.events);
      setDateOfAchievement(item.dateOfAchievement);
      setTitleObtained(item.titleObtained);
      setOrganization(item.university);
      setUploads(item.uploads);
    } else {
      // Reset form for new entries
      setAchievementTitle('');
      setDateOfAchievement('');
      setTitleObtained('');
      setOrganization('');
      setUploads('');
    }
    setIsEditingTitle(false);
  }, [item]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      id: item ? item.id : null,
      events: achievementTitle,
      dateOfAchievement: dateOfAchievement,
      titleObtained: titleObtained,
      university: organization,
      uploads: uploads
    });
  };

  const handleTitleEdit = () => {
    setIsEditingTitle(true);
  };

  const handleTitleSave = () => {
    setIsEditingTitle(false);
  };

  return (
    <div className="achievement-overlay">
      <div className="achievement-popup">
        <button className="achievement-close-btn" onClick={onClose}>
          <X size={24} color="white" />
        </button>
        <h2 className="achievement-title">
          {isEditingTitle ? (
            <>
              <input
                type="text"
                value={achievementTitle}
                onChange={(e) => setAchievementTitle(e.target.value)}
                className="achievement-title-input"
                autoFocus
              />
              <Check size={0} color="white" onClick={handleTitleSave} className="buttonsaveam" />
            </>
          ) : (
            <>
              {achievementTitle || 'New Achievement'}
              <button className="buttoneditam" >
                <Edit2 size={20} color="white" onClick={handleTitleEdit} />
              </button>
            </>
          )}
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
            < div className="achievement-upload-area">
              <div className="achievement-upload-area-area">
                <Upload size={24} color="#dc3545" />
                <span>Click to Upload</span>
                <span className="achievement-file-limit">(Max. File size: 25 MB)</span>
              </div>
            </div>
          </div>
        </div>

        <button className="achievement-save-btn" onClick={handleSave}>
          {item ? 'UPDATE' : 'SAVE'}
        </button>
      </div>
    </div>
  );
};

export default WidgetAchievement;