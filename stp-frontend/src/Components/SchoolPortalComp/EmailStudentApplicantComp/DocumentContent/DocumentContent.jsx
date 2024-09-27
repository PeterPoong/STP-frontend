import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DocumentContent = ({ studentId }) => {
  const token = localStorage.getItem("token");
  const [academicTranscripts, setAcademicTranscripts] = useState(null);
  const [totalDocumentCount, setTotalDocumentCount] = useState(null);

  useEffect(() => {
    // Redirect to login if token is not present
    if (!token) {
      navigate("/schoolPortalLogin");
    }

    const getAcademicTranscript = async () => {
      try {
        const formData = { studentId: studentId };
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

        setAcademicTranscripts(data.data);

        console.log("list", data.data);
        console.log("countr", data.data.length);
      } catch (error) {
        console.error("Failed To get Applicant Detail", error);
      }
    };

    const getDocumentCount = async () => {
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
      } catch (error) {
        console.error("Failed To get Applicant Detail", error);
      }
    };

    getAcademicTranscript();
    getDocumentCount();
  }, [token]);
  //   const totalDocumentCount =
  //     academicTranscripts.length + achievements.length + otherDocuments.length;

  let documents = [];
  let columns = [];
  let paginationSection = "";

  //   switch (activeDocumentTab) {
  //     case "academic":
  //       documents = academicTranscripts;
  //       columns = ["Name", "File Name", "Actions"];
  //       paginationSection = "academicTranscripts";
  //       break;
  //     case "achievements":
  //       documents = achievements;
  //       columns = ["Name", "File Name", "Actions"];
  //       paginationSection = "achievements";
  //       break;
  //     case "other":
  //       documents = otherDocuments;
  //       columns = ["Name", "File Name", "Actions"];
  //       paginationSection = "otherDocuments";
  //       break;
  //     default:
  //       break;
  //   }

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
                      <td className="border-bottom p-2" data-label="File Name">
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
                      <td className="border-bottom p-2 " data-label="File Name">
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
                      <td className="border-bottom p-2" data-label="File Name">
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

export default DocumentContent;
