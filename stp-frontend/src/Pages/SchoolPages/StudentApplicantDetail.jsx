import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../Components/SchoolPortalComp/SchoolSidebar";
import { Container, Button, Row, Col } from "react-bootstrap";
import Lock from "../../assets/StudentPortalAssets/lock.svg";
import { Whatsapp, Arrow90degLeft } from "react-bootstrap-icons";
import {
  FileText,
  Search,
  Eye,
  ChevronDown,
  ChevronUp,
  Clock,
  Copy,
  Check
} from "react-feather";
import { ChevronLeft } from "react-bootstrap-icons"
import "../../css/StudentPortalStyles/StudentApplyCourse.css";
import "../../css/SchoolPortalStyle/ApplicantViewSummary.css";
import styles from "../../css/SchoolPortalStyle/StudentApplicantDetail.module.css";
import { ClassNames } from "@emotion/react";
import { withTheme } from "styled-components";
import AcceptReject from "../../Components/SchoolPortalComp/EmailStudentApplicantComp/DocumentContent/AcceptReject";
import { BsWhatsapp, BsCaretDownFill } from 'react-icons/bs';
import WidgetFileUploadAcademicTranscript from "../../Components/StudentPortalComp/WidgetFileUploadAcademicTranscript";
import WidgetFileUpload from "../../Components/StudentPortalComp/WidgetFileUpload";
import WidgetAchievement from "../../Components/StudentPortalComp/Widget/WidgetAchievement";
import defaultProfilePic from "../../assets/StudentPortalAssets/sampleprofile.png";

const SchoolViewApplicantDetail = () => {
  // Get the studentId from the URL parameters
  const { applicantID } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const token = localStorage.getItem("token");
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courseDetail, setCourseDetail] = useState("");
  const [courseName, setCourseName] = useState("");

  const [studentPic, setStudentPic] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [ic, setIc] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  const [contact, setContact] = useState(null);
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState(null);

  const [coCurriculum, setCoCurriculum] = useState(null);
  const [achievements, setAchievements] = useState(null);
  const [yourInfoAchievement, setYourInfoAchievement] = useState(null);

  const [activeTab, setActiveTab] = useState("accept-reject");

  //academic
  const [selectedCategory, setSelectedCategory] = useState();
  const [transcriptCategories, setTranscriptCategories] = useState([]);
  const [cgpaInfo, setCgpaInfo] = useState(null);
  const [transcriptSubjects, setTranscriptSubjects] = useState([]);

  //document
  const [academicTranscripts, setAcademicTranscripts] = useState(null);
  const [otherDocuments, setOtherDocuments] = useState(null);
  const [totalDocumentCount, setTotalDocumentCount] = useState(null);
  const [activeDocumentTab, setActiveDocumentTab] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [paginationInfo, setPaginationInfo] = useState({
    academicTranscripts: {},
    achievements: {},
    otherDocuments: {},
  });
  const [currentPage, setCurrentPage] = useState({
    academicTranscripts: 1,
    achievements: 1,
    otherDocuments: 1,
  });
  const [itemsPerPage, setItemsPerPage] = useState(10);

  //count
  const [academicCount, setAcademicCount] = useState(null);
  const [achievementCount, setAchievementCount] = useState(null);
  const [otherCertCount, setOtherCertCount] = useState(null);

  //model
  const [isViewAcademicTranscriptOpen, setIsViewAcademicTranscriptOpen] =
    useState(false);
  const [isViewAchievementOpen, setIsViewAchievementOpen] = useState(false);
  const [isViewOtherDocOpen, setIsViewOtherDocOpen] = useState(false);
  const [currentViewDocument, setCurrentViewDocument] = useState(null);

  //acount type
  const [accountType, setAccountType] = useState(null);

  //copytoclipboard
  const [copiedFields, setCopiedFields] = useState({
    name: false,
    icNumber: false,
    contactNumber: false,
    email: false,
    address: false
  });
  const handleBack = () => {
    navigate("/schoolPortalDashboard"); // This will go back to the previous page
  };


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


  const handleWhatsAppClick = useCallback(() => {
    if (contact && countryCode) {
      // Remove any non-digit characters from the phone number and country code
      const cleanCountryCode = countryCode.replace(/\D/g, '');
      const cleanPhoneNumber = contact.replace(/\D/g, '');

      // Construct the WhatsApp URL
      const whatsappUrl = `https://wa.me/${cleanCountryCode}${cleanPhoneNumber}`;

      // Open the URL in a new tab
      window.open(whatsappUrl, '_blank');
    } else {
      // Alert the user if the phone number is not available
      alert("WhatsApp contact information is not available for this student.");
    }
  }, [contact, countryCode]);

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

  const fetchCoCurriculum = async () => {
    if (!studentId) {
      console.log("studentId is missing, skipping API call.");
      return;
    }
    try {
      const formData = { studentId: studentId };
      //console.log("formdata", formData);
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL
        }api/school/schoolApplicantCocurriculum`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch co-curriculum activities");
      }
      const result = await response.json();
      //   console.log("cocu", result);
      if (result.success) {
        setCoCurriculum(result.data);
      } else {
        throw new Error(
          result.message || "Failed to fetch co-curriculum activities"
        );
      }
    } catch (error) {
      console.error("Error fetching co-curriculum activities:", error.message);
      setError(error.message);
    }
  };

  const fetchAchievements = async () => {
    if (!studentId) {
      console.log("studentId is missing, skipping API call.");
      return;
    }
    try {
      const formData = {
        studentId: studentId,
        paginate: "false",
      };

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/school/schoolAchievementsList`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch co-curriculum activities");
      }
      const result = await response.json();
      //   console.log("achievement", result);
      if (result.success) {
        setYourInfoAchievement(result.data);
      } else {
        throw new Error(result.message || "Failed to fetch achievement");
      }
    } catch (error) {
      console.error("Error fetching achievement:", error);
      setError(error.message);
    }
  };

  const getAchievements = async (page = 1) => {
    if (!studentId) {
      console.log("studentId is missing, skipping API call.");
      return;
    }
    try {
      const formData = {
        studentId: studentId,
        paginate: "true",
        page: page,
        per_page: itemsPerPage,
      };

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/school/schoolAchievementsList`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch achievements");
      }
      const result = await response.json();
      if (result.success) {
        setAchievements(result.data);
        setPaginationInfo(prevState => ({
          ...prevState,
          achievements: {
            currentPage: result.data.current_page,
            lastPage: result.data.last_page,
            total: result.data.total,
            perPage: result.data.per_page,
          },
        }));
      } else {
        throw new Error(result.message || "Failed to fetch achievements");
      }
    } catch (error) {
      console.error("Error fetching achievements:", error);
      setError(error.message);
    }
  };

  const getAcademicTranscript = async (page = 1) => {
    if (!studentId) {
      console.log("studentId is missing, skipping API call.");
      return;
    }
    try {
      const formData = {
        studentId: studentId,
        page: page,
        per_page: itemsPerPage,
      };
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL
        }api/school/schoolTranscriptDocumentList`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        //console.log("Error Data:", errorData["error"]);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // console.log("academic", data.data.current_page);
      setAcademicTranscripts(data.data);
      setPaginationInfo((prevState) => ({
        ...prevState,
        academicTranscripts: {
          currentPage: data.data.current_page,
          lastPage: data.data.last_page,
          total: data.data.total,
          perPage: data.data.per_page,
        },
      }));

      // console.log("academic transcript", data);
    } catch (error) {
      console.error("Failed To get Applicant Detail", error);
    }
  };


  const getOtherFileCert = async (page = 1) => {
    if (!studentId) {
      console.log("studentId is missing, skipping API call.");
      return;
    }
    try {
      const formData = {
        studentId: studentId,
        page: page,
        per_page: itemsPerPage,
      };
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/school/schoolOtherFileCertList`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setOtherDocuments(data.data);
      setPaginationInfo(prevState => ({
        ...prevState,
        otherDocuments: {
          currentPage: data.data.current_page,
          lastPage: data.data.last_page,
          total: data.data.total,
          perPage: data.data.per_page,
        },
      }));
    } catch (error) {
      console.error("Failed To get Other File Certificates", error);
    }
  };

  const handleUpgradeNow = useCallback(() => {
    navigate("/schoolPortalDashboard", { state: { showManageAccount: true } });
  }, [navigate]);

  const handleViewDocument = (document) => {
    setCurrentViewDocument(document);
    switch (activeDocumentTab) {
      case "academic":
        setIsViewAcademicTranscriptOpen(true);
        break;
      case "achievements":
        setIsViewAchievementOpen(true);
        break;
      case "other":
        setIsViewOtherDocOpen(true);
        break;
      default:
        console.error("Unknown document type");
    }
  };

  const handlePageChange = (section, page) => {
    setCurrentPage((prevState) => ({ ...prevState, [section]: page }));
    switch (section) {
      case "academicTranscripts":
        getAcademicTranscript(page);
        break;
      case "achievements":
        getAchievements(page);
        break;
      case "otherDocuments":
        getOtherFileCert(page);
        break;
    }
  };


  const renderPagination = (section) => {
    const info = paginationInfo[section];
    if (!info || !info.lastPage) return null;

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
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(section, number)}
            className={info.currentPage === number ? "active" : ""}
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

  const handleCategoryChange = (e) => {
    setSelectedCategory(parseInt(e.target.value));
  };

  //academic
  const fetchTranscriptCategories = async () => {
    if (!studentId) {
      console.log("studentId is missing, skipping API call.");
      return;
    }
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      // console.log("Fetching transcript categories...");
      //console.log("Token:", token); // Log the token (be careful with this in production)

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL
        }api/school/schoolTranscriptCategoryList`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(
          `Failed to fetch transcript categories. Status: ${response.status}`
        );
      }

      const result = await response.json();
      //console.log("Transcript categories result:", result);

      if (result.success) {
        setTranscriptCategories(result.data.data);
        if (result.data.data.length > 0) {
          setSelectedCategory(result.data.data[0].id);
        }
      } else {
        throw new Error(
          result.message || "Failed to fetch transcript categories"
        );
      }
    } catch (error) {
      console.error("Error fetching transcript categories:", error);
      setError(`Error fetching transcript categories: ${error.message}`);
      // You might want to set some default state here
      setTranscriptCategories([]);
      setSelectedCategory(null);
    }
  };
  const fetchCgpaInfo = async () => {
    if (!studentId) {
      console.log("studentId is missing, skipping API call.");
      return;
    }
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/school/schoolTranscriptCgpa`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId,
            transcriptCategory: selectedCategory,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch CGPA information");
      }

      const result = await response.json();
      if (result.success) {
        setCgpaInfo(result.data);
      } else {
        throw new Error(result.message || "Failed to fetch CGPA information");
      }
    } catch (error) {
      console.error("Error fetching CGPA information:", error);
      setError(error.message);
    }
  };
  
  const fetchTranscriptSubjects = async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const isSPM = selectedCategory === 32 || selectedCategory === 85;
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
      console.log('Transcript subjects response:', result); // Add logging for debugging

      if (result.success) {
        if (selectedCategory === 32 && result.data.spm && Array.isArray(result.data.spm.subject)) {
          setTranscriptSubjects(result.data.spm.subject);
        } else if (selectedCategory === 85 && result.data.trial && Array.isArray(result.data.trial.subject)) {
          setTranscriptSubjects(result.data.trial.subject);
        } else if (Array.isArray(result.data)) {
          setTranscriptSubjects(result.data);
        } else {
          setTranscriptSubjects([]);
        }
      } else {
        throw new Error(result.message || 'Failed to fetch transcript subjects');
      }
    } catch (error) {
      console.error('Error fetching transcript subjects:', error);
      setError(error.message);
      setTranscriptSubjects([]);
    }
  };

  const calculateOverallGrade = (subjects) => {
    if (!subjects || subjects.length === 0) {
      return "N/A";
    }
    const gradeCounts = subjects.reduce((counts, subject) => {
      const grade = subject.subject_grade || subject.higherTranscript_grade;
      counts[grade] = (counts[grade] || 0) + 1;
      return counts;
    }, {});
    const gradeOrder = [
      "A+",
      "A",
      "A-",
      "B+",
      "B",
      "B-",
      "C+",
      "C",
      "D",
      "E",
      "G",
      "F",
      "A1",
      "A2",
      "B3",
      "TH"
    ];
    let overallGrade = "";
    for (const grade of gradeOrder) {
      if (gradeCounts[grade]) {
        overallGrade += `${gradeCounts[grade]}${grade} `;
      }
    }
    return overallGrade.trim() || "N/A";
  };

  useEffect(() => {
    const storedAccountType =

      localStorage.getItem("account_type");
    setAccountType(parseInt(storedAccountType, 10));
  }, []);

  useEffect(() => {
    // Redirect to login if token is not present
    if (!token) {
      navigate("/schoolPortalLogin");
    }

    const getApplicantDetail = async () => {
      try {
        const formData = { applicantId: applicantID };
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/school/applicantDetail`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          // console.log("Error Data:", errorData["error"]);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        setStudentId(data.student_id);
        setCourseId(data.courses_id);
        setCourseName(data);
        // console.log("applicantDetail", data.student_id);
      } catch (error) {
        console.error("Failed To get Applicant Detail", error);
      }
    };

    getApplicantDetail();
    fetchTranscriptCategories();
    fetchCgpaInfo();
    fetchTranscriptSubjects();
  }, [token, navigate]); // Ensure navigate is included as a dependency

  //get studentDetail
  useEffect(
    () => {
      const getStudentDetail = async () => {
        if (!studentId) {
          console.log("studentId is missing, skipping API call.");
          return;
        }
        try {
          const formData = { studentId: studentId };
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}api/school/studentDetail`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(formData),
            }
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          // console.log("studentDetail", data.data);
          // setStudentDetail(data.data);
          setStudentPic(data.data.student_profilePic);
          setFirstName(data.data.first_name);
          setLastName(data.data.last_name);
          setIc(data.data.student_icNumber);
          setCountryCode(data.data.student_countryCode);
          setContact(data.data.student_contactNo);
          setEmail(data.data.student_email);
          setAddress(data.data.address);
        } catch (error) {
          console.error("Failed To get student Detail", error);
        }
      };
      getStudentDetail();
      getAchievements();
      if (accountType == 65) {
        fetchCoCurriculum();
        fetchAchievements();
      }
    },
    [studentId],
    accountType
  );

  //get courseDetail
  useEffect(() => {
    const getCourseDetail = async () => {
      if (!courseId) {
        console.log("courseId is missing, skipping API call.");
        return;
      }

      try {
        const formData = { courseID: courseId };
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/school/courseDetail`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          //  console.log("Error Data:", errorData["error"]);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // console.log("courseDetail", data.data);
        setCourseDetail(data.data);
      } catch (error) {
        console.error("Failed To get course Detail", error);
      }
    };
    getCourseDetail();
  }, [courseId]);

  //getDocument
  useEffect(() => {
    const getDocumentCount = async () => {
      if (!studentId) {
        console.log("studentId is missing, skipping API call.");
        return;
      }
      try {
        const formData = { studentId: studentId };
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/school/getNumberOfDocument`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          //  console.log("Error Data:", errorData["error"]);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        setTotalDocumentCount(data.data[0].totalDocument);

        setAcademicCount(data.data[0].academicCount);

        setAchievementCount(data.data[0].achievementCount);

        setOtherCertCount(data.data[0].OtherCertCount);
      } catch (error) {
        console.error("Failed To get Applicant Detail", error);
      }
    };

    getDocumentCount();
    getAcademicTranscript();
    fetchTranscriptCategories();

    getOtherFileCert();
  }, [activeTab]);
  useEffect(() => {
    if (selectedCategory) {
      fetchTranscriptSubjects();
      fetchCgpaInfo();
    }
  }, [selectedCategory]);

  //renderng academic
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
              <p className="mb-0">
                <strong>CGPA:</strong> {cgpaInfo.cgpa || "N/A"}
              </p>
            </div>
          </div>
        )}

        <div
          className="results-grid flex-grow-1 px-4"
          style={{ maxHeight: "15rem", overflowY: "auto" }}
        >
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
                  <strong>
                    {subject.subject_name || subject.highTranscript_name || ""}
                  </strong>
                </p>
                <p className="mb-0">
                  <strong>
                    {subject.subject_grade || subject.higherTranscript_grade || ""}
                  </strong>
                </p>
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
              setActiveTab("documents");
              setActiveDocumentTab("academic");
            }}
            disabled={
              accountType !== 65 ||
              !transcriptSubjects ||
              transcriptSubjects.length === 0
            }
            style={{
              color: accountType !== 65 ? "black" : "#B71A18",
            }}
          >
            View Result Slip »
          </Button>
        </div>
      </div>
    );
  };
  //rendering page fnction
  const renderDocumentsContent = () => {
    let documents = [];
    let columns = [];
    let paginationSection = "";

    switch (activeDocumentTab) {
      case "academic":
        documents = academicTranscripts?.data || [];
        columns = ["Name", "File Name", "Actions"];
        paginationSection = "academicTranscripts";
        break;
      case "achievements":
        documents = achievements?.data || [];
        columns = ["Name", "File Name", "Actions"];
        paginationSection = "achievements";
        break;
      case "other":
        documents = otherDocuments?.data || [];
        columns = ["Name", "File Name", "Actions"];
        paginationSection = "otherDocuments";
        break;
      default:
        break;
    }

    // Filter documents based on searchTerm
    const filteredDocuments = documents.filter((doc) => {
      if (activeDocumentTab === "academic") {
        const name = doc.studentMedia_name
          ? doc.studentMedia_name.toLowerCase()
          : "";
        const fileName = doc.studentMedia_location
          ? doc.studentMedia_location.toLowerCase()
          : "";
        const term = searchTerm.toLowerCase();
        return name.includes(term) || fileName.includes(term);
      } else if (activeDocumentTab === "achievements") {
        const name = doc.achievement_name
          ? doc.achievement_name.toLowerCase()
          : "";
        const fileName = doc.achievement_media
          ? doc.achievement_media.toLowerCase()
          : "";
        const term = searchTerm.toLowerCase();
        return name.includes(term) || fileName.includes(term);
      } else if (activeDocumentTab === "other") {
        const name = doc.name ? doc.name.toLowerCase() : "";
        const fileName = doc.media ? doc.media.toLowerCase() : "";
        const term = searchTerm.toLowerCase();
        return name.includes(term) || fileName.includes(term);
      }
      return false;
    });

    return (
      <div className="summary-content-yourdocument ">
        <div className="documents-content pt-2 w-100">
          <div>
            <p className="lead">
              This student has uploaded{" "}
              <span className="fw-bold">{totalDocumentCount}</span> documents.
            </p>
            <div className="document-tabs d-flex column mb-3 w-100">
              <Button
                variant="link"
                className={activeDocumentTab === "academic" ? "active" : ""}
                onClick={() => setActiveDocumentTab("academic")}
                style={{ fontSize: "1rem", whiteSpace: "nowrap" }}
              >
                Academic Transcript ({academicCount})
              </Button>
              <Button
                variant="link"
                className={activeDocumentTab === "achievements" ? "active" : ""}
                onClick={() => setActiveDocumentTab("achievements")}
                style={{ fontSize: "1rem", whiteSpace: "nowrap" }}
              >
                Achievements ({achievementCount})
              </Button>
              <Button
                variant="link"
                className={activeDocumentTab === "other" ? "active" : ""}
                onClick={() => setActiveDocumentTab("other")}
                style={{ fontSize: "1rem", whiteSpace: "nowrap" }}
              >
                Other Certificates/ Documents ({otherCertCount})
              </Button>
            </div>
            <div className="search-bar-sas mb-3 ">
              <Search size={20} style={{ color: "#9E9E9E" }} />
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
                  <th key={index} className="border-bottom p-2">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((doc, index) => (
                  <tr key={index}>
                    {activeDocumentTab === "academic" && (
                      <>
                        <td className="border-bottom p-4" data-label="Name">
                          <div className="d-flex align-items-center">
                            <FileText className="file-icon me-2" />
                            <div>
                              <div className="file-title name-restrict">
                                {doc.studentMedia_name || ""}
                              </div>
                              <div className="file-date">{doc.created_at || ""}</div>
                            </div>
                          </div>
                        </td>
                        <td
                          className="border-bottom p-2"
                          data-label="File Name"
                        >
                          {doc.studentMedia_location || ""}
                        </td>
                      </>
                    )}
                    {activeDocumentTab === "achievements" && (
                      <>
                        <td className="border-bottom p-4" data-label="Name">
                          <div className="d-flex align-items-center">
                            <FileText className="file-icon me-2" />
                            <div>
                              <div className="file-title name-restrict">
                                {doc.achievement_name || ""}
                              </div>
                              <div className="file-date">{doc.year || ""}</div>
                            </div>
                          </div>
                        </td>
                        <td
                          className="border-bottom p-2 "
                          data-label="File Name"
                        >
                          {doc.achievement_media || ""}
                        </td>
                      </>
                    )}
                    {activeDocumentTab === "other" && (
                      <>
                        <td className="border-bottom p-4" data-label="Name">
                          <div className="d-flex align-items-center">
                            <FileText className="file-icon me-2" />
                            <div>
                              <div className="file-title name-restrict">{doc.name || ""}</div>
                              <div className="file-date">{doc.created_at || ""}</div>
                            </div>
                          </div>
                        </td>
                        <td
                          className="border-bottom p-2"
                          data-label="File Name"
                        >
                          {doc.media || ""}
                        </td>
                      </>
                    )}
                    <td className="border-bottom p-2" data-label="Actions">
                      <div className="d-flex justify-content-start align-items-center">
                        <Button
                          variant="link"
                          className="p-0"
                          onClick={() => handleViewDocument(doc)}
                        >
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
        </div>
        {renderPagination(paginationSection)}

        <WidgetFileUploadAcademicTranscript
          isOpen={isViewAcademicTranscriptOpen}
          onClose={() => setIsViewAcademicTranscriptOpen(false)}
          item={currentViewDocument}
          isViewMode={true}
        />
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
      </div>
    );
  };

  //render the page
  return (
    <div className="applicant-app-container-applycourse">
      <div className="applicant-backgroundimage">
        <div className='ms-4 mt-3 d-flex mb-0 ' onClick={handleBack}>
          <ChevronLeft style={{ color: "#ad736c" }} className=" " size={30} />
          <h5 className="ms-2 mt-1" style={{ color: "#ad736c" }}>Back</h5>
        </div>
        <div className="applicant-main-content-applycourse-clone pt-5">
          <div className="application-summary-container-inside">
            <div className="application-summary-container-inside rounded">
              <div className="applicant-summary-header  border border-bottom">
                <div className="applicant-info">
                  <img src={`${import.meta.env.VITE_BASE_URL}storage/${studentPic}` || ""}
                    onError={(e) => {
                      e.target.onerror = null; // prevents looping
                      e.target.src = defaultProfilePic;
                    }}
                    className="applicant-photo me-4 ms-2 "
                    alt="Student" />
                  <div>
                    <p className="my-0 school-fontsize-1 ">{`${firstName || ""} ${lastName || ""}`}</p>
                    <p className="my-0 text-secondary mt-2"><small>Applied For:</small>
                      <span className="text-black ms-2" >
                        {courseName.course_name || ""}
                      </span>
                    </p>
                  </div>
                </div>
                <span
                  className="applicant-status-button ms-auto text-white"
                >
                  Pending Application
                </span>
                <Button className="applicant-chat-button d-flex align-items-center justify-content-center text-nowrap"
                  onClick={handleWhatsAppClick}>
                  <BsWhatsapp className="me-2 whatsapp-button text-nonwrap" size={20} />
                  Chat on WhatsApp
                </Button>
              </div>
              {/* <Col style={{ backgroundColor: "white" }}>asda</Col> */}


              <div className="summary-tabs d-flex flex-wrap px-4">
                {/* <div className={`${styles.summaryTabs} d-flex flex-wrap px-4`}> */}
                <Button
                  variant="link"
                  className={activeTab === "info" ? "active" : ""}
                  onClick={() => setActiveTab("info")}
                >
                  Your Info
                </Button>
                <Button
                  variant="link"
                  className={activeTab === "documents" ? "active" : ""}
                  onClick={() => setActiveTab("documents")}
                  disabled={accountType !== 65}
                  style={{
                    pointerEvents: accountType !== 65 ? "none" : "auto",
                    opacity: accountType !== 65 ? 0.6 : 1,
                  }}
                >
                  Your Documents
                </Button>
                <Button
                  variant="link"
                  className={activeTab === "accept-reject" ? "active" : ""}
                  onClick={() => setActiveTab("accept-reject")}
                >
                  Accept/Reject Application
                </Button>
              </div>
              {activeTab === "info" && (

                <div
                  className="summary-content"
                  style={{ backgroundColor: "white" }}
                >
                  <div className="basic-info m-3 shadow-lg p-4 rounded-5">
                    <p className="text-secondary fw-bold border-bottom border-2 pb-3">
                      Basic Information
                    </p>
                    <div className="info-grid">
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <p>
                            <strong>Student Name</strong>
                          </p>
                          <p className="d-flex align-items-center">
                            <span className="me-2">
                              {`${firstName || ''} ${lastName || ''}`.trim()}
                            </span>
                            <span
                              className="copy-icon-wrapper"
                              onClick={() => copyToClipboard(`${firstName || ''} ${lastName || ''}`.trim(), 'name')}
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
                          <p>
                            <strong>Identity Card Number</strong>
                          </p>
                          <p className="d-flex align-items-center">
                            <span className="me-2">{ic}</span>
                            <span
                              className="copy-icon-wrapper"
                              onClick={() => copyToClipboard(ic, 'icNumber')}
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
                          <p>
                            <strong>Contact Number</strong>
                          </p>
                          <p className="d-flex align-items-center">
                            <span className="me-2">
                              {`${countryCode || ''} ${contact || ''}`}
                            </span>
                            <span
                              className="copy-icon-wrapper"
                              onClick={() => copyToClipboard(`${countryCode || ''} ${contact || ''}`, 'contactNumber')}
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
                          <p>
                            <strong>Email Address</strong>
                          </p>
                          <p className="d-flex align-items-center" style={{
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word',
                            wordBreak: 'break-all'
                          }}>
                            <span className="me-2">{email}</span>
                            <span
                              className="copy-icon-wrapper"
                              onClick={() => copyToClipboard(email, 'email')}
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
                          <p>
                            <strong>Address</strong>
                          </p>
                          <p className="d-flex align-items-center">
                            <span className="me-2">{address}</span>
                            <span
                              className="copy-icon-wrapper"
                              onClick={() => copyToClipboard(address || '', 'address')}
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
                      {/* cocuriculum  */}
                      <div className="co-curriculum m-3 shadow-lg p-4 rounded-5">
                        <p className="text-secondary fw-bold border-bottom border-2 pb-3">
                          Co-curriculum
                        </p>
                        <div
                          className="activities-grid"
                          style={{ maxHeight: "20rem", overflowY: "auto" }}
                        >
                          {coCurriculum.map((activity, index) => (
                            <div
                              key={index}
                              className="activity-item d-flex flex-wrap justify-content-between align-items-start py-2"
                            >
                              <div className="col-12 col-sm-6">
                                <p className="mb-0 name-restrict">
                                  <strong>{activity.club_name || ""}</strong>
                                </p>
                                <p className="mb-0 text-muted name-restrict">
                                  {activity.location || ""}
                                </p>
                              </div>
                              <div className="col-6 col-sm-3 text-start text-sm-center">
                                <p className="mb-0">{activity.year || ""}</p>
                              </div>
                              <div className="col-6 col-sm-3 text-end sac-name-restrict">
                                <span
                                  className={`position py-1 px-2 rounded-pill`}
                                  style={getPositionStyle(activity.student_position)}
                                >
                                  {activity.student_position}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* achievement  */}
                      <div className="achievements m-3 shadow-lg p-4 rounded-5">
                        <p className="text-secondary fw-bold border-bottom border-2 pb-3">
                          Achievements
                        </p>
                        <div
                          className="achievements-grid"
                          style={{ maxHeight: "15rem", overflowY: "auto" }}
                        >
                          {yourInfoAchievement.map((achievement, index) => (
                            <div
                              key={index}
                              className="achievement-item d-flex flex-wrap justify-content-between align-items-start py-2"
                            >
                              <div className="col-12 col-sm-4">
                                <p className="mb-0 name-restrict">
                                  <strong>{achievement.achievement_name || ""}</strong>
                                </p>
                                <p className="mb-0 text-muted name-restrict">
                                  {achievement.awarded_by || ""}
                                </p>
                              </div>
                              <div className="col-6 col-sm-3 text-start text-sm-center">
                                <p className="mb-0">{achievement.date || ""}</p>
                              </div>
                              <div className="col-6 col-sm-5 text-end">
                                <span className={`position ${(achievement.title?.core_metaName?.toLowerCase() ?? '').replace(/\s+/g, '-')} py-1 px-2 rounded-pill`}>
                                  {achievement.title?.core_metaName || 'No Title'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    // Basic: Show overlay
                    <>
                      <div className="sdv-cocurriculum m-3 shadow-lg p-4 rounded-5 d-flex align-items-center justify-content-center flex-column ">
                        <img src={Lock} alt="My Image" />
                        <p className="text-center text-white mt-3 px-5">
                          This feature is locked and available only with a premium
                          account.
                        </p>
                        <div className="sdv-div-plan-button rounded-pill mt-3">
                          <button className="plan-button rounded-pill" onClick={handleUpgradeNow}>
                            Upgrade Now
                          </button>
                        </div>
                      </div>
                      <div className="sdv-achievements m-3 shadow-lg p-4 rounded-5  d-flex align-items-center justify-content-center flex-column ">
                        <img src={Lock} alt="My Image" />
                        <p className="text-center text-white mt-3 px-5">
                          This feature is locked and available only with a premium
                          account.
                        </p>
                        <div className="sdv-div-plan-button rounded-pill mt-3">
                          <button className="plan-button rounded-pill" onClick={handleUpgradeNow}>
                            Upgrade Now
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
              {activeTab === 'documents' && (
                <div className="related-documents  ">
                  {renderDocumentsContent()}
                </div>
              )}

              {activeTab === "accept-reject" ? (
                <AcceptReject applicantId={applicantID} />
              ) : null}
            </div>
          </div>

        </div>
      </div >
    </div >


  )
};

export default SchoolViewApplicantDetail;
