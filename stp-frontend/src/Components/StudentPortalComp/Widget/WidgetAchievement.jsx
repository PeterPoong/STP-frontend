import React, { useState, useEffect } from 'react';
import { X, Edit2, ChevronDown, Upload, Check, FileText, Trash2 } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { Alert } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../css/StudentPortalStyles/StudentPortalWidget.css';

const WidgetAchievement = ({ isOpen, onClose, onSave, item, isViewMode }) => {
  const [achievement_name, setAchievementName] = useState('');
  const [date, setDate] = useState(null);
  const [title, setTitle] = useState('');
  const [awarded_by, setAwardedBy] = useState('');
  const [achievement_media, setAchievementMedia] = useState(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [errors, setErrors] = useState({});
  const [achievementTypes, setAchievementTypes] = useState([]);

  useEffect(() => {
    if (isOpen) {
      if (item) {
        setAchievementName(item.achievement_name || '');
        setDate(item.date ? parseDate(item.date) : null);
        setAwardedBy(item.awarded_by || '');
        setAchievementMedia(item.achievement_media || null);
      } else {
        resetForm();
      }
      setIsEditingTitle(false);
      fetchAchievementTypes();
    }
  }, [isOpen, item]);

  useEffect(() => {
    if (item && achievementTypes.length > 0) {
      const matchingType = achievementTypes.find(
        (type) => type.core_metaName === item.title_obtained
      );
      if (matchingType) {
        setTitle(matchingType.id.toString());
      } else {
        setTitle('');
      }
    }
  }, [item, achievementTypes]);

  // Helper function to safely parse date strings
  const parseDate = (dateString) => {
    const parsedDate = new Date(dateString);
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  };

  /*reset form function*/
  const resetForm = () => {
    setAchievementName('');
    setDate(null);
    setTitle('');
    setAwardedBy('');
    setAchievementMedia(null);
    setErrors({});
  };
  /*end */

  /*close popup widget function */
  const handleClose = () => {
    resetForm();
    onClose();
  };
  /*end */

  /*title obtained api */
  const fetchAchievementTypes = async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/achievementTypeList`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch achievement types. Status: ${response.status}`);
      }

      const data = await response.json();
      setAchievementTypes(data.data || []);
    } catch (error) {
      console.error('Error fetching achievement types:', error);
      setError('Failed to load achievement types. Please try again later.');
    }
  };
  /*end */

  /*date format handling function */
  const formatDate = (date) => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    console.log(`Formatted date: ${day}/${month}/${year}`); // Add this log
    return `${day}/${month}/${year}`;
  };
  /*end */

  if (!isOpen) return null;

  /*save button function when user press save button */
  const handleSave = async () => {
    // Validate all fields
    const newErrors = {};
    if (!achievement_name.trim()) newErrors.achievement_name = "Achievement name is required";
    if (!date) newErrors.date = "Date is required";
    if (!title.trim()) newErrors.title = "Title obtained is required";
    if (!awarded_by.trim()) newErrors.awarded_by = "Awarded by is required";
    if (!achievement_media && !item) newErrors.achievement_media = "Certificate/Document is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Don't proceed with save if there are errors
    }
    // Clear any previous errors
    setErrors({});
    // Proceed with save
    const formattedDate = date ? formatDate(date) : '';
    try {
      const result = await onSave({
        id: item ? item.id : null,
        achievement_name,
        date: formattedDate,
        title,
        awarded_by,
        achievement_media
      });
      if (!result.success) {
        if (result.message === "Validation Error" && result.error) {
          // Handle validation errors
          const errorMessages = Object.entries(result.error).map(([key, value]) => `${key}: ${value.join(', ')}`);
          setErrors({ general: errorMessages.join('. ') });
        } else {
          setErrors({ general: result.message || "Failed to save achievement. Please try again." });
        }
      } else {
        handleClose();
      }
    } catch (error) {
      console.error('Error saving achievement:', error);
      setErrors({ general: "An error occurred. Please try again later." });
    }
  };
  /*end */


  const handleTitleEdit = () => {
    setIsEditingTitle(true);
  };

  const handleTitleSave = () => {
    setIsEditingTitle(false);
  };

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setAchievementMedia(uploadedFile);
      // Clear the file upload error when a file is selected
      setErrors(prevErrors => ({ ...prevErrors, achievement_media: null }));
    }
  };

  const handleFileDelete = () => {
    setAchievementMedia(null);
  };

  /*click to view button function */
  const handleViewClick = () => {
    if (achievement_media instanceof File) {
      // For newly uploaded files
      const fileUrl = URL.createObjectURL(achievement_media);
      window.open(fileUrl, '_blank');
    } else if (achievement_media) {
      // For existing files
      const fullUrl = `${import.meta.env.VITE_BASE_URL}storage/${achievement_media}`;
      window.open(fullUrl, '_blank');
    }
  };
  /*end */
  return (
    <div className="achievement-overlay">
      <div className="achievement-popup">
        <button className="achievement-close-btn" onClick={handleClose}>
          <X size={24} color="white" />
        </button>
        <h2 className="achievement-title mt-3">
          {isEditingTitle && !isViewMode ? (
            <>
              <input
                type="text"
                value={achievement_name}
                onChange={(e) => setAchievementName(e.target.value)}
                className="achievement-title-input"
                autoFocus
                required
              />
              <Check size={20} color="white" onClick={handleTitleSave} className="buttonsaveam" />
            </>
          ) : (
            <>
              {achievement_name || 'New Acievement'}
              {!isViewMode && (
                  <Edit2 size={18} color="white" className="buttoneditam" onClick={handleTitleEdit} />        
              )}
            </>
          )}
        </h2>
        {errors.achievement_name && <div className="error-message text-white">{errors.achievement_name}</div>}

        {errors.general && <Alert variant="danger" className="mt-3">{errors.general}</Alert>}

        <div className="achievement-form">
          <div className="achievement-input-group">
            <div className="achievement-input-field">
              <label className="achievement-label">Date of Achievement</label>
              <div className="achievement-date-input">
                <DatePicker
                  selected={date}
                  onChange={(date) => {
                    setDate(date);
                    console.log(`Selected date: ${date}`); // Add this log
                  }}
                  dateFormat="dd/MM/yyyy"
                  className="achievement-input"
                  readOnly={isViewMode}
                  required
                />
              </div>
              {errors.date && <div className="error-message text-white">{errors.date}</div>}
            </div>
            <div className="achievement-input-field">
              <label className="achievement-label">Title Obtained</label>
              <div className="achievement-select-input" style={{ position: 'relative', outline: 'none' }}>
                <select
                  className="achievement-input w-100"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isViewMode}
                  required
                  style={{
                    appearance: 'none',
                    borderBottom: 'none',
                    outline: 'none',
                    color: 'white'
                  }}
                >
                  <option value="" style={{ color: 'black' }}>Select title</option>
                  {achievementTypes.map((type) => (
                    <option key={type.id} value={type.id.toString()} style={{ color: 'black' }}>
                      {type.core_metaName}
                    </option>
                  ))}
                </select>
                <ChevronDown size={20} color="white" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>

              {errors.title && <div className="error-message text-white">{errors.title}</div>}
            </div>
            <div className="achievement-input-field">
              <label className="achievement-label">Awarded By</label>
              <input
                type="text"
                className="achievement-input"
                value={awarded_by}
                onChange={(e) => setAwardedBy(e.target.value)}
                readOnly={isViewMode}
                required
              />
              {errors.awarded_by && <div className="error-message text-white">{errors.awarded_by}</div>}
            </div>
          </div>

          <div className="achievement-upload-section">
            <label className="achievement-label">Upload Certificate/ Documents</label>
            {!achievement_media ? (
              <div className="achievement-upload-area">
                {!isViewMode && (
                  <label htmlFor="file-upload" className="achievement-upload-label">
                    <Upload size={24} color="#dc3545" />
                    <span>Click to Upload</span>
                    <span className="achievement-file-limit">(Max. File size: 25 MB)</span>
                    <input
                      id="file-upload"
                      type="file"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                      reuiqred
                    />
                  </label>
                )}
              </div>
            ) : (
              <div className="achievement-file-uploaded">
                <div className="achievement-file-info">
                  <FileText size={20} color="#353535" />
                  <div className="achievement-file-details">
                    <span className="achievement-file-name">
                      {achievement_media instanceof File ? achievement_media.name : achievement_media}
                    </span>
                    <button className="achievement-view-button" onClick={handleViewClick}>Click to view</button>
                  </div>
                </div>
                {!isViewMode && (
                  <button className="achievement-delete-button" onClick={handleFileDelete}>
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            )}
            {errors.achievement_media && <div className="error-message text-white">{errors.achievement_media}</div>}
          </div>
        </div>

        {!isViewMode && (
          <div className="d-flex justify-content-center">
            <button className="achievement-save-btn" onClick={handleSave}>
              {item ? 'UPDATE' : 'SAVE'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WidgetAchievement;