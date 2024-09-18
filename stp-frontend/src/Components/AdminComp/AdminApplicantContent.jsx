import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { MDBSwitch } from 'mdb-react-ui-kit';
import '../../css/AdminStyles/AdminTableStyles.css';
import TableWithControls from './TableWithControls';

const AdminApplicantContent = () => {
    const [Applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [targetApplicant, setTargetApplicant] = useState(null);
    const [totalPages, setTotalPages] = useState(1); // Start with 1 page
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
     // To track if there are search results
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`;
    const navigate = useNavigate();

    const fetchApplicants = async (page = 1, perPage = rowsPerPage, search = searchQuery) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/applicantDetailInfo?page=${page}&per_page=${perPage}&search=${search}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": Authenticate,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! form_status: ${response.form_status}`);
            }

            const result = await response.json();
            if (result && result.data) {
                setApplicants(result.data);
                setTotalPages(result.last_page);
                setCurrentPage(result.current_page);
                setIsSearchResults(result.total > rowsPerPage);
            } else {
                setApplicants([]);
            }
        } catch (error) {
            setError(error.message);
            console.error("Error fetching the Applicant list:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplicants(currentPage, rowsPerPage, searchQuery);
    }, [Authenticate, currentPage, rowsPerPage, searchQuery]);

    const handleRowsPerPageChange = (newRowsPerPage) => {
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(1); // Reset to the first page whenever rows per page changes
        fetchApplicants(1, newRowsPerPage, searchQuery); // Fetch data with updated rowsPerPage
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1); // Reset to the first page whenever search query changes
        fetchApplicants(1, rowsPerPage, query); // Fetch data with updated search query
    };

    const handleSort = (column) => {
        const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
        setSortColumn(column);
        setSortDirection(newDirection);
        fetchApplicants(currentPage, rowsPerPage, searchQuery); // Fetch sorted data
    };

    const sortedApplicants = (() => {
        if (!sortColumn || !sortDirection) return Applicants;
    
        return [...Applicants].sort((a, b) => {
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
        setTargetApplicant({ id, action });
        setShowModal(true);
    };
    
    const handleAddApplicant = () => {
        sessionStorage.setItem('token', Authenticate);
        navigate('/adminAddApplicant');
    };
    const handleEdit = (id) => {
        console.log(`Edit Applicant with ID: ${id}`);
        sessionStorage.setItem('token', Authenticate);
        navigate(`/adminEditApplicant/${id}`);
    };
    

    const handleToggleSwitch = (id, currentStatus) => {
        const action = (currentStatus === 'Active' || currentStatus === 'Temporary'|| currentStatus === 'Accepted') ? 'disable' : 'enable';
        setTargetApplicant({ id, action });
        setShowModal(true);
    };

    const confirmAction = async () => {
        if (!targetApplicant) return;
    
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/editApplicantStatus`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": Authenticate,
                },
                body: JSON.stringify({
                    id: targetApplicant.id,
                    type: targetApplicant.action
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! form_status: ${response.form_status}`);
            }
    
            const result = await response.json();
    
            if (result.success) {
                // Fetch the updated data from the database
                await fetchApplicants(currentPage, rowsPerPage, searchQuery);
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error("Error processing the action:", error);
        } finally {
            setShowModal(false);
            setTargetApplicant(null);
        }
    };
    
    const getStatusClass = (form_status) => {
        switch (form_status) {
            case 'Disable':
                return 'status-disable';
            case 'Rejected':
                return 'status-disable';
            case 'Temporary-Disable':
                return 'status-disable';
            case 'Active':
                return 'status-active';
            case 'Accepted':
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
                Course(s) {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("institute")}>
                Institution {sortColumn === "institute" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("student")}>
                Student {sortColumn === "student" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("contact")}>
                Contact No. {sortColumn === "contact" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("form_status")}>
                Status {sortColumn === "form_status" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th>Action</th>
        </tr>
    );

    const tbodyContent = sortedApplicants.map((Applicant) => (
        <tr key={Applicant.id}>
            <td>{Applicant.course_name}</td>
            <td>{Applicant.institution}</td>
            <td>{Applicant.student_name}</td>
            <td>{Applicant.country_code}{Applicant.contact_number}</td>
            <td className={getStatusClass(Applicant.form_status)}>
                {Applicant.form_status}
            </td>
            <td>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {Applicant.form_status === 'Pending' ? (
                    <>
                        <Button className="accept"
                            variant="success"
                            onClick={() => handlePendingAction(Applicant.id, 'Accept')}
                        >
                            Accept
                        </Button>
                        <Button className="rejected"
                            variant="danger"
                            onClick={() => handlePendingAction(Applicant.id, 'Reject')}
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
                        onClick={() => handleEdit(Applicant.id)}
                    />
                    <MDBSwitch
                        id={`switch-${Applicant.id}`}
                        checked={Applicant.form_status === 'Active' || Applicant.form_status === 'Temporary'||Applicant.form_status === 'Accepted' }
                        onChange={() => handleToggleSwitch(Applicant.id, Applicant.form_status)}
                        style={{
                            color: (Applicant.form_status === 'Active' || Applicant.form_status === 'Temporary'||Applicant.form_status === 'Accepted') ? 'green' : ''
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
                onAddButtonClick={handleAddApplicant}
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
                    Are you sure you want to {targetApplicant?.action === 'enable' ? 'Accept' : 'Reject'} this Applicant?
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

export default AdminApplicantContent;
