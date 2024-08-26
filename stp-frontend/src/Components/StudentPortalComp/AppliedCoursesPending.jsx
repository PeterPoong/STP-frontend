import React, { useState } from 'react';
import { Card, Button } from "react-bootstrap";
import { MapPin, BookOpen, Clock, Calendar, ChevronLeft, ChevronRight } from 'react-feather';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/StudentPortalStyles/StudentPortalWidget.css";
import image1 from "../../assets/student asset/University Logo/image1.jpg";
import WidgetPending from "../../Components/StudentPortalComp/WidgetPending";

const AppliedCoursesPending = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3); // Adjust this number as needed
    const [isPendingOpen, setIsPendingOpen] = useState(false);

    const pendingApplications = [
        {
            id: 1,
            degree: "Degree of Medicine",
            university: "Swinburne University (Sarawak)",
            location: "Sarawak",
            type: "Degree",
            duration: "28 months",
            studyMode: "Full time",
            intakes: "January, July or September",
        },
        {
            id: 2,
            degree: "Degree of Medicine",
            university: "Swinburne University (Sarawak)",
            location: "Sarawak",
            type: "Degree",
            duration: "28 months",
            studyMode: "Full time",
            intakes: "January, July or September",
        },
        {
            id: 3,
            degree: "Degree of Medicine",
            university: "Swinburne University (Sarawak)",
            location: "Sarawak",
            type: "Degree",
            duration: "28 months",
            studyMode: "Full time",
            intakes: "January, July or September",
        },
        {
            id: 4,
            degree: "Degree of Medicine",
            university: "Swinburne University (Sarawak)",
            location: "Sarawak",
            type: "Degree",
            duration: "28 months",
            studyMode: "Full time",
            intakes: "January, July or September",
        },
        {
            id: 5,
            degree: "Degree of Medicine",
            university: "Swinburne University (Sarawak)",
            location: "Sarawak",
            type: "Degree",
            duration: "28 months",
            studyMode: "Full time",
            intakes: "January, July or September",
        },
        // Add more applications as needed
        // ... (duplicate the above object to have more items for pagination)
    ];

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = pendingApplications.slice(indexOfFirstItem, indexOfLastItem);

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
                    {currentItems.map((app) => (
                        <Card key={app.id} className="acp-application-card mb-3">
                            <Card.Body className="acp-application-body">
                                <div className="acp-left-section">
                                    <h3 className="acp-degree-title">{app.degree}</h3>
                                    <div className="acp-university-info">
                                        <img src={image1} alt={app.university} className="acp-university-logo"/>
                                        {/*<img src={app.logo} alt={app.university} className="acp-university-logo" />*/}
                                        <div>
                                            <p className="acp-university-name">{app.university}</p>
                                            <p className="acp-location">
                                                <MapPin size={16} className="acp-icon" />
                                                {app.location} <span className="acp-link">click and view on map</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="acp-middle-section">
                                    <div className="acp-detail-item">
                                        <BookOpen size={16} className="acp-icon" />
                                        <span>{app.type}</span>
                                    </div>
                                    <div className="acp-detail-item">
                                        <Clock size={16} className="acp-icon" />
                                        <span>{app.studyMode}</span>
                                    </div>
                                    <div className="acp-detail-item">
                                        <Clock size={16} className="acp-icon" />
                                        <span>{app.duration}</span>
                                    </div>
                                    <div className="acp-detail-item">
                                        <Calendar size={16} className="acp-icon" />
                                        <span>{app.intakes}</span>
                                    </div>
                                </div>
                                <div className="acp-right-section">
                                    <span className="acp-status-badge">Pending</span>
                                    <div className="acp-action-buttons">
                                    <Button className="acp-view-btn danger btn-danger" onClick={() => setIsPendingOpen(true)}>View</Button>
                                        <Button className="acp-withdraw-btn btn-danger">Withdraw</Button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
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
            <WidgetPending isOpen={isPendingOpen} onClose={() => setIsPendingOpen(false)} />
        </div>
    );
};

export default AppliedCoursesPending;