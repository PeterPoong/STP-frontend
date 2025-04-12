import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import TableWithControls from "./TableWithControls";
import { useNavigate } from "react-router-dom";
import CircleDotLoader from "./CircleDotLoader";
import { MDBSwitch } from "mdb-react-ui-kit";

const AdminStudentContent = () => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [students, setstudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [targetstudent, setTargetstudent] = useState(null);
  const [isSearchResults, setIsSearchResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddButton, setShowAddButton] = useState(true); // Set true if you want the button to always show
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const Authenticate = `Bearer ${token}`;
  const [total, settotal] = useState(0);

  // useEffect(() => {
  //     const fetchStudents = async () => {
  //         try {
  //             const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/studentListAdmin`, {
  //                 method: 'POST',
  //                 headers: {
  //                     'Content-Type': 'application/json',
  //                     'Authorization': Authenticate,
  //                 },
  //                 body: JSON.stringify({
  //                     page: currentPage,
  //                     per_page: rowsPerPage,
  //                 }),
  //             });

  //             if (!response.ok) {
  //                 throw new Error("Failed to fetch data");
  //             }

  //             const result = await response.json();
  //             setstudents(result.data);
  //             setTotalPages(result.total_pages || 1);
  //             setLoading(false);
  //         } catch (error) {
  //             setError(error.message);
  //             setLoading(false);
  //         }
  //     };

  //     fetchStudents();
  // }, [currentPage, rowsPerPage]);
  const [statList, setStatList] = useState([]); // State for category list
  const [selectedStat, setSelectedStat] = useState(""); // State for selected subject

  useEffect(() => {
      // Hardcoded statList values
      const hardcodedStatList = [
          { id: 0, name: "Disable" },
          { id: 1, name: "Active" },
          { id: 3, name: "Temporary" },
          { id: 4, name: "Temporary-Disable" },
      ];
      setStatList(hardcodedStatList);
      fetchstudents(); // Fetch enquiries initially
  }, []);

  const fetchstudents = async (
    page = 1,
    perPage = rowsPerPage,
    search = searchQuery,
    stat = selectedStat
  ) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }api/admin/studentListAdmin?page=${page}&per_page=${perPage}&search=${search}&stat=${stat}`,
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
        setstudents(result.data);
        setTotalPages(result.last_page);
        setCurrentPage(result.current_page);
        setIsSearchResults(result.total > rowsPerPage);
        settotal(result.total);
      } else {
        setstudents([]);
      }
    } catch (error) {
      setError(error.message);
      console.error("Error fetching the student list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchstudents(currentPage, rowsPerPage, searchQuery, selectedStat);
  }, [Authenticate, currentPage, rowsPerPage, searchQuery, selectedStat]);

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to the first page whenever rows per page changes
    fetchstudents(1, newRowsPerPage, searchQuery, selectedStat); // Fetch data with updated rowsPerPage
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to the first page whenever search query changes
    fetchstudents(1, rowsPerPage, query); // Fetch data with updated search query
  };

  const handleEdit = (id) => {
    // console.log(`Edit student with ID: ${id}`); // Log the ID being passed
    sessionStorage.setItem("studentId", id); // Store package ID in session storage
    navigate(`/adminEditStudent`); // Navigate to the edit page
  };
  const handleToggleSwitch = (id, currentStatus) => {
    const action =
      currentStatus === "Active" || currentStatus === "Temporary"
        ? "disable"
        : "enable";
    setTargetstudent({ id, action });
    setShowModal(true);
  };
  const confirmAction = async () => {
    if (!targetstudent) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/admin/editStatus`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: Authenticate,
          },
          body: JSON.stringify({
            id: targetstudent.id,
            type: targetstudent.action,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        // Log the new status for debugging
        await fetchstudents(currentPage, rowsPerPage, searchQuery, selectedStat);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error processing the action:", error);
    } finally {
      setShowModal(false);
      setTargetstudent(null);
    }
  };

  const getStatusDisplay = (status) => {
    switch (status) {
        case 'Active':
            return { text: status, color: 'green' };
        case 'Temporary':
            return { text: status, color: 'orange' };
        case 'Temporary-Disable':
        case 'Disable':
            return { text: status, color: 'red' };
        default:
            return { text: status, color: 'red' };
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleAddStudent = () => {
    sessionStorage.setItem("token", Authenticate);
    navigate("/adminAddStudent");
  };
  const handleSort = (column) => {
    const newDirection =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);
    fetchstudents(currentPage, rowsPerPage, searchQuery, selectedStat); // Fetch sorted data
  };

  const sortedstudents = (() => {
    if (!sortColumn || !sortDirection) return students;

    return [...students].sort((a, b) => {
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

  const theadContent = (
    <>
      {/* Row for the Total Count */}
      <tr>
      <th
                colSpan={6}
                style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    backgroundColor: "#f5f5f5",
                }}
            >
          Total Students: {total}
        </th>
      </tr>

      {/* Regular Table Headers */}
      <tr>
        <th onClick={() => handleSort("name")}>
          Username{sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}
        </th>
        <th onClick={() => handleSort("name")}>
          Fullname{sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}
        </th>
        <th onClick={() => handleSort("email")}>
          Email{" "}
          {sortColumn === "email" && (sortDirection === "asc" ? "↑" : "↓")}
        </th>
        <th>Contact</th>
        <th onClick={() => handleSort("created_at")}>
          created_at{" "}
          {sortColumn === "created_at" && (sortDirection === "asc" ? "↑" : "↓")}
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
    sortedstudents.length > 0 ? (
      sortedstudents.map((student) => (
        <tr key={student.id}>
          <td>{student.name}</td>
          <td>{student.fullname}</td>
          <td>{student.email}</td>
          <td>{student.contact_number}</td>
          <td>{student.created_at}</td>
          <td style={{ padding: '8px' }}>
            <span style={{ color: student.status === 'Active' ? 'green' : 
                                student.status === 'Temporary' ? 'orange' : 'red' }}>
              {student.status}
            </span>
          </td>
          <td className="action-cell">
            <div className="action-buttons">
              <FontAwesomeIcon
                className="icon-color-edit"
                title="Edit"
                icon={faEdit}
                onClick={() => handleEdit(student.id)}
              />
              <MDBSwitch
                id={`switch-${student.id}`}
                checked={student.status === "Active" || student.status === "Temporary"}
                onChange={() => handleToggleSwitch(student.id, student.status)}
                className={student.status === "Active" || student.status === "Temporary" ? "switch-active" : ""}
              />
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
    const handleStatChange = (stat) => {
      setSelectedStat(stat);
      setCurrentPage(1);
      fetchstudents(1, rowsPerPage, searchQuery, stat);
    };
  return (
    <>
      {loading ? (
        <CircleDotLoader />
      ) : (
        <div>
          {/* Display the total count at the top left */}

          <TableWithControls
            theadContent={theadContent}
            tbodyContent={tbodyContent}
            currentPage={currentPage}
            onSearch={handleSearch}
            onSort={handleSort}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            showAddButton={showAddButton}
            onAddButtonClick={handleAddStudent}
            statList={statList}
            onStatChange={handleStatChange}
          />
        </div>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to{" "}
          {targetstudent?.action === "enable" ? "Enable" : "Disable"} this
          student?
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

export default AdminStudentContent;
