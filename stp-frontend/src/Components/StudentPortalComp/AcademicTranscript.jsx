import React, { useState, useEffect, useCallback } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Edit2, Trash2, Eye, Plus, Search, GripVertical, ChevronDown, Info, FileText, X, Check } from 'lucide-react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Tooltip } from '@mui/material';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css';
import "../../css/StudentPortalStyles/StudentPortalAcademicTranscript.css";
import WidgetFileUploadAcademicTranscript from "../../Components/StudentPortalComp/WidgetFileUploadAcademicTranscript";
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
              key={exam.id}
              variant={selectedExam === exam.transcript_category ? "contained" : "outlined"}
              color="primary"
              font-family="Ubuntu"
              onClick={() => setSelectedExam(exam.transcript_category)}
              style={{
                margin: '1.5rem 2rem',
                borderRadius: '0px',
                backgroundColor: selectedExam === exam.transcript_category ? 'white' : 'transparent',
                color: selectedExam === exam.transcript_category ? '#4b5563' : '#4b5563',
                borderColor: selectedExam === exam.transcript_category ? 'transparent' : 'transparent',
                borderbottom: selectedExam === exam.transcript_category ? 'red' : 'transparent',
              }}
            >
              {exam.transcript_category}
            </Button>
          ))}
        </Paper>
      ))}
    </Carousel>
  );
};

const SubjectBasedExam = ({ examType, subjects, onSubjectsChange, files }) => {
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
              <span className={` rounded-pill px-4 text-white ${getGradeColor(subject.grade)}`}>
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

const ProgramBasedExam = ({ examType, subjects, onSubjectsChange, files }) => {
  // Add this check at the beginning of the component
  if (!subjects || !Array.isArray(subjects)) {
    console.error(`Subjects for ${examType} is not an array:`, subjects);
    return <div>No data available for {examType}</div>;
  }

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
                    placeholder="Please enter you subjectname"
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
                    <span className={`rounded-pill px-4 text-white ms-2 ${getGradeColor(subject.grade)}`}>
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
  const [categories, setCategories] = useState([]);
  const [examBasedCategories, setExamBasedCategories] = useState([]);
  const [programBasedCategories, setProgramBasedCategories] = useState([]);
  const [selectedExam, setSelectedExam] = useState('');
  const [mediaData, setMediaData] = useState({});

  const [examData, setExamData] = useState({
    'SPM': [],
    'UEC': [],
    'O-Level': [],
    'GCSE': [],
    'IGCSE': [],
    'SSCE': [],
    'SAT / ACT': [],
    'A-level': [],
    'STPM': [],
    'Foundation': [],
    'Diploma': [],
  });

  const handleSubjectsChange = useCallback((examType, updatedSubjects) => {
    setExamData(prevData => ({
      ...prevData,
      [examType]: updatedSubjects
    }));
  }, []);

  // Initialize files as an empty array
  const [files, setFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [subjects, setSubjects] = useState([]);

  const filteredFiles = files.filter(file =>
    file.studentMedia_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.studentMedia_location.toLowerCase().includes(searchTerm.toLowerCase())
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

  const addFile = async (newFile) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const category = categories.find(cat => cat.transcript_category === selectedExam);
      
      if (!category) {
        console.error('Selected exam category not found');
        return { success: false, message: 'Selected exam category not found' };
      }
  
      const formData = new FormData();
      formData.append('studentMedia_type', category.id.toString());
      formData.append('studentMedia_location', newFile.file);
      formData.append('studentMedia_name', newFile.title);
      formData.append('studentMedia_format', 'Photo'); // Assuming it's always a photo, adjust if needed
  
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/addTranscriptFile`, {
        method: 'POST', 
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        fetchMediaByCategory(category.id);
        setIsFileUploadOpen(false);
        return { success: true };
      } else {
        console.error('Error adding file:', data.message);
        return { success: false, message: data.message, error: data.error };
      }
    } catch (error) {
      console.error('Error adding file:', error);
      return { success: false, message: 'An unexpected error occurred' };
    }
    setIsFileUploadOpen(false);
  };

  const editFile = async (updatedFile) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const category = categories.find(cat => cat.transcript_category === selectedExam);
      
      if (!category) {
        console.error('Selected exam category not found');
        return;
      }

      const formData = new FormData();
      
      formData.append('id', updatedFile.id);
      formData.append('studentMedia_type', category.id.toString());
      formData.append('studentMedia_name', updatedFile.title);
      
      if (updatedFile.isNewFile) {
        formData.append('studentMedia_location', updatedFile.file);
    } else if (updatedFile.file) {
        formData.append('studentMedia_location', updatedFile.file);
    }

    // Console log to see what's being sent
    console.log('Editing file with data:', {
        id: updatedFile.id,
        studentMedia_type: category.id,
        studentMedia_name: updatedFile.title,
        studentMedia_location: updatedFile.isNewFile ? 'New File' : (updatedFile.file || 'Unchanged')
    });

      // Log the FormData contents
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/editTranscriptFile`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        console.log('File edited successfully:', data);
        fetchMediaByCategory(category.id);
      } else {
        console.error('Error editing file:', data.message);
        alert(`Error editing file: ${data.message}`);
      }
    } catch (error) {
      console.error('Error editing file:', error);
      alert('An unexpected error occurred while editing the file.');
    }
    setIsFileUploadOpen(false);
    setCurrentFile(null);
  };

  // Update the existing editFile function to open the edit modal
  const openEditModal = (file) => {
    setCurrentFile(file);
    setIsViewMode(false);
    setIsFileUploadOpen(true);
  };

  // Function to delete file
  const deleteFile = async () => {
    if (!fileToDelete) return;
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/deleteTranscriptFile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id: fileToDelete.id, type: "delete" }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error deleting file:', errorData);
        return;
      }
      
      const data = await response.json();
      if (data.success) {
        console.log('File deleted successfully');
        fetchMediaByCategory(categories.find(cat => cat.transcript_category === selectedExam).id);
      } else {
        console.error('Error deleting file:', data.message);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
    setIsDeletePopupOpen(false);
    setFileToDelete(null);
  };

  // Function to open delete popup
  const openDeletePopup = (file) => {
    setFileToDelete(file);
    setIsDeletePopupOpen(true);
  };

  // Function to view file
  const viewFile = (file) => {
    setCurrentFile(file);
    setIsViewMode(true);
    setIsFileUploadOpen(true);
  };

  useEffect(() => {
    fetchTranscriptCategories();
  }, []);

  const fetchTranscriptCategories = async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/transcriptCategoryList`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },

      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('API RESPONSE', result);

      if (result.success && Array.isArray(result.data.data)) {
        setCategories(result.data.data);
        
        // Manually categorize transcript categories
        const examBased = ['SPM', 'O-level', 'GCSE', 'IGCSE', 'SSCE', 'UEC', 'SAT / ACT'];
        const programBased = ['STPM', 'A-level', 'Foundation', 'Diploma'];

        setExamBasedCategories(result.data.data.filter(cat => examBased.includes(cat.transcript_category)));
        setProgramBasedCategories(result.data.data.filter(cat => programBased.includes(cat.transcript_category)));

        // Set initial selected exam
        if (result.data.data.length > 0) {
          setSelectedExam(result.data.data[0].transcript_category);
          fetchMediaByCategory(result.data.data[0].id);
        }
      } else {
        console.error('Unexpected data structure:', result);
        setCategories([]);
        setExamBasedCategories([]);
        setProgramBasedCategories([]);
      }
    } catch (error) {
      console.error('Error fetching transcript categories:', error);
      setCategories([]);
      setExamBasedCategories([]);
      setProgramBasedCategories([]);
    }
  };

  const fetchMediaByCategory = async (categoryId) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/mediaListByCategory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ category_id: categoryId }),
      });
      const data = await response.json();
      console.log('API response for media:', data);
      if (data.success && data.data && data.data.data) {
        setFiles(data.data.data);
      } else {
        setFiles([]);
      }
    } catch (error) {
      console.error('Error fetching media by category:', error);
      setFiles([]);
    }
  };

  const fetchSubjects = useCallback(async (categoryId) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      let url, method, body;

      if (categoryId === "32") {
        url = `${import.meta.env.VITE_BASE_URL}api/student/transcriptSubjectList`;
        method = 'GET';
      } else {
        url = `${import.meta.env.VITE_BASE_URL}api/student/higherTranscriptSubjectList`;
        method = 'POST';
        body = JSON.stringify({ id: categoryId });
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        ...(method === 'POST' && { body }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        if (categoryId === "32") {
          setSubjects(result.data.map(subject => ({
            id: subject.subject_id,
            name: subject.subject_name,
            grade: subject.subject_grade
          })));
        } else {
          setSubjects(result.data.map(subject => ({
            id: subject.id,
            name: subject.highTranscript_name,
            grade: subject.higherTranscript_grade
          })));
        }
      } else {
        console.error('Failed to fetch subjects:', result);
        setSubjects([]);
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
      setSubjects([]);
    }
  }, []);

  useEffect(() => {
    if (selectedExam) {
      const category = categories.find(cat => cat.transcript_category === selectedExam);
      if (category) {
        fetchMediaByCategory(category.id);
        fetchSubjects(category.id.toString());
      }
    }
  }, [selectedExam, categories, fetchSubjects]);

  const renderExamComponent = () => {
    const categoryId = categories.find(cat => cat.transcript_category === selectedExam)?.id;
    const files = mediaData[categoryId] || [];

    if (examBasedCategories.some(cat => cat.transcript_category === selectedExam)) {
      return <SubjectBasedExam
        examType={selectedExam}
        subjects={subjects}
        onSubjectsChange={handleSubjectsChange}
        files={files}
      />;
    } else if (programBasedCategories.some(cat => cat.transcript_category === selectedExam)) {
      return <ProgramBasedExam
        examType={selectedExam}
        subjects={subjects}
        onSubjectsChange={handleSubjectsChange}
        files={files}
      />;
    }
    return <div>No data available for {selectedExam}</div>;
  };

  return (
    <div className='p-0'>
       <ExamSelector
        exams={categories}
        selectedExam={selectedExam}
        setSelectedExam={(exam) => {
          setSelectedExam(exam);
          const categoryId = categories.find(cat => cat.transcript_category === exam)?.id;
          if (categoryId) fetchMediaByCategory(categoryId);
        }}
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
                          <div className="file-title">{file.studentMedia_name}</div>
                          <div className="file-date">{file.status}</div>
                        </div>
                      </div>
                    </td>
                    <td className="border-bottom p-2 text-end">{file.studentMedia_location || 'N/A'}</td>
                    <td className="border-bottom p-2">
                      <div className="d-flex justify-content-end align-items-center">
                        <Trash2 size={18} className="iconat-trash" onClick={() => openDeletePopup(file)} />
                        <Edit2 size={18}   className="iconat" onClick={() => openEditModal(file)} />
                        <Eye size={18}  className="iconat" onClick={() => viewFile(file)} />
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

      <WidgetFileUploadAcademicTranscript
        isOpen={isFileUploadOpen}
        onClose={() => {
          setIsFileUploadOpen(false);
          setCurrentFile(null);
          setIsViewMode(false);
        }}
        onSave={(file) => {
          console.log('File to be saved/edited:', file);
          return currentFile ? editFile({...file, studentMedia_type: currentFile.studentMedia_type}) : addFile(file);
        }}
        item={currentFile}
        isViewMode={isViewMode}
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