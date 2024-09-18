import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { MDBSwitch } from 'mdb-react-ui-kit';
import '../../css/AdminStyles/AdminTableStyles.css';
import TableWithControls from './TableWithControls';

const AdminSchoolContent = () => {
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [targetSchool, setTargetSchool] = useState(null);
    const [totalPages, setTotalPages] = useState(1); // Start with 1 page
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
     // To track if there are search results
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`;
    const navigate = useNavigate();

    const fetchSchools = async (page = 1, perPage = rowsPerPage, search = searchQuery) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/schoolList?page=${page}&per_page=${perPage}&search=${search}`, {
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
                setSchools(result.data);
                setTotalPages(result.last_page);
                setCurrentPage(result.current_page);
                setIsSearchResults(result.total > rowsPerPage);
            } else {
                setSchools([]);
            }
        } catch (error) {
            setError(error.message);
            console.error("Error fetching the school list:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSchools(currentPage, rowsPerPage, searchQuery);
    }, [Authenticate, currentPage, rowsPerPage, searchQuery]);

    const handleRowsPerPageChange = (newRowsPerPage) => {
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(1); // Reset to the first page whenever rows per page changes
        fetchSchools(1, newRowsPerPage, searchQuery); // Fetch data with updated rowsPerPage
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1); // Reset to the first page whenever search query changes
        fetchSchools(1, rowsPerPage, query); // Fetch data with updated search query
    };

    const handleSort = (column) => {
        const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
        setSortColumn(column);
        setSortDirection(newDirection);
        fetchSchools(currentPage, rowsPerPage, searchQuery); // Fetch sorted data
    };

    const sortedSchools = (() => {
        if (!sortColumn || !sortDirection) return schools;
    
        return [...schools].sort((a, b) => {
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
        setTargetSchool({ id, action });
        setShowModal(true);
    };
    
    const handleAddSchool = () => {
        sessionStorage.setItem('token', Authenticate);
        navigate('/adminAddSchool');
    };
    const handleEdit = (id) => {
        console.log(`Edit school with ID: ${id}`);
        sessionStorage.setItem('token', Authenticate);
        navigate(`/adminEditSchool/${id}`);
    };
    

    const handleToggleSwitch = (id, currentStatus) => {
        const action = (currentStatus === 'Active' || currentStatus === 'Temporary') ? 'disable' : 'enable';
        setTargetSchool({ id, action });
        setShowModal(true);
    };

    const confirmAction = async () => {
        if (!targetSchool) return;
    
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/editSchoolStatus`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": Authenticate,
                },
                body: JSON.stringify({
                    id: targetSchool.id,
                    type: targetSchool.action
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const result = await response.json();
    
            if (result.success) {
                // Fetch the updated data from the database
                await fetchSchools(currentPage, rowsPerPage, searchQuery);
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error("Error processing the action:", error);
        } finally {
            setShowModal(false);
            setTargetSchool(null);
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
            <th onClick={() => handleSort("contact")}>
                Contact No. {sortColumn === "contact" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("category")}>
                Category {sortColumn === "category" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("status")}>
                Status {sortColumn === "status" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th>Action</th>
        </tr>
    );

    const tbodyContent = sortedSchools.map((school) => (
        <tr key={school.id}>
            <td>{school.name}</td>
            <td>{school.email}</td>
            <td>{school.contact}</td>
            <td>{school.category}</td>
            <td className={getStatusClass(school.status)}>
                {school.status}
            </td>
            <td>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {school.status === 'Pending' ? (
                    <>
                        <Button className="accept"
                            variant="success"
                            onClick={() => handlePendingAction(school.id, 'enable')}
                        >
                            Accept
                        </Button>
                        <Button className="rejected"
                            variant="danger"
                            onClick={() => handlePendingAction(school.id, 'disable')}
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
                        style={{ marginRight: '8px', color: '#691ED2', cursor: 'pointer' }}
                        onClick={() => handleEdit(school.id)}
                    />
                    <MDBSwitch
                        id={`switch-${school.id}`}
                        checked={school.status === 'Active' || school.status === 'Temporary'}
                        onChange={() => handleToggleSwitch(school.id, school.status)}
                        style={{
                            color: (school.status === 'Active' || school.status === 'Temporary') ? 'green' : ''
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
                onAddButtonClick={handleAddSchool}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to {targetSchool?.action === 'enable' ? 'Accept' : 'Reject'} this school?
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

export default AdminSchoolContent;
