import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { MDBSwitch } from 'mdb-react-ui-kit';
import CircleDotLoader from './CircleDotLoader';
import '../../css/AdminStyles/AdminTableStyles.css';
import TableWithControls from './TableWithControls';

const AdminSubjectContent = () => {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [targetSubject, setTargetSubject] = useState(null);
    const [totalPages, setTotalPages] = useState(1); // Start with 1 page
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchResults, setIsSearchResults] = useState(false);

    const [showAddButton, setShowAddButton] = useState(true); // Set true if you want the button to always show
    const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage
    const Authenticate = `Bearer ${token}`;
    const navigate = useNavigate();
    const [statList, setStatList] = useState([]); // State for category list
    const [selectedStat, setSelectedStat] = useState(""); // State for selected subject
    const [selectedCat, setSelectedCat] = useState('');
    const [catList, setCatList] = useState([]); // State for category list
    useEffect(() => {
        // Hardcoded statList values
        const hardcodedStatList = [
            { id: 0, name: "Disable" },
            { id: 1, name: "Active" }
        ];
        setStatList(hardcodedStatList);
        fetchSubjects(); // Fetch enquiries initially
    }, []);
    // Fetch the category list
    const fetchCatList = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/transcriptCategoryList`, {
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
            console.log('Category List API Response:', result);

            if (result.data && Array.isArray(result.data)) {
                console.log('Category List Data:', result.data);
                setCatList(result.data);
            } else {
                console.log('No category data found or invalid format');
                setCatList([]);
            }
        } catch (error) {
            setError(error.message);
            console.error("Error fetching the category list:", error);
        }
    };
    useEffect(() => {
        fetchCatList(); // Fetch categorys on component mount
        fetchSubjects(); // Fetch enquiries initially
    }, []);
    const fetchSubjects = async (
        page = 1, 
        perPage = rowsPerPage, 
        search = searchQuery,
        stat = selectedStat,
        category = category_id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/subjectListAdmin?page=${page}&per_page=${perPage === "All" ? subjects.length : perPage}&search=${search}&stat=${stat}&category=${category}`, {
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
                setSubjects(result.data);
                setTotalPages(result.last_page);
                setCurrentPage(result.current_page);
                setIsSearchResults(result.total > rowsPerPage);
            } else {
                setSubjects([]);
            }
        } catch (error) {
            setError(error.message);
            console.error("Error fetching the subject list:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubjects(currentPage, rowsPerPage, searchQuery, selectedStat, selectedCat);
    }, [Authenticate, currentPage, rowsPerPage, searchQuery, selectedStat, selectedCat]);

    const handleRowsPerPageChange = (newRowsPerPage) => {
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(1); // Reset to the first page whenever rows per page changes
        fetchSubjects(1, newRowsPerPage === "All" ? subjects.length : newRowsPerPage, searchQuery, selectedStat, selectedCat); // Fetch data
    };
    

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1); // Reset to the first page whenever search query changes
        fetchSubjects(1, rowsPerPage, query, selectedStat, selectedCat); // Fetch data with updated search query
    };

    const handleSort = (column) => {
        const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
        setSortColumn(column);
        setSortDirection(newDirection);
        fetchSubjects(currentPage, rowsPerPage, searchQuery, selectedStat, selectedCat); // Fetch sorted data
    };

    const sortedSubjects = (() => {
        if (!sortColumn || !sortDirection) return subjects;
    
        return [...subjects].sort((a, b) => {
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
        setTargetSubject({ id, action });
        setShowModal(true);
    };
    
    const handleAddSubject = () => {
        sessionStorage.setItem('token', Authenticate);
        navigate('/adminAddSubject');
    };
    const handleEdit = (id) => {
        // console.log(`Edit subject with ID: ${id}`); // Log the ID being passed
        sessionStorage.setItem('subjectId', id); // Store package ID in session storage
        navigate(`/adminEditSubject`); // Navigate to the edit page
    };

    const handleToggleSwitch = (id, currentStatus) => {
        const action = (currentStatus === 'Active') ? 'disable' : 'enable';
        setTargetSubject({ id, action });
        setShowModal(true);
    };

    const confirmAction = async () => {
        if (!targetSubject) return;
    
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/editSubjectStatus`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": Authenticate,
                },
                body: JSON.stringify({
                    id: targetSubject.id,
                    type: targetSubject.action
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const result = await response.json();
    
            if (result.success) {
                // Fetch the updated data from the database
                await fetchSubjects(currentPage, rowsPerPage, searchQuery);
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error("Error processing the action:", error);
        } finally {
            setShowModal(false);
            setTargetSubject(null);
        }
    };

    const getStatusClass = (status) => {
        return status?.toLowerCase() || ''; // Just convert to lowercase, no switch needed
    };

    const theadContent = (
        <tr>
            <th onClick={() => handleSort("name")}>
                Name {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("category")}>
                Category {sortColumn === "category" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
        
            <th onClick={() => handleSort("status")}>
                Status {sortColumn === "status" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th>Action</th>
        </tr>
    );
   
    const tbodyContent = sortedSubjects.length > 0 ? (
        sortedSubjects.map((subject) => (
        <tr key={subject.id}>
            <td>{subject.name}</td>
            <td>{subject.category}</td>
            <td style={{ color: subject.status === 'Active' ? 'green' : 'red' }}>
                {subject.status}
            </td>
            <td>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                
                    <>
                    <FontAwesomeIcon
                        className="icon-color-edit"
                        title="Edit"
                        icon={faEdit}
                        style={{ marginRight: '8px', color: '#691ED2', cursor: 'pointer' }}
                        onClick={() => handleEdit(subject.id)}
                    />
                    <MDBSwitch
                        id={`switch-${subject.id}`}
                        checked={subject.status === 'Active'}
                        onChange={() => handleToggleSwitch(subject.id, subject.status)}
                        style={{
                            color: (subject.status === 'Active') ? 'green' : ''
                        }}
                    />
                </>
                </div>
                
            </td>
        </tr>
     ))
    ) : (
        <tr>
            <td colSpan="6" style={{ textAlign: "center" }}>No Data Available</td>
        </tr>
    );
    const handleStatChange = (stat) => {
        setSelectedStat(stat);
        setCurrentPage(1);
        fetchSubjects(1, rowsPerPage, searchQuery, stat);
      };
      const handleCatChange = (catId) => {
        setSelectedCat(catId); // Update the selected featured type
        setCurrentPage(1); // Reset to first page when filter changes
        fetchCourses(selectedCat, catId, 1, rowsPerPage, searchQuery); // Fetch with new filter
      };
      const handleCategoryChange = (categoryId) => {
        setSelectedCat(categoryId); // Update the selected category
        setCurrentPage(1); // Reset to the first page
        fetchCourses(selectedCat, categoryId, 1, rowsPerPage, searchQuery); // Fetch courses with the new category filter
    };
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
                onAddButtonClick={handleAddSubject}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                showAddButton={showAddButton}
                statList={statList}
                onStatChange={handleStatChange}
                catList={catList}
                onCatChange={handleCategoryChange}
            />
        )}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to {targetSubject?.action === 'enable' ? 'Enable' : 'Disable'} this subject?
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
export default AdminSubjectContent;
