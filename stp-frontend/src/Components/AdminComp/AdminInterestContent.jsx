import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faReply, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import CircleDotLoader from './CircleDotLoader';
import '../../css/AdminStyles/AdminTableStyles.css';
import TableWithControls from './TableWithControls';

const AdminInterestContent = () => {
    const [interests, setinterests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [targetinterest, setTargetinterest] = useState(null);
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
   // Fetch the category list
    const fetchCategoryList = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/categoryList`, {
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
        fetchinterests(); // Fetch enquiries initially
    }, []);
    const fetchinterests = async (page = 1, perPage = rowsPerPage, search = searchQuery, category = selectedCategory, monthYear = null) => {
        try {
            const requestBody = {
                page,
                per_page: perPage,
                search,
            };

            if (category && category !== "") {
                requestBody.category_id = category;
            }

            if (monthYear) {
                requestBody.month_year = monthYear;
            }

            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/interestedCourseListAdmin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": Authenticate,
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            if (result && result.categories) {
                setinterests(result.categories);
                setTotalPages(result.pagination.last_page);
                setCurrentPage(result.pagination.current_page);
                setIsSearchResults(result.total > rowsPerPage);
            } else {
                setinterests([]);
            }
        } catch (error) {
            setError(error.message);
            console.error("Error fetching the interest list:", error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchinterests(currentPage, rowsPerPage, searchQuery, selectedCategory);
    }, [Authenticate, currentPage, rowsPerPage, searchQuery, selectedCategory]);

    const handleRowsPerPageChange = (newRowsPerPage) => {
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(1); // Reset to the first page whenever rows per page changes
        fetchinterests(1, newRowsPerPage, searchQuery); // Fetch data with updated rowsPerPage
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1); // Reset to the first page whenever search query changes
        fetchinterests(1, rowsPerPage, query); // Fetch data with updated search query
    };

    const handleSort = (column) => {
        const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
        setSortColumn(column);
        setSortDirection(newDirection);
        fetchinterests(currentPage, rowsPerPage, searchQuery); // Fetch sorted data
    };

    const sortedinterests = (() => {
        if (!sortColumn || !sortDirection || !Array.isArray(interests)) return interests || [];
    
        return [...interests].sort((a, b) => {
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
        setTargetinterest({ id, action });
        setShowModal(true);
    };
    
    const handleAddinterest = () => {
        sessionStorage.setItem('token', Authenticate);
        navigate('/adminAddinterest');
    };
    const handleEdit = (id) => {
        // console.log(`Edit interest with ID: ${id}`); // Log the ID being passed
        sessionStorage.setItem('interestId', id); // Store package ID in session storage
        navigate(`/adminReplyinterest`); // Navigate to the edit page
    };
    

    const handleToggleSwitch = (id, currentStatus) => {
        const action = (currentStatus === 1) ? 'disable' : 'enable';
        setTargetinterest({ id, action });
        setShowModal(true);
    };

    const confirmAction = async () => {
        if (!targetinterest) return;
    
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/disableinterest`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": Authenticate,
                },
                body: JSON.stringify({
                    id: targetinterest.id,
                    type: targetinterest.action
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const result = await response.json();
    
            if (result.success) {
                // Log the new status for debugging
                // console.log("New status:", result.newStatus);
                await fetchinterests(currentPage, rowsPerPage, searchQuery);
    
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error("Error processing the action:", error);
        } finally {
            setShowModal(false);
            setTargetinterest(null);
        }
    };
    
    const getStatusClass = (status) => {
        switch (status) {
            case 1:
                return 'status-replied'; // Green color
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
    fetchinterests(1, rowsPerPage, searchQuery, categoryId);
};

    const handleMonthYearChange = (value) => {
        setMonthYear(value);
        // Use the existing fetchinterests function instead of fetchData
        fetchinterests(currentPage, rowsPerPage, searchQuery, selectedCategory, value);
    };

    const theadContent = (
        <tr>
            <th onClick={() => handleSort("category")}>
                 Category{sortColumn === "category" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("total")}>
                Total {sortColumn === "total" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            {/* <th onClick={() => handleSort("course_name")}>
                Course {sortColumn === "course_name" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("school_name")}>
                School {sortColumn === "school_name" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("school_email")}>
                School Email {sortColumn === "school_email" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("latestDate")}>
                Date {sortColumn === "latestDate" && (sortDirection === "asc" ? "↑" : "↓")}
            </th> */}
            <th>Action</th>
        </tr>
    );

    const tbodyContent = sortedinterests.length > 0 ? (
        sortedinterests.map((category) => (
            <tr key={category.category_type}>
                <td>{category.category_type}</td>
                <td>{category.category_total}</td>
                <td>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon
                            className="icon-color-edit"
                            title="Send Email"
                            icon={faEnvelope}
                            style={{ marginRight: '8px', color: '#691ED2', cursor: 'pointer' }}
                            onClick={() => handleEdit(category.id)}
                        />
                    </div>
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="3" style={{ textAlign: "center" }}>No Data Available</td>
        </tr>
    );
    

    console.log("Current categoryList:", categoryList);
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
                onAddButtonClick={handleAddinterest}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                showSearch={false}
                showRowsPerPage={true}
                categoryList={categoryList}
                onCategoryChange={handleCategoryChange}
                showMonthFilter={true}
                onMonthYearChange={handleMonthYearChange}
            />
        )}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to {targetinterest?.action === 'enable' ? 'Enable' : 'Disable'} this interest?
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

export default AdminInterestContent;
