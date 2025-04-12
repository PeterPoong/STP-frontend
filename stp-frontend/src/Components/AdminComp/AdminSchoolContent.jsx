import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import CircleDotLoader from "./CircleDotLoader";
import { MDBSwitch } from "mdb-react-ui-kit";
import "../../css/AdminStyles/AdminTableStyles.css";
import TableWithControls from "./TableWithControls";

const AdminSchoolContent = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSearchResults, setIsSearchResults] = useState(false);
  const [targetSchool, setTargetSchool] = useState(null);
  const [totalPages, setTotalPages] = useState(1); // Start with 1 page
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddButton, setShowAddButton] = useState(true); // Set true if you want the button to always show
  const [total, setTotal] = useState(0);

  // To track if there are search results
  const token = sessionStorage.getItem("token");
  const Authenticate = `Bearer ${token}`;
  const navigate = useNavigate();

  const [statList, setStatList] = useState([]); // State for category list
  const [selectedStat, setSelectedStat] = useState(""); // State for selected subject

  useEffect(() => {
      // Hardcoded statList values
      const hardcodedStatList = [
          { id: 0, name: "Disable" },
          { id: 1, name: "Active" },
          { id: 2, name: "Pending" },
          { id: 3, name: "Temporary" },
          { id: 4, name: "Temporary-Disable" },
      ];
      setStatList(hardcodedStatList);
      fetchSchools(); // Fetch enquiries initially
  }, []);

  const fetchSchools = async (
    page = 1,
    perPage = rowsPerPage,
    search = searchQuery,
    stat = selectedStat
  ) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }api/admin/schoolList?page=${page}&per_page=${perPage}&search=${search}&stat=${stat}`,
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
        setSchools(result.data);
        setTotal(result.total);
        setTotalPages(result.last_page);
        setCurrentPage(result.current_page);
        setIsSearchResults(result.total > rowsPerPage);
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

  useEffect(() => {
    fetchSchools(currentPage, rowsPerPage, searchQuery, selectedStat);
  }, [Authenticate, currentPage, rowsPerPage, searchQuery, selectedStat]);

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to the first page whenever rows per page changes
    fetchSchools(1, newRowsPerPage, searchQuery, selectedStat); // Fetch data with updated rowsPerPage
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to the first page whenever search query changes
    fetchSchools(1, rowsPerPage, query, selectedStat); // Fetch data with updated search query
  };

  const handleSort = (column) => {
    const newDirection =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);
    fetchSchools(currentPage, rowsPerPage, searchQuery, selectedStat); // Fetch sorted data
  };

  const sortedSchools = (() => {
    if (!sortColumn || !sortDirection) return schools;

    return [...schools].sort((a, b) => {
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
    setTargetSchool({ id, action });
    setShowModal(true);
  };

  const handleAddSchool = () => {
    sessionStorage.setItem("token", Authenticate);
    navigate("/adminAddSchool");
  };
  const handleEdit = (id) => {
   
    sessionStorage.setItem("schoolId", id); // Store package ID in session storage
    navigate(`/adminEditSchool`); // Navigate to the edit page
  };
  const handleFeatured = (id) => {
    sessionStorage.setItem("schoolId", id); // Store school ID in session storage
    navigate("/adminEditFeatured");
  };

  const handleToggleSwitch = (id, currentStatus) => {
    const action =
      currentStatus === "Active" || currentStatus === "Temporary"
        ? "disable"
        : "enable";
    setTargetSchool({ id, action });
    setShowModal(true);
  };

  const confirmAction = async () => {
    if (!targetSchool) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/admin/editSchoolStatus`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: Authenticate,
          },
          body: JSON.stringify({
            id: targetSchool.id,
            type: targetSchool.action,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        // Fetch the updated data from the database
        await fetchSchools(currentPage, rowsPerPage, searchQuery, selectedStat);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error processing the action:", error);
    } finally {
      setShowModal(false);
      setTargetSchool(null);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Disable":
        return "status-disable";
      case "Temporary-Disable":
        return "status-disable";
      case "Active":
        return "status-active";
      case "Pending":
        return "status-pending";
      case "Temporary":
        return "status-temporary";
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
          Total Schools: {total}
        </th>
      </tr>
      <tr>
        <th onClick={() => handleSort("name")}>
          Name {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}
        </th>
        <th onClick={() => handleSort("email")}>
          Email{" "}
          {sortColumn === "email" && (sortDirection === "asc" ? "↑" : "↓")}
        </th>
        <th onClick={() => handleSort("contact")}>
          Contact No.{" "}
          {sortColumn === "contact" && (sortDirection === "asc" ? "↑" : "↓")}
        </th>
        <th onClick={() => handleSort("category")}>
          Category{" "}
          {sortColumn === "category" && (sortDirection === "asc" ? "↑" : "↓")}
        </th>
        <th onClick={() => handleSort("status")}>
          Status{" "}
          {sortColumn === "status" && (sortDirection === "asc" ? "↑" : "↓")}
        </th>
        <th>Featured Settings</th>
        <th>Action</th>
      </tr>
    </>
  );

  const tbodyContent =
    sortedSchools.length > 0 ? (
      sortedSchools.map((school) => (
        <tr key={school.id}>
          <td>{school.name}</td>
          <td>{school.email}</td>
          <td>{school.contact}</td>
          <td>{school.category}</td>
          <td style={{ padding: '8px', background: 'none' }}>
            <span style={{ 
                color: school.status === 'Active' ? 'green' : 
                       school.status === 'Temporary' ? 'orange' :
                       school.status === 'Pending' ? '#FFAA1D' : 'red',
                background: 'none'
            }}>
                {school.status}
            </span>
          </td>
          <td>
            <FontAwesomeIcon
              className="icon-color-featured"
              title="Featured"
              icon={faCalendarDay}
              style={{
                marginRight: "8px",
                color: "#691ED2",
                cursor: "pointer",
              }}
              onClick={() => handleFeatured(school.id)}
            />
          </td>
          <td>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {school.status === "Pending" ? (
                <>
                  <Button
                    className="accept"
                    variant="success"
                    onClick={() => handlePendingAction(school.id, "enable")}
                  >
                    Accept
                  </Button>
                  <Button
                    className="rejected"
                    variant="danger"
                    onClick={() => handlePendingAction(school.id, "disable")}
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
                    style={{
                      marginRight: "8px",
                      color: "#691ED2",
                      cursor: "pointer",
                    }}
                    onClick={() => handleEdit(school.id)}
                  />
                  <MDBSwitch
                    id={`switch-${school.id}`}
                    checked={
                      school.status === "Active" ||
                      school.status === "Temporary"
                    }
                    onChange={() =>
                      handleToggleSwitch(school.id, school.status)
                    }
                    style={{
                      color:
                        school.status === "Active" ||
                        school.status === "Temporary"
                          ? "green"
                          : "",
                    }}
                  />
                </>
              )}
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
    fetchSchools(1, rowsPerPage, searchQuery, stat);
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
          onAddButtonClick={handleAddSchool}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          showAddButton={showAddButton}
          statList={statList}
          onStatChange={handleStatChange}
        />
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to{" "}
          {targetSchool?.action === "enable" ? "Accept" : "Reject"} this school?
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

export default AdminSchoolContent;
