import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Card, ListGroup, Collapse, Button, Modal } from 'react-bootstrap';
import { PlusCircle, MinusCircle } from 'react-feather';
import defaultProfilePic from "../../assets/StudentPortalAssets/sampleprofile.png";
import "../../css/StudentPortalStyles/StudentPortalBasicInformation.css";

const MyProfileWidget = ({ onSelectContent, profilePic }) => {
    const [isProfileExpanded, setIsProfileExpanded] = useState(false);
    const [isCoursesExpanded, setIsCoursesExpanded] = useState(false);
    const [selectedContent, setSelectedContent] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [localProfilePic, setLocalProfilePic] = useState(defaultProfilePic);
    const [errorUploadMessage, setErrorUploadMessage] = useState('');
    const [selectedFileName, setSelectedFileName] = useState('');
    const fileInputRef = useRef(null);
    const token = sessionStorage.getItem("token");

    /* Effect to set local profile picture based on props */
    useEffect(() => {
        if (profilePic) {
            setLocalProfilePic(`${import.meta.env.VITE_BASE_URL}storage/${profilePic}`);
        } else {
            setLocalProfilePic(defaultProfilePic);
        }
    }, [profilePic]);
    /*end */

    /* Handle content selection for profile sections */
    const handleContentSelect = (content) => {
        setSelectedContent(content);
        onSelectContent(content);
    };
    /*end */

    /* Get item style based on selection */
    const getItemStyle = (content) => {
        return {
            cursor: 'pointer',
            color: selectedContent === content ? 'red' : 'inherit',
            fontWeight: selectedContent === content ? 'nomal' : 'normal'
        };
    };
    /*end */

    /* Handle button click to show modal */
    const handleButtonClick = () => {
        setShowModal(true);
    };
    /* end */

    /* Handle file input change */
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSelectedFileName(file ? file.name : '');
        setErrorUploadMessage('');
    };
    /* end */

     /* Handle file deletion */
    const handleDeleteFile = () => {
        setSelectedFile(null);
        setSelectedFileName('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    /* end */

    /* Handle file upload to the server */
    const handleUpload = async () => {
        if (selectedFile) {
            const token = sessionStorage.getItem('token') || localStorage.getItem('token');
            const formData = new FormData();
            formData.append("porfilePic", selectedFile); // Note the spelling: "porfilePic", not "profilePic"
    
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BASE_URL}api/student/updateProfilePic`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            // Remove 'Content-Type' header, let the browser set it automatically for FormData
                        },
                        body: formData,
                    }
                );
    
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Error response:", errorText);
                    throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
                }
    
                const data = await response.json();
                console.log("File uploaded successfully:", data);
                setShowModal(false);
                setLocalProfilePic(`${import.meta.env.VITE_BASE_URL}storage/${data.data.porfilePic}`);
            } catch (error) {
                console.error("Error uploading file:", error);
                setErrorUploadMessage(error.message || 'An unexpected error occurred.');
            }
        }
    };
    /*end */

    return (
        <Card className="boxshadow">
            <Card.Body className="text-center p-4 ">
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: '#8a7be8',
                    margin: '0 auto 15px',
                    position: 'relative'
                }}>
                    <img
                        src={localProfilePic}
                        alt="Profile"
                        style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = defaultProfilePic;
                        }}
                    />
                    <Button
                        
                        size="sm"
                        className="mpw-profilepic-btn rounded-circle position-absolute d-flex justify-content-center align-items-center"
                        style={{
                            bottom: "5px",
                            right: "10px",
                            width: "20px",
                            height: "20px",
                            padding: "0",
                            transform: "translate(50%, 50%)",
                        }}
                        onClick={handleButtonClick}
                    >
                        +
                    </Button>
                    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Select a Photo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {!selectedFileName ? (
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                />
                            ) : (
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>{selectedFileName}</span>
                                    <Button  variant="outline-secondary" size="sm" onClick={handleDeleteFile}>
                                        X
                                    </Button>
                                </div>
                            )}
                            {!selectedFileName && (
                                <Button
                                    variant="outline-danger"
                                    onClick={() => fileInputRef.current.click()}
                                    className="mt-2"
                                >
                                    Select File
                                </Button>
                            )}
                            {errorUploadMessage && (
                                <div style={{ color: "red", marginTop: "10px" }}>
                                    {errorUploadMessage}
                                </div>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
                                Cancel
                            </Button>
                            <Button
                                variant="outline-danger"
                                onClick={handleUpload}
                                disabled={!selectedFile}
                            >
                                Upload
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </Card.Body>
            <ListGroup variant="flush" className="p-4 custom-list-group">
                <ListGroup.Item
                    className="d-flex justify-content-between align-items-center"
                    onClick={() => setIsProfileExpanded(!isProfileExpanded)}
                    style={{ cursor: 'pointer' }}
                >
                    My Profile
                    {isProfileExpanded ?
                        <MinusCircle size={16} color="red" /> :
                        <PlusCircle size={16} color="red" />
                    }
                </ListGroup.Item>
                <Collapse in={isProfileExpanded}>
                    <div>
                        <ListGroup.Item
                            className="ps-4"
                            onClick={() => handleContentSelect('basicInfo')}
                            style={getItemStyle('basicInfo')}
                        >
                            Basic Information
                        </ListGroup.Item>
                        <ListGroup.Item
                            className="ps-4"
                            onClick={() => handleContentSelect('managePassword')}
                            style={getItemStyle('managePassword')}
                        >
                            Manage Password
                        </ListGroup.Item>
                    </div>
                </Collapse>
                <ListGroup.Item
                    className="transcript-item"
                    onClick={() => handleContentSelect('transcript')}
                    style={getItemStyle('transcript')}
                >
                    Transcript
                </ListGroup.Item>
                <ListGroup.Item
                    className="d-flex justify-content-between align-items-center"
                    onClick={() => setIsCoursesExpanded(!isCoursesExpanded)}
                    style={{ cursor: 'pointer' }}
                >
                    Applied Courses
                    {isCoursesExpanded ?
                        <MinusCircle size={16} color="red" /> :
                        <PlusCircle size={16} color="red" />
                    }
                </ListGroup.Item>
                <Collapse in={isCoursesExpanded}>
                    <div>
                        <ListGroup.Item
                            className="ps-4"
                            onClick={() => handleContentSelect('appliedCoursePending')}
                            style={getItemStyle('appliedCoursePending')}
                        >
                            Pending
                        </ListGroup.Item>
                        <ListGroup.Item
                            className="ps-4"
                            onClick={() => handleContentSelect('appliedCourseHistory')}
                            style={getItemStyle('appliedCourseHistory')}
                        >
                            History
                        </ListGroup.Item>
                    </div>
                </Collapse>
            </ListGroup>
        </Card>
    );
};

export default MyProfileWidget;