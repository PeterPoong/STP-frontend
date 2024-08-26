import React, { useState, useEffect } from "react";
import { Container, Table, Dropdown, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import '../../css/AdminStyles/AdminTableStyles.css';

const TableWithControls = ({
    theadContent,
    tbodyContent,
    onAddButtonClick,
    defaultRowsPerPage = 10,
    onSort // Add onSort to handle sorting
}) => {
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState(tbodyContent);

    useEffect(() => {
        if (Array.isArray(tbodyContent)) {
            const filtered = tbodyContent.filter(row => {
                return Object.values(row.props.children).some(cell => {
                    const cellContent = cell.props.children;
                    return cellContent ? cellContent.toString().toLowerCase().includes(searchQuery.toLowerCase()) : false;
                });
            });
            setFilteredData(filtered);
            setCurrentPage(1); // Reset to the first page when filtering
        }
    }, [searchQuery, tbodyContent]);
    
    const handleRowsPerPageChange = (number) => {
        if (number > 0 || number === 'All') {
            setRowsPerPage(number);
            setCurrentPage(1); // Reset to the first page when rows per page changes
        }
    };
    

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Calculate the total number of pages
  // Ensure filteredData.length is not 0 or negative and rowsPerPage is valid
const totalPages = Math.ceil(filteredData.length / rowsPerPage) || 1;

    
    // Calculate the items to display for the current page
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = rowsPerPage === 'All'
    ? filteredData
    : filteredData.slice(startIndex, endIndex);


    return (
        <Container fluid>
            <div className="topbar container">
                <div className="row align-items-center">
                    <div className="col d-flex">
                        <Dropdown className="me-1 mb-3 mt-3 custom-dropdown">
                            Show
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                {rowsPerPage === 'All' ? tbodyContent.length : rowsPerPage}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {[5, 10, 20, 30, 40, 50, 'All'].map((option, index) => (
                                    <Dropdown.Item
                                        key={index}
                                        onClick={() => handleRowsPerPageChange(option)}
                                    >
                                        Show {option}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>

                        {/* Search Input */}
                        <div className="search-input-wrapper mt-2 mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                            <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        </div>
                    </div>
                    <div className="col-auto">
                        {/* Add Button */}
                        <Button className="addNew" variant="primary" onClick={onAddButtonClick}>
                            + Add New
                        </Button>
                    </div>
                </div>
            </div>
            <div className="TableContainer">
                <Table className="AdminTable table-borderless" hover>
                    <thead className="AdminTableHead">
                        {React.cloneElement(theadContent, { onSort })}
                    </thead>
                    <tbody className="AdminTableBody">
                        {paginatedData}
                    </tbody>
                </Table>
            </div>

            {/* Always Render Pagination */}
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <a
                            className="page-link"
                            href="#"
                            aria-label="Previous"
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage > 1) handlePageChange(currentPage - 1);
                            }}
                        >
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </a>
                    </li>
                    {[...Array(totalPages).keys()].map(page => (
                        <li
                            key={page + 1}
                            className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}
                        >
                            <a
                                className="page-link"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(page + 1);
                                }}
                            >
                                {page + 1}
                            </a>
                        </li>
                    ))}

                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <a
                            className="page-link"
                            href="#"
                            aria-label="Next"
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage < totalPages) handlePageChange(currentPage + 1);
                            }}
                        >
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </Container>
    );
};

export default TableWithControls;
