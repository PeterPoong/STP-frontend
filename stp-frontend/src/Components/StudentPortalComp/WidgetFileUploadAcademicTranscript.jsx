import React, { useState, useEffect } from 'react';
import { X, Upload, FileText, Trash2 } from 'lucide-react';
import { Alert } from 'react-bootstrap';
import "../../css/StudentPortalStyles/StudentPortalWidget.css";

const WidgetFileUploadAcademicTranscript = ({ isOpen, onClose, onSave, item, isViewMode }) => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [existingFileUrl, setExistingFileUrl] = useState(null);
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        if (isOpen) {
            if (item) {
                console.log('Editing item:', item);
                setTitle(item.studentMedia_name || '');
                setExistingFileUrl(item.studentMedia_location || null);
                setFile(null);
            } else {
                resetForm();
            }
        }
    }, [isOpen, item]);

    const resetForm = () => {
        setTitle('');
        setFile(null);
        setExistingFileUrl(null);
        setErrors({});
        setAlert(null);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    if (!isOpen) return null;

    const handleSave = async () => {
        if (isViewMode) return;

        const newErrors = {};
        if (!title.trim()) newErrors.title = "Title is required";
        if (!file && !existingFileUrl && !item) newErrors.file = "File is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        try {
            const result = await onSave({
                id: item ? item.id : null,
                title,
                file: file || existingFileUrl,
                isNewFile: !!file
            });

            if (!result.success) {
                if (result.error) {
                    const errorMessages = Object.entries(result.error).map(([key, value]) => `${key}: ${value.join(', ')}`);
                    setAlert({ type: 'danger', message: errorMessages.join('. ') });
                } else {
                    setAlert({ type: 'danger', message: result.message || "Failed to save file. Please try again." });
                }
            } else {
                handleClose();
            }
        } catch (error) {
            console.error('Error saving file:', error);
            setAlert({ type: 'danger', message: "An unexpected error occurred. Please try again later." });
        }
    };

    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
            console.log('New file selected:', uploadedFile.name);
            setFile(uploadedFile);
        }
    };

    const handleFileDelete = () => {
        setFile(null);
        setExistingFileUrl(null); // Add this line to clear the existing file URL
    };

    const handleViewClick = () => {
        if (file instanceof File) {
            // For newly uploaded files
            const fileUrl = URL.createObjectURL(file);
            window.open(fileUrl, '_blank');
        } else if (existingFileUrl) {
            // For existing files
            const fullUrl = `${import.meta.env.VITE_BASE_URL}storage/${existingFileUrl}`;
            window.open(fullUrl, '_blank');
        }
    };

    return (
        <div className="upload-widget-overlay">
            <div className="upload-widget-popup">
                <div className="upload-header">
                    <h5 className="small">{isViewMode ? 'View' : (item ? 'Edit' : 'Upload')}</h5>
                    <button className="close-button" onClick={handleClose}><X size={20} /></button>
                </div>

                {alert && (
                    <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible>
                        {alert.message}
                    </Alert>
                )}

                <div className="upload-title-input">
                    <input
                        type="text"
                        placeholder="Enter file title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="file-title-input"
                        readOnly={isViewMode}
                    />
                    {errors.title && <div className="error-message">{errors.title}</div>}
                </div>

                {!file && !existingFileUrl ? (
                    <div className="upload-area">
                        {!isViewMode && (
                            <label htmlFor="file-upload" className="upload-label">
                                <Upload size={24} color="#dc3545" />
                                <span>Click to Upload</span>
                                <span className="file-size-limit">(Max. File size: 25 MB)</span>
                                <input
                                    id="file-upload"
                                    type="file"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                            </label>
                        )}
                    </div>
                ) : (
                    <div className="file-uploaded">
                        <div className="file-info">
                            <FileText size={18} />
                            <div className="file-details">
                                <span className="file-name">
                                    {file instanceof File ? file.name : existingFileUrl}
                                </span>
                                <button className="view-button" onClick={handleViewClick}>Click to view</button>
                            </div>
                        </div>
                        {!isViewMode && (
                            <button className="delete-button" onClick={handleFileDelete}>
                                <Trash2 size={18} />
                            </button>
                        )}
                    </div>
                )}
                {!isViewMode && errors.file && <div className="error-message">{errors.file}</div>}

                {!isViewMode && (
                    <div className="save-button-container">
                        <button className="save-button" onClick={handleSave}>
                            {item ? 'UPDATE' : 'SAVE'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WidgetFileUploadAcademicTranscript;