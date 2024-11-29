import React, { useState, useEffect } from "react";
import { Container, Col, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminFormComponent from './AdminFormComponent';
import 'typeface-ubuntu';
import ErrorModal from "./Error";
import "../../css/AdminStyles/AdminFormStyle.css";
import 'react-phone-input-2/lib/style.css';

const AdminAddPackageContent = () => {
    const [categoryList, setCategoryList] = useState([]); 
    const [packageList, setPackageList] = useState([]); 
    const [formData, setFormData] = useState({
        package_name: "",
        package_detail: "",
        package_type: "",
        package_price: "",
    });

    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`;
    const [error, setError] = useState(null);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [generalError, setGeneralError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const fieldLabels = {
        package_name:"Package Name",
        package_detail:"Package Detail",
        package_type:"Package Type",
        package_price:"Package Price"
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log("Submitting form data:", formData); // Debugging line
        
        const { package_name, package_detail, package_type, package_price } = formData;
        if (!package_name || !package_detail || !package_type || !package_price) {
            setGeneralError("Please fill in all required fields.");
            setErrorModalVisible(true);
            return; // Stop form submission if any required field is missing
        }
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
            } else if (addPackageResponse.status === 422) {
                // Validation errors
                console.log('Validation Errors:', addPackageData.errors);
                setFieldErrors(addPackageData.errors); // Pass validation errors to the modal
                setGeneralError(addPackageData.message || "Validation Error");
                setErrorModalVisible(true); // Show the error modal
            } else {
                setGeneralError(addPackageData.message || "Failed to add new package.");
                setErrorModalVisible(true);
            }
        } catch (error) {
            setGeneralError(error.message || "An error occurred while adding the package. Please try again later.");
            setErrorModalVisible(true);
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
         <ErrorModal
            errorModalVisible={errorModalVisible}
            setErrorModalVisible={setErrorModalVisible}
            generalError={generalError || error} // Ensure `generalError` or fallback to `error`
            fieldErrors={fieldErrors}
            fieldLabels={fieldLabels}
            />
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
