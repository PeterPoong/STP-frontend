import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { MDBSwitch } from 'mdb-react-ui-kit';
import '../../css/AdminStyles/AdminTableStyles.css';
import TableWithControls from './TableWithControls';

const AdminDataContent = () => {
    const [Datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterOptions, setFilterOptions] = useState([]); // State for dropdown options
    const [selectedFilter, setSelectedFilter] = useState(""); // State for selected filter
    const [error, setError] = useState(null);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [targetData, setTargetData] = useState(null);
    const [totalPages, setTotalPages] = useState(1); // Start with 1 page
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [showAddButton, setShowAddButton] = useState(true); // Set true if you want the button to always show

     // To track if there are search results
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`;
    const navigate = useNavigate();

      // Function to fetch filter options
      const fetchFilterOptions = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/dataFilterList`, {
                headers: {
                    "Authorization": Authenticate
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setFilterOptions(result.data || []);
        } catch (error) {
            console.error("Error fetching filter options:", error);
        }
    };

    // Function to fetch the data
    const fetchDatas = async (page = 1, perPage = rowsPerPage, search = searchQuery, filter = selectedFilter) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/dataList?page=${page}&per_page=${perPage}&search=${search}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": Authenticate,
                },
                body: JSON.stringify({
                    core_meta_type: filter // Pass the selected filter
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            if (result && result.data) {
                setDatas(result.data);
                setTotalPages(result.last_page);
                setCurrentPage(result.current_page);
            } else {
                setDatas([]);
            }
        } catch (error) {
            setError(error.message);
            console.error("Error fetching the Data list:", error);
        } finally {
            setLoading(false);
        }
    };

     // Call the fetchDatas and fetchFilterOptions on component mount
     useEffect(() => {
        fetchFilterOptions(); // Fetch the filter options when the component loads
        fetchDatas(currentPage, rowsPerPage, searchQuery, selectedFilter); // Fetch data with the filter
    }, [Authenticate, currentPage, rowsPerPage, searchQuery, selectedFilter]); // Refetch when the filter changes

    const handleFilterChange = (e) => {
        setSelectedFilter(e.target.value); // Set the selected filter value
        setCurrentPage(1); // Reset to the first page whenever filter changes
    };

    const handleRowsPerPageChange = (newRowsPerPage) => {
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(1); // Reset to the first page whenever rows per page changes
        fetchDatas(1, newRowsPerPage, searchQuery); // Fetch data with updated rowsPerPage
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1); // Reset to the first page whenever search query changes
        fetchDatas(1, rowsPerPage, query); // Fetch data with updated search query
    };

    const handleSort = (column) => {
        const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
        setSortColumn(column);
        setSortDirection(newDirection);
        fetchDatas(currentPage, rowsPerPage, searchQuery); // Fetch sorted data
    };

    const sortedDatas = (() => {
        if (!sortColumn || !sortDirection) return Datas;
    
        return [...Datas].sort((a, b) => {
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
        setTargetData({ id, action });
        setShowModal(true);
    };
    
    const handleAddData = () => {
        sessionStorage.setItem('token', Authenticate);
        navigate('/adminAddData');
    };
    const handleEdit = (id) => {
        console.log(`Edit Data with ID: ${id}`);
        sessionStorage.setItem('token', Authenticate);
        navigate(`/adminEditData/${id}`);
    };
    

    const handleToggleSwitch = (id, currentStatus) => {
        const action = (currentStatus === 1) ? 'disable' : 'enable'; // Ensure that 1 maps to 'disable' and 0 maps to 'enable'
        setTargetData({ id, action });
        setShowModal(true);
    };
    
    

    const confirmAction = async () => {
        if (!targetData) return;
    
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/editDataStatus`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": Authenticate,
                },
                body: JSON.stringify({
                    id: targetData.id,
                    action: targetData.action
                }),
            });
    
            const result = await response.json();
    
            if (result.success) {
                await fetchDatas(currentPage, rowsPerPage, searchQuery, selectedFilter); // Refetch the data
            }
        } catch (error) {
            console.error("Error processing the action:", error);
        } finally {
            setShowModal(false);
            setTargetData(null);
        }
    };
    
    
    
    
    const getStatusClass = (status) => {
        switch (status) {
            case 0:
                return 'status-disable';
            case 'Temporary-Disable':
                return 'status-disable';
            case 1:
                return 'status-active';
            default:
                return '';
        }
    };

    const theadContent = (
        <tr>
            <th onClick={() => handleSort("name")}>
                Data Type {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("email")}>
                Data Name {sortColumn === "email" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("status")}>
                Status {sortColumn === "status" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th>Action</th>
        </tr>
    );

    const tbodyContent = sortedDatas.map((Data) => {
        console.log(Data); // Add this to check if 'id' is fetched
        return (
            <tr key={Data.id}>
                <td>{Data.core_metaType}</td>
                <td>{Data.core_metaName}</td>
                <td className={getStatusClass(Data.status)}>
                    {Data.status}
                </td>
                <td>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                   
                        <>
                        <FontAwesomeIcon
                            className="icon-color-edit"
                            title="Edit"
                            icon={faEdit}
                            style={{ marginRight: '8px', color: '#691ED2', cursor: 'pointer' }}
                            onClick={() => handleEdit(Data.id)}
                        />
                        <MDBSwitch
                            id={`switch-${Data.id}`}
                            checked={Data.status === 1}
                            onChange={() => handleToggleSwitch(Data.id, Data.status)}
                            style={{
                                color: (Data.status === 1) ? 'green' : ''
                            }}
                        />
                    </>
                     
                    </div>
                    
                </td>
            </tr>
        );
    });
    

    return (
        <>
         {/* Custom Filter */}
            <Form.Group controlId="filterDropdown" className="dataFilter d-flex justify-content-center align-items-center mt-5 ms-5">
                <div className="row w-100">
                    <Form.Label className="dataFilterLabel col-md-3 text-md-right text-center">Data Type:</Form.Label>
                    <div className="col-md-6">
                        <Form.Control as="select" value={selectedFilter} onChange={handleFilterChange}>
                            <option value="">Select Data Type</option>
                            {filterOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </Form.Control>
                    </div>
                </div>
            </Form.Group>

            <TableWithControls
                theadContent={theadContent}
                tbodyContent={tbodyContent}
                onPageChange={handlePageChange}
                totalPages={totalPages}
                currentPage={currentPage}
                onRowsPerPageChange={setRowsPerPage}
                showAddButton={showAddButton}
                onSearch={handleSearch}
                showSearch={false}  // Set to false if you don't want to show search
                showRowsPerPage={false}  // Set to false if you don't want to show rows-per-page dropdown
            />

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to {targetData?.action === 'enable' ? 'Enable' : 'Disable'} this Data?
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

export default AdminDataContent;
