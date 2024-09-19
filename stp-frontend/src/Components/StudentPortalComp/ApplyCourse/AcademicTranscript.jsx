import React, { useState, useEffect, useCallback } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Trash2, Edit, Plus, Upload, Save, FileText, X, AlignJustify } from 'lucide-react';
import Select from 'react-select';
import WidgetPopUpRemind from "../../../Components/StudentPortalComp/Widget/WidgetPopUpRemind";

const AcademicTranscript = ({ data = [], onBack, onNext }) => {
  const [academicTranscripts, setAcademicTranscripts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup state
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [documentErrors, setDocumentErrors] = useState({});
 

  useEffect(() => {
    fetchTranscriptCategories();
  }, []);

  const fetchTranscriptCategories = async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/transcriptCategoryList`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transcript categories');
      }

      const result = await response.json();
      if (result.success) {
        setCategories(result.data.data);
        fetchExistingTranscripts(result.data.data);
      } else {
        throw new Error(result.message || 'Failed to fetch transcript categories');
      }
    } catch (error) {
      console.error('Error fetching transcript categories:', error);
      setError(error.message);
    }
  };
  const fetchExistingTranscripts = async (categories) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const existingTranscripts = [];

      for (const category of categories) {
        const subjectsUrl = category.id === 32
          ? `${import.meta.env.VITE_BASE_URL}api/student/transcriptSubjectList`
          : `${import.meta.env.VITE_BASE_URL}api/student/higherTranscriptSubjectList`;

        const method = category.id === 32 ? 'GET' : 'POST';
        const body = category.id === 32 ? null : JSON.stringify({ id: category.id });

        const subjectsResponse = await fetch(subjectsUrl, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          ...(method === 'POST' && { body }),
        });

        if (!subjectsResponse.ok) {
          console.error(`Failed to fetch subjects for category ${category.transcript_category}`);
          continue;
        }

        const subjectsResult = await subjectsResponse.json();

        // Fetch documents for this category
        const documentsResponse = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/mediaListByCategory`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ category_id: category.id }),
        });

        if (!documentsResponse.ok) {
          console.error(`Failed to fetch documents for category ${category.transcript_category}`);
          continue;
        }

        const documentsResult = await documentsResponse.json();

        if (subjectsResult.success && subjectsResult.data && subjectsResult.data.length > 0) {
          existingTranscripts.push({
            id: category.id,
            name: category.transcript_category,
            subjects: subjectsResult.data.map(subject => ({
              id: subject.id || subject.subject_id,
              name: subject.name || subject.subject_name || subject.highTranscript_name,
              grade: subject.grade || subject.subject_grade || subject.higherTranscript_grade || '',
            })),
            documents: documentsResult.success && documentsResult.data.data
              ? documentsResult.data.data.map(doc => ({
                id: doc.id,
                name: doc.studentMedia_name,
                file: doc.studentMedia_location,
              }))
              : []
          });
        }
      }

      setAcademicTranscripts(existingTranscripts);
    } catch (error) {
      console.error('Error fetching existing transcripts:', error);
      setError('Failed to load existing transcripts. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAvailableSubjects = useCallback(async (categoryId, transcriptIndex) => {
    if (categoryId !== 32) return; // Only fetch for SPM

    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const selectedSubjectIds = academicTranscripts[transcriptIndex]?.subjects.map(s => s.id) || [];

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/subjectList`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          category: categoryId,
          selectedSubject: selectedSubjectIds
        }),
      });
      const data = await response.json();
      if (data.success) {
        setAvailableSubjects(data.data.filter(subject =>
          !selectedSubjectIds.includes(subject.id)
        ));
      } else {
        console.error('Failed to fetch available subjects:', data);
      }
    } catch (error) {
      console.error('Error fetching available subjects:', error);
    }
  }, [academicTranscripts]);


  const fetchSubjects = async (categoryId, transcriptIndex) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      let url, method, body;
      if (categoryId === 32) { // Assuming 32 is the ID for SPM
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
        const formattedSubjects = result.data.map(subject => ({
          id: subject.id || subject.subject_id,
          name: subject.name || subject.subject_name || subject.highTranscript_name,
          grade: subject.grade || subject.subject_grade || subject.higherTranscript_grade,
          isEditing: false
        }));

        setAcademicTranscripts(prevTranscripts =>
          prevTranscripts.map((transcript, index) =>
            index === transcriptIndex
              ? { ...transcript, subjects: formattedSubjects }
              : transcript
          )
        );
      } else {
        console.error('Failed to fetch subjects:', result);
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  // Helper function to get available categories for a specific transcript
  const getAvailableCategories = (currentTranscriptIndex) => {
    const selectedCategoryIds = academicTranscripts
      .filter((transcript, index) => transcript.id && index !== currentTranscriptIndex)
      .map(transcript => transcript.id);

    return categories
      .filter(cat => !selectedCategoryIds.includes(cat.id))
      .map(cat => ({ value: cat.id, label: cat.transcript_category }));
  };

  const handleAddTranscript = () => {
    const availableCategories = categories.filter(
      category => !academicTranscripts.some(transcript => transcript.id === category.id)
    );

    if (availableCategories.length > 0) {
      setAcademicTranscripts([
        ...academicTranscripts,
        { id: null, name: '', subjects: [], documents: [] }
      ]);
    } else {
      alert('All available exam types have been added.');
    }
  };

  const handleTranscriptChange = (index, { id, name }) => {
    const updatedTranscripts = academicTranscripts.map((transcript, i) =>
      i === index ? { ...transcript, id, name } : transcript
    );
    setAcademicTranscripts(updatedTranscripts);

    if (id) {
      fetchSubjects(id, index);
      if (id === 32) { // Only fetch available subjects for SPM
        fetchAvailableSubjects(id, index);
      }
    }
  };

  const handleRemoveTranscript = (index) => {
    setAcademicTranscripts(academicTranscripts.filter((_, i) => i !== index));
  };

  const handleAddSubject = (transcriptIndex) => {
    const transcript = academicTranscripts[transcriptIndex];
    if (transcript.id === 32) {
      // For SPM, add a new subject with empty id and name
      const updatedTranscripts = academicTranscripts.map((t, i) =>
        i === transcriptIndex
          ? { ...t, subjects: [...t.subjects, { id: '', name: '', grade: '', isEditing: true, isNew: true }] }
          : t
      );
      setAcademicTranscripts(updatedTranscripts);
      fetchAvailableSubjects(32, transcriptIndex);
    } else {
      // For other exams, keep the existing logic
      const updatedTranscripts = academicTranscripts.map((t, i) =>
        i === transcriptIndex
          ? { ...t, subjects: [...t.subjects, { name: '', grade: '', isEditing: true }] }
          : t
      );
      setAcademicTranscripts(updatedTranscripts);
    }
  };

  // Unified handler for subject selection
  const handleSubjectSelectChange = (transcriptIndex, subjectIndex, selected) => {
    const { value, label } = selected;

    const updatedTranscripts = academicTranscripts.map((transcript, i) =>
      i === transcriptIndex
        ? {
          ...transcript,
          subjects: transcript.subjects.map((subject, j) =>
            j === subjectIndex ? { ...subject, id: value, name: label } : subject
          )
        }
        : transcript
    );

    setAcademicTranscripts(updatedTranscripts);

    // After selecting a subject, update available subjects to prevent duplicates
    if (value) {
      fetchAvailableSubjects(32, transcriptIndex);
    }
  };

  const handleSubjectChange = (transcriptIndex, subjectIndex, field, value) => {
    const updatedTranscripts = academicTranscripts.map((transcript, i) =>
      i === transcriptIndex
        ? {
          ...transcript,
          subjects: transcript.subjects.map((subject, j) =>
            j === subjectIndex ? { ...subject, [field]: value } : subject
          )
        }
        : transcript
    );
    setAcademicTranscripts(updatedTranscripts);

    // If it's SPM and we're changing the subject, update available subjects
    if (updatedTranscripts[transcriptIndex].id === 32 && field === 'id') {
      fetchAvailableSubjects(32, transcriptIndex);
    }
  };

  const handleSaveSubject = (transcriptIndex, subjectIndex) => {
    const updatedTranscripts = academicTranscripts.map((transcript, i) =>
      i === transcriptIndex ? {
        ...transcript,
        subjects: transcript.subjects.map((subject, j) =>
          j === subjectIndex ? { ...subject, isEditing: false } : subject
        )
      } : transcript
    );
    setAcademicTranscripts(updatedTranscripts);
  };

  const handleRemoveSubject = (transcriptIndex, subjectIndex) => {
    const updatedTranscripts = academicTranscripts.map((transcript, i) =>
      i === transcriptIndex
        ? { ...transcript, subjects: transcript.subjects.filter((_, j) => j !== subjectIndex) }
        : transcript
    );
    setAcademicTranscripts(updatedTranscripts);

    if (updatedTranscripts[transcriptIndex].id === 32) {
      fetchAvailableSubjects(32, transcriptIndex);
    }
  };
  const handleAddDocument = (transcriptIndex) => {
    const updatedTranscripts = academicTranscripts.map((transcript, i) =>
      i === transcriptIndex
        ? { ...transcript, documents: [...transcript.documents, { name: '', file: null, isEditing: true }] }
        : transcript
    );
    setAcademicTranscripts(updatedTranscripts);
  };

  const handleDocumentChange = (transcriptIndex, documentIndex, field, value) => {
    const updatedTranscripts = academicTranscripts.map((transcript, i) =>
      i === transcriptIndex
        ? {
          ...transcript,
          documents: transcript.documents.map((doc, j) =>
            j === documentIndex ? { ...doc, [field]: value, isEditing: true } : doc
          )
        }
        : transcript
    );
    setAcademicTranscripts(updatedTranscripts);

    // Clear any existing errors for this document
    setDocumentErrors(prevErrors => {
      const newErrors = { ...prevErrors };
      delete newErrors[`${transcriptIndex}-${documentIndex}`];
      return newErrors;
    });
  };



  const fetchDocumentsForTranscript = async (transcriptIndex) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const transcript = academicTranscripts[transcriptIndex];

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/mediaListByCategory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ category_id: transcript.id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Fetched documents:', result);

      if (result.success && result.data && result.data.data) {
        const updatedDocuments = result.data.data.map(doc => ({
          id: doc.id,
          name: doc.studentMedia_name,
          file: doc.studentMedia_location,
          isEditing: false
        }));

        setAcademicTranscripts(prevTranscripts =>
          prevTranscripts.map((t, index) =>
            index === transcriptIndex ? { ...t, documents: updatedDocuments } : t
          )
        );
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      setError('Failed to fetch updated documents. Please try again later.');
    }
  };

  const handleSaveDocument = async (transcriptIndex, documentIndex) => {
    try {
      console.log('Starting handleSaveDocument');
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const transcript = academicTranscripts[transcriptIndex];
      const document = transcript.documents[documentIndex];
  
      // Validate document title
      if (!document.name.trim()) {
        setDocumentErrors(prevErrors => ({
          ...prevErrors,
          [`${transcriptIndex}-${documentIndex}`]: 'Document title cannot be empty'
        }));
        return;
      }
  
      // Validate file upload
      if (!document.file) {
        setDocumentErrors(prevErrors => ({
          ...prevErrors,
          [`${transcriptIndex}-${documentIndex}`]: 'File upload is required'
        }));
        return;
      }
  
      const formData = new FormData();
      formData.append('studentMedia_type', transcript.id.toString());
      formData.append('studentMedia_name', document.name);
      if (document.file instanceof File) {
        formData.append('studentMedia_location', document.file);
      }
  
      let url;
      if (document.id) {
        url = `${import.meta.env.VITE_BASE_URL}api/student/editTranscriptFile`;
        formData.append('id', document.id.toString());
      } else {
        url = `${import.meta.env.VITE_BASE_URL}api/student/addTranscriptFile`;
      }
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
  
      const result = await response.json();
      console.log('Response data:', result);
  
      if (result.success) {
        console.log('Document saved successfully');
        await fetchDocumentsForTranscript(transcriptIndex);
        // Clear errors for this document
        setDocumentErrors(prevErrors => {
          const newErrors = { ...prevErrors };
          delete newErrors[`${transcriptIndex}-${documentIndex}`];
          return newErrors;
        });
      } else {
        if (result.message === "Validation Error" && result.error && result.error.transcripts) {
          setDocumentErrors(prevErrors => ({
            ...prevErrors,
            [`${transcriptIndex}-${documentIndex}`]: result.error.transcripts[0]
          }));
        } else {
          throw new Error(result.message || 'Failed to save document');
        }
      }
    } catch (error) {
      console.error('Error in handleSaveDocument:', error);
      setDocumentErrors(prevErrors => ({
        ...prevErrors,
        [`${transcriptIndex}-${documentIndex}`]: error.message
      }));
    }
  };
  

  const handleRemoveDocument = async (transcriptIndex, documentIndex) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const document = academicTranscripts[transcriptIndex].documents[documentIndex];

      if (!document.id) {
        // If the document doesn't have an ID, it's not saved in the backend yet
        const updatedTranscripts = academicTranscripts.map((transcript, i) =>
          i === transcriptIndex
            ? { ...transcript, documents: transcript.documents.filter((_, j) => j !== documentIndex) }
            : transcript
        );
        setAcademicTranscripts(updatedTranscripts);
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/deleteTranscriptFile`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: document.id, type: 'delete' }),
      });

      const result = await response.json();
      if (result.success) {
        console.log('Document removed successfully');
        // Fetch updated documents instead of updating state directly
        await fetchDocumentsForTranscript(transcriptIndex);
      } else {
        throw new Error(result.message || 'Failed to delete document');
      }
    } catch (error) {
      console.error('Error removing document:', error);
      setError(error.message);
    }
  };


  const handleDocumentFileUpload = (transcriptIndex, docIndex, file) => {
    console.log('handleDocumentFileUpload called');
    console.log('transcriptIndex:', transcriptIndex);
    console.log('docIndex:', docIndex);
    console.log('file:', file);

    const updatedTranscripts = academicTranscripts.map((transcript, i) =>
      i === transcriptIndex ? {
        ...transcript,
        documents: transcript.documents.map((doc, j) =>
          j === docIndex ? { ...doc, file: file, mediaName: file.name, isEditing: true } : doc
        )
      } : transcript
    );

    console.log('Updated transcript:', updatedTranscripts[transcriptIndex]);
    setAcademicTranscripts(updatedTranscripts);
  };

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

  const saveTranscript = async (transcriptIndex) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const transcript = academicTranscripts[transcriptIndex];
      const category = categories.find(cat => cat.transcript_category === transcript.name);
  
      if (!category) {
        throw new Error('Invalid transcript category');
      }
  
      let url, payload;
      if (category.id === 32) { // SPM
        // Fetch the correct subject IDs for new subjects
        const subjectsWithCorrectIds = await Promise.all(transcript.subjects.map(async (subject) => {
          if (subject.isNew || !subject.id) {
            const subjectResponse = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/subjectList`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({ category: category.id }),
            });
            const subjectData = await subjectResponse.json();
            const correctSubject = subjectData.data.find(s => s.name === subject.name);
            return { ...subject, id: correctSubject ? correctSubject.id : subject.id };
          }
          return subject;
        }));
  
        url = `${import.meta.env.VITE_BASE_URL}api/student/addEditTranscript`;
        payload = {
          category: category.id,
          data: subjectsWithCorrectIds
            .filter(subject => subject.grade && subject.id)
            .map(subject => ({
              subjectID: subject.id,
              grade: gradeToInt(subject.grade)
            }))
        };
      } else {
        url = `${import.meta.env.VITE_BASE_URL}api/student/addEditHigherTranscript`;
        payload = {
          category: category.id,
          data: transcript.subjects.filter(subject => subject.name && subject.grade).map(subject => ({
            name: subject.name,
            grade: subject.grade
          }))
        };
      }
      console.log('Saving transcript with payload:', payload);
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data.success) {
        console.log('Transcript saved successfully');
        fetchSubjects(category.id, transcriptIndex);
        // Clear any errors for this transcript
        setDocumentErrors(prevErrors => {
          const newErrors = { ...prevErrors };
          delete newErrors[transcriptIndex];
          return newErrors;
        });
      } else {
        console.error('Server responded with an error:', data);
        if (data.message === "Validation Error" && data.error && data.error.transcripts) {
          // Assign the error to the last document
          const lastDocIndex = transcript.documents.length - 1;
          setDocumentErrors(prevErrors => ({
            ...prevErrors,
            [`${transcriptIndex}-${lastDocIndex}`]: data.error.transcripts[0]
          }));
        } else {
          throw new Error(data.message || 'Server responded with an error');
        }
      }
    } catch (error) {
      console.error('Error saving transcript:', error);
      setDocumentErrors(prevErrors => ({
        ...prevErrors,
        [transcriptIndex]: `Failed to save transcript: ${error.message}`
      }));
    }
  };
  

  const getGradeColor = (grade) => {
    if (grade.includes('A')) return 'success';
    if (grade.includes('B')) return 'primary';
    if (grade.includes('C')) return 'warning';
    if (['D', 'E', 'F', 'G'].includes(grade)) return 'danger';
    return 'secondary';
  };

  const handleNext = () => {
    if (academicTranscripts.length === 0) {
      setIsPopupOpen(true);
    } else {
      onNext();
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };



  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="step-content-casetwo p-4 rounded">
      <h3 className="border-bottom pb-2 fw-normal">Academic Transcript</h3>
      {academicTranscripts.map((transcript, index) => (
        <div key={index} className="academic-transcript-item mb-4 border rounded py-4">
          <div className="sac-container-casetwo d-flex justify-content-between align-items-start align-items-sm-center mb-3 px-4">
            <div className="d-flex align-items-center mb-2 mb-sm-0">
              <AlignJustify className="me-2 align-self-center" size={15} />
              {transcript.name ? (
                <span className="fw-bold">{transcript.name}</span>
              ) : (
                <Select
                  options={getAvailableCategories(index)}
                  value={
                    transcript.id
                      ? { value: transcript.id, label: transcript.name }
                      : null
                  }
                  onChange={(selected) =>
                    handleTranscriptChange(index, { id: selected.value, name: selected.label })
                  }
                  className="fw-bold border-0 sac-at-bg sac-at-select-style"
                  placeholder="Choose an education"
                />
              )}
            </div>
            <div className="d-flex">
              <Button variant="link" className="p-0 me-2" onClick={() => handleAddSubject(index)}>
                <Plus size={18} color="grey" />
              </Button>
              <Button variant="link" className="p-0 me-2" onClick={() => handleAddDocument(index)}>
                <Upload size={18} color="grey" />
              </Button>
              <Button variant="link" className="p-0" onClick={() => handleRemoveTranscript(index)}>
                <Trash2 size={18} color="grey" />
              </Button>
            </div>
          </div>


          {transcript.subjects.length > 0 ? (
            <div className="px-4">
              {transcript.subjects.map((subject, subIndex) => (
                <div key={subIndex} className="justify-content-between subject-item d-flex align-items-center mb-2 bg-white p-1 rounded-3">
                  {subject.isEditing ? (
                    <>
                      <div className="d-flex align-items-center flex-grow-1">
                        <AlignJustify className="mx-2" size={15} color="grey" />
                        {transcript.id === 32 ? (
                          (() => {
                            // Prepare the options, including the selected subject
                            const subjectOptions = availableSubjects.map(s => ({ value: s.id, label: s.name }));
                            if (subject.id && subject.name) {
                              // Avoid duplicates
                              if (!subjectOptions.some(option => option.value === subject.id)) {
                                subjectOptions.push({ value: subject.id, label: subject.name });
                              }
                            }

                            return (
                              <Select
                                options={subjectOptions}
                                value={subject.id && subject.name ? { value: subject.id, label: subject.name } : null}
                                onChange={(selected) => handleSubjectSelectChange(index, subIndex, selected)}
                                className="me-2 w-25"
                                placeholder="Select Subject"
                              />
                            );
                          })()
                        ) : (
                          <Form.Control
                            type="text"
                            value={subject.name}
                            onChange={(e) => handleSubjectChange(index, subIndex, 'name', e.target.value)}
                            className="me-2 w-25"
                            placeholder="Enter Subject Name"
                            style={{ fontSize: '0.9rem', fontWeight: "500" }}
                            required
                          />
                        )}

                        <Form.Control
                          as="select"
                          value={subject.grade}
                          onChange={(e) => handleSubjectChange(index, subIndex, 'grade', e.target.value)}
                          className={`me-2 w-auto px-2 py-1 px-3 rounded-5 border-0 text-white bg-${getGradeColor(subject.grade)}`}
                          style={{ fontSize: '0.9rem', fontWeight: "500" }}
                          required
                        >
                          <option value="" disabled>Grade</option>
                          <option value="A+">A+</option>
                          <option value="A">A</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B">B</option>

                          <option value="C+">C+</option>
                          <option value="C">C</option>

                          <option value="D">D</option>
                          <option value="E">E</option>
                          <option value="G">G</option>

                        </Form.Control>
                      </div>
                      <div className="d-flex">
                        <Button variant="link" className="p-0 me-2" onClick={() => handleSaveSubject(index, subIndex)}>
                          <Save size={15} color="grey" />
                        </Button>
                        <Button variant="link" className="p-0" onClick={() => handleRemoveSubject(index, subIndex)}>
                          <Trash2 size={15} color="grey" />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="d-flex align-items-center flex-grow-1">
                        <AlignJustify className="me-2" style={{ alignSelf: 'center' }} />
                        <span className="me-2" style={{ fontSize: '0.9rem', fontWeight: "500", width: "150px" }}>{subject.name}</span>
                        <span style={{ fontSize: '0.9rem', fontWeight: "500" }}
                          className={`ms-3 me-2 px-2 py-1 px-3 rounded-5 text-white bg-${getGradeColor(subject.grade)}`}>
                          Grade: {subject.grade}
                        </span>
                      </div>
                      <div className="d-flex">
                        <Button variant="link" className="p-0 me-2" onClick={() => handleSubjectChange(index, subIndex, 'isEditing', true)}>
                          <Edit size={15} color="grey" />
                        </Button>
                        <Button variant="link" className="p-0" onClick={() => handleRemoveSubject(index, subIndex)}>
                          <Trash2 size={15} color="grey" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : null}
          <div className="upload-documents mt-3 border border-4 border-top-3 border-bottom-0 border-start-0 border-end-0">
            <div className="d-flex justify-content-between align-items-center px-4">
              <h6 className="mb-0">Upload Documents</h6>
              <Button variant="link" className="p-0 me-2" onClick={() => handleAddDocument(index)}>
                <Plus size={18} color="grey" />
              </Button>
            </div>

            {transcript.documents.map((doc, docIndex) => (
              <div key={docIndex} className="px-4">
                <div className="document-item d-flex align-items-center mb-2 bg-white p-1 gap-1 justify-content-between rounded-3">
                  {doc.isEditing ? (
                    <>
                      <div className="d-flex flex-grow-1 align-items-center">
                        <div className="me-3 border-end px-3">
                          {doc.file ? (
                            <>
                              <div className="sac-file-info">
                                <FileText size={15} className="sac-file-icon" />
                                <span className="sac-file-name">{doc.mediaName || doc.file}</span>
                                <Button
                                  variant="link"
                                  className="sac-remove-file-btn"
                                  onClick={() => handleDocumentChange(index, docIndex, 'file', null)}
                                >
                                  <X size={15} color="red" />
                                </Button>
                              </div>
                            </>
                          ) : (
                            <>
                              <Button
                                variant="secondary"
                                className="sac-upload-button"
                                onClick={() => document.getElementById(`fileInput-${index}-${docIndex}`).click()}
                              >
                                <Upload size={15} className="me-2 upload-icon" />
                                <span className="button-text">Upload File</span>
                              </Button>
                              <input
                                type="file"
                                id={`fileInput-${index}-${docIndex}`}
                                className="d-none"
                                onChange={(e) => handleDocumentFileUpload(index, docIndex, e.target.files[0])}
                              />
                            </>
                          )}
                        </div>
                        <div className="align-items-center flex-grow-1">
                          <Form.Control
                            type="text"
                            value={doc.name}
                            onChange={(e) => handleDocumentChange(index, docIndex, 'name', e.target.value)}
                            className="me-2 w-100 border-0"
                            placeholder="Enter document title..."
                            style={{ fontSize: '0.825rem' }}
                          />
                        </div>
                      </div>
                      <div>
                        <Button variant="link" className="p-0 me-2" onClick={() => handleSaveDocument(index, docIndex)}>
                          <Save size={15} color="grey" />
                        </Button>
                        <Button variant="link" className="p-0" onClick={() => handleRemoveDocument(index, docIndex)}>
                          <Trash2 size={15} color="grey" />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="d-flex flex-grow-1">
                        <div className="border-end me-4 px-3 align-items-center">
                          <FileText size={15} className="me-2 ms-2" style={{ alignSelf: 'center' }} />
                          <span className="me-2" style={{ fontSize: '0.825rem', textAlign: 'left', flex: 1, width: "100px" }}>{doc.name}</span>
                        </div>
                        <div className="align-items-center">
                          <span style={{ fontSize: '0.825rem' }}>{doc.mediaName || doc.file || 'No file uploaded'}</span>
                        </div>
                      </div>
                      <div>
                        <Button variant="link" className="p-0 me-2" onClick={() => handleDocumentChange(index, docIndex, 'isEditing', true)}>
                          <Edit size={15} color="grey" />
                        </Button>
                        <Button variant="link" className="p-0" onClick={() => handleRemoveDocument(index, docIndex)}>
                          <Trash2 size={15} color="grey" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
               


                {documentErrors[`${index}-${docIndex}`] && (
                  <div className="text-danger" style={{ fontSize: '0.825rem' }}>
                    {documentErrors[`${index}-${docIndex}`]}
                  </div>
                )}
              </div>
            ))}

          </div>
          <div className="d-flex justify-content-end mt-3 px-4">
            <Button
              variant="primary"
              onClick={() => saveTranscript(index)}
              className="sac-save-button "
            >
              Save
            </Button>
          </div>
        </div>
      ))}
      <Button
        variant="outline-primary"
        onClick={handleAddTranscript}
        className="w-100 mt-3 sac-add-new-button"
      >
        Add New Transcript +
      </Button>

      <div className="d-flex justify-content-between mt-4">
        <Button onClick={onBack} className="me-2 rounded-pill px-5 sac-previous-button">
          Previous
        </Button>
        <Button onClick={handleNext} className="sac-next-button rounded-pill px-5">
          Next
        </Button>

      </div>
      <WidgetPopUpRemind isOpen={isPopupOpen} onClose={handleClosePopup} />
    </div>
  );
};

export default AcademicTranscript;