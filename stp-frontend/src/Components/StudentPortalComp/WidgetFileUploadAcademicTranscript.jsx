import React, { useState, useEffect } from 'react';
import { X, Upload, FileText, Trash2,Check } from 'lucide-react';
import { Alert } from 'react-bootstrap';
import "../../css/StudentPortalStyles/StudentPortalWidget.css";

const WidgetFileUploadAcademicTranscript = ({ isOpen, onClose, onSave, item, isViewMode }) => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [existingFileUrl, setExistingFileUrl] = useState(null);
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null);

    /*loading and pop up the widget can check if open will set the info that retrieve from api respsonse or null, if close will reset the form */
    useEffect(() => {
        if (isOpen) {
            if (item) {
                //console.log('Editing item:', item);
                setTitle(item.studentMedia_name || '');
                setExistingFileUrl(item.studentMedia_location || null);
                setFile(null);
            } else {
                resetForm();
            }
        }
    }, [isOpen, item]);
    /*end */

    /*reset form function*/
    const resetForm = () => {
        setTitle('');
        setFile(null);
        setExistingFileUrl(null);
        setErrors({});
        setAlert(null);
        setSaveStatus(null);
    };
    /*end*/

    /*close popup widget function */
    const handleClose = () => {
        resetForm();
        onClose();
    };
    /*end */

    if (!isOpen) return null;

    /*save button function when user press save button */
    const handleSave = async () => {
        if (isViewMode) return;

        setErrors({}); // Clear previous errors
        const newErrors = {};
        if (!title.trim()) newErrors.title = "Title is required";
        if (!file && !existingFileUrl && !item) newErrors.file = "File is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSaving(true);
        setSaveStatus(null);
        try {
            const result = await onSave({
                id: item ? item.id : null,
                title,
                file: file || existingFileUrl,
                isNewFile: !!file
            });

            if (!result.success) {
                if (result.message === "Validation Error" && result.error) {
                    // Handle validation errors
                    const errorMessages = Object.values(result.error).flat();
                    setErrors({ file: errorMessages.join('. ') || "Validation failed. Please check your input." });
                } else {
                    setAlert({ type: 'error', message: result.message || "Failed to save file. Please try again." });
                }
                setSaveStatus('error');
            } else {
                setSaveStatus('success');
                setTimeout(() => {
                    handleClose();
                }, 1500); // Close the widget after 1.5 seconds on success
            }
        } catch (error) {
            console.error('Error saving file:', error);
            setAlert({ type: 'error', message: "An unexpected error occurred. Please try again later." });
            setSaveStatus('error');
        } finally {
            setIsSaving(false);
        }
    };
    /*end */

    /*file change handle function */
    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
            //console.log('New file selected:', uploadedFile.name);
            setFile(uploadedFile);
        }
    };
    /*end */

    /*click to view button function */
    const handleFileDelete = () => {
        setFile(null);
        setExistingFileUrl(null); // Add this line to clear the existing file URL
    };
    /*end */

    /*click to view button function */
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
    /*end*/

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

                {errors.file && <div className="error-message">{errors.file}</div>}

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
                        <div className="file-info-wfu">
                            <FileText size={18} />
                            <div className="file-details">
                                <span className="file-name-widget text-wrap">
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


                {!isViewMode && (
                    <div className="save-button-container">
                        <button
                            className={`save-button ${isSaving ? 'saving' : ''} ${saveStatus ? saveStatus : ''}`}
                            onClick={handleSave}
                            disabled={isSaving}
                        >
                            {isSaving ? (
                                <>
                                    <div className="spinner"></div>
                                    <span>Saving...</span>
                                </>
                            ) : saveStatus === 'success' ? (
                                <>
                                    <Check size={18} />
                                    <span>Saved!</span>
                                </>
                            ) : saveStatus === 'error' ? (
                                <span>Failed</span>
                            ) : (
                                <span>{item ? 'UPDATE' : 'SAVE'}</span>
                            )}
                        </button>
                    </div>
                )}

                {saveStatus === 'error' && (
                    <Alert variant="danger" className="mt-3">
                        {errors.file || alert?.message || "An error occurred. Please try again."}
                    </Alert>
                )}
            </div>
        </div>
    );
};

export default WidgetFileUploadAcademicTranscript;