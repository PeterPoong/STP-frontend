import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Spinner } from "react-bootstrap";
import { GraduationCap, CalendarCheck, BookOpenText } from 'lucide-react';
import { MapPin, Clock, ChevronLeft, ChevronRight } from 'react-feather';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../css/StudentPortalStyles/StudentPortalWidget.css";
import WidgetPending from "../../../Components/StudentPortalComp/Widget/WidgetPending";

const AppliedCoursePending = () => {
    // State variables
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Number of items to display per page
    const [isPendingOpen, setIsPendingOpen] = useState(false);
    const [pendingApplications, setPendingApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [withdrawingId, setWithdrawingId] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    // Calculate first and last item index for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    useEffect(() => {
        fetchPendingApplications();
    }, []);

    /**
     * Fetch all pending applications by iterating through all available pages.
     */
    const fetchPendingApplications = async () => {
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
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/pendingAppList?page=${currentPageAPI}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const responseData = await response.json();

                // Validate the structure of the API response
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

            setPendingApplications(allApplications);
        } catch (error) {
            console.error('Error fetching pending applications:', error);
            setPendingApplications([]);
        } finally {
            setLoading(false); // End loading
        }
    };

    /**
     * Handle the withdrawal process by opening the confirmation modal.
     * @param {number} id - The ID of the application to withdraw.
     */
    const handleWithdraw = (id) => {
        setWithdrawingId(id);
        setShowWithdrawModal(true);
    };

    /**
     * Confirm the withdrawal action by making a POST request to the API.
     */
    const confirmWithdraw = async () => {
        try {
            const token = sessionStorage.getItem("token") || localStorage.getItem("token");
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/withdrawApplicant`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: withdrawingId }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            if (result.success) {
                // Refresh the pending applications list
                fetchPendingApplications();
            } else {
                console.error('Failed to withdraw application:', result.message);
            }
        } catch (error) {
            console.error('Error withdrawing application:', error);
        } finally {
            setShowWithdrawModal(false);
            setWithdrawingId(null);
        }
    };

    // Get current items for the current page
    const currentItems = pendingApplications.slice(indexOfFirstItem, indexOfLastItem);

    /**
     * Change the current page.
     * @param {number} pageNumber - The page number to navigate to.
     */
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total number of pages
    const totalPages = Math.ceil(pendingApplications.length / itemsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="acp-container pt-0">
            <h1 className="acp-main-title">Applied Courses</h1>
            <Card className="acp-card mb-4">
                <Card.Body>
                    <h2 className="acp-section-title">Pending Applications</h2>
                    
                    {/* Loading Indicator */}
                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    ) : currentItems.length === 0 ? (
                        <p>No pending applications found.</p>
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
                                                }}
                                            />
                                            <div>
                                                <p className="acp-university-name">{app.school_name}</p>
                                                <p className="acp-location">
                                                    <MapPin size={16} className="acp-icon" />
                                                    {`${app.city_name ? app.city_name : ''}${app.state_name ? `, ${app.state_name}` : ''}${app.country_name ? `, ${app.country_name}` : ''}`} <span className="acp-link">click and view on map</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="acp-middle-section">
                                        <div className="acp-detail-item">
                                            <GraduationCap size={16} className="acp-icon" />
                                            <span>{app.qualification}</span>
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
                                        <span className="acp-status-badge">Pending</span>
                                        <div className="acp-action-buttons">
                                            <Button
                                                className="acp-view-btn btn-danger me-2"
                                                onClick={() => {
                                                    setSelectedApplication(app);
                                                    setIsPendingOpen(true);
                                                }}
                                            >
                                                View
                                            </Button>
                                            <Button
                                                className="acp-withdraw-btn btn-danger"
                                                onClick={() => handleWithdraw(app.id)}
                                            >
                                                Withdraw
                                            </Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))
                    )}

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="pagination d-flex justify-content-center align-items-center mt-3">
                            <button
                                variant="link"
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="me-2"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            {pageNumbers.map(number => (
                                <button
                                    key={number}
                                    className={currentPage === number ? 'active' : ''}
                                    onClick={() => paginate(number)}
                                    
                                >
                                    {number}
                                </button>
                            ))}
                            <button
                                variant="link"
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </Card.Body>
            </Card>

            {/* Withdraw Confirmation Modal */}
            <Modal show={showWithdrawModal} onHide={() => setShowWithdrawModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Withdrawal</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to withdraw this application?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowWithdrawModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="outline-danger" onClick={confirmWithdraw}>
                        Confirm Withdraw
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* WidgetPending Component */}
            <WidgetPending
                isOpen={isPendingOpen}
                onClose={() => setIsPendingOpen(false)}
                date={selectedApplication ? selectedApplication.date_applied : ""}
                feedbacks={selectedApplication && selectedApplication.feedback ? [selectedApplication.feedback] : []}
                formID={selectedApplication ? selectedApplication.id : null}
            />
        </div>
    );
}
export default AppliedCoursePending;
