import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Tab, Tabs, Accordion, Form, Button, InputGroup } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import '../../css/AdminStyles/AdminFeature.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";
import moment from 'moment';

const statusOptions = [
    { value: '', label: 'Featured Status' },
    { value: 0, label: 'Disable' },
    { value: 1, label: 'Approved' },
    { value: 2, label: 'Pending' },
    { value: 3, label: 'Rejected' }
];

const getFeaturedTypeColor = (featuredType) => {
    if (!featuredType) return 'inherit';
    
    const type = featuredType.toLowerCase();
    if (type.includes('homepage')) return '#FF7733';
    if (type.includes('second')) return '#5C9ECD';
    if (type.includes('third')) return '#86C48E';
    return 'inherit';
};

const getStatusColor = (status) => {
    if (!status) return 'inherit';
    
    switch(status.toLowerCase()) {
        case 'pending':
            return '#FFAE4C';
        case 'approved':
        case 'active':
            return '#146A17';
        case 'rejected':
            return '#DF0C3D';
        case 'disable':
            return '#9E9E9E';
        case 'expired':
            return '#9E9E9E';
        default:
            return 'inherit';
    }
};

const AdminEditFeaturedContent = () => {
    const schoolId = sessionStorage.getItem('schoolId');
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [courseFeatured, setCourseFeatured] = useState([]);
    const [schoolFeatured, setSchoolFeatured] = useState([]);
    const [activeTab, setActiveTab] = useState('course');
    
    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFeaturedType, setSelectedFeaturedType] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [featuredList, setFeaturedList] = useState([]);
    const [featuredListData, setFeaturedListData] = useState({
        courses: [],
        schools: []
    });

    // Add new state for course options
    const [courseOptions, setCourseOptions] = useState([]);

    const fetchFeaturedRequests = async () => {
        try {
            const requestBody = {
                school_id: parseInt(schoolId)
            };

            // Only add status if it's selected
            if (selectedStatus !== '') {
                requestBody.status = parseInt(selectedStatus);
            }

            console.log('Request Body:', requestBody);

            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/featuredRequestList`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Authenticate,
                },
                body: JSON.stringify(requestBody)
            });

            const result = await response.json();
            console.log('API Response:', result);

            if (result.success && result.data && result.data.data) {
                // Log the data before filtering
                console.log('Raw data:', result.data.data);

                const courseRequests = result.data.data.filter(
                    request => request.request_type === 83
                );
                const schoolRequests = result.data.data.filter(
                    request => request.request_type === 84
                );

                // Log the filtered data
                console.log('Course Requests:', courseRequests);
                console.log('School Requests:', schoolRequests);

                setCourseFeatured(courseRequests);
                setSchoolFeatured(schoolRequests);
            }
        } catch (error) {
            console.error('Error fetching featured requests:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchFeaturedList = async () => {
        try {
            const requestBody = {
                school_id: parseInt(schoolId)
            };

            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/schoolFeaturedSchoolCourseRequestList`, {
                method: 'POST',
                headers: {
                    'Authorization': Authenticate,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            console.log('Featured List API Response:', result); // Debug log
            
            if (result.success) {
                const courses = [];
                const schools = [];
                
                // Ensure result.data is an array before processing
                if (Array.isArray(result.data)) {
                    result.data.forEach(item => {
                        // Handle course data
                        if (Array.isArray(item.course_names)) {
                            courses.push(...item.course_names.map(course => ({
                                ...course,
                                name: course.course_name || course.name,
                                request_id: course.request_id || course.id,
                                featured_status: course.featured_status || 0,
                                start_date: course.start_date || null,
                                end_date: course.end_date || null
                            })));
                        }
                        
                        // Handle school data
                        if (item.school) {
                            const schoolData = Array.isArray(item.school) ? item.school : [item.school];
                            schools.push(...schoolData.map(school => ({
                                ...school,
                                name: school.school_name || school.name,
                                request_id: school.request_id || school.id,
                                featured_status: school.featured_status || 0,
                                start_date: school.start_date || null,
                                end_date: school.end_date || null
                            })));
                        }
                    });
                }

                console.log('Processed Courses:', courses); // Debug log
                console.log('Processed Schools:', schools); // Debug log
                
                setFeaturedListData({ courses, schools });
            } else {
                console.error('API returned success: false', result);
            }
        } catch (error) {
            console.error('Error fetching featured list:', error);
        }
    };

    const getFeaturedDetails = (requestType, requestId) => {
        if (requestType === 83) { // Course
            return featuredListData.courses.find(course => 
                course.request_id === requestId
            );
        } else { // School
            return featuredListData.schools.find(school => 
                school.request_id === requestId
            );
        }
    };

    const calculateDaysLeft = (startDate, endDate) => {
        if (startDate === "No Data Available" || endDate === "No Data Available") {
            return "To be calculated";
        }
        
        const start = moment(startDate);
        const end = moment(endDate);
        const now = moment();
        
        if (!start.isValid() || !end.isValid()) {
            return "To be calculated";
        }
        
        const daysLeft = end.diff(now, 'days');
        return daysLeft > 0 ? `${daysLeft} days` : "Expired";
    };

    const handleStartDateChange = async (date, requestType, requestId, featuredDuration) => {
        const formattedStartDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
        const formattedEndDate = moment(date)
            .add(featuredDuration, 'days')
            .format('YYYY-MM-DD HH:mm:ss');

        // Update the local state
        setFeaturedListData(prevData => ({
            ...prevData,
            courses: prevData.courses.map(course => 
                course.request_id === requestId 
                    ? { 
                        ...course, 
                        start_date: formattedStartDate,
                        end_date: formattedEndDate
                    }
                    : course
            ),
            schools: prevData.schools.map(school => 
                school.request_id === requestId 
                    ? { 
                        ...school, 
                        start_date: formattedStartDate,
                        end_date: formattedEndDate
                    }
                    : school
            )
        }));

        // Here you can also add API call to update the dates on the backend if needed
    };

    const getStatusStyling = (status) => {
        switch(parseInt(status) || 0) {
            case 0:
                return {
                    rowStyle: { backgroundColor: 'rgba(82, 94, 111, 0.1)' },
                    textStyle: { color: '#525E6F' }
                };
            case 1:
                return {
                    rowStyle: { backgroundColor: 'rgba(26, 177, 31, 0.1)' },
                    textStyle: { color: '#1AB11F' }
                };
            default:
                return {
                    rowStyle: { backgroundColor: 'rgba(255, 174, 76, 0.1)' },
                    textStyle: { color: '#FFAE4C' }
                };
        }
    };

    useEffect(() => {
        if (schoolId) {
            fetchFeaturedRequests();
            fetchFeaturedList();
        }
    }, [schoolId]);

    const handleReset = () => {
        setSearchTerm('');
        setSelectedFeaturedType('');
        setSelectedStatus('');
    };

    const getFilteredData = (data) => {
        return data.filter(item => {
            const matchesSearch = !searchTerm || 
                item.request_name?.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesFeaturedType = !selectedFeaturedType || 
                item.featured_type?.toLowerCase().includes(selectedFeaturedType.toLowerCase());

            return matchesSearch && matchesFeaturedType;
        });
    };

    // Helper function to validate and parse date
    const parseDate = (dateString) => {
        if (!dateString || dateString === "No Data Available") return null;
        const parsedDate = moment(dateString);
        return parsedDate.isValid() ? parsedDate.toDate() : null;
    };

    // Add function to fetch course options
    const fetchCourseOptions = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/courseListFeatured`, {
                method: 'POST',
                headers: {
                    'Authorization': Authenticate,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    school_id: parseInt(schoolId)
                })
            });
            
            const result = await response.json();
            
            if (result.success && Array.isArray(result.data)) {
                setCourseOptions(result.data);
            }
        } catch (error) {
            console.error('Error fetching course options:', error);
        }
    };

    // Add useEffect to fetch course options when component mounts
    useEffect(() => {
        if (schoolId) {
            fetchCourseOptions();
        }
    }, [schoolId]);

    // Add function to handle course selection
    const handleCourseChange = async (requestType, requestId, courseId) => {
        // Update local state
        setFeaturedListData(prevData => ({
            ...prevData,
            courses: prevData.courses.map(course => 
                course.request_id === requestId 
                    ? { ...course, id: courseId }
                    : course
            )
        }));

        // Here you can add API call to update the course selection if needed
    };

    return (
        <Container className="admin-feature mt-4" style={{ backgroundColor: 'white', minHeight: '100vh', padding: '20px' }}>
            {/* Tabs and Create Button */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Tabs
                    activeKey={activeTab}
                    onSelect={(k) => setActiveTab(k)}
                    className="mb-0"
                >
                    <Tab eventKey="course" title="Course Featured" />
                    <Tab eventKey="school" title="School Featured" />
                </Tabs>
                <Button variant="primary" className='py-2 border-0 px-3' style={{ borderRadius:'30px', backgroundColor:'#B71A18', fontSize:'13px', color:'white'}}>
                    Create New Featured
                </Button>
            </div>

            {/* Filter Row */}
            <Row className="mb-3">
                <Col md={4}>
                    <Form.Group>
                        <Form.Label className='fw-light' style={{ fontSize:'12px', color:'#6c757d'}}>Search:</Form.Label>
                        <InputGroup>
                            <InputGroup.Text className="bg-transparent border-0">
                                <FontAwesomeIcon 
                                    icon={faMagnifyingGlass} 
                                    style={{ color: '#6c757d' }}
                                />
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Search for Request Name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border-0 ps-0 ms-2 bg-transparent"
                                style={{ fontSize:'14px', fontWeight:'500', color:'#8C94A3'}}
                            />
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group>
                        <Form.Label className='fw-light' style={{ fontSize:'12px', color:'#6c757d'}}>Sort By:</Form.Label>
                        <Form.Select
                            value={selectedFeaturedType}
                            onChange={(e) => setSelectedFeaturedType(e.target.value)}
                            className='ps-0 bg-white py-2 ps-2'
                            style={{ fontSize:'14px', fontWeight:'500',
                                border: '1px solid #EFF0F6', borderRadius:'15px'
                            }}
                        >
                            <option value="">Request Featured Type</option>
                            <option value="homepage">Homepage</option>
                            <option value="second">Second Page</option>
                            <option value="third">Third Page</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group>
                        <Form.Label className='fw-light' style={{ fontSize:'12px', color:'#6c757d'}}>Status:</Form.Label>
                        <Form.Select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className='ps-0 bg-white py-2 ps-2'
                            style={{ 
                                fontSize:'14px', 
                                fontWeight:'500',
                                border: '1px solid #EFF0F6', 
                                borderRadius:'15px'
                            }}
                        >
                            {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={2} className="d-flex align-items-end ">
                    <Button 
                        variant="secondary" 
                        onClick={handleReset}
                        className="w-100 bg-transparent border-0" 
                        style={{ color: '#07779A' }}
                    >
                        Reset Filter
                    </Button>
                </Col>
            </Row>

            {/* Debug section
            <div style={{ marginBottom: '10px' }}>
                <p>Course Featured Count: {courseFeatured.length}</p>
                <p>School Featured Count: {schoolFeatured.length}</p>
            </div> */}

            {/* Tab Content */}
            <Tab.Content>
                <Tab.Pane eventKey="course" active={activeTab === 'course'}>
                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div>Error: {error}</div>
                    ) : (
                        <Accordion>
                            {getFilteredData(courseFeatured).map((featured, index) => (
                                <Accordion.Item key={index} eventKey={index.toString()}>
                                    <Accordion.Header>
                                        <Row className="w-100">
                                            <Col md={2}>
                                            <div className='fw-light text-center' style={{fontSize: '10px'}}>
                                                Request Name: 
                                            </div>
                                            <div className='text-center' style={{ fontSize:'14px', fontWeight:'600'}}>
                                                 {featured.request_name || 'No Data Available'}
                                            </div>
                                            </Col>
                                            <Col md={2}>
                                                <div className='fw-light text-center' style={{fontSize: '10px'}}>
                                                    Featured Type: 
                                                </div>
                                                <div className='text-center' style={{ color: getFeaturedTypeColor(featured.featured_type), fontSize:'14px', fontWeight:'600'}}>
                                                    {featured.featured_type}
                                                </div>
                                            </Col>
                                            <Col md={2}>
                                                <div className='fw-light text-center' style={{fontSize: '10px'}}>
                                                    Duration: 
                                                </div>
                                                <div className='text-center' style={{ fontSize:'14px', fontWeight:'600'}}>
                                                    {featured.featured_duration} Days
                                                </div>
                                            </Col>
                                            <Col md={2}>
                                                <div className='fw-light text-center' style={{fontSize: '10px'}}>
                                                    Total Quantity: 
                                                </div>
                                                <div className='text-center' style={{ fontSize:'14px', fontWeight:'600'}}>
                                                    {featured.request_quantity || 0} Slots
                                                </div>
                                            </Col>
                                            <Col md={2}>
                                                <div className='fw-light text-center' style={{fontSize: '10px'}}>
                                                    Quantity Used: 
                                                </div>
                                                <div className='text-center' style={{ fontSize:'14px', fontWeight:'600'}}>
                                                    {featured.featured_count} / {featured.request_quantity}
                                                </div>
                                            </Col>
                                            <Col md={2}>
                                                <div className='fw-light text-center' style={{fontSize: '10px'}}>
                                                    Request Status: 
                                                </div>
                                                <div className='text-center' style={{ 
                                                    color: getStatusColor(featured.request_status),
                                                    fontWeight: '500',
                                                    fontSize:'14px',
                                                    fontWeight:'600'
                                                }}>
                                                    {featured.request_status}
                                                </div>
                                            </Col>
                                        </Row>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {featured.featured_count < featured.request_quantity && (
                                            <Row>
                                                <Col md={12}>
                                                    <Button variant="primary" className='w-100'
                                                    style={{
                                                        fontSize:'16px',
                                                        fontWeight:'600',
                                                        backgroundColor:'#FFEEE8',
                                                        border:'none',
                                                        borderRadius:'15px',
                                                        color:'#B71A18'
                                                    }}
                                                    >Add New Course +</Button>
                                                </Col>
                                            </Row>
                                        )}
                                        <Row style={getStatusStyling(getFeaturedDetails(featured.request_type, featured.id)?.featured_status).rowStyle}>
                                            <Col md={3}>
                                                <div className='fw-light text-center' style={{fontSize: '10px'}}>
                                                    {activeTab === 'course' ? 'Course Name:' : 'School Name:'}
                                                </div>
                                                <div className='text-center' style={{ fontSize:'14px', fontWeight:'600'}}>
                                                    {activeTab === 'course' ? (
                                                        <Form.Select
                                                            value={getFeaturedDetails(featured.request_type, featured.id)?.id || ''}
                                                            onChange={(e) => handleCourseChange(
                                                                featured.request_type,
                                                                featured.id,
                                                                parseInt(e.target.value)
                                                            )}
                                                            className="form-control text-center border-0 mt-2"
                                                            style={{ 
                                                                fontSize: '14px', 
                                                                fontWeight: '600',
                                                                border: '1px solid #EFF0F6', 
                                                                borderRadius: '15px'
                                                            }}
                                                        >
                                                            <option value="">Select Course</option>
                                                            {courseOptions.map(course => (
                                                                <option key={course.id} value={course.id}>
                                                                    {course.name}
                                                                </option>
                                                            ))}
                                                        </Form.Select>
                                                    ) : (
                                                        getFeaturedDetails(featured.request_type, featured.id)?.name || 'Not set'
                                                    )}
                                                </div>
                                            </Col>
                                            <Col md={3}>
                                                <div className='fw-light text-center' style={{fontSize: '10px'}}>
                                                    Start Date:
                                                </div>
                                                <div className='text-center mt-2' style={{ fontSize:'14px', fontWeight:'600'}}>
                                                    <DatePicker
                                                        selected={parseDate(getFeaturedDetails(featured.request_type, featured.id)?.start_date)}
                                                        onChange={(date) => handleStartDateChange(
                                                            date, 
                                                            featured.request_type, 
                                                            featured.id,
                                                            featured.featured_duration
                                                        )}
                                                        dateFormat="yyyy-MM-dd HH:mm:ss"
                                                        className="form-control text-center border-0"
                                                        style={{ 
                                                            fontSize: '14px', 
                                                            fontWeight: '600',
                                                            border: '1px solid #EFF0F6', 
                                                            borderRadius: '15px'
                                                        }}
                                                        placeholderText="Select date"
                                                        showTimeSelect
                                                        timeFormat="HH:mm:ss"
                                                        timeIntervals={15}
                                                    />
                                                </div>
                                            </Col>
                                            <Col md={3}>
                                                <div className='fw-light text-center' style={{fontSize: '10px'}}>
                                                    End Date:
                                                </div>
                                                <div className='text-center mt-2' style={{ 
                                                    fontSize: '14px', 
                                                    fontWeight: '600',
                                                    border: '1px solid #EFF0F6', 
                                                    borderRadius: '15px',
                                                    padding: '6px 10px',
                                                    backgroundColor: 'white'
                                                }}>
                                                    {getFeaturedDetails(featured.request_type, featured.id)?.end_date || 'Not set'}
                                                </div>
                                            </Col>
                                            <Col md={2}>
                                                <div className='fw-light text-center' style={{fontSize: '10px'}}>
                                                    Day Left:
                                                </div>
                                                <div className='text-center mt-2' style={{ 
                                                    fontSize: '14px', 
                                                    fontWeight: '600',
                                                    border: '1px solid #EFF0F6', 
                                                    borderRadius: '15px',
                                                    padding: '6px 8px',
                                                    backgroundColor: 'white'
                                                }}>
                                                    {calculateDaysLeft(
                                                        getFeaturedDetails(featured.request_type, featured.id)?.start_date,
                                                        getFeaturedDetails(featured.request_type, featured.id)?.end_date
                                                    )}
                                                </div>
                                            </Col>
                                            <Col md={1}>
                                                <div className='fw-light text-center' style={{fontSize: '10px'}}>
                                                    Status:
                                                </div>
                                                <div className='text-center mt-2' style={{ 
                                                    fontSize: '12px', 
                                                    fontWeight: '500',
                                                    borderRadius: '15px',
                                                    padding: '4px 6px',
                                                    color: 'white',
                                                    backgroundColor:(() => {
                                                        const status = getFeaturedDetails(featured.request_type, featured.id)?.featured_status;
                                                        switch(parseInt(status)) {
                                                            case 0: return '#525E6F'; // Expired
                                                            case 1: return '#1AB11F'; // Ongoing
                                                            default: return '#FFAE4C'; // Schedule
                                                        }
                                                    })()
                                                }}>
                                                    {(() => {
                                                        const status = getFeaturedDetails(featured.request_type, featured.id)?.featured_status;
                                                        if (status === 0) return 'Expired';
                                                        if (status === 1) return 'Ongoing';
                                                        return 'Schedule';
                                                    })()}
                                                </div>
                                            </Col>
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    )}
                </Tab.Pane>

                <Tab.Pane eventKey="school" active={activeTab === 'school'}>
                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div>Error: {error}</div>
                    ) : (
                        <Accordion>
                            {getFilteredData(schoolFeatured).map((featured, index) => (
                                <Accordion.Item key={index} eventKey={index.toString()}>
                                    <Accordion.Header>
                                        <Row className="w-100">
                                            <Col md={2}>
                                                <div className='fw-light text-center' style={{fontSize: '10px'}}>
                                                    Request Name: 
                                                </div>
                                                <div className='text-center' style={{ fontSize:'14px', fontWeight:'600'}}>
                                                    {featured.request_name || 'No Data Available'}
                                                </div>
                                            </Col>
                                            <Col md={2}>
                                                <div className='fw-light text-center' style={{fontSize: '10px'}}>
                                                    Featured Type: 
                                                </div>
                                                <div className='text-center' style={{ color: getFeaturedTypeColor(featured.featured_type), fontSize:'14px', fontWeight:'600'}}>
                                                    {featured.featured_type}
                                                </div>
                                            </Col>
                                            <Col md={2}>
                                                <div className='fw-light text-center' style={{fontSize: '10px'}}>
                                                    Duration: 
                                                </div>
                                                <div className='text-center' style={{ fontSize:'14px', fontWeight:'600'}}>
                                                    {featured.featured_duration} Days
                                                </div>
                                            </Col>
                                            <Col md={2}>
                                                <div className='fw-light text-center' style={{fontSize: '10px'}}>
                                                    Total Quantity: 
                                                </div>
                                                <div className='text-center' style={{ fontSize:'14px', fontWeight:'600'}}>
                                                    {featured.request_quantity || 0} Slots
                                                </div>
                                            </Col>
                                            <Col md={2}>
                                                <div className='fw-light text-center' style={{fontSize: '10px'}}>
                                                    Quantity Used: 
                                                </div>
                                                <div className='text-center' style={{ fontSize:'14px', fontWeight:'600'}}>
                                                    {featured.featured_count} / {featured.request_quantity}
                                                </div>
                                            </Col>
                                            <Col md={2}>
                                                <div className='fw-light text-center' style={{fontSize: '10px'}}>
                                                    Request Status: 
                                                </div>
                                                <div className='text-center' style={{ 
                                                    color: getStatusColor(featured.request_status),
                                                    fontWeight: '500',
                                                    fontSize:'14px',
                                                    fontWeight:'600'
                                                }}>
                                                    {featured.request_status}
                                                </div>
                                            </Col>
                                        </Row>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {featured.featured_count < featured.request_quantity && (
                                            <Row>
                                                <Col md={12}>
                                                    <Button variant="primary" className='w-100'>Add New {activeTab === 'course' ? 'Course' : 'School'} +</Button>
                                                </Col>
                                            </Row>
                                        )}
                                        <Row style={getStatusStyling(getFeaturedDetails(featured.request_type, featured.id)?.featured_status).rowStyle}>
                                            <Col md={3}>
                                                <div className='fw-light text-center' style={{fontSize: '10px'}}>
                                                    {activeTab === 'course' ? 'Course Name:' : 'School Name:'}
                                                </div>
                                                <div className='text-center mt-2' style={{ 
                                                    fontSize: '14px', 
                                                    fontWeight: '600',
                                                    border: '1px solid #EFF0F6', 
                                                    borderRadius: '15px',
                                                    padding: '8px 12px',
                                                    backgroundColor: 'white'
                                                }}>
                                                    {getFeaturedDetails(featured.request_type, featured.id)?.name || 'Not set'}
                                                </div>
                                            </Col>
                                            <Col md={3}>
                                                <div className='fw-light text-center' style={{fontSize: '10px'}}>
                                                    Start Date:
                                                </div>
                                                <DatePicker
                                                    selected={parseDate(getFeaturedDetails(featured.request_type, featured.id)?.start_date)}
                                                    onChange={(date) => handleStartDateChange(
                                                        date, 
                                                        featured.request_type, 
                                                        featured.id,
                                                        featured.featured_duration
                                                    )}
                                                    dateFormat="yyyy-MM-dd HH:mm:ss"
                                                    className="form-control text-center border-0 mt-2"
                                                    style={{ 
                                                        fontSize: '14px', 
                                                        fontWeight: '600',
                                                        border: '1px solid #EFF0F6', 
                                                        borderRadius: '15px'
                                                    }}
                                                    placeholderText="Select date"
                                                    showTimeSelect
                                                    timeFormat="HH:mm:ss"
                                                    timeIntervals={15}
                                                />
                                            </Col>
                                            <Col md={3}>
                                                <div className='fw-light text-center' style={{fontSize: '10px'}}>
                                                    End Date:
                                                </div>
                                                <div className='text-center mt-2' style={{ 
                                                    fontSize: '14px', 
                                                    fontWeight: '600',
                                                    border: '1px solid #EFF0F6', 
                                                    borderRadius: '15px',
                                                    padding: '8px 12px',
                                                    backgroundColor: 'white'
                                                }}>
                                                    {getFeaturedDetails(featured.request_type, featured.id)?.end_date || 'Not set'}
                                                </div>
                                            </Col>
                                            <Col md={2}>
                                                <div className='fw-light text-center' style={{fontSize: '10px'}}>
                                                    Day Left:
                                                </div>
                                                <div className='text-center mt-2' style={{ 
                                                    fontSize: '14px', 
                                                    fontWeight: '600',
                                                    border: '1px solid #EFF0F6', 
                                                    borderRadius: '15px',
                                                    padding: '8px 12px',
                                                    backgroundColor: 'white'
                                                }}>
                                                    {calculateDaysLeft(
                                                        getFeaturedDetails(featured.request_type, featured.id)?.start_date,
                                                        getFeaturedDetails(featured.request_type, featured.id)?.end_date
                                                    )}
                                                </div>
                                            </Col>
                                            <Col md={1}>
                                                <div className='fw-light text-center' style={{fontSize: '10px'}}>
                                                    Status:
                                                </div>
                                                <div className='text-center mt-2' style={{ 
                                                    fontSize:'12px', 
                                                    fontWeight:'500',
                                                    border: '1px solid #EFF0F6', 
                                                    borderRadius: '15px',
                                                    padding: '4px 6px',
                                                    color: 'white',
                                                    backgroundColor:(() => {
                                                        const status = getFeaturedDetails(featured.request_type, featured.id)?.featured_status;
                                                        switch(parseInt(status)) {
                                                            case 0: return '#525E6F'; // Expired
                                                            case 1: return '#1AB11F'; // Ongoing
                                                            default: return '#FFAE4C'; // Schedule
                                                        }
                                                    })()
                                                }}>
                                                    {(() => {
                                                        const status = getFeaturedDetails(featured.request_type, featured.id)?.featured_status;
                                                        if (status === 0) return 'Expired';
                                                        if (status === 1) return 'Ongoing';
                                                        return 'Schedule';
                                                    })()}
                                                </div>
                                            </Col>
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    )}
                </Tab.Pane>
            </Tab.Content>
        </Container>
    );
};

export default AdminEditFeaturedContent;
