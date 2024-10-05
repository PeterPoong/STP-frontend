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

const AdminEditCourseContent = () => {
    const [courseIntakeList, setCourseIntakeList] = useState([]);
    const [courseFeaturedList, setCourseFeaturedList] = useState([]);
    const [categoryList, setCategoryList] = useState([]); 
    const [qualificationList, setQualificationList] = useState([]); 
    const [modeList, setModeList] = useState([]); 
    const [schoolList, setSchoolList] = useState([]); 
    const courseId = sessionStorage.getItem('courseId');
    const [logo, setLogo] = useState(null); 
    const [newLogo, setNewLogo] = useState(null);
    const [loading, setLoading] = useState(false); 
    const [formData, setFormData] = useState({
        
        name: "",
        description:"",
        requirement:"",
        cost:"",
        period:"",
        category:"",
        qualification:"",
        mode:"",
        schoolID:"",
        logo: null
    });
    const [selectedIntakes, setSelectedIntakes] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const { name, schoolID, description, requirement, cost, period, category, qualification, mode } = formData;
        
        const formPayload = new FormData();
        formPayload.append("id", courseId)
        formPayload.append("name", name);
        formPayload.append("schoolID", schoolID);
        formPayload.append("description", description);
        formPayload.append("requirement", requirement);
        formPayload.append("cost", cost);
        formPayload.append("period", period);
        formPayload.append("category", category);
        formPayload.append("qualification", qualification);
        formPayload.append("mode", mode);
        
        // Append each selected intake value as "intake[]"
        selectedIntakes.forEach(intake => {
            formPayload.append("intake[]", intake);
        });

          // Log the selectedCourses array to check courseFeatured[]
    console.log('Selected Courses (courseFeatured[]):', selectedCourses);
        selectedCourses.forEach(course => {
            formPayload.append("courseFeatured[]", course);
        });
    
        setLoading(true);  // Set loading state to true
    
        try {
            const addCourseResponse = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/editCourse`, {
                method: 'POST',
                headers: {
                    'Authorization': Authenticate,  // No need for 'Content-Type' because FormData is used
                },
                body: formPayload,
            });
    
            const addCourseData = await addCourseResponse.json();
    
            if (addCourseResponse.ok) {
                console.log('Course successfully registered:', addCourseData);
                navigate('/adminCourses');
            } else {
                console.error('Validation Error:', addCourseData.errors);
                throw new Error(`Course Registration failed: ${addCourseData.message}`);
            }
        } catch (error) {
            setError('An error occurred during course registration. Please try again later.');
            console.error('Error during course registration:', error);
        } finally {
            setLoading(false);  // Ensure loading state is set to false after completion
        }
    };
     
    useEffect(() => {
        if (!courseId) {
            console.error("Course ID is not available in sessionStorage");
            return;
        }
    
        const fetchCourseDetails = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/courseDetail`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authenticate,
                    },
                    body: JSON.stringify({ id: courseId }) // Pass courseId
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const data = await response.json();
                const courseDetails = data.data; // Use courseDetails directly
    
                if (courseDetails) {
                    setFormData({
                        name: courseDetails.course,
                        schoolID: courseDetails.schoolID,
                        description: courseDetails.description,
                        requirement: courseDetails.requirement,
                        cost: courseDetails.cost,
                        period: courseDetails.period,
                        category: courseDetails.category,
                        qualification: courseDetails.qualification,
                        mode: courseDetails.mode
                    });
                    setLogo(courseDetails.logo ? `${import.meta.env.VITE_BASE_URL}storage/${courseDetails.logo}` : null);
                    // Set selected intake and course feature IDs
                    setSelectedIntakes(courseDetails.intake || []);  // Check for null/undefined
                    setSelectedCourses(courseDetails.courseFeatured || []);  // Check for null/undefined
                    
                } else {
                    console.error("Course not found with ID:", courseId);
                }
            } catch (error) {
                console.error('Error fetching course details:', error.message);
                setError(error.message);
            }
        };
    
    
        const fetchIntake = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/intakeList`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authenticate,
                    },
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const data = await response.json();
    
                if (data && data.data) {
                    setCourseIntakeList(data.data);
                } else {
                    setCourseIntakeList([]);
                }
            } catch (error) {
                console.error('Error fetching course intake list:', error.message);
                setError(error.message);
            }
        };
    
        fetchCourseDetails();
        fetchIntake();
    }, [courseId, Authenticate]);
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/courseFeaturedList`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authenticate,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data && data.data) {
                    setCourseFeaturedList(data.data);
                } else {
                    setCourseFeaturedList([]);
                }
            } catch (error) {
                console.error('Error fetching course featured list:', error.message);
                setError(error.message);
            }
        };

        fetchCourse();
    }, [Authenticate]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/categoryFilterList`, {
                    method: 'GET', // Use GET method
                    headers: {
                        'Content-Type': 'application/json',
                        // Remove Authorization header if not needed
                    },
                    // Remove body for GET request
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const data = await response.json();
                if (data && data.data) {
                    setCategoryList(data.data);  // Set the category list state
                }
            } catch (error) {
                console.error('Error fetching categories:', error.message);
                setError(error.message);
            }
        };
    
        fetchCategories();
    }, []);
    
    useEffect(() => {
        const fetchQualifications = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/qualificationFilterList`, {
                    method: 'GET', // Use GET method
                    headers: {
                        'Content-Type': 'application/json',
                        // Remove Authorization header if not needed
                    },
                    // Remove body for GET request
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const data = await response.json();
                if (data && data.data) {
                    setQualificationList(data.data);  // Set the qualification list state
                }
            } catch (error) {
                console.error('Error fetching qualifications:', error.message);
                setError(error.message);
            }
        };
    
        fetchQualifications();
    }, []);

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/schoolListAdmin`, {
                    method: 'GET',  // It's correctly set as GET
                    headers: {
                        'Authorization': Authenticate,  // Ensure Authenticate contains the correct token
                    },
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const data = await response.json();
                
                // Since the API directly returns the school list, update this line:
                if (data) {
                    setSchoolList(data);  // Directly set the data as the school list
                }
            } catch (error) {
                console.error('Error fetching schools:', error.message);
                setError(error.message);
            }
        };
    
        fetchSchools();
    }, [Authenticate]);
    
    

    useEffect(() => {
        const fetchModes = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/studyModeFilterlist`, {
                    method: 'GET', // Use GET method
                    headers: {
                        'Content-Type': 'application/json',
                        // Remove Authorization header if not needed
                    },
                    // Remove body for GET request
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const data = await response.json();
                if (data && data.data) {
                    setModeList(data.data);  // Set the qualification list state
                }
            } catch (error) {
                console.error('Error fetching modes:', error.message);
                setError(error.message);
            }
        };
    
        fetchModes();
    }, []);
    
    const handleIntakeChange = (event) => {
        const intakeId = parseInt(event.target.value);
        setSelectedIntakes(prevIntakes => {
            if (prevIntakes.includes(intakeId)) {
                return prevIntakes.filter(id => id !== intakeId);  // Deselect intake
            } else {
                return [...prevIntakes, intakeId];  // Add intake to the list
            }
        });
    };
    const handleCourseChange = (event) => {
        const courseId = parseInt(event.target.value);
        setSelectedCourses(prevCourses => {
            if (prevCourses.includes(courseId)) {
                return prevCourses.filter(id => id !== courseId);  // Deselect intake
            } else {
                return [...prevCourses, courseId];  // Add intake to the list
            }
        });
    };
    
    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({
            ...prev,
            logo: file
        }));
    };

    const handleFieldChange = (e) => {
        const { id, value, type, files } = e.target;
        console.log(`Field ${id} updated with value: ${value}`); // Debugging line
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
  
    const formFields = [
        {
            id: "name",
            label: "Course Name",
            type: "text",
            placeholder: "Enter course name",
            value: formData.name,
            onChange: handleFieldChange,
            required: true
        },
    
 
    ];

    
    const formPersonInCharge=[
        {
            id: "period",
            label: "Study Period",
            type: "text",
            placeholder: "Enter course period",
            value: formData.period,
            onChange: handleFieldChange,
            required: true,
        },
        {
            id: "cost",
            label: "Course Fee",
            type: "text",
            placeholder: "Enter the cost",
            value: formData.cost,
            onChange: handleFieldChange,
            required: true,
        },
    ];

    const formCategory = [
        {
            id: "category",
            label: "Course Category",
            value: formData.category,
            onChange: handleFieldChange,
            required: true,
            options: categoryList.map(category => ({
                label: category.category_name,
                value: category.id
            }))
        }
    ];

    const formAccount = [
        {
            id: "qualification",
            label: "Course Qualification",
            value: formData.qualification,
            onChange: handleFieldChange,
            required: true,
            options: qualificationList.map(account => ({
                label: account.qualification_name,
                value: account.id
            }))
        }
    ];
    const formMode = [
        {
            id: "mode",
            label: "Study Mode",
            value: formData.mode,
            onChange: handleFieldChange,
            required: true,
            options: modeList.map(mode => ({
                label: mode.studyMode_name,
                value: mode.id
            }))
        }
    ];
    const formTextarea = [
        {
            id: "requirement",
            label: "Course Requirements",
            as: "textarea",
            placeholder: "Enter course requirement",
            value: formData.requirement,
            onChange: handleFieldChange,
            required: true,
        },
    ];

    const formDrop = [
        {
            id: "schoolID",
            label: "School Name",
            value: formData.schoolID,
            onChange: handleFieldChange,
            required: true,
            options: schoolList.map(drop => ({
                label: drop.name,
                value: drop.id
            }))
        }
    ];
    
    const formHTML = [
        {
            id: "description",
            label: "Course Description",
            value: formData.description,
            onChange: handleEditorChange,
            required: true
        }
    ];

// Checkbox data generation
const formCheckboxes = courseIntakeList.map((intake) => ({
    id: `intake-${intake.id}`,
    label: intake.name,
    value: intake.id,
    checked: selectedIntakes.includes(intake.id),
    onChange: handleIntakeChange,
}));

const formCourse = courseFeaturedList.map((course) => ({
    id: `course-${course.id}`,
    label: course.name,
    value: course.id,
    checked: selectedCourses.includes(course.id),
    onChange: handleCourseChange,
}));


    const buttons = [
        {
            label: "SAVE",
            type: "submit"
        }
    ];

    return (
        
                <Container fluid className="admin-add-school-container">
                    <AdminFormComponent
           formTitle="Course Details"
           checkboxTitle="Intake"
           courseTitle="Course Featured"
            helperStar="*"
           formFields={formFields}
           formPersonInCharge={formPersonInCharge}
           formTextarea={formTextarea}
           formHTML={formHTML}
           formCategory={formCategory}
           formAccount={formAccount}
           formDrop={formDrop}
           formMode={formMode}
           onSubmit={handleSubmit}
           formCheckboxes={formCheckboxes}
           formCourse={formCourse}
           error={error}
           buttons={buttons}
           logo={logo}
            handleLogoChange={handleLogoChange}
            newLogo={newLogo}
            loading={loading}
                />
                </Container>
    );
};

export default AdminEditCourseContent;
