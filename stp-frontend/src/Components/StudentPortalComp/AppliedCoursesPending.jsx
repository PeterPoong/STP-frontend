import React, { useState, useEffect } from 'react';
import { Card, Button, Modal } from "react-bootstrap";
import {GraduationCap,CalendarCheck,BookOpenText } from 'lucide-react';
import { MapPin, BookOpen, Clock, Calendar, ChevronLeft, ChevronRight } from 'react-feather';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/StudentPortalStyles/StudentPortalWidget.css";
import WidgetPending from "../../Components/StudentPortalComp/WidgetPending";

const AppliedCoursesPending = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);
    const [isPendingOpen, setIsPendingOpen] = useState(false);
    const [pendingApplications, setPendingApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [withdrawingId, setWithdrawingId] = useState(null);

    // Calculate first and last item index
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    useEffect(() => {
        fetchPendingApplications();
    }, []);

    const fetchPendingApplications = async () => {
        try {
            const token = sessionStorage.getItem("token") || localStorage.getItem("token");
            if (!token) {
                throw new Error('No authentication token found');
            }

            // Change the method to GET
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/pendingAppList`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            // Check if the response is ok before parsing JSON
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('API response:', responseData);
            
            // Check if the response has the expected structure
            if (responseData.success && responseData.data && Array.isArray(responseData.data.data)) {
                setPendingApplications(responseData.data.data);
                // You might want to update pagination state here as well
                // setCurrentPage(responseData.data.current_page);
                // setTotalPages(responseData.data.last_page);
            } else {
                console.error('Unexpected API response structure');
                setPendingApplications([]);
            }
        } catch (error) {
            console.error('Error fetching pending applications:', error);
            setPendingApplications([]);
        }
    };

    const handleWithdraw = async (id) => {
        setWithdrawingId(id);
        setShowWithdrawModal(true);
    };

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

    // Get current items
    const currentItems = Array.isArray(pendingApplications) 
        ? pendingApplications.slice(indexOfFirstItem, indexOfLastItem)
        : [];

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(pendingApplications.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="acp-container pt-0">
            <h1 className="acp-main-title">Applied Courses</h1>
            <Card className="acp-card mb-4">
                <Card.Body>
                    <h2 className="acp-section-title">Pending Applications</h2>
                    {currentItems.length === 0 ? (
                        <p>No course applied</p>
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
                                                    {`${app.country_name}${app.state_name ? `, ${app.state_name}` : ''}${app.city_name ? `, ${app.city_name}` : ''}`} <span className="acp-link">click and view on map</span>
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
                                                className="acp-view-btn danger btn-danger" 
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
                            disabled={currentPage === pageNumbers.length} 
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </Card.Body>
            </Card>
            <Modal show={showWithdrawModal} onHide={() => setShowWithdrawModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Withdrawal</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to withdraw this application?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowWithdrawModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmWithdraw}>
                        Confirm Withdraw
                    </Button>
                </Modal.Footer>
            </Modal>
            <WidgetPending 
                isOpen={isPendingOpen} 
                onClose={() => setIsPendingOpen(false)}
                date={selectedApplication ? selectedApplication.date_applied : ""}
                feedbacks={selectedApplication && selectedApplication.feedback ? [selectedApplication.feedback] : []}
            />
        </div>
    );
};

export default AppliedCoursesPending;