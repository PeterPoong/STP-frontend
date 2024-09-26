import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FileText, Search, Eye, ChevronDown, ChevronUp, Clock, Copy, Check, X, Download } from 'react-feather';
import { GraduationCap, CalendarCheck, BookOpenText } from 'lucide-react';
import "../../../css/StudentPortalStyles/StudentApplyCourse.css";
import "../../../css/SchoolPortalStyle/ApplicantViewSummary.css";
import SpcFooter from "../../../Components/StudentPortalComp/SpcFooter";
import { useParams, useNavigate } from 'react-router-dom';


const StudentDetailView = ({ student, action, onBack }) => {

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

  const navigate = useNavigate();
  const studentId = student?.student_id;
  console.log('Current studentId:', studentId);

  useEffect(() => {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    if (!token) {
      navigate("/schoolPortalLogin");
    }
  }, [navigate]);

  useEffect(() => {
    fetchBasicInfo();
    fetchTranscriptCategories();
    fetchCoCurriculum();
    fetchAchievements();
  }, [studentId]);

  useEffect(() => {
    if (activeTab === 'documents') {
      fetchRelatedDocuments();
      fetchDocumentCategories();
    }
  }, [activeTab]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTranscriptCategories();
        if (transcriptCategories.length > 0) {
          const firstCategoryId = transcriptCategories[0].id;
          setSelectedExam(firstCategoryId.toString());
          await fetchTranscriptSubjects(firstCategoryId);
        }
      } catch (error) {
        console.error('Error in initial data fetch:', error);
        setError('Failed to load initial data. Please try again.');
      }
    };

    fetchData();
  }, [studentId]);

  const fetchBasicInfo = async () => {
    setIsLoading(true);
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/school/applicantDetailInfo`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ student_id: studentId })
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch student details. Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Received data:', JSON.stringify(responseData, null, 2));
      console.log('Fetched student data:', responseData);

      if (responseData.data && responseData.data.length > 0) {
        setBasicInfo(responseData.data[0]);
      } else {
        
        throw new Error('No data received from the server.');
      }
    } catch (err) {
      console.error('Error in fetchBasicInfo:', err.message);
      setError(err.message || 'Error fetching student details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTranscriptCategories = async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/transcriptCategoryList`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch transcript categories');
      }
      const result = await response.json();
      if (result.success) {
        setTranscriptCategories(result.data.data);
        if (result.data.data.length > 0) {
          setSelectedExam(result.data.data[0].id.toString());
          fetchTranscriptSubjects(result.data.data[0].id);
        }
      } else {
        throw new Error(result.message || 'Failed to fetch transcript categories');
      }
    } catch (error) {
      console.error('Error fetching transcript categories:', error);
      setError(error.message);
    }
  }; 
  
  const fetchTranscriptSubjects = async (categoryId) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      console.log('Fetching transcript subjects for category:', categoryId);
      console.log('Student ID:', studentId);

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/school/applicantDetailAcademic`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ student_id: studentId, category: categoryId }),
      });

      console.log('API Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`Failed to fetch transcript subjects. Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('API Response Data:', JSON.stringify(result, null, 2));
      

      if (result.success && result.data && result.data.data && result.data.data.length > 0) {
        const studentData = result.data.data.find(item => item.student_id === parseInt(studentId));
        if (studentData && studentData.transcripts) {
          setAcademicResults(result.data.data);
          setTranscriptSubjects(studentData.transcripts || []);
          setCgpaInfo(studentData.count_grade || {});
        } else {
          console.warn('No transcript subjects found for this student');
          setTranscriptSubjects([]);
          setCgpaInfo({});
        }
      } else {
        //console.warn('No transcript subjects found or unexpected data structure');
        console.log('Received data:', JSON.stringify(result.data, null, 2));
        setTranscriptSubjects([]);
        setCgpaInfo({});
      }
    } catch (error) {
      console.error('Error fetching transcript subjects:', error);
      setError(error.message);
      setTranscriptSubjects([]);
      setCgpaInfo({});
    }
  };
  const fetchCoCurriculum = async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/school/applicantDetailCocurriculum`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ student_id: studentId }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch co-curriculum activities');
      }
      const result = await response.json();
      console.log('Co-curriculum API response:', result);
      if (result.success && result.data && result.data.data && result.data.data.length > 0) {
        const studentCoCurriculum = result.data.data.find(item => item.student_id === studentId);
        setCoCurriculum(studentCoCurriculum ? studentCoCurriculum.cocurriculums : []);
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
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/school/applicantDetailAchievement`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ student_id: studentId }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch achievements');
      }
      const result = await response.json();
      console.log('Achievements API response:', result);
      if (result.success && result.data && result.data.data && result.data.data.length > 0) {
        const studentAchievements = result.data.data.find(item => item.student_id === studentId);
        setAchievements(studentAchievements ? studentAchievements.achievements : []);
      } else {
        setAchievements([]);
      }
    } catch (error) {
      console.error('Error fetching achievements:', error);
      setError(error.message);
      setAchievements([]);
    }
  };
  const handleExamChange = async (e) => {
    const newExamId = e.target.value;
    setSelectedExam(newExamId);
    try {
      await fetchTranscriptSubjects(parseInt(newExamId));
    } catch (error) {
      console.error('Error fetching transcript subjects:', error);
      setError('Failed to fetch transcript subjects. Please try again.');
    }
  };
  const copyToClipboard = (text) => {
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        console.log('Copied to clipboard');
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    } else {
      console.error('No text to copy');
    }
  };


  const fetchRelatedDocuments = async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/school/applicantDetailRelatedDocument`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_id: studentId,
          search: documentSearchTerm,
          category: documentCategoryFilter,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch related documents');
      }
      const result = await response.json();
      if (result.success) {
        setRelatedDocuments(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch related documents');
      }
    } catch (error) {
      console.error('Error fetching related documents:', error);
      setError(error.message);
    }
  };
  const fetchDocumentCategories = async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/mediaListByCategory`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Document Categories API Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Document Categories API Error Response:', errorText);
        throw new Error(`Failed to fetch document categories. Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Document Categories API Response Data:', result);

      if (result.success) {
        setDocumentCategories(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch document categories');
      }
    } catch (error) {
      console.error('Error fetching document categories:', error);
      setError(error.message);
      setDocumentCategories([]);
    }
  };
  const handleDocumentSearch = (e) => {
    setDocumentSearchTerm(e.target.value);
  };

  const handleDocumentCategoryFilter = (e) => {
    setDocumentCategoryFilter(e.target.value);
  };

  const handleDocumentDownload = (documentUrl) => {
    window.open(`${import.meta.env.VITE_BASE_URL}${documentUrl}`, '_blank');
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleAcceptReject = (type) => {
    setActionType(type);
    setShowConfirmModal(true);
  };const handleConfirmAction = async () => {
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
        id: applicationId, // Ensure this is the correct application ID
        type: actionType,
        feedback: feedback,
      };
  
      console.log('Request body:', requestBody);
  
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/school/editApplicantStatus`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      const result = await response.json(); // Parse JSON first
      console.log('API Response:', result);
  
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
        // Update the basicInfo state with the new status
        setBasicInfo(prevInfo => ({
          ...prevInfo,
          form_status: actionType === 'Accepted' ? 'Accepted' : 'Rejected'
        }));
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
  
  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  const renderAcademicResults = () => {
    const currentResults = academicResults.find(result => result.transcripts && result.transcripts.length > 0);

    if (!currentResults) {
      return (
        <div className="text-center py-0">

        </div>
      );
    }

    return (
      <>
        <div className="results-grid flex-grow-1 px-4" style={{ maxHeight: '15rem', overflowY: 'auto' }}>
          {currentResults.transcripts.map((subject, index) => (
            <div key={index} className="d-flex justify-content-between py-3">
              <p className="mb-0"><strong>{subject.subject_name}</strong></p>
              <p className="mb-0"><strong>{subject.grade}</strong></p>
            </div>
          ))}
        </div>
        <div className="grade-summary d-flex justify-content-between align-items-stretch border-top">
          <div className="overall-grade text-white w-75 d-flex justify-content-start">
            <h3 className="align-self-center px-5">
              Grade: {Object.entries(currentResults.count_grade || {}).map(([grade, count]) => `${count}${grade}`).join(' ')}
            </h3>
          </div>
        </div>
      </>
    );
  };

  const renderRelatedDocumentsContent = () => {
    return (
      <div className="related-documents m-3 shadow-lg p-4 rounded-5">
        <p className="text-secondary fw-bold border-bottom border-2 pb-3">Related Documents</p>
        <div className="search-filter-container mb-4">
          <div className="search-bar mb-3">
            <Search size={20} style={{ color: '#9E9E9E' }} />
            <input
              type="text"
              placeholder="Search documents..."
              className="form-control custom-input-size"
              value={documentSearchTerm}
              onChange={handleDocumentSearch}
            />
          </div>
          <div className="filter-dropdown">
            <select
              className="form-select"
              value={documentCategoryFilter}
              onChange={handleDocumentCategoryFilter}
            >
              <option value="">All Categories</option>
              {documentCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.core_metaValue}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="documents-list">
          {relatedDocuments.length > 0 ? (
            relatedDocuments.map((doc, index) => (
              <div key={index} className="document-item d-flex justify-content-between align-items-center py-3 border-bottom">
                <div className="document-info d-flex align-items-center">
                  <FileText className="me-3" size={24} />
                  <div>
                    <p className="mb-0 fw-bold">{doc.studentMedia_name || doc.achievement_name}</p>
                    <p className="mb-0 text-muted small">{doc.studentMedia_type_id ? 'Academic Document' : 'Achievement'}</p>
                  </div>
                </div>
                <div className="document-actions">
                  <Button variant="outline-secondary" className="me-2" onClick={() => handleDocumentDownload(doc.studentMedia_location || doc.achievement_media)}>
                    <Download size={18} />
                  </Button>
                  <Button variant="outline-primary">
                    <Eye size={18} />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No documents found.</p>
          )}
        </div>
      </div>
    );
  };

  const renderAcceptRejectContent = () => {
    if (basicInfo?.form_status === 'Pending') {
      return (
        <div className="accept-reject-application ">

          <div className="mb-4 px-5 mt-4">
            <p className="fw-normal">Feedback to Student:</p>
            <textarea
              id="feedback"
              className="applicant-form-control"
              rows="4"
              value={feedback}
              onChange={handleFeedbackChange}
              placeholder="Enter your feedback here..."
            ></textarea>
          </div>
          <div className="d-flex justify-content-end">
            <Button
              variant="success"
              className="me-2"
              onClick={() => handleAcceptReject('Accepted')}
              disabled={submitLoading}
            >
              <Check size={18} className="me-2" />
              Accept Application
            </Button>
            <Button
              variant="danger"
              onClick={() => handleAcceptReject('Rejected')}
              disabled={submitLoading}
            >
              <X size={18} className="me-2" />
              Reject Application
            </Button>
          </div>
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
    } else {
      return (
        <div className="accept-reject-application m-3 shadow-lg p-4 rounded-5">
          <p className="text-secondary fw-bold border-bottom border-2 pb-3">Application Status</p>
          <div className="alert alert-info" role="alert">
            This application has already been {basicInfo.form_status.toLowerCase()}.
          </div>
        </div>
      );
    }
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
        <div className="applicant-main-content-applycourse-clone">

          <div className="application-summary-container-inside">
            <div className="application-summary-container-inside rounded">
              <div className="applicant-summary-header  border border-bottom">
                <div className="applicant-info">
                  <img src={`${import.meta.env.VITE_BASE_URL}storage/${basicInfo?.profile_pic}`} className="applicant-photo me-4 ms-2" alt="Student" />
                  <div>
                    <p className="my-0 fw-bold">{basicInfo?.student_name}</p>
                    <p className="my-0 text-secondary mt-2">Applied For: <span className="text-black ms-2">{basicInfo?.course_name}</span></p>
                  </div>
                </div>
                <Button className="applicant-status-button ms-auto">Pending</Button>
                <Button className="applicant-chat-button  ">Chat on WhatsApp</Button>
              </div>
              <div className="summary-tabs d-flex flex-wrap px-4">
                <Button
                  variant="link"
                  className={activeTab === 'info' ? 'active' : ''}
                  onClick={() => setActiveTab('info')}
                >
                  Student Info
                </Button>
                <Button
                  variant="link"
                  className={activeTab === 'documents' ? 'active' : ''}
                  onClick={() => setActiveTab('documents')}
                >
                  Related Documents
                </Button>
                <Button
                  variant="link"
                  className={activeTab === 'accept-reject' ? 'active' : ''}
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
                          <p>{basicInfo?.student_name} <Copy size={16} className="cursor-pointer" onClick={() => copyToClipboard(basicInfo?.student_name)} /></p>
                        </div>
                        <div className="col-md-6 mb-3">
                          <p><strong>Email Address</strong></p>
                          <p>{basicInfo?.email} <Copy size={16} className="cursor-pointer" onClick={() => copyToClipboard(basicInfo?.email)} /></p>
                        </div>
                        <div className="col-md-6 mb-3">
                          <p><strong>Contact Number</strong></p>
                          <p>{`${basicInfo?.country_code} ${basicInfo?.contact_number}`} <Copy size={16} className="cursor-pointer" onClick={() => copyToClipboard(`${basicInfo?.country_code} ${basicInfo?.contact_number}`)} /></p>
                        </div>
                        <div className="col-md-6 mb-3">
                          <p><strong>Application Status</strong></p>
                          <p>{basicInfo?.form_status}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="academic-results m-3 shadow-lg rounded-5 pt-4 d-flex flex-column">
                    <div className="px-4">
                      <select
                        className="sdv-form-select mb-3 px-0"
                        value={selectedExam}
                        onChange={handleExamChange}
                      >
                        {transcriptCategories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.transcript_category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="results-grid flex-grow-1 px-4" style={{ maxHeight: '15rem', overflowY: 'auto' }}>
                      {transcriptSubjects && transcriptSubjects.length > 0 ? (
                        transcriptSubjects.map((subject, index) => (
                          <div key={index} className="d-flex justify-content-between py-3">
                            <p className="mb-0"><strong>{subject.subject_name}</strong></p>
                            <p className="mb-0"><strong>{subject.grade}</strong></p>
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
                          Grade: {Object.entries(cgpaInfo || {}).map(([grade, count]) => `${count}${grade}`).join(' ')}
                        </h3>
                      </div>
                      <Button variant="link" className="text-danger w-25 "
                        onClick={() => {
                          setActiveTab('documents'); // Navigate to Your Documents tab
                          setActiveDocumentTab('academic'); // Navigate to Academic Transcript tab
                        }}
                        disabled={!transcriptSubjects || transcriptSubjects.length === 0}>
                        View Result Slip »
                      </Button>
                    </div>
                    {renderAcademicResults()}
                  </div>

                  <div className="co-curriculum m-3 shadow-lg p-4 rounded-5">
                    <p className="text-secondary fw-bold border-bottom border-2 pb-3">Co-curriculum</p>
                    <div className="activities-grid" style={{ maxHeight: '15rem', overflowY: 'auto' }}>
                      {coCurriculum.length > 0 ? (
                        coCurriculum.map((activity, index) => (
                          <div key={index} className="activity-item d-flex flex-wrap justify-content-between align-items-start py-2">
                            <div className="col-12 col-sm-6">
                              <p className="mb-0"><strong>{activity.club_name}</strong></p>
                              <p className="mb-0 text-muted">{activity.location}</p>
                            </div>
                            <div className="col-6 col-sm-3 text-start text-sm-center">
                              <p className="mb-0">{activity.year}</p>
                            </div>
                            <div className="col-6 col-sm-3 text-end">
                              <span className={`position ${activity.position.toLowerCase()} py-1 px-2 rounded-pill`}>{activity.position}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-muted">No co-curricular activities added yet.</p>
                      )}
                    </div>
                  </div>
                  <div className="achievements m-3 shadow-lg p-4 rounded-5">
                    <p className="text-secondary fw-bold border-bottom border-2 pb-3">Achievements</p>
                    <div className="achievements-grid" style={{ maxHeight: '15rem', overflowY: 'auto' }}>
                      {achievements.length > 0 ? (
                        achievements.map((achievement, index) => (
                          <div key={index} className="achievement-item d-flex flex-wrap justify-content-between align-items-start py-2">
                            <div className="col-12 col-sm-6">
                              <p className="mb-0"><strong>{achievement.achievement_name}</strong></p>
                              <p className="mb-0 text-muted">{achievement.location}</p>
                            </div>
                            <div className="col-6 col-sm-3 text-start text-sm-center">
                              <p className="mb-0">{achievement.date}</p>
                            </div>
                            <div className="col-6 col-sm-3 text-end">
                              <span className={`position ${achievement.position.toLowerCase().replace(/\s+/g, '-')} py-1 px-2 rounded-pill`}>{achievement.position}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-muted">No achievements added yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'documents' && (
                <div className="detail-content">
                  <div className="related-documents m-3 shadow-lg p-4 rounded-5">
                    <p className="text-secondary fw-bold border-bottom border-2 pb-3">Related Documents</p>
                    {renderRelatedDocumentsContent()}

                  </div>
                </div>
              )}

              {activeTab === 'accept-reject' && (
                <div className="detail-content">
                  <div className="accept-reject-application">
                    <p className="px-5 mb-3 ">Actions</p>
                    <div className="applicant-actions-div ">
                      <p className="mb-0 px-4">This student has already been < strong >accepted</strong></p>
                    </div>
                    {renderAcceptRejectContent()}

                  </div>
                </div>
              )}
              {renderConfirmModal()}
            </div>
          </div>

        </div>
      </div>
    </div>
  );

};

export default StudentDetailView;