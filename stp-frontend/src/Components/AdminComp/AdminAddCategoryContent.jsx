import React, { useState, useEffect } from "react";
import { Container, Col, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminFormComponent from './AdminFormComponent';
import 'typeface-ubuntu';
import ErrorModal from "./Error";
import "../../css/AdminStyles/AdminFormStyle.css";
import 'react-phone-input-2/lib/style.css';

const AdminAddCategoryContent = () => {
    const [categoryList, setCategoryList] = useState([]); 
    const [icon, setIcon] = useState(null); 
    const [newIcon, setNewIcon] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        description:"",
        icon: null
    });
    const [selectedIntakes, setSelectedIntakes] = useState([]);
    const [error, setError] = useState(null);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [generalError, setGeneralError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`
    const fieldLabels = {
       name:"Category Name",
       description:"Category Description",
       icon:"Category Icon"
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const { name, description, icon } = formData; // Now, icon is the actual file
        if (!name || !description || !icon) {
            setGeneralError("Please fill in all required fields.");
            setErrorModalVisible(true);
            return; // Stop form submission if any required field is missing
        }
        const formPayload = new FormData();
        formPayload.append("name", name);
        formPayload.append("description", description);
    
        // Append the icon if it exists
        if (icon) {
            formPayload.append("icon", icon); // icon is now the actual file
        }
    
        // Debugging: Log what is being sent to the backend
        // console.log("FormData being sent:");
        for (let [key, value] of formPayload.entries()) {
            // console.log(`${key}:`, value);
        }
    
        try {
            const addCategoryResponse = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/addCategory`, {
                method: 'POST',
                headers: {
                    'Authorization': Authenticate,
                },
                body: formPayload,
            });
            const addCategoryData = await addCategoryResponse.json();
            if (addCategoryResponse.ok) {
                console.log('Category successfully registered:', addCategoryData);
                navigate('/adminCategory');
            } else if (addCategoryResponse.status === 422) {
                // Validation errors
                console.log('Validation Errors:', addCategoryData.errors);
                setFieldErrors(addCategoryData.errors); // Pass validation errors to the modal
                setGeneralError(addCategoryData.message || "Validation Error");
                setErrorModalVisible(true); // Show the error modal
            } else {
                setGeneralError(addCategoryData.message || "Failed to add new category.");
                setErrorModalVisible(true);
            }
        } catch (error) {
            setGeneralError(error.message || "An error occurred while adding the category. Please try again later.");
            setErrorModalVisible(true);
        }
    };
    
    const handleIconChange = (e) => {
        const file = e.target.files[0]; // Get the selected file
        if (file) {
            // Set the icon in formData
            setFormData((prevFormData) => ({
                ...prevFormData,
                icon: file,
            }));
    
            // Preview the image as base64 (optional)
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewIcon(reader.result); // This is just for preview purposes
            };
            reader.readAsDataURL(file); // Read the file as a data URL for the preview
        }
    };
    
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
    
    
    const handleEditorChange = (content) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            description: content,
        }));
    };
  
    const formFields = [
        {
            id: "name",
            label: "Category Name",
            type: "text",
            placeholder: "Enter category name",
            value: formData.name,
            onChange: handleFieldChange,
            required: true
        },
    
 
    ];

    const formHTML = [
        {
            id: "description",
            label: "Category Description",
            value: formData.description,
            onChange: handleEditorChange,
            required: true
        }
    ];


    const buttons = [
        {
            label: "SAVE",
            type: "submit"
        }
    ];

    return (
        
        <Container fluid className="admin-add-school-container">
             <ErrorModal
                errorModalVisible={errorModalVisible}
                setErrorModalVisible={setErrorModalVisible}
                generalError={generalError || error} // Ensure `generalError` or fallback to `error`
                fieldErrors={fieldErrors}
                fieldLabels={fieldLabels}
            />
            <AdminFormComponent
            formTitle="Category Details"
            formFields={formFields}
            formHTML={formHTML}
            onSubmit={handleSubmit}
            error={error}
            Star="*"
            buttons={buttons}
            newIcon={newIcon}
            icon={icon}
            handleIconChange={handleIconChange}
            />
        </Container>
    );
};

export default AdminAddCategoryContent;
