import React from 'react';
import DropdownFilter from '../../../Components/SchoolPortalComp/Application/DropdownFilter';

const SearchBar = ({ onSearch, onReset, onFilterChange }) => {
  const applicationStatusOptions = [
    { label: 'Pending', value: 'Pending' },
    { label: 'Accepted', value: 'Accepted' },
    { label: 'Rejected', value: 'Rejected' },
  ];

  const academicQualificationOptions = [
    { label: 'SPM', value: 'SPM' },
    { label: 'STPM', value: 'STPM' },
    { label: 'Foundation', value: 'Foundation' },
  ];

  const coursesAppliedOptions = [
    { label: 'Degree in Business Computing', value: 'Business Computing' },
    { label: 'Degree in Computer Science', value: 'Computer Science' },
    // Add more course options here
  ];

  return (
    <div className="search-bar">
      <input 
        type="text" 
        placeholder="Search for Students" 
        onChange={(e) => onSearch(e.target.value)} 
      />
      
      <DropdownFilter 
        label="Application Status" 
        options={applicationStatusOptions} 
        onSelect={(value) => onFilterChange('applicationStatus', value)} 
      />
      
      <DropdownFilter 
        label="Academic Qualification" 
        options={academicQualificationOptions} 
        onSelect={(value) => onFilterChange('academicQualification', value)} 
      />
      
      <DropdownFilter 
        label="Courses Applied" 
        options={coursesAppliedOptions} 
        onSelect={(value) => onFilterChange('coursesApplied', value)} 
      />
      
      <button onClick={onReset} className="reset-filter">
        Reset Filter
      </button>
    </div>
  );
};

export default SearchBar;
