import React, { useState, useEffect } from "react";
import { Container, Col, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminFormComponent from './AdminFormComponent';
import 'typeface-ubuntu';
import ErrorModal from "./Error";
import "../../css/AdminStyles/AdminFormStyle.css";
import 'react-phone-input-2/lib/style.css';

const AdminAddQuestionContent = () => {
    const [categoryList, setCategoryList] = useState([]); 
    const [icon, setIcon] = useState(null); 
    const [newIcon, setNewIcon] = useState(null);
    const [formData, setFormData] = useState({
        newQuestion: "",
        questionType:"",
    });
    const [selectedIntakes, setSelectedIntakes] = useState([]);
    const [error, setError] = useState(null);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [generalError, setGeneralError] = useState('');
    const [accountList, setAccountList] = useState([]); 
    const [fieldErrors, setFieldErrors] = useState({});
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`
    const fieldLabels = {
       newQuestion:"Question",
       questionType:"RIASEC Type",
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const { newQuestion, questionType } = formData; // Now, icon is the actual file
        if (!newQuestion || !questionType) {
            setGeneralError("Please fill in all required fields.");
            setErrorModalVisible(true);
            return; // Stop form submission if any required field is missing
        }
        const formPayload = new FormData();
        formPayload.append("newQuestion", newQuestion);
        formPayload.append("questionType", questionType);
    
        // Debugging: Log what is being sent to the backend
        // console.log("FormData being sent:");
        for (let [key, value] of formPayload.entries()) {
            // console.log(`${key}:`, value);
        }
    
        try {
            const addCategoryResponse = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/addPersonalQuestion`, {
                method: 'POST',
                headers: {
                    'Authorization': Authenticate,
                },
                body: formPayload,
            });
            const addCategoryData = await addCategoryResponse.json();
            if (addCategoryResponse.ok) {
                console.log('Category successfully registered:', addCategoryData);
                navigate('/adminQuestion');
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
    
    // const handleIconChange = (e) => {
    //     const file = e.target.files[0]; // Get the selected file
    //     if (file) {
    //         // Set the icon in formData
    //         setFormData((prevFormData) => ({
    //             ...prevFormData,
    //             icon: file,
    //         }));
    
    //         // Preview the image as base64 (optional)
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setNewIcon(reader.result); // This is just for preview purposes
    //         };
    //         reader.readAsDataURL(file); // Read the file as a data URL for the preview
    //     }
    // };
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/riasecTypesList`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authenticate,
                    }
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (data && data.data) {
                    setAccountList(data.data);
                }
            } catch (error) {
                console.error('Error fetching accounts:', error.message);
                setError(error.message);
            }
        };
        fetchAccounts();
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
    
    
    // const handleEditorChange = (content) => {
    //     setFormData(prevFormData => ({
    //         ...prevFormData,
    //         description: content,
    //     }));
    // };
  
    const formFields = [
        {
            id: "newQuestion",
            label: "Question",
            type: "text",
            placeholder: "Enter New Question",
            value: formData.newQuestion,
            onChange: handleFieldChange,
            required: true
        },
    ];
    const formAccount = [
        {
            id: "questionType",
            label: "RIASEC Type",
            value: formData.questionType,
            onChange: handleFieldChange,
            required: true,
            options: accountList.map(account => ({
                label: account.type_name,
                value: account.id
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
        
        <Container fluid className="admin-add-school-container">
             <ErrorModal
                errorModalVisible={errorModalVisible}
                setErrorModalVisible={setErrorModalVisible}
                generalError={generalError || error} // Ensure `generalError` or fallback to `error`
                fieldErrors={fieldErrors}
                fieldLabels={fieldLabels}
            />
            <AdminFormComponent
            formTitle="Add New Question for Personality Test"
            formFields={formFields}
            formAccount={formAccount}
            onSubmit={handleSubmit}
            error={error}
            Star="*"
            buttons={buttons}
            
            />
        </Container>
    );
};

export default AdminAddQuestionContent;
