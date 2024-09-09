import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminFormComponent from './AdminFormComponent';
import 'typeface-ubuntu';
import "../../css/AdminStyles/AdminFormStyle.css";

const AdminAddBannerContent = () => {
    const [bannerFeaturedList, setBannerFeaturedList] = useState([]);
    const [formData, setFormData] = useState({
        banner_name: "",
        banner_url: "",
        banner_start: "",
        banner_end: "",
        banner_file: null,
        featured_id: ""
    });
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`;
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Validate the form fields before submission (optional)
        if (!formData.banner_name || !formData.banner_url || !formData.banner_start || !formData.banner_end || !formData.banner_file) {
            setError("Please fill out all required fields.");
            return;
        }
    
        // Prepare FormData object for multipart form data
        const submissionData = new FormData();
        submissionData.append("banner_name", formData.banner_name);
        submissionData.append("banner_url", formData.banner_url);
        submissionData.append("banner_start", formData.banner_start);
        submissionData.append("banner_end", formData.banner_end);
        submissionData.append("banner_file", formData.banner_file);
        
        // Append selected features if any
        selectedFeatures.forEach(featureId => {
            submissionData.append("featured_id[]", featureId);  // Assuming the API accepts an array
        });
    
        try {
           
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/addBanner`, {
                method: 'POST',
                headers: {
                    'Authorization': Authenticate,
                    // 'Content-Type': multipart form data will be automatically set by the browser
                },
                body: submissionData
            });
    
            const result = await response.json();
            
            if (response.ok) {
                // Handle success (navigate or show a success message)
                console.log("Banner added successfully!", result);
                navigate("/admin/banners");  // Redirect to another page after success
            } else {
                // Handle server errors
                console.error("Error adding banner:", result.message);
                setError(result.message || "Failed to add banner.");
            }
        } catch (error) {
            console.error("Submission error:", error.message);
            setError(error.message);
        }
    };
    

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/bannerFeaturedList`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authenticate,
                    },
                });
                const data = await response.json();
                if (data && data.data) {
                    setBannerFeaturedList(data.data);
                } else {
                    setBannerFeaturedList([]);
                }
            } catch (error) {
                console.error('Error fetching banner featured list:', error.message);
                setError(error.message);
            }
        };

        fetchFeatured();
    }, [Authenticate]);

    const handleFeatureChange = (event) => {
        const featureId = parseInt(event.target.value);
        setSelectedFeatures(prevFeatures =>
            prevFeatures.includes(featureId) ? prevFeatures.filter(id => id !== featureId) : [...prevFeatures, featureId]
        );
    };

    const handleBannerFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({
            ...prev,
            banner_file: file
        }));
    };

const handleFieldChange = (e) => {
  const { id, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [id]: value
  }));
};


    const formFields = [
        {
            id: "banner_name",
            label: "Banner Name",
            type: "text",
            placeholder: "Enter Banner name",
            value: formData.name,
            onChange: handleFieldChange,
            required: true
        },
    ];

    const formUrl = [
        {
            id: "banner_url",
            label: "Banner URL",
            type: "text",
            placeholder: "Enter the banner URL",
            value: formData.banner_url,
            onChange: handleFieldChange,
            required: true,
        },
    ];

    // Check if the period dates are provided or not.
    const formPeriod =[
        {
            id: "banner_start",
            label: "From",
            type: "date",
            value: formData.banner_start,
            onChange: handleFieldChange,
            required: true
        },
        {
            id: "banner_end",
            label: "To",
            type: "date",
            value: formData.banner_end,
            onChange: handleFieldChange,
            required: true
        },
    ];

    const formCheckboxes = bannerFeaturedList.map(feature => ({
        id: `feature-${feature.id}`,
        label: feature.name,
        value: feature.id,
        checked: selectedFeatures.includes(feature.id),
        onChange: handleFeatureChange,
    }));

    const buttons = [
        {
            label: "SAVE",
            type: "submit"
        }
    ];

    return (
        <Container fluid className="admin-add-banner-content">
            <AdminFormComponent
                formTitle="Add Banner"
                checkboxDetail="Featured Type(s)"
                formFields={formFields}
                formUrl={formUrl}
                formCheckboxes={formCheckboxes}
                formPeriod={formPeriod}  // Pass the period or null
                onSubmit={handleSubmit}
                error={error}
                buttons={buttons}
                banner_file={formData.banner_file ? URL.createObjectURL(formData.banner_file) : null}
                handleBannerFileChange={handleBannerFileChange}
                startDate={startDate}
                endDate={endDate}
                onDateChange={({ startDate, endDate }) => {
                    setStartDate(startDate);
                    setEndDate(endDate);
                    setFormData(prev => ({
                        ...prev,
                        banner_start: startDate,
                        banner_end: endDate
                    }));
                }}
                
            />
        </Container>
    );
};

export default AdminAddBannerContent;
