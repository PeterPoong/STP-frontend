import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import defaultProfilePic from "../../assets/StudentPortalAssets/sampleprofile.png";
import defaultSchoolPic from "../../assets/StudentPortalAssets/defaulschool.png";
import {
  FileText,
  Search,
  Eye,
  ChevronDown,
  ChevronUp,
  Clock,
  Copy,
} from "react-feather";
import { GraduationCap, CalendarCheck, BookOpenText } from "lucide-react";
import "../../css/StudentPortalStyles/StudentApplyCourse.css";
import image1 from "../../assets/StudentAssets/University Logo/image1.jpg";
import "../../css/StudentPortalStyles/StudentButtonGroup.css";
import SpcFooter from "../../Components/StudentPortalComp/SpcFooter";
import { useParams, useNavigate } from "react-router-dom";
import WidgetFileUploadAcademicTranscript from "../../Components/StudentPortalComp/WidgetFileUploadAcademicTranscript";
import WidgetFileUpload from "../../Components/StudentPortalComp/WidgetFileUpload";
import WidgetAchievement from "../../Components/StudentPortalComp/Widget/WidgetAchievement";
import NavButtonsSP from "../../Components/StudentPortalComp/NavButtonsSP";
import { grey } from "@mui/material/colors";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { PDFDocument } from "pdf-lib";

const StudentApplicationSummary = ({ }) => {
  const [activeTab, setActiveTab] = useState("info");
  const [activeDocumentTab, setActiveDocumentTab] = useState("achievements");
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [showFullRequirements, setShowFullRequirements] = useState(false);
  const [selectedExam, setSelectedExam] = useState("SPM");
  const [cgpaInfo, setCgpaInfo] = useState(null);
  const [schoolId, setSchoolId] = useState(null);
  const [isFetchingSchoolId, setIsFetchingSchoolId] = useState(false);
  const [schoolIdError, setSchoolIdError] = useState(null);
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
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState({
    academicTranscripts: 1,
    achievements: 1,
    otherDocuments: 1,
  });
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [paginationInfo, setPaginationInfo] = useState({
    academicTranscripts: {},
    achievements: {},
    otherDocuments: {},
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
      return "N/A";
    }

    const gradeCounts = subjects.reduce((counts, subject) => {
      const grade =
        subject.grade ||
        subject.subject_grade ||
        subject.higherTranscript_grade;
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
    fetchTranscriptCategories();
    fetchAchievements();
    fetchCoCurriculum();
    fetchBasicInfo();
    if (courseId) {
      fetchCourseInfo();
    } else {
      setError("No course ID provided");
    }
  }, [courseId]);

  useEffect(() => {
    if (activeTab === "documents") {
      fetchAcademicTranscripts();
      fetchAchievementsDoc();
      fetchOtherDocuments();
    }
  }, [activeTab]);

  const generateEnhancedPDF = async () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yOffset = 30; // Start yOffset below the header

    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    // Load the logo image once
    let logoImage = null;
    if (courseInfo?.logo) {
      try {
        const img = new Image();
        img.src = `${import.meta.env.VITE_BASE_URL}storage/${courseInfo.logo}`;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        logoImage = img;
      } catch (error) {
        console.error("Error loading school logo:", error);
        // Load the default profile picture instead
        try {
          const defaultImg = new Image();
          defaultImg.src = defaultSchoolPic;
          await new Promise((resolve, reject) => {
            defaultImg.onload = resolve;
            defaultImg.onerror = reject;
          });
          logoImage = defaultImg;
        } catch (defaultError) {
          console.error("Error loading default profile picture:", defaultError);
          logoImage = null;
        }
      }
    } else {
      // If no logo is specified, load the default profile picture
      try {
        const defaultImg = new Image();
        defaultImg.src = defaultSchoolPic;
        await new Promise((resolve, reject) => {
          defaultImg.onload = resolve;
          defaultImg.onerror = reject;
        });
        logoImage = defaultImg;
      } catch (defaultError) {
        console.error("Error loading default profile picture:", defaultError);
        logoImage = null;
      }
    }

    // Helper functions
    const addHeader = () => {
      // Clear the top margin
      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, pageWidth, 20, "F");

      let logoHeight = 0;

      // Add the school logo centered above the title
      if (logoImage) {
        const imgWidth = 30;
        const imgHeight = (logoImage.height * imgWidth) / logoImage.width;
        doc.addImage(
          logoImage,
          "PNG",
          (pageWidth - imgWidth) / 2,
          10,
          imgWidth,
          imgHeight
        );
        logoHeight = imgHeight;
      }

      // Adjust yOffset to add margin below the logo
      yOffset = 5 + logoHeight + 5; // 10 is logo y position, plus logo height, plus 10 units margin


      // Add School Name and Course Name
      yOffset += 6;
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 18, 52); // Color #FF1234
      doc.text(courseInfo?.school || "School Name", pageWidth / 2, yOffset, {
        align: "center",
      });

      yOffset += 6;
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0); // Reset text color to black
      doc.text(courseInfo?.course || "Course Name", pageWidth / 2, yOffset, {
        align: "center",
      });

      yOffset += 10; // Add more space after header
      // Add Application Summary title centered
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("Application Summary", pageWidth / 2, yOffset, {
        align: "center",
      });

      // Add underline after Application Summary
      yOffset += 4;
      doc.setLineWidth(0.5);
      doc.line(20, yOffset, pageWidth - 20, yOffset);


    };

    const addFooter = () => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const pageNum = doc.internal.getCurrentPageInfo().pageNumber;
      doc.text(`Page ${pageNum}`, pageWidth / 2, pageHeight - 10, {
        align: "center",
      });
    };

    const checkPageBreak = (additionalHeight = 0) => {
      if (yOffset + additionalHeight > pageHeight - 20) {
        doc.addPage();
        yOffset = 30; // Reset yOffset for new page below header
        addHeader();
        addFooter();
      }
    };

    const forcePageBreak = () => {
      doc.addPage();
      yOffset = 30;
      addHeader();
      addFooter();
    };

    const addSectionTitle = (title) => {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      yOffset += 10;
      doc.text(title, 20, yOffset); // Align with table left margin
      yOffset += 6;
    };

    // Start generating PDF
    addHeader();
    addFooter();

    try {
      // 1. Applicant Information
      addSectionTitle("Applicant Information");

      const applicantInfo = [
        {
          key: "Name",
          value: `${basicInfo?.firstName || ""} ${basicInfo?.lastName || ""}`,
        },
        { key: "Identity Card Number", value: basicInfo?.ic || "N/A" },
        {
          key: "Contact Number",
          value: `${basicInfo?.country_code || ""} ${basicInfo?.contact || ""}`,
        },
        { key: "Email Address", value: basicInfo?.email || "N/A" },
        { key: "Address", value: basicInfo?.address || "N/A" },
      ];

      // Create a table for applicant information with background color for the first column
      doc.autoTable({
        startY: yOffset,
        theme: "grid",
        body: applicantInfo.map((info) => [info.key, info.value]),
        styles: { fontSize: 12 },
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
          halign: "center",
        },
        bodyStyles: { valign: "middle" },
        columnStyles: {
          0: {
            cellWidth: 60,
            fontStyle: "bold",
            fillColor: [220, 220, 220],
            halign: "left",
          },
          1: { cellWidth: pageWidth - 80, halign: "left" },
        },
        margin: { left: 10, right: 10 },
        didDrawPage: (data) => {
          yOffset = data.cursor.y;
          addHeader();
          addFooter();
        },
      });
      yOffset = doc.previousAutoTable.finalY + 10;

      // 2. Course Information
      addSectionTitle("Course Information");

      const courseInfoData = [
        { key: "Course", value: courseInfo?.course || "N/A" },
        { key: "Qualification", value: courseInfo?.qualification || "N/A" },
        { key: "Period", value: courseInfo?.period || "N/A" },
        { key: "Mode", value: courseInfo?.mode || "N/A" },
        { key: "Intake", value: courseInfo?.intake?.join(", ") || "N/A" },
        {
          key: "Estimate Fee",
          value: `RM ${courseInfo?.cost?.toLocaleString() || "0.00"} / year`,
        },
        { key: "Summary", value: courseInfo?.description || "N/A" },
        { key: "Entry Requirements", value: courseInfo?.requirement || "N/A" },
      ];

      // Create a table for course information with background color for the first column
      doc.autoTable({
        startY: yOffset,
        theme: "grid",
        body: courseInfoData.map((info) => [info.key, info.value]),
        styles: { fontSize: 12 },
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
          halign: "center",
        },
        bodyStyles: { valign: "middle" },
        columnStyles: {
          0: {
            cellWidth: 60,
            fontStyle: "bold",
            fillColor: [220, 220, 220],
            halign: "left",
          },
          1: { cellWidth: pageWidth - 80, halign: "left" },
        },
        margin: { left: 10, right: 10 },
        didDrawPage: (data) => {
          yOffset = data.cursor.y;
          addHeader();
          addFooter();
        },
        // Custom cell rendering to handle multi-line text
        didParseCell: (data) => {
          if (
            data.cell.raw === courseInfo?.description ||
            data.cell.raw === courseInfo?.requirement
          ) {
            data.cell.styles.cellPadding = 4;
            data.cell.styles.fontSize = 11;
            data.cell.styles.valign = "top";
          }
        },
      });
      yOffset = doc.previousAutoTable.finalY + 10;

      // Force new page after Applicant Information and Course Information
      forcePageBreak();

      // 3. Academic Results
      addSectionTitle("Academic Results");

      for (const category of transcriptCategories) {
        checkPageBreak(20);
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("\u2022 " + category.transcript_category, 20, yOffset); // Add bullet before category
        yOffset += 6;

        const tableBody = [];
        let includeProgramInfo = false;

        // CGPA and Program Name for non-SPM categories
        if (category.id !== 32) {
          const cgpaInfo = await fetchCGPAForCategory(category, token);
          if (cgpaInfo.cgpa !== null || cgpaInfo.programName) {
            includeProgramInfo = true;
            if (cgpaInfo.programName) {
              // Add Program Name to table
              tableBody.push({
                isProgramInfo: true,
                data: ["Program Name", cgpaInfo.programName],
              });
            }
            if (cgpaInfo.cgpa !== null) {
              // Add CGPA to table
              tableBody.push({
                isProgramInfo: true,
                data: ["CGPA", cgpaInfo.cgpa],
              });
            }
          }
        }
        const parseHTML = (html) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          return doc.body.textContent || "";
        };

        // Add header row for subjects
        tableBody.push({ isHeader: true, data: ["Subject Name", "Grade"] });

        const subjects = await fetchTranscriptSubjectsForPDF(category.id);

        if (subjects && subjects.length > 0) {
          subjects.forEach((subject) => {
            tableBody.push({
              isSubject: true,
              data: [
                subject.name ||
                subject.subject_name ||
                subject.highTranscript_name ||
                "N/A",
                subject.grade ||
                subject.subject_grade ||
                subject.higherTranscript_grade ||
                "N/A",
              ],
            });
          });

          checkPageBreak(30);
          doc.autoTable({
            startY: yOffset,
            body: tableBody.map((row) => row.data),
            theme: "grid",
            styles: { fontSize: 10 },
            margin: { left: 20, right: 20 },
            columnStyles: {
              0: { cellWidth: pageWidth - 70, halign: "left" },
              1: { cellWidth: 30, halign: "center" },
            },
            didParseCell: (data) => {
              const row = tableBody[data.row.index];
              if (row.isProgramInfo) {
                data.cell.styles.fontStyle = "bold";
                data.cell.styles.fillColor = [220, 220, 220];
                data.cell.styles.halign = "left";
              } else if (row.isHeader) {
                data.cell.styles.fontStyle = "bold";
                data.cell.styles.fillColor = [41, 128, 185];
                data.cell.styles.textColor = [255, 255, 255];
                data.cell.styles.halign = "center";
              } else if (row.isSubject) {
                data.cell.styles.halign =
                  data.column.index === 0 ? "left" : "center";
              }
            },
            didDrawPage: (data) => {
              yOffset = data.cursor.y;
              addHeader();
              addFooter();
            },
          });
          yOffset = doc.previousAutoTable.finalY + 10;
        } else {
          checkPageBreak(10);
          doc.setFontSize(12);
          doc.setFont("helvetica", "normal");
          doc.text("No subjects available for this category.", 25, yOffset);
          yOffset += 6;
        }
      }

      // Force new page after Academic Results
      forcePageBreak();

      // 4. Co-curriculum Activities
      addSectionTitle("Co-curriculum Activities");

      if (coCurriculum.length > 0) {
        checkPageBreak(30);
        doc.autoTable({
          startY: yOffset,
          head: [["Club Name", "Location", "Year", "Position"]],
          body: coCurriculum.map((activity) => [
            activity.club_name || "N/A",
            activity.location || "N/A",
            activity.year || "N/A",
            activity.student_position || "N/A",
          ]),
          theme: "grid",
          styles: { fontSize: 10 },
          headStyles: {
            fillColor: [231, 76, 60],
            textColor: 255,
            halign: "center",
          },
          bodyStyles: { halign: "center" },
          columnStyles: {
            0: { cellWidth: 50, halign: "left" },
            1: { cellWidth: 50, halign: "left" },
            2: { cellWidth: 30, halign: "center" },
            3: { cellWidth: 30, halign: "center" },
          },
          margin: { left: 20, right: 20 },
          didDrawPage: (data) => {
            yOffset = data.cursor.y;
            addHeader();
            addFooter();
          },
        });
        yOffset = doc.previousAutoTable.finalY + 10;
      } else {
        checkPageBreak(10);
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text("No co-curriculum activities available.", 25, yOffset);
        yOffset += 6;
      }

      // 5. Achievements
      addSectionTitle("Achievements");

      if (achievements.length > 0) {
        checkPageBreak(30);
        doc.autoTable({
          startY: yOffset,
          head: [["Achievement Name", "Awarded By", "Date", "Title Obtained"]],
          body: achievements.map((achievement) => [
            achievement.achievement_name || "N/A",
            achievement.awarded_by || "N/A",
            achievement.date || "N/A",
            achievement.title_obtained || "N/A",
          ]),
          theme: "grid",
          styles: { fontSize: 10 },
          headStyles: {
            fillColor: [39, 174, 96],
            textColor: 255,
            halign: "center",
          },
          bodyStyles: { halign: "center" },
          columnStyles: {
            0: { cellWidth: 50, halign: "left" },
            1: { cellWidth: 50, halign: "left" },
            2: { cellWidth: 30, halign: "center" },
            3: { cellWidth: 30, halign: "center" },
          },
          margin: { left: 20, right: 20 },
          didDrawPage: (data) => {
            yOffset = data.cursor.y;
            addHeader();
            addFooter();
          },
        });
        yOffset = doc.previousAutoTable.finalY + 10;
      } else {
        checkPageBreak(10);
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text("No achievements available.", 25, yOffset);
        yOffset += 6;
      }

      // Force new page before Documents
      forcePageBreak();

      // 6. Documents
      addSectionTitle("Documents");

      const allDocuments = [
        ...academicTranscripts.map((doc) => ({
          type: "Academic Transcript",
          name: doc.studentMedia_name,
          file: doc.studentMedia_location,
        })),
        ...achievements.map((doc) => ({
          type: "Achievement",
          name: doc.achievement_name,
          file: doc.achievement_media,
        })),
        ...otherDocuments.map((doc) => ({
          type: "Other Document",
          name: doc.name,
          file: doc.media,
        })),
      ];

      if (allDocuments.length > 0) {
        for (const document of allDocuments) {
          checkPageBreak(20);
          doc.setFontSize(12);
          doc.setFont("helvetica", "bold");
          doc.text(`${document.type}: ${document.name}`, 20, yOffset);
          yOffset += 6;

          if (document.file) {
            try {
              const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}${document.file}`
              );
              const blob = await response.blob();
              const fileType = blob.type;

              if (fileType.startsWith("image/")) {
                // Handle image files (PNG, JPEG)
                const img = new Image();
                img.src = URL.createObjectURL(blob);
                await new Promise((resolve) => {
                  img.onload = resolve;
                });
                const imgWidth = pageWidth - 40;
                const imgHeight = (img.height * imgWidth) / img.width;
                checkPageBreak(imgHeight + 10);
                doc.addImage(
                  img,
                  fileType.split("/")[1].toUpperCase(),
                  20,
                  yOffset,
                  imgWidth,
                  imgHeight
                );
                yOffset += imgHeight + 10;
              } else {
                checkPageBreak(6);
                doc.setFontSize(12);
                doc.setFont("helvetica", "normal");
                doc.text("Cannot display this file type in PDF.", 25, yOffset);
                yOffset += 6;
              }
            } catch (error) {
              console.error(
                `Error processing document: ${document.name}`,
                error
              );
              checkPageBreak(6);
              doc.setFontSize(12);
              doc.setFont("helvetica", "normal");
              doc.text("Error loading document.", 25, yOffset);
              yOffset += 6;
            }
          } else {
            checkPageBreak(6);
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            doc.text("No file available.", 25, yOffset);
            yOffset += 6;
          }
        }
      } else {
        checkPageBreak(6);
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text("No documents available.", 25, yOffset);
        yOffset += 6;
      }

      // Save the PDF
      doc.save("application_summary.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Optionally show an error message to the user
    }
  };

  // Helper function to fetch transcript subjects for a specific category
  const fetchTranscriptSubjectsForPDF = async (categoryId) => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const url =
        categoryId === 32
          ? `${import.meta.env.VITE_BASE_URL}api/student/transcriptSubjectList`
          : `${import.meta.env.VITE_BASE_URL
          }api/student/higherTranscriptSubjectList`;
      const method = categoryId === 32 ? "GET" : "POST";
      const body =
        categoryId === 32 ? null : JSON.stringify({ id: categoryId });

      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        ...(method === "POST" && { body }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch transcript subjects");
      }
      const result = await response.json();
      if (result.success) {
        return result.data;
      } else {
        throw new Error(
          result.message || "Failed to fetch transcript subjects"
        );
      }
    } catch (error) {
      console.error("Error fetching transcript subjects:", error);
      return null;
    }
  };

  const fetchTranscriptCategories = async () => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/student/transcriptCategoryList`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch transcript categories");
      }
      const result = await response.json();
      if (result.success) {
        setTranscriptCategories(result.data.data);
        if (result.data.data.length > 0) {
          setSelectedExam(result.data.data[0].id.toString());
          fetchTranscriptSubjects(result.data.data[0].id);
        }
      } else {
        throw new Error(
          result.message || "Failed to fetch transcript categories"
        );
      }
    } catch (error) {
      console.error("Error fetching transcript categories:", error);
      setError(error.message);
    }
  };

  const fetchTranscriptSubjects = async (categoryId) => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const url =
        categoryId === 32
          ? `${import.meta.env.VITE_BASE_URL}api/student/transcriptSubjectList`
          : `${import.meta.env.VITE_BASE_URL
          }api/student/higherTranscriptSubjectList`;
      const method = categoryId === 32 ? "GET" : "POST";
      const body =
        categoryId === 32 ? null : JSON.stringify({ id: categoryId });

      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        ...(method === "POST" && { body }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch transcript subjects");
      }
      const result = await response.json();
      if (result.success) {
        setTranscriptSubjects(result.data);
      } else {
        throw new Error(
          result.message || "Failed to fetch transcript subjects"
        );
      }
    } catch (error) {
      console.error("Error fetching transcript subjects:", error);
      setError(error.message);
    }
  };

  const fetchAchievementsDoc = async () => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/student/achievementsList`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch achievements");
      }
      const result = await response.json();
      if (result.success) {
        setAchievements(result.data.data);
      } else {
        throw new Error(result.message || "Failed to fetch achievements");
      }
    } catch (error) {
      console.error("Error fetching achievements:", error);
      setError(error.message);
    }
  };

  const fetchCoCurriculum = async () => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/student/co-curriculumList`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch co-curriculum activities");
      }
      const result = await response.json();
      if (result.success) {
        setCoCurriculum(result.data);
      } else {
        throw new Error(
          result.message || "Failed to fetch co-curriculum activities"
        );
      }
    } catch (error) {
      console.error("Error fetching co-curriculum activities:", error);
      setError(error.message);
    }
  };

  const fetchBasicInfo = async () => {
    setIsLoading(true);
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const id = sessionStorage.getItem("id") || localStorage.getItem("id");
      if (!id) {
        setError("User ID not found. Please log in again.");
        setIsLoading(false);
        return;
      }
      const url = `${import.meta.env.VITE_BASE_URL
        }api/student/studentDetail?id=${id}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      if (!response.ok) {
        throw new Error(
          `Failed to fetch student details. Status: ${response.status}`
        );
      }
      const responseData = await response.json();
      //console.log("Fetched student data:", responseData);
      if (!responseData.data || Object.keys(responseData.data).length === 0) {
        throw new Error(
          "No data received from the server. Your profile might be incomplete."
        );
      }
      if (responseData.data) {
        setBasicInfo(responseData.data);
      }
    } catch (err) {
      console.error("Error in fetchBasicInfo:", err.message);
      setError(
        err.message ||
        "Error fetching student details. Please try logging out and back in."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSchoolId = async (schoolName) => {
    setIsFetchingSchoolId(true);
    setSchoolIdError(null);
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/student/schoolList`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ search: schoolName }),
        }
      );
      const result = await response.json();
      if (result.success && result.data.length > 0) {
        // Assuming the first result is the desired school
        setSchoolId(result.data[0].id);
      } else {
        setSchoolIdError("School not found.");
        console.error("No school found with the given name.");
      }
    } catch (error) {
      setSchoolIdError("Failed to fetch school ID.");
      console.error("Error fetching school list:", error);
    } finally {
      setIsFetchingSchoolId(false);
    }
  };

  const fetchCourseInfo = async () => {
    setIsLoading(true);
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      //console.log("Fetching course info for courseId:", courseId);
      //console.log("Using token:", token);
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/student/courseDetail`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courseID: parseInt(courseId) }),
        }
      );
      const result = await response.json();

      //console.log("API response:", result);

      if (!response.ok) {
        throw new Error(
          result.message || `HTTP error! status: ${response.status}`
        );
      }

      if (result.success) {
        setCourseInfo(result.data);
        if (result.data.school) {
          await fetchSchoolId(result.data.school);
        }
      } else {
        throw new Error(result.message || "Failed to fetch course information");
      }
    } catch (error) {
      console.error("Error fetching course information:", error);
      setError(`Failed to fetch course information: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAcademicTranscripts = async (page = 1) => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/student/mediaListByCategory`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page: page,
            per_page: itemsPerPage,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setAcademicTranscripts(data.data.data);
        setPaginationInfo((prevState) => ({
          ...prevState,
          academicTranscripts: {
            currentPage: data.data.current_page,
            lastPage: data.data.last_page,
            total: data.data.total,
            perPage: data.data.per_page,
          },
        }));
      }
    } catch (error) {
      console.error("Error fetching academic transcripts:", error);
    }
  };

  const fetchCGPAForCategory = async (category, token) => {
    if (category.id === 32) {
      return { cgpa: null, programName: "", cgpaId: null };
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/student/programCgpaList`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ transcriptCategory: category.id }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch CGPA for category ${category.transcript_category}`
        );
      }

      const result = await response.json();
      return result.success && result.data
        ? {
          cgpa: result.data.cgpa,
          programName: result.data.program_name,
          cgpaId: result.data.id,
        }
        : { cgpa: null, programName: "", cgpaId: null };
    } catch (error) {
      console.error("Error fetching CGPA:", error);
      return { cgpa: null, programName: "", cgpaId: null };
    }
  };

  const fetchCGPAInfo = async (categoryId) => {
    if (categoryId === 32) {
      setCgpaInfo(null);
      return;
    }

    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/student/programCgpaList`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ transcriptCategory: categoryId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch CGPA information");
      }

      const result = await response.json();
      if (result.success && result.data) {
        setCgpaInfo(result.data);
      } else {
        setCgpaInfo(null);
      }
    } catch (error) {
      console.error("Error fetching CGPA information:", error);
      setCgpaInfo(null);
    }
  };

  const fetchAchievements = async (page = 1) => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/student/achievementsList`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page: page,
            per_page: itemsPerPage,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setAchievements(data.data.data);
        setPaginationInfo((prevState) => ({
          ...prevState,
          achievements: {
            currentPage: data.data.current_page,
            lastPage: data.data.last_page,
            total: data.data.total,
            perPage: data.data.per_page,
          },
        }));
      }
    } catch (error) {
      console.error("Error fetching achievements:", error);
    }
  };

  const fetchOtherDocuments = async (page = 1) => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/student/otherFileCertList`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page: page,
            per_page: itemsPerPage,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setOtherDocuments(data.data.data);
        setPaginationInfo((prevState) => ({
          ...prevState,
          otherDocuments: {
            currentPage: data.data.current_page,
            lastPage: data.data.last_page,
            total: data.data.total,
            perPage: data.data.per_page,
          },
        }));
      }
    } catch (error) {
      console.error("Error fetching other documents:", error);
    }
  };

  useEffect(() => {
    if (activeTab === "documents") {
      fetchAcademicTranscripts(currentPage.academicTranscripts);
      fetchAchievements(currentPage.achievements);
      fetchOtherDocuments(currentPage.otherDocuments);
    }
  }, [activeTab, itemsPerPage]);

  const handlePageChange = (section, page) => {
    setCurrentPage((prevState) => ({ ...prevState, [section]: page }));
    switch (section) {
      case "academicTranscripts":
        fetchAcademicTranscripts(page);
        break;
      case "achievements":
        fetchAchievements(page);
        break;
      case "otherDocuments":
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

  const handleExamChange = (e) => {
    const newExamId = e.target.value;
    setSelectedExam(newExamId);
    fetchTranscriptSubjects(parseInt(newExamId));
    fetchCGPAInfo(parseInt(newExamId));
  };

  const copyToClipboard = (text) => {
    if (text) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          //console.log("Copied to clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    } else {
      console.error("No text to copy");
    }
  };

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

  const renderDocumentsContent = () => {
    // Calculate total document count
    const totalDocumentCount =
      academicTranscripts.length + achievements.length + otherDocuments.length;

    let documents = [];
    let columns = [];
    let paginationSection = "";

    switch (activeDocumentTab) {
      case "academic":
        documents = academicTranscripts;
        columns = ["Name", "File Name", "Actions"];
        paginationSection = "academicTranscripts";
        break;
      case "achievements":
        documents = achievements;
        columns = ["Name", "File Name", "Actions"];
        paginationSection = "achievements";
        break;
      case "other":
        documents = otherDocuments;
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
      <div className="summary-content-yourdocument">
        <div className="documents-content pt-2 w-100">
          <div>
            <p className="lead">
              You have uploaded{" "}
              <span className="fw-bold">{totalDocumentCount}</span> documents.
            </p>
            <div className="document-tabs d-flex column mb-3 w-100">
              <Button
                variant="link"
                className={activeDocumentTab === "academic" ? "active" : ""}
                onClick={() => setActiveDocumentTab("academic")}
                style={{ fontSize: "1rem", whiteSpace: "nowrap" }}
              >
                Academic Transcript ({academicTranscripts.length})
              </Button>
              <Button
                variant="link"
                className={activeDocumentTab === "achievements" ? "active" : ""}
                onClick={() => setActiveDocumentTab("achievements")}
                style={{ fontSize: "1rem", whiteSpace: "nowrap" }}
              >
                Achievements ({achievements.length})
              </Button>
              <Button
                variant="link"
                className={activeDocumentTab === "other" ? "active" : ""}
                onClick={() => setActiveDocumentTab("other")}
                style={{ fontSize: "1rem", whiteSpace: "nowrap" }}
              >
                Other Certificates/ Documents ({otherDocuments.length})
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
                              <div className="file-title">
                                {doc.studentMedia_name}
                              </div>
                              <div className="file-date">{doc.created_at}</div>
                            </div>
                          </div>
                        </td>
                        <td
                          className="border-bottom p-2"
                          data-label="File Name"
                        >
                          {doc.studentMedia_location}
                        </td>
                      </>
                    )}
                    {activeDocumentTab === "achievements" && (
                      <>
                        <td className="border-bottom p-4" data-label="Name">
                          <div className="d-flex align-items-center">
                            <FileText className="file-icon me-2" />
                            <div>
                              <div className="file-title">
                                {doc.achievement_name}
                              </div>
                              <div className="file-date">{doc.year}</div>
                            </div>
                          </div>
                        </td>
                        <td
                          className="border-bottom p-2 "
                          data-label="File Name"
                        >
                          {doc.achievement_media}
                        </td>
                      </>
                    )}
                    {activeDocumentTab === "other" && (
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
                        <td
                          className="border-bottom p-2"
                          data-label="File Name"
                        >
                          {doc.media}
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
  const renderCourseInformation = () => {
    if (!courseInfo) {
      return <div>Loading course information...</div>;
    }
    const parseHTML = (html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      return doc.body.textContent || "";
    };

    return (
      <div className="summary-content-course-info">
        <div className="school-info text-center" style={{ margin: "0 0" }}>
          <div className="school-logo-name">
            <img
              src={`${import.meta.env.VITE_BASE_URL}storage/${courseInfo.logo}`}
              onError={(e) => {
                e.target.onerror = null; // prevents looping
                e.target.src = defaultSchoolLogo;
              }}
              className="sas-school-logo"
              alt="School Logo"
            />
            <p className="sac-school-name">{courseInfo.school}</p>
          </div>
          <Button
            className="mx-auto mt-5 w-25 as-knowmore-button"
            style={{ padding: "0.5rem 1.5rem", fontSize: "1rem" }}
            onClick={() => {
              if (isFetchingSchoolId) {
                alert("Fetching school details, please wait...");
                return;
              }
              if (schoolId) {
                navigate(`/knowMoreInstitute/${schoolId}`);
              } else {
                alert(
                  schoolIdError || "School ID not available. Please try again."
                );
              }
            }}
            disabled={isFetchingSchoolId || !schoolId}
          >
            {isFetchingSchoolId ? "Loading..." : "Know More"}
          </Button>
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
                <span className="summary-label sas-summarytext">
                  {courseInfo.qualification || "N/A"}
                </span>
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
                <span className="summary-label sas-summarytext">
                  {courseInfo.mode}
                </span>
              </div>
            </div>
            <div className="col-6 mb-3">
              <div className="d-flex align-items-center">
                <BookOpenText size={16} className="me-2" />
                <span className="sas-summarytext">
                  {courseInfo.intake.join(", ")}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between align-item-center bg-white p-4 mb-1 rounded-1 shadow mt-3">
          <h5 className="fw-bold">Estimate Fee</h5>
          <span className="lead">
            {" "}
            <strong>RM</strong> {courseInfo.cost.toLocaleString()} / year
          </span>
        </div>

        <div className="bg-white p-4 mb-1 rounded-1 shadow-lg mt-3">
          <h5 className="fw-bold mb-3">Course Overview</h5>
          <div
            className={`overview-content ${showFullOverview ? "expanded" : ""}`}
          >
            <p className="sas-summarytext">
              {parseHTML(courseInfo.description)}
            </p>
          </div>
          <div className="text-center">
            <Button
              variant="link"
              onClick={() => setShowFullOverview(!showFullOverview)}
            >
              {showFullOverview ? "View Less" : "View More"}{" "}
              {showFullOverview ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </Button>
          </div>
        </div>

        <div className="entry-requirements bg-white p-4 mb-1 rounded-1 shadow-lg mt-3">
          <h5 className="fw-bold mb-3">Entry Requirement</h5>
          <div
            className={`requirements-content ${showFullRequirements ? "expanded" : ""
              }`}
          >
            <p className="sas-summarytext">
              {" "}
              {parseHTML(courseInfo.requirement)}
            </p>
          </div>
          <div className="text-center">
            <Button
              variant="link"
              onClick={() => setShowFullRequirements(!showFullRequirements)}
            >
              {showFullRequirements ? "View Less" : "View More"}{" "}
              {showFullRequirements ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
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
            <div className="bg-white  mb-4 px-4 pt-2">
              <p className="summary-title">Application Summary</p>
            </div>
            <div className="application-summary-container-inside rounded ">
              <div className="summary-header py-4 px-4 border border-bottom">
                <div className="applicant-info">
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}storage/${basicInfo?.profilePic}`}
                    onError={(e) => {
                      e.target.onerror = null; // prevents looping
                      e.target.src = defaultProfilePic;
                    }}
                    className="applicant-photo me-4 ms-2 "
                    alt="Applicant Photo"
                  />
                  <div>
                    <p className="my-0 fw-bold ">
                      {`${basicInfo?.firstName || ""} ${basicInfo?.lastName || ""
                        }`.trim()}
                    </p>
                    <p className="my-0 text-secondary  mt-2">
                      Applied For:{" "}
                      <span className=" text-black ms-2">
                        {courseInfo?.course}
                      </span>
                    </p>
                  </div>
                </div>
                <Button
                  className="sac-submit-button px-4"
                  onClick={generateEnhancedPDF}
                >
                  Print Summary
                </Button>
              </div>
              <div className="summary-tabs d-flex flex-wrap px-4">
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
                >
                  Your Documents
                </Button>
                <Button
                  variant="link"
                  className={activeTab === "course" ? "active" : ""}
                  onClick={() => setActiveTab("course")}
                >
                  Course Information
                </Button>
              </div>

              {activeTab === "info" ? (
                <>
                  <div className="summary-content">
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
                            <p>
                              {`${basicInfo?.firstName || ""} ${basicInfo?.lastName || ""
                                }`.trim()}{" "}
                              <Copy
                                size={16}
                                className="cursor-pointer"
                                onClick={() =>
                                  copyToClipboard(
                                    `${basicInfo?.firstName || ""} ${basicInfo?.lastName || ""
                                      }`.trim() || ""
                                  )
                                }
                              />
                            </p>
                          </div>
                          <div className="col-md-6 mb-3">
                            <p>
                              <strong>Identity Card Number</strong>
                            </p>
                            <p>
                              {basicInfo?.ic}{" "}
                              <Copy
                                size={16}
                                className="cursor-pointer"
                                onClick={() =>
                                  copyToClipboard(basicInfo?.ic || "")
                                }
                              />
                            </p>
                          </div>
                          <div className="col-md-6 mb-3">
                            <p>
                              <strong>Contact Number</strong>
                            </p>
                            <p>
                              {`${basicInfo?.country_code || ""} ${basicInfo?.contact || ""
                                }`}{" "}
                              <Copy
                                size={16}
                                className="cursor-pointer"
                                onClick={() =>
                                  copyToClipboard(
                                    `${basicInfo?.country_code || ""} ${basicInfo?.contact || ""
                                    }`
                                  )
                                }
                              />
                            </p>
                          </div>
                          <div className="col-md-6 mb-3">
                            <p>
                              <strong>Email Address</strong>
                            </p>
                            <p>
                              {basicInfo?.email}{" "}
                              <Copy
                                size={16}
                                className="cursor-pointer"
                                onClick={() =>
                                  copyToClipboard(basicInfo?.email || "")
                                }
                              />
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <p>
                              <strong>Address</strong>
                            </p>
                            <p>
                              {basicInfo?.address}{" "}
                              <Copy
                                size={16}
                                className="cursor-pointer"
                                onClick={() =>
                                  copyToClipboard(basicInfo?.address || "")
                                }
                              />
                            </p>
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
                      {cgpaInfo && selectedExam !== "32" && (
                        <div className="px-4 mb-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <p className="mb-0">
                              <strong>Program Name:</strong>{" "}
                              {cgpaInfo.program_name || "N/A"}
                            </p>
                            <p className="mb-0">
                              <strong>CGPA:</strong> {cgpaInfo.cgpa || "N/A"}
                            </p>
                          </div>
                        </div>
                      )}
                      <div
                        className="results-grid flex-grow-1 px-4 "
                        style={{ maxHeight: "15rem", overflowY: "auto" }}
                      >
                        {transcriptSubjects && transcriptSubjects.length > 0 ? (
                          transcriptSubjects.map((subject, index) => (
                            <div
                              key={index}
                              className="d-flex justify-content-between py-3"
                            >
                              <p className="mb-0">
                                <strong>
                                  {subject.name ||
                                    subject.subject_name ||
                                    subject.highTranscript_name}
                                </strong>
                              </p>
                              <p className="mb-0 ">
                                <strong>
                                  {subject.grade ||
                                    subject.subject_grade ||
                                    subject.higherTranscript_grade}
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
                        <div className="overall-grade text-white w-75 d-flex justify-content-start">
                          <h3 className="align-self-center px-5">
                            Grade: {calculateOverallGrade(transcriptSubjects)}
                          </h3>
                        </div>
                        <Button
                          variant="link"
                          className="text-danger w-25 "
                          onClick={() => {
                            setActiveTab("documents"); // Navigate to Your Documents tab
                            setActiveDocumentTab("academic"); // Navigate to Academic Transcript tab
                          }}
                          disabled={
                            !transcriptSubjects ||
                            transcriptSubjects.length === 0
                          }
                        >
                          View Result Slip »
                        </Button>
                      </div>
                    </div>

                    <div className="co-curriculum m-3 shadow-lg p-4 rounded-5">
                      <p className="text-secondary fw-bold border-bottom border-2 pb-3">
                        Co-curriculum
                      </p>
                      <div
                        className="activities-grid"
                        style={{ maxHeight: "15rem", overflowY: "auto" }}
                      >
                        {coCurriculum.length > 0 ? (
                          coCurriculum.map((activity, index) => (
                            <div
                              key={index}
                              className="activity-item d-flex flex-wrap justify-content-between align-items-start py-2"
                            >
                              <div className="col-12 col-sm-6">
                                <p className="mb-0">
                                  <strong>{activity.club_name}</strong>
                                </p>
                                <p className="mb-0 text-muted">
                                  {activity.location}
                                </p>
                              </div>
                              <div className="col-6 col-sm-3 text-start text-sm-center">
                                <p className="mb-0">{activity.year}</p>
                              </div>
                              <div className="col-6 col-sm-3 text-end">
                                <span
                                  className={`position ${activity.student_position.toLowerCase()} py-1 px-2 rounded-pill`}
                                >
                                  {activity.student_position}
                                </span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-center text-muted">
                            No co-curricular activities added yet.
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="achievements m-3 shadow-lg p-4 rounded-5">
                      <p className="text-secondary fw-bold border-bottom border-2 pb-3">
                        Achievements
                      </p>
                      <div
                        className="achievements-grid"
                        style={{ maxHeight: "15rem", overflowY: "auto" }}
                      >
                        {achievements.length > 0 ? (
                          achievements.map((achievement, index) => (
                            <div
                              key={index}
                              className="achievement-item d-flex flex-wrap justify-content-between align-items-start py-2"
                            >
                              <div className="col-12 col-sm-6">
                                <p className="mb-0">
                                  <strong>
                                    {achievement.achievement_name}
                                  </strong>
                                </p>
                                <p className="mb-0 text-muted">
                                  {achievement.awarded_by}
                                </p>
                              </div>
                              <div className="col-6 col-sm-3 text-start text-sm-center">
                                <p className="mb-0">{achievement.date}</p>
                              </div>
                              <div className="col-6 col-sm-3 text-end">
                                <span
                                  className={`position ${achievement.title_obtained
                                    .toLowerCase()
                                    .replace(
                                      /\s+/g,
                                      "-"
                                    )} py-1 px-2 rounded-pill`}
                                >
                                  {achievement.title_obtained}
                                </span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-center text-muted">
                            No achievements added yet.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : activeTab === "documents" ? (
                renderDocumentsContent()
              ) : activeTab === "course" ? (
                renderCourseInformation()
              ) : null}
            </div>
          </div>
          <SpcFooter />
        </div>
      </div>
    </div>
  );
};

export default StudentApplicationSummary;
