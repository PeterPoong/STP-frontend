import React, { useState, useEffect } from "react";
import { Container, Table, Dropdown, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../../css/AdminStyles/AdminTableStyles.css";
import {
  MDBInput,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";

const TableWithControls = ({
  theadContent,
  onAddButtonClick,
  tbodyContent,
  onSearch,
  onSort,
  totalPages,
  currentPage,
  onPageChange,
  showAddButton,
  showSearch = true, // New prop to toggle search visibility
  showRowsPerPage = true, // New prop to toggle rows-per-page visibility
  onRowsPerPageChange,
  subjectList,
  onSubjectChange,
}) => {
  const renderPaginationItems = () => {
    const items = [];

    // Always show the "Previous" button
    if (currentPage > 1) {
      items.push(
        <MDBPaginationItem key="prev">
          <MDBPaginationLink onClick={() => onPageChange(currentPage - 1)}>
            Previous
          </MDBPaginationLink>
        </MDBPaginationItem>
      );
    }

    // Calculate the range of pages to display
    const pageRange = 5; // Number of pages to show
    let startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
    let endPage = Math.min(totalPages, startPage + pageRange - 1);

    // Adjust startPage if there are not enough pages before currentPage
    if (endPage - startPage < pageRange - 1) {
      startPage = Math.max(1, endPage - pageRange + 1);
    }

    // Always show the first page
    if (startPage > 1) {
      items.push(
        <MDBPaginationItem key={1} active={currentPage === 1}>
          <MDBPaginationLink onClick={() => onPageChange(1)}>
            1
          </MDBPaginationLink>
        </MDBPaginationItem>
      );
      if (startPage > 2) {
        items.push(
          <MDBPaginationItem key="ellipsis-start" className="ellipsis">
            <MDBPaginationLink>...</MDBPaginationLink>
          </MDBPaginationItem>
        );
      }
    }

    // Add the page numbers in the calculated range
    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <MDBPaginationItem key={page} active={currentPage === page}>
          <MDBPaginationLink onClick={() => onPageChange(page)}>
            {page}
          </MDBPaginationLink>
        </MDBPaginationItem>
      );
    }

    // Always show the last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <MDBPaginationItem key="ellipsis-end" className="ellipsis">
            <MDBPaginationLink>...</MDBPaginationLink>
          </MDBPaginationItem>
        );
      }
      items.push(
        <MDBPaginationItem key={totalPages} active={currentPage === totalPages}>
          <MDBPaginationLink onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </MDBPaginationLink>
        </MDBPaginationItem>
      );
    }
    // Always show the "Next" button
    if (currentPage < totalPages) {
      items.push(
        <MDBPaginationItem key="next">
          <MDBPaginationLink onClick={() => onPageChange(currentPage + 1)}>
            Next
          </MDBPaginationLink>
        </MDBPaginationItem>
      );
    }

    return items;
  };

  const [totalCount, setTotalCount] = useState(0);
  return (
    <Container fluid>
      <div className="topbar container">
        <div className="row align-items-center">
          <div className="col d-flex">
            {/* Conditionally render the rows-per-page dropdown */}
            {showRowsPerPage && (
              <div className="me-1 mb-3 mt-3 custom-dropdown">
                Show <span></span>
                <select
                  onChange={(e) =>
                    onRowsPerPageChange(parseInt(e.target.value, 10))
                  }
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="All">All</option>
                </select>
              </div>
            )}

            {/* Conditionally render the search input */}
            {showSearch && (
              <div className="search-input-wrapper mt-2 mb-3">
                <Form.Control
                  type="text"
                  placeholder="Search Name"
                  onChange={(e) => onSearch(e.target.value)}
                  className="search-input"
                />
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
              </div>
            )}
            {/* Conditionally render the subject enquiry dropdown */}
            {subjectList && subjectList.length > 0 && (
              <div className="me-1 mb-3 mt-3 ms-3 custom-dropdown">
                Enquiry Subject
                <select
                  onChange={(e) => onSubjectChange(e.target.value)}
                  className="subject-dropdown"
                >
                  <option value="">All Subjects</option>
                  {subjectList.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.core_metaName}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="col-auto">
            {/* Conditionally render the Add New button */}
            {showAddButton && (
              <Button
                className="addNew"
                variant="primary"
                onClick={onAddButtonClick}
              >
                + Add New
              </Button>
            )}
          </div>
        </div>

        <div className="TableContainer">
          <MDBTable className="AdminTable table-borderless" hover>
            <MDBTableHead className="AdminTableHead">
              {React.cloneElement(theadContent, { onSort })}
            </MDBTableHead>
            <MDBTableBody className="AdminTableBody">
              {tbodyContent}
            </MDBTableBody>
          </MDBTable>
        </div>
        <div className="pagination-controls">
          <MDBPagination>{renderPaginationItems()}</MDBPagination>
        </div>
      </div>
    </Container>
  );
};

export default TableWithControls;
