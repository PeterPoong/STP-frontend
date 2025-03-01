import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MDBSwitch } from "mdb-react-ui-kit";
import { faEdit, faReply, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import CircleDotLoader from './CircleDotLoader';
import '../../css/AdminStyles/AdminTableStyles.css';
import TableWithControls from './TableWithControls';

const AdminQuestionContent = () => {
    const [questions, setquestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [targetquestion, setTargetquestion] = useState(null);
    const [showSearch, setShowSearch] = useState(false); // or true, depending on default
    const [totalPages, setTotalPages] = useState(1); // Start with 1 page
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchResults, setIsSearchResults] = useState(false);
    const [showAddButton, setShowAddButton] = useState(true); // Set true if you want the button to always show
    const [categoryList, setCategoryList] = useState([]); // State for category list
    const [selectedCategory, setSelectedCategory] = useState(""); // State for selected subject
    const [monthYear, setMonthYear] = useState(null);

     // To track if there are search results
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`;
    const navigate = useNavigate();

    const [statList, setStatList] = useState([]); // State for category list
    const [selectedStat, setSelectedStat] = useState(""); // State for selected subject
  
    useEffect(() => {
        // Hardcoded statList values
        const hardcodedStatList = [
            { id: 0, name: "Disable" },
            { id: 1, name: "Active" }
        ];
        setStatList(hardcodedStatList);
        fetchquestions(); // Fetch enquiries initially
    }, []);
   // Fetch the category list
    const fetchCategoryList = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/personalityQuestionList`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": Authenticate,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            if (result.success && result.data && result.data.data) {
                setCategoryList(result.data.data);
            } else {
                setCategoryList([]);
            }
        } catch (error) {
            setError(error.message);
            console.error("Error fetching the category list:", error);
        }
    };

    useEffect(() => {
        fetchCategoryList(); // Fetch categorys on component mount
        fetchquestions(); // Fetch enquiries initially
    }, []);
    const fetchquestions = async (
        page = 1, 
        perPage = rowsPerPage, 
        search = "", 
        category = selectedCategory, 
        stat = selectedStat,
        monthYear = null) => {
        try {
            const requestBody = {
                page: parseInt(page),
                per_page: parseInt(perPage),
            };

            // Only add search to requestBody if it's not empty
            if (search && search.trim() !== "") {
                requestBody.search = search.trim();
            }

            if (category && category !== "") {
                requestBody.category_id = parseInt(category);
            }

            // Add stat to requestBody if it's not empty
            if (stat !== "") {
                requestBody.status = parseInt(stat);
            }

            if (monthYear) {
                requestBody.month_year = monthYear;
            }

            console.log('Request Body:', requestBody);

            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/personalityQuestionList`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": Authenticate,
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error Response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            const result = await response.json();
            console.log('API Response:', result);

            if (result && result.data) {
                setquestions(result.data);
                setTotalPages(result.last_page);
                setCurrentPage(result.current_page);
                setIsSearchResults(result.total > rowsPerPage);
            } else {
                setquestions([]);
            }
        } catch (error) {
            setError(error.message);
            console.error("Error fetching the question list:", error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchquestions(currentPage, rowsPerPage, searchQuery, selectedCategory, selectedStat);
    }, [Authenticate, currentPage, rowsPerPage, searchQuery, selectedCategory, selectedStat]);

    const handleRowsPerPageChange = (newRowsPerPage) => {
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(1); // Reset to the first page whenever rows per page changes
        fetchquestions(1, newRowsPerPage, searchQuery, selectedStat); // Fetch data with updated rowsPerPage
    };

    const handleSearch = (query) => {
        // Ensure query is a string and handle null/undefined cases
        const searchString = String(query || "").trim();
        setSearchQuery(searchString);
        setCurrentPage(1);
        fetchquestions(1, rowsPerPage, searchString); // Pass the sanitized string
    };

    const handleSort = (column) => {
        const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
        setSortColumn(column);
        setSortDirection(newDirection);
        fetchquestions(currentPage, rowsPerPage, searchQuery, selectedStat); // Fetch sorted data
    };

    const sortedquestions = (() => {
        if (!sortColumn || !sortDirection || !Array.isArray(questions)) return questions || [];
    
        return [...questions].sort((a, b) => {
            const aValue = a[sortColumn] ? a[sortColumn].toString().toLowerCase() : '';
            const bValue = b[sortColumn] ? b[sortColumn].toString().toLowerCase() : '';
    
            if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
            if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });
    })();
    
    const handlePageChange = (page) => {
        if (page <= totalPages && page > 0) {
            setCurrentPage(page);
        }
    };
    const handlePendingAction = (id, action) => {
        setTargetquestion({ id, action });
        setShowModal(true);
    };
    
    const handleAddquestion = () => {
        sessionStorage.setItem('token', Authenticate);
        navigate('/adminAddQuestion');
    };
    const handleEdit = (id) => {
        // console.log(`Edit Category with ID: ${id}`); // Log the ID being passed
        sessionStorage.setItem('questionId', id); // Store course ID in session storage
        navigate(`/adminEditQuestion`); // Navigate to the edit page
    };

    const handleToggleSwitch = (id, currentStatus) => {
        const action = (currentStatus === 1) ? 'false' : 'true';
        setTargetquestion({ id, action });
        setShowModal(true);
    };

    const confirmAction = async () => {
        if (!targetquestion) return;

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}api/admin/updatePersonalQuestion`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: Authenticate,
                    },
                    body: JSON.stringify({
                        id: targetquestion.id,
                        status: targetquestion.action,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                await fetchquestions(currentPage, rowsPerPage, searchQuery);
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error("Error processing the action:", error);
        } finally {
            setShowModal(false);
            setTargetquestion(null);
        }
    };
    
    const getStatusClass = (status) => {
        switch (status) {
            case 1:
                return 'status-active'; // Green color
            case 2:
                return 'status-pending'; // Yellow color
            default:
                return 'status-disable'; // Default for other cases
        }
    };
    
// Function to handle category change
const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    fetchquestions(1, rowsPerPage, searchQuery, categoryId);
};

    const handleMonthYearChange = (value) => {
        setMonthYear(value);
        // Use the existing fetchquestions function instead of fetchData
        fetchquestions(currentPage, rowsPerPage, searchQuery, selectedCategory, value);
    };

    const theadContent = (
        <tr>
            <th onClick={() => handleSort("question")}>
                 Question{sortColumn === "question" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("riasec_type")}>
               RIASEC Type {sortColumn === "riasec_type" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("status")}>
                Status {sortColumn === "status" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th>Action</th>
        </tr>
    );

    const tbodyContent =
    sortedquestions.length > 0 ? (
      sortedquestions.map((question) => (
        <tr key={question.id}>
          <td>{question.question}</td>
          <td>{question.riasec_type}</td>
          <td className={getStatusClass(question.status)}>{question.status}</td>
          <td>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {question.status === "Pending" ? (
                <>
                  <Button
                    className="accept"
                    variant="success"
                    onClick={() => handlePendingAction(question.id, "true")}
                  >
                    Accept
                  </Button>
                  <Button
                    className="rejected"
                    variant="danger"
                    onClick={() => handlePendingAction(question.id, "false")}
                  >
                    Reject
                  </Button>
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    className="icon-color-edit"
                    title="Edit"
                    icon={faEdit}
                    style={{
                      marginRight: "8px",
                      color: "#691ED2",
                      cursor: "pointer",
                    }}
                    onClick={() => handleEdit(question.id)}
                  />
                  <MDBSwitch
                    id={`switch-${question.id}`}
                    checked={
                      question.status === 1
                    }
                    onChange={() =>
                      handleToggleSwitch(question.id, question.status)
                    }
                    style={{
                      color:
                        question.status === 1
                          ? "green"
                          : "",
                    }}
                  />
                </>
              )}
            </div>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="6" style={{ textAlign: "center" }}>
          No Data Available
        </td>
      </tr>
    );

    console.log("Current categoryList:", categoryList);
    const handleStatChange = (stat) => {
        setSelectedStat(stat);
        setCurrentPage(1);
        fetchquestions(1, rowsPerPage, searchQuery, stat);
      };
    return (
        <>
         {loading ? (
            <CircleDotLoader />
            ) : (
            <TableWithControls
                theadContent={theadContent}
                tbodyContent={tbodyContent}
             onSearch={handleSearch}
                onSort={handleSort}
                onAddButtonClick={handleAddquestion}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                showSearch={true}
                showRowsPerPage={true}
                categoryList={categoryList}
                onCategoryChange={handleCategoryChange}
                showAddButton={showAddButton}
                statList={statList}
                onStatChange={handleStatChange}
            />
        )}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                Are you sure you want to{" "}
                {targetquestion?.action === "true" ? "Enable" : "Disable"} this question?
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Cancel
                </Button>
                <Button className="confirm" variant="primary" onClick={confirmAction}>
                    Confirm
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AdminQuestionContent;
