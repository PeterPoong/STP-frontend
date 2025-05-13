import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MDBSwitch } from "mdb-react-ui-kit";
import { faEdit, faReply, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import CircleDotLoader from './CircleDotLoader';
import '../../css/AdminStyles/AdminTableStyles.css';
import TableWithControls from './TableWithControls';

const AdminRiasecContent = () => {
    const [riasecs, setriasecs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [targetriasec, setTargetriasec] = useState(null);
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
            { id: "0", name: "Disable" },
            { id: "1", name: "Active" }
        ];
        setStatList(hardcodedStatList);
        fetchriasecs(); // Fetch enquiries initially
    }, []);
   // Fetch the category list
    // const fetchCategoryList = async () => {
    //     try {
    //         const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/riasecTypesList`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": Authenticate,
    //             },
    //         });

    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }

    //         const result = await response.json();
    //         if (result.success && result.data && result.data.data) {
    //             setCategoryList(result.data.data);
    //         } else {
    //             setCategoryList([]);
    //         }
    //     } catch (error) {
    //         setError(error.message);
    //         console.error("Error fetching the category list:", error);
    //     }
    // };

    useEffect(() => {
        // fetchCategoryList(); // Fetch categorys on component mount
        fetchriasecs(); // Fetch enquiries initially
    }, []);
    const fetchriasecs = async (
      page = 1, 
      perPage = rowsPerPage, 
      search = "",
      stat = selectedStat
      ) => {
        try {
            // Build query parameters
            const queryParams = new URLSearchParams({
                page: parseInt(page),
                per_page: parseInt(perPage)
            });

            // Only add search to query params if it's not empty
            if (search && search.trim() !== "") {
                queryParams.append('search', search.trim());
            }
            
            // Add stat to query params if it's not empty
            if (stat !== "") {
                queryParams.append('stat', stat);
            }
            
            console.log('Query Params:', queryParams.toString());

            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/riasecTypesList?${queryParams}`, {
                method: "GET",
                headers: {
                    "Authorization": Authenticate,
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error Response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            const result = await response.json();
            console.log('API Response:', result);

            if (result && result.data) {
                setriasecs(result.data);
                setTotalPages(result.last_page);
                setCurrentPage(result.current_page);
                setIsSearchResults(result.total > rowsPerPage);
            } else {
                setriasecs([]);
            }
        } catch (error) {
            setError(error.message);
            console.error("Error fetching the riasec list:", error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchriasecs(currentPage, rowsPerPage, searchQuery, selectedStat);
    }, [Authenticate, currentPage, rowsPerPage, searchQuery, selectedStat]);

    const handleRowsPerPageChange = (newRowsPerPage) => {
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(1); // Reset to the first page whenever rows per page changes
        fetchriasecs(1, newRowsPerPage, searchQuery, selectedStat); // Fetch data with updated rowsPerPage
    };

    const handleSearch = (query) => {
        // Ensure query is a string and handle null/undefined cases
        const searchString = String(query || "").trim();
        setSearchQuery(searchString);
        setCurrentPage(1);
        fetchriasecs(1, rowsPerPage, searchString); // Pass the sanitized string
    };

    const handleSort = (column) => {
        const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
        setSortColumn(column);
        setSortDirection(newDirection);
        fetchriasecs(currentPage, rowsPerPage, searchQuery, selectedStat); // Fetch sorted data
    };

    const sortedriasecs = (() => {
        if (!sortColumn || !sortDirection || !Array.isArray(riasecs)) return riasecs || [];
    
        return [...riasecs].sort((a, b) => {
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
        setTargetriasec({ id, action });
        setShowModal(true);
    };
    
    const handleAddriasec = () => {
        sessionStorage.setItem('token', Authenticate);
        navigate('/adminAddRiasec');
    };
    const handleEdit = (id) => {
        // console.log(`Edit Category with ID: ${id}`); // Log the ID being passed
        sessionStorage.setItem('riasecId', id); // Store course ID in session storage
        navigate(`/adminEditRiasec`); // Navigate to the edit page
    };

    const handleToggleSwitch = (id, currentStatus) => {
        const action = (currentStatus === 1) ? 'false' : 'true';
        setTargetriasec({ id, action });
        setShowModal(true);
    };

    const confirmAction = async () => {
        if (!targetriasec) return;

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}api/admin/updateRiasecTypes`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: Authenticate,
                    },
                    body: JSON.stringify({
                        id: targetriasec.id,
                        status: targetriasec.action,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                await fetchriasecs(currentPage, rowsPerPage, searchQuery, selectedStat);
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error("Error processing the action:", error);
        } finally {
            setShowModal(false);
            setTargetriasec(null);
        }
    };
    
    const getStatusDisplay = (status) => {
        // Convert status to text and color
        switch (status) {
            case "1":
                return { text: 'Active', color: 'green' };
            case "0":
            default:
                return { text: 'Disable', color: 'red' };
        }
    };
    

    const theadContent = (
        <tr>
            <th onClick={() => handleSort("type_name")}>
                 RIASEC Type{sortColumn === "type_name" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("unique_description")}>
               Description {sortColumn === "unique_description" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("strength")}>
               Strength {sortColumn === "strength" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("status")}>
                Status {sortColumn === "status" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th>Action</th>
        </tr>
    );

    const tbodyContent = sortedriasecs.length > 0 ? (
        sortedriasecs.map((riasec) => (
            <tr key={riasec.id}>
                <td>{riasec.type_name}</td>
                <td>{riasec.unique_description}</td>
                <td>
                    {riasec.strength && riasec.strength.includes('<') ? (
                        <div dangerouslySetInnerHTML={{ __html: riasec.strength }} />
                    ) : (
                        riasec.strength
                    )}
                </td>
                <td style={{ color: getStatusDisplay(riasec.status).color }}>
                    {getStatusDisplay(riasec.status).text}
                </td>
                <td>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
                                onClick={() => handleEdit(riasec.id)}
                            />
                            <MDBSwitch
                                id={`switch-${riasec.id}`}
                                checked={riasec.status === "1"}
                                onChange={() => handleToggleSwitch(riasec.id, riasec.status)}
                                style={{
                                    color: riasec.status === "1" ? "green" : ""
                                }}
                            />
                        </>
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
    const handleStatChange = (stat) => {
      setSelectedStat(stat);
      setCurrentPage(1);
      fetchriasecs(1, rowsPerPage, searchQuery, stat);
    };
    return (
        <>
         {loading ? (
            <CircleDotLoader />
            ) : (
            <TableWithControls
                theadContent={theadContent}
                tbodyContent={tbodyContent}
            //  onSearch={handleSearch}
                onSort={handleSort}
                onAddButtonClick={handleAddriasec}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                showSearch={false}
                showRowsPerPage={true}
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
                {targetriasec?.action === "true" ? "Enable" : "Disable"} this riasec?
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

export default AdminRiasecContent;
