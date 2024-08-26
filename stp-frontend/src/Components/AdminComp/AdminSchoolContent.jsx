import React, { useEffect, useState } from "react";
import { Container, Table, Dropdown, Form, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import '../../css/AdminStyles/AdminTableStyles.css';
import TableWithControls from './TableWithControls'; // Adjust the path accordingly

const AdminSchoolContent = () => {
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortColumn, setSortColumn] = useState(null); // No initial sorting
    const [sortDirection, setSortDirection] = useState(null); // No initial sorting
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/schoolList`, {
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
                if (result && Array.isArray(result) && result[0].data) {
                    setSchools(result[0].data);
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

        fetchSchools();
    }, [Authenticate]);

    const handleEdit = (id) => {
        console.log(`Edit school with ID: ${id}`);
        // Implement edit functionality here
    };

    const handleDelete = (id) => {
        console.log(`Delete school with ID: ${id}`);
        setDeleteId(id);
        setShowModal(true);
        // Implement delete functionality here
    };

    const confirmDelete = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/editSchoolStatus`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": Authenticate,
                },
                body: JSON.stringify({
                    id: deleteId,
                    type: 'disable' // what status you want to pass to the backend
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            if (result.success) {
                // Update local state to remove deleted school
                setSchools(schools.filter(school => school.id !== deleteId));
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error("Error deleting the school:", error);
        } finally {
            setShowModal(false);
        }
    };

    const handleAddSchool = () => {
        sessionStorage.setItem('token', Authenticate);
        navigate('/adminAddSchool'); // Redirect to AdminAddSchool page
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Disable':
                return 'status-disable'; // Red
            case 'Active':
                return 'status-active';  // Green
            case 'Pending':
                return 'status-pending'; // Yellow
            case 'Temporary':
                return 'status-temporary'; // Gray
            default:
                return '';
        }
    };

    const handleSort = (column) => {
        // Toggle sort direction if the same column is clicked
        const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
        setSortColumn(column);
        setSortDirection(newDirection);
    };

    const sortedSchools = (() => {
        if (!sortColumn || !sortDirection) return schools; // No sorting if column or direction is not set

        return [...schools].sort((a, b) => {
            const aValue = a[sortColumn].toString().toLowerCase();
            const bValue = b[sortColumn].toString().toLowerCase();

            if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
            if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });
    })();

    // Thead content
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

    // Tbody content
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
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <FontAwesomeIcon
                        className="icon-color-edit"
                        title="Edit"
                        icon={faEdit}
                        style={{ marginRight: '8px', color: '#691ED2', cursor: 'pointer' }}
                        onClick={() => handleEdit(school.id)}
                    />
                    {school.status !== 'Disable' && (
                        <FontAwesomeIcon
                            className="icon-color-delete"
                            title="Delete"
                            icon={faTrash}
                            style={{ marginRight: '8px', color: '#dc3545', cursor: 'pointer' }}
                            onClick={() => handleDelete(school.id)}
                        />
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
            onAddButtonClick={handleAddSchool}
            onSort={handleSort} // Pass handleSort to TableWithControls
        />
        <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this school?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={confirmDelete}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AdminSchoolContent;
