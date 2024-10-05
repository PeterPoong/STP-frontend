import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { MDBSwitch } from 'mdb-react-ui-kit';
import '../../css/AdminStyles/AdminTableStyles.css';
import TableWithControls from './TableWithControls';

const AdminBannerContent = () => {
    const [banners, setbanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [targetbanner, setTargetbanner] = useState(null);
    const [totalPages, setTotalPages] = useState(1); // Start with 1 page
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [showAddButton, setShowAddButton] = useState(true); // Set true if you want the button to always show

     // To track if there are search results
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`;
    const navigate = useNavigate();

    const fetchbanners = async (page = 1, perPage = rowsPerPage, search = searchQuery) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/bannerListAdmin?page=${page}&per_page=${perPage}&search=${search}`, {
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
            if (result && result.data) {
                setbanners(result.data);
                setTotalPages(result.last_page);
                setCurrentPage(result.current_page);
                setIsSearchResults(result.total > rowsPerPage);
            } else {
                setbanners([]);
            }
        } catch (error) {
            setError(error.message);
            console.error("Error fetching the banner list:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchbanners(currentPage, rowsPerPage, searchQuery);
    }, [Authenticate, currentPage, rowsPerPage, searchQuery]);

    const handleRowsPerPageChange = (newRowsPerPage) => {
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(1); // Reset to the first page whenever rows per page changes
        fetchbanners(1, newRowsPerPage, searchQuery); // Fetch data with updated rowsPerPage
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1); // Reset to the first page whenever search query changes
        fetchbanners(1, rowsPerPage, query); // Fetch data with updated search query
    };

    const handleSort = (column) => {
        const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
        setSortColumn(column);
        setSortDirection(newDirection);
        fetchbanners(currentPage, rowsPerPage, searchQuery); // Fetch sorted data
    };

    const sortedbanners = (() => {
        if (!sortColumn || !sortDirection) return banners;
    
        return [...banners].sort((a, b) => {
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
        setTargetbanner({ id, action });
        setShowModal(true);
    };
    
    const handleAddbanner = () => {
        sessionStorage.setItem('token', Authenticate);
        navigate('/adminAddbanner');
    };
    const handleEdit = (id) => {
        console.log(`Edit Banner with ID: ${id}`); // Log the ID being passed
        sessionStorage.setItem('bannerId', id); // Store package ID in session storage
        navigate(`/adminEditBanner`); // Navigate to the edit page
    };
    

    const handleToggleSwitch = (id, currentStatus) => {
        const action = (currentStatus === 'Active' || currentStatus === 'Temporary') ? 'disable' : 'enable';
        setTargetbanner({ id, action });
        setShowModal(true);
    };

    const confirmAction = async () => {
        if (!targetbanner) return;
    
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/disableBanner`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": Authenticate,
                },
                body: JSON.stringify({
                    id: targetbanner.id,
                    type: targetbanner.action
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const result = await response.json();
    
            if (result.success) {
                // Log the new status for debugging
                console.log("New status:", result.newStatus);
                await fetchbanners(currentPage, rowsPerPage, searchQuery);
    
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error("Error processing the action:", error);
        } finally {
            setShowModal(false);
            setTargetbanner(null);
        }
    };
    
    const getStatusClass = (status) => {
        switch (status) {
            case 'Disable':
                return 'status-disable';
            case 'Active':
                return 'status-active';
            default:
                return '';
        }
    };

    const theadContent = (
        <tr>
            <th onClick={() => handleSort("name")}>
                 Name {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("file")}>
                Banner File {sortColumn === "file" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("featured")}>
                Featured Type {sortColumn === "featured" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("banner_duration")}>
                Banner Duration {sortColumn === "banner_duration" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("status")}>
                Status {sortColumn === "status" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th>Action</th>
        </tr>
    );

    const tbodyContent = sortedbanners.map((banner) => (
        <tr key={banner.id}>
            <td>{banner.name}</td>
            <td>{banner.file}</td>
            <td>{banner.featured ? banner.featured.core_metaName : 'No Featured'}</td>
            <td>{banner.banner_duration}</td>
            <td className={getStatusClass(banner.status)}>
                {banner.status}
            </td>
            <td>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {banner.status === 'Pending' ? (
                    <>
                        <Button className="accept"
                            variant="success"
                            onClick={() => handlePendingAction(banner.id, 'enable')}
                        >
                            Accept
                        </Button>
                        <Button className="reject"
                            variant="danger"
                            onClick={() => handlePendingAction(banner.id, 'disable')}
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
                        onClick={() => handleEdit(banner.id)}
                    />
                    <MDBSwitch
                        id={`switch-${banner.id}`}
                        checked={banner.status === 'Active' || banner.status === 'Temporary'}
                        onChange={() => handleToggleSwitch(banner.id, banner.status)}
                        style={{
                            color: (banner.status === 'Active' || banner.status === 'Temporary') ? 'green' : ''
                        }}
                    />
                </>
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
                onSearch={handleSearch}
                onSort={handleSort}
                onAddButtonClick={handleAddbanner}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                showAddButton={showAddButton}
            />
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to {targetbanner?.action === 'enable' ? 'Enable' : 'Disable'} this banner?
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

export default AdminBannerContent;
