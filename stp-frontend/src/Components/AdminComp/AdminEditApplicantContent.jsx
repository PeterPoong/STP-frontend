import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import SkeletonLoader from './SkeletonLoader';
import AdminFormComponent from './AdminFormComponent';
import "../../css/AdminStyles/AdminFormStyle.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import ErrorModal from "./Error";


const AdminEditApplicantContent = () => {
    const [courseList, setCourseList] = useState([]); 
    const [schoolList, setSchoolList] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [generalError, setGeneralError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [formData, setFormData] = useState({
        courses_id: "",
        school_id: "",
        feedback: "",
        created_at:"",
        status:"",
    });
    const [error, setError] = useState(null);
    const token = sessionStorage.getItem('token');
    const applicantId = sessionStorage.getItem('applicantId');
    const Authenticate = `Bearer ${token}`;
    const navigate = useNavigate();
    // Fetch courses based on selected school ID
    const fetchCourses = async (school_id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/courseDetailApplicant`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Authenticate,
                },
                body: JSON.stringify({ school_id })
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            // console.log('Fetched courses data:', data); 
            
            // Ensure the response data is set as an array for easy mapping
            if (data && Array.isArray(data.data)) {
                setCourseList(data.data);  // Set courseList directly from the array
            }
        } catch (error) {
            console.error('Error fetching courses:', error.message);
            setError(error.message);
        }
    };
    

    // Fetch applicant details to populate the form
    const fetchApplicantDetails = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/applicantDetail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Authenticate,
                },
                body: JSON.stringify({ id: applicantId })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const applicantDetails = data.data;

            if (applicantDetails) {
                setFormData({
                    courses_id: applicantDetails.courseID,
                    school_id: applicantDetails.schoolID,
                    feedback: applicantDetails.feedback || "",
                    email: applicantDetails.email,
                    name: applicantDetails.name,
                    country_code: applicantDetails.country_code,
                    contact_number: applicantDetails.contact_number,
                    created_at: applicantDetails.applied ? format(parseISO(applicantDetails.applied), 'yyyy-MM-dd') : "", 
                    status:applicantDetails.status,
                    name:applicantDetails.name,
                    email:applicantDetails.email,
                    country_code:applicantDetails.country_code,
                    contact_number:applicantDetails.contact_number
                });

                // Fetch courses for the existing schoolID
                fetchCourses(applicantDetails.schoolID); 
            } else {
                console.error("Applicant not found with ID:", applicantId);
            }
        } catch (error) {
            console.error('Error fetching applicant details:', error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch school list
    const fetchSchools = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/schoolListAdmin`, {
                method: 'GET',
                headers: {
                    'Authorization': Authenticate,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data) {
                setSchoolList(data);
            }
        } catch (error) {
            console.error('Error fetching schools:', error.message);
            setError(error.message);
        }
    };
    const fieldLabels = {
        courses_id:"Course Applied",
        status:"Application Status",
        school_id:"University Applied",
        created_at:"Date Applied",
        feedback:"University Feedback"
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const { courses_id, status, school_id, created_at, feedback } = formData;
        if (!courses_id || !status || !school_id || !created_at) {
            setGeneralError("Please fill in all required fields.");
            setErrorModalVisible(true);
            return; // Stop form submission if any required field is missing
        }
        const formPayload = new FormData();
        formPayload.append("id", applicantId);
        formPayload.append("courses_id", courses_id);
        formPayload.append("school_id", school_id);
        formPayload.append("feedback", feedback);
        formPayload.append("status", parseInt(status));
        formPayload.append("created_at", created_at); // Already formatted as YYYY-MM-DD
        
    // Log each entry in FormData for debugging
    for (let [key, value] of formPayload.entries()) {
        console.log(key, value);
    }
        setLoading(true);  // Set loading state to true
   
        try {
            const addApplicantResponse = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/editApplicantForm`, {
                method: 'POST',
                headers: {
                    'Authorization': Authenticate,  // No need for 'Content-Type' because FormData is used
                },
                body: formPayload,
            });
    
            const addApplicantData = await addApplicantResponse.json();

            if (addApplicantResponse.ok) {
                // console.log('Applicant successfully registered:', addApplicantData);
                navigate('/adminApplicant');
            } else if (addApplicantResponse.status === 422) {
                // Validation errors
                console.log('Validation Errors:', addApplicantData.errors);
                setFieldErrors(addApplicantData.errors); // Pass validation errors to the modal
                setGeneralError(addApplicantData.message || "Validation Error");
                setErrorModalVisible(true); // Show the error modal
            } else {
                console.error('Server error:', addApplicantData.message);
                setGeneralError(addApplicantData.message || 'Failed to edit application details.');
                setErrorModalVisible(true);
            }
        } catch (error) {
            console.error('Network or unexpected error:', error);
            setGeneralError(error.message || 'An unexpected error occurred. Please try again later.');
            setErrorModalVisible(true);
        } finally {
            setLoading(false);  // Ensure loading state is set to false after completion
        }
    };
    
    // Handle form field change
    const handleFieldChange = (e) => {
        const { id, value } = e.target;

        if (id === "school_id") {
            setFormData(prev => ({
                ...prev,
                [id]: value,
                courses_id: ""  // Reset course selection when school changes
            }));
            fetchCourses(value);  // Fetch courses for the new school ID
        } else if (id === "status") {
            setFormData(prev => ({
                ...prev,
                [id]: parseInt(value)  // Ensure status is an integer
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [id]: value
            }));
        }
    };
    

    const handleDateChange = (date) => {
        if (date) {
            // Format date as YYYY-MM-DD
            const formattedDate = format(date, 'yyyy-MM-dd');
            setFormData(prev => ({
                ...prev,
                created_at: formattedDate  // Update only if a new date is selected
            }));
        }
    };
    
    
    // Load data on component mount
    useEffect(() => {
        if (!applicantId) {
            console.error("Applicant ID is not available in sessionStorage");
            return;
        }

        fetchApplicantDetails();
        fetchSchools();
    }, [applicantId, Authenticate]);
    
    const formRead = [
        {
            id: "name",
            label: "Applicant's name",
            value: formData.name,
        },
        {
            id: "email",
            label: "Applicant's email",
            value: formData.email,
        },
        {
            id: "phone_number",
            label: "Phone Number",
            value: `${formData.country_code} ${formData.contact_number}`, // Concatenate country code and contact number
          },
    ];


    const formDates = [
        {
            id: "created_at",
            label: "Date Applied",
            value: formData.created_at,
            onChange: handleDateChange,
            required: true
        },
    ];

    const formCourses = [
        {
            id: "courses_id",
            label: "Course Applied",
            value: formData.courses_id,  // Set the course_id correctly from formData
            onChange: handleFieldChange,
            required: true,
            options: courseList.map(course => ({
                label: course.name,  // Display course name
                value: course.id      // The actual course ID
            })),
            placeholder: formData.courses_id ? undefined : "Select Course",
            disabled: !formData.school_id  // Disable course selection if no school is selected
        }
    ];
    
    

    const formDrop = [
        {
            id: "school_id",
            label: "University Applied",
            value: formData.school_id,
            onChange: handleFieldChange,
            required: true,
            options: schoolList.map(school => ({
                label: school.name,
                value: school.id
            }))
        }
    ];

    const formStatus = [
        {
            id: "status",
            label: "Application Status",
            value: formData.status,
            onChange: handleFieldChange,
            required: true,
            options: [
                { label: "Disable", value: 0 },
                { label: "Active", value: 1 },
                { label: "Pending", value: 2 },
                { label: "Rejected", value: 3 },
                { label: "Accepted", value: 4 }
            ]
        }
    ];
    
    const formTextarea = [
        {
            id: "feedback",
            label: "University Feedback",
            as: "textarea",
            rows: 3,
            placeholder: "Enter feedback",
            value: formData.feedback,
            onChange: handleFieldChange,
        },
    ];

    const buttons = [
        {
            label: "SAVE",
            type: "submit"
        }
    ];

    return (
        <Container fluid className="admin-add-subject-container">
           <ErrorModal
                errorModalVisible={errorModalVisible}
                setErrorModalVisible={setErrorModalVisible}
                generalError={generalError || error} // Ensure `generalError` or fallback to `error`
                fieldErrors={fieldErrors}
                fieldLabels={fieldLabels}
            />
            {error && <div className="alert alert-danger">{error}</div>}
            {loading ? (
                    <SkeletonLoader />
                ) : (
            <AdminFormComponent
                formTitle="Applicant Information"
                formRead={formRead}
                formCourses={formCourses}
                formDates={formDates}
                formDrop={formDrop}
                formTextarea={formTextarea}
                formStatus={formStatus}
                onSubmit={handleSubmit}
                error={error}
                buttons={buttons}
                Star="*"
            />
        )}
        </Container>
    );
};

export default AdminEditApplicantContent;
