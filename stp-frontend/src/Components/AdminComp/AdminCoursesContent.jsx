import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import '../../css/AdminStyles/AdminTableStyles.css';

const AdminCoursesContent = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://192.168.0.69:8000/api/admin/courseList', {
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
                setCourses(result.data); // Assuming 'data' contains the array of courses
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
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
                                <th className="LeftTableCorner">Course Name</th>
                                <th>School</th>
                                <th>Category</th>
                                <th>Qualification</th>
                                <th>Status</th>
                                <th className="RightTableCorner">Action</th>
                            </tr>
                        </thead>
                        <tbody className="AdminTableBody">
                            {courses.length > 0 ? (
                                courses.map((course, index) => (
                                    <tr key={index}>
                                        <td>{course.name}</td>
                                        <td>{course.school}</td>
                                        <td>{course.category}</td>
                                        <td>{course.qualification}</td>
                                        <td>{course.status}</td>
                                        <td>
                                            TBA
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                )}
            </div>
        </Container>
    );
};

export default AdminCoursesContent;
