import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import { Card, ListGroup, Collapse, Button, Modal } from 'react-bootstrap';
import { PlusCircle, MinusCircle } from 'react-feather';
import sampleprofile from "../../assets/StudentPortalAssets/sampleprofile.png";
import "../../css/StudentPortalStyles/StudentPortalBasicInformation.css";

const MyProfileWidget = ({ onSelectContent }) => {
    const [isProfileExpanded, setIsProfileExpanded] = useState(false);
    const [isCoursesExpanded, setIsCoursesExpanded] = useState(false);
    const [selectedContent, setSelectedContent] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [profilePic, setProfilePic] = useState(sampleprofile);
    const [errorUploadMessage, setErrorUploadMessage] = useState('');
    const fileInputRef = useRef(null);
    const token = sessionStorage.getItem("token");

    const handleContentSelect = (content) => {
        setSelectedContent(content);
        onSelectContent(content);
    };

    const getItemStyle = (content) => {
        return {
            cursor: 'pointer',
            color: selectedContent === content ? 'red' : 'inherit',
            fontWeight: selectedContent === content ? 'nomal' : 'normal'
        };
    };

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("porfilePic", selectedFile);

            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BASE_URL}api/student/updateProfilePic`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        body: formData,
                    }
                );

                if (!response.ok) {
                    setErrorUploadMessage(response.statusText);
                    const errorData = await response.json();
                    console.log("Error response:", errorData);
                    throw new Error("error:".response);
                }
                const data = await response.json();
                console.log("File uploaded successfully:", data.data);
                setShowModal(false);
                setProfilePic(`${import.meta.env.VITE_BASE_URL}storage/${data.data.porfilePic}`);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    };

    return (
        <Card className="boxshadow">
            <Card.Body className="text-center p-4">
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: '#8a7be8',
                    margin: '0 auto 15px',
                    position: 'relative'
                }}>
                    <img
                        src={profilePic}
                        alt="Profile"
                        style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <Button
                        variant="danger"
                        size="sm"
                        className="rounded-circle position-absolute d-flex justify-content-center align-items-center"
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
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                            {errorUploadMessage && (
                                <div style={{ color: "red", marginTop: "5px" }}>
                                    {errorUploadMessage}
                                </div>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleUpload}>
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
                            onClick={() => handleContentSelect('appliedCoursesPending')}
                            style={getItemStyle('appliedCoursesPending')}
                        >
                            Pending
                        </ListGroup.Item>
                        <ListGroup.Item 
                            className="ps-4" 
                            onClick={() => handleContentSelect('appliedCoursesHistory')}
                            style={getItemStyle('appliedCoursesHistory')}
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