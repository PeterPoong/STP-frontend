import React, { useState, useEffect } from 'react';
import { Card, Button } from "react-bootstrap";
import { GraduationCap, CalendarCheck, BookOpenText } from 'lucide-react';
import { MapPin, Clock, ChevronLeft, ChevronRight } from 'react-feather';
import "bootstrap/dist/css/bootstrap.min.css";
import WidgetAccepted from "../../../Components/StudentPortalComp/Widget/WidgetAccepted";
import WidgetRejected from "../../../Components/StudentPortalComp/Widget/WidgetRejected";

import "../../../css/StudentPortalStyles/StudentPortalWidget.css";

const AppliedCourseHistory = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Number of items to display per page
    const [isAcceptedOpen, setIsAcceptedOpen] = useState(false);
    const [isRejectedOpen, setIsRejectedOpen] = useState(false);
    const [applications, setApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

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

            // Sort the applications by date_applied in descending order
            allApplications.sort((a, b) => new Date(b.date_applied) - new Date(a.date_applied));

            setApplications(allApplications);
        } catch (error) {
            console.error('Error fetching application history:', error);
            setApplications([]);
        } finally {
            setLoading(false); // End loading
        }
    };

    // Get current items for the current page
    const currentItems = applications.slice(indexOfFirstItem, indexOfLastItem);

    // Function to change the current page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total number of pages
    const totalPages = Math.ceil(applications.length / itemsPerPage);
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
            <h1 className="acp-main-title">Application History</h1>
            <Card className="acp-card mb-4">
                <Card.Body>
                    <h2 className="acp-section-title">All Applications</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : currentItems.length === 0 ? (
                        <p>No course history</p>
                    ) : (
                        currentItems.map((app) => (
                            <Card key={app.id} className="acp-application-card mb-3">
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
                                                    {app.city_name}, {app.state_name}, {app.country_name} <span className="acp-link">click and view on map</span>
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
                                            <span>{app.course_intake}</span>
                                        </div>
                                    </div>
                                    <div className="acp-right-section">
                                        <span className={`acp-status-badge acp-status-${app.status.toLowerCase()}`}>{app.status}</span>
                                        <div className="acp-action-buttons">
                                            {app.status !== "WithDrawl" && (
                                                <Button className="acp-view-btn btn-danger" onClick={() => handleView(app)}>Review</Button>
                                            )}
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))
                    )}
                    {/* Pagination */}
                    {applications.length > itemsPerPage && (
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
