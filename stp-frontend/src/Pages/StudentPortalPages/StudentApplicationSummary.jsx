import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FileText, Search, Eye, ChevronDown, ChevronUp, Clock, Copy } from 'react-feather';
import { GraduationCap, CalendarCheck, BookOpenText } from 'lucide-react';
import "../../css/StudentPortalStyles/StudentApplyCourse.css";
import image1 from "../../assets/StudentAssets/University Logo/image1.jpg";
import "../../css/StudentPortalStyles/StudentButtonGroup.css";
import SpcFooter from "../../Components/StudentPortalComp/SpcFooter";
import { useParams, useNavigate } from 'react-router-dom';
import WidgetFileUploadAcademicTranscript from "../../Components/StudentPortalComp/WidgetFileUploadAcademicTranscript";
import WidgetFileUpload from "../../Components/StudentPortalComp/WidgetFileUpload";
import WidgetAchievement from "../../Components/StudentPortalComp/Widget/WidgetAchievement";
import NavButtonsSP from "../../Components/StudentPortalComp/NavButtonsSP";
import { grey } from '@mui/material/colors';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const StudentApplicationSummary = ({ }) => {
    const [activeTab, setActiveTab] = useState('info');
    const [activeDocumentTab, setActiveDocumentTab] = useState('achievements');
    const [showFullOverview, setShowFullOverview] = useState(false);
    const [showFullRequirements, setShowFullRequirements] = useState(false);
    const [selectedExam, setSelectedExam] = useState('SPM');

    // New state for basic information
    const [basicInfo, setBasicInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [coCurriculum, setCoCurriculum] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [transcriptCategories, setTranscriptCategories] = useState([]);
    const [transcriptSubjects, setTranscriptSubjects] = useState([]);
    const [courseInfo, setCourseInfo] = useState(null);
    const { courseId } = useParams();
    const [academicTranscripts, setAcademicTranscripts] = useState([]);
    const [otherDocuments, setOtherDocuments] = useState([]);
    const [isViewAcademicTranscriptOpen, setIsViewAcademicTranscriptOpen] = useState(false);
    const [isViewAchievementOpen, setIsViewAchievementOpen] = useState(false);
    const [isViewOtherDocOpen, setIsViewOtherDocOpen] = useState(false);
    const [currentViewDocument, setCurrentViewDocument] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState({
        academicTranscripts: 1,
        achievements: 1,
        otherDocuments: 1
    });
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [paginationInfo, setPaginationInfo] = useState({
        academicTranscripts: {},
        achievements: {},
        otherDocuments: {}
    });
    const navigate = useNavigate();
    useEffect(() => {
        const token =
            sessionStorage.getItem("token") || localStorage.getItem("token");
        if (!token) {
            navigate("/studentPortalLogin");
        }
    }, [navigate]);


    const calculateOverallGrade = (subjects) => {
        if (!subjects || subjects.length === 0) {
            return 'N/A';
        }

        const gradeCounts = subjects.reduce((counts, subject) => {
            const grade = subject.grade || subject.subject_grade || subject.higherTranscript_grade;
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

    useEffect(() => {
        fetchTranscriptCategories();
        fetchAchievements();
        fetchCoCurriculum();
        fetchBasicInfo();
        if (courseId) {
            fetchCourseInfo();
        } else {
            setError('No course ID provided');
        }
    }, [courseId]);

    useEffect(() => {
        if (activeTab === 'documents') {
            fetchAcademicTranscripts();
            fetchAchievementsDoc();
            fetchOtherDocuments();
        }
    }, [activeTab]);
    const generatePDF = () => {
        const doc = new jsPDF();
    
        let yOffset = 10; // Initial Y position
    
        // 1. Header
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text("Application Summary", 105, yOffset, { align: 'center' });
        yOffset += 15;
    
        // 2. Applicant Information
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text("Applicant Information", 10, yOffset);
        yOffset += 8;
    
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        const applicantInfo = [
            `Name: ${basicInfo?.firstName || ''} ${basicInfo?.lastName || ''}`,
            `Identity Card Number: ${basicInfo?.ic || 'N/A'}`,
            `Contact Number: ${basicInfo?.country_code || ''} ${basicInfo?.contact || ''}`,
            `Email Address: ${basicInfo?.email || ''}`,
            `Address: ${basicInfo?.address || ''}`
        ];
    
        applicantInfo.forEach(info => {
            doc.text(info, 10, yOffset);
            yOffset += 6;
        });
    
        yOffset += 4; // Extra space
    
        // 3. Course Information
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text("Course Information", 10, yOffset);
        yOffset += 8;
    
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        const courseInfoData = [
            `Course: ${courseInfo?.course || 'N/A'}`,
            `Qualification: ${courseInfo?.qualification || 'N/A'}`,
            `Period: ${courseInfo?.period || 'N/A'}`,
            `Mode: ${courseInfo?.mode || 'N/A'}`,
            `Intake: ${courseInfo?.intake?.join(', ') || 'N/A'}`,
            `Estimate Fee: RM ${courseInfo?.cost?.toLocaleString() || '0.00'} / year`
        ];
    
        courseInfoData.forEach(info => {
            doc.text(info, 10, yOffset);
            yOffset += 6;
        });
    
        yOffset += 4; // Extra space
    
        // 4. Summary
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text("Summary", 10, yOffset);
        yOffset += 8;
    
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        const summaryText = courseInfo?.description || 'N/A';
        doc.text(doc.splitTextToSize(summaryText, 190), 10, yOffset);
        yOffset += doc.getTextDimensions(summaryText).h + 4;
    
        // 5. Entry Requirements
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text("Entry Requirements", 10, yOffset);
        yOffset += 8;
    
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        const requirementsText = courseInfo?.requirement || 'N/A';
        doc.text(doc.splitTextToSize(requirementsText, 190), 10, yOffset);
        yOffset += doc.getTextDimensions(requirementsText).h + 4;
    
        // 6. Academic Results
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text("Academic Results", 10, yOffset);
        yOffset += 8;
    
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        const subjects = transcriptSubjects || [];
        const subjectRows = subjects.map(subject => [
            subject.name || subject.subject_name || subject.highTranscript_name || 'N/A',
            subject.grade || subject.subject_grade || subject.higherTranscript_grade || 'N/A'
        ]);
    
        doc.autoTable({
            startY: yOffset,
            head: [['Subject Name', 'Grade']],
            body: subjectRows,
            theme: 'striped',
            styles: { fontSize: 11 },
            headStyles: { fillColor: [41, 128, 185] },
        });
    
        yOffset = doc.previousAutoTable.finalY + 10;
    
        // Overall Grade (Underlined)
        const overallGrade = calculateOverallGrade(transcriptSubjects);
        doc.setFont('helvetica', 'normal');
        doc.text(`Overall Grade: `, 10, yOffset);
        doc.setFont('helvetica', 'bold');
        doc.textWithLink(`${overallGrade}`, 45, yOffset, { url: '' });
        doc.setLineWidth(0.5);
        doc.line(45, yOffset + 1, 45 + doc.getTextWidth(overallGrade), yOffset + 1); // Underline
        yOffset += 10;
    
        // 7. Co-curriculum Activities
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text("Co-curriculum Activities", 10, yOffset);
        yOffset += 8;
    
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        const coCurriculumData = coCurriculum || [];
        const coCurriculumRows = coCurriculumData.map(activity => [
            activity.club_name || 'N/A',
            activity.location || 'N/A',
            activity.year || 'N/A',
            activity.student_position || 'N/A'
        ]);
    
        doc.autoTable({
            startY: yOffset,
            head: [['Club Name', 'Location', 'Year', 'Position']],
            body: coCurriculumRows,
            theme: 'striped',
            styles: { fontSize: 11 },
            headStyles: { fillColor: [231, 76, 60] },
        });
    
        yOffset = doc.previousAutoTable.finalY + 10;
    
        // 8. Achievements
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text("Achievements", 10, yOffset);
        yOffset += 8;
    
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        const achievementsData = achievements || [];
        const achievementsRows = achievementsData.map(achievement => [
            achievement.achievement_name || 'N/A',
            achievement.awarded_by || 'N/A',
            achievement.date || 'N/A',
            achievement.title_obtained || 'N/A'
        ]);
    
        doc.autoTable({
            startY: yOffset,
            head: [['Achievement Name', 'Awarded By', 'Date', 'Title Obtained']],
            body: achievementsRows,
            theme: 'striped',
            styles: { fontSize: 11 },
            headStyles: { fillColor: [39, 174, 96] },
        });
    
        yOffset = doc.previousAutoTable.finalY + 10;
    
        // 9. Documents
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text("Documents", 10, yOffset);
        yOffset += 8;
    
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        // Combining all documents
        const allDocuments = [
            ...academicTranscripts.map(doc => ({
                type: 'Academic Transcript',
                name: doc.studentMedia_name || 'N/A',
                file: doc.studentMedia_location || 'N/A'
            })),
            ...achievements.map(doc => ({
                type: 'Achievement',
                name: doc.achievement_name || 'N/A',
                file: doc.achievement_media || 'N/A'
            })),
            ...otherDocuments.map(doc => ({
                type: 'Other Document',
                name: doc.name || 'N/A',
                file: doc.media || 'N/A'
            }))
        ];
    
        const documentRows = allDocuments.map(docItem => [
            docItem.type,
            docItem.name,
            docItem.file ? 'View Document' : 'N/A'
        ]);
    
        doc.autoTable({
            startY: yOffset,
            head: [['Document Type', 'Name', 'File']],
            body: documentRows,
            theme: 'striped',
            styles: { fontSize: 11 },
            headStyles: { fillColor: [155, 89, 182] },
            didDrawCell: (data) => {
                if (data.column.index === 2 && data.cell.text[0] !== 'N/A') {
                    const link = `${import.meta.env.VITE_BASE_URL}${allDocuments[data.row.index].file}`;
                    doc.setTextColor(0, 0, 255); // Set text color to blue
                    doc.textWithLink('View Document', data.cell.x + 2, data.cell.y + 6, { url: link });
                    doc.setTextColor(0, 0, 0); // Reset text color
                }
            }
        });
    
        // Save the PDF
        doc.save('application_summary.pdf');
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
            const url = categoryId === 32
                ? `${import.meta.env.VITE_BASE_URL}api/student/transcriptSubjectList`
                : `${import.meta.env.VITE_BASE_URL}api/student/higherTranscriptSubjectList`;
            const method = categoryId === 32 ? 'GET' : 'POST';
            const body = categoryId === 32 ? null : JSON.stringify({ id: categoryId });

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                ...(method === 'POST' && { body }),
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

    const fetchAchievementsDoc = async () => {
        try {
            const token = sessionStorage.getItem('token') || localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/achievementsList`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch achievements');
            }
            const result = await response.json();
            if (result.success) {
                setAchievements(result.data.data);
            } else {
                throw new Error(result.message || 'Failed to fetch achievements');
            }
        } catch (error) {
            console.error('Error fetching achievements:', error);
            setError(error.message);
        }
    };



    const fetchCoCurriculum = async () => {
        try {
            const token = sessionStorage.getItem('token') || localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/co-curriculumList`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch co-curriculum activities');
            }
            const result = await response.json();
            if (result.success) {
                setCoCurriculum(result.data);
            } else {
                throw new Error(result.message || 'Failed to fetch co-curriculum activities');
            }
        } catch (error) {
            console.error('Error fetching co-curriculum activities:', error);
            setError(error.message);
        }
    };


    const fetchBasicInfo = async () => {
        setIsLoading(true);
        try {
            const token = sessionStorage.getItem('token') || localStorage.getItem('token');
            const id = sessionStorage.getItem('id') || localStorage.getItem('id');
            if (!id) {
                setError('User ID not found. Please log in again.');
                setIsLoading(false);
                return;
            }
            const url = `${import.meta.env.VITE_BASE_URL}api/student/studentDetail?id=${id}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id })
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch student details. Status: ${response.status}`);
            }
            const responseData = await response.json();
            console.log('Fetched student data:', responseData);
            if (!responseData.data || Object.keys(responseData.data).length === 0) {
                throw new Error('No data received from the server. Your profile might be incomplete.');
            }
            if (responseData.data) {
                setBasicInfo(responseData.data);
            }
        } catch (err) {
            console.error('Error in fetchBasicInfo:', err.message);
            setError(err.message || 'Error fetching student details. Please try logging out and back in.');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCourseInfo = async () => {
        setIsLoading(true);
        try {
            const token = sessionStorage.getItem('token') || localStorage.getItem('token');
            console.log('Fetching course info for courseId:', courseId);
            console.log('Using token:', token);
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/courseDetail`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: courseId })
            });
            const result = await response.json();

            console.log('API response:', result);

            if (!response.ok) {
                throw new Error(result.message || `HTTP error! status: ${response.status}`);
            }

            if (result.success) {
                setCourseInfo(result.data);
            } else {
                throw new Error(result.message || 'Failed to fetch course information');
            }
        } catch (error) {
            console.error('Error fetching course information:', error);
            setError(`Failed to fetch course information: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAcademicTranscripts = async (page = 1) => {
        try {
            const token = sessionStorage.getItem("token") || localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/mediaListByCategory`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    page: page,
                    per_page: itemsPerPage
                }),
            });
            const data = await response.json();
            if (data.success) {
                setAcademicTranscripts(data.data.data);
                setPaginationInfo(prevState => ({
                    ...prevState,
                    academicTranscripts: {
                        currentPage: data.data.current_page,
                        lastPage: data.data.last_page,
                        total: data.data.total,
                        perPage: data.data.per_page
                    }
                }));
            }
        } catch (error) {
            console.error('Error fetching academic transcripts:', error);
        }
    };

    const fetchAchievements = async (page = 1) => {
        try {
            const token = sessionStorage.getItem("token") || localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/achievementsList`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    page: page,
                    per_page: itemsPerPage
                }),
            });
            const data = await response.json();
            if (data.success) {
                setAchievements(data.data.data);
                setPaginationInfo(prevState => ({
                    ...prevState,
                    achievements: {
                        currentPage: data.data.current_page,
                        lastPage: data.data.last_page,
                        total: data.data.total,
                        perPage: data.data.per_page
                    }
                }));
            }
        } catch (error) {
            console.error('Error fetching achievements:', error);
        }
    };

    const fetchOtherDocuments = async (page = 1) => {
        try {
            const token = sessionStorage.getItem("token") || localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/otherFileCertList`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    page: page,
                    per_page: itemsPerPage
                }),
            });
            const data = await response.json();
            if (data.success) {
                setOtherDocuments(data.data.data);
                setPaginationInfo(prevState => ({
                    ...prevState,
                    otherDocuments: {
                        currentPage: data.data.current_page,
                        lastPage: data.data.last_page,
                        total: data.data.total,
                        perPage: data.data.per_page
                    }
                }));
            }
        } catch (error) {
            console.error('Error fetching other documents:', error);
        }
    };


    useEffect(() => {
        if (activeTab === 'documents') {
            fetchAcademicTranscripts(currentPage.academicTranscripts);
            fetchAchievements(currentPage.achievements);
            fetchOtherDocuments(currentPage.otherDocuments);
        }
    }, [activeTab, itemsPerPage]);

    const handlePageChange = (section, page) => {
        setCurrentPage(prevState => ({ ...prevState, [section]: page }));
        switch (section) {
            case 'academicTranscripts':
                fetchAcademicTranscripts(page);
                break;
            case 'achievements':
                fetchAchievements(page);
                break;
            case 'otherDocuments':
                fetchOtherDocuments(page);
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
                <button onClick={() => handlePageChange(section, info.currentPage - 1)} disabled={info.currentPage === 1}>
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
                <button onClick={() => handlePageChange(section, info.currentPage + 1)} disabled={info.currentPage === info.lastPage}>
                    &gt;
                </button>
            </div>
        );
    };



    const handleExamChange = (e) => {
        const newExamId = e.target.value;
        setSelectedExam(newExamId);
        fetchTranscriptSubjects(parseInt(newExamId));
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

    const renderDocumentsContent = () => {
        // Calculate total document count
        const totalDocumentCount = academicTranscripts.length + achievements.length + otherDocuments.length;

        let documents = [];
        let columns = [];
        let paginationSection = '';


        switch (activeDocumentTab) {
            case 'academic':
                documents = academicTranscripts;
                columns = ['Name', 'File Name', 'Actions'];
                paginationSection = 'academicTranscripts';
                break;
            case 'achievements':
                documents = achievements;
                columns = ['Name', 'File Name', 'Actions'];
                paginationSection = 'achievements';
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
            if (activeDocumentTab === 'academic') {
                const name = doc.studentMedia_name ? doc.studentMedia_name.toLowerCase() : '';
                const fileName = doc.studentMedia_location ? doc.studentMedia_location.toLowerCase() : '';
                const term = searchTerm.toLowerCase();
                return name.includes(term) || fileName.includes(term);
            } else if (activeDocumentTab === 'achievements') {
                const name = doc.achievement_name ? doc.achievement_name.toLowerCase() : '';
                const fileName = doc.achievement_media ? doc.achievement_media.toLowerCase() : '';
                const term = searchTerm.toLowerCase();
                return name.includes(term) || fileName.includes(term);
            } else if (activeDocumentTab === 'other') {
                const name = doc.name ? doc.name.toLowerCase() : '';
                const fileName = doc.media ? doc.media.toLowerCase() : '';
                const term = searchTerm.toLowerCase();
                return name.includes(term) || fileName.includes(term);
            }
            return false;
        });

        return (
            <div className="summary-content-yourdocument">
                <div className="documents-content pt-2 w-100">
                    <div>
                        <p className='lead'>You have uploaded <span className="fw-bold">{totalDocumentCount}</span> documents.</p>
                        <div className="document-tabs d-flex column mb-3 w-100">
                            <Button
                                variant="link"
                                className={activeDocumentTab === 'academic' ? 'active' : ''}
                                onClick={() => setActiveDocumentTab('academic')}
                                style={{ fontSize: '1rem', whiteSpace: 'nowrap' }}
                            >
                                Academic Transcript ({academicTranscripts.length})
                            </Button>
                            <Button
                                variant="link"
                                className={activeDocumentTab === 'achievements' ? 'active' : ''}
                                onClick={() => setActiveDocumentTab('achievements')}
                                style={{ fontSize: '1rem', whiteSpace: 'nowrap' }}
                            >
                                Achievements ({achievements.length})
                            </Button>
                            <Button
                                variant="link"
                                className={activeDocumentTab === 'other' ? 'active' : ''}
                                onClick={() => setActiveDocumentTab('other')}
                                style={{ fontSize: '1rem', whiteSpace: 'nowrap' }}
                            >
                                Other Certificates/ Documents ({otherDocuments.length})
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
                                                            <div className="file-title">{doc.studentMedia_name}</div>
                                                            <div className="file-date">{doc.created_at}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="border-bottom p-2" data-label="File Name">{doc.studentMedia_location}</td>
                                            </>
                                        )}
                                        {activeDocumentTab === 'achievements' && (
                                            <>
                                                <td className="border-bottom p-4" data-label="Name">
                                                    <div className="d-flex align-items-center">
                                                        <FileText className="file-icon me-2" />
                                                        <div>
                                                            <div className="file-title">{doc.achievement_name}</div>
                                                            <div className="file-date">{doc.year}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="border-bottom p-2 " data-label="File Name">{doc.achievement_media}</td>
                                            </>
                                        )}
                                        {activeDocumentTab === 'other' && (
                                            <>
                                                <td className="border-bottom p-4" data-label="Name">
                                                    <div className="d-flex align-items-center">
                                                        <FileText className="file-icon me-2" />
                                                        <div>
                                                            <div className="file-title">{doc.name}</div>
                                                            <div className="file-date">{doc.created_at}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="border-bottom p-2" data-label="File Name">{doc.media}</td>
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
    const renderCourseInformation = () => {
        if (!courseInfo) {
            return <div>Loading course information...</div>;
        }

        return (
            <div className="summary-content-course-info">
                <div className="school-info text-center" style={{ margin: '0 0' }}>
                    <div className="school-logo-name">
                        <img src={`${import.meta.env.VITE_BASE_URL}storage/${courseInfo.logo}`} className="sas-school-logo" alt="School Logo" />
                        <p className="sac-school-name">{courseInfo.school}</p>
                    </div>
                    <Button className="mx-auto mt-5 w-25 as-knowmore-button" style={{ padding: '0.5rem 1.5rem', fontSize: '1rem' }}>Know More</Button>
                </div>

                <div className="bg-white mt-3 rounded-1 shadow px-4 pb-1 pt-3 ">
                    <p className="sas-coursename">{courseInfo.course}</p>
                </div>
                <div className="bg-white p-4 mb-1 rounded-1 shadow mt-3">
                    <h5 className="fw-bold mb-3">Summary</h5>
                    <div className="d-flex flex-wrap">
                        <div className="col-6 mb-3">
                            <div className="d-flex align-items-center">
                                <GraduationCap size={16} className="me-2" />
                                <span className="summary-label sas-summarytext">{courseInfo.qualification || 'N/A'}</span>
                            </div>
                        </div>
                        <div className="col-6 mb-3">
                            <div className="d-flex align-items-center">
                                <Clock size={16} className="me-2" />
                                <span className="sas-summarytext">{courseInfo.period}</span>
                            </div>
                        </div>
                        <div className="col-6 mb-3">
                            <div className="d-flex align-items-center">
                                <CalendarCheck size={16} className="me-2" />
                                <span className="summary-label sas-summarytext">{courseInfo.mode}</span>
                            </div>
                        </div>
                        <div className="col-6 mb-3">
                            <div className="d-flex align-items-center">
                                <BookOpenText size={16} className="me-2" />
                                <span className="sas-summarytext">{courseInfo.intake.join(', ')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-between align-item-center bg-white p-4 mb-1 rounded-1 shadow mt-3">
                    <h5 className="fw-bold">Estimate Fee</h5>
                    <span className='lead'> <strong>RM</strong> {courseInfo.cost.toLocaleString()} / year</span>
                </div>

                <div className="bg-white p-4 mb-1 rounded-1 shadow-lg mt-3">
                    <h5 className="fw-bold mb-3">Course Overview</h5>
                    <div className={`overview-content ${showFullOverview ? 'expanded' : ''}`}>
                        <p className="sas-summarytext">{courseInfo.description}</p>
                    </div>
                    <div className="text-center">
                        <Button variant="link" onClick={() => setShowFullOverview(!showFullOverview)}>
                            {showFullOverview ? 'View Less' : 'View More'} {showFullOverview ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </Button>
                    </div>
                </div>

                <div className="entry-requirements bg-white p-4 mb-1 rounded-1 shadow-lg mt-3">
                    <h5 className="fw-bold mb-3">Entry Requirement</h5>
                    <div className={`requirements-content ${showFullRequirements ? 'expanded' : ''}`}>
                        <p className="sas-summarytext"> {courseInfo.requirement}</p>
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
        <div className="app-container-applycourse ">
            <NavButtonsSP />
            <div className="main-content-applycourse-clone">
                <div className="backgroundimage">
                    <div className="application-summary-container">
                        <div className="bg-white  mb-4 px-4 pt-2"><p className="summary-title">Application Summary</p></div>
                        <div className="application-summary-container-inside rounded ">
                            <div className="summary-header py-4 px-4 border border-bottom">
                                <div className="applicant-info">
                                    <img src={`${import.meta.env.VITE_BASE_URL}storage/${basicInfo?.profilePic}`} className="applicant-photo me-4 ms-2  bg-black" />
                                    <div>
                                        <p className="my-0 fw-bold ">{`${basicInfo?.firstName || ''} ${basicInfo?.lastName || ''}`.trim()}</p>
                                        <p className="my-0 text-secondary  mt-2">Applied For: <span className=" text-black ms-2">{courseInfo?.course}</span></p>
                                    </div>
                                </div>
                                <Button className="sac-submit-button px-4" onClick={generatePDF}>
                                    Print Summary
                                </Button>
                            </div>
                            <div className="summary-tabs d-flex flex-wrap px-4">
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
                                                        <p>{`${basicInfo?.firstName || ''} ${basicInfo?.lastName || ''}`.trim()} <Copy size={16} className="cursor-pointer" onClick={() => copyToClipboard(`${basicInfo?.firstName || ''} ${basicInfo?.lastName || ''}`.trim() || '')} /></p>
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <p><strong>Identity Card Number</strong></p>
                                                        <p>{basicInfo?.ic} <Copy size={16} className="cursor-pointer" onClick={() => copyToClipboard(basicInfo?.ic || '')} /></p>
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <p><strong>Contact Number</strong></p>
                                                        <p>{`${basicInfo?.country_code || ''} ${basicInfo?.contact || ''}`} <Copy size={16} className="cursor-pointer" onClick={() => copyToClipboard(`${basicInfo?.country_code || ''} ${basicInfo?.contact || ''}`)} /></p>
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <p><strong>Email Address</strong></p>
                                                        <p>{basicInfo?.email} <Copy size={16} className="cursor-pointer" onClick={() => copyToClipboard(basicInfo?.email || '')} /></p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <p><strong>Address</strong></p>
                                                        <p>{basicInfo?.address} <Copy size={16} className="cursor-pointer" onClick={() => copyToClipboard(basicInfo?.address || '')} /></p>
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
                                                    {transcriptCategories.map((category) => (
                                                        <option key={category.id} value={category.id}>
                                                            {category.transcript_category}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="results-grid flex-grow-1 px-4 " style={{ maxHeight: '15rem', overflowY: 'auto' }}>
                                                {transcriptSubjects && transcriptSubjects.length > 0 ? (
                                                    transcriptSubjects.map((subject, index) => (
                                                        <div key={index} className="d-flex justify-content-between py-3">
                                                            <p className="mb-0"><strong>{subject.name || subject.subject_name || subject.highTranscript_name}</strong></p>
                                                            <p className="mb-0 "><strong>{subject.grade || subject.subject_grade || subject.higherTranscript_grade}</strong></p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="d-flex justify-content-between py-3">
                                                        <p >No results available for this transcript.</p>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="grade-summary d-flex justify-content-between align-items-stretch border-top">
                                                <div className="overall-grade text-white w-75 d-flex justify-content-start">
                                                    <h3 className="align-self-center px-5">
                                                        Grade: {calculateOverallGrade(transcriptSubjects)}
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
                                        </div>

                                        <div className="co-curriculum m-3 shadow-lg p-4 rounded-5">
                                            <p className="text-secondary fw-bold border-bottom border-2 pb-3">Co-curriculum</p>
                                            <div className="activities-grid" style={{ maxHeight: '15rem', overflowY: 'auto' }}>
                                                {coCurriculum.map((activity, index) => (
                                                    <div key={index} className="activity-item d-flex flex-wrap justify-content-between align-items-start py-2">
                                                        <div className="col-12 col-sm-6">
                                                            <p className="mb-0"><strong>{activity.club_name}</strong></p>
                                                            <p className="mb-0 text-muted">{activity.location}</p>
                                                        </div>
                                                        <div className="col-6 col-sm-3 text-start text-sm-center">
                                                            <p className="mb-0">{activity.year}</p>
                                                        </div>
                                                        <div className="col-6 col-sm-3 text-end">
                                                            <span className={`position ${activity.student_position.toLowerCase()} py-1 px-2 rounded-pill`}>{activity.student_position}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="achievements m-3 shadow-lg p-4 rounded-5">
                                            <p className="text-secondary fw-bold border-bottom border-2 pb-3">Achievements</p>
                                            <div className="achievements-grid" style={{ maxHeight: '15rem', overflowY: 'auto' }}>
                                                {achievements.map((achievement, index) => (
                                                    <div key={index} className="achievement-item d-flex flex-wrap justify-content-between align-items-start py-2">
                                                        <div className="col-12 col-sm-6">
                                                            <p className="mb-0"><strong>{achievement.achievement_name}</strong></p>
                                                            <p className="mb-0 text-muted">{achievement.awarded_by}</p>
                                                        </div>
                                                        <div className="col-6 col-sm-3 text-start text-sm-center">
                                                            <p className="mb-0">{achievement.date}</p>
                                                        </div>
                                                        <div className="col-6 col-sm-3 text-end">
                                                            <span className={`position ${achievement.title_obtained.toLowerCase().replace(/\s+/g, '-')} py-1 px-2 rounded-pill`}>{achievement.title_obtained}</span>
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
            <SpcFooter />
        </div>

    );
};

export default StudentApplicationSummary;                                           