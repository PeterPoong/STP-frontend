import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../Components/SchoolPortalComp/SchoolSidebar";
import { Container, Button, Row, Col } from "react-bootstrap";
import { Whatsapp } from "react-bootstrap-icons";
import {
  FileText,
  Search,
  Eye,
  ChevronDown,
  ChevronUp,
  Clock,
  Copy,
} from "react-feather";

import styles from "../../css/SchoolPortalStyle/StudentApplicantDetail.module.css";
import { ClassNames } from "@emotion/react";
import { withTheme } from "styled-components";
import DocumentContent from "../../Components/SchoolPortalComp/EmailStudentApplicantComp/DocumentContent/DocumentContent";

import WidgetFileUploadAcademicTranscript from "../../Components/StudentPortalComp/WidgetFileUploadAcademicTranscript";
import WidgetFileUpload from "../../Components/StudentPortalComp/WidgetFileUpload";
import WidgetAchievement from "../../Components/StudentPortalComp/Widget/WidgetAchievement";

const SchoolViewApplicantDetail = () => {
  // Get the studentId from the URL parameters
  const { applicantID } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const token = localStorage.getItem("token");
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courseDetail, setCourseDetail] = useState("");

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

  const [activeTab, setActiveTab] = useState("acceptReject");

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

  const fetchCoCurriculum = async () => {
    if (!studentId) {
      console.log("studentId is missing, skipping API call.");
      return;
    }
    try {
      const formData = { studentId: studentId };

      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
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
      console.error("Error fetching co-curriculum activities:", error);
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
        throw new Error(
          result.message || "Failed to fetch co-curriculum activities"
        );
      }
    } catch (error) {
      console.error("Error fetching co-curriculum activities:", error);
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
        throw new Error("Failed to fetch co-curriculum activities");
      }
      const result = await response.json();
      //   console.log("achievement", result);
      if (result.success) {
        setAchievements(result.data);
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
        `${
          import.meta.env.VITE_BASE_URL
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
        console.log("Error Data:", errorData["error"]);
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
        const errorData = await response.json();
        console.log("Error Data:", errorData["error"]);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setOtherDocuments(data.data);

      // console.log("academic transcript", data);
    } catch (error) {
      console.error("Failed To get Applicant Detail", error);
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
          console.log("Error Data:", errorData["error"]);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        setStudentId(data.student_id);
        setCourseId(data.courses_id);
        // console.log("applicantDetail", data.student_id);
      } catch (error) {
        console.error("Failed To get Applicant Detail", error);
      }
    };

    getApplicantDetail();
  }, [token, navigate]); // Ensure navigate is included as a dependency

  //get studentDetail
  useEffect(() => {
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
    fetchCoCurriculum();
    fetchAchievements();
    getAchievements();
  }, [studentId]);

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
          console.log("Error Data:", errorData["error"]);
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
          console.log("Error Data:", errorData["error"]);
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

    getOtherFileCert();
  }, [activeTab]);

  //rendering page fnction
  const renderDocumentsContent = () => {
    let documents = [];
    let columns = [];
    let paginationSection = "";

    switch (activeDocumentTab) {
      case "academic":
        // console.log("academic hello", academicTranscripts.data);
        documents = academicTranscripts.data || [];
        columns = ["Name", "File Name", "Actions"];
        paginationSection = "academicTranscripts";
        break;
      case "achievements":
        documents = achievements.data;
        columns = ["Name", "File Name", "Actions"];
        paginationSection = "achievements";
        break;
      case "other":
        console.log("academic hello", otherDocuments.data);
        documents = otherDocuments.data;
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

  //render the page
  return (
    <>
      <Row style={{ backgroundColor: "#f6a192" }}>
        <Row className={`${styles.infoBannerRow}`}>
          <Col md={6} className={`d-flex  ps-5 ${styles.informationBanner}`}>
            {studentPic ? (
              <img
                src={`${import.meta.env.VITE_BASE_URL}storage/${studentPic}`}
                className={`me-4 ms-2 bg-black ${styles.applicantPhoto}`}
              />
            ) : (
              <div className="text-center">
                <div
                  className="spinner-border spinner-border-sm"
                  role="status"
                ></div>
              </div>
            )}
            <div className={`${styles.studentNameAndCourse}`}>
              <p className="my-2 fw-bold" style={{ fontSize: "25px" }}>
                {`${firstName || ""} ${lastName || ""}`.trim()}
                <br />
                <span className="my-2 text-secondary">
                  <span
                    style={{
                      fontWeight: "500",
                      fontSize: "14px",
                      opacity: 0.7,
                    }}
                  >
                    Applied For:
                  </span>
                  <span
                    className="text-black ms-2"
                    style={{
                      fontSize: "16px",
                      opacity: 0.7,
                    }}
                  >
                    {courseDetail.course_name}
                  </span>
                </span>
              </p>
            </div>
          </Col>

          <Col md={6} className={` pe-3 ${styles.informationBanner}`}>
            <Button className={`px-4 mt-5 float-right ${styles.pendingButton}`}>
              Pending Application
            </Button>

            <Button
              className={`justify-content-center px-4 mt-5 float-right ${styles.chatOnWhatsappButton}`}
            >
              <Whatsapp className="me-2" />{" "}
              {/* Add margin-end to space icon and text */}
              Chat on Whatsapp
            </Button>
          </Col>
        </Row>
        {/* <Col style={{ backgroundColor: "white" }}>asda</Col> */}
      </Row>
      <Row>
        <Row className={` ${styles.infoBannerRow} `}>
          <div
            className="summary-tabs d-flex flex-wrap"
            style={{ backgroundColor: "white" }}
          >
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
            >
              Your Documents
            </Button>
            <Button
              variant="link"
              className={activeTab === "acceptReject" ? "active" : ""}
              onClick={() => setActiveTab("acceptReject")}
            >
              Accept/Reject Application
            </Button>
          </div>
        </Row>
        <Row className={` ${styles.contentRow} `}>
          {activeTab === "info" ? (
            <>
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
                        <p>
                          {`${firstName || ""} ${lastName || ""}`.trim()}{" "}
                          <Copy
                            size={16}
                            className="cursor-pointer"
                            onClick={() =>
                              copyToClipboard(
                                `${firstName || ""} ${lastName || ""}`.trim() ||
                                  ""
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
                          {ic}{" "}
                          <Copy
                            size={16}
                            className="cursor-pointer"
                            onClick={() => copyToClipboard(ic || "")}
                          />
                        </p>
                      </div>
                      <div className="col-md-6 mb-3">
                        <p>
                          <strong>Contact Number</strong>
                        </p>
                        <p>
                          {`${countryCode || ""} ${contact || ""}`}{" "}
                          <Copy
                            size={16}
                            className="cursor-pointer"
                            onClick={() =>
                              copyToClipboard(
                                `${countryCode || ""} ${contact || ""}`
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
                          {email}{" "}
                          <Copy
                            size={16}
                            className="cursor-pointer"
                            onClick={() => copyToClipboard(email || "")}
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
                          {address}{" "}
                          <Copy
                            size={16}
                            className="cursor-pointer"
                            onClick={() => copyToClipboard(address || "")}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="academic-results m-3 shadow-lg rounded-5 pt-4 d-flex flex-column">
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
                        !transcriptSubjects || transcriptSubjects.length === 0
                      }
                    >
                      View Result Slip »
                    </Button>
                  </div>
                </div> */}

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
                          <p className="mb-0">
                            <strong>{activity.club_name}</strong>
                          </p>
                          <p className="mb-0 text-muted">{activity.location}</p>
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
                        <div className="col-12 col-sm-6">
                          <p className="mb-0">
                            <strong>{achievement.achievement_name}</strong>
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
                              .replace(/\s+/g, "-")} py-1 px-2 rounded-pill`}
                          >
                            {achievement.title_obtained}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : activeTab === "documents" ? (
            // <DocumentContent studentId={studentId} />
            renderDocumentsContent()
          ) : null}
        </Row>
      </Row>
    </>
  );
};

export default SchoolViewApplicantDetail;
