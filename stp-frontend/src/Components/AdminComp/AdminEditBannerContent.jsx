import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminFormComponent from './AdminFormComponent';
import "../../css/AdminStyles/AdminFormStyle.css";

const AdminEditBannerContent = () => {
  const [bannerFeaturedList, setBannerFeaturedList] = useState([]);
  const [formData, setFormData] = useState({
    banner_name: "",
    banner_url: "",
    banner_file: "", // Changed to store file path
    featured_id: []
  });
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  const Authenticate = `Bearer ${token}`;
  const bannerId = sessionStorage.getItem('bannerId'); 

  // Use the file path directly
  const bannerFileURL = formData.banner_file ? `${import.meta.env.VITE_BASE_URL}${formData.banner_file}` : null;

  const formatDateForSubmission = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleDateChange = (date, type) => {
    if (type === "start") {
      setSelectedStartDate(date);
      console.log("Start date set to:", date);
    } else if (type === "end") {
      setSelectedEndDate(date);
      console.log("End date set to:", date);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Formatting dates for submission
    const formattedStartDate = selectedStartDate
      ? formatDateForSubmission(selectedStartDate)
      : null;
    const formattedEndDate = selectedEndDate
      ? formatDateForSubmission(selectedEndDate)
      : null;
  
    // Check if all required fields are filled
    if (!formData.banner_name || !formData.banner_url || !formattedStartDate || !formattedEndDate || !formData.banner_file) {
      setError("Please fill out all required fields.");
      return;
    }
  
    // Create FormData object
    const submissionData = new FormData();
    submissionData.append("banner_name", formData.banner_name);
    submissionData.append("banner_url", formData.banner_url);
    submissionData.append("banner_start", formattedStartDate);
    submissionData.append("banner_end", formattedEndDate);
    submissionData.append("banner_file", formData.banner_file); // Assuming the file path is acceptable for submission
  
    // Add selected features
    selectedFeatures.forEach((featureId) => {
      submissionData.append("featured_id[]", featureId);
    });
  
    // Log the data being submitted
    console.log("FormData being submitted:");
    for (const pair of submissionData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
  
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/editBanner`, {
        method: "POST",
        headers: {
          Authorization: Authenticate,
        },
        body: submissionData,
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log("Banner updated successfully!", result);
        navigate("/adminBanner");
      } else {
        setError(result.message || "Failed to update banner.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!bannerId) {
      console.error("Banner ID is not available in sessionStorage");
      return;
    }

    const fetchBannerDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/bannerListAdmin`, {
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
        const bannerDetails = data.data.find(bnr => bnr.id === parseInt(bannerId)); // Use the bannerId

        if (bannerDetails) {
          setFormData({
            banner_name: bannerDetails.name,
            banner_url: bannerDetails.url,
            banner_file: bannerDetails.filePath, // Use the file path returned from the API
            featured_id: bannerDetails.featured.map(feature => feature.id),
          });
          setSelectedStartDate(new Date(bannerDetails.banner_start));
          setSelectedEndDate(new Date(bannerDetails.banner_end));
        } else {
          console.error("Banner not found with ID:", bannerId);
        }
      } catch (error) {
        console.error('Error fetching banner details:', error.message);
        setError(error.message);
      }
    };

    fetchBannerDetails();
  }, [bannerId, Authenticate]);

  const handleFieldChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFeatureChange = (event) => {
    const featureId = parseInt(event.target.value);
    setSelectedFeatures(prevFeatures =>
      prevFeatures.includes(featureId)
        ? prevFeatures.filter(id => id !== featureId)
        : [...prevFeatures, featureId]
    );
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
    }
  ];

  const formUrl = [
    {
      id: "banner_url",
      label: "Banner URL",
      type: "text",
      placeholder: "Enter the banner URL",
      value: formData.banner_url,
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
    <Container fluid className="admin-edit-banner-content">
      {console.log("Rendered with selectedStartDate:", selectedStartDate)}
      {console.log("Rendered with selectedEndDate:", selectedEndDate)}
      <AdminFormComponent
        formTitle="Edit Banner"
        checkboxDetail="Featured Type(s)"
        formFields={formFields}
        formUrl={formUrl}
        formCheckboxes={formCheckboxes}
        formPeriod={true}
        onSubmit={handleSubmit}
        error={error}
        buttons={buttons}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        handleDateChange={handleDateChange} // Pass the function down
        banner_file={bannerFileURL} // Use the file path here
      />
    </Container>
  );
};

export default AdminEditBannerContent;
