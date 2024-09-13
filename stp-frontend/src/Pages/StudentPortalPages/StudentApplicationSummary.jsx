import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FileText, Search, Eye, ChevronDown, ChevronUp, Clock, Copy } from 'react-feather';
import { GraduationCap, CalendarCheck, BookOpenText } from 'lucide-react';
import "../../css/StudentPortalStyles/StudentApplyCourse.css";
import image1 from "../../assets/StudentAssets/University Logo/image1.jpg";
import "../../css/StudentPortalStyles/StudentButtonGroup.css";
import SpcFooter from "../../Components/StudentPortalComp/SpcFooter";

const fakeFormData = {
  profilePicture: "https://example.com/fake-profile-pic.jpg",
  name: "John Doe",
  course: "Bachelor of Computer Science",
  icNumber: "990101-14-1234",
  phone: "+60 12-345 6789",
  email: "johndoe@example.com",
  address: "123 Main Street, Subang Jaya, 47500 Selangor, Malaysia",
  spmResults: [
    { name: "Bahasa Melayu", grade: "A+" },
    { name: "English", grade: "A" },
    { name: "Mathematics", grade: "A+" },
    { name: "Science", grade: "A" },
    { name: "History", grade: "A-" },
    { name: "Geography", grade: "B+" },
  ],
  igcseResults: [
    { name: "English Language", grade: "A*" },
    { name: "Mathematics", grade: "A" },
    { name: "Physics", grade: "A" },
    { name: "Chemistry", grade: "B" },
    { name: "Biology", grade: "A" },
    { name: "Geography", grade: "A*" },
  ],
  oLevelResults: [
    { name: "English Language", grade: "A1" },
    { name: "Mathematics", grade: "A2" },
    { name: "Physics", grade: "B3" },
    { name: "Chemistry", grade: "A1" },
    { name: "Biology", grade: "B3" },
    { name: "History", grade: "A2" },
  ],
  overallGrade: "A",
  coCurricularActivities: [
    { name: "School Prefect", year: "2022", position: "President", location: "SMK Subang Jaya" },
    { name: "Debate Club", year: "2021", position: "Secretary", location: "District Level" },
    { name: "Basketball Team", year: "2020", position: "Captain", location: "State Level" },
    { name: "School Prefect", year: "2022", position: "President", location: "SMK Subang Jaya" },
    { name: "Debate Club", year: "2021", position: "Secretary", location: "District Level" },
    { name: "Basketball Team", year: "2020", position: "Captain", location: "State Level" },
  ],
  achievements: [
    { name: "National Science Olympiad", date: "2022", position: "Gold Medal", location: "Kuala Lumpur" },
    { name: "Inter-School Debate Competition", date: "2021", position: "Champion", location: "Selangor" },
    { name: "State-level Essay Writing Contest", date: "2020", position: "Runner-up", location: "Penang" },
    { name: "National Science Olympiad", date: "2022", position: "Gold Medal", location: "Kuala Lumpur" },
    { name: "Inter-School Debate Competition", date: "2021", position: "Champion", location: "Selangor" },
    { name: "State-level Essay Writing Contest", date: "2020", position: "Runner-up", location: "Penang" },
  ]
};

const StudentApplicationSummary = ({ formData = fakeFormData }) => {
  const [activeTab, setActiveTab] = useState('info');
  const [activeDocumentTab, setActiveDocumentTab] = useState('achievements');
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [showFullRequirements, setShowFullRequirements] = useState(false);
  const [selectedExam, setSelectedExam] = useState('SPM');
  const [examResults, setExamResults] = useState(formData.spmResults);
  const [overallGrade, setOverallGrade] = useState(formData.overallGrade);

  const examTypes = {
    SPM: 'Sijil Pelajaran Malaysia (SPM)',
    IGCSE: 'International General Certificate of Secondary Education (IGCSE)',
    'O-Level': 'General Certificate of Education Ordinary Level (O-Level)',
  };

  const calculateOverallGrade = (results) => {
    const gradeCounts = results.reduce((counts, subject) => {
      counts[subject.grade] = (counts[subject.grade] || 0) + 1;
      return counts;
    }, {});

    const gradeOrder = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'E', 'G', 'F', 'A1', 'A2', 'B3'];
    let overallGrade = '';

    for (const grade of gradeOrder) {
      if (gradeCounts[grade]) {
        overallGrade += `${gradeCounts[grade]}${grade} `;
      }
    }

    return overallGrade.trim();
  };

  useEffect(() => {
    const newOverallGrade = calculateOverallGrade(examResults);
    setOverallGrade(newOverallGrade);
  }, [examResults]);

  const handleExamChange = (e) => {
    const newExam = e.target.value;
    setSelectedExam(newExam);
    switch (newExam) {
      case 'SPM':
        setExamResults(formData.spmResults);
        break;
      case 'IGCSE':
        setExamResults(formData.igcseResults);
        break;
      case 'O-Level':
        setExamResults(formData.oLevelResults);
        break;
      default:
        setExamResults(formData.spmResults);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // Optionally, you can show a tooltip or notification that the text was copied
      console.log('Copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const renderDocumentsContent = () => {
    const documents = {
      achievements: [
        { name: "Swimming Competition 2022", filename: "examplefilename.pdf" },
        { name: "National Science Olympiad 2023", filename: "examplefilename.pdf" },
        // ... other achievements
      ],
      // Add other document categories here
    };

    return (
      <div className="summary-content-yourdocument">
        <div className="documents-content pt-2 w-100">
          <div>
            <p className='lead'>You have uploaded <span className="fw-bold">30</span> documents.</p>
            <div className="document-tabs d-flex column mb-3 w-100">
              <Button
                variant="link"
                className={activeDocumentTab === 'academic' ? 'active' : ''}
                onClick={() => setActiveDocumentTab('academic')}
                style={{ fontSize: '1rem', whiteSpace: 'nowrap' }} // Prevent text from wrapping
              >
                Academic Transcript (2)
              </Button>
              <Button
                variant="link"
                className={activeDocumentTab === 'achievements' ? 'active' : ''}
                onClick={() => setActiveDocumentTab('achievements')}
                style={{ fontSize: '1rem', whiteSpace: 'nowrap' }}
              >
                Achievements (13)
              </Button>
              <Button
                variant="link"
                className={activeDocumentTab === 'other' ? 'active' : ''}
                onClick={() => setActiveDocumentTab('other')}
                style={{ fontSize: '1rem', whiteSpace: 'nowrap' }}
              >
                Other Certificates/ Documents (15)
              </Button>
            </div>
            <div className="search-bar mb-3">
              <Search size={20} />
              <input type="text" placeholder="Search..." className="form-control" />
            </div>
          </div>
          <table className="w-100">
            <thead>
              <tr>
                <th className="border-bottom p-2">Name</th>
                <th className="border-bottom p-2 text-end">Filename</th>
                <th className="border-bottom p-2 text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents[activeDocumentTab]?.map((doc, index) => (
                <tr key={index}>
                  <td className="border-bottom p-4" data-label="Name">
                    <div className="d-flex align-items-center">
                      <FileText className="file-icon me-2" />
                      <div>
                        <div className="file-title">{doc.name}</div>
                        <div className="file-date">{doc.date || 'No date'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="border-bottom p-2 text-end" data-label="Filename">{doc.filename}</td>
                  <td className="border-bottom p-2" data-label="Actions">
                    <div className="d-flex justify-content-end align-items-center">
                      <Button variant="link" className="p-0">
                        <Eye size={20} className="iconat" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderCourseInformation = () => {
    return (

      <div className="summary-content-course-info">
        <div className="school-info text-center" style={{ margin: '0 0' }}>
          <div className="school-logo-name">
            <img src={image1} className="school-logo" style={{ width: '25%', height: 'auto', maxHeight: '9rem' }} />
            <h1 className="sac-school-name">Swinburne University of Technology</h1>
          </div>
          <Button className="mx-auto mt-5 w-25 as-knowmore-button" style={{ padding: '0.5rem 1.5rem', fontSize: '1rem' }}>Know More</Button>
        </div>

        <div className="bg-white mt-3 rounded-1 shadow p-4 ">
          <h3 className="fw-bold">Degree of Business Management</h3>
        </div>
        <div className="bg-white p-4 mb-1 rounded-1 shadow mt-3">
          <h5 className="fw-bold mb-3">Summary</h5>
          <div className="d-flex flex-wrap">
            <div className="col-6 mb-3">
              <div className="d-flex align-items-center">
                <GraduationCap size={16} className="me-2" />
                <span className="summary-label">Degree</span>
              </div>
            </div>
            <div className="col-6 mb-3">
              <div className="d-flex align-items-center">
                <Clock size={16} className="me-2" />
                <span >30 months</span>
              </div>
            </div>
            <div className="col-6 mb-3">
              <div className="d-flex align-items-center">
                <CalendarCheck size={16} className="me-2" />
                <span className="summary-label">Full time</span>
              </div>
            </div>
            <div className="col-6 mb-3">
              <div className="d-flex align-items-center">
                <BookOpenText size={16} className="me-2" />
                <span >January, July or September</span>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between align-item-center bg-white p-4 mb-1 rounded-1 shadow mt-3">
          <h5 className="fw-bold">Estimate Fee</h5>
          <span className='lead'>RM 24,000 / year</span>
        </div>

        <div className="bg-white p-4 mb-1 rounded-1 shadow-lg mt-3">
          <h5 className="fw-bold">Course Overview</h5>
          <div className={`overview-content ${showFullOverview ? 'expanded' : ''}`}>
            <p>The purpose of this programme is to produce graduates with in-depth knowledge of Arabic linguistics. From the aspects of national aspiration and global importance, this programme aims to produce graduates who demonstrate those aspects.</p>
            <p>Having the ability to apply their knowledge and skills as well as communicate well in Arabic would further enable them to contribute at the international stage and realise the features of a Malaysian society as envisioned in Vision 2020.</p>
          </div>
          <div className="text-center">
            <Button variant="link" onClick={() => setShowFullOverview(!showFullOverview)}>
              {showFullOverview ? 'View Less' : 'View More'} {showFullOverview ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Button>
          </div>
        </div>

        <div className="entry-requirements bg-white p-4 mb-1 rounded-1 shadow-lg mt-3">
          <h5 className="fw-bold">Entry Requirement</h5>
          <div className={`requirements-content ${showFullRequirements ? 'expanded' : ''}`}>
            <ul>
              <li>Pass in STPM with 2 principal passes including Mathematics and one relevant Natural Science subject</li>
              <li>Pass in A-Level with 2 principal passes including Mathematics and one relevant Natural Science subject</li>
              <li>Pass in UEC with 5 Bs (must include Mathematics and one relevant Natural Science subject)</li>
              <li>Pass in Foundation Studies in Sciences or Engineering with CGPA at least 2.00 in relevant field from institute of higher education recognised by the Malaysian Government</li>
            </ul>
          </div>
          <div className="text-center">
            <Button variant="link" onClick={() => setShowFullRequirements(!showFullRequirements)}>
              {showFullRequirements ? 'View Less' : 'View More'} {showFullRequirements ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Button>
          </div>
        </div>
      </div>

    );
  };

  return (
    <div className="main-content-applycourse">
      <div className="backgroundimage">
        <div className="application-summary-container">
          <div className="bg-white rounded mb-5 p-3"><h1 className="summary-title">Application Summary</h1></div>
          <div className="application-summary-container-inside rounded ">
            <div className="summary-header p-3 border border-bottom">
              <div className="applicant-info">
                <img src={formData.profilePicture} alt={formData.name} className="applicant-photo ms-3 bg-black" />
                <div>
                  <h3 className="ms-3">{formData.name}</h3>
                  <p className="ms-3 text-secondary">Applied For: <span className="fw-bold text-black">{formData.course}</span></p>
                </div>
              </div>
              <Button className="sac-submit-button">Print Summary</Button>
            </div>
            <div className="summary-tabs d-flex flex-wrap">
              <Button
                variant="link"
                className={activeTab === 'info' ? 'active' : ''}
                onClick={() => setActiveTab('info')}
              >
                Your Info
              </Button>
              <Button
                variant="link"
                className={activeTab === 'documents' ? 'active' : ''}
                onClick={() => setActiveTab('documents')}
              >
                Your Documents
              </Button>
              <Button
                variant="link"
                className={activeTab === 'course' ? 'active' : ''}
                onClick={() => setActiveTab('course')}
              >
                Course Information
              </Button>
            </div>

            {activeTab === 'info' ? (
              <>
                <div className="summary-content">
                  <div className="basic-info m-3 shadow-lg p-4 rounded-5">
                    <p className="text-secondary fw-bold border-bottom border-2 pb-3">Basic Information</p>
                    <div className="info-grid">
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <p><strong>Student Name</strong></p>
                          <p>{formData.name} <Copy size={16} className="cursor-pointer" onClick={() => copyToClipboard(formData.name)} /></p>
                        </div>
                        <div className="col-md-6 mb-3">
                          <p><strong>Identity Card Number</strong></p>
                          <p>{formData.icNumber} <Copy size={16} className="cursor-pointer" onClick={() => copyToClipboard(formData.icNumber)} /></p>
                        </div>
                        <div className="col-md-6 mb-3">
                          <p><strong>Contact Number</strong></p>
                          <p>{formData.phone} <Copy size={16} className="cursor-pointer" onClick={() => copyToClipboard(formData.phone)} /></p>
                        </div>
                        <div className="col-md-6 mb-3">
                          <p><strong>Email Address</strong></p>
                          <p>{formData.email} <Copy size={16} className="cursor-pointer" onClick={() => copyToClipboard(formData.email)} /></p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <p><strong>Address</strong></p>
                          <p>{formData.address} <Copy size={16} className="cursor-pointer" onClick={() => copyToClipboard(formData.address)} /></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="academic-results m-3 shadow-lg rounded-5 pt-4 d-flex flex-column">
                    <div className="px-4">
                      <select
                        className="sac-form-select mb-3 px-0"
                        value={selectedExam}
                        onChange={handleExamChange}
                      >
                        {Object.entries(examTypes).map(([key, value]) => (
                          <option key={key} value={key}>{value}</option>
                        ))}
                      </select>
                    </div>
                    <div className="results-grid flex-grow-1 px-4 " style={{ maxHeight: '15rem', overflowY: 'auto' }}>
                      {examResults && examResults.map((subject, index) => (
                        <div key={index} className="d-flex justify-content-between py-3">
                          <p className="mb-0"><strong>{subject.name}</strong></p>
                          <p className="mb-0 "><strong>{subject.grade}</strong></p>
                        </div>
                      ))}
                    </div>
                    <div className="grade-summary d-flex justify-content-between align-items-stretch border-top">
                      <div className="overall-grade  text-white w-75 d-flex justify-content-start">
                        <h3 className="align-self-center px-5">Grade: {overallGrade}</h3>
                      </div>
                      <Button variant="link" className="text-danger w-25 ">View Result Slip »</Button>
                    </div>
                  </div>

                  <div className="co-curriculum m-3 shadow-lg p-4 rounded-5">
                    <p className="text-secondary fw-bold border-bottom border-2 pb-3">Co-curriculum</p>
                    <div className="activities-grid" style={{ maxHeight: '15rem', overflowY: 'auto' }}>
                      {formData.coCurricularActivities && formData.coCurricularActivities.map((activity, index) => (
                        <div key={index} className="activity-item d-flex flex-wrap justify-content-between align-items-start py-2">
                          <div className="col-12 col-sm-6">
                            <p className="mb-0"><strong>{activity.name}</strong></p>
                            <p className="mb-0 text-muted">{activity.location}</p>
                          </div>
                          <div className="col-6 col-sm-3 text-start text-sm-center">
                            <p className="mb-0">{activity.year}</p>
                          </div>
                          <div className="col-6 col-sm-3 text-end">
                            <span className={`position ${activity.position.toLowerCase()} py-1 px-2 rounded-pill`}>{activity.position}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="achievements m-3 shadow-lg p-4 rounded-5">
                    <p className="text-secondary fw-bold border-bottom border-2 pb-3">Achievements</p>
                    <div className="achievements-grid" style={{ maxHeight: '15rem', overflowY: 'auto' }}>
                      {formData.achievements && formData.achievements.map((achievement, index) => (
                        <div key={index} className="achievement-item d-flex flex-wrap justify-content-between align-items-start py-2">
                          <div className="col-12 col-sm-6">
                            <p className="mb-0"><strong>{achievement.name}</strong></p>
                            <p className="mb-0 text-muted">{achievement.location}</p>
                          </div>
                          <div className="col-6 col-sm-3 text-start text-sm-center">
                            <p className="mb-0">{achievement.date}</p>
                          </div>
                          <div className="col-6 col-sm-3 text-end">
                            <span className={`position ${achievement.position.toLowerCase().replace(/\s+/g, '-')} py-1 px-2 rounded-pill`}>{achievement.position}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : activeTab === 'documents' ? (
              renderDocumentsContent()
            ) : activeTab === 'course' ? (
              renderCourseInformation()
            ) : null}
          </div>
        </div>
      </div>
    </div>

  );
};

export default StudentApplicationSummary;                                           