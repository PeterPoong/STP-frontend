import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import '../../css/AdminStyles/AdminTableStyles.css';

const AdminSchoolContent = () => {
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`;
    console.log("Authorization Header Value:", Authenticate);

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const response = await fetch("http://192.168.0.69:8000/api/admin/schoolList", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": Authenticate,
                    },
                    body: JSON.stringify({ /* Add any additional body data if required */ })
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
    }, []);

    if (loading) {
        return <Container>Loading...</Container>;
    }

    if (error) {
        return <Container>Error: {error}</Container>;
    }

    // Define the columns for the DataGrid
    const columns = [
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'contact', headerName: 'Contact No.', flex: 1 },
        { field: 'category', headerName: 'Category', flex: 1 },
        { 
            field: 'status', 
            headerName: 'Status', 
            flex: 1 
        },
        { 
            field: 'action', 
            headerName: 'Action', 
            flex: 1,
            renderCell: (params) => {
                if (!params.row) return null; // Guard clause to handle null rows
                return (
                    <div>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            size="small" 
                            style={{ marginRight: 8 }}
                            onClick={() => handleEdit(params.row.id)}
                        >
                            Edit
                        </Button>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            size="small" 
                            onClick={() => handleDelete(params.row.id)}
                        >
                            Delete
                        </Button>
                    </div>
                );
            }
        },
    ];

    // Handlers for Edit and Delete actions
    const handleEdit = (id) => {
        console.log(`Edit school with ID: ${id}`);
        // Implement edit functionality here
    };

    const handleDelete = (id) => {
        console.log(`Delete school with ID: ${id}`);
        // Implement delete functionality here
    };

    return (
        <Container fluid>
            <div className="TableContainer" style={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={schools}
                    columns={columns}
                    slots={{ toolbar: GridToolbar }}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    disableSelectionOnClick
                    getRowId={(row) => row.id}
                    
                />
            </div>
        </Container>
    );
};

export default AdminSchoolContent;
