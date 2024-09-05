import React, { useState, useEffect } from 'react';
import { Card, Button } from "react-bootstrap";
import {GraduationCap,CalendarCheck,BookOpenText } from 'lucide-react';
import { MapPin, BookOpen, Clock, Calendar, ChevronLeft, ChevronRight } from 'react-feather';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/StudentPortalStyles/StudentPortalWidget.css";
import image1 from "../../assets/StudentAssets/University Logo/image1.jpg";
import WidgetAccepted from "../../Components/StudentPortalComp/WidgetAccepted";
import WidgetRejected from "../../Components/StudentPortalComp/WidgetRejected";

const AppliedCoursesHistory = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);
    const [isAcceptedOpen, setIsAcceptedOpen] = useState(false);
    const [isRejectedOpen, setIsRejectedOpen] = useState(false);
    const [applications, setApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);

    // Calculate first and last item index
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    useEffect(() => {
        fetchApplicationsHistory();
    }, []);

    const fetchApplicationsHistory = async () => {
        try {
            const token = sessionStorage.getItem("token") || localStorage.getItem("token");
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/historyAppList`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('API response:', responseData);

            if (responseData.success && responseData.data && Array.isArray(responseData.data.data)) {
                setApplications(responseData.data.data);
            } else {
                console.error('Unexpected API response structure');
                setApplications([]);
            }
        } catch (error) {
            console.error('Error fetching application history:', error);
            setApplications([]);
        }
    };

    // Get current items
    const currentItems = Array.isArray(applications)
        ? applications.slice(indexOfFirstItem, indexOfLastItem)
        : [];

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(applications.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleView = (application) => {
        setSelectedApplication(application);
        switch(application.status) {
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
                    {currentItems.length === 0 ? (
                        <p>No course history</p>
                    ) : (
                        currentItems.map((app) => (
                            <Card key={app.student_id} className="acp-application-card mb-3">
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
                                                }}/>
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
                                            <BookOpenText  size={16} className="acp-icon" />
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

export default AppliedCoursesHistory;