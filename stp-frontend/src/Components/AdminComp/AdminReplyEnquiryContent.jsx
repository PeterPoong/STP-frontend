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

const AdminReplyEnquiryContent = () => {
    const [categoryList, setCategoryList] = useState([]); 
    const [formData, setFormData] = useState({
        name: "",
        description:"",

    });
    const [selectedIntakes, setSelectedIntakes] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`
    const enquiryId = sessionStorage.getItem('enquiryId'); 
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const { name, description } = formData; // Now, icon is the actual file
    
        const formPayload = new FormData();
        formPayload.append("id", enquiryId);
        formPayload.append("name", name);
        formPayload.append("description", description);

    
        // Debugging: Log what is being sent to the backend
        // console.log("FormData being sent:");
        for (let [key, value] of formPayload.entries()) {
            // console.log(`${key}:`, value);
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
        if (!enquiryId) {
            console.error("Enquiry ID is not available in sessionStorage");
            return;
        }

        const fetchEnquiryDetails = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/enquiryDetail`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authenticate,
                    },
                    body: JSON.stringify({ id: enquiryId })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                const enquiryDetails = data.data; // Use the packageId

                if (enquiryDetails) {
                    setFormData({
                        name: enquiryDetails.name,
                        email: enquiryDetails.email,
                        phone: enquiryDetails.phone,
                        subject: enquiryDetails.subject,
                        message: enquiryDetails.message

                    });
                } else {
                    console.error("Category not found with ID:", enquiryId);
                }
            } catch (error) {
                console.error('Error fetching package details:', error.message);
                setError(error.message);
            }
        };
        fetchEnquiryDetails();
    }, [enquiryId, Authenticate]);

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
    const formRead = [
        {
            id: "name",
            label: "Received from",
            value: formData.name,
        },
        {
            id: "phone_number",
            label: "Phone Number",
            value: formData.phone,
          },
          {
            id: "Enquiry Subject",
            label: "subject",
            value: formData.subject,
          },
          {
            id: "Message",
            label: "Message",
            value: formData.message,
          },
    ];

   const shouldRenderHorizontalLine =[]

    const formFields = [
        {
            id: "email",
            label: "Reply to",
            type: "text",
            placeholder: "Enter receipient email",
            value: formData.email,
            onChange: handleFieldChange,
            required: true
        },
        {
            id: "subject",
            label: "Subject",
            type: "text",
            placeholder: "Enter subject",
            value: `Re: ${formData.subject || ""}`, // Add prefix here
            onChange: (e) => {
                const newValue = e.target.value.startsWith("Re: ") 
                    ? e.target.value.slice(4)   // Remove "RE: " prefix from user input
                    : e.target.value;
        
                handleFieldChange({ target: { id: "subject", value: newValue } });
            },
            required: true
        }
        
 
    ];

    const formHTML = [
        {
            id: "reply",
            label: "Reply Message",
            value: formData.reply,
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
           formTitle="Reply Enquiry"
          
           formRead={formRead}
           shouldRenderHorizontalLine={shouldRenderHorizontalLine}
           formFields={formFields}
           formHTML={formHTML}
           onSubmit={handleSubmit}
           error={error}
           buttons={buttons}
                />
                </Container>
    );
};

export default AdminReplyEnquiryContent;
