import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import AdminFormComponent from './AdminFormComponent';
import "../../css/AdminStyles/AdminFormStyle.css";

const AdminEditPackageContent = () => {
    const { id } = useParams(); // Get package ID from URL
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
    const packageId = sessionStorage.getItem('packageId'); 

    // Fetch package details
    useEffect(() => {
        if (!packageId) {
            console.error("Package ID is not available in sessionStorage");
            return;
        }

        const fetchPackageDetails = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/packageList`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authenticate,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                const packageDetails = data.data.find(pkg => pkg.id === parseInt(packageId)); // Use the packageId

                if (packageDetails) {
                    setFormData({
                        package_name: packageDetails.package_name,
                        package_detail: packageDetails.package_detail,
                        package_type: packageDetails.package_type,
                        package_price: packageDetails.package_price,
                    });
                } else {
                    console.error("Package not found with ID:", packageId);
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
    }, [packageId, Authenticate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const { package_name, package_detail, package_type, package_price } = formData;
        const packageId = sessionStorage.getItem('packageId'); // Retrieve the ID from session storage
    
        // Simple validation
        if (!package_name || !package_detail || !package_type || !package_price) {
            setError("Please fill out all required fields.");
            return;
        }
    
        const formPayload = new FormData();
        formPayload.append("id", packageId); // Include the package ID
        formPayload.append("package_name", package_name);
        formPayload.append("package_detail", package_detail);
        formPayload.append("package_type", package_type);
        formPayload.append("package_price", package_price);
    
        try {
            const updatePackageResponse = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/editPackage`, {
                method: 'POST',
                headers: {
                    'Authorization': Authenticate,
                },
                body: formPayload,
            });
    
            const updatePackageData = await updatePackageResponse.json();
    
            if (updatePackageResponse.ok) {
                navigate('/adminPackage');
            } else {
                console.error('Validation Error:', updatePackageData.errors);
                throw new Error(`Package Update failed: ${updatePackageData.message}`);
            }
        } catch (error) {
            setError('An error occurred during Package update. Please try again later.');
            console.error('Error during Package update:', error);
        }
    };
    

    const handleFieldChange = (e) => {
        const { id, value, type, files } = e.target;
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