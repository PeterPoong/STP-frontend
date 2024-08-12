import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../../css/AdminStyles/AdminTableStyles.css';

const AdminSubjectContent = () => {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await fetch('http://192.168.0.69:8000/api/admin/subjectList', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 1|DRHGDVlFQDDqAkw74VHXVzRXyKZhC1h5eBTdwePW882ca2b8',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setSubjects(result.data); // Assuming 'data' contains the array of subjects
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSubjects();
    }, []);

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
