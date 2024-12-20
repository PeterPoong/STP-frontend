import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminFormComponent from "./AdminFormComponent";
import SkeletonLoader from './SkeletonLoader';
import "../../css/AdminStyles/AdminFormStyle.css";
import ErrorModal from "./Error";

const AdminEditBannerContent = () => {
  const [bannerFeaturedList, setBannerFeaturedList] = useState([]);
  const [formData, setFormData] = useState({
    banner_name: "",
    banner_url: "",
    banner_file: null, // Ensure initial state is null for file
    featured_id: "",
  });
  // const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [banner_file, setBanner_file] = useState(null);
  const [newBannerFile, setNewBannerFile] = useState(null);
  const [error, setError] = useState(null);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const Authenticate = `Bearer ${token}`;
  const bannerId = sessionStorage.getItem("bannerId");
  const [loading, setLoading] = useState(true);

  const formatDateForSubmission = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // Handle date change for start and end
  const handleDateChange = (date, type) => {
    if (type === "start") {
      setSelectedStartDate(date);
    } else if (type === "end") {
      setSelectedEndDate(date);
    }
  };

  useEffect(() => {
    if (!bannerId) {
      console.error("Banner ID is not available in sessionStorage");
      return;
    }

    const fetchBannerDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/admin/bannerListAdmin`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: Authenticate,
            },
            body: JSON.stringify({ id: bannerId }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // Console log the entire response data
        // console.log('Response Data:', data);
        const bannerDetails = data.data[0]; // Access the first item in the data array
        // console.log('Banner Details:', bannerDetails);
        if (bannerDetails) {
          setFormData({
            banner_name: bannerDetails.name,
            banner_url: bannerDetails.url,
            banner_start: bannerDetails.banner_start
              ? bannerDetails.banner_start
              : "",
            banner_end: bannerDetails.banner_end
              ? bannerDetails.banner_end
              : "",
            banner_file: bannerDetails.file
              ? `${import.meta.env.VITE_BASE_URL}${bannerDetails.file}`
              : null,
            featured_id: bannerDetails.featured
              ? bannerDetails.featured.featured_id
              : "", // Ensure featured_id is set correctly
          });

          setSelectedStartDate(new Date(bannerDetails.banner_start)); // Set start date
          setSelectedEndDate(new Date(bannerDetails.banner_end)); // Set end date
          setBanner_file(
            bannerDetails.file
              ? `${import.meta.env.VITE_BASE_URL}storage/${bannerDetails.file}`
              : null
          );
          // setOldFeaturedId(bannerDetails.featured_id); // Set old featured ID
          // setSelectedFeatures(bannerDetails.featured ? [bannerDetails.featured.featured_id] : []);
        } else {
          console.error("Banner not found with ID:", bannerId);
        }
      } catch (error) {
        console.error("Error fetching banner details:", error.message);
        setError(error.message);
      }finally {
         setLoading(false);
     }
    };

    fetchBannerDetails();
  }, [bannerId, Authenticate]);

  const fieldLabels = {
    banner_name: "Banner Name",
    banner_url: "Banner URL",
    formattedStartDate: "Banner Start Date",
    formattedEndDate: "Banner End Date",
    banner_file: "Banner File (2MB)",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formattedStartDate = selectedStartDate
      ? formatDateForSubmission(selectedStartDate)
      : null;
    const formattedEndDate = selectedEndDate
      ? formatDateForSubmission(selectedEndDate)
      : null;

    if (
      !formData.banner_name ||
      !formData.banner_url ||
      !formattedStartDate ||
      !formattedEndDate
    ) {
      setError("Please fill out all required fields.");
      return;
    }

    const submissionData = new FormData();
    submissionData.append("id", bannerId);
    submissionData.append("banner_name", formData.banner_name);
    submissionData.append("banner_url", formData.banner_url);
    submissionData.append("banner_start", formattedStartDate);
    submissionData.append("banner_end", formattedEndDate);
    submissionData.append("featured_id", formData.featured_id);

    // Only append the banner file if it's a new file and it's an image
    if (formData.banner_file instanceof File) {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (validImageTypes.includes(formData.banner_file.type)) {
        submissionData.append("banner_file", formData.banner_file); // Append the image file
      } else {
        console.log("File is not an image, skipping banner_file append.");
      }
    }

    // Log the submission data
    for (let [key, value] of submissionData.entries()) {
      console.log(`${key}:`, value);
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/admin/editBanner`,
        {
          method: "POST",
          headers: { Authorization: Authenticate },
          body: submissionData,
        }
      );

      const result = await response.json();
      if (response.ok) {
        navigate("/adminBanner");
       } else if (response.status === 422) {
          console.log("Validation Errors:", result.errors);
          setFieldErrors(result.errors); // Pass validation errors to the modal
          setGeneralError(result.message || "Validation Error");
          setErrorModalVisible(true);
      } else {
          setGeneralError(result.message || "Failed to edit banner.");
          setErrorModalVisible(true);
      }
  } catch (error) {
      setGeneralError(error.message || "An error occurred while editing the banner. Please try again later.");
      setErrorModalVisible(true);
  }
};

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/admin/bannerFeaturedList`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: Authenticate,
            },
          }
        );
        const data = await response.json();
        setBannerFeaturedList(data.data || []);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchFeatured();
  }, [Authenticate]);

  const handleFieldChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleBannerFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, banner_file: file }));
  };

  // Handle changes in feature selection
  const handleFeatureChange = (event) => {
    const featureId = parseInt(event.target.value);

    //   setSelectedFeatures((prevFeatures) => {
    //     if (prevFeatures.includes(featureId)) {
    //       // If it's being deselected
    //       if (oldFeaturedId === featureId) {
    //         // Only update oldFeaturedId if it matches
    //         setOldFeaturedId(null); // Reset old featured ID since it's deselected
    //       }
    //       return prevFeatures.filter((id) => id !== featureId); // Remove from selected features
    //     } else {
    //       // If it's being selected
    //       setNewFeaturedIds((newIds) => [...newIds, featureId]); // Add to new featured IDs
    //       return [...prevFeatures, featureId]; // Add to selected features
    //     }
    //   });
  };

  const formFields = [
    {
      id: "banner_name",
      label: "Banner Name",
      type: "text",
      placeholder: "Enter Banner name",
      value: formData.banner_name,
      onChange: handleFieldChange,
      required: true,
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

  const formAccount = [
    {
      id: "featured_id",
      label: "Featured Type",
      value: formData.featured_id, // Ensure the featured_id is set as the value
      onChange: handleFieldChange,
      required: true,
      options: bannerFeaturedList.map((account) => ({
        label: account.name,
        value: account.id,
      })),
    },
  ];

  const buttons = [
    {
      label: "SAVE",
      type: "submit",
    },
  ];

  return (
    <Container fluid className="admin-add-banner-content">
      <ErrorModal
        errorModalVisible={errorModalVisible}
        setErrorModalVisible={setErrorModalVisible}
        generalError={generalError || error} // Ensure `generalError` or fallback to `error`
        fieldErrors={fieldErrors}
        fieldLabels={fieldLabels}
    />
      {loading ? (
            <SkeletonLoader />
        ) : (
      <AdminFormComponent
        formTitle="Edit Banner"
        checkboxDetail="Featured Type(s)"
        star="*"
        Star="*"
        formFields={formFields}
        formUrl={formUrl}
        formAccount={formAccount}
        formPeriod={true}
        helperStar="*"
        onSubmit={handleSubmit}
        error={error}
        buttons={buttons}
        selectedStartDate={selectedStartDate} // Pass the start date
        selectedEndDate={selectedEndDate} // Pass the end date
        handleDateChange={handleDateChange}
        banner_file={banner_file}
        newBannerFile={newBannerFile}
        handleBannerFileChange={handleBannerFileChange}
      />
    )}
    </Container>
  );
};

export default AdminEditBannerContent;
