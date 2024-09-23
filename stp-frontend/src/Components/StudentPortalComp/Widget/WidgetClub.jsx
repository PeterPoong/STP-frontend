import React, { useState, useEffect } from 'react';
import { X, Edit2, Check } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../css/StudentPortalStyles/StudentPortalWidget.css';

const WidgetClub = ({ isOpen, onClose, onSave, item, isViewMode }) => {

  const [club_name, setClubTitle] = useState('');
  const [year, setYearOfTerm] = useState(new Date());
  const [student_position, setPosition] = useState('');
  const [location, setInstitution] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [errors, setErrors] = useState({});

  /*reset form function*/
  const resetForm = () => {
    setClubTitle('');
    setYearOfTerm(new Date());
    setPosition('');
    setInstitution('');
    setIsEditingTitle(false);
    setErrors({});
  };
  /*end */

  /*loading and pop up the widget can check if open will set the info that retrieve from api respsonse or null, if close will reset the form */
  useEffect(() => {
    if (isOpen) {
      if (item) {
        setClubTitle(item.club_name);
        setYearOfTerm(new Date(item.year, 0, 1));
        setPosition(item.student_position);
        setInstitution(item.location);
      } else {
        resetForm();
      }
    }
  }, [isOpen, item]);
  /*end */

  if (!isOpen) return null;

  /*close popup widget function */
  const handleClose = () => {
    resetForm();
    onClose();
  };

  /*save button function when user press save button */
  const handleSave = () => {
    // Validate all fields
    const newErrors = {};
    if (!club_name.trim()) newErrors.club_name = "Club name is required";
    if (!year) newErrors.year = "Year is required";
    if (!student_position.trim()) newErrors.student_position = "Position is required";
    if (!location.trim()) newErrors.location = "Institution is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Don't proceed with save if there are errors
    }

    // Clear any previous errors
    setErrors({});

    // Proceed with save
    onSave({
      id: item ? item.id : null,
      club_name,
      location,
      year: year.getFullYear(),
      student_position
    });
  };
  /*end */

  /*Club title edit handling function */
  const handleTitleEdit = () => {
    setIsEditingTitle(true);
  };
  /*end */

  /*Club title save handling function */
  const handleTitleSave = () => {
    setIsEditingTitle(false);
  };
  /*end */

  return (
    <div className="club-widget-overlay">
      <div className="club-widget-popup ">
        <button className="close-button-club mt-3" onClick={handleClose}>
          <X size={24} color="white" />
        </button>
        <h2 className="achievement-title">
          {isEditingTitle && !isViewMode ? (
            <>
              <input
                type="text"
                value={club_name}
                onChange={(e) => setClubTitle(e.target.value)}
                className="achievement-title-input"
                autoFocus
                required
              />
              <Check size={20} color="white" onClick={handleTitleSave} className="buttonsaveam" />
            </>
          ) : (
            <>
              {club_name || 'Enter Club Name'}
              {!isViewMode && (
                <button className="buttoneditam">
                  <Edit2 size={20} color="white" className="align-self-center" onClick={handleTitleEdit} />
                </button>
              )}
            </>
          )}
        </h2>
        {errors.club_name && <div className="my-3">* {errors.club_name}</div>}

        <div className="input-group-club">
          <div className="input-field-club w-50">
            <label className="label-club">Year of Term</label>
            <DatePicker
              selected={year}
              onChange={(date) => setYearOfTerm(date)}
              showYearPicker
              dateFormat="yyyy"
              className="custom-datepicker"
              required
            />
            {errors.year && <div className="error-message">{errors.year}</div>}
          </div>
          <div className="input-field-club w-50">
            <label className="label-club">Position</label>
            <input
              type="text"
              className="input-club "
              value={student_position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Position"
              required
            />

          </div>

        </div>
        {errors.student_position && <div className="my-2">* {errors.student_position}</div>}
        <div className="input-field-club mb-3">
          <label>Institution</label>
          <input
            type="text"
            value={location}
            className="input-club "
            onChange={(e) => setInstitution(e.target.value)}
            placeholder="Institution"
            required
          />
          {errors.location && <div className="mt-2">* {errors.location}</div>}
        </div>

        {!isViewMode && (
          <button className="save-button-club" onClick={handleSave}>
            {item ? 'UPDATE' : 'SAVE'}
          </button>
        )}
      </div>
    </div>
  );
};

export default WidgetClub;