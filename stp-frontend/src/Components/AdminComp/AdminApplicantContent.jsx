import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { MDBSwitch } from 'mdb-react-ui-kit';
import CircleDotLoader from './CircleDotLoader';
import '../../css/AdminStyles/AdminTableStyles.css';
import TableWithControls from './TableWithControls';

const AdminApplicantContent = () => {
    const [Applicants, setApplicants] = useState([]);
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
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`;
    const navigate = useNavigate();
    const [statList, setStatList] = useState([]); // State for category list
    const [schList, setSchList] = useState([]); // State for category list
    const [selectedStat, setSelectedStat] = useState(""); // State for selected subject
    const [selectedSch, setSelectedSch] = useState('');
    const fetchSchList = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/schoolListAdmin`, {
              method: 'GET',
              headers: {
                  'Authorization': Authenticate,
              },
          });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const result = await response.json();
            console.log("Fetched School List:", result); // Log the fetched data
            if (result && result.length > 0) { // Check if result has data
                setSchList(result);
            } else {
                setSchList([]);
            }
        } catch (error) {
            setError(error.message);
            console.error("Error fetching the school list:", error);
        }
    };
    useEffect(() => {
        // Hardcoded statList values
        const hardcodedStatList = [
            { id: 0, name: "Disable" },
            { id: 1, name: "Active" },
            { id: 2, name: "Pending" },
            { id: 3, name: "Rejected" },
            { id: 4, name: "Accepted" },
        ];
        setStatList(hardcodedStatList);
        fetchSchList();
        fetchApplicants(); // Fetch enquiries initially
    }, []);
    const fetchApplicants = async (
        page = 1, 
        perPage = rowsPerPage, 
        search = searchQuery,
        stat = selectedStat,
        school_id = selectedSch) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/applicantDetailInfo?page=${page}&per_page=${perPage === "All" ? subjects.length : perPage}&search=${search}&stat=${stat}&school_id=${school_id}`, {
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
        fetchApplicants(currentPage, rowsPerPage, searchQuery, selectedStat, selectedSch, sortColumn, sortDirection);
    }, [currentPage, rowsPerPage, searchQuery, selectedStat,selectedSch, sortColumn, sortDirection]);

    const handleRowsPerPageChange = (newRowsPerPage) => {
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(1); 
        fetchApplicants(1, newRowsPerPage === "All" ? subjects.length : newRowsPerPage, searchQuery, selectedStat, selectedSch);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
        fetchApplicants(1, rowsPerPage, query, selectedStat, selectedSch);
    };

    const handleSort = (column) => {
        const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
        setSortColumn(column);
        setSortDirection(newDirection);
        fetchApplicants(currentPage, rowsPerPage, searchQuery, selectedStat, selectedSch);
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
        // console.log(`Edit applicant with ID: ${id}`); // Log the ID being passed
        sessionStorage.setItem('applicantId', id); // Store package ID in session storage
        navigate(`/adminEditApplicant`); // Navigate to the edit page
    };
    const handleProfile = (id) => {
        // console.log(`Edit applicant with ID: ${id}`); // Log the ID being passed
        sessionStorage.setItem('applicantId', id); // Store package ID in session storage
        navigate(`/applicantProfile`); // Navigate to the edit page
    };
    const confirmAction = async () => {
        if (!targetApplicant) return;

        // Show feedback modal after confirming the action
        setShowModal(false);
        setShowFeedbackModal(true);
    };
    const handleStatChange = (statId) => {
        setSelectedStat(statId);
        setCurrentPage(1);
        fetchApplicants(1, rowsPerPage, searchQuery, statId);
    };
    const handleSchoolChange = (schoolId) => {
        setSelectedSch(schoolId); // Update the selected school
        setCurrentPage(1); // Reset to the first page
        fetchApplicants(1, rowsPerPage, searchQuery, selectedStat, schoolId); // Fetch courses with the new school filter
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

    const getStatusColor = (form_status) => {
        switch (form_status) {
            case 'Disable':
            case 'Rejected':
            case 'Temporary-Disable':
                return 'red';
            case 'Active':
            case 'Accepted':
                return 'green';
            case 'Pending':
                return '#FFAA1D';
            case 'Temporary':
                return '#D2691E';
            default:
                return 'inherit';
        }
    };

    const theadContent = (
        <tr>
            <th onClick={() => handleSort("student")}>
                Username{sortColumn === "student" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("student")}>
                Fullname{sortColumn === "student" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("name")}>
                Course(s) {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("institute")}>
                Institution {sortColumn === "institute" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("contact")}>
                Contact No. {sortColumn === "contact" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("created_date")}>
                Applied Date {sortColumn === "created_date" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("form_status")}>
                Status {sortColumn === "form_status" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th>Action</th>
            <th>Profile</th>
        </tr>
    );

    const tbodyContent = sortedApplicants.length > 0 ? (
    sortedApplicants.map((Applicant) => (
        <tr key={Applicant.id}>
            <td>{Applicant.username}</td>
            <td>{Applicant.student_name}</td>
            <td>{Applicant.course_name}</td>
            <td>{Applicant.institution}</td>
            <td>{Applicant.country_code}{Applicant.contact_number}</td>
            <td>{Applicant.created_date}</td>
            <td style={{ color: getStatusColor(Applicant.form_status) }}>
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
            <td>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                   
                            <FontAwesomeIcon
                                className="icon-color-edit"
                                title="View Profile"
                                icon={faUser}
                                style={{ marginRight: '8px', color: '#691ED2', cursor: 'pointer' }}
                                onClick={() => handleProfile(Applicant.id)}
                            />
                </div>
            </td>
        </tr>
    ))
) : (
    <tr>
    <td colSpan="6" style={{ textAlign: "center" }}>No Data Available</td>
</tr>
);
    return (
        <div className="applicant-content">
            {loading ? (
                <CircleDotLoader />
            ) : (
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
                        statList={statList}
                        schList={schList}
                        onSchChange={handleSchoolChange}
                        onStatChange={handleStatChange}
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
            )}
        </div>
    );
};

export default AdminApplicantContent;
