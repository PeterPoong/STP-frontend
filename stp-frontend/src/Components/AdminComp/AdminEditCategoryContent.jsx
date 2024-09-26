import React, { useState, useEffect } from "react";
import { Container, Col, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import AdminFormComponent from './AdminFormComponent';
import 'typeface-ubuntu';
import "../../css/AdminStyles/AdminFormStyle.css";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { FaTrashAlt } from 'react-icons/fa';

const AdminEditCategoryContent = () => {
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
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`
    const categoryId = sessionStorage.getItem('categoryId'); 
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const { name, description, icon } = formData; // Now, icon is the actual file
    
        const formPayload = new FormData();
        formPayload.append("id", categoryId);
        formPayload.append("name", name);
        formPayload.append("description", description);


    
        // Append the icon if it exists
        if (icon) {
            formPayload.append("icon", icon); // icon is now the actual file
        }
    
        // Debugging: Log what is being sent to the backend
        console.log("FormData being sent:");
        for (let [key, value] of formPayload.entries()) {
            console.log(`${key}:`, value);
        }
    
        try {
            const addCategoryResponse = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/editCategory`, {
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
            } else {
                console.error('Validation Error:', addCategoryData.errors);
                throw new Error(`Category Registration failed: ${addCategoryData.message}`);
            }
        } catch (error) {
            setError('An error occurred during category registration. Please try again later.');
            console.error('Error during category registration:', error);
        }
    };

    useEffect(() => {
        if (!categoryId) {
            console.error("Category ID is not available in sessionStorage");
            return;
        }

        const fetchCategoryDetails = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/categoryDetail`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authenticate,
                    },
                    body: JSON.stringify({ id: categoryId })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                const categoryDetails = data.data; // Use the packageId

                if (categoryDetails) {
                    setFormData({
                        name: categoryDetails.name,
                        description: categoryDetails.description,

                    });
                    setIcon(categoryDetails.icon ? `${import.meta.env.VITE_BASE_URL}storage/${categoryDetails.icon}` : null);
                } else {
                    console.error("Category not found with ID:", categoryId);
                }
            } catch (error) {
                console.error('Error fetching package details:', error.message);
                setError(error.message);
            }
        };
        fetchCategoryDetails();
    }, [categoryId, Authenticate]);
    
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
        console.log(`Field ${id} updated with value: ${value}`); // Debugging line
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
                    <AdminFormComponent
           formTitle="Category Details"
           formFields={formFields}
           formHTML={formHTML}
           onSubmit={handleSubmit}
           error={error}
           buttons={buttons}
           newIcon={newIcon}
           icon={icon}
           handleIconChange={handleIconChange}
                />
                </Container>
    );
};

export default AdminEditCategoryContent;
