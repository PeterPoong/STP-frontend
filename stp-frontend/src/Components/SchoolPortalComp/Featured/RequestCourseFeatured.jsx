import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Underline } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { Arrow90degLeft,} from "react-bootstrap-icons";

const RequestCourseFeatured = ({ show, handleClose }) => {
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`;
    const [requestName, setRequestName] = useState('');
    const [featuredType, setFeaturedType] = useState(null);
    const [duration, setDuration] = useState(30);
    const [quantity, setQuantity] = useState('');
    const [featuredTypes, setFeaturedTypes] = useState([]);
    const [calculatedPrice, setCalculatedPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFeaturedTypes = async () => {
            console.log('Fetching featured types...');
            const url = `${import.meta.env.VITE_BASE_URL}api/school/schoolFeaturedPriceList`;
            const requestBody = { featured_type: "course" };

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

    useEffect(() => {
        if (featuredType) {
            const pricePerSlot = featuredTypes.find((type) => type.featured_id === featuredType)?.price || 0;
            setCalculatedPrice(pricePerSlot * (quantity || 1) * Math.floor(duration / 30));
        }
    }, [quantity, duration, featuredType, featuredTypes]);

    const handleFeaturedTypeChange = (type) => {
        setFeaturedType(type.featured_id);
        setCalculatedPrice(type.price * (quantity || 1));
        if (type.featured_id === 29) {
            setQuantity(1);
        } else {
            setQuantity('');
        }
    };


    const handleGoToCheckout = () => {
        navigate('/checkout', {
            state: {
                requestName,
                featuredType,
                quantity,
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
                <Form.Group className='mb-5' controlId="featuredType">
                    <Form.Label>
                        Featured Type <span className="text-danger">*</span>
                    </Form.Label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {featuredTypes.map((type) => (
                            <Button
                                key={type.featured_id}
                                variant={featuredType === type.featured_id ? 'primary' : 'secondary'}
                                onClick={() => handleFeaturedTypeChange(type)}
                                style={{ flex: 1 }}
                            >
                                {type.featured_name}
                            </Button>
                        ))}
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
                                const selectedDuration = e.target.value;
                                setDuration(selectedDuration);
                            }}
                            required
                        >
                            <option value={30}>1 Month</option>
                            <option value={90}>3 Months</option>
                            <option value={365}>12 Months</option>
                        </Form.Control>
                    </div>
                </Form.Group>
                <Form.Group className='d-flex fw-bold' controlId="quantity">
                    <Form.Label className='col-md-3'>
                        Quantity <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                        type="number"
                        value={quantity}
                        onChange={(e) => {
                            if (featuredType !== 29) {
                                setQuantity(e.target.value);
                                setCalculatedPrice(
                                    featuredTypes.find((type) => type.featured_id === featuredType)?.price *
                                    e.target.value * Math.floor(duration / 30)
                                );
                            }
                        }}
                        required
                        disabled={featuredType === 29 && quantity === 1}
                    /> Slot(s)
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
                Quantity:
            </p>
            <div className='mb-2 fw-bold' style={{ fontSize:'15px' }}>
                {quantity} Slot(s)
            </div>
            <p className='m-0 fw-bold'style={{ fontSize:'12px' }}>
                Calculation:
            </p>
            <div className='mb-5 fw-bold' style={{ fontSize:'15px' }}>
            RM {featuredTypes.find((type) => type.featured_id === featuredType)?.price || 'None'} x {quantity} Slot(s) x [{duration}/30 days]= RM {calculatedPrice || '0.00'}
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

export default RequestCourseFeatured;
