import React, { useState, useEffect } from "react";
import { Container, Col, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminFormComponent from './AdminFormComponent';
import 'typeface-ubuntu';
import SkeletonLoader from './SkeletonLoader';
import "../../css/AdminStyles/AdminFormStyle.css";
import 'react-phone-input-2/lib/style.css';
import ErrorModal from "./Error";

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
    const [loading, setLoading] = useState(true); 
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
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [generalError, setGeneralError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`
    const fieldLabels = {
        name:"Course Name",
        schoolID:"School Name",
        description:"Course Description",
        requirement:"Course Requirements",
        cost:"Course Fee",
        period:"Study Period",
        category:"Course Category",
        qualification:"Course Qualification",
        mode:"Study Mode",
        logo:"Logo",
        intake:"Intake",
        course:"Course Featured"
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const { name, schoolID, description, requirement, cost, period, category, qualification, mode } = formData;
        if (!name || !schoolID  || !category || !qualification) {
            setError("Please fill in all required fields.");
            setErrorModalVisible(true);
            return; // Stop form submission if any required field is missing
        }
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
        // Only append the new logo if one is selected
        if (formData.logo instanceof File) {
            formPayload.append("logo", formData.logo); // New logo file
        }
          // Log the selectedCourses array to check courseFeatured[]
    // console.log('Selected Courses (courseFeatured[]):', selectedCourses);
        selectedCourses.forEach(course => {
            formPayload.append("courseFeatured[]", course);
        });
    

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
            } else if (addCourseResponse.status === 422) {
                // Validation errors
                console.log('Validation Errors:', addCourseData.errors);
                setFieldErrors(addCourseData.errors); // Pass validation errors to the modal
                setGeneralError(addCourseData.message || "Validation Error");
                setErrorModalVisible(true); // Show the error modal
            } else {
                setGeneralError(addCourseData.message || "Failed to edit the course.");
                setErrorModalVisible(true);
            }
        } catch (error) {
            setGeneralError(error.message || "An error occurred while editing the course. Please try again later.");
            setErrorModalVisible(true);
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
            } finally {
                setLoading(false);
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
            }finally {
                setLoading(false);
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
            }finally {
                setLoading(false);
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
            }finally {
                setLoading(false);
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
            }finally {
                setLoading(false);
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
            }finally {
                setLoading(false);
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
            }finally {
                setLoading(false);
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
        if (file) {
        // Set the new logo file in form data
        setFormData(prev => ({
            ...prev,
            logo: file
        }));
        
        const reader = new FileReader();
        reader.onloadend = () => {
            setNewLogo(reader.result); // This is just for preview purposes
        };
        reader.readAsDataURL(file); // Read the file as a data URL for the preview
    }
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
        },
        {
            id: "cost",
            label: "Course Fee",
            type: "text",
            placeholder: "Enter the cost",
            value: formData.cost,
            onChange: handleFieldChange,
        },
    ];

    const formCategory = [
        {
            id: "category",
            label: "Course Category",
            value: formData.category,
            onChange: handleFieldChange,
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
        },
    ];

    const formDrop = [
        {
            id: "schoolID",
            label: "School Name",
            value: formData.schoolID,
            onChange: handleFieldChange,
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

// const formCourse = courseFeaturedList.map((course) => ({
//     id: `course-${course.id}`,
//     label: course.name,
//     value: course.id,
//     checked: selectedCourses.includes(course.id),
//     onChange: handleCourseChange,
// }));


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
           formTitle="Course Details"
           checkboxTitle="Intake"
           courseTitle="Course Featured"
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
        //    formCourse={formCourse}
           error={error}
           buttons={buttons}
           logo={logo}
           handleLogoChange={handleLogoChange}
           newLogo={newLogo}
            loading={loading}
   
                />
            )}
        </Container>
    );
};

export default AdminEditCourseContent;
