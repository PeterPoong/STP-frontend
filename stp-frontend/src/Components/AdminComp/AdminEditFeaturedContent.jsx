import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Tab, Tabs, Accordion, Form, Button, InputGroup, Modal } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import '../../css/AdminStyles/AdminFeature.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";
import moment from 'moment';
import CreateNewCourseRequest from './CreateNewCourseFeatured';
import CreateNewSchoolRequest from './CreateNewSchoolFeatured';

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

const getRequestStatusLabel = (status) => {
    if (!status) return 'Unknown';
    
    switch(status.toLowerCase()) {
        case 'pending':
            return 'Pending';
        case 'approved':
        case 'active':
            return 'Approved';
        case 'rejected':
            return 'Rejected';
        case 'disable':
            return 'Disable';
        case 'expired':
            return 'Expired';
        default:
            return 'Unknown';
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

    // Add new state for modals and error handling
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // Add these states at the top of your component
    const [selectedDates, setSelectedDates] = useState({});
    const [pendingStartDateChange, setPendingStartDateChange] = useState(null);
// Add new course states
const [availableCourses, setAvailableCourses] = useState({});
const [showAddCourse, setShowAddCourse] = useState({});
const [selectedCourse, setSelectedCourse] = useState('');
const [startDate, setStartDate] = useState(null);

const [showCreateRequestModal, setShowCreateRequestModal] = useState(false);
const [showCreateSchoolRequestModal, setShowCreateSchoolRequestModal] = useState(false);

const [currentPage, setCurrentPage] = useState(1); // Add state for current page
const [totalPages, setTotalPages] = useState(1); // Add state for total pages

const fetchFeaturedRequests = async () => {
    try {
        const requestBody = {
            school_id: parseInt(schoolId),
            requestType: activeTab === 'course' ? 'courses' : 'school',
            status: selectedStatus !== '' ? parseInt(selectedStatus) : undefined,
            page: currentPage // Include current page in the request
        };

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/schoolFeaturedSchoolCourseRequestList`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Authenticate,
            },
            body: JSON.stringify(requestBody)
        });

        const result = await response.json();

        if (result.success && result.data?.data) {
            // Set total pages from the API response
            setTotalPages(result.data.last_page);

            if (activeTab === 'course') {
                // Transform course data
                const transformedData = result.data.data.map(item => ({
                    id: item.id,
                    request_name: item.name,
                    featured_type: item.featured_type.featured_type,
                    featured_id: item.featured_type.featured_id,
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
                    featured: item.featured.map(feat => ({
                        id: feat.id,
                        course_id: feat.course_id,
                        course_name: feat.course_name,
                        start_date: feat.start_date,
                        end_date: feat.end_date,
                        status: feat.status,
                        day_left:feat.day_left
                        
                    })),
                    courseAvailable: item.courseAvailable || []
                }));
                setCourseFeatured(transformedData);
            } else {
                // Transform school data
                const transformedData = result.data.data.map(item => ({
                    id: item.id,
                    request_name: item.name,
                    featured_type: item.featured_type.featured_type,
                    featured_duration: item.duration,
                    request_quantity: item.total_quantity,
                    quantity_used: item.quantity_used,
                    school_name: item.school_name,
                    request_status: (() => {
                        switch(item.request_status) {
                            case 0: return 'Disable';
                            case 1: return 'Approved';
                            case 2: return 'Pending';
                            case 3: return 'Rejected';
                            default: return 'Unknown';
                        }
                    })(),
                    featured: item.featured.map(feat => ({
                        id: feat.id,
                        school_id: feat.school_id,
                        school_name: feat.school_name,
                        start_date: feat.start_date,
                        end_date: feat.end_date,
                        status: feat.status,
                        day_left: feat.day_left
                    })),
                    courseAvailable: item.courseAvailable || []
                }));
                setSchoolFeatured(transformedData);
            }
        } else {
            console.log('No data found or success is false'); // Log if no data found
        }
    } catch (error) {
        console.error('Error fetching featured requests:', error);
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
        if (schoolId) {
            fetchFeaturedRequests();
        }
    }, [schoolId, activeTab, selectedStatus, currentPage]);

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

    // Add handleCourseChange function
    const handleCourseChange = (featuredId, courseId, endDate, existingStartDate) => {
        // Check if end date is before current date
        if (moment(endDate).isBefore(moment())) {
            setErrorMessage("Changes to the course are not allowed while its featured status is Expired.");
            setShowErrorModal(true);
            return;
        }
        
        // Use existing start date if it's in the future, otherwise use current time plus 1 minute
        const startDate = existingStartDate && moment(existingStartDate).isAfter(moment()) 
            ? moment(existingStartDate).format('YYYY-MM-DD HH:mm:ss')
            : moment().add(1, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        
        // Log the values being set
        console.log('Setting pending course change:', {
            featured_id: featuredId,
            course_id: courseId,
            start_date: startDate
        });
        
        // Store the pending change with the correct field names
        setPendingCourseChange({
            featured_id: parseInt(featuredId),
            course_id: parseInt(courseId),
        });
        setShowConfirmModal(true);
    };

    // Add handleConfirmedCourseChange function
    const handleConfirmedCourseChange = async () => {
        try {
            console.log('Current State:', {
                pendingStartDateChange,
                pendingCourseChange
            });

            let requestBody;

            if (pendingStartDateChange) {
                const featured_id = pendingStartDateChange.featured_id;

                if (!featured_id) {
                    throw new Error('Featured ID is required');
                }

                requestBody = {
                    featured_id: parseInt(featured_id),
                    course_id: parseInt(pendingStartDateChange.course_id),
                    start_date: pendingStartDateChange.start_date
                };
            } else if (pendingCourseChange) {
                if (!pendingCourseChange.featured_id) {
                    throw new Error('Featured ID is required for course change');
                }

                requestBody = {
                    featured_id: parseInt(pendingCourseChange.featured_id),
                    course_id: parseInt(pendingCourseChange.course_id),
                    start_date: pendingCourseChange.start_date
                };
            } else {
                throw new Error('No changes to process');
            }

            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/editFeaturedCourse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Authenticate,
                },
                body: JSON.stringify(requestBody)
            });

            const result = await response.json();
            console.log('Server response:', result);

            if (!response.ok) {
                throw new Error(`Server error: ${result.message || response.statusText}`);
            }

            if (result.success) {
                await fetchFeaturedRequests();
            } else {
                throw new Error(result.message || 'Failed to update');
            }
        } catch (error) {
            console.error('Error details:', error);
            setErrorMessage(error.message || 'An unexpected error occurred');
            setShowErrorModal(true);
        } finally {
            setShowConfirmModal(false);
            setPendingStartDateChange(null);
            setPendingCourseChange(null);
        }
    };

    // Add these functions
    const fetchAvailableCourses = async (requestId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/adminFeaturedCourseAvailable`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Authenticate,
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

    const handleAddCourse = async (requestId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/addNewCourse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Authenticate,
                },
                body: JSON.stringify({
                    request_id: requestId,
                    course_id: selectedCourse,
                    start_date: moment(startDate).format('YYYY-MM-DD HH:mm:ss')
                })
            });

            const result = await response.json();

            if (result.success) {
                // Reset form and hide it
                setSelectedCourse('');
                setStartDate(null);
                setShowAddCourse({}); // Reset entire showAddCourse state to hide all forms
                
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
                setErrorMessage(result.message || 'Failed to add course');
                setShowErrorModal(true);
            }
        } catch (error) {
            console.error('Error adding course:', error);
            setErrorMessage('Failed to add course. Please try again.');
            setShowErrorModal(true);
        }
    };

    // Add useEffect for fetching available courses
    useEffect(() => {
        if (courseFeatured.length > 0) {
            // Fetch available courses for each featured request
            courseFeatured.forEach(featured => {
                fetchAvailableCourses(featured.id);
            });
        }
    }, [courseFeatured]); // Add dependencies

    const handleConfirmedSchoolChange = async () => {
        try {
            console.log('Current State:', {
                pendingStartDateChange,
                pendingCourseChange
            });

            let requestBody;

            // Ensure we have a pendingStartDateChange
            if (pendingStartDateChange) {
                const featured_id = pendingStartDateChange.featured_id; // This should be set from the selected featured item

                if (!featured_id) {
                    throw new Error('Featured ID is required');
                }

                requestBody = {
                    featured_id: parseInt(featured_id), // Use the correct featured_id
                    start_date: pendingStartDateChange.start_date // Only send start_date
                };
            } else {
                throw new Error('No changes to process');
            }

            console.log('Sending request body:', requestBody);

            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/editFeaturedSchool`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Authenticate,
                },
                body: JSON.stringify(requestBody)
            });

            const result = await response.json();
            console.log('Server response:', result);

            if (!response.ok) {
                throw new Error(`Server error: ${result.message || response.statusText}`);
            }

            if (result.success) {
                await fetchFeaturedRequests();
            } else {
                throw new Error(result.message || 'Failed to update');
            }
        } catch (error) {
            console.error('Error details:', error);
            setErrorMessage(error.message || 'An unexpected error occurred');
            setShowErrorModal(true);
        } finally {
            setShowConfirmModal(false);
            setPendingStartDateChange(null);
            setPendingCourseChange(null);
        }
    };

    // Add pagination controls
    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchFeaturedRequests(); // Fetch data for the new page
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
                <Button 
                    variant="primary" 
                    className='py-2 border-0 px-3' 
                    style={{ borderRadius:'30px', backgroundColor:'#B71A18', fontSize:'13px', color:'white'}}
                    onClick={() => {
                        if (activeTab === 'course') {
                            setShowCreateRequestModal(true); // Open course modal
                        } else {
                            setShowCreateSchoolRequestModal(true); // Open school modal
                        }
                    }} // Open modal on click
                >
                    Create New Featured
                </Button>
            </div>
                {/* Create New Course Request Modal */}
                <CreateNewCourseRequest 
                show={showCreateRequestModal} 
                handleClose={() => {
                    setShowCreateRequestModal(false);
                    fetchFeaturedRequests(); // Fetch data after closing the modal
                }} 
                activeTab={activeTab} 
            />
                {/* Create New School Request Modal */}
                <CreateNewSchoolRequest 
                show={showCreateSchoolRequestModal} 
                handleClose={() => {
                    setShowCreateSchoolRequestModal(false);
                    fetchFeaturedRequests(); // Fetch data after closing the modal
                }} 
                activeTab={activeTab} 
            />
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
                                                    {featured.request_status} {/* Ensure this is correctly set in the data */}
                                                </div>
                                            </Col>
                                        </Row>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {activeTab === 'course' && featured.quantity_used < featured.request_quantity && featured.request_status === 1 &&(
                                            <Row>
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
                                                <Col md={4}>
                                                    <Form.Group style={{ marginBottom: 0 }}>
                                                        <div className='text-center'>
                                                            <Form.Label className='fw-light mb-2' style={{fontSize: '12px', color: '#6c757d'}}>
                                                                Start Date:
                                                            </Form.Label>
                                                        </div>
                                                        <DatePicker
                                                            selected={startDate}
                                                            onChange={(date) => setStartDate(date)}
                                                            showTimeSelect
                                                            dateFormat="yyyy-MM-dd HH:mm:ss"
                                                            className="form-control start_date_feature"
                                                            placeholderText="Select start date"
                                                            style={{ 
                                                                fontSize: '14px', 
                                                                fontWeight: '500',
                                                                border: '1px solid #EFF0F6', 
                                                                borderRadius: '15px'
                                                            }}
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
                                                                        featuredItem.id,
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
                                                        >
                                                            <option value="">Select Course</option>
                                                            
                                                            {/* Current Course Group */}
                                                            {featured?.featured && featured.featured.length > 0 && (
                                                                <optgroup label="Current Course">
                                                                    {featured.featured.map(feat => (
                                                                        <option key={feat.id} value={feat.course_id}>
                                                                            {feat.course_name}
                                                                        </option>
                                                                    ))}
                                                                </optgroup>
                                                            )}
                                                            
                                                            {/* Display available courses */}
                                                            {featured.courseAvailable && featured.courseAvailable.length > 0 && (
                                                                <optgroup label="Available Courses">
                                                                    {featured.courseAvailable
                                                                        .filter(course => 
                                                                            !featured.featured.some(feat => feat.course_id === course.id)
                                                                        )
                                                                        .map(course => (
                                                                            <option key={course.id} value={course.id}>
                                                                                {course.course_name.trim()}
                                                                            </option>
                                                                        ))
                                                                    }
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
                                                            selected={selectedDates[featuredItem.id] || parseDate(featuredItem.start_date)}
                                                            onChange={(date) => {
                                                                if (date) {
                                                                    setSelectedDates(prev => ({
                                                                        ...prev,
                                                                        [featuredItem.id]: date
                                                                    }));
                                                                }
                                                            }}
                                                            onSelect={(date) => {
                                                                if (date && moment(date).isValid()) {
                                                             
                                                                    // The featured_id should come from the featuredItem object
                                                                    const featured_id = featuredItem.id; // Use the id from the featuredItem
                                                                    
                                                                    setPendingStartDateChange({
                                                                        featured_id: featured_id, // Using the correct featured_id from featuredItem
                                                                        course_id: featuredItem.course_id,
                                                                        newStartDate: date,
                                                                        start_date: moment(date).format('YYYY-MM-DD HH:mm:ss')
                                                                    });
                                                                    
                                                                    // Log the final object being set
                                                                    console.log('Setting pendingStartDateChange:', {
                                                                        featured_id: featured_id,
                                                                        course_id: featuredItem.course_id,
                                                                        newStartDate: date,
                                                                        start_date: moment(date).format('YYYY-MM-DD HH:mm:ss')
                                                                    });
                                                                    
                                                                    setShowConfirmModal(true);
                                                                }
                                                            }}
                                                            dateFormat="yyyy-MM-dd HH:mm:ss"
                                                            className="form-control text-center border-0 start-date-course-feature"
                                                            inputClassName="start_date_feature"
                                                            style={{ 
                                                                fontSize: '14px', 
                                                                fontWeight: '600',
                                                                border: '1px solid #EFF0F6', 
                                                                borderRadius: '15px'
                                                            }}
                                                            placeholderText="Select date and time"
                                                            showTimeSelect
                                                            timeFormat="HH:mm"
                                                            timeIntervals={15}
                                                            timeCaption="Time"
                                                            minDate={moment().toDate()}
                                                            minTime={moment().hours(0).minutes(0).toDate()}
                                                            maxTime={moment().hours(23).minutes(59).toDate()}
                                                            disabled={
                                                                moment(featuredItem.start_date).isBefore(moment()) || 
                                                                moment(featuredItem.end_date).isBefore(moment())
                                                            }
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
                                                        {moment(featuredItem.end_date).isBefore(moment()) 
                                                            ? "Ended" 
                                                            : (moment(featuredItem.start_date).isAfter(moment()) || !featuredItem.day_left 
                                                                ? "To be calculated" 
                                                                : featuredItem.day_left)} {/* Displaying the day_left value, "To be calculated", or "Ended" */}
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
                            {Array.isArray(schoolFeatured) && schoolFeatured.length > 0 ? (
                                schoolFeatured.map((featured, index) => (
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
                                            {/* Render featured items if they exist */}
                                            {featured.featured.length > 0 ? (
                                                featured.featured.map((featuredItem, itemIndex) => (
                                                    <Row key={itemIndex}>
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
                                                                    {featuredItem.school_name || 'Not set'}
                                                                </div>
                                                        </Col>
                                                        <Col md={3}>
                                                            <div className='fw-light text-center' style={{fontSize: '10px'}}>
                                                                Start Date:
                                                            </div>
                                                            <div className='text-center mt-2'>
                                                                <DatePicker
                                                                    selected={selectedDates[featuredItem.id] || parseDate(featuredItem.start_date)}
                                                                    onChange={(date) => {
                                                                        if (date) {
                                                                            setSelectedDates(prev => ({
                                                                                ...prev,
                                                                                [featuredItem.id]: date
                                                                            }));
                                                                        }
                                                                    }}
                                                                    onSelect={(date) => {
                                                                        if (date && moment(date).isValid()) {
                                                                            const featured_id = featuredItem.id; // Get the featured_id from the current featured item

                                                                            setPendingStartDateChange({
                                                                                featured_id: featured_id, // Set the correct featured_id
                                                                                start_date: moment(date).format('YYYY-MM-DD HH:mm:ss') // Format the date
                                                                            });

                                                                            setShowConfirmModal(true); // Show the confirmation modal
                                                                        }
                                                                    }}
                                                                    dateFormat="yyyy-MM-dd HH:mm:ss"
                                                                    className="form-control text-center border-0"
                                                                    inputClassName="start_date_feature"
                                                                    style={{ 
                                                                        fontSize: '14px', 
                                                                        fontWeight: '600',
                                                                        border: '1px solid #EFF0F6', 
                                                                        borderRadius: '15px'
                                                                    }}
                                                                    placeholderText="Select date and time"
                                                                    showTimeSelect
                                                                    timeFormat="HH:mm"
                                                                    timeIntervals={15}
                                                                    timeCaption="Time"
                                                                    minDate={moment().toDate()} // Only allow future dates
                                                                    minTime={moment().hours(0).minutes(0).toDate()}
                                                                    maxTime={moment().hours(23).minutes(59).toDate()}
                                                                    disabled={
                                                                        moment(featuredItem.start_date).isBefore(moment()) || 
                                                                        moment(featuredItem.end_date).isBefore(moment())
                                                                    }
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
                                                ))
                                            ) : (
                                                <div className='text-center'>No featured items available.</div>
                                            )}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))
                            ) : (
                                <div className='text-center'>No featured items available.</div>
                            )}
                        </Accordion>
                    )}
                </Tab.Pane>
            </Tab.Content>

            {/* Add these modals at the end of your return statement */}
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
                        onClick={() => {
                            if (activeTab === 'course') {
                                handleConfirmedCourseChange();
                            } else {
                                handleConfirmedSchoolChange();
                            }
                        }}
                    >
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

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

            {/* Add this in your return statement to render pagination buttons */}
            <div className="pagination-controls">
                {Array.from({ length: totalPages }, (_, index) => (
                    <Button 
                        key={index + 1} 
                        onClick={() => handlePageChange(index + 1)} 
                        disabled={currentPage === index + 1}
                    >
                        {index + 1}
                    </Button>
                ))}
            </div>
        </Container>
    );
};

export default AdminEditFeaturedContent;
