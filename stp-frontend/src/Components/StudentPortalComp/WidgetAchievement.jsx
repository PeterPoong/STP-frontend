import React, { useState, useEffect } from 'react';
import { X, Edit2, Calendar, ChevronDown, Upload, Check, FileText, Trash2 } from 'lucide-react';
import '../../css/StudentPortalStyles/StudentPortalWidget.css';

const WidgetAchievement = ({ isOpen, onClose, onSave, item }) => {
  const [events, setEvents] = useState('');
  const [dateOfAchievement, setDateOfAchievement] = useState('');
  const [titleObtained, setTitleObtained] = useState('');
  const [university, setUniversity] = useState('');
  const [uploads, setUploads] = useState(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  useEffect(() => {
    if (item) {
      setEvents(item.events);
      setDateOfAchievement(item.dateOfAchievement);
      setTitleObtained(item.titleObtained);
      setUniversity(item.university);
      setUploads(item.uploads);
    } else {
      // Reset form for new entries
      setEvents('');
      setDateOfAchievement('');
      setTitleObtained('');
      setUniversity('');
      setUploads(null);
    }
    setIsEditingTitle(false);
  }, [item]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      id: item ? item.id : null,
      events,
      dateOfAchievement,
      titleObtained,
      university,
      uploads
    });
  };

  const handleTitleEdit = () => {
    setIsEditingTitle(true);
  };

  const handleTitleSave = () => {
    setIsEditingTitle(false);
  };

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setUploads(uploadedFile.name);
    }
  };

  const handleFileDelete = () => {
    setUploads(null);
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
                value={events}
                onChange={(e) => setEvents(e.target.value)}
                className="achievement-title-input"
                autoFocus
              />
              <Check size={20} color="white" onClick={handleTitleSave} className="buttonsaveam" />
            </>
          ) : (
            <>
              {events || 'New Achievement'}
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
              <label className="achievement-label">University</label>
              <input
                type="text"
                className="achievement-input"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              />
            </div>
          </div>

          <div className="achievement-upload-section">
            <label className="achievement-label">Upload Certificate/ Documents</label>
            {!uploads ? (
              <div className="achievement-upload-area">
                <label htmlFor="file-upload" className="achievement-upload-label">
                  <Upload size={24} color="#dc3545" />
                  <span>Click to Upload</span>
                  <span className="achievement-file-limit">(Max. File size: 25 MB)</span>
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            ) : (
              <div className="achievement-file-uploaded">
                <div className="achievement-file-info">
                  <FileText size={20} color="#353535" />
                  <div className="achievement-file-details">
                    <span className="achievement-file-name">{uploads}</span>
                    <button className="achievement-view-button">Click to view</button>
                  </div>
                </div>
                <button className="achievement-delete-button" onClick={handleFileDelete}>
                  <Trash2 size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button className="achievement-save-btn" onClick={handleSave}>
            {item ? 'UPDATE' : 'SAVE'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WidgetAchievement;