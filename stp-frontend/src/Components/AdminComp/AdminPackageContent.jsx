import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { MDBSwitch } from 'mdb-react-ui-kit';
import '../../css/AdminStyles/AdminTableStyles.css';
import TableWithControls from './TableWithControls';
import he from 'he';
const AdminPackageContent = () => {
    const [Packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [targetPackage, setTargetPackage] = useState(null);
    const [totalPages, setTotalPages] = useState(1); // Start with 1 page
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
     // To track if there are search results
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`;
    const navigate = useNavigate();

    const fetchPackages = async (page = 1, perPage = rowsPerPage, search = searchQuery) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/packageList?page=${page}&per_page=${perPage}&search=${search}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": Authenticate,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.package_status}`);
            }

            const result = await response.json();
            if (result && result.data) {
                setPackages(result.data);
                setTotalPages(result.last_page);
                setCurrentPage(result.current_page);
                setIsSearchResults(result.total > rowsPerPage);
            } else {
                setPackages([]);
            }
        } catch (error) {
            setError(error.message);
            console.error("Error fetching the Package list:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPackages(currentPage, rowsPerPage, searchQuery);
    }, [Authenticate, currentPage, rowsPerPage, searchQuery]);

    const handleRowsPerPageChange = (newRowsPerPage) => {
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(1); // Reset to the first page whenever rows per page changes
        fetchPackages(1, newRowsPerPage, searchQuery); // Fetch data with updated rowsPerPage
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1); // Reset to the first page whenever search query changes
        fetchPackages(1, rowsPerPage, query); // Fetch data with updated search query
    };

    const handleSort = (column) => {
        const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
        setSortColumn(column);
        setSortDirection(newDirection);
        fetchPackages(currentPage, rowsPerPage, searchQuery); // Fetch sorted data
    };

    const sortedPackages = (() => {
        if (!sortColumn || !sortDirection) return Packages;
    
        return [...Packages].sort((a, b) => {
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

    
    const handleAddPackage = () => {
        sessionStorage.setItem('token', Authenticate);
        navigate('/adminAddPackage');
    };
    
    const handleEdit = (id) => {
        console.log(`Edit Package with ID: ${id}`);
        sessionStorage.setItem('token', Authenticate);
        navigate(`/adminEditPackage/${id}`);
    };
    

    const handleToggleSwitch = (id, currentStatus) => {
        const action = (currentStatus === 'Active') ? 'Delete' : 'Enable';
        console.log(`Toggle Switch Clicked: id=${id}, action=${action}`);
        setTargetPackage({ id, action });
        setShowModal(true);
    };
    

    const confirmAction = async () => {
        if (!targetPackage) return;
    
        console.log(`Confirm Action: ${JSON.stringify(targetPackage)}`);
    
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/deletePackage`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": Authenticate,
                },
                body: JSON.stringify({
                    id: targetPackage.id,
                    type: targetPackage.action
                }),
            });
    
            console.log(`API Response Status: ${response.status}`);
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const result = await response.json();
            console.log('API Response Data:', result);
    
            if (result.success) {
                // Action was successful, fetch the updated package data
                await fetchPackages(currentPage, rowsPerPage, searchQuery);
            } else {
                console.error(result.message || "Failed to process the action.");
            }
        } catch (error) {
            console.error("Error processing the action:", error);
        } finally {
            setShowModal(false);
            setTargetPackage(null);
        }
    };
    
    
    const getStatusClass = (package_status) => {
        switch (package_status) {
            case 'Disable':
                return 'status-disable';
            case 'Active':
                return 'status-active';
        }
    };

    const theadContent = (
        <tr>
            <th onClick={() => handleSort("name")}>
                Package Name {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("details")}>
                Details {sortColumn === "details" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("type")}>
                Type {sortColumn === "type" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("price")}>
                Price (RM) {sortColumn === "price" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("package_status")}>
                Status {sortColumn === "package_status" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th>Action</th>
        </tr>
    );

    const tbodyContent = sortedPackages.map((Package) => (
        <tr key={Package.id}>
            <td>{Package.package_name}</td>
            <td >{Package.package_detail}</td>
            <td>{Package.package_type}</td>
            <td>{Package.package_price}</td>
            <td className={getStatusClass(Package.package_status)}>
                {Package.package_status}
            </td>
            <td>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                
                    <>
                    <FontAwesomeIcon
                        className="icon-color-edit"
                        title="Edit"
                        icon={faEdit}
                        style={{ marginRight: '8px', color: '#691ED2', cursor: 'pointer' }}
                        onClick={() => handleEdit(Package.id)}
                    />
                    <MDBSwitch
                        id={`switch-${Package.id}`}
                        checked={Package.package_status === 'Active'}
                        onChange={() => handleToggleSwitch(Package.id, Package.package_status)}
                        style={{
                            color: (Package.package_status === 'Active') ? 'green' : ''
                        }}
                    />
                </>
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
                onAddButtonClick={handleAddPackage}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to {targetPackage?.action === 'enable' ? 'Enable' : 'Delete'} this Package?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button className="confirm" variant="primary" onClick={confirmAction}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AdminPackageContent;
