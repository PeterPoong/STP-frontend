import React, { useState } from 'react';
import { Edit2, Trash2, Eye, Plus, Search, GripVertical, ChevronDown, Info } from 'lucide-react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Tooltip } from '@mui/material';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css';
import "../../css/StudentPortalStyles/StudentPortalAcademicTranscript.css";

const ExamSelector = ({ exams, selectedExam, setSelectedExam }) => {
  const itemsPerPage = 5;
  const pages = [];
  for (let i = 0; i < exams.length; i += itemsPerPage) {
    pages.push(exams.slice(i, i + itemsPerPage));
  }

  return (
    <Carousel
      height="6rem"
      animation="slide"
      autoPlay={false}
      navButtonsAlwaysVisible
      navButtonsProps={{
        style: {
          backgroundColor: '#f3f4f6',
          borderRadius: 0,
          color: '#4b5563',
          margin: 0,
          padding: 0,
        }
      }}
      indicatorContainerProps={{
        style: {
          display: 'none',
          // Hide the indicators
        }
      }}
    >
      {pages.map((page, index) => (
        <Paper key={index} elevation={0} style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'transparent', margin: "0em" }}>
          {page.map((exam) => (
            <Button
              key={exam}
              variant={selectedExam === exam ? "contained" : "outlined"}
              color="primary"
              font-family="Ubuntu"
              onClick={() => setSelectedExam(exam)}
              style={{
                margin: '1.5rem 2rem',
                borderRadius: '0px',
                backgroundColor: selectedExam === exam ? 'white' : 'transparent',
                color: selectedExam === exam ? '#4b5563' : '#4b5563',
                borderColor: selectedExam === exam ? 'transparent' : 'transparent',
                borderbottom: selectedExam === exam ? 'red' : 'transparent',
              }}
            >
              {exam}
            </Button>
          ))}
        </Paper>
      ))}
    </Carousel>
  );
};



const SubjectBasedExam = ({ examType, subjects }) => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const subjectOptions = subjects.map(subject => ({
    name: subject.name,
    value: subject.name
  }));

  const handleSubjectSelect = (selectedValue) => {
    setSelectedSubject(selectedValue);
    setIsOpen(false);
  };

  const handleAddSubject = () => {
    if (selectedSubject) {
      console.log('Adding subject:', selectedSubject);
      // Add your logic here to handle adding the subject
      setSelectedSubject('');
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const renderValue = (valueProps, snapshot, className) => {
    return (
      <div className="select-search-container" onClick={toggleDropdown}>
        <div className="select-search-header">
          <input
            {...valueProps}
            className="select-search-input"
            placeholder="Enter subject name"
            readOnly
          />
          <ChevronDown
            size={20}
            className={`chevron-icon ${isOpen ? 'open' : ''}`}
          />
        </div>
        <button className="add-subject-button" onClick={handleAddSubject}>
          <Plus size={16} />
        </button>
      </div>
    );
  };
  const renderOption = (optionProps, optionData, optionSnapshot, className) => {
    return (
      <button {...optionProps} className={`select-search-option ${className}`}>
        {optionData.name}
      </button>
    );
  };

  return (
    <div>
     
      <div className="space-y-2 mb-4">
        {subjects.map((subject, index) => (
          <div key={index} className="d-flex align-items-center justify-content-between bg-white p-2 mb-2 rounded border">
            <div className="d-flex align-items-center flex-grow-1">
              <GripVertical className="me-3" size={20} />
              <span className="fw-medium h6 mb-0 me-3">{subject.name}</span>
              <span className={`badge rounded-pill ${subject.grade.includes('A') ? 'bg-success' :
                subject.grade.includes('B') ? 'bg-danger' :
                  subject.grade.includes('C') ? 'bg-warning text-dark' :
                    'bg-secondary'
                }`}>
                GRADE: {subject.grade}
              </span>
            </div>
            <Edit2 className="text-secondary cursor-pointer" size={20} />
          </div>
        ))}
      </div>
      <div className="mb-4">
        <label className="fw-bold small formlabel">Insert a subject/course:</label>
        <SelectSearch
          options={subjectOptions}
          value={selectedSubject}
          onChange={handleSubjectSelect}
          search
          renderValue={renderValue}
          renderOption={renderOption}
        />
      </div>

      <div className="mb-4">
        <label className="fw-bold small formlabel">Search for a subject:</label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input type="text" className="flex-1 block w-full rounded-none rounded-l-md border-gray-300" placeholder="Search subjects" />
          <button className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500">
            <Search size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ProgramBasedExam = ({ examType, defaultSubjects }) => {
  return (
    <div>
      <div className="mb-4">
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="fw-bold small formlabel">Programme Name *</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">CGPA *</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
          </div>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        {defaultSubjects.map((subject, index) => (
          <div key={index} className="flex items-center justify-between bg-white p-2 rounded shadow">
            <div className="flex items-center space-x-2">
              <span className="font-medium">{subject}</span>
              <input type="text" placeholder="Enter grade" className="border rounded px-2 py-1 w-20" />
            </div>
            <div className="flex space-x-2">
              <Trash2 className="w-4 h-4 text-red-500 cursor-pointer" />
              <Edit2 className="w-4 h-4 text-gray-500 cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Insert a subject/course:</label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input type="text" className="flex-1 block w-full rounded-none rounded-l-md border-gray-300" placeholder="Enter subject name" />
          <button className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500">
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const AcademicTranscript = () => {
  const [selectedExam, setSelectedExam] = useState('SPM');
  const exams = ['SPM', 'O-Level', 'GCSE', 'IGCSE', 'SSCE', 'A-Level', 'STPM', 'Foundation', 'Diploma', 'UEC', 'SAT / ACT'];

  const subjectBasedExams = {
    'SPM': [
      { name: 'Bahasa Melayu', grade: 'A+' },
      { name: 'Bahasa Inggeris', grade: 'A+' },
      { name: 'Matematik', grade: 'B+' },
      { name: 'Sains', grade: 'C+' },
      { name: 'Sejarah', grade: 'A+' },
    ],
    'UEC': [
      { name: 'Chinese', grade: 'A1' },
      { name: 'English', grade: 'A2' },
      { name: 'Mathematics', grade: 'B3' },
    ],
    'SAT / ACT': [
      { name: 'SAT Math', grade: '800' },
      { name: 'SAT Evidence-Based Reading and Writing', grade: '750' },
    ],
  };

  const programBasedExams = {
    'A-Level': ['Mathematics', 'Physics', 'Chemistry'],
    'STPM': ['Pengajian Am', 'Mathematics (T)', 'Physics', 'Chemistry'],
    'Foundation': ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
    'Diploma': ['Mathematics', 'Computer Science', 'Database Management', 'Programming'],
  };

  const renderExamComponent = () => {
    if (['SPM', 'UEC', 'SAT / ACT'].includes(selectedExam)) {
      return <SubjectBasedExam examType={selectedExam} subjects={subjectBasedExams[selectedExam]} />;
    } else if (['A-Level', 'STPM', 'Foundation', 'Diploma'].includes(selectedExam)) {
      return <ProgramBasedExam examType={selectedExam} defaultSubjects={programBasedExams[selectedExam]} />;
    }
    return <div>Exam type not implemented yet</div>;
  };

  return (
    <div className='p-0'>
      <ExamSelector
        exams={exams}
        selectedExam={selectedExam}
        setSelectedExam={setSelectedExam}
      />
      <div className="p-5 pt-0">
        {renderExamComponent()}

        <div className="mb-4">
          <div className="flex items-center justify-between">
            <p className="fw-bold small formlabel">Upload {selectedExam} Result Slips
              <Tooltip title="Please upload trial results if full results not yet released" arrow>
                <Info size={16} className="mx-3 text-danger cursor-help" />
              </Tooltip>
            </p>
          </div>
        </div>

        {/* Updated search bar section */}
        <div className="mb-4">
          <div className="d-flex justify-content-around align-item-centger ">
            <span >Show</span>
            <select className="show-option-table">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
            <span >entries</span>
            <input
              type="text"
              placeholder="Search..."
              className="search-filter-table"
            />
            <Search
              size={30}
            />
            <button className=" button-table">ADD NEW</button>
          </div>
        </div>

        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Files</th>
              <th className="border p-2">Filename</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Semester 1 20/21</td>
              <td className="border p-2">example_filename3.pdf</td>
              <td className="border p-2 flex justify-center space-x-2">
                <Trash2 className="w-4 h-4 text-red-500 cursor-pointer" />
                <Edit2 className="w-4 h-4 text-blue-500 cursor-pointer" />
                <Eye className="w-4 h-4 text-gray-500 cursor-pointer" />
              </td>
            </tr>
            <tr>
              <td className="border p-2">Semester 2 21/22</td>
              <td className="border p-2">example_filename4.pdf</td>
              <td className="border p-2 flex justify-center space-x-2">
                <Trash2 className="w-4 h-4 text-red-500 cursor-pointer" />
                <Edit2 className="w-4 h-4 text-blue-500 cursor-pointer" />
                <Eye className="w-4 h-4 text-gray-500 cursor-pointer" />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 bg-red-600 text-white rounded">SAVE</button>
        </div>
      </div>
    </div>
  );
};

export default AcademicTranscript;