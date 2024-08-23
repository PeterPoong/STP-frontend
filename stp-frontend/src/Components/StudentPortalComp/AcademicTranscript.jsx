import React, { useState, useRef, useCallback } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Edit2, Trash2, Eye, Plus, Search, GripVertical, ChevronDown, Info, FileText, X, Check } from 'lucide-react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Tooltip } from '@mui/material';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css';
import "../../css/StudentPortalStyles/StudentPortalAcademicTranscript.css";
import WidgetFileUpload from "../../Components/StudentPortalComp/WidgetFileUpload";
import WidgetPopUpDelete from "../../Components/StudentPortalComp/WidgetPopUpDelete";

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

const SubjectBasedExam = ({ examType, subjects, onSubjectsChange }) => {
  const [editingIndex, setEditingIndex] = useState(null);

  const handleGradeChange = (index, grade) => {
    const updatedSubjects = subjects.map((subject, i) =>
      i === index ? { ...subject, grade } : subject
    );
    onSubjectsChange(examType, updatedSubjects);
  };

  const handleNameChange = (index, name) => {
    const updatedSubjects = subjects.map((subject, i) =>
      i === index ? { ...subject, name } : subject
    );
    onSubjectsChange(examType, updatedSubjects);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleSave = () => {
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    const updatedSubjects = subjects.filter((_, i) => i !== index);
    onSubjectsChange(examType, updatedSubjects);
  };

  const getGradeColor = (grade) => {
    if (grade.includes('A')) return 'bg-success';
    if (grade.includes('B')) return 'bg-danger';
    if (grade.includes('C')) return 'bg-warning text-dark';
    return 'bg-secondary';
  };

  return (
    <div className="space-y-2 mb-4">
      {subjects.map((subject, index) => (
        <div key={index} className="d-flex align-items-center justify-content-between bg-white p-2 mb-2 rounded border">
          <div className="d-flex align-items-center flex-grow-1">
            <GripVertical className="me-3" size={20} />
            {editingIndex === index ? (
              <input
                type="text"
                value={subject.name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                className="editingplaceholder"
                placeholder="Please enter you subjectname"
              />
            ) : (
              <span className="fw-medium h6 mb-0 me-3">{subject.name}</span>
            )}
            {editingIndex === index ? (
              <input
                type="text"
                value={subject.grade}
                onChange={(e) => handleGradeChange(index, e.target.value)}
                className="editingplaceholder"
                placeholder="Please enter you grade"
              />
            ) : (
              <span className={`badge rounded-pill ${getGradeColor(subject.grade)}`}>
                GRADE: {subject.grade}
              </span>
            )}
          </div>
          <div>
            {editingIndex === index ? (
              <Check onClick={handleSave} className="text-success cursor-pointer me-2" />
            ) : (
              <Edit2 className="iconat me-2" onClick={() => handleEdit(index)} />
            )}
            <Trash2 className="iconat-trash" onClick={() => handleDelete(index)} />
          </div>
        </div>
      ))}
    </div>
  );
};

const ProgramBasedExam = ({ examType, subjects, onSubjectsChange }) => {
  const [newSubject, setNewSubject] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleGradeChange = (index, grade) => {
    const updatedSubjects = subjects.map((subject, i) =>
      i === index ? { ...subject, grade } : subject
    );
    onSubjectsChange(examType, updatedSubjects);
  };

  const handleNameChange = (index, name) => {
    const updatedSubjects = subjects.map((subject, i) =>
      i === index ? { ...subject, name } : subject
    );
    onSubjectsChange(examType, updatedSubjects);
  };

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (newSubject.trim() !== '') {
      const updatedSubjects = [...subjects, { name: newSubject, grade: '' }];
      onSubjectsChange(examType, updatedSubjects);
      setNewSubject('');
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleSave = () => {
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    const updatedSubjects = subjects.filter((_, i) => i !== index);
    onSubjectsChange(examType, updatedSubjects);
  };

  const getGradeColor = (grade) => {
    if (grade.includes('A')) return 'bg-success';
    if (grade.includes('B')) return 'bg-danger';
    if (grade.includes('C')) return 'bg-warning text-dark';
    return 'bg-secondary';
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
          <CSSTransition key={index} classNames="fade" timeout={300}>
            <div className="d-flex align-items-center justify-content-between bg-white p-2 mb-2 rounded border">
              <div className="d-flex align-items-center flex-grow-1">
                <GripVertical className="me-3" size={20} />
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={subject.name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    className="editingplaceholder"
                    placeholder="Please enter you subjectname" F
                  />
                ) : (
                  <span className="fw-medium h6 mb-0 me-3">{subject.name}</span>
                )}
                {editingIndex === index ? (
                  <input
                    type="text"
                    className="editingplaceholder"
                    placeholder="Please enter you grade"
                    value={subject.grade}
                    onChange={(e) => handleGradeChange(index, e.target.value)}
                  />) : (
                  subject.grade && (
                    <span className={`badge rounded-pill ms-2 ${getGradeColor(subject.grade)}`}>
                      GRADE: {subject.grade}
                    </span>
                  ))}
              </div>
              {editingIndex === index ? (
                <Check onClick={handleSave} className="text-success cursor-pointer me-2" />
              ) : (
                <Edit2 className="iconat" onClick={() => handleEdit(index)} />
              )}
              <Trash2 className="iconat-trash" onClick={() => handleDelete(index)} />
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

  const [examData, setExamData] = useState({
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
    'A-Level': [
      { name: 'Mathematics', grade: 'A' },
      { name: 'Physics', grade: 'z' },
      { name: 'Chemistry', grade: 'C' },
    ],
    'STPM': [
      { name: 'Pengajian Am', grade: 'B' },
      { name: 'Mathematics (T)', grade: 'B' },
      { name: 'Physics', grade: 'B' },
      { name: 'Chemistry', grade: 'B' },
    ],
    'Foundation': [
      { name: 'Mathematics', grade: 'A' },
      { name: 'Physics', grade: 'A' },
      { name: 'Chemistry', grade: 'A' },
      { name: 'Biology', grade: 'A' },
    ],
    'Diploma': [
      { name: 'Mathematics', grade: 'D' },
      { name: 'Computer Science', grade: 'D' },
      { name: 'Database Management', grade: 'A' },
      { name: 'Programming', grade: 'C' },
    ],
  });

  const handleSubjectsChange = useCallback((examType, updatedSubjects) => {
    setExamData(prevData => ({
      ...prevData,
      [examType]: updatedSubjects
    }));
  }, []);

  const isSubjectBased = ['SPM', 'UEC', 'O-Level', 'GCSE', 'IGCSE', 'SSCE', 'SAT / ACT'].includes(selectedExam);
  const isProgramBased = ['A-Level', 'STPM', 'Foundation', 'Diploma'].includes(selectedExam);

  const renderExamComponent = () => {
    if (isSubjectBased) {
      return <SubjectBasedExam
        examType={selectedExam}
        subjects={examData[selectedExam]}
        onSubjectsChange={handleSubjectsChange}
      />;
    } else if (isProgramBased) {
      return <ProgramBasedExam
        examType={selectedExam}
        subjects={examData[selectedExam]}
        onSubjectsChange={handleSubjectsChange}
      />;
    }
    return <div>Exam type not implemented yet</div>;
  };

  const [files, setFiles] = useState([
    { id: 1, title: 'Trial 1 Result', date: 'Thu Nov 23 2023 18:00', filename: 'example_filename3.pdf' }
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);

  // Filter files based on search term
  const filteredFiles = files.filter(file =>
    file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFiles = filteredFiles.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredFiles.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Function to add new file
  // Update the addFile function
  const addFile = (newFile) => {
    setFiles(prevFiles => [...prevFiles, { ...newFile, id: Date.now() }]);
    setIsFileUploadOpen(false);
  };
  // Function to delete file
  const deleteFile = () => {
    setFiles(files.filter(file => file.id !== fileToDelete.id));
    setIsDeletePopupOpen(false);
    setFileToDelete(null);
  };

  // Function to open delete popup
  const openDeletePopup = (file) => {
    setFileToDelete(file);
    setIsDeletePopupOpen(true);
  };

  // Function to view file (placeholder)
  const viewFile = (file) => {
    console.log("Viewing file:", file);
    // Implement file viewing logic here
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

        <div className="mb-4">
          <div className="d-flex justify-content-start align-item-centger flex-wrap ">
            <span className="me-3 align-self-center">Show</span>
            <select
              className="show-option-table me-3"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="me-2 align-self-center">entries</span>
            <input
              className="search"
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="button-table w-25 px-5 ml-auto" onClick={() => setIsFileUploadOpen(true)}>ADD NEW</button>
          </div>
        </div>

        <table className="w-100  justify-content-around">
          <thead>
            <tr>
              <th className="border-bottom p-2">Files</th>
              <th className="border-bottom p-2 text-end">Filename</th>
              <th className="border-bottom p-2 text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            <TransitionGroup component={null}>
              {currentFiles.map((file) => (
                <CSSTransition key={file.id} timeout={500} classNames="fade">
                  <tr>
                    <td className="border-bottom p-2">
                      <div className="d-flex align-items-center">
                        <FileText className="file-icon me-2" />
                        <div>
                          <div className="file-title">{file.title}</div>
                          <div className="file-date">{file.date}</div>
                        </div>
                      </div>
                    </td>
                    <td className="border-bottom p-2 text-end">{file.filename}</td>
                    <td className="border-bottom p-2">
                      <div className="d-flex justify-content-end align-items-center">
                        <Trash2 className="iconat-trash" onClick={() => openDeletePopup(file)} />
                        <Eye className="iconat" onClick={() => viewFile(file)} />
                      </div>
                    </td>
                  </tr>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </tbody>
        </table>

        <div className="pagination">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            &lt;
          </button>
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={currentPage === number ? 'active' : ''}
            >
              {number}
            </button>
          ))}
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageNumbers.length}>
            &gt;
          </button>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button className="button-table w-25 px-5 text-center">SAVE</button>
        </div>
      </div>

      <WidgetFileUpload
        isOpen={isFileUploadOpen}
        onClose={() => setIsFileUploadOpen(false)}
        onSave={addFile}
      />

      <WidgetPopUpDelete
        isOpen={isDeletePopupOpen}
        onClose={() => {
          setIsDeletePopupOpen(false);
          setFileToDelete(null);
        }}
        onConfirm={deleteFile}
      />
    </div>
  );
};

export default AcademicTranscript;