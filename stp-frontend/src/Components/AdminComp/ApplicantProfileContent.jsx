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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FileText, Search, Eye, ChevronDown, ChevronUp, Clock, Copy, Check, X, Download } from 'react-feather';
import {
    faFileAlt,
    faGraduationCap,
    faBookOpen,
    faUniversity,
    faBookReader,
    faPaperclip,
    faStar,
    faBook,
  } from "@fortawesome/free-solid-svg-icons";
import "../../css/StudentPortalStyles/StudentApplyCourse.css"
import "../../css/SchoolPortalStyle/ApplicantViewSummary.css"
const ApplicantProfileContent = () => {
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
    const [copiedFields, setCopiedFields] = useState({
        name: false,
        icNumber: false,
        contactNumber: false,
        email: false,
        address: false
      });
    const [error, setError] = useState(null);
    const token = sessionStorage.getItem('token');
    const applicantId = sessionStorage.getItem('applicantId');
    const Authenticate = `Bearer ${token}`;
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('studentInfo'); // State to manage active tab

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
                    ic:applicantDetails.ic,
                    address:applicantDetails.address,
                    country_code: applicantDetails.country_code,
                    contact_number: applicantDetails.contact_number,
                    created_at: applicantDetails.applied ? format(parseISO(applicantDetails.applied), 'yyyy-MM-dd') : "", 
                    status:applicantDetails.status,
                    name:applicantDetails.name,
                    email:applicantDetails.email,
                    country_code:applicantDetails.country_code,
                    contact_number:applicantDetails.contact_number,
                    spm:applicantDetails.spm,
                    spm_trial:applicantDetails.spm_trial,
                    alevel:applicantDetails.alevel,
                    olevel:applicantDetails.olevel,
                    foundation:applicantDetails.foundation,
                    diploma:applicantDetails.diploma,
                    cgpaFoundation:applicantDetails.cgpaFoundation,
                    cgpaDiploma:applicantDetails.cgpaDiploma,
                    cgpaStpm:applicantDetails.cgpaStpm,
                    cgpaOlevel:applicantDetails.cgpaOlevel,
                    cgpaAlevel:applicantDetails.cgpaAlevel,
                    media_spm:applicantDetails.media_spm,
                    media_spm_trial:applicantDetails.media_spm_trial,
                    media_stpm:applicantDetails.media_stpm,
                    media_diploma:applicantDetails.media_diploma,
                    media_alevel:applicantDetails.media_alevel,
                    media_olevel:applicantDetails.media_olevel,
                    media_foundation:applicantDetails.media_foundation
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
    
    const copyToClipboard = (text, field) => {
        if (text) {
          navigator.clipboard.writeText(text).then(() => {
            setCopiedFields(prev => ({ ...prev, [field]: true }));
            setTimeout(() => {
              setCopiedFields(prev => ({ ...prev, [field]: false }));
            }, 2000);
          }).catch(err => {
            console.error('Failed to copy: ', err);
          });
        } else {
          console.error('No text to copy');
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
    const renderAcademicResults = () => {
        return (
          <div className="academic-results m-3 shadow-lg rounded-5 pt-4 d-flex flex-column">
            <div className="px-4">
              <div className=" d-flex  sas-pointer-div px-0 ">
                <select
                  className="sac-form-select mb-1 px-0"
                  value={selectedCategory || ""}
                  onChange={handleCategoryChange}
                >
                  {transcriptCategories.map((category) => (
                    <option key={category.id || ""} value={category.id || ""}>
                      {category.transcript_category || ""}
                    </option>
                  ))}
    
                  <span>Subjects and Results</span>
    
                </select>
                <BsCaretDownFill size={30} className="sas-pointer align-self-start" />
              </div>
            </div>
    
            {(selectedCategory !== 32 && selectedCategory !== 85) && cgpaInfo && (
              <div className="px-4 mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 mt-2 d-flex align-items-center">
                    <strong>Program Name:</strong>
                    <p className=" mb-0"
                      style={{
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        wordBreak: 'break-all',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '175px',
                        marginLeft: '20px'
                      }} >
                      {cgpaInfo.program_name || 'N/A'}
                    </p>
                  </p>
                  <p className="mb-0"><strong>CGPA:</strong> {cgpaInfo.cgpa || 'N/A'}</p>
                </div>
              </div>
            )}
    
            <div className="results-grid flex-grow-1 px-4" style={{ maxHeight: '15rem', overflowY: 'auto' }}>
              {transcriptSubjects && transcriptSubjects.length > 0 ? (
                transcriptSubjects.map((subject, index) => (
                  <div key={index} className="d-flex justify-content-between py-3">
                    <p className="mb-0"
                      style={{
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        wordBreak: 'break-all',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '350px'
                      }}>
                      <strong>{subject.subject_name || subject.highTranscript_name || ""}</strong>
                    </p>
                    <p className="mb-0"><strong>{subject.subject_grade || subject.higherTranscript_grade || ""}</strong></p>
                  </div>
                ))
              ) : (
                <div className="d-flex justify-content-between py-3">
                  <p>No results available for this transcript.</p>
                </div>
              )}
            </div>
            <div className="grade-summary d-flex justify-content-between align-items-stretch border-top">
              <div className="overall-grade text-white w-75 d-flex justify-content-start py-3">
                <h3 className="align-self-center px-5">
                  Grade: {calculateOverallGrade(transcriptSubjects) || ""}
                </h3>
              </div>
              <Button
                variant="link"
                className="view-result-slip-button w-25"
                onClick={() => {
                  setActiveTab('documents');
                  setActiveDocumentTab('academic');
                }}
                disabled={accountType !== 65 ||
                  transcriptDocuments.length === 0}
                style={{
                  color: accountType !== 65 ? 'black' : '#B71A18'
                }}  >
                View Result Slip »
              </Button>
            </div>
          </div>
        );
      };
    
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
            
            {/* Tab Navigation */}
            <div className="tab-navigation">
                <button 
                    className={`tab-button ${activeTab === 'studentInfo' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('studentInfo')}
                >
                    Student Info
                </button>
                <button 
                    className={`tab-button ${activeTab === 'relatedDocuments' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('relatedDocuments')}
                >
                    Academic
                </button>
            </div>

            {/* Tab Content */}
            {loading ? (
                <SkeletonLoader />
            ) : (
                <div className="tab-content">
                    {activeTab === 'studentInfo' && (
                        <div>
                            {/* Render Student Info Content */}
                         
                            {/* Display basic info here */}
                            <div className="basic-info m-3 shadow-lg p-4 rounded-5">
                                <p className="text-secondary fw-bold border-bottom border-2 pb-3">Basic Information</p>
                                    <div className="info-grid">
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <p><strong>Student Name</strong></p>
                                                    <p className="d-flex align-items-center">
                                                        <span className="me-2">
                                                            {formData.name}
                                                        </span>
                                                         <span
                                                            className="copy-icon-wrapper"
                                                             onClick={() => copyToClipboard(`$ {formData.name}`)}
                                                             title={copiedFields.name ? "Copied!" : "Copy to clipboard"}
                                                        >
                                                            {copiedFields.name
                                                                ? <Check size={16} className="copied-icon" />
                                                                : <Copy size={16} className="copy-icon" />
                                                            }
                                                        </span>
                                                    </p>
                                                    <p><strong>Contact Number</strong></p>
                                                    <p className="d-flex align-items-center">
                                                        <span className="me-2">
                                                            {formData.country_code}{formData.contact_number}
                                                        </span>
                                                         <span
                                                            className="copy-icon-wrapper"
                                                             onClick={() => copyToClipboard(`${formData?.country_code || ''} ${formData?.contact_number || ''}`, 'contactNumber')}
                                                             title={copiedFields.name ? "Copied!" : "Copy to clipboard"}
                                                        >
                                                            {copiedFields.contactNumber
                                                                ? <Check size={16} className="copied-icon" />
                                                                : <Copy size={16} className="copy-icon" />
                                                            }
                                                        </span>
                                                    </p>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <p><strong>Identity Card Number</strong></p>
                                                    <p className="d-flex align-items-center">
                                                        <span className="me-2"> {formData.ic}</span>
                                                            <span
                                                                className="copy-icon-wrapper"
                                                                onClick={() => copyToClipboard(formData?.ic, 'ic')}
                                                                title={copiedFields.ic ? "Copied!" : "Copy to clipboard"}
                                                                >
                                                                {copiedFields.icNumber
                                                                    ? <Check size={16} className="copied-icon" />
                                                                    : <Copy size={16} className="copy-icon" />
                                                                }
                                                            </span>
                                                    </p>
                                                    <p><strong>Email Address</strong></p>
                                                    <p className="d-flex align-items-center">
                                                        <span className="me-2"> {formData.email}</span>
                                                            <span
                                                                className="copy-icon-wrapper"
                                                                onClick={() => copyToClipboard(formData?.email, 'email')}
                                                                title={copiedFields.email ? "Copied!" : "Copy to clipboard"}
                                                                >
                                                                {copiedFields.email
                                                                    ? <Check size={16} className="copied-icon" />
                                                                    : <Copy size={16} className="copy-icon" />
                                                                }
                                                            </span>
                                                    </p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                            <p><strong>Address</strong></p>
                                            <p className="d-flex align-items-center">
                                                <span className="me-2">{formData?.address || ""}</span>
                                                <span
                                                className="copy-icon-wrapper"
                                                onClick={() => copyToClipboard(formData?.address || '', 'address')}
                                                title={copiedFields.address ? "Copied!" : "Copy to clipboard"}
                                                >
                                                {copiedFields.address
                                                    ? <Check size={16} className="copied-icon" />
                                                    : <Copy size={16} className="copy-icon" />
                                                }
                                                </span>
                                            </p>
                                            </div>
                                        </div> 
                                    </div>
                                    
                            </div>
                            
                            {/* Add more fields as necessary */}
                        </div>
                    )}
                    {activeTab === 'relatedDocuments' && (
                           <div className="container mt-4">
                           <h2 className="mb-4 text-danger">
                             <FontAwesomeIcon icon={faFileAlt} style={{ color: "#800000" }} /> Results
                           </h2>
                           <div className="list-group">
                             {[
                               { key: "spm", title: "SPM Results", icon: faGraduationCap },
                               { key: "spm_trial", title: "SPM Trial Results", icon: faBookOpen },
                               { key: "alevel", title: "A-Level Results", icon: faUniversity },
                               { key: "olevel", title: "O-Level Results", icon: faBookReader },
                               { key: "foundation", title: "Foundation Results", icon: faUniversity },
                               { key: "diploma", title: "Diploma Results", icon: faUniversity },
                             ].map(({ key, title, icon }) => (
                               formData[key] &&
                               formData[key].length > 0 && (
                                 <div className="list-group-item" key={key}>
                                   <h4 style={{ color: "#800000" }}>
                                     <FontAwesomeIcon icon={icon} style={{ color: "#800000" }} /> {title}
                                   </h4>
                     
                                   {/* CGPA Display */}
                                   {formData[`cgpa${key.charAt(0).toUpperCase() + key.slice(1)}`] &&
                                     formData[
                                       `cgpa${key.charAt(0).toUpperCase() + key.slice(1)}`
                                     ].map((subject, index) => (
                                       <p key={index}>
                                         <FontAwesomeIcon icon={faStar} style={{ color: "#ffd700" }} /> CGPA: {subject.cgpa}
                                       </p>
                                     ))}
                     
                                   {/* Subjects in a Table */}
                                   <div className="table-responsive">
                                     <table className="table table-bordered">
                                       <thead className="table-light">
                                         <tr>
                                           <th>Subject</th>
                                           <th>Grade</th>
                                         </tr>
                                       </thead>
                                       <tbody>
                                         {formData[key].map((subject) => (
                                           <tr key={subject.id}>
                                             <td>{subject.subject_name || subject.highTranscript_name}</td>
                                             <td>{subject.transcript_grade || subject.higherTranscript_grade}</td>
                                           </tr>
                                         ))}
                                       </tbody>
                                     </table>
                                   </div>
                     
                                   {/* Attachments */}
                                   {formData[`media_${key}`] &&
                                     formData[`media_${key}`].map((subject, index) => (
                                       <a
                                         key={index}
                                         className="btn btn-outline-primary btn-sm mt-2 me-2"
                                         href={`${import.meta.env.VITE_BASE_URL}storage/${subject.studentMedia_location}`}
                                         target="_blank"
                                         rel="noopener noreferrer"
                                       >
                                         <FontAwesomeIcon icon={faPaperclip} style={{ color: "#800000" }} /> View Result Attachment
                                       </a>
                                     ))}
                                 </div>
                               )
                             ))}
                           </div>
                         </div>
                    )}
                </div>
            )}
        </Container>
    );
};

export default ApplicantProfileContent;
