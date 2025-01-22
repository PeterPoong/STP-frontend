import React, { useState, useEffect } from "react";
import { Container, Col, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SkeletonLoader from './SkeletonLoader';
import AdminFormComponent from './AdminFormComponent';
import 'typeface-ubuntu';
import "../../css/AdminStyles/AdminFormStyle.css";
import 'react-phone-input-2/lib/style.css';
import ErrorModal from "./Error";

const AdminEditQuestionContent = () => {
    const [questionList, setQuestionList] = useState([]); 
    const [formData, setFormData] = useState({
        newQuestion: "",
        newType:"",
    });
    const [error, setError] = useState(null);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [generalError, setGeneralError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`
    const [loading, setLoading] = useState(true);
    const [accountList, setAccountList] = useState([]); 
    
    const questionId = sessionStorage.getItem('questionId'); 
    const fieldLabels = {
        newQuestion:"Question",
        newTypw:"RIASEC Type",
     };
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const { newQuestion, newType } = formData; // Now, icon is the actual file
        if (!newQuestion || !newType ) {
            setGeneralError("Please fill in all required fields.");
            setErrorModalVisible(true);
            return; // Stop form submission if any required field is missing
        }
        const formPayload = new FormData();
        formPayload.append("id", questionId);
        formPayload.append("newQuestion", newQuestion);
        formPayload.append("newType", newType);
    
        // Debugging: Log what is being sent to the backend
        // console.log("FormData being sent:");
        for (let [key, value] of formPayload.entries()) {
            // console.log(`${key}:`, value);
        }
    
        try {
            const addQuestionResponse = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/updatePersonalQuestion`, {
                method: 'POST',
                headers: {
                    'Authorization': Authenticate,
                },
                body: formPayload,
            });
    
            const addQuestionData = await addQuestionResponse.json();
    
            if (addQuestionResponse.ok) {
                console.log('Question successfully registered:', addQuestionData);
                navigate('/adminQuestion');
            } else if (addQuestionResponse.status === 422) {
                // Validation errors
                console.log('Validation Errors:', addQuestionData.errors);
                setFieldErrors(addQuestionData.errors); // Pass validation errors to the modal
                setGeneralError(addQuestionData.message || "Validation Error");
                setErrorModalVisible(true); // Show the error modal
            } else {
                setGeneralError(addQuestionData.message || "Failed to edit question.");
                setErrorModalVisible(true);
            }
        } catch (error) {
            setGeneralError(error.message || "An error occurred while editing the question. Please try again later.");
            setErrorModalVisible(true);
        }
    };

    useEffect(() => {
        if (!questionId) {
            console.error("Question ID is not available in sessionStorage");
            return;
        }

        const fetchQuestionDetails = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/questionDetail`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authenticate,
                    },
                    body: JSON.stringify({ id: questionId })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                const questionDetails = data.data; // Use the packageId

                if (questionDetails) {
                    setFormData({
                        newQuestion: questionDetails.newQuestion,
                        newType: questionDetails.newType,

                    });
                } else {
                    console.error("Question not found with ID:", questionId);
                }
            } catch (error) {
                console.error('Error fetching question details:', error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchQuestionDetails();
    }, [questionId, Authenticate]);
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
    
    const formFields = [
        {
            id: "newQuestion",
            label: "Question",
            type: "text",
            placeholder: "Edit Question",
            value: formData.newQuestion,
            onChange: handleFieldChange,
            required: true
        },
    
 
    ];

    const formAccount = [
        {
            id: "newType",
            label: "RIASEC Type",
            value: formData.newType,
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
            {loading ? (
            <SkeletonLoader />
                 ) : (
            <AdminFormComponent
                formTitle="Question Details"
                formFields={formFields}
                formAccount={formAccount}
                onSubmit={handleSubmit}
                error={error}
                buttons={buttons}
                Star="*"
                />
            )}
        </Container>
    );
};

export default AdminEditQuestionContent;
