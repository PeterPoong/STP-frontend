import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const RequestSchoolFeatured = ({ show, handleClose, activeTab }) => {
    const schoolId = sessionStorage.getItem('schoolId');
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`;
    const [requestName, setRequestName] = useState('');
    const [featuredType, setFeaturedType] = useState('');
    const [duration, setDuration] = useState('');
    const [quantity, setQuantity] = useState('');
    const [featuredTypes, setFeaturedTypes] = useState([]);
    const [courseSelections, setCourseSelections] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [courseOptions, setCourseOptions] = useState([]);
    const [availableCourseOptions, setAvailableCourseOptions] = useState([]);
    const [calculatedPrice, setCalculatedPrice] = useState(0);
    const [featuredId, setFeaturedId] = useState(null);

    useEffect(() => {
        const fetchFeaturedTypes = async () => {
            const url = `${import.meta.env.VITE_BASE_URL}api/school/schoolFeaturedPriceList`;
            const requestBody = {
                request_type: "school",
            };

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authenticate,
                    },
                    body: JSON.stringify(requestBody),
                });

                console.log('Response Status:', response.status);
                const result = await response.json();
                console.log('API Response:', result);

                if (result.success) {
                    setFeaturedTypes(result.data);
                } else {
                    console.error('Error fetching featured types:', result.message);
                }
            } catch (error) {
                console.error('Error fetching featured types:', error);
            }
        };

        if (show) {
            fetchFeaturedTypes();
        }
    }, [show, Authenticate]);

    useEffect(() => {
        const fetchCourseOptions = async () => {
            const url = `${import.meta.env.VITE_BASE_URL}api/admin/adminFeaturedCourseList`;
            const requestBody = {
                school_id: parseInt(schoolId),
            };

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authenticate,
                    },
                    body: JSON.stringify(requestBody),
                });

                const result = await response.json();
                if (result.success) {
                    setCourseOptions(result.data);
                    setAvailableCourseOptions(result.data);
                } else {
                    console.error('Error fetching course options:', result.message);
                }
            } catch (error) {
                console.error('Error fetching course options:', error);
            }
        };

        if (show) {
            fetchCourseOptions();
        }
    }, [show, Authenticate, schoolId]);

    useEffect(() => {
        const filteredOptions = courseOptions.filter(option => 
            !courseSelections.some(selection => selection.course_id === option.id)
        );
        setAvailableCourseOptions(filteredOptions);
    }, [courseSelections, courseOptions]);

    useEffect(() => {
        console.log('Current Course Selections:', courseSelections);
        console.log('Available Course Options:', availableCourseOptions);
    }, [courseSelections, availableCourseOptions]);

    const handleAddCourse = (index, courseId, startDate) => {
        const updatedSelections = [...courseSelections];
        updatedSelections[index] = { course_id: courseId, start_date: startDate };
        setCourseSelections(updatedSelections);
        console.log('Updated Course Selections:', updatedSelections);
    };

    const handleFeaturedTypeChange = (type) => {
        setFeaturedType(type.id);
        setFeaturedId(type.id);
        if (type.id === 29) {
            setQuantity(1);
            setCourseSelections([{ course_id: '', start_date: '' }]);
        } else {
            setQuantity('');
        }
    };

    useEffect(() => {
        const fetchPrice = async () => {
            if (featuredId && quantity) {
                const url = `${import.meta.env.VITE_BASE_URL}api/getPrice`;
                const requestBody = { featured_id: featuredId, quantity };

                try {
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': Authenticate,
                        },
                        body: JSON.stringify(requestBody),
                    });

                    const result = await response.json();
                    if (result.success) {
                        setCalculatedPrice(result.price);
                    } else {
                        console.error('Error fetching price:', result.message);
                    }
                } catch (error) {
                    console.error('Error fetching price:', error);
                }
            }
        };

        fetchPrice();
    }, [featuredId, quantity]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate featured_courses
        const validCourses = courseSelections.filter(course => course.course_id && course.start_date);
        
        const url = `${import.meta.env.VITE_BASE_URL}api/admin/adminApplyFeaturedCourseRequest`;

        const requestBody = {
            request_name: requestName,
            school_id: parseInt(schoolId),
            featured_type: featuredType,
            quantity: parseInt(quantity),
            duration: parseInt(duration),
            featured_courses: validCourses.length > 0 ? validCourses : [], // Send empty array if no valid courses
        };

        console.log('Request Body:', requestBody);
        console.log('Submitting to URL:', url);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Authenticate,
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            if (result.success) {
                handleClose();
            } else {
                console.error('Error in response:', result.message);
            }
        } catch (error) {
            console.error('Error submitting request:', error);
        }
    };

    return (
        <div className="container text-center">
            <h1>Feature Setting</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="requestName">
                    <Form.Label>Request Name<span className="text-danger">*</span></Form.Label>
                    <Form.Control
                        type="text"
                        value={requestName}
                        onChange={(e) => setRequestName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="featuredType">
                    <Form.Label>Featured Type<span className="text-danger">*</span></Form.Label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {featuredTypes.map((type) => (
                            <Button
                                key={type.id}
                                variant={featuredType === type.id ? 'primary' : 'secondary'}
                                onClick={() => handleFeaturedTypeChange(type)}
                                style={{ flex: 1 }}
                            >
                                {type.featured_type}
                            </Button>
                        ))}
                    </div>
                </Form.Group>
                <Form.Group controlId="duration">
                    <Form.Label>Duration<span className="text-danger">*</span> (Days)</Form.Label>
                    <Form.Control
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="quantity">
                    <Form.Label>Quantity<span className="text-danger">*</span> (Slots)</Form.Label>
                    <Form.Control
                        type="number"
                        value={quantity}
                        onChange={(e) => {
                            if (featuredType !== 29) {
                                setQuantity(e.target.value);
                                setCourseSelections(Array.from({ length: e.target.value }, () => ({ course_id: '', start_date: '' })));
                            }
                        }}
                        required
                        disabled={featuredType === 29 && quantity === 1}
                    />
                </Form.Group>

                {quantity > 0 && <div className='mt-5 mb-2'>This Part is Optional</div>}

                {Array.from({ length: quantity }).map((_, index) => (
                    <Form.Group key={index} controlId={`courseSelection${index}`}>
                        <Form.Label>Select Course {index + 1}*</Form.Label>
                        <Form.Control as="select" 
                            value={courseSelections[index]?.course_id || ''}
                            onChange={(e) => handleAddCourse(index, e.target.value, courseSelections[index]?.start_date)}
                        >
                            <option value="">Select a course</option>
                            {courseOptions.map((type) => {
                                const isSelected = courseSelections[index]?.course_id === String(type.id);
                                return (
                                    <option key={type.id} value={type.id} disabled={courseSelections.some(selection => selection.course_id === String(type.id)) && !isSelected}>
                                        {type.course_name}
                                    </option>
                                );
                            })}
                        </Form.Control>
                        <Form.Control
                            type="date"
                            value={courseSelections[index]?.start_date || ''}
                            onChange={(e) => handleAddCourse(index, courseSelections[index]?.course_id, e.target.value)}
                            required={courseSelections[index]?.course_id !== ''}
                            onFocus={(e) => e.target.showPicker()}
                        />
                    </Form.Group>
                ))}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

            <div className="row mt-4">
                <div className="col-md-6">
                    <h4>Calculated Price: ${calculatedPrice}</h4>
                </div>
                <div className="col-md-6">
                    <h4>Price Listing</h4>
                    <Button variant="secondary" onClick={() => {/* Navigate to checkout page */}}>
                        Go to Checkout
                    </Button>
                </div>
            </div>

            <div className="mt-4">
                <h4>Upload Receipt</h4>
                <Button variant="success" onClick={() => {/* Submit receipt and navigate back */}}>
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default RequestSchoolFeatured;
