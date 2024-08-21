import React, { useState } from 'react';
import { X, Edit2 } from 'lucide-react';
import '../../css/StudentPortalStyles/StudentPortalWidget.css';

const ClubWidgetPopup = ({ isOpen, onClose }) => {
  const [yearOfTerm, setYearOfTerm] = useState('2024');
  const [position, setPosition] = useState('');
  const [institution, setInstitution] = useState('');

  if (!isOpen) return null;

  return (
    <div className="club-widget-overlay">
      <div className="club-widget-popup ">
        <button className="close-button-club mt-3" onClick={onClose}>
          <X size={24} color="white" />
        </button>
        <h2 className="club-title mt-5">
          LEO Club <Edit2 size={20} color="white" />
        </h2>
        
        <div className="input-group-club">
          <div className="input-field-club">
            <label className="label-club">Year of Term</label>
            <select 
              value={yearOfTerm} 
              className="select-club"
              onChange={(e) => setYearOfTerm(e.target.value)}
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
          </div>
          <div className="input-field-club">
            <label className="label-club">Position</label>
            <input 
              type="text" 
              className="input-club"
              value={position} 
              onChange={(e) => setPosition(e.target.value)}
              placeholder="President"
            />
          </div>
        </div>
        
        <div className="input-field-club">
          <label>Institution</label>
          <input 
            type="text" 
            value={institution} 
            className="input-club"
            onChange={(e) => setInstitution(e.target.value)}
            placeholder="UCSI University"
          />
        </div>
        
        <button className="save-button-club">SAVE</button>
      </div>
    </div>
  );
};

export default ClubWidgetPopup;