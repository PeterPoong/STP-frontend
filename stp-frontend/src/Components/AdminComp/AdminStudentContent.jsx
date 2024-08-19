import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import '../../css/AdminStyles/AdminTableStyles.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const AdminStudentContent = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://192.168.0.69:8000/api/admin/studentList', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 1|DRHGDVlFQDDqAkw74VHXVzRXyKZhC1h5eBTdwePW882ca2b8',
                    },
                });
                
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const result = await response.json();
                setStudents(result.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const handleEdit = (id) => {
        // Handle edit action
    };

    const handleDelete = (id) => {
        // Handle delete action
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
                                <th>Email</th>
                                <th>Status</th>
                                <th className="RightTableCorner">Action</th>
                            </tr>
                        </thead>
                        <tbody className="AdminTableBody">
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.student_userName}</td>
                                    <td>{student.student_email}</td>
                                    <td>{student.student_status === 1 ? "Active" : "Inactive"}</td>
                                    <td>
                                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                            <FontAwesomeIcon
                                                icon={faEdit}
                                                className="action-icon edit-icon"
                                                title="Edit"
                                                onClick={() => handleEdit(student.id)}
                                            />
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                className="action-icon delete-icon"
                                                title="Delete"
                                                onClick={() => handleDelete(student.id)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>
        </Container>
    );
};

export default AdminStudentContent;
