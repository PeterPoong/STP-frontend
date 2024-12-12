import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Card} from 'react-bootstrap';

const CheckoutFeatured = ({ requestName, featuredType, quantity, duration, calculatedPrice, featuredTypes, authToken }) => {
    const schoolId = sessionStorage.getItem('schoolId');
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`;
    const [featuredId, setFeaturedId] = useState(null);

    const handleFeaturedTypeChange = (type) => {
        setFeaturedId(type.id);
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

    return (
        <div className="container text-center">
            <h1 className='text-decoration-underline'>Checkout</h1>
            <div className='d-flex' style={{ height: '100%' }}>
                <div className='col-md-6'>
                    <h2 className='text-decoration-underline fw-bold mb-4'> Summary</h2>
                    <Card className='mb-5'>
                        <h4 className='mt-5'>Request Name:</h4>
                        <h1>{requestName}</h1>
                        <h4>Featured Type:</h4>
                        <h1 className='mb-5'>
                            {featuredType === 29 ? 'Homepage Featured' : 
                             featuredType === 30 ? 'Second Page Featured' : 
                             featuredType === 31 ? 'Third Page Featured' : 
                             featuredType}
                        </h1>
                    </Card>
                    <Card className='mb-5'>
                        <h1 className='mt-4 mb-3'>
                            Total
                        </h1>

                        <h6>
                            Price Per Slot and Month:
                        </h6>
                        <h1 className='mb-4'>
                           RM {featuredTypes.find((type) => type.featured_id === featuredType)?.price || 'None'}
                        </h1>

                        <h6 className='mb-4'>
                            Quantity
                        </h6>
                        <h1 className='mb-5'>{quantity} Slot(s)</h1>
                        <h4 className='mb-4 mt-2'>Duration:</h4>
                        <h1 className='mb-5'>{duration} Days</h1>
                        <h6 className='mt-2'>
                            Calculation:
                        </h6>
                        <h1 className='mb-5'>
                            RM {featuredTypes.find((type) => type.featured_id === featuredType)?.price || 'None'} x {quantity} Slot(s) x {duration}/30 day(s)= RM {calculatedPrice || '0.00'}
                        </h1>
                        <h6>
                            Amount Need to Pay:
                        </h6>
                        <h1 className='mb-5'>
                        RM {calculatedPrice || '0.00'}
                        </h1>
                    </Card>
                </div>
                
                <div style={{ borderLeft: '2px solid black', height: '115vh', margin: '0 10px' }}></div>
                
                <div className='col-md-6'>
                    <h4>Bank Detail</h4>
                    <Card>
                        <div>
                            <h1>Bank Name:</h1>
                            <h2>RHB Bank</h2>
                        </div>
                        <div>
                            <h1>Bank Account Number:</h1>
                            <h2>1234344578990</h2>
                        </div>
                        <div>
                            <h1>Recipient Name:</h1>
                            <h2>IMedia Enterprise</h2>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CheckoutFeatured;
