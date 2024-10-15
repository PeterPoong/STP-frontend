// AppliedCourseHistory.jsx
import React, { useState, useEffect } from 'react';
import { Card, Button } from "react-bootstrap";
import { GraduationCap, CalendarCheck, BookOpenText } from 'lucide-react';
import { MapPin, Clock, ChevronLeft, ChevronRight, Filter, X } from 'react-feather';
import "bootstrap/dist/css/bootstrap.min.css";
import WidgetAccepted from "../../../Components/StudentPortalComp/Widget/WidgetAccepted";
import WidgetRejected from "../../../Components/StudentPortalComp/Widget/WidgetRejected";

import "../../../css/StudentPortalStyles/StudentPortalWidget.css";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

// Styled Components for Filter
const FilterContainer = styled.div`
  margin-top: 0px;
  display: flex;
  align-items: center;
  margin-bottom: 0px;
   @media screen and (max-width: 426px)
  {
    align-items:flex-start;
    flex-direction: column;
  }
`;

const FilterButton = styled(motion.button)`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  padding:5px;
  background-color: #b71a18;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #a01717;
  }
`;

const ExpandedMenu = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin:0 0 0 15px;
  background-color: white;
  border-radius: 10px;
  padding:5px 10px;
  min-width: 500px;
 
  @media screen and (max-width: 426px)
  {
  align-items: flex-start;
  flex-direction: column;
  margin:0;
  padding:0;
  }
 
`;

const FilterOptionButton = styled(motion.button)`
  background-color: ${(props) => (props.active ? "#b71a18" : "white")};
  color: ${(props) => (props.active ? "white" : "#b71a18")};
  border: 2px solid #b71a18;
  border-radius: 5px;
  padding: 0px 16px;
  margin: 10px 15px;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
  width: 150px;
  box-sizing: border-box; /* Ensure padding is included in width */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    background-color: #b71a18;
    color: white;
  }
      @media screen and (max-width: 426px)
    {
    margin:0.5em;
    }
`;

const OptionsList = styled(motion.div)`
  position: absolute;
  top: 40px;
  left: 12.5px;
  background-color: white;
  border: 1px solid #b71a18;
  border-radius: 5px;
  padding: 8px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 2;
  width: 200px;
  max-height: 200px; /* Set maximum height */
  overflow-y: auto;  /* Enable vertical scrolling */
  overflow-x: hidden; /* Prevent horizontal scrolling */

  /* Custom Scrollbar Styles */
  &::-webkit-scrollbar {
    width: 8px;
   padding:10px 0px;
    background-color: #F5F5F5;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #C6C6C6;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #A8A8A8;
  }
`;

const OptionItem = styled(motion.div)`
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-sizing: border-box; /* Ensure padding is included in width */
  width: 100%; /* Ensure the option item doesn't exceed the container's width */
  white-space: nowrap; /* Prevent text from wrapping */
  &:hover {
    background-color: #f0f0f0;
  }
`;

const ResetButton = styled(motion.button)`
  background-color: #b71a18;
  color: white;
  border: 2px solid #b71a18;
  border-radius: 5px;
  padding: 0px 16px;
  margin-left: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  width: 150px;
  box-sizing: border-box; /* Ensure padding is included in width */
  margin-top:0;
  margin-bottom:0;
    &:hover {
      background-color: #a01717;
    }
     @media screen and (max-width: 426px)
    {
    margin:0.5em;
    }
`;

// Filter Component
const CustomFilterComponent = ({ filterOptions, onFilterChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeOption, setActiveOption] = useState(null);
  const [filters, setFilters] = useState({
    course: "",
    school: "",
    status: "",
  });

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleOptionClick = (option) => {
    setActiveOption(activeOption === option ? null : option);
  };

  const handleFilterSelect = (category, value) => {
    setFilters((prev) => ({ ...prev, [category]: value }));
    setActiveOption(null);
    onFilterChange({ ...filters, [category]: value });
  };

  const resetFilters = () => {
    setFilters({ course: "", school: "", status: "" });
    onFilterChange({ course: "", school: "", status: "" });
  };

  // Animation Variants
  const menuVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05 },
    }),
    exit: { opacity: 0, y: -10 },
  };

  const optionVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
  };
  const truncateText = (text, maxLength = 15) => {
    return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
  };
  return (
    <FilterContainer>
      <FilterButton
        onClick={toggleExpand}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ rotate: 0 }}
        animate={{ rotate: isExpanded ? 90 : 0 }}
        transition={{ duration: 0.3 }}
        aria-label={isExpanded ? "Close Filters" : "Open Filters"}
      >
        {isExpanded ? <X size={24} /> : <Filter size={24} />}
      </FilterButton>

      <AnimatePresence>
        {isExpanded && (
          <ExpandedMenu
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {["course", "school", "status"].map((option, index) => (
              <motion.div
                key={option}
                style={{ position: "relative" }}
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={index}
              >
                <FilterOptionButton
                  onClick={() => handleOptionClick(option)}
                  active={filters[option]}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {filters[option] ? truncateText(filters[option]) : option.charAt(0).toUpperCase() + option.slice(1)}
                </FilterOptionButton>
                <AnimatePresence>
                  {activeOption === option && (
                    <OptionsList
                      variants={optionVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      {filterOptions[option].map((item, idx) => (
                        <OptionItem
                          key={item}
                          onClick={() => handleFilterSelect(option, item)}
                          whileHover={{ backgroundColor: "#e0e0e0" }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          {item}
                        </OptionItem>
                      ))}
                    </OptionsList>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            <ResetButton
              onClick={resetFilters}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={3}
            >
              Reset Filters
            </ResetButton>
          </ExpandedMenu>
        )}
      </AnimatePresence>
    </FilterContainer>
  );
};

// Main AppliedCourseHistory Component
const AppliedCourseHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Number of items to display per page
  const [isAcceptedOpen, setIsAcceptedOpen] = useState(false);
  const [isRejectedOpen, setIsRejectedOpen] = useState(false);
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [filterOptions, setFilterOptions] = useState({
    course: [],
    school: [],
    status: [],
  });
  const [filters, setFilters] = useState({
    course: "",
    school: "",
    status: "",
  });

  // Calculate first and last item index for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  useEffect(() => {
    fetchApplicationsHistory();
  }, []);

  const fetchApplicationsHistory = async () => {
    try {
      setLoading(true); // Start loading
      const token = sessionStorage.getItem("token") || localStorage.getItem("token");
      if (!token) {
        throw new Error('No authentication token found');
      }

      let allApplications = [];
      let currentPageAPI = 1;
      let hasMoreData = true;

      // Loop to fetch all pages
      while (hasMoreData) {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/historyAppList?page=${currentPageAPI}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        if (responseData.success && responseData.data && Array.isArray(responseData.data.data)) {
          const applicationsArray = responseData.data.data;

          // Combine the applications
          allApplications = [...allApplications, ...applicationsArray];

          // Check if there's a next page
          if (responseData.data.next_page_url) {
            currentPageAPI++;
          } else {
            hasMoreData = false;
          }
        } else {
          console.error('Unexpected API response structure');
          break;
        }
      }

      // Sort the applications by id in descending order
      allApplications.sort((a, b) => b.id - a.id);

      setApplications(allApplications);

      // Extract unique filter options
      const uniqueCourses = [...new Set(allApplications.map(app => app.course_name))];
      const uniqueSchools = [...new Set(allApplications.map(app => app.school_name))];
      const uniqueStatuses = [...new Set(allApplications.map(app => app.status))];

      setFilterOptions({
        course: uniqueCourses,
        school: uniqueSchools,
        status: uniqueStatuses,
      });
    } catch (error) {
      console.error('Error fetching application history:', error);
      setApplications([]);
    } finally {
      setLoading(false); // End loading
    }
  };

  /**
   * Handle filter changes from the filter component.
   * @param {object} newFilters - The updated filters.
   */
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Get current items for the current page based on filters
  const filteredApplications = applications.filter((item) => {
    return (
      (filters.course === "" || item.course_name === filters.course) &&
      (filters.school === "" || item.school_name === filters.school) &&
      (filters.status === "" || item.status === filters.status)
    );
  });

  const currentItems = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);

  // Function to change the current page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleView = (application) => {
    setSelectedApplication(application);
    switch (application.status) {
      case "Accepted":
        setIsAcceptedOpen(true);
        break;
      case "Rejected":
        setIsRejectedOpen(true);
        break;
      case "Withdrawn":
        // Do nothing for withdrawn status
        break;
      default:
        console.log("Unknown status");
    }
  };

  return (
    <div className="acp-container pt-0">
      <h4 className="mb-3 title-widget" >Application History</h4>
      <Card className="acp-card mb-4">
        <Card.Body>
          <h2 className="acp-section-title mb-0">All Applications</h2>

          {/* Filter Component */}
          <CustomFilterComponent filterOptions={filterOptions} onFilterChange={handleFilterChange} />
          {/* End of Filter Component */}

          {loading ? (
            <p>Loading...</p>
          ) : filteredApplications.length === 0 ? (
            <p>No course history</p>
          ) : (
            currentItems.map((app, index) => (
              <Card
                key={app.id}
                className="acp-application-card mb-3"
                as={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3, ease: "easeOut" }}
              >
                <Card.Body className="acp-application-body">
                  <div className="acp-left-section">
                    <h3 className="acp-degree-title">{app.course_name}</h3>
                    <div className="acp-university-info">
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}storage/${app.course_logo}`}
                        alt={app.school_name}
                        className="acp-university-logo"
                        style={{
                          height: "80px",
                          width: "150px",
                          objectFit: "contain",
                        }} />
                      <div>
                        <p className="acp-university-name">{app.school_name}</p>
                        <p className="acp-location">
                          <MapPin size={16} className="acp-icon" />
                          {`${app.city_name ? app.city_name : ''}${app.state_name ? `, ${app.state_name}` : ''}${app.country_name ? `, ${app.country_name}` : ''}`} 
                          {/*<span className="acp-link">click and view on map</span>*/}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="acp-middle-section">
                    <div className="acp-detail-item">
                      <GraduationCap size={16} className="acp-icon" />
                      <span>{app.category_name}</span>
                    </div>
                    <div className="acp-detail-item">
                      <CalendarCheck size={16} className="acp-icon" />
                      <span>{app.study_mode}</span>
                    </div>
                    <div className="acp-detail-item">
                      <Clock size={16} className="acp-icon" />
                      <span>{app.course_period}</span>
                    </div>
                    <div className="acp-detail-item">
                      <BookOpenText size={16} className="acp-icon" />
                      {Array.isArray(app.intake) ? app.intake.join(', ') : app.intake}
                    </div>
                  </div>
                  <div className="acp-right-section">
                    <span className={`acp-status-badge acp-status-${app.status.toLowerCase()}`}>{app.status}</span>
                    <div className="acp-action-buttons">
                      {["Accepted", "Rejected"].includes(app.status) && (
                        <Button className="acp-view-btn btn-danger" onClick={() => handleView(app)}>Review</Button>
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))
          )}
          {/* Pagination */}
          {filteredApplications.length > itemsPerPage && (
            <div className="pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={20} />
              </button>
              {pageNumbers.map(number => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={currentPage === number ? 'active' : ''}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </Card.Body>
      </Card>
      <WidgetAccepted
        isOpen={isAcceptedOpen}
        onClose={() => setIsAcceptedOpen(false)}
        date={selectedApplication ? selectedApplication.date_applied : ""}
        feedbacks={selectedApplication && selectedApplication.feedback ? [selectedApplication.feedback] : []}
      />
      <WidgetRejected
        isOpen={isRejectedOpen}
        onClose={() => setIsRejectedOpen(false)}
        date={selectedApplication ? selectedApplication.date_applied : ""}
        feedbacks={selectedApplication && selectedApplication.feedback ? [selectedApplication.feedback] : []}
      />
    </div>
  );
};

export default AppliedCourseHistory;
