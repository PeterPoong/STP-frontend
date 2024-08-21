import React, { useState, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Edit2, Trash2, Eye, Plus, Search, GripVertical, ChevronDown, Info, FileText } from 'lucide-react';
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
            <Trash2 className="iconat-trash"/>
            <Edit2 className="iconat" />
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
};const ProgramBasedExam = ({ examType, defaultSubjects }) => {
  const [subjects, setSubjects] = useState(defaultSubjects.map(subject => ({ name: subject, grade: '' })));
  const [newSubject, setNewSubject] = useState('');
  const nodeRef = useRef(null);

  const handleGradeChange = (index, grade) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].grade = grade;
    setSubjects(updatedSubjects);
  };

  const getGradeColor = (grade) => {
    if (grade.includes('A')) return 'bg-success';
    if (grade.includes('B')) return 'bg-danger';
    if (grade.includes('C')) return 'bg-warning text-dark';
    return 'bg-secondary';
  };

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (newSubject.trim() !== '') {
      setSubjects(prevSubjects => [...prevSubjects, { name: newSubject, grade: '' }]);
      setNewSubject('');
    }
  };

  return (
    <div>
      <div className="mb-4">
        <div className="d-flex justify-content-around">
          <div className="w-1/2">
            <label className="fw-bold small formlabel">Programme Name <span className="text-danger">*</span></label>
            <input type="text" className="inputat" />
          </div>
          <div className="w-1/2">
            <label className="fw-bold small formlabel">CGPA *</label>
            <input type="text" className="inputat" />
          </div>
        </div>
      </div>
      <TransitionGroup className="space-y-2 mb-4">
        {subjects.map((subject, index) => (
          <CSSTransition key={index} classNames="fade" timeout={300} nodeRef={nodeRef}>
            <div ref={nodeRef} className="d-flex align-items-center justify-content-between bg-white p-2 mb-2 rounded border">
              <div className="d-flex align-items-center flex-grow-1">
                <GripVertical className="me-3" size={20} />
                <span className="fw-medium h6 mb-0 me-3">{subject.name}</span>
                <input
                  type="text"
                  placeholder="Enter grade"
                  className="border rounded px-2 py-1 w-20"
                  value={subject.grade}
                  onChange={(e) => handleGradeChange(index, e.target.value)}
                />
                {subject.grade && (
                  <span className={`badge rounded-pill ms-2 ${getGradeColor(subject.grade)}`}>
                    GRADE: {subject.grade}
                  </span>
                )}
              </div>
              <Trash2 className="iconat-trash" />
              <Edit2 className="iconat" />
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
      <form onSubmit={handleAddSubject} className="mb-4">
        <label className="fw-bold small formlabel mb-2">Insert a subject/course:</label>
        <div className="d-flex justify-content-center position-relative">
          <input
            type="text"
            className="subject-input"
            placeholder="Enter subject name"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
          />
          <button type="submit" className="add-button">
            <Plus size={15} />
          </button>
        </div>
      </form>
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
    'O-Level': [
      { name: 'English Language', grade: 'A*' },
      { name: 'Mathematics', grade: 'A' },
      { name: 'Physics', grade: 'B' },
      { name: 'Chemistry', grade: 'A' },
      { name: 'Biology', grade: 'B' },
    ],
    'GCSE': [
      { name: 'English Language', grade: '9' },
      { name: 'Mathematics', grade: '8' },
      { name: 'Science (Double Award)', grade: '7-7' },
      { name: 'History', grade: '6' },
    ],
    'IGCSE': [
      { name: 'English as a Second Language', grade: 'A' },
      { name: 'Mathematics', grade: 'A*' },
      { name: 'Physics', grade: 'A' },
      { name: 'Chemistry', grade: 'B' },
    ],
    'SSCE': [
      { name: 'English Language', grade: 'A1' },
      { name: 'Mathematics', grade: 'B2' },
      { name: 'Physics', grade: 'B3' },
      { name: 'Chemistry', grade: 'A2' },
    ],
    'SAT / ACT': [
      { name: 'SAT Math', grade: '800' },
      { name: 'SAT Evidence-Based Reading and Writing', grade: '750' },
      { name: 'ACT Composite Score', grade: '34' },
    ],
  };

  const programBasedExams = {
   'A-Level': ['Mathematics', 'Physics', 'Chemistry'],
    'STPM': ['Pengajian Am', 'Mathematics (T)', 'Physics', 'Chemistry'],
    'Foundation': ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
    'Diploma': ['Mathematics', 'Computer Science', 'Database Management', 'Programming'],
  };

  const renderExamComponent = () => {
    if (Object.keys(subjectBasedExams).includes(selectedExam)) {
      return <SubjectBasedExam examType={selectedExam} subjects={subjectBasedExams[selectedExam]} />;
    } else if (Object.keys(programBasedExams).includes(selectedExam)) {
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
          <div className="d-flex justify-content-start align-item-centger flex-wrap ">
            <span className="me-3 align-self-center" >Show</span>
            <select className="show-option-table me-3">
              <option>10</option>
              <option>20</option>
              <option>50</option>
              <option>10</option>
              <option>20</option>
              <option>50</option>
              <option>10</option>
              <option>20</option>
              <option>50</option>
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
            <span class="me-2 align-self-center">entries</span>
            <input
              class="search"
              type="search"
              placeholder="Search..."
            />
            <button className=" button-table w-25 px-5 ml-auto">ADD NEW</button>
          </div>
        </div>

        <table className="w-100 ">
          <thead>
            <tr className>
              <th className="border-bottom p-2">Files</th>
              <th className="border-bottom p-2 text-end">Filename</th>
              <th className="border-bottom p-2 text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-bottom p-2">
                <div className="d-flex align-items-center">
                  <FileText className="file-icon me-2" />
                  <div>
                    <div className="file-title">Trial 1 Result</div>
                    <div className="file-date">Thu Nov 23 2023 18:00</div>
                  </div>
                </div>
              </td>
              <td className="border-bottom  p-2 text-end">example_filename3.pdf</td>
              <td className="border-bottom  p-2 d-flex justify-content-end ">
                <Trash2 className="iconat-trash " />
                <Edit2 className="iconat" />
                <Eye className="iconat " />
              </td>
            </tr>

          </tbody>
        </table>

        <div className="d-flex justify-content-end mt-4">
          <button className="button-table w-25 px-5 text-center">SAVE</button>
        </div>
      </div>
    </div>
  );
};

export default AcademicTranscript;