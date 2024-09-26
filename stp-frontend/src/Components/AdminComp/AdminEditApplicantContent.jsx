import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import AdminFormComponent from './AdminFormComponent';
import "../../css/AdminStyles/AdminFormStyle.css";

const AdminEditApplicantContent = () => {
    const [courseList, setCourseList] = useState([]); 
    const [schoolList, setSchoolList] = useState([]); 

    const [formData, setFormData] = useState({
        courses_id: "",
        school_id: "",
        feedback: ""
    });
    const [error, setError] = useState(null);
    const token = sessionStorage.getItem('token');
    const applicantId = sessionStorage.getItem('applicantId');
    const Authenticate = `Bearer ${token}`;

    // Fetch courses based on selected school ID
    const fetchCourses = async (school_id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/courseDetailApplicant`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Authenticate,
                },
                body: JSON.stringify({ school_id })  // Send school_id in the request body
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Fetched courses data:', data); 
            
            // Ensure the response data is set as an array for easy mapping
            if (data && data.data) {
                setCourseList([data.data]);  // Wrap the course data in an array
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
                    applied: applicantDetails.applied,
                    type:applicantDetails.status
                });

                // Fetch courses for the existing schoolID
                fetchCourses(applicantDetails.schoolID); 
            } else {
                console.error("Applicant not found with ID:", applicantId);
            }
        } catch (error) {
            console.error('Error fetching applicant details:', error.message);
            setError(error.message);
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
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const { courses_id, school_id, feedback } = formData;
        
        const formPayload = new FormData();
        formPayload.append("id", applicantId)
        formPayload.append("courses_id", courses_id);
        formPayload.append("school_id", school_id);
        formPayload.append("feedback", feedback);

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
                console.log('Applicant successfully registered:', addApplicantData);
                navigate('/adminApplicant');
            } else {
                console.error('Validation Error:', addSubjectData.errors);
                throw new Error(`Applicant Registration failed: ${addSubjectData.message}`);
            }
        } catch (error) {
            setError('An error occurred during applicant registration. Please try again later.');
            console.error('Error during applicant registration:', error);
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
                courses_id: "" // Reset course_id when school is changed
            }));

            // Fetch courses for the selected school
            fetchCourses(value);
        } else {
            setFormData(prev => ({
                ...prev,
                [id]: value
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

    // Define the form fields
    const formDates = [
        {
            id: "applied",
            label: "Date Applied",
            type: "text",
            placeholder: "Date Applied",
            value: formData.applied,
            onChange: handleFieldChange,
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
            options: Array.isArray(courseList) ? courseList.map(course => ({
                label: course.name,  // Display course name
                value: course.id      // The actual course ID
            })) : [],
            // Only show "Select Course" if no course is pre-selected
            placeholder: formData.courses_id ? undefined : "Select Course",
            disabled: !formData.school_id // Disable course selection if no school is selected
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
            id: "type",
            label: "Application Status",
            value: formData.type,  // Prefill the dropdown with the current status from formData
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
            <AdminFormComponent
                formTitle="Applicant Information"
                formCourses={formCourses}
                formDates={formDates}
                formDrop={formDrop}
                formTextarea={formTextarea}
                formStatus={formStatus}
                onSubmit={handleSubmit}
                error={error}
                buttons={buttons}
            />
        </Container>
    );
};

export default AdminEditApplicantContent;
