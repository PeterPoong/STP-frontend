import React, { useState, useEffect } from "react";
import { Container, Table, Dropdown, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import '../../css/AdminStyles/AdminTableStyles.css';
import { MDBInput,MDBTable,MDBTableHead, MDBTableBody, MDBPagination, MDBPaginationItem, MDBPaginationLink} from 'mdb-react-ui-kit';


const TableWithControls = ({ 
    theadContent,
    onAddButtonClick,
     tbodyContent, 
     onSearch, 
     onSort, 
     totalPages, 
     currentPage, 
     onPageChange, 
     showSearch = true,          // New prop to toggle search visibility
    showRowsPerPage = true,     // New prop to toggle rows-per-page visibility
     onRowsPerPageChange }) => {
    return (
        <Container fluid>
         <div className="topbar container">
            <div className="row align-items-center">
                <div className="col d-flex">
                     {/* Conditionally render the rows-per-page dropdown */}
                        {showRowsPerPage && (
                            <div className="me-1 mb-3 mt-3 custom-dropdown">
                                Show <span></span>
                                <select onChange={(e) => onRowsPerPageChange(parseInt(e.target.value, 10))}>
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
                </div>
                    <div className="col-auto">
                    {/* Add Button */}
                    <Button className="addNew" variant="primary" onClick={onAddButtonClick}>
                        + Add New
                    </Button>
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
                <MDBPagination>
                    {currentPage > 1 && (
                        <MDBPaginationItem>
                            <MDBPaginationLink onClick={() => onPageChange(currentPage - 1)}>
                                Previous
                            </MDBPaginationLink>
                        </MDBPaginationItem>
                    )}
                    {[...Array(totalPages).keys()].map(page => (
                        <MDBPaginationItem key={page + 1} active={page + 1 === currentPage}>
                            <MDBPaginationLink onClick={() => onPageChange(page + 1)}>
                                {page + 1}
                            </MDBPaginationLink>
                        </MDBPaginationItem>
                    ))}
                    {currentPage < totalPages && (
                        <MDBPaginationItem>
                            <MDBPaginationLink onClick={() => onPageChange(currentPage + 1)}>
                                Next
                            </MDBPaginationLink>
                        </MDBPaginationItem>
                    )}
                </MDBPagination>
              
            </div>
        </div>
        </Container>
    );
};

export default TableWithControls;
