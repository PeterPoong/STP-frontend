import React, { useState, useEffect, useCallback } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Edit2, Trash2, Eye, Plus, Search, GripVertical, ChevronDown, Info, FileText, X, Check } from 'lucide-react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Tooltip } from '@mui/material';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css';
import "../../../css/StudentPortalStyles/StudentPortalAcademicTranscript.css";
import WidgetFileUploadAcademicTranscript from "../../../Components/StudentPortalComp/WidgetFileUploadAcademicTranscript";
import WidgetPopUpDelete from "../../../Components/StudentPortalComp/WidgetPopUpDelete";

import "../../../css/StudentPortalStyles/StudentButtonGroup.css";
import WidgetPopUpSubmission from "../../../Components/StudentPortalComp/Widget/WidgetPopUpSubmission";

const ExamSelector = ({ exams, selectedExam, setSelectedExam }) => {
  const itemsPerPage = 5;
  const pages = [];
  for (let i = 0; i < exams.length; i += itemsPerPage) {
    pages.push(exams.slice(i, i + itemsPerPage));
  }

  return (
    <Carousel
      height="5rem"
      animation="slide"
      autoPlay={false}
      navButtonsAlwaysVisible
      navButtonsProps={{
        style: {
          backgroundColor: 'transparent',
          borderRadius: 0,
          color: '#B71A18',
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
              onClick={() => setSelectedExam(exam.transcript_category)}
              sx={{
                margin: { xs: '0rem 0.5rem', sm: '0rem 1rem', md: '0rem 2rem' },
                borderRadius: '0px',
                backgroundColor: selectedExam === exam.transcript_category ? 'white' : 'transparent',
                color: '#4b5563',
                border: 'none',
                borderBottom: selectedExam === exam.transcript_category ? '2px solid #B71A18' : 'none',
                fontFamily: 'Ubuntu, sans-serif',
                boxShadow: 'none',
                width: { xs: '100%', sm: '45%', md: '200px' },
                padding: { xs: '5px 10px', sm: '8px 15px', md: '10px 20px' },
                minWidth: { xs: '100px', sm: '120px', md: '150px' },
                fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },

                '&:hover': {
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  border: 'none',
                  borderBottom: selectedExam === exam.transcript_category ? '2px solid red' : 'none',
                },
                '&:focus': {
                  outline: 'none',
                },
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

const SubjectBasedExam = ({ examType, subjects, onSubjectsChange, files, onSaveAll }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [availableSubjects, setAvailableSubjects] = useState([]);

  useEffect(() => {
    if (examType === 'SPM') {
      fetchAvailableSubjects();
    }
  }, [examType, subjects]);

  const fetchAvailableSubjects = async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/subjectList`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          category: 32,
          selectedSubject: subjects.map(s => s.id)
        }),
      });
      const data = await response.json();
      if (data.success) {
        // Filter out subjects that are already in the subjects list
        const filteredSubjects = data.data.filter(subject =>
          !subjects.some(s => s.id === subject.id)
        );
        setAvailableSubjects(filteredSubjects);
      }
    } catch (error) {
      console.error('Error fetching available subjects:', error);
    }
  };

  const handleAddSubject = (selectedSubject) => {
    const newSubject = availableSubjects.find(s => s.id === parseInt(selectedSubject));
    if (newSubject) {
      const updatedSubjects = [...subjects, { ...newSubject, grade: '', isEditing: true }];
      onSubjectsChange(updatedSubjects);
      setEditingIndex(updatedSubjects.length - 1);  // Set the new subject to edit mode
      setAvailableSubjects(availableSubjects.filter(s => s.id !== newSubject.id));
    }
  };

  const handleGradeChange = (index, grade) => {
    const updatedSubjects = subjects.map((subject, i) =>
      i === index ? { ...subject, grade: grade.toUpperCase() } : subject
    );
    onSubjectsChange(updatedSubjects);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleSave = (index) => {
    const subject = subjects[index];
    if (!subject.name.trim() || !subject.grade.trim()) {
      alert("Both subject name and grade are required.");
      return;
    }
    const updatedSubjects = subjects.map((s, i) =>
      i === index ? { ...s, isEditing: false } : s
    );
    onSubjectsChange(updatedSubjects);
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    const deletedSubject = subjects[index];
    const updatedSubjects = subjects.filter((_, i) => i !== index);
    onSubjectsChange(updatedSubjects);
    // Add the deleted subject back to availableSubjects
    setAvailableSubjects([...availableSubjects, deletedSubject]);
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
            <span className="fw-medium h6 mb-0 me-3">{subject.name}</span>
            {editingIndex === index || subject.isEditing ? (
              <input
                type="text"
                value={subject.grade}
                onChange={(e) => handleGradeChange(index, e.target.value)}
                className="editingplaceholder"
                placeholder="Enter grade"
                required
              />
            ) : (
              subject.grade && (
                <span className={`rounded-pill px-4 text-white ${getGradeColor(subject.grade)}`}>
                  GRADE: {subject.grade}
                </span>
              )
            )}
          </div>
          <div>
            {editingIndex === index || subject.isEditing ? (
              <Check onClick={() => handleSave(index)} className="text-success cursor-pointer me-2" />
            ) : (
              <Edit2 size={18} className="iconat mx-2" onClick={() => handleEdit(index)} />
            )}
            <Trash2 size={18} className="iconat-trash mx-2" onClick={() => handleDelete(index)} />
          </div>
        </div>
      ))}
      {examType === 'SPM' && (
        <div className="my-4">
          <label className="fw-bold small formlabel">Add Subject:</label>
          <select
            className="form-select my-2"
            onChange={(e) => handleAddSubject(e.target.value)}
            value=""
          >
            <option value="">Select a subject</option>
            {availableSubjects.map(subject => (
              <option key={subject.id} value={subject.id}>{subject.name}</option>
            ))}
          </select>
        </div>
      )}
      <div className="d-flex justify-content-end mt-4">
        <button
          className="button-table px-5 py-1 text-center"
          onClick={() => {
            onSaveAll();
            fetchAvailableSubjects(); // Refresh available subjects after saving
          }}
        >
          SAVE
        </button>
      </div>
    </div>
  );
};



const ProgramBasedExam = ({ examType, subjects, onSubjectsChange, files, onSaveAll }) => {
  const [newSubject, setNewSubject] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  console.log('ProgramBasedExam rendered with subjects:', subjects);

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (newSubject.trim() !== '') {
      const newSubjectObj = { name: newSubject, grade: '', isEditing: true };
      const updatedSubjects = [...subjects, newSubjectObj];
      onSubjectsChange(updatedSubjects);
      setNewSubject('');
      setEditingIndex(updatedSubjects.length - 1);  // Set the new subject to edit mode
    }
  };
  const handleGradeChange = (index, grade) => {
    console.log(`Changing grade for subject at index ${index} to:`, grade);
    const updatedSubjects = subjects.map((subject, i) =>
      i === index ? { ...subject, grade } : subject
    );
    console.log('Updated subjects after grade change:', updatedSubjects);
    onSubjectsChange(updatedSubjects);
  };

  const handleNameChange = (index, name) => {
    console.log(`Changing name for subject at index ${index} to:`, name);
    const updatedSubjects = subjects.map((subject, i) =>
      i === index ? { ...subject, name } : subject
    );
    console.log('Updated subjects after name change:', updatedSubjects);
    onSubjectsChange(updatedSubjects);
  };

  const handleEdit = (index) => {
    console.log('Editing subject at index:', index);
    setEditingIndex(index);
  };

  const handleSave = (index) => {
    const subject = subjects[index];
    if (!subject.name.trim() || !subject.grade.trim()) {
      alert("Both subject name and grade are required.");
      return;
    }
    const updatedSubjects = subjects.map((s, i) =>
      i === index ? { ...s, isEditing: false } : s
    );
    onSubjectsChange(updatedSubjects);
    setEditingIndex(null);
  };


  const handleDelete = (index) => {
    console.log('Deleting subject at index:', index);
    const updatedSubjects = subjects.filter((_, i) => i !== index);
    console.log('Updated subjects after deletion:', updatedSubjects);
    onSubjectsChange(updatedSubjects);
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
            <div key={index} className="d-flex align-items-center justify-content-between bg-white p-2 mb-2 rounded border">
              <div className="d-flex align-items-center flex-grow-1">
                <GripVertical className="me-3" size={20} />
                {editingIndex === index || subject.isEditing ? (
                  <>
                    <input
                      type="text"
                      value={subject.name}
                      onChange={(e) => handleNameChange(index, e.target.value)}
                      className="editingplaceholder me-2"
                      placeholder="Enter subject name"
                      required
                    />
                    <input
                      type="text"
                      value={subject.grade}
                      onChange={(e) => handleGradeChange(index, e.target.value)}
                      className="editingplaceholder"
                      placeholder="Enter grade"
                      required
                    />
                  </>
                ) : (
                  <>
                    <span className="fw-medium h6 mb-0 me-3">{subject.name}</span>
                    {subject.grade && (
                      <span className={`rounded-pill px-4 text-white ms-2 ${getGradeColor(subject.grade)}`}>
                        GRADE: {subject.grade}
                      </span>
                    )}
                  </>
                )}
              </div>
              <div>
                {editingIndex === index || subject.isEditing ? (
                  <Check onClick={() => handleSave(index)} className="text-success cursor-pointer me-2" />
                ) : (
                  <Edit2 size={18} className="iconat mx-2" onClick={() => handleEdit(index)} />
                )}
                <Trash2 size={18} className="iconat-trash mx-2" onClick={() => handleDelete(index)} />
              </div>
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
      <div className="d-flex justify-content-end mt-4">
        <button
          className="button-table w-25 px-5 text-center"
          onClick={() => {
            console.log('Save button clicked. Current subjects:', subjects);
            onSaveAll();
          }}
        >
          SAVE
        </button>
      </div>
    </div>
  );
};

const AcademicTranscript = () => {
  const [categories, setCategories] = useState([]);
  const [examBasedCategories, setExamBasedCategories] = useState([]);
  const [programBasedCategories, setProgramBasedCategories] = useState([]);
  const [selectedExam, setSelectedExam] = useState('');
  const [mediaData, setMediaData] = useState({});
  const [isSubmissionPopupOpen, setIsSubmissionPopupOpen] = useState(false);
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


  console.log('AcademicTranscript rendered with subjects:', subjects);

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


  const handleSaveConfirmation = () => {
    setIsSubmissionPopupOpen(true);
  };


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
        return { success: false, message: 'Selected exam category not found' };
      }

      const formData = new FormData();

      formData.append('id', updatedFile.id);
      formData.append('studentMedia_type', category.id.toString());
      formData.append('studentMedia_name', updatedFile.title);

      // Handle file upload logic
      if (updatedFile.file instanceof File) {
        // If a new file is selected, append it to formData
        formData.append('studentMedia_location', updatedFile.file);
        console.log('New file being uploaded:', updatedFile.file.name);
      } else if (updatedFile.file && typeof updatedFile.file === 'string') {
        // If editing and the file hasn't changed, don't send the studentMedia_location field
        console.log('Existing file, not changing:', updatedFile.file);
      } else {
        console.log('No file provided');
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

      console.log('Full API response:', data); // Log the full API response

      if (response.ok && data.success) {
        console.log('File edited successfully:', data);
        fetchMediaByCategory(category.id);
        return { success: true, message: 'File updated successfully' };
      } else {
        console.error('Error editing file:', data);
        console.error('Validation errors:', data.errors); // Log validation errors if present

        // If there are validation errors, log them in detail
        if (data.errors) {
          Object.entries(data.errors).forEach(([field, errors]) => {
            console.error(`Validation error for ${field}:`, errors);
          });
        }

        return {
          success: false,
          message: data.message || 'Failed to edit file',
          errors: data.errors // Include validation errors in the return object
        };
      }
    } catch (error) {
      console.error('Error editing file:', error);
      return { success: false, message: 'An unexpected error occurred' };
    } finally {
      setIsFileUploadOpen(false);
      setCurrentFile(null);
    }
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
        const programBased = ['STPM', 'A-level', 'Foundation', 'Diploma','O-level'];

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
      console.log('Fetching subjects for category:', categoryId);
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
      console.log('Fetched subjects:', result);

      if (result.success) {
        const formattedSubjects = categoryId === "32"
          ? result.data.map(subject => ({
            id: subject.subject_id,
            name: subject.subject_name,
            grade: subject.subject_grade
          }))
          : result.data.map(subject => ({
            id: subject.id,
            name: subject.highTranscript_name,
            grade: subject.higherTranscript_grade
          }));
        console.log('Formatted subjects:', formattedSubjects);
        setSubjects(formattedSubjects);
      } else {
        console.error('Failed to fetch subjects:', result);
        setSubjects([]);
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
      setSubjects([]);
    }
  }, []);

  //subject list for spm api//
  const addEditSPMTranscript = async (subjects) => {
    try {
      console.log('addEditSPMTranscript called with subjects:', subjects);
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const category = categories.find(cat => cat.transcript_category === selectedExam);

      if (!category) {
        console.error('Selected exam category not found');
        return;
      }

      console.log('Category for SPM:', category);

      // Function to convert letter grade to integer
      const gradeToInt = (grade) => {
        const gradeMap = {
          'A+': 17, 'A': 18, 'A-': 19,
          'B+': 20, 'B': 21,
          'C+': 22, 'C': 23,
          'D': 24, 'E': 25,
          'G': 26
        };
        return gradeMap[grade] || 0; // Return 0 if grade not found
      };

      const payload = {
        category: category.id,
        data: subjects.map(subject => ({
          subjectID: subject.id,
          grade: gradeToInt(subject.grade)
        }))
      };

      console.log('Payload prepared for SPM API:', payload);

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/addEditTranscript`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('API response for SPM:', data);

      if (data.success) {
        console.log('SPM Subjects saved successfully');
        // Refresh the subjects
        fetchSubjects(category.id.toString());
      } else {
        console.error('Error saving SPM subjects:', data.message);
        alert(`Error saving SPM subjects: ${data.message}`);
      }
    } catch (error) {
      console.error('Error in addEditSPMTranscript:', error);
      alert('An unexpected error occurred while saving SPM subjects.');
    }
  };

  useEffect(() => {
    if (selectedExam) {
      const category = categories.find(cat => cat.transcript_category === selectedExam);
      if (category) {
        fetchMediaByCategory(category.id);
        fetchSubjects(category.id.toString());
      }
    }
  }, [selectedExam, categories, fetchSubjects]);

  const updateSubjects = useCallback((updatedSubjects) => {
    console.log('updateSubjects called with:', updatedSubjects);
    setSubjects(updatedSubjects);
  }, []);

  const handleSaveAll = async () => {
    setIsSubmissionPopupOpen(false);
    try {
      console.log('handleSaveAll initiated');
      const category = categories.find(cat => cat.transcript_category === selectedExam);

      if (!category) {
        console.error('Selected exam category not found');
        return;
      }

      console.log('Current exam category:', category);

      if (category.id === 32) {
        console.log('Saving SPM subjects...');
        await addEditSPMTranscript(subjects);
      } else {
        console.log('Saving non-SPM subjects...');
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        const payload = {
          category: category.id,
          data: subjects.map(subject => ({
            name: subject.name,
            grade: subject.grade
          }))
        };

        console.log('Payload prepared for non-SPM API:', payload);

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/addEditHigherTranscript`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        console.log('API response for non-SPM:', data);

        if (data.success) {
          console.log('Non-SPM Subjects saved successfully');
          fetchSubjects(category.id.toString());
        } else {
          console.error('Error saving non-SPM subjects:', data.message);
          alert(`Error saving subjects: ${data.message}`);
        }
      }
    } catch (error) {
      console.error('Error in handleSaveAll:', error);
      alert('An unexpected error occurred while saving subjects.');
    }
  };

  const renderExamComponent = () => {
    const categoryId = categories.find(cat => cat.transcript_category === selectedExam)?.id;
    const files = mediaData[categoryId] || [];

    if (selectedExam === 'SPM' || examBasedCategories.some(cat => cat.transcript_category === selectedExam)) {
      return <SubjectBasedExam
        examType={selectedExam}
        subjects={subjects}
        onSubjectsChange={updateSubjects}
        files={files}
        onSaveAll={handleSaveConfirmation}
      />;
    } else if (programBasedCategories.some(cat => cat.transcript_category === selectedExam)) {
      return <ProgramBasedExam
        examType={selectedExam}
        subjects={subjects}
        onSubjectsChange={updateSubjects}
        files={files}
        onSaveAll={handleSaveConfirmation}
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


        <div className="transcript-search-bar-container">
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
          <div className="search-bar-sas  ">
                    <Search size={20} style={{ color: '#9E9E9E' }} />
                    <input
                        type="text" placeholder="Search..." className="form-control custom-input-size"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
          <button className="button-table px-5 py-1 ml-auto" onClick={() => setIsFileUploadOpen(true)}>ADD NEW</button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="w-100  justify-content-around" >
            <thead>
              <tr>
                <th className="border-bottom p-2 fw-normal">Files</th>
                <th className="border-bottom p-2 text-end fw-normal">Filename</th>
                <th className="border-bottom p-2 text-end fw-normal">Actions</th>
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
                            <div className="file-title mb-1">{file.studentMedia_name}</div>
                            <div className="file-date">{file.created_at}</div>
                          </div>
                        </div>
                      </td>
                      <td className="border-bottom p-2 text-end text-secondary">{file.studentMedia_location || 'N/A'}</td>
                      <td className="border-bottom p-2">
                        <div className="d-flex justify-content-end align-items-center">
                          <Trash2 size={18} className="iconat-trash mx-2" onClick={() => openDeletePopup(file)} />
                          <Edit2 size={18} className="iconat mx-2" onClick={() => openEditModal(file)} />
                          <Eye size={18} className="iconat ms-2" onClick={() => viewFile(file)} />
                        </div>
                      </td>
                    </tr>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </tbody>
          </table>
        </div>
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
          <button className="button-table px-5 py-1 text-center">SAVE</button>
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
          return currentFile ? editFile({ ...file, studentMedia_type: currentFile.studentMedia_type }) : addFile(file);
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

      <WidgetPopUpSubmission
        isOpen={isSubmissionPopupOpen}
        onClose={() => setIsSubmissionPopupOpen(false)}
        onConfirm={handleSaveAll}
      />
    </div>
  );
};

export default AcademicTranscript;