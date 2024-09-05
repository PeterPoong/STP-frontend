import React from 'react';

const DropdownFilter = ({ options, onSelect, label }) => {
  return (
    <div className="dropdown-filter">
      <label>{label}</label>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownFilter;
