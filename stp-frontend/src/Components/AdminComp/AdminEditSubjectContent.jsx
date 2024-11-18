import React, { useState, useEffect } from "react";
import { Container, Col, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SkeletonLoader from './SkeletonLoader';
import AdminFormComponent from './AdminFormComponent';
import 'typeface-ubuntu';
import "../../css/AdminStyles/AdminFormStyle.css";
import 'react-phone-input-2/lib/style.css';
import ErrorModal from "./Error";

import { FaTrashAlt } from 'react-icons/fa';

const AdminEditSubjectContent = () => {
    const [categoryList, setCategoryList] = useState([]); 
    const [formData, setFormData] = useState({
        name: "",
        category:"",
    });
     const [error, setError] = useState(null);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [generalError, setGeneralError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const [loading, setLoading] = useState(true); 
    const Authenticate = `Bearer ${token}`;
    const subjectId = sessionStorage.getItem('subjectId');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const { name,category } = formData;
        
        const formPayload = new FormData();
        formPayload.append("id", subjectId)
        formPayload.append("name", name);
        formPayload.append("category", category);
   
    
        try {
            const addSubjectResponse = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/editSubject`, {
                method: 'POST',
                headers: {
                    'Authorization': Authenticate,  // No need for 'Content-Type' because FormData is used
                },
                body: formPayload,
            });
    
            const addSubjectData = await addSubjectResponse.json();
    
            if (addSubjectResponse.ok) {
                console.log('Subject successfully registered:', addSubjectData);
                navigate('/adminSubject');
            } else {
                setError(addSubjectData.message || "Failed to edit subject.");
                setErrorModalVisible(true);
            }
        } catch (error) {
            setError(error.message || "An error occurred while editing the subject. Please try again later.");
            setErrorModalVisible(true);
        }
    };
     
    useEffect(() => {
        if (!subjectId) {
            console.error("Subject ID is not available in sessionStorage");
            return;
        }
    
        const fetchSubjectDetails = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/subjectDetail`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authenticate,
                    },
                    body: JSON.stringify({ id: subjectId }) // Pass courseId
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const data = await response.json();
                const subjectDetails = data.data; // Use courseDetails directly
    
                if (subjectDetails) {
                    setFormData({
                        name: subjectDetails.name,
                        category: subjectDetails.category,
                    });
                    
                } else {
                    setGeneralError(data.message || 'Failed to load subject details data.');
                    setErrorModalVisible(true);
                }
            } catch (error) {
                setGeneralError(error.message || 'An error occurred while fetching subject details.');
                setErrorModalVisible(true);
            } finally {
                setLoading(false);
            }
        };
    

        const fetchCategories = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/transcriptCategoryList`, {
                    method: 'POST', // Change to POST if required
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authenticate,
                    },
                    body: JSON.stringify({}) // Add any necessary body data
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const data = await response.json();
                if (data && data.data) {
                    setCategoryList(data.data);  // Set the category list state
                }
            } catch (error) {
                console.error('Error fetching categories:', error.message);
                setError(error.message);
            }
        };
        fetchSubjectDetails();
        fetchCategories();
    }, [subjectId,Authenticate]);
    


    const handleFieldChange = (e) => {
        const { id, value, type, files } = e.target;
        // console.log(`Field ${id} updated with value: ${value}`); // Debugging line
        if (type === "file") {
            setFormData(prev => ({
                ...prev,
                [id]: files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [id]: value
            }));
        }
    };
    
    const formFields = [
        {
            id: "name",
            label: "Subject Name",
            type: "text",
            placeholder: "Enter subject name",
            value: formData.name,
            onChange: handleFieldChange,
            required: true
        },
    ];

    const formCategory = [
        {
            id: "category",
            label: "Transcript Category",
            value: formData.category,
            onChange: handleFieldChange,
            required: true,
            options: categoryList.map(category => ({
                label: category.name,
                value: category.id
            }))
        }
    ];

    const buttons = [
        {
            label: "SAVE",
            type: "submit"
        }
    ];

    return (
        
        <Container fluid className="admin-add-subject-container">
            <ErrorModal
                errorModalVisible={errorModalVisible}
                setErrorModalVisible={setErrorModalVisible}
                generalError={generalError || error} // Ensure `generalError` or fallback to `error`
                fieldErrors={fieldErrors}
            />
             {loading ? (
                    <SkeletonLoader />
                ) : (
            <AdminFormComponent
                formTitle="Subject Information"
                checkboxTitle="School Advertising Feature"
                formFields={formFields}
                formCategory={formCategory}
                onSubmit={handleSubmit}
                error={error}
                buttons={buttons}
                />
            )}
        </Container>
    );
};

export default AdminEditSubjectContent;
