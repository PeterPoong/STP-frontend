import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Trash2, Edit, Save, FileText, Upload, X } from 'lucide-react';
import WidgetPopUpUnsavedChanges from "../../../Components/StudentPortalComp/Widget/WidgetPopUpUnsavedChanges";

const OtherDocuments = ({ onBack, onSubmit }) => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isUnsavedChangesPopupOpen, setIsUnsavedChangesPopupOpen] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/otherFileCertList`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch documents');
      }

      const result = await response.json();
      if (result.success) {
        setDocuments(result.data.data);

      } else {
        throw new Error(result.message || 'Failed to fetch documents');
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddDocument = () => {
    setDocuments([...documents, {
      name: '',
      media: null,
      isEditing: true
    }]);
    setHasUnsavedChanges(true);
  };


  const handleDocumentChange = (index, field, value) => {
    const updatedDocuments = documents.map((doc, i) =>
      i === index ? { ...doc, [field]: value } : doc
    );
    setDocuments(updatedDocuments);
    setHasUnsavedChanges(true);
  };

  const handleSaveDocument = async (index) => {
    const doc = documents[index];

    // Validate required fields
    if (!doc.name || !doc.media) {
      alert('Please fill in all fields before saving.'); // Notify user
      return; // Exit the function if validation fails
    }

    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const formData = new FormData();
      formData.append('certificate_name', doc.name);
      if (doc.media instanceof File) {
        formData.append('certificate_media', doc.media);
      }

      const url = doc.id
        ? `${import.meta.env.VITE_BASE_URL}api/student/editOtherCertFile?id=${doc.id}`
        : `${import.meta.env.VITE_BASE_URL}api/student/addOtherCertFile`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to save document');
      }

      const result = await response.json();
      if (result.success) {
        const updatedDocuments = documents.map((d, i) =>
          i === index ? { ...d, id: result.data.id, isEditing: false } : d
        );
        setDocuments(updatedDocuments);
        setHasUnsavedChanges(false);
        await fetchDocuments();
      } else {
        if (result.error) {
          const backendErrors = [];
          for (const key in result.error) {
            if (Array.isArray(result.error[key])) {
              backendErrors.push(...result.error[key]);
            } else if (typeof result.error[key] === 'string') {
              backendErrors.push(result.error[key]);
            }
          }
          const errorMessage = backendErrors.join(' ');
          alert(errorMessage); // Use browser alert instead of setting error state
        } else {
          alert(result.message || 'Failed to save achievement.');
        }
      }
    } catch (error) {
      console.error('Error saving document:', error);
      setError(error.message);
    }
  };

  const handleDeleteDocument = async (index) => {
    try {
      setHasUnsavedChanges(false);
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const docId = documents[index].id;

      if (!docId) {
        // If the document doesn't have an ID, it's not saved in the backend yet
        const updatedDocuments = documents.filter((_, i) => i !== index);
        setDocuments(updatedDocuments);

        return;
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/deleteOtherCertFile`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: docId, type: 'delete' }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete document');
      }

      const result = await response.json();
      if (result.success) {
        const updatedDocuments = documents.filter((_, i) => i !== index);
        setDocuments(updatedDocuments);
        setHasUnsavedChanges(false);
      } else {
        throw new Error(result.message || 'Failed to delete document');
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      setError(error.message);
    }
  };

  const handleFileUpload = (index, file) => {
    const updatedDocuments = documents.map((doc, i) =>
      i === index ? { ...doc, media: file } : doc
    );
    setDocuments(updatedDocuments);
    setHasUnsavedChanges(true);
  };

  const handleRemoveFile = (index) => {
    const updatedDocuments = documents.map((doc, i) =>
      i === index ? { ...doc, media: null } : doc
    );
    setDocuments(updatedDocuments);
    setHasUnsavedChanges(true);
  };


  const handlePrevious = () => {
    if (hasUnsavedChanges) {
      setIsUnsavedChangesPopupOpen(true);
    } else {
      onBack();
    }
  };

  const handleUnsavedChangesConfirm = () => {
    setIsUnsavedChangesPopupOpen(false);
    onBack();
  };

  const handleUnsavedChangesCancel = () => {
    setIsUnsavedChangesPopupOpen(false);
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="step-content p-4 rounded">
      <h3 className="border-bottom pb-2 fw-normal">Other Documents</h3>
      <div className="other-docs-list">
        {documents.map((doc, index) => (
          <div key={index} className="other-doc-item mb-4 border rounded p-4">
            {doc.isEditing ? (
              <>
                <Form.Control
                  type="text"
                  placeholder="Name of certificate/document..."
                  value={doc.name}
                  onChange={(e) => handleDocumentChange(index, 'name', e.target.value)}
                  className={`mb-2 border p-0 fw-bold w-25 ps-2 ${!doc.name && 'border-danger'}`} // {{ edit_1 }}
                  style={{ fontSize: '1.1rem' }}
                />

                <div className="d-flex justify-content-between">
                  <div className="mt-2">
                    {doc.media ? (
                      <div className="d-flex align-items-center">
                        <FileText size={18} className="me-2 " />
                        <span className="me-2 text-decoration-underline">
                          {doc.media instanceof File ? doc.media.name : doc.media}
                        </span>
                        <Button
                          variant="link"
                          className="p-0 text-danger"
                          onClick={() => handleRemoveFile(index)}
                        >
                          <X size={18} />
                        </Button>
                      </div>
                    ) : (
                      <div className="d-flex align-items-center ">
                        <FileText size={18} className="me-2" />
                        <Button
                          variant="secondary"
                          className="sac-upload-button"
                          onClick={() => document.getElementById(`otherDocFileInput-${index}`).click()}
                        >
                          Upload File
                        </Button>
                        <input
                          id={`otherDocFileInput-${index}`}
                          type="file"
                          className="d-none"
                          onChange={(e) => handleFileUpload(index, e.target.files[0])}
                        />
                      </div>
                    )}
                  </div>
                  <div className="d-flex justify-content-end">
                    <Button variant="link" onClick={() => handleSaveDocument(index)} className="me-2">
                      <Save size={18} color="green" />
                    </Button>
                    <Button variant="link" onClick={() => handleDeleteDocument(index)}>
                      <Trash2 size={18} color="red" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="d-flex justify-content-between">
                  <div>
                    <div className="fw-bold mb-2" style={{ fontSize: '1.1rem' }}>{doc.name}</div>
                    {doc.media && (
                      <div className="mt-2 d-flex align-items-center text-decoration-underline">
                        <FileText size={18} className="me-2" />
                        <span>{doc.media instanceof File ? doc.media.name : doc.media}</span>
                      </div>
                    )}
                  </div>
                  <div className="d-flex justify-content-end align-items-end ">
                    <Button variant="link" onClick={() => handleDocumentChange(index, 'isEditing', true)} className="me-2">
                      <Edit size={18} color="black" />
                    </Button>
                    <Button variant="link" onClick={() => handleDeleteDocument(index)} className="">
                      <Trash2 size={18} color="red" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <Button
        variant="outline-primary"
        onClick={handleAddDocument}
        className="w-100 mt-3 sac-add-new-button"
      >
        Add New Document +
      </Button>
      <div className="d-flex justify-content-between mt-4">
        <Button onClick={handlePrevious} className="me-2 rounded-pill px-5 sac-previous-button">
          Previous
        </Button>
        <Button onClick={onSubmit} className="sac-next-button rounded-pill px-5">
          Submit
        </Button>
      </div>
      <WidgetPopUpUnsavedChanges
        isOpen={isUnsavedChangesPopupOpen}
        onConfirm={handleUnsavedChangesConfirm}
        onCancel={handleUnsavedChangesCancel}
      />
    </div>
  );
};

export default OtherDocuments;