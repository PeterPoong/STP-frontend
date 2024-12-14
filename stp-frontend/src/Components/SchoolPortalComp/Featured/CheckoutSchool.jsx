import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Form, Button, Card } from 'react-bootstrap';
import { useDropzone } from "react-dropzone";
import { FaFileImage, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Arrow90degLeft,} from "react-bootstrap-icons";
const CheckoutSchool = ({ requestName, featuredType, start_date, duration, calculatedPrice, featuredTypes, authToken }) => {
    const schoolId = sessionStorage.getItem('schoolId');
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`;
    const navigate = useNavigate();
    const [featuredId, setFeaturedId] = useState(null);
    const [transactionProof, setTransactionProof] = useState(null);
    const [dropzoneError, setDropzoneError] = useState(null);

    const handleFeaturedTypeChange = (type) => {
        setFeaturedId(type.id);
    };

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            if (file.size > 2 * 1024 * 1024) {
                setDropzoneError("File size exceeds 2MB");
                return;
            }
            setTransactionProof(file);
            setDropzoneError(null);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png',
        multiple: false
    });

    const handleBack = () => {
        navigate('/CourseRequestFeatured');
    };
    const handleSubmit = async () => {
        if (!transactionProof) {
            alert("Please upload a receipt.");
            return;
        }

        const url = `${import.meta.env.VITE_BASE_URL}api/school/requestFeaturedSchool`;
        const formData = new FormData();
        formData.append("featured_type", featuredType);
        formData.append("start_date", start_date);
        formData.append("duration", duration);
        formData.append("transaction_proof", transactionProof);
        formData.append("request_name", requestName);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': Authenticate,
                },
                body: formData,
            });

            const result = await response.json();
            if (result.success) {
                alert("Request submitted successfully.");
                navigate('/RequestFeatured');
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error submitting request:', error);
        }
    };

    return (
        <div className="container">
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
                Checkout
            </h5>
            <div className='d-flex text-center' style={{ height: '100%' }}>
                <div className='col-md-6'>
                    <h4 className='text-decoration-underline fw-bold mb-3'> Summary</h4>
                    <Card className='mb-3'>
                        <h6 className='mt-3 fw-light' style={{ color: 'rgba(0, 0, 0, 0.7)' }}>Request Name:</h6>
                        <h6 className='fw-bold' style={{ color: 'rgba(0, 0, 0, 0.7)' }}>{requestName}</h6>
                        <h6 className='fw-light' style={{ color: 'rgba(0, 0, 0, 0.7)' }}>Featured Type:</h6>
                        <h6 className='mb-3 fw-bold' style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                            {featuredType === 29 ? 'Homepage Featured' :
                                featuredType === 30 ? 'Second Page Featured' :
                                    featuredType === 31 ? 'Third Page Featured' :
                                        featuredType}
                        </h6>
                    </Card>
                    <Card className='mb-3'>
                        <h6 className='text-decoration-underline fw-bold mt-3 mb-3'>Total</h6>
                        <h6>Price Per Slot and Month:</h6>
                        <h6 className='mb-3 fw-bold'>
                            RM {featuredTypes.find((type) => type.featured_id === featuredType)?.price || 'None'}
                        </h6>
                        <h6 className='mt-2'>Duration:</h6>
                        <h6 className='mb-3 fw-bold'>{duration} Days</h6>
                        <h6>Calculation:</h6>
                        <h6 className='mb-3 fw-bold'>
                            RM {featuredTypes.find((type) => type.featured_id === featuredType)?.price || 'None'} x [{duration}/30 days]= RM {calculatedPrice || '0.00'}
                        </h6>
                        <h6>Amount Need to Pay:</h6>
                        <h5 className='mb-5 fw-bold'>
                            RM {calculatedPrice || '0.00'}
                        </h5>
                    </Card>
                </div>

                <div style={{ borderLeft: '1px solid grey', height: '100vh', margin: '0 10px' }}></div>

                <div className='col-md-6'>
                    <h4 className='text-decoration-underline fw-bold'>Bank Detail</h4>
                    <Card>
                        <div>
                            <h6 className='mt-3 fw-light'>Bank Name:</h6>
                            <h6 className='fw-bold'>RHB Bank</h6>
                        </div>
                        <div>
                            <h6 className='fw-light'>Bank Account Number:</h6>
                            <h6 className='fw-bold'>21118200023813</h6>
                        </div>
                        <div>
                            <h6 className='fw-light'>Recipient Name:</h6>
                            <h6 className='fw-bold'>IMEDIA ENTERPRISE</h6>
                        </div>
                    </Card>

                    <div className="upload-section">
                        <div className="mb-4">
                            <div className='d-flex justify-content-center'>
                                <h5 className='text-decoration-underline'>Upload Receipt</h5> <span className='text-danger'>*</span>
                            </div>
                            <div
                                {...getRootProps({ className: "dropzone text-center p-3 border rounded" })}
                            >
                                <input {...getInputProps()} />
                                <FaFileImage size={32} className="mb-2" />
                                <h6><span style={{ color: '#0EA5E9' }}>Click to upload</span> or drag and drop</h6>
                                <small className="text-muted">
                                    JPG, JPEG, PNG less than 2MB
                                </small>
                                {transactionProof && (
                                    <div className="mt-3">
                                        <h6>{transactionProof.name}</h6>
                                        <FaTrashAlt
                                            style={{ cursor: 'pointer', color: 'red' }}
                                            onClick={() => setTransactionProof(null)}
                                        />
                                    </div>
                                )}
                                {dropzoneError && <p className="text-danger mt-2">{dropzoneError}</p>}
                            </div>
                        </div>
                    </div>
                    <button className={`btn btn-outline-danger px-5 mb-3 rounded-pill`} onClick={handleSubmit}>Submit</button>
                </div>
            
            </div>
        </div>
    );
};

export default CheckoutSchool;
