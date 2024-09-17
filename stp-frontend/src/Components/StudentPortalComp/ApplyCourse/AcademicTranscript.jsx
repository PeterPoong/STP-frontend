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
          name: subject.name || subject.subject_name,
          grade: subject.grade || subject.subject_grade || '',
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
    }
  };

  const handleRemoveTranscript = (index) => {
    setAcademicTranscripts(academicTranscripts.filter((_, i) => i !== index));
  };

  const handleAddSubject = (transcriptIndex) => {
    const updatedTranscripts = academicTranscripts.map((transcript, i) =>
      i === transcriptIndex
        ? { ...transcript, subjects: [...transcript.subjects, { name: '', grade: '', isEditing: true }] }
        : transcript
    );
    setAcademicTranscripts(updatedTranscripts);
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
  };

  const handleAddDocument = (transcriptIndex) => {
    const updatedTranscripts = academicTranscripts.map((transcript, i) =>
      i === transcriptIndex
        ? { ...transcript, documents: [...transcript.documents, { name: 'New Document', file: null, isEditing: true }] }
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

      if (!document.name.trim()) {
        throw new Error('Document title cannot be empty');
      }

      const formData = new FormData();
      formData.append('studentMedia_type', transcript.id.toString());
      formData.append('studentMedia_name', document.name);
      if (document.file instanceof File) {
        formData.append('studentMedia_location', document.file);
      }

      let url;
      if (document.id) {
        // Editing existing document
        url = `${import.meta.env.VITE_BASE_URL}api/student/editTranscriptFile`;
        formData.append('id', document.id.toString());
      } else {
        // Adding new document
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
        // Fetch updated documents instead of updating state directly
        await fetchDocumentsForTranscript(transcriptIndex);
      } else {
        throw new Error(result.message || 'Failed to save document');
      }
    } catch (error) {
      console.error('Error in handleSaveDocument:', error);
      setError(error.message);
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

  const saveTranscript = async (transcriptIndex) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const transcript = academicTranscripts[transcriptIndex];
      const category = categories.find(cat => cat.transcript_category === transcript.name);

      if (!category) {
        throw new Error('Invalid transcript category');
      }

      let url, payload;
      if (category.id === 32) { // Assuming 32 is the ID for SPM
        url = `${import.meta.env.VITE_BASE_URL}api/student/addEditTranscript`;
        payload = {
          category: category.id,
          data: transcript.subjects.map(subject => ({
            subjectID: subject.id,
            grade: subject.grade
          }))
        };
      } else {
        url = `${import.meta.env.VITE_BASE_URL}api/student/addEditHigherTranscript`;
        payload = {
          category: category.id,
          data: transcript.subjects.map(subject => ({
            name: subject.name,
            grade: subject.grade
          }))
        };
      }

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
        // You might want to update the state or show a success message here
      } else {
        throw new Error(data.message || 'Failed to save transcript');
      }
    } catch (error) {
      console.error('Error saving transcript:', error);
      setError(error.message);
    }
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A': return 'success';
      case 'B': return 'primary';
      case 'C': return 'warning';
      case 'D': case 'E': case 'F': return 'danger';
      default: return 'secondary';
    }
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
                        <Form.Control
                          type="text"
                          value={subject.name}
                          onChange={(e) => handleSubjectChange(index, subIndex, 'name', e.target.value)}
                          className="me-2 w-25"
                          placeholder="Enter Subject Name"
                          style={{ fontSize: '0.9rem', fontWeight: "500" }}
                          required
                        />
                        <Form.Control
                          as="select"
                          value={subject.grade}
                          onChange={(e) => handleSubjectChange(index, subIndex, 'grade', e.target.value)}
                          className={`me-2 w-auto px-2 py-1 px-3 rounded-5 border-0 text-white bg-${getGradeColor(subject.grade)}`}
                          style={{ fontSize: '0.9rem', fontWeight: "500" }}
                          required
                        >
                          <option value="" disabled>Grade</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                          <option value="E">E</option>
                          <option value="F">F</option>
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
                        <span className="me-2" style={{ fontSize: '0.9rem', fontWeight: "500" }}>{subject.name}</span>
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
                          <span className="me-2" style={{ fontSize: '0.825rem', textAlign: 'center', flex: 1 }}>{doc.name}</span>
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