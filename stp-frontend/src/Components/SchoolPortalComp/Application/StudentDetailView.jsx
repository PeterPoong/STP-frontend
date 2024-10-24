import React, { useState, useEffect, useCallback } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FileText, Search, Eye, ChevronDown, ChevronUp, Clock, Copy, Check, X, Download } from 'react-feather';
import { GraduationCap, CalendarCheck, BookOpenText } from 'lucide-react';
import "../../../css/StudentPortalStyles/StudentApplyCourse.css";
import "../../../css/SchoolPortalStyle/ApplicantViewSummary.css";
import SpcFooter from "../../../Components/StudentPortalComp/SpcFooter";
import { useParams, useNavigate } from 'react-router-dom';
import WidgetFileUpload from "../../../Components/StudentPortalComp/WidgetFileUpload";
import WidgetAchievement from "../../../Components/StudentPortalComp/Widget/WidgetAchievement";
import WidgetFileUploadAcademicTranscript from "../../../Components/StudentPortalComp/WidgetFileUploadAcademicTranscript";
import { BsWhatsapp, BsCaretDownFill } from 'react-icons/bs';
import Lock from "../../../assets/StudentPortalAssets/lock.svg";
import { Arrow90degLeft, ChevronLeft } from "react-bootstrap-icons"
import defaultProfilePic from "../../../assets/StudentPortalAssets/sampleprofile.png";
const StudentDetailView = ({ student, viewAction, acceptRejectAction, onBack, onActionSuccess,onActionUpgrade }) => {
  const [accountType, setAccountType] = useState(null);
  const [copiedFields, setCopiedFields] = useState({
    name: false,
    icNumber: false,
    contactNumber: false,
    email: false,
    address: false
  });
  const [activeTab, setActiveTab] = useState('info');
  const [basicInfo, setBasicInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transcriptCategories, setTranscriptCategories] = useState([]);
  const [transcriptSubjects, setTranscriptSubjects] = useState([]);
  const [selectedExam, setSelectedExam] = useState('');
  const [cgpaInfo, setCgpaInfo] = useState(null);
  const [coCurriculum, setCoCurriculum] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [relatedDocuments, setRelatedDocuments] = useState([]);
  const [documentSearchTerm, setDocumentSearchTerm] = useState('');
  const [documentCategoryFilter, setDocumentCategoryFilter] = useState('');
  const [documentCategories, setDocumentCategories] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [academicResults, setAcademicResults] = useState([]);
  // Add these state variables at the beginning of your StudentDetailView component
  // Document Tabs State
  const [activeDocumentTab, setActiveDocumentTab] = useState('achievements'); // Default to 'achievements'
  const [achievementDocs, setAchievementDocs] = useState([]); // Renamed from 'achievements'
  const [otherDocuments, setOtherDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal States for Viewing Documents
  const [isViewAchievementOpen, setIsViewAchievementOpen] = useState(false);
  const [isViewOtherDocOpen, setIsViewOtherDocOpen] = useState(false);
  const [currentViewDocument, setCurrentViewDocument] = useState(null);


  // Add this state variable to manage pagination for different sections
  const [paginationInfo, setPaginationInfo] = useState({
    achievementDocs: {
      currentPage: 1,
      lastPage: 1,
      total: 0,
    },
    otherDocuments: {
      currentPage: 1,
      lastPage: 1,
      total: 0,
    },
  });
  const [applicantDetails, setApplicantDetails] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [transcriptDocuments, setTranscriptDocuments] = useState([]);
  const [isViewAcademicTranscriptOpen, setIsViewAcademicTranscriptOpen] = useState(false);
  const navigate = useNavigate();
  const studentId = student?.student_id;
  const applicantId = student?.id;
  const [currentAction, setCurrentAction] = useState(acceptRejectAction || null);
  const [warningType, setWarningType] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    if (!token) {
      navigate("/schoolPortalLogin");
    }
  }, [navigate]);


  // Retrieve account_type from sessionStorage or localStorage
  useEffect(() => {
    const storedAccountType = sessionStorage.getItem("account_type") || localStorage.getItem("account_type");
    setAccountType(parseInt(storedAccountType, 10));
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const applicantData = await fetchApplicantDetails();
        if (applicantData) {
          await fetchBasicInfo();
          await fetchTranscriptCategories();
          if (accountType === 65) { // Only fetch for Premium Plan
            await fetchCoCurriculum();
            await fetchAchievements();
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [studentId, applicantId, accountType]);

  useEffect(() => {
    if (activeTab === 'documents') {

      fetchAchievementDocs();
      fetchOtherDocuments();
      fetchTranscriptDocuments();
      // No API call for Academic Transcript
    }
  }, [activeTab, searchTerm]); // Also listen to searchTerm for dynamic search

  useEffect(() => {
    if (activeTab === 'info') {
      fetchTranscriptCategories();
    }
  }, [activeTab]);

  useEffect(() => {
    if (selectedCategory) {
      fetchTranscriptSubjects();
      fetchTranscriptDocuments();
      fetchCgpaInfo();
    }
  }, [selectedCategory]);


  useEffect(() => {
    if (applicantDetails) {
      if (applicantDetails.form_status === 2) { // Pending
        setCurrentAction(acceptRejectAction || null); // Use the acceptRejectAction prop
      } else if (applicantDetails.form_status === 4) {
        setCurrentAction('accept');
      } else if (applicantDetails.form_status === 3) {
        setCurrentAction('reject');
      }
    }
  }, [applicantDetails, acceptRejectAction]);



  const getPositionStyle = (position) => {
    const colors = {
      president: '#50B5FE',
      secretary: '#8979FF',
      treasurer: '#537FF1',
      ajk: '#ffc107'
    };

    const lowercasePosition = position.toLowerCase();

    if (colors[lowercasePosition]) {
      return { backgroundColor: colors[lowercasePosition], color: 'white' };
    } else {
      // Randomly select one of the four colors for other positions
      const colorKeys = Object.keys(colors);
      const randomColor = colors[colorKeys[Math.floor(Math.random() * colorKeys.length)]];
      return { backgroundColor: randomColor, color: 'white' };
    }
  };


  const handleUpgradePage = () => {
    onActionUpgrade(); // Invoke the prop to trigger ManageAccount rendering
  };

  const handleWhatsAppClick = useCallback(() => {
    if (basicInfo?.student_contactNo && basicInfo?.student_countryCode) {
      // Remove any non-digit characters from the phone number and country code
      const cleanCountryCode = basicInfo.student_countryCode.replace(/\D/g, '');
      const cleanPhoneNumber = basicInfo.student_contactNo.replace(/\D/g, '');

      // Construct the WhatsApp URL
      const whatsappUrl = `https://wa.me/${cleanCountryCode}${cleanPhoneNumber}`;

      // Open the URL in a new tab
      window.open(whatsappUrl, '_blank');
    } else {
      // Alert the user if the phone number is not available
      alert("WhatsApp contact information is not available for this student.");
    }
  }, [basicInfo]);


  const fetchTranscriptCategories = async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      //  console.log('Fetching transcript categories...');
      //  console.log('Token:', token); // Log the token (be careful with this in production)

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/school/schoolTranscriptCategoryList`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to fetch transcript categories. Status: ${response.status}`);
      }

      const result = await response.json();
      // console.log('Transcript categories result:', result);

      if (result.success) {
        setTranscriptCategories(result.data.data);
        if (result.data.data.length > 0) {
          setSelectedCategory(result.data.data[0].id);
        }
      } else {
        throw new Error(result.message || 'Failed to fetch transcript categories');
      }
    } catch (error) {
      console.error('Error fetching transcript categories:', error);
      setError(`Error fetching transcript categories: ${error.message}`);
      // You might want to set some default state here
      setTranscriptCategories([]);
      setSelectedCategory(null);
    }
  };
  const fetchTranscriptSubjects = async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const isSPM = selectedCategory === 32; // Assuming 32 is the ID for SPM
      const endpoint = isSPM ? 'schoolStudentTranscriptSubjectList' : 'schoolHigherTranscriptSubjectList';
      const body = isSPM ? { studentId } : { studentId, categoryId: selectedCategory };

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/school/${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transcript subjects');
      }

      const result = await response.json();
      if (result.success) {
        setTranscriptSubjects(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch transcript subjects');
      }
    } catch (error) {
      console.error('Error fetching transcript subjects:', error);
      setError(error.message);
    }
  };

  const fetchTranscriptDocuments = async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/school/schoolTranscriptDocumentList`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId, categoryId: selectedCategory }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transcript documents');
      }

      const result = await response.json();
      if (result.success) {
        setTranscriptDocuments(result.data.data);
      } else {
        throw new Error(result.message || 'Failed to fetch transcript documents');
      }
    } catch (error) {
      console.error('Error fetching transcript documents:', error);
      setError(error.message);
    }
  };

  const fetchCgpaInfo = async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/school/schoolTranscriptCgpa`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId, transcriptCategory: selectedCategory }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch CGPA information');
      }

      const result = await response.json();
      if (result.success) {
        setCgpaInfo(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch CGPA information');
      }
    } catch (error) {
      console.error('Error fetching CGPA information:', error);
      setError(error.message);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(parseInt(e.target.value));
  };
  const fetchBasicInfo = async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/school/studentDetail`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ studentId: studentId })
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch student details. Status: ${response.status}`);
      }

      const responseData = await response.json();
      if (responseData.success && responseData.data) {
        setBasicInfo(responseData.data);
      } else {
        throw new Error('No data received from the server.');
      }
    } catch (err) {
      console.error('Error in fetchBasicInfo:', err.message);
      setError(err.message || 'Error fetching student details. Please try again.');
    }
  };

  const fetchApplicantDetails = async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/school/applicantDetail`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ applicantId: applicantId })
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch applicant details. Status: ${response.status}`);
      }

      const data = await response.json();
      setApplicantDetails(data);
      return data; // Return the data for chaining
    } catch (error) {
      console.error('Error fetching applicant details:', error);
      setError(error.message);
      return null;
    }
  };


  // *** Updated fetchCoCurriculum Function ***
  const fetchCoCurriculum = async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');

      // Updated API endpoint and payload
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/school/schoolApplicantCocurriculum`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId: studentId }), // Changed from student_id to studentId
      });

      if (!response.ok) {
        throw new Error('Failed to fetch co-curriculum activities');
      }

      const result = await response.json();
      //('Co-curriculum API response:', result);

      // Adjusted response handling based on the new API response structure
      if (result.success && Array.isArray(result.data) && result.data.length > 0) {
        setCoCurriculum(result.data); // Directly set the data array
      } else {
        setCoCurriculum([]);
      }
    } catch (error) {
      console.error('Error fetching co-curriculum activities:', error);
      setError(error.message);
      setCoCurriculum([]);
    }
  };
  const fetchAchievements = async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/school/schoolAchievementsList`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: studentId, // Changed from "student_id" to "studentId"
          paginate: "false",     // Added "paginate": "false"
          // "search": "testing" // Removed as it's not needed when paginate is false
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch achievements. Status: ${response.status}`);
      }

      const result = await response.json();
      // console.log('Achievements API response:', result);

      // Adjusted response handling based on the new API response structure
      if (result.success && Array.isArray(result.data) && result.data.length > 0) {
        setAchievements(result.data); // Directly set the data array
      } else {
        setAchievements([]);
      }
    } catch (error) {
      console.error('Error fetching achievements:', error);
      setError(error.message);
      setAchievements([]);
    }
  };


  // If there's no dependency on Academic Transcript, you might not need this function.
  // If it's related to another part of your application, ensure it's handled accordingly.
  const handleExamChange = async (e) => {
    const newExamId = e.target.value;
    setSelectedExam(newExamId);
    // Implement if needed or remove if not applicable
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


  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleAcceptReject = (type) => {
    setActionType(type);
    setShowConfirmModal(true);
  };

  const handleConfirmAction = async () => {
    setSubmitLoading(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');

      // Determine the correct application ID
      const applicationId = basicInfo.id || basicInfo.submitted_form_id || basicInfo.application_id;
      if (!applicationId) {
        throw new Error('Application ID is missing.');
      }

      const requestBody = {
        id: applicantDetails.id, // Ensure this is the correct application ID
        type: actionType,
        feedback: feedback,
      };

      //console.log('Request body:', requestBody);

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/school/editApplicantStatus`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json(); // Parse JSON first
      //  console.log('API Response:', result);

      if (!response.ok) {
        if (response.status === 422) {
          // Handle validation errors
          const validationErrors = result.Errors || {};
          const errorMessages = Object.values(validationErrors).flat().join(' ');
          console.error('Validation Errors:', validationErrors);
          throw new Error(errorMessages || 'Validation failed');
        } else if (response.status === 404) {
          // Handle not found errors
          throw new Error(result.message || 'Applicant not found.');
        } else {
          // Handle other types of errors
          throw new Error(result.message || 'Failed to update application status');
        }
      }

      if (result.success) {
        setSubmitSuccess(true);

        setApplicantDetails(prevDetails => ({
          ...prevDetails,
          form_status: actionType === 'Accepted' ? 4 : 3,
          form_feedback: feedback
        }));
        setCurrentAction(actionType === 'Accepted' ? 'accept' : 'reject');
        // Invoke the callback to navigate back and refresh the list
        if (onActionSuccess) {
          onActionSuccess();
        }
      } else {
        throw new Error(result.message || 'Failed to update application status');
      }
    } catch (error) {
      console.error('Error updating application status:', error);
      setSubmitError(error.message);
    } finally {
      setSubmitLoading(false);
      setShowConfirmModal(false);
    }
  };


  const handleBackPage = () => {
    onActionSuccess();
  };

  // Fetch Achievement Documents
  const fetchAchievementDocs = async (page = 1) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/school/schoolAchievementsList`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: studentId,
          paginate: "true", // Enable pagination
          page: page,       // Specify the page number
          search: searchTerm,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch achievements. Status: ${response.status}`);
      }

      const result = await response.json();
      // console.log('Achievements API response:', result);

      if (result.success && Array.isArray(result.data.data)) {
        setAchievementDocs(result.data.data);
        setPaginationInfo(prevInfo => ({
          ...prevInfo,
          achievementDocs: {
            currentPage: result.data.current_page,
            lastPage: result.data.last_page,
            total: result.data.total,
          },
        }));
      } else {
        setAchievementDocs([]);
        setPaginationInfo(prevInfo => ({
          ...prevInfo,
          achievementDocs: {
            currentPage: 1,
            lastPage: 1,
            total: 0,
          },
        }));
      }
    } catch (error) {
      console.error('Error fetching achievement documents:', error);
      setError(error.message);
      setAchievementDocs([]);
      setPaginationInfo(prevInfo => ({
        ...prevInfo,
        achievementDocs: {
          currentPage: 1,
          lastPage: 1,
          total: 0,
        },
      }));
    }
  };


  // Fetch Other Certificates/Documents
  const fetchOtherDocuments = async (page = 1) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/school/schoolOtherFileCertList`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: studentId,
          paginate: "true", // Enable pagination
          page: page,       // Specify the page number
          search: "",       // Include search if needed
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch other documents. Status: ${response.status}`);
      }

      const result = await response.json();
      // console.log('Other Documents API response:', result);

      if (result.success && Array.isArray(result.data.data)) {
        setOtherDocuments(result.data.data);
        setPaginationInfo(prevInfo => ({
          ...prevInfo,
          otherDocuments: {
            currentPage: result.data.current_page,
            lastPage: result.data.last_page,
            total: result.data.total,
          },
        }));
      } else {
        setOtherDocuments([]);
        setPaginationInfo(prevInfo => ({
          ...prevInfo,
          otherDocuments: {
            currentPage: 1,
            lastPage: 1,
            total: 0,
          },
        }));
      }
    } catch (error) {
      console.error('Error fetching other documents:', error);
      setError(error.message);
      setOtherDocuments([]);
      setPaginationInfo(prevInfo => ({
        ...prevInfo,
        otherDocuments: {
          currentPage: 1,
          lastPage: 1,
          total: 0,
        },
      }));
    }
  };
  const handleViewDocument = (document) => {
    setCurrentViewDocument(document);
    switch (activeDocumentTab) {
      case 'academic':
        setIsViewAcademicTranscriptOpen(true);
        break;
      case 'achievements':
        setIsViewAchievementOpen(true);
        break;
      case 'other':
        setIsViewOtherDocOpen(true);
        break;
      default:
        console.error('Unknown document type');
    }
  };


  const renderPagination = (section) => {
    const info = paginationInfo[section];
    if (!info || info.lastPage <= 1) return null;

    const pageNumbers = [];
    for (let i = 1; i <= info.lastPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="pagination">
        <button
          onClick={() => handlePageChange(section, info.currentPage - 1)}
          disabled={info.currentPage === 1}
        >
          &lt;
        </button>
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => handlePageChange(section, number)}
            className={info.currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(section, info.currentPage + 1)}
          disabled={info.currentPage === info.lastPage}
        >
          &gt;
        </button>
      </div>
    );
  };


  const handlePageChange = (section, page) => {
    if (page < 1) return; // Prevent navigating to pages less than 1

    if (section === 'achievementDocs') {
      fetchAchievementDocs(page);
    } else if (section === 'otherDocuments') {
      fetchOtherDocuments(page);
    }
  };

  const calculateOverallGrade = (subjects) => {
    if (!subjects || subjects.length === 0) {
      return 'N/A';
    }
    const gradeCounts = subjects.reduce((counts, subject) => {
      const grade = subject.subject_grade || subject.higherTranscript_grade;
      counts[grade] = (counts[grade] || 0) + 1;
      return counts;
    }, {});
    const gradeOrder = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'E', 'G', 'F', 'A1', 'A2', 'B3'];
    let overallGrade = '';
    for (const grade of gradeOrder) {
      if (gradeCounts[grade]) {
        overallGrade += `${gradeCounts[grade]}${grade} `;
      }
    }
    return overallGrade.trim() || 'N/A';
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const renderAcademicResults = () => {
    return (
      <div className="academic-results m-3 shadow-lg rounded-5 pt-4 d-flex flex-column">
        <div className="px-4">
          <div className=" d-flex  sas-pointer-div px-0 ">
            <select
              className="sac-form-select mb-1 px-0"
              value={selectedCategory ||""}
              onChange={handleCategoryChange}
            >
              {transcriptCategories.map((category) => (
                <option key={category.id ||""} value={category.id ||""}>
                  {category.transcript_category ||""}
                </option>
              ))}

              <span>Subjects and Results</span>

            </select>
            <BsCaretDownFill size={30} className="sas-pointer align-self-start" />
          </div>
        </div>

        {selectedCategory !== 32 && cgpaInfo && (
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
                  <strong>{subject.subject_name || subject.highTranscript_name ||""}</strong>
                </p>
                <p className="mb-0"><strong>{subject.subject_grade || subject.higherTranscript_grade ||""}</strong></p>
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
              Grade: {calculateOverallGrade(transcriptSubjects) ||""}
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


  const renderRelatedDocumentsContent = () => {
    // Calculate total document count
    const totalDocumentCount =
      paginationInfo.achievementDocs.total +
      paginationInfo.otherDocuments.total +
      transcriptDocuments.length;

    let documents = [];
    let columns = [];
    let paginationSection = '';

    switch (activeDocumentTab) {
      case 'academic':
        documents = transcriptDocuments;
        columns = ['Name', 'File Name', 'Actions'];
        break;
      case 'achievements':
        documents = achievementDocs;
        columns = ['Name', 'File Name', 'Actions'];
        paginationSection = 'achievementDocs';
        break;
      case 'other':
        documents = otherDocuments;
        columns = ['Name', 'File Name', 'Actions'];
        paginationSection = 'otherDocuments';
        break;
      default:
        break;
    }

    // Filter documents based on searchTerm
    const filteredDocuments = documents.filter((doc) => {
      let name = '';
      let fileName = '';
      const term = searchTerm.toLowerCase();

      if (activeDocumentTab === 'academic') {
        name = doc.studentMedia_name ? doc.studentMedia_name.toLowerCase() : '';
        fileName = doc.studentMedia_location ? doc.studentMedia_location.toLowerCase() : '';
      } else if (activeDocumentTab === 'achievements') {
        name = doc.achievement_name ? doc.achievement_name.toLowerCase() : '';
        fileName = doc.achievement_media ? doc.achievement_media.toLowerCase() : '';
      } else if (activeDocumentTab === 'other') {
        name = doc.name ? doc.name.toLowerCase() : '';
        fileName = doc.media ? doc.media.toLowerCase() : '';
      }

      return name.includes(term) || fileName.includes(term);
    });

    return (
      <div className="summary-content-yourdocument ">
        <div className="documents-content pt-2 w-100">
          <div>
            <p className='lead'>This student has uploaded <span className="fw-bold">{totalDocumentCount}</span> documents.</p>
            <div className="document-tabs d-flex column mb-3 w-100">
              <Button
                variant="link"
                className={activeDocumentTab === 'academic' ? 'active' : ''}
                onClick={() => setActiveDocumentTab('academic')}
                style={{ fontSize: '1rem', whiteSpace: 'nowrap' }}
              >
                Academic Transcript ({transcriptDocuments.length})
              </Button>
              <Button
                variant="link"
                className={activeDocumentTab === 'achievements' ? 'active' : ''}
                onClick={() => setActiveDocumentTab('achievements')}
                style={{ fontSize: '1rem', whiteSpace: 'nowrap' }}
              >
                Achievements ({paginationInfo.achievementDocs.total})
              </Button>
              <Button
                variant="link"
                className={activeDocumentTab === 'other' ? 'active' : ''}
                onClick={() => setActiveDocumentTab('other')}
                style={{ fontSize: '1rem', whiteSpace: 'nowrap' }}
              >
                Other Certificates/Documents ({paginationInfo.otherDocuments.total})
              </Button>
            </div>
            <div className="search-bar-sas mb-3 ">
              <Search size={20} style={{ color: '#9E9E9E' }} />
              <input
                type="text"
                placeholder="Search..."
                className="form-control custom-input-size"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <table className="w-100">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index} className="border-bottom p-2">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((doc, index) => (
                  <tr key={index}>
                    {activeDocumentTab === 'academic' && (
                      <>
                        <td className="border-bottom p-4" data-label="Name">
                          <div className="d-flex align-items-center">
                            <FileText className="file-icon me-2" />
                            <div>
                              <div className="file-title name-restrict">{doc.studentMedia_name ||""}</div>
                              <div className="file-date">{doc.created_at ||""}</div>
                            </div>
                          </div>
                        </td>
                        <td className="border-bottom p-2" data-label="File Name">{doc.studentMedia_location ||""}</td>
                      </>
                    )}
                    {activeDocumentTab === 'achievements' && (
                      <>
                        <td className="border-bottom p-4" data-label="Name">
                          <div className="d-flex align-items-center">
                            <FileText className="file-icon me-2" />
                            <div>
                              <div className="file-title name-restrict">{doc.achievement_name ||""}</div>
                              <div className="file-date">{doc.date ||""}</div>
                            </div>
                          </div>
                        </td>
                        <td className="border-bottom p-2 " data-label="File Name">{doc.achievement_media ||""}</td>
                      </>
                    )}
                    {activeDocumentTab === 'other' && (
                      <>
                        <td className="border-bottom p-4" data-label="Name">
                          <div className="d-flex align-items-center">
                            <FileText className="file-icon me-2" />
                            <div>
                              <div className="file-title name-restrict">{doc.name ||""}</div>
                              <div className="file-date">{doc.created_at ||""}</div>
                            </div>
                          </div>
                        </td>
                        <td className="border-bottom p-2" data-label="File Name">{doc.media ||""}</td>
                      </>
                    )}
                    <td className="border-bottom p-2" data-label="Actions">
                      <div className="d-flex justify-content-start align-items-center">
                        <Button variant="link" className="p-0" onClick={() => handleViewDocument(doc)}>
                          <Eye size={20} className="iconat" color="grey" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center p-4">
                    No documents found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Pagination Controls */}
          {paginationSection && renderPagination(paginationSection)}
        </div>

        {/* Modals for Viewing Documents */}
        <WidgetAchievement
          isOpen={isViewAchievementOpen}
          onClose={() => setIsViewAchievementOpen(false)}
          item={currentViewDocument}
          isViewMode={true}
        />
        <WidgetFileUpload
          isOpen={isViewOtherDocOpen}
          onClose={() => setIsViewOtherDocOpen(false)}
          item={currentViewDocument}
          isViewMode={true}
        />
        <WidgetFileUploadAcademicTranscript
          isOpen={isViewAcademicTranscriptOpen}
          onClose={() => setIsViewAcademicTranscriptOpen(false)}
          item={currentViewDocument}
          isViewMode={true}
        />
      </div>
    );
  };
  const renderAcceptRejectContent = () => {
    if (!applicantDetails) {
      return <div>Loading application details...</div>;
    }

    const formStatus = applicantDetails.form_status;
    const isPending = formStatus === 2; // Assuming 2 is the code for 'Pending'

    const getStatusMessage = () => {
      if (isPending) {
        if (currentAction === 'accept') {
          return 'This student will be accepted.';
        } else if (currentAction === 'reject') {
          return 'This student will be rejected.';
        } else {
          return 'This student\'s application is pending.';
        }
      } else if (formStatus === 4) {
        return 'This student has been accepted.';
      } else if (formStatus === 3) {
        return 'This student has been rejected.';
      } else {
        return 'Unknown application status.';
      }
    };

    const getStatusColor = () => {
      if (isPending) {
        if (currentAction === 'accept') {
          return '#146A17'; // Green
        } else if (currentAction === 'reject') {
          return '#B71A18'; // Red
        } else {
          return '#EE6226'; // Amber
        }
      } else if (formStatus === 4) {
        return '#146A17'; // Green
      } else if (formStatus === 3) {
        return '#B71A18'; // Red
      } else {
        return '#6C757D'; // Gray
      }
    };

    return (
      <div className="accept-reject-application">
        <div
          className="applicant-actions-div"
          style={{
            color: 'white',
            backgroundColor: getStatusColor(),
          }}
        >
          <p className="mb-0 px-4">{getStatusMessage()}</p>
        </div>

        <div className="mb-4 px-5 mt-4">
          <p className="feedback-p-school fw-normal">Feedback to Student:</p>
          {isPending ? (
            <textarea
              id="feedback"
              className="applicant-form-control"
              rows="4"
              value={feedback}
              onChange={handleFeedbackChange}
              placeholder="Enter your feedback here..."
            ></textarea>
          ) : (
            <div className='border border-1 rounded p-2 '>
              <p>{applicantDetails.form_feedback || 'No feedback provided.'}</p>
            </div>
          )}
        </div>

        {isPending && !currentAction && (
          <div className="mobile-action-school d-flex justify-content-end px-5 ">
            <Button

              className="me-2 border border-0"
              onClick={() => handleAcceptReject('Rejected')}
              disabled={submitLoading}
            >
              Reject Application
            </Button>
            <Button
              variant="success"
              onClick={() => handleAcceptReject('Accepted')}
              disabled={submitLoading}

            >
              Accept Application
            </Button>
          </div>
        )}

        {isPending && currentAction && (
          <div className="d-flex justify-content-end px-5">
            <Button
              variant={currentAction === 'accept' ? 'success' : 'danger'}
              onClick={() => handleAcceptReject(currentAction === 'accept' ? 'Accepted' : 'Rejected')}
              disabled={submitLoading}
            >
              {currentAction === 'accept' ? 'Accept' : 'Reject'} Application
            </Button>
          </div>
        )}

        {submitError && (
          <div className="alert alert-danger mt-3" role="alert">
            {submitError}
          </div>
        )}
        {submitSuccess && (
          <div className="alert alert-success mt-3" role="alert">
            Application status updated successfully!
          </div>
        )}
      </div>
    );
  };


  // Confirmation Modal
  const renderConfirmModal = () => (
    <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{actionType === 'Accepted' ? 'Accept' : 'Reject'} Application</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to {actionType === 'Accepted' ? 'accept' : 'reject'} this application?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
          Cancel
        </Button>
        <Button variant={actionType === 'Accepted' ? 'success' : 'danger'} onClick={handleConfirmAction}>
          Confirm {actionType === 'Accepted' ? 'Accept' : 'Reject'}
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div className="applicant-app-container-applycourse">

      <div className="applicant-backgroundimage">
        <div className='ms-4 mt-3 d-flex mb-0 ' onClick={handleBackPage}>
          <ChevronLeft style={{ color: "#ad736c" }} className=" " size={30} />
          <h5 className="ms-2 mt-1" style={{ color: "#ad736c" }}>Back</h5>
        </div>

        <div className="applicant-main-content-applycourse-clone pt-5">

          <div className="application-summary-container-inside">
            <div className="application-summary-container-inside rounded">
              <div className="applicant-summary-header border border-bottom">
                <div className="applicant-info">
                  <img src={`${import.meta.env.VITE_BASE_URL}storage/${basicInfo?.student_profilePic ||""}`}
                    onError={(e) => {
                      e.target.onerror = null; // prevents looping
                      e.target.src = defaultProfilePic;
                    }}
                    className="applicant-photo me-4 ms-2 "
                    alt="Student" />
                  <div>
                    <p className="my-0 school-fontsize-1 ">{`${basicInfo?.first_name ||""} ${basicInfo?.last_name ||""}`}</p>
                    <p className="my-0 text-secondary mt-2"><small>Applied For:</small> <span className="text-black ms-2">{applicantDetails.course_name ||""}</span></p>
                  </div>
                </div>
                <span
                  className={`applicant-status-button ms-auto ${applicantDetails?.form_status === 4 ? 'accepted' :
                    applicantDetails?.form_status === 3 ? 'rejected' :
                      'pending'
                    } text-white`}
                >
                  {applicantDetails?.form_status === 4 ? 'Accepted' :
                    applicantDetails?.form_status === 3 ? 'Rejected' :
                      'Pending'}
                </span>
                <Button className="applicant-chat-button align-items-center justify-content-center text-nowrap"
                  onClick={handleWhatsAppClick}>
                  <BsWhatsapp className="me-2 whatsapp-button text-nonwrap" size={20} />
                  Chat on WhatsApp
                </Button>
              </div>
              <div className="summary-tabs d-flex flex-wrap px-2 py-2 justify-content-center">
  <Button
    variant="link"
    className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}
    onClick={() => setActiveTab('info')}
  >
    Student Info
  </Button>
  <Button
    variant="link"
    className={`tab-button ${activeTab === 'documents' ? 'active' : ''}`}
    onClick={() => setActiveTab('documents')}
    disabled={accountType !== 65}
    style={{
      pointerEvents: accountType !== 65 ? 'none' : 'auto',
      opacity: accountType !== 65 ? 0.6 : 1,
    }}
  >
    Related Documents
  </Button>
  <Button
    variant="link"
    className={`tab-button ${activeTab === 'accept-reject' ? 'active' : ''}`}
    onClick={() => setActiveTab('accept-reject')}
  >
    Accept/Reject Application
  </Button>
</div>

              {activeTab === 'info' && (
                <div className="summary-content">
                  <div className="basic-info m-3 shadow-lg p-4 rounded-5">
                    <p className="text-secondary fw-bold border-bottom border-2 pb-3">Basic Information</p>
                    <div className="info-grid">
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <p><strong>Student Name</strong></p>
                          <p className="d-flex align-items-center">
                            <span className="me-2">
                              {`${basicInfo?.first_name || ''} ${basicInfo?.last_name || ''}`.trim()}
                            </span>
                            <span
                              className="copy-icon-wrapper"
                              onClick={() => copyToClipboard(`${basicInfo?.first_name || ''} ${basicInfo?.last_name || ''}`.trim(), 'name')}
                              title={copiedFields.name ? "Copied!" : "Copy to clipboard"}
                            >
                              {copiedFields.name
                                ? <Check size={16} className="copied-icon" />
                                : <Copy size={16} className="copy-icon" />
                              }
                            </span>
                          </p>
                        </div>
                        <div className="col-md-6 mb-3">
                          <p><strong>Identity Card Number</strong></p>
                          <p className="d-flex align-items-center">
                            <span className="me-2">{basicInfo?.student_icNumber ||""}</span>
                            <span
                              className="copy-icon-wrapper"
                              onClick={() => copyToClipboard(basicInfo?.student_icNumber, 'icNumber')}
                              title={copiedFields.icNumber ? "Copied!" : "Copy to clipboard"}
                            >
                              {copiedFields.icNumber
                                ? <Check size={16} className="copied-icon" />
                                : <Copy size={16} className="copy-icon" />
                              }
                            </span>
                          </p>
                        </div>
                        <div className="col-md-6 mb-3">
                          <p><strong>Contact Number</strong></p>
                          <p className="d-flex align-items-center">
                            <span className="me-2">
                              {`${basicInfo?.student_countryCode || ''} ${basicInfo?.student_contactNo || ''}`}
                            </span>
                            <span
                              className="copy-icon-wrapper"
                              onClick={() => copyToClipboard(`${basicInfo?.student_countryCode || ''} ${basicInfo?.student_contactNo || ''}`, 'contactNumber')}
                              title={copiedFields.contactNumber ? "Copied!" : "Copy to clipboard"}
                            >
                              {copiedFields.contactNumber
                                ? <Check size={16} className="copied-icon" />
                                : <Copy size={16} className="copy-icon" />
                              }
                            </span>
                          </p>
                        </div>

                        <div className="col-md-6 mb-3">
                          <p><strong>Email Address</strong></p>
                          <p className="d-flex align-items-center" style={{
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word',
                            wordBreak: 'break-all'
                          }}>
                            <span className="me-2">{basicInfo?.student_email ||""}</span>
                            <span
                              className="copy-icon-wrapper"
                              onClick={() => copyToClipboard(basicInfo?.student_email, 'email')}
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
                            <span className="me-2">{basicInfo?.address ||""}</span>
                            <span
                              className="copy-icon-wrapper"
                              onClick={() => copyToClipboard(basicInfo?.address || '', 'address')}
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

                  {renderAcademicResults()}

                  {accountType === 65 ? ( // Premium: Show Co-Curriculum and Achievements
                    <>
        
        <div className="row">
  <div className="col-12 col-md-6 mb-3">
    <div className="co-curriculum m-3 shadow-lg p-4 rounded-5">
      <p className="text-secondary fw-bold border-bottom border-2 pb-3">Co-curriculum</p>
      <div className="activities-grid" style={{ maxHeight: '15rem', overflowY: 'auto' }}>
        {coCurriculum.length > 0 ? (
          coCurriculum.map((activity, index) => (
            <div key={index} className="activity-item d-flex flex-wrap justify-content-between align-items-start py-2">
              <div className="col-12 col-sm-3">
                <p className="mb-0 name-restrict"><strong>{activity.club_name || ""}</strong></p>
                <p className="mb-0 text-muted name-restrict">{activity.location || ""}</p>
              </div>
              <div className="col-6 col-sm-3 text-start text-sm-center">
                <p className="mb-0">{activity.year || ""}</p>
              </div>
              <div className="col-6 col-sm-3 text-end name-restrict">
                <span className={`position py-1 px-2 rounded-pill`} style={getPositionStyle(activity.student_position)}>
                  {activity.student_position}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No co-curricular activities added yet.</p>
        )}
      </div>
    </div>
  </div>

  <div className="col-12 col-md-6 mb-3">
    <div className="achievements m-3 shadow-lg p-4 rounded-5">
      <p className="text-secondary fw-bold border-bottom border-2 pb-3">Achievements</p>
      <div className="achievements-grid" style={{ maxHeight: '15rem', overflowY: 'auto' }}>
        {achievements.length > 0 ? (
          achievements.map((achievement, index) => (
            <div key={index} className="achievement-item d-flex flex-wrap justify-content-between align-items-start py-2">
              <div className="col-12 col-sm-4">
                <p className="mb-0 name-restrict"><strong>{achievement.achievement_name || ""}</strong></p>
                <p className="mb-0 name-restrict text-muted">{achievement.awarded_by || ""}</p>
              </div>
              <div className="col-6 col-sm-3 text-start text-sm-center">
                <p className="mb-0">{achievement.date || ""}</p>
              </div>
              <div className="col-6 col-sm-5 mx-auto text-end">
                <span className={`position ${(achievement.title?.core_metaName?.toLowerCase() ?? '').replace(/\s+/g, '-')} py-1 px-2 rounded-pill`}>
                  {achievement.title?.core_metaName || 'No Title'}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No achievements added yet.</p>
        )}
      </div>
    </div>
  </div>
</div>

                    </>

                  ) : ( // Basic: Show overlay
                    <>
                      <div className="sdv-cocurriculum m-3 shadow-lg p-4 rounded-5 d-flex align-items-center justify-content-center flex-column ">
                        <img src={Lock} alt="My Image" />
                        <p className="text-center text-white mt-3 px-5">This feature is locked and available
                          only with a premium account.</p>
                        <div className="sdv-div-plan-button rounded-pill mt-3">
                          <button className="plan-button rounded-pill" onClick={ handleUpgradePage}>Upgrade Now</button>
                        </div>
                      </div>
                      <div className="sdv-achievements m-3 shadow-lg p-4 rounded-5  d-flex align-items-center justify-content-center flex-column ">
                        <img src={Lock} alt="My Image" />
                        <p className="text-center text-white mt-3 px-5">This feature is locked and available
                          only with a premium account.</p>
                        <div className="sdv-div-plan-button rounded-pill mt-3">
                          <button className="plan-button rounded-pill"  onClick={ handleUpgradePage}>Upgrade Now</button>
                        </div></div>
                    </>
                  )}

                </div>
              )}
              {activeTab === 'documents' && (
                <div className="related-documents  ">
                  {renderRelatedDocumentsContent()}
                </div>
              )}

              {activeTab === 'accept-reject' && (
                <div className="detail-content">
                  <div className="accept-reject-application">
                    <p className="px-5 mb-3 ">Actions</p>
                    {renderAcceptRejectContent()}

                  </div>
                </div>
              )}
              {renderConfirmModal()}
            </div>
          </div>

        </div>
      </div>
    </div >
  );

};

export default StudentDetailView;
