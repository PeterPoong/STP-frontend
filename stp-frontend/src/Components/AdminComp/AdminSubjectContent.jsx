import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../../css/AdminStyles/AdminTableStyles.css';

const AdminSubjectContent = () => {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage
    const Authenticate = `Bearer ${token}`;

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await fetch('http://192.168.0.69:8000/api/admin/subjectList', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authenticate,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setSubjects(result.data || []); // Ensure subjects is always an array
            } catch (error) {
                setError(error.message);
                setSubjects([]); // Set subjects to empty array on error to avoid undefined
            } finally {
                setLoading(false);
            }
        };

        fetchSubjects();
    }, [Authenticate]);

    // Define handleEdit function
    const handleEdit = (subjectId) => {
        // Implement edit functionality here
        console.log(`Edit subject with ID: ${subjectId}`);
    };

    // Define handleDelete function
    const handleDelete = (subjectId) => {
        // Implement delete functionality here
        console.log(`Delete subject with ID: ${subjectId}`);
    };

    return (
        <Container fluid>
            <div className="TableContainer">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    <Table className="AdminTable" striped hover>
                        <thead className="AdminTableHead">
                            <tr>
                                <th className="LeftTableCorner">Name</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th className="RightTableCorner">Action</th>
                            </tr>
                        </thead>
                        <tbody className="AdminTableBody">
                            {subjects.length > 0 ? (
                                subjects.map((subject) => (
                                    <tr key={subject.id}>
                                        <td>{subject.name}</td>
                                        <td>{subject.category}</td>
                                        <td>{subject.status}</td>
                                        <td>
                                            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                                <FontAwesomeIcon
                                                    icon={faEdit}
                                                    className="action-icon edit-icon"
                                                    title="Edit"
                                                    onClick={() => handleEdit(subject.id)}
                                                />
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    className="action-icon delete-icon"
                                                    title="Delete"
                                                    onClick={() => handleDelete(subject.id)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                )}
            </div>           
        </Container>
    );
};

export default AdminSubjectContent;
