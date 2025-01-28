import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Alert } from "react-bootstrap";
import "../../css/StudentCss/course page css/SearchCourse.css";


const baseURL = import.meta.env.VITE_BASE_URL;

const InterestedList = () => {
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [courseInterests, setCourseInterests] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const courseListURL = `${baseURL}api/student/interestedCourseList`;

    const handleInterestClick = async (courseId) => {
        if (!isAuthenticated) {
            navigate("/studentPortalLogin");
            return;
        }

        try {
            const token = sessionStorage.getItem("token") || localStorage.getItem("token");
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };

            if (!courseInterests[courseId]) {
                // Add interest
                const requestBody = { course_id: courseId };
                const response = await fetch(`${baseURL}api/student/addInterestedCourse`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(requestBody)
                });

                const data = await response.json();
                if (data.success) {
                    setCourseInterests(prev => ({
                        ...prev,
                        [courseId]: { 
                            id: data.data.id,
                            status: 1 
                        }
                    }));
                }
            } else {
                // Toggle interest status
                const requestBody = {
                    course_id: courseId,
                    type: courseInterests[courseId].status === 1 ? 'disable' : 'enable'
                };
                const response = await fetch(`${baseURL}api/student/removeInterestedCourse`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(requestBody)
                });

                const data = await response.json();
                if (data.success) {
                    setCourseInterests(prev => ({
                        ...prev,
                        [courseId]: { 
                            ...prev[courseId],
                            status: prev[courseId].status === 1 ? 0 : 1
                        }
                    }));
                }
            }
        } catch (error) {
            console.error('Error handling interest:', error);
        }
    };

    const fetchCourses = async () => {
        setIsLoading(true);
        try {
            const token = sessionStorage.getItem('token') || localStorage.getItem('token');
            if (!token) {
                throw new Error('No authorization token found');
            }
            const response = await fetch(courseListURL, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            if (!result.success || !result.data) {
                throw new Error("Invalid response structure");
            }

            setResults(result.data || []);

            const interests = {};
            result.data.forEach(course => {
                interests[course.course_id] = {
                    id: course.id,
                    status: course.status
                };
            });
            setCourseInterests(interests);
        } catch (error) {
            setError(`Failed to fetch courses: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        setIsAuthenticated(!!token);
        fetchCourses();
    }, []);

    if (isLoading) {
        return <div className="text-center"><p>Loading...</p></div>;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    if (results.length === 0) {
        return <p>No courses found.</p>;
    }

    return (
        <div className="RR-Career-Profile-Container">
            <div className="RS-Header-Section">
                <h3>Favourite Courses</h3>
            </div>
            {results.filter(program => courseInterests[program.course_id]?.status === 1).map((program) => (
                <div className="card mb-5 degree-card" key={program.id} style={{ position: "relative", height: "auto" }}>
                    {program.featured && <div className="featured-badge">Featured</div>}
                    <div className="card-body d-flex flex-column flex-md-row align-items-start mb-5">
                        <Row className="coursepage-row">
                            <Col md={6} lg={6} className="course-card-ipad">
                                <div className="card-image mb-3 mb-md-0">
                                    <h5 className="card-title">
                                        <Link
                                            rel="preload"
                                            to={`/course-details/${program.school_name.replace(/\s+/g, '-').toLowerCase()}/${program.name.replace(/\s+/g, '-').toLowerCase()}`}
                                            style={{ color: "black" }}
                                            // onClick={() => sessionStorage.setItem('courseId', program.id)}
                                        >
                                        {program.name}
                                        </Link>
                                    </h5>
                                    <div className="coursepage-searchcourse-courselist-first">
                                        <div className="coursepage-img" style={{ paddingLeft: "20px" }}>
                                            <Link
                                                rel="preload"
                                                to={`/university-details/${program.school_name.replace(/\s+/g, '-').toLowerCase()}`}
                                                style={{ color: "black" }}
                                                onClick={() => sessionStorage.setItem("schoolId", program.school_id)}
                                                >
                                            <img
                                                loading="lazy"
                                                src={`${baseURL}storage/${program.logo}`}
                                                alt={program.school_name}
                                                width="100"
                                                className="coursepage-img-size"
                                            />
                                            </Link>
                                        </div>
                                        <div className="searchcourse-coursename-schoolname">
                                            <div>
                                                <h5 className="card-text">
                                                      <Link
                                                        rel="preload"
                                                        to={`/university-details/${program.school_name.replace(/\s+/g, '-').toLowerCase()}`}
                                                        style={{ color: "black" }}
                                                        onClick={() => sessionStorage.setItem("schoolId", program.school_id)}
                      >
                                                    {program.school_name}
                                                    </Link>
                                                </h5>
                                                <i className="bi bi-geo-alt" style={{ marginRight: "10px", color: "#AAAAAA" }}></i>
                                                <span>
                                                    {program.state || "N/A"}, {program.country || "N/A"}
                                                </span>
                                            </div>
                                            <div>
                                                <a href={program.school_location} target="_blank" rel="noopener noreferrer">
                                                    Click and view on map
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6} lg={6} className="course-card-fee-ipad">
                                <div className="d-flex flex-grow-1 coursepage-searchcourse-courselist-second">
                                    <div className="details-div">
                                        <div className="flex-wrap coursepage-info-one">
                                            <Col>
                                                <div>
                                                    <Row>
                                                        <div className="searchcourse-dflex-center">
                                                            <i className="bi bi-mortarboard" style={{ marginRight: "10px" }}></i>
                                                            <p style={{ paddingLeft: "20px" }}>
                                                                {program.qualification}
                                                            </p>
                                                        </div>
                                                        <div style={{ marginTop: "10px" }} className="searchcourse-dflex-center">
                                                            <i className="bi bi-calendar-check" style={{ marginRight: "10px" }}></i>
                                                            <p style={{ paddingLeft: "20px" }}>
                                                                {program.mode}
                                                            </p>
                                                        </div>
                                                        <div style={{ marginTop: "10px" }} className="searchcourse-dflex-center">
                                                            <i className="bi bi-clock" style={{ marginRight: "10px" }}></i>
                                                            <p style={{ paddingLeft: "20px" }}>
                                                                {program.period}
                                                            </p>
                                                        </div>
                                                        <div style={{ marginTop: "10px" }} className="searchcourse-dflex-center">
                                                            <i className="bi bi-calendar2-week" style={{ marginRight: "10px" }}></i>
                                                            <p style={{ paddingLeft: "20px" }}>
                                                                {Array.isArray(program.intake) && program.intake.length > 0
                                                                    ? program.intake.join(", ")
                                                                    : "N/A"}
                                                            </p>
                                                        </div>
                                                    </Row>
                                                </div>
                                            </Col>
                                        </div>
                                    </div>
                                    <div className="fee-apply">
                                        <div className="fee-info text-right" style={{ marginTop: "25px" }}>
                                            <p style={{ fontSize: "14px" }} className="coursepage-estimatefee">
                                                estimate fee
                                                <br />
                                                <p style={{ fontSize: "16px" }}>
                                                    {program.cost === "0" || program.cost === "RM0" ? (
                                                        "N/A"
                                                    ) : (
                                                        <>
                                                            <strong>RM </strong> {program.cost}
                                                        </>
                                                    )}
                                                </p>
                                            </p>
                                        </div>
                                        <div className="d-flex interest-division">
                                            <div className="interest">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleInterestClick(program.course_id);
                                                    }}
                                                    className="interest-button"
                                                    aria-label={courseInterests[program.course_id]?.status === 1 ? "Remove from interests" : "Add to interests"}
                                                >
                                                    <span style={{ fontSize: "16px" }}>
                                                        {courseInterests[program.course_id]?.status === 1 ? "Favourite" : "Favourite"}
                                                    </span>
                                                    <i className={courseInterests[program.course_id]?.status === 1 ? "bi bi-heart-fill" : "bi bi-heart"}></i>
                                                </button>
                                            </div>
                                            <div className="apply-button">
                                                {program.institute_category === "Local University" ? (
                                                    <button
                                                        onClick={() => window.location.href = `mailto:${program.email}`}
                                                        className="featured coursepage-applybutton"
                                                    >
                                                        Contact Now
                                                    </button>
                                                ) : (
                                                    <button className="featured coursepage-applybutton" onClick={() => handleApplyNow(program)}>
                                                        Apply Now
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            ))}
            <h6 style={{color:"grey"}}>Previously Favourite Courses</h6>
            {results.filter(program => courseInterests[program.course_id]?.status === 0).map((program) => (
                <div className="card mb-4 degree-card" key={program.id} style={{ position: "relative", height: "auto" }}>
                    {program.featured && <div className="featured-badge">Featured</div>}
                    <div className="card-body d-flex flex-column flex-md-row align-items-start">
                        <Row className="coursepage-row">
                            <Col md={6} lg={6} className="course-card-ipad">
                                <div className="card-image mb-3 mb-md-0">
                                    <h5 className="card-title">
                                        <Link
                                            rel="preload"
                                            to={`/course-details/${program.school_name.replace(/\s+/g, '-').toLowerCase()}/${program.name.replace(/\s+/g, '-').toLowerCase()}`}
                                            style={{ color: "black" }}
                                            // onClick={() => sessionStorage.setItem('courseId', program.id)}
                                        >
                                        {program.name}
                                        </Link>
                                    </h5>
                                    <div className="coursepage-searchcourse-courselist-first">
                                        <div className="coursepage-img" style={{ paddingLeft: "20px" }}>
                                            <Link
                                                rel="preload"
                                                to={`/university-details/${program.school_name.replace(/\s+/g, '-').toLowerCase()}`}
                                                style={{ color: "black" }}
                                                onClick={() => sessionStorage.setItem("schoolId", program.school_id)}
                                                >
                                            <img
                                                loading="lazy"
                                                src={`${baseURL}storage/${program.logo}`}
                                                alt={program.school_name}
                                                width="100"
                                                className="coursepage-img-size"
                                            />
                                            </Link>
                                        </div>
                                        <div className="searchcourse-coursename-schoolname">
                                            <div>
                                                <h5 className="card-text">
                                                      <Link
                                                        rel="preload"
                                                        to={`/university-details/${program.school_name.replace(/\s+/g, '-').toLowerCase()}`}
                                                        style={{ color: "black" }}
                                                        onClick={() => sessionStorage.setItem("schoolId", program.school_id)}
                      >
                                                    {program.school_name}
                                                    </Link>
                                                </h5>
                                                <i className="bi bi-geo-alt" style={{ marginRight: "10px", color: "#AAAAAA" }}></i>
                                                <span>
                                                    {program.state || "N/A"}, {program.country || "N/A"}
                                                </span>
                                            </div>
                                            <div>
                                                <a href={program.school_location} target="_blank" rel="noopener noreferrer">
                                                    Click and view on map
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6} lg={6} className="course-card-fee-ipad">
                                <div className="d-flex flex-grow-1 coursepage-searchcourse-courselist-second">
                                    <div className="details-div">
                                        <div className="flex-wrap coursepage-info-one">
                                            <Col>
                                                <div>
                                                    <Row>
                                                        <div className="searchcourse-dflex-center">
                                                            <i className="bi bi-mortarboard" style={{ marginRight: "10px" }}></i>
                                                            <p style={{ paddingLeft: "20px" }}>
                                                                {program.qualification}
                                                            </p>
                                                        </div>
                                                        <div style={{ marginTop: "10px" }} className="searchcourse-dflex-center">
                                                            <i className="bi bi-calendar-check" style={{ marginRight: "10px" }}></i>
                                                            <p style={{ paddingLeft: "20px" }}>
                                                                {program.mode}
                                                            </p>
                                                        </div>
                                                        <div style={{ marginTop: "10px" }} className="searchcourse-dflex-center">
                                                            <i className="bi bi-clock" style={{ marginRight: "10px" }}></i>
                                                            <p style={{ paddingLeft: "20px" }}>
                                                                {program.period}
                                                            </p>
                                                        </div>
                                                        <div style={{ marginTop: "10px" }} className="searchcourse-dflex-center">
                                                            <i className="bi bi-calendar2-week" style={{ marginRight: "10px" }}></i>
                                                            <p style={{ paddingLeft: "20px" }}>
                                                                {Array.isArray(program.intake) && program.intake.length > 0
                                                                    ? program.intake.join(", ")
                                                                    : "N/A"}
                                                            </p>
                                                        </div>
                                                    </Row>
                                                </div>
                                            </Col>
                                        </div>
                                    </div>
                                    <div className="fee-apply">
                                        <div className="fee-info text-right" style={{ marginTop: "25px" }}>
                                            <p style={{ fontSize: "14px" }} className="coursepage-estimatefee">
                                                estimate fee
                                                <br />
                                                <p style={{ fontSize: "16px" }}>
                                                    {program.cost === "0" || program.cost === "RM0" ? (
                                                        "N/A"
                                                    ) : (
                                                        <>
                                                            <strong>RM </strong> {program.cost}
                                                        </>
                                                    )}
                                                </p>
                                            </p>
                                        </div>
                                        <div className="d-flex interest-division">
                                            <div className="interest">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleInterestClick(program.course_id);
                                                    }}
                                                    className="interest-button"
                                                    aria-label={courseInterests[program.course_id]?.status === 1 ? "Remove from interests" : "Add to interests"}
                                                >
                                                    <span style={{ fontSize: "16px" }}>
                                                        {courseInterests[program.course_id]?.status === 1 ? "Favourite" : "Favourite"}
                                                    </span>
                                                    <i className={courseInterests[program.course_id]?.status === 1 ? "bi bi-heart-fill" : "bi bi-heart"}></i>
                                                </button>
                                            </div>
                                            <div className="apply-button">
                                                {program.institute_category === "Local University" ? (
                                                    <button
                                                        onClick={() => window.location.href = `mailto:${program.email}`}
                                                        className="featured coursepage-applybutton"
                                                    >
                                                        Contact Now
                                                    </button>
                                                ) : (
                                                    <button className="featured coursepage-applybutton" onClick={() => handleApplyNow(program)}>
                                                        Apply Now
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default InterestedList;