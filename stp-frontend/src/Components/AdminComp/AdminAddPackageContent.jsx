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

const AdminAddPackageContent = () => {
    const [categoryList, setCategoryList] = useState([]); 
    const [packageList, setPackageList] = useState([]); 
    const [formData, setFormData] = useState({
        package_name: "",
        package_detail: "",
        package_type: "",
        package_price: "",
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`;

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log("Submitting form data:", formData); // Debugging line
        
        const { package_name, package_detail, package_type, package_price } = formData;
        
        const formPayload = new FormData();
        formPayload.append("package_name", package_name);
        formPayload.append("package_detail", package_detail); // TinyMCE raw HTML
        formPayload.append("package_type", package_type);
        formPayload.append("package_price", package_price);
    
        // Debugging: Log FormData
        for (let [key, value] of formPayload.entries()) {
            // console.log(key, value);
        }
    
        try {
            const addPackageResponse = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/addPackage`, {
                method: 'POST',
                headers: {
                    'Authorization': Authenticate, // Ensure Authenticate contains a valid token
                },
                body: formPayload, // Using FormData directly as the body
            });
    
            const addPackageData = await addPackageResponse.json();
    
            if (addPackageResponse.ok) {
                console.log('Package successfully registered:', addPackageData);
                navigate('/adminPackage'); // Ensure navigate function is properly defined
            } else {
                console.error('Validation Error:', addPackageData.errors);
                throw new Error(`Package Registration failed: ${addPackageData.message}`);
            }
        } catch (error) {
            setError('An error occurred during Package registration. Please try again later.');
            console.error('Error during Package registration:', error);
        }
    };
    
    
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/packageTypeList`, {
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
                    setPackageList(data.data);  // Set the category list state
                }
            } catch (error) {
                console.error('Error fetching accounts:', error.message);
                setError(error.message);
            }
        };
    
        fetchPackages();
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
    
    const handleEditorChange = (content) => {
        // Remove newline characters
        const cleanedContent = content.replace(/\n/g, '').replace(/\s{2,}/g, ' ');
      
        setFormData(prevFormData => ({
          ...prevFormData,
          package_detail: cleanedContent, // Store the cleaned content
        }));
      };
      
    const formFields = [
        {
            id: "package_name",
            label: "Package Name",
            type: "text",
            placeholder: "Enter package name",
            value: formData.package_name,
            onChange: handleFieldChange,
            required: true
        },
    ];

    const formPrice=[
        {
            id: "package_price",
            label: "Package Price (RM)",
            type: "text",
            placeholder: "Enter package price",
            value: formData.package_price,
            onChange: handleFieldChange,
            required: true
        },
    ];

    const formPackage = [
        {
            id: "package_type",
            label: "Package Type",
            value: formData.package_type,
            onChange: handleFieldChange,
            required: true,
            options: packageList.map(packages => ({
                label: packages.name,
                value: packages.id
            }))
        }
    ];
    
    const formHTML = [
        {
            id: "package_detail",
            label: "Package Details",
            value: formData.package_detail,
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
        
                <Container fluid className="admin-add-package-container">
                    <AdminFormComponent
           formTitle="Package Information"
           formFields={formFields}
           formHTML={formHTML}
           formPackage={formPackage}
           formPrice={formPrice}
           onSubmit={handleSubmit}
           error={error}
           buttons={buttons}

                />
                </Container>
    );
};

export default AdminAddPackageContent;
