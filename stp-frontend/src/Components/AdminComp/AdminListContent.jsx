import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { MDBSwitch } from 'mdb-react-ui-kit';
import '../../css/AdminStyles/AdminTableStyles.css';
import TableWithControls from './TableWithControls';


const AdminListContent = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [targetAdmin, setTargetAdmin] = useState(null);
    const [totalPages, setTotalPages] = useState(1); // Start with 1 page
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [showAddButton, setShowAddButton] = useState(true); // Set true if you want the button to always show

     // To track if there are search results
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`;
    const navigate = useNavigate();

    const fetchAdmins = async (page = 1, perPage = rowsPerPage, search = searchQuery) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/adminListAdmin?page=${page}&per_page=${perPage}&search=${search}`, {
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
            if (result && result.data) {
                setAdmins(result.data);
                setTotalPages(result.last_page);
                setCurrentPage(result.current_page);
                setIsSearchResults(result.total > rowsPerPage);
            } else {
                setAdmins([]);
            }
        } catch (error) {
            setError(error.message);
            console.error("Error fetching the admin list:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmins(currentPage, rowsPerPage, searchQuery);
    }, [Authenticate, currentPage, rowsPerPage, searchQuery]);

    const handleRowsPerPageChange = (newRowsPerPage) => {
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(1); // Reset to the first page whenever rows per page changes
        fetchAdmins(1, newRowsPerPage, searchQuery); // Fetch data with updated rowsPerPage
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1); // Reset to the first page whenever search query changes
        fetchAdmins(1, rowsPerPage, query); // Fetch data with updated search query
    };

    const handleSort = (column) => {
        const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
        setSortColumn(column);
        setSortDirection(newDirection);
        fetchAdmins(currentPage, rowsPerPage, searchQuery); // Fetch sorted data
    };

    const sortedAdmins = (() => {
        if (!sortColumn || !sortDirection) return admins;
    
        return [...admins].sort((a, b) => {
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
        setTargetAdmin({ id, action });
        setShowModal(true);
    };
    
    const handleAddAdmin = () => {
        sessionStorage.setItem('token', Authenticate);
        navigate('/adminAddAdmin');
    };
    const handleEdit = (id) => {
        console.log(`Edit admin with ID: ${id}`);
        sessionStorage.setItem('token', Authenticate);
        navigate(`/adminEditAdmin/${id}`);
    };
    

    const handleToggleSwitch = (id, currentStatus) => {
        const action = (currentStatus === 'Active' || currentStatus === 'Temporary') ? 'disable' : 'enable';
        setTargetAdmin({ id, action });
        setShowModal(true);
    };

    const confirmAction = async () => {
        if (!targetAdmin) return;
    
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/disableAdmin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": Authenticate,
                },
                body: JSON.stringify({
                    id: targetAdmin.id,
                    type: targetAdmin.action
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const result = await response.json();
    
            if (result.success) {
                // Fetch the updated data from the database
                await fetchAdmins(currentPage, rowsPerPage, searchQuery);
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error("Error processing the action:", error);
        } finally {
            setShowModal(false);
            setTargetAdmin(null);
        }
    };
    
    const getStatusClass = (status) => {
        switch (status) {
            case 'Disable':
                return 'status-disable';
            case 'Temporary-Disable':
                return 'status-disable';
            case 'Active':
                return 'status-active';
            case 'Pending':
                return 'status-pending';
            case 'Temporary':
                return 'status-temporary';
            default:
                return '';
        }
    };

    const theadContent = (
        <tr>
            <th onClick={() => handleSort("name")}>
                Name {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("email")}>
                Email {sortColumn === "email" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("ICNumber")}>
                IC Number {sortColumn === "ICNumber" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("contact")}>
                Contact No. {sortColumn === "contact" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("status")}>
                Status {sortColumn === "status" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th>Action</th>
        </tr>
    );

    const tbodyContent = sortedAdmins.map((Admin) => (
        <tr key={Admin.id}>
            <td>{Admin.name}</td>
            <td>{Admin.email}</td>
            <td>{Admin.ic_number}</td>
            <td>{Admin.contact_no}</td>
            <td className={getStatusClass(Admin.status)}>
                {Admin.status}
            </td>
            <td>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {Admin.status === 'Pending' ? (
                    <>
                        <Button className="accept"
                            variant="success"
                            onClick={() => handlePendingAction(Admin.id, 'enable')}
                        >
                            Accept
                        </Button>
                        <Button className="rejected"
                            variant="danger"
                            onClick={() => handlePendingAction(Admin.id, 'disable')}
                        >
                            Reject
                        </Button>
                    </>
                ) : (
                    <>
                    {/* <FontAwesomeIcon
                        className="icon-color-edit"
                        title="Edit"
                        icon={faEdit}
                        style={{ marginRight: '8px', color: '#691ED2', cursor: 'pointer' }}
                        onClick={() => handleEdit(Admin.id)}
                    /> */}
                    <MDBSwitch
                        id={`switch-${Admin.id}`}
                        checked={Admin.status === 'Active' || Admin.status === 'Temporary'}
                        onChange={() => handleToggleSwitch(Admin.id, Admin.status)}
                        style={{
                            color: (Admin.status === 'Active' || Admin.status === 'Temporary') ? 'green' : ''
                        }}
                    />
                </>
                 )}
                </div>
                
            </td>
        </tr>
    ));

    return (
        <>
            <TableWithControls
                theadContent={theadContent}
                tbodyContent={tbodyContent}
                onSearch={handleSearch}
                onSort={handleSort}
                onAddButtonClick={handleAddAdmin}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                // showAddButton={showAddButton}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to {targetAdmin?.action === 'enable' ? 'Accept' : 'Reject'} this Admin?
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

export default AdminListContent;
