import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faReceipt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { MDBSwitch } from 'mdb-react-ui-kit';
import CircleDotLoader from './CircleDotLoader';
import '../../css/AdminStyles/AdminTableStyles.css';
import TableWithControls from './TableWithControls';

const AdminFeaturedContent = () => {
    const [Featureds, setFeatureds] = useState([]);
    const [error, setError] = useState(null);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [feedback, setFeedback] = useState("");  // State for feedback input
    const [targetFeatured, setTargetFeatured] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredFeatureds, setFilteredFeatureds] = useState([]);
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`;
    const navigate = useNavigate();
    const [showReceiptModal, setShowReceiptModal] = useState(false);
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [editMode, setEditMode] = useState(null); // State to track which row is in edit mode
    const [editedData, setEditedData] = useState({ request_name: '', featured_type: '', duration: '' }); // State for edited data
    const [selectedFeaturedType, setSelectedFeaturedType] = useState('');
    const [isSearchResults, setIsSearchResults] = useState(false);
    const [featList, setFeatList] = useState([]); // State for category list
    const [selectedFeat, setSelectedFeat] = useState(""); // State for selected subject
    const [statList, setStatList] = useState([]); // State for category list
    const [selectedStat, setSelectedStat] = useState(""); // State for selected subject
    useEffect(() => {
        // Hardcoded statList values
        const hardcodedStatList = [
            { id: 0, name: "Disable" },
            { id: 1, name: "Active" },
            { id: 2, name: "Pending" },
            { id: 2, name: "Rejected" }
        ];
        setStatList(hardcodedStatList);
        fetchFeatureds(); // Fetch enquiries initially
    }, []);
    const fetchFeatList = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/allFeaturedList`, {
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
            // The response is already paginated, so we can directly use it
            if (result && result.data) {
                setFeatList(result.data);
                // If you need pagination info, you can set it here:
                // setTotalPages(result.last_page);
                // setCurrentPage(result.current_page);
            } else {
                setFeatList([]);
            }
        } catch (error) {
            setError(error.message);
            console.error("Error fetching the featured list:", error);
        }
    };
    useEffect(() => {
        fetchFeatList(); // Fetch categorys on component mount
        fetchFeatureds(); // Fetch enquiries initially
    }, []);
    const fetchFeatureds = async (
        page = 1, 
        perPage = rowsPerPage, 
        search = "", 
        featuredType = "",
        stat = selectedStat

    ) => {
        try {
            setLoading(true);
            const payload = {
                ...(featuredType && { featured_type: Number(featuredType) }),
            };
            const requestPerPage = featuredType ? "All" : perPage;

            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/featuredRequestList?page=${page}&per_page=${requestPerPage}&search=${search}&stat=${stat}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": Authenticate,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success && result.data) {
                setFeatureds(result.data.data);
                setFilteredFeatureds(result.data.data); // Store the original data
                setTotalPages(result.data.last_page);
                setCurrentPage(result.data.current_page);
            } else {
                setFeatureds([]);
                setFilteredFeatureds([]);
                setTotalPages(1);
                setCurrentPage(1);
            }
        } catch (error) {
            setError(error.message);
            console.error("Error fetching the Featured list:", error);
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchFeatureds(currentPage, rowsPerPage, "", selectedFeaturedType, selectedStat);
    }, [currentPage, rowsPerPage, selectedFeaturedType, selectedStat]);

    const handleRowsPerPageChange = (newRowsPerPage) => {
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(1); 
        fetchFeatureds(1, newRowsPerPage, searchQuery, selectedFeaturedType, selectedStat); // Pass selectedFeaturedType as argument
    };
    

    const handleSearch = (query) => {
        setSearchQuery(query);
        
        if (!query.trim()) {
            setFilteredFeatureds(Featureds);
            return;
        }

        const lowercaseQuery = query.toLowerCase();
        const filtered = Featureds.filter(featured => 
            featured.school?.school_name?.toLowerCase().includes(lowercaseQuery)
        );
        
        setFilteredFeatureds(filtered);
    };

    const handleSort = (column) => {
        const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
        setSortColumn(column);
        setSortDirection(newDirection);
        fetchFeatureds(currentPage, rowsPerPage, searchQuery, selectedStat);
    };

    const sortedFeatureds = (() => {
        if (!sortColumn || !sortDirection) return filteredFeatureds;
    
        return [...filteredFeatureds].sort((a, b) => {
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
        setTargetFeatured({ id, action: action.toLowerCase() });
        setShowModal(true);
    };

    const confirmAction = async () => {
        if (!targetFeatured) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/updateRequestFeatured`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Authenticate,
                },
                body: JSON.stringify({
                    request_id: targetFeatured.id,
                    action: targetFeatured.action
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                alert(result.data.message); // Or use your preferred notification system
                fetchFeatureds(currentPage, rowsPerPage, searchQuery, selectedStat);
            } else {
                alert(result.message || 'Failed to update request');
            }
        } catch (error) {
            console.error('Error updating featured request:', error);
            alert('Failed to update request. Please try again.');
        } finally {
            setShowModal(false);
            setTargetFeatured(null);
        }
    };

    const handleToggleSwitch = (id, currentStatus) => {
        const action = (currentStatus === 'Active' || currentStatus === 'Temporary' || 
                       currentStatus === 'Accepted' || currentStatus === 'Approved') ? 'disable' : 'enable';
        setTargetFeatured({ id, action });
        setShowModal(true);
    };
    const handleEdit = (Featured) => {
        setEditMode(Featured.id); // Set the row to edit mode
        setEditedData({
            request_name: Featured.request_name,
            featured_type: Featured.featured_type?.featured_id || undefined,
            duration: Featured.duration,
        });
        console.log('Edited Data:', {
            request_name: Featured.request_name,
            featured_type: Featured.featured_type?.featured_id || undefined,
            duration: Featured.duration,
        });
    };

    const handleSave = async (id) => {
        const { request_name, featured_type, duration } = editedData;

        const featuredTypeToSend = (featured_type && !isNaN(Number(featured_type))) ? Number(featured_type) : undefined;

        console.log('Data being sent to backend:', {
            request_id: id,
            request_name,
            featured_type: featuredTypeToSend,
            duration: duration ? Number(duration) : undefined,
        });

        // Check if featured_type is NaN
        if (featuredTypeToSend === undefined) {
            alert("Please verify the Featured Type. The 'Homepage University' Featured Type can only be active for one school at a time.");
            return; // Exit the function to prevent further execution
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/editRequest`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Authenticate,
                },
                body: JSON.stringify({
                    request_id: id,
                    request_name,
                    featured_type: featuredTypeToSend, // Send the correct featured_type
                    duration: duration ? Number(duration) : undefined,
                }),
            });

            if (!response.ok) {
                const text = await response.text(); // Get the response as text
                throw new Error(`HTTP error! status: ${response.status}, response: ${text}`);
            }

            const result = await response.json();
            if (result.success) {
                alert('Request updated successfully!');
                fetchFeatureds(currentPage, rowsPerPage, searchQuery);
            } else {
                alert(result.message || 'Failed to update request');
            }
        } catch (error) {
            console.error('Error updating request:', error);
            alert('Failed to update request. Please try again. Error: ' + error.message);
        } finally {
            setEditMode(null);
        }
    };

    const getStatusClass = (request_status) => {
        switch (request_status) {
            case 0:
                return 'status-expired';
            case 3:
                return 'status-rejected';
            case 1:
                return 'status-ongoing';
            case 2:
                return 'status-pending';
            case 4:
                return 'status-schedule';
            default:
                return '';
        }
    };

    const handleReceiptClick = (receiptPath) => {
        setSelectedReceipt(`${import.meta.env.VITE_BASE_URL}storage/${receiptPath}`);
        setShowReceiptModal(true);
    };

    const handleFeaturedTypeFilter = (selectedType) => {
        setSelectedFeaturedType(selectedType); // Update the selected featured type
        fetchFeatureds(1, rowsPerPage, searchQuery, selectedType); // Re-fetch with new filter
    };
    const handleFeatChange = (featuredId) => {
        setSelectedFeaturedType(featuredId); // Update the selected featured type
        setCurrentPage(1); // Reset to first page when filter changes
        fetchFeatureds(1, rowsPerPage, searchQuery, featuredId, selectedStat); // Fetch with new filter
    };
    const theadContent = (
        <tr>
            <th onClick={() => handleSort("schoolName")}>
                School {sortColumn === "schoolName" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("requestName")}>
                Request {sortColumn === "requestName" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("featuredType")}>
                Featured Type{sortColumn === "featuredType" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("requestQuantity")}>
                Quantity {sortColumn === "requestQuantity" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("featuredDuration")}>
                Duration (Days) {sortColumn === "featuredDuration" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("transactionProof")}>
                Transaction Receipt {sortColumn === "transactionProof" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("featuredStatus")}>
                Status {sortColumn === "featuredStatus" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th>Action</th>
        </tr>
    );
        
    const tbodyContent = filteredFeatureds.length > 0 ? (
        filteredFeatureds.map((Featured) => {
            // console.log("Featured Data:", Featured); // Log each featured item
           
            return (
                <tr key={Featured.id}>
                    <td>{Featured.school?.school_name || 'N/A'}</td>
                    <td>
                        {editMode === Featured.id ? (
                            <input
                                type="text"
                                value={editedData.request_name}
                                onChange={(e) => setEditedData({ ...editedData, request_name: e.target.value })}
                            />
                        ) : (
                            Featured.request_name || 'N/A'
                        )}
                    </td>
                    <td>
                        {editMode === Featured.id ? (
                            <select
                                value={editedData.featured_type}
                                onChange={(e) => {
                                    const selectedValue = e.target.value;
                                    setEditedData({ ...editedData, featured_type: selectedValue ? Number(selectedValue) : undefined });
                                }}
                            >
                                <option value="" disabled>Select Featured Type</option>
                                <option value={Featured.featured_type?.featured_id || ''}>
                                    {Featured.featured_type?.featured_type || 'N/A'}
                                </option>
                                <option value="28">Homepage University</option>
                                <option value="29">Homepage Courses</option>
                                <option value="30">Second Page</option>
                                <option value="31">Third Page</option>
                                {/* Add more options as needed */}
                            </select>
                        ) : (
                            Featured.featured_type?.featured_type || 'N/A'
                        )}
                    </td>
                    <td>
                    {Featured.total_quantity || 'N/A'}
                    </td>
                    <td>
                        {editMode === Featured.id ? (
                            <input
                                type="number"
                                value={editedData.duration}
                                onChange={(e) => setEditedData({ ...editedData, duration: e.target.value })}
                            />
                        ) : (
                            Featured.duration || 'N/A'
                        )}
                    </td>
                    <td>
                        <FontAwesomeIcon
                            icon={faReceipt}
                            style={{ cursor: 'pointer', color: '#691ED2' }}
                            onClick={() => handleReceiptClick(Featured.transaction_proof)}
                            title="View Receipt"
                        />
                    </td>
                    <td className={getStatusClass(Featured.request_status)}>
                        {Featured.request_status === 1 ? 'Active' : 
                         Featured.request_status === 3 ? 'Rejected' : 'Pending'}
                    </td>
                    <td>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {editMode === Featured.id ? (
                                <Button
                                    variant="primary"
                                    onClick={() => handleSave(Featured.id)}
                                >
                                    Save
                                </Button>
                            ) : (
                                Featured.request_status === 2 ? (
                                    <>
                                        <Button className="accept"
                                            variant="success"
                                            onClick={() => handlePendingAction(Featured.id, 'Accept')}
                                        >
                                            Accept
                                        </Button>
                                        <Button className="rejected"
                                            variant="danger"
                                            onClick={() => handlePendingAction(Featured.id, 'Reject')}
                                        >
                                            Reject
                                        </Button>
                                    </>
                                ) : (
                                    <FontAwesomeIcon
                                        className="icon-color-edit"
                                        title="Edit"
                                        icon={faEdit}
                                        style={{ marginRight: '8px', color: '#691ED2', cursor: 'pointer' }}
                                        onClick={() => handleEdit(Featured)}
                                    />
                                )
                            )}
                        </div>
                    </td>
                </tr>
            );
        })
    ) : (
        <tr>
            <td colSpan="8" style={{ textAlign: "center" }}>No Data Available</td>
        </tr>
    );

    const handleStatChange = (stat) => {
        setSelectedStat(stat);
        setCurrentPage(1);
        fetchFeatureds(1, rowsPerPage, searchQuery, stat);
      };
    
    return (
        <>
            {/* <Col md={4} style={{marginLeft:'75px'}}>
                <Form.Group className="d-flex">
                    <Col md={2}>
                    <Form.Label className="fw-light" style={{ lineHeight: '3' }}>Sort By:</Form.Label>
                    </Col>
                    <Form.Select
                        value={selectedFeaturedType}
                        onChange={(e) => handleFeaturedTypeFilter(e.target.value)}
                        className="ps-0 bg-white py-2 ps-2"
                    >
                        <option value="">All Featured Types</option>
                        <option value="28">Homepage University</option>
                        <option value="29">Homepage Courses</option>
                        <option value="30">Second Page</option>
                        <option value="31">Third Page</option>
                    </Form.Select>
                </Form.Group>
            </Col> */}
            {loading ? (
                <CircleDotLoader />
            ) : (
                <TableWithControls
                    theadContent={theadContent}
                    tbodyContent={tbodyContent}
                    onSearch={handleSearch}
                    onSort={handleSort}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    featList={featList} // Pass the featured list
                    onFeatChange={handleFeatChange} // Pass the handler function
                    statList={statList}
                    onStatChange={handleStatChange}
                />
            )}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to {targetFeatured?.action} this Featured?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button 
                        variant={targetFeatured?.action === 'accept' ? 'success' : 'danger'}
                        onClick={confirmAction}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal 
                show={showReceiptModal} 
                onHide={() => setShowReceiptModal(false)}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Transaction Receipt</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img
                            src={selectedReceipt}
                            alt="Transaction Receipt"
                            style={{ 
                                maxWidth: '100%',
                                maxHeight: '70vh',
                                objectFit: 'contain'
                            }}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowReceiptModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AdminFeaturedContent;
