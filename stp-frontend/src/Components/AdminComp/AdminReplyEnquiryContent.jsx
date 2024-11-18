import React, { useState, useEffect } from "react";
import { Container, Col, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminFormComponent from './AdminFormComponent';
import 'typeface-ubuntu';
import SkeletonLoader from './SkeletonLoader';
import "../../css/AdminStyles/AdminFormStyle.css";
import 'react-phone-input-2/lib/style.css';
import ErrorModal from "./Error";                              

const AdminReplyEnquiryContent = () => {
    const [EnquiryList, setEnquiryList] = useState([]); 
    const [formData, setFormData] = useState({
        email: "",
        subject:"",
        messageContent:"",

    });
    const [selectedIntakes, setSelectedIntakes] = useState([]);
    const [error, setError] = useState(null);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`
    const [loading, setLoading] = useState(true);
    const enquiryId = sessionStorage.getItem('enquiryId'); 
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const { subject, email, messageContent } = formData;
    
        if (!subject || !email || !messageContent) {
            setError("All fields are required.");
            setErrorModalVisible(true);
            return;
        }
    
        const formPayload = new FormData();
        formPayload.append("enquiryId" , enquiryId)
        formPayload.append("subject", subject);
        formPayload.append("email", email);
        formPayload.append("messageContent", messageContent);
        console.log("FormData being sent to the backend:");
        for (let [key, value] of formPayload.entries()) {
            console.log(`${key}:`, value);
        }
        try {
            const addEnquiryResponse = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/replyEnquiry`, {
                method: 'POST',
                headers: {
                    'Authorization': Authenticate,
                },
                body: formPayload,
            });
    
            // Check only the status if no JSON is returned
            if (addEnquiryResponse.ok) {
                console.log('Enquiry successfully sent.');
                navigate('/adminEnquiry'); // Navigate to a different page on success
            } else {
                const rawResponse = await addEnquiryResponse.text(); // Get plain text
                console.error('Error response from server:', rawResponse);
                throw new Error(`Enquiry reply failed with status: ${addEnquiryResponse.status}`);
            }
        } catch (error) {
            setError('An error occurred while replying to the enquiry. Please try again later.');
            console.error('Error during Enquiry reply:', error);
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
                        message: enquiryDetails.message,
                        messageContent: enquiryDetails.messageContent

                    });
                } else {
                    console.error("Enquiry not found with ID:", enquiryId);
                }
            } catch (error) {
                console.error('Error fetching package details:', error.message);
                setError(error.message);
            } finally {
                setLoading(false);
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
            messageContent: content,
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
    const formTextarea = [
        {
            id: "messageContent",
            label: "Reply Message",
            as: "textarea",
            rows: 3,
            value: formData.messageContent,
            onChange: handleFieldChange,
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
    />
        {loading ? (
                <SkeletonLoader />
            ) : (
        <AdminFormComponent
           formTitle="Reply Enquiry"
           formRead={formRead}
           shouldRenderHorizontalLine={shouldRenderHorizontalLine}
           formFields={formFields}
           formTextarea={formTextarea}
           onSubmit={handleSubmit}
           error={error}
           buttons={buttons}
                />
            )}
     </Container>
    );
};

export default AdminReplyEnquiryContent;
