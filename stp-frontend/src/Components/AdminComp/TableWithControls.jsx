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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  categoryList,
  featList,
  statList,
  schList,
  catList,
  onCatChange,
  onStatChange,
  onFeatChange,
  onSchChange,
  onCategoryChange,
  onSubjectChange,
  showMonthFilter = false, // Add this prop
  onMonthYearChange, // Add this prop
}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isRangeMode, setIsRangeMode] = useState(false);

  const formatDate = (date) => {
    if (!date) return '';
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${year}`;
  };

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

  // Add this function to your component to transform the thead content into data labels
  const addDataLabels = (tbodyContent, theadContent) => {
    const headers = React.Children.toArray(theadContent.props.children)
      .filter(child => child.type === 'th')
      .map(th => th.props.children);

    return React.Children.map(tbodyContent, (tr) => {
      if (!tr) return null;
      
      return React.cloneElement(tr, {
        children: React.Children.map(tr.props.children, (td, index) => {
          // Add title attribute for tooltip
          return React.cloneElement(td, {
            'data-label': headers[index] || '',
            'title': td.props.children, // Add tooltip
          });
        })
      });
    });
  };

  return (
    <div className="table-controls-wrapper">
      <Container fluid className="table-controls-container">
        <div className="topbar">
          <div className="controls-wrapper">
            <div className="control-row">
              {showRowsPerPage && (
                <div className="control-item rows-per-page">
                  Show
                  <select
                    onChange={(e) => onRowsPerPageChange(parseInt(e.target.value, 10))}
                    className="rows-select"
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="All">All</option>
                  </select>
                </div>
              )}

              {showSearch && (
                <div className="control-item search-wrapper">
                  <Form.Control
                    type="text"
                    placeholder="Search Name"
                    onChange={(e) => onSearch(e.target.value)}
                    className="search-input"
                  />
                  <FontAwesomeIcon icon={faSearch} className="search-icon" />
                </div>
              )}

              {/* Status filter */}
              {statList && statList.length > 0 && (
                <div className="control-item status-filter">
                  <select onChange={(e) => onStatChange(e.target.value)}>
                    <option value="">All Status</option>
                    {statList.map((stat) => (
                      <option key={stat.id} value={stat.id}>
                        {stat.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* School filter */}
              {schList && schList.length > 0 && (
                <div className="control-item school-filter">
                  <select onChange={(e) => onSchChange(e.target.value)}>
                    <option value="">All Schools</option>
                    {schList.map((sch) => (
                      <option key={sch.id} value={sch.id}>
                        {sch.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Subject filter */}
              {subjectList && subjectList.length > 0 && (
                <div className="control-item subject-filter">
                  <select onChange={(e) => onSubjectChange(e.target.value)}>
                    <option value="">All Subjects</option>
                    {subjectList.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.core_metaName}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Category filter */}
              {categoryList && categoryList.length > 0 && (
                <div className="control-item category-filter">
                  <select onChange={(e) => onCategoryChange(e.target.value)}>
                    <option value="">All Categories</option>
                    {categoryList.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.category_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Featured Type filter */}
              {featList && featList.length > 0 && (
                <div className="control-item featured-filter">
                  <select onChange={(e) => onFeatChange(e.target.value)}>
                    <option value="">All Featured Types</option>
                    {featList.map((feat) => (
                      <option key={feat.id} value={feat.id}>
                        {feat.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Category Type filter */}
              {catList && catList.length > 0 && (
                <div className="control-item cat-filter">
                  <select onChange={(e) => onCatChange(e.target.value)}>
                    <option value="">All Categories</option>
                    {catList.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {showAddButton && (
                <div>
                  <Button
                    className="addNewAdmin"
                    variant="primary"
                    onClick={onAddButtonClick}
                  >
                    + Add New
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Table container remains the same */}
          <div className="TableContainer">
            <MDBTable className="AdminTable table-borderless" hover>
              <MDBTableHead className="AdminTableHead">
                {React.cloneElement(theadContent, { onSort })}
              </MDBTableHead>
              <MDBTableBody className="AdminTableBody">
                {addDataLabels(tbodyContent, theadContent)}
              </MDBTableBody>
            </MDBTable>
          </div>
          <div className="pagination-controls">
            <MDBPagination>{renderPaginationItems()}</MDBPagination>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TableWithControls;
