import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Border } from 'react-bootstrap-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateNewSchoolRequest = ({ show, handleClose, activeTab }) => {
    const schoolId = sessionStorage.getItem('schoolId');
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`;
    const [requestName, setRequestName] = useState('');
    const [featuredType, setFeaturedType] = useState('');
    const [duration, setDuration] = useState('');
    const [quantity, setQuantity] = useState('');
    const [featuredTypes, setFeaturedTypes] = useState([]);
    const [startDate, setStartDate] = useState(null);

    useEffect(() => {
        const fetchFeaturedTypes = async () => {
            const url = `${import.meta.env.VITE_BASE_URL}api/admin/adminFeaturedTypeListRequest`;
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${import.meta.env.VITE_BASE_URL}api/admin/adminApplyFeaturedSchoolRequest`;

        const requestBody = {
            request_name: requestName,
            school_id: parseInt(schoolId),
            featured_type: featuredType,
            duration: parseInt(duration),
            start_date: startDate ? new Date(startDate.setHours(0, 0, 0, 0)).toISOString().slice(0, 10) : null
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

            console.log('Response Status:', response.status);
            const result = await response.json();
            console.log('API Response:', result);

            if (result.success) {
                handleClose(); // Close the modal
            } else {
                console.error('Error in response:', result.message);
            }
        } catch (error) {
            console.error('Error submitting request:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create New Featured Request (School)</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                        <div style={{ display: 'flex', gap: '10px' }}> {/* Flexbox for inline layout */}
                            {featuredTypes.map((type) => (
                                <Button
                                    key={type.id}
                                    variant={featuredType === type.id ? 'primary' : 'secondary'} // Change color based on selection
                                    onClick={() => setFeaturedType(type.id)}
                                    style={{ flex: 1 }} // Equal width for buttons
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
                    <Form.Group controlId="startDate" className='mt-2 mb-2'>
                        <Form.Label >Start Date<span className="text-danger">*</span></Form.Label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => {
                                setStartDate(date);
                            }}
                            dateFormat="yyyy/MM/dd"
                            required
                            className="form-control"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateNewSchoolRequest;
