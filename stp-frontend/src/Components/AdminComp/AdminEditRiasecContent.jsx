import React, { useState, useEffect } from "react";
import { Container, Col, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminFormComponent from './AdminFormComponent';
import 'typeface-ubuntu';
import ErrorModal from "./Error";
import "../../css/AdminStyles/AdminFormStyle.css";
import 'react-phone-input-2/lib/style.css';

const AdminEditRiasecContent = () => {
    const [riasecList, setRiasecList] = useState([]); 
    const [formData, setFormData] = useState({
        updateRiasecType: "",
        newDescription:"",
        newStrength:"",
    });
    const [error, setError] = useState(null);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [generalError, setGeneralError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const riasecId = sessionStorage.getItem('riasecId'); 
    const [loading, setLoading] = useState(true);

    const Authenticate = `Bearer ${token}`
    const fieldLabels = {
       updateRiasecType:"RIASEC Type",
       newDescription:"Description",
       newStrength:"Strength",
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const { updateRiasecType, newDescription, newStrength } = formData; // Now, icon is the actual file
        if (!updateRiasecType ) {
            setGeneralError("Please fill in all required fields.");
            setErrorModalVisible(true);
            return; // Stop form submission if any required field is missing
        }
        const formPayload = new FormData();
        formPayload.append("id", riasecId);
        formPayload.append("updateRiasecType", updateRiasecType);
        formPayload.append("newDescription", newDescription);
        formPayload.append("newStrength", newStrength);

    
        // Debugging: Log what is being sent to the backend
        // console.log("FormData being sent:");
        for (let [key, value] of formPayload.entries()) {
            // console.log(`${key}:`, value);
        }
    
        try {
            const addRiasecResponse = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/updateRiasecTypes`, {
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
                setGeneralError(addRiasecData.message || "Failed to edit RIASEC Type.");
                setErrorModalVisible(true);
            }
        } catch (error) {
            setGeneralError(error.message || "An error occurred while editing the RIASEC Type. Please try again later.");
            setErrorModalVisible(true);
        }
    };

    useEffect(() => {
        if (!riasecId) {
            console.error("RIASEC Type ID is not available in sessionStorage");
            return;
        }
    const fetchRiasecDetails = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/riasecDetail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Authenticate,
                },
                body: JSON.stringify({ id: riasecId })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const riasecDetails = data.data; // Use the packageId

            if (riasecDetails) {
                setFormData({
                    updateRiasecType: riasecDetails.updateRiasecType,
                    newDescription: riasecDetails.newDescription,
                    newStrength: riasecDetails.newStrength,
                });
            } else {
                console.error("RIASEC Type not found with ID:", riasecId);
            }
        } catch (error) {
            console.error('Error fetching riasec details:', error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    fetchRiasecDetails();
}, [riasecId, Authenticate]);
    const handleEditorChange = (content) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          newStrength: content,
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
            id: "updateRiasecType",
            label: "RIASEC Type",
            type: "text",
            placeholder: "Enter RIASEC type",
            value: formData.updateRiasecType,
            onChange: handleFieldChange,
            required: true
        },
    ];
    const formTextarea = [
        {
            id: "newDescription",
            label: "Description",
            as: "textarea",
            rows: 3,
            placeholder: "Enter description",
            value: formData.newDescription,
            onChange: handleFieldChange,
        },
    ];
    const formHTML = [
        {
          id: "newStrength",
          label: "Strength",
          value: formData.newStrength,
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
            formTitle="Edit RIASEC Type"
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

export default AdminEditRiasecContent;
