import React, { useState, useEffect } from "react";
import { Container, Col, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminFormComponent from './AdminFormComponent';
import 'typeface-ubuntu';
import ErrorModal from "./Error";
import "../../css/AdminStyles/AdminFormStyle.css";
import 'react-phone-input-2/lib/style.css';

const AdminAddRiasecContent = () => {
    const [categoryList, setCategoryList] = useState([]); 
    const [formData, setFormData] = useState({
        newRiasecType: "",
        unique_description:"",
        strength:"",
    });
    const [error, setError] = useState(null);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [generalError, setGeneralError] = useState('');
    const [accountList, setAccountList] = useState([]); 
    const [fieldErrors, setFieldErrors] = useState({});
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`
    const fieldLabels = {
       newRiasecType:"RIASEC Type",
       unique_description:"Description",
       strength:"Strength",
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const { newRiasecType, unique_description, strength } = formData; // Now, icon is the actual file
        if (!newRiasecType) {
            setGeneralError("Please fill in all required fields.");
            setErrorModalVisible(true);
            return; // Stop form submission if any required field is missing
        }
        const formPayload = new FormData();
        formPayload.append("newRiasecType", newRiasecType);
        formPayload.append("unique_description", unique_description);
        formPayload.append("strength", strength);
    
        // Debugging: Log what is being sent to the backend
        // console.log("FormData being sent:");
        for (let [key, value] of formPayload.entries()) {
            // console.log(`${key}:`, value);
        }
    
        try {
            const addRiasecResponse = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/addRiasecTypes`, {
                method: 'POST',
                headers: {
                    'Authorization': Authenticate,
                },
                body: formPayload,
            });
            const addRiasecData = await addRiasecResponse.json();
            if (addRiasecResponse.ok) {
                console.log('RIASEC type successfully registered:', addRiasecData);
                navigate('/adminRiasec');
            } else if (addRiasecResponse.status === 422) {
                // Validation errors
                console.log('Validation Errors:', addRiasecData.errors);
                setFieldErrors(addRiasecData.errors); // Pass validation errors to the modal
                setGeneralError(addRiasecData.message || "Validation Error");
                setErrorModalVisible(true); // Show the error modal
            } else {
                setGeneralError(addRiasecData.message || "Failed to add new RIASEC type.");
                setErrorModalVisible(true);
            }
        } catch (error) {
            setGeneralError(error.message || "An error occurred while adding the RIASEC type. Please try again later.");
            setErrorModalVisible(true);
        }
    };
    
    const handleEditorChange = (content) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          strength: content,
        }));
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
    
    const formFields = [
        {
            id: "newRiasecType",
            label: "RIASEC Type",
            type: "text",
            placeholder: "Enter New RIASEC type",
            value: formData.newRiasecType,
            onChange: handleFieldChange,
            required: true
        },
    ];
    const formTextarea = [
        {
            id: "unique_description",
            label: "Description",
            as: "textarea",
            rows: 3,
            placeholder: "Enter description",
            value: formData.unique_description,
            onChange: handleFieldChange,
        },
    ];
    const formHTML = [
        {
          id: "strength",
          label: "Strength",
          value: formData.strength,
          onChange: handleEditorChange, // Pass the handleEditorChange function
        },
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
            formTitle="Add New RIASEC Type"
            formFields={formFields}
            formTextarea={formTextarea}
            formHTML={formHTML}
            onSubmit={handleSubmit}
            error={error}
            Star="*"
            buttons={buttons}
            
            />
        </Container>
    );
};

export default AdminAddRiasecContent;
