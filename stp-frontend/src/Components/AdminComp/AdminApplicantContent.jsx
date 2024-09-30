import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
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
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [feedback, setFeedback] = useState("");  // State for feedback input
    const [targetApplicant, setTargetApplicant] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
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
        fetchApplicants(currentPage, rowsPerPage, searchQuery, sortColumn, sortDirection);
    }, [currentPage, rowsPerPage, searchQuery, sortColumn, sortDirection]);

    const handleRowsPerPageChange = (newRowsPerPage) => {
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(1); 
        fetchApplicants(1, newRowsPerPage, searchQuery);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
        fetchApplicants(1, rowsPerPage, query);
    };

    const handleSort = (column) => {
        const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
        setSortColumn(column);
        setSortDirection(newDirection);
        fetchApplicants(currentPage, rowsPerPage, searchQuery);
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
 
    const handleToggleSwitch = (id, currentStatus) => {
        const action = (currentStatus === 'Active' || currentStatus === 'Temporary'|| currentStatus === 'Accepted') ? 'disable' : 'enable';
        setTargetApplicant({ id, action });
        setShowModal(true);
    };
    const handleEdit = (id) => {
        console.log(`Edit applicant with ID: ${id}`); // Log the ID being passed
        sessionStorage.setItem('applicantId', id); // Store package ID in session storage
        navigate(`/adminEditApplicant`); // Navigate to the edit page
    };
    const confirmAction = async () => {
        if (!targetApplicant) return;

        // Show feedback modal after confirming the action
        setShowModal(false);
        setShowFeedbackModal(true);
    };

    const submitFeedback = async () => {
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
                    type: targetApplicant.action,
                    feedback: feedback // Send feedback to the backend
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! form_status: ${response.form_status}`);
            }

            const result = await response.json();

            if (result.success) {
                await fetchApplicants(currentPage, rowsPerPage, searchQuery); // Fetch updated data
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error("Error processing the action:", error);
        } finally {
            setShowFeedbackModal(false);
            setTargetApplicant(null);
        }
    };

    const getStatusClass = (form_status) => {
        switch (form_status) {
            case 'Disable':
                return 'status-disable';
            case 'Rejected':
                return 'status-rejected';
            case 'Temporary-Disable':
                return 'status-disable';
            case 'Active':
                return 'status-active';
            case 'Accepted':
             return 'status-accepted';
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
                Student Name{sortColumn === "student" && (sortDirection === "asc" ? "↑" : "↓")}
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
                 totalPages={totalPages}
                 currentPage={currentPage}
                 onPageChange={handlePageChange}
                 onRowsPerPageChange={handleRowsPerPageChange}
            />

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to {targetApplicant?.action} this applicant?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={confirmAction}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showFeedbackModal} onHide={() => setShowFeedbackModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Provide Feedback</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Feedback</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                placeholder="Enter your feedback here..."
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowFeedbackModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={submitFeedback}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AdminApplicantContent;
