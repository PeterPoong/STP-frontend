import React, { useState, useEffect } from 'react';
import { X, Edit2,Check } from 'lucide-react';
import '../../css/StudentPortalStyles/StudentPortalWidget.css';

const WidgetClub = ({ isOpen, onClose, onSave, item }) => {
 
  const [club_name, setClubTitle] = useState('');
  const [year, setYearOfTerm] = useState('2024');
  const [student_position, setPosition] = useState('');
  const [location, setInstitution] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  useEffect(() => {
    if (item) {
      setClubTitle(item.club_name);
      setYearOfTerm(item.year.toString());
      setPosition(item.student_position);
      setInstitution(item.location);
    } else {
      // Reset form for new entries
      
      setClubTitle('');
      setYearOfTerm('');
      setPosition('');
      setInstitution('');
    }
    setIsEditingTitle(false);
  }, [item]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      id: item ? item.id : null,
      club_name,
      location,
      year: parseInt(year),
      student_position
    });
  };

  
  const handleTitleEdit = () => {
    setIsEditingTitle(true);
  };

  const handleTitleSave = () => {
    setIsEditingTitle(false);
  };

  return (
    <div className="club-widget-overlay">
      <div className="club-widget-popup ">
        <button className="close-button-club mt-3" onClick={onClose}>
          <X size={24} color="white" />
        </button>
        <h2 className="achievement-title">
          {isEditingTitle ? (
            <>
              <input
                type="text"
                value={club_name}
                onChange={(e) => setClubTitle(e.target.value)}
                className="achievement-title-input"
                autoFocus
              />
              <Check size={20} color="white" onClick={handleTitleSave}  className="buttonsaveam"/>
            </>
          ) : (
            <>
              {club_name || 'Ente Club Name'}
              <button className="buttoneditam" >
              <Edit2 size={20} color="white" onClick={handleTitleEdit} />
              </button>
            </>
          )}
        </h2>
        
        <div className="input-group-club">
          <div className="input-field-club w-50">
            <label className="label-club">Year of Term</label>
            <select 
              value={year} 
              className="select-club"
              onChange={(e) => setYearOfTerm(e.target.value)}
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
          </div>
          <div className="input-field-club w-50">
            <label className="label-club">Position</label>
            <input 
              type="text" 
              className="input-club "
              value={student_position} 
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Position"
            />
          </div>
        </div>
        
        <div className="input-field-club">
          <label>Institution</label>
          <input 
            type="text" 
            value={location} 
            className="location"
            onChange={(e) => setInstitution(e.target.value)}
            placeholder="Institution"
          />
        </div>
        
        <button className="save-button-club" onClick={handleSave}>
          {item ? 'UPDATE' : 'SAVE'}
        </button>
      </div>
    </div>
  );
};

export default WidgetClub;