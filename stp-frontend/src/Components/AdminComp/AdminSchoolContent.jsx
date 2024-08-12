import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import '../../css/AdminStyles/AdminTableStyles.css'

const AdminSchoolContent = () => {
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const response = await fetch("http://192.168.0.69:8000/api/admin/schoolList", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer 1|DRHGDVlFQDDqAkw74VHXVzRXyKZhC1h5eBTdwePW882ca2b8",
                    },
                    body: JSON.stringify({ /* Add any additional body data if required */ })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                // Accessing the schools data from the nested structure
                if (result && Array.isArray(result) && result[0].data) {
                    setSchools(result[0].data);  // Set schools from the nested 'data' array
                } else {
                    setSchools([]);  // Default to empty array if no data is found
                }
            } catch (error) {
                setError(error.message);
                console.error("Error fetching the school list:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSchools();
    }, []);

    if (loading) {
        return <Container>Loading...</Container>;
    }

    if (error) {
        return <Container>Error: {error}</Container>;
    }

    return (
        <Container fluid>
            <div className="TableContainer">
                <Table className="AdminTable" striped hover>
                    <thead className="AdminTableHead">
                        <tr>
                            <th className="LeftTableCorner">Name</th>
                            <th>Email</th>
                            <th>Contact No.</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th className="RightTableCorner">Action</th>
                        </tr>
                    </thead>
                    <tbody className="AdminTableBody">
                        {schools.length > 0 ? (
                            schools.map((school) => (
                                <tr key={school.id}>
                                    <td>{school.name}</td>
                                    <td>{school.email}</td>
                                    <td>{school.contact}</td>
                                    <td>{school.category}</td>
                                    <td>{school.status || "N/A"}</td>
                                    <td>TBA</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No schools found.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>           
        </Container>
    );
};

export default AdminSchoolContent;
