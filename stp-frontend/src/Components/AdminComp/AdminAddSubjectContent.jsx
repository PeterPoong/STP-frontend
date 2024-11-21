import React, { useState, useEffect } from "react";
import { Container, Col, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminFormComponent from './AdminFormComponent';
import 'typeface-ubuntu';
import "../../css/AdminStyles/AdminFormStyle.css";
import 'react-phone-input-2/lib/style.css';
import ErrorModal from "./Error";

const AdminAddSubjectContent = () => {
    const [categoryList, setCategoryList] = useState([]); 
    const [formData, setFormData] = useState({
        name: "",
        category:"",
    });
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`;
    const [error, setError] = useState(null);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [generalError, setGeneralError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const fieldLabels = { 
        name:"Subject Name",
        category:"Transcript Category"
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log("Submitting form data:", formData); // Debugging line
        const { name, category} = formData;
        if (!name || !category) {
            setError("Please fill in all required fields.");
            setErrorModalVisible(true);
            return; // Stop form submission if any required field is missing
        }
        const formPayload = new FormData();
        formPayload.append("name", name);
        formPayload.append("category", category);
    
        try {
            // console.log("FormData before submission:", formPayload);
            
            const addSubjectResponse = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/addSubject`, {
                method: 'POST',
                headers: {
                    'Authorization': Authenticate,
                },
                body: formPayload, // Using FormData directly as the body
            });
    
            const addSubjectData = await addSubjectResponse.json();
    
            if (addSubjectResponse.ok) {
                console.log('Subject successfully registered:', addSubjectData);
                navigate('/adminSubject');
            } else if (addSubjectResponse.status === 422) {
                // Validation errors
                console.log('Validation Errors:', addSubjectData.errors);
                setFieldErrors(addSubjectData.errors); // Pass validation errors to the modal
                setGeneralError(addSubjectData.message || "Validation Error");
                setErrorModalVisible(true); // Show the error modal
            } else {
                setGeneralError(addSubjectData.message || "Failed to add new subject.");
                setErrorModalVisible(true);
            }
        } catch (error) {
            setGeneralError(error.message || "An error occurred while adding the subject. Please try again later.");
            setErrorModalVisible(true);
        }
    };
    
    
    useEffect(() => {
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
    
        fetchCategories();
    }, [Authenticate]);
    


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
                fieldLabels={fieldLabels}
            />
            <AdminFormComponent
            formTitle="Subject Information"
            checkboxTitle="School Advertising Feature"
            formFields={formFields}
            formCategory={formCategory}
            onSubmit={handleSubmit}
            error={error}
            buttons={buttons}
                />
                </Container>
    );
};

export default AdminAddSubjectContent;
