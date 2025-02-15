import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { MDBSwitch } from "mdb-react-ui-kit";
import CircleDotLoader from "./CircleDotLoader";
import "../../css/AdminStyles/AdminTableStyles.css";
import TableWithControls from "./TableWithControls";

const AdminCoursesContent = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearchResults, setIsSearchResults] = useState(false);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [targetCourse, setTargetCourse] = useState(null);
  const [totalPages, setTotalPages] = useState(1); // Start with 1 page
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [schList, setSchList] = useState([]); // State for category list
  const [showAddButton, setShowAddButton] = useState(true); // Set true if you want the button to always show
  const [total, setTotal] = useState(0);
  const [selectedSch, setSelectedSch] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [catList, setCatList] = useState([]); // State for category list

  // To track if there are search results
  const token = sessionStorage.getItem("token");
  const Authenticate = `Bearer ${token}`;
  const navigate = useNavigate();
  const fetchSchList = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/schoolListAdmin`, {
          method: 'GET',
          headers: {
              'Authorization': Authenticate,
          },
      });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Fetched School List:", result); // Log the fetched data
        if (result && result.length > 0) { // Check if result has data
            setSchList(result);
        } else {
            setSchList([]);
        }
    } catch (error) {
        setError(error.message);
        console.error("Error fetching the school list:", error);
    }
};

const fetchCatList = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/categoryListAdmin`, {
            method: 'POST',
            headers: {
                'Authorization': Authenticate,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ per_page: 'All' }), // Adjust as needed
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Fetched Category List:", result); // Log the fetched data
        if (result && result.data) {
            setCatList(result.data); // Assuming the data is in result.data
        } else {
            setCatList([]);
        }
    } catch (error) {
        setError(error.message);
        console.error("Error fetching the category list:", error);
    }
};

useEffect(() => {
    fetchSchList(); // Fetch school list on component mount
    fetchCourses(); // Fetch courses initially
    fetchCatList();
}, []);

const fetchCourses = async (school_id, category_id, page = 1, perPage = rowsPerPage, search = searchQuery) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}api/admin/courseListAdmin?page=${page}&per_page=${perPage}&search=${search}&school_id=${school_id}&category_id=${category_id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: Authenticate,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (result && result.data) {
            setTotal(result.total);
            setCourses(result.data);
            setTotalPages(result.last_page);
            setCurrentPage(result.current_page);
            setIsSearchResults(result.total > rowsPerPage);
        } else {
            setCourses([]);
        }
    } catch (error) {
        setError(error.message);
        console.error("Error fetching the course list:", error);
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    fetchCourses(selectedSch, selectedCat, currentPage, rowsPerPage, searchQuery);
}, [Authenticate, currentPage, rowsPerPage, searchQuery, selectedSch, selectedCat]);

const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to the first page whenever rows per page changes
    fetchCourses(selectedSch, selectedCat, 1, newRowsPerPage, searchQuery); // Fetch data with updated rowsPerPage
};

const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to the first page whenever search query changes
    fetchCourses(selectedSch, selectedCat, 1, rowsPerPage, query); // Fetch data with updated search query
};

const handleSort = (column) => {
    const newDirection =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);
    fetchCourses(selectedSch, selectedCat, currentPage, rowsPerPage, searchQuery); // Fetch sorted data
};

const sortedCourses = (() => {
    if (!sortColumn || !sortDirection) return courses;

    return [...courses].sort((a, b) => {
      const aValue = a[sortColumn]
        ? a[sortColumn].toString().toLowerCase()
        : "";
      const bValue = b[sortColumn]
        ? b[sortColumn].toString().toLowerCase()
        : "";

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
    setTargetCourse({ id, action });
    setShowModal(true);
};

const handleAddCourse = () => {
    sessionStorage.setItem("token", Authenticate);
    navigate("/adminAddCourse");
};

const handleEdit = (id) => {
    // console.log(`Edit Course with ID: ${id}`); // Log the ID being passed
    sessionStorage.setItem("courseId", id); // Store course ID in session storage
    navigate(`/adminEditCourse`); // Navigate to the edit page
};

const handleSchChange = (schId) => {
    setSelectedSch(schId); // Update the selected featured type
    setCurrentPage(1); // Reset to first page when filter changes
    fetchCourses(schId, 1, rowsPerPage, searchQuery); // Fetch with new filter
};

const handleToggleSwitch = (id, currentStatus) => {
    // console.log("Toggle switch for course with ID:", id);  // Check the id here
    const action = currentStatus === "Active" ? "disable" : "enable";

    if (id !== undefined) {
        setTargetCourse({ id: id, action });
        setShowModal(true);
    } else {
        console.error("Course ID is undefined, unable to toggle switch.");
    }
};

const confirmAction = async () => {
    if (!targetCourse || targetCourse.id === undefined) {
        console.error("No valid course ID found for the action.");
        return;
    }

    // console.log("Target Course for action:", targetCourse);  // Log for debugging

    try {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}api/admin/editCourseStatus`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: Authenticate,
                },
                body: JSON.stringify({
                    id: Number(targetCourse.id), // Ensure the id is a number
                    type: targetCourse.action,
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (result.success) {
            await fetchCourses(selectedSch, selectedCat, currentPage, rowsPerPage, searchQuery);
        } else {
            console.error(result.message);
        }
    } catch (error) {
        console.error("Error processing the action:", error);
    } finally {
        setShowModal(false);
        setTargetCourse(null);
    }
};

const getStatusClass = (status) => {
    switch (status) {
        case "Disable":
            return "status-disable";
        case "Active":
            return "status-active";
        default:
            return "";
    }
};

const theadContent = (
    <>
        <tr>
            <th
                colSpan={6}
                style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    backgroundColor: "#f5f5f5",
                }}
            >
                Total Courses: {total}
            </th>
        </tr>
        <tr>
            <th onClick={() => handleSort("name")}>
                Course Name{" "}
                {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("school")}>
                School Name{" "}
                {sortColumn === "school" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("category")}>
                Category{" "}
                {sortColumn === "category" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("qualification")}>
                Qualification{" "}
                {sortColumn === "qualification" &&
                    (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("status")}>
                Status{" "}
                {sortColumn === "status" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th>Action</th>
        </tr>
    </>
);

const tbodyContent =
    sortedCourses.length > 0 ? (
        sortedCourses.map((Course) => (
            // console.log(Course);  // Log each course object to ensure it has an id
            <tr key={Course.id}>
                <td>{Course.name}</td>
                <td>{Course.school}</td>
                <td>{Course.category}</td>
                <td>{Course.qualification}</td>
                <td className={getStatusClass(Course.status)}>{Course.status}</td>
                <td>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <>
                            <FontAwesomeIcon
                                className="icon-color-edit"
                                title="Edit"
                                icon={faEdit}
                                style={{
                                    marginRight: "8px",
                                    color: "#691ED2",
                                    cursor: "pointer",
                                }}
                                onClick={() => handleEdit(Course.id)}
                            />
                            <MDBSwitch
                                id={`switch-${Course.id}`}
                                checked={Course.status === "Active"}
                                onChange={() => handleToggleSwitch(Course.id, Course.status)}
                                style={{
                                    color: Course.status === "Active" ? "green" : "",
                                }}
                            />
                        </>
                    </div>
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="6" style={{ textAlign: "center" }}>
                No Data Available
            </td>
        </tr>
    );

const onSchChange = (school_id) => {
    fetchCourses(school_id); // Fetch courses based on selected school ID
};

const handleCatChange = (catId) => {
  setSelectedCat(catId); // Update the selected featured type
  setCurrentPage(1); // Reset to first page when filter changes
  fetchCourses(selectedSch, catId, 1, rowsPerPage, searchQuery); // Fetch with new filter
};

const handleSchoolChange = (schoolId) => {
    setSelectedSch(schoolId); // Update the selected school
    setCurrentPage(1); // Reset to the first page
    fetchCourses(schoolId, selectedCat, 1, rowsPerPage, searchQuery); // Fetch courses with the new school filter
};

const handleCategoryChange = (categoryId) => {
    setSelectedCat(categoryId); // Update the selected category
    setCurrentPage(1); // Reset to the first page
    fetchCourses(selectedSch, categoryId, 1, rowsPerPage, searchQuery); // Fetch courses with the new category filter
};

return (
    <>
        {loading ? (
            <CircleDotLoader />
        ) : (
            <>
                {/* <h3>School List</h3>
                {schList.length > 0 ? (
                    <ul>
                        {schList.map((school) => (
                            <li key={school.id}>{school.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No schools available</p>
                )} */}
                <TableWithControls
                    theadContent={theadContent}
                    tbodyContent={tbodyContent}
                    onSearch={handleSearch}
                    onSort={handleSort}
                    onAddButtonClick={handleAddCourse}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    showAddButton={showAddButton}
                    schList={schList}
                    catList={catList}
                    onSchChange={handleSchoolChange}
                    onCatChange={handleCategoryChange}
                />
            </>
        )}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Action</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to{" "}
                {targetCourse?.action === "enable" ? "Enable" : "Disable"} this
                course?
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

export default AdminCoursesContent;
