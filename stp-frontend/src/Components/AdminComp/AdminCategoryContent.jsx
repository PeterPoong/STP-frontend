import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import '../../css/AdminStyles/AdminTableStyles.css';

const AdminCategoryContent = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://192.168.0.69:8000/api/admin/categoryList", {
                    method: "POST",  // Ensure method is correct (POST/GET based on API)
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

                // Access the nested data structure
                if (result && result.success && result.data && result.data.data) {
                    setCategories(result.data.data); // Set categories from the 'data' array
                } else {
                    setCategories([]); // Default to empty array if no data is found
                }
            } catch (error) {
                setError(error.message);
                console.error("Error fetching the category list:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
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
                            <th className="LeftTableCorner">Category Name</th>
                            <th>Hot Pick</th>
                            <th>Status</th>
                            <th className="RightTableCorner">Action</th>
                        </tr>
                    </thead>
                    <tbody className="AdminTableBody">
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <tr key={category.id}>
                                    <td>{category.category_name}</td>
                                    <td>{category.course_hotPick ? "Yes" : "No"}</td>
                                    <td>{category.category_status || "N/A"}</td>
                                    <td>TBA</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No categories found.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>           
        </Container>
    );
};

export default AdminCategoryContent;
