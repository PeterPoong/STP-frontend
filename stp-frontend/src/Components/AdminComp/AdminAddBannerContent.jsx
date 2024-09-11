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
        featured_id: []
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
    
        // Debug logging
        console.log("Form data:", formData);
        console.log("Selected features:", selectedFeatures);
    
        // Check if all required fields are filled
        if (!formData.banner_name || !formData.banner_url || !formData.banner_start || !formData.banner_end || !formData.banner_file) {
            // Debugging missing fields
            if (!formData.banner_name) console.error("Missing banner_name");
            if (!formData.banner_url) console.error("Missing banner_url");
            if (!formData.banner_start) console.error("Missing banner_start");
            if (!formData.banner_end) console.error("Missing banner_end");
            if (!formData.banner_file) console.error("Missing banner_file");
    
            setError("Please fill out all required fields.");
            return;
        }
    
        const bannerStartFormatted = formatDateTime(new Date(formData.banner_start));
        const bannerEndFormatted = formatDateTime(new Date(formData.banner_end));
    
        const submissionData = new FormData();
        submissionData.append("banner_name", formData.banner_name);
        submissionData.append("banner_url", formData.banner_url);
        submissionData.append("banner_start", bannerStartFormatted);
        submissionData.append("banner_end", bannerEndFormatted);
        submissionData.append("banner_file", formData.banner_file);
    
        selectedFeatures.forEach(featureId => {
            submissionData.append("featured_id[]", featureId);
        });
    
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/addBanner`, {
                method: 'POST',
                headers: {
                    'Authorization': Authenticate,
                },
                body: submissionData
            });
    
            const result = await response.json();
    
            if (response.ok) {
                console.log("Banner added successfully!", result);
                navigate("/adminBanner");
            } else {
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

    const formatDateTime = (dateTime) => {
        console.log("Formatting date:", dateTime);
        const date = new Date(dateTime);
        const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
        console.log("Formatted date:", formattedDate);
        return formattedDate;
    };
    console.log("Banner Start:", formData.banner_start);
    console.log("Banner End:", formData.banner_end);

    const handleDateChange = (date, type) => {
        const formattedDate = formatDateTime(date);
        if (type === 'start') {
            setFormData(prev => ({
                ...prev,
                banner_start: banner_start
            }));
        } else if (type === 'end') {
            setFormData(prev => ({
                ...prev,
                banner_end: banner_end
            }));
        }
    };
    

    const formFields = [
        {
            id: "banner_name",
            label: "Banner Name",
            type: "text",
            placeholder: "Enter Banner name",
            value: formData.banner_name,
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

    const formPeriod = [
        {
            id: "banner_start",
            label: "From",
            type: "datetime-local",
            value: formData.banner_start,
            onChange: handleFieldChange,
            required: true
        },
        {
            id: "banner_end",
            label: "To",
            type: "datetime-local",
            value: formData.banner_end,
            onChange: handleFieldChange,
            required: true
        }
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
                formPeriod={formPeriod}
                onSubmit={handleSubmit}
                error={error}
                buttons={buttons}
                banner_file={formData.banner_file ? URL.createObjectURL(formData.banner_file) : null}
                handleBannerFileChange={handleBannerFileChange}
                startDate={startDate}
                endDate={endDate}
                onDateChange={({ startDate, endDate }) => handleDateChange(startDate, endDate)}
            />
        </Container>
    );
};

export default AdminAddBannerContent;
