import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Tab, Tabs, Accordion, Form, Button, InputGroup } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
// import '../../css/AdminStyles/AdminFeature.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

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

    useEffect(() => {
        if (schoolId) {
            fetchFeaturedRequests();
        }
    }, [schoolId, selectedStatus]);

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

    return (
        <Container className="mt-4" style={{ backgroundColor: 'white', minHeight: '100vh', padding: '20px' }}>
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
                                        <Row>
                                            <Col md={3}>
                                                Start: {featured.featured_startTime || 'Not set'}
                                            </Col>
                                            <Col md={3}>
                                                End: {featured.featured_endTime || 'Not set'}
                                            </Col>
                                            <Col md={3}>
                                                Status: {featured.request_status}
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
                                        <Row className="w-100 accordion-header">
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
                                                {featured.featured_duration} days   
                                            </div>
                                        </Col>
                                        <Col md={2}>
                                            <div className='fw-light text-center' style={{fontSize: '10px'}}    >
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
                                            <div className='fw-light text-center' style={{fontSize: '10px'}}    >
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
                                        <Row>
                                            <Col md={3}>
                                            </Col>
                                            <Col md={3}>
                                                End: {featured.featured_endTime || 'Not set'}
                                            </Col>
                                            <Col md={3}>
                                                Status: {featured.request_status}
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
