import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { MDBSwitch } from 'mdb-react-ui-kit';
import CircleDotLoader from './CircleDotLoader';
import '../../css/AdminStyles/AdminTableStyles.css';
import TableWithControls from './TableWithControls';

const AdminCategoryContent = () => {
    const [Categorys, setCategorys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null); 
    const [targetCategory, setTargetCategory] = useState(null);
    const [totalPages, setTotalPages] = useState(1); // Start with 1 page
    const [isSearchResults, setIsSearchResults] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [showAddButton, setShowAddButton] = useState(true); // Set true if you want the button to always show
    const [riasecDetails, setRiasecDetails] = useState({});

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
        fetchCategorys(); // Fetch enquiries initially
    }, []);
    const fetchCategorys = async (page = 1, perPage = rowsPerPage, search = searchQuery, stat = selectedStat) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/categoryListAdmin?page=${page}&per_page=${perPage}&search=${search}&stat=${stat}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": Authenticate,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! category_status: ${response.category_status}`);
            }

            const result = await response.json();
            if (result && result.data) {
                setCategorys(result.data);
                setTotalPages(result.last_page);
                setCurrentPage(result.current_page);
                setIsSearchResults(result.total > rowsPerPage);
            } else {
                setCategorys([]);
            }
        } catch (error) {
            setError(error.message);
            console.error("Error fetching the Category list:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRiasecDetails = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/riasecDetail`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": Authenticate,
                },
                body: JSON.stringify({ id })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            if (result.success) {
                setRiasecDetails(prev => ({
                    ...prev,
                    [id]: result.data.updateRiasecType
                }));
            }
        } catch (error) {
            console.error("Error fetching RIASEC details:", error);
        }
    };

    useEffect(() => {
        fetchCategorys(currentPage, rowsPerPage, searchQuery, selectedStat);
    }, [Authenticate, currentPage, rowsPerPage, searchQuery, selectedStat]);

    useEffect(() => {
        if (Categorys.length > 0) {
            Categorys.forEach(category => {
                if (category.riasec && !riasecDetails[category.riasec]) {
                    fetchRiasecDetails(category.riasec);
                }
            });
        }
    }, [Categorys]);

    const handleRowsPerPageChange = (newRowsPerPage) => {
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(1); // Reset to the first page whenever rows per page changes
        fetchCategorys(1, newRowsPerPage, searchQuery, selectedStat); // Fetch data with updated rowsPerPage
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1); // Reset to the first page whenever search query changes
        fetchCategorys(1, rowsPerPage, query, selectedStat); // Fetch data with updated search query
    };

    const handleSort = (column) => {
        const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
        setSortColumn(column);
        setSortDirection(newDirection);
        fetchCategorys(currentPage, rowsPerPage, searchQuery, selectedStat); // Fetch sorted data
    };

    // Toggle for hotpick status
    const handleToggleHotPick = (id, currentHotPick) => {
        const action = currentHotPick === 1 ? 'disable' : 'enable';
        setTargetCategory({ id, action });
        setModalType('hotpick');  // Set modal type for hotpick action
        setShowModal(true);
    };

    const confirmHotPickAction = async () => {
        if (!targetCategory) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/editHotPick`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": Authenticate,
                },
                body: JSON.stringify({
                    id: targetCategory.id,
                    type: targetCategory.action
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! category_status: ${response.category_status}`);
            }

            const result = await response.json();
            if (result.success) {
                await fetchCategorys(currentPage, rowsPerPage, searchQuery, selectedStat);
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error("Error processing the action:", error);
        } finally {
            setShowModal(false);
            setTargetCategory(null);
        }
    };

    const confirmModalAction = () => {
        if (modalType === 'status') {
            confirmAction();  // Call status confirmation
        } else if (modalType === 'hotpick') {
            confirmHotPickAction();  // Call hotpick confirmation
        }
    };

    const sortedCategorys = (() => {
        if (!sortColumn || !sortDirection) return Categorys;
    
        return [...Categorys].sort((a, b) => {
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
        setTargetCategory({ id, action });
        setShowModal(true);
    };
    
    const handleAddCategory = () => {
        sessionStorage.setItem('token', Authenticate);
        navigate('/adminAddCategory');
    };
    const handleEdit = (id) => {
        // console.log(`Edit Category with ID: ${id}`); // Log the ID being passed
        sessionStorage.setItem('categoryId', id); // Store course ID in session storage
        navigate(`/adminEditCategory`); // Navigate to the edit page
    };
    const handleToggleSwitch = (id, currentStatus) => {
        const action = currentStatus === 'Active' ? 'disable' : 'enable';
        setTargetCategory({ id, action });
        setModalType('status');  // Set modal type for status action
        setShowModal(true);
    };


    const confirmAction = async () => {
        if (!targetCategory) return;
    
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/editCategoryStatus`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": Authenticate,
                },
                body: JSON.stringify({
                    id: targetCategory.id,
                    type: targetCategory.action
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! category_status: ${response.category_status}`);
            }
    
            const result = await response.json();
    
            if (result.success) {
                // Fetch the updated data from the database
                await fetchCategorys(currentPage, rowsPerPage, searchQuery, selectedStat);
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error("Error processing the action:", error);
        } finally {
            setShowModal(false);
            setTargetCategory(null);
        }
    };
    
    const getStatusDisplay = (status) => {
        switch (status) {
            case 'Active':
                return { text: status, color: 'green' };
            case 'Disable':
                return { text: status, color: 'red' };
            default:
                return { text: status, color: 'red' };
        }
    };

    const theadContent = (
        <tr>
            <th onClick={() => handleSort("name")}>
                Name {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("hotpick")}>
                Hotpick {sortColumn === "email" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("riasecTypes")}>
                RIASEC Type {sortColumn === "riasecTypes" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("status")}>
                Status {sortColumn === "status" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th>Action</th>
        </tr>
    );

    const tbodyContent = sortedCategorys.length > 0 ? (
        sortedCategorys.map((Category) => (
        <tr key={Category.id}>
            <td>{Category.name}</td>
            <td>
                <input
                    className="categoryBox"
                    type="checkbox"
                    checked={Category.course_hotPick === 1}
                    onChange={() => handleToggleHotPick(Category.id, Category.course_hotPick)}
                />
            </td>
            <td>{riasecDetails[Category.riasec] || Category.riasec}</td>
            <td style={{ color: getStatusDisplay(Category.category_status).color }}>
                {getStatusDisplay(Category.category_status).text}
            </td>
            <td>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               
                    <>
                    <FontAwesomeIcon
                        className="icon-color-edit"
                        title="Edit"
                        icon={faEdit}
                        style={{ marginRight: '8px', color: '#691ED2', cursor: 'pointer' }}
                        onClick={() => handleEdit(Category.id)}
                    />
                    <MDBSwitch
                        id={`switch-${Category.id}`}
                        checked={Category.category_status === 'Active'}
                        onChange={() => handleToggleSwitch(Category.id, Category.category_status)}
                        style={{
                            color: (Category.category_status === 'Active' ) ? 'green' : ''
                        }}
                    />
                </>
                
                </div>
                
            </td>
        </tr>
     ))
    ) : (
        <tr>
            <td colSpan="6" style={{ textAlign: "center" }}>No Data Available</td>
        </tr>
    );
    const handleStatChange = (stat) => {
        setSelectedStat(stat);
        setCurrentPage(1);
        fetchCategorys(1, rowsPerPage, searchQuery, stat);
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
                onAddButtonClick={handleAddCategory}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
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
                    Are you sure you want to {modalType === 'status'
                        ? (targetCategory?.action === 'enable' ? 'Enable' : 'Disable') + ' this category?'
                        : (targetCategory?.action === 'enable' ? 'Enable' : 'Disable') + ' HotPick?'}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button className="confirm" variant="primary" onClick={confirmModalAction}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AdminCategoryContent;
