import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faReply } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import CircleDotLoader from './CircleDotLoader';
import '../../css/AdminStyles/AdminTableStyles.css';
import TableWithControls from './TableWithControls';

const AdminEnquiryContent = () => {
    const [enquirys, setenquirys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [targetenquiry, setTargetenquiry] = useState(null);
    const [showSearch, setShowSearch] = useState(false); // or true, depending on default
    const [totalPages, setTotalPages] = useState(1); // Start with 1 page
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchResults, setIsSearchResults] = useState(false);
    const [showAddButton, setShowAddButton] = useState(true); // Set true if you want the button to always show
    const [subjectList, setSubjectList] = useState([]); // State for subject list
    const [selectedSubject, setSelectedSubject] = useState(""); // State for selected subject

     // To track if there are search results
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`;
    const navigate = useNavigate();
    const [statList, setStatList] = useState([]); // State for category list
    const [selectedStat, setSelectedStat] = useState(""); // State for selected subject
    useEffect(() => {
        // Hardcoded statList values
        const hardcodedStatList = [
            { id: 1, name: "Replied" },
            { id: 2, name: "Pending" }
        ];
        setStatList(hardcodedStatList);
        fetchenquirys(); // Fetch enquiries initially
    }, []);
  
   // Fetch the subject list
    const fetchSubjectList = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/enquirySubjectList`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": Authenticate,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            if (result && Array.isArray(result.data)) {
                setSubjectList(result.data);
            } else {
                setSubjectList([]);
            }
        } catch (error) {
            setError(error.message);
            console.error("Error fetching the subject list:", error);
        }
    };

    useEffect(() => {
        fetchSubjectList(); // Fetch subjects on component mount
        fetchenquirys(); // Fetch enquiries initially
    }, []);
    const fetchenquirys = async (
        page = 1, 
        perPage = rowsPerPage, 
        search = searchQuery, 
        subject = selectedSubject,
        stat = selectedStat
    ) => {
        try {
            const requestBody = {
                page,
                per_page: perPage,
                search,
                stat: stat || null  // Include stat in request body
            };
    
            // Only include subject if it's selected
            if (subject) {
                requestBody.subject = subject;
            }
    
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/enquiryListAdmin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": Authenticate,
                },
                body: JSON.stringify(requestBody),
            });
    
            console.log("Fetching enquiries with request body:", requestBody);
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const result = await response.json();
            if (result && Array.isArray(result.data)) {
                setenquirys(result.data);
                setTotalPages(result.last_page);
                setCurrentPage(result.current_page);
                setIsSearchResults(result.total > rowsPerPage);
            } else {
                setenquirys([]);
            }
        } catch (error) {
            setError(error.message);
            console.error("Error fetching the enquiry list:", error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchenquirys(currentPage, rowsPerPage, searchQuery, selectedSubject, selectedStat);
    }, [Authenticate, currentPage, rowsPerPage, searchQuery, selectedSubject, selectedStat]);

    const handleRowsPerPageChange = (newRowsPerPage) => {
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(1); // Reset to the first page whenever rows per page changes
        fetchenquirys(1, newRowsPerPage, searchQuery, selectedSubject, selectedStat); // Fetch data with updated rowsPerPage
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1); // Reset to the first page whenever search query changes
        fetchenquirys(1, rowsPerPage, query, selectedSubject, selectedStat); // Fetch data with updated search query
    };

    const handleSort = (column) => {
        const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
        setSortColumn(column);
        setSortDirection(newDirection);
        fetchenquirys(currentPage, rowsPerPage, searchQuery, selectedSubject, selectedStat); // Fetch sorted data
    };

    const sortedenquirys = (() => {
        if (!sortColumn || !sortDirection || !Array.isArray(enquirys)) return enquirys || [];
    
        return [...enquirys].sort((a, b) => {
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
        setTargetenquiry({ id, action });
        setShowModal(true);
    };
    
    const handleAddenquiry = () => {
        sessionStorage.setItem('token', Authenticate);
        navigate('/adminAddEnquiry');
    };
    const handleEdit = (id) => {
        // console.log(`Edit enquiry with ID: ${id}`); // Log the ID being passed
        sessionStorage.setItem('enquiryId', id); // Store package ID in session storage
        navigate(`/adminReplyEnquiry`); // Navigate to the edit page
    };
    

    const handleToggleSwitch = (id, currentStatus) => {
        const action = (currentStatus === 1) ? 'disable' : 'enable';
        setTargetenquiry({ id, action });
        setShowModal(true);
    };

    const confirmAction = async () => {
        if (!targetenquiry) return;
    
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/disableEnquiry`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": Authenticate,
                },
                body: JSON.stringify({
                    id: targetenquiry.id,
                    type: targetenquiry.action
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const result = await response.json();
    
            if (result.success) {
                // Log the new status for debugging
                // console.log("New status:", result.newStatus);
                await fetchenquirys(currentPage, rowsPerPage, searchQuery, selectedSubject, selectedStat);
    
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error("Error processing the action:", error);
        } finally {
            setShowModal(false);
            setTargetenquiry(null);
        }
    };
    
    const getStatusDisplay = (status) => {
        switch (status) {
            case 1:
                return { text: "Replied", color: "green" };
            case 2:
                return { text: "Pending", color: "#FFAA1D" };
            default:
                return { text: "Disabled", color: "red" };
        }
    };
    
// Function to handle subject change
const handleSubjectChange = (subjectId) => {
    console.log("Filtering enquiries with Subject ID:", subjectId); // Log subject ID
    setSelectedSubject(subjectId);  // Set the selected subject
    setCurrentPage(1);              // Reset to the first page
    fetchenquirys(1, rowsPerPage, searchQuery, subjectId, selectedStat); // Pass subject ID as filter
};
const handleStatChange = (stat) => {
    console.log("Selected stat:", stat); // Add this for debugging
    setSelectedStat(stat);
    setCurrentPage(1);
    fetchenquirys(1, rowsPerPage, searchQuery, selectedSubject, stat); // Pass all parameters
};
    const theadContent = (
        <tr>
            <th onClick={() => handleSort("enquiry_name")}>
                 Name {sortColumn === "enquiry_name" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("enquiry_email")}>
                Email {sortColumn === "enquiry_email" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("enquiry_phone")}>
                Contact Number {sortColumn === "enquiry_phone" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("enquiry_subject")}>
                Subject {sortColumn === "enquiry_subject" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("created_at")}>
                Created Date {sortColumn === "created_at" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("enquiry_message")}>
                Message {sortColumn === "enquiry_message" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("enquiry_status")}>
                Status {sortColumn === "enquiry_status" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th>Action</th>
        </tr>
    );

    const tbodyContent = sortedenquirys.length > 0 ? (
        sortedenquirys.map((enquiry) => (
            <tr key={enquiry.id}>
                <td>{enquiry.enquiry_name}</td>
                <td>{enquiry.enquiry_email}</td>
                <td>{enquiry.enquiry_phone}</td>
                <td>{enquiry.enquiry_subject}</td>
                <td>{enquiry.created_at}</td>
                <td>{enquiry.enquiry_message}</td>
                <td style={{ color: getStatusDisplay(enquiry.enquiry_status).color }}>
                    {getStatusDisplay(enquiry.enquiry_status).text}
                </td>
                <td>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon
                            className="icon-color-edit"
                            title="Reply"
                            icon={faReply}
                            style={{ marginRight: '8px', color: '#691ED2', cursor: 'pointer' }}
                            onClick={() => handleEdit(enquiry.id)}
                        />
                    </div>
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="7" style={{ textAlign: "center" }}>No Data Available</td>
        </tr>
    );
    

    return (
        <>
         {loading ? (
            <CircleDotLoader />
            ) : (
            <TableWithControls
                theadContent={theadContent}
                tbodyContent={tbodyContent}
                onSearch={handleSearch}
                onSort={handleSort}
                onAddButtonClick={handleAddenquiry}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                showSearch={showSearch} // Pass showSearch here
                subjectList={subjectList} // Pass subject list to TableWithControls
                onSubjectChange={handleSubjectChange} // Pass handler for subject selection
                statList={statList}
                onStatChange={handleStatChange}
            />
        )}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to {targetenquiry?.action === 'enable' ? 'Enable' : 'Disable'} this enquiry?
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

export default AdminEnquiryContent;
