import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Underline } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { Arrow90degLeft,} from "react-bootstrap-icons";

const RequestSchoolFeature = ({ show, handleClose }) => {
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`;
    const [requestName, setRequestName] = useState('');
    const [featuredType, setFeaturedType] = useState(null);
    const [start_date, setStart_date]= useState('');
    const [duration, setDuration] = useState(30);
    const [featuredTypes, setFeaturedTypes] = useState([]);
    const [calculatedPrice, setCalculatedPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFeaturedTypes = async () => {
            console.log('Fetching featured types...');
            const url = `${import.meta.env.VITE_BASE_URL}api/school/schoolFeaturedPriceList`;
            const requestBody = { featured_type: "school" };

            console.log('Request Body:', requestBody);

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
                console.log('Response Headers:', response.headers);

                if (!response.ok) {
                    console.error('Network response was not ok:', response.statusText);
                    return;
                }

                const result = await response.json();
                console.log('Response from backend:', result);

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
        } else {
            console.log('Component not visible, fetch not triggered.');
        }
    }, [show, Authenticate]);

    const handleFeaturedTypeChange = (type) => {
            setFeaturedType(type.featured_id);
            setCalculatedPrice(pricePerSlot * months);
        };
    
    useEffect(() => {
        if (featuredType) {
            const pricePerSlot = featuredTypes.find((type) => type.featured_id === featuredType)?.price || 0;
            const months = Math.floor(duration / 30); // Calculate the number of months
            setCalculatedPrice(pricePerSlot * months); // Calculate total price
        }
    }, [duration, featuredType, featuredTypes]);
    
    const handleStartDate = (selectedDate) => {
        // Format the date as "2023-1-5"
        const formattedDate = new Date(selectedDate)
            .toLocaleDateString('en-CA', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            });

        // Update the state with the formatted date
        setStart_date(formattedDate);

        console.log('Formatted Date:', formattedDate);
    };
    const handleGoToCheckout = () => {
        navigate('/checkoutsc', {
            state: {
                requestName,
                featuredType,
                start_date,
                duration,
                calculatedPrice,
                featuredTypes,
            },
        });
    };
    const handleBack = () => {
        navigate('/RequestFeatured');
    };
    return (
        <div className="container col-md-12">
            <h5 className="mb-4 mt-5">
                {/* Make the icon clickable */}
                <span
                onClick={handleBack} // Add your click handler here
                style={{
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                }} // Optional: styling for cursor and alignment
                >
                <Arrow90degLeft style={{ color: "#B71A18" }} className="mx-3" />
                </span>
                Feature Setting
            </h5>
            <Form>
                <Form.Group className="mb-5"controlId="requestName">
                    <Form.Label>
                        Request Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                        type="text"
                        value={requestName}
                        onChange={(e) => setRequestName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-5" controlId="featuredType">
                    <Form.Label>
                        Featured Type <span className="text-danger">*</span>
                    </Form.Label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {featuredTypes.map((type) => {
                            const isActive = featuredType === type.featured_id;

                            const buttonStyles = {
                                flex: 1,
                                backgroundColor: isActive ? 'rgba(183, 26, 24, 0.2)' : 'white', // Active background
                                borderColor: '#B71A18', // Red border for all buttons
                                color: isActive ? 'maroon' : '#B71A18', // Text color matches .submitButton
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                fontWeight: 'normal', // Match .submitButton font weight
                                fontSize: '14px', // Match .submitButton font size
                                borderRadius: '12px', // Match .submitButton border radius
                                padding: '0.5rem 2.5rem', // Match .submitButton padding
                                cursor: 'pointer',
                                transition: 'background-color 0.3s, color 0.3s', // Smooth transition for hover
                            };

                            return (
                                <Button
                                    className="text-capitalize"
                                    key={type.featured_id}
                                    variant="light"
                                    onClick={() => handleFeaturedTypeChange(type)}
                                    style={buttonStyles}
                                    onMouseEnter={(e) => {
                                        if (!isActive) {
                                            e.target.style.backgroundColor = '#B71A18';
                                            e.target.style.color = 'white';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) {
                                            e.target.style.backgroundColor = 'white';
                                            e.target.style.color = '#B71A18';
                                        }
                                    }}
                                >
                                    {type.featured_name}
                                </Button>
                            );
                        })}
                    </div>
                </Form.Group>
                <div className='d-flex mb-5' style={{lineHeight:'2.5'}}>
                <Form.Group className='d-flex me-5 fw-bold' controlId="duration">
                    <Form.Label className='col-md-5'>
                        Duration <span className="text-danger">*</span>
                    </Form.Label>
                    <div className="position-relative">
                        <i className="fas fa-chevron-down position-absolute" style={{ right: '10px', top: '50%', transform: 'translateY(-50%)' }}></i>
                        <Form.Control
                            as="select"
                            value={duration}
                            onChange={(e) => {
                                const selectedDuration = parseInt(e.target.value, 10); // Ensure the value is parsed as a number
                                setDuration(selectedDuration); // Update the duration
                            }}
                            required
                        >
                            <option value={30}>1 Month</option>
                            <option value={90}>3 Months</option>
                            <option value={365}>12 Months</option>
                        </Form.Control>
                    </div>
                </Form.Group>

                <Form.Group className='d-flex fw-bold' controlId="start_date">
                    <Form.Label className='col-md-4'>
                        Start Date <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                        type="date"
                        value={start_date || ''} 
                        onChange={(e) => handleStartDate(e.target.value)} 
                        required
                        onFocus={(e) => e.target.showPicker()} 
                    />
                </Form.Group>
                </div>
                
                <div className='d-flex justify-content-end'>
                    <h6 className='me-2'>Total Amount:</h6>
                    <div className='fw-bold' style={{fontSize:'20px', lineHeight:'1'}}>
                        RM {calculatedPrice || '0.00'}
                    </div>
                </div>
            </Form>
            <p className='text-center mt-5 mb-5 text-decoration-underline
            ' style={{fontWeight:600}}>
                Pricing Summary
            </p>
            
            <div className='d-flex col-md-12'>
              
            <Card className='col-md-6 text-center'>
        
            <p className='text-center mt-5 mb-5 text-decoration-underline
            ' style={{fontWeight:600, fontSize:'20px'}}>
                Price Calculator
            </p>
            <div>
                <p>
                    Selected Featured: 
                </p>
                <div className='mb-5 fw-bolder text-capitalize' style={{ color: 'rgba(0, 0, 0, 0.7)', fontSize:'20px' }}>
                    {featuredTypes.find(type => type.featured_id === featuredType)?.featured_name || 'None'}
                </div> 
            </div>
           
            <p className='fw-bolder text-capitalize m-0' style={{ fontSize:'20px' }}>
                Calculation
            </p>
            <p className='m-0 fw-bold' style={{ fontSize:'12px' }}>
                Price per Slot and Month:
            </p>
            <div className='mb-2 fw-bold'style={{ fontSize:'15px' }}>
                RM {featuredTypes.find((type) => type.featured_id === featuredType)?.price || 'None'}
            </div>

            <p className='m-0 fw-bold'style={{ fontSize:'12px' }}>
                Calculation:
            </p>
            <div className='mb-5 fw-bold' style={{ fontSize:'15px' }}>
            RM {featuredTypes.find((type) => type.featured_id === featuredType)?.price || 'None'} x [{duration}/30 days]= RM {calculatedPrice || '0.00'}
            </div>
            <p className='m-0 fw-bold' style={{ fontSize:'12px' }}>
                Amount Need to Pay:
            </p>
            <div className='fw-bold' style={{ fontSize:'20px' }}>
               RM {calculatedPrice || '0.00'}
            </div>
            </Card>
            <Card className='col-md-6 text-center'>
        
            <p className='text-center mt-5 mb-0 text-decoration-underline
            ' style={{fontWeight:600, fontSize:'20px'}}>
                Pricing
            </p>
            <p className='fw-bold m-0' style={{fontSize:'12px'}}>
                Take Note
            </p>
            <p className='fw-bold m-0 mb-5' style={{fontSize:'12px'}}>
                Each price is for a single slot.
            </p>

            <div>
                {featuredTypes.map((type) => (
                    <div className='mb-5' key={type.featured_id}>
                        <p className='text-capitalize fw-bold m-0' style={{ color: 'rgba(0, 0, 0, 0.7)', fontSize:'16px' }}>
                            {type.featured_name}
                        </p>
                        {type.featured_id === 29 && (
                            <p className='text-capitalize fw-bold mb-1'style={{ color: 'rgba(0, 0, 0, 0.7)', fontSize:'10px' }} >
                                Limited to <span style={{color:'red'}}>1</span> slot only.
                            </p>
                        )}
                        <div className='d-flex justify-content-center'>
                            <p className='fw-bold text-center me-2' style={{ color: 'rgba(0, 0, 0, 0.7)', fontSize:'16px', lineHeight: '1.5' }}>
                                RM {type.price}
                            </p>
                            <p style={{ color: 'rgba(0, 0, 0, 0.7)', fontSize:'10px', lineHeight: '2.5' }}>
                                per Month
                            </p>
                        </div>
                      
                
                    </div>
                ))}
            </div>
            </Card>
            </div>
            
            <div className="mt-4 text-end">
                <Button 
                className={`btn btn-outline-danger px-5  mb-3 rounded-pill`}
                 onClick={handleGoToCheckout}
                 style={{color:'white'}}>
                    Go to Checkout
                </Button>
            </div>
        </div>
    );
};

export default RequestSchoolFeature;
