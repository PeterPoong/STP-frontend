import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Tab, Tabs, Accordion, Form, Button, InputGroup, Modal } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import '../../../css/AdminStyles/AdminFeature.css';
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

const FeaturedRequest = ({ authToken }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [courseFeatured, setCourseFeatured] = useState([]);
    const [schoolFeatured, setSchoolFeatured] = useState([]);
    const [activeTab, setActiveTab] = useState('course');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [availableCourses, setAvailableCourses] = useState({});

    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFeaturedType, setSelectedFeaturedType] = useState('');

    // Add new state for course options
    const [courseOptions, setCourseOptions] = useState([]);
    const [showAddCourse, setShowAddCourse] = useState({});
    const [searchCourse, setSearchCourse] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Add new state for confirmation modal
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [pendingCourseChange, setPendingCourseChange] = useState(null);

    const fetchFeaturedRequests = async () => {
        try {
            const Authenticate = `Bearer ${authToken}`;
            console.log('Using token:', authToken);

            const requestBody = {
                status: selectedStatus !== '' ? parseInt(selectedStatus) : undefined,
                request_type: activeTab
            };

            // Update API endpoint to the new combined endpoint
            const apiEndpoint = 'api/school/schoolFeaturedRequestLists';

            console.log('Making request to:', `${import.meta.env.VITE_BASE_URL}${apiEndpoint}`);
            console.log('With headers:', {
                'Content-Type': 'application/json',
                'Authorization': Authenticate
            });
            console.log('With body:', requestBody);

            const response = await fetch(`${import.meta.env.VITE_BASE_URL}${apiEndpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Authenticate,
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Response not OK:', response.status, errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('API Response:', result);

            if (result.success && Array.isArray(result.data.data)) { // Access the nested data array
                const transformedData = result.data.data.map(item => ({
                    id: item.id,
                    request_name: item.name,
                    featured_type: item.featured_type.featured_type,
                    featured_duration: item.duration,
                    request_quantity: item.total_quantity,
                    quantity_used: item.quantity_used,
                    request_status: (() => {
                        switch(item.request_status) {
                            case 0: return 'Disable';
                            case 1: return 'Approved';
                            case 2: return 'Pending';
                            case 3: return 'Rejected';
                            default: return 'Unknown';
                        }
                    })(),
                    featured: item.featured || [],
                    courseAvailable: item.courseAvailable || []
                }));

                if (activeTab === 'course') {
                    setCourseFeatured(transformedData);
                } else {
                    setSchoolFeatured(transformedData);
                }
                console.log('Transformed data:', transformedData);
            } else {
                console.error('Unexpected response structure:', result); // Log unexpected structure
                console.log('Full API Response:', JSON.stringify(result, null, 2)); // Log the full response for debugging
                setError('Unexpected response structure');
            }
        } catch (error) {
            console.error('Error in fetchFeaturedRequests:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getFeaturedDetails = (requestType, requestId) => {
        const featured = activeTab === 'course' ? courseFeatured : schoolFeatured;
        const item = featured.find(f => f.id === requestId);
        return item?.featured[0] || null;
    };

    const calculateDaysLeft = (startDate, endDate) => {
        if (!startDate || !endDate || startDate === "No Data Available" || endDate === "No Data Available") {
            return "To be calculated";
        }
        
        const start = moment(startDate);
        const end = moment(endDate);
        const now = moment();
        
        if (!start.isValid() || !end.isValid()) {
            return "To be calculated";
        }

        // If start date is in the future
        if (start.isAfter(now)) {
            return "To be calculated";
        }
        
        // If start date is in the past, calculate days left until end date
        const daysLeft = end.diff(now, 'days');
        return daysLeft > 0 ? `${daysLeft} days` : "Expired";
    };

    const handleStartDateChange = async (date, requestType, requestId, featuredDuration) => {
        if (!date) return;

        const formattedStartDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
        const formattedEndDate = moment(date)
            .add(featuredDuration, 'days')
            .format('YYYY-MM-DD HH:mm:ss');

        // Update local state based on active tab
        if (activeTab === 'course') {
            setCourseFeatured(prevData => 
                prevData.map(item => {
                    if (item.id === requestId) {
                        return {
                            ...item,
                            featured: item.featured.map(feat => ({
                                ...feat,
                                start_date: formattedStartDate,
                                end_date: formattedEndDate
                            }))
                        };
                    }
                    return item;
                })
            );
        } else {
            setSchoolFeatured(prevData =>
                prevData.map(item => {
                    if (item.id === requestId) {
                        return {
                            ...item,
                            start_date: formattedStartDate,
                            end_date: formattedEndDate
                        };
                    }
                    return item;
                })
            );
        }

        // Here you can also add API call to update the dates on the backend if needed
        try {
            // Add your API call here
            console.log('Date updated:', { requestId, formattedStartDate, formattedEndDate });
        } catch (error) {
            console.error('Error updating date:', error);
        }
    };

    const getStatusStyling = (status) => {
        if (!status) return {
            rowStyle: { backgroundColor: 'rgba(255, 174, 76, 0.1)' },
            textStyle: { color: '#FFAE4C' }
        };

        switch(status.toLowerCase()) {
            case 'expired':
                return {
                    rowStyle: { backgroundColor: 'rgba(82, 94, 111, 0.1)' },
                    textStyle: { color: '#525E6F' }
                };
            case 'ongoing':
                return {
                    rowStyle: { backgroundColor: 'rgba(26, 177, 31, 0.1)' },
                    textStyle: { color: '#1AB11F' }
                };
            case 'schedule':
            default:
                return {
                    rowStyle: { backgroundColor: 'rgba(255, 174, 76, 0.1)' },
                    textStyle: { color: '#FFAE4C' }
                };
        }
    };

    useEffect(() => {
        console.log('Component mounted, token:', authToken); // Debug log
        if (authToken) {
            fetchFeaturedRequests();
        }
    }, [authToken, activeTab, selectedStatus]);

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

    const handleAddCourse = async (requestId) => {
        if (!selectedCourse || !startDate) {
            alert('Please select both course and start date');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/school/applyFeaturedCourse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                    course_id: selectedCourse,
                    request_id: requestId,
                    startDatetime: moment(startDate).format('YYYY-MM-DD HH:mm:ss')
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            if (result.success) {
                // Reset form and hide it
                setSelectedCourse('');
                setStartDate(null);
                setShowAddCourse({}); // Reset entire showAddCourse state to hide all forms
                setSearchCourse(''); // Reset search if you have it
                
                // Update local state immediately
                const selectedCourseData = availableCourses[requestId]?.find(course => course.id === parseInt(selectedCourse));
                
                setCourseFeatured(prevData => 
                    prevData.map(item => {
                        if (item.id === requestId) {                    
                            const newFeatured = {
                                id: selectedCourseData.id,
                                course_id: selectedCourseData.id,
                                course_name: selectedCourseData.course_name,
                                start_date: moment(startDate).format('YYYY-MM-DD HH:mm:ss'),
                                end_date: moment(startDate)
                                    .add(item.featured_duration, 'days')
                                    .format('YYYY-MM-DD HH:mm:ss'),
                                status: 'Schedule'
                            };

                            return {
                                ...item,
                                quantity_used: item.quantity_used + 1,
                                featured: [...item.featured, newFeatured]
                            };
                        }
                        return item;
                    })
                );
                
                // Refetch data to ensure sync with server
                await fetchFeaturedRequests();
            } else {
                alert(result.message || 'Failed to add course');
            }
        } catch (error) {
            console.error('Error adding course:', error);
            alert('Failed to add course. Please try again.');
        }
    };

    // Add this function to fetch available courses for a specific request
    const fetchAvailableCourses = async (requestId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/school/featuredCourseAvailable`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify({ request_id: requestId })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            if (result.success && result.data) {
                setAvailableCourses(prev => ({
                    ...prev,
                    [requestId]: result.data
                }));
            }
        } catch (error) {
            console.error('Error fetching available courses:', error);
        }
    };

    // Add useEffect to fetch available courses when component mounts
    useEffect(() => {
        if (authToken && courseFeatured.length > 0) {
            // Fetch available courses for each featured request
            courseFeatured.forEach(featured => {
                fetchAvailableCourses(featured.id);
            });
        }
    }, [authToken, courseFeatured]); // Add dependencies

    // Modify the existing code where you show/hide the Add Course form
    const handleShowAddCourse = (requestId) => {
        setShowAddCourse(prev => ({
            ...prev, 
            [requestId]: !prev[requestId]
        }));
        
        // Fetch available courses when opening the form
        if (!availableCourses[requestId]) {
            fetchAvailableCourses(requestId);
        }
    };

    const handleCourseChange = (featuredId, newCourseId, endDate) => {
        // Check if end date is before current date
        if (moment(endDate).isBefore(moment())) {
            setErrorMessage("Changes to the course are not allowed while its featured status is Expired.");
            setShowErrorModal(true);
            return;
        }
        
        // Store the pending change with the correct data structure
        setPendingCourseChange({
            featured_id: parseInt(featuredId), // Ensure it's a number
            newCourse_id: parseInt(newCourseId),  // Use new_course_id as expected by the API
            startDatetime: moment().format('YYYY-MM-DD HH:mm:ss') // Current datetime as start
        });
        setShowConfirmModal(true);
    };

    // Update handleConfirmedCourseChange to log the request details
    const handleConfirmedCourseChange = async () => {
        try {
            // Log the request details for debugging
            console.log('Sending request to editFeaturedCourseSetting:', {
                url: `${import.meta.env.VITE_BASE_URL}api/school/editFeaturedCourseSetting`,
                body: pendingCourseChange,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                }
            });

            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/school/editFeaturedCourseSetting`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify(pendingCourseChange)
            });

            // Log the response for debugging
            const responseText = await response.text();
            console.log('Response:', responseText);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}, message: ${responseText}`);
            }

            const result = JSON.parse(responseText);
            
            if (result.success) {
                // Refetch data to update the UI
                await fetchFeaturedRequests();
                // Refetch available courses
                await fetchAvailableCourses(pendingCourseChange.featured_id);
            } else {
                setErrorMessage(result.message || 'Failed to change course');
                setShowErrorModal(true);
            }
        } catch (error) {
            console.error('Error changing course:', error);
            setErrorMessage('Failed to change course. Please try again.');
            setShowErrorModal(true);
        } finally {
            // Close confirmation modal and clear pending change
            setShowConfirmModal(false);
            setPendingCourseChange(null);
        }
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
                    <Tab eventKey="course" title="Request Featured Courses" />
                    <Tab eventKey="school" title="Request Featured School" />
                </Tabs>
            </div>
            <Row>
                <Col md={6}>
                    <div className='fw-medium' style={{ fontSize:'20px', color:'#000000'}}>
                    Request Featured Course List
                    </div>
                </Col>
                <Col md={6} className="d-flex justify-content-end">
                    <Button variant="primary" className='py-2 border-0 px-3' style={{ borderRadius:'30px', backgroundColor:'#B71A18', fontSize:'13px', color:'white'}}>
                        Request Featured
                    </Button>
                </Col>
            </Row>

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
                <Col md={2} className="d-flex align-items-end">
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
                                                    {featured.quantity_used} / {featured.request_quantity}
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
                                        {activeTab === 'course' && featured.quantity_used < featured.request_quantity && (
                                            <Row className="mb-3">
                                                <Col md={12}>
                                                    <Button 
                                                        variant="primary" 
                                                        className='w-100'
                                                        onClick={() => handleShowAddCourse(featured.id)}
                                                        style={{
                                                            fontSize:'16px',
                                                            fontWeight:'600',
                                                            backgroundColor:'#FFEEE8',
                                                            border:'none',
                                                            borderRadius:'15px',
                                                            color:'#B71A18'
                                                        }}
                                                    >
                                                        Add New Course +
                                                    </Button>
                                                </Col>
                                            </Row>
                                        )}
                                        
                                        {showAddCourse[featured.id] && (
                                            <Row className="mb-3 p-3 d-flex" style={{ backgroundColor: '#f8f9fa', borderRadius: '15px' }}>
                                                <Col md={4}>
                                                    <Form.Group style={{ marginBottom: 0 }}>
                                                        <div className='text-center'>
                                                            <Form.Label className='fw-light mb-2' style={{fontSize: '12px', color: '#6c757d'}}>
                                                                Course Name:
                                                            </Form.Label>
                                                        </div>
                                                        <div style={{ position: 'relative' }}>
                                                            <Form.Control
                                                                as="select"
                                                                value={selectedCourse}
                                                                onChange={(e) => setSelectedCourse(e.target.value)}
                                                                style={{ 
                                                                    fontSize: '14px', 
                                                                    fontWeight: '500',
                                                                    border: '1px solid #EFF0F6', 
                                                                    borderRadius: '15px'
                                                                }}
                                                            >
                                                                <option value="">Select Course</option>
                                                                {availableCourses[featured.id]?.map(course => (
                                                                    <option key={course.id} value={course.id}>
                                                                        {course.course_name}
                                                                    </option>
                                                                ))}
                                                            </Form.Control>
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={2}>
                                                    <Form.Group style={{ marginBottom: 0 }}>
                                                        <div className='text-center'>
                                                            <Form.Label className='fw-light mb-2' style={{fontSize: '12px', color: '#6c757d'}}>
                                                                Start Date:
                                                            </Form.Label>
                                                        </div>
                                                        <DatePicker
                                                            selected={startDate}
                                                            onChange={(date) => setStartDate(date)}
                                                            dateFormat="yyyy-MM-dd HH:mm:ss"
                                                            minDate={new Date()}
                                                            className="form-control"
                                                            style={{ 
                                                                fontSize: '14px', 
                                                                fontWeight: '500',
                                                                border: '1px solid #EFF0F6', 
                                                                borderRadius: '15px'
                                                            }}
                                                            placeholderText="Select date"
                                                            showTimeSelect
                                                            timeFormat="HH:mm:ss"
                                                            timeIntervals={15}
                                                            timeCaption="Time"
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={2}>
                                                    <Form.Group style={{ marginBottom: 0 }}>
                                                        <div className='text-center'>
                                                            <Form.Label className='fw-light mb-2' style={{fontSize: '12px', color: '#6c757d'}}>
                                                                &nbsp;
                                                            </Form.Label>
                                                        </div>
                                                        <div style={{ marginTop: '-8px' }}>
                                                            <Button 
                                                                onClick={() => handleAddCourse(featured.id)}
                                                                style={{
                                                                    fontSize: '14px',
                                                                    fontWeight: '600',
                                                                    backgroundColor: '#B71A18',
                                                                    border: 'none',
                                                                    borderRadius: '15px',
                                                                    width: '100%'
                                                                }}
                                                            >
                                                                Save
                                                            </Button>
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        )}
                                        
                                        {Array.isArray(featured.featured) && featured.featured.map((featuredItem, itemIndex) => (
                                            <Row key={itemIndex} style={getStatusStyling(featuredItem.status).rowStyle}>
                                                <Col md={3}>
                                                    <div className='fw-light text-center' style={{fontSize: '10px'}}>
                                                        Course Name:
                                                    </div>
                                                    <div className='text-center' style={{ fontSize:'14px', fontWeight:'600'}}>
                                                        <Form.Select
                                                            value={featuredItem?.course_id || ''}
                                                            onChange={(e) => {
                                                                if (e.target.value) {
                                                                    handleCourseChange(
                                                                        featuredItem.id,  // Make sure this is the correct featured_id
                                                                        parseInt(e.target.value),
                                                                        featuredItem.end_date
                                                                    );
                                                                }
                                                            }}
                                                            disabled={moment(featuredItem.end_date).isBefore(moment())}
                                                            className="form-control text-center border-0 mt-2"
                                                            style={{ 
                                                                fontSize: '14px', 
                                                                fontWeight: '600',
                                                                border: '1px solid #EFF0F6', 
                                                                borderRadius: '15px'
                                                            }}
                                                            onFocus={() => {
                                                                // Refresh available courses when dropdown is focused
                                                                fetchAvailableCourses(featured.id);
                                                            }}
                                                        >
                                                            <option value="">Select Course</option>
                                                            
                                                            {/* Current Course Group - Always show */}
                                                            {Array.isArray(featured?.featured) && featured.featured.length > 0 && (
                                                                <optgroup label="Current Course">
                                                                    {featured.featured.map(feat => (
                                                                        <option 
                                                                            key={feat.id} 
                                                                            value={feat.course_id}
                                                                        >
                                                                            {feat.course_name || 'Unnamed Course'}
                                                                        </option>
                                                                    ))}
                                                                </optgroup>
                                                            )}
                                                            
                                                            {/* Available Courses Group - Always show */}
                                                            {availableCourses[featured.id]?.length > 0 && (
                                                                <optgroup label="Available Courses">
                                                                    {availableCourses[featured.id].map(course => (
                                                                        <option key={course.id} value={course.id}>
                                                                            {course.course_name}
                                                                        </option>
                                                                    ))}
                                                                </optgroup>
                                                            )}
                                                        </Form.Select>
                                                    </div>
                                                </Col>
                                                <Col md={3}>
                                                    <div className='fw-light text-center' style={{fontSize: '10px'}}>
                                                        Start Date:
                                                    </div>
                                                    <div className='text-center mt-2' style={{ fontSize:'14px', fontWeight:'600'}}>
                                                        <DatePicker
                                                            selected={parseDate(featuredItem.start_date)}
                                                            onChange={(date) => handleStartDateChange(
                                                                date,
                                                                'course',
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
                                                            timeCaption="Time"
                                                            disabled={moment(featuredItem.start_date).isBefore(moment())}
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
                                                        {featuredItem.end_date || 'Not set'}
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
                                                        {calculateDaysLeft(featuredItem.start_date, featuredItem.end_date)}
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
                                                            switch(featuredItem.status?.toLowerCase()) {
                                                                case 'expired': return '#525E6F';
                                                                case 'ongoing': return '#1AB11F';
                                                                case 'schedule': return '#FFAE4C';
                                                                default: return '#FFAE4C';
                                                            }
                                                        })()
                                                    }}>
                                                        {featuredItem.status || 'Schedule'}
                                                    </div>
                                                </Col>
                                            </Row>
                                        ))}
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
                                                    {featured.quantity_used} / {featured.request_quantity}
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
                                        <Row style={getStatusStyling(featured.status).rowStyle}>
                                            <Col md={3}>
                                                <div className='fw-light text-center' style={{fontSize: '10px'}}>
                                                    School Name:
                                                </div>
                                                <div className='text-center mt-2' style={{ 
                                                    fontSize: '14px', 
                                                    fontWeight: '600',
                                                    border: '1px solid #EFF0F6', 
                                                    borderRadius: '15px',
                                                    padding: '8px 12px',
                                                    backgroundColor: 'white'
                                                }}>
                                                    {featured.school_name || 'Not set'}
                                                </div>
                                            </Col>
                                            <Col md={3}>
                                                <div className='fw-light text-center' style={{fontSize: '10px'}}>
                                                    Start Date:
                                                </div>
                                                <DatePicker
                                                    selected={parseDate(featured.start_date)}
                                                    onChange={(date) => handleStartDateChange(
                                                        date,
                                                        'school',
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
                                                    timeCaption="Time"
                                                    disabled={moment(featured.start_date).isBefore(moment())}
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
                                                    {featured.end_date || 'Not set'}
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
                                                    {calculateDaysLeft(featured.start_date, featured.end_date)}
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
                                                        switch(featured.status?.toLowerCase()) {
                                                            case 'expired': return '#525E6F';
                                                            case 'ongoing': return '#1AB11F';
                                                            case 'schedule': return '#FFAE4C';
                                                            default: return '#FFAE4C';
                                                        }
                                                    })()
                                                }}>
                                                    {featured.status || 'Schedule'}
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

            {/* Confirmation Modal */}
            <Modal 
                show={showConfirmModal} 
                onHide={() => {
                    setShowConfirmModal(false);
                    setPendingCourseChange(null);
                }}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Course Change</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to proceed with changing the course?
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="secondary" 
                        onClick={() => {
                            setShowConfirmModal(false);
                            setPendingCourseChange(null);
                        }}
                    >
                        No
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleConfirmedCourseChange}
                    >
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Error Modal */}
            <Modal 
                show={showErrorModal} 
                onHide={() => setShowErrorModal(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Action Not Allowed</Modal.Title>
                </Modal.Header>
                <Modal.Body>{errorMessage}</Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="secondary" 
                        onClick={() => setShowErrorModal(false)}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default FeaturedRequest;
