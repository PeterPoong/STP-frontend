import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import AdminFormComponent from './AdminFormComponent';
import 'typeface-ubuntu';
import "../../css/AdminStyles/AdminFormStyle.css";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const AdminEditPackageContent = () => {
    const { id } = useParams(); // Get package ID from URL
    const [categoryList, setCategoryList] = useState([]); 
    const [packageList, setPackageList] = useState([]); 
    const [formData, setFormData] = useState({
        package_name: "",
        package_detail: "",
        package_type: "",
        package_price: "",
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`;

    useEffect(() => {
        const fetchPackageDetails = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/getPackage/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authenticate,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                if (data && data.data) {
                    setFormData({
                        package_name: data.data.package_name,
                        package_detail: data.data.package_detail,
                        package_type: data.data.package_type,
                        package_price: data.data.package_price,
                    });
                }
            } catch (error) {
                console.error('Error fetching package details:', error.message);
                setError(error.message);
            }
        };

        const fetchPackages = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/packageTypeList`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authenticate,
                    },
                    body: JSON.stringify({})
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                if (data && data.data) {
                    setPackageList(data.data);
                }
            } catch (error) {
                console.error('Error fetching package list:', error.message);
                setError(error.message);
            }
        };

        fetchPackageDetails();
        fetchPackages();
    }, [id, Authenticate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Submitting form data:", formData); // Debugging line

        const { package_name, package_detail, package_type, package_price } = formData;

        const formPayload = new FormData();
        formPayload.append("package_name", package_name);
        formPayload.append("package_detail", package_detail);
        formPayload.append("package_type", package_type);
        formPayload.append("package_price", package_price);

        try {
            console.log("FormData before submission:", formPayload);

            const updatePackageResponse = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/updatePackage/${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': Authenticate,
                },
                body: formPayload,
            });

            const updatePackageData = await updatePackageResponse.json();

            if (updatePackageResponse.ok) {
                console.log('Package successfully updated:', updatePackageData);
                navigate('/adminPackage');
            } else {
                console.error('Validation Error:', updatePackageData.errors); // Debugging line
                throw new Error(`Package Update failed: ${updatePackageData.message}`);
            }
        } catch (error) {
            setError('An error occurred during Package update. Please try again later.');
            console.error('Error during Package update:', error);
        }
    };

    const handleFieldChange = (e) => {
        const { id, value, type, files } = e.target;
        console.log(`Field ${id} updated with value: ${value}`); // Debugging line
        if (type === "file") {
            setFormData(prev => ({
                ...prev,
                [id]: files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [id]: value
            }));
        }
    };

    const handleEditorChange = (content) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            package_detail: content,
        }));
    };

    const formFields = [
        {
            id: "package_name",
            label: "Package Name",
            type: "text",
            placeholder: "Enter package name",
            value: formData.package_name,
            onChange: handleFieldChange,
            required: true
        },
    ];

    const formPrice = [
        {
            id: "package_price",
            label: "Package Price (RM)",
            type: "text",
            placeholder: "Enter package price",
            value: formData.package_price,
            onChange: handleFieldChange,
            required: true
        },
    ];

    const formPackage = [
        {
            id: "package_type",
            label: "Package Type",
            value: formData.package_type,
            onChange: handleFieldChange,
            required: true,
            options: packageList.map(packages => ({
                label: packages.name,
                value: packages.id
            }))
        }
    ];

    const formHTML = [
        {
            id: "package_detail",
            label: "Package Details",
            value: formData.package_detail,
            onChange: handleEditorChange,
            required: true
        }
    ];

    const buttons = [
        {
            label: "SAVE",
            type: "submit"
        }
    ];

    return (
        <Container fluid className="admin-add-package-container">
            <AdminFormComponent
                formTitle="Package Information"
                formFields={formFields}
                formHTML={formHTML}
                formPackage={formPackage}
                formPrice={formPrice}
                onSubmit={handleSubmit}
                error={error}
                buttons={buttons}
            />
        </Container>
    );
};

export default AdminEditPackageContent;
